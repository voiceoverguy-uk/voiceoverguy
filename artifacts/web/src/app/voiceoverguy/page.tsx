import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Guy Harris – British Male Voiceover Artist | VoiceoverGuy',
  description: 'Guy Harris is an award-winning British male voiceover artist based in Yorkshire with 25+ years experience. Voice of Santa, WORMS WMD, Thomas & Friends, ITV and more.',
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/voiceoverguy' },
};

export default function VoiceoverGuy() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>About Guy Harris – VoiceoverGuy</h1>
          <p>Award Winning British Male Voiceover Artist · Based in Yorkshire · Studio Available 7 days</p>
        </div>
      </div>

      <section className="page-content">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>Who is VoiceoverGuy?</h2>
              <p>
                Guy Harris is one of the UK&apos;s most experienced and versatile British male voiceover artists.
                With over 25 years in the industry, his voice has been heard on ITV, BBC, Channel 4, Sky,
                across national radio networks, in video games, children&apos;s television, live events
                and everywhere in between.
              </p>
              <p>
                You may know him best as the Army Sergeant in WORMS WMD (Team17), or as the Voice of Salty
                and Winston in Thomas &amp; Friends: All Engines Go. He&apos;s also the Voice of Santa for
                BBC Radio 2, the Voice of God for the TV Choice Awards five years running, and a regular
                competition voice on Britain&apos;s Got Talent.
              </p>
              <p>
                Based in his professional recording studio in Yorkshire, Guy delivers broadcast quality
                voiceovers seven days a week — often within hours of receiving a brief.
              </p>

              <h2>Awards &amp; Recognition</h2>
              <ul>
                <li>Drum Awards — Best Male Voice</li>
                <li>IndiePendent TV — Voice Artist of the Year</li>
                <li>5-star rated on Google by clients across the UK and internationally</li>
              </ul>

              <h2>Notable Clients &amp; Credits</h2>
              <ul>
                <li>ITV — Britain&apos;s Got Talent competition voice</li>
                <li>Team17 — WORMS WMD, Army Sergeant character voice</li>
                <li>Mattel — Thomas &amp; Friends: All Engines Go (Salty, Winston, Blue Troublesome Tanker)</li>
                <li>BBC Radio 2 — Voice of Santa</li>
                <li>TV Choice Awards — Voice of God (5 years running)</li>
                <li>Butlins — Voice of God for The Masked Singer live shows</li>
                <li>LEGO / Legoland Windsor — CakeGuy Minifigure character voice (2026)</li>
                <li>Global Radio Network — Santa on Cash Call</li>
                <li>Disney Store, Samsung, Skipton Building Society, Harpic, Gregory Porter UK Tour</li>
                <li>GB News, P&amp;O Cruises, Compare the Meerkat (internal)</li>
              </ul>

              <h2>The Studio</h2>
              <p>
                Guy&apos;s home studio in Yorkshire is a professionally acoustically treated recording space
                kitted out with high-end microphones, preamps and monitoring. It supports Source Connect NEXUS,
                Cleanfeed, Zoom, Skype and all major remote direction platforms.
              </p>
              <p>
                The studio is also available to hire for other voice artists and actors working in the
                Yorkshire area. <Link href="/voiceover-studio">Find out more about the studio →</Link>
              </p>

              <h2>Get in Touch</h2>
              <p>
                Ready to book? Got a project in mind? Drop Guy a message or call him directly.
                He responds to all enquiries personally and quickly.
              </p>
              <p>
                <Link href="/contact-guy" className="cta-btn">Contact Guy</Link>
                {' '}
                <a href="tel:+447973350178" className="cta-btn-outline" style={{ marginLeft: '12px' }}>
                  +44 (0)7973 350 178
                </a>
              </p>
            </div>

            <div>
              <div className="sidebar-box">
                <h3>Quick Facts</h3>
                <p><strong>Based:</strong> Yorkshire, UK</p>
                <p><strong>Experience:</strong> 25+ years</p>
                <p><strong>Studio:</strong> Professional home recording studio</p>
                <p><strong>Turnaround:</strong> 4–8 hours (standard) · 2 hours (priority)</p>
                <p><strong>Remote:</strong> Source Connect NEXUS · Cleanfeed · Zoom · Skype</p>
                <p><strong>Source Connect:</strong> VoiceoverGuy</p>
                <p><strong>Email:</strong> <a href="mailto:guy@voiceoverguy.co.uk">guy@voiceoverguy.co.uk</a></p>
                <p><strong>Tel:</strong> <a href="tel:+447973350178">+44 (0)7973 350 178</a></p>
              </div>

              <div className="sidebar-box">
                <h3>Voice Styles</h3>
                <ul>
                  <li><Link href="/commercial-voiceover">Commercial Voiceover</Link></li>
                  <li><Link href="/apple-voice-style">Apple Voice Style</Link></li>
                  <li><Link href="/explainer-video-voice">Explainer Video Voice</Link></li>
                  <li><Link href="/narration-voice">Narration Voice</Link></li>
                  <li><Link href="/voice-of-god">Voice of God</Link></li>
                  <li><Link href="/santa-voice">Voice of Santa</Link></li>
                  <li><Link href="/david-attenborough-voice">David Attenborough Voice</Link></li>
                  <li><Link href="/football-commentator-voice">Football Commentator Voice</Link></li>
                  <li><Link href="/character-voiceover">Character Voiceovers</Link></li>
                </ul>
              </div>

              <div className="sidebar-box">
                <h3>Recent Work</h3>
                <p style={{ fontSize: '13px' }}>
                  LEGO CakeGuy at Legoland Windsor 2026 · Britain&apos;s Got Talent 2025 ·
                  Team-17 top secret project · The Last Person on Earth podcast (3 robot characters) ·
                  TV Choice Awards VOG 2026 (5th year) · P&amp;O Santa animation ·
                  Global Radio Santa on Cash Call 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
