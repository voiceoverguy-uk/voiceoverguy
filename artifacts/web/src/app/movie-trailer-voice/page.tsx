import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, faqPage } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo10'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/movie-trailer-voice`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
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
          <div className="inner-container" dangerouslySetInnerHTML={{ __html: data.s3 }} />
        </section>
      )}
      <div className="inner-bar" />
      <InnerPage pageTitle={data.s1} pageSlug="movie-trailer-voice" sections={[
        { text: data.s4 },
        { youtubeId: data.s7 },
        { youtubeId: data.s5 },
        { youtubeId: data.s8 },
        { text: data.s6 },
        { youtubeId: data.s9 },
        { youtubeId: data.s11 },
        { imageSrc: '/assets/images/movie-trailer-voice-og.jpg', imageAlt: 'Movie Trailer Voice \u2013 Guy Harris' },
      ]} />
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
