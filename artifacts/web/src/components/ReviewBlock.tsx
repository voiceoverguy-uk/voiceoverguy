'use client';

import { useState, useEffect } from 'react';

const DEFAULT_RATING = 5.0;
const DEFAULT_COUNT = 119;

export default function ReviewBlock() {
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [count, setCount] = useState(DEFAULT_COUNT);

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(data => {
        if (data.rating) setRating(data.rating);
        if (data.reviewCount) setCount(data.reviewCount);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="review-block">
      <div className="review-inline">
        <span className="review-stars">★★★★★</span>
        <p className="review-text">
          Rated <span className="review-highlight">{rating}</span> on Google by{' '}
          <span className="review-highlight">{count}</span> happy clients
        </p>
      </div>
      <a
        href="https://www.google.com/search?q=voiceoverguy+guy+harris+reviews"
        target="_blank"
        rel="noopener noreferrer"
        className="review-cta"
      >
        Read reviews on Google &rarr;
      </a>
    </div>
  );
}
