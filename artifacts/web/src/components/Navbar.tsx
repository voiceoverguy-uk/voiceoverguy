'use client';

import Link from 'next/link';
import { useState } from 'react';

const voiceDemos = [
  { label: 'Apple Voice Style', href: '/apple-voice-style' },
  { label: 'Commercial Voiceover', href: '/commercial-voiceover' },
  { label: 'Explainer Video Voiceover', href: '/explainer-video-voice' },
  { label: 'Narration Voice', href: '/narration-voice' },
  { label: 'Voice of God', href: '/voice-of-god' },
  { label: 'Imaging Voice', href: '/voiceover-imaging' },
  { label: 'Movie Trailer Voice', href: '/movie-trailer-voice' },
  { label: 'Game Trailer Voice', href: '/game-trailer-voice' },
  { label: 'On Hold Voice', href: '/on-hold-voice' },
];

const characterDemos = [
  { label: 'David Attenborough Voice', href: '/david-attenborough-voice' },
  { label: "The UK's Official Voice of Santa", href: '/santa-voice' },
  { label: 'Football Commentator Voice', href: '/football-commentator-voice' },
  { label: 'Gameshow Host Voice', href: '/gameshow-host' },
  { label: 'Spooky Halloween Voice', href: '/halloween-voice' },
  { label: 'My Character Voiceovers', href: '/character-voiceover' },
  { label: 'Pirate Voice – Ah ha!', href: '/pirate-voice' },
  { label: 'Pathe News Voice', href: '/pathe-news-voice' },
];

const videos = [
  { title: 'Voice of Santa', subtitle: "The Uk's Father Christmas", href: 'https://www.youtube.com/watch?v=P44bGiUI0vE' },
  { title: 'Voice of Apple', subtitle: 'iPhone TV Ads', href: 'https://www.youtube.com/watch?v=V6HuBB4WqxQ' },
  { title: 'WORMS WMD', subtitle: 'Army Sergeant', href: 'https://www.youtube.com/watch?v=AnXBP5Klgv0' },
  { title: 'DNCE - Lifestyle of..', subtitle: 'the Rich and Famous', href: 'https://www.youtube.com/watch?v=pzsUS6koEAU' },
  { title: 'Star Wars', subtitle: 'Character voices', href: 'https://www.youtube.com/watch?v=Fm0qSBLhA6A' },
  { title: 'Craig Cash', subtitle: 'Character voice', href: 'https://www.youtube.com/watch?v=OmVuCVXsWM4' },
];

const links = [
  { label: 'The Studio', subtitle: 'Tour my studio', href: '/voiceover-studio' },
  { label: 'Voiceover Cartoons', subtitle: "Guy's voiceover humour", href: '/voiceover-cartoons' },
  { label: 'Studio Finder', subtitle: 'Needs a Voiceover Studio?', href: '/voiceover-studio-finder' },
  { label: 'Santa Radio', subtitle: 'The biggest online Christmas Radio', href: 'https://www.santaradio.co.uk', external: true },
  { label: "The UK's Voice of Santa", subtitle: "The Favourite Santa Voice!", href: '/santa-voice' },
  { label: 'Voiceover Studio Yorkshire', subtitle: "Professional recording booth", href: '/voiceover-studio-hire' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleMobile = (label: string) => {
    setOpenItem(prev => prev === label ? null : label);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-logo-row">
          <Link href="/" className="navbar-logo">
            <img
              src="/assets/images/guy-harris-voiceover.png"
              alt="Guy Harris VoiceoverGuy"
              style={{ height: '85px', width: 'auto' }}
            />
          </Link>
        </div>
        <div className="navbar-inner">
          {/* Mobile toggle */}
          <button
            className="navbar-toggle"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(o => !o)}
          >
            <span />
            <span />
            <span />
          </button>

          {/* Nav items */}
          <ul className={`navbar-nav${mobileOpen ? ' open' : ''}`} role="menubar">
            <li className="nav-item" role="none">
              <Link href="/" className="nav-link" role="menuitem"><span className="nav-icon">🏠</span> Home</Link>
            </li>

            <li className="nav-item" role="none">
              <Link href="/voiceoverguy" className="nav-link" role="menuitem"><span className="nav-icon">ℹ</span>&nbsp;Who&nbsp;</Link>
            </li>

            {/* Voice Demos */}
            <li
              className={`nav-item${openItem === 'voice' ? ' mobile-open' : ''}`}
              role="none"
            >
              <button
                className="nav-link"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={openItem === 'voice'}
                onClick={() => toggleMobile('voice')}

              >
                <span className="nav-icon">🎙</span>&nbsp;Voice Demos&nbsp;<span className="chevron">▾</span>
              </button>
              <ul className="dropdown-menu" role="menu">
                {voiceDemos.map(item => (
                  <li key={item.href} role="none">
                    <Link href={item.href} role="menuitem">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Character Demos */}
            <li
              className={`nav-item${openItem === 'char' ? ' mobile-open' : ''}`}
              role="none"
            >
              <button
                className="nav-link"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={openItem === 'char'}
                onClick={() => toggleMobile('char')}

              >
                <span className="nav-icon">👤</span>&nbsp;Character Demos&nbsp;<span className="chevron">▾</span>
              </button>
              <ul className="dropdown-menu" role="menu">
                {characterDemos.map(item => (
                  <li key={item.href} role="none">
                    <Link href={item.href} role="menuitem">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Video */}
            <li
              className={`nav-item${openItem === 'video' ? ' mobile-open' : ''}`}
              role="none"
            >
              <button
                className="nav-link"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={openItem === 'video'}
                onClick={() => toggleMobile('video')}

              >
                <span className="nav-icon">🎬</span>&nbsp;Video&nbsp;<span className="chevron">▾</span>
              </button>
              <ul className="dropdown-menu" role="menu">
                {videos.map(item => (
                  <li key={item.href} role="none">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dropdown-video-item"
                      role="menuitem"
                    >
                      <strong>{item.title}</strong>
                      <span className="video-subtitle">{item.subtitle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item" role="none">
              <Link href="/voiceover-news" className="nav-link" role="menuitem"><span className="nav-icon">📰</span>&nbsp;News &amp; Blog&nbsp;</Link>
            </li>

            <li className="nav-item" role="none">
              <Link href="/FAQ" className="nav-link" role="menuitem"><span className="nav-icon">❓</span>&nbsp;FAQ&apos;s&nbsp;</Link>
            </li>

            {/* Links */}
            <li
              className={`nav-item${openItem === 'links' ? ' mobile-open' : ''}`}
              role="none"
            >
              <button
                className="nav-link"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={openItem === 'links'}
                onClick={() => toggleMobile('links')}

              >
                <span className="nav-icon">🔗</span>&nbsp;Links&nbsp;<span className="chevron">▾</span>
              </button>
              <div className="mega-menu" role="menu">
                <div className="mega-menu-header">
                  <div className="mega-menu-title">This is my Links Page</div>
                  <div className="mega-menu-subtitle">Have a mooch around. You&apos;ll love the studio!</div>
                </div>
                <ul className="mega-menu-links">
                  {links.map(item => (
                    <li key={item.href} role="none">
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        role="menuitem"
                      >
                        <span>
                          <span className="link-star">★</span>
                          {item.label}
                        </span>
                        <span className="link-subtitle">{item.subtitle}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Contact & How Much */}
            <li
              className={`nav-item${openItem === 'contact' ? ' mobile-open' : ''}`}
              role="none"
            >
              <span
                className="nav-link"
                aria-haspopup="true"
                aria-expanded={openItem === 'contact'}
              >
                <Link href="/contact-guy" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <span className="nav-icon">📞</span>&nbsp;Contact &amp; How Much&nbsp;
                </Link>
                <button
                  className="chevron-btn"
                  aria-label="Toggle contact dropdown"
                  onClick={(e) => { e.preventDefault(); toggleMobile('contact'); }}
                >▾</button>
              </span>
              <div className="contact-dropdown" role="menu">
                <div className="contact-dropdown-left">
                  <h4>Get in touch with Guy</h4>
                  <p>Email: <a href="mailto:guy@voiceoverguy.co.uk">Guy(at)VoiceoverGuy.co.uk</a></p>
                  <p><span>Source NEXUS:</span> VoiceoverGuy</p>
                  <p><span>Cleanfeed:</span> VoiceoverGuy</p>
                  <Link href="/contact-guy" className="cta-btn" style={{ display: 'inline-block', marginTop: '10px', fontSize: '12px', padding: '6px 14px' }}>
                    Contact Guy
                  </Link>
                </div>
                <div className="contact-dropdown-right">
                  <img
                    src="/assets/images/voicoverguy-contact.png"
                    alt="VoiceoverGuy contact"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-bar-inner">
            <input
              type="search"
              className="search-input"
              placeholder="What voice do you need? Attenborough, Santa, Narration, Explainer… start typing."
              aria-label="Search voiceover styles"
            />
          </div>
        </div>
      </nav>
    </>
  );
}
