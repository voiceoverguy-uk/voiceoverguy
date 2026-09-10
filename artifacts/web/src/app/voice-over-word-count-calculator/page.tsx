import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorPage from './CalculatorPage';
import FaqAccordion from '@/components/FaqAccordion';
import { SchemaScripts, faqPage, webPage, breadcrumb } from '@/lib/staticPageSchema';

export const metadata: Metadata = {
  title: 'Voiceover Script Timer & Checker',
  description:
    'Calculate voiceover script duration, check word counts for 15, 30, 60, and 90-second targets, and estimate timing with our free script timer.',
  alternates: {
    canonical: 'https://www.voiceoverguy.co.uk/voice-over-word-count-calculator',
  },
  openGraph: {
    title: 'Voiceover Script Timer & Checker | VoiceoverGuy',
    description:
      'Calculate voiceover script duration, check word counts for 15, 30, 60, and 90-second targets, and estimate timing with our free script timer.',
    url: 'https://www.voiceoverguy.co.uk/voice-over-word-count-calculator',
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

const FAQ_DATA = [
  {
    q: 'How many words fit in a 15-second voiceover?',
    a: 'At a natural conversational pace, a 15-second voiceover is about 38 words. A measured read is closer to 30 words, while a fast energetic commercial may reach about 44 words. Leave room for a clear call to action, prices, web addresses or required pauses.',
  },
  {
    q: 'How many words fit in a 30-second voiceover script?',
    a: 'A typical 30-second voiceover contains around 75 words at a natural pace of 150 words per minute. A measured delivery is closer to 60 words, while a fast commercial can reach about 87 words if the wording is straightforward.',
  },
  {
    q: 'How many words are in a 60-second voiceover?',
    a: 'A 60-second script usually sits right around 150 words. The exact count depends on the required pace and the amount of breathing room the script needs. TV and radio ads often target 140 to 150 words for a natural delivery.',
  },
  {
    q: 'How many words fit in a 90-second voiceover?',
    a: 'A 90-second voiceover is about 225 words at a natural 150 WPM pace. A measured delivery may need around 180 words, while a fast energetic read can approach 260 words. Names, figures, technical terms and dramatic pauses may reduce that budget.',
  },
  {
    q: 'What is a normal voiceover reading speed (WPM)?',
    a: 'Most professional voiceover artists read at around 150 words per minute for commercial and narration work. Fast-paced promo reads reach 175 WPM, while slower, more measured reads drop to around 120 WPM.',
  },
  {
    q: 'How do you calculate how long a script takes to read?',
    a: 'Divide your total word count by your target words per minute (WPM), then multiply by 60 to get the duration in seconds. Or simply paste your text into the Voiceover Script Timer above for an instant calculation.',
  },
  {
    q: 'Why does my finished recording run longer than the estimate?',
    a: 'Script timers assume a constant pace, but real recordings include natural pauses, emphasis on key words, dramatic beats, and breathing gaps. Complex technical wording, numbers, and long names also require more articulation time. Always allow a small buffer when planning your script length.',
  },
];

export default function VoiceOverWordCountCalculatorPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Voiceover Script Timer & Checker</h1>
          <p>Instantly check your script length and hit your target duration</p>
        </div>
      </div>

      <section className="calc-section">
        <div className="container">
          <div className="calc-intro">
            <p>
              If you are writing a script for a voiceover project, this tool helps you check
              whether your word count fits your time limit before recording.
            </p>
            <p>
              Paste your full script or enter a word count below. Choose a reading speed, and
              set a target duration like 15, 30, or 60 seconds to see if you need to trim or add words.
            </p>
          </div>

          <CalculatorPage />

          <div className="calc-content-section">
            <h2>Understanding Script Timing and Voiceover Pacing</h2>
            <p>
              When reading aloud, a professional voiceover artist must leave room for natural phrasing,
              breathing, and articulation. That is why voiceover reads average around 150 words per minute,
              which is significantly slower than the speed most people read silently in their heads.
            </p>
            <p>
              The right pace also depends heavily on the project style. A warm, reassuring narration
              for a documentary might call for a measured 120 WPM delivery. A fast, punchy radio or
              TV commercial might push up to 175 WPM to pack in excitement and details. Character voices,
              complex terminology, and dramatic reads each bring their own timing considerations.
            </p>
            <h2>Voiceover Word Counts by Duration</h2>
            <div className="calc-duration-table-wrap">
              <table className="calc-duration-table">
                <thead>
                  <tr>
                    <th scope="col">Target duration</th>
                    <th scope="col">Measured, 120 WPM</th>
                    <th scope="col">Natural, 150 WPM</th>
                    <th scope="col">Fast commercial, 175 WPM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><th scope="row">15 seconds</th><td>30 words</td><td>38 words</td><td>44 words</td></tr>
                  <tr><th scope="row">30 seconds</th><td>60 words</td><td>75 words</td><td>87 words</td></tr>
                  <tr><th scope="row">60 seconds</th><td>120 words</td><td>150 words</td><td>175 words</td></tr>
                  <tr><th scope="row">90 seconds</th><td>180 words</td><td>225 words</td><td>262 words</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              When you are ready, listen to Guy&apos;s <Link href="/commercial-voiceover">commercial voiceover demo</Link>{' '}
              or <Link href="/narration-voice">narration demo</Link>. If you already have a brief, you can{' '}
              <Link href="/contact-guy">send the script and requirements</Link> for an accurate response.
            </p>
          </div>

          <div className="calc-faq-section">
            <h2>Frequently Asked Questions</h2>
            <FaqAccordion faqs={FAQ_DATA} />
          </div>
        </div>
      </section>

      <SchemaScripts
        schemas={[
          webPage(
            'voice-over-word-count-calculator',
            'Voiceover Script Timer & Checker',
            'Calculate voiceover script duration, check word counts for 15, 30, 60, and 90-second targets, and estimate timing with our free script timer.'
          ),
          breadcrumb('voice-over-word-count-calculator', 'Script Timer'),
          faqPage('voice-over-word-count-calculator', FAQ_DATA),
        ]}
      />
    </>
  );
}
