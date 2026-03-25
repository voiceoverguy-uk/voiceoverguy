import type { Metadata } from 'next';
import SantaGeneratorClient from './SantaGeneratorClient';

export const metadata: Metadata = {
  title: 'Santa Script Generator',
  description: "Create a free personalised message from Santa with Guy Harris, the UK's Voice of Santa. Generate your script then book Guy to voice it in broadcast-quality audio.",
  alternates: {
    canonical: 'https://www.voiceoverguy.co.uk/santa-script-generator',
  },
  openGraph: {
    title: 'Santa Script Generator | VoiceoverGuy',
    description: "Generate a personalised Santa message, then get Guy Harris - the UK's Voice of Santa - to record it.",
    url: 'https://www.voiceoverguy.co.uk/santa-script-generator',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/santa-script-generator.webp', width: 1200, height: 630, alt: 'Santa Script Generator – VoiceoverGuy' }],
  },
};

export default function SantaScriptGeneratorPage() {
  return <SantaGeneratorClient />;
}
