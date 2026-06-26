'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from './hooks/useReducedMotion';

/**
 * PatternRecognition — the signature homepage moment.
 *
 * Four sentences that fade in sequence as the user scrolls.
 * One realization. More memorable than twenty feature cards.
 *
 * "You don't attract toxic people.
 *  You recreate familiar nervous systems.
 *  The pattern isn't outside you.
 *  It's running inside you."
 */

const LINES = [
  'You don\'t attract toxic people.',
  'You recreate familiar nervous systems.',
  'The pattern isn\'t outside you.',
  'It\'s running inside you.',
];

export default function PatternRecognition() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Call useTransform at top level for each line (hooks rules)
  const opacity0 = useTransform(scrollYProgress, [0.0, 0.1, 0.3, 0.4], [0, 1, 1, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1.0], [0, 1, 1, 0]);
  const opacities: MotionValue<number>[] = [opacity0, opacity1, opacity2, opacity3];

  return (
    <section
      ref={containerRef}
      className="bg-[#050505] py-32 md:py-48 border-t border-white/[0.04]"
    >
      <div className="max-w-4xl mx-auto px-5 md:px-12">
        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-16 md:mb-24 text-center"
        >
          Pattern Recognition
        </motion.p>

        {/* Fade sequence */}
        <div className="space-y-8 md:space-y-12 min-h-[60vh] flex flex-col justify-center">
          {LINES.map((line, i) => (
            <motion.h2
              key={i}
              style={prefersReduced ? { opacity: 1 } : { opacity: opacities[i] }}
              className={`font-[var(--font-cormorant)] text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-center leading-[1.1] ${
                i === LINES.length - 1 ? 'text-[#c9a96e] italic font-light' : 'text-[#f5f3f0]'
              }`}
            >
              {line}
            </motion.h2>
          ))}
        </div>

        {/* Closing realization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 md:mt-32 text-center"
        >
          <div className="w-px h-12 bg-[#c9a96e]/40 mx-auto mb-6" />
          <p className="font-[var(--font-cormorant)] text-base md:text-lg text-[#f5f3f0]/60 italic max-w-md mx-auto leading-relaxed">
            AstroKalki reveals the pattern. Then we change it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
