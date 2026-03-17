import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, serviceSchema, faqPage, audioObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo9'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/voiceover-imaging`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  profilePage('voiceover-imaging', 'Guy Harris is a professional imaging voiceover artist for radio stations, podcasts and brands \u2013 trusted by Heart, Capital, Smooth, Bauer, Wireless Group and more.'),
  breadcrumb('voiceover-imaging', 'Voiceover Imaging'),
  serviceSchema('voiceover-imaging', 'Radio Imaging Voiceover', 'Professional radio imaging voiceover by Guy Harris \u2013 station idents, jingles, sweepers and promos for radio stations, podcasts and brands.'),
  audioObject('voiceover-imaging', 'Radio Imaging Showreel \u2013 Guy Harris', 'A compilation of radio imaging voiceover work by Guy Harris for UK and international radio stations.', '/assets/audio/guy-harris-voiceoverguy-imaging-showreel.mp3'),
  faqPage('voiceover-imaging', [
    { q: 'What is voiceover imaging?', a: 'Voiceover imaging is the voice used for radio station idents, jingles, sweepers, promos and branding. Guy Harris voices imaging for stations like Heart, Capital, Smooth and more.' },
    { q: 'Can I hire Guy Harris for radio imaging?', a: 'Yes. Guy Harris provides professional radio imaging voiceover for stations, podcasts and brands worldwide.' },
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
      <InnerPage pageTitle={data.s1} pageSlug="voiceover-imaging" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/imaging-voice-og.jpg', imageAlt: 'Voiceover Imaging \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
