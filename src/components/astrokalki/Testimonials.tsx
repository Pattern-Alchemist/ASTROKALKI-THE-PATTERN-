'use client';

import { motion } from 'framer-motion';
import { ThreadIcon } from './Icons';

const testimonials = [
  {
    quote: "He described patterns I never told anyone. Not general things — specific, exact patterns. I had to sit down.",
    author: 'R.K.',
    context: 'After Pattern Analysis — Mumbai',
  },
  {
    quote: "It was never about the job or the relationship. It was the same pattern repeating. AstroKalki didn't give me a horoscope; they handed me the architecture of my own reality.",
    author: 'Anonymous',
    context: 'Pattern Snapshot Client',
  },
  {
    quote: "This is not for the faint of heart. If you want spiritual bypassing, go elsewhere. If you want to actually break the karmic loop, this is the only methodology that works.",
    author: 'R. Mehta',
    context: 'Dharma Navigation',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#050505] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-10 md:mb-14 flex-wrap">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-3"
            >
              <ThreadIcon className="w-4 h-4 text-[#c9a96e]/40" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)]">
                Not Reviews. Recognitions.
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0]"
            >
              After
            </motion.h2>
          </div>
        </div>

        {/* Testimonials — editorial, typography-first */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="group border border-white/[0.04] p-5"
            >
              <blockquote className="font-[var(--font-cormorant)] text-base md:text-lg text-[#f5f3f0]/90 font-light leading-[1.4] italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-4 pt-3 border-t border-white/[0.04]">
                <span className="text-[10px] text-[#f5f3f0]/60 font-[var(--font-inter)] tracking-wider uppercase font-medium">
                  {t.author}
                </span>
                <span className="block text-[9px] text-[#c9a96e]/40 mt-0.5 font-[var(--font-inter)]">
                  {t.context}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats — compact row */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-white/[0.04] pt-6">
          {[
            { value: '2,400+', label: 'Patterns Decoded' },
            { value: '97%', label: 'Return Rate' },
            { value: '12+', label: 'Years Depth' },
            { value: '38 min', label: 'Avg Breakthrough' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="text-center py-2"
            >
              <p className="font-[var(--font-cormorant)] text-xl md:text-2xl text-[#f5f3f0] font-bold">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[9px] tracking-[0.1em] text-[#8a8078] font-[var(--font-inter)] font-light uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
