import pages from '@/data/pages.json';
  import type { Metadata } from 'next';

  const data = (pages as Record<string, Record<string, string>>)['faqseo2'];

  export const metadata: Metadata = {
    title: data.faqs7,
    description: data.faqs8,
  };

  const faqKeys = ["faqs2","faqs3","faqs4","faqs5","faqs6","faqs9","faqs10","faqs11","faqs12","faqs13"];

  export default function Page() {
    return (
      <main className="inner-page">
        <section className="inner-hero">
          <div className="inner-container" dangerouslySetInnerHTML={{ __html: data.faqs1 || '' }} />
        </section>
        <div className="inner-bar" />
        <div className="inner-parallax">
          <div className="inner-container">
            <div className="faq-list">
              {faqKeys.map((key) =>
                data[key] ? (
                  <div key={key} className="faq-item" dangerouslySetInnerHTML={{ __html: data[key] }} />
                ) : null
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }
  