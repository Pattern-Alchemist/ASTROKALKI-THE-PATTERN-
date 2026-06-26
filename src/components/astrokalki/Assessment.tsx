'use client';

import { motion } from 'framer-motion';
import { PathIcon } from './Icons';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SPRING, ctaHover } from './utils/animation';
import { openWhatsAppModal } from '@/lib/whatsapp-modal';

export default function Assessment() {
  const prefersReduced = useReducedMotion();
  const noMotion = prefersReduced ? { duration: 0 } : undefined;

  return (
    <section id="assessment" className="bg-[#0a0a0a] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-5 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={noMotion || { ...SPRING.gentle }}
          className="flex justify-center mb-4 text-[#c9a96e]/50"
        >
          <PathIcon className="w-8 h-8" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={noMotion || { duration: 0.6 }}
          className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium mb-3"
        >
          The Pattern Index
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={noMotion || { ...SPRING.gentle }}
          className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0]"
        >
          Unlock clarity in <span className="italic font-light text-[#c9a96e]">60 seconds</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={noMotion || { duration: 0.6, delay: 0.1 }}
          className="mt-3 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-lg mx-auto leading-relaxed"
        >
          Identify repeating patterns that hold you back or propel you forward.
          This is not prediction — this is deep pattern recognition.
          Three questions. One truth you&apos;ve been avoiding.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={noMotion || { ...SPRING.gentle, delay: 0.15 }}
          className="mt-6"
        >
          <motion.button
            onClick={() => openWhatsAppModal()}
            variants={ctaHover}
            initial="rest"
            whileHover="hover"
            className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase bg-[#c9a96e] text-[#050505] font-[var(--font-inter)] font-semibold hover:bg-[#d4b87a] transition-colors duration-300"
          >
            Take the Pattern Index
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={noMotion || { duration: 0.5, delay: 0.25 }}
          className="mt-3 text-[9px] tracking-[0.1em] text-[#8a8078]/50 font-[var(--font-inter)] uppercase"
        >
          60-second diagnostic &middot; No chart required &middot; Just honesty
        </motion.p>
      </div>
    </section>
  );
}
