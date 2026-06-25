'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { EclipseIcon } from './Icons';

export default function Hero() {
  return (
    <section id="top" className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-end overflow-hidden">
      {/* Eclipse Image — full width, contained height */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-cinematic.png"
          alt="AstroKalki — Pattern Recognition Through Vedic Psychology"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
        {/* Cinematic gradient — heavy bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-[#050505]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/50 to-transparent" />
      </div>

      {/* Content — bottom-anchored for authority, not floating center */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 pb-12 md:pb-20 pt-32">
        <div className="max-w-2xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex items-center gap-2 mb-5"
          >
            <EclipseIcon className="w-4 h-4 text-[#c9a96e]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] font-[var(--font-inter)] font-medium">
              Pattern Recognition Through Vedic Psychology
            </span>
          </motion.div>

          {/* Headline — oversized, authoritative, heavy */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-cormorant)] text-[2.75rem] leading-[1] xs:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.02em] text-[#f5f3f0]"
          >
            SAME PATTERN.
            <br />
            DIFFERENT FACE.
          </motion.h1>

          {/* Subheadline — specific, not generic */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="mt-5 text-sm md:text-[15px] text-[#f5f3f0]/75 font-[var(--font-inter)] font-light leading-relaxed max-w-lg"
          >
            Vedic Intelligence meets Jungian Depth. We don&apos;t read stars; we decode the
            psychological DNA that keeps you in a loop.
          </motion.p>

          {/* CTAs — Assessment is primary, gold fill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="mt-7 flex flex-col sm:flex-row items-start gap-3"
          >
            <a
              href="#assessment"
              className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase bg-[#c9a96e] text-[#050505] font-[var(--font-inter)] font-semibold hover:bg-[#d4b87a] transition-all duration-300"
            >
              Begin Analysis
            </a>
            <a
              href="#method"
              className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase border border-[#f5f3f0]/20 text-[#f5f3f0]/70 hover:text-[#f5f3f0] hover:border-[#f5f3f0]/40 transition-all duration-300 font-[var(--font-inter)]"
            >
              How It Works
            </a>
          </motion.div>

          {/* Social proof badge — elegant, not screaming */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.1 }}
            className="mt-6 inline-flex items-center gap-3 px-4 py-2 border border-white/[0.06] bg-[#050505]/40 backdrop-blur-sm"
          >
            <span className="text-[10px] tracking-[0.1em] text-[#8a8078] font-[var(--font-inter)]">
              <strong className="text-[#f5f3f0]/90 font-medium">2,400+</strong> Patterns Decoded
            </span>
            <span className="w-px h-3 bg-[#8a8078]/30" />
            <span className="text-[10px] tracking-[0.1em] text-[#8a8078] font-[var(--font-inter)]">
              <strong className="text-[#f5f3f0]/90 font-medium">97%</strong> Accuracy Rate
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
