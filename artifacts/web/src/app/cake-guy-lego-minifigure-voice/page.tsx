'use client';
import { useEffect } from 'react';

export default function CakeGuyRedirect() {
  useEffect(() => {
    window.location.replace('/voice-of-cake-guy-legoland-windsor');
  }, []);
  return null;
}
