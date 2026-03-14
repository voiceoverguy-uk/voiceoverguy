import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Voiceover Studio Yorkshire – Professional Recording Booth | VoiceoverGuy',
  description: "Tour Guy Harris's professional voiceover studio in Yorkshire. Available to hire for voice artists, actors and agencies. Source Connect, Cleanfeed and all major platforms.",
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/voiceover-studio' },
};

export default function VoiceoverStudio() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>The Voiceover Studio</h1>
          <p>Professional recording studio in Yorkshire — available to hire</p>
        </div>
      </div>

      <section className="page-content">
        <div className="container">
          <div className="two-col">
            <div>
              <h2>Guy&apos;s Professional Home Studio</h2>
              <p>
                Guy Harris records from a purpose-built, professionally acoustically treated home studio
                in Yorkshire. It&apos;s the same standard as a commercial recording studio — quiet, dead and
                capable of producing broadcast-quality audio that passes straight to air without correction.
              </p>
              <p>
                The studio is kitted out with professional microphones, preamps, monitoring speakers and
                a high-spec recording chain. It connects to clients worldwide via Source Connect NEXUS,
                Cleanfeed, Zoom, Skype and all major remote session platforms.
              </p>

              <h2>Studio Equipment</h2>
              <ul>
                <li>Neumann microphones (broadcast standard)</li>
                <li>High-end preamp chain</li>
                <li>Professional acoustic treatment — fully soundproofed booth</li>
                <li>Source Connect NEXUS (address: VoiceoverGuy)</li>
                <li>Cleanfeed (VoiceoverGuy)</li>
                <li>Adobe Audition / Pro Tools capable</li>
                <li>24-bit recording at 44.1kHz and 48kHz</li>
              </ul>

              <h2>Studio Hire in Yorkshire</h2>
              <p>
                The studio is also available to hire for visiting voice artists, actors and agencies.
                If you need a professional recording space in Yorkshire — whether you&apos;re a local actor
                working on an Emmerdale script or a travelling voice artist who needs a booth — the studio
                is available for sessional hire.
              </p>
              <p>
                The studio has been used regularly by productions connected with Emmerdale and other
                Yorkshire-based TV productions.
              </p>

              <h2>Voiceover Studio Finder</h2>
              <p>
                Looking for a voiceover studio near you? Check out the{' '}
                <Link href="/voiceover-studio-finder">Voiceover Studio Finder</Link>
                {' '}— the UK&apos;s most comprehensive directory of professional voiceover booths for hire.
              </p>

              <Link href="/contact-guy" className="cta-btn">Enquire About Studio Hire</Link>
            </div>

            <div>
              <div className="sidebar-box">
                <h3>Remote Session Details</h3>
                <p style={{ fontSize: '13px' }}><strong>Source Connect NEXUS:</strong> VoiceoverGuy</p>
                <p style={{ fontSize: '13px' }}><strong>Cleanfeed:</strong> VoiceoverGuy</p>
                <p style={{ fontSize: '13px' }}><strong>Zoom:</strong> On request</p>
                <p style={{ fontSize: '13px' }}><strong>Skype:</strong> VoiceoverGuy</p>
                <p style={{ fontSize: '13px' }}><strong>Microsoft Teams:</strong> On request</p>
              </div>

              <div className="sidebar-box">
                <h3>Studio Location</h3>
                <p style={{ fontSize: '13px' }}>
                  Based in Yorkshire, UK. Close to the A1(M) and major Yorkshire motorway network.
                  Convenient for Leeds, Wakefield, Barnsley and Sheffield productions.
                </p>
              </div>

              <div className="sidebar-box">
                <h3>Related Links</h3>
                <ul>
                  <li><Link href="/voiceover-studio-finder">Voiceover Studio Finder</Link></li>
                  <li><Link href="/voiceoverguy">About Guy</Link></li>
                  <li><Link href="/contact-guy">Book the Studio</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
