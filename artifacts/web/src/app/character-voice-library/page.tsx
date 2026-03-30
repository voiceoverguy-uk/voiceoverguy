import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SchemaScripts, webPage, breadcrumb, serviceSchema } from '@/lib/staticPageSchema';
import CharacterVoiceLibraryClient from '@/components/CharacterVoiceLibraryClient';

export const metadata: Metadata = {
  title: 'Character Voice Library | Guy Harris – VoiceoverGuy',
  description: 'Browse Guy Harris\'s character voice library. Listen to individual voice demos including serious male, animated family film promo, and comedic character styles.',
  alternates: {
    canonical: 'https://www.voiceoverguy.co.uk/character-voice-library',
  },
  openGraph: {
    title: 'Character Voice Library | Guy Harris – VoiceoverGuy',
    description: 'Browse Guy Harris\'s character voice library. Listen to individual voice demos including serious male, animated family film promo, and comedic character styles.',
    url: 'https://www.voiceoverguy.co.uk/character-voice-library',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Character Voice Library – Guy Harris' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Character Voice Library | Guy Harris – VoiceoverGuy',
    description: 'Browse Guy Harris\'s character voice library. Listen to individual voice demos including serious male, animated family film promo, and comedic character styles.',
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
  },
};

const schemas = [
  webPage(
    'character-voice-library',
    'Character Voice Library – Guy Harris',
    'Browse and listen to individual character voice demos by Guy Harris, including serious male, animated family film promo, and comedic character styles.',
  ),
  breadcrumb('character-voice-library', 'Character Voice Library'),
  serviceSchema(
    'character-voice-library',
    'Character Voice Library',
    'A library of individual character voice demos by UK voiceover artist Guy Harris, covering serious, animated and comedic styles.',
  ),
];

export default function Page() {
  return (
    <main className="inner-page">
      <section className="inner-hero">
        <div className="inner-container">
          <h1>Character Voice Library</h1>
          <p>Browse a growing library of character voice demos, impressions, comedy styles and larger-than-life reads from British voice artist Guy Harris.</p>
        </div>
      </section>
      <div className="inner-bar" />
      <section className="inner-container cvl-section">
        <div className="cvl-banner">
          <p>Each demo below showcases a distinct character voice style. Press play on any track to hear it, or use the search to filter by style, type or character name.</p>
        </div>
        <Suspense fallback={<div className="cvl-loading">Loading voice library...</div>}>
          <CharacterVoiceLibraryClient />
        </Suspense>
      </section>
      <SchemaScripts schemas={schemas} />
    </main>
  );
}
