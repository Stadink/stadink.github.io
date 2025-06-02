import express from 'express';
import { google } from 'googleapis';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
router.use(cors());

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/fitness.heart_rate.read'];

// Initialize Google Fit API
const fitness = google.fitness({ version: 'v1' });

// Auth endpoint to start OAuth flow
router.get('/auth', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(url);
});

// OAuth callback endpoint
router.get('/oauth2callback', async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);

    res.json(tokens); // Just return tokens for now
  } catch (error) {
    console.error(
      'OAuth callback error:',
      (error && error.response && error.response.data) || error.message || error
    );
        res.status(500).json({ error: 'Failed to authenticate with Google' });
  }
});



// Heart rate data endpoint
router.get('/heartrate', async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(401).json({ error: 'No access token provided' });
    }

    oauth2Client.setCredentials({ access_token: token });

    const fitness = google.fitness({ version: 'v1', auth: oauth2Client }); // ✅ FIXED LINE

    const now = Date.now();
    const startTime = now - 60 * 60 * 1000; // past hour

    const response = await fitness.users.dataset.aggregate({
      userId: 'me',
      requestBody: {
        aggregateBy: [{
          dataTypeName: 'com.google.heart_rate.bpm'
        }],
        startTimeMillis: startTime,
        endTimeMillis: now,
        bucketByTime: { durationMillis: 60000 }
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Heart rate data error:', error?.response?.data || error.message || error);
    res.status(500).json({
      error: 'Failed to fetch heart rate data',
      details: error?.response?.data?.error?.message || error.message
    });
  }
});

router.get('/heartrate/sources', async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(401).json({ error: 'No access token provided' });
    }

    // 1) tell the OAuth client to use this token
    oauth2Client.setCredentials({ access_token: token });

    // 2) initialize the fitness client with auth
    const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

    // 3) ask Google Fit to list all data sources for this user
    const response = await fitness.users.dataSources.list({
      userId: 'me',
    });

    // send back the full list of sources
    res.json(response.data);
  } catch (error) {
    console.error('List sources error:', error?.response?.data || error.message || error);
    res.status(500).json({
      error: 'Failed to list data sources',
      details: error?.response?.data?.error?.message || error.message,
    });
  }
});

router.get('/heartrate/raw', async (req, res) => {
  try {
    const token    = req.query.token;
    const sourceId = req.query.sourceId;
    if (!token || !sourceId) {
      return res.status(400).json({ error: 'Missing token or sourceId' });
    }

    // 1) Set credentials on oauth2Client
    oauth2Client.setCredentials({ access_token: token });

    // 2) Build fitness client
    const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

    // 3) Define a 1‑hour window (now and one hour ago)
    const now = Date.now(); // e.g. 03:00 CEST (01:00 UTC)
    const twoHoursAgo = now - 5 * 60 * 60 * 1000; // ~01:00 CEST (23:00 UTC previous day)
    
    const datasetId = `${twoHoursAgo * 1e6}-${now * 1e6}`;
     

    // 4) Fetch raw heart-rate data for that source
    const response = await fitness.users.dataSources.datasets.get({
      userId:      'me',
      dataSourceId: sourceId,
      datasetId:    datasetId,
    });

    // 5) Return the whole payload
    res.json(response.data);
  } catch (error) {
    console.error('Raw heart rate fetch error:', error?.response?.data || error.message);
    res.status(500).json({
      error:   'Failed to fetch raw heart rate data',
      details: error?.response?.data?.error?.message || error.message,
    });
  }
});


export default router;
