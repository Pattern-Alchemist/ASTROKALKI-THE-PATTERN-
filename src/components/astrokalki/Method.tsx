'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { EclipseIcon, MirrorIcon, PathIcon, WarriorIcon } from './Icons';
import { useReducedMotion } from './hooks/useReducedMotion';
import { EASE, SPRING } from './utils/animation';

const steps = [
  {
    icon: EclipseIcon,
    number: '01',
    title: 'Vedic Mapping',
    subtitle: 'The Architecture',
    description: 'Your karmic architecture is a map of what you came here to repeat. Every placement — a tendency. Every house — a room where something unfinished lives. Not what will happen. What keeps happening — until you see why.',
  },
  {
    icon: MirrorIcon,
    number: '02',
    title: 'Depth Psychology',
    subtitle: 'The Shadow',
    description: 'Jungian shadow work meets attachment theory. The diagnostic stops being symbolic and becomes personal. Every repeated heartbreak has a root. We don\'t interpret symbols. We decode the psyche beneath them.',
  },
  {
    icon: PathIcon,
    number: '03',
    title: 'Pattern Recognition',
    subtitle: 'The Diagnosis',
    description: 'A pattern is not punishment. It is a loop — a behavior that keeps returning until its original wound is finally seen. We trace the thread. We find the knot. When the knot is seen, the loop begins to dissolve.',
  },
  {
    icon: WarriorIcon,
    number: '04',
    title: 'Strategic Action',
    subtitle: 'The Dharma',
    description: 'No longer reacting to the pattern, but actively breaking the cycle. This is where insight becomes strategy, and strategy becomes a new architecture for living. The dharma was always there. You just couldn\'t see it through the karmic overlay.',
  },
];

export default function Method() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Golden thread height tracks scroll progress
  const threadHeight = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '100%']);

  const noMotion = prefersReduced ? { duration: 0 } : undefined;

  return (
    <section id="method" ref={containerRef} className="relative bg-[#080808] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="max-w-xl mb-10 md:mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={noMotion || { duration: 0.6 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3"
          >
            The Diagnostic System
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={noMotion || { duration: 0.7, ease: EASE.outExpoLegacy }}
            className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0] leading-[1.1]"
          >
            Not Prediction. <span className="italic font-light">Pattern Recognition.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={noMotion || { duration: 0.6, delay: 0.1 }}
            className="mt-3 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light"
          >
            A proprietary four-part diagnostic system. Karmic architecture. Jungian depth. Pattern intelligence. Precision strategy.
          </motion.p>
        </div>

        {/* The Method Steps with Golden Thread */}
        <div className="relative">
          {/* Golden Thread — vertical line that fills on scroll */}
          <div className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-px bg-white/[0.04] z-0">
            {!prefersReduced && (
              <motion.div
                style={{ height: threadHeight }}
                className="w-full bg-gradient-to-b from-[#c9a96e]/80 via-[#c9a96e]/50 to-[#c9a96e]/20 origin-top"
              />
            )}
          </div>

          {/* Steps */}
          <div className="relative z-10 space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={noMotion || {
                    ...SPRING.gentle,
                    delay: index * 0.08,
                  }}
                  className="flex items-start gap-4 md:gap-6 py-6 md:py-8 group"
                >
                  {/* Icon node on the thread */}
                  <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-[#c9a96e]/20 bg-[#080808] group-hover:border-[#c9a96e]/50 group-hover:bg-[#c9a96e]/5 transition-all duration-500 z-10">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#c9a96e]/60 group-hover:text-[#c9a96e] transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] tracking-[0.15em] text-[#c9a96e]/50 font-[var(--font-inter)]">
                        {step.number}
                      </span>
                      <span className="text-[9px] tracking-[0.15em] text-[#8a8078]/50 font-[var(--font-inter)]">
                        — {step.subtitle}
                      </span>
                    </div>
                    <h3 className="font-[var(--font-cormorant)] text-lg md:text-2xl text-[#f5f3f0] font-bold tracking-[-0.01em] group-hover:text-[#c9a96e] transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="mt-6 pt-6 border-t border-white/[0.04]">
          <blockquote className="font-[var(--font-cormorant)] text-base md:text-xl text-[#f5f3f0]/70 font-light italic max-w-xl">
            &ldquo;You cannot heal what you will not face. You cannot face what you cannot see.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
