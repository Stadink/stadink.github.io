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
    return client.db('Dashboard'); // Use a dedicated DB for chemicals
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Endpoint to save a chemical
router.post('/chemicals', async (req, res) => {
  const { name, formula } = req.body;
  if (!name || !formula) {
    return res.status(400).send({ message: 'Both name and formula are required' });
  }

  try {
    const db = await connectToMongoDB();
    const collection = db.collection('chemicals');
    const result = await collection.insertOne({ name, formula });
    res.status(201).send({ message: 'Chemical saved successfully', _id: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save chemical', error: error.message });
  }
});

// Endpoint to retrieve all chemicals
router.get('/chemicals', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('chemicals');
    const chemicals = await collection.find({}).toArray();
    res.status(200).send(chemicals);
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve chemicals', error: error.message });
  }
});

export default router;
