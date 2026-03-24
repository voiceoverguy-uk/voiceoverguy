'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

interface Logo {
  src: string;
  alt: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ClientLogosMarquee({ logos }: { logos: Logo[] }) {
  const [shuffled] = useState<Logo[]>(() => shuffleArray(logos));
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const speedRef = useRef(5.0);
  const halfWidthRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const imgs = trackRef.current.querySelectorAll('img');
    const half = Math.ceil(imgs.length / 2);
    let w = 0;
    for (let i = 0; i < half; i++) {
      w += imgs[i].offsetWidth + 70;
    }
    if (w > 0) halfWidthRef.current = w;
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);

    const tick = () => {
      if (!draggingRef.current && halfWidthRef.current > 0) {
        offsetRef.current -= speedRef.current;
        if (Math.abs(offsetRef.current) >= halfWidthRef.current) {
          offsetRef.current += halfWidthRef.current;
        }
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const handleDragStart = (clientX: number) => {
    draggingRef.current = true;
    startXRef.current = clientX;
    startOffsetRef.current = offsetRef.current;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleDragMove = (clientX: number) => {
    if (!draggingRef.current) return;
    const delta = clientX - startXRef.current;
    let newOffset = startOffsetRef.current + delta;
    if (halfWidthRef.current > 0) {
      while (newOffset > 0) newOffset -= halfWidthRef.current;
      while (Math.abs(newOffset) >= halfWidthRef.current) newOffset += halfWidthRef.current;
    }
    offsetRef.current = newOffset;
  };

  const handleDragEnd = () => {
    draggingRef.current = false;
    resumeTimerRef.current = setTimeout(() => {}, 0);
  };

  return (
    <div
      ref={wrapperRef}
      className="client-logos-marquee-wrapper"
      onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientX); }}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={() => { if (draggingRef.current) handleDragEnd(); }}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
      style={{ cursor: draggingRef.current ? 'grabbing' : 'grab' }}
    >
      <div
        ref={trackRef}
        className="client-logos-marquee client-logos-marquee--draggable"
      >
        {shuffled.map(logo => (
          <img key={logo.alt} src={logo.src} alt={logo.alt} onLoad={measure} suppressHydrationWarning />
        ))}
        <div aria-hidden="true" style={{ display: 'contents' }}>
          {shuffled.map(logo => (
            <img key={`${logo.alt}-dup`} src={logo.src} alt="" onLoad={measure} suppressHydrationWarning />
          ))}
        </div>
      </div>
    </div>
  );
}
