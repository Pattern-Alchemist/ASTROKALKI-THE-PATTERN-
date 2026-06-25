'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SPRING } from './utils/animation';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: prefersReduced
              ? { duration: 0 }
              : { ...SPRING.cinematic },
          }}
          className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { ...SPRING.gentle }
            }
            className="text-center"
          >
            <p className="font-[var(--font-cormorant)] text-3xl md:text-5xl text-[#e8e0d4] tracking-tight font-light">
              Astro<span className="italic">Kalki</span>
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { delay: 0.5, ...SPRING.gentle }
              }
              className="h-px bg-[#c9a96e] mx-auto mt-4"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
