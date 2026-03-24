'use client';
import dynamic from 'next/dynamic';

const WaveSurferPlayer = dynamic(() => import('@/components/WaveSurferPlayer'), { ssr: false });

export default function HalloweenPlayer() {
  return (
    <WaveSurferPlayer
      src="https://www.voiceoverguy.co.uk/assets/audio/guy-harris-voiceoverguy-halloween-showreel.mp3"
      label="Spooky Halloween Voice Showreel &ndash; Guy Harris"
    />
  );
}
