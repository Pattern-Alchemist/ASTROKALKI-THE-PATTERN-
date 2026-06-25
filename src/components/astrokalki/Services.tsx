'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ThreadIcon } from './Icons';

const services = [
  {
    number: 'I',
    name: 'Pattern Snapshot',
    description:
      'A quick 20-minute reading to identify your core repeating pattern. Perfect for those wanting a clear diagnosis before committing to deeper work. We name the pattern that has been running beneath every relationship, every crisis, every self-betrayal.',
    price: '₹999',
    duration: '20 min',
    image: '/images/service-pattern.png',
    cta: 'Book Snapshot',
    highlight: false,
  },
  {
    number: 'II',
    name: 'Relationship Decode',
    description:
      'Why you keep attracting the same dynamic. Why you stay when you should leave. The same wound, the same face, the same exit you never take. This session maps the relational architecture that keeps choosing your partners for you.',
    price: '₹1,999',
    duration: '60 min',
    image: '/images/service-relationship.png',
    cta: 'Book Session',
    highlight: false,
  },
  {
    number: 'III',
    name: 'Emotional Pattern Decode',
    description:
      'Why you feel too much. Why you feel nothing. Why the wrong feeling arrives at the wrong time — and where it learned to do that. This is the deepest work — decoding the emotional operating system that runs beneath your awareness.',
    price: '₹2,999',
    duration: '90 min',
    image: '/images/service-emotional.png',
    cta: 'Begin Deep Work',
    highlight: true,
  },
  {
    number: 'IV',
    name: 'Shadow Session',
    description:
      'The parts you disown don\'t disappear. They choose your partners. They start your conflicts. They engineer your breakdowns. We meet them. Jungian shadow work meets Vedic chart architecture for the most confrontational session available.',
    price: '₹2,999',
    duration: '90 min',
    image: '/images/service-shadow.png',
    cta: 'Book Session',
    highlight: false,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#050505] py-20 md:py-32 border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/60 mb-4 block"
          >
            The Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-cormorant)] text-3xl md:text-6xl font-light text-[#e8e0d4]"
          >
            Why does the same pain{' '}
            <span className="italic">keep</span> changing faces?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-5 text-[#8a8078] text-sm md:text-base font-[var(--font-inter)] font-light"
          >
            Clear pricing. Uncompromising depth. Select your entry point.
          </motion.p>
        </div>

        {/* Quick Start Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 inline-flex items-center gap-2 px-4 py-2 border border-white/[0.06] text-[10px] tracking-[0.2em] uppercase text-[#8a8078]"
        >
          <ThreadIcon className="w-3 h-3 text-[#c9a96e]/60" />
          Quick Start
        </motion.div>

        {/* Services as Luxury Editorial Spreads */}
        <div className="space-y-20 md:space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 md:gap-16 items-center`}
            >
              {/* Image Spread */}
              <div className="relative w-full md:w-1/2 aspect-[4/5] overflow-hidden group">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#050505]/20 group-hover:bg-transparent transition-colors duration-1000" />
                {service.highlight && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#c9a96e]/10 border border-[#c9a96e]/30">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-[#c9a96e] font-[var(--font-inter)]">
                      Deepest Work
                    </span>
                  </div>
                )}
              </div>

              {/* Narrative & Price */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.2em] text-[#c9a96e]/40 font-[var(--font-inter)] mb-3">
                  {service.number}
                </span>
                <h3 className="font-[var(--font-cormorant)] text-2xl md:text-5xl font-light text-[#e8e0d4] tracking-tight">
                  {service.name}
                </h3>
                <p className="mt-5 text-[#8a8078] text-sm md:text-base leading-relaxed font-[var(--font-inter)] font-light">
                  {service.description}
                </p>

                <div className="mt-8 flex items-center gap-6 md:gap-8 flex-wrap">
                  <span className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[#c9a96e]/90">
                    {service.price}
                  </span>
                  <span className="text-[10px] tracking-[0.15em] text-[#8a8078] font-[var(--font-inter)] uppercase">
                    {service.duration}
                  </span>
                </div>

                <div className="mt-6">
                  <a
                    href="#assessment"
                    className="inline-block px-6 py-3 text-[10px] tracking-[0.25em] uppercase border border-white/[0.12] text-[#e8e0d4] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-500 font-[var(--font-inter)]"
                  >
                    {service.cta}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Membership Tier */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mt-24 md:mt-32 border-t border-white/[0.04] pt-16 md:pt-24"
        >
          <div className="max-w-3xl">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/60 mb-3 block">
              Commitment
            </span>
            <h3 className="font-[var(--font-cormorant)] text-2xl md:text-4xl text-[#e8e0d4] font-light mb-2">
              Pattern Decoder Monthly
            </h3>
            <p className="text-[#8a8078] text-sm font-[var(--font-inter)] font-light leading-relaxed max-w-xl mb-6">
              Weekly pattern insights delivered to your inbox, plus priority booking when
              you need deeper work. Choose your depth of knowing.
            </p>

            <div className="flex items-center gap-6 flex-wrap">
              <span className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[#c9a96e]/90">
                ₹999<span className="text-base text-[#8a8078]">/month</span>
              </span>
              <a
                href="#assessment"
                className="inline-block px-6 py-3 text-[10px] tracking-[0.25em] uppercase border border-white/[0.12] text-[#e8e0d4] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-500 font-[var(--font-inter)]"
              >
                Start Monthly
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              {[
                'Weekly pattern insights',
                'Priority booking access',
                'Monthly pattern reports',
                'Member-only reflections',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[11px] text-[#8a8078] font-[var(--font-inter)] font-light">
                  <span className="w-1 h-1 bg-[#c9a96e]/50 rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
