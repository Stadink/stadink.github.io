import admin from 'firebase-admin';
import express from 'express';
import { filesUpload } from './middleware.js'
import cors from "cors";
import OpenAI from "openai";
import fetch from 'node-fetch';
import { format } from 'date-fns';
import dotenv from "dotenv";

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
    console.log(imgUrl);

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

    res.status(200).send(publicUrl);
  } catch (error) {
    console.error('Failed to generate or save image:', error);
    res.status(500).send("Error generating or saving image");
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



export default router;
