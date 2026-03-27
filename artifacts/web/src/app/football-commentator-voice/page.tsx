import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, localBusiness, faqPage, breadcrumb, audioObject, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo13'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/football-commentator-voice`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/football-commentator-voice',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Football Commentator Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
  },
};

const schemas = [
  localBusiness('football-commentator-voice', 'Guy Harris is a British voiceover artist known for his football commentator-style voice, used by BBC, Netflix, and major sports brands.'),
  faqPage('football-commentator-voice', [
    { q: 'Can I hire Guy Harris for a football commentator-style voiceover?', a: 'Yes, Guy Harris is available to voice football-style commentaries for TV, radio, promos, and comedy spots. His voice is trusted by major broadcasters and sports clubs.' },
    { q: 'Is the voiceover studio located in Wakefield, West Yorkshire?', a: "Yes, Guy\u2019s voiceover studio is based in Wakefield, West Yorkshire and offers remote and in-person directed sessions." },
    { q: "What\u2019s included in a football commentator voiceover session?", a: 'Voiceover sessions include a live directed call, multiple takes, and delivery in your preferred format. Fast turnaround and professional audio are guaranteed.' },
  ]),
  breadcrumb('football-commentator-voice', 'Football Commentator Voice'),
  audioObject('football-commentator-voice', 'Football Commentator Voice \u2013 Guy Harris', 'Professional football commentator-style voiceover demo by Guy Harris.', '/assets/audio/football-commentator-showreel-guy-harris.mp3', 'PT72S'),
  videoObject('football-commentator-voice', 'Football Commentator Voice \u2013 Guy Harris', 'High-energy football commentator-style voiceover demo.', 'T9opwMc46Ms', '2021-06-07'),
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
      <InnerPage pageTitle={data.s1} pageSlug="football-commentator-voice" formIntro="Need a football commentator voice? Send me a quick message and I'll get back to you." sections={[
        ...(data.s4 ? [{ text: data.s4, audioSrc: '/assets/audio/football-commentator-voiceover-guy-harris.mp3' }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/football-commentator-voice-og.webp', imageAlt: 'Football Commentator Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
