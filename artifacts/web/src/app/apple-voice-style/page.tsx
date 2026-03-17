import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo5'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/apple-voice-style`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  profilePage('apple-voice-style', 'Guy Harris delivers the calm, understated Apple-style voiceover for tech brands, product launches and digital campaigns.'),
  breadcrumb('apple-voice-style', 'Apple Voice Style'),
  faqPage('apple-voice-style', [
    { q: 'Who does the voiceover for Apple ads?', a: 'Apple uses a range of professional voice artists. Guy Harris provides an Apple-style voiceover \u2013 warm, smooth, minimalist narration ideal for tech brands and product launches.' },
    { q: 'Can I hire an Apple-style voiceover?', a: 'Yes. Guy Harris is a British male voiceover artist who specialises in calm, understated narration matching the Apple advertising style.' },
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
      <InnerPage pageTitle={data.s1} pageSlug="apple-voice-style" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/apple-voice-style-og.jpg', imageAlt: 'Apple Voice Style \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
