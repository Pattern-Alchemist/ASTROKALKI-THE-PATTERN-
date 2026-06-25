'use client';

import { motion } from 'framer-motion';
import { PathIcon } from './Icons';

export default function Assessment() {
  return (
    <section id="assessment" className="bg-[#0a0a0a] py-12 md:py-16 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-5 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-3 text-[#c9a96e]/50"
        >
          <PathIcon className="w-7 h-7" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-[var(--font-cormorant)] text-xl md:text-3xl font-bold tracking-[-0.02em] text-[#f5f3f0]"
        >
          Your pattern has a <span className="italic font-light">name</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 text-xs text-[#8a8078] font-[var(--font-inter)] font-light max-w-md mx-auto"
        >
          Three questions. One truth you&apos;ve been avoiding.
          60 seconds. No chart required. Just honesty.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5"
        >
          <a
            href="#"
            className="inline-block px-8 py-4 text-[10px] tracking-[0.25em] uppercase bg-[#c9a96e] text-[#050505] font-[var(--font-inter)] font-semibold hover:bg-[#d4b87a] transition-all duration-300"
          >
            Begin Intake
          </a>
        </motion.div>
      </div>
    </section>
  );
}
