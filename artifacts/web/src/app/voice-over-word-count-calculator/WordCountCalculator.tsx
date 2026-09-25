'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';

interface Preset {
  label: string;
  wpm: number;
}

interface Props {
  onWordCountChange?: (count: number) => void;
}

const VOICEOVER_PRESETS: Preset[] = [
  { label: 'Measured / Slow', wpm: 120 },
  { label: 'Natural / Conversational', wpm: 150 },
  { label: 'Fast / Energetic Commercial', wpm: 175 },
];

const TARGETS = [
  { label: '15s', seconds: 15 },
  { label: '30s', seconds: 30 },
  { label: '60s', seconds: 60 },
  { label: '90s', seconds: 90 },
];

const DEMO_SCRIPTS = [
  {
    pace: 'Measured / Slow',
    wpm: 120,
    words: 60,
    duration: 'approx. 30 seconds',
    text: "When you need to deliver a message with real impact, taking your time is the most powerful tool you have. A slower pace allows every single word to breathe. It gives your audience the space they need to absorb the information, building a sense of trust and authority. This measured approach ensures your voiceover feels confident, reassuring, and undeniably professional.",
    audio: "/assets/audio/voiceover-pace-measured-120wpm.mp3"
  },
  {
    pace: 'Natural / Conversational',
    wpm: 150,
    words: 75,
    duration: 'approx. 30 seconds',
    text: "If you are looking for a voiceover that just sounds like a genuine conversation, this natural pacing hits the sweet spot every time. It is exactly the right speed for explainer videos, corporate presentations, and engaging brand stories. You want your listeners to feel like they are being spoken to by a friend, rather than being lectured at. This conversational rhythm keeps things moving forward nicely while remaining completely clear, approachable, and easy to understand.",
    audio: "/assets/audio/voiceover-pace-natural-150wpm.mp3"
  },
  {
    pace: 'Fast / Energetic Commercial',
    wpm: 175,
    words: 87,
    duration: 'approx. 30 seconds',
    text: "When you need to grab attention instantly, a fast and energetic commercial read is exactly what you are looking for! This high impact pacing is perfect for retail promotions, radio adverts, and hard hitting social media campaigns where every second counts. You have a massive amount of information to squeeze into a tiny window, and you need it delivered with absolute confidence, clarity, and enthusiasm. Do not let your audience look away for a moment. Keep the energy soaring right through to the final call to action!",
    audio: "/assets/audio/voiceover-pace-fast-175wpm.mp3"
  }
];

function formatTime(totalSeconds: number): string {
  if (totalSeconds === 0) return '0 sec';
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.round(totalSeconds % 60);
  if (secs === 60) return `${mins + 1} min 0 sec`;
  if (mins === 0) return `${secs} sec`;
  return `${mins} min ${secs} sec`;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(w => w.length > 0).length;
}

function calcSeconds(words: number, wpm: number): number {
  if (wpm <= 0 || words <= 0) return 0;
  return (words / wpm) * 60;
}

export default function WordCountCalculator({ onWordCountChange }: Props) {
  const [wordCountInput, setWordCountInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [selectedWpm, setSelectedWpm] = useState(150);
  const [copied, setCopied] = useState(false);
  const [copiedDemo, setCopiedDemo] = useState<string | null>(null);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [failedDemos, setFailedDemos] = useState<string[]>([]);

  const [targetSeconds, setTargetSeconds] = useState<number | ''>('');
  const [customTargetInput, setCustomTargetInput] = useState('');

  const textWordCount = useMemo(() => countWords(textInput), [textInput]);

  const wordCount = textInput.trim()
    ? textWordCount
    : parseInt(wordCountInput, 10) || 0;

  const mainResult = calcSeconds(wordCount, selectedWpm);
  const hasResult = wordCount > 0 && selectedWpm > 0;

  useEffect(() => {
    onWordCountChange?.(wordCount);
  }, [wordCount, onWordCountChange]);

  const handlePresetClick = useCallback((wpm: number) => {
    setSelectedWpm(wpm);
  }, []);

  const handleClear = useCallback(() => {
    setWordCountInput('');
    setTextInput('');
    setCopied(false);
    setSelectedWpm(150);
    setTargetSeconds('');
    setCustomTargetInput('');
  }, []);

  const handleTargetClick = useCallback((sec: number) => {
    if (targetSeconds === sec && customTargetInput === '') {
      setTargetSeconds('');
    } else {
      setTargetSeconds(sec);
      setCustomTargetInput('');
    }
  }, [targetSeconds, customTargetInput]);

  const handleCustomTargetChange = useCallback((val: string) => {
    setCustomTargetInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setTargetSeconds(num);
    } else {
      setTargetSeconds('');
    }
  }, []);

  const fallbackCopy = useCallback((text: string) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }, []);

  const copyText = useCallback((text: string) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }, [fallbackCopy]);

  const handleCopyResult = useCallback(() => {
    if (!hasResult) return;
    const text = `${wordCount} words at ${selectedWpm} WPM = ${formatTime(mainResult)}`;
    copyText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [hasResult, wordCount, selectedWpm, mainResult, copyText]);

  const handleCopyDemo = useCallback((text: string, pace: string) => {
    copyText(text);
    setCopiedDemo(pace);
    setTimeout(() => setCopiedDemo(null), 2000);
  }, [copyText]);

  const handlePlayDemo = useCallback((pace: string) => {
    setFailedDemos(current => current.filter(item => item !== pace));
    setActiveDemo(pace);
  }, []);

  const handleDemoError = useCallback((pace: string) => {
    setFailedDemos(current => current.includes(pace) ? current : [...current, pace]);
    setActiveDemo(current => current === pace ? null : current);
  }, []);

  const targetWords = targetSeconds ? Math.round((targetSeconds as number) * (selectedWpm / 60)) : 0;
  const tolerance = targetWords ? Math.max(1, Math.round(targetWords * 0.05)) : 0;
  const minWords = targetWords - tolerance;
  const maxWords = targetWords + tolerance;

  return (
    <div className="calc-wrapper">
      <div className="calc-card">
        <div className="calc-input-section">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px', alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label className="calc-label" htmlFor="word-count-input">
                Word count
              </label>
              <input
                id="word-count-input"
                type="number"
                min="0"
                className="calc-number-input"
                placeholder="e.g. 150"
                value={textInput.trim() ? textWordCount : wordCountInput}
                onChange={e => {
                  setWordCountInput(e.target.value);
                  setTextInput('');
                }}
                disabled={!!textInput.trim()}
              />
            </div>
          </div>

          <label className="calc-label" htmlFor="text-paste">
            Or paste your full script
          </label>
          <textarea
            id="text-paste"
            className="calc-textarea"
            placeholder="Paste your script here and the words will be counted automatically..."
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            rows={6}
          />
          {textInput.trim() && (
            <p className="calc-word-badge" style={{ marginTop: '8px' }}>
              {textWordCount} word{textWordCount !== 1 ? 's' : ''} detected
            </p>
          )}
          <p style={{ fontSize: '12px', color: '#888', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Privacy Note: This tool works entirely locally in your browser. Your text is never uploaded or saved.
          </p>
        </div>

        <div className="calc-speed-section" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #eee' }}>
          <p className="calc-label">Select Voiceover Pace</p>
          <div className="calc-presets">
            {VOICEOVER_PRESETS.map(p => (
              <button
                type="button"
                key={p.wpm}
                className={`calc-preset ${selectedWpm === p.wpm ? 'calc-preset--active' : ''}`}
                onClick={() => handlePresetClick(p.wpm)}
              >
                <span className="calc-preset-label">{p.label}</span>
                <span className="calc-preset-wpm">{p.wpm} WPM</span>
              </button>
            ))}
          </div>
        </div>

        {hasResult && (
          <div className="calc-result" style={{ marginTop: '24px' }}>
            <div className="calc-result-main">
              <span className="calc-result-time">{formatTime(mainResult)}</span>
              <span className="calc-result-meta">
                {wordCount} word{wordCount !== 1 ? 's' : ''} at {selectedWpm} WPM
              </span>
            </div>

            <div className="calc-comparison">
              <div className="calc-comparison-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
                {VOICEOVER_PRESETS.map(p => (
                  <div
                    key={p.wpm}
                    className={`calc-comparison-item ${p.wpm === selectedWpm ? 'calc-comparison-item--active' : ''}`}
                  >
                    <span className="calc-comparison-label">{p.label}</span>
                    <span className="calc-comparison-time">{formatTime(calcSeconds(wordCount, p.wpm))}</span>
                    <span className="calc-comparison-wpm">{p.wpm} WPM</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="calc-actions">
              <button type="button" className="calc-btn calc-btn--copy" onClick={handleCopyResult}>
                {copied ? 'Copied!' : 'Copy Result'}
              </button>
              <button type="button" className="calc-btn calc-btn--clear" onClick={handleClear}>
                Clear All
              </button>
            </div>
          </div>
        )}

        <div className="calc-speed-section" style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #eee' }}>
          <p className="calc-label">Target Duration Checker</p>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Got a strict time limit? Select your target duration to see if your script fits the chosen pace.
          </p>
          <div className="calc-presets" style={{ flexWrap: 'wrap', gap: '8px' }}>
            {TARGETS.map(t => (
              <button
                type="button"
                key={t.seconds}
                className={`calc-preset ${targetSeconds === t.seconds && customTargetInput === '' ? 'calc-preset--active' : ''}`}
                onClick={() => handleTargetClick(t.seconds)}
                style={{ flex: '1 1 auto', minWidth: '60px', padding: '12px', justifyContent: 'center' }}
              >
                <span className="calc-preset-label" style={{ fontSize: '15px', textAlign: 'center', width: '100%' }}>{t.label}</span>
              </button>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', flex: '1 1 auto', minWidth: '120px' }}>
              <input
                type="number"
                min="1"
                aria-label="Custom target duration in seconds"
                className="calc-number-input"
                placeholder="Custom sec"
                value={customTargetInput}
                onChange={e => handleCustomTargetChange(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {targetSeconds !== '' && (
            <div className={`calc-target-result ${(wordCount > 0 && wordCount > maxWords) ? 'calc-target-result--long' : (wordCount > 0 && wordCount < minWords) ? 'calc-target-result--short' : 'calc-target-result--fit'}`}>
              <p className="calc-target-header">
                Target: {targetSeconds} seconds @ {selectedWpm} WPM
              </p>

              {wordCount === 0 ? (
                <p className="calc-target-message calc-target-message--fit">
                  Planning budget: aim for <strong>{minWords} to {maxWords} words</strong> to fit this duration.
                </p>
              ) : wordCount > maxWords ? (
                <p className="calc-target-message calc-target-message--long">
                  Your script is slightly too long. Trim roughly {wordCount - maxWords} word{wordCount - maxWords !== 1 ? 's' : ''} to fit the {maxWords}-word range maximum.
                </p>
              ) : wordCount < minWords ? (
                <p className="calc-target-message calc-target-message--short">
                  You have room to add roughly {minWords - wordCount} more word{minWords - wordCount !== 1 ? 's' : ''} to reach the {minWords}-word range minimum.
                </p>
              ) : (
                <p className="calc-target-message calc-target-message--fit">
                  Likely to fit! Your word count ({wordCount}) is well within the {minWords}–{maxWords} word range.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="calc-card calc-ref-card">
        <h2>Important Planning Caveats</h2>
        <p className="calc-disclaimer" style={{ fontSize: '15px', marginTop: '12px', color: '#444' }}>
          <strong>Estimates assume a constant reading pace.</strong> Real professional recordings include natural pauses, emphasis on key points, dramatic beats, and necessary breathing gaps.
          Additionally, technical wording, complex names, and numbers inherently take longer to articulate. Always leave a small buffer when writing to a strict time limit.
        </p>
      </div>

      <div className="calc-card">
        <h2>Voiceover Pace Demonstrations</h2>
        <p style={{ marginBottom: '24px', color: '#555' }}>
          Listen to how these different reading speeds sound in practice. You can use these short scripts as a reference when writing your own text.
        </p>
        <div className="calc-demos">
          {DEMO_SCRIPTS.map((demo) => (
            <div key={demo.pace} className="calc-demo-item">
              <div className="calc-demo-header">
                <h3 className="calc-demo-title">{demo.pace} ({demo.wpm} WPM)</h3>
                <span className="calc-demo-meta">{demo.words} words • {demo.duration}</span>
              </div>

              {activeDemo === demo.pace ? (
                <audio
                  className="calc-demo-audio"
                  controls
                  autoPlay
                  preload="none"
                  src={demo.audio}
                  onError={() => handleDemoError(demo.pace)}
                  aria-label={`${demo.pace}, ${demo.wpm} words per minute, ${demo.duration}, ${demo.words} words`}
                >
                  Your browser does not support audio playback.
                </audio>
              ) : (
                <button
                  type="button"
                  className={`calc-audio-trigger${failedDemos.includes(demo.pace) ? ' calc-audio-trigger--failed' : ''}`}
                  onClick={() => handlePlayDemo(demo.pace)}
                  aria-label={`Listen to Guy's ${demo.pace} demonstration`}
                >
                  <span className="calc-audio-trigger-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
                  </span>
                  <span>
                    <strong>{failedDemos.includes(demo.pace) ? 'Audio currently unavailable' : 'Listen to this pace'}</strong>
                    <small>{failedDemos.includes(demo.pace) ? 'Select to try loading the recording again' : 'The recording loads only when selected'}</small>
                  </span>
                </button>
              )}

              <div className="calc-demo-script-box">
                <p className="calc-demo-script-text">"{demo.text}"</p>
                <button
                  type="button"
                  onClick={() => handleCopyDemo(demo.text, demo.pace)}
                  className="calc-demo-copy-btn"
                  aria-label={`Copy script for ${demo.pace}`}
                >
                  {copiedDemo === demo.pace ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
