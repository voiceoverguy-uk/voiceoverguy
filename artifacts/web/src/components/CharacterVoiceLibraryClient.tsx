'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import WaveSurferPlayer from '@/components/WaveSurferPlayer';
import { characterVoiceLibrary, type CharacterVoiceEntry } from '@/data/characterVoiceLibrary';

function highlightText(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="cvl-highlight">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

function getHaystack(entry: CharacterVoiceEntry): string {
  return [entry.title, entry.description, ...entry.aliases].join(' ').toLowerCase();
}

function matchesQuery(entry: CharacterVoiceEntry, q: string): boolean {
  if (!q.trim()) return true;
  const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const haystack = getHaystack(entry);
  return tokens.every(token => haystack.includes(token));
}

function findBestMatchIndex(entries: CharacterVoiceEntry[], q: string): number {
  const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return -1;
  for (let i = 0; i < entries.length; i++) {
    const titleHaystack = entries[i].title.toLowerCase();
    if (tokens.every(t => titleHaystack.includes(t))) return i;
  }
  for (let i = 0; i < entries.length; i++) {
    const aliasHaystack = entries[i].aliases.join(' ').toLowerCase();
    if (tokens.every(t => aliasHaystack.includes(t))) return i;
  }
  for (let i = 0; i < entries.length; i++) {
    if (matchesQuery(entries[i], q)) return i;
  }
  return -1;
}

export default function CharacterVoiceLibraryClient() {
  const searchParams = useSearchParams();
  const urlSearch = (searchParams.get('search') ?? '').trim();
  const bestMatchRef = useRef<HTMLDivElement | null>(null);
  const bestMatchIdx = urlSearch ? findBestMatchIndex(characterVoiceLibrary, urlSearch) : -1;

  useEffect(() => {
    if (urlSearch && bestMatchRef.current) {
      bestMatchRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [urlSearch]);

  return (
    <div className="cvl-wrapper">
      <div className="cvl-grid">
        {characterVoiceLibrary.map((entry, idx) => {
          const isBestMatch = urlSearch.length > 0 && idx === bestMatchIdx;
          return (
            <div
              key={entry.id}
              id={entry.id}
              className={`cvl-card${isBestMatch ? ' cvl-card--highlight' : ''}`}
              ref={isBestMatch ? (el => { bestMatchRef.current = el; }) : undefined}
            >
              <h3 className="cvl-card-title">{highlightText(entry.title, urlSearch)}</h3>
              <p className="cvl-card-desc">{highlightText(entry.description, urlSearch)}</p>
              <WaveSurferPlayer src={entry.mp3} compact />
            </div>
          );
        })}
      </div>
    </div>
  );
}
