'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  AWAY_REPLY_EXPLANATION,
  REPLY_ESTIMATE_EXPLANATION,
  replyTooltipPosition,
} from '@/lib/replyEstimateExplanation';

export default function ReplyEstimateInfo({ away = false }: { away?: boolean }) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const tooltip = useRef<HTMLSpanElement>(null);
  const pinned = useRef(false);
  const hideTimer = useRef<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);

  const close = useCallback(() => {
    window.clearTimeout(hideTimer.current);
    pinned.current = false;
    setOpen(false);
    setPosition(null);
  }, []);

  const show = () => {
    window.clearTimeout(hideTimer.current);
    setOpen(true);
  };
  const leave = () => {
    window.clearTimeout(hideTimer.current);
    // Allow the pointer to cross the gap to the explanation (WCAG hoverability).
    hideTimer.current = window.setTimeout(() => {
      if (!pinned.current && document.activeElement !== trigger.current) close();
    }, 200);
  };

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const place = () => {
      if (!trigger.current || !tooltip.current) return;
      setPosition(replyTooltipPosition(
        trigger.current.getBoundingClientRect(),
        tooltip.current.getBoundingClientRect(),
        { width: document.documentElement.clientWidth, height: window.innerHeight },
      ));
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node &&
          !trigger.current?.contains(event.target) && !tooltip.current?.contains(event.target)) close();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const scroll = (event: Event) => {
      // A long explanation may itself need scrolling on a short/zoomed screen.
      if (event.target instanceof Node && tooltip.current?.contains(event.target)) return;
      const rect = trigger.current?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) close();
      else place();
    };
    place();
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', scroll, true);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', scroll, true);
    };
  }, [open, away, close]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="contact-reply-time-label contact-reply-info-trigger"
        aria-label="Currently: about this reply estimate"
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onFocus={show}
        onBlur={close}
        onPointerEnter={event => { if (event.pointerType !== 'touch') show(); }}
        onPointerLeave={leave}
        onClick={() => {
          if (pinned.current) close();
          else {
            pinned.current = true;
            show();
          }
        }}
      >Currently:</button>
      {open && createPortal(
        <span
          ref={tooltip}
          id={id}
          role="tooltip"
          className="contact-reply-info-tooltip"
          style={position ? position : { left: 12, top: 12, visibility: 'hidden' }}
          onPointerEnter={show}
          onPointerLeave={leave}
        >{away ? AWAY_REPLY_EXPLANATION : REPLY_ESTIMATE_EXPLANATION}</span>,
        document.body,
      )}
    </>
  );
}
