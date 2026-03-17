import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, faqPage, audioObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo15'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/gameshow-host`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  faqPage('gameshow-host', [
    { q: 'Can I hire Guy Harris for a gameshow-style voiceover?', a: 'Yes! Guy Harris offers dynamic, high-energy gameshow host voiceovers ideal for promos, intros, and live events. Contact Guy to book.' },
    { q: 'What does a gameshow voiceover include?', a: 'A gameshow voiceover includes bold, exciting delivery to build suspense and engagement. Great for prize reveals, countdowns, and high-stakes intros.' },
  ]),
  audioObject('gameshow-host', 'Gameshow Host Voice Demo \u2013 Guy Harris', 'Listen to Guy Harris perform his lively, engaging gameshow host voice. Perfect for game formats, quizzes, and entertainment intros.', '/assets/audio/guy-harris-voiceoverguy-gameshow-host.mp3', 'PT1M5S'),
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
      <InnerPage pageTitle={data.s1} pageSlug="gameshow-host" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/gameshow-host-voice-og.jpg', imageAlt: 'Gameshow Host Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
