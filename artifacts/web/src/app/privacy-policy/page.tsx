import type { Metadata } from 'next';
import styles from '../voiceover-terms-and-conditions/terms.module.css';

export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.voiceoverguy.co.uk/privacy-policy`,
  },
  title: 'Privacy Policy',
  description: 'Privacy policy for VoiceoverGuy.co.uk – how we handle your data when you use this website or contact Guy Harris for voiceover services.',
  openGraph: {
    title: 'Privacy Policy | VoiceoverGuy',
    description: 'Privacy policy for VoiceoverGuy.co.uk – how we handle your data when you use this website or contact Guy Harris for voiceover services.',
    url: 'https://www.voiceoverguy.co.uk/privacy-policy',
    siteName: 'VoiceoverGuy',
    images: [
      {
        url: '/assets/images/og-image-guy-harris.webp',
        width: 1200,
        height: 630,
        alt: 'Guy Harris – British Male Voiceover Artist – VoiceoverGuy',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>How I look after your information</p>
        </div>
      </div>
      <article className={styles.article}>
        <div className={styles.readingColumn}>
          <p className={styles.updated}>Last updated: <time dateTime="2026-09-25">25 September 2026</time></p>
          <div className={styles.intro}>
            <p>When you get in touch about a voiceover, I use your details to reply, prepare a quote and manage your booking if we work together. Here is how your information is handled.</p>
          </div>
          <nav className={styles.contents} aria-label="Policy contents">
            <h2>On this page</h2>
            <ol>
              <li><a href="#responsibility">Who looks after your information?</a></li>
              <li><a href="#enquiries">Enquiries and bookings</a></li>
              <li><a href="#lawful-bases">Why I use your information</a></li>
              <li><a href="#providers">Who helps process it?</a></li>
              <li><a href="#script-tools">Script tools</a></li>
              <li><a href="#media">Videos, audio and cookies</a></li>
              <li><a href="#marketing">Keeping in touch</a></li>
              <li><a href="#retention">How long information is kept</a></li>
              <li><a href="#overseas">Processing outside the UK</a></li>
              <li><a href="#rights">Your rights</a></li>
              <li><a href="#complaints">Questions or complaints</a></li>
            </ol>
          </nav>

          <section id="responsibility" className={styles.section}>
            <h2>Who looks after your information?</h2>
            <p>VoiceoverGuy Limited operates this website and is responsible for the personal information collected through it. I’m Guy Harris, and I handle privacy enquiries.</p>
            <p>For privacy enquiries, please use the <a href="/contact-guy">contact page</a>.</p>
            <p><strong>Company number:</strong> 07297733.<br /><strong>Registered office:</strong> Suite 2 Rosehill, Blaby, LE8 4DY.</p>
          </section>

          <section id="enquiries" className={styles.section}>
            <h2>Enquiries and bookings</h2>
            <p>When you use a form, I receive your name, email address and message, including any script or project details you provide. The submission also includes its website page, time and IP address.</p>
            <p>I use this information to answer your enquiry, prepare a quote and arrange and deliver any agreed work. Technical information helps protect the website and investigate problems. Please include only the personal information needed for your request.</p>
          </section>

          <section id="lawful-bases" className={styles.section}>
            <h2>Why I use your information</h2>
            <p>For enquiries and bookings with you personally, I use information to take steps you request before a contract and to carry out that contract.</p>
            <p>When you represent a business, I rely on legitimate interests in responding to enquiries and managing voiceover work. Legitimate interests also support proportionate website security, troubleshooting and keeping relevant records to resolve queries or disputes.</p>
            <p>Accounting and other records required by law are kept to meet those legal obligations.</p>
          </section>

          <section id="providers" className={styles.section}>
            <h2>Who helps process it?</h2>
            <p>The website uses <strong>Vercel</strong> for hosting and <strong>Resend</strong> to deliver form enquiries to the business inbox. My mailbox is hosted by <strong>Heart Internet</strong>, and I read and manage email in Apple Mail. I use <strong>Dropbox</strong> to store audio files and <strong>QuickBooks</strong> for invoicing and accounting.</p>
            <p>The contact page offers <strong>PayPal</strong> for payments. I keep its payment software switched off until you choose to allow PayPal. Once loaded, PayPal receives technical information about your visit and handles payment information under its own privacy information.</p>
            <p>These services process information as part of providing their hosting, delivery, storage, accounting or payment services.</p>
          </section>

          <section id="script-tools" className={styles.section}>
            <h2>Script tools</h2>
            <p>The script-length calculator processes your text in your browser without uploading or saving it. If you use its separate quote form, the information entered in that form is sent when you submit it.</p>
            <p>The Santa and Attenborough generators are different: your prompt is sent through server services using an OpenAI API integration to generate a response. Please do not include confidential material or unnecessary personal details, particularly information about children.</p>
            <p>For this optional generation service, I rely on legitimate interests in responding to your request for a generated script.</p>
          </section>

          <section id="media" className={styles.section}>
            <h2>Videos, audio and cookies</h2>
            <p>I keep external media from YouTube, Vimeo and SoundCloud, including externally hosted previews, switched off until you allow external media. Once you allow it, those providers can receive your IP address and browser information and may use cookies or similar technologies. You can leave it switched off and still browse the website or contact me.</p>
            <p>The speaking-pace recordings are hosted with this website. Playing them sends a normal file request to the website host.</p>
            <p>You can choose external media and PayPal separately, reject both, or change your mind using the privacy choices control on the website. I store your choice in your browser so you do not have to make it on every page. Withdrawing permission stops further loading through this website; it cannot undo information already sent or remove cookies held by another provider. You can clear those through your browser settings.</p>
            <p>The website application does not include a standalone visitor-analytics tracker. The website host still receives technical information needed to serve and protect the site. Following a link to Google reviews or another external website takes you to a service with its own privacy information.</p>
          </section>

          <section id="marketing" className={styles.section}>
            <h2>Keeping in touch</h2>
            <p>I do not use enquiry or booking details for newsletters or advertising audiences. Replies about an enquiry, quote or current booking are part of dealing with your request.</p>
            <p>I do not run promotional email campaigns to former clients. I may occasionally send an individual email to check in and let an old client know I’m still voicing. Where that message promotes my services, it counts as marketing, even though it is personal. To opt out of these messages, reply to the email or use my <a href="/contact-guy">contact page</a> and ask me not to send them. You do not need to give a reason.</p>
            <p>For relevant contacts at limited companies and other corporate subscribers, legitimate interests may be appropriate, subject to their privacy rights and right to object. Marketing emails to individuals, sole traders and some partnerships require consent unless an applicable legal exception is available. A previous booking alone does not establish permission.</p>
          </section>

          <section id="retention" className={styles.section}>
            <h2>How long information is kept</h2>
            <p>I do not currently follow a fixed deletion or regular review schedule for old emails, scripts or recordings. In practice, running short of storage has prompted reviews or clear-outs. That describes when clear-outs have happened, not a reason for keeping personal information. I cannot promise deletion after a particular number of months.</p>
            <p>Personal information should only be kept for as long as it is needed for a specific purpose, such as dealing with an active enquiry, delivering agreed work or revisions, documenting usage rights, meeting a legal obligation or resolving a query or dispute. These are the criteria for deciding what needs to be kept, not a claim that I already carry out scheduled reviews.</p>
            <p>I retain <strong>past recordings</strong> so that a client returning years later can request another copy without paying for a re-record. Recordings are licensed for the agreed project and usage under the booking terms; payment does not itself transfer ownership. Retaining a recording does not extend the client’s agreed licence.</p>
            <p>Where enquiries, scripts or recordings contain personal information, ownership and licensing do not remove data-protection obligations. Personal information should not be kept longer than necessary for its purpose. You can contact me to ask about information held in connection with your project or to request its deletion; the rights below apply.</p>
            <p><strong>Invoices and accounting records</strong> are kept for the applicable legal period: generally six years from the end of the last company financial year they relate to, and longer where required. That does not automatically apply to every script, recording or enquiry.</p>
            <p>Copies in archives, backups and providers’ systems need to be considered separately; deleting an inbox message does not necessarily remove every copy. I have not confirmed when all backup copies expire.</p>
          </section>

          <section id="overseas" className={styles.section}>
            <h2>Processing outside the UK</h2>
            <p>Some service providers process information outside the UK. <a href="https://resend.com/security/gdpr">Resend states</a> that its customer data, including message content and delivery logs, is stored in the United States. A European email-sending region does not mean that all of this data stays in Europe. Other providers also describe international processing.</p>
            <p>Contact me if you would like information about the providers handling your information and the applicable overseas-transfer arrangements.</p>
          </section>

          <section id="rights" className={styles.section}>
            <h2>Your rights</h2>
            <p>Depending on the circumstances, you can ask to access or correct your personal information, have it deleted, restrict its use or receive certain information in a portable form. Some information may still need to be kept where the law requires it.</p>
            <p><strong>You can object to processing based on legitimate interests. You can object to direct marketing at any time.</strong></p>
            <p>Where I rely on consent, you can withdraw it without affecting the lawfulness of earlier processing.</p>
            <p>To make a request, please use the <a href="/contact-guy">contact page</a>. I may need enough information to confirm your identity and understand your request.</p>
          </section>

          <section id="complaints" className={styles.section}>
            <h2>Questions or complaints</h2>
            <p>Please get in touch if anything is unclear or you are concerned about how your information has been handled.</p>
            <p>You can also complain to the <a href="https://ico.org.uk/make-a-complaint/">Information Commissioner’s Office</a>, the UK’s data protection regulator. You do not have to contact me first.</p>
          </section>
        </div>
      </article>
    </>
  );
}
