'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MirrorIcon } from './Icons';
import FilmGrain from './FilmGrain';
import TiltCard from './TiltCard';
import { useReducedMotion } from './hooks/useReducedMotion';
import { EASE, SPRING, cornerDelay } from './utils/animation';

const patterns = [
  {
    title: 'Repeating Heartbreak',
    description: 'Choosing the same ghost in different bodies.',
    triggers: ['To be seen and rejected', 'To absorb others\' projections and lose yourself', 'To repeat parental dynamics of validation-seeking'],
    image: '/images/mosaic-heartbreak.png',
    alt: 'Repeating heartbreak pattern — same ghost, different bodies',
  },
  {
    title: 'Self-Sabotage',
    description: 'Your intellect cannot override your nervous system.',
    triggers: ['Fear of full exposure or the "imposter" discovery', 'Unconscious guilt of outgrowing family origins', 'Recreating familiar chaos to avoid quiet expansion'],
    image: '/images/mosaic-sabotage.png',
    alt: 'Self-sabotage emotional pattern — nervous system override',
  },
  {
    title: 'The Glass Ceiling',
    description: 'Stagnation is a symptom of an invisible program.',
    triggers: ['Fear of absolute authority and responsibility', 'Equating peak success with sudden desertion', 'Stuck in the "helper" role instead of sovereign rule'],
    image: '/images/mosaic-ceiling.png',
    alt: 'Glass ceiling stagnation pattern — invisible program',
  },
  {
    title: 'The Mask',
    description: 'Performing a version of yourself you no longer recognize.',
    triggers: ['Equating performance with safety', 'Hiding vulnerability under hyper-competence', 'Terrified of stagnant silence without external applause'],
    image: '/images/mosaic-mask.png',
    alt: 'Emotional masking shadow pattern — the false self',
  },
];

export default function PatternMosaic() {
  const prefersReduced = useReducedMotion();
  const noMotion = prefersReduced ? { duration: 0 } : undefined;

  return (
    <section id="mosaic" className="bg-[#050505] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="max-w-xl mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={noMotion || { duration: 0.6 }}
            className="flex items-center gap-2 mb-3"
          >
            <MirrorIcon className="w-4 h-4 text-[#c9a96e]/70" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)]">
              The Diagnosis
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={noMotion || { duration: 0.7, ease: EASE.outExpoLegacy }}
            className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0] leading-[1.1]"
          >
            The architecture of your <span className="italic font-light">loop</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={noMotion || { duration: 0.6, delay: 0.15 }}
            className="mt-3 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light"
          >
            Every stagnation points to an invisible program operating beneath your nervous system.
            The loops you are living are not your destiny. They are your programming.
          </motion.p>
        </div>

        {/* Pattern Mosaic — 2x2 bento grid with 3D tilt + shadow triggers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {patterns.map((pattern, index) => (
            <motion.div
              key={pattern.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={noMotion || {
                ...SPRING.gentle,
                delay: cornerDelay(index, 0.1),
              }}
              style={{ perspective: 1000 }}
            >
              <TiltCard
                maxTilt={6}
                glareIntensity={0.06}
                hoverScale={1.01}
                className="group relative overflow-hidden border border-white/[0.04] hover:border-[#c9a96e]/20 transition-colors duration-500 cursor-pointer"
              >
                {/* Background image — blurs default, sharpens on hover */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={pattern.image}
                    alt={pattern.alt}
                    fill
                    loading="lazy"
                    className="object-cover blur-[2px] brightness-[0.3] group-hover:blur-0 group-hover:brightness-[0.5] transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-[#050505]/60 group-hover:bg-[#050505]/40 transition-colors duration-700" />
                </div>
                <FilmGrain opacity={0.08} />

                {/* Content */}
                <div className="relative z-10 p-6 md:p-8 min-h-[220px] md:min-h-[260px] flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)] block mb-2">
                      0{index + 1} &mdash; Loop Type
                    </span>
                    <h4 className="font-[var(--font-cormorant)] text-xl md:text-2xl text-[#f5f3f0] font-bold group-hover:text-[#c9a96e] transition-colors duration-500">
                      {pattern.title}
                    </h4>
                    <p className="mt-2 font-[var(--font-cormorant)] text-base text-[#f5f3f0]/70 italic font-light">
                      &ldquo;{pattern.description}&rdquo;
                    </p>
                  </div>

                  {/* Shadow triggers — always visible, highlights on hover */}
                  <div className="mt-5 pt-4 border-t border-white/[0.04] group-hover:border-[#c9a96e]/15 transition-colors duration-500">
                    <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)] block mb-1.5">
                      Shadow triggers:
                    </span>
                    <ul className="space-y-0.5">
                      {pattern.triggers.slice(0, 2).map((trigger, i) => (
                        <li key={i} className="text-[10px] md:text-[11px] text-[#8a8078]/70 group-hover:text-[#8a8078] font-[var(--font-inter)] font-light transition-colors duration-500">
                          {trigger}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={noMotion || { duration: 0.6 }}
          className="mt-8 text-center"
        >
          <a
            href="#assessment"
            className="inline-block px-6 py-3 text-[10px] tracking-[0.2em] uppercase bg-[#c9a96e] text-[#050505] font-[var(--font-inter)] font-semibold hover:bg-[#d4b87a] transition-all duration-300"
          >
            Which Pattern Is Yours?
          </a>
        </motion.div>
      </div>
    </section>
  );
}
