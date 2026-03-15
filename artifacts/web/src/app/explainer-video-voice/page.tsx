import InnerPage from '@/components/InnerPage';
  import pages from '@/data/pages.json';
  import type { Metadata } from 'next';

  const data = (pages as Record<string, Record<string, string>>)['seo19'];

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
          { vimeoId: data.s7 },
          { text: data.s5 },
          { vimeoId: data.s8 },
          { text: data.s6 },
          { vimeoId: data.s9 },
          { text: data.s10 },
          { vimeoId: data.s11 },
          { text: data.s12 },
          { vimeoId: data.s13 },
          { text: data.s14 },
          { vimeoId: data.s15 },
          ...(data.s16 ? [{ text: data.s16, fullWidth: true }] : []),
        ]} />
      </main>
    );
  }
  