'use client';

import Link from 'next/link';
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import LiveSearch from './LiveSearch';
import ServiceContactLink from './ServiceContactLink';
import { voiceDemos, characterDemos } from '@/data/demos';

const videos = [
  { title: 'Voice of Santa', subtitle: "The Uk's Father Christmas", href: 'https://www.youtube.com/watch?v=P44bGiUI0vE' },
  { title: 'Voice of Apple', subtitle: 'iPhone TV Ads', href: 'https://www.youtube.com/watch?v=V6HuBB4WqxQ' },
  { title: 'WORMS WMD', subtitle: 'Army Sergeant', href: 'https://www.youtube.com/watch?v=AnXBP5Klgv0' },
  { title: 'DNCE - Lifestyle of..', subtitle: 'the Rich and Famous', href: 'https://www.youtube.com/watch?v=pzsUS6koEAU' },
  { title: 'Star Wars', subtitle: 'Character voices', href: 'https://www.youtube.com/watch?v=Fm0qSBLhA6A' },
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

function getCurrentTab(pathname: string): string | null {
  if (pathname === '/') return 'home';
  if (pathname === '/voiceoverguy') return 'who';
  if (pathname === '/voiceover-news') return 'news';
  if (pathname === '/faq') return 'faq';
  if (pathname === '/contact-guy') return 'contact';
  if (voiceDemos.some(item => item.href === pathname)) return 'voice';
  if (characterDemos.some(item => item.href === pathname)) return 'char';
  if (links.some(item => !item.external && item.href === pathname)) return 'links';
  return null;
}

type Indicator = { left: number; width: number; visible: boolean; sweep: number };

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const isFixedRef = useRef(false);
  const pathname = usePathname();
  const currentTab = getCurrentTab(pathname);
  const hoveredItemRef = useRef<HTMLElement | null>(null);
  const focusedItemRef = useRef<HTMLElement | null>(null);
  const indicatorTargetRef = useRef<HTMLElement | null>(null);
  const [indicator, setIndicator] = useState<Indicator | null>(null);

  const moveIndicator = useCallback((item: HTMLElement | null) => {
    const menu = menuRef.current;
    if (!menu || !window.matchMedia('(min-width: 769px)').matches) return;
    const link = item?.querySelector<HTMLElement>(':scope > .nav-link');
    if (!link || !item?.isConnected || link.getClientRects().length === 0) {
      indicatorTargetRef.current = null;
      setIndicator(prev => prev && prev.visible ? { ...prev, visible: false } : prev);
      return;
    }

    const menuRect = menu.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const left = linkRect.left - menuRect.left;
    const width = linkRect.width;
    const changed = indicatorTargetRef.current !== item;
    indicatorTargetRef.current = item;
    setIndicator(prev => {
      if (prev?.visible && prev.left === left && prev.width === width && !changed) return prev;
      return { left, width, visible: true, sweep: (prev?.sweep ?? 0) + (changed ? 1 : 0) };
    });
  }, []);

  const activeItem = useCallback(() => (
    menuRef.current?.querySelector<HTMLElement>('.nav-item[data-active="true"]') ?? null
  ), []);

  const preferredItem = useCallback(() => {
    const focused = focusedItemRef.current;
    const focusLink = focused?.querySelector<HTMLElement>(':scope > .nav-link');
    return hoveredItemRef.current ??
      (focusLink?.matches(':focus-visible') ? focused : null) ??
      activeItem();
  }, [activeItem]);

  useLayoutEffect(() => {
    hoveredItemRef.current = null;
    focusedItemRef.current = null;
    moveIndicator(activeItem());
  }, [pathname, isFixed, activeItem, moveIndicator]);

  useEffect(() => {
    const menu = menuRef.current;
    const nav = navRef.current;
    if (!menu || !nav) return;
    let mounted = true;
    const measure = () => moveIndicator(preferredItem());
    const observer = new ResizeObserver(measure);
    observer.observe(menu);
    menu.querySelectorAll(':scope > .nav-item > .nav-link').forEach(link => observer.observe(link));
    window.addEventListener('resize', measure);
    nav.addEventListener('transitionend', measure);
    document.fonts.ready.then(() => { if (mounted) measure(); });
    return () => {
      mounted = false;
      observer.disconnect();
      window.removeEventListener('resize', measure);
      nav.removeEventListener('transitionend', measure);
    };
  }, [moveIndicator, preferredItem]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setOpenItem(null);
  }, []);

  const handleContactClick = useCallback((e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      closeMobile();
      const target = document.getElementById('contact');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      closeMobile();
    }
  }, [pathname, closeMobile]);

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
            src="/assets/images/guy-harris-voiceover.webp"
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
          {/* Fixed mobile: inline search + G icon */}
          <div className="navbar-fixed-search">
            <LiveSearch />
          </div>
          <Link href="/" className="navbar-fixed-icon">
            <img
              src="/assets/images/voiceover-guy-icon.webp"
              alt="VoiceoverGuy"
              className="navbar-fixed-icon-img"
            />
          </Link>

          {/* Desktop sticky logo — shown only in sticky desktop mode */}
          <Link href="/" className="sticky-logo-desktop" aria-label="VoiceoverGuy home">
            <img
              src="/assets/images/voiceover-logo-sticky.webp"
              alt="VoiceoverGuy"
              className="sticky-logo-desktop-img"
            />
          </Link>

          {/* Nav items */}
          <ul ref={menuRef} className={`navbar-nav${mobileOpen ? ' open' : ''}`} role="menubar"
            onPointerOver={(e) => {
              if (!window.matchMedia('(min-width: 769px)').matches) return;
              const item = (e.target as HTMLElement).closest<HTMLElement>('.nav-item');
              if (item === hoveredItemRef.current) return;
              hoveredItemRef.current = item;
              moveIndicator(item ?? preferredItem());
            }}
            onPointerLeave={() => {
              hoveredItemRef.current = null;
              moveIndicator(preferredItem());
            }}
            onFocusCapture={(e) => {
              if (!window.matchMedia('(min-width: 769px)').matches) return;
              const item = (e.target as HTMLElement).closest<HTMLElement>('.nav-item');
              if (item) {
                focusedItemRef.current = item;
                moveIndicator(item);
              }
            }}
            onBlurCapture={(e) => {
              if (!window.matchMedia('(min-width: 769px)').matches) return;
              const nextItem = (e.relatedTarget as HTMLElement | null)?.closest<HTMLElement>('.nav-item') ?? null;
              focusedItemRef.current = nextItem && menuRef.current?.contains(nextItem) ? nextItem : null;
              moveIndicator(preferredItem());
            }}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest('a')) closeMobile();
            }}>
            <li className="nav-item" role="none" data-nav-tab="home" data-active={currentTab === 'home' || undefined} data-sticky-hide="true">
              <Link href="/" className="nav-link" role="menuitem" aria-current={currentTab === 'home' ? 'page' : undefined}><img src="/assets/images/voiceover-guy-icon.webp" alt="VoiceoverGuy" className="nav-home-icon" /> Home</Link>
            </li>

            <li className="nav-item" role="none" data-nav-tab="who" data-active={currentTab === 'who' || undefined}>
              <Link href="/voiceoverguy" className="nav-link" role="menuitem" aria-current={currentTab === 'who' ? 'page' : undefined}><span className="nav-icon">ℹ</span>&nbsp;Who&nbsp;</Link>
            </li>

            {/* Voice Demos */}
            <li
              className={`nav-item${openItem === 'voice' ? ' mobile-open' : ''}`}
              role="none"
              data-nav-tab="voice"
              data-active={currentTab === 'voice' || undefined}
            >
              <button
                className="nav-link"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={openItem === 'voice'}
                onClick={() => toggleMobile('voice')}

              >
                <span className="nav-icon">🎙</span>&nbsp;<span className="label-full">Voice Demos</span><span className="label-short">Demos</span>&nbsp;<span className="chevron">▾</span>
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
              data-nav-tab="char"
              data-active={currentTab === 'char' || undefined}
            >
              <button
                className="nav-link"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={openItem === 'char'}
                onClick={() => toggleMobile('char')}

              >
                <span className="nav-icon">👤</span>&nbsp;<span className="label-full">Character Demos</span><span className="label-short">Characters</span>&nbsp;<span className="chevron">▾</span>
              </button>
              <ul className="dropdown-menu dropdown-menu--wide" role="menu">
                {characterDemos.map(item => (
                  <li key={item.href} role="none">
                    <Link href={item.href} role="menuitem">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Desktop sticky search — between Characters and News in sticky mode */}
            <li className="sticky-search-item" role="none" aria-hidden="true">
              <div className="sticky-search-desktop">
                <LiveSearch compact />
              </div>
            </li>

            {/* Video — hidden in desktop sticky mode */}
            <li
              className={`nav-item${openItem === 'video' ? ' mobile-open' : ''}`}
              role="none"
              data-nav-tab="video"
              data-sticky-hide="true"
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
                      <span className="video-subtitle"> - {item.subtitle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item" role="none" data-nav-tab="news" data-active={currentTab === 'news' || undefined}>
              <Link href="/voiceover-news" className="nav-link" role="menuitem" aria-current={currentTab === 'news' ? 'page' : undefined}><span className="nav-icon">📰</span>&nbsp;<span className="label-full">News &amp; Blog</span><span className="label-short">News</span>&nbsp;</Link>
            </li>

            {/* FAQ's — hidden in desktop sticky mode */}
            <li className="nav-item" role="none" data-nav-tab="faq" data-active={currentTab === 'faq' || undefined} data-sticky-hide="true">
              <Link href="/faq" className="nav-link" role="menuitem" aria-current={currentTab === 'faq' ? 'page' : undefined}><span className="nav-icon">❓</span>&nbsp;FAQ&apos;s&nbsp;</Link>
            </li>

            {/* Links */}
            <li
              className={`nav-item${openItem === 'links' ? ' mobile-open' : ''}`}
              role="none"
              data-nav-tab="links"
              data-active={currentTab === 'links' || undefined}
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
            <li className="nav-item" role="none" data-nav-tab="contact" data-active={currentTab === 'contact' || undefined}>
              <ServiceContactLink className="nav-link nav-link--contact" role="menuitem" onClick={handleContactClick}><span className="nav-icon">📞</span>&nbsp;Contact&nbsp;</ServiceContactLink>
            </li>
            {indicator && (
              <li
                className={`nav-slide-indicator${indicator.visible ? ' nav-slide-indicator--visible' : ''}`}
                role="none"
                aria-hidden="true"
                style={{ width: indicator.width, transform: `translate3d(${indicator.left}px, 0, 0)` }}
              >
                {indicator.visible && <span key={indicator.sweep} className="nav-slide-indicator-glint" />}
              </li>
            )}
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
