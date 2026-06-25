'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    number: 'I',
    name: 'Pattern Snapshot',
    description: 'A quick 20-minute reading to identify your core repeating pattern. Perfect for those wanting a clear diagnosis before committing to deeper work. We name the pattern that has been running beneath every relationship, every crisis, every self-betrayal.',
    price: '₹999',
    duration: '20 min',
    image: '/images/service-pattern.png',
    cta: 'Book Snapshot',
    tag: 'Quick Start',
  },
  {
    number: 'II',
    name: 'Relationship Decode',
    description: 'Why you keep attracting the same dynamic. Why you stay when you should leave. The same wound, the same face, the same exit you never take. This session maps the relational architecture that keeps choosing your partners for you.',
    price: '₹1,999',
    duration: '60 min',
    image: '/images/service-relationship.png',
    cta: 'Book Session',
    tag: null,
  },
  {
    number: 'III',
    name: 'Emotional Pattern Decode',
    description: 'Why you feel too much. Why you feel nothing. Why the wrong feeling arrives at the wrong time — and where it learned to do that. Deepest work: decoding the emotional operating system that runs beneath your awareness.',
    price: '₹2,999',
    duration: '90 min',
    image: '/images/service-emotional.png',
    cta: 'Begin Deep Work',
    tag: 'Deepest Work',
  },
  {
    number: 'IV',
    name: 'Shadow Session',
    description: 'The parts you disown don\'t disappear. They choose your partners. They start your conflicts. They engineer your breakdowns. We meet them. Jungian shadow work meets Vedic chart architecture for the most confrontational session available.',
    price: '₹2,999',
    duration: '90 min',
    image: '/images/service-shadow.png',
    cta: 'Book Session',
    tag: null,
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#050505] py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header — services are REVENUE, make them prominent */}
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3"
          >
            The Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-cormorant)] text-3xl md:text-5xl font-light text-[#f5f3f0]"
          >
            Choose your depth of <span className="italic">knowing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 text-sm text-[#8a8078] font-[var(--font-inter)] font-light"
          >
            Each session is a precision diagnostic. Clear pricing. Uncompromising depth.
          </motion.p>
        </div>

        {/* Services as luxury editorial spreads — compact but premium */}
        <div className="space-y-6 md:space-y-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`group border border-white/[0.04] hover:border-[#c9a96e]/20 transition-colors duration-500 overflow-hidden ${
                service.tag === 'Deepest Work' ? 'border-[#c9a96e]/15' : ''
              }`}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Image — compact aspect */}
                <div className="relative w-full md:w-2/5 aspect-[16/10] md:aspect-auto md:min-h-[280px] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-[#050505]/15 group-hover:bg-transparent transition-colors duration-700" />
                  {service.tag && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#c9a96e]/15 border border-[#c9a96e]/30">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-[#c9a96e] font-[var(--font-inter)]">
                        {service.tag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content — pricing FRONT AND CENTER */}
                <div className="flex-1 p-5 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] tracking-[0.15em] text-[#c9a96e]/40 font-[var(--font-inter)]">
                      {service.number}
                    </span>
                  </div>
                  <h3 className="font-[var(--font-cormorant)] text-xl md:text-3xl font-light text-[#f5f3f0] group-hover:text-[#c9a96e] transition-colors duration-500">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed">
                    {service.description}
                  </p>

                  {/* Price + CTA — always visible */}
                  <div className="mt-5 flex items-center gap-5 flex-wrap">
                    <span className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[#c9a96e]">
                      {service.price}
                    </span>
                    <span className="text-[10px] tracking-[0.1em] text-[#8a8078] font-[var(--font-inter)] uppercase">
                      {service.duration}
                    </span>
                    <a
                      href="#assessment"
                      className="ml-auto px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-300 font-[var(--font-inter)]"
                    >
                      {service.cta}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Membership — compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8 border border-white/[0.04] p-5 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-[var(--font-cormorant)] text-xl md:text-2xl text-[#f5f3f0] font-light">
                Pattern Decoder <span className="italic">Monthly</span>
              </h3>
              <p className="mt-1 text-xs text-[#8a8078] font-[var(--font-inter)] font-light">
                Weekly pattern insights, priority booking, monthly reports, member-only reflections.
              </p>
            </div>
            <div className="flex items-center gap-5">
              <span className="font-[var(--font-cormorant)] text-2xl text-[#c9a96e]">
                ₹999<span className="text-sm text-[#8a8078]">/mo</span>
              </span>
              <a
                href="#assessment"
                className="px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-300 font-[var(--font-inter)]"
              >
                Start Monthly
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
