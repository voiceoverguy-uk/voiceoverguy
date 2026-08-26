'use client';

import { useState, useRef } from 'react';

interface Props {
  pageTitle: string;
  pageUrl: string;
  intro?: string;
  afterMessageNode?: React.ReactNode;
}

const MIN_WORDS = 8;

function countWords(s: string): number {
  return s.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean).length;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function BlogEnquiryForm({ pageTitle, pageUrl, intro, afterMessageNode }: Props) {
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
      e.message = 'Please write at least 8 words so I can understand your project.';
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
          pageTitle,
          pageUrl,
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
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Have a good morning!' : hour < 17 ? 'Have a good afternoon!' : 'Have a good evening!';
    return (
      <div className="blog-enquiry-section">
        <div className="blog-enquiry-success">
          <strong>Message sent — thank you!</strong>
          <p>I'll get back to you as soon as I can.</p>
          <p style={{ color: '#9C060B', fontSize: '14px', marginTop: '8px', fontStyle: 'italic' }}>{greeting}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-enquiry-section">
      <p className="blog-enquiry-intro">
        {intro ?? "Need a voice for something similar? Send me a quick message and I'll get back to you."}
      </p>

      <form onSubmit={handleSubmit} noValidate className="blog-enquiry-form">
        <input
          ref={honeypotRef}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
        />

        <div className="blog-enquiry-row">
          <div className="blog-enquiry-field">
            <label htmlFor="enq-name">Name</label>
            <input
              id="enq-name"
              type="text"
              className={`form-control${errors.name ? ' form-control--error' : ''}`}
              value={name}
              onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
              placeholder="Your name"
              autoComplete="name"
            />
            {errors.name && <span className="blog-enquiry-error">{errors.name}</span>}
          </div>

          <div className="blog-enquiry-field">
            <label htmlFor="enq-email">Email</label>
            <input
              id="enq-email"
              type="email"
              className={`form-control${errors.email ? ' form-control--error' : ''}`}
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
              placeholder="your@email.com"
              autoComplete="email"
            />
            {errors.email && <span className="blog-enquiry-error">{errors.email}</span>}
          </div>
        </div>

        <div className="blog-enquiry-field">
          <label htmlFor="enq-message">Message</label>
          <textarea
            id="enq-message"
            className={`form-control${errors.message ? ' form-control--error' : ''}`}
            rows={4}
            value={message}
            onChange={e => { setMessage(e.target.value); setErrors(p => ({ ...p, message: undefined })); }}
            placeholder="Tell me a little about your project and usage..."
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

        <div className="blog-enquiry-footer">
          <div className="blog-enquiry-actions">
            <button
              type="submit"
              className="blog-enquiry-btn"
              disabled={status === 'sending'}
              style={{ opacity: messageReady ? 1 : 0.38, transition: 'opacity 0.2s' }}
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            {afterMessageNode && (
              <div className="blog-enquiry-preferred-source">
                {afterMessageNode}
              </div>
            )}
          </div>
          {status === 'error' && (
            <span className="blog-enquiry-error blog-enquiry-error--server">{serverError}</span>
          )}
        </div>
      </form>
    </div>
  );
}
