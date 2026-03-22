'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';

interface FaqItem {
  q: string;
  a: string | ReactNode;
}

const faqs: FaqItem[] = [
  {
    q: 'How much does a voiceover cost?',
    a: (<>Voiceover fees depend on the word count, usage, and medium. For a short 100-word web video you might be looking at around £49-£99. For broadcast TV or radio, fees are higher and typically calculated per usage or as a buyout. Use the <Link href="/voice-over-word-count-calculator">pricing calculator</Link> for an instant estimate, or just <Link href="/contact-guy">get in touch</Link> and I'll quote you properly.</>),
  },
  {
    q: 'What is a voiceover artist?',
    a: 'A voiceover artist is a professional performer who records spoken audio for adverts, TV promos, radio, explainers, e-learning, video games, documentaries and more. A good voiceover artist does more than just read a script - they bring it to life with the right tone, pacing and personality.',
  },
  {
    q: 'How many words are in a 30 second voiceover?',
    a: (<>A 30 second voiceover is usually around 65 to 75 words at a natural pace. That can vary depending on the style. A calm, premium read may need fewer words, while a faster retail or promo read can often fit in a little more. Try the <Link href="/voice-over-word-count-calculator">word count calculator</Link> to check your script length.</>),
  },
  {
    q: 'How many words are in a 60 second voiceover?',
    a: (<>A 60 second voiceover is usually around 130 to 150 words. The exact number depends on how fast the script needs to move, how many pauses are required, and whether the read is conversational, dramatic or packed with legal copy. Use the <Link href="/voice-over-word-count-calculator">voiceover calculator</Link> to get an estimate for your script.</>),
  },
  {
    q: 'How quickly can you turnaround a voiceover?',
    a: 'Most voiceovers are delivered within 4-8 hours if received before 4pm. For urgent projects I offer a 2-hour turnaround (a small priority fee may apply). I have a professional studio at home so I can record any time, day or evening, seven days a week.',
  },
  {
    q: 'What file format will I receive?',
    a: 'I deliver in broadcast quality WAV (24-bit, 44.1kHz or 48kHz) as standard. I can also provide MP3, AIFF, or any other format you require. If you need editing, mixing or music added I can handle that too.',
  },
  {
    q: 'What is the difference between narration and voiceover?',
    a: (<>Narration is one type of voiceover. It usually helps tell a story or explain what is happening on screen, often in documentaries, brand films or factual content. Voiceover is the wider term, covering everything from adverts and radio imaging to e-learning, character work and TV promos. You can hear examples on my <Link href="/narration-voice">narration voice</Link> page.</>),
  },
  {
    q: 'Can I direct the session remotely?',
    a: 'Absolutely. I\'m set up for directed remote sessions via Source Connect NEXUS, Cleanfeed, Zoom, Microsoft Teams, Skype, or any platform you prefer. I can also record a selection of reads for you to choose from without a live session.',
  },
  {
    q: 'Why hire a human voiceover instead of AI?',
    a: (<>A human voiceover artist can properly interpret a script, respond to direction, understand humour and deliver genuine personality. AI can be useful for some basic jobs, but it still lacks the instinct, nuance and natural performance that real commercial voice work needs. Read more on my <Link href="/human-voice-over-vs-ai">human voice vs AI</Link> page.</>),
  },
  {
    q: 'Do you offer a free demo or audition?',
    a: (<>Yes. I'm happy to record a short sample section of your script (up to around 100 words) so you can hear exactly how it sounds before committing. Just <Link href="/contact-guy">send me your script</Link> and a brief description of the tone you're looking for.</>),
  },
  {
    q: 'Is that you on GB News competition promos?',
    a: (<>It very well might be. I voice a wide range of TV and radio promos, commercial campaigns and continuity-style work, so there is a fair chance you may have heard me somewhere without knowing it. That tends to be how voiceover works - heard often, seen rarely. Find out more on my <Link href="/gb-news-competition-voice">GB News competition voice</Link> page.</>),
  },
  {
    q: 'Why does your voice sound familiar?',
    a: (<>Probably because you have heard me on major TV and radio campaigns, national commercials, station imaging, character work and promo voiceovers over many years. Voiceover artists often become familiar long before people know their name. You may have heard me on <Link href="/britains-got-talent-competition-voice">Britain&#39;s Got Talent</Link>, ITV promos or national radio.</>),
  },
  {
    q: 'Can you sound like the polished Apple-style voice?',
    a: (<>Yes - that calm, clean, premium British delivery is one of the styles I am known for. It works particularly well for technology brands, high-end explainers, product films and modern commercial campaigns that need clarity without sounding stiff. Hear examples on my <Link href="/apple-voice-style">Apple voice style</Link> page.</>),
  },
  {
    q: 'Do you record in your own studio?',
    a: (<>Yes. I have a professional, acoustically treated <Link href="/voiceover-studio">home recording studio</Link> in Yorkshire. It's kitted out with high-end microphones, preamps, and monitoring equipment. The studio is also available to hire for other voice artists or actors looking for a professional recording space in Yorkshire.</>),
  },
  {
    q: 'What is Source Connect?',
    a: 'Source Connect is a professional studio-quality real-time audio link used by broadcast studios worldwide. It allows you to direct my session from anywhere in the world, just as if I were in the room with you. My Source Connect NEXUS address is VoiceoverGuy.',
  },
  {
    q: 'Can you voice in accents other than Standard British?',
    a: (<>Yes. As well as standard Received Pronunciation (RP) / neutral British, I can perform Yorkshire, Northern, Scots, Welsh, Irish, and a range of international accents including American, Australian, and others. I'm also experienced in <Link href="/character-voiceover">character voices</Link> and impressions.</>),
  },
  {
    q: 'Do you do TV voiceovers?',
    a: (<>Yes, I've voiced campaigns for major brands on ITV, Channel 4, Channel 5, Sky, and online platforms. TV voiceovers are quoted based on territory, duration of licence, and airtime. <Link href="/contact-guy">Get in touch</Link> for a quote.</>),
  },
  {
    q: 'Do you only do straight reads, or can you do character voices too?',
    a: (<>I do both. Alongside natural British <Link href="/commercial-voiceover">commercial</Link> and narration reads, I am also known for <Link href="/character-voiceover">character voice work</Link> including Santa, pirate, gameshow host, spooky voices, comedy reads and impressions. So whether you need polished and trusted or bold and full of personality, I can usually cover it.</>),
  },
  {
    q: 'What is a Voice of God (VOG)?',
    a: (<><Link href="/voice-of-god">Voice of God</Link> refers to the powerful announcing voice heard at live events - awards ceremonies, corporate conferences, sports events, concerts, and TV show recordings. It's the voice that says "Ladies and gentlemen, please welcome..." and builds anticipation. I've been the VOG for numerous high-profile events.</>),
  },
  {
    q: 'Can you make a script sound less boring?',
    a: 'Yes - and sometimes that is half the job. A good voiceover can lift a flat script with better pacing, emphasis, intention and energy. I can also often spot where a script is too wordy, clunky or trying too hard, which is more common than it should be.',
  },
  {
    q: 'Are you on Voices.com or Voice123?',
    a: (<>I prefer to work directly with clients to keep costs lower for you and so I can give you the best personal service. You won't find me on pay-to-play casting sites - I'd rather you just <Link href="/contact-guy">drop me an email</Link> or give me a call.</>),
  },
  {
    q: 'Do you work with advertising agencies?',
    a: 'Yes, I work with agencies of all sizes - from independent creative shops to large network agencies. I\'m comfortable with agency briefing processes, Copilot sessions, and working to strict deadlines.',
  },
  {
    q: 'Can you voice e-learning / training content?',
    a: 'Yes - e-learning is one of my most requested styles. Clear, warm, authoritative and accessible. I can match your platform\'s existing voice, or create a fresh one to suit your learner demographic. Long-form content is no problem.',
  },
  {
    q: 'Do you do video game voiceovers?',
    a: 'Yes. I have extensive game voice experience from casual mobile games to AAA titles. I\'ve voiced the Army Sergeant in WORMS WMD (Team17), various characters in Thomas & Friends, and many indie and mobile games. I\'m comfortable with directed character work and interpreting a character brief.',
  },
];

export default function FaqAccordion({ faqs: customFaqs }: { faqs?: FaqItem[] } = {}) {
  const items = customFaqs || faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(prev => prev === i ? null : i);
  };

  return (
    <div className="faq-list">
      {items.map((faq, i) => (
        <div className="faq-item" key={i}>
          <button
            className="faq-question-btn"
            aria-expanded={openIndex === i}
            onClick={() => toggle(i)}
          >
            {faq.q}
          </button>
          {openIndex === i && (
            <div className="faq-answer">
              {typeof faq.a === 'string' ? <p>{faq.a}</p> : <p>{faq.a}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
