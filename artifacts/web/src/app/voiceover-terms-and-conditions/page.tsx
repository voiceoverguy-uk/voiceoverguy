import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './terms.module.css';

const url = 'https://www.voiceoverguy.co.uk/voiceover-terms-and-conditions';
const description = "Read VoiceoverGuy Limited's voiceover booking terms, including agreed usage licences, revisions, payment and protections against AI training and voice cloning.";

export const metadata: Metadata = {
  title: 'Voiceover Terms & Conditions',
  description,
  alternates: { canonical: url },
  openGraph: {
    title: 'Voiceover Terms & Conditions | VoiceoverGuy',
    description,
    url,
    siteName: 'VoiceoverGuy',
    type: 'website',
    locale: 'en_GB',
    images: [{ url: '/assets/images/og-image-guy-harris.webp', width: 1200, height: 630, alt: 'Guy Harris – VoiceoverGuy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voiceover Terms & Conditions | VoiceoverGuy',
    description,
    images: ['/assets/images/og-image-guy-harris.webp'],
  },
};

const sections = [
  ['agreeing-the-job', '1. Agreeing the job'],
  ['fees-and-usage-licences', '2. Fees and usage licences'],
  ['recordings-delivery-and-changes', '3. Recordings, delivery and changes'],
  ['cancellations', '4. Cancellations'],
  ['payment', '5. Payment'],
  ['my-voice-and-ai', '6. My voice and AI'],
  ['agencies-and-producers', '7. Working through an agency or producer'],
  ['scripts-approvals-and-confidentiality', '8. Scripts, approvals and confidentiality'],
  ['arabella-harris-bookings', '9. Arabella Harris bookings'],
  ['problems-and-governing-law', '10. Problems and governing law'],
] as const;

export default function VoiceoverTermsPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Voiceover Terms &amp; Conditions</h1>
          <p>A clear brief, a great recording and fair terms for everyone.</p>
        </div>
      </div>
      <article className={styles.article}>
        <div className={styles.readingColumn}>
          <p className={styles.updated}>Last updated: <time dateTime="2026-09-25">25 September 2026</time></p>
          <div className={styles.intro}>
            <p>I’m Guy Harris, the voice behind VoiceoverGuy. I aim to make booking a voiceover simple: agree what you need, deliver excellent audio promptly and help with the little changes that inevitably crop up. These terms explain how bookings and usage work, and how my recordings and voice may be used.</p>
            <p>These terms apply to business bookings of Guy Harris’s voiceover services supplied by VoiceoverGuy Limited. The written quote or booking confirmation for your project sets out its particular scope and price. If we expressly agree a different project term in writing, that agreed term takes priority for that project, <strong>except that AI or synthetic voice rights require a separate, explicit written agreement signed by VoiceoverGuy Limited</strong>.</p>
          </div>

          <aside className={styles.summary} aria-label="Terms at a glance">
            <h2>At a glance</h2>
            <p>We agree your project scope, fee and usage in writing. Radio usage is normally licensed for 12 months; minor pickups reasonably within the original brief are generally included. Payment is normally due 30 calendar days from the invoice date. No AI training, voice cloning or synthetic voice rights are included. The full terms below govern your booking.</p>
          </aside>

          <nav className={styles.contents} aria-label="On this page">
            <h2>Contents</h2>
            <ol>
              {sections.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
            </ol>
          </nav>

          <section id="agreeing-the-job" className={styles.section}>
            <h2>1. Agreeing the job</h2>
            <p>Before quoting, I’ll normally need to know the script or approximate length, intended use, channels or media, territory, expected start date and how long the recording will be used. Please tell me if it is for paid advertising, broadcast, cinema, streaming, organic social content, a website, an app, a game, an event or another use. If an agency or production company is booking me, please identify the end client and campaign.</p>
            <p>A booking is agreed when we confirm its scope and fee in writing, including by email. The quote or booking confirmation and these terms form our agreement. If the intended use changes before or after recording, let me know so that we can agree any additional fee and licence in writing.</p>
          </section>

          <section id="fees-and-usage-licences" className={styles.section}>
            <h2>2. Fees and usage licences</h2>
            <p>My fee covers the recording services and the usage specifically agreed in the quote or booking confirmation. Usage depends on the agreed project, media or channels, territory and licence period. It does not automatically include worldwide use, all media, paid advertising, sublicensing or perpetual use.</p>
            <p>Radio usage is <strong>normally licensed for 12 months</strong>, unless our written quote or booking confirmation says otherwise. Other licence periods are agreed for the particular project. Perpetual usage is available only where we expressly agree it in writing and the fee reflects it.</p>
            <p>Please contact me before using a recording beyond the agreed period, territory, media, campaign or end client. We can usually arrange an extension. An edit, cut-down or new version does not extend the original licence or create rights for a different campaign unless we agree that in writing. Existing published material may need a practical takedown timetable; please discuss that with me before a licence expires.</p>
            <p>Your licence to use the recording for the agreed project and agreed usage begins on delivery. You must pay the applicable invoice by the agreed due date. If payment becomes overdue, VoiceoverGuy Limited may give written notice suspending further licensed use until the overdue amount has been paid in full. Delivery of an audio file, participation in a directed session or payment for recording time does not transfer ownership of my voice or grant rights beyond the agreed usage.</p>
          </section>

          <section id="recordings-delivery-and-changes" className={styles.section}>
            <h2>3. Recordings, delivery and changes</h2>
            <p>I’ll record to the agreed brief and deliver in the agreed format. Please provide the final approved script, pronunciation guidance and any required technical specifications before recording.</p>
            <p>I’m happy to help with minor pickups, pronunciation fixes and small adjustments, and I will generally do those without an extra fee where they are reasonably part of the original brief. I try to turn them around quickly. If the script, direction or scope changes substantially, we’ll discuss a fair additional charge before I do the extra work. I may waive that charge, particularly for established clients; doing so on one project does not change the agreed scope of another.</p>
            <p>If I make a recording error against the approved script or agreed brief, I’ll correct it without charge. Please tell me promptly if something needs attention.</p>
          </section>

          <section id="cancellations" className={styles.section}>
            <h2>4. Cancellations</h2>
            <p>If you cancel before I have recorded the work, I do not normally charge a cancellation fee. If I have already recorded, edited or delivered some or all of the agreed work, I may invoice a fair amount for the work completed, up to the agreed project fee, whether or not the finished recording is ultimately used. Any separately agreed, unavoidable expenses may also be charged.</p>
          </section>

          <section id="payment" className={styles.section}>
            <h2>5. Payment</h2>
            <p>Unless the written quote or booking confirmation agreed before the job is accepted states otherwise, payment is due <strong>30 calendar days from the invoice date</strong>. For some new or particular bookings I may agree payment on delivery, within 7 days or within 14 days; any shorter payment period must be agreed in the written quote or booking confirmation before the booking is accepted, not introduced later on the invoice.</p>
            <p>If a business invoice becomes overdue, VoiceoverGuy Limited reserves its rights under the applicable late commercial payment rules. Please raise any genuine invoice query promptly so that we can sort it out sensibly.</p>
          </section>

          <section id="my-voice-and-ai" className={styles.section}>
            <h2>6. My voice and AI</h2>
            <p><strong>No AI training. No voice cloning. No synthetic Guy Harris performances.</strong></p>
            <p>Your licence is for the agreed use of the real recording I supply. Without a separate, explicit written agreement signed by VoiceoverGuy Limited, you must not use my voice, performances, demos, auditions, live-session recordings, outtakes or delivered files to train, fine-tune, test or improve an AI or machine-learning system; create or enable a voice clone, synthetic voice, text-to-speech voice, voice conversion model or digital double; or generate a new performance that imitates me.</p>
            <p>You must not upload or supply those materials to a third-party service for any of those purposes, or authorise an agency, end client, editor, platform or other person to do so. Ordinary editing and mixing of the licensed recording for the agreed project is permitted, provided it does not create a synthetic performance or exceed the agreed usage.</p>
            <p>Please take reasonable care when storing and sharing the files, limit access to people working on the agreed project, and tell me promptly if you become aware of an unauthorised AI or synthetic voice use. A general reference to “all rights”, “new technologies” or “all media” in another document does <strong>not</strong> grant AI or synthetic voice rights under these terms.</p>
          </section>

          <section id="agencies-and-producers" className={styles.section}>
            <h2>7. Working through an agency or producer</h2>
            <p>If you book on behalf of someone else, you remain responsible for the booking and payment unless we agree otherwise in writing. Please make sure the end client and anyone receiving the files understands the agreed usage limits and the AI restrictions. You may share the recording with people who need it to produce and distribute the agreed project, but that does not grant them independent rights to reuse or license my voice.</p>
          </section>

          <section id="scripts-approvals-and-confidentiality" className={styles.section}>
            <h2>8. Scripts, approvals and confidentiality</h2>
            <p>You are responsible for supplying a script and materials you are entitled to use, for checking factual or regulated claims, and for obtaining any approvals needed to publish the finished project. I will treat confidential scripts and unreleased campaign information with reasonable care. If you need a specific embargo, non-disclosure agreement or security process, please raise it before booking.</p>
            <p>I may ask permission to share finished work as a portfolio example once it is public. I will respect any agreed embargo or confidentiality restriction.</p>
          </section>

          <section id="arabella-harris-bookings" className={styles.section}>
            <h2>9. Arabella Harris bookings</h2>
            <p>Arabella’s voice may be booked through me, but her projects, permissions and usage must be agreed separately in writing. These Guy Harris terms do not, by themselves, grant any rights in Arabella’s voice or recordings. <strong>No AI training, cloning or synthetic use of Arabella’s voice is permitted.</strong></p>
          </section>

          <section id="problems-and-governing-law" className={styles.section}>
            <h2>10. Problems and governing law</h2>
            <p>If something is wrong, please contact me first. I want the chance to put it right promptly and fairly. Nothing in these terms removes rights or responsibilities that cannot lawfully be excluded. Our agreement is governed by the laws of England and Wales, and disputes are subject to the courts of England and Wales.</p>
          </section>

          <p className={styles.company}><strong>VoiceoverGuy Limited</strong> · Company number <strong>07297733</strong> · Registered office: <strong>Suite 2 Rosehill, 165 Lutterworth Road, Blaby, Leicestershire, LE8 4DY</strong>.</p>
          <p className={styles.contact}><Link href="/contact-guy">Questions about a booking? Contact Guy</Link></p>
        </div>
      </article>
    </>
  );
}