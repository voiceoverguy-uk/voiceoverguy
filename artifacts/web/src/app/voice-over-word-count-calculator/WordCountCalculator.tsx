'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';

type Mode = 'voiceover' | 'silent';

interface Preset {
  label: string;
  wpm: number;
}

interface Props {
  onWordCountChange?: (count: number) => void;
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

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="calc-tooltip-wrap">
      <button type="button" className="calc-tooltip-btn" aria-label="More information">?</button>
      <span className="calc-tooltip-text" role="tooltip">{text}</span>
    </span>
  );
}

export default function WordCountCalculator({ onWordCountChange }: Props) {
  const [mode, setMode] = useState<Mode>('voiceover');
  const [wordCountInput, setWordCountInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [selectedWpm, setSelectedWpm] = useState(150);
  const [customWpm, setCustomWpm] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pricePerWord, setPricePerWord] = useState('0.12');

  const presets = mode === 'voiceover' ? VOICEOVER_PRESETS : SILENT_PRESETS;

  const textWordCount = useMemo(() => countWords(textInput), [textInput]);

  const wordCount = textInput.trim()
    ? textWordCount
    : parseInt(wordCountInput, 10) || 0;

  const showPricing = wordCount >= 1000;

  const priceNum = parseFloat(pricePerWord);
  const estimatedCost =
    showPricing && !isNaN(priceNum) && priceNum >= 0
      ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(wordCount * priceNum)
      : '';

  const activeWpm = useCustom && customWpm
    ? Math.max(1, parseInt(customWpm, 10) || 0)
    : selectedWpm;

  const mainResult = calcSeconds(wordCount, activeWpm);
  const hasResult = wordCount > 0 && activeWpm > 0;

  useEffect(() => {
    onWordCountChange?.(wordCount);
  }, [wordCount, onWordCountChange]);

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
    setPricePerWord('0.12');
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

  const handlePriceChange = useCallback((val: string) => {
    if (val === '' || /^\d*\.?\d{0,4}$/.test(val)) {
      const num = parseFloat(val);
      if (val === '' || (!isNaN(num) && num >= 0)) {
        setPricePerWord(val);
      }
    }
  }, []);

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

          {/* Pricing row: word count always visible; price + cost appear at 1000+ */}
          <div className={`calc-pricing-row${showPricing ? ' calc-pricing-row--expanded' : ''}`}>
            <div className="calc-pricing-box">
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
            </div>

            {showPricing && (
              <>
                <div className="calc-pricing-box">
                  <label className="calc-label" htmlFor="price-per-word">
                    Price per Word{' '}
                    <InfoTooltip text="Typical guide rate: 8p–15p per word depending on script length, usage and project type." />
                  </label>
                  <div className="calc-price-input-wrap">
                    <span className="calc-price-prefix">£</span>
                    <input
                      id="price-per-word"
                      type="number"
                      min="0"
                      step="0.01"
                      className="calc-number-input calc-price-input"
                      value={pricePerWord}
                      onChange={e => handlePriceChange(e.target.value)}
                      placeholder="0.12"
                    />
                  </div>
                </div>

                <div className="calc-pricing-box">
                  <label className="calc-label" htmlFor="estimated-cost">
                    Estimated Cost{' '}
                    <InfoTooltip text="Guide only. Final pricing may vary depending on usage, licensing and project details." />
                  </label>
                  <input
                    id="estimated-cost"
                    type="text"
                    className="calc-number-input calc-cost-display"
                    value={estimatedCost}
                    readOnly
                    placeholder="£0.00"
                  />
                </div>
              </>
            )}
          </div>

          {showPricing && (
            <div className="calc-pricing-note">
              <p>Short scripts are usually priced with a minimum booking fee, so this estimator is shown for scripts of 1000 words or more.</p>
              <p className="calc-pricing-note--subtle">Need an accurate quote? Usage, licensing and turnaround can affect the final price.</p>
            </div>
          )}

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
