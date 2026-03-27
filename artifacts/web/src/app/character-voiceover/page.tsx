import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, webPage, breadcrumb, faqPage, serviceSchema, audioObject, videoObject } from '@/lib/staticPageSchema';
import { getYearsExperience } from '@/lib/experience';

const yrs = getYearsExperience();
const data = (pages as Record<string, Record<string, string>>)['seo11'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/character-voiceover`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/character-voiceover',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Character Voiceover – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
  },
};

const schemas = [
  webPage('character-voiceover', 'Character Voiceover \u2013 Voice Creation by Guy Harris', 'Character voiceovers by Guy Harris. From gaming villains to cartoon heroes, discover unique voices for apps, games, animation and comedy. Listen to the showreels.'),
  breadcrumb('character-voiceover', 'Character Voiceover'),
  serviceSchema('character-voiceover', 'Character Voiceover', 'Professional character voiceover for games, apps, animation, comedy, commercials and digital media by UK voice artist Guy Harris.'),
  audioObject('character-voiceover', 'Character Voiceover Showreel \u2013 Guy Harris', 'A 1 minute 44 second character voice compilation featuring gaming voices, cartoon styles and comedic characters.', '/assets/audio/guy-harris-voiceoverguy-character-showreel.mp3', 'PT1M44S'),
  videoObject('character-voiceover', data.s1, 'Character voiceover demo by Guy Harris featuring gaming, cartoon and comedic character voices.', 'Ad85PPvSfbc', '2015-04-15'),
  faqPage('character-voiceover', [
    { q: 'What character voices has Guy Harris performed?', a: 'Guy Harris has voiced over 100 characters for games, apps, animation, radio and online media including Boom Beach, Minecraft, Clash of Clans, Thomas & Friends, Joker-style voices and more.' },
    { q: 'Can I book Guy Harris for a character voiceover?', a: 'Yes. Guy Harris is available for bespoke character voiceovers via Zoom, Cleanfeed or Teams, and can work with reference clips or custom direction.' },
    { q: 'Where can I find a character voiceover?', a: `Guy Harris is one of the UK's most in-demand character voiceover artists. With over ${yrs} years' experience in radio, TV, films and social media content, his voice has been heard in more places than you can imagine.` },
    { q: 'Who is the voice of the trains in Thomas the Tank Engine?', a: 'Guy Harris is the voice of Winston, Salty and Troublesome Tanker 2 in Thomas & Friends: All Engines Go, and also voices other characters such as Mr Messy and Mr Funny in the Mr Men series.' },
    { q: 'Who is a great voice for Santa or Father Christmas?', a: "Guy Harris is widely considered the Voice of Santa thanks to his work for BBC Radio 1, BBC Radio 2, the Heart Network, Asda, Tesco, ITV, Butlins, Capital Radio and more, delivering a traditional, jovial British Father Christmas performance." },
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
      <InnerPage pageTitle={data.s1} pageSlug="character-voiceover" formIntro="Need a character voice with real personality? Send me a quick message and I'll get back to you." sections={[
        ...(data.s4 ? [{ text: data.s4, audioSrc: '/assets/audio/guy-harris-voiceoverguy-character-showreel.mp3' }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/character-voiceover.webp', imageAlt: 'Character Voiceover \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
