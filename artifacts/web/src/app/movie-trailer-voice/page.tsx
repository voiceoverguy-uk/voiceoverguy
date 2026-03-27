import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import { normaliseHtml } from '@/lib/normaliseHtml';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, faqPage, videoObject } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo10'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/movie-trailer-voice`,
  },
  title: data.s1,
  description: data.s2,
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/movie-trailer-voice',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Movie Trailer Voice – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
  },
};

const schemas = [
  profilePage('movie-trailer-voice', 'Guy Harris delivers dramatic movie trailer voiceovers in UK and US styles for TV, radio, film and online campaigns.'),
  breadcrumb('movie-trailer-voice', 'Movie Trailer Voice'),
  videoObject('movie-trailer-voice', data.s1, 'Movie trailer voiceover demo by Guy Harris, delivering dramatic UK and US-style trailer narration.', 'Cncd3VgDQ9s', '2019-06-11'),
  faqPage('movie-trailer-voice', [
    { q: 'Can I hire Guy Harris for a movie trailer voiceover?', a: 'Yes. Guy Harris provides movie trailer-style voiceovers for TV, radio, film, events, and online use. His voice has been featured in campaigns for BBC, ITV, and major games and promos.' },
    { q: 'What styles of movie trailer voice can Guy deliver?', a: 'Guy can deliver both UK and US-style movie trailer voices, ranging from deep dramatic tones to parody-style trailers with impact.' },
    { q: "Where is Guy\u2019s voiceover studio located?", a: 'Guy records from his professional studio in Wakefield, West Yorkshire. Sessions can be directed live via Source Connect, Cleanfeed, or Zoom.' },
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
      <InnerPage pageTitle={data.s1} pageSlug="movie-trailer-voice" formIntro="Looking for that deep movie trailer voice? Send me a quick message and I'll get back to you." sections={[
        { text: data.s4, audioSrc: '/assets/audio/the-movie-trailer-voice-guy-harris.mp3' },
        { youtubeId: data.s7 },
        { youtubeId: data.s8 },
        { text: data.s6 },
        { youtubeId: data.s9 },
        { imageSrc: '/assets/images/movie-trailer-voice-og.webp', imageAlt: 'Movie Trailer Voice \u2013 Guy Harris' },
        { text: data.s12 },
        { youtubeId: data.s11 },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
