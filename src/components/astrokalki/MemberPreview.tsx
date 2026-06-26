'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from './hooks/useReducedMotion';
import { EASE } from './utils/animation';

/**
 * MemberPreview — compact teaser for the Pattern Intelligence System™.
 *
 * Replaces the sprawling 4-pillar × 11-tool layout on the homepage.
 * One card. One promise. One CTA. The tools still exist in code —
 * they live in the member dashboard (forthcoming), not on the homepage.
 *
 * The homepage's job is conversion to consultation, not feature showcase.
 */

const TOOLS = [
  { name: 'Daily Pattern', glyph: '⌫' },
  { name: 'Mirror', glyph: '◐' },
  { name: 'Reset', glyph: '○' },
  { name: 'Loop Detector', glyph: '⊗' },
  { name: 'Inner Voices', glyph: '◉' },
  { name: 'Pattern DNA', glyph: '✦' },
  { name: 'Pattern Biography', glyph: '📖' },
  { name: 'Weekly Intelligence', glyph: '✉' },
];

export default function MemberPreview() {
  const prefersReduced = useReducedMotion();
  const noMotion = prefersReduced ? { duration: 0 } : undefined;

  return (
    <section className="bg-[#080808] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={noMotion || { duration: 0.7, ease: EASE.outExpoLegacy }}
          className="text-center mb-8"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3">
            Member Dashboard · Forthcoming
          </p>
          <h2 className="font-[var(--font-cormorant)] text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#f5f3f0] leading-[1.1]">
            The Pattern Intelligence System™
          </h2>
          <p className="mt-3 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-xl mx-auto leading-relaxed">
            A daily operating system for self-awareness. Eleven tools, one engine, one evolving fingerprint. Available to members after their first consultation.
          </p>
        </motion.div>

        {/* Compact tool grid — icons only, no live components */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={noMotion || { duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-8 max-w-2xl mx-auto"
        >
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={noMotion ? undefined : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={noMotion || { duration: 0.3, delay: 0.3 + i * 0.05 }}
              className="aspect-square border border-white/[0.04] flex flex-col items-center justify-center gap-1 hover:border-[#c9a96e]/30 transition-colors"
            >
              <span className="text-[18px] text-[#c9a96e]/60">{tool.glyph}</span>
              <span className="text-[7px] text-[#8a8078]/60 font-[var(--font-inter)] text-center leading-tight px-1">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* The promise — one sentence */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={noMotion || { duration: 0.6, delay: 0.4 }}
          className="font-[var(--font-cormorant)] text-base md:text-lg text-[#f5f3f0]/70 italic text-center max-w-lg mx-auto leading-relaxed mb-6"
        >
          Most apps track what you do. The member dashboard reveals why you keep doing it.
        </motion.p>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#assessment"
            className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase border border-[#c9a96e]/40 text-[#c9a96e] font-[var(--font-inter)] font-semibold hover:bg-[#c9a96e]/10 transition-all duration-300"
          >
            Begin with a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
