import type { VercelRequest, VercelResponse } from '@vercel/node';

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const ALLOWED_ORIGINS = [
  'https://www.voiceoverguy.co.uk',
  'https://voiceoverguy.co.uk',
];

function getAllowedOrigin(origin: string | undefined): string | null {
  if (!origin) return null;
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  if (origin.endsWith('.vercel.app')) return origin;
  if (origin.endsWith('.picard.replit.dev')) return origin;
  return null;
}

function setCorsHeaders(req: VercelRequest, res: VercelResponse): boolean {
  const origin = req.headers.origin as string | undefined;
  const allowed = getAllowedOrigin(origin);
  if (allowed) {
    res.setHeader('Access-Control-Allow-Origin', allowed);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (setCorsHeaders(req, res)) return;

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    'unknown';
  if (!checkRateLimit(ip)) {
    res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' });
    return;
  }

  const { prompt } = req.body ?? {};

  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Please provide details' });
    return;
  }

  if (prompt.trim().split(/\s+/).length > 75) {
    res.status(400).json({ error: 'Prompt too long (75 words max)' });
    return;
  }

  const apiKey = process.env['AI_INTEGRATIONS_OPENAI_API_KEY'];
  const baseURL = process.env['AI_INTEGRATIONS_OPENAI_BASE_URL'];

  if (!apiKey) {
    res.status(500).json({ error: 'AI service not configured.' });
    return;
  }

  try {
    const { default: OpenAI } = await import('openai');
    const openai = new OpenAI({ apiKey, baseURL });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SANTA_SYSTEM_PROMPT },
        { role: 'user', content: prompt.trim() },
      ],
      max_tokens: 600,
      temperature: 0.8,
    });

    const script = completion.choices[0]?.message?.content || '';
    res.json({ script });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Santa generate error:', message);
    res.status(500).json({ error: 'Generation failed. Please try again.' });
  }
}
