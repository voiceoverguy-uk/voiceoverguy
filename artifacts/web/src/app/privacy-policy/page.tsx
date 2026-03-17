import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/privacy-policy`,
  },
  title: 'Privacy Policy',
  description: 'Privacy policy for VoiceoverGuy.co.uk – how we handle your data when you use this website or contact Guy Harris for voiceover services.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>How we handle your information</p>
        </div>
      </div>

      <section className="page-content">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ lineHeight: '1.8', fontSize: '15px' }}>
            <h2>Who we are</h2>
            <p>
              This website is operated by Guy Harris, a professional British voiceover artist trading as VoiceoverGuy. The website address is https://www.voiceoverguy.co.uk.
            </p>

            <h2>What personal data we collect and why</h2>
            <h3>Contact forms</h3>
            <p>
              When you use the contact form on this site, we collect your name, email address, and any message you include. This information is used solely to respond to your enquiry about voiceover services. We do not share this data with third parties.
            </p>

            <h3>Embedded content from other websites</h3>
            <p>
              Pages on this site may include embedded content such as YouTube videos and SoundCloud audio players. Embedded content from other websites behaves in the exact same way as if you had visited those websites directly. These services may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content.
            </p>

            <h3>Analytics</h3>
            <p>
              We may use website analytics services to understand how visitors use this site. This data is anonymised and used to improve the website experience.
            </p>

            <h2>How long we retain your data</h2>
            <p>
              If you submit a contact form enquiry, we retain that information for as long as needed to respond to and follow up on your enquiry. Contact form submissions are not used for marketing purposes.
            </p>

            <h2>Your rights over your data</h2>
            <p>
              If you have submitted a contact form on this site, you can request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
            </p>

            <h2>Where we send your data</h2>
            <p>
              Contact form submissions may be checked through an automated spam detection service. Your data is not sold to or shared with any third party for marketing purposes.
            </p>

            <h2>Contact information</h2>
            <p>
              If you have any questions about this privacy policy or your personal data, please contact Guy Harris via the <a href="/contact-guy">contact page</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
