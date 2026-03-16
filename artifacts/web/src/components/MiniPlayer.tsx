'use client';

import { useState, useRef, useEffect } from 'react';

interface MiniPlayerProps {
  src: string;
  title: string;
  artwork?: string;
}

function formatTime(s: number) {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function MiniPlayer({ src, title, artwork }: MiniPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setProgress(audio.currentTime);
    const onDur = () => setDuration(audio.duration);
    const onEnd = () => { setPlaying(false); setProgress(0); };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('durationchange', onDur);
    audio.addEventListener('loadedmetadata', onDur);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('durationchange', onDur);
      audio.removeEventListener('loadedmetadata', onDur);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = Number(e.target.value);
    audio.currentTime = t;
    setProgress(t);
  };

  const percent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="mini-player">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="mini-player-artwork">
        {artwork ? (
          <img src={artwork} alt={title} className="mini-player-artwork-img" />
        ) : (
          <div className="mini-player-artwork-fallback">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
            </svg>
          </div>
        )}
      </div>

      <div className="mini-player-info">
        <div className="mini-player-title">{title}</div>

        <div className="mini-player-controls">
          <button
            className="mini-player-play-btn"
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>

          <div className="mini-player-scrub-wrap">
            <div className="mini-player-scrub-track">
              <div className="mini-player-scrub-fill" style={{ width: `${percent}%` }} />
              <input
                type="range"
                className="mini-player-scrub-input"
                min={0}
                max={duration || 0}
                step={0.1}
                value={progress}
                onChange={seek}
                aria-label="Seek"
              />
            </div>
            <div className="mini-player-time">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
