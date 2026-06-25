'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MirrorIcon } from './Icons';

const patterns = [
  {
    number: '01',
    title: 'Repeating Heartbreak',
    description:
      'You keep choosing the same person in a different body. The heartbreak changes names. The pattern doesn\'t. Every relationship ends at the same emotional coordinate — not because of who they are, but because of what you keep recreating.',
  },
  {
    number: '02',
    title: 'Self-Sabotage',
    description:
      'You overthink everything and still make the same mistake. Your intellect cannot override your nervous system. You sabotage what you want most — not because you don\'t want it, but because you don\'t believe you\'re allowed to have it.',
  },
  {
    number: '03',
    title: 'Feeling Misunderstood',
    description:
      'You feel misunderstood by almost everyone. Because you perform a version of yourself even you don\'t recognize. The mask that once protected you now isolates you from the very connection you crave.',
  },
  {
    number: '04',
    title: 'Emotional Exhaustion',
    description:
      'You know something is wrong but you can\'t name it. The unnamed pattern is the one that controls you. Emotional exhaustion isn\'t about doing too much — it\'s about feeling too much without understanding why.',
  },
  {
    number: '05',
    title: 'Purpose Confusion',
    description:
      'Success feels unsafe when it finally arrives. You stand at a threshold, unable to see which direction is actually yours. The confusion isn\'t about options — it\'s about a karmic architecture that was never designed for your fulfillment.',
  },
];

export default function PatternRecognition() {
  return (
    <section
      id="pattern"
      className="bg-[#050505] py-20 md:py-32 border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#8a8078] mb-5"
          >
            <MirrorIcon className="w-4 h-4 text-[#c9a96e]/70" />
            The Framework
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-cormorant)] text-3xl xs:text-4xl md:text-6xl font-light text-[#e8e0d4] tracking-tight leading-[1.1]"
          >
            You are not living your life.
            <br />
            You are living your{' '}
            <span className="italic">pattern</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 text-[#8a8078] text-sm md:text-base font-[var(--font-inter)] font-light leading-relaxed max-w-xl"
          >
            The patterns you can&apos;t break are the ones you can&apos;t see. Which one feels familiar?
          </motion.p>
        </div>

        {/* Editorial Layout: Image Left, Text Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative aspect-[4/5] w-full overflow-hidden"
          >
            <Image
              src="/images/pattern-recognition.png"
              alt="Pattern recognition framework — decoding karmic loops"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 to-transparent" />
          </motion.div>

          <div className="flex flex-col justify-center">
            <h3 className="font-[var(--font-cormorant)] text-2xl md:text-4xl text-[#e8e0d4] font-light mb-5">
              The Anatomy of Repetition
            </h3>
            <p className="text-[#8a8078] text-sm md:text-base leading-relaxed font-[var(--font-inter)] font-light">
              A pattern is a karmic loop. It is the same lesson appearing through different
              faces, different jobs, and different crises. Until you recognize the architecture
              of the loop, you are merely an actor reading a script you did not write. The pattern
              has been running your entire life — and it will continue until you see it with
              the precision that AstroKalki provides.
            </p>
            <div className="mt-8 h-px w-12 bg-[#c9a96e]/40" />
          </div>
        </div>

        {/* Pattern List - Editorial Style */}
        <div className="space-y-0">
          {patterns.map((pattern, index) => (
            <motion.div
              key={pattern.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              className="group border-t border-white/[0.04] py-8 md:py-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-12 hover:border-white/[0.08] transition-colors duration-500"
            >
              <span className="text-[10px] tracking-[0.2em] text-[#c9a96e]/50 font-[var(--font-inter)] md:w-16 shrink-0 pt-1.5">
                {pattern.number}
              </span>
              <div className="flex-1">
                <h4 className="font-[var(--font-cormorant)] text-xl md:text-2xl text-[#e8e0d4] font-light group-hover:text-[#c9a96e] transition-colors duration-500">
                  {pattern.title}
                </h4>
                <p className="mt-3 text-[#8a8078] text-sm font-[var(--font-inter)] font-light leading-relaxed max-w-2xl">
                  {pattern.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial Layout: Text Left, Image Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mt-20 md:mt-28">
          <div className="flex flex-col justify-center md:order-1 order-2">
            <h3 className="font-[var(--font-cormorant)] text-2xl md:text-4xl text-[#e8e0d4] font-light mb-5">
              Karmic Psychology
            </h3>
            <p className="text-[#8a8078] text-sm md:text-base leading-relaxed font-[var(--font-inter)] font-light">
              This is not horoscope reading. This is the rigorous application of Vedic
              intelligence and Jungian depth work. We do not predict your future; we decode
              the psychological DNA of your past so the future can finally change. Every
              repeated heartbreak has a root. We don&apos;t read stars. We read the psyche
              they describe.
            </p>
            <div className="mt-8 h-px w-12 bg-[#c9a96e]/40" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative aspect-[4/5] w-full overflow-hidden md:order-2 order-1"
          >
            <Image
              src="/images/depth-psychology.png"
              alt="Karmic Psychology depth — Jungian shadow integration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
