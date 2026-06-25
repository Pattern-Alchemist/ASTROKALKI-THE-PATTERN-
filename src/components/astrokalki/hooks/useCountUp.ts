/**
 * AstroKalki — useCountUp hook
 * Animates a number from 0 to target when triggered.
 * Used for Testimonials stats counter animation.
 */
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface UseCountUpOptions {
  /** Target number to count up to */
  target: number;
  /** Duration in ms — default 2000 */
  duration?: number;
  /** Whether to start counting — default false */
  start?: boolean;
  /** Decimal places — default 0 */
  decimals?: number;
}

export function useCountUp({ target, duration = 2000, start = false, decimals = 0 }: UseCountUpOptions): string {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

      // Ease-out cubic for deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [target, duration]
  );

  useEffect(() => {
    if (start) {
      startTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, animate]);

  // Format with commas and decimals
  const formatted = value.toFixed(decimals);
  const parts = formatted.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
