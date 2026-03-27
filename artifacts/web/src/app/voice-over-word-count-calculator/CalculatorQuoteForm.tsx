'use client';

import { useState, useEffect, useRef } from 'react';

interface Props {
  wordCount: number;
}

export default function CalculatorQuoteForm({ wordCount }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [formWords, setFormWords] = useState(wordCount > 0 ? String(wordCount) : '');
  const [userEditedWords, setUserEditedWords] = useState(false);
  const [usage, setUsage] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!userEditedWords) {
      setFormWords(wordCount > 0 ? String(wordCount) : '');
    }
  }, [wordCount, userEditedWords]);

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = 'Please enter a valid email address';
    }
    if (!details.trim()) e.details = 'Project details are required';
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

    const messageParts = [
      'Enquiry Source: Voiceover Word Count Calculator',
      company.trim() ? `Company / Brand: ${company.trim()}` : '',
      formWords ? `Number of words: ${formWords}` : '',
      usage ? `Usage: ${usage}` : '',
      `Project details: ${details.trim()}`,
    ].filter(Boolean);

    const message = messageParts.join('\n\n');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message,
          website: honeypotRef.current?.value ?? '',
          pageTitle: 'Voiceover Word Count Calculator',
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
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
      <div className="calc-card calc-quote-card">
        <div className="calc-quote-success">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <p>Thank you for your enquiry. I will get back to you with an accurate quote shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="calc-card calc-quote-card">
      <h2 className="calc-quote-heading">Need an accurate voiceover quote?</h2>
      <p className="calc-quote-intro">
        Send over the details below and I&apos;ll come back to you with a proper quote based on word count, usage and turnaround.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <input
          ref={honeypotRef}
          type="text"
          name="website"
          tabIndex={-1}
          aria-hidden="true"
          style={{ display: 'none' }}
          autoComplete="off"
        />

        <div className="calc-quote-grid">
          <div className="calc-quote-field">
            <label className="calc-label" htmlFor="q-name">Name</label>
            <input
              id="q-name"
              type="text"
              className={`calc-quote-input${errors.name ? ' calc-quote-input--error' : ''}`}
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="name"
            />
            {errors.name && <span className="calc-quote-error">{errors.name}</span>}
          </div>

          <div className="calc-quote-field">
            <label className="calc-label" htmlFor="q-email">Email</label>
            <input
              id="q-email"
              type="email"
              className={`calc-quote-input${errors.email ? ' calc-quote-input--error' : ''}`}
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
            {errors.email && <span className="calc-quote-error">{errors.email}</span>}
          </div>

          <div className="calc-quote-field">
            <label className="calc-label" htmlFor="q-company">Company / Brand</label>
            <input
              id="q-company"
              type="text"
              className="calc-quote-input"
              value={company}
              onChange={e => setCompany(e.target.value)}
              autoComplete="organization"
            />
          </div>

          <div className="calc-quote-field">
            <label className="calc-label" htmlFor="q-words">Number of words</label>
            <input
              id="q-words"
              type="number"
              min="0"
              className="calc-quote-input"
              value={formWords}
              onChange={e => {
                setFormWords(e.target.value);
                setUserEditedWords(true);
              }}
            />
          </div>

          <div className="calc-quote-field calc-quote-field--full">
            <label className="calc-label" htmlFor="q-usage">Usage</label>
            <select
              id="q-usage"
              className="calc-quote-input calc-quote-select"
              value={usage}
              onChange={e => setUsage(e.target.value)}
            >
              <option value="">Select usage type...</option>
              <option>Internal / corporate use</option>
              <option>Website / social media</option>
              <option>Online advertising</option>
              <option>Radio advertising</option>
              <option>TV advertising</option>
              <option>Explainer video</option>
              <option>E-learning / training</option>
              <option>On-hold / IVR</option>
              <option>Not sure yet</option>
            </select>
          </div>

          <div className="calc-quote-field calc-quote-field--full">
            <label className="calc-label" htmlFor="q-details">Project details</label>
            <textarea
              id="q-details"
              className={`calc-quote-textarea${errors.details ? ' calc-quote-input--error' : ''}`}
              rows={4}
              placeholder="Tell me about the project, where the audio will be used, and any deadline."
              value={details}
              onChange={e => setDetails(e.target.value)}
            />
            {errors.details && <span className="calc-quote-error">{errors.details}</span>}
          </div>
        </div>

        {status === 'error' && serverError && (
          <p className="calc-quote-server-error">{serverError}</p>
        )}

        <div className="calc-actions" style={{ marginTop: '20px' }}>
          <button
            type="submit"
            className="calc-btn calc-btn--primary"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Quote Request'}
          </button>
        </div>
      </form>
    </div>
  );
}
