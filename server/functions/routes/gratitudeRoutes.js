import * as functions from "firebase-functions";
import express from 'express';
const router = express.Router();

import { MongoClient, ServerApiVersion } from 'mongodb';

// MongoDB client setup
const mongodbConfig = functions.config().mongodb;
const uri = mongodbConfig.uri;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    return client.db('Dashboard');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Gratitude Dashboard Function
const saveGratitudeItem = async (item) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('gratitude');

    // Add timestamp to the item
    const timestamp = new Date();
    item.timestamp = timestamp;

    const result = await collection.insertOne(item);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return result.insertedId;
  } catch (error) {
    console.error('Error saving gratitude item:', error);
    throw error;
  }
};

router.post('/save', async (req, res) => {
  try {
    const item = req.body;
    const insertedId = await saveGratitudeItem(item);
    res.status(200).send({ message: 'Gratitude item saved successfully', _id: insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save gratitude item', error: error.message });
  }
});

// New function to get gratitude items added today
const getTodaysGratitudeItems = async (token) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('gratitude');

    // Get start of today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Get end of today
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Query to find documents where timestamp is within today's date
    const query = {
      timestamp: {
        $gte: startOfToday,
        $lte: endOfToday
      },
      token: token
    };

    const items = await collection.find(query).sort({timestamp: 1}).toArray();
    return items;
  } catch (error) {
    console.error('Error retrieving today\'s gratitude items:', error);
    throw error;
  }
};

// Endpoint to get all gratitude items with token from today
router.get('/gratitude/today', async (req, res) => {
  try {
    // Extract token from query parameters
    const token = req.query.token;

    if (!token) {
      return res.status(401).send({ message: 'Token is required' });
    }

    const items = await getTodaysGratitudeItems(token);
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve today\'s gratitude items', error: error.message });
  }
});

export default router;
