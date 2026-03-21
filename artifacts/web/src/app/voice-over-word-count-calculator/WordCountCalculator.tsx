'use client';

import { useState, useCallback, useMemo } from 'react';

type Mode = 'voiceover' | 'silent';

interface Preset {
  label: string;
  wpm: number;
}

const VOICEOVER_PRESETS: Preset[] = [
  { label: 'Very Slow', wpm: 110 },
  { label: 'Slow', wpm: 130 },
  { label: 'Average', wpm: 150 },
  { label: 'Fast', wpm: 170 },
  { label: 'Very Fast', wpm: 190 },
];

const SILENT_PRESETS: Preset[] = [
  { label: 'Study', wpm: 120 },
  { label: 'Careful Comprehension', wpm: 180 },
  { label: 'Average Non-Fiction', wpm: 238 },
  { label: 'Average Fiction', wpm: 260 },
  { label: 'Skim / Gist', wpm: 350 },
];

function formatTime(totalSeconds: number): string {
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

export default function WordCountCalculator() {
  const [mode, setMode] = useState<Mode>('voiceover');
  const [wordCountInput, setWordCountInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [selectedWpm, setSelectedWpm] = useState(150);
  const [customWpm, setCustomWpm] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [copied, setCopied] = useState(false);

  const presets = mode === 'voiceover' ? VOICEOVER_PRESETS : SILENT_PRESETS;

  const textWordCount = useMemo(() => countWords(textInput), [textInput]);

  const wordCount = textInput.trim()
    ? textWordCount
    : parseInt(wordCountInput, 10) || 0;

  const activeWpm = useCustom && customWpm
    ? Math.max(1, parseInt(customWpm, 10) || 0)
    : selectedWpm;

  const mainResult = calcSeconds(wordCount, activeWpm);
  const hasResult = wordCount > 0 && activeWpm > 0;

  const handlePresetClick = useCallback((wpm: number) => {
    setSelectedWpm(wpm);
    setUseCustom(false);
    setCustomWpm('');
  }, []);

  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode);
    setUseCustom(false);
    setCustomWpm('');
    const defaultWpm = newMode === 'voiceover' ? 150 : 238;
    setSelectedWpm(defaultWpm);
  }, []);

  const handleCustomChange = useCallback((val: string) => {
    setCustomWpm(val);
    if (val) setUseCustom(true);
    else setUseCustom(false);
  }, []);

  const handleClear = useCallback(() => {
    setWordCountInput('');
    setTextInput('');
    setCustomWpm('');
    setUseCustom(false);
    setCopied(false);
    const defaultWpm = mode === 'voiceover' ? 150 : 238;
    setSelectedWpm(defaultWpm);
  }, [mode]);

  const handleCopyResult = useCallback(() => {
    if (!hasResult) return;
    const text = `${wordCount} words at ${activeWpm} WPM = ${formatTime(mainResult)}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }, [hasResult, wordCount, activeWpm, mainResult]);

  const fallbackCopy = (text: string) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-tabs">
        <button
          className={`calc-tab ${mode === 'voiceover' ? 'calc-tab--active' : ''}`}
          onClick={() => handleModeChange('voiceover')}
        >
          Voiceover / Reading Aloud
        </button>
        <button
          className={`calc-tab ${mode === 'silent' ? 'calc-tab--active' : ''}`}
          onClick={() => handleModeChange('silent')}
        >
          Silent Reading
        </button>
      </div>

      <div className="calc-card">
        <div className="calc-input-section">
          <label className="calc-label" htmlFor="word-count-input">
            Word count
          </label>
          <input
            id="word-count-input"
            type="number"
            min="0"
            className="calc-number-input"
            placeholder="e.g. 250"
            value={textInput.trim() ? textWordCount : wordCountInput}
            onChange={e => {
              setWordCountInput(e.target.value);
              setTextInput('');
            }}
            disabled={!!textInput.trim()}
          />

          <label className="calc-label" htmlFor="text-paste" style={{ marginTop: '16px' }}>
            Or paste your text below
          </label>
          <textarea
            id="text-paste"
            className="calc-textarea"
            placeholder="Paste your script or text here and the words will be counted automatically..."
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            rows={5}
          />
          {textInput.trim() && (
            <p className="calc-word-badge">
              {textWordCount} word{textWordCount !== 1 ? 's' : ''} detected
            </p>
          )}
        </div>

        <div className="calc-speed-section">
          <p className="calc-label">Select reading speed</p>
          <div className="calc-presets">
            {presets.map(p => (
              <button
                key={p.wpm}
                className={`calc-preset ${!useCustom && selectedWpm === p.wpm ? 'calc-preset--active' : ''}`}
                onClick={() => handlePresetClick(p.wpm)}
              >
                <span className="calc-preset-label">{p.label}</span>
                <span className="calc-preset-wpm">{p.wpm} WPM</span>
              </button>
            ))}
          </div>

          <div className="calc-custom-row">
            <label className="calc-label" htmlFor="custom-wpm">Custom WPM</label>
            <div className="calc-custom-controls">
              <input
                id="custom-wpm-slider"
                type="range"
                min="50"
                max="400"
                step="1"
                className="calc-slider"
                value={customWpm || String(selectedWpm)}
                onChange={e => handleCustomChange(e.target.value)}
                aria-label="Custom words per minute slider"
              />
              <input
                id="custom-wpm"
                type="number"
                min="1"
                max="1000"
                className="calc-custom-input"
                placeholder="e.g. 145"
                value={customWpm}
                onChange={e => handleCustomChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        {hasResult && (
          <div className="calc-result">
            <div className="calc-result-main">
              <span className="calc-result-time">{formatTime(mainResult)}</span>
              <span className="calc-result-meta">
                {wordCount} word{wordCount !== 1 ? 's' : ''} at {activeWpm} WPM
              </span>
            </div>

            <div className="calc-comparison">
              <p className="calc-comparison-title">
                {mode === 'voiceover' ? 'All voiceover speeds' : 'All reading speeds'}
              </p>
              <div className="calc-comparison-grid">
                {presets.map(p => (
                  <div
                    key={p.wpm}
                    className={`calc-comparison-item ${p.wpm === activeWpm && !useCustom ? 'calc-comparison-item--active' : ''}`}
                  >
                    <span className="calc-comparison-label">{p.label}</span>
                    <span className="calc-comparison-time">{formatTime(calcSeconds(wordCount, p.wpm))}</span>
                    <span className="calc-comparison-wpm">{p.wpm} WPM</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="calc-actions">
              <button className="calc-btn calc-btn--copy" onClick={handleCopyResult}>
                {copied ? 'Copied!' : 'Copy Result'}
              </button>
              <button className="calc-btn calc-btn--clear" onClick={handleClear}>
                Clear All
              </button>
            </div>
          </div>
        )}

        {!hasResult && (
          <div className="calc-actions" style={{ marginTop: '20px' }}>
            <button className="calc-btn calc-btn--clear" onClick={handleClear}>
              Clear All
            </button>
          </div>
        )}
      </div>

      {mode === 'voiceover' && (
        <div className="calc-card calc-ref-card">
          <h3>Common Voiceover Script Lengths</h3>
          <div className="calc-ref-grid">
            <div className="calc-ref-item">
              <span className="calc-ref-duration">30 seconds</span>
              <span className="calc-ref-words">65 to 75 words</span>
            </div>
            <div className="calc-ref-item">
              <span className="calc-ref-duration">60 seconds</span>
              <span className="calc-ref-words">130 to 160 words</span>
            </div>
            <div className="calc-ref-item">
              <span className="calc-ref-duration">90 seconds</span>
              <span className="calc-ref-words">195 to 225 words</span>
            </div>
            <div className="calc-ref-item">
              <span className="calc-ref-duration">2 minutes</span>
              <span className="calc-ref-words">260 to 320 words</span>
            </div>
          </div>
          <p className="calc-disclaimer">
            Final recording length can vary depending on pauses, emphasis, script difficulty, character delivery, and legal copy.
          </p>
        </div>
      )}
    </div>
  );
}
