'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const phases = [
  {
    title: 'The Call',
    description: 'Something is wrong and you know it. The pattern has become impossible to ignore. Every exit leads back to the same room.',
  },
  {
    title: 'The Fall',
    description: 'The collapse. The relationship ends. The career implodes. The self-betrayal becomes undeniable. The pattern breaks you before you can break it.',
  },
  {
    title: 'The Shadow',
    description: 'You meet what you\'ve been running from. The disowned parts. The inherited wounds. The architecture of your own suffering, finally visible.',
  },
  {
    title: 'The Trial',
    description: 'The old pattern fights back. Self-sabotage intensifies. The nervous system resists change. This is where most people retreat. The warrior continues.',
  },
  {
    title: 'The Dharma',
    description: 'The pattern is named. The loop is seen. What was once an invisible prison becomes a map you can read — and finally exit.',
  },
  {
    title: 'The Return',
    description: 'Not the same person who entered. The pattern no longer runs you. You navigate by dharma, not by karma. The warrior returns transformed.',
  },
];

export default function WarriorsJourney() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden border-t border-white/[0.04]">
      {/* Warrior image as background anchor */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/warrior-journey.png"
          alt="The Warrior's Journey"
          fill
          className="object-cover object-center opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#050505]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="max-w-xl mb-10 md:mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3"
          >
            Warrior&apos;s Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-cormorant)] text-3xl md:text-5xl font-light text-[#f5f3f0] leading-[1.1]"
          >
            Not a spiritual journey.
            <br />
            A <span className="italic">warrior&apos;s</span> descent.
          </motion.h2>
        </div>

        {/* Documentary timeline — compact, horizontal on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="group border border-white/[0.06] p-5 bg-[#050505]/60 backdrop-blur-sm hover:border-[#c9a96e]/20 transition-colors duration-500"
            >
              <span className="text-[10px] tracking-[0.15em] text-[#c9a96e]/40 font-[var(--font-inter)] block mb-2">
                0{index + 1}
              </span>
              <h4 className="font-[var(--font-cormorant)] text-lg md:text-xl text-[#f5f3f0] font-light group-hover:text-[#c9a96e] transition-colors duration-500">
                {phase.title}
              </h4>
              <p className="mt-2 text-xs text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
