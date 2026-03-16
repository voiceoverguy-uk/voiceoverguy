import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import PayPalButton from '@/components/PayPalButton';
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

          {/* ROW 1: Contact info + photo */}
          <div className="contact-top-grid">
            <div className="contact-info">
              <h2>Contact <span className="ident">Guy</span></h2>
              <p>
                Or you can connect for LIVE sessions.<br />
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
              <p>
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
              <p><strong>Skype:</strong> VoiceoverGuy</p>
              <p><strong>Studio Location:</strong> Yorkshire, UK</p>
              <p style={{ marginTop: '16px' }}>
                It&#39;s always great to hear from new clients.<br />
                Please do get in touch and lets make your project sound epic!
              </p>
            </div>

            <div className="contact-photo">
              <img
                src="/assets/images/voiceover-contact.jpg"
                alt="Guy Harris voiceover recording studio — Get in touch"
                style={{ width: '100%', borderRadius: '6px' }}
              />
            </div>
          </div>

          {/* ROW 2: Cost info + What you get */}
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

              <h2 style={{ marginTop: '28px' }}>You&#39;d like to Pay? We&#39;d love you to…</h2>
              <PayPalButton />
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
            </div>
          </div>

          {/* ROW 3: Contact form */}
          <div className="contact-form-row">
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
