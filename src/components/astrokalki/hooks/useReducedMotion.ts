/**
 * AstroKalki — useReducedMotion hook
 * Respects the user's prefers-reduced-motion setting.
 * When true, all Framer Motion animations should use instant/duration:0 transitions.
 */
'use client';

import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
