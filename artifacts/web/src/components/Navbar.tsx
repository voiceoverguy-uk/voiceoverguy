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
      {/* Top Social Bar */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="top-bar-social">
            <a
              href="https://www.youtube.com/channel/UCBKf-ETUIQ5dgh1WNLifhEQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube
            </a>
            <a
              href="https://soundcloud.com/voiceoverguy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SoundCloud"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.175 12.225c-.015 0-.03.005-.045.005-.015 0-.03 0-.045-.005H1.07c-.06 0-.12.005-.175.01C.42 12.3 0 12.76 0 13.32c0 .575.45 1.04 1.01 1.04.015 0 .03 0 .045-.005h.12c.015.005.03.005.045.005s.03 0 .045-.005H1.7c.04 0 .08-.005.12-.01.52-.075.92-.52.92-1.06 0-.445-.27-.83-.645-.99zM2.52 10.83c-.015 0-.03.005-.045.005H2.43c-.015.005-.03.005-.045.005s-.03 0-.045-.005H2.3c-.62.025-1.115.54-1.115 1.165 0 .54.36 1.005.85 1.13.06.015.12.02.185.02.015 0 .03 0 .045-.005H2.4c.015.005.03.005.045.005.015 0 .03 0 .045-.005h.115c.04 0 .08-.005.12-.01.545-.085.97-.565.97-1.13 0-.515-.335-.955-.795-1.1l-.225-.065c-.045-.01-.09-.01-.135-.01zm19.315 1.425c-.315-2.67-2.54-4.73-5.255-4.73-1.025 0-1.98.3-2.785.815-.6-3.365-3.53-5.905-7.04-5.905-3.945 0-7.14 3.195-7.14 7.14 0 .19.01.38.025.565C1.29 9.205.84 9.63.84 10.165c0 .46.3.855.72.99.15.045.31.07.475.07.015 0 .03 0 .045-.005h.12c.015.005.03.005.045.005s.03 0 .045-.005H2.4c.04 0 .08-.005.12-.01.275-.04.52-.165.7-.35.55 3.15 3.28 5.55 6.595 5.55 3.695 0 6.69-2.995 6.69-6.69 0-.085-.005-.17-.01-.255 1.02.46 2.16.72 3.36.72 4.38 0 7.935-3.555 7.935-7.935 0-.16-.005-.315-.015-.47-.72.31-1.535.48-2.39.48-.845 0-1.655-.17-2.39-.48z" />
              </svg>
              SoundCloud
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <img
              src="/assets/images/guy-harris-voiceover.png"
              alt="Guy Harris VoiceoverGuy"
              style={{ height: '55px', width: 'auto' }}
            />
          </Link>

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
              <Link href="/" className="nav-link" role="menuitem">Home</Link>
            </li>

            <li className="nav-item" role="none">
              <Link href="/voiceoverguy" className="nav-link" role="menuitem">&nbsp;Who&nbsp;</Link>
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
                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
              >
                &nbsp;Voice Demos&nbsp;<span className="chevron">▾</span>
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
                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
              >
                &nbsp;Character Demos&nbsp;<span className="chevron">▾</span>
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
                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
              >
                &nbsp;Video&nbsp;<span className="chevron">▾</span>
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
              <Link href="/voiceover-news" className="nav-link" role="menuitem">&nbsp;News &amp; Blog&nbsp;</Link>
            </li>

            <li className="nav-item" role="none">
              <Link href="/FAQ" className="nav-link" role="menuitem">&nbsp;FAQ&apos;s&nbsp;</Link>
            </li>

            {/* Contact & How Much */}
            <li
              className={`nav-item${openItem === 'contact' ? ' mobile-open' : ''}`}
              role="none"
            >
              <button
                className="nav-link"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={openItem === 'contact'}
                onClick={() => toggleMobile('contact')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
              >
                &nbsp;Contact &amp; How Much&nbsp;<span className="chevron">▾</span>
              </button>
              <div className="contact-dropdown" role="menu">
                <div className="contact-dropdown-left">
                  <h4>Get in touch with Guy</h4>
                  <p>Email: <a href="mailto:guy@voiceoverguy.co.uk">Guy(at)VoiceoverGuy.co.uk</a></p>
                  <p>Tel: <a href="tel:+447973350178">+44 (0)7973 350 178</a></p>
                  <p><span>Source Connect NEXUS:</span> VoiceoverGuy</p>
                  <p><span>Cleanfeed:</span> VoiceoverGuy</p>
                  <Link href="/contact-guy" className="cta-btn" style={{ display: 'inline-block', marginTop: '10px', fontSize: '12px', padding: '6px 14px' }}>
                    Contact Guy
                  </Link>
                </div>
                <div className="contact-dropdown-right">
                  <img
                    src="https://www.voiceoverguy.co.uk/assets/images/voiceover-studio-cartoon.jpg"
                    alt="VoiceoverGuy studio cartoon"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
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
                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
              >
                &nbsp;Links&nbsp;<span className="chevron">▾</span>
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
