import type { VercelRequest, VercelResponse } from '@vercel/node';

const CANONICAL_ORIGIN = 'https://www.voiceoverguy.co.uk';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).end();
    return;
  }

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400');
  res.setHeader('Location', `${CANONICAL_ORIGIN}/voiceover-news`);
  res.status(301).end();
}