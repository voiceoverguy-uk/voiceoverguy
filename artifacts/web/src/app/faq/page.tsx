import type { Metadata } from 'next';
import FaqAccordion from '@/components/FaqAccordion';
import Link from 'next/link';
import { SchemaScripts, faqPage } from '@/lib/staticPageSchema';

export const metadata: Metadata = {
  title: "FAQ – Voiceover Questions Answered",
  description: "Everything you need to know about booking Guy Harris for a voiceover — pricing, turnaround, formats, remote direction, studio, and more.",
  alternates: { canonical: 'https://www.voiceoverguy.co.uk/faq' },
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
              <div style={{ marginBottom: '24px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/busker-guy-faq-1.webp"
                  alt="Guy Harris, British male voiceover artist"
                  width={1000}
                  height={1250}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
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
        faqPage('FAQ', [
          { q: 'How much does a voiceover cost?', a: 'Voiceover fees depend on the word count, usage, and medium. For a short 100-word web video you might be looking at around £49-£99. For broadcast TV or radio, fees are higher and typically calculated per usage or as a buyout.' },
          { q: 'What is a voiceover artist?', a: 'A voiceover artist is a professional performer who records spoken audio for adverts, TV promos, radio, explainers, e-learning, video games, documentaries and more. A good voiceover artist does more than just read a script - they bring it to life with the right tone, pacing and personality.' },
          { q: 'How many words are in a 30 second voiceover?', a: 'A 30 second voiceover is usually around 65 to 75 words at a natural pace. That can vary depending on the style.' },
          { q: 'How many words are in a 60 second voiceover?', a: 'A 60 second voiceover is usually around 130 to 150 words. The exact number depends on how fast the script needs to move, how many pauses are required, and whether the read is conversational, dramatic or packed with legal copy.' },
          { q: 'How quickly can you turnaround a voiceover?', a: 'Most voiceovers are delivered within 4-8 hours if received before 4pm. For urgent projects I offer a 2-hour turnaround.' },
          { q: 'What is the difference between narration and voiceover?', a: 'Narration is one type of voiceover. It usually helps tell a story or explain what is happening on screen, often in documentaries, brand films or factual content. Voiceover is the wider term, covering everything from adverts and radio imaging to e-learning, character work and TV promos.' },
          { q: 'Why hire a human voiceover instead of AI?', a: 'A human voiceover artist can properly interpret a script, respond to direction, understand humour and deliver genuine personality. AI can be useful for some basic jobs, but it still lacks the instinct, nuance and natural performance that real commercial voice work needs.' },
          { q: 'Is that you on GB News competition promos?', a: 'It very well might be. I voice a wide range of TV and radio promos, commercial campaigns and continuity-style work, so there is a fair chance you may have heard me somewhere without knowing it.' },
          { q: 'Why does your voice sound familiar?', a: 'Probably because you have heard me on major TV and radio campaigns, national commercials, station imaging, character work and promo voiceovers over many years.' },
          { q: 'Can you sound like the polished Apple-style voice?', a: 'Yes - that calm, clean, premium British delivery is one of the styles I am known for. It works particularly well for technology brands, high-end explainers, product films and modern commercial campaigns that need clarity without sounding stiff.' },
          { q: 'Do you only do straight reads, or can you do character voices too?', a: 'I do both. Alongside natural British commercial and narration reads, I am also known for character voice work including Santa, pirate, gameshow host, spooky voices, comedy reads and impressions.' },
          { q: 'Can you make a script sound less boring?', a: 'Yes - and sometimes that is half the job. A good voiceover can lift a flat script with better pacing, emphasis, intention and energy.' },
        ]),
      ]} />
    </>
  );
}
