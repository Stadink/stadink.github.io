import * as functions from "firebase-functions";

import { MongoClient, ServerApiVersion } from 'mongodb';

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

export async function connectToMongoDB() {
  try {
    await client.connect();
    return client.db('Dashboard');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
