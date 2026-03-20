import { useState, useRef, useEffect, useCallback } from 'react';
import VideoTemplate from './video/VideoTemplate';
import { toPng } from 'html-to-image';
import { Muxer, ArrayBufferTarget } from 'mp4-muxer';

type AspectRatio = 'square' | 'portrait';

const ASPECT_CONFIGS = {
  square: { width: 1080, height: 1080, label: '1:1 Square', cssRatio: '1 / 1' },
  portrait: { width: 1080, height: 1350, label: '4:5 Portrait', cssRatio: '4 / 5' },
} as const;

const TOTAL_DURATION_MS = 36500;
const FPS = 10;
const FRAME_INTERVAL = 1000 / FPS;

export default function VideoControls() {
  const [aspect, setAspect] = useState<AspectRatio>('square');
  const [paused, setPaused] = useState(false);
  const [pausedFrame, setPausedFrame] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const config = ASPECT_CONFIGS[aspect];

  const recordUrl = `${window.location.pathname}?record&aspect=${aspect}`;

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      const maxW = Math.min(parent.clientWidth * 0.85, 540);
      const s = maxW / config.width;
      setScale(s);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [config.width]);

  const captureFullResFrame = useCallback(async (): Promise<string | null> => {
    if (!videoContentRef.current) return null;
    const el = videoContentRef.current;
    const origTransform = el.style.transform;
    const origPos = el.style.position;
    el.style.transform = 'none';
    el.style.position = 'absolute';
    try {
      const dataUrl = await toPng(el, {
        width: config.width,
        height: config.height,
        pixelRatio: 1,
        backgroundColor: '#000000',
        skipAutoScale: true,
        cacheBust: true,
      });
      return dataUrl;
    } catch {
      return null;
    } finally {
      el.style.transform = origTransform;
      el.style.position = origPos;
    }
  }, [config.width, config.height]);

  const handlePause = useCallback(async () => {
    if (paused) {
      setPaused(false);
      setPausedFrame(null);
    } else {
      const frame = await captureFullResFrame();
      setPausedFrame(frame);
      setPaused(true);
    }
  }, [paused, captureFullResFrame]);

  const handleDownload = useCallback(async () => {
    if (!videoContentRef.current || isRecording) return;

    if (typeof VideoEncoder === 'undefined') {
      setProgress('Your browser does not support MP4 export. Use Chrome 94+ or Edge.');
      setTimeout(() => setProgress(''), 5000);
      return;
    }

    setIsRecording(true);
    setProgress('Preparing MP4...');

    try {
      const canvas = document.createElement('canvas');
      canvas.width = config.width;
      canvas.height = config.height;
      const ctx = canvas.getContext('2d')!;

      const muxer = new Muxer({
        target: new ArrayBufferTarget(),
        video: {
          codec: 'avc',
          width: config.width,
          height: config.height,
        },
        fastStart: 'in-memory',
      });

      const encoder = new VideoEncoder({
        output: (chunk, meta) => {
          muxer.addVideoChunk(chunk, meta);
        },
        error: (e) => console.error('Encode error:', e),
      });

      encoder.configure({
        codec: 'avc1.42001f',
        width: config.width,
        height: config.height,
        bitrate: 4000000,
        framerate: FPS,
      });

      const totalFrames = Math.ceil(TOTAL_DURATION_MS / FRAME_INTERVAL);
      let frameCount = 0;
      const startTime = Date.now();

      const captureNextFrame = async (): Promise<void> => {
        if (frameCount >= totalFrames || !videoContentRef.current) {
          await encoder.flush();
          muxer.finalize();
          const target = muxer.target as ArrayBufferTarget;
          const blob = new Blob([target.buffer], { type: 'video/mp4' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `voiceoverguy-quotes-${aspect}.mp4`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 5000);
          setIsRecording(false);
          setProgress('');
          return;
        }

        const pct = Math.round((frameCount / totalFrames) * 100);
        setProgress(`Recording: ${pct}%`);

        try {
          const dataUrl = await captureFullResFrame();

          if (dataUrl) {
            await new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => {
                ctx.drawImage(img, 0, 0, config.width, config.height);
                const frame = new VideoFrame(canvas, {
                  timestamp: frameCount * FRAME_INTERVAL * 1000,
                  duration: FRAME_INTERVAL * 1000,
                });
                encoder.encode(frame, { keyFrame: frameCount % (FPS * 2) === 0 });
                frame.close();
                frameCount++;
                resolve();
              };
              img.onerror = () => {
                frameCount++;
                resolve();
              };
              img.src = dataUrl;
            });
          } else {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, config.width, config.height);
            const frame = new VideoFrame(canvas, {
              timestamp: frameCount * FRAME_INTERVAL * 1000,
              duration: FRAME_INTERVAL * 1000,
            });
            encoder.encode(frame, { keyFrame: true });
            frame.close();
            frameCount++;
          }
        } catch {
          frameCount++;
        }

        const elapsed = Date.now() - startTime;
        const expectedElapsed = frameCount * FRAME_INTERVAL;
        const delay = Math.max(0, expectedElapsed - elapsed);

        await new Promise(r => setTimeout(r, delay));
        return captureNextFrame();
      };

      await captureNextFrame();

    } catch (err) {
      console.error('Recording failed:', err);
      setIsRecording(false);
      setProgress('MP4 recording failed. Try the clean view instead.');
    }
  }, [aspect, config, isRecording, captureFullResFrame]);

  return (
    <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center p-8 gap-5">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setAspect('square')}
          className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-300 border ${
            aspect === 'square'
              ? 'border-[#9C060B] text-white bg-[#9C060B]/20'
              : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/70'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
          disabled={isRecording}
        >
          1:1 Square
        </button>
        <button
          onClick={() => setAspect('portrait')}
          className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-300 border ${
            aspect === 'portrait'
              ? 'border-[#9C060B] text-white bg-[#9C060B]/20'
              : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/70'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
          disabled={isRecording}
        >
          4:5 Portrait
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-hidden bg-black"
        style={{
          width: config.width * scale,
          height: config.height * scale,
        }}
      >
        {paused && pausedFrame ? (
          <img
            src={pausedFrame}
            alt="Paused frame"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            ref={videoContentRef}
            style={{
              width: config.width,
              height: config.height,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <VideoTemplate />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handlePause}
          className="px-6 py-2.5 text-sm tracking-wider uppercase transition-all duration-300 border border-white/20 text-white/60 hover:border-white/40 hover:text-white/80"
          style={{ fontFamily: 'var(--font-display)' }}
          disabled={isRecording}
        >
          {paused ? 'Resume' : 'Pause'}
        </button>

        <button
          onClick={handleDownload}
          disabled={isRecording || paused}
          className={`px-8 py-2.5 text-sm tracking-wider uppercase transition-all duration-300 border ${
            isRecording || paused
              ? 'border-white/10 text-white/30 cursor-wait'
              : 'border-[#9C060B] text-white bg-[#9C060B]/10 hover:bg-[#9C060B]/30'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {progress || 'Download MP4'}
        </button>
      </div>

      <div className="flex items-center gap-4">
        <a
          href={recordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 text-xs hover:text-white/50 transition-colors no-underline"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Open clean view for screen recording
        </a>
        <span className="text-white/20 text-xs">&middot;</span>
        <span className="text-white/30 text-xs" style={{ fontFamily: 'var(--font-display)' }}>
          {config.width} x {config.height}px
        </span>
      </div>
    </div>
  );
}
