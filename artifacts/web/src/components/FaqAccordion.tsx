'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'How much does a voiceover cost?',
    a: 'Voiceover fees depend on the word count, usage, and medium. For a short 100-word web video you might be looking at around £49–£99. For broadcast TV or radio, fees are higher and typically calculated per usage or as a buyout. Use the pricing calculator on my Contact page for an instant estimate, or just get in touch and I\'ll quote you properly.',
  },
  {
    q: 'How quickly can you turnaround a voiceover?',
    a: 'Most voiceovers are delivered within 4–8 hours if received before 4pm. For urgent projects I offer a 2-hour turnaround (a small priority fee may apply). I have a professional studio at home so I can record any time, day or evening, seven days a week.',
  },
  {
    q: 'What file format will I receive?',
    a: 'I deliver in broadcast quality WAV (24-bit, 44.1kHz or 48kHz) as standard. I can also provide MP3, AIFF, or any other format you require. If you need editing, mixing or music added I can handle that too.',
  },
  {
    q: 'Can I direct the session remotely?',
    a: 'Absolutely. I\'m set up for directed remote sessions via Source Connect NEXUS, Cleanfeed, Zoom, Microsoft Teams, Skype, or any platform you prefer. I can also record a selection of reads for you to choose from without a live session.',
  },
  {
    q: 'Do you offer a free demo or audition?',
    a: 'Yes. I\'m happy to record a short sample section of your script (up to around 100 words) so you can hear exactly how it sounds before committing. Just send me your script and a brief description of the tone you\'re looking for.',
  },
  {
    q: 'Do you record in your own studio?',
    a: 'Yes. I have a professional, acoustically treated home recording studio in Yorkshire. It\'s kitted out with high-end microphones, preamps, and monitoring equipment. The studio is also available to hire for other voice artists or actors looking for a professional recording space in Yorkshire.',
  },
  {
    q: 'What is Source Connect?',
    a: 'Source Connect is a professional studio-quality real-time audio link used by broadcast studios worldwide. It allows you to direct my session from anywhere in the world, just as if I were in the room with you. My Source Connect NEXUS address is VoiceoverGuy.',
  },
  {
    q: 'Can you voice in accents other than Standard British?',
    a: 'Yes. As well as standard Received Pronunciation (RP) / neutral British, I can perform Yorkshire, Northern, Scots, Welsh, Irish, and a range of international accents including American, Australian, and others. I\'m also experienced in character voices and impressions.',
  },
  {
    q: 'Do you do TV voiceovers?',
    a: 'Yes, I\'ve voiced campaigns for major brands on ITV, Channel 4, Channel 5, Sky, and online platforms. TV voiceovers are quoted based on territory, duration of licence, and airtime. Get in touch for a quote.',
  },
  {
    q: 'What is a Voice of God (VOG)?',
    a: 'Voice of God refers to the powerful announcing voice heard at live events — awards ceremonies, corporate conferences, sports events, concerts, and TV show recordings. It\'s the voice that says "Ladies and gentlemen, please welcome..." and builds anticipation. I\'ve been the VOG for numerous high-profile events.',
  },
  {
    q: 'Are you on Voices.com or Voice123?',
    a: 'I prefer to work directly with clients to keep costs lower for you and so I can give you the best personal service. You won\'t find me on pay-to-play casting sites — I\'d rather you just drop me an email or give me a call.',
  },
  {
    q: 'Do you work with advertising agencies?',
    a: 'Yes, I work with agencies of all sizes — from independent creative shops to large network agencies. I\'m comfortable with agency briefing processes, Copilot sessions, and working to strict deadlines.',
  },
  {
    q: 'Can you voice e-learning / training content?',
    a: 'Yes — e-learning is one of my most requested styles. Clear, warm, authoritative and accessible. I can match your platform\'s existing voice, or create a fresh one to suit your learner demographic. Long-form content is no problem.',
  },
  {
    q: 'Do you do video game voiceovers?',
    a: 'Yes. I have extensive game voice experience from casual mobile games to AAA titles. I\'ve voiced the Army Sergeant in WORMS WMD (Team17), various characters in Thomas & Friends, and many indie and mobile games. I\'m comfortable with directed character work and interpreting a character brief.',
  },
];

interface FaqItem {
  q: string;
  a: string;
}

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
              <p>{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
