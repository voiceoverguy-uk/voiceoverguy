const SITE = 'https://www.voiceoverguy.co.uk';

function toIsoDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toISOString().replace(/\.\d{3}Z$/, '+00:00');
}

export const GUY_PERSON_REF = { '@id': `${SITE}/#guyharris` };

export function profilePage(slug: string, description: string, extra?: Record<string, unknown>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE}/${slug}#profilepage`,
    url: `${SITE}/${slug}`,
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE}/#guyharris`,
      name: 'Guy Harris',
      url: SITE,
      image: `${SITE}/images/guy-harris-profile.jpg`,
      jobTitle: 'British Male Voiceover Artist',
      sameAs: [
        'https://www.linkedin.com/in/voiceoverguy/',
        'https://www.youtube.com/user/voiceoverguyharris',
      ],
      description,
      ...extra,
    },
  };
}

export function webPage(slug: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE}/${slug}#webpage`,
    url: `${SITE}/${slug}`,
    name,
    description,
  };
}

export function collectionPage(slug: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE}/${slug}#webpage`,
    url: `${SITE}/${slug}`,
    name,
    description,
    author: GUY_PERSON_REF,
  };
}

export function itemListAudio(
  slug: string,
  name: string,
  items: { title: string; description: string; mp3: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE}/${slug}#itemlist`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'AudioObject',
        '@id': `${SITE}${v.mp3}`,
        name: v.title,
        description: v.description,
        contentUrl: `${SITE}${v.mp3}`,
        encodingFormat: 'audio/mpeg',
        inLanguage: 'en-GB',
        creator: GUY_PERSON_REF,
      },
    })),
  };
}

export function breadcrumb(slug: string, pageName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE}/${slug}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, item: { '@id': `${SITE}/`, name: 'Home' } },
      { '@type': 'ListItem', position: 2, item: { '@id': `${SITE}/${slug}`, name: pageName } },
    ],
  };
}

export function faqPage(slug: string, questions: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE}/${slug}#faq`,
    mainEntity: questions.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function serviceSchema(slug: string, serviceType: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE}/${slug}#service`,
    serviceType,
    provider: GUY_PERSON_REF,
    url: `${SITE}/${slug}`,
    description,
  };
}

export function localBusiness(slug: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE}/#business`,
    name: 'Guy Harris Voiceover',
    image: `${SITE}/assets/images/guy-harris-voiceover.webp`,
    url: `${SITE}/${slug}`,
    priceRange: '\u00A3100\u2013\u00A35000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wakefield',
      addressRegion: 'West Yorkshire',
      addressCountry: 'GB',
    },
    openingHours: 'Mo-Sa 07:00-21:00',
    description,
  };
}

export function audioObject(slug: string, name: string, description: string, path: string, duration?: string) {
  const obj: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'AudioObject',
    '@id': `${SITE}/${slug}#audio`,
    name,
    description,
    contentUrl: `${SITE}${path}`,
    encodingFormat: 'audio/mpeg',
    inLanguage: 'en-GB',
  };
  if (duration) obj.duration = duration;
  return obj;
}

export function videoObject(slug: string, name: string, description: string, youtubeId: string, uploadDate: string, suffix = '') {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${SITE}/${slug}#video${suffix}`,
    name,
    description,
    thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    url: `https://www.youtube.com/watch?v=${youtubeId}`,
    uploadDate: toIsoDateTime(uploadDate),
  };
}

export function SchemaScripts({ schemas }: { schemas: Record<string, unknown>[] }) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
