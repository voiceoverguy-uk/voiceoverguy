const SITE_ASSET_RE = /https?:\/\/(www\.)?voiceoverguy\.co\.uk\/assets\//g;
const SINGLE_SLASH_PROTOCOL_RE = /<a\s+href="\s*(https?:)\/([^/])/gi;
const ANCHOR_RE = /<a\s+href="\s*([^"]*?)\s*"([^>]*)>/gi;
const EXTERNAL_RE = /^https?:\/\//i;
const SKIP_RE = /^(mailto:|tel:|https?:\/\/|\/\/|#|\/)/i;

function ensureRel(rest: string): string {
  const relMatch = rest.match(/rel\s*=\s*"([^"]*)"/i);
  if (!relMatch) return rest + ' rel="noopener noreferrer"';
  const existing = relMatch[1].toLowerCase().split(/\s+/);
  const needed = ['noopener', 'noreferrer'];
  const merged = [...new Set([...existing, ...needed.filter(n => !existing.includes(n))])];
  return rest.replace(/rel\s*=\s*"[^"]*"/i, `rel="${merged.join(' ')}"`);
}

export function normaliseHtml(html: string): string {
  if (!html) return '';
  return html
    // Legacy HTML is not a consent-aware React tree: remove active embeds and scripts
    // before insertion, even on server-rendered pages.
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<(iframe|object|embed)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<(iframe|object|embed)\b[^>]*\/?>/gi, '')
    .replace(/<img\b[^>]*\bsrc\s*=\s*["'](?:https?:)?\/\/(?!www\.voiceoverguy\.co\.uk\/assets\/)[^"']*["'][^>]*>/gi, '')
    .replace(SITE_ASSET_RE, '/assets/')
    .replace(SINGLE_SLASH_PROTOCOL_RE, '<a href="$1//$2')
    .replace(ANCHOR_RE, (_match, href: string, rest: string) => {
      const trimmed = href.trim();
      if (SKIP_RE.test(trimmed)) {
        if (EXTERNAL_RE.test(trimmed)) {
          if (!/target\s*=/i.test(rest)) rest += ' target="_blank"';
          rest = ensureRel(rest);
        }
        return `<a href="${trimmed}"${rest}>`;
      }
      return `<a href="/${trimmed}"${rest}>`;
    });
}
