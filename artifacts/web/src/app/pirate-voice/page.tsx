import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage, audioObject, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo14'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/pirate-voice`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/pirate-voice',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Pirate Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
  },
};

const schemas = [
  profilePage('pirate-voice', "Guy Harris provides energetic, characterful pirate voiceovers for commercials, games, children\u2019s content, and campaigns. Known for Pop-Up Pirate and Salty in Thomas & Friends, his character work brings scripts to life.", {
    jobTitle: 'Pirate Voiceover Artist',
  }),
  breadcrumb('pirate-voice', 'Pirate Voice'),
  faqPage('pirate-voice', [
    { q: 'Can I hire Guy Harris for a pirate voiceover?', a: "Yes. Guy Harris is an experienced pirate voiceover artist known for Pop-Up Pirate and Salty in Thomas & Friends. He delivers authentic, energetic pirate voices for games, animation, commercials, and children's content." },
    { q: 'What pirate voice characters has Guy Harris voiced?', a: 'Guy has voiced Pop-Up Pirate for Tomy, Salty the Dockside Diesel in Thomas & Friends, and pirate characters for CBBC, LEGO, and other global brands.' },
  ]),
  audioObject('pirate-voice', 'Authentic Pirate Character Voice \u2013 Guy Harris', "Professional pirate character voiceover demo by Guy Harris. Authentic, energetic, and perfect for games, animation, commercials, and children\u2019s content.", '/assets/audio/pirate-showreel-guy-harris.mp3', 'PT54S'),
  videoObject('pirate-voice', 'Pirate Voice Over \u2013 Guy Harris', 'Authentic pirate character voiceover by Guy Harris, heard on CBBC, LEGO, and global brands.', 'Egnp8ZWrojI', '2012-12-05'),
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
      <InnerPage pageTitle={data.s1} pageSlug="pirate-voice" formIntro="Looking for a convincing pirate voice? Send me a quick message and I'll get back to you." sections={[
        ...(data.s4 ? [{ text: data.s4, audioSrc: '/assets/audio/pirate-showreel-guy-harris.mp3' }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/pirate-voice-guy-harris.webp', imageAlt: 'Pirate Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
