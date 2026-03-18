'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const WORD_LIMIT = 75;

const bannedWords = ['damn', 'cunt', 'fucker', 'fucking', 'cocksucker', 'crap', 'shit', 'fuck', 'bastard', 'bugger', 'bollocks', 'wanker', 'twat'];

const profanityWarnings = [
  'Santa: "Oh dear oh dear... you may be moved to the naughty list with words like that."',
  'Santa: "Language like that? Not even the elves mutter such nonsense in the toy workshop."',
  'Santa: "Tsk tsk! I hope that wasn\'t meant for my nice list ears."',
  'Santa: "Such words could melt the North Pole! Mind your mouth, young one."',
  'Santa: "Even the reindeer are blushing. That\'s quite an achievement."',
  'Santa: "You kiss your stocking with that mouth? Naughty list updated."',
  'Santa: "Watch your language or you\'ll be gifted a lump of coal and a thesaurus."',
  'Santa: "Mrs Claus just fainted. She\'s not used to such spicy vocabulary."',
  'Santa: "Elves have been sent to sensitivity training for less."',
  'Santa: "Even the gingerbread men have crumbled at that outburst."',
  'Santa: "Rudolph turned off his nose - he doesn\'t want to hear this."',
  'Santa: "Ho-ho-HOLD IT RIGHT THERE! Naughty words are not in my sleigh route."',
  'Santa: "Careful now, that sort of language echoes in the snow for *days*."',
  'Santa: "You\'ll scare the carollers with that tone, my friend."',
  'Santa: "I check the list twice... and that word just flagged you *twice*."',
  'Santa: "The polar bears are writing a strongly worded letter to HR."',
  'Santa: "Coal production has just been increased - care to guess why?"',
  'Santa: "Let\'s try that again, this time without upsetting the candy canes."',
  'Santa: "Oh my stars - even the snowmen are melting from embarrassment."',
  'Santa: "That kind of language will get you a one-way ticket to Grinchville."',
  'Santa: "Ho-ho-oh no! That\'s not how we speak in Santa\'s Grotto."',
  'Santa: "You wouldn\'t say that in front of the reindeer... or would you? Naughty!"',
  'Santa: "This isn\'t the chimney to vent your naughty words down, thank you very much."',
  'Santa: "You just got bumped from presents to pine needles. Watch it!"',
  'Santa: "If the elves heard that, they\'d drop their tiny hammers in shock."',
  'Santa: "Language like that makes even Krampus look tame."',
  'Santa: "You\'re about two syllables away from getting a stern letter from the North Pole."',
  'Santa: "The workshop has rules - and Rule One is: no flipping the festive script."',
  'Santa: "Your tongue\'s more twisted than a candy cane. Let\'s try again - nicely."',
  'Santa: "That\'s not festive spirit - that\'s festive spit! Clean it up."',
  'Santa: "I\'d ask if your parents know you speak like that... but I already do. Naughty list!"',
  'Santa: "The sleigh just veered off course in shock. Let\'s try again with cheer."',
  'Santa: "Heavens! You\'ve made a snow angel cry."',
  'Santa: "Use that mouth for singing carols, not conjuring curses."',
  'Santa: "Honestly, the elves are considering industrial action after hearing that."',
  'Santa: "You\'ve triggered the emergency jingle bell protocol - mind your language."',
  'Santa: "It\'s a holly jolly Christmas - not a sweary scary one."',
  'Santa: "Even Jack Frost got cold feet after hearing that one."',
  'Santa: "Let\'s turn that naughty utterance into a nice sentence, shall we?"',
];

export default function SantaGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [isError, setIsError] = useState(false);
  const [copyText, setCopyText] = useState('📋 Copy Text');
  const [showPopup, setShowPopup] = useState(false);
  const [demoGlow, setDemoGlow] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const wordCount = input.trim() ? input.trim().split(/\s+/).filter(w => w.length > 0).length : 0;

  const handleInput = (val: string) => {
    const words = val.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length > WORD_LIMIT) {
      const trimmed = words.slice(0, WORD_LIMIT).join(' ') + ' ';
      setInput(trimmed);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
    } else {
      setInput(val);
    }
  };

  const resetForm = () => {
    setInput('');
    setOutput('');
    setHasResult(false);
    setIsError(false);
    setCopyText('📋 Copy Text');
  };

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyText('✅ Copied!');
      setTimeout(() => setCopyText('📋 Copy Text'), 2000);
    } catch {
      setCopyText('❌ Failed');
    }
  };

  const generate = async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setOutput('Please give some details of who the message is for.');
      setIsError(true);
      return;
    }

    const lower = trimmed.toLowerCase();
    if (bannedWords.some(w => lower.includes(w))) {
      const warning = profanityWarnings[Math.floor(Math.random() * profanityWarnings.length)];
      setOutput(warning);
      setIsError(true);
      return;
    }

    setIsGenerating(true);
    setOutput('Generating Santa message... Please Ho Ho Hold!');
    setIsError(false);
    setHasResult(false);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${apiBase}/api/generate1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmed }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      if (!data.script) throw new Error('Invalid response format: missing script');

      setOutput(data.script);
      setIsError(false);
      setHasResult(true);
    } catch (err: any) {
      setOutput(`An error occurred: ${err.message}. Please try again.`);
      setIsError(true);
      setHasResult(true);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <section className="generator-page">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1>Santa Script Generator</h1>
          <h2 style={{ marginTop: '10px', fontSize: '1.2rem', fontWeight: 300 }}>
            A Free Santa message generator by The UK&apos;s Voice of Santa, Guy Harris
          </h2>
          <p className="generator-subtitle">
            Type some info about who the message is for and receive a message back from Santa.<br />
            Get the <Link href="/santa-voice" className="red-link">Real Santa by VoiceoverGuy</Link> to voice it and make it sound festive!
          </p>

          <div className="generator-textarea-wrapper">
            <textarea
              value={input}
              onChange={e => handleInput(e.target.value)}
              placeholder="Please give details of who the message is for..."
            />
            <span
              className={`generator-word-count${wordCount >= WORD_LIMIT ? ' generator-word-limit' : ''}`}
            >
              {wordCount}/{WORD_LIMIT} words
            </span>
            {showPopup && <div className="generator-popup generator-popup--show">{WORD_LIMIT} words max! 🛑</div>}
          </div>

          <button
            className="generator-btn"
            onClick={generate}
            disabled={isGenerating}
          >
            🎙️ Generate
          </button>

          <div className="generator-output">
            <div className={`generator-output-content${isError ? ' generator-text-error' : ''}${!hasResult && !isError ? ' generator-text-muted' : ''}`}>
              {output || 'Your Santa message will arrive here...'}
            </div>
          </div>

          {hasResult && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '5px' }}>
              <button className="generator-btn generator-btn--secondary" onClick={copyScript}>
                {copyText}
              </button>
              <button className="generator-btn generator-btn--secondary" onClick={resetForm}>
                🔄 New Scenario
              </button>
            </div>
          )}

          <div className="generator-info-box">
            <p>🎬 The UK&apos;s Leading Santa Voiceover Artist</p>
            <p>
              If you&apos;d like it reading, copy the text and drop Santa a line on the{' '}
              <Link href="/contact-guy" className="generator-info-link"><strong>contact page</strong></Link>.
            </p>
            <ul>
              <li><span className="generator-star">⭐</span> Book the UK&apos;s voice of Santa for your script!</li>
              <li><span className="generator-star">⭐</span> Broadcast quality audio files from the North Pole</li>
              <li><span className="generator-star">⭐</span> Listen to Father Christmas in action. Santa demo:</li>
            </ul>
            <div className={`generator-demo-wrapper${demoGlow ? ' generator-demo-glow' : ''}`}>
              <audio
                ref={audioRef}
                controls
                className="generator-audio-player"
                onPlay={() => setDemoGlow(true)}
                onPause={() => setDemoGlow(false)}
                onEnded={() => setDemoGlow(false)}
              >
                <source src="/assets/audio/voice-demo-guy-harris-santa.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <br />
              <Link href="/contact-guy" className="generator-book-link">
                Book <span style={{ color: '#d42027' }}>Guy</span> Now!
              </Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Santa Script Generator',
            url: 'https://www.voiceoverguy.co.uk/santa-script-generator',
            description: "Use the Santa Script Generator to create a personalised message from Santa. Then book Guy Harris - the UK's trusted Santa voice.",
            inLanguage: 'en-GB',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AudioObject',
            name: 'Santa Demo - Guy Harris',
            description: 'A short Santa-style demo voiced by Guy Harris.',
            author: { '@type': 'Person', name: 'Guy Harris', url: 'https://www.voiceoverguy.co.uk' },
            thumbnailUrl: 'https://www.voiceoverguy.co.uk/assets/images/santa-script-generator.jpg',
            contentUrl: 'https://www.voiceoverguy.co.uk/attenborough-voice/assets/audio/voice-demo-guy-harris-santa.mp3',
            encodingFormat: 'audio/mpeg',
            duration: 'PT1M26S',
            uploadDate: '2025-10-04',
            inLanguage: 'en-GB',
            isAccessibleForFree: true,
            keywords: 'father-christmas, free santa messages, father christmas messages',
            publisher: { '@type': 'Organization', name: 'VoiceoverGuy', url: 'https://www.voiceoverguy.co.uk' },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the Santa Script Generator?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "It's a fun tool that turns your text and input into a fantastic message from Santa. Then, why not copy it and have Santa voice it for you?",
                },
              },
              {
                '@type': 'Question',
                name: 'Can I get the script voiced by Santa?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Yes! Once your script is generated, you can book Guy Harris - the UK's Voice of Santa to read it for you.",
                },
              },
              {
                '@type': 'Question',
                name: 'Is this just for fun or for commercial use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The generator is free to play with, but you can commission a polished, studio-quality recording for professional projects.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
