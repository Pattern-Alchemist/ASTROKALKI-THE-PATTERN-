'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DharmaNavigation() {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/dharma-navigation.png"
          alt="Dharma Navigation — Direction, Purpose, Path, Destiny"
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
            Dharma Navigation
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="font-[var(--font-cormorant)] text-3xl xs:text-4xl md:text-6xl font-light text-[#e8e0d4] leading-[1.05]"
          >
            Which direction is{' '}
            <span className="italic">actually</span> yours?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="mt-6 text-sm md:text-base text-[#e8e0d4]/80 font-[var(--font-inter)] font-light leading-relaxed"
          >
            For the person standing at a threshold, unable to see which direction is
            actually theirs. Dharma Navigation maps the cosmic architecture of your
            purpose — not what society expects of you, not what your family demands, but
            the path your chart was designed to walk. The confusion you feel is not
            indecision. It is the collision between your authentic direction and every
            borrowed expectation you have carried.
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
                Map Your Dharma
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
