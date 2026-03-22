import type { BlogPost } from '@/data/blog-posts';

const SITE_URL = 'https://www.voiceoverguy.co.uk';
const SITE_NAME = 'VoiceoverGuy';
const SITE_LOGO = `${SITE_URL}/assets/images/guy-harris-voiceover.png`;

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

function toIsoDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().replace(/\.\d{3}Z$/, '+00:00');
}

function getCanonical(slug: string): string {
  return `${SITE_URL}/${slug}`;
}

function getDescription(post: BlogPost): string {
  if (post.pageDesc) return post.pageDesc;
  if (post.homeText) return stripHtml(post.homeText);
  if (post.info) return stripHtml(post.info);
  return '';
}

function getKeywords(post: BlogPost): string[] {
  if (!post.searchTerms) return [];
  return post.searchTerms
    .split(/[,"]/)
    .map(k => k.trim())
    .filter(k => k.length > 0);
}

function isValidVideoId(id: string): boolean {
  return /^[A-Za-z0-9_-]+$/.test(id);
}

function hasLocalAudio(post: BlogPost): boolean {
  return !!(post.localAudio && post.localAudio.trim());
}

const AUTHOR = {
  '@type': 'Person' as const,
  name: 'Guy Harris',
  url: `${SITE_URL}/voiceoverguy`,
  image: `${SITE_URL}/images/guy-harris-profile.jpg`,
};

const PUBLISHER = {
  '@type': 'Organization' as const,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject' as const,
    url: SITE_LOGO,
  },
};

export function buildBlogPostingSchema(post: BlogPost): Record<string, unknown> {
  const canonical = getCanonical(post.url);
  const description = getDescription(post);
  const isoDate = toIsoDate(post.date);
  const keywords = getKeywords(post);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonical}#blogposting`,
    mainEntityOfPage: canonical,
    headline: post.pageTitle,
    url: canonical,
    author: AUTHOR,
    publisher: PUBLISHER,
    inLanguage: 'en-GB',
    isAccessibleForFree: true,
  };

  if (description) schema.description = description;
  if (isoDate) {
    schema.datePublished = isoDate;
    schema.dateModified = isoDate;
  }
  if (keywords.length > 0) schema.keywords = keywords;

  if (post.image && post.image.trim()) {
    schema.image = {
      '@type': 'ImageObject',
      url: `${SITE_URL}/assets/img/blog/${post.image}`,
    };
  }

  return schema;
}

export function buildBreadcrumbSchema(post: BlogPost): Record<string, unknown> {
  const canonical = getCanonical(post.url);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'News & Blog',
        item: `${SITE_URL}/voiceover-news`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.pageTitle,
        item: canonical,
      },
    ],
  };
}

export function buildVideoSchema(post: BlogPost): Record<string, unknown> | null {
  if (hasLocalAudio(post)) return null;

  const wv = (post.whatVideo || '').trim();
  const video = (post.video || '').trim();
  if (!video) return null;

  const canonical = getCanonical(post.url);
  const description = getDescription(post);
  const isoDate = toIsoDate(post.date);
  const uploadDate = isoDate || '2023-01-01T00:00:00+00:00';

  if (wv === '1') {
    const ytId = video.replace(/\/.*$/, '').trim();
    if (!isValidVideoId(ytId)) return null;
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      '@id': `${canonical}#video`,
      name: post.pageTitle,
      thumbnailUrl: `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`,
      embedUrl: `https://www.youtube.com/embed/${ytId}`,
      author: AUTHOR,
      publisher: PUBLISHER,
      inLanguage: 'en-GB',
      uploadDate,
    };
    if (description) schema.description = description;
    return schema;
  }

  if (wv === '2') {
    if (!isValidVideoId(video)) return null;
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      '@id': `${canonical}#video`,
      name: post.pageTitle,
      embedUrl: `https://player.vimeo.com/video/${video}`,
      author: AUTHOR,
      publisher: PUBLISHER,
      inLanguage: 'en-GB',
      uploadDate,
    };
    if (description) schema.description = description;
    return schema;
  }

  return null;
}

export function buildAudioSchema(post: BlogPost): Record<string, unknown> | null {
  if (!post.localAudio) return null;

  const canonical = getCanonical(post.url);
  const description = getDescription(post);
  const isoDate = toIsoDate(post.date);

  const uploadDate = isoDate || '2023-01-01T00:00:00+00:00';
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'AudioObject',
    '@id': `${canonical}#audio`,
    name: post.pageTitle,
    contentUrl: `${SITE_URL}${post.localAudio}`,
    author: AUTHOR,
    publisher: PUBLISHER,
    inLanguage: 'en-GB',
    uploadDate,
  };
  if (description) schema.description = description;
  return schema;
}

export function buildAllBlogSchemas(post: BlogPost): Record<string, unknown>[] {
  if (!post.pageTitle || !post.pageTitle.trim()) return [];

  const schemas: Record<string, unknown>[] = [
    buildBlogPostingSchema(post),
    buildBreadcrumbSchema(post),
  ];

  const videoSchema = buildVideoSchema(post);
  if (videoSchema) schemas.push(videoSchema);

  const audioSchema = buildAudioSchema(post);
  if (audioSchema) schemas.push(audioSchema);

  return schemas;
}
