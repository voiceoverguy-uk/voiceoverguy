import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage, serviceSchema, videoObject, audioObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo7'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/voice-of-god`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/voice-of-god',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Voice of God – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
  },
};

const schemas = [
  profilePage('voice-of-god', 'Guy Harris is a professional Voice of God announcer trusted by ITV, Butlins, The Masked Singer, Poundland, the Natural History Museum and national award ceremonies.'),
  breadcrumb('voice-of-god', 'Voice of God'),
  faqPage('voice-of-god', [
    { q: 'What is a Voice of God announcer?', a: 'A Voice of God (VOG) announcer is the unseen voice that introduces speakers, announces awards, and guides audiences at live events, conferences, and stage shows.' },
    { q: 'Can I book Guy Harris as a Voice of God for my event?', a: 'Yes. Guy Harris is an experienced VOG announcer, trusted by ITV, Butlins, The Masked Singer, Poundland, the Natural History Museum and national award ceremonies.' },
  ]),
  serviceSchema('voice-of-god', 'Voice of God Announcer', 'Live and pre-recorded Voice of God announcer services for events, awards ceremonies, exhibitions and stage shows across the UK.'),
  videoObject('voice-of-god', 'Voice of God Show Announcer \u2013 Guy Harris', 'Guy Harris performing as Voice of God show announcer for live events and award ceremonies.', 'e0vZ9cxdilo', '2024-02-27'),
  audioObject('voice-of-god', 'Voice of God Demo \u2013 Guy Harris', 'A compilation of live Voice of God announcements for events, awards, and stage shows.', '/assets/audio/guy-harris-voiceoverguy-commercial-showreel.mp3', 'PT1M14S'),
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

      <InnerPage pageTitle={data.s1} pageSlug="voice-of-god" formIntro="Need an epic Voice of God read? Send me a quick message and I'll get back to you." sections={[
        ...(data.s4 ? [{ text: data.s4, audioSrc: '/assets/audio/voice-of-god-demo-showreel-guy-harris.mp3' }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/voice-of-god-voice-og.webp', imageAlt: 'Voice of God \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
