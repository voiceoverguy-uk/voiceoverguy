'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { withdrawAnalytics } from '@/lib/googleAnalytics';

type Category = 'media' | 'payments' | 'analytics';
type Preferences = Record<Category, boolean>;
type ConsentState = { preferences: Preferences; decided: boolean; setPreferences: (next: Preferences) => void };
const denied: Preferences = { media: false, payments: false, analytics: false };
const storageKey = 'voiceoverguy-third-party-consent-v1';
const ConsentContext = createContext<ConsentState | null>(null);

export function useThirdPartyConsent() {
  const state = useContext(ConsentContext);
  if (!state) throw new Error('Third-party consent provider is missing');
  return state;
}

export function ConsentGate({ category, provider, children, className }: {
  category: Exclude<Category, 'analytics'>; provider: string; children: React.ReactNode; className?: string;
}) {
  const { preferences, setPreferences } = useThirdPartyConsent();
  if (preferences[category]) return <>{children}</>;
  return (
    <div className={`consent-placeholder ${className || ''}`} role="group" aria-label={`${provider} embed`}>
      <p>{provider} {category === 'media' ? 'media is off. Allowing media enables YouTube (Google), Vimeo and SoundCloud across this website' : 'checkout is off until you allow PayPal'}. These services may receive your IP address and device/browser details and use cookies or similar storage {category === 'media' ? 'for playback, analytics and personalisation' : 'for payments and fraud prevention'} when loaded. You can withdraw using Privacy &amp; third-party settings.</p>
      <button type="button" onClick={() => setPreferences({ ...preferences, [category]: true })}>Allow {category === 'media' ? 'media' : 'payments'} and load {provider}</button>
    </div>
  );
}

export default function ThirdPartyConsent({ children }: { children: React.ReactNode }) {
  const [preferences, update] = useState<Preferences>(denied);
  const [decided, setDecided] = useState(false);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Preferences>(denied);
  const settingsButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && 'media' in parsed && 'payments' in parsed &&
          typeof parsed.media === 'boolean' && typeof parsed.payments === 'boolean') {
          const analytics = 'analytics' in parsed && parsed.analytics === true;
          update({ media: parsed.media, payments: parsed.payments, analytics });
          // Existing media/PayPal permission is not permission for the newly added analytics.
          setDecided('analytics' in parsed && typeof parsed.analytics === 'boolean');
        }
      }
    } catch {
      // Storage can be unavailable; default deny and allow a session-only choice.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (open) dialog.current?.focus();
  }, [open]);

  function setPreferences(next: Preferences) {
    // Reload after withdrawal to remove SDK handlers and stop an already-loaded analytics tag.
    const withdrawGA = preferences.analytics && !next.analytics;
    if (withdrawGA) withdrawAnalytics();
    const reload = withdrawGA || (preferences.payments && !next.payments && !!document.getElementById('paypal-sdk-script'));
    update(next);
    setDraft(next);
    setDecided(true);
    setOpen(false);
    if (open) settingsButton.current?.focus();
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      if (!next.payments) localStorage.removeItem('__paypal_storage__');
    } catch { /* session-only */ }
    if (reload) window.location.reload();
  }

  return (
    <ConsentContext.Provider value={{ preferences, decided, setPreferences }}>
      {children}
      <div className="consent-control">
        <button ref={settingsButton} type="button" onClick={() => { setDraft(preferences); setOpen(true); }}>Privacy &amp; third-party settings</button>
      </div>
      {ready && !decided && !open && (
        <div className="consent-panel" role="region" aria-label="Third-party consent choices">
          <h2>Choose what loads</h2>
          <p>Optional services stay off until you agree. Google Analytics uses cookies to help me understand visits and how the site is used. YouTube, Vimeo and SoundCloud media may use cookies for playback, analytics and personalisation. PayPal uses information for payments and fraud prevention. These providers receive technical information such as your IP address and browser details when enabled. You can choose each separately or reject all. Your choices are saved in this browser. <a href="/privacy-policy">Privacy policy</a>.</p>
          <div className="consent-actions">
            <button type="button" onClick={() => setPreferences(denied)}>Reject optional services</button>
            <button type="button" onClick={() => { setDraft(preferences); setOpen(true); }}>Choose separately</button>
            <button type="button" onClick={() => setPreferences({ media: true, payments: true, analytics: true })}>Allow all</button>
          </div>
        </div>
      )}
      {open && (
        <div ref={dialog} tabIndex={-1} className="consent-panel" role="dialog" aria-modal="true" aria-labelledby="consent-title" onKeyDown={e => {
          if (e.key === 'Escape' && decided) { setOpen(false); settingsButton.current?.focus(); }
          if (e.key === 'Tab') {
            const controls = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('a, button, input'));
            const first = controls[0], last = controls[controls.length - 1];
            if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { e.preventDefault(); last?.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
          }
        }}>
          <h2 id="consent-title">Third-party settings</h2>
          <p>Google Analytics uses cookies to measure visits and site usage. Media providers use information for playback, analytics and personalisation; PayPal uses it for payments and fraud prevention. Each provider receives technical information when enabled. Your choices are stored in this browser; you can withdraw at any time. Withdrawing analytics clears its cookies and reloads the page to stop tracking. <a href="/privacy-policy">Privacy policy</a>.</p>
          <label><input type="checkbox" checked={draft.analytics} onChange={e => setDraft({ ...draft, analytics: e.target.checked })} /> Allow Google Analytics</label>
          <label><input type="checkbox" checked={draft.media} onChange={e => setDraft({ ...draft, media: e.target.checked })} /> Allow YouTube, Vimeo and SoundCloud media</label>
          <label><input type="checkbox" checked={draft.payments} onChange={e => setDraft({ ...draft, payments: e.target.checked })} /> Allow PayPal checkout</label>
          <div className="consent-actions">
            <button type="button" onClick={() => setPreferences(denied)}>Reject all / withdraw</button>
            <button type="button" onClick={() => setPreferences(draft)}>Save choices</button>
            {decided && <button type="button" onClick={() => setOpen(false)}>Cancel</button>}
          </div>
        </div>
      )}
    </ConsentContext.Provider>
  );
}