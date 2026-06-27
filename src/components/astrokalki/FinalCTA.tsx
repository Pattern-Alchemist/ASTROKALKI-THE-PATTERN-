'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { EclipseIcon } from './Icons';
import FilmGrain from './FilmGrain';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SPRING, ctaHover } from './utils/animation';
import { openWhatsAppModal } from '@/lib/whatsapp-modal';

export default function FinalCTA() {
  const prefersReduced = useReducedMotion();
  const noMotion = prefersReduced ? { duration: 0 } : undefined;

  return (
    <section className="relative py-16 md:py-24 overflow-hidden border-t border-white/[0.04]">
      {/* Eclipse + shadow background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-cinematic.png"
          alt=""
          fill
          loading="lazy"
          className="object-cover opacity-15"
          sizes="100vw"
          aria-hidden="true"
        />
        <Image
          src="/images/shadow-work.png"
          alt=""
          fill
          loading="lazy"
          className="object-cover opacity-10 mix-blend-overlay"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#050505]/85" />
        <FilmGrain opacity={0.05} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={noMotion || { ...SPRING.gentle }}
          className="flex justify-center mb-5"
        >
          <EclipseIcon className="w-8 h-8 text-[#c9a96e]/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={noMotion || { ...SPRING.gentle }}
          className="font-[var(--font-cormorant)] text-2xl md:text-5xl font-bold tracking-[-0.02em] text-[#f5f3f0] leading-[1.05]"
        >
          READY TO DISCOVER
          <br />
          THE <span className="italic font-light">PATTERN BENEATH</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={noMotion || { duration: 0.6, delay: 0.1 }}
          className="mt-4 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-md mx-auto"
        >
          Patterns don&apos;t break without awareness. Ready to discover the pattern beneath?
          Begin your transformation with the Pattern Index.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={noMotion || { ...SPRING.gentle, delay: 0.2 }}
          className="mt-7"
        >
          <motion.button
            onClick={() => openWhatsAppModal()}
            variants={ctaHover}
            initial="rest"
            whileHover="hover"
            className="inline-block px-10 py-5 text-[10px] tracking-[0.25em] uppercase bg-[#c9a96e] text-[#050505] font-[var(--font-inter)] font-semibold hover:bg-[#d4b87a] transition-colors duration-300"
          >
            Take the Pattern Index
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
