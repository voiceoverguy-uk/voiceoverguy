'use client';

import { useEffect, useState } from 'react';
import { watchVisitorLocalGreeting } from '@/lib/visitorLocalGreeting';

/** Inline text only: inherit the introduction's existing typography. */
export default function VisitorLocalGreeting() {
  const [greeting, setGreeting] = useState('');
  useEffect(() => watchVisitorLocalGreeting(setGreeting), []);
  return greeting ? <>{greeting}{' '}</> : null;
}
