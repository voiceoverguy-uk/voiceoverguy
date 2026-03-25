'use client';

import { useState } from 'react';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  function prev() {
    setIndex(i => (i - 1 + total) % total);
  }

  function next() {
    setIndex(i => (i + 1) % total);
  }

  const t = testimonials[index];

  return (
    <section className="testimonials-section" aria-label="Client testimonials">
      <div className="container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">What Clients Say</h2>
          <p className="testimonials-subtitle">Trusted by agencies, broadcasters, and brands across the UK</p>
          <div className="testimonials-divider" />
        </div>

        <div className="testimonials-card-wrap">
          <div className="testimonials-card">
            <span className="testimonials-quote-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="testimonials-quote">
              {t.quote}
            </blockquote>
            <div className="testimonials-attribution">
              <strong className="testimonials-name">{t.name}</strong>
              <span className="testimonials-role">{t.role}, {t.company}</span>
            </div>
          </div>

          <div className="testimonials-nav">
            <button
              className="testimonials-arrow"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
                <path d="M8.5 1.5L1.5 8L8.5 14.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="testimonials-arrow"
              onClick={next}
              aria-label="Next testimonial"
            >
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden="true">
                <path d="M1.5 1.5L8.5 8L1.5 14.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="testimonials-dots" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              className={`testimonials-dot${i === index ? ' testimonials-dot--active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
