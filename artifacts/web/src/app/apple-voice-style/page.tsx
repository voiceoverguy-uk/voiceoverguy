import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Apple Voice Style – British Male Voiceover | VoiceoverGuy',
  description: 'Guy Harris delivers the iconic Apple voice style — clean, confident and aspirational. British male voiceover for tech brands and premium product launches.',
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/apple-voice-style' },
};

export default function AppleVoiceStyle() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Apple Voice Style</h1>
          <p>Clean, confident, aspirational — the British voiceover that built tech icons</p>
        </div>
      </div>

      <section className="page-content">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>What is the Apple Voice Style?</h2>
              <p>
                The Apple voice style is perhaps the most copied and least understood voiceover style in
                advertising. It&apos;s minimalist, intimate and confident without being loud. It doesn&apos;t
                sell — it reveals. It suggests that the product speaks for itself and the voice simply
                guides you to notice what&apos;s extraordinary about it.
              </p>
              <p>
                The reads are sparse. The pauses are meaningful. The tone is warm but never sentimental.
                It assumes an intelligent, discerning audience. It&apos;s the antithesis of the classic
                hard-sell advert — which is precisely why it works.
              </p>

              <h2>Guy Harris &amp; the Apple Voice Style</h2>
              <p>
                Guy has voiced numerous Apple-style campaigns for tech brands and premium product launches.
                His natural delivery — unhurried, precise, and with an inherent sense of quiet confidence —
                makes him a natural fit for this style.
              </p>
              <p>
                Watch his Apple-style video demo below to hear how he handles this kind of brief:
              </p>

              <div className="page-content">
                <div className="embed-container">
                  <iframe
                    src="https://www.youtube.com/embed/V6HuBB4WqxQ"
                    title="Guy Harris Apple Voice Style Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <h2>When Should You Use This Style?</h2>
              <ul>
                <li>Tech product launches and demos</li>
                <li>Premium lifestyle and luxury brands</li>
                <li>App explainers for modern software</li>
                <li>Corporate brand films with a premium positioning</li>
                <li>Startup pitch decks and investor presentations</li>
                <li>Any brief that calls for &quot;Apple but British&quot;</li>
              </ul>

              <h2>Listen to the Showreel</h2>
              <div className="sc-embed">
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/voiceoverguy&color=%239C060B&auto_play=false"
                  title="VoiceoverGuy showreel on SoundCloud"
                />
              </div>

              <Link href="/contact-guy" className="cta-btn">Book Guy for Your Tech Campaign</Link>
            </div>

            <div>
              <div className="sidebar-box">
                <h3>Key Characteristics</h3>
                <ul>
                  <li>Quiet confidence — no shouting, no pressure</li>
                  <li>Measured pace with purposeful pauses</li>
                  <li>Warm but never sentimental</li>
                  <li>Minimal, almost understated delivery</li>
                  <li>Clarity above all else</li>
                  <li>Assumes an intelligent listener</li>
                </ul>
              </div>

              <div className="sidebar-box">
                <h3>Related Styles</h3>
                <ul>
                  <li><Link href="/commercial-voiceover">Commercial Voiceover</Link></li>
                  <li><Link href="/explainer-video-voice">Explainer Video Voice</Link></li>
                  <li><Link href="/narration-voice">Narration Voice</Link></li>
                  <li><Link href="/movie-trailer-voice">Movie Trailer Voice</Link></li>
                </ul>
              </div>

              <div className="sidebar-box">
                <h3>Get a Quote</h3>
                <p style={{ fontSize: '13px' }}>
                  Have a brief? Send it over and Guy will respond with a sample read and quote.
                </p>
                <Link href="/contact-guy" className="cta-btn" style={{ display: 'block', textAlign: 'center' }}>
                  Contact Guy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
