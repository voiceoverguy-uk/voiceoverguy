'use client';
import React from 'react';

export default function YouTubeEmbed({ id, poster }: { id: string; poster?: string }) {
  const cleanId = id.replace(/\/.*$/, '').trim();
  const [active, setActive] = React.useState(!poster);

  if (!active && poster) {
    return (
      <div
        className="embed-wrap yt-poster-wrap"
        onClick={() => setActive(true)}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <img
          src={poster}
          alt="Play video"
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, borderRadius: 'inherit' }}
        />
        <div className="yt-poster-play">
          <svg viewBox="0 0 68 48" width="68" height="48">
            <path d="M66.52 7.74C65.7 4.64 63.25 2.2 60.14 1.38 54.88 0 34 0 34 0S13.12 0 7.86 1.38C4.75 2.2 2.3 4.64 1.48 7.74 0 13 0 24 0 24s0 11 1.48 16.26c.82 3.1 3.27 5.54 6.38 6.36C13.12 48 34 48 34 48s20.88 0 26.14-1.38c3.11-.82 5.56-3.26 6.38-6.36C68 35 68 24 68 24s0-11-1.48-16.26z" fill="#f00"/>
            <path d="M45 24 27 14v20" fill="#fff"/>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="embed-wrap">
      <iframe
        src={`https://www.youtube.com/embed/${cleanId}${poster ? '?autoplay=1' : ''}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
