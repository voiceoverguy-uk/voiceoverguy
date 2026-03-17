import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo17'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/halloween-voice`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  profilePage('halloween-voice', 'Guy Harris delivers creepy, dramatic Halloween voiceovers for ads, events, attractions, games and seasonal campaigns.'),
  breadcrumb('halloween-voice', 'Halloween Voice'),
  faqPage('halloween-voice', [
    { q: 'Can I hire a Halloween voiceover artist?', a: 'Yes. Guy Harris provides spooky, dramatic Halloween voices for adverts, attractions, escape rooms, podcasts and seasonal campaigns.' },
    { q: 'What Halloween voice styles are available?', a: 'Guy Harris offers vampire, zombie, ghost narrator, creepy announcer and horror trailer styles \u2013 from campy fun to genuinely chilling.' },
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
      <InnerPage pageTitle={data.s1} pageSlug="halloween-voice" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/halloween-voice-og.jpg', imageAlt: 'Halloween Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
