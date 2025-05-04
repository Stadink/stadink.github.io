// routes/sessions.js
import express from 'express';
import { connectToMongoDB } from './mongoConfig.js';
import * as functions from "firebase-functions";
import fetch from 'node-fetch';

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

// Endpoint to generate a motivation using OpenAI GPT
router.post('/motivation', async (req, res) => {
    const DEFAULT_PROMPT = "I am about to do a strong determination sitting meditation session for 60 minutes. Empower me to do it in the most powerful way. Remind me how to do that, why to do that, how to deal with the pain, etc. etc.";
    const prompt = req.body.prompt || DEFAULT_PROMPT;
    try {
        const OPENAI_API_KEY = process.env.API_KEY_DALLE || (functions.config().openai && functions.config().openai.key);
        if (!OPENAI_API_KEY) {
            return res.status(500).send({ message: 'OpenAI API key not configured' });
        }
        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are a wise and motivating meditation coach. Give concise, powerful, and practical motivation for strong determination sitting meditation.' },
                    { role: 'user', content: prompt },
                ],
                max_tokens: 200,
                temperature: 0.8,
            }),
        });
        if (!openaiRes.ok) {
            const errorText = await openaiRes.text();
            return res.status(500).send({ message: 'OpenAI API error', error: errorText });
        }
        const data = await openaiRes.json();
        const motivation = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content
            ? data.choices[0].message.content.trim()
            : '';
        res.status(200).send({ motivation });
    } catch (error) {
        res.status(500).send({ message: 'Failed to generate motivation', error: error.message });
    }
});

export default router;
