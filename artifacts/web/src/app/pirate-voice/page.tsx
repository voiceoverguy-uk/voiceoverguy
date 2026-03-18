import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, breadcrumb, audioObject, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo14'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/pirate-voice`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Guy Harris',
    jobTitle: 'Pirate Voiceover Artist',
    description: "Guy Harris provides energetic, characterful pirate voiceovers for commercials, games, children\u2019s content, and campaigns. Known for Pop-Up Pirate and Salty in Thomas & Friends, his character work brings scripts to life.",
    url: 'https://www.voiceoverguy.co.uk/pirate-voice',
    image: 'https://www.voiceoverguy.co.uk/assets/images/pirate-voice-guy-harris.png',
    sameAs: [
      'https://www.linkedin.com/in/voiceoverguy/',
      'https://www.youtube.com/user/voiceoverguyharris',
    ],
    worksFor: { '@type': 'Organization', name: 'VoiceoverGuy' },
  },
  audioObject('pirate-voice', 'Authentic Pirate Character Voice \u2013 Guy Harris', "Professional pirate character voiceover demo by Guy Harris. Authentic, energetic, and perfect for games, animation, commercials, and children\u2019s content.", '/assets/audio/pirate-showreel-guy-harris.mp3', 'PT54S'),
  videoObject('pirate-voice', 'Pirate Voice Over \u2013 Guy Harris', 'Authentic pirate character voiceover by Guy Harris, heard on CBBC, LEGO, and global brands.', 'JgMjQ2Lo9oo'),
  breadcrumb('pirate-voice', 'Pirate Voice'),
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
