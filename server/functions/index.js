// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

// dotenv.config();

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/status', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  setInterval(() => {
    const data = JSON.stringify({ status: 'online' });
    res.write(`event: status\ndata: ${data}\n\n`);
  }, 1000);
});

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;

  // Generate a response with ChatGPT
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: false,
      messages: [{"role": "user", "content": prompt}],
      max_tokens: 100
    });
    res.send(completion.data.choices[0].message.content);
    console.log(completion.data.choices[0].message.content)
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating response");
  }
});

// Start the server
// const port = 8080;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

export const api = functions.https.onRequest(app);
