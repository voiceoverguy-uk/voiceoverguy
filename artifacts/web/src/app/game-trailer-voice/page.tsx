import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo26'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/game-trailer-voice`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/game-trailer-voice',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Game Trailer Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
  },
};

const schemas = [
  profilePage('game-trailer-voice', 'Guy Harris delivers powerful, cinematic voiceovers for gaming trailers, app launches and video game campaigns.'),
  breadcrumb('game-trailer-voice', 'Game Trailer Voice'),
  faqPage('game-trailer-voice', [
    { q: 'Can you voice a dramatic game trailer?', a: 'Yes, Guy Harris specialises in voicing game trailers with high-impact, cinematic delivery. His voice brings drama, tension, and emotion to every campaign.' },
    { q: 'Do you offer quick turnaround on game trailer voiceovers?', a: "Absolutely. Guy\u2019s broadcast-quality studio is available daily for rapid delivery\u2014perfect for gaming trailers with tight deadlines or last-minute requests." },
  ]),
  videoObject('game-trailer-voice', data.s1, 'Game trailer voiceover demo by Guy Harris, cinematic delivery for gaming trailers and launch campaigns.', 'voj2P_iRvUM', '2016-08-10'),
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
      <InnerPage pageTitle={data.s1} pageSlug="game-trailer-voice" formIntro="Want a bold game trailer voice? Send me a quick message and I'll get back to you." sections={[
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
