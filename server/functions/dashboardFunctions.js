// dashboardFunctions.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const dashboardApp = express();
dashboardApp.use(cors({ origin: true }));
dashboardApp.use(bodyParser.json());

// MongoDB client setup
const uri = "mongodb+srv://hehehe"; // Ensure you set this in your environment configuration
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectToMongoDB = async () => {
  if (!db) {
    try {
      await client.connect();
      db = client.db('Dashboard');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error; // Throwing an error to stop the execution if the database connection fails
    }
  }
};

// Gratitude Dashboard Function
const saveGratitudeItem = async (item) => {
  try {
    await connectToMongoDB(); // Ensure we have a database connection
    const collection = db.collection('gratitude');
    const result = await collection.insertOne(item);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return result.insertedId;
  } catch (error) {
    console.error('Error saving gratitude item:', error);
    throw error;
  }
};

dashboardApp.post('/save', async (req, res) => {
  try {
    const gratitudeItem = req.body;
    const insertedId = await saveGratitudeItem(gratitudeItem);
    res.status(200).send({ message: 'Gratitude item saved successfully', _id: insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save gratitude item', error: error.message });
  }
});

export default dashboardApp;
