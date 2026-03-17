import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, localBusiness, faqPage, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo13'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/football-commentator-voice`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  profilePage('football-commentator-voice', 'Guy Harris provides professional football commentator voiceovers for advertising, gaming, apps, corporate events and social media.'),
  breadcrumb('football-commentator-voice', 'Football Commentator Voice'),
  localBusiness('football-commentator-voice', 'Professional football commentator voiceover services for ads, games, apps and events.'),
  faqPage('football-commentator-voice', [
    { q: 'Can I hire a football commentator voiceover?', a: 'Yes. Guy Harris provides professional football commentator voiceover for commercials, games, apps and corporate events.' },
    { q: 'What sports commentator voices does Guy Harris offer?', a: 'Guy Harris offers classic football commentary, match-day announcer, and pundit-style voiceover for all types of sports content.' },
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
      <InnerPage pageTitle={data.s1} pageSlug="football-commentator-voice" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/football-commentator-voice-og.jpg', imageAlt: 'Football Commentator Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
