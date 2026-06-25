'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    name: 'Pattern Snapshot',
    price: '₹999',
    duration: '20-Minute Diagnostic',
    description: 'A precise diagnostic. Name the pattern running beneath every relationship, every crisis, every self-betrayal.',
    image: '/images/service-pattern.png',
    cta: 'Book Decode',
  },
  {
    name: 'Relationship Decode',
    price: '₹1,999',
    duration: '60-Minute Diagnostic',
    description: 'Why you keep attracting the same dynamic. Why you stay when you should leave. The architecture of your relational loop.',
    image: '/images/service-relationship.png',
    cta: 'Book Decode',
  },
  {
    name: 'Emotional Pattern Decode',
    price: '₹2,999',
    duration: '90-Minute Deep Work',
    description: 'Why the wrong feeling arrives at the wrong time — and where it learned to do that. The deepest diagnostic available.',
    image: '/images/service-emotional.png',
    cta: 'Book Decode',
    featured: true,
  },
  {
    name: 'Shadow Session',
    price: '₹2,999',
    duration: '90-Minute Deep Work',
    description: 'The parts you disown choose your partners, start your conflicts, engineer your breakdowns. We map them.',
    image: '/images/service-shadow.png',
    cta: 'Book Decode',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#050505] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3"
          >
            The Diagnostic Menu
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0]"
          >
            Choose your depth of <span className="italic font-light">knowing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 text-xs text-[#8a8078] font-[var(--font-inter)] font-light"
          >
            Each session is a pattern diagnostic. Clear pricing. No hidden tiers.
          </motion.p>
        </div>

        {/* 2x2 Grid — Luxury Consultant Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={`group border ${service.featured ? 'border-[#c9a96e]/20' : 'border-white/[0.04]'} hover:border-[#c9a96e]/25 transition-colors duration-500 overflow-hidden`}
            >
              <div className="flex flex-row">
                {/* Small square cinematic image */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="128px"
                  />
                  {/* Film grain */}
                  <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
                  {service.featured && (
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-[#c9a96e]/15 border border-[#c9a96e]/30">
                      <span className="text-[7px] tracking-[0.2em] uppercase text-[#c9a96e] font-[var(--font-inter)] font-medium">
                        Deepest
                      </span>
                    </div>
                  )}
                </div>

                {/* Content — price front and center */}
                <div className="flex-1 p-4 md:p-5 flex flex-col justify-center min-w-0">
                  {/* Name + Price on same line — like a restaurant menu */}
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="font-[var(--font-cormorant)] text-lg md:text-xl text-[#f5f3f0] font-bold tracking-[-0.01em] group-hover:text-[#c9a96e] transition-colors duration-500">
                      {service.name}
                    </h3>
                    <span className="font-[var(--font-cormorant)] text-lg md:text-xl text-[#c9a96e] font-bold">
                      {service.price}
                    </span>
                  </div>

                  {/* Duration */}
                  <span className="text-[9px] tracking-[0.15em] uppercase text-[#8a8078] font-[var(--font-inter)] mt-0.5">
                    {service.duration}
                  </span>

                  {/* Description — 2 lines sharp */}
                  <p className="mt-2 text-[11px] md:text-xs text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed line-clamp-2">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <a
                    href="#assessment"
                    className="mt-3 inline-block self-start px-4 py-3 min-h-[44px] flex items-center text-[9px] tracking-[0.2em] uppercase border border-[#c9a96e]/30 text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-300 font-[var(--font-inter)] font-medium"
                  >
                    {service.cta}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Membership — compact bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-4 border border-white/[0.04] p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-[#c9a96e]/15 transition-colors duration-500"
        >
          <div className="flex items-baseline gap-3">
            <h4 className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold">
              Pattern Decoder <span className="italic font-light">Monthly</span>
            </h4>
            <span className="font-[var(--font-cormorant)] text-lg text-[#c9a96e] font-bold">₹999<span className="text-xs text-[#8a8078] font-[var(--font-inter)] font-light">/mo</span></span>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light hidden md:block">
              Weekly insights + priority booking + member reports
            </p>
            <a
              href="#assessment"
              className="px-4 py-3 min-h-[44px] flex items-center text-[9px] tracking-[0.2em] uppercase border border-[#c9a96e]/30 text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-300 font-[var(--font-inter)] font-medium whitespace-nowrap"
            >
              Start Monthly
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
