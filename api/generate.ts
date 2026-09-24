import type { VercelRequest, VercelResponse } from '@vercel/node';
import { relayGenerator } from '../server/generatorRelay';

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_PROMPT_LENGTH = 2000;
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

  if (typeof prompt !== 'string' || !prompt.trim()) {
    res.status(400).json({ error: 'Please provide a prompt' });
    return;
  }

  if (prompt.length > MAX_PROMPT_LENGTH) {
    res.status(400).json({ error: 'Prompt too long (2000 characters max)' });
    return;
  }

  if (prompt.trim().split(/\s+/).length > 25) {
    res.status(400).json({ error: 'Prompt too long (25 words max)' });
    return;
  }

  await relayGenerator('/generate', prompt.trim(), /^[a-fA-F0-9:.]{1,64}$/.test(ip) ? ip : 'unknown', res, 'Attenborough');
}
