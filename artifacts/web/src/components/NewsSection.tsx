'use client';

import { useState } from 'react';
import Link from 'next/link';
import { newsItems } from '@/data/news';

const INITIAL_COUNT = 8;

export default function NewsSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? newsItems : newsItems.slice(0, INITIAL_COUNT);

  return (
    <section className="news-section">
      <div className="container">
        <h2>Latest Voiceover News</h2>
        <ul className="news-list">
          {visible.map((item, i) => (
            <li key={i}>
              {item.prefix && <span>{item.prefix}</span>}
              {item.text}
              {item.linkText && item.linkHref ? (
                <>
                  {' '}
                  {item.linkHref.startsWith('http') ? (
                    <a href={item.linkHref} target="_blank" rel="noopener noreferrer">
                      {item.linkText}
                    </a>
                  ) : (
                    <Link href={item.linkHref}>{item.linkText}</Link>
                  )}
                </>
              ) : item.linkText ? (
                <span> {item.linkText}</span>
              ) : null}
              {item.suffix && <span>{item.suffix}</span>}
            </li>
          ))}
        </ul>

        {!showAll && newsItems.length > INITIAL_COUNT && (
          <button
            className="show-more-btn"
            onClick={() => setShowAll(true)}
          >
            Show more news ({newsItems.length - INITIAL_COUNT} more)
          </button>
        )}
        {showAll && (
          <button
            className="show-more-btn"
            onClick={() => setShowAll(false)}
          >
            Show less
          </button>
        )}
      </div>
    </section>
  );
}
