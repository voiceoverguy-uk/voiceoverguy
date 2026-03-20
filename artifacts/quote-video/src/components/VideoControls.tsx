import { useState, useRef, useEffect, useCallback } from 'react';
import VideoTemplate from './video/VideoTemplate';
import { toPng } from 'html-to-image';

type AspectRatio = 'square' | 'portrait';

const ASPECT_CONFIGS = {
  square: { width: 1080, height: 1080, label: '1:1 Square', cssRatio: '1 / 1' },
  portrait: { width: 1080, height: 1350, label: '4:5 Portrait', cssRatio: '4 / 5' },
} as const;

const TOTAL_DURATION_MS = 36500;

export default function VideoControls() {
  const [aspect, setAspect] = useState<AspectRatio>('square');
  const [paused, setPaused] = useState(false);
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

  const handlePause = useCallback(() => {
    setPaused(p => !p);
  }, []);

  const handleDownload = useCallback(async () => {
    if (!videoContentRef.current || isRecording) return;

    setIsRecording(true);
    setProgress('Preparing...');

    try {
      const canvas = document.createElement('canvas');
      canvas.width = config.width;
      canvas.height = config.height;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, config.width, config.height);

      const stream = canvas.captureStream(15);
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : 'video/webm',
        videoBitsPerSecond: 5000000,
      });

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const startTime = Date.now();
      let animFrameId: number;
      let stopped = false;

      const captureFrame = async () => {
        if (stopped || !videoContentRef.current) return;

        const elapsed = Date.now() - startTime;
        const pct = Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100));
        setProgress(`Recording: ${pct}%`);

        try {
          const dataUrl = await toPng(videoContentRef.current, {
            width: config.width,
            height: config.height,
            pixelRatio: 1,
            backgroundColor: '#000000',
            skipAutoScale: true,
            cacheBust: true,
          });

          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, config.width, config.height);
          };
          img.src = dataUrl;
        } catch {
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, config.width, config.height);
        }

        if (!stopped) {
          animFrameId = requestAnimationFrame(captureFrame);
        }
      };

      mediaRecorder.onstop = () => {
        stopped = true;
        cancelAnimationFrame(animFrameId);
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `voiceoverguy-quotes-${aspect}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        setIsRecording(false);
        setProgress('');
      };

      mediaRecorder.start(200);
      captureFrame();

      setTimeout(() => {
        stopped = true;
        cancelAnimationFrame(animFrameId);
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
        stream.getTracks().forEach(t => t.stop());
      }, TOTAL_DURATION_MS + 2000);

    } catch (err) {
      console.error('Recording failed:', err);
      setIsRecording(false);
      setProgress('Recording failed. Try the clean view instead.');
    }
  }, [aspect, config, isRecording]);

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
          {!paused && <VideoTemplate />}
          {paused && (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <span className="text-white/30 text-[2vw]" style={{ fontFamily: 'var(--font-display)' }}>
                Paused
              </span>
            </div>
          )}
        </div>
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
          {progress || 'Download Video'}
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
