'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const rows = document.querySelectorAll('.reveal-row');
    if (!rows.length) return;

    if (!('IntersectionObserver' in window)) {
      rows.forEach((row) => row.classList.add('revealed'));
      return;
    }

    rows.forEach((row) => row.classList.add('reveal-ready'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    rows.forEach((row) => observer.observe(row));

    return () => observer.disconnect();
  }, []);

  return null;
}
