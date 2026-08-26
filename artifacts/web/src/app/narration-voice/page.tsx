import InnerPage from '@/components/InnerPage';
import PreferredSourceButton from '@/components/PreferredSourceButton';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo6'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/narration-voice`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/narration-voice',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Narration Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
  },
};

const schemas = [
  profilePage('narration-voice', 'Guy Harris is a professional British narration voiceover artist for corporate videos, e-learning and documentary content.'),
  breadcrumb('narration-voice', 'Narration Voice'),
  videoObject('narration-voice', data.s1, 'Narration voiceover demo by Guy Harris, a natural English voice for corporate and e-learning projects.', 'N4cZtq6UBRI', '2016-02-17'),
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
      <InnerPage pageTitle={data.s1} pageSlug="narration-voice" formIntro="Looking for warm, natural narration? Send me a quick message and I'll get back to you." afterMessageNode={<PreferredSourceButton />} sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/narration-voice-og.webp', imageAlt: 'Narration Voice \u2013 Guy Harris' },
      ]} />
      <div className="inner-container" style={{ padding: '32px 20px', textAlign: 'center', borderTop: '3px solid var(--red)' }}>
        <p style={{ marginBottom: '12px', fontSize: '16px' }}>Not sure how long your narration script will take – or what it might cost?</p>
        <Link href="/voice-over-word-count-calculator" className="btn btn-red" style={{ display: 'inline-block', padding: '12px 28px', background: 'var(--red)', color: '#fff', textDecoration: 'none', fontWeight: 'bold', letterSpacing: '0.05em' }}>
          Try the Voiceover Word Count Calculator
        </Link>
      </div>
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
