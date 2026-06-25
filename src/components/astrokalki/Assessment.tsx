'use client';

import { motion } from 'framer-motion';
import { PathIcon } from './Icons';

export default function Assessment() {
  return (
    <section
      id="assessment"
      className="relative bg-[#0a0a0a] py-20 md:py-32 border-t border-white/[0.04] overflow-hidden"
    >
      {/* Subtle background image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(10,10,10,0), rgba(201,169,110,0.03), rgba(10,10,10,0))',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex justify-center mb-6 text-[#c9a96e]/50"
        >
          <PathIcon className="w-10 h-10" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-[var(--font-cormorant)] text-3xl md:text-6xl font-light text-[#e8e0d4]"
        >
          Your pattern has a <span className="italic">name</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 text-[#8a8078] text-sm md:text-base max-w-xl mx-auto font-[var(--font-inter)] font-light leading-relaxed"
        >
          Three questions. One truth you&apos;ve been avoiding. A 60-second reading. No chart
          required. Just honesty. Before you can break the cycle, you must see it. The
          assessment is the first step in your Dharma Navigation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-10"
        >
          <a
            href="#"
            className="inline-block px-10 py-5 text-[10px] tracking-[0.25em] uppercase bg-[#c9a96e]/90 text-[#050505] hover:bg-[#c9a96e] transition-all duration-500 font-[var(--font-inter)] font-medium"
          >
            Begin Intake
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-[10px] text-[#8a8078]/60 tracking-[0.15em] uppercase font-[var(--font-inter)]"
        >
          The question is not whether you are ready. It is whether you are willing to see.
        </motion.p>
      </div>
    </section>
  );
}
