'use client';

import { useState, useEffect, useRef } from 'react';
import { testimonials } from '@/data/testimonials';

const INTERVAL_MS = 7000;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Testimonials() {
  const [slides] = useState(() => shuffle(testimonials));
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function goTo(i: number) {
    setIndex(i);
    resetTimer();
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
          <div key={index} className="testimonials-card">
            <span className="testimonials-quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="testimonials-quote">
              {t.quote}
            </blockquote>
            <div className="testimonials-attribution">
              <strong className="testimonials-name">{t.name}</strong>
              <span className="testimonials-role">{[t.role, t.company].filter(Boolean).join(', ')}</span>
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
