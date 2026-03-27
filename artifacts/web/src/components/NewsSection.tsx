'use client';

import { useState } from 'react';
import Link from 'next/link';
import { newsItems } from '@/data/news';
import type { Segment } from '@/data/news';

const INITIAL_COUNT = 6;

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
  const [expanded, setExpanded] = useState(false);
  const remaining = newsItems.length - INITIAL_COUNT;

  const now = new Date();
  const month = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();

  return (
    <section className="news-section">
      <div className="container">
        <div className="news-box">
          <h2>Latest Voiceover News <span className="news-date">{month} {year}</span></h2>
          <div className={`news-box-content${expanded ? ' news-box-content--expanded' : ''}`}>
            <ul className="news-list">
              {(expanded ? newsItems : newsItems.slice(0, INITIAL_COUNT)).map((item, i) => (
                <li key={i}>
                  {item.segments.map((seg, j) => renderSegment(seg, j))}
                </li>
              ))}
            </ul>
            {!expanded && <div className="news-box-fade" />}
          </div>
          {remaining > 0 && (
            <div className="news-box-actions">
              <button
                className="show-more-btn"
                onClick={() => setExpanded(e => !e)}
              >
                {expanded ? 'Show less' : `Show ${remaining} more updates`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
