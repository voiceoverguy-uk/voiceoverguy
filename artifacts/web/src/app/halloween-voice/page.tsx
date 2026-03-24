import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, breadcrumb, localBusiness, audioObject, videoObject, faqPage } from '@/lib/staticPageSchema';
import HalloweenPlayer from './HalloweenPlayer';

const data = (pages as Record<string, Record<string, string>>)['seo17'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/halloween-voice`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/halloween-voice',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg', width: 1200, height: 630, alt: 'Halloween Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg'],
  },
};

const schemas = [
  breadcrumb('halloween-voice', 'Halloween Voice'),
  localBusiness('halloween-voice', 'British male voiceover artist specialising in character voices, commercials, promos and Halloween voiceovers.'),
  audioObject('halloween-voice', 'Halloween Voiceover Showreel \u2013 Guy Harris', 'Spooky and fun Halloween voice styles including Dracula, Vincent Price and Joker tones.', '/assets/audio/guy-harris-voiceoverguy-halloween-showreel.mp3', 'PT1M2S'),
  videoObject('halloween-voice', 'Halloween Voices \u2013 Spooky Voiceovers \u2013 Dracula & Vincent Price', 'A showcase of spooky Halloween voiceovers including Vincent Price and Dracula styles.', 'bmMpk16zuSs', '2015-10-22', '1'),
  videoObject('halloween-voice', 'Joker Impression \u2013 The Dark Knight', 'A Joker voice impression inspired by Heath Ledger, ideal for spooky promos and villain trailers.', 'OMlBk5QBnyM', '2014-09-17', '2'),
  faqPage('halloween-voice', [
    { q: 'Can you provide spooky Halloween character voices?', a: 'Yes. Guy Harris performs Dracula, Ghost Face, Joker impressions, Vincent Price-style narration and more for Halloween ads, promos and events.' },
    { q: 'Do you offer fast turnaround for Halloween voiceovers?', a: 'Most Halloween scripts are voiced the same day, recorded in a broadcast-quality studio with Zoom, Cleanfeed or Source Connect-style remote direction.' },
    { q: 'Where have your Halloween voices been used?', a: "Guy\u2019s Halloween voiceovers have featured on BBC Radio 1, Asda, Thorpe Park Fright Nights, Poundland and countless YouTube and social media campaigns." },
  ]),
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
      <InnerPage pageTitle={data.s1} pageSlug="halloween-voice" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        {
          node: <HalloweenPlayer />,
          fullWidth: true,
        },
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/halloween-voice-og.jpg', imageAlt: 'Halloween Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
