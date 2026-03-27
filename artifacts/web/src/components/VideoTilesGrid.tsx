'use client';

import { useState, useEffect, useCallback } from 'react';

const videoTiles = [
  {
    img: '/assets/images/voiceoverguy-home-commercial-voice.jpg',
    titleOverlay: 'Commercial Voice',
    captionLine1: '',
    captionHighlight: 'Commercial',
    captionLine1End: 'Voice Showreel',
    ytId: '9bs4CJ4RixI',
  },
  {
    img: '/assets/images/voiceoverguy-home-character-voices.jpg',
    titleOverlay: 'Character Voices',
    captionLine1: '',
    captionHighlight: 'Character',
    captionLine1End: 'Voice Showreel',
    ytId: 'Ad85PPvSfbc',
  },
  {
    img: '/assets/images/voiceoverguy-home-apple-voice.jpg',
    titleOverlay: 'The Apple Voice',
    captionLine1: 'That',
    captionHighlight: 'Apple',
    captionLine1End: 'Advert Voice',
    ytId: 'uYDQObLc1vw',
  },
  {
    img: '/assets/images/voiceoverguy-home-explainer-voices.jpg',
    titleOverlay: 'Explainer Voices',
    captionLine1: '',
    captionHighlight: 'Explainer',
    captionLine1End: 'Video Showreel',
    ytId: 'TGD6Btk4twk',
  },
  {
    img: '/assets/images/voiceoverguy-home-what-i-do.jpg',
    titleOverlay: 'This is what I do...',
    captionLine1: 'Well? This is what',
    captionHighlight: 'i do',
    captionLine1End: '',
    ytId: 'TqkdBK8mBW8',
  },
  {
    img: '/assets/images/voiceoverguy-home-voice-of-santa.jpg',
    titleOverlay: 'Voice of Santa',
    captionLine1: 'Ho Ho Ho! The Voice of',
    captionHighlight: 'Santa',
    captionLine1End: '',
    ytId: 'P44bGiUI0vE',
  },
];

export default function VideoTilesGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const close = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeId, close]);

  return (
    <>
      <div className="video-grid">
        {videoTiles.map(v => (
          <div key={v.ytId} className="video-tile-card">
            <button
              type="button"
              className="video-thumb"
              aria-label={`Play ${v.titleOverlay}`}
              onClick={() => setActiveId(v.ytId)}
            >
              <img
                src={v.img}
                alt={v.titleOverlay}
                width={400}
                height={225}
                loading="lazy"
              />
              <div className="yt-play-btn" aria-hidden="true">
                <svg viewBox="0 0 68 48" width="68" height="48">
                  <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00" fillOpacity="0.9"/>
                  <path d="M 45,24 27,14 27,34" fill="#fff"/>
                </svg>
              </div>
            </button>
            <div className="video-caption">
              <p>{v.captionLine1} <span className="text-red">{v.captionHighlight}</span> {v.captionLine1End}</p>
            </div>
          </div>
        ))}
      </div>

      {activeId && (
        <div
          className="yt-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          onClick={close}
        >
          <div className="yt-modal-inner" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className="yt-modal-close"
              aria-label="Close video"
              onClick={close}
            >
              &times;
            </button>
            <div className="yt-modal-frame">
              <iframe
                src={`https://www.youtube.com/embed/${activeId}?autoplay=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
