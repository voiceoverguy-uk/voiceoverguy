import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo15'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/gameshow-host`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  profilePage('gameshow-host', 'Guy Harris provides professional gameshow host voiceover for TV, radio, podcasts, YouTube and live events with an energetic, engaging style.'),
  breadcrumb('gameshow-host', 'Gameshow Host'),
  faqPage('gameshow-host', [
    { q: 'Can I hire a gameshow host voiceover?', a: 'Yes. Guy Harris provides energetic gameshow host voiceovers for TV, radio, apps, podcasts and live events.' },
    { q: 'What does a gameshow host voiceover sound like?', a: 'A gameshow host voiceover is upbeat, dramatic and engaging \u2013 perfect for quiz shows, game apps, corporate events and promotional content.' },
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
