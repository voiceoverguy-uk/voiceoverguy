import InnerPage from '@/components/InnerPage';
  import pages from '@/data/pages.json';
  import type { Metadata } from 'next';

  const data = (pages as Record<string, Record<string, string>>)['seo2'];

  export const metadata: Metadata = {
    title: data.s7,
    description: data.s8,
  };

  export default function Page() {
    const ytId = (data.s9 || '').replace('https://www.youtube.com/embed/', '').trim();
    return (
      <main className="inner-page">
        {data.s1 && (
          <section className="inner-hero">
            <div className="inner-container" dangerouslySetInnerHTML={{ __html: data.s1 }} />
          </section>
        )}
        <div className="inner-bar" />
        <InnerPage sections={[
          { text: data.s2 },
          { imageSrc: '/assets/images/voiceoverguy-who1.png', imageAlt: 'Guy Harris – British Male Voiceover Artist' },
          { text: data.s3 },
          { imageSrc: '/assets/images/voiceoverguy-skateboarder.jpg', imageAlt: 'Versatile Voiceover – Guy Harris' },
          { text: data.s6 },
          { imageSrc: '/assets/images/voiceover-studio-yorkshire.jpg', imageAlt: 'Professional Voiceover Studio – Guy Harris' },
          { text: data.s4, fullWidth: true },
          { imageSrc: '/assets/images/voiceoverguy-character-voices.jpg', imageAlt: 'Character Voices – Guy Harris' },
          { text: data.s5 },
          { imageSrc: '/assets/images/guy-harris-uk-voice-of-santa.jpg', imageAlt: 'Guy Harris – UK Voice of Santa' },
          { text: data.s10 },
          ...(ytId ? [{ youtubeId: ytId }] : []),
          { text: data.s11 },
        ]} />
      </main>
    );
  }
  