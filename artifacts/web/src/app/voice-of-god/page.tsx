import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Voice of God – British Male Event Announcing Voice | VoiceoverGuy',
  description: 'Guy Harris is one of the UK\'s leading Voice of God artists. Awards shows, corporate events, TV studio recordings, sports events and live entertainment. Book now.',
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/voice-of-god' },
};

export default function VoiceOfGod() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Voice of God</h1>
          <p>The commanding live event announcing voice for TV shows, awards ceremonies and corporate events</p>
        </div>
      </div>

      <section className="page-content">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>What is Voice of God?</h2>
              <p>
                &quot;Voice of God&quot; — or VOG — is the term used in live entertainment, television production
                and events for the disembodied announcing voice that builds atmosphere, introduces guests,
                directs audience behaviour and opens shows. It&apos;s the voice that says &quot;Ladies and gentlemen,
                please welcome...&quot; before the roof comes off.
              </p>
              <p>
                It&apos;s a highly specialised skill. The VOG voice must be instantly commanding — capable of
                cutting through crowd noise and an excited audience — while also being warm, engaging
                and appropriate for the event. Too stiff and it&apos;s robotic. Too casual and it loses authority.
                The balance is everything.
              </p>

              <h2>Guy&apos;s Voice of God Credentials</h2>
              <p>
                Guy Harris is one of the most experienced VOG voices in the UK. He has been the Voice of
                God for the TV Choice Awards five consecutive years — one of the UK&apos;s biggest celebrity
                awards events, broadcast nationally. He&apos;s also the VOG for The Masked Singer live shows
                at Butlins holiday parks across the UK, heard by thousands of families every week.
              </p>
              <p>
                His VOG work spans TV studio audiences, corporate conferences, product launches, music
                tours and sporting events. Wherever you need a voice that fills a room and commands
                attention — Guy delivers.
              </p>

              <h2>Voice of God Services</h2>
              <ul>
                <li>TV show audience warm-up and direction</li>
                <li>Awards ceremony introducing presenters and winners</li>
                <li>Corporate conference and product launch announcing</li>
                <li>Sports event pre-match and half-time announcing</li>
                <li>Live entertainment shows (concerts, theatre, arenas)</li>
                <li>Pre-recorded VOG packages for automated event systems</li>
                <li>Bespoke event announcement scripts written and voiced by Guy</li>
              </ul>

              <h2>What You&apos;ll Receive</h2>
              <p>
                For pre-recorded VOG packages, Guy delivers broadcast-quality WAV files — typically
                named and split by announcement for easy playout on event systems. He can also attend
                events to voice live as the show progresses, or join remotely via ISDN, Source Connect
                or Cleanfeed where a live presence is required.
              </p>

              <Link href="/contact-guy" className="cta-btn">Book Guy as Your VOG</Link>
            </div>

            <div>
              <div className="sidebar-box">
                <h3>VOG Credits</h3>
                <ul>
                  <li>TV Choice Awards — VOG (5 years running)</li>
                  <li>The Masked Singer live shows at Butlins</li>
                  <li>LEGO Legoland Windsor — Daily Park Opening Ceremony (2026)</li>
                  <li>Stephen Mulhern &apos;In For a Penny&apos; — ITV</li>
                  <li>Various corporate conferences and product launches</li>
                  <li>Sports events and music tours</li>
                </ul>
              </div>

              <div className="sidebar-box">
                <h3>Related Pages</h3>
                <ul>
                  <li><Link href="/commercial-voiceover">Commercial Voiceover</Link></li>
                  <li><Link href="/football-commentator-voice">Football Commentator Voice</Link></li>
                  <li><Link href="/santa-voice">Voice of Santa</Link></li>
                  <li><Link href="/contact-guy">Contact &amp; Pricing</Link></li>
                </ul>
              </div>

              <div className="sidebar-box">
                <h3>Book Guy</h3>
                <p style={{ fontSize: '13px' }}>
                  Tell Guy about your event — date, venue, type and what you need announced.
                  He&apos;ll come back with a quote and options fast.
                </p>
                <Link href="/contact-guy" className="cta-btn" style={{ display: 'block', textAlign: 'center' }}>
                  Contact Guy
                </Link>
                <p style={{ fontSize: '12px', marginTop: '10px', textAlign: 'center' }}>
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
