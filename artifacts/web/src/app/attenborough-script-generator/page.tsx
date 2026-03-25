import type { Metadata } from 'next';
import AttenboroughGeneratorClient from './AttenboroughGeneratorClient';

export const metadata: Metadata = {
  title: 'Attenborough Script Generator',
  description: "Use the free David Attenborough Script Generator to transform any scene into a nature-style voiceover script. Then book Guy Harris, the UK's leading Attenborough-style voice.",
  alternates: {
    canonical: 'https://www.voiceoverguy.co.uk/attenborough-script-generator',
  },
  openGraph: {
    title: 'Attenborough Script Generator | VoiceoverGuy',
    description: "Turn any scenario into an Attenborough-style script with AI, then get Guy Harris to voice it.",
    url: 'https://www.voiceoverguy.co.uk/attenborough-script-generator',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/attenborough-script-generator.webp', width: 1200, height: 630, alt: 'David Attenborough Script Generator – VoiceoverGuy' }],
  },
};

export default function AttenboroughScriptGeneratorPage() {
  return <AttenboroughGeneratorClient />;
}
