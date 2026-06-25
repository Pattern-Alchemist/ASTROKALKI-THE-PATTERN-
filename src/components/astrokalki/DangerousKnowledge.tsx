'use client';

import { motion } from 'framer-motion';
import { ThreadIcon } from './Icons';

const articles = [
  {
    category: 'Trauma Bonding',
    title: 'Why You Keep Going Back to the Person Who Destroyed You',
    excerpt: 'It is not love that pulls you back. It is the neurochemistry of intermittent reinforcement — the same mechanism that keeps gamblers addicted.',
    readTime: '7 min',
  },
  {
    category: 'Shadow Psychology',
    title: 'The Part of You That Wants You to Fail',
    excerpt: 'Your shadow self was punished for being real. It learned to self-sabotage because success meant visibility, and visibility meant danger.',
    readTime: '6 min',
  },
  {
    category: 'Repeating Loops',
    title: "You Didn't Choose This Pain. But You Keep Choosing It.",
    excerpt: 'The first time was karma. The second time was a pattern. The third time is a choice your unconscious is making on your behalf.',
    readTime: '8 min',
  },
  {
    category: 'Relationships',
    title: 'The Fear of Being Seen Is Destroying Your Capacity to Be Loved',
    excerpt: 'You attract unavailable people because available people require you to be real. And being real was never safe.',
    readTime: '5 min',
  },
  {
    category: 'Self-Deception',
    title: 'The Lie You Tell Yourself Every Morning',
    excerpt: "The most dangerous lie is not the one others tell you. It is the one you tell yourself to survive. The one that sounds like 'this time it is different.'",
    readTime: '6 min',
  },
  {
    category: 'Spiritual Bypassing',
    title: 'Why Manifestation Culture Is Psychological Warfare',
    excerpt: 'Telling a traumatized person they attracted their abuse is not spirituality. It is spiritual bypassing weaponized against the vulnerable.',
    readTime: '9 min',
  },
];

export default function DangerousKnowledge() {
  return (
    <section className="bg-[#080808] py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="max-w-xl mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-3"
          >
            <ThreadIcon className="w-4 h-4 text-[#c9a96e]/60" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)]">
              Dangerous Knowledge
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-[var(--font-cormorant)] text-3xl md:text-5xl font-light text-[#f5f3f0] leading-[1.1]"
          >
            Read only if you&apos;re ready to stop <span className="italic">pretending</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 text-sm text-[#8a8078] font-[var(--font-inter)] font-light"
          >
            Kaliyug psychology. Shadow work. Parental conditioning. Emotional warfare. No spiritual bypass.
          </motion.p>
        </div>

        {/* Articles grid — premium intellectual publication */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {articles.map((article, index) => (
            <motion.a
              key={article.title}
              href="#"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group border border-white/[0.04] p-5 hover:border-[#c9a96e]/15 transition-colors duration-500 block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)]">
                  {article.category}
                </span>
                <span className="text-[9px] text-[#8a8078]/50 font-[var(--font-inter)]">
                  {article.readTime}
                </span>
              </div>
              <h4 className="font-[var(--font-cormorant)] text-lg md:text-xl text-[#f5f3f0] font-light group-hover:text-[#c9a96e] transition-colors duration-500 leading-snug">
                {article.title}
              </h4>
              <p className="mt-2 text-xs text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed">
                {article.excerpt}
              </p>
              <span className="mt-3 inline-block text-[10px] tracking-[0.15em] uppercase text-[#c9a96e]/50 group-hover:text-[#c9a96e] transition-colors duration-500 font-[var(--font-inter)]">
                Read &rarr;
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
