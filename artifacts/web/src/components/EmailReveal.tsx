'use client';

import { useEffect, useRef, useState } from 'react';

const u = 'guy';
const d = 'voiceoverguy.co.uk';

type CopyState = 'idle' | 'copied' | 'failed';

export default function EmailReveal() {
  const [revealed, setReveal] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const addr = `${u}\u0040${d}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(addr).then(() => {
      setCopyState('copied');
      timerRef.current = setTimeout(() => setCopyState('idle'), 2000);
    }).catch(() => {
      setCopyState('failed');
      timerRef.current = setTimeout(() => setCopyState('idle'), 2000);
    });
  };

  if (revealed) {
    const label = copyState === 'copied' ? '✓ Copied!' : copyState === 'failed' ? '✗ Failed' : '⧉ Copy';
    const color = copyState === 'copied' ? '#2a7a2a' : copyState === 'failed' ? '#b00020' : '#9C060B';

    return (
      <p style={{ fontSize: '14px', marginTop: '12px' }}>
        <strong>Email:</strong>{' '}
        <a
          href={`mailto:${addr}?subject=Enquiry%20from%20VoiceoverGuy.co.uk`}
          className="ident"
          style={{ fontWeight: 600 }}
        >
          {addr}
        </a>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy email address"
          style={{
            background: 'none',
            border: 'none',
            padding: '0 0 0 6px',
            cursor: 'pointer',
            color,
            fontFamily: 'inherit',
            fontSize: '13px',
            fontWeight: 600,
            verticalAlign: 'middle',
            lineHeight: 1,
          }}
        >
          {label}
        </button>
      </p>
    );
  }

  return (
    <p style={{ fontSize: '14px', marginTop: '12px' }}>
      <strong>Email:</strong>{' '}
      <button
        type="button"
        onClick={() => setReveal(true)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          color: '#9C060B',
          fontFamily: 'inherit',
          fontSize: '14px',
          fontWeight: 600,
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
        }}
        aria-label="Reveal email address"
      >
        &#x2709;&#xFE0E; Reveal email address
      </button>
    </p>
  );
}
