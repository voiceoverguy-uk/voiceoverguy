import InnerPage from '@/components/InnerPage';
import PreferredSourceButton from '@/components/PreferredSourceButton';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage, videoObject, audioObject } from '@/lib/staticPageSchema';
import GameshowPlayer from './GameshowPlayer';

const data = (pages as Record<string, Record<string, string>>)['seo15'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/gameshow-host`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/gameshow-host',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Gameshow Host Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
  },
};

const schemas = [
  profilePage('gameshow-host', 'Guy Harris delivers high-energy gameshow host voiceovers for TV, radio, live events and Guinness World Records.'),
  breadcrumb('gameshow-host', 'Gameshow Host'),
  faqPage('gameshow-host', [
    { q: 'Can I hire Guy Harris for a gameshow-style voiceover?', a: 'Yes! Guy Harris offers dynamic, high-energy gameshow host voiceovers ideal for promos, intros, and live events. Contact Guy to book.' },
    { q: 'What does a gameshow voiceover include?', a: 'A gameshow voiceover includes bold, exciting delivery to build suspense and engagement. Great for prize reveals, countdowns, and high-stakes intros.' },
  ]),
  videoObject('gameshow-host', data.s1, 'Gameshow host voiceover demo by Guy Harris, high-energy delivery for TV, radio and live events.', 'lMgRXetDlKU', '2020-01-27'),
  audioObject('gameshow-host', 'BBC Radio 1 Headcam Day – Gameshow Voice Promo', 'High-energy American gameshow-style voice promo for BBC Radio 1 Headcam Day, voiced by Guy Harris.', '/assets/audio/bbc-radio-1-headcam-day-gameshow-voice.mp3', 'PT39S'),
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
      <InnerPage pageTitle={data.s1} pageSlug="gameshow-host" formIntro="Need a gameshow host voice with energy? Send me a quick message and I'll get back to you." afterMessageNode={<PreferredSourceButton />} sections={[
        ...(data.s4 ? [{ text: data.s4, node: <GameshowPlayer /> }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/gameshow-host-voice-og.webp', imageAlt: 'Gameshow Host Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
