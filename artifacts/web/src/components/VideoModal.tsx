'use client';

import { useEffect, useCallback, useRef } from 'react';

interface VideoModalProps {
  ytId: string;
  onClose: () => void;
}

export default function VideoModal({ ytId, onClose }: VideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  useEffect(() => {
    triggerRef.current = document.activeElement;
    closeRef.current?.focus();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      (triggerRef.current as HTMLElement | null)?.focus();
    };
  }, [handleKey]);

  return (
    <div
      className="yt-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      onClick={onClose}
    >
      <div className="yt-modal-inner" onClick={e => e.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          className="yt-modal-close"
          aria-label="Close video"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="yt-modal-frame">
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
