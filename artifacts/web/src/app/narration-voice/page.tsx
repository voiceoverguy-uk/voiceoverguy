import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, serviceSchema, faqPage } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo6'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/narration-voice`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  profilePage('narration-voice', 'Guy Harris is a professional British narration voiceover artist for documentaries, corporate films, audiobooks and e-learning.'),
  breadcrumb('narration-voice', 'Narration Voice'),
  serviceSchema('narration-voice', 'Narration Voiceover', 'Professional narration voiceover by Guy Harris \u2013 warm, authoritative narration for documentaries, corporate videos, audiobooks and e-learning.'),
  faqPage('narration-voice', [
    { q: 'Can I hire Guy Harris for narration voiceover?', a: 'Yes. Guy Harris provides professional narration for documentaries, corporate videos, audiobooks and e-learning projects with broadcast-quality audio.' },
    { q: 'What narration styles does Guy Harris offer?', a: 'Guy Harris offers warm, authoritative, conversational and dramatic narration styles \u2013 from corporate to documentary to storytelling.' },
  ]),
];

export default function Page() {
  return (
    <main className="inner-page">
      {data.s3 && (
        <section className="inner-hero">
          <div className="inner-container" dangerouslySetInnerHTML={{ __html: data.s3 }} />
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
