import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages) {
    return res.status(400).json({ error: 'No messages provided' });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 512,
      temperature: 0.7,
    });
    res.json({ result: completion.choices[0].message });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`OpenAI chat server running on port ${PORT}`);
});
