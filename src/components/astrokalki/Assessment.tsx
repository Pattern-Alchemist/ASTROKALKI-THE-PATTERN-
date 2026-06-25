'use client';

import { motion } from 'framer-motion';
import { PathIcon } from './Icons';

export default function Assessment() {
  return (
    <section id="assessment" className="bg-[#0a0a0a] py-16 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-5 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-4 text-[#c9a96e]/50"
        >
          <PathIcon className="w-8 h-8" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-light text-[#f5f3f0]"
        >
          Your pattern has a <span className="italic">name</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-3 text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-lg mx-auto"
        >
          Three questions. One truth you&apos;ve been avoiding.
          A 60-second reading. No chart required. Just honesty.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6"
        >
          <a
            href="#"
            className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase bg-[#c9a96e] text-[#050505] font-[var(--font-inter)] font-medium hover:bg-[#d4b87a] transition-all duration-300"
          >
            Begin Intake
          </a>
        </motion.div>
      </div>
    </section>
  );
}
