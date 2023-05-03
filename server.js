const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
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

  try {
    setInterval(() => {
      const data = JSON.stringify({ status: 'online' });
      res.write(`event: status\ndata: ${data}\n\n`);
    }, 1000);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating response");
  }
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
const port = 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});