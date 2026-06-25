'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { EclipseIcon, MirrorIcon, PathIcon, WarriorIcon } from './Icons';

const steps = [
  {
    icon: EclipseIcon,
    title: 'Vedic Charts',
    desc: 'Your birth chart is a map of what you came here to repeat. Every placement — a tendency. Every house — a room where something unfinished lives. Not what will happen. What keeps happening — until you see why.',
    image: '/images/vedic-charts.png',
  },
  {
    icon: MirrorIcon,
    title: 'Depth Psychology',
    desc: 'Jungian shadow work meets attachment theory. The chart stops being symbolic and becomes personal. Every repeated heartbreak has a root. We don\'t read stars. We read the psyche they describe.',
    image: '/images/depth-psychology.png',
  },
  {
    icon: PathIcon,
    title: 'Pattern Recognition',
    desc: 'A pattern is not punishment. It is a loop — a behavior that keeps returning until its original wound is finally seen. We trace the thread. We find the knot. When the knot is seen, the loop begins to dissolve.',
    image: '/images/pattern-recognition.png',
  },
  {
    icon: WarriorIcon,
    title: 'Strategic Action',
    desc: 'Dharma navigation. No longer reacting to the pattern, but actively breaking the cycle. This is where insight becomes strategy, and strategy becomes a new architecture for living.',
    image: '/images/strategic-action.png',
  },
];

export default function Methodology() {
  return (
    <section
      id="method"
      className="relative bg-[#080808] py-20 md:py-32 overflow-hidden border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/60 mb-4"
          >
            Not Prediction. Pattern Recognition.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-cormorant)] text-3xl md:text-6xl font-light text-[#e8e0d4]"
          >
            The <span className="italic">Method</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4 text-[#8a8078] text-sm md:text-base font-[var(--font-inter)] font-light max-w-lg mx-auto"
          >
            Three lenses. One mirror. What has been happening — on a loop — and why you cannot see the exit.
          </motion.p>
        </div>

        {/* Visual Sequence */}
        <div className="space-y-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center py-12 md:py-20 border-t border-white/[0.04] group`}
              >
                {/* Image */}
                <div className="relative w-full md:w-1/2 aspect-[16/10] overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-[#080808]/30 group-hover:bg-transparent transition-colors duration-1000" />
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className="w-5 h-5 text-[#c9a96e]/70" />
                    <span className="text-[10px] text-[#8a8078] font-[var(--font-inter)] tracking-[0.2em]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="font-[var(--font-cormorant)] text-2xl md:text-4xl text-[#e8e0d4] font-light mb-4">
                    {step.title}
                  </h3>
                  <p className="text-[#8a8078] text-sm md:text-base leading-relaxed font-[var(--font-inter)] font-light">
                    {step.desc}
                  </p>
                  <div className="mt-6 h-px w-8 bg-[#c9a96e]/30 group-hover:w-12 transition-all duration-700" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mt-16 md:mt-24 text-center max-w-2xl mx-auto py-12 border-t border-b border-white/[0.04]"
        >
          <blockquote className="font-[var(--font-cormorant)] text-xl md:text-3xl text-[#e8e0d4] font-light italic leading-[1.4]">
            &ldquo;You cannot heal what you will not face. You cannot face what you cannot see.&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
