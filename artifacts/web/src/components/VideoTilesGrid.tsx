'use client';

import { useState } from 'react';
import { ConsentGate } from '@/components/ThirdPartyConsent';

const videoTiles = [
  {
    img: '/assets/images/home-commercial-voiceover-showreel.webp',
    titleOverlay: 'Commercial Voice',
    captionLine1: '',
    captionHighlight: 'Commercial',
    captionLine1End: 'Voice Showreel',
    ytId: '9bs4CJ4RixI',
  },
  {
    img: '/assets/images/home-character-voices.webp',
    titleOverlay: 'Character Voices',
    captionLine1: '',
    captionHighlight: 'Character',
    captionLine1End: 'Voice Showreel',
    ytId: 'Ad85PPvSfbc',
  },
  {
    img: '/assets/images/home-that-apple-advert-voice.webp',
    titleOverlay: 'The Apple Voice',
    captionLine1: 'That',
    captionHighlight: 'Apple',
    captionLine1End: 'Advert Voice',
    ytId: 'uYDQObLc1vw',
  },
  {
    img: '/assets/images/home-explainer-and-narration.webp',
    titleOverlay: 'Explainer Voices',
    captionLine1: '',
    captionHighlight: 'Explainer',
    captionLine1End: 'Video Showreel',
    ytId: 'TGD6Btk4twk',
  },
  {
    img: '/assets/images/home-meet-guy-harris.webp',
    titleOverlay: 'This is what I do...',
    captionLine1: 'Well? This is what',
    captionHighlight: 'i do',
    captionLine1End: '',
    ytId: 'TqkdBK8mBW8',
  },
  {
    img: '/assets/images/home-the-uks-voice-of-santa.webp',
    titleOverlay: 'Voice of Santa',
    captionLine1: 'Ho Ho Ho! The Voice of',
    captionHighlight: 'Santa',
    captionLine1End: '',
    ytId: 'P44bGiUI0vE',
  },
];

export default function VideoTilesGrid() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <div className="video-grid">
      {videoTiles.map(v => (
        <div key={v.ytId} className="video-tile-card">
          {playingId === v.ytId ? (
            <ConsentGate category="media" provider="YouTube" className="video-inline-frame">
            <div className="video-inline-frame">
              <iframe
                src={`https://www.youtube.com/embed/${v.ytId}?autoplay=1&rel=0`}
                title={v.titleOverlay}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            </ConsentGate>
          ) : (
            <button
              type="button"
              className="video-thumb"
              aria-label={`Play ${v.titleOverlay}`}
              onClick={() => setPlayingId(v.ytId)}
            >
              <img
                src={v.img}
                alt={v.titleOverlay}
                width={400}
                height={225}
                loading="lazy"
              />
            </button>
          )}
          <div className="video-caption">
            <p>{v.captionLine1} <span className="text-red">{v.captionHighlight}</span> {v.captionLine1End}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
