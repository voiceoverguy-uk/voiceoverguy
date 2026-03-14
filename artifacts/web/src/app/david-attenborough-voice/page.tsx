import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'David Attenborough Voice Style – British Male Narrator | VoiceoverGuy',
  description: "Guy Harris delivers the David Attenborough voice style — considered, measured and awe-inspiring. British male narrator for nature, documentary and brand films.",
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/david-attenborough-voice' },
};

export default function DavidAttenboroughVoice() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>David Attenborough Voice Style</h1>
          <p>Considered, measured, awe-inspiring — the natural history narrator</p>
        </div>
      </div>

      <section className="page-content">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>The Attenborough Voice Style</h2>
              <p>
                Sir David Attenborough is arguably the most beloved British voice of the last century.
                His narration style is immediately recognisable — slow, deliberate, filled with wonder
                and reverence for the natural world. It speaks to something deeply human: our sense of
                awe at the planet we live on.
              </p>
              <p>
                Guy Harris has studied and mastered this narration style over many years. His Attenborough-
                inspired delivery brings that same sense of gravitas, intelligence and wonder to any brief
                — from genuine natural history content to tongue-in-cheek parody campaigns that need
                exactly that distinctive British authority.
              </p>

              <h2>David Attenborough Script Generator</h2>
              <p>
                Want to hear how your script sounds in Attenborough style? Use our free{' '}
                <Link href="/attenborough-script-generator">David Attenborough Script Generator</Link>
                {' '}to write a script in his iconic style. Then send it to Guy to voice!
              </p>

              <h2>When to Use This Style</h2>
              <ul>
                <li>Nature documentaries and wildlife content</li>
                <li>Parody and humorous campaigns using the &quot;Attenborough treatment&quot;</li>
                <li>Brand films that want a sense of gravitas and authority</li>
                <li>Science and discovery content</li>
                <li>Travel and destination films</li>
                <li>Any brief calling for a considered, intelligent British narrator</li>
              </ul>

              <h2>Listen to a Sample</h2>
              <div className="sc-embed">
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/voiceoverguy&color=%239C060B&auto_play=false"
                  title="VoiceoverGuy showreel"
                />
              </div>

              <Link href="/contact-guy" className="cta-btn">Book Guy for Narration</Link>
            </div>

            <div>
              <div className="sidebar-box">
                <h3>Key Voice Characteristics</h3>
                <ul>
                  <li>Slow, measured delivery with meaning in every word</li>
                  <li>Natural pauses for maximum impact</li>
                  <li>Warm authority without arrogance</li>
                  <li>Deep reverence and genuine wonder</li>
                  <li>Absolute clarity of diction</li>
                  <li>Never rushed — the audience must feel as if time has slowed</li>
                </ul>
              </div>

              <div className="sidebar-box">
                <h3>Related Pages</h3>
                <ul>
                  <li><Link href="/narration-voice">Narration Voiceover</Link></li>
                  <li><Link href="/attenborough-script-generator">Script Generator</Link></li>
                  <li><Link href="/commercial-voiceover">Commercial Voiceover</Link></li>
                  <li><Link href="/contact-guy">Contact &amp; Pricing</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
