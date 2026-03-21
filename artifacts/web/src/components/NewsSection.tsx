'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { newsItems } from '@/data/news';
import type { Segment } from '@/data/news';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [expanded]);

  return (
    <section className="news-section">
      <div className="container">
        <div className="news-box">
          <h2>Latest Voiceover News</h2>
          <div
            ref={scrollRef}
            className={`news-box-scroll${expanded ? ' news-box-scroll--expanded' : ''}`}
          >
            <ul className="news-list">
              {newsItems.map((item, i) => (
                <li key={i}>
                  {item.segments.map((seg, j) => renderSegment(seg, j))}
                </li>
              ))}
            </ul>
          </div>
          {!expanded && <div className="news-box-fade" />}
          <div className="news-box-actions">
            <button
              className="show-more-btn"
              onClick={() => setExpanded(e => !e)}
            >
              {expanded ? 'Show less' : `Browse all news (${newsItems.length} updates)`}
            </button>
            <Link href="/voiceover-news" className="news-box-link">
              View full blog &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
