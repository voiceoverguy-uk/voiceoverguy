'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const WORD_LIMIT = 25;

const bannedWords = ['damn', 'cunt', 'fucker', 'fucking', 'cocksucker', 'crap', 'shit', 'fuck', 'bastard', 'bugger', 'bollocks', 'wanker', 'twat'];

const profanityWarnings = [
  'Attenborough: "Profanity? Really? Even the chimpanzees show more restraint."',
  'Attenborough: "An unrefined utterance from an otherwise sentient being. Do better."',
  'Attenborough: "Nature is brutal... but not *that* crude. Reconsider your vocabulary."',
  'Attenborough: "Even the walrus, wallowing in its own filth, wouldn\'t say that."',
  'Attenborough: "A display of linguistic laziness. Use words your nan would approve of!"',
  'Attenborough: "The wildebeest may grunt in confusion... but it doesn\'t swear like *that*."',
  'Attenborough: "If we were in the jungle, you\'d be eaten for talking like that."',
  'Attenborough: "Ah yes, the lesser-spotted potty mouth. Rarely admired. Kindly revise."',
  'Attenborough: "This is not the savannah, and you\'re not marking territory. Language!"',
  'Attenborough: "Language like that? No wonder the other creatures keep their distance."',
  'Attenborough: "Mind your language, young hatchling. Even the dodo had more decorum."',
  'Attenborough: "The wild baboon does not resort to such language! Rephrase your scenario!"',
  'Attenborough: "This isn\'t the savannah, dear. Let\'s try that again without the expletives."',
  'Attenborough: "Such language may scare the meerkats. Edit and approach once more."',
  'Attenborough: "Even the hyenas cackle at such uncouth expressions. Do better!"',
  'Attenborough: "The mating call of the modern human... often regrettable. Try again."',
  'Attenborough: "We must tread carefully - this is a place of wonder, not wounding words."',
  'Attenborough: "Remarkable. A string of words so foul, even the dung beetle looks away."',
  'Attenborough: "Not even the chimpanzee flings such vulgarities. Let\'s keep it civilised."',
  'Attenborough: "A magnificent outburst... for the wrong occasion. Rephrase, if you will."',
  'Attenborough: "We observe a human, frustrated... and wildly inappropriate. Clean that up!"',
  'Attenborough: "Ah, the foul-mouthed urban dweller in its natural habitat. Try again."',
  'Attenborough: "That kind of language might offend even the most hardened warthog."',
  'Attenborough: "Careful now. Your words have startled the flamingos."',
  'Attenborough: "Language like that could upset a nesting puffin. Let\'s try again."',
  'Attenborough: "We are all witnesses... to an unfiltered outburst. The forest recoils."',
  'Attenborough: "One must wonder - did the duck-billed platypus ever swear? Likely not."',
  'Attenborough: "Nature is majestic. Your vocabulary? Less so. Shall we retry?"',
  'Attenborough: "A curious combination of syllables. Regrettably, entirely inappropriate."',
  'Attenborough: "Alas, such phrases belong in the undergrowth, not this sacred space."',
  'Attenborough: "A slip of the tongue... though one that echoes across the savannah."',
  'Attenborough: "Even the sloth raised an eyebrow. Let\'s tone it down, shall we?"',
  'Attenborough: "We now witness a moment of linguistic chaos. The herd is not impressed."',
  'Attenborough: "Profanity, while expressive, has no place in this digital habitat."',
  'Attenborough: "Truly, this is the call of the adolescent badger. Time to rewrite."',
  'Attenborough: "Such exclamations would cause a penguin to blush. Let\'s try again politely."',
  'Attenborough: "Even the dung beetle maintains more dignity in its expressions."',
  'Attenborough: "Fascinating. A vocalisation so coarse, the coral reef went silent."',
  'Attenborough: "While expressive, your phrase lacks the elegance of the natural world!"',
];

export default function AttenboroughGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [isError, setIsError] = useState(false);
  const [copyText, setCopyText] = useState('📋 Copy Script');
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
    setCopyText('📋 Copy Script');
  };

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyText('✅ Copied!');
      setTimeout(() => setCopyText('📋 Copy Script'), 2000);
    } catch {
      setCopyText('❌ Copy Failed');
    }
  };

  const generate = async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setOutput('Please describe a scenario first!');
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
    setOutput('Generating script... Please wait');
    setIsError(false);
    setHasResult(false);

    try {
      const response = await fetch('/api/generate', {
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setOutput(`An error occurred: ${message}. Please try again.`);
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
          <h1>David Attenborough Script Generator</h1>
          <h2 style={{ marginTop: '10px', fontSize: '1.2rem', fontWeight: 300 }}>
            Free Attenborough-Style Script Generator
          </h2>
          <p className="generator-subtitle">
            Type a short scenario. Watch it transform into an Attenborough-style script.<br />
            <Link href="/david-attenborough-voice" className="red-link">Get the real VoiceoverGuy</Link> to voice it and make it sound awesome.
          </p>

          <div className="generator-textarea-wrapper">
            <textarea
              value={input}
              onChange={e => handleInput(e.target.value)}
              placeholder="Describe a natural moment or quirky wildlife scene... eg. Two penguins arguing on an iceberg"
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
              {output || 'Your story will appear here...'}
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
            <p>🎬 The UK&apos;s Leading David Attenborough Voiceover Artist</p>
            <p>Guy Harris - Renowned for his distinctive narration style as <strong>Attenborough</strong></p>
            <ul>
              <li><span className="generator-star">⭐</span> Direct the session and get your script read right 1st time!</li>
              <li><span className="generator-star">⭐</span> Receive a broadcast quality Wav file polished and ready to work with!</li>
              <li><span className="generator-star">⭐</span> Listen to Guy&apos;s David Attenborough demo:</li>
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
                <source src="/assets/audio/david-attenborough-demo-25-guy-harris.mp3" type="audio/mpeg" />
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
            name: 'David Attenborough Script Generator',
            url: 'https://www.voiceoverguy.co.uk/attenborough-script-generator',
            description: "Use the David Attenborough Script Generator to transform any scene into a nature-style voiceover script. Then book Guy Harris - the UK's trusted Attenborough voice.",
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
            name: 'David Attenborough Demo - Guy Harris',
            description: 'A short David Attenborough-style demo voiced by Guy Harris.',
            author: { '@type': 'Person', name: 'Guy Harris', url: 'https://www.voiceoverguy.co.uk' },
            thumbnailUrl: 'https://www.voiceoverguy.co.uk/assets/images/attenborough-script-generator.webp',
            contentUrl: 'https://www.voiceoverguy.co.uk/assets/audio/david-attenborough-demo-25-guy-harris.mp3',
            encodingFormat: 'audio/mpeg',
            duration: 'PT1M26S',
            uploadDate: '2025-10-04',
            inLanguage: 'en-GB',
            isAccessibleForFree: true,
            keywords: 'Attenborough, voiceover, demo, Guy Harris',
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
                name: 'What is the David Attenborough Script Generator?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "It's a fun tool that turns your scene into a nature-style voiceover script using AI. You can then get professional voice actor Guy Harris to voice it like Attenborough.",
                },
              },
              {
                '@type': 'Question',
                name: 'Can I get the script voiced by a real person?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Yes! Once your script is generated, you can book Guy Harris - the UK's leading Attenborough-style voiceover artist - to narrate it for you.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'David Attenborough Script Generator',
            applicationCategory: 'Creative Tool',
            operatingSystem: 'Web',
            creator: { '@type': 'Person', name: 'Guy Harris' },
            description: 'A free online script generator that creates David Attenborough-style narration text from user prompts, by UK voiceover artist Guy Harris.',
            url: 'https://www.voiceoverguy.co.uk/attenborough-script-generator',
          }),
        }}
      />
    </>
  );
}
