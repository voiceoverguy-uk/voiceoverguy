import type { Metadata } from 'next';
import pages from '@/data/pages.json';
import CartoonGallery from './CartoonGallery';

const data = (pages as Record<string, Record<string, string>>)['seo24'];

export const metadata: Metadata = {
  title: data.s1,
  description: data.s2,
};

export default function Page() {
  return (
    <main className="inner-page">
      <section className="inner-hero">
        <div className="inner-container">
          <div dangerouslySetInnerHTML={{ __html: data.s3 || '' }} />
        </div>
      </section>
      <div className="inner-bar" />
      <div className="inner-parallax">
        <div className="inner-container">
          <CartoonGallery />
        </div>
      </div>
    </main>
  );
}
