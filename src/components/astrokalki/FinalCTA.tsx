'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { EclipseIcon } from './Icons';

export default function FinalCTA() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden border-t border-white/[0.04]">
      {/* Eclipse + shadow background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-cinematic.png"
          alt=""
          fill
          className="object-cover opacity-15"
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
        <div className="absolute inset-0 bg-[#050505]/85" />
        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-5"
        >
          <EclipseIcon className="w-8 h-8 text-[#c9a96e]/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-[var(--font-cormorant)] text-2xl md:text-5xl font-bold tracking-[-0.02em] text-[#f5f3f0] leading-[1.05]"
        >
          READY TO SEE
          <br />
          WHAT&apos;S BEEN <span className="italic font-light">RUNNING YOU</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-md mx-auto"
        >
          Patterns don&apos;t break without awareness. The question is not whether you are ready.
          It is whether you are willing to see.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-7"
        >
          <a
            href="#assessment"
            className="inline-block px-10 py-5 text-[10px] tracking-[0.25em] uppercase bg-[#c9a96e] text-[#050505] font-[var(--font-inter)] font-semibold hover:bg-[#d4b87a] transition-all duration-300"
          >
            Begin Analysis
          </a>
        </motion.div>
      </div>
    </section>
  );
}
