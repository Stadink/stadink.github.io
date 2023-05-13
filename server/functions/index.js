import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

import admin from 'firebase-admin';
import firebaseConfig from './firebase-adminsdk.js';

dotenv.config(); 
const app2 = admin.initializeApp(firebaseConfig);
const db = admin.firestore(app2);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// let serverStatus = "unknown";
app.get("/status", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });
  
  const sendStatus = () => {
    const data = JSON.stringify({ status: "online" });
    res.write(`event: status\ndata: ${data}\n\n`);
  }
  
  // Send the initial status
  sendStatus();
  
  // Update the server status every 5 seconds
  const intervalId = setInterval(() => {
    sendStatus();
  }, 5000);
  
  // Stop updating the status when the client disconnects
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});


app.get("/test", async (req, res) => {
  // firebase.auth().currentUser
  try {
    const docRef = db.collection("test").doc("testDoc");
    const docData = (await docRef.get()).data();
    res.send(docData);
    res.send('IT WORKS');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/testSave", async (req, res) => {
  try {
    saveReply('WTF', 'WORK OMG')
    res.send('Saved, all good')
  } catch (error) {
    console.error(error);
    res.send(error)
    res.status(500).send("Error generating response");
  }
});
  
const saveReply = async (prompt, reply) => {
  const docRef = db.collection('GPT').doc('log');
  const date = new Date();
  date.setHours(date.getHours() + 2);
  const timestamp = date.toLocaleString();
  const unixTime = Math.floor(new Date().getTime() / 1000);

  const payload = {
    [`${prompt} | ${unixTime}`]: {
      info: reply, 
      time: timestamp
    }
  };
  await docRef.update(payload);
}

// Set up the ChatGPT endpoint
app.get('/chat', async (req, res) => {
  const { prompt } = req.query;

    // Send the headers for Server-Sent Events
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });

  // Generate a response with ChatGPT
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": prompt }],
      max_tokens: 100,
      stream: true,
    }, { responseType: 'stream' });

    completion.data.on('data', data => {
      const lines = data.toString().split('\n').filter(line => line.trim() !== '');
      for (const line of lines) {
        const message = line.replace(/^data: /, '');
        if (message === '[DONE]') {
          // Stream finished, send the closing event to the client
          res.write(`event: close\ndata: {}\n\n`);
          res.end();
          return; // Stream finished
        }
        try {
          const parsed = JSON.parse(message);
          const content = parsed.choices[0].delta.content;
          console.log(content)
          // Send the response to the client using Server-Sent Events
          res.write(`event: message\ndata: ${JSON.stringify({ content })}\n\n`);
        } catch (error) {
          console.error('Could not JSON parse stream message', message, error);
        }
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating response");
  }
});


export const api = functions.https.onRequest(app);
