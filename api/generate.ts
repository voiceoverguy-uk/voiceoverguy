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
    res.status(400).json({ error: 'Please provide a prompt' });
    return;
  }

  if (prompt.trim().split(/\s+/).length > 25) {
    res.status(400).json({ error: 'Prompt too long (25 words max)' });
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
        { role: 'system', content: ATTENBOROUGH_SYSTEM_PROMPT },
        { role: 'user', content: prompt.trim() },
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    const script = completion.choices[0]?.message?.content || '';
    res.json({ script });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Attenborough generate error:', message);
    res.status(500).json({ error: 'Generation failed. Please try again.' });
  }
}
