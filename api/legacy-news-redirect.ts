import type { VercelRequest, VercelResponse } from '@vercel/node';

const CANONICAL_ORIGIN = 'https://www.voiceoverguy.co.uk';
const CLEAN_SLUG_PATTERN = /^[a-z0-9-]+$/;

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).end();
    return;
  }

  const slugValue = req.query.slug;
  const slug = Array.isArray(slugValue) ? slugValue[0] : slugValue;

  if (!slug || !CLEAN_SLUG_PATTERN.test(slug)) {
    res.status(404).end();
    return;
  }

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400');
  res.setHeader('Location', `${CANONICAL_ORIGIN}/${slug}`);
  res.status(301).end();
}