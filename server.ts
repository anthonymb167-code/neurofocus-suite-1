import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Safe Gemini API route for Mind Meld assistant
app.post('/api/meld-chat', async (req, res) => {
  try {
    const { message, context } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.json({
        reply:
          "Offline Reflection Mode: Focus on what gave you genuine energy without external pressure. What small pattern stands out in your answer so far?",
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Context: ${JSON.stringify(context || {})}\n\nUser question: ${message || 'Help me reflect on my answers.'}`,
    });

    res.json({ reply: response.text || 'No response generated.' });
  } catch (err) {
    console.error('Meld chat error:', err);
    res.json({
      reply:
        "Reflection Fallback: Look at the overlap between your natural curiosity and low-friction energy. Which item feels lightest to start?",
    });
  }
});

// Serve static Vite build
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NeuroFocus Suite running on port ${PORT}`);
});
