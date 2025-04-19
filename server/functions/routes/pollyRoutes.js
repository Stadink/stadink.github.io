import express from 'express';
import AWS from 'aws-sdk'

const router = express.Router();

AWS.config.update({
  accessKeyId: process.env.POLLY_ACCESS,        // Set in your environment
  secretAccessKey: process.env.POLLY_SECRET, // Set in your environment
  region: 'eu-central-1'                                 // Choose your region
});

const polly = new AWS.Polly();

router.get('/synthesize', async (req, res) => {
  const text = req.query.text || 'Hello, world!';
  const params = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Maxim' // You can choose any available voice
  };

  try {
    const data = await polly.synthesizeSpeech(params).promise();
    // Set proper headers
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-Length': data.AudioStream.length
    });
    // Send audio stream as response
    res.end(data.AudioStream);
  } catch (err) {
    console.error('Error synthesizing speech:', err);
    res.status(500).json({ error: 'Error synthesizing speech' });
  }
});

export default router;