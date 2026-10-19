import Link from 'next/link';
import CurrentExperienceYears from '@/components/CurrentExperienceYears';

interface AICloningNoticeProps {
  yearsExperience: number;
}

export default function AICloningNotice({ yearsExperience }: AICloningNoticeProps) {
  return (
    <section
      id="ai-cloning-notice"
      className="ai-cloning-notice-section"
      aria-label="AI voice cloning permission notice"
    >
      <details className="ai-cloning-notice">
        <summary>AI voice cloning: a note on permission</summary>

        <div className="ai-cloning-notice__body">
          <p>
            Your brand deserves a voice with personality, authenticity and a real person behind it. When you book me, you get over <CurrentExperienceYears initialYears={yearsExperience} /> years of experience, a performance shaped around your message, and someone you can direct, not simply a generated reading.
          </p>

          <p><strong>My voice is NOT available for unauthorised AI cloning.</strong></p>

          <p>
            Permission to use a recording for an agreed project does not include permission to upload it to an AI service, train a voice model or generate new performances. Any such use requires my explicit written agreement.
          </p>

          <p><strong>AI generation can leave a trail.</strong></p>

          <p>
            Providers may retain scripts, uploaded audio, voice models and account records that help establish how a recording was made and which account created it. Please don’t assume a generated voice is anonymous or untraceable.
          </p>

          <p>
            ElevenLabs prohibits cloning or impersonating someone’s voice without their explicit, informed consent or other valid authorisation. Unauthorised use of recordings may also infringe copyright or performers’ rights, depending on the circumstances. Suspected misuse of my voice will be investigated and reported.
          </p>

          <p><strong>Transparency matters, too.</strong></p>

          <p>
            Platforms including YouTube, Facebook and Instagram have disclosure rules for certain realistic AI-generated or altered content. An AI label is not a substitute for permission to use someone’s voice.
          </p>

          <p><strong>A genuine business deserves a genuine connection with its audience.</strong></p>

          <p>
            If you like the sound of my voice,{' '}
            <a href="#contact">let’s create something together</a>, with the right performance and clear permission from the start.
          </p>

          <p className="ai-cloning-notice__terms">
            <Link href="/voiceover-terms-and-conditions">Read my Terms and Conditions</Link>
          </p>

          <p className="ai-cloning-notice__resources">
            <strong>Further information:</strong>{' '}
            <a href="https://elevenlabs.io/use-policy" target="_blank" rel="noopener noreferrer">ElevenLabs policy</a>
            {' · '}
            <a href="https://www.gov.uk/government/publications/performers-rights/performers-rights" target="_blank" rel="noopener noreferrer">UK performers’ rights</a>
            {' · '}
            <a href="https://support.google.com/youtube/answer/14328491?hl=en" target="_blank" rel="noopener noreferrer">YouTube AI disclosure</a>
            {' · '}
            <a href="https://about.fb.com/news/2024/02/labeling-ai-generated-images-on-facebook-instagram-and-threads/" target="_blank" rel="noopener noreferrer">Meta AI disclosure</a>
          </p>
        </div>
      </details>
    </section>
  );
}
