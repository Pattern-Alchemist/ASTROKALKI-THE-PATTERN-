'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import FilmGrain from './FilmGrain';
import TiltCard from './TiltCard';
import { useReducedMotion } from './hooks/useReducedMotion';
import { EASE, SPRING, ctaHover } from './utils/animation';

const stages = [
  {
    stage: 'Stage 1',
    name: 'Recognition',
    service: 'Pattern Snapshot',
    price: '₹999',
    duration: '45-Minute Diagnostic',
    description: 'See your current patterns clearly. A tactical decode of your primary loop — isolation of your nervous-system trigger, Vedic elemental profiling, and one actionable override step.',
    image: '/images/service-recognition.png',
    cta: 'Begin Recognition',
    bullets: ['Isolation of primary nervous-system trigger', 'Vedic elemental profiling summary', '1 tactical step to override immediate stagnation'],
  },
  {
    stage: 'Stage 2',
    name: 'Diagnosis',
    service: 'The Deep Dive',
    price: '₹4,999',
    duration: '2-Hour Diagnostic + Document',
    description: 'Understand root causes and their impact. Complete psychological architecture and 12-month roadmap. The most requested session for those ready to stop repeating.',
    image: '/images/service-diagnosis.png',
    cta: 'Begin Diagnosis',
    badge: 'MOST REQUESTED',
    bullets: ['Rigorous shadow confrontation session', 'Complete Vedic blueprint mapping document', '12-month personal behavioral override roadmap', 'Bi-weekly alignment tracking framework'],
  },
  {
    stage: 'Stage 3',
    name: 'Realignment',
    service: 'Dharma Navigation',
    price: '₹9,999',
    duration: '2 Complete Sessions',
    description: 'Navigate your dharma with precision. Professional bottleneck diagnosis, career re-architecting, and authority expansion through Vedic-Jungian sovereignty mapping.',
    image: '/images/service-realignment.png',
    cta: 'Begin Realignment',
    bullets: ['Professional bottleneck diagnosis', 'Vedic-Jungian sovereignty blueprint', 'Authority expansion and career re-architecting', 'Private audio brief with executive directives'],
  },
  {
    stage: 'Stage 4',
    name: 'Integration',
    service: 'The Warrior\'s Journey',
    price: 'Custom',
    duration: '3-Month Advisory',
    description: 'Embody the warrior\'s journey fully. Bespoke shadow work integration with weekly private clinical advisory, unlimited secure access, and real-time strategic intervention.',
    image: '/images/service-integration.png',
    cta: 'Apply',
    badge: 'BESPOKE S-TIER',
    bullets: ['Weekly private clinical advisory', 'Unlimited secure asynchronous access', 'Real-time strategic intervention in crises', 'Bespoke physical/somatic ritual design'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll-driven golden thread — same approach as Method.tsx
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const threadHeight = useTransform(scrollYProgress, [0.1, 0.85], ['0%', '100%']);

  const noMotion = prefersReduced ? { duration: 0 } : undefined;

  return (
    <section id="services" ref={sectionRef} className="bg-[#050505] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={noMotion || { duration: 0.6 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3"
          >
            The Kalki Framework
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={noMotion || { duration: 0.7, ease: EASE.outExpoLegacy }}
            className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0]"
          >
            Four stages. One <span className="italic font-light">transformation</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={noMotion || { duration: 0.6, delay: 0.1 }}
            className="mt-3 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-xl"
          >
            Progress through four stages designed to realign your life&apos;s patterns.
            Each stage builds on the last. You are not buying sessions — you are progressing through a diagnostic framework.
          </motion.p>
        </div>

        {/* Stages — vertical progression with Scroll-Driven Golden Thread */}
        <div className="relative">
          {/* Vertical thread — static track */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#c9a96e]/30 via-[#c9a96e]/15 to-[#c9a96e]/5">
            {/* Scroll-driven golden fill */}
            {!prefersReduced && (
              <motion.div
                style={{ height: threadHeight }}
                className="w-full bg-gradient-to-b from-[#c9a96e]/80 via-[#c9a96e]/50 to-[#c9a96e]/20 origin-top"
              />
            )}
          </div>

          <div className="space-y-3 md:space-y-4">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={noMotion || {
                  ...SPRING.gentle,
                  delay: index * 0.06,
                }}
                className={`group relative border ${stage.badge === 'MOST REQUESTED' ? 'border-[#c9a96e]/20' : stage.badge === 'BESPOKE S-TIER' ? 'border-[#c9a96e]/15' : 'border-white/[0.04]'} hover:border-[#c9a96e]/25 transition-colors duration-500 overflow-hidden`}
              >
                <div className="flex flex-row">
                  {/* Stage indicator — on the thread */}
                  <div className="relative w-12 md:w-16 shrink-0 flex items-start justify-center pt-4 md:pt-5">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-[#050505] border-2 border-[#c9a96e]/40 group-hover:border-[#c9a96e] group-hover:bg-[#c9a96e]/20 transition-all duration-500 z-10"
                      whileHover={prefersReduced ? {} : { scale: 1.3 }}
                      transition={SPRING.snappy}
                    />
                  </div>

                  {/* Small square cinematic image — with 3D tilt */}
                  <TiltCard maxTilt={10} glareIntensity={0.1} hoverScale={1.04} className="relative w-20 h-20 md:w-28 md:h-28 shrink-0 overflow-hidden">
                    <Image
                      src={stage.image}
                      alt={stage.service}
                      fill
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="112px"
                    />
                    <FilmGrain opacity={0.08} />
                    {stage.badge && (
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#c9a96e]/15 border border-[#c9a96e]/30 z-30">
                        <span className="text-[6px] md:text-[7px] tracking-[0.15em] uppercase text-[#c9a96e] font-[var(--font-inter)] font-medium">
                          {stage.badge}
                        </span>
                      </div>
                    )}
                  </TiltCard>

                  {/* Content — stage name, service, price, description */}
                  <div className="flex-1 p-3 md:p-4 flex flex-col justify-center min-w-0">
                    {/* Stage + Service name + Price */}
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)] font-medium">
                        {stage.stage}
                      </span>
                      <span className="text-[9px] text-[#8a8078]/50 font-[var(--font-inter)]">&mdash;</span>
                      <span className="text-[9px] tracking-[0.15em] uppercase text-[#8a8078]/60 font-[var(--font-inter)]">
                        {stage.name}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-3 flex-wrap mt-0.5">
                      <h3 className="font-[var(--font-cormorant)] text-lg md:text-xl text-[#f5f3f0] font-bold group-hover:text-[#c9a96e] transition-colors duration-500">
                        {stage.service}
                      </h3>
                      <span className="font-[var(--font-cormorant)] text-lg md:text-xl text-[#c9a96e] font-bold">
                        {stage.price}
                      </span>
                    </div>

                    <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078] font-[var(--font-inter)] mt-0.5">
                      {stage.duration}
                    </span>

                    <p className="mt-2 text-[11px] md:text-xs text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed line-clamp-2">
                      {stage.description}
                    </p>

                    {/* Bullets — compact */}
                    <ul className="mt-2 space-y-0.5 hidden md:block">
                      {stage.bullets.slice(0, 2).map((bullet, i) => (
                        <li key={i} className="text-[9px] text-[#8a8078]/60 font-[var(--font-inter)] font-light flex items-start gap-1.5">
                          <span className="w-1 h-1 bg-[#c9a96e]/30 rounded-full mt-1 shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* CTA — with spring hover */}
                    <motion.a
                      href="#assessment"
                      variants={ctaHover}
                      initial="rest"
                      whileHover="hover"
                      className="mt-3 inline-block self-start px-4 py-3 min-h-[44px] flex items-center text-[9px] tracking-[0.2em] uppercase border border-[#c9a96e]/30 text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-300 font-[var(--font-inter)] font-medium"
                    >
                      {stage.cta}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
