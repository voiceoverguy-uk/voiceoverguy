import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo2'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/voiceoverguy`,
  },
  title: data.s7,
  description: data.s8,
  openGraph: {
    title: `${data.s7} | VoiceoverGuy`,
    description: data.s8,
    url: 'https://www.voiceoverguy.co.uk/voiceoverguy',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg', width: 1200, height: 630, alt: 'Guy Harris – British Male Voiceover Artist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s7} | VoiceoverGuy`,
    description: data.s8,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg'],
  },
};

const schemas = [
  profilePage('voiceoverguy', 'Guy Harris is an award-winning British voiceover artist with over 25 years of experience, known for his versatility in character voices such as Santa, Attenborough, Pirate, and Gameshow Host.', {
    alternateName: 'VoiceoverGuy',
    worksFor: { '@type': 'Organization', name: 'VoiceoverGuy' },
  }),
  breadcrumb('voiceoverguy', 'About Guy Harris'),
];

export default function Page() {
  const ytId = (data.s9 || '').replace('https://www.youtube.com/embed/', '').trim();
  return (
    <main className="inner-page">
      {data.s1 && (
        <section className="inner-hero">
          <div className="inner-container" dangerouslySetInnerHTML={{ __html: normaliseHtml(data.s1) }} />
        </section>
      )}
      <div className="inner-bar" />
      <InnerPage sections={[
        { text: data.s2 },
        { imageSrc: '/assets/images/voiceoverguy-who1.png', imageAlt: 'Guy Harris \u2013 British Male Voiceover Artist' },
        { text: data.s3 },
        { imageSrc: '/assets/images/voiceoverguy-skateboarder.jpg', imageAlt: 'Versatile Voiceover \u2013 Guy Harris' },
        { text: data.s6 },
        { imageSrc: '/assets/images/voiceover-studio-yorkshire.jpg', imageAlt: 'Professional Voiceover Studio \u2013 Guy Harris' },
        { text: data.s4, fullWidth: true },
        { imageSrc: '/assets/images/voiceoverguy-character-voices.jpg', imageAlt: 'Character Voices \u2013 Guy Harris' },
        { text: data.s5 },
        { imageSrc: '/assets/images/guy-harris-uk-voice-of-santa.jpg', imageAlt: 'Guy Harris \u2013 UK Voice of Santa' },
        { text: data.s10 },
        ...(ytId ? [{ youtubeId: ytId }] : []),
        { text: data.s11 },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
