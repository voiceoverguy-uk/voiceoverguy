import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo14'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/pirate-voice`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  profilePage('pirate-voice', 'Guy Harris delivers professional pirate voiceovers for games, ads, attractions, apps and events \u2013 from classic Captain Hook to grizzled buccaneer.'),
  breadcrumb('pirate-voice', 'Pirate Voice'),
  faqPage('pirate-voice', [
    { q: 'Can I hire a pirate voiceover artist?', a: 'Yes. Guy Harris provides professional pirate voices for games, attractions, ads, apps and themed events.' },
    { q: 'What pirate voice styles are available?', a: 'Guy Harris offers classic Captain Hook, grizzled old sea-dog, comedic pirate, and dramatic buccaneer styles.' },
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
      <InnerPage pageTitle={data.s1} pageSlug="pirate-voice" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/pirate-voice-guy-harris.png', imageAlt: 'Pirate Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
