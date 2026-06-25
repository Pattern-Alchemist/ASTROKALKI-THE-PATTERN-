'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { EclipseIcon } from './Icons';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Eclipse Image Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-cinematic.png"
          alt="AstroKalki — Pattern Recognition Through Vedic Psychology"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 to-transparent" />
      </div>

      {/* Content — Left-aligned for authority, not center-generic */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-2xl">
          {/* Tag — immediate identity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <EclipseIcon className="w-4 h-4 text-[#c9a96e]/80" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/80 font-[var(--font-inter)]">
              Pattern Recognition Through Vedic Psychology
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-cormorant)] text-[2.5rem] leading-[1.05] xs:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#f5f3f0]"
          >
            Same Pattern.
            <br />
            <span className="italic">Different Face.</span>
          </motion.h1>

          {/* Subheadline — specific, not generic */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-sm md:text-base text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed max-w-lg"
          >
            The patterns you can&apos;t break are the ones you can&apos;t see.
            Karmic loops. Emotional self-sabotage. Repeating relationships.
            Not prediction. <span className="text-[#c9a96e]">Pattern recognition.</span>
          </motion.p>

          {/* What AstroKalki IS — immediate clarity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 flex flex-wrap gap-x-4 gap-y-1"
          >
            {['Karmic Psychology', 'Shadow Integration', 'Dharma Navigation', 'Vedic Pattern Mapping'].map((tag) => (
              <span key={tag} className="text-[10px] tracking-[0.15em] uppercase text-[#8a8078] font-[var(--font-inter)]">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs — Assessment is primary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col sm:flex-row items-start gap-4"
          >
            <a
              href="#assessment"
              className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase bg-[#c9a96e] text-[#050505] font-[var(--font-inter)] font-medium hover:bg-[#d4b87a] transition-all duration-300"
            >
              Begin Analysis
            </a>
            <a
              href="#method"
              className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase border border-[#f5f3f0]/20 text-[#f5f3f0]/70 hover:text-[#f5f3f0] hover:border-[#f5f3f0]/40 transition-all duration-300 font-[var(--font-inter)]"
            >
              Explore the Framework
            </a>
          </motion.div>

          {/* Social proof — immediate trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.3 }}
            className="mt-8 flex items-center gap-6 text-[10px] tracking-[0.1em] text-[#8a8078] font-[var(--font-inter)]"
          >
            <span><strong className="text-[#f5f3f0]/80 font-medium">2,400+</strong> Patterns Decoded</span>
            <span className="w-px h-3 bg-[#8a8078]/30" />
            <span><strong className="text-[#f5f3f0]/80 font-medium">97%</strong> Return Rate</span>
            <span className="w-px h-3 bg-[#8a8078]/30" />
            <span><strong className="text-[#f5f3f0]/80 font-medium">38 min</strong> Avg Breakthrough</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 3.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-6 bg-[#c9a96e]/30"
        />
      </motion.div>
    </section>
  );
}
