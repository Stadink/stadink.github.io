import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import * as functions from "firebase-functions";

// Setup your MongoDB connection
const mongodbConfig = functions.config().mongodb;
const uri = mongodbConfig.uri;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const router = express.Router();

// Connect to the MongoDB database
async function connectToMongoDB() {
  try {
    await client.connect();
    return client.db('Dashboard'); // Use a dedicated DB for words
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Endpoint to save a word
router.post('/words', async (req, res) => {
  const { word } = req.body;
  if (!word) {
    return res.status(400).send({ message: 'Word is required' });
  }

  try {
    const db = await connectToMongoDB();
    const collection = db.collection('words');
    const result = await collection.insertOne({ word });
    res.status(201).send({ message: 'Word saved successfully', _id: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save word', error: error.message });
  }
});

// Endpoint to retrieve all words
router.get('/words', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('words');
    const words = await collection.find({}).toArray();
    res.status(200).send(words);
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve words', error: error.message });
  }
});

// Endpoint to save typing session log
router.post('/typeLog', async (req, res) => {
  const { correctWords, correctChars, incorrectChars, timestamp } = req.body;
  if (correctWords === undefined || correctChars === undefined || incorrectChars === undefined || !timestamp) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  try {
    const db = await connectToMongoDB();
    const collection = db.collection('typeLog');
    const result = await collection.insertOne({ correctWords, correctChars, incorrectChars, timestamp });
    res.status(201).send({ message: 'Typing session saved successfully', _id: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save typing session', error: error.message });
  }
});

export default router;
