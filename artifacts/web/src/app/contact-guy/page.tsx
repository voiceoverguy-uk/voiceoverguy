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
                The quickest way to get a voiceover is to send Guy a message using the form.
                Guy responds to all enquiries personally — usually within a couple of hours.
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:guy@voiceoverguy.co.uk">guy@voiceoverguy.co.uk</a>
              </p>
              <p>
                <strong>Source NEXUS:</strong> VoiceoverGuy
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
            </div>

            {/* RIGHT: Contact Form */}
            <div className="contact-form-wrap">
              <h2>Send Guy a Message</h2>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                Describe what you need and Guy will come back with a quote promptly.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
