'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { EclipseIcon } from './Icons';

export default function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden border-t border-white/[0.04]">
      {/* Eclipse + shadow imagery as background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-cinematic.png"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          aria-hidden="true"
        />
        <Image
          src="/images/shadow-work.png"
          alt=""
          fill
          className="object-cover opacity-10 mix-blend-overlay"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#050505]/80" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex justify-center mb-6"
        >
          <EclipseIcon className="w-10 h-10 text-[#c9a96e]/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-[var(--font-cormorant)] text-3xl md:text-6xl font-light text-[#f5f3f0] leading-[1.05]"
        >
          Ready to see
          <br />
          what&apos;s been <span className="italic">running you</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-5 text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-md mx-auto"
        >
          Patterns don&apos;t break without awareness. The question is not whether you are ready.
          It is whether you are willing to see.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#assessment"
            className="inline-block px-10 py-5 text-[10px] tracking-[0.25em] uppercase bg-[#c9a96e] text-[#050505] font-[var(--font-inter)] font-medium hover:bg-[#d4b87a] transition-all duration-300"
          >
            Begin Analysis
          </a>
        </motion.div>
      </div>
    </section>
  );
}
