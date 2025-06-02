import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";
import axios from 'axios'

import admin from 'firebase-admin';
import firebaseConfig from './firebase-adminsdk.js';

import gratitudeRoutes from './routes/gratitudeRoutes.js';
import chemicalsRoutes from './routes/chemicalsRoutes.js'
import dalleRoutes from './routes/dalleRoute.js'
import typerRoutes from './routes/typerRoutes.js'
import neuroRoutes from './routes/neuroRoutes.js'
import puffRoutes from './routes/puffRoutes.js'
import notificationsRoutes from './routes/notificationsRoutes.js'
import bdsdsmRoutes from './routes/bdsdsmRoutes.js'

import pollyRoutes from './routes/pollyRoutes.js'
import stripeRouter from './routes/stripeRoutes.js';

import miBandRoutes from './routes/miBandRoutes.js';



dotenv.config(); 
const app2 = admin.initializeApp(firebaseConfig);
const db = admin.firestore(app2);

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
  // const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
  // const openai = new OpenAI({apiKey: process.env.API_KEY });

  const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.API_KEY
});

// Set up the server
const app = express();
app.use(bodyParser.json());
// Cross-origin resource sharing
app.use(cors());

app.use(gratitudeRoutes)
app.use(chemicalsRoutes)
app.use(dalleRoutes)
app.use(typerRoutes)
app.use(neuroRoutes)
app.use(puffRoutes)
app.use(notificationsRoutes)
app.use(bdsdsmRoutes)
app.use(pollyRoutes)
app.use('/stripe', stripeRouter);
app.use('/miBand', miBandRoutes);
const TIMEZONE = 'Europe/Prague';

export const scheduledNotification = functions.pubsub.schedule('every day 9:30')
  .timeZone(TIMEZONE) // Set the timezone to your preferred timezone
  .onRun(async (context) => {
    // Define your notification data
    const notificationData = {
      token: 'd5_xHLKoTIiNTXkOvl8UKV:APA91bGuGI_H8SJvpEz0I3p8q8sJW5rAcfVF9eICDjEKcQyAun_bdE3DGG-fatNPdcVPZ0FVobUiO_fiCP1y8uj3mp6pA-2reYFSBRLh-IqLTq16dktW8fnaig5jB4GLxhG-Q0YDQwn6',
      title: 'Yo',
      body: 'kick_ass()'
    };

    // Call the send-notification endpoint
    try {
      const response = await axios.post('https://server-e4273.web.app/send-notification', notificationData);
      console.log('Notification sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }

    return null;
  });

app.post('/send-notification', (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    notification: {
      title,
      body,
    },
    token: token,
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
      res.status(200).send('Notification sent successfully');
    })
    .catch((error) => {
      console.log('Error sending message:', error);
      res.status(500).send(`Error sending notification: ${error.message}`);
    });
});

export const scheduledNotification2 = functions.pubsub.schedule('every 15 minutes')
  .timeZone(TIMEZONE) // Set the timezone to your preferred timezone
  .onRun(async (context) => {
    // Define your notification data
    const token = {
      token: 'd5_xHLKoTIiNTXkOvl8UKV:APA91bGuGI_H8SJvpEz0I3p8q8sJW5rAcfVF9eICDjEKcQyAun_bdE3DGG-fatNPdcVPZ0FVobUiO_fiCP1y8uj3mp6pA-2reYFSBRLh-IqLTq16dktW8fnaig5jB4GLxhG-Q0YDQwn6',
    };

    // Call the send-notification endpoint
    try {
      const response = await axios.post('https://server-e4273.web.app/send-random-word-notification', token);
      console.log('Notification sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending notification:', error);
    }

    return null;
  });

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

const saveQuestion = async (prompt, timestamp, gpt4=false) => {
  const unixTime = timestamp

  const date = new Date();
  date.setHours(date.getHours() + 2);
  const dateTime = date.toLocaleString();

  const regexPattern = /«(.*?)»/;
  const questionMatch = prompt.match(regexPattern);
  let question = questionMatch ? questionMatch[1] : null;
  if (gpt4) {
    question = '(GPT4) ' + question
  }

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

app.get('/chatNew', async (req, res) => {
  const { prompt, timestamp } = req.query;
  const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress || 'idk';

  // Send the headers for Server-Sent Events
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });

  try {
    const stream = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ "role": "user", "content": prompt }],
      max_tokens: 100,
      stream: true,
    });

    let fullResponse = "";  // Accumulate the full response

    for await (const part of stream) {
      if (part.choices && part.choices[0] && part.choices[0].delta && part.choices[0].delta.content) {
        const content = part.choices[0].delta.content;
        fullResponse += content;  // Append the content to the full response
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // Once the stream is complete, handle post-processing
    res.write('event: close\ndata: {}\n\n');
    res.end();

    // Save the entire conversation after the stream has ended
    if (fullResponse) {
      saveReply(prompt, fullResponse, timestamp);
    }
    saveIP(timestamp, ipAddress);

  } catch (error) {
    console.error('Error during chat generation:', error);
    res.status(500).send("Error generating response");
  }
});

// Set up the ChatGPT endpoint
app.get('/chat', async (req, res) => {
  const { prompt, timestamp } = req.query;
  // const ipAddress = req.socket.remoteAddress;
  // const ipAddresses = req.ip;
  // const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
  saveQuestion(prompt, timestamp);

    // Send the headers for Server-Sent Events
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });

  // Generate a response with ChatGPT
  try {
    const completion = await openai.openai.chat.completions.create({
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

app.get('/chat4', async (req, res) => {
  const { prompt, timestamp } = req.query;
  // const ipAddress = req.socket.remoteAddress;
  // const ipAddresses = req.ip;
  // const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
  saveQuestion(prompt, timestamp, true);

    // Send the headers for Server-Sent Events
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });

  // Generate a response with ChatGPT
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      // model: "gpt-3.5-turbo",
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

app.post("/receiveNumber", async (req, res) => {
  const { number } = req.body;
  const timestamp = Date.now(); // Unix timestamp
  const readableTimestamp = new Date(timestamp).toISOString(); // Convert to ISO 8601 format

  try {
    // Save the number to the document with ID 1234
    const docRef1234 = db.collection('LOC').doc('1234');
    await docRef1234.set({ number: number }, { merge: true });

    // Append the number with timestamp to the Log document
    const entriesRef = db.collection('LOC').doc('Log').collection('Entries');
    await entriesRef.doc(String(timestamp)).set({ number: number, timestamp: readableTimestamp });

    console.log(`Number saved to document 1234 and appended to Log`);
    res.status(200).send(`Number received and saved to document 1234 and appended to Log`);
  } catch (error) {
    console.error('Error saving number to Firestore:', error);
    res.status(500).send('Internal Server Error');
  }
});

export const api = functions.https.onRequest(app);
