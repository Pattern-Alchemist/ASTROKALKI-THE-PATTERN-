'use client';
// trigger system dev-server restart

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
import GravityMap from '@/components/astrokalki/GravityMap';

// Next 10 Enhancements (Features 11–20)
import ChakraTuner from '@/components/astrokalki/ChakraTuner';
import GunaProfiler from '@/components/astrokalki/GunaProfiler';
import PrakritiDecoder from '@/components/astrokalki/PrakritiDecoder';
import PanchangaScheduler from '@/components/astrokalki/PanchangaScheduler';
import MantraOscilloscope from '@/components/astrokalki/MantraOscilloscope';
import BodyScanMapper from '@/components/astrokalki/BodyScanMapper';
import MandalaComposer from '@/components/astrokalki/MandalaComposer';
import NadiVisualizer from '@/components/astrokalki/NadiVisualizer';
import SankalpaForge from '@/components/astrokalki/SankalpaForge';
import ShadowJournal from '@/components/astrokalki/ShadowJournal';
import PatternIntelligenceReceptionist from '@/components/astrokalki/PatternIntelligenceReceptionist';

// Pattern Intelligence System™ — 4 pillars, 11 tools
import DailyPattern from '@/components/astrokalki/DailyPattern';
import PatternClimate from '@/components/astrokalki/PatternClimate';
import InnerVoices from '@/components/astrokalki/InnerVoices';
import Mirror from '@/components/astrokalki/Mirror';
import RelationshipLens from '@/components/astrokalki/RelationshipLens';
import LoopDetector from '@/components/astrokalki/LoopDetector';
import Reset from '@/components/astrokalki/Reset';
import NervousSystemReset from '@/components/astrokalki/NervousSystemReset';
import DailyReflection from '@/components/astrokalki/DailyReflection';
import PatternStory from '@/components/astrokalki/PatternStory';
import WeeklyIntelligenceReport from '@/components/astrokalki/WeeklyIntelligenceReport';

// Phase 3 — Personal Intelligence (the engine's premium outputs)
import PatternDNA from '@/components/astrokalki/PatternDNA';
import PatternBiography from '@/components/astrokalki/PatternBiography';
import ConsultationPreparation from '@/components/astrokalki/ConsultationPreparation';

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

        {/* 1b. The Pattern Intelligence System™ — flagship section */}
        <section id="pattern-intelligence-system" className="bg-[#050505] py-14 md:py-20 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={noMotion || { duration: 0.7, ease: EASE.outExpoLegacy }} className="mb-10 max-w-3xl">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3">
                The Pattern Intelligence System™
              </p>
              <h2 className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0] leading-[1.1]">
                Most apps track <span className="italic font-light">what</span> you do.
                <br />
                AstroKalki reveals <span className="italic font-light text-[#c9a96e]">why</span> you keep doing it.
              </h2>
              <p className="mt-4 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed">
                One intelligence engine. Multiple inputs. Premium outputs. Every pattern you log, every mirror you face, every reset you complete — it all feeds a single engine that reveals the invisible architecture underneath. This isn&apos;t eleven tools stitched together. It&apos;s one system, working in the background, getting smarter the more you use it.
              </p>
            </motion.div>

            {/* The engine's live output — Pattern DNA at the top */}
            <div className="mb-10">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] font-[var(--font-inter)] font-medium">
                  The Engine Output
                </span>
                <h3 className="font-[var(--font-cormorant)] text-lg md:text-xl font-bold text-[#f5f3f0]">
                  Your evolving fingerprint <span className="italic font-light text-[#8a8078]">— live, updating, yours</span>
                </h3>
              </div>
              <PatternDNA />
            </div>

            {/* Engine inputs — 4 pillars */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] font-[var(--font-inter)] font-medium">
                  Engine Inputs
                </span>
                <h3 className="font-[var(--font-cormorant)] text-lg md:text-xl font-bold text-[#f5f3f0]">
                  Four pillars <span className="italic font-light text-[#8a8078]">— daily, decode, interrupt, transform</span>
                </h3>
              </div>
            </div>

            {/* Pillar 1 — Observe */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] font-[var(--font-inter)] font-medium">
                  Pillar 1
                </span>
                <h3 className="font-[var(--font-cormorant)] text-lg md:text-xl font-bold text-[#f5f3f0]">
                  Observe <span className="italic font-light text-[#8a8078]">— daily awareness</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <DailyPattern />
                <PatternClimate />
                <InnerVoices />
              </div>
            </div>

            {/* Pillar 2 — Decode */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] font-[var(--font-inter)] font-medium">
                  Pillar 2
                </span>
                <h3 className="font-[var(--font-cormorant)] text-lg md:text-xl font-bold text-[#f5f3f0]">
                  Decode <span className="italic font-light text-[#8a8078]">— explain why</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Mirror />
                <RelationshipLens />
                <LoopDetector />
              </div>
            </div>

            {/* Pillar 3 — Interrupt */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] font-[var(--font-inter)] font-medium">
                  Pillar 3
                </span>
                <h3 className="font-[var(--font-cormorant)] text-lg md:text-xl font-bold text-[#f5f3f0]">
                  Interrupt <span className="italic font-light text-[#8a8078]">— real-time intervention</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Reset />
                <NervousSystemReset />
              </div>
            </div>

            {/* Pillar 4 — Transform */}
            <div className="mb-12">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] font-[var(--font-inter)] font-medium">
                  Pillar 4
                </span>
                <h3 className="font-[var(--font-cormorant)] text-lg md:text-xl font-bold text-[#f5f3f0]">
                  Transform <span className="italic font-light text-[#8a8078]">— long-term growth</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <DailyReflection />
                <WeeklyIntelligenceReport />
                <PatternStory />
              </div>
            </div>

            {/* Phase 3 — Personal Intelligence: the premium outputs */}
            <div className="pt-10 border-t border-[#c9a96e]/20">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] font-[var(--font-inter)] font-medium">
                  The Premium Outputs
                </span>
                <h3 className="font-[var(--font-cormorant)] text-lg md:text-xl font-bold text-[#f5f3f0]">
                  Personal Intelligence <span className="italic font-light text-[#8a8078]">— what the engine writes about you</span>
                </h3>
              </div>
              <p className="text-[10px] text-[#8a8078]/60 font-[var(--font-inter)] font-light italic mb-5 max-w-2xl">
                Months of evidence, woven into a biography. Your consultation starts here — not with an intake form.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PatternBiography />
                <ConsultationPreparation />
              </div>
            </div>

            <p className="mt-8 text-[10px] text-[#8a8078]/40 font-[var(--font-inter)] italic text-center max-w-xl mx-auto">
              Every input feeds <span className="text-[#c9a96e]/70">Pattern DNA</span> and <span className="text-[#c9a96e]/70">Your Pattern Biography</span> — the engine&apos;s two signature outputs. The more you log, the more it reveals.
            </p>
          </div>
        </section>

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

        {/* 11b. Cognitive Gravity Map */}
        <GravityMap />

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

        {/* 12b. Vedic Constitution Lab — Next 10 Enhancements */}
        <section className="bg-[#080808] py-14 md:py-20 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-5 md:px-12">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={noMotion || { duration: 0.7, ease: EASE.outExpoLegacy }} className="mb-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3">Vedic Constitution Lab</p>
              <h2 className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0]">
                Constitutional <span className="italic font-light">instruments</span>
              </h2>
              <p className="mt-3 text-xs md:text-sm text-[#8a8078] font-[var(--font-inter)] font-light max-w-2xl">
                Decode your prakriti, harmonize your nadis, compose your mandala, forge your sankalpa. Ten instruments at the intersection of Ayurveda, Jyotisha, and depth psychology — all client-side, all yours.
              </p>
            </motion.div>

            {/* Row 1: Prakriti + Guna (constitutional diagnostics) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PrakritiDecoder />
              <GunaProfiler />
            </div>

            {/* Row 2: Chakra Tuner (full width, with detail panel) */}
            <div className="mt-4">
              <ChakraTuner />
            </div>

            {/* Row 3: Nadi + Mantra (pranic instruments) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <NadiVisualizer />
              <MantraOscilloscope />
            </div>

            {/* Row 4: Panchanga Scheduler (full width) */}
            <div className="mt-4">
              <PanchangaScheduler />
            </div>

            {/* Row 5: Body Scan Mapper (full width) */}
            <div className="mt-4">
              <BodyScanMapper />
            </div>

            {/* Row 6: Mandala Composer + Sankalpa Forge (creative instruments) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <MandalaComposer />
              <SankalpaForge />
            </div>

            {/* Row 7: Shadow Journal (full width, deep work) */}
            <div className="mt-4">
              <ShadowJournal />
            </div>
          </div>
        </section>

        {/* 13. Assessment */}
        <Assessment />

        {/* 14. FAQ */}
        <FAQ />

        {/* 14b. Pattern Intelligence Receptionist — Live Demo */}
        <PatternIntelligenceReceptionist />

        {/* 15. Final CTA */}
        <FinalCTA />

        <Footer />
      </main>

      {/* Floating: Ambient Soundscape */}
      <AmbientSoundscape />
    </>
  );
}
