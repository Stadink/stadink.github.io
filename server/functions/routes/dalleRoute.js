import admin from 'firebase-admin';
import express from 'express';
import { filesUpload } from './middleware.js'
import cors from "cors";
import OpenAI from "openai";
import fetch from 'node-fetch';
import { format } from 'date-fns';
import dotenv from "dotenv";
import { connectToMongoDB } from './mongoConfig.js'

dotenv.config()
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.API_KEY });

router.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // This is the URL of your front-end app
  optionsSuccessStatus: 200         // Some legacy browsers choke on 204
};

router.use(cors(corsOptions));

router.use(cors());

// router.use(multipartParser({
//   rawBodyOptions: {
//       limit: '10mb',  // Adjust the size limit as per your requirements
//   },
//   busboyOptions: {
//       limits: {
//           files: 1  // Limits the number of files in a single request
//       }
//   },
// }));


router.post("/dalle/new", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    });

    const imgUrl = response.data[0].url;

    // Fetch the image using node-fetch
    const imageResponse = await fetch(imgUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch the image');
    }

    // Read the image as a buffer
    const imageBuffer = await imageResponse.buffer();

    // Define a file name and path in Firebase Storage
    const now = new Date();
    const fileName = `dalle/${format(now, 'ddMMyyyy-HHmm')}.png`;
    const file = admin.storage().bucket().file(fileName);

    // Upload the buffer to Firebase Storage
    await file.save(imageBuffer, {
      metadata: {
        contentType: 'image/png'
      }
    });

    // Make the image publicly accessible
    await file.makePublic();

    // Get the public URL of the file
    const publicUrl = file.publicUrl();
    const url = decodeURIComponent(publicUrl)

    // Save the image URL and prompt in MongoDB
    const db = await connectToMongoDB();
    const collection = db.collection('visionBoard');
    await collection.insertOne({ prompt, url: url, timestamp: now });

    res.status(200).send({ url: publicUrl });
  } catch (error) {
    console.error('Failed to generate or save image:', error);
    res.status(500).send("Error generating or saving image");
  }
});

router.get("/visionBoard/imageWithPrompt", async (req, res) => {
  const { url } = req.query;

  try {
    const db = await connectToMongoDB();
    const collection = db.collection('visionBoard');

    // Find the document with the image name
    const imageDoc = await collection.findOne({ "url": url });

    if (!imageDoc) {
      return res.status(404).send({ message: 'Image not found' });
    }

    res.status(200).send(imageDoc);
  } catch (error) {
    console.error('Failed to fetch image with prompt:', error);
    res.status(500).send("Error fetching image with prompt");
  }
});


router.get('/visionBoard/promptByImageUrl', async (req, res) => {
  const { imageUrl } = req.query;

  try {
    // Extract the timestamp from the image URL
    const fileName = imageUrl.split('/').pop();  // Get the file name from the URL
    const [datePart, timePart] = fileName.replace('.png', '').split('-');

    // Convert the extracted parts into a Date object
    const day = parseInt(datePart.slice(0, 2));
    const month = parseInt(datePart.slice(2, 4)) - 1; // JavaScript months are 0-indexed
    const year = parseInt(datePart.slice(4, 8));
    const hours = parseInt(timePart.slice(0, 2));
    const minutes = parseInt(timePart.slice(2, 4));

    const imageTimestamp = new Date(year, month, day, hours, minutes);

    // Adjust the search range to account for possible time drift or delays
    const searchRange = 5 * 60 * 1000; // +/- 5 minutes
    const lowerBound = new Date(imageTimestamp.getTime() - searchRange);
    const upperBound = new Date(imageTimestamp.getTime() + searchRange);

    const db = await connectToMongoDB();
    const collection = db.collection('visionBoard');

    // Find the prompt document where the timestamp is within the search range
    const matchingPrompt = await collection.findOne({
      timestamp: { $gte: lowerBound, $lte: upperBound }
    });

    if (!matchingPrompt) {
      return res.status(404).send({ message: 'No matching prompt found' });
    }

    res.status(200).send(matchingPrompt);
  } catch (error) {
    console.error('Error fetching prompt by image URL:', error);
    res.status(500).send({ message: 'Failed to fetch prompt by image URL', error: error.message });
  }
});



// Function to list files in a specific folder in Firebase Storage
async function listFilesInFolder(folderPath) {
  const bucket = admin.storage().bucket();
  const [files] = await bucket.getFiles({
    prefix: folderPath,
    delimiter: '/' // Delimiter to prevent listing of subfolder contents
  });

  return files.map(file => ({
    name: file.name,
    url: `https://storage.googleapis.com/${bucket.name}/${file.name}`
  }));
}

// Endpoint to list all files in 'dalle/' folder
router.get("/dalle/files", async (req, res) => {
  try {
    const files = await listFilesInFolder('dalle/');
    res.status(200).json({ files });
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).send("Failed to list files");
  }
});

router.post("/dalle/upload", filesUpload, async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No file uploaded.');
  }

  const file = req.files[0];
  const bucket = admin.storage().bucket();
  const now = new Date();
  const fileName = `dalle/${format(now, 'ddMMyyyy-HHmm')}-${file.originalname}`;
  const firebaseFile = bucket.file(fileName);

  try {
    await firebaseFile.save(file.buffer, {
      metadata: {
        contentType: file.mimetype
      }
    });

    await firebaseFile.makePublic();
    const publicUrl = firebaseFile.publicUrl();
    res.status(200).send({ url: publicUrl });
  } catch (error) {
    console.error('Failed to upload image:', error);
    res.status(500).send("Error uploading image");
  }
});

router.post("/visionBoard/savePrompt", async (req, res) => {
  try {
    const item = req.body
    const insertedId = await savePrompt(item)
    res.status(200).send({ message: 'Prompt saved', _id: insertedId })
  } catch (error) {
    res.status(500).send({message: 'Failed to save prompt', error: error.message})
  }
})

const savePrompt = async (item) => {
  try {
    const db = await connectToMongoDB()
    const collection = db.collection('visionBoard')

    const timestamp = new Date()
    item.timestamp = timestamp

    const result = await collection.insertOne(item)
    console.log('doc inserted with _id: ', result.insertedId)
  } catch (error) {
      console.error("Error saving prompt: ", error)
      throw error
  }
}

router.get('/visionBoard/latestPrompt', async (req, res) => {
  try {
    const db = await connectToMongoDB()
    const collection = db.collection('visionBoard')

    const latestPrompt = await collection.find().sort({ _id: -1 }).limit(1).toArray()

    if (latestPrompt.length === 0) {
      return res.status(404).send({ message: 'No prompts found' });
    }

    res.status(200).send(latestPrompt[0])
  } catch (error) {
    res.status(500).send({ message: 'Failed to get latest prompt', error: error.message })
  }
})


router.get('/visionBoard/settings', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection('visionBoard');

    // Fetch the settings document with the _id "settings"
    const settings = await collection.findOne({ _id: "settings" });

    // Check if the settings document exists and has a non-empty URL
    if (!settings || !settings.url) {
      return res.status(404).send({ message: 'No settings found' });
    }

    // Send the settings document as the response
    res.status(200).send(settings);
  } catch (error) {
    res.status(500).send({ message: 'Failed to get settings', error: error.message });
  }
});

router.post('/visionBoard/settings', async (req, res) => {
  const { url } = req.body;

  try {
    const db = await connectToMongoDB();
    const collection = db.collection('visionBoard');

    // Update the settings document with the new URL
    const result = await collection.updateOne(
      { _id: "settings" },
      { $set: { url: url } },
      { upsert: true } // Creates the document if it doesn't exist
    );

    if (result.modifiedCount === 0 && result.upsertedCount === 0) {
      return res.status(500).send({ message: 'Failed to update settings' });
    }

    res.status(200).send({ message: 'Daily picture set successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to set daily picture', error: error.message });
  }
});


export default router;
