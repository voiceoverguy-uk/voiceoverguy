import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, localBusiness, faqPage } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo8'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/on-hold-voice`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  profilePage('on-hold-voice', 'Guy Harris provides professional on-hold voiceover for business telephone systems, IVR, auto-attendant and voicemail greetings.'),
  breadcrumb('on-hold-voice', 'On Hold Voice'),
  localBusiness('on-hold-voice', 'Professional on-hold voiceover and IVR recordings for business telephone systems across the UK.'),
  faqPage('on-hold-voice', [
    { q: 'Can I hire Guy Harris for on-hold voiceover?', a: 'Yes. Guy Harris provides professional on-hold messages, IVR prompts, auto-attendant greetings and voicemail recordings for businesses of all sizes.' },
    { q: 'How much does on-hold voiceover cost?', a: 'On-hold voiceover pricing depends on the number of messages and script length. Most projects start from \u00A349.99. Contact Guy for a fast quote.' },
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
