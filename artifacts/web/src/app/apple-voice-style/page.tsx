import InnerPage from '@/components/InnerPage';
  import pages from '@/data/pages.json';
  import type { Metadata } from 'next';

  const data = (pages as Record<string, Record<string, string>>)['seo5'];

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
        <InnerPage pageTitle={data.s1} pageSlug="apple-voice-style" sections={[
          ...(data.s4 ? [{ text: data.s4 }] : []),
          ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
          ...(data.s5 ? [{ text: data.s5 }] : []),
          ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
          ...(data.s6 ? [{ text: data.s6 }] : []),
          { imageSrc: '/assets/images/apple-voice-style-og.jpg', imageAlt: 'Apple Voice Style – Guy Harris' },
        ]} />
      </main>
    );
  }
  