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
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    navigator.clipboard.writeText(addr).then(() => {
      setCopyState('copied');
      timerRef.current = setTimeout(() => setCopyState('idle'), 2000);
    }).catch(() => {
      setCopyState('failed');
      timerRef.current = setTimeout(() => setCopyState('idle'), 2000);
    });
  };

  if (revealed) {
    const tooltipText = copyState === 'copied' ? 'Copied to clipboard!' : 'Failed to copy';
    const tooltipColor = copyState === 'copied' ? '#2a7a2a' : '#b00020';
    const visible = copyState !== 'idle';

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
        <span
          style={{
            position: 'relative',
            display: 'inline-block',
            marginLeft: '6px',
            verticalAlign: 'middle',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 6px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: tooltipColor,
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              padding: '4px 8px',
              borderRadius: '4px',
              pointerEvents: 'none',
              opacity: visible ? 1 : 0,
              transition: visible ? 'opacity 0.15s ease-in' : 'opacity 0.4s ease-out',
              zIndex: 100,
            }}
          >
            {visible ? tooltipText : ''}
            <span
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                border: '5px solid transparent',
                borderTopColor: tooltipColor,
              }}
            />
          </span>
          <span role="status" aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
            {visible ? tooltipText : ''}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy email address"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: '#9C060B',
              fontFamily: 'inherit',
              fontSize: '13px',
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            ⧉ Copy
          </button>
        </span>
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
