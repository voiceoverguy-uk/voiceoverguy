'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import WaveSurferPlayer from '@/components/WaveSurferPlayer';
import { characterVoiceLibrary, type CharacterVoiceEntry } from '@/data/characterVoiceLibrary';

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="cvl-highlight">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function matchesQuery(entry: CharacterVoiceEntry, q: string): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  return (
    entry.title.toLowerCase().includes(lower) ||
    entry.description.toLowerCase().includes(lower) ||
    (entry.aliases ?? []).some(a => a.toLowerCase().includes(lower))
  );
}

export default function CharacterVoiceLibraryClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('search') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const highlightRef = useRef<HTMLDivElement | null>(null);

  const filtered = characterVoiceLibrary.filter(e => matchesQuery(e, query));

  useEffect(() => {
    if (initialQuery && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [initialQuery]);

  return (
    <div className="cvl-wrapper">
      <div className="cvl-search-row">
        <input
          type="search"
          className="cvl-search-input"
          placeholder="Filter by voice type, style or character..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Filter character voice library"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="cvl-no-results">No voices found for &ldquo;{query}&rdquo; — try a different search term.</p>
      ) : (
        <div className="cvl-grid">
          {filtered.map(entry => {
            const isHighlighted = initialQuery && matchesQuery(entry, initialQuery);
            return (
              <div
                key={entry.id}
                id={entry.id}
                className={`cvl-card${isHighlighted ? ' cvl-card--highlight' : ''}`}
                ref={isHighlighted ? (el => { if (el) highlightRef.current = el; }) : undefined}
              >
                <h3 className="cvl-card-title">{highlight(entry.title, query)}</h3>
                <p className="cvl-card-desc">{highlight(entry.description, query)}</p>
                <WaveSurferPlayer src={entry.audioSrc} compact={false} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
