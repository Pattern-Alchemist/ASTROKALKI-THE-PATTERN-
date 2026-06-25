'use client';

import Loader from '@/components/astrokalki/Loader';
import Navbar from '@/components/astrokalki/Navbar';
import Hero from '@/components/astrokalki/Hero';
import PatternMosaic from '@/components/astrokalki/PatternMosaic';
import Method from '@/components/astrokalki/Method';
import ShadowTimeline from '@/components/astrokalki/ShadowTimeline';
import Services from '@/components/astrokalki/Services';
import BreathPacer from '@/components/astrokalki/BreathPacer';
import WarriorsJourney from '@/components/astrokalki/WarriorsJourney';
import Testimonials from '@/components/astrokalki/Testimonials';
import DangerousKnowledge from '@/components/astrokalki/DangerousKnowledge';
import ManifestoCodex from '@/components/astrokalki/ManifestoCodex';
import Assessment from '@/components/astrokalki/Assessment';
import FAQ from '@/components/astrokalki/FAQ';
import FinalCTA from '@/components/astrokalki/FinalCTA';
import Footer from '@/components/astrokalki/Footer';

// Interactive Features
import AmbientSoundscape from '@/components/astrokalki/AmbientSoundscape';
import AlchemicalForge from '@/components/astrokalki/AlchemicalForge';
import SankeyFlow from '@/components/astrokalki/SankeyFlow';
import HoraClock from '@/components/astrokalki/HoraClock';
import LineageTree from '@/components/astrokalki/LineageTree';
import DreamLog from '@/components/astrokalki/DreamLog';
import PurgeTerminal from '@/components/astrokalki/PurgeTerminal';
import CaseSimulator from '@/components/astrokalki/CaseSimulator';
import TensionMonitor from '@/components/astrokalki/TensionMonitor';
import EncryptionSimulator from '@/components/astrokalki/EncryptionSimulator';
import PatternLedger from '@/components/astrokalki/PatternLedger';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/components/astrokalki/hooks/useReducedMotion';
import { EASE } from '@/components/astrokalki/utils/animation';

export default function Home() {
  const prefersReduced = useReducedMotion();
  const noMotion = prefersReduced ? { duration: 0 } : undefined;

  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <Loader />
      <Navbar />

      <main id="main-content" className="bg-[#050505] overflow-x-hidden">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Pattern Mosaic — with 3D tilt */}
        <PatternMosaic />

        {/* 3. Method — Golden Thread */}
        <Method />

        {/* 4. Shadow Integration Timeline */}
        <section className="bg-[#080808] py-14 md:py-20 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={noMotion || { duration: 0.6 }}
              className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3">
              The Shadow Integration Arc
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={noMotion || { duration: 0.7, ease: EASE.outExpoLegacy }}
              className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0] leading-[1.1] mb-2">
              The lifecycle of a <span className="italic font-light">blockage</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={noMotion || { duration: 0.6, delay: 0.1 }}
              className="text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-xl mb-8">
              Every behavioral blockage follows an arc — from unconscious activation through crisis to conscious integration. Hover over each phase.
            </motion.p>
            <ShadowTimeline />
          </div>
        </section>

        {/* 5. Services — Kalki Framework */}
        <Services />

        {/* 6. Breath Pacer & Coherence Orb */}
        <BreathPacer />

        {/* 7. Warrior's Journey */}
        <WarriorsJourney />

        {/* 8. Generational Shadow Map + Alchemical Forge */}
        <section className="bg-[#050505] py-14 md:py-20 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={noMotion || { duration: 0.7, ease: EASE.outExpoLegacy }} className="mb-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3">Vedic-Somatic Instruments</p>
              <h2 className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0]">
                Diagnostic <span className="italic font-light">instruments</span>
              </h2>
              <p className="mt-3 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-xl">
                Interactive tools bridging Vedic cognitive maps and clinical depth psychology. All processing happens on your device.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Lineage Tree */}
              <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">Epigenetic Mapping</span>
                </div>
                <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Generational Shadow Map</p>
                <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
                  Click nodes to explore inherited behavioral scripts. Every ancestor carries unresolved shadow that flows downstream.
                </p>
                <LineageTree />
              </div>

              {/* Alchemical Forge */}
              <AlchemicalForge />
            </div>

            {/* Sankey Flow */}
            <div className="mt-4">
              <SankeyFlow />
            </div>

            {/* Hora Clock + Tension Monitor */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <HoraClock />
              <TensionMonitor />
            </div>
          </div>
        </section>

        {/* 9. Testimonials */}
        <Testimonials />

        {/* 10. Dangerous Knowledge — with Annotation Layer */}
        <DangerousKnowledge />

        {/* 11. Manifesto Codex */}
        <ManifestoCodex />

        {/* 12. Interactive Lab — Extended */}
        <section className="bg-[#050505] py-14 md:py-20 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={noMotion || { duration: 0.7, ease: EASE.outExpoLegacy }} className="mb-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3">The Operating Theater</p>
              <h2 className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0]">
                Clinical <span className="italic font-light">workspace</span>
              </h2>
              <p className="mt-3 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-xl">
                Full-spectrum interactive tools. Encrypt. Dream. Diagnose. Purge. Your data never leaves your device.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CaseSimulator />
              <div className="space-y-4">
                <DreamLog />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EncryptionSimulator />
                  <PatternLedger />
                </div>
              </div>
            </div>

            {/* Purge Terminal */}
            <div className="mt-4">
              <PurgeTerminal />
            </div>
          </div>
        </section>

        {/* 13. Assessment */}
        <Assessment />

        {/* 14. FAQ */}
        <FAQ />

        {/* 15. Final CTA */}
        <FinalCTA />

        <Footer />
      </main>

      {/* Floating: Ambient Soundscape */}
      <AmbientSoundscape />
    </>
  );
}
