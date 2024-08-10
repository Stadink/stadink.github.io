import express from 'express';
import { connectToMongoDB } from './mongoConfig.js'
import { ObjectId } from 'mongodb';

const router = express.Router();

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
  const { correctWords, correctChars, incorrectChars, accuracy, timestamp } = req.body;
  if (correctWords === undefined || correctChars === undefined || incorrectChars === undefined || !timestamp) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  try {
    const db = await connectToMongoDB();
    const collection = db.collection('typeLog');
    const result = await collection.insertOne({ correctWords, correctChars, incorrectChars, accuracy, timestamp });
    res.status(201).send({ message: 'Typing session saved successfully', _id: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save typing session', error: error.message });
  }
});

// Endpoint to retrieve all typeLog docs
router.get('/typeLog', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('typeLog');
    const words = await collection.find({}).toArray();
    res.status(200).send(words);
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve typeLog', error: error.message });
  }
});

// PATCH Endpoint to update typing session log with a note
router.patch('/typeLog/:id', async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;

  if (!note) {
    return res.status(400).send({ message: 'Note is required' });
  }

  try {
    const db = await connectToMongoDB();
    const collection = db.collection('typeLog');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, // Use ObjectId to match MongoDB's ID format
      { $set: { note } } // $set operator to update the note field
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: 'Typing session not found' });
    }

    res.status(200).send({ message: 'Typing session updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to update typing session', error: error.message });
  }
});

export default router;
