import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Commercial Voiceover – British Male TV & Radio Voice | VoiceoverGuy',
  description: 'Guy Harris is a British male commercial voiceover artist for TV, radio and digital advertising. Award-winning voice for major brands. Fast delivery, competitive rates.',
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/commercial-voiceover' },
};

export default function CommercialVoiceover() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Commercial Voiceover</h1>
          <p>Award-winning British male voice for TV, radio and digital advertising</p>
        </div>
      </div>

      <section className="page-content">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>British Male Commercial Voiceover</h2>
              <p>
                Whether you need a warm, trustworthy voice for a national TV spot or a punchy, energetic
                read for a digital campaign, Guy Harris delivers commercial voiceovers that cut through the
                noise and sell. With 25+ years voicing commercials for brands large and small, he knows
                exactly how to make your product sound irresistible.
              </p>
              <p>
                From Harpic and Samsung on national television to regional radio campaigns and digital
                pre-roll, Guy has voiced it all. His versatile delivery means he can shift effortlessly
                from a hard-sell retail voice to a soft, considered brand voice — whatever your brief demands.
              </p>

              <h2>What Makes a Great Commercial Voice?</h2>
              <p>
                The best commercial voiceovers sound effortless — like a real person talking to you, not
                reading at you. They breathe with the rhythm of the music bed, land the key message at
                exactly the right moment, and leave the listener or viewer feeling something.
              </p>
              <p>
                That skill comes from experience, instinct and a deep understanding of commercial timing.
                Guy has been doing this for over a quarter of a century.
              </p>

              <h2>Commercial Voiceover Styles</h2>
              <ul>
                <li>Warm and conversational — lifestyle, FMCG, food &amp; drink</li>
                <li>Authoritative and trustworthy — finance, insurance, legal</li>
                <li>Energetic and punchy — retail, automotive, gaming</li>
                <li>Aspirational and polished — luxury, tech, fashion</li>
                <li>Humorous and light — family, entertainment, app marketing</li>
              </ul>

              <h2>Listen to the Commercial Showreel</h2>
              <div className="sc-embed">
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/voiceoverguy/commercial-showreel&color=%239C060B&auto_play=false"
                  title="Guy Harris commercial voiceover showreel"
                />
              </div>

              <h2>Commercial Voiceover Pricing</h2>
              <p>
                Pricing depends on the medium (TV, radio, digital), territory (UK, Europe, worldwide),
                and duration of licence. For web-use commercials, I offer transparent fixed pricing.
                For broadcast commercials, I quote on a per-project basis — usually within a few hours.
              </p>
              <Link href="/contact-guy" className="cta-btn">Get a Quote</Link>
            </div>

            <div>
              <div className="sidebar-box">
                <h3>Recent Commercial Credits</h3>
                <ul>
                  <li>Harpic Fresh Stickers — TV &amp; Web</li>
                  <li>Samsung OLED TV — National Radio</li>
                  <li>Skipton Building Society — Energy Saving campaign</li>
                  <li>XM Trading — Male promo voice</li>
                  <li>P&amp;O Cruises — Santa campaign</li>
                  <li>Compare the Meerkat — Internal</li>
                  <li>Gregory Porter UK Tour — TV promo</li>
                  <li>Seabrooks — Stephen Mulhern ITV sponsorship</li>
                </ul>
              </div>

              <div className="sidebar-box">
                <h3>Book a Commercial Voiceover</h3>
                <p style={{ fontSize: '13px' }}>
                  Send Guy your brief and script. He&apos;ll quote you promptly and can usually
                  deliver within hours of confirmation.
                </p>
                <Link href="/contact-guy" className="cta-btn" style={{ display: 'block', textAlign: 'center' }}>
                  Contact Guy
                </Link>
                <p style={{ fontSize: '12px', marginTop: '12px', textAlign: 'center' }}>
                  <a href="tel:+447973350178">+44 (0)7973 350 178</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
