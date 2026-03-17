import InnerPage from '@/components/InnerPage';
import pages from '@/data/pages.json';
import type { Metadata } from 'next';
import { SchemaScripts, profilePage, breadcrumb, serviceSchema, faqPage } from '@/lib/staticPageSchema';

const data = (pages as Record<string, Record<string, string>>)['seo10'];

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/movie-trailer-voice`,
  },
  title: data.s1,
  description: data.s2,
};

const schemas = [
  profilePage('movie-trailer-voice', 'Guy Harris provides professional movie trailer voiceover \u2013 dramatic, deep narration for film trailers, teasers and promotional content.'),
  breadcrumb('movie-trailer-voice', 'Movie Trailer Voice'),
  serviceSchema('movie-trailer-voice', 'Movie Trailer Voiceover', 'Professional movie trailer voiceover by Guy Harris \u2013 cinematic, dramatic narration for trailers, promos and film campaigns.'),
  faqPage('movie-trailer-voice', [
    { q: 'Can I hire a movie trailer voiceover artist?', a: 'Yes. Guy Harris provides cinematic movie trailer voiceovers \u2013 deep, dramatic narration for trailers, teasers and promotional campaigns.' },
    { q: 'What makes a great movie trailer voice?', a: 'A great movie trailer voice is deep, dramatic and commanding. Guy Harris delivers professional movie trailer narration with impact and gravitas.' },
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
