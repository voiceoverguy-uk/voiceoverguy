"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type WaveSurfer from "wavesurfer.js";

interface WaveSurferPlayerProps {
  src: string;
  label: string;
  compact?: boolean;
}

export default function WaveSurferPlayer({ src, label, compact = false }: WaveSurferPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    import("wavesurfer.js").then((WaveSurferModule) => {
      if (cancelled || !containerRef.current) return;

      const ws = WaveSurferModule.default.create({
        container: containerRef.current,
        waveColor: "#555555",
        progressColor: "#9C060B",
        cursorColor: "#9C060B",
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        height: compact ? 32 : 48,
        normalize: true,
        url: src,
      });

      ws.setVolume(volume);
      wavesurferRef.current = ws;

      ws.on("ready", () => {
        setDuration(ws.getDuration());
      });

      ws.on("audioprocess", () => {
        setCurrentTime(ws.getCurrentTime());
      });

      ws.on("seeking", () => {
        setCurrentTime(ws.getCurrentTime());
      });

      ws.on("play", () => setIsPlaying(true));
      ws.on("pause", () => setIsPlaying(false));
      ws.on("finish", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    });

    return () => {
      cancelled = true;
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [src, compact]);

  const togglePlay = useCallback(() => {
    wavesurferRef.current?.playPause();
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    wavesurferRef.current?.setVolume(newVolume);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const rootClass = compact ? "wavesurfer-player wavesurfer-compact" : "wavesurfer-player";

  return (
    <div className={rootClass}>
      {!compact && <p className="wavesurfer-label" dangerouslySetInnerHTML={{ __html: label }} />}
      <div className="wavesurfer-controls">
        <button
          type="button"
          className="wavesurfer-play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg width={compact ? "14" : "18"} height={compact ? "14" : "18"} viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width={compact ? "14" : "18"} height={compact ? "14" : "18"} viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
        <div className="wavesurfer-waveform" ref={containerRef} />
        <span className="wavesurfer-time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <div className="wavesurfer-volume">
          <svg width={compact ? "14" : "16"} height={compact ? "14" : "16"} viewBox="0 0 24 24" fill="currentColor" className="wavesurfer-volume-icon">
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
            {volume > 0 && <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />}
            {volume > 0.5 && <path d="M19 12c0 3.53-2.04 6.58-5 8.05v-2.17c1.81-1.28 3-3.39 3-5.88s-1.19-4.6-3-5.88V4c2.96 1.46 5 4.52 5 8.05z" />}
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="wavesurfer-volume-slider"
            aria-label="Volume"
          />
        </div>
      </div>
      {compact && <p className="wavesurfer-label" dangerouslySetInnerHTML={{ __html: label }} />}
    </div>
  );
}
