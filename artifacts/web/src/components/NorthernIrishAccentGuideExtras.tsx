'use client';

import Link from 'next/link';
import MiniPlayer from '@/components/MiniPlayer';
import { useThirdPartyConsent } from '@/components/ThirdPartyConsent';
import { characterVoiceLibrary } from '@/data/characterVoiceLibrary';
import { trackEvent } from '@/lib/googleAnalytics';

const GUIDE_SLUG = 'guide-to-a-northern-irish-accent';

function getCockneyDemoSrc(): string {
  const demo = characterVoiceLibrary.find(item => item.id === 'cockney-voice-morrisons');
  if (!demo) {
    throw new Error('The Morrisons Cockney demo is missing from the character voice library.');
  }
  return demo.mp3;
}

const cockneyDemoSrc = getCockneyDemoSrc();

function trackOnwardClick(destination: string, analyticsAllowed: boolean) {
  if (!analyticsAllowed) return;
  trackEvent('guide_onward_click', {
    guide_slug: GUIDE_SLUG,
    destination,
  });
}

function trackDemoStart(analyticsAllowed: boolean) {
  if (!analyticsAllowed) return;
  trackEvent('guide_demo_start', {
    guide_slug: GUIDE_SLUG,
    demo_style: 'cockney',
    demo_project: 'morrisons_wonky_range',
  });
}

export function NorthernIrishGuideListeningBlock() {
  const { preferences } = useThirdPartyConsent();

  return (
    <div className="container ni-guide-listening-wrap">
      <section className="ni-guide-listening" aria-labelledby="ni-guide-listening-title">
        <div className="ni-guide-listening-copy">
          <h2 id="ni-guide-listening-title">Hear Guy’s character voices</h2>
          <p><span className="ni-guide-style-label">Cockney</span> Morrisons Wonky Range commercial demo</p>
        </div>
        <MiniPlayer
          src={cockneyDemoSrc}
          title="Morrisons Wonky Range commercial — Cockney"
          onPlaybackStart={() => trackDemoStart(preferences.analytics)}
        />
        <Link
          href="/character-voice-library"
          className="ni-guide-library-link"
          onClick={() => trackOnwardClick('character_voice_library', preferences.analytics)}
        >
          Explore the Character Voice Library
        </Link>
      </section>
    </div>
  );
}

export function NorthernIrishGuideKeepExploring() {
  const { preferences } = useThirdPartyConsent();

  return (
    <section className="ni-guide-keep-exploring" aria-labelledby="ni-guide-keep-exploring-title">
      <h2 id="ni-guide-keep-exploring-title">Keep exploring</h2>
      <p>
        <Link
          href="/guide-to-regional-english-accents"
          onClick={() => trackOnwardClick('regional_english_accents_guide', preferences.analytics)}
        >
          Read the regional English accents guide
        </Link>
        <span aria-hidden="true"> · </span>
        <Link
          href="/contact-guy"
          className="ni-guide-contact-link"
          onClick={() => trackOnwardClick('contact_about_voiceover', preferences.analytics)}
        >
          Get in touch about a voiceover
        </Link>
      </p>
    </section>
  );
}
