'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WarriorsJourney() {
  return (
    <section className="relative py-14 md:py-20 overflow-hidden border-t border-white/[0.04]">
      {/* Real warrior desert image from ZIP */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/warrior-desert.jpg"
          alt="The Warrior's Descent into Shadow"
          fill
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/60 to-[#050505]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12">
        <div className="max-w-lg">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3"
          >
            The Warrior&apos;s Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0] leading-[1.1]"
          >
            Not a spiritual journey.
            <br />
            A <span className="italic font-light text-[#c9a96e]">warrior&apos;s descent</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-xs md:text-sm text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed"
          >
            This is not spiritual coaching. This is a rigorous confrontation with truth.
            The warrior does not bypass the darkness — the warrior walks through it with eyes open,
            deploying behavioral strategies to override the loop. Not spiritual bypassing, but actionable
            dharma alignment that transforms resistance into raw, absolute leverage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6"
          >
            <a
              href="#services"
              className="group inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] font-[var(--font-inter)] font-medium border-b border-[#c9a96e]/30 pb-1 hover:border-[#c9a96e] transition-colors duration-500"
            >
              Explore the Journey
              <span className="transition-transform group-hover:translate-x-1 duration-300">&rarr;</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
