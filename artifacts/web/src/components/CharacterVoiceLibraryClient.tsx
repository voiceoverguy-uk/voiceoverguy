'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import WaveSurferPlayer from '@/components/WaveSurferPlayer';
import { characterVoiceLibrary, type CharacterVoiceEntry } from '@/data/characterVoiceLibrary';

function highlightText(text: string, query: string): React.ReactNode {
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
  const lower = q.trim().toLowerCase();
  return (
    entry.title.toLowerCase().includes(lower) ||
    entry.description.toLowerCase().includes(lower) ||
    entry.aliases.some(a => a.toLowerCase().includes(lower))
  );
}

function findBestMatchIndex(entries: CharacterVoiceEntry[], q: string): number {
  if (!q) return -1;
  const lower = q.trim().toLowerCase();
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].title.toLowerCase().includes(lower)) return i;
  }
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].aliases.some(a => a.toLowerCase().includes(lower))) return i;
  }
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].description.toLowerCase().includes(lower)) return i;
  }
  return -1;
}

export default function CharacterVoiceLibraryClient() {
  const searchParams = useSearchParams();
  const urlSearch = (searchParams.get('search') ?? '').trim();
  const [query, setQuery] = useState(urlSearch);
  const bestMatchRef = useRef<HTMLDivElement | null>(null);

  const filtered = characterVoiceLibrary.filter(e => matchesQuery(e, query));
  const bestMatchIdx = urlSearch ? findBestMatchIndex(characterVoiceLibrary, urlSearch) : -1;

  useEffect(() => {
    if (urlSearch && bestMatchRef.current) {
      bestMatchRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [urlSearch]);

  return (
    <div className="cvl-wrapper">
      {urlSearch && (
        <p className="cvl-url-banner">
          Showing results for: <strong>{urlSearch}</strong>
        </p>
      )}

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
        <p className="cvl-no-results">No voices found for &ldquo;{query}&rdquo; -- try a different search term.</p>
      ) : (
        <div className="cvl-grid">
          {filtered.map(entry => {
            const origIdx = characterVoiceLibrary.indexOf(entry);
            const isBestMatch = urlSearch && origIdx === bestMatchIdx;
            return (
              <div
                key={entry.id}
                id={entry.id}
                className={`cvl-card${isBestMatch ? ' cvl-card--highlight' : ''}`}
                ref={isBestMatch ? (el => { bestMatchRef.current = el; }) : undefined}
              >
                <h3 className="cvl-card-title">{highlightText(entry.title, query)}</h3>
                <p className="cvl-card-desc">{highlightText(entry.description, query)}</p>
                <WaveSurferPlayer src={entry.mp3} compact />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
