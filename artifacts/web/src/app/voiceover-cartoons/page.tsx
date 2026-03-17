import type { Metadata } from 'next';
import CartoonGallery from './CartoonGallery';

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/voiceover-cartoons`,
  },
  title: 'Voiceover Cartoons | Guy Harris British Voiceover Artist',
  description: 'Original voiceover cartoons by Guy Harris, illustrated by George Raggett. Funny, relatable humour from real-life British recording studio sessions, character voiceovers, Santa jobs, and audio editing.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.voiceoverguy.co.uk/voiceover-cartoons',
      url: 'https://www.voiceoverguy.co.uk/voiceover-cartoons',
      name: 'Voiceover Cartoons by Guy Harris',
      description: 'A gallery of original cartoons about recording studio life, British voiceover humour, character voiceovers, Santa voiceover sessions, audio editing, and industry life.',
      creator: {
        '@type': 'Person',
        name: 'Guy Harris',
        url: 'https://www.voiceoverguy.co.uk',
        jobTitle: 'British Male Voiceover Artist',
      },
      about: {
        '@type': 'Thing',
        name: 'Voiceover humour and recording studio life',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.voiceoverguy.co.uk/' },
        { '@type': 'ListItem', position: 2, name: 'Voiceover Cartoons', item: 'https://www.voiceoverguy.co.uk/voiceover-cartoons' },
      ],
    },
    {
      '@type': 'ImageGallery',
      name: 'Voiceover Cartoons Gallery',
      url: 'https://www.voiceoverguy.co.uk/voiceover-cartoons',
      creator: {
        '@type': 'Person',
        name: 'Guy Harris',
      },
    },
  ],
};

export default function Page() {
  return (
    <main className="inner-page">
      <section className="inner-hero">
        <div className="inner-container">
          <h1>Voiceover Cartoons by Guy Harris</h1>
          <p>
            These original cartoons were born out of years of real-life voiceover studio sessions: late-night deadlines, oddly specific client briefs, technical gremlins, Santa jobs, character voices, and the general absurdity of life as a British voiceover artist. Each one is a moment from the booth, captured in ink.
          </p>
        </div>
      </section>

      <div className="inner-bar" />

      <div className="inner-parallax">
        <div className="inner-container">

          <CartoonGallery />

          <div className="cartoons-seo-footer">
            <h2>About These Voiceover Cartoons</h2>
            <p>
              Guy Harris is a professional British male voiceover artist based in his own home recording studio, working with clients across the UK and internationally. These voiceover cartoons are a reflection of that world: the industry humour, the recording booth realities, and the characters that populate it.
            </p>
            <p>
              If you enjoy the cartoons, you might also enjoy hearing the real thing. Guy voices{' '}
              <a href="/character-voiceover">character voiceovers</a>,{' '}
              <a href="/movie-trailer-voice">movie trailer voices</a>,{' '}
              <a href="/santa-voice">Santa voiceover calls</a>,{' '}
              <a href="/halloween-voice">spooky and scary voices</a>,{' '}
              <a href="/on-hold-voice">telephone on-hold messages</a>, and much more.
            </p>
            <p>
              Have an idea for a cartoon that captures something from the voiceover world? Guy is always open to suggestions, so get in touch via the{' '}
              <a href="/contact-guy">contact page</a> or browse the{' '}
              <a href="/news-blog">News &amp; Blog</a> for more voiceover humour and industry insights.
            </p>
            <p className="cartoons-raggett-credit">
              All cartoons illustrated by{' '}
              <a href="https://www.instagram.com/georgeraggett/" target="_blank" rel="noopener noreferrer">
                George Raggett
              </a>
              , designed and conceived by Guy Harris.
            </p>
          </div>

          <div className="cartoons-share-notice">
            <p>
              These are original VoiceoverGuy cartoons. If you&apos;d like to share or feature one, just{' '}
              <a href="/contact-guy">get in touch</a> first and please credit VoiceoverGuy.co.uk when using it.
            </p>
          </div>

        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
