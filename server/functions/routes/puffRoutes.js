import express from 'express';
import { connectToMongoDB } from './mongoConfig.js';

const router = express.Router();

// Endpoint to save a single puff
router.post('/puff', async (req, res) => {
    const { timestamp, duration } = req.body;

    try {
        const db = await connectToMongoDB();
        const collection = db.collection('puffs');
        const result = await collection.insertOne({ timestamp, duration });
        res.status(201).send({ message: 'Puff saved successfully', _id: result.insertedId });
    } catch (error) {
        res.status(500).send({ message: 'Failed to save puff', error: error.message });
    }
});

// Endpoint to retrieve all puffs
router.get('/puffs', async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('puffs');
        const puffs = await collection.find({}).toArray();
        res.status(200).send(puffs);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve puffs', error: error.message });
    }
});

export default router;
