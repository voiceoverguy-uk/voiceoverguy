import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Football Commentator Voice – British Male Sports Voice | VoiceoverGuy',
  description: "Guy Harris delivers energetic British football commentary for games trailers, sports promos and social media. Hire the UK's leading sports voiceover artist.",
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/football-commentator-voice' },
};

export default function FootballCommentatorVoice() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Football Commentator Voice</h1>
          <p>Energetic, passionate British sports commentary for games, promos and events</p>
        </div>
      </div>

      <section className="page-content">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>The Football Commentator Voice</h2>
              <p>
                There&apos;s nothing quite like a great football commentary voice. The building tension as
                a player breaks through, the split-second anticipation, the eruption of &quot;GOAL!&quot; that
                sends millions to their feet — it&apos;s one of the most powerful and instantly recognisable
                voiceover styles in British broadcasting.
              </p>
              <p>
                Guy Harris delivers authentic, passionate British football commentary for video games,
                sports trailers, social media promos, fantasy football platforms, and live event announcing.
                His commentary voice has been used by Fantasy EFL and a range of sports media clients.
              </p>

              <h2>Nuby Milk Race Commentator</h2>
              <p>
                One of Guy&apos;s most-loved projects is the Nuby Milk Race — a hilarious baby formula
                advertisement voiced in the style of a motor racing commentator, perfectly suited for
                stressed parents who need a laugh. It shows the range and wit Guy brings to sports
                commentary briefs.
              </p>

              <h2>Football Commentary Services</h2>
              <ul>
                <li>Video game in-game commentary and character voices</li>
                <li>Sports app and fantasy football platform voiceovers</li>
                <li>Match highlight and promotional videos</li>
                <li>Social media sports clips and reels</li>
                <li>Live event match-day announcing</li>
                <li>Humorous sports parody content</li>
                <li>Pre-recorded stadium announcement packages</li>
              </ul>

              <h2>Listen to the Commentary Demo</h2>
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

              <Link href="/contact-guy" className="cta-btn">Book Guy for Sports Voiceover</Link>
            </div>

            <div>
              <div className="sidebar-box">
                <h3>Sports Voiceover Credits</h3>
                <ul>
                  <li>Fantasy EFL — platform voiceover</li>
                  <li>Nuby Milk Race — TV &amp; web commercial</li>
                  <li>Various live sports events</li>
                  <li>Social media sports campaigns</li>
                </ul>
              </div>

              <div className="sidebar-box">
                <h3>Related Pages</h3>
                <ul>
                  <li><Link href="/voice-of-god">Voice of God / Announcing</Link></li>
                  <li><Link href="/commercial-voiceover">Commercial Voiceover</Link></li>
                  <li><Link href="/character-voiceover">Character Voiceovers</Link></li>
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
