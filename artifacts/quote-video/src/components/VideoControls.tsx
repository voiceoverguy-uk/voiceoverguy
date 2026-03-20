import { useState, useRef, useEffect } from 'react';
import VideoTemplate from './video/VideoTemplate';

type AspectRatio = 'square' | 'portrait';

const ASPECT_CONFIGS = {
  square: { width: 1080, height: 1080, label: '1:1 Square', cssRatio: '1 / 1' },
  portrait: { width: 1080, height: 1350, label: '4:5 Portrait', cssRatio: '4 / 5' },
} as const;

export default function VideoControls() {
  const [aspect, setAspect] = useState<AspectRatio>('square');
  const containerRef = useRef<HTMLDivElement>(null);
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

  return (
    <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center p-8 gap-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setAspect('square')}
          className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-300 border ${
            aspect === 'square'
              ? 'border-[#9C060B] text-white bg-[#9C060B]/20'
              : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/70'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
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
      </div>

      <a
        href={recordUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-3 text-sm tracking-wider uppercase transition-all duration-300 border border-[#9C060B] text-white bg-[#9C060B]/10 hover:bg-[#9C060B]/30 inline-block text-center no-underline"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Open Clean View for Recording
      </a>

      <p className="text-white/30 text-xs text-center max-w-md" style={{ fontFamily: 'var(--font-display)' }}>
        {config.width} x {config.height}px &middot; Use the clean view with a screen recorder to capture the video
      </p>
    </div>
  );
}
