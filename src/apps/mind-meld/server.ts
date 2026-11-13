import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  const MELD_SYSTEM_PROMPT = `You are the Meld Assistant, an embedded cognitive catalyst and reflective partner within the Mind Meld app.

### Core Purpose
Your objective is to help lost, overwhelmed, or directionless individuals navigate back to their "Optimal Self." You guide users through the 4-Filter Diagnostic Journey (Psychology, Science, Randomness, Intuition) to collapse mental entropy and isolate their true Anchor Vector while gently neutralizing status traps, ego-driven validation seeking, and self-deception.

### Key Persona & Voice
- Tone: Grounded, sharp, warm, and deeply perceptive—like a brilliant peer or trusted mentor who sees through fluff with zero judgment.
- Style: Direct and concise. Avoid robotic setups, meta-announcements, and superficial cheerleading. Speak directly to the core of what the user shares.
- Pacing: One diagnostic filter or question focus at a time. Never overwhelm an already lost user with multiple deep prompts at once.

### Operational Rules
1. The Anonymity & Authenticity Filter (Priority Rule): Continuously evaluate responses for signs of Status Traps (goals driven by public validation or prestige). Challenge with the Anonymity Test: "If you built this completely in secret and no one ever knew your name, would you still dedicate your morning peak hours to it?"
2. Pattern Challenge & Friction Probing: When answers are vague, probe specifically for empirical friction and behavioral evidence.
3. Respecting Science & Empirical Constraints: Ground users in biological realities (chronotypes, peak focus windows, baseline skills).
4. Deploying Controlled Randomness: If the user gets stuck in an overthinking loop, trigger a Stochastic Break (random physical constraint or perspective flip).
5. Cross-Species Perceptual Restructuring: When a user is trapped in a narrow "human" perspective (e.g. obsessing over social opinion, surface friction, or circular logic), deploy a Cross-Species Sensor Flip (e.g., feline slit aperture diffraction revealing hard cuboid edges, avian magnetic vector alignment, viper thermal heat vs cold status traps, insectoid UV landing strips). Challenge them to stitch multiple biological sensor feeds into a single compact intuition vector.

### Response Structure Guidelines
1. Direct Reflection (1–2 sentences): Reflect the essence, stripping away noise.
2. Diagnostic Inquiry (Single focus): Deliver the single next diagnostic question, prompt, or challenge.
3. Zero Filler: End clean on the prompt. No closing summary phrases.`;

  // API Route: Meld Assistant Chat
  app.post('/api/meld-chat', async (req, res) => {
    try {
      const { message, history = [], userContext = {} } = req.body;

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      if (ai) {
        // Build conversational contents
        const contents = [
          {
            role: 'user',
            parts: [
              {
                text: `${MELD_SYSTEM_PROMPT}\n\n[USER CONTEXT: Active Candidate Vector: "${userContext.candidatePurpose || 'Unset'}", Answered Questions: ${userContext.answeredCount || 0}/12, DVI: ${userContext.dvi || 'Unset'}]`,
              },
            ],
          },
          {
            role: 'model',
            parts: [
              {
                text: "Understood. I am calibrated as the Meld Assistant. I will strip the noise, challenge status traps with the Anonymity Filter, and guide the user one step at a time.",
              },
            ],
          },
        ];

        // Append recent history
        history.slice(-6).forEach((h: { sender: string; text: string }) => {
          contents.push({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          });
        });

        // Append current message
        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents,
          config: {
            temperature: 0.7,
            maxOutputTokens: 350,
          },
        });

        res.json({ reply: response.text });
        return;
      }

      // Fallback local heuristic engine if API key is not supplied
      const reply = generateLocalMeldReflection(message, history, userContext);
      res.json({ reply });
    } catch (error: any) {
      console.error('Meld chat error:', error);
      // Graceful fallback response
      const fallback = generateLocalMeldReflection(req.body.message || '', req.body.history || [], req.body.userContext || {});
      res.json({ reply: fallback });
    }
  });

  // Local intelligent reflection engine
  function generateLocalMeldReflection(msg: string, hist: any[], ctx: any): string {
    const lower = msg.toLowerCase();

    // Check for status trap / social validation keywords
    if (
      lower.includes('follower') ||
      lower.includes('linkedin') ||
      lower.includes('famous') ||
      lower.includes('recognition') ||
      lower.includes('influence') ||
      lower.includes('status') ||
      lower.includes('audience')
    ) {
      return `That craving for a public scoreboard is the static talking—it's trying to purchase self-worth with external applause. Let's run the Anonymity Filter: If you built this completely in secret and no one ever knew your name, would you still dedicate your morning peak hours to it?`;
    }

    // Check for overwhelm / lost / burnout
    if (
      lower.includes('lost') ||
      lower.includes('overwhelm') ||
      lower.includes('burnout') ||
      lower.includes('stuck') ||
      lower.includes('exhausted') ||
      lower.includes('blank')
    ) {
      return `When the mind feels blank or stuck, it's usually in self-protection mode after surviving under heavy expectations. Let's drop future planning entirely. In the last 30 days, what was a single moment—even five quiet minutes—where your shoulders actually dropped and background noise stopped?`;
    }

    // Check for skills / work / craft
    if (
      lower.includes('code') ||
      lower.includes('build') ||
      lower.includes('write') ||
      lower.includes('design') ||
      lower.includes('system') ||
      lower.includes('engineer') ||
      lower.includes('analyze')
    ) {
      return `That is a clean kinetic signal: your nervous system engages when you are shaping structural systems rather than managing social impressions. What is the hard biological constraint right now—what specific hours of the day does your executive focus peak?`;
    }

    // Cross-Species Sensor Flip / Slit Aperture / 1% Simulation probe
    if (
      lower.includes('species') ||
      lower.includes('feline') ||
      lower.includes('slit') ||
      lower.includes('aperture') ||
      lower.includes('avian') ||
      lower.includes('viper') ||
      lower.includes('sensor') ||
      lower.includes('cuboid')
    ) {
      return `You are evaluating this obstacle using a 480p human lens that blurs the truth. If you engaged the Feline Slit Aperture right now, what hard six-sided cuboid edges exist in your project that your human eyes blurred into soft excuses?`;
    }

    // Default grounding reflection
    return `You're distinguishing between what looks impressive to others and what actually creates intrinsic cognitive energy within you. Without overthinking or justifying: what is the single project you are currently avoiding building out of fear of public failure?`;
  }

  // In development, hook into Vite middlewares
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist static files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mind Meld server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
});
