'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import blogPosts from '@/data/blog-posts';
import { voiceDemos, characterDemos } from '@/data/demos';

interface SearchResult {
  type: 'blog' | 'voice-demo' | 'character-demo';
  label: string;
  href: string;
  thumbnail?: string;
  relevance: number;
}

const PHRASES_REGULAR = [
  'What voice do you need? Start typing...',
  'Search British, narration, explainer...',
  'Looking for a voiceover? Start here...',
];

const PHRASES_HALLOWEEN = [
  'Need something spooky? Start typing...',
  'Search spooky, sinister, Halloween...',
  'Looking for a creepy voice? Start here...',
];

const PHRASES_SANTA = [
  'Looking for the voice of Santa? Start typing...',
  'Search Santa, festive, Christmas...',
  'Need a festive voice? Start here...',
];

function getSeasonalPhrases(): string[] {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  if (month === 10) return PHRASES_HALLOWEEN;
  if (month === 11 || (month === 12 && day <= 25)) return PHRASES_SANTA;
  return PHRASES_REGULAR;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function useTypewriter(phrases: string[], active: boolean, reducedMotion: boolean) {
  const [display, setDisplay] = useState('');
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(phrases[0]);
      return;
    }

    if (!active) {
      return;
    }

    let cancelled = false;
    let phraseIndex = 0;

    async function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function run() {
      while (!cancelled && activeRef.current) {
        const phrase = phrases[phraseIndex % phrases.length];

        for (let i = 0; i <= phrase.length; i++) {
          if (cancelled || !activeRef.current) return;
          setDisplay(phrase.slice(0, i));
          await sleep(50);
        }

        await sleep(1800);
        if (cancelled || !activeRef.current) return;

        setDisplay('');
        await sleep(400);

        phraseIndex++;
      }
    }

    run();
    return () => { cancelled = true; };
  }, [phrases, active, reducedMotion]);

  return display;
}

function getBlogThumbnail(post: typeof blogPosts[0]): string {
  if (post.whatVideo === '1' && post.video) {
    return `https://img.youtube.com/vi/${post.video}/mqdefault.jpg`;
  }
  if (post.image) {
    return `/assets/img/blog/${post.image}`;
  }
  return '';
}

function searchItems(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const post of blogPosts) {
    const titleMatch = post.pageTitle.toLowerCase().includes(q);
    const keywordMatch = post.searchTerms.toLowerCase().includes(q);
    if (titleMatch || keywordMatch) {
      results.push({
        type: 'blog',
        label: post.pageTitle,
        href: `/${post.url}`,
        thumbnail: getBlogThumbnail(post),
        relevance: titleMatch ? 2 : 1,
      });
    }
  }

  for (const demo of voiceDemos) {
    if (demo.label.toLowerCase().includes(q)) {
      results.push({
        type: 'voice-demo',
        label: demo.label,
        href: demo.href,
        relevance: 2,
      });
    }
  }

  for (const demo of characterDemos) {
    if (demo.label.toLowerCase().includes(q)) {
      results.push({
        type: 'character-demo',
        label: demo.label,
        href: demo.href,
        relevance: 2,
      });
    }
  }

  results.sort((a, b) => b.relevance - a.relevance);
  return results.slice(0, 12);
}

const MicIcon = () => (
  <svg className="live-search-icon" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"/>
    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
  </svg>
);

const PersonIcon = () => (
  <svg className="live-search-icon" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const BlogIcon = () => (
  <svg className="live-search-icon" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z"/>
  </svg>
);

function renderThumb(result: SearchResult) {
  if (result.thumbnail) {
    return (
      <img
        src={result.thumbnail}
        alt={result.label}
        className="live-search-thumb-img"
        loading="lazy"
      />
    );
  }

  if (result.type === 'voice-demo') {
    return (
      <div className="live-search-icon-wrap live-search-icon-voice-demo">
        <MicIcon />
      </div>
    );
  }

  if (result.type === 'character-demo') {
    return (
      <div className="live-search-icon-wrap live-search-icon-character-demo">
        <PersonIcon />
      </div>
    );
  }

  return (
    <div className="live-search-icon-wrap live-search-icon-blog">
      <BlogIcon />
    </div>
  );
}

export default function LiveSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = 'live-search-listbox';

  const phrases = useMemo(() => getSeasonalPhrases(), []);
  const reducedMotion = useReducedMotion();
  const showFakePlaceholder = !isFocused && query.length === 0;
  const typedText = useTypewriter(phrases, showFakePlaceholder, reducedMotion);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => searchItems(debouncedQuery), [debouncedQuery]);

  useEffect(() => {
    const shouldOpen = debouncedQuery.trim().length > 0 && results.length > 0;
    setIsOpen(shouldOpen);
    setActiveIndex(-1);
  }, [debouncedQuery, results]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleResultClick = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const link = containerRef.current?.querySelector(
        `[data-search-index="${activeIndex}"] a`
      ) as HTMLAnchorElement | null;
      if (link) link.click();
    }
  }, [isOpen, results.length, activeIndex]);

  return (
    <div className="live-search-container" ref={containerRef}>
      <div className="search-input-wrapper">
        <input
          type="search"
          className="search-input"
          aria-label="Search voiceover styles"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={activeIndex >= 0 ? `live-search-option-${activeIndex}` : undefined}
          aria-autocomplete="list"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            if (debouncedQuery.trim().length > 0 && results.length > 0) {
              setIsOpen(true);
            }
          }}
          onBlur={() => setIsFocused(false)}
        />
        {showFakePlaceholder && (
          <span className="search-fake-placeholder" aria-hidden="true">
            {typedText}
            <span className="search-cursor" />
          </span>
        )}
      </div>
      {isOpen && results.length > 0 && (
        <ul className="live-search-dropdown" role="listbox" id={listboxId}>
          {results.map((result, idx) => (
            <li
              key={`${result.href}-${idx}`}
              className={`live-search-item${idx === activeIndex ? ' live-search-item-active' : ''}`}
              role="option"
              id={`live-search-option-${idx}`}
              aria-selected={idx === activeIndex}
              data-search-index={idx}
            >
              <Link href={result.href} onClick={handleResultClick} className="live-search-link" tabIndex={-1}>
                <div className="live-search-thumb">
                  {renderThumb(result)}
                </div>
                <span className="live-search-title">{result.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
