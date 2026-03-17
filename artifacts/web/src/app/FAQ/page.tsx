import type { Metadata } from 'next';
import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';
import { SchemaScripts, webPage, breadcrumb, faqPage } from '@/lib/staticPageSchema';

export const metadata: Metadata = {
  title: "FAQ – Voiceover Questions Answered",
  description: "Everything you need to know about booking Guy Harris for a voiceover — pricing, turnaround, formats, remote direction, studio, and more.",
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/FAQ' },
};

export default function FAQ() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Voiceover FAQ&apos;s</h1>
          <p>Everything you need to know about working with Guy Harris</p>
        </div>
      </div>

      <section className="faq-section">
        <div className="container">
          <div className="two-col">
            <div>
              <h2 style={{ marginTop: 0, marginBottom: '24px' }}>Frequently Asked Questions</h2>
              <FaqAccordion />

              <div style={{ marginTop: '32px', padding: '20px', background: '#f9f9f9', borderLeft: '4px solid #9C060B' }}>
                <h3 style={{ color: '#9C060B', marginBottom: '12px' }}>Got a question not answered here?</h3>
                <p style={{ fontSize: '14px' }}>
                  Just ask. Guy responds to all enquiries personally and quickly.
                </p>
                <Link href="/contact-guy" className="cta-btn" style={{ display: 'inline-block', marginTop: '12px' }}>
                  Contact Guy
                </Link>
              </div>
            </div>

            <div>
              <div className="sidebar-box">
                <h3>Quick Contact</h3>
                <p style={{ fontSize: '13px' }}><strong>Email:</strong> <a href="mailto:guy@voiceoverguy.co.uk">guy@voiceoverguy.co.uk</a></p>
                <p style={{ fontSize: '13px' }}><strong>Source Connect:</strong> VoiceoverGuy</p>
                <p style={{ fontSize: '13px' }}><strong>Cleanfeed:</strong> VoiceoverGuy</p>
                <Link href="/contact-guy" className="cta-btn" style={{ display: 'block', textAlign: 'center', marginTop: '12px' }}>
                  Get a Quote
                </Link>
              </div>

              <div className="sidebar-box">
                <h3>Pricing Guide</h3>
                <p style={{ fontSize: '13px' }}>Web use pricing:</p>
                <ul style={{ fontSize: '13px' }}>
                  <li>Up to 100 words — <strong>£49.99</strong></li>
                  <li>101–200 words — <strong>£74.99</strong></li>
                  <li>201–400 words — <strong>£99.99</strong></li>
                  <li>401–700 words — <strong>£139.99</strong></li>
                  <li>700+ words / TV / Radio / Events — <strong>Quote</strong></li>
                </ul>
                <p style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
                  Use the pricing calculator on the Contact page for an instant estimate.
                </p>
                <Link href="/contact-guy" className="cta-btn" style={{ display: 'block', textAlign: 'center', marginTop: '12px' }}>
                  Open Calculator
                </Link>
              </div>

              <div className="sidebar-box">
                <h3>Popular Pages</h3>
                <ul>
                  <li><Link href="/commercial-voiceover">Commercial Voiceover</Link></li>
                  <li><Link href="/voice-of-god">Voice of God</Link></li>
                  <li><Link href="/santa-voice">Voice of Santa</Link></li>
                  <li><Link href="/david-attenborough-voice">David Attenborough Style</Link></li>
                  <li><Link href="/voiceover-studio">The Studio</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SchemaScripts schemas={[
        webPage('FAQ', 'Voiceover FAQ', 'Everything you need to know about booking Guy Harris for a voiceover \u2014 pricing, turnaround, formats, remote direction, studio, and more.'),
        breadcrumb('FAQ', 'FAQ'),
        faqPage('FAQ', [
          { q: 'How much does a voiceover cost?', a: "Voiceover fees depend on the word count, usage, and medium. For a short 100-word web video you might be looking at around \u00A349\u2013\u00A399. For broadcast TV or radio, fees are higher and typically calculated per usage or as a buyout." },
          { q: 'How quickly can you turnaround a voiceover?', a: 'Most voiceovers are delivered within 4\u20138 hours if received before 4pm. For urgent projects I offer a 2-hour turnaround. I have a professional studio at home so I can record any time, day or evening, seven days a week.' },
          { q: 'What file format will I receive?', a: 'I deliver in broadcast quality WAV (24-bit, 44.1kHz or 48kHz) as standard. I can also provide MP3, AIFF, or any other format you require.' },
          { q: 'Can I direct the session remotely?', a: "Absolutely. I'm set up for directed remote sessions via Source Connect NEXUS, Cleanfeed, Zoom, Microsoft Teams, Skype, or any platform you prefer." },
          { q: "Where is Guy Harris's voiceover studio?", a: 'My broadcast-quality studio is based in Wakefield, West Yorkshire. I work with clients across the UK and internationally, with same-day delivery as standard.' },
          { q: 'What voiceover styles does Guy Harris offer?', a: 'I cover everything from warm commercial reads to dramatic character voices, David Attenborough impressions, Santa voiceover, movie trailer voice, football commentator, and more.' },
        ]),
      ]} />
    </>
  );
}
