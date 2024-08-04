import { MongoClient, ServerApiVersion } from 'mongodb';
import * as functions from "firebase-functions";
import dotenv from "dotenv";
import * as fs from 'fs';

// Load config
const mongodbConfig = functions.config().mongodb;
const uri = mongodbConfig.uri;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    return client.db('Dashboard');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

const updateOrderIndexes = async () => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('gratitude');

    const items = await collection.find({}).sort({ timestamp: 1 }).toArray();

    // Group items by date
    const itemsByDate = items.reduce((acc, item) => {
      const date = new Date(item.timestamp).toISOString().split('T')[0]; // Get date part only
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});

    // Update items with orderIndex for each date group
    for (const date in itemsByDate) {
      const dateItems = itemsByDate[date];
      for (let index = 0; index < dateItems.length; index++) {
        await collection.updateOne(
          { _id: dateItems[index]._id },
          { $set: { orderIndex: index + 1 } } // Order index starting from 1
        );
      }
    }

    console.log('Order indexes initialized for all items by date.');
  } catch (error) {
    console.error('Error updating order indexes:', error);
  } finally {
    await client.close();
  }
};

updateOrderIndexes();
