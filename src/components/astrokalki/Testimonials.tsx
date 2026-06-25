'use client';

import { motion } from 'framer-motion';
import { ThreadIcon } from './Icons';

const testimonials = [
  {
    quote:
      "He described patterns I never told anyone. Not general things — specific, exact patterns. I had to sit down.",
    author: 'R.K.',
    context: 'After Pattern Analysis — Mumbai',
    number: '01',
  },
  {
    quote:
      "It was never about the job or the relationship. It was the same pattern repeating. AstroKalki didn't give me a horoscope; they handed me the architecture of my own reality.",
    author: 'Anonymous',
    context: 'Pattern Snapshot Client',
    number: '02',
  },
  {
    quote:
      "This is not for the faint of heart. If you want spiritual bypassing, go elsewhere. If you want to actually break the karmic loop, this is the only methodology that works.",
    author: 'R. Mehta',
    context: 'Dharma Navigation',
    number: '03',
  },
];

const stats = [
  { value: '2,400+', label: 'Sessions Each One a Pattern Broken' },
  { value: '97%', label: 'Return Rate — They Come Back Because It Works' },
  { value: '12+', label: 'Years Vedic Meets Depth Psychology' },
  { value: '38 min', label: 'Avg Breakthrough From Confusion to Clarity' },
];

export default function Testimonials() {
  return (
    <section className="bg-[#080808] py-20 md:py-32 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center mb-4"
          >
            <ThreadIcon className="w-6 h-6 text-[#c9a96e]/40" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-[var(--font-cormorant)] text-2xl md:text-5xl font-light text-[#e8e0d4]"
          >
            After Not <span className="italic">Reviews</span>.{' '}
            <span className="text-[#8a8078]">Recognitions.</span>
          </motion.h2>
        </div>

        {/* Testimonial Quotes */}
        <div className="space-y-16 md:space-y-24">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:items-start' : 'md:items-end'
              } text-left`}
            >
              <span className="text-[10px] text-[#c9a96e]/30 font-[var(--font-inter)] tracking-[0.2em] mb-4">
                {t.number} / 06
              </span>
              <blockquote className="font-[var(--font-cormorant)] text-xl md:text-3xl lg:text-4xl font-light text-[#e8e0d4] leading-[1.3] max-w-3xl tracking-tight">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div
                className={`mt-5 flex flex-col ${
                  index % 2 === 0 ? 'md:items-start' : 'md:items-end'
                }`}
              >
                <span className="text-xs text-[#8a8078] font-[var(--font-inter)] tracking-wider uppercase">
                  {t.author}
                </span>
                <span className="text-[10px] text-[#c9a96e]/50 mt-1 font-[var(--font-inter)]">
                  {t.context}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-white/[0.04] pt-12 md:pt-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center md:text-left"
            >
              <p className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[#e8e0d4] font-light">
                {stat.value}
              </p>
              <p className="mt-2 text-[10px] tracking-[0.15em] text-[#8a8078] font-[var(--font-inter)] font-light uppercase leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
