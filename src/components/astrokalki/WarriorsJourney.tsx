'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WarriorsJourney() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/warrior-journey.png"
          alt="The Warrior's Journey — Mythic Transformative Path"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 cinematic-overlay-left" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12">
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 mb-4 block"
          >
            Phase III
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="font-[var(--font-cormorant)] text-3xl xs:text-4xl md:text-7xl font-light text-[#e8e0d4] leading-[1.05]"
          >
            The Warrior&apos;s{' '}
            <span className="italic">Journey</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="mt-6 text-sm md:text-base text-[#e8e0d4]/80 font-[var(--font-inter)] font-light leading-relaxed"
          >
            This is not spiritual coaching. It is the rigorous confrontation with your own
            shadow. We strip away the fantasy to reveal the truth of your pattern. The journey
            is mythic, mature, and transformative — designed for those who have exhausted every
            surface-level solution and are finally ready to descend to the root.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="mt-4 text-sm md:text-base text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed"
          >
            The warrior does not bypass the darkness. The warrior walks through it with eyes
            open. This is where karmic architecture becomes visible, and what was once an
            invisible prison becomes a map you can finally read — and exit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-10"
          >
            <a
              href="#services"
              className="group inline-flex items-center gap-3 text-[#e8e0d4] border-b border-[#c9a96e]/30 pb-2 hover:border-[#c9a96e] transition-colors duration-500"
            >
              <span className="text-[10px] tracking-[0.25em] uppercase font-[var(--font-inter)]">
                Continue the Path
              </span>
              <span className="transition-transform group-hover:translate-x-1 duration-500">
                &rarr;
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
