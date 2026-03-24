import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Santa Script Generator',
  description: "Try the Santa Script Generator. Type some info about who the message is for and receive a message back from Santa. Created by Guy Harris - the UK's Voice of Santa",
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/santa-script-generator' },
  openGraph: {
    title: 'Santa Script Generator | VoiceoverGuy',
    description: "Type some info about who the message is for and receive a message back from Santa. Created by Guy Harris - the UK's Voice of Santa",
    url: 'https://www.voiceoverguy.co.uk/santa-script-generator',
    images: ['https://www.voiceoverguy.co.uk/assets/images/santa-script-generator.webp'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Santa Script Generator | VoiceoverGuy',
    description: "Type some info about who the message is for and receive a message back from Santa. Created by Guy Harris - the UK's Voice of Santa",
    images: ['https://www.voiceoverguy.co.uk/assets/images/santa-script-generator.webp'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
