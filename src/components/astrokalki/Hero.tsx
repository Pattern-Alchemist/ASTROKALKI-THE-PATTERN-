'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { EclipseIcon } from './Icons';
import FilmGrain from './FilmGrain';
import { heroContainer, heroChild, heroHeadline, SPRING, ctaHover } from './utils/animation';
import { useReducedMotion } from './hooks/useReducedMotion';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Parallax — eclipse image moves at 30% scroll speed for depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const noMotion = prefersReduced ? { duration: 0 } : undefined;

  return (
    <section ref={sectionRef} id="top" className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-end overflow-hidden">
      {/* Real eclipse image from ZIP — with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={prefersReduced ? {} : { y: imageY }}
      >
        <Image
          src="/images/eclipse-shadow.jpg"
          alt="The Pattern Recognition Institute — Decoding invisible loops"
          fill
          priority
          className="object-cover object-center opacity-40 brightness-75"
          sizes="100vw"
        />
        <FilmGrain opacity={0.06} />
        {/* Cinematic gradient — heavy bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-[#050505]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/50 to-transparent" />
      </motion.div>

      {/* Content — bottom-anchored for authority */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 pb-12 md:pb-20 pt-32">
        <motion.div
          className="max-w-2xl"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Institute badge */}
          <motion.div
            variants={heroChild}
            transition={noMotion}
            className="flex items-center gap-2 mb-5"
          >
            <EclipseIcon className="w-4 h-4 text-[#c9a96e]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] font-[var(--font-inter)] font-medium">
              The Pattern Recognition Institute
            </span>
          </motion.div>

          {/* Headline — oversized, authoritative, heavy */}
          <motion.h1
            variants={heroHeadline}
            transition={noMotion}
            className="font-[var(--font-cormorant)] text-[2.75rem] leading-[1] xs:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.02em] text-[#f5f3f0]"
          >
            SAME PATTERN.
            <br />
            <span className="text-[#c9a96e] italic font-normal">DIFFERENT FACE.</span>
          </motion.h1>

          {/* Subheadline — institute positioning */}
          <motion.p
            variants={heroChild}
            transition={noMotion}
            className="mt-5 text-sm md:text-[15px] text-[#f5f3f0]/75 font-[var(--font-inter)] font-light leading-relaxed max-w-lg"
          >
            <span className="text-[#c9a96e]">Most apps track what you do. AstroKalki reveals why you keep doing it.</span>
            {' '}The world&apos;s first Pattern Intelligence System™ — psychology, shadow work, and somatic practice in one daily operating system.
          </motion.p>

          {/* CTAs — with spring hover micro-interaction */}
          <motion.div
            variants={heroChild}
            transition={noMotion}
            className="mt-7 flex flex-col sm:flex-row items-start gap-3"
          >
            <motion.a
              href="#pattern-intelligence-system"
              variants={ctaHover}
              initial="rest"
              whileHover="hover"
              className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase bg-[#c9a96e] text-[#050505] font-[var(--font-inter)] font-semibold hover:bg-[#d4b87a] transition-colors duration-300"
            >
              Discover Your Hidden Pattern
            </motion.a>
            <motion.a
              href="#assessment"
              variants={ctaHover}
              initial="rest"
              whileHover="hover"
              className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase border border-[#f5f3f0]/20 text-[#f5f3f0]/70 hover:text-[#f5f3f0] hover:border-[#f5f3f0]/40 transition-all duration-300 font-[var(--font-inter)]"
            >
              Take the Pattern Index
            </motion.a>
            <motion.a
              href="#method"
              variants={ctaHover}
              initial="rest"
              whileHover="hover"
              className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase border border-[#f5f3f0]/20 text-[#f5f3f0]/70 hover:text-[#f5f3f0] hover:border-[#f5f3f0]/40 transition-all duration-300 font-[var(--font-inter)]"
            >
              The Method
            </motion.a>
          </motion.div>

          {/* Social proof badge */}
          <motion.div
            variants={heroChild}
            transition={noMotion}
            className="mt-6 inline-flex items-center gap-3 px-4 py-2 border border-white/[0.06] bg-[#050505]/40 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.1em] text-[#8a8078] font-[var(--font-inter)]">
              <strong className="text-[#f5f3f0]/90 font-medium">2,400+</strong> Patterns Decoded
            </span>
            <span className="w-px h-3 bg-[#8a8078]/30" />
            <span className="text-[10px] tracking-[0.1em] text-[#8a8078] font-[var(--font-inter)]">
              <strong className="text-[#f5f3f0]/90 font-medium">97%</strong> Accuracy Rate
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
