'use client';

import { useState, useCallback } from 'react';
import WordCountCalculator from './WordCountCalculator';
import CalculatorQuoteForm from './CalculatorQuoteForm';

export default function CalculatorPage() {
  const [wordCount, setWordCount] = useState(0);

  const handleWordCountChange = useCallback((count: number) => {
    setWordCount(count);
  }, []);

  return (
    <>
      <WordCountCalculator onWordCountChange={handleWordCountChange} />
      <CalculatorQuoteForm wordCount={wordCount} />
    </>
  );
}
