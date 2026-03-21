'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

export default function CalcFaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(prev => (prev === i ? null : i));
  };

  return (
    <div className="faq-list">
      {faqs.map((faq, i) => (
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
