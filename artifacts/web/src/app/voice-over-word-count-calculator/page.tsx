import type { Metadata } from 'next';
import Link from 'next/link';
import WordCountCalculator from './WordCountCalculator';
import CalcFaqAccordion from './CalcFaqAccordion';
import { SchemaScripts, faqPage, webPage, breadcrumb } from '@/lib/staticPageSchema';

export const metadata: Metadata = {
  title: 'Voiceover Word Count Calculator',
  description:
    'Calculate how long your script will take to read aloud. Enter your word count or paste your text to get instant voiceover timing at different speeds.',
  alternates: {
    canonical: 'https://www.voiceoverguy.co.uk/voice-over-word-count-calculator',
  },
};

const FAQ_DATA = [
  {
    q: 'How many words are in a 30-second voiceover?',
    a: 'A typical 30-second voiceover contains around 65 to 75 words when read at an average pace of about 150 words per minute. Scripts for commercials with a fast, energetic delivery may fit slightly more, while a warm, measured read will use fewer words.',
  },
  {
    q: 'How many words are in a 60-second voiceover?',
    a: 'A 60-second voiceover usually contains between 130 and 160 words. The exact count depends on the required pace and the amount of breathing room the script needs. TV and radio ads often sit around 140 to 150 words for a natural delivery.',
  },
  {
    q: 'What is a normal voiceover reading speed?',
    a: 'Most professional voiceover artists read at around 140 to 160 words per minute for commercial and narration work. The average is roughly 150 WPM. Fast-paced promo reads can reach 170 to 190 WPM, while slower, more measured reads sit around 110 to 130 WPM.',
  },
  {
    q: 'Why is silent reading faster than reading aloud?',
    a: 'When you read silently, your brain processes words without needing to physically form sounds. There are no pauses for breathing, no articulation delays, and no need to maintain a consistent speaking rhythm. The average silent reader processes around 238 words per minute, compared to roughly 150 words per minute when reading aloud.',
  },
  {
    q: 'Why does my finished recording run longer than the estimate?',
    a: 'Estimates are based on a constant pace, but real recordings include natural pauses, emphasis on key words, dramatic beats, breathing gaps, and retakes. Legal disclaimers and complex terminology also slow things down. Always allow a small buffer when planning your script length.',
  },
];

export default function VoiceOverWordCountCalculatorPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Voiceover Word Count Calculator</h1>
          <p>Work out exactly how long your script will take to read</p>
        </div>
      </div>

      <section className="calc-section">
        <div className="container">
          <div className="calc-intro">
            <p>
              Whether you are writing a script for a voiceover, preparing a speech, or
              just curious how long a piece of text takes to read, this calculator gives you
              an instant answer. Enter your word count or paste your full script below and
              choose a reading speed to see the estimated time.
            </p>
            <p>
              <strong>Voiceover and reading aloud</strong> is significantly slower than
              silent reading. A professional voiceover artist typically reads at around
              130 to 170 words per minute, depending on the style and brief. That is
              roughly half the speed most people read silently.
            </p>
          </div>

          <WordCountCalculator />

          <div className="calc-content-section">
            <h2>Understanding Voiceover vs Silent Reading Speed</h2>
            <p>
              When reading aloud, your mouth, tongue, and breath all have to keep up with
              your brain. You need pauses for breathing, time to articulate each word clearly,
              and space for natural phrasing. That is why voiceover reads average around
              150 words per minute, while silent reading typically sits closer to 238 WPM
              for most adults.
            </p>
            <p>
              For voiceover work, the pace also depends on the type of project. A warm,
              reassuring narration for a documentary might call for a slower 110 to 130 WPM
              delivery. A fast, punchy TV commercial might push up to 170 or even 190 WPM.
              Character voices, legal disclaimers, and dramatic reads each bring their own
              timing considerations.
            </p>
            <p>
              If you are writing a script for a voiceover project, this calculator helps you
              check whether your word count fits within your target duration before you book
              studio time. Need a professional British voiceover for your project?{' '}
              <Link href="/contact-guy">Get in touch</Link> for a fast quote.
            </p>
          </div>

          <div className="calc-faq-section">
            <h2>Frequently Asked Questions</h2>
            <CalcFaqAccordion faqs={FAQ_DATA} />
          </div>
        </div>
      </section>

      <SchemaScripts
        schemas={[
          webPage(
            'voice-over-word-count-calculator',
            'Voiceover Word Count Calculator',
            'Calculate how long your script will take to read aloud. Enter your word count or paste your text to get instant voiceover timing at different speeds.'
          ),
          breadcrumb('voice-over-word-count-calculator', 'Word Count Calculator'),
          faqPage('voice-over-word-count-calculator', FAQ_DATA),
        ]}
      />
    </>
  );
}
