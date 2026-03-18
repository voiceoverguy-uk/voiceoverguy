import type { VercelRequest, VercelResponse } from '@vercel/node';

const PLACE_ID = 'ChIJL1W4QyVneUgRBV8j4XrOzaM';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const DEFAULT_RATING = 5.0;
const DEFAULT_COUNT = 120;

let cached: { rating: number; reviewCount: number; fetchedAt: number } | null = null;

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
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}

async function fetchFromGoogle(): Promise<{ rating: number; reviewCount: number }> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return { rating: DEFAULT_RATING, reviewCount: DEFAULT_COUNT };
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${apiKey}`;
  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error(`Google Places API returned ${resp.status}`);
  }

  const data = await resp.json();

  if (data.status !== 'OK') {
    throw new Error(`Google Places API status: ${data.status}`);
  }

  return {
    rating: data.result?.rating ?? DEFAULT_RATING,
    reviewCount: data.result?.user_ratings_total ?? DEFAULT_COUNT,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (setCorsHeaders(req, res)) return;

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const now = Date.now();
    if (cached && now - cached.fetchedAt < CACHE_TTL_MS) {
      res.json({ rating: cached.rating, reviewCount: cached.reviewCount });
      return;
    }

    const result = await fetchFromGoogle();
    cached = { ...result, fetchedAt: now };
    res.json(result);
  } catch {
    res.json({ rating: DEFAULT_RATING, reviewCount: DEFAULT_COUNT });
  }
}
