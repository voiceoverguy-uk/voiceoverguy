import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage, audioObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo16'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/pathe-news-voice`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  profilePage('pathe-news-voice', 'Guy Harris performs a classic Path\u00E9 News style voiceover \u2013 the iconic British newsreel voice for commercials, events, documentaries and social content.'),
  breadcrumb('pathe-news-voice', 'Path\u00E9 News Voice'),
  audioObject('pathe-news-voice', 'Path\u00E9 News Voice Demo \u2013 Guy Harris', 'A Path\u00E9 News-style voiceover demo in the classic 1940s British newsreel style performed by Guy Harris.', '/assets/audio/guy-harris-voiceoverguy-pathe-demo.mp3'),
  faqPage('pathe-news-voice', [
    { q: 'Can I hire a Path\u00E9 News voiceover artist?', a: 'Yes. Guy Harris provides a professional Path\u00E9 News style voiceover \u2013 the classic British newsreel voice for adverts, events and documentary content.' },
    { q: 'What is the Path\u00E9 News voice?', a: 'The Path\u00E9 News voice is the iconic British newsreel narration style from the 1930s\u201360s. Guy Harris recreates this voice authentically for modern productions.' },
  ]),
];

export default function Page() {
  return (
    <main className="inner-page">
      {data.s3 && (
        <section className="inner-hero">
          <div className="inner-container" dangerouslySetInnerHTML={{ __html: data.s3 }} />
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
