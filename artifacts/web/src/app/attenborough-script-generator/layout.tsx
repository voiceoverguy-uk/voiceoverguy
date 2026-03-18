import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'David Attenborough Script Generator',
  description: "Try the David Attenborough Script Generator. Type a scene and get a nature-style narration. Created by Guy Harris - the UK's top Attenborough voice soundalike",
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/attenborough-script-generator' },
  openGraph: {
    title: 'David Attenborough Script Generator | VoiceoverGuy',
    description: "Type a quirky scenario and watch it turn into a nature-style narration. Then get the real VoiceoverGuy to voice it like Attenborough!",
    url: 'https://www.voiceoverguy.co.uk/attenborough-script-generator',
    images: ['https://www.voiceoverguy.co.uk/assets/images/attenborough-script-generator.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Attenborough Script Generator | VoiceoverGuy',
    description: "Enter a fun wildlife scene and hear it narrated in Attenborough's style. Then book Guy Harris - the UK's leading Attenborough voice.",
    images: ['https://www.voiceoverguy.co.uk/assets/images/attenborough-script-generator.jpg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
