'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-cinematic.png"
          alt="AstroKalki — Pattern Recognition Through Vedic Astrology"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 cinematic-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent" />
      </div>

      {/* Subtle grain texture */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      {/* Content Layer */}
      <div className="relative z-10 px-5 md:px-12 mx-auto max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[var(--font-cormorant)] text-[2.75rem] leading-[1.05] xs:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter text-[#e8e0d4]"
        >
          Same Pattern.
          <br />
          <span className="italic font-medium">Different Face.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 md:mt-8 text-[10px] md:text-xs text-[#8a8078] tracking-[0.3em] uppercase"
        >
          Karmic Psychology &middot; Pattern Recognition &middot; Vedic Intelligence
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-sm md:text-base text-[#e8e0d4]/70 font-[var(--font-inter)] font-light max-w-xl mx-auto"
        >
          Not prediction. Pattern recognition. Decode the karmic loops, emotional
          self-sabotage, and repeating relationship patterns running your life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#assessment"
            className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase border border-[#c9a96e]/50 text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-500 backdrop-blur-sm"
          >
            Begin Assessment
          </a>
          <a
            href="#pattern"
            className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase text-[#8a8078] hover:text-[#e8e0d4] transition-colors duration-500"
          >
            Explore Patterns
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-[#c9a96e]/40"
        />
      </motion.div>
    </section>
  );
}
