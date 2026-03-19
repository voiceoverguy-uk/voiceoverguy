import InnerPage from '@/components/InnerPage';
import Link from 'next/link';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, webPage, breadcrumb, serviceSchema, faqPage, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo12'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/santa-voice`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/santa-voice',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg', width: 1200, height: 630, alt: 'Santa Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg'],
  },
};

const schemas = [
  webPage('santa-voice', 'Santa Voice \u2013 Guy Harris', "Guy Harris is the UK's No.1 Voice of Santa, trusted by BBC Radio 1, BBC Radio 2, Heart, Capital, ITV, Asda, Tesco, Butlins and more for Father Christmas voiceovers."),
  breadcrumb('santa-voice', 'Santa Voice'),
  serviceSchema('santa-voice', 'Santa Voiceover', "Professional Santa Claus / Father Christmas voiceover by Guy Harris \u2013 the UK's most-booked Voice of Santa for radio, TV, events and campaigns."),
  videoObject('santa-voice', "The UK\u2019s Official No.1 Voice of Santa \u2013 Guy Harris", "Guy Harris is the UK\u2019s busiest Santa voice for BBC Radio 2, ITV, Heart, Santa Radio, Capital and more. A fun, warm and iconic Father Christmas voice.", 'P44bGiUI0vE', '2022-11-18', '1'),
  videoObject('santa-voice', 'CBeebies Go Jetters \u2013 Santa Voice by Guy Harris', 'Guy Harris voices Santa Claus in the Go Jetters North Pole Christmas Special on CBeebies.', 'yi-4Fm40nmE', '2016-12-07', '2'),
  faqPage('santa-voice', [
    { q: 'Who is the best Santa voiceover artist in the UK?', a: "Guy Harris is widely considered the UK's No.1 Voice of Santa, with credits for BBC Radio 1, BBC Radio 2, Heart, Capital, ITV, Asda, Tesco and Butlins." },
    { q: 'Can I hire a Santa voice for my Christmas campaign?', a: 'Yes. Guy Harris provides professional Santa Claus voiceovers for TV, radio, digital campaigns, corporate events, personalised messages and more.' },
    { q: 'What does a Santa voiceover cost?', a: 'Pricing depends on usage and length. Most Santa voiceover projects start from \u00A349.99 for web use. Contact Guy for a fast, no-obligation quote.' },
    { q: 'Can Guy Harris do a live Santa voice at my event?', a: 'Yes. Guy Harris provides live Voice of Santa performances for grottos, shopping centres, corporate events and Christmas light switch-ons.' },
    { q: 'Is this a real Santa voice or AI?', a: 'This is a real human performance by professional British voice artist Guy Harris \u2013 not AI-generated.' },
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
      <InnerPage pageTitle={data.s1} pageSlug="santa-voice" sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/santa-voice-guy-harris.jpg', imageAlt: 'Santa Voice \u2013 Guy Harris' },
      ]} />
      <section className="generator-promo">
        <div className="container">
          <h2>Try the Free Santa Script Generator</h2>
          <p>
            Want a personalised message from Father Christmas? Use the free Santa Script Generator to create
            a festive, one-of-a-kind message in seconds. Then book Guy Harris to voice it professionally
            and make Christmas truly magical.
          </p>
          <Link href="/santa-script-generator" className="generator-promo-btn">
            Try the Santa Script Generator
          </Link>
        </div>
      </section>
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
