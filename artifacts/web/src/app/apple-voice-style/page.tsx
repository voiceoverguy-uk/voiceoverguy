import InnerPage from '@/components/InnerPage';
import PreferredSourceButton from '@/components/PreferredSourceButton';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, webPage, breadcrumb, faqPage, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo5'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/apple-voice-style`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/apple-voice-style',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Apple Voice Style – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
  },
};

const schemas = [
  webPage('apple-voice-style', 'Apple Voice Style | Guy Harris', 'Guy Harris delivers premium Apple-style voiceovers with calm, sincere British male delivery.'),
  breadcrumb('apple-voice-style', 'Apple Voice Style'),
  videoObject('apple-voice-style', data.s1, 'Guy Harris delivers premium Apple-style voiceovers with calm, sincere British male delivery.', 'V6HuBB4WqxQ', '2013-12-09'),
  faqPage('apple-voice-style', [
    { q: 'What is the Apple voice style?', a: 'The Apple voice style is a calm, sincere, and minimalist narration approach used in Apple commercials. Guy Harris delivers this trusted, natural British tone for brands seeking understated authority.' },
    { q: 'Can Guy Harris voice my commercial in the Apple style?', a: 'Yes. Guy has voiced Apple campaigns and delivers the same clean, warm delivery for brands wanting that premium feel.' },
  ]),
  {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Apple Voice Style',
    description: "Looking for that clean, minimalist Apple commercial narration style? Guy Harris delivers just that \u2013 a trusted British voiceover artist who\u2019s worked with Apple and many more.",
    url: 'https://www.voiceoverguy.co.uk/apple-voice-style',
    image: 'https://www.voiceoverguy.co.uk/assets/images/apple-voice-style-og.webp',
    author: { '@type': 'Person', name: 'Guy Harris' },
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
      <InnerPage pageTitle={data.s1} pageSlug="apple-voice-style" formIntro="Need a polished Apple-style voice? Send me a quick message and I'll get back to you." afterMessageNode={<PreferredSourceButton />} sections={[
        ...(data.s4 ? [{ text: data.s4, audioSrc: '/assets/audio/that-apple-iphone-ad-voice-guy-harris.mp3', downloadLabel: 'Download Apple Style Sample MP3' }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/apple-voice-style-og.webp', imageAlt: 'Apple Voice Style \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
