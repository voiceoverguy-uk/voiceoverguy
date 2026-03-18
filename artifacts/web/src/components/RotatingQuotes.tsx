'use client';

import { useState, useEffect, useRef } from 'react';

const quotes = [
  'Just because AI can read the script doesn\'t mean it can feel the moment.',
  'You might save money with AI. But will your audience believe a word of it?',
  'Reading words is easy. Delivering meaning is the bit that matters.',
  'AI can say the line. A real voice knows why it matters.',
  'Your audience can hear the difference between sound and sincerity.',
  'Just because it sounds human doesn\'t mean it connects like one.',
  'Words on a page are not a performance. They\'re just the starting point.',
  'If your message matters, the delivery matters too.',
  'The line may be identical. The impact rarely is.',
  'If you want people to feel something, you still need a human who can.',
];

const FADE_DURATION = 1000;
const HOLD_DURATION = 4800;
const CYCLE = FADE_DURATION + HOLD_DURATION + FADE_DURATION;

export default function RotatingQuotes() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion.current) return;

    let fadeOutTimer: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      setVisible(false);
      fadeOutTimer = setTimeout(() => {
        setIndex(i => (i + 1) % quotes.length);
        setVisible(true);
      }, FADE_DURATION);
    }, CYCLE);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
    };
  }, []);

  return (
    <section className="rotating-quotes-section" aria-label="Why a real voice matters">
      <div className="rotating-quotes-inner">
        <p className="rotating-quotes-label">The difference a real voice makes</p>
        <div className="rotating-quotes-stage">
          <span className="rotating-quotes-deco rotating-quotes-deco--open" aria-hidden="true">&ldquo;</span>
          <blockquote
            className="rotating-quotes-text"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {quotes[index]}
          </blockquote>
          <span className="rotating-quotes-deco rotating-quotes-deco--close" aria-hidden="true">&rdquo;</span>
        </div>
      </div>
    </section>
  );
}
