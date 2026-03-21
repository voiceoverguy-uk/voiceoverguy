'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import LiveSearch from './LiveSearch';
import { voiceDemos, characterDemos } from '@/data/demos';

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
  { label: 'Voiceover Studio Yorkshire', subtitle: "Professional recording booth", href: 'https://voiceoverstudiofinder.com/VoiceoverGuy', external: true },
  { label: 'Attenborough Script Generator', subtitle: 'Free AI script tool', href: '/attenborough-script-generator' },
  { label: 'Santa Script Generator', subtitle: 'Free festive message tool', href: '/santa-script-generator' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const isFixedRef = useRef(false);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setOpenItem(null);
  }, []);

  const toggleMobile = (label: string) => {
    setOpenItem(prev => prev === label ? null : label);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const handleTapOutside = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && navRef.current.contains(e.target as Node)) return;
      if (menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect();
        const clientY = 'touches' in e ? e.touches[0]?.clientY ?? 0 : (e as MouseEvent).clientY;
        if (clientY <= menuRect.bottom) return;
      }
      closeMobile();
    };
    document.addEventListener('mousedown', handleTapOutside);
    document.addEventListener('touchstart', handleTapOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleTapOutside);
      document.removeEventListener('touchstart', handleTapOutside);
    };
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    const onScroll = () => {
      if (!logoRef.current || !navRef.current) return;
      const logoBottom = logoRef.current.getBoundingClientRect().bottom;
      const shouldFix = logoBottom <= 0;
      if (shouldFix !== isFixedRef.current) {
        isFixedRef.current = shouldFix;
        setIsFixed(shouldFix);
        navRef.current.classList.toggle('navbar--fixed', shouldFix);
        if (spacerRef.current) {
          spacerRef.current.style.display = shouldFix ? 'block' : 'none';
          spacerRef.current.style.height = shouldFix ? `${navRef.current.offsetHeight}px` : '0';
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="navbar-logo-row" ref={logoRef}>
        {!isFixed && (
          <button
            className="navbar-toggle-top"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(o => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        )}
        <Link href="/" className="navbar-logo">
          <img
            src="/assets/images/guy-harris-voiceover.png"
            alt="Guy Harris VoiceoverGuy"
            className="navbar-logo-img"
          />
        </Link>
      </div>
      {/* Main Navbar */}
      <nav className="navbar" role="navigation" aria-label="Main navigation" ref={navRef}>

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
          {/* Mobile mini logo (visible only when navbar is fixed on mobile) */}
          <Link href="/" className="navbar-mini-logo">
            <img
              src="/assets/images/guy-harris-voiceover.png"
              alt="Guy Harris VoiceoverGuy"
              className="navbar-mini-logo-img"
            />
          </Link>

          {/* Nav items */}
          <ul ref={menuRef} className={`navbar-nav${mobileOpen ? ' open' : ''}`} role="menubar" onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('a')) closeMobile();
          }}>
            <li className="nav-item" role="none">
              <Link href="/" className="nav-link" role="menuitem"><img src="/assets/images/voiceover-guy-icon.png" alt="" className="nav-home-icon" /> Home</Link>
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

            {/* Contact */}
            <li className="nav-item" role="none">
              <Link href="/contact-guy" className="nav-link" role="menuitem"><span className="nav-icon">📞</span>&nbsp;Contact&nbsp;</Link>
            </li>
          </ul>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-bar-inner">
            <LiveSearch />
          </div>
        </div>
      </nav>
      <div className="navbar-spacer" ref={spacerRef} />
    </>
  );
}
