import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo9'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/voiceover-imaging`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/voiceover-imaging',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg', width: 1200, height: 630, alt: 'Voiceover Imaging – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg'],
  },
};

const schemas = [
  profilePage('voiceover-imaging', 'Guy Harris is a professional imaging voiceover artist for radio stations, podcasts and brands \u2013 trusted by Heart, Capital, Smooth, Bauer, Wireless Group and more.'),
  breadcrumb('voiceover-imaging', 'Voiceover Imaging'),
  videoObject('voiceover-imaging', data.s1, 'Radio station imaging and branding voiceover demo by Guy Harris.', '6zOVX7VeH2Y', '2018-10-22'),
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
