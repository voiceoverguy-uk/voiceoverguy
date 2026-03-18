import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, faqPage } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo6'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/narration-voice`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  faqPage('narration-voice', [
    { q: 'What types of narration does Guy Harris offer?', a: "Guy Harris provides narration voiceovers for corporate videos, health & safety training, documentaries, and e-learning content. His delivery is clear, warm, and authoritative\u2014perfect for professional projects." },
    { q: 'Can I direct a narration session live with Guy?', a: "Yes. Guy\u2019s broadcast-quality studio supports live direction via Cleanfeed, Source Connect, or Zoom, so you can guide the session and get exactly the tone you need." },
    { q: 'Where is Guy Harris based?', a: 'Guy is a professional British voiceover artist based in Wakefield, West Yorkshire, offering narration services to clients across the UK and internationally.' },
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
      <InnerPage pageTitle={data.s1} pageSlug="narration-voice" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/narration-voice-og.jpg', imageAlt: 'Narration Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
