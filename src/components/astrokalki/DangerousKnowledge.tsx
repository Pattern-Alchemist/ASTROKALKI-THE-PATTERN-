'use client';

import { motion } from 'framer-motion';
import { ThreadIcon } from './Icons';
import AnnotationLayer from './AnnotationLayer';
import { useReducedMotion } from './hooks/useReducedMotion';
import { EASE, SPRING } from './utils/animation';
import { openWhatsAppModal } from '@/lib/whatsapp-modal';

const articles = [
  {
    category: 'Trauma Bonding',
    title: 'The Mother Wound in the Chart',
    excerpt: 'How parental conditioning becomes karmic architecture — and why you keep recreating the same emotional dynamic with every partner.',
    readTime: '8 min',
  },
  {
    category: 'Shadow Work',
    title: 'Why We Choose the Same Heartbreak',
    excerpt: 'The neurochemistry of intermittent reinforcement — the same mechanism that keeps gamblers addicted is running your love life.',
    readTime: '7 min',
  },
  {
    category: 'Pattern Recognition',
    title: "You Didn't Choose This Pain. But You Keep Choosing It.",
    excerpt: 'The first time was karma. The second time was a pattern. The third time is a choice your unconscious is making on your behalf.',
    readTime: '7 min',
  },
];

export default function DangerousKnowledge() {
  const prefersReduced = useReducedMotion();
  const noMotion = prefersReduced ? { duration: 0 } : undefined;

  return (
    <section id="dangerous-knowledge" className="bg-[#080808] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header — Magazine style */}
        <div className="flex items-start justify-between gap-6 mb-10 md:mb-14 flex-wrap">
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={noMotion || { duration: 0.6 }}
              className="flex items-center gap-2 mb-3"
            >
              <ThreadIcon className="w-4 h-4 text-[#c9a96e]/60" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)]">
                Dangerous Knowledge
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={noMotion || { duration: 0.7, ease: EASE.outExpoLegacy }}
              className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0] leading-[1.1]"
            >
              Read only if you&apos;re ready to stop <span className="italic font-light">pretending</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={noMotion || { duration: 0.6, delay: 0.1 }}
            className="text-xs text-[#8a8078] font-[var(--font-inter)] font-light max-w-xs pt-8"
          >
            <AnnotationLayer>
              Breakthrough insights rooted in psychology and karma. Where trauma, shadow work, and attachment theory are not just concepts — they are decoded and transformed. Click highlighted terms for clinical annotations.
            </AnnotationLayer>
          </motion.div>
        </div>

        {/* Annotation hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={noMotion || { duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="text-[#c9a96e]/40 text-[8px] font-[var(--font-inter)]">✦</span>
          <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/40 font-[var(--font-inter)]">
            Click gold-highlighted terms for clinical annotations
          </span>
        </motion.div>

        {/* Magazine grid — featured first, then 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {articles.map((article, index) => (
            <motion.div
              key={article.title}
              onClick={() => openWhatsAppModal(`Article enquiry: "${article.title}"`)}
              style={{ cursor: 'pointer' }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={noMotion || {
                ...SPRING.gentle,
                delay: index * 0.04,
              }}
              className={`group border border-white/[0.04] p-5 hover:border-[#c9a96e]/15 transition-colors duration-500 ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)] font-medium">
                  {article.category}
                </span>
                <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)]">
                  {article.readTime}
                </span>
              </div>
              <h4 className="font-[var(--font-cormorant)] text-base md:text-lg text-[#f5f3f0] font-bold tracking-[-0.01em] group-hover:text-[#c9a96e] transition-colors duration-500 leading-snug">
                {article.title}
              </h4>
              <div className="mt-2 text-[11px] text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed line-clamp-3">
                <AnnotationLayer>
                  {article.excerpt}
                </AnnotationLayer>
              </div>
              <span className="mt-3 inline-block text-[9px] tracking-[0.15em] uppercase text-[#c9a96e]/50 group-hover:text-[#c9a96e] transition-colors duration-500 font-[var(--font-inter)] font-medium">
                Read &rarr;
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
