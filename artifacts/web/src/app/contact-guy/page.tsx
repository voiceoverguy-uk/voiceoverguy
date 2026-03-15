import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import pages from '@/data/pages.json';

const data = (pages as Record<string, Record<string, string>>)['seo20'];

export const metadata: Metadata = {
  title: data.s1,
  description: data.s2,
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/contact-guy' },
};

export default function ContactGuy() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Contact Guy</h1>
          <p>Book a voiceover, get a quote, or just say hello — Guy responds to all enquiries personally</p>
        </div>
      </div>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* LEFT: Contact info */}
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                The quickest way to get a voiceover is to paste your script into the form on the right
                and hit send. Guy will come back with a confirmed price and delivery time — usually
                within a couple of hours.
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:guy@voiceoverguy.co.uk">guy@voiceoverguy.co.uk</a>
              </p>
              <p>
                <strong>Tel:</strong>{' '}
                <a href="tel:+447973350178">+44 (0)7973 350 178</a>
              </p>
              <p>
                <strong>Source Connect NEXUS:</strong> VoiceoverGuy
              </p>
              <p>
                <strong>Cleanfeed:</strong> VoiceoverGuy
              </p>
              <p>
                <strong>Skype:</strong> VoiceoverGuy
              </p>
              <p>
                <strong>Studio Location:</strong> Yorkshire, UK
              </p>

              <h2>Pricing Guide</h2>
              <p>
                Paste your script into the message box on the right for an instant price estimate based
                on word count. All prices are for web use. TV, radio and events are quoted on request.
              </p>
              <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #9C060B' }}>
                    <th style={{ textAlign: 'left', padding: '8px 0' }}>Word Count</th>
                    <th style={{ textAlign: 'right', padding: '8px 0' }}>Price (Web Use)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { range: 'Up to 100 words', price: '£49.99' },
                    { range: '101–200 words', price: '£74.99' },
                    { range: '201–400 words', price: '£99.99' },
                    { range: '401–700 words', price: '£139.99' },
                    { range: '700+ words / TV / Radio / Events', price: 'Quote' },
                  ].map(row => (
                    <tr key={row.range} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '8px 0', fontSize: '13px' }}>{row.range}</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 700, color: '#9C060B' }}>
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="what-you-get">
                <h2>What You Get</h2>
                <ul>
                  <li>Broadcast quality WAV file (24-bit, 44.1kHz or 48kHz)</li>
                  <li>MP3 version included on request</li>
                  <li>Delivered to your inbox — fast</li>
                  <li>Unlimited minor revisions within 24 hours</li>
                  <li>Personal service — you deal with Guy directly</li>
                  <li>Remote direction via Source Connect, Cleanfeed or Zoom</li>
                </ul>
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="contact-form-wrap">
              <h2>Send Guy a Message</h2>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                Paste your script for an instant price estimate. Or just describe what you need
                and Guy will quote you promptly.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
