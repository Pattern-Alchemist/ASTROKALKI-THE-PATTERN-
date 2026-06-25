'use client';

import Loader from '@/components/astrokalki/Loader';
import Navbar from '@/components/astrokalki/Navbar';
import Hero from '@/components/astrokalki/Hero';
import PatternMosaic from '@/components/astrokalki/PatternMosaic';
import Method from '@/components/astrokalki/Method';
import Services from '@/components/astrokalki/Services';
import WarriorsJourney from '@/components/astrokalki/WarriorsJourney';
import Testimonials from '@/components/astrokalki/Testimonials';
import DangerousKnowledge from '@/components/astrokalki/DangerousKnowledge';
import Assessment from '@/components/astrokalki/Assessment';
import FAQ from '@/components/astrokalki/FAQ';
import FinalCTA from '@/components/astrokalki/FinalCTA';
import Footer from '@/components/astrokalki/Footer';

// New interactive features
import AmbientSoundscape from '@/components/astrokalki/AmbientSoundscape';
import ShadowTimeline from '@/components/astrokalki/ShadowTimeline';
import EncryptionSimulator from '@/components/astrokalki/EncryptionSimulator';
import PatternLedger from '@/components/astrokalki/PatternLedger';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/components/astrokalki/hooks/useReducedMotion';
import { EASE, SPRING } from '@/components/astrokalki/utils/animation';

export default function Home() {
  const prefersReduced = useReducedMotion();
  const noMotion = prefersReduced ? { duration: 0 } : undefined;

  return (
    <>
      {/* Accessibility: Skip to content link */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <Loader />
      <Navbar />

      <main id="main-content" className="bg-[#050505] overflow-x-hidden">
        {/* 1. Hero — 3 seconds to authority */}
        <Hero />

        {/* 2. Pattern Mosaic — High-density recognition cards with 3D tilt */}
        <PatternMosaic />

        {/* 3. Method — Engine Room with Golden Thread */}
        <Method />

        {/* 4. Shadow Integration Timeline — Interactive D3.js visualization */}
        <section className="bg-[#080808] py-14 md:py-20 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={noMotion || { duration: 0.6 }}
              className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3"
            >
              The Shadow Integration Arc
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={noMotion || { duration: 0.7, ease: EASE.outExpoLegacy }}
              className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0] leading-[1.1] mb-2"
            >
              The lifecycle of a <span className="italic font-light">blockage</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={noMotion || { duration: 0.6, delay: 0.1 }}
              className="text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-xl mb-8"
            >
              Every behavioral blockage follows an arc — from unconscious activation through crisis to conscious integration. Hover over each phase to understand the diagnostic.
            </motion.p>
            <ShadowTimeline />
          </div>
        </section>

        {/* 5. Services — Luxury Marketplace with 3D tilt thumbnails */}
        <Services />

        {/* 6. Warrior's Journey — A24 moment */}
        <WarriorsJourney />

        {/* 7. Testimonials — Recognitions + Stats with counter animation */}
        <Testimonials />

        {/* 8. Dangerous Knowledge — Magazine / Intellectual Moat */}
        <DangerousKnowledge />

        {/* 9. Interactive Lab — Encryption Simulator + Pattern Ledger */}
        <section className="bg-[#050505] py-14 md:py-20 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={noMotion || { duration: 0.7, ease: EASE.outExpoLegacy }}
              className="max-w-xl mb-10"
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3">
                Interactive Lab
              </p>
              <h2 className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0]">
                Experience the <span className="italic font-light">methodology</span>
              </h2>
              <p className="mt-3 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light">
                These interactive tools demonstrate the clinical rigor behind every diagnostic. Your data never leaves your device.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EncryptionSimulator />
              <PatternLedger />
            </div>
          </div>
        </section>

        {/* 10. Assessment CTA — Funnel touchpoint */}
        <Assessment />

        {/* 11. FAQ — Conversion support */}
        <FAQ />

        {/* 12. Final CTA — Eclipse + Shadow */}
        <FinalCTA />

        <Footer />
      </main>

      {/* Ambient Soundscape — floating control */}
      <AmbientSoundscape />
    </>
  );
}
