'use client';

import Script from 'next/script';

interface PreferredSourceApi {
  init: () => void;
}

declare global {
  interface Window {
    PREFERRED_SOURCE?: {
      push: (callback: (api: PreferredSourceApi) => void) => void;
    };
  }
}

function initialisePreferredSourceButton() {
  window.PREFERRED_SOURCE?.push(api => api.init());
}

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
        strategy="afterInteractive"
        onReady={initialisePreferredSourceButton}
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