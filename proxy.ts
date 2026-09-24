const LEGACY_NEWS_PREFIX = 'voiceover-newslatest-voiceover-news/';
const WORMS_PATH = '/worms-wmd-character-voices';
const CANONICAL_URL = 'https://www.voiceoverguy.co.uk/worms-wmd-character-voices';

export default function proxy(request: Request): Response | undefined {
  if (request.method !== 'GET' && request.method !== 'HEAD') return;

  const url = new URL(request.url);
  if (url.pathname !== WORMS_PATH && url.pathname !== `${WORMS_PATH}/`) return;

  const legacyUrl = url.searchParams.get('url');
  if (!legacyUrl?.startsWith(LEGACY_NEWS_PREFIX)) return;

  return Response.redirect(CANONICAL_URL, 301);
}