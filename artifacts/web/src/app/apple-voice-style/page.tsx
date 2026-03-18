import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, webPage } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo5'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/apple-voice-style`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  webPage('apple-voice-style', 'Apple Voice Style | Guy Harris \u2013 British Voiceover Artist', 'Guy Harris delivers premium Apple-style voiceovers \u2013 sleek, minimal, and trusted by the world\u2019s top brands.'),
  {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Apple Voice Style',
    description: "Looking for that clean, minimalist Apple commercial narration style? Guy Harris delivers just that \u2013 a trusted British voiceover artist who\u2019s worked with Apple and many more.",
    url: 'https://www.voiceoverguy.co.uk/apple-voice-style',
    image: 'https://www.voiceoverguy.co.uk/assets/images/apple-voice-style-og.jpg',
    author: { '@type': 'Person', name: 'Guy Harris' },
  },
];

export default function Page() {
  return (
    <main className="inner-page">
      {data.s3 && (
        <section className="inner-hero">
          <div className="inner-container" dangerouslySetInnerHTML={{ __html: normaliseHtml(data.s3) }} />
        </section>
      )}
      <div className="inner-bar" />
      <InnerPage pageTitle={data.s1} pageSlug="apple-voice-style" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/apple-voice-style-og.jpg', imageAlt: 'Apple Voice Style \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
