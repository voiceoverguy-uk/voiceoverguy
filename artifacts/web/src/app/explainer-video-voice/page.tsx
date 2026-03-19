import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, localBusiness, breadcrumb, faqPage } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo19'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/explainer-video-voice`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/explainer-video-voice',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg', width: 1200, height: 630, alt: 'Explainer Video Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg'],
  },
};

const schemas = [
  localBusiness('explainer-video-voice', 'Professional explainer video voiceover by Guy Harris. Broadcast-quality narration for corporate, product, and animated explainers.'),
  breadcrumb('explainer-video-voice', 'Explainer Video Voice'),
  faqPage('explainer-video-voice', [
    { q: 'How much does an explainer video voiceover cost?', a: 'Explainer voiceover pricing depends on word count and usage. Most web-use projects start from \u00A349.99 for short scripts. Contact Guy for a fast, no-obligation quote.' },
    { q: 'Can Guy voice my explainer video the same day?', a: 'Yes. Guy delivers 99% of explainer voiceovers the same day, with broadcast-quality audio in MP3 or WAV format.' },
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
      <InnerPage pageTitle={data.s1} pageSlug="explainer-video-voice" sections={[
        { text: data.s4 },
        { vimeoId: data.s7 },
        { text: data.s5 },
        { vimeoId: data.s8 },
        { text: data.s6 },
        { vimeoId: data.s9 },
        { text: data.s10 },
        { vimeoId: data.s11 },
        { text: data.s12 },
        { vimeoId: data.s13 },
        { text: data.s14 },
        { vimeoId: data.s15 },
        ...(data.s16 ? [{ text: data.s16, fullWidth: true }] : []),
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
