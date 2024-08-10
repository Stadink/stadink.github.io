import express from 'express';
import { connectToMongoDB } from './mongoConfig.js'
import * as functions from "firebase-functions";
import admin from 'firebase-admin';

const router = express.Router();

const TIMEZONE = 'Europe/Prague';

// Endpoint to save a token
router.post('/tokens', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).send({ message: 'Token is required' });
  }

  try {
    const db = await connectToMongoDB();
    const collection = db.collection('tokens');
    const result = await collection.insertOne({ token });
    res.status(201).send({ message: 'Token saved successfully', _id: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save token', error: error.message });
  }
});

router.post('/send-random-word-notification', async (req, res) => {
  const { token } = req.body;

  // ⬜️ Get one random word from db only (faster)
  const db = await connectToMongoDB();
  const collection = db.collection('words');
  const words = await collection.find({}).toArray();
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex].word;

  const text = `\n\n\n ${randomWord} \n\n\n ?`

  const message = {
    notification: {
      title: '😍🔥',
      body: text
    },
    android: {
      priority: "high"
    },
    apns: {
      payload: {
        aps: {
          content_available: true
        }
      }
    },
    token: token,
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
      res.status(200).send('Notification sent successfully');
    })
    .catch((error) => {
      console.log('Error sending message:', error);
      res.status(500).send(`Error sending notification: ${error.message}`);
    });
});

// how to enable here instead of index.js ?
// export const scheduledNotification = functions.pubsub.schedule('every 15 minutes')
//   .timeZone(TIMEZONE) // Set the timezone to your preferred timezone
//   .onRun(async (context) => {
//     // Define your notification data
//     const notificationData = {
//       token: 'd5_xHLKoTIiNTXkOvl8UKV:APA91bGuGI_H8SJvpEz0I3p8q8sJW5rAcfVF9eICDjEKcQyAun_bdE3DGG-fatNPdcVPZ0FVobUiO_fiCP1y8uj3mp6pA-2reYFSBRLh-IqLTq16dktW8fnaig5jB4GLxhG-Q0YDQwn6',
//     };

//     // Call the send-notification endpoint
//     try {
//       const response = await axios.post('https://server-e4273.web.app/send-random-word-notification', notificationData);
//       console.log('Notification sent successfully:', response.data);
//     } catch (error) {
//       console.error('Error sending notification:', error);
//     }

//     return null;
//   });

export default router;
