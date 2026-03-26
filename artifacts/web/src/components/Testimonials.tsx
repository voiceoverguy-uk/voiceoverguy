'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { testimonials, type QuoteLink } from '@/data/testimonials';

const INTERVAL_MS = 7000;
const SWIPE_THRESHOLD = 40;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderQuote(quote: string, links?: QuoteLink[]) {
  if (!links || links.length === 0) return quote;

  const parts: React.ReactNode[] = [];
  let remaining = quote;
  let key = 0;

  while (remaining.length > 0) {
    let earliestIdx = -1;
    let earliestLink: QuoteLink | null = null;

    for (const link of links) {
      const idx = remaining.toLowerCase().indexOf(link.text.toLowerCase());
      if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
        earliestIdx = idx;
        earliestLink = link;
      }
    }

    if (earliestIdx === -1 || !earliestLink) {
      parts.push(remaining);
      break;
    }

    if (earliestIdx > 0) parts.push(remaining.slice(0, earliestIdx));

    const matched = remaining.slice(earliestIdx, earliestIdx + earliestLink.text.length);
    const href = earliestLink.url;
    const isExternal = href.startsWith('http');

    parts.push(
      isExternal
        ? <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="testimonials-quote-link">{matched}</a>
        : <Link key={key++} href={href} className="testimonials-quote-link">{matched}</Link>
    );

    remaining = remaining.slice(earliestIdx + earliestLink.text.length);
  }

  return parts;
}

export default function Testimonials() {
  const [slides, setSlides] = useState(testimonials);
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  function startTimer() {
    timerRef.current = setInterval(() => {
      setIndex(i => (i + 1) % total);
    }, INTERVAL_MS);
  }

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  }

  useEffect(() => {
    setSlides(shuffle(testimonials));
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function goTo(i: number) {
    setIndex(i);
    resetTimer();
  }

  function next() {
    goTo((index + 1) % total);
  }

  function prev() {
    goTo((index - 1 + total) % total);
  }

  function handleCardClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest('a')) return;
    next();
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      delta > 0 ? next() : prev();
    }
    touchStartX.current = null;
  }

  const t = slides[index];

  return (
    <section className="testimonials-section" aria-label="Client testimonials">
      <div className="container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">What Clients Say</h2>
          <p className="testimonials-subtitle">Trusted by agencies, broadcasters, and brands across the UK</p>
          <div className="testimonials-divider" />
        </div>

        <div className="testimonials-card-wrap">
          <div
            key={index}
            className="testimonials-card testimonials-card--clickable"
            onClick={handleCardClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="button"
            tabIndex={0}
            aria-label="Next testimonial"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') next(); }}
          >
            <span className="testimonials-quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="testimonials-quote">
              {renderQuote(t.quote, t.quoteLinks)}
            </blockquote>
            <div className="testimonials-attribution">
              <strong className="testimonials-name">{t.name}</strong>
              <span className="testimonials-role">
                {t.role && <>{t.role}, </>}
                {t.companyUrl
                  ? <a href={t.companyUrl} target="_blank" rel="noopener noreferrer" className="testimonials-company-link">{t.company}</a>
                  : t.company}
              </span>
            </div>
          </div>
        </div>

        <div className="testimonials-dots" role="tablist" aria-label="Testimonial navigation">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              className={`testimonials-dot${i === index ? ' testimonials-dot--active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
