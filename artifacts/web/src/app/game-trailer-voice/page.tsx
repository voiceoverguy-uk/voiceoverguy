import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, faqPage, audioObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo26'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/game-trailer-voice`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  faqPage('game-trailer-voice', [
    { q: 'Can you voice a dramatic game trailer?', a: 'Yes, Guy Harris specialises in voicing game trailers with high-impact, cinematic delivery. His voice brings drama, tension, and emotion to every campaign.' },
    { q: 'Do you offer quick turnaround on game trailer voiceovers?', a: "Absolutely. Guy\u2019s broadcast-quality studio is available daily for rapid delivery\u2014perfect for gaming trailers with tight deadlines or last-minute requests." },
  ]),
  audioObject('game-trailer-voice', 'Guy Harris Game Trailer Voiceover Demo', 'Listen to Guy Harris deliver a powerful and cinematic voiceover, perfect for gaming trailers and launch campaigns.', '/assets/audio/guy-harris-voiceoverguy-game-trailer-showreel.mp3', 'PT1M14S'),
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
