'use client';

import { motion } from 'framer-motion';
import { EclipseIcon, MirrorIcon, PathIcon, WarriorIcon } from './Icons';

const methods = [
  {
    icon: EclipseIcon,
    number: '01',
    title: 'Vedic Pattern Mapping',
    description: 'Your birth chart is a map of what you came here to repeat. Every placement — a tendency. Every house — a room where something unfinished lives. Not what will happen. What keeps happening — until you see why.',
  },
  {
    icon: MirrorIcon,
    number: '02',
    title: 'Depth Psychology',
    description: 'Jungian shadow work meets attachment theory. The chart stops being symbolic and becomes personal. Every repeated heartbreak has a root. We don\'t read stars. We read the psyche they describe.',
  },
  {
    icon: PathIcon,
    number: '03',
    title: 'Shadow Integration',
    description: 'The parts you disown don\'t disappear. They choose your partners. They start your conflicts. They engineer your breakdowns. A pattern is not punishment — it is a loop that keeps returning until its original wound is finally seen.',
  },
  {
    icon: WarriorIcon,
    number: '04',
    title: 'Dharma Navigation',
    description: 'For the person standing at a threshold. No longer reacting to the pattern, but actively breaking the cycle. This is where insight becomes strategy, and strategy becomes a new architecture for living.',
  },
];

export default function Method() {
  return (
    <section id="method" className="bg-[#080808] py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header — compact */}
        <div className="max-w-xl mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3"
          >
            Not Prediction. Pattern Recognition.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-cormorant)] text-3xl md:text-5xl font-light text-[#f5f3f0] leading-[1.1]"
          >
            The <span className="italic">Method</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 text-sm text-[#8a8078] font-[var(--font-inter)] font-light"
          >
            Three lenses. One mirror. What has been happening — on a loop — and why you cannot see the exit.
          </motion.p>
        </div>

        {/* Editorial two-column alternating layouts */}
        <div className="space-y-0">
          {methods.map((method, index) => {
            const Icon = method.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-12 items-start py-8 md:py-10 border-t border-white/[0.04] group`}
              >
                {/* Number + Icon */}
                <div className="flex items-center gap-3 md:w-48 shrink-0">
                  <Icon className="w-5 h-5 text-[#c9a96e]/60" />
                  <span className="text-[10px] tracking-[0.15em] text-[#c9a96e]/40 font-[var(--font-inter)]">
                    {method.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-[var(--font-cormorant)] text-xl md:text-3xl text-[#f5f3f0] font-light group-hover:text-[#c9a96e] transition-colors duration-500">
                    {method.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed max-w-xl">
                    {method.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom quote — compact */}
        <div className="mt-8 py-8 border-t border-white/[0.04]">
          <blockquote className="font-[var(--font-cormorant)] text-lg md:text-2xl text-[#f5f3f0]/80 font-light italic max-w-2xl">
            &ldquo;You cannot heal what you will not face. You cannot face what you cannot see.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
