'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from './hooks/useReducedMotion';
import { EASE, SPRING } from './utils/animation';

const faqs = [
  {
    q: 'Is this astrology?',
    a: 'No. Most astrology tells you what will happen. AstroKalki shows you why the same things keep happening. This is pattern recognition, not prediction. We decode the invisible architecture beneath your repeating experiences — the loops you cannot see because you are inside them. Think of it as diagnostic intelligence, not fortune telling.',
  },
  {
    q: 'How is this different from therapy?',
    a: 'Therapy works with the conscious mind over time. AstroKalki works with the unconscious architecture immediately. Your karmic blueprint reveals patterns that took therapy years to uncover — if they ever did. This is not instead of therapy. It is what makes therapy finally work.',
  },
  {
    q: 'What do I need to provide for a session?',
    a: 'Your date of birth, time of birth, and place of birth. The more accurate the time, the deeper the diagnostic. If you do not know your exact birth time, we can still work with a window — but some patterns may be less precise.',
  },
  {
    q: 'Do I need to believe in anything for this to work?',
    a: 'No. You do not need to believe in gravity for it to affect you. The patterns in your psychological architecture exist whether you acknowledge them or not. Skeptics often have the most powerful breakthroughs because their resistance dissolves when confronted with specificity.',
  },
  {
    q: 'How long until I see results?',
    a: 'Immediately. Most clients report that the recognition happens during the session itself — the moment a pattern is named, it loses its invisible power over you. The integration continues for weeks and months after, but the shift begins the moment you see what was hidden.',
  },
  {
    q: 'Are sessions confidential?',
    a: 'Absolutely. Everything shared in a session remains completely confidential. Your patterns, your revelations, your diagnostic data — they stay between us. Privacy is not just policy. It is sacred.',
  },
  {
    q: 'What if I want to go deeper after the first session?',
    a: 'That is common. The first session reveals the architecture. Subsequent sessions go deeper into specific patterns, karmic loops, and shadow work. Many clients return because each layer reveals new depth. The work deepens as you do.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-[#050505] py-20 md:py-32 border-t border-white/[0.04]">
      <div className="max-w-3xl mx-auto px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReduced ? { duration: 0 } : { duration: 1, ease: EASE.outExpoLegacy }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/60 mb-4">
            Before You Step Through the Threshold
          </p>
          <h2 className="font-[var(--font-cormorant)] text-3xl md:text-5xl font-bold tracking-[-0.02em] text-[#f5f3f0]">
            Questions
          </h2>
        </motion.div>

        <div className="flex flex-col gap-px bg-white/[0.03]" role="list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={index} className="bg-[#050505]" role="listitem">
                <button
                  id={buttonId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex justify-between items-start text-left py-5 md:py-6 group"
                >
                  <span
                    className={`font-[var(--font-cormorant)] text-lg md:text-xl font-light transition-colors duration-500 pr-8 ${
                      isOpen
                        ? 'text-[#c9a96e]'
                        : 'text-[#e8e0d4]/80 group-hover:text-[#e8e0d4]'
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`text-xl text-[#8a8078] transition-transform duration-500 shrink-0 mt-1 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        prefersReduced
                          ? { duration: 0 }
                          : { ...SPRING.stiff }
                      }
                      className="overflow-hidden"
                    >
                      <p className="pb-5 md:pb-6 pr-10 text-[#8a8078] text-sm font-[var(--font-inter)] font-light leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
