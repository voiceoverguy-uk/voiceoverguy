import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'British Male Voiceover | Guy Harris – UK Voice Artist',
    template: '%s | VoiceoverGuy',
  },
  description: 'Guy Harris is a professional British male voiceover artist with over 25 years experience. Award-winning voice for TV, radio, games, explainers and events.',
  metadataBase: new URL('https://www.voiceoverguy.co.uk'),
  openGraph: {
    title: 'British Male Voiceover | Guy Harris – UK Voice Artist',
    description: 'Guy Harris is a professional British male voiceover artist with over 25 years experience. Award-winning voice for TV, radio, games, explainers and events.',
    url: 'https://www.voiceoverguy.co.uk',
    siteName: 'VoiceoverGuy',
    images: [
      {
        url: '/assets/images/og-image-guy-harris.jpg',
        width: 1200,
        height: 630,
        alt: 'Guy Harris – British Male Voiceover Artist – VoiceoverGuy',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'British Male Voiceover | Guy Harris – UK Voice Artist',
    description: 'Professional British male voiceover artist. Award-winning voice for TV, radio, games, explainers and events.',
    images: ['/assets/images/og-image-guy-harris.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/assets/images/voiceover-guy-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/images/voiceover-guy-icon.png" />
      </head>
      <body>
        <div className="top-bar" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
