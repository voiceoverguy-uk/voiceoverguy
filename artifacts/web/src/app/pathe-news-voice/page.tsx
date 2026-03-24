import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo16'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/pathe-news-voice`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/pathe-news-voice',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg', width: 1200, height: 630, alt: 'Pathe News Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.jpg'],
  },
};

const schemas = [
  profilePage('pathe-news-voice', 'Guy Harris recreates the classic British Pathe News voice with 1940s flair and mid-Atlantic precision, trusted for documentaries, adverts and nostalgic content.', {
    jobTitle: 'Pathe News Style Voiceover Artist',
  }),
  breadcrumb('pathe-news-voice', 'Pathe News Voice'),
  faqPage('pathe-news-voice', [
    { q: 'What is a Pathe News voice?', a: 'A Pathe News voice recreates the distinctive mid-Atlantic, clipped British narration style heard in 1940s and 1950s cinema newsreels. Guy Harris delivers this retro style for documentaries, adverts, and nostalgic content.' },
    { q: 'Can Guy Harris voice my project in the Pathe News style?', a: 'Yes. Guy specialises in authentic Pathe News and Danvers-Walker style voiceovers for radio ads, TV productions, and vintage-themed campaigns.' },
  ]),
  videoObject('pathe-news-voice', data.s1, 'Classic British Pathe News style voiceover by Guy Harris with 1940s flair and mid-Atlantic precision.', 'Hp8-la1KL6E', '2015-07-02'),
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
      <InnerPage pageTitle={data.s1} pageSlug="pathe-news-voice" formIntro="Looking for that classic Pathé-style delivery? Send me a quick message and I'll get back to you." sections={[
        ...(data.s4 ? [{ text: data.s4 }] : []),
        ...(data.s7 ? [{ youtubeId: data.s7 }] : []),
        ...(data.s5 ? [{ text: data.s5 }] : []),
        ...(data.s8 ? [{ youtubeId: data.s8 }] : []),
        ...(data.s6 ? [{ text: data.s6 }] : []),
        { imageSrc: '/assets/images/pathe-voice-og.jpg', imageAlt: 'Path\u00E9 News Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
