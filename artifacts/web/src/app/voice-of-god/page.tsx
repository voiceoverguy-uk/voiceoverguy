import InnerPage from '@/components/InnerPage';
import VogPlaylist from '@/components/VogPlaylist';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, serviceSchema, videoObject, audioObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo7'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/voice-of-god`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  profilePage('voice-of-god', 'Guy Harris is a professional Voice of God announcer trusted by ITV, Butlins, The Masked Singer, Poundland, the Natural History Museum and national award ceremonies.'),
  breadcrumb('voice-of-god', 'Voice of God'),
  serviceSchema('voice-of-god', 'Voice of God Announcer', 'Live and pre-recorded Voice of God announcer services for events, awards ceremonies, exhibitions and stage shows across the UK.'),
  videoObject('voice-of-god', 'Voice of God Show Announcer \u2013 Guy Harris', 'Guy Harris performing as Voice of God show announcer for live events and award ceremonies.', 'e0vZ9cxdilo', '2024-02-27'),
  audioObject('voice-of-god', 'Voice of God Demo \u2013 Guy Harris', 'A compilation of live Voice of God announcements for events, awards, and stage shows.', '/assets/audio/guy-harris-voiceoverguy-commercial-showreel.mp3'),
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

      <div className="inner-parallax">
        <div className="inner-container" style={{ paddingBottom: 0 }}>
          <VogPlaylist />
        </div>
      </div>

      <InnerPage pageTitle={data.s1} pageSlug="voice-of-god" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/voice-of-god-voice-og.jpg', imageAlt: 'Voice of God \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
