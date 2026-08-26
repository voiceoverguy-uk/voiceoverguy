'use client';

import Script from 'next/script';

export default function PreferredSourceButton() {
  return (
    <div style={{ margin: '1.25rem 0', textAlign: 'center' }}>
      <p style={{ margin: '0 0 0.75rem' }}>
        Like keeping up with my latest work? Add VoiceoverGuy as a preferred source on Google.
      </p>
      <Script
        src="https://news.google.com/swg/js/v1/publisher.js"
        strategy="lazyOnload"
      />
      <div google-add-preferred-source-btn="" data-theme="light" />
    </div>
  );
}