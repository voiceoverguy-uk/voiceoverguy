'use client';
import dynamic from 'next/dynamic';

const WaveSurferPlayer = dynamic(() => import('@/components/WaveSurferPlayer'), { ssr: false });

export default function GameshowPlayer() {
  return (
    <WaveSurferPlayer
      src="/assets/audio/bbc-radio-1-headcam-day-gameshow-voice.mp3"
      label="BBC Radio 1 Headcam Day &ndash; Gameshow Voice Promo"
    />
  );
}
