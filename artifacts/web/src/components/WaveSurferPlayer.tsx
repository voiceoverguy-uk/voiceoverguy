"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type WaveSurfer from "wavesurfer.js";

const PLAY_EVENT = "vog:play";

interface WaveSurferPlayerProps {
  src: string;
  label?: string;
  compact?: boolean;
  downloadable?: boolean;
}

export default function WaveSurferPlayer({ src, label, compact = false, downloadable = false }: WaveSurferPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !(window as unknown as Record<string, unknown>).MSStream);
  }, []);

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

      ws.on("play", () => {
        setIsPlaying(true);
        window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: { src } }));
      });

      ws.on("pause", () => setIsPlaying(false));

      ws.on("finish", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    });

    const handleOtherPlay = (e: Event) => {
      const detail = (e as CustomEvent<{ src: string }>).detail;
      if (detail.src !== src && wavesurferRef.current) {
        wavesurferRef.current.pause();
      }
    };

    window.addEventListener(PLAY_EVENT, handleOtherPlay);

    return () => {
      cancelled = true;
      window.removeEventListener(PLAY_EVENT, handleOtherPlay);
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
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
      wavesurferRef.current?.setMuted(false);
    }
    wavesurferRef.current?.setVolume(newVolume);
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    const ws = wavesurferRef.current;
    if (!ws) return;
    const next = !isMuted;
    setIsMuted(next);
    ws.setMuted(next);
  }, [isMuted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const rootClass = compact ? "wavesurfer-player wavesurfer-compact" : "wavesurfer-player";

  const mutedOrSilent = isMuted || volume === 0;

  return (
    <div className={rootClass}>
      {!compact && label && <p className="wavesurfer-label" dangerouslySetInnerHTML={{ __html: label }} />}
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
          <button
            type="button"
            onClick={toggleMute}
            className="wavesurfer-mute-btn"
            aria-label={mutedOrSilent ? "Unmute" : "Mute"}
            title={mutedOrSilent ? "Unmute" : "Mute"}
          >
            <svg width={compact ? "14" : "16"} height={compact ? "14" : "16"} viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3z" />
              {mutedOrSilent ? (
                <path d="M16.5 12l2.5-2.5-1.4-1.4L15 10.6l-2.1-2.1-1.4 1.4L13.6 12l-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4L16.5 12z" />
              ) : (
                <>
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                  {volume > 0.5 && <path d="M19 12c0 3.53-2.04 6.58-5 8.05v-2.17c1.81-1.28 3-3.39 3-5.88s-1.19-4.6-3-5.88V4c2.96 1.46 5 4.52 5 8.05z" />}
                </>
              )}
            </svg>
          </button>
          {!isIOS && (
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
          )}
        </div>
        {downloadable && (
          <a
            href={src}
            download
            className="wavesurfer-download-btn"
            aria-label="Download audio"
            title="Download"
          >
            <svg width={compact ? "16" : "32"} height={compact ? "16" : "32"} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 16l-6-6h4V4h4v6h4l-6 6z" />
              <path d="M5 20h14v-2H5v2z" />
            </svg>
          </a>
        )}
      </div>
      {compact && label && <p className="wavesurfer-label" dangerouslySetInnerHTML={{ __html: label }} />}
    </div>
  );
}
