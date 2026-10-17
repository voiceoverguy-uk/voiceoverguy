'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from 'react';
import { characterCreditSlides } from '@/data/characterCredits';

const AUTO_ADVANCE_MS = 6000;
const CROSSFADE_MS = 700;
const PRELOAD_NEXT_AFTER_MS = 1800;

export default function CharacterCreditsSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [activeVisible, setActiveVisible] = useState(true);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const slideshowRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(activeIndex);
  const preloadedImages = useRef(new Map<number, Promise<void>>());
  const navigationRequest = useRef(0);
  const transitionTimer = useRef<number | null>(null);
  const animationFrame = useRef<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const canRotate = !prefersReducedMotion && isInViewport && isDocumentVisible;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const preloadImage = useCallback((index: number) => {
    const existing = preloadedImages.current.get(index);
    if (existing) return existing;

    const promise = new Promise<void>((resolve) => {
      const image = new window.Image();
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        resolve();
      };
      image.decoding = 'async';
      image.addEventListener('load', finish, { once: true });
      image.addEventListener('error', finish, { once: true });
      image.src = characterCreditSlides[index].src;
      if (image.complete) finish();
    });

    preloadedImages.current.set(index, promise);
    return promise;
  }, []);

  const navigateTo = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndexRef.current) return;

    const request = ++navigationRequest.current;
    void preloadImage(nextIndex).then(() => {
      if (request !== navigationRequest.current) return;

      if (transitionTimer.current !== null) {
        window.clearTimeout(transitionTimer.current);
      }
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }

      const previous = activeIndexRef.current;
      activeIndexRef.current = nextIndex;
      setPreviousIndex(prefersReducedMotion ? null : previous);
      setActiveIndex(nextIndex);

      if (prefersReducedMotion) {
        setActiveVisible(true);
        return;
      }

      setActiveVisible(false);
      animationFrame.current = window.requestAnimationFrame(() => {
        setActiveVisible(true);
      });
      transitionTimer.current = window.setTimeout(() => {
        setPreviousIndex(null);
        transitionTimer.current = null;
      }, CROSSFADE_MS);
    });
  }, [preloadImage, prefersReducedMotion]);

  useEffect(() => {
    const element = slideshowRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsInViewport(entry.isIntersecting && entry.intersectionRatio > 0);
    }, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      setPrefersReducedMotion(query.matches);
    };
    updatePreference();
    query.addEventListener('change', updatePreference);
    return () => query.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (!canRotate) return;
    const nextIndex = (activeIndex + 1) % characterCreditSlides.length;
    const preloadTimer = window.setTimeout(() => {
      void preloadImage(nextIndex);
    }, PRELOAD_NEXT_AFTER_MS);
    return () => window.clearTimeout(preloadTimer);
  }, [activeIndex, canRotate, preloadImage]);

  useEffect(() => {
    if (!canRotate) return;
    const timer = window.setTimeout(() => {
      const nextIndex = (activeIndexRef.current + 1) % characterCreditSlides.length;
      navigateTo(nextIndex);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, canRotate, navigateTo]);

  useEffect(() => () => {
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
    if (animationFrame.current !== null) window.cancelAnimationFrame(animationFrame.current);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.closest('.character-credit-controls, .character-credit-dots')) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      navigateTo((activeIndexRef.current - 1 + characterCreditSlides.length) % characterCreditSlides.length);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      navigateTo((activeIndexRef.current + 1) % characterCreditSlides.length);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;

    const direction = deltaX < 0 ? 1 : -1;
    navigateTo((activeIndexRef.current + direction + characterCreditSlides.length) % characterCreditSlides.length);
  };

  const handleTouchCancel = () => {
    touchStart.current = null;
  };

  const renderedIndices = previousIndex === null
    ? [activeIndex]
    : [previousIndex, activeIndex];
  return (
    <section
      ref={slideshowRef}
      className="character-credits-section"
      aria-label="Character voice credits"
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
    >
      <div className="container">
        <div
          className="character-credits-stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          {renderedIndices.map((index) => {
            const slide = characterCreditSlides[index];
            const isActive = index === activeIndex;
            const classNames = [
              'character-credits-slide',
              isActive && 'character-credits-slide--active',
              isActive && !activeVisible && 'character-credits-slide--entering',
              !isActive && 'character-credits-slide--outgoing',
            ].filter(Boolean).join(' ');

            return (
              <div
                key={slide.src}
                className={classNames}
                role={isActive ? 'group' : undefined}
                aria-roledescription={isActive ? 'slide' : undefined}
                aria-label={isActive ? `Slide ${index + 1} of ${characterCreditSlides.length}` : undefined}
                aria-hidden={!isActive}
              >
                <Image
                  src={slide.src}
                  alt={isActive ? slide.alt : ''}
                  fill
                  priority={index === 0 && activeIndex === 0}
                  sizes="(max-width: 1169px) calc(100vw - 30px), 1140px"
                  unoptimized
                  draggable={false}
                  onLoad={() => preloadedImages.current.set(index, Promise.resolve())}
                />
                {isActive && (
                  <span className="sr-only">
                    Character: {slide.character}. Production: {slide.production}.
                  </span>
                )}
              </div>
            );
          })}

          <div className="character-credit-controls" role="group" aria-label="Slideshow controls">
            <button
              className="character-credit-control character-credit-control--previous"
              type="button"
              aria-label={`Previous slide: ${characterCreditSlides[(activeIndex - 1 + characterCreditSlides.length) % characterCreditSlides.length].character}`}
              onClick={() => navigateTo((activeIndexRef.current - 1 + characterCreditSlides.length) % characterCreditSlides.length)}
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              className="character-credit-control character-credit-control--next"
              type="button"
              aria-label={`Next slide: ${characterCreditSlides[(activeIndex + 1) % characterCreditSlides.length].character}`}
              onClick={() => navigateTo((activeIndexRef.current + 1) % characterCreditSlides.length)}
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>

        <div className="character-credit-dots" role="group" aria-label="Choose a character credit">
          {characterCreditSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className="character-credit-dot"
              aria-label={`Go to slide ${index + 1}: ${slide.character}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => navigateTo(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
