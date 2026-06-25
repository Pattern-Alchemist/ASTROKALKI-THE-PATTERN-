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
    <section className="bg-[#050505] py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-3"
          >
            <ThreadIcon className="w-5 h-5 text-[#c9a96e]/40" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] mb-2"
          >
            Not Reviews. Recognitions.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-light text-[#f5f3f0]"
          >
            After
          </motion.h2>
        </div>

        {/* Testimonials — editorial, typography-first */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              className="group"
            >
              <blockquote className="font-[var(--font-cormorant)] text-lg md:text-xl text-[#f5f3f0]/90 font-light leading-[1.4] italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-4 pt-4 border-t border-white/[0.04]">
                <span className="text-xs text-[#f5f3f0]/60 font-[var(--font-inter)] tracking-wider uppercase">
                  {t.author}
                </span>
                <span className="block text-[10px] text-[#c9a96e]/40 mt-1 font-[var(--font-inter)]">
                  {t.context}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats — compact row */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/[0.04] pt-8">
          {[
            { value: '2,400+', label: 'Patterns Decoded' },
            { value: '97%', label: 'Return Rate' },
            { value: '12+', label: 'Years Depth' },
            { value: '38 min', label: 'Avg Breakthrough' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="text-center"
            >
              <p className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[#f5f3f0] font-light">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] tracking-[0.1em] text-[#8a8078] font-[var(--font-inter)] font-light uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
