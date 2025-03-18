// routes/sessions.js
import express from 'express';
import { connectToMongoDB } from './mongoConfig.js';

const router = express.Router();

// Endpoint to save a meditation session
router.post('/session', async (req, res) => {
    const { startTime, duration, note, eyeValue, concentrationValue, pauseValue } = req.body;

    try {
        const db = await connectToMongoDB();
        const collection = db.collection('sessions');
        const result = await collection.insertOne({
            startTime: new Date(startTime),
            duration: Number(duration),
            note: note || '',
            // Convert the slider values to numbers if they come as strings
            eyeValue: Number(eyeValue),
            concentrationValue: Number(concentrationValue),
            pauseValue: Number(pauseValue),
            createdAt: new Date()
        });
        res.status(201).send({ 
            message: 'Session saved successfully', 
            sessionId: result.insertedId 
        });
    } catch (error) {
        res.status(500).send({ 
            message: 'Failed to save session', 
            error: error.message 
        });
    }
});

// Endpoint to retrieve all sessions (sorted by latest first)
router.get('/sessions', async (req, res) => {
    try {
        const db = await connectToMongoDB();
        const collection = db.collection('sessions');
        const sessions = await collection.find({})
            .sort({ startTime: -1 }) // Newest first
            .toArray();
        
        res.status(200).send(sessions);
    } catch (error) {
        res.status(500).send({ 
            message: 'Failed to retrieve sessions', 
            error: error.message 
        });
    }
});

export default router;
