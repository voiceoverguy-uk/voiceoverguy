import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import Link from 'next/link';
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
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Explainer Video Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
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
      <InnerPage pageTitle={data.s1} pageSlug="explainer-video-voice" formIntro="Need a clear, friendly explainer voice? Send me a quick message and I'll get back to you." sections={[
        { text: data.s4 },
        { youtubeId: 'NfoJJpELeQc' },
        { text: data.s5 },
        { youtubeId: 'LRvWnpX_c9g' },
        { text: data.s6 },
        { youtubeId: 'eNfJBWtsHc4' },
        { text: data.s10 },
        { youtubeId: 'Pmc1xV_EOPE' },
        { text: data.s12 },
        { youtubeId: 'K1tyvXu2kqo' },
        { text: data.s14 },
        { youtubeId: '22hxKsJPEpI' },
        ...(data.s16 ? [{ text: data.s16, fullWidth: true }] : []),
      ]} />
      <div className="inner-container" style={{ padding: '32px 20px', textAlign: 'center', borderTop: '3px solid var(--red)' }}>
        <p style={{ marginBottom: '12px', fontSize: '16px' }}>Not sure how many words are in your script – or what your explainer voiceover might cost?</p>
        <Link href="/voice-over-word-count-calculator" className="btn btn-red" style={{ display: 'inline-block', padding: '12px 28px', background: 'var(--red)', color: '#fff', textDecoration: 'none', fontWeight: 'bold', letterSpacing: '0.05em' }}>
          Try the Voiceover Word Count Calculator
        </Link>
      </div>
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
