import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'British Male Voiceover | Guy Harris – UK Voice Artist',
    template: '%s | VoiceoverGuy',
  },
  description: 'Guy Harris is a professional British male voiceover artist with over 25 years experience. Award-winning voice for TV, radio, games, explainers and events.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
