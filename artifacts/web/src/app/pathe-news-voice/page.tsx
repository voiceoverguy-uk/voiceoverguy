import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo16'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/pathe-news-voice`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  videoObject('pathe-news-voice', 'Pathe News Voice', 'Classic British Pathe News style voiceover by Guy Harris with 1940s flair and mid-Atlantic precision.', 'Hp8-la1KL6E', '2015-07-02'),
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Guy Harris',
    jobTitle: 'Pathe News Style Voiceover Artist',
    url: 'https://www.voiceoverguy.co.uk/pathe-news-voice',
    image: 'https://www.voiceoverguy.co.uk/assets/images/pathe-voice-og.jpg',
    sameAs: [
      'https://www.linkedin.com/in/voiceoverguy/',
      'https://www.youtube.com/user/voiceoverguyharris',
    ],
    worksFor: { '@type': 'Organization', name: 'VoiceoverGuy' },
    description: 'Guy Harris recreates the classic British Pathe News voice with 1940s flair and mid-Atlantic precision \u2013 trusted for documentaries, adverts and nostalgic content.',
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
      <InnerPage pageTitle={data.s1} pageSlug="pathe-news-voice" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/pathe-voice-og.jpg', imageAlt: 'Path\u00E9 News Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
