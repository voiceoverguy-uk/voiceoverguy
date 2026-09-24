import type { VercelResponse } from '@vercel/node';

// Development uses the existing Replit session secret so the local relay can be
// exercised without changing any live credentials. Production requires its own
// dedicated shared secret on both services.
function relaySecret(): string | undefined {
  return process.env.GENERATOR_RELAY_SECRET ||
    (process.env.NODE_ENV === 'development' ? process.env.SESSION_SECRET : undefined);
}

export async function relayGenerator(
  path: '/generate' | '/generate1',
  prompt: string,
  ip: string,
  res: VercelResponse,
  label: string,
): Promise<void> {
  const secret = relaySecret();
  const backend = process.env.GENERATOR_BACKEND_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:80' : undefined);
  if (!secret || !backend) {
    res.status(500).json({ error: 'AI service not configured.' });
    return;
  }

  let url: URL;
  try {
    url = new URL(`/api${path}`, backend);
    if (url.protocol !== 'https:' && !(process.env.NODE_ENV === 'development' && url.hostname === 'localhost')) {
      throw new Error('Invalid backend protocol');
    }
  } catch {
    res.status(500).json({ error: 'AI service not configured.' });
    return;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secret}`,
        'X-Generator-Client-IP': ip,
      },
      body: JSON.stringify({ prompt }),
      signal: AbortSignal.timeout(30000),
    });
    // Never reflect an arbitrary upstream body, including potential proxy errors.
    if (!response.ok) {
      console.error(`${label} relay error`, { status: response.status });
      res.status(response.status === 429 ? 429 : 502).json({
        error: response.status === 429
          ? 'Too many requests. Please wait a moment and try again.'
          : 'Generation failed. Please try again.',
      });
      return;
    }
    const result: unknown = await response.json();
    const script = typeof result === 'object' && result !== null && 'script' in result
      ? result.script : undefined;
    if (typeof script !== 'string' || !script.trim()) {
      console.error(`${label} relay error`, { status: 'invalid_response' });
      res.status(502).json({ error: 'Generation failed. Please try again.' });
      return;
    }
    res.json({ script });
  } catch {
    console.error(`${label} relay error`, { status: 'unavailable' });
    res.status(502).json({ error: 'Generation failed. Please try again.' });
  }
}