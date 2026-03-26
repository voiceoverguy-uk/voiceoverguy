'use client';

import { useState, useEffect, useRef } from 'react';

const MIN_WORDS = 8;

function countWords(s: string): number {
  return s.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean).length;
}

function getTimeGreeting(): string {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon … 5=Fri, 6=Sat
  const hour = now.getHours();

  if (day === 0) return 'Enjoy the weekend.';
  if (day === 6) return 'Enjoy the weekend.';
  if (day === 5 && hour >= 17) return 'Enjoy the weekend.';
  if (hour < 12) return 'Have a good morning.';
  if (hour < 17) return 'Have a good afternoon.';
  return 'Have a good evening.';
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function HomepageContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const [greeting, setGreeting] = useState('');
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setGreeting(getTimeGreeting());
  }, []);

  const wordCount = countWords(message);
  const messageReady = wordCount >= MIN_WORDS;
  const remaining = MIN_WORDS - wordCount;

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!name.trim()) e.name = 'Please enter your name.';
    if (!email.trim()) {
      e.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = 'Please enter a valid email address.';
    }
    if (!message.trim()) {
      e.message = 'Please enter a message.';
    } else if (!messageReady) {
      e.message = 'Please write at least 8 words so Guy can understand your project.';
    }
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus('sending');
    setServerError('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website: honeypotRef.current?.value ?? '',
          pageTitle: 'Homepage',
          pageUrl: window.location.href,
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError(data?.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setServerError('Unable to send your message. Please check your connection and try again.');
      setStatus('error');
    }
  }

  return (
    <section className="homepage-contact">
      <div className="container">
        <div className="homepage-contact-inner">

          {/* Left column: heading + intro */}
          <div className="homepage-contact-left">
            <h2 className="homepage-contact-heading">Like what you&rsquo;ve heard?<br />Let&rsquo;s talk.</h2>
            <p className="homepage-contact-intro">From commercials and explainer videos to character voices, promos and narration, send me a quick message and I&rsquo;ll get back to you.</p>
          </div>

          {/* Right column: form */}
          <div className="homepage-contact-right">
            {status === 'success' ? (
              <div className="homepage-contact-success">
                <p className="homepage-contact-success-msg">Thanks &mdash; your message is on its way. I&rsquo;ll get back to you as soon as I can.</p>
                {greeting && <p className="homepage-contact-greeting">{greeting}</p>}
              </div>
            ) : (
              <form className="homepage-contact-form" onSubmit={handleSubmit} noValidate>
                <input
                  ref={honeypotRef}
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                />

                <div className="homepage-contact-row">
                  <div className="homepage-contact-field">
                    <label htmlFor="hc-name">Your name *</label>
                    <input
                      id="hc-name"
                      type="text"
                      className={`homepage-contact-input${errors.name ? ' homepage-contact-input--error' : ''}`}
                      value={name}
                      onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                    {errors.name && <span className="homepage-contact-error-msg">{errors.name}</span>}
                  </div>

                  <div className="homepage-contact-field">
                    <label htmlFor="hc-email">Email address *</label>
                    <input
                      id="hc-email"
                      type="email"
                      className={`homepage-contact-input${errors.email ? ' homepage-contact-input--error' : ''}`}
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                      placeholder="your@email.com"
                      autoComplete="email"
                      required
                    />
                    {errors.email && <span className="homepage-contact-error-msg">{errors.email}</span>}
                  </div>
                </div>

                <div className="homepage-contact-field">
                  <label htmlFor="hc-message">Message *</label>
                  <textarea
                    id="hc-message"
                    className={`homepage-contact-textarea${errors.message ? ' homepage-contact-input--error' : ''}`}
                    rows={4}
                    value={message}
                    onChange={e => { setMessage(e.target.value); setErrors(p => ({ ...p, message: undefined })); }}
                    placeholder="Give me some details, including usage and format"
                    required
                  />
                  {message.length > 0 && (
                    <span className={`homepage-contact-wordcount${messageReady ? ' homepage-contact-wordcount--ok' : ''}`}>
                      {messageReady ? '✓ Ready to send' : `${wordCount} / ${MIN_WORDS} words — ${remaining} more needed`}
                    </span>
                  )}
                  {errors.message && <span className="homepage-contact-error-msg">{errors.message}</span>}
                </div>

                <div className="homepage-contact-footer">
                  <button
                    type="submit"
                    className="homepage-contact-btn"
                    disabled={status === 'sending'}
                    style={{ opacity: messageReady ? 1 : 0.45, transition: 'opacity 0.2s' }}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                  {status === 'error' && (
                    <span className="homepage-contact-error-msg homepage-contact-server-error">{serverError}</span>
                  )}
                  {greeting && <p className="homepage-contact-greeting">{greeting}</p>}
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
