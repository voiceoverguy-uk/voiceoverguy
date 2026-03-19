import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo8'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/on-hold-voice`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/on-hold-voice',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg', width: 1200, height: 630, alt: 'On Hold Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg'],
  },
};

const schemas = [
  profilePage('on-hold-voice', 'Guy Harris is a professional British on-hold and IVR voiceover artist, trusted by major UK companies for phone system prompts.'),
  breadcrumb('on-hold-voice', 'On Hold Voice'),
  videoObject('on-hold-voice', data.s1, 'On hold voice and IVR phone prompt demo by British voiceover artist Guy Harris.', 'TKdzDAb9MIA', '2014-07-29'),
  faqPage('on-hold-voice', [
    { q: 'Can you provide on-hold voiceover recordings for businesses?', a: 'Yes. Guy Harris is a professional voiceover artist with extensive experience recording on-hold messages for clients such as Baxi, Bupa, NS&I and more.' },
    { q: "What\u2019s included in your on-hold voiceover service?", a: 'Typically, clients receive professionally recorded messages with multiple tone options and delivered as WAV or MP3 files, ready to be uploaded to any phone system.' },
    { q: 'Where is your voiceover studio based?', a: 'Guy Harris records from a broadcast-quality studio in Wakefield, West Yorkshire, serving clients across the UK and globally.' },
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
      <InnerPage pageTitle={data.s1} pageSlug="on-hold-voice" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/on-hold-voice-og.jpg', imageAlt: 'On Hold Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
