'use client';

import { useEffect } from 'react';

const YOUTUBE_ORIGINS = new Set([
  'https://www.youtube.com',
  'https://www.youtube-nocookie.com',
]);

export default function YouTubePauseCoordinator() {
  useEffect(() => {
    const iframes = Array.from(
      document.querySelectorAll<HTMLIFrameElement>(
        'iframe[src*="youtube.com/embed/"], iframe[src*="youtube-nocookie.com/embed/"]'
      )
    );
    if (iframes.length < 2) return;

    function startListening(iframe: HTMLIFrameElement) {
      try {
        iframe.contentWindow?.postMessage(
          JSON.stringify({ event: 'listening', id: iframe.id || '', channel: 'widget' }),
          '*'
        );
      } catch {}
    }

    const loadHandlers: Array<() => void> = [];
    iframes.forEach((iframe) => {
      const handler = () => startListening(iframe);
      loadHandlers.push(handler);
      iframe.addEventListener('load', handler);
      startListening(iframe);
    });

    function onMessage(e: MessageEvent) {
      if (!YOUTUBE_ORIGINS.has(e.origin)) return;
      let data: { event?: string; info?: { playerState?: number } } | null = null;
      try {
        data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (!data || data.event !== 'infoDelivery') return;
      if (data.info?.playerState !== 1) return;
      iframes.forEach((iframe) => {
        if (iframe.contentWindow && iframe.contentWindow !== e.source) {
          try {
            iframe.contentWindow.postMessage(
              JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
              '*'
            );
          } catch {}
        }
      });
    }

    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
      iframes.forEach((iframe, i) => {
        const handler = loadHandlers[i];
        if (handler) iframe.removeEventListener('load', handler);
      });
    };
  }, []);

  return null;
}
