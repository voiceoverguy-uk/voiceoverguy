'use client';

import { useState } from 'react';

const u = 'guy';
const d = 'voiceoverguy.co.uk';

export default function EmailReveal() {
  const [revealed, setReveal] = useState(false);

  if (revealed) {
    const addr = `${u}\u0040${d}`;
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
