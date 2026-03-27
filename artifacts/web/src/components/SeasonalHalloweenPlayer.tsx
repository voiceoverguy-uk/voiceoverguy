'use client';

import dynamic from 'next/dynamic';

const WaveSurferPlayer = dynamic(() => import('@/components/WaveSurferPlayer'), { ssr: false });

function isHalloweenSeason(): boolean {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  const afterSept1 = month > 8 || (month === 8 && day >= 1);
  const beforeNov11 = month < 10 || (month === 10 && day <= 10);
  return afterSept1 && beforeNov11;
}

export default function SeasonalHalloweenPlayer({ yr }: { yr: number }) {
  if (!isHalloweenSeason()) return null;
  return (
    <div className="showreel-seasonal-wrap">
      <div className="showreel-player-item">
        <WaveSurferPlayer
          src="/assets/audio/spooky-showreel-26-guy-harris.mp3"
          label={`<span class="text-red">Spooky Halloween</span> Voice ${yr}`}
          compact
        />
      </div>
    </div>
  );
}
