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
// Cross-origin resource sharing
app.use(cors());

// let serverStatus = "unknown";
// won't work with firebase
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
  
const saveReply = async (prompt, reply, timestamp) => {
  const docRef = db.collection('GPT').doc('questionsLog').collection('answers').doc(timestamp)
  const date = new Date();
  date.setHours(date.getHours() + 2);

  const regexPattern = /«(.*?)»/;
  const questionMatch = prompt.match(regexPattern);
  const question = questionMatch ? questionMatch[1] : null;

  const payload = {
      prompt: prompt, 
      reply: reply,
  };
  await docRef.set(payload, {merge: true});
}

const saveThemeChanged = async (timestamp) => {
  const docRef = db.collection('GPT').doc('questionsLog').collection('answers').doc(timestamp)
  const payload = {
    themeChanged: true
  }

  await docRef.update(payload);
}

const saveIP = async (timestamp, ip) => {
  const docRef = db.collection('GPT').doc('questionsLog').collection('answers').doc(timestamp)
  const payload = {
    ip: ip
  }

  await docRef.update(payload);
}

const saveQuestion = async (prompt, timestamp) => {
  const unixTime = timestamp

  const date = new Date();
  date.setHours(date.getHours() + 2);
  const dateTime = date.toLocaleString();

  const regexPattern = /«(.*?)»/;
  const questionMatch = prompt.match(regexPattern);
  const question = questionMatch ? questionMatch[1] : null;

  const docRef = db.collection('GPT').doc('questionsLog');
  const answerDocRef = db.collection('GPT').doc('questionsLog').collection('answers').doc(timestamp)
  const payload = {
    [`${unixTime}`]: {
      question: question,
      time: dateTime
    }
  };
  await docRef.update(payload);
  await answerDocRef.set({time: dateTime, question: question}, { merge: true })
}

// Set up the ChatGPT endpoint
app.get('/chat', async (req, res) => {
  const { prompt, timestamp } = req.query;
  // const ipAddress = req.socket.remoteAddress;
  // const ipAddresses = req.ip;
  // const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
  console.log("IP IS: " + ipAddress);
  saveQuestion(prompt, timestamp);

    // Send the headers for Server-Sent Events
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });

  // Generate a response with ChatGPT
  try {
    const completion = await openai.createChatCompletion({
      // model: "gpt-4",
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": prompt }],
      max_tokens: 100,
      stream: true,
    }, { responseType: 'stream' });

    let answer = '';
    completion.data.on('data', data => {
      const lines = data.toString().split('\n').filter(line => line.trim() !== '');
      for (const line of lines) {
        const message = line.replace(/^data: /, '');
        if (message === '[DONE]') {
          // Stream finished, send the closing event to the client
          res.write(`event: close\ndata: {}\n\n`);
          res.end();
          answer = answer.replace('undefined', ''); // temp solution heh
          answer = answer.replace('undefined', '');
          saveReply(prompt, answer, timestamp);
          return; // Stream finished
        }
        try {
          const parsed = JSON.parse(message);
          const content = parsed.choices[0].delta.content;
          answer += content;
          console.log(content)
          // Send the response to the client using Server-Sent Events
          res.write(`event: message\ndata: ${JSON.stringify({ content })}\n\n`);
        } catch (error) {
          console.error('Could not JSON parse stream message', message, error);
        }
      }
      saveIP(timestamp, ipAddress);
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating response");
  }
});

app.get("/setThemeChanged", async (req, res) => {
  const { timestamp } = req.query
  saveThemeChanged(timestamp)
  res.send('mkay')
});

app.get("/chatNoStream", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.query;
  const timestamp = new Date().getTime().toString(); 

  saveQuestion(`«${prompt}»`, timestamp)

  // Generate a response with ChatGPT
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: false,
      messages: [{"role": "user", "content": prompt}],
      max_tokens: 200
    });
    const answer = completion.data.choices[0].message.content
    const response = { answer: answer };
    res.json(response);
    saveReply(prompt, answer, timestamp)
    console.log(answer)
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating response");
  }
});


export const api = functions.https.onRequest(app);
