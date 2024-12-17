import express from 'express';
import { connectToMongoDB } from './mongoConfig.js'
import { ObjectId } from 'mongodb';

const router = express.Router();

// Endpoint to save neuro session log
router.post('/neuroLog', async (req, res) => {
    const { neurok, locNum, timestamp } = req.body;

    try {
      const db = await connectToMongoDB();
      const collection = db.collection('neuroLog');
      const result = await collection.insertOne({ neurok, locNum, timestamp });
      res.status(201).send({ message: 'Neuro session saved successfully', _id: result.insertedId });
    } catch (error) {
      res.status(500).send({ message: 'Failed to save neuro session', error: error.message });
    }
  });

  // Endpoint to retrieve all typeLog docs
    router.get('/neuroLog', async (req, res) => {
        try {
        const db = await connectToMongoDB();
        const collection = db.collection('neuroLog');
        const words = await collection.find({}).toArray();
        res.status(200).send(words);
        } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve typeLog', error: error.message });
        }
    });

export default router;
