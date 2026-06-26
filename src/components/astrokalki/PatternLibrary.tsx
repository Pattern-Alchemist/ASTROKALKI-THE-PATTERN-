'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PATTERN_ARTICLES, PatternArticle } from '@/lib/pattern-articles';
import { openWhatsAppModal } from '@/lib/whatsapp-modal';

/**
 * PatternLibrary — the cornerstone SEO content section.
 *
 * 15 articles on recurring psychological patterns. Each article
 * is expandable (accordion style) for the homepage, but the content
 * is structured for future extraction into individual crawlable pages.
 *
 * This is the content that owns the "Behavioral Pattern Intelligence"
 * category on Google.
 */

export default function PatternLibrary() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(PATTERN_ARTICLES.map(a => a.category)))];
  const filtered = filter === 'All' ? PATTERN_ARTICLES : PATTERN_ARTICLES.filter(a => a.category === filter);

  return (
    <section id="pattern-library" className="bg-[#080808] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3">
            Pattern Library
          </p>
          <h2 className="font-[var(--font-cormorant)] text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#f5f3f0] mb-3">
            The patterns that run your life — <span className="italic font-light text-[#c9a96e]">decoded.</span>
          </h2>
          <p className="text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-xl leading-relaxed">
            Fifteen recurring psychological patterns. Each one explains why you keep doing what you do — and how to interrupt the loop. Tap any pattern to read.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-[9px] tracking-[0.15em] uppercase font-[var(--font-inter)] font-medium border transition-all ${
                filter === cat
                  ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5'
                  : 'border-white/[0.04] text-[#8a8078]/60 hover:border-white/[0.1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles accordion */}
        <div className="space-y-2">
          {filtered.map((article, index) => (
            <PatternArticleCard
              key={article.slug}
              article={article}
              isExpanded={expandedSlug === article.slug}
              onToggle={() => setExpandedSlug(expandedSlug === article.slug ? null : article.slug)}
              index={index}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-[10px] text-[#8a8078]/60 font-[var(--font-inter)] font-light mb-3">
            Recognize yourself in one of these patterns? That recognition is the first step.
          </p>
          <button
            onClick={() => openWhatsAppModal()}
            className="inline-block px-6 py-3 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-semibold border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all"
          >
            Book a Pattern Decode Session
          </button>
        </div>
      </div>
    </section>
  );
}

function PatternArticleCard({
  article,
  isExpanded,
  onToggle,
  index,
}: {
  article: PatternArticle;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
      className="border border-white/[0.04] bg-[#050505]"
    >
      {/* Header (clickable) */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[7px] tracking-[0.2em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)] font-medium">
              {article.category}
            </span>
            <span className="text-[7px] text-[#8a8078]/40 font-[var(--font-inter)]">·</span>
            <span className="text-[7px] text-[#8a8078]/40 font-[var(--font-inter)]">{article.readTime}</span>
          </div>
          <h3 className="font-[var(--font-cormorant)] text-base md:text-lg text-[#f5f3f0] font-bold leading-snug">
            {article.title}
          </h3>
        </div>
        <span className={`text-[#c9a96e] text-xl shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-white/[0.04]">
              {article.content.map((section, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <h4 className="font-[var(--font-cormorant)] text-sm text-[#c9a96e] font-bold mb-2">
                    {section.heading}
                  </h4>
                  {section.body.map((para, j) => (
                    <p key={j} className="text-[11px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed mb-2 last:mb-0">
                      {para}
                    </p>
                  ))}
                </div>
              ))}
              <button
                onClick={() => openWhatsAppModal(`Pattern enquiry: "${article.title}"`)}
                className="mt-3 text-[9px] tracking-[0.2em] uppercase text-[#c9a96e]/70 hover:text-[#c9a96e] font-[var(--font-inter)] font-medium"
              >
                Work on this pattern →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
