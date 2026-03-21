'use client';

import { useEffect, useRef, useState } from 'react';

const badges = [
  { src: '/assets/images/vox-2011.webp', alt: 'VOX Award 2011 Best Male Performance Winner' },
  { src: '/assets/images/vox-2014.webp', alt: 'VOX Award 2014 Best Male Performance Winner' },
  { src: '/assets/images/vox-2018.webp', alt: 'VOX Award 2018 Winner' },
  { src: '/assets/images/vox-2019.webp', alt: 'VOX Award 2019 Best In Store Voice Winner' },
  { src: '/assets/images/vox-2021.webp', alt: 'VOX Award 2021 Finalist' },
  { src: '/assets/images/vox-2022.webp', alt: 'VOX Award 2022 Nominee' },
  { src: '/assets/images/sovas-2015.webp', alt: 'SOVAS Voice Arts Award Nominee' },
];

export default function AwardsBadges() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="awards-badges">
      {badges.map((b, i) => (
        <img
          key={b.src}
          src={b.src}
          alt={b.alt}
          width={90}
          height={90}
          className={`awards-badge-item ${visible ? 'awards-badge-in' : ''}`}
          style={{ transitionDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}
