import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, serviceSchema, faqPage, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo26'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/game-trailer-voice`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  profilePage('game-trailer-voice', 'Guy Harris is a leading British game trailer voiceover artist trusted by studios for dramatic, cinematic voice performances.'),
  breadcrumb('game-trailer-voice', 'Game Trailer Voice'),
  serviceSchema('game-trailer-voice', 'Game Trailer Voiceover', 'Professional game trailer voiceover by Guy Harris \u2013 epic, cinematic narration for AAA and indie game trailers, teasers and launch videos.'),
  faqPage('game-trailer-voice', [
    { q: 'Can Guy Harris voice a game trailer?', a: 'Yes. Guy Harris has provided game trailer voiceovers for titles including Worms W.M.D, Boom Beach and others, delivering cinematic, dramatic narration.' },
    { q: 'What style of voice is used for game trailers?', a: 'Game trailers typically use deep, dramatic, cinematic narration. Guy Harris is experienced in epic trailer reads, villain voices, and high-energy character deliveries.' },
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
      <InnerPage pageTitle={data.s1} pageSlug="game-trailer-voice" sections={[
        { text: data.s4 },
        { youtubeId: data.s7 },
        { text: data.s5 },
        { youtubeId: data.s8 },
        { text: data.s6 },
        { youtubeId: data.s9 },
        { text: data.s11 },
        { youtubeId: data.s10 },
        { text: data.s12 },
        { youtubeId: data.s13 },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
