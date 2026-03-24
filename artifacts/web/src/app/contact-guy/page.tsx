import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import PayPalButton from '@/components/PayPalButton';
import pages from '@/data/pages.json';

const data = (pages as Record<string, Record<string, string>>)['seo20'];

export const metadata: Metadata = {
  title: data.s1,
  description: data.s2,
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/contact-guy' },
  openGraph: {
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    url: 'https://www.voiceoverguy.co.uk/contact-guy',
    images: [{ url: 'https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Contact Guy Harris – British Voiceover Artist' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${data.s1} | VoiceoverGuy`,
    description: data.s2,
    images: ['https://www.voiceoverguy.co.uk/assets/images/og-image-guy-harris.webp'],
  },
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

          {/* ROW 1: Compact form left, photo right */}
          <div className="contact-top-grid">
            <div className="contact-form-col">
              <h2>Contact <span className="ident">Guy</span></h2>
              <p style={{ fontSize: '14px', marginBottom: '16px', lineHeight: '1.6' }}>
                It&#39;s always great to hear from new clients — please do get in touch
                and let&#39;s make your project sound epic!
              </p>
              <ContactForm compact />
            </div>

            <div className="contact-photo">
              <img
                src="/assets/images/voiceover-contact.webp"
                alt="Guy Harris voiceover recording studio — Get in touch"
              />
            </div>
          </div>

          {/* ROW 2: Cost left, What you get + connect links right */}
          <div className="contact-mid-grid">
            <div className="contact-cost">
              <h2>So, <span className="ident">whats it gonna </span>cost then?</h2>
              <ul className="contact-bullets">
                <li>Give as much detail as you can about the project</li>
                <li>Let us know the style or tone of voice you&#39;re after</li>
                <li>The estimated word count or running time of your script</li>
                <li>Indicate the intended usage. ie. web, radio, tv etc</li>
                <li>We will then send you an accurate quote for your project</li>
              </ul>

              <h2 style={{ marginTop: '28px' }}>Audio <span className="ident">File Formats</span></h2>
              <ul className="contact-bullets">
                <li><strong>MP3:</strong> Quick and easy</li>
                <li><strong>WAV:</strong> Broadcast quality.</li>
              </ul>
            </div>

            <div className="contact-get">
              <h2>What do <span className="ident">you</span> get?</h2>
              <ul className="contact-bullets">
                <li>An easy and professional service from start to finish.</li>
                <li>A bespoke sample if required to make sure I&#39;m the right voice.</li>
                <li>Directed or self recorded, studio quality audio the same day.</li>
                <li>We will work together until you get the desired outcome.</li>
                <li>All audio is broadcast quality from a professional recording studio.</li>
              </ul>

              <h2 style={{ marginTop: '28px' }}>Connect for <span className="ident">LIVE</span> sessions</h2>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                <strong>Source NEXUS:</strong>{' '}
                <a
                  href="https://nexus.source-elements.com/voiceoverguy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ident"
                >
                  VoiceoverGuy
                </a>
              </p>
              <p style={{ fontSize: '14px' }}>
                <strong>Cleanfeed:</strong>{' '}
                <a
                  href="https://cleanfeed.net/join?voiceoverguy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ident"
                >
                  VoiceoverGuy
                </a>
              </p>
            </div>
          </div>

          {/* PayPal payment card */}
          <div className="contact-paypal-card">
            <h3>Payment by Credit Card or Pay Pal?</h3>
            <p>Already received a quote? Pay securely via PayPal, Apple Pay or card.</p>
            <PayPalButton />
          </div>

        </div>
      </section>
    </>
  );
}
