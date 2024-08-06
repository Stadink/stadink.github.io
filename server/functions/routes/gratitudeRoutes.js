import * as functions from "firebase-functions";
import express from 'express';
const router = express.Router();
import { ObjectId } from 'mongodb';

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

async function connectToMongoDB() {
  try {
    await client.connect();
    return client.db('Dashboard');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

const saveGratitudeItem = async (item) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('gratitude');

    // Add timestamp to the item
    const timestamp = new Date();
    item.timestamp = timestamp;

    // Get the start and end of the day
    const startOfDay = new Date(timestamp);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(timestamp);
    endOfDay.setHours(23, 59, 59, 999);

    // Find the item with the highest orderIndex for the same day
    const highestOrderItem = await collection.findOne(
      {
        timestamp: { $gte: startOfDay, $lte: endOfDay },
        token: item.token
      },
      {
        sort: { orderIndex: -1 }
      }
    );

    // Set the orderIndex for the new item
    const newOrderIndex = highestOrderItem ? highestOrderItem.orderIndex + 1 : 1;
    item.orderIndex = newOrderIndex;

    // Insert the new item
    const result = await collection.insertOne(item);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return result.insertedId;
  } catch (error) {
    console.error('Error saving gratitude item:', error);
    throw error;
  }
};


router.post('/save', async (req, res) => {
  try {
    const item = req.body;
    const insertedId = await saveGratitudeItem(item);
    res.status(200).send({ message: 'Gratitude item saved successfully', _id: insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save gratitude item', error: error.message });
  }
});

const getGratitudeItemsForDate = async (token, date) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('gratitude');

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const query = {
      timestamp: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      token: token,
    };

    const items = await collection.find(query).sort({ orderIndex: 1 }).toArray();
    return items;
  } catch (error) {
    console.error('Error retrieving gratitude items for date:', error);
    throw error;
  }
};


router.get('/gratitude/date', async (req, res) => {
  try {
    const token = req.query.token;
    const date = new Date(req.query.date);

    if (!token || !date) {
      return res.status(400).send({ message: 'Token and date are required' });
    }

    const items = await getGratitudeItemsForDate(token, date);
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve gratitude items for date', error: error.message });
  }
});


// Endpoint to get all gratitude items with token from today
router.get('/gratitude/today', async (req, res) => {
  try {
    // Extract token from query parameters
    const token = req.query.token;

    if (!token) {
      return res.status(401).send({ message: 'Token is required' });
    }

    const items = await getTodaysGratitudeItems(token);
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve today\'s gratitude items', error: error.message });
  }
});

// Gratitude Dashboard Function to save a note
const saveGratitudeNote = async (_id, note, token) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('gratitude');

    // to get rid of save not working if note the same 🤔
    // // Check if the new note is different from the existing note
    // const existingDocument = await collection.findOne({ _id: new ObjectId(_id), token: token });

    // if (!existingDocument) {
    //   throw new Error('No matching document found or token mismatch.');
    // }

    // if (existingDocument.note === note) {
    //   console.log(`Note for document with _id: ${_id} is the same. Skipping update.`);
    //   return { matchedCount: 1, modifiedCount: 0 }; // Consider it a success to match the frontend logic
    // }

    // Update the document with the new note
    const result = await collection.updateOne(
      { _id: new ObjectId(_id), token: token }, // ensure that the token matches for security purposes
      { $set: { note: note } },
      { upsert: false } // do not create a new document if the id does not exist
    );
    
    if (result.matchedCount === 0) {
      throw new Error('No matching document found or token mismatch.');
    }

    console.log(`A document with _id: ${_id} was updated with a new note.`);
    return result;
  } catch (error) {
    console.error('Error saving gratitude note:', error);
    throw error;
  }
};

// Endpoint to save a gratitude note
router.post('/gratitude/note', async (req, res) => {
  try {
    const { _id, note, token } = req.body;
    console.log('id note token: ', _id, note, token)

    // Validate the input
    if (!_id || !note || !token) {
      return res.status(400).send({ message: 'Missing _id, note, or token in request body' });
    }

    const result = await saveGratitudeNote(_id, note, token);
    if (result.modifiedCount === 1) {
      res.status(200).send({ message: 'Gratitude note saved successfully' });
    } else {
      res.status(404).send({ message: 'Gratitude note not found or token mismatch' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Failed to save gratitude note', error: error.message });
  }
});

router.post('/update-order', async (req, res) => {
  try {
    const { items, token } = req.body;

    // Update each item with the new orderIndex
    const db = await connectToMongoDB();
    const collection = db.collection('gratitude');

    for (const item of items) {
      await collection.updateOne(
        { _id: new ObjectId(item._id), token: token },
        { $set: { orderIndex: item.orderIndex } }
      );
    }

    res.status(200).send({ message: 'Order indexes updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to update order indexes', error: error.message });
  }
});

const updateGratitudeItemColor = async (_id, colorHighlight, token) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('gratitude');

    const result = await collection.updateOne(
      { _id: new ObjectId(_id), token: token },
      { $set: { colorHighlight: colorHighlight } },
      { upsert: false } // Do not create a new document if the id does not exist
    );

    if (result.matchedCount === 0) {
      throw new Error('No matching document found or token mismatch.');
    }

    console.log(`A document with _id: ${_id} was updated with a new color highlight.`);
    return result;
  } catch (error) {
    console.error('Error updating gratitude item color:', error);
    throw error;
  }
};

router.post('/gratitude/color', async (req, res) => {
  try {
    const { _id, colorHighlight, token } = req.body;

    if (!_id || !colorHighlight || !token) {
      return res.status(400).send({ message: 'Missing _id, colorHighlight, or token in request body' });
    }

    const result = await updateGratitudeItemColor(_id, colorHighlight, token);
    if (result.modifiedCount === 1) {
      res.status(200).send({ message: 'Gratitude item color updated successfully' });
    } else {
      res.status(404).send({ message: 'Gratitude item not found or token mismatch' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Failed to update gratitude item color', error: error.message });
  }
});




export default router;
