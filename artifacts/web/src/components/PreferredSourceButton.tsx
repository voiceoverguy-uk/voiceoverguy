'use client';

import Script from 'next/script';

export default function PreferredSourceButton() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        margin: 0,
        width: '100%',
      }}
    >
      <Script
        src="https://news.google.com/swg/js/v1/publisher.js"
        strategy="lazyOnload"
      />
      <div
        style={{
          maxWidth: '100%',
          overflow: 'hidden',
          width: '230px',
        }}
      >
        <div
          google-add-preferred-source-btn=""
          data-theme="light"
        />
      </div>
    </div>
  );
}