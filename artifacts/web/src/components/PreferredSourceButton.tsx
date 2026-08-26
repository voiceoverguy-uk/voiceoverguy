'use client';

import Script from 'next/script';

export default function PreferredSourceButton() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        justifyContent: 'center',
        margin: 0,
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: '0.85rem', margin: 0 }}>
        Add VoiceoverGuy as a preferred source on Google?
      </p>
      <Script
        src="https://news.google.com/swg/js/v1/publisher.js"
        strategy="lazyOnload"
      />
      <div
        google-add-preferred-source-btn=""
        data-theme="light"
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      />
    </div>
  );
}