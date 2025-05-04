import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import * as functions from "firebase-functions";
import fetch from 'node-fetch';
import OpenAI from "openai";

const router = express.Router();

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

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.API_KEY
});

async function connectToMongoDB() {
  try {
    await client.connect();
    return client.db('Hahahant'); // Use the Hahahant DB for Tarot
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// POST /tarot - Save a tarot question and answer
router.post('/tarot', async (req, res) => {
  const { question, card, cardName, cardMeaning, timestamp, prompt, answer } = req.body;
  if (!question || !card || !cardName || !timestamp) {
    return res.status(400).send({ message: 'Missing required fields' });
  }
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('Tarot');
    const doc = {
      question,
      card,
      cardName,
      cardMeaning,
      timestamp: new Date(Number(timestamp)),
      createdAt: new Date(),
      prompt: prompt || '',
      answer: answer || ''
    };
    const result = await collection.insertOne(doc);
    res.status(201).send({ message: 'Tarot question saved', _id: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save tarot question', error: error.message });
  }
});

// PATCH /tarot - Update the answer and prompt for a given timestamp
router.patch('/tarot', async (req, res) => {
  const { timestamp, prompt, answer } = req.body;
  if (!timestamp) {
    return res.status(400).send({ message: 'Missing timestamp' });
  }
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('Tarot');
    const result = await collection.updateOne(
      { timestamp: new Date(Number(timestamp)) },
      { $set: { prompt, answer, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).send({ message: 'No document found for this timestamp' });
    }
    res.status(200).send({ message: 'Tarot answer updated' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to update tarot answer', error: error.message });
  }
});

// Translation endpoint using OpenAI GPT
router.post('/translate', async (req, res) => {
  const { text, targetLang } = req.body;
  if (!text || !targetLang) {
    return res.status(400).send({ message: 'Missing text or targetLang' });
  }
  try {
    const OPENAI_API_KEY = process.env.API_KEY_DALLE || (functions.config().openai && functions.config().openai.key);
    if (!OPENAI_API_KEY) {
      return res.status(500).send({ message: 'OpenAI API key not configured' });
    }
    const prompt = `Translate the following text to ${targetLang}:
"""
${text}
"""`;
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        // model: 'gpt-3.5-turbo',
        model: 'gpt-4',
        messages: [
          { role: 'system', content: `You are a helpful translation assistant translating a tarot card reading from Hebrew to ${targetLang}.` },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    });
    if (!openaiRes.ok) {
      const errorText = await openaiRes.text();
      return res.status(500).send({ message: 'OpenAI API error', error: errorText });
    }
    const data = await openaiRes.json();
    const translation = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content
      ? data.choices[0].message.content.trim()
      : '';
    res.status(200).send({ translation });
  } catch (error) {
    res.status(500).send({ message: 'Translation failed', error: error.message });
  }
});

// GET /getHebrewAnswer - Stream a Hebrew tarot answer (200 tokens)
router.get('/getHebrewAnswer', async (req, res) => {
  const { prompt, timestamp } = req.query;

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });

  try {
    const stream = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ "role": "user", "content": prompt }],
      max_tokens: 200,
      stream: true,
    });

    let fullResponse = "";
    for await (const part of stream) {
      if (part.choices && part.choices[0] && part.choices[0].delta && part.choices[0].delta.content) {
        const content = part.choices[0].delta.content;
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }
    res.write('event: close\ndata: {}\n\n');
    res.end();
    // Optionally, save to MongoDB here if needed
  } catch (error) {
    console.error('Error during getHebrewAnswer:', error);
    res.status(500).send("Error generating response");
  }
});

export default router; 