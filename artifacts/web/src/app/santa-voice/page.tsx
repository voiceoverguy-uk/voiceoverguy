import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Voice of Santa – The UK's Favourite Father Christmas Voice | VoiceoverGuy",
  description: "Guy Harris is the UK's No.1 Voice of Santa. The Father Christmas voice for BBC Radio 2, Global Radio and Christmas campaigns everywhere. Book the voice of Santa now.",
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/santa-voice' },
};

export default function SantaVoice() {
  return (
    <>
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #7a0508 0%, #9C060B 50%, #7a0508 100%)' }}>
        <div className="container">
          <h1>Voice of Santa</h1>
          <p>The UK&apos;s Favourite Father Christmas Voice · BBC Radio 2 · Global Radio · National Christmas Campaigns</p>
        </div>
      </div>

      <section className="page-content">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>Ho Ho Ho! The UK&apos;s Voice of Santa</h2>
              <p>
                Guy Harris is the UK&apos;s most booked Voice of Santa. His warm, jolly, instantly recognisable
                Father Christmas voice has been heard by millions of children and adults on BBC Radio 2,
                the Global Radio Network, in shopping centres, on social media campaigns and at live events
                across the country.
              </p>
              <p>
                Guy has voiced Santa for BBC Radio 2&apos;s festive broadcasts, appeared on the Global Radio
                network&apos;s Cash Call competition as Santa, and voiced P&amp;O&apos;s Christmas animation for
                social media. His Santa voice is warm, magical and utterly believable — whether you need
                a jolly &quot;Ho Ho Ho&quot; for a 30-second radio spot or a full interactive Santa experience
                for a live event or telephone service.
              </p>

              <h2>Watch Guy&apos;s Voice of Santa Demo</h2>
              <div className="embed-container">
                <iframe
                  src="https://www.youtube.com/embed/P44bGiUI0vE"
                  title="Guy Harris Voice of Santa Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <h2>Santa Voice Services</h2>
              <ul>
                <li>Radio and TV Christmas commercials</li>
                <li>Social media and viral Christmas campaigns</li>
                <li>Live event Father Christmas announcing (grotto, shopping centre, arena)</li>
                <li>Personalised Santa message recordings (for children)</li>
                <li>Santa telephone hotline voice</li>
                <li>Christmas e-card and animated video narration</li>
                <li>Corporate Christmas party announcing</li>
              </ul>

              <h2>Santa Script Generator</h2>
              <p>
                Need a Santa script? Use our free{' '}
                <Link href="/santa-script-generator">Santa Script Generator</Link>
                {' '}to create a personalised Father Christmas message in seconds.
                Then send it to Guy to voice!
              </p>

              <Link href="/contact-guy" className="cta-btn" style={{ marginTop: '16px', display: 'inline-block' }}>
                Book the Voice of Santa
              </Link>
            </div>

            <div>
              <div className="sidebar-box">
                <h3>Santa Voice Credits</h3>
                <ul>
                  <li>BBC Radio 2 — Voice of Santa</li>
                  <li>Global Radio Network — Santa on Cash Call</li>
                  <li>P&amp;O Cruises — Santa Christmas animation</li>
                  <li>Numerous live event grottos</li>
                  <li>Shopping centre campaigns</li>
                  <li>Corporate Christmas events</li>
                </ul>
              </div>

              <div className="sidebar-box">
                <h3>Also From Guy at Christmas</h3>
                <ul>
                  <li><Link href="/santa-script-generator">Free Santa Script Generator</Link></li>
                  <li><Link href="/voice-of-god">Voice of God for Christmas Events</Link></li>
                  <li><Link href="/commercial-voiceover">Christmas Commercial Voiceover</Link></li>
                </ul>
              </div>

              <div className="sidebar-box">
                <h3>Book Santa&apos;s Voice</h3>
                <p style={{ fontSize: '13px' }}>
                  Christmas is busy! Book early to secure the voice of Santa for your campaign.
                  Get in touch now.
                </p>
                <Link href="/contact-guy" className="cta-btn" style={{ display: 'block', textAlign: 'center', background: '#7a0508' }}>
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
