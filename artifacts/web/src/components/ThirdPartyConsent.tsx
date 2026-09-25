'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

type Category = 'media' | 'payments';
type Preferences = Record<Category, boolean>;
type ConsentState = { preferences: Preferences; decided: boolean; setPreferences: (next: Preferences) => void };
const denied: Preferences = { media: false, payments: false };
const storageKey = 'voiceoverguy-third-party-consent-v1';
const ConsentContext = createContext<ConsentState | null>(null);

export function useThirdPartyConsent() {
  const state = useContext(ConsentContext);
  if (!state) throw new Error('Third-party consent provider is missing');
  return state;
}

export function ConsentGate({ category, provider, children, className }: {
  category: Category; provider: string; children: React.ReactNode; className?: string;
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
          update({ media: parsed.media, payments: parsed.payments });
          setDecided(true);
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
    // PayPal's SDK installs globals and handlers; a full reload is required after withdrawal.
    const reload = preferences.payments && !next.payments && !!document.getElementById('paypal-sdk-script');
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
          <p>Media embeds from YouTube (Google), Vimeo and SoundCloud send your IP address and device/browser information to those providers when loaded; they may use cookies or similar storage for playback, analytics and personalisation. PayPal checkout sends this information to PayPal and may use cookies or similar storage for payment and fraud prevention. Neither category loads until you opt in. Your choices are saved only in this browser as necessary preferences. <a href="/privacy-policy">Privacy policy</a>.</p>
          <div className="consent-actions">
            <button type="button" onClick={() => setPreferences(denied)}>Reject optional services</button>
            <button type="button" onClick={() => { setDraft(denied); setOpen(true); }}>Choose separately</button>
            <button type="button" onClick={() => setPreferences({ media: true, payments: true })}>Allow both</button>
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
          <p>YouTube (Google), Vimeo and SoundCloud embeds may receive your IP address and device/browser details and use cookies or similar storage for playback, analytics and personalisation. PayPal receives these details and may use cookies or similar storage for payments and fraud prevention. Your choices are stored in this browser only; you can withdraw at any time. <a href="/privacy-policy">Privacy policy</a>.</p>
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