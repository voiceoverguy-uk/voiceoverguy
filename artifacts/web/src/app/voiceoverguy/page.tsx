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
          { imageSrc: '/assets/images/voiceoverguy-who2.jpg', imageAlt: 'Guy Harris Voiceover' },
          { text: data.s3 },
          { text: data.s4 },
          ...(ytId ? [{ youtubeId: ytId }] : []),
          { imageSrc: '/assets/images/voiceoverguy-who3.jpg', imageAlt: 'Guy Harris Voiceover' },
          { text: data.s5 },
          { text: data.s6 },
          { imageSrc: '/assets/images/guy-harris-male-voiceover-award-winner.jpg', imageAlt: 'Award-Winning Voiceover – Guy Harris' },
          ...(data.s10 ? [{ text: data.s10, fullWidth: true }] : []),
          ...(data.s11 ? [{ text: data.s11, fullWidth: true }] : []),
        ]} />
      </main>
    );
  }
  