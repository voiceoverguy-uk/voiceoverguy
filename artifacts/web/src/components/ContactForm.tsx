'use client';

import { useState, useEffect } from 'react';

type PriceTier = {
  label: string;
  price: string;
  note: string;
};

function getPrice(wordCount: number): PriceTier {
  if (wordCount <= 0) {
    return { label: '', price: '', note: '' };
  }
  if (wordCount <= 100) {
    return {
      label: 'Up to 100 words',
      price: '£49.99',
      note: 'Web use · delivered as WAV or MP3',
    };
  }
  if (wordCount <= 200) {
    return {
      label: '101–200 words',
      price: '£74.99',
      note: 'Web use · delivered as WAV or MP3',
    };
  }
  if (wordCount <= 400) {
    return {
      label: '201–400 words',
      price: '£99.99',
      note: 'Web use · delivered as WAV or MP3',
    };
  }
  if (wordCount <= 700) {
    return {
      label: '401–700 words',
      price: '£139.99',
      note: 'Web use · delivered as WAV or MP3',
    };
  }
  return {
    label: 'Over 700 words / TV / Radio / Events',
    price: 'Quote',
    note: 'Please include your script below and I\'ll quote you promptly',
  };
}

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const words = message.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [message]);

  const tier = getPrice(wordCount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:guy@voiceoverguy.co.uk?subject=${encodeURIComponent(subject || 'Voiceover Enquiry')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nScript / Message:\n${message}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="contact-name">Your name *</label>
        <input
          id="contact-name"
          type="text"
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Your full name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">Email address *</label>
        <input
          id="contact-email"
          type="email"
          className="form-control"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-company">Company / Agency</label>
        <input
          id="contact-company"
          type="text"
          className="form-control"
          value={company}
          onChange={e => setCompany(e.target.value)}
          placeholder="Optional"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-subject">Subject</label>
        <input
          id="contact-subject"
          type="text"
          className="form-control"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="e.g. Explainer video voiceover"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">
          Your script or message *{' '}
          <span style={{ fontWeight: 400, color: '#888', fontSize: '12px' }}>
            — paste your script here for an instant price guide
          </span>
        </label>
        <textarea
          id="contact-message"
          className="form-control"
          rows={8}
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
          placeholder="Paste your script here… or just describe what you need."
        />
        <div className="char-counter">
          <span>Word count: <strong>{wordCount}</strong></span>
          <span>Tip: paste your full script for an accurate estimate</span>
        </div>
      </div>

      {wordCount > 0 && (
        <div className="pricing-display">
          {tier.price === 'Quote' ? (
            <>
              <div className="price-label">Estimated price:</div>
              <div className="price">Call / Email for quote</div>
              <div className="pricing-tiers">{tier.note}</div>
            </>
          ) : (
            <>
              <div className="price-label">Estimated price (web use):</div>
              <div className="price">{tier.price}</div>
              <div className="pricing-tiers">{tier.label} · {tier.note}</div>
            </>
          )}
          <div className="pricing-tiers" style={{ marginTop: '6px' }}>
            Prices: Up to 100w £49.99 · 101–200w £74.99 · 201–400w £99.99 · 401–700w £139.99
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button type="submit" className="submit-btn">
          {sent ? '✓ Opening your email client…' : 'Send Message to Guy'}
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>
        Or call Guy direct:{' '}
        <a href="tel:+447973350178" style={{ color: '#9C060B', fontWeight: 600 }}>
          +44 (0)7973 350 178
        </a>
        {' '}· Email:{' '}
        <a href="mailto:guy@voiceoverguy.co.uk" style={{ color: '#9C060B', fontWeight: 600 }}>
          guy@voiceoverguy.co.uk
        </a>
      </p>
    </form>
  );
}
