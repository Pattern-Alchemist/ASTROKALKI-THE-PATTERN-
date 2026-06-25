'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MirrorIcon } from './Icons';

const patterns = [
  {
    title: 'Heartbreak',
    rootCause: 'You keep choosing the same wound in a different body.',
    image: '/images/service-relationship.png',
    alt: 'Repeating heartbreak pattern',
  },
  {
    title: 'Sabotage',
    rootCause: 'Your intellect cannot override a nervous system trained to fail.',
    image: '/images/service-emotional.png',
    alt: 'Self-sabotage emotional pattern',
  },
  {
    title: 'Stagnation',
    rootCause: 'Success feels dangerous because visibility was never safe.',
    image: '/images/depth-psychology.png',
    alt: 'Purpose confusion stagnation',
  },
  {
    title: 'Masking',
    rootCause: 'You perform a version of yourself even you don\'t recognize.',
    image: '/images/shadow-work.png',
    alt: 'Emotional masking shadow pattern',
  },
];

export default function PatternMosaic() {
  return (
    <section className="bg-[#050505] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header — tight */}
        <div className="max-w-xl mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-3"
          >
            <MirrorIcon className="w-4 h-4 text-[#c9a96e]/70" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)]">
              The Recognition
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0] leading-[1.1]"
          >
            You are not stuck.
            <br />
            You are <span className="italic font-light">repeating</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light"
          >
            The loops you are living are not your destiny. They are your programming.
          </motion.p>
        </div>

        {/* Pattern Mosaic — 4 high-impact cinematic cards with hover reveal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {patterns.map((pattern, index) => (
            <motion.div
              key={pattern.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer border border-white/[0.04] hover:border-[#c9a96e]/25 transition-colors duration-500"
            >
              {/* Background image — blurs on default, sharpens on hover */}
              <Image
                src={pattern.image}
                alt={pattern.alt}
                fill
                className="object-cover blur-[2px] brightness-50 group-hover:blur-0 group-hover:brightness-75 transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Film grain */}
              <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

              {/* Default state: Title */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                <div className="transition-all duration-500">
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] block mb-1">
                    Pattern
                  </span>
                  <h4 className="font-[var(--font-cormorant)] text-xl md:text-2xl text-[#f5f3f0] font-bold tracking-[-0.01em] group-hover:text-[#c9a96e] transition-colors duration-500">
                    {pattern.title}
                  </h4>
                </div>

                {/* Hover state: Root cause appears */}
                <motion.p
                  className="mt-2 text-[11px] md:text-xs text-[#f5f3f0]/0 group-hover:text-[#f5f3f0]/80 font-[var(--font-inter)] font-light leading-snug transition-all duration-500 delay-100"
                >
                  {pattern.rootCause}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-center"
        >
          <a
            href="#assessment"
            className="inline-block px-6 py-3 text-[10px] tracking-[0.2em] uppercase bg-[#c9a96e] text-[#050505] font-[var(--font-inter)] font-semibold hover:bg-[#d4b87a] transition-all duration-300"
          >
            Which Pattern Is Yours?
          </a>
        </motion.div>
      </div>
    </section>
  );
}
