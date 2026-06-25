'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ShadowWork() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/shadow-work.png"
          alt="Shadow Integration — Confrontation with Truth"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Heavier, darker overlay for psychological intensity */}
        <div className="absolute inset-0 bg-[#050505]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 md:px-12 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/60 mb-6 block"
        >
          Shadow Integration
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="font-[var(--font-cormorant)] text-3xl xs:text-4xl md:text-7xl font-light text-[#e8e0d4] leading-[1.05]"
        >
          The Confrontation
          <br />
          with the <span className="italic">Shadow</span>
        </motion.h2>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
          className="mt-10 max-w-2xl mx-auto text-base md:text-xl text-[#e8e0d4]/80 font-[var(--font-cormorant)] font-light italic leading-relaxed"
        >
          &ldquo;Until you make the unconscious conscious, it will direct your life and you
          will call it fate.&rdquo;
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-3 text-[10px] tracking-[0.2em] uppercase text-[#8a8078] font-[var(--font-inter)]"
        >
          Carl Jung
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 max-w-xl mx-auto text-[#8a8078] text-sm md:text-base font-[var(--font-inter)] font-light leading-relaxed"
        >
          AstroKalki forces this confrontation. No spiritual bypassing. No manifestation
          delusion. Just the raw, unfiltered truth of your psychological architecture. The
          parts you disown don&apos;t disappear — they choose your partners, start your
          conflicts, and engineer your breakdowns. We meet them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10"
        >
          <a
            href="#services"
            className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase border border-white/[0.15] text-[#e8e0d4]/70 hover:border-[#c9a96e]/50 hover:text-[#c9a96e] transition-all duration-500 font-[var(--font-inter)]"
          >
            Explore Shadow Sessions
          </a>
        </motion.div>
      </div>
    </section>
  );
}
