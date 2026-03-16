'use client';

import { useState, useRef } from 'react';

const MIN_WORDS = 8;

function countWords(s: string): number {
  return s.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean).length;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const honeypotRef = useRef<HTMLInputElement>(null);

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
          pageTitle: 'Contact Guy',
          pageUrl: '/contact-guy',
          website: honeypotRef.current?.value ?? '',
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

  if (status === 'success') {
    return (
      <div style={{ padding: '32px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', fontWeight: 700, color: '#9C060B', marginBottom: '8px' }}>Message sent — thank you!</p>
        <p style={{ color: '#555', fontSize: '14px' }}>Guy will get back to you as soon as he can.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />

      <div className="form-group">
        <label htmlFor="contact-name">Your name *</label>
        <input
          id="contact-name"
          type="text"
          className={`form-control${errors.name ? ' form-control--error' : ''}`}
          value={name}
          onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
          required
          placeholder="Your full name"
          autoComplete="name"
        />
        {errors.name && <span className="blog-enquiry-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">Email address *</label>
        <input
          id="contact-email"
          type="email"
          className={`form-control${errors.email ? ' form-control--error' : ''}`}
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
          required
          placeholder="your@email.com"
          autoComplete="email"
        />
        {errors.email && <span className="blog-enquiry-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">
          Your message *{' '}
          <span style={{ fontWeight: 400, color: '#888', fontSize: '12px' }}>
            — paste your script or describe what you need
          </span>
        </label>
        <textarea
          id="contact-message"
          className={`form-control${errors.message ? ' form-control--error' : ''}`}
          rows={8}
          value={message}
          onChange={e => { setMessage(e.target.value); setErrors(p => ({ ...p, message: undefined })); }}
          required
          placeholder="Paste your script here… or just describe what you need."
        />
        {message.length > 0 && (
          <span className={`blog-enquiry-wordcount${messageReady ? ' blog-enquiry-wordcount--ok' : ''}`}>
            {messageReady
              ? '✓ Ready to send'
              : `${wordCount} / ${MIN_WORDS} words — ${remaining} more needed`}
          </span>
        )}
        {errors.message && <span className="blog-enquiry-error">{errors.message}</span>}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          type="submit"
          className="submit-btn"
          disabled={status === 'sending'}
          style={{ opacity: messageReady ? 1 : 0.38, transition: 'opacity 0.2s' }}
        >
          {status === 'sending' ? 'Sending…' : 'Send Message to Guy'}
        </button>
        {status === 'error' && (
          <span className="blog-enquiry-error" style={{ display: 'block', marginTop: '8px' }}>{serverError}</span>
        )}
      </div>
    </form>
  );
}
