import { Router, Request, Response, NextFunction } from "express";
import OpenAI from "openai";
import { timingSafeEqual } from "node:crypto";

const router = Router();

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function authenticateRelay(req: Request, res: Response, next: NextFunction): void {
  const secret = process.env.GENERATOR_RELAY_SECRET ||
    (process.env.NODE_ENV === "development" ? process.env.SESSION_SECRET : undefined);
  if (!secret) {
    res.status(503).json({ error: "AI service not configured." });
    return;
  }
  const authorization = req.headers.authorization;
  const supplied = authorization?.startsWith("Bearer ") ? authorization.slice(7) : "";
  const expectedBytes = Buffer.from(secret);
  const suppliedBytes = Buffer.from(supplied);
  if (suppliedBytes.length !== expectedBytes.length || !timingSafeEqual(suppliedBytes, expectedBytes)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

function rateLimit(req: Request, res: Response, next: NextFunction): void {
  // This header is trusted only after authenticateRelay has checked the caller.
  const ip = req.header("X-Generator-Client-IP") || req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    next();
    return;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    res.status(429).json({ error: "Too many requests. Please wait a moment and try again." });
    return;
  }

  entry.count++;
  next();
}

const ATTENBOROUGH_SYSTEM_PROMPT = `You are a script generator that writes in the style of Sir David Attenborough narrating a nature documentary. The user will give you a short scenario or scene description. You must transform it into a beautifully written, poetic, nature-documentary-style narration as if Attenborough were observing the scene unfold.

Rules:
- Write in third person, as an observer narrating the scene
- Use Attenborough's gentle, wise, curious and slightly amused tone
- Include vivid descriptions of behaviour, environment and drama
- Add dry British wit and understated humour where appropriate
- Keep the script between 80-150 words
- Do not break character
- Do not include stage directions, speaker labels or quotation marks around the narration
- Write it as a flowing script ready to be read aloud
- Use British English spelling`;

const SANTA_SYSTEM_PROMPT = `You are a script generator that writes personalised messages from Santa Claus (Father Christmas). The user will provide details about who the message is for. You must create a warm, magical, personalised message from Santa himself.

Rules:
- Write in first person as Santa Claus / Father Christmas
- Use a warm, jolly, festive and magical tone
- Reference specific details the user has provided (names, interests, achievements)
- Include references to the North Pole, elves, reindeer, the workshop, the naughty/nice list
- Add gentle humour and warmth
- Keep the message between 100-200 words
- Do not break character
- Make it feel personal and special
- Use British English spelling
- Sign off as Santa, Father Christmas, or similar`;

router.post("/generate", authenticateRelay, rateLimit, async (req, res) => {
  try {
    const { prompt } = req.body ?? {};

    if (typeof prompt !== "string" || !prompt.trim()) {
      res.status(400).json({ error: "Please provide a prompt" });
      return;
    }

    if (prompt.length > 2000) {
      res.status(400).json({ error: "Prompt too long (2000 characters max)" });
      return;
    }

    if (prompt.trim().split(/\s+/).length > 25) {
      res.status(400).json({ error: "Prompt too long (25 words max)" });
      return;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: ATTENBOROUGH_SYSTEM_PROMPT },
        { role: "user", content: prompt.trim() },
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    const script = completion.choices[0]?.message?.content || "";
    res.json({ script });
  } catch (error: unknown) {
    const status = typeof error === 'object' && error !== null && 'status' in error
      && typeof error.status === 'number' ? error.status : 'unknown';
    console.error("Attenborough generate error", { status });
    res.status(500).json({ error: "Generation failed. Please try again." });
  }
});

router.post("/generate1", authenticateRelay, rateLimit, async (req, res) => {
  try {
    const { prompt } = req.body ?? {};

    if (typeof prompt !== "string" || !prompt.trim()) {
      res.status(400).json({ error: "Please provide details" });
      return;
    }

    if (prompt.length > 2000) {
      res.status(400).json({ error: "Prompt too long (2000 characters max)" });
      return;
    }

    if (prompt.trim().split(/\s+/).length > 75) {
      res.status(400).json({ error: "Prompt too long (75 words max)" });
      return;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SANTA_SYSTEM_PROMPT },
        { role: "user", content: prompt.trim() },
      ],
      max_tokens: 600,
      temperature: 0.8,
    });

    const script = completion.choices[0]?.message?.content || "";
    res.json({ script });
  } catch (error: unknown) {
    const status = typeof error === 'object' && error !== null && 'status' in error
      && typeof error.status === 'number' ? error.status : 'unknown';
    console.error("Santa generate error", { status });
    res.status(500).json({ error: "Generation failed. Please try again." });
  }
});

export default router;
