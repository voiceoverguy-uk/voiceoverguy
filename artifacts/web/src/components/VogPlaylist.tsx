'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const tracks = [
  {
    src: '/assets/audio/voice-of-god-demo-showreel-guy-harris.mp3',
    title: 'Voice Of God Demo Showreel – Guy Harris',
    label: 'Voice Of God Demo Showreel',
  },
  {
    src: '/assets/audio/ant-and-dec-takeaway-on-tour-voice-of-god.mp3',
    title: 'ANT & DEC Takeaway on Tour – Voice of God',
    label: 'ANT & DEC Takeaway on Tour',
  },
  {
    src: '/assets/audio/butlins-voice-of-god-guy-harris.mp3',
    title: 'Butlins – Voice of God – Guy Harris',
    label: 'Butlins Voice of God',
  },
];

function formatTime(s: number) {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function VogPlaylist() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playTrack = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
    setPlaying(true);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = tracks[current].src;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [current]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => {
      const next = (current + 1) % tracks.length;
      playTrack(next);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('loadedmetadata', onDurationChange);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('loadedmetadata', onDurationChange);
      audio.removeEventListener('ended', onEnded);
    };
  }, [current, playTrack]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON') return;
      if ((e.target as HTMLElement)?.isContentEditable) return;
      if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [playing]);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = Number(e.target.value);
    audio.currentTime = t;
    setProgress(t);
  };

  const percent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="vog-player">
      <audio ref={audioRef} preload="metadata" />

      {/* Top: photo + now-playing bar */}
      <div className="vog-player-top">
        <img
          src="/assets/images/voice-of-god-voice-og.webp"
          alt="Guy Harris – Voice of God"
          className="vog-player-photo"
        />
        <div className="vog-player-controls">
          <div className="vog-player-meta">
            <span className="vog-player-brand">VoiceoverGuy</span>
            <span className="vog-player-title">{tracks[current].title}</span>
          </div>

          <div className="vog-player-bar">
            <button
              className={`vog-play-btn${playing ? ' vog-play-btn--playing' : ''}`}
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>

            <div className="vog-scrub-wrap">
              <div className="vog-scrub-track">
                <div className="vog-scrub-fill" style={{ width: `${percent}%` }} />
                <input
                  type="range"
                  className="vog-scrub-input"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={progress}
                  onChange={seek}
                  aria-label="Seek"
                />
              </div>
              <div className="vog-time">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track list */}
      <div className="vog-track-list">
        {tracks.map((t, i) => (
          <button
            key={t.src}
            className={`vog-track${i === current ? ' vog-track--active' : ''}`}
            onClick={() => playTrack(i)}
            aria-label={`Play ${t.title}`}
          >
            <span className="vog-track-icon">
              {i === current && playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </span>
            <img
              src="/assets/images/voice-of-god-voice-og.webp"
              alt=""
              className="vog-track-thumb"
            />
            <span className="vog-track-name">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Footer branding */}
      <div className="vog-player-footer">
        <img
          src="/assets/images/voice-of-god-voice-og.webp"
          alt=""
          className="vog-footer-thumb"
        />
        <span>VoiceoverGuy · Voice of God</span>
      </div>
    </div>
  );
}
