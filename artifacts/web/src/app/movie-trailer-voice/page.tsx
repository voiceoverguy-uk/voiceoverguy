import InnerPage from '@/components/InnerPage';
  import pages from '@/data/pages.json';
  import type { Metadata } from 'next';

  const data = (pages as Record<string, Record<string, string>>)['seo10'];

  export const metadata: Metadata = {
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
        <InnerPage sections={[
          { text: data.s4 },
          { youtubeId: data.s7 },
          { youtubeId: data.s5 },
          { youtubeId: data.s8 },
          { text: data.s6 },
          { youtubeId: data.s9 },
          { youtubeId: data.s11 },
          { imageSrc: '/assets/images/movie-trailer-voice-og.jpg', imageAlt: 'Movie Trailer Voice – Guy Harris' },
        ]} />
      </main>
    );
  }
  