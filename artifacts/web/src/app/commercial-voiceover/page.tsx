import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, localBusiness, faqPage } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo4'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/commercial-voiceover`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  profilePage('commercial-voiceover', 'Guy Harris is a leading UK commercial voiceover artist for TV, radio, and digital campaigns. Trusted by brands like Disney, Apple, Hotels.com, Heart, Capital, Smooth, Bauer and more.', {
    jobTitle: 'British Commercial Voiceover Artist',
  }),
  localBusiness('commercial-voiceover', 'Professional British male voiceover for TV, radio, and digital commercial campaigns with fast turnaround and broadcast-quality audio.'),
  faqPage('commercial-voiceover', [
    { q: 'Can I hire Guy Harris for TV and radio commercial voiceovers?', a: 'Yes. Guy Harris is a highly experienced UK commercial male voiceover artist trusted by brands like Disney, Apple, Hotels.com, and major radio networks.' },
    { q: "Where is Voiceoverguy's Guy Harris's studio located?", a: 'The studio is based in Wakefield, West Yorkshire, and is available for remote sessions and commercial bookings.' },
    { q: 'What is the typical cost of a commercial voiceover?', a: 'Prices typically range from \u00A3100 to \u00A35000 depending on the usage and duration of the campaign.' },
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
      <InnerPage pageTitle={data.s1} pageSlug="commercial-voiceover" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/commercial-voiceover.png', imageAlt: 'Commercial Voiceover \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
