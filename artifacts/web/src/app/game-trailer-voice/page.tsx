import InnerPage from '@/components/InnerPage';
  import pages from '@/data/pages.json';
  import type { Metadata } from 'next';

  const data = (pages as Record<string, Record<string, string>>)['seo26'];

  export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/game-trailer-voice`,
  },
    title: data.s1,
    description: data.s2,
  };

  export default function Page() {
    return (
      <main className="inner-page">
        {data.s3 && (
          <section className="inner-hero">
            <div className="inner-container" dangerouslySetInnerHTML={{ __html: data.s3 }} />
          </section>
        )}
        <div className="inner-bar" />
        <InnerPage pageTitle={data.s1} pageSlug="game-trailer-voice" sections={[
          { text: data.s4 },
          { youtubeId: data.s7 },
          { text: data.s5 },
          { youtubeId: data.s8 },
          { text: data.s6 },
          { youtubeId: data.s9 },
          { text: data.s11 },
          { youtubeId: data.s10 },
          { text: data.s12 },
          { youtubeId: data.s13 },
        ]} />
      </main>
    );
  }
  