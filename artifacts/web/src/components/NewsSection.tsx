'use client';

import { useState } from 'react';
import Link from 'next/link';
import { newsItems } from '@/data/news';
import type { Segment } from '@/data/news';

const INITIAL_COUNT = 8;

function renderSegment(segment: Segment, index: number) {
  if (segment.type === 'text') {
    return <span key={index}>{segment.text}</span>;
  }
  if (segment.external) {
    return (
      <a key={index} href={segment.href} target="_blank" rel="noopener noreferrer">
        {segment.text}
      </a>
    );
  }
  return (
    <Link key={index} href={segment.href}>
      {segment.text}
    </Link>
  );
}

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
              {item.segments.map((seg, j) => renderSegment(seg, j))}
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
