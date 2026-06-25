'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MirrorIcon } from './Icons';

const recognitions = [
  {
    title: 'Relationship Patterns',
    description: 'You keep choosing the same person in a different body. The heartbreak changes names. The pattern doesn\'t.',
  },
  {
    title: 'Self-Sabotage',
    description: 'You overthink everything and still make the same mistake. Your intellect cannot override your nervous system.',
  },
  {
    title: 'Emotional Loops',
    description: 'You feel too much. Or nothing. The wrong feeling arrives at the wrong time — and you don\'t know where it learned to do that.',
  },
  {
    title: 'Purpose Confusion',
    description: 'Success feels unsafe when it finally arrives. You stand at a threshold, unable to see which direction is actually yours.',
  },
  {
    title: 'Toxic Attachments',
    description: 'It is not love that pulls you back. It is the neurochemistry of intermittent reinforcement — the same mechanism that keeps gamblers addicted.',
  },
];

export default function Recognition() {
  return (
    <section id="recognition" className="bg-[#050505] py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Two-column: Image left, statement right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-14">
          {/* Shadow reflection image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative aspect-[4/3] w-full overflow-hidden"
          >
            <Image
              src="/images/shadow-work.png"
              alt="Shadow reflection — confronting your pattern"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/30" />
          </motion.div>

          {/* The statement */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-2 mb-4"
            >
              <MirrorIcon className="w-4 h-4 text-[#c9a96e]/70" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)]">The Recognition</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-[var(--font-cormorant)] text-3xl md:text-5xl font-light text-[#f5f3f0] leading-[1.1]"
            >
              You are not stuck.
              <br />
              You are <span className="italic">repeating</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-4 text-sm text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed"
            >
              The same pain keeps changing faces because the pattern beneath it has never been named.
              This section is about self-recognition — seeing what you&apos;ve been living inside.
            </motion.p>
          </div>
        </div>

        {/* Recognition list — compact, scannable */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
          {recognitions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="group border border-white/[0.04] p-5 hover:border-[#c9a96e]/20 transition-colors duration-500"
            >
              <h4 className="font-[var(--font-cormorant)] text-lg md:text-xl text-[#f5f3f0] font-light group-hover:text-[#c9a96e] transition-colors duration-500">
                {item.title}
              </h4>
              <p className="mt-2 text-xs text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mid-page assessment CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-[#8a8078] font-[var(--font-inter)] mb-3">
            Which pattern feels familiar?
          </p>
          <a
            href="#assessment"
            className="inline-block px-6 py-3 text-[10px] tracking-[0.25em] uppercase bg-[#c9a96e] text-[#050505] font-[var(--font-inter)] font-medium hover:bg-[#d4b87a] transition-all duration-300"
          >
            Begin Analysis
          </a>
        </motion.div>
      </div>
    </section>
  );
}
