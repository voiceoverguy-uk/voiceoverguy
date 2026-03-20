import type { Metadata } from 'next';
import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';
import { SchemaScripts, faqPage } from '@/lib/staticPageSchema';

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
        faqPage('FAQ', [
          { q: 'What is your turnaround time?', a: "Same day in most cases, with standard projects delivered within 24 hours. I\u2019m in the studio every day, so if you have an urgent job or last-minute change, I can usually accommodate it quickly." },
          { q: 'What audio formats do you deliver?', a: 'Most clients request WAV or MP3, but I can also provide AIFF or other formats on request. All audio is recorded in my broadcast-quality studio so it drops straight into your edit.' },
          { q: 'Can I direct a voiceover session live?', a: 'Yes. You can direct the session live via Cleanfeed, Source-Connect, Zoom, or a simple phone patch. This way you can give feedback in real time and sign off the read before we wrap.' },
          { q: 'What rights do I get with the voiceover?', a: "Usage and broadcast rights are agreed in advance so everything is clear. We\u2019ll confirm where and how long the audio will be used \u2013 for example, local radio, national TV, online, internal, or paid media \u2013 and licence it appropriately." },
          { q: 'Do you provide revisions?', a: 'Yes. If I make a mistake, or the read needs a small tweak, I\u2019m happy to fix it. Larger script changes or new scripts may incur an additional session fee, but I always keep things fair and transparent.' },
        ]),
      ]} />
    </>
  );
}
