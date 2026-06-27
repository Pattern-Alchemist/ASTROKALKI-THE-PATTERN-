'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPRING } from './utils/animation';

/**
 * CaseSimulator — Clinical Case-Study Interactive Simulator
 * 
 * Branching narrative where users play as a "Pattern Recognition Officer"
 * navigating clinical scenarios to diagnose behavioral patterns.
 */

interface Scenario {
  id: string;
  title: string;
  brief: string;
  biometric: { arousal: number; coherence: number };
  options: { label: string; next: string; insight: string }[];
}

const SCENARIOS: Record<string, Scenario> = {
  start: {
    id: 'start',
    title: 'Dispatch #AK-2024-0147',
    brief: 'A 34-year-old executive presents with chronic relationship collapse. Three partnerships ended identically: intense early bonding → partner withdrawal → pursuit escalation → catastrophic rupture. The executive reports: "I always choose people who need saving." Biometric scan shows elevated Vayu (nervous system activation) and suppressed Tejas (transformative will). What is your first diagnostic move?',
    biometric: { arousal: 0.75, coherence: 0.25 },
    options: [
      { label: 'Map the attachment architecture', next: 'attachment', insight: 'Correct. The "rescuer" pattern is always an attachment reenactment. You recognize the compulsive caregiving as an anxious-preoccupied adaptation.' },
      { label: 'Probe the self-sabotage loop', next: 'sabotage', insight: 'Premature. Self-sabotage is a symptom, not the architecture. You are treating the surface before mapping the foundation.' },
      { label: 'Initiate shadow confrontation', next: 'shadow', insight: 'Dangerous. Shadow work without attachment mapping can retraumatize. The executive\'s nervous system is already dysregulated — adding shadow material risks collapse.' },
    ],
  },
  attachment: {
    id: 'attachment',
    title: 'Attachment Architecture Revealed',
    brief: 'The mapping reveals: Mother was emotionally unavailable (anxious-avoidant). Father was intermittently present (disorganized attachment trigger). The executive learned: "Love means rescuing someone who cannot love me back." The pattern: choose unavailable partners → rescue them → feel needed → their recovery triggers abandonment terror → sabotage their progress → they leave → "I knew it." Biometric shows Apas flooding. Next diagnostic step?',
    biometric: { arousal: 0.55, coherence: 0.45 },
    options: [
      { label: 'Trace the maternal inheritance', next: 'maternal', insight: 'The core wound is maternal — the executive is re-enacting the mother\'s emotional unavailability through the partners they choose. The "rescue" is actually an attempt to earn the love the mother could not give.' },
      { label: 'Address the nervous system dysregulation first', next: 'nsr', insight: 'Correct protocol. Before any cognitive restructuring, the autonomic nervous system must be stabilized. Vayu must be regulated before Tejas can be activated.' },
    ],
  },
  sabotage: {
    id: 'sabotage',
    title: 'Surface Diagnosis — Insufficient',
    brief: 'You identified self-sabotage, but this is a secondary pattern. The executive asks: "Why do I always destroy what I love?" — this question itself reveals the pattern goes deeper than behavioral choice. Biometric shows spike in Vayu. You must go deeper.',
    biometric: { arousal: 0.85, coherence: 0.15 },
    options: [
      { label: 'Re-route to attachment mapping', next: 'attachment', insight: 'Correct. Self-sabotage is the visible symptom; attachment architecture is the invisible structure generating it.' },
    ],
  },
  shadow: {
    id: 'shadow',
    title: 'Shadow Work — Premature Deployment',
    brief: 'The executive destabilizes. Shadow material surfaces before the nervous system has capacity to process it. Biometric shows critical dysregulation: arousal 0.92, coherence 0.08. Emergency protocol required.',
    biometric: { arousal: 0.92, coherence: 0.08 },
    options: [
      { label: 'Initiate nervous system stabilization', next: 'nsr', insight: 'Crisis protocol activated. Shadow work must wait until coherence baseline is established. The warrior does not enter the darkness unprepared.' },
    ],
  },
  maternal: {
    id: 'maternal',
    title: 'The Maternal Inheritance',
    brief: 'The pattern crystallizes: "I rescue unavailable people because I could not rescue my mother from her own unavailability." This is not a relationship pattern — it is a grief pattern. The executive is not seeking love; they are seeking to complete the incomplete mourning of maternal absence. The diagnosis is clear. The prescription follows.',
    biometric: { arousal: 0.35, coherence: 0.80 },
    options: [
      { label: 'Complete the diagnostic', next: 'complete', insight: 'The pattern is named. Recognition is the first override. From here, the Kalki Framework can begin: Recognition → Diagnosis → Realignment → Integration.' },
    ],
  },
  nsr: {
    id: 'nsr',
    title: 'Nervous System Regulation Protocol',
    brief: 'Vayu regulation initiated through breath-pacer calibration (4-7-8 pattern). After 12 minutes, biometric shows: arousal stabilized to 0.40, coherence rising to 0.65. The executive\'s window of tolerance has expanded. Diagnostic capacity restored. Continue to attachment mapping?',
    biometric: { arousal: 0.40, coherence: 0.65 },
    options: [
      { label: 'Proceed with attachment mapping', next: 'attachment', insight: 'The foundation is stabilized. Now the architecture can be mapped without risk of dysregulation collapse.' },
      { label: 'Complete the diagnostic', next: 'complete', insight: 'The nervous system is regulated but the architecture remains unmapped. Without mapping, the pattern will repeat. Recommend returning to attachment mapping.' },
    ],
  },
  complete: {
    id: 'complete',
    title: 'Diagnostic Complete — Pattern Named',
    brief: 'PRIMARY PATTERN: Compulsive Rescue-Abandonment Cycle (Anxious-Preoccupied Attachment Adaptation). INHERITANCE: Maternal emotional unavailability + Paternal intermittent presence. KARMIC ARCHITECTURE: "I must earn love through service to those who cannot reciprocate." PRESCRIPTION: Stage 2 — The Deep Dive, followed by Stage 3 — Dharma Navigation for authority reclamation.',
    biometric: { arousal: 0.30, coherence: 0.85 },
    options: [
      { label: 'Restart simulation', next: 'start', insight: 'Simulation reset. Try different diagnostic paths to discover alternative approaches.' },
    ],
  },
};

export default function CaseSimulator() {
  const [currentId, setCurrentId] = useState('start');
  const [insightText, setInsightText] = useState<string | null>(null);
  const scenario = SCENARIOS[currentId];

  const handleChoice = (next: string, insight: string) => {
    setInsightText(insight);
    setTimeout(() => {
      setCurrentId(next);
      setInsightText(null);
    }, 2500);
  };

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Clinical Simulator
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-4">
        Pattern Recognition Officer
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentId}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={SPRING.gentle}
        >
          {/* Dispatch header */}
          <div className="bg-[#050505] border border-white/[0.04] p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)] font-medium">
                {scenario.title}
              </span>
            </div>

            {/* Biometric bars */}
            <div className="flex gap-4 mb-3">
              <div className="flex-1">
                <span className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/40 font-[var(--font-inter)]">Arousal</span>
                <div className="h-1 bg-[#1a1815] mt-0.5">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: scenario.biometric.arousal > 0.7 ? '#a07050' : scenario.biometric.arousal > 0.4 ? '#c9a96e' : '#80a060' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${scenario.biometric.arousal * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <span className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/40 font-[var(--font-inter)]">Coherence</span>
                <div className="h-1 bg-[#1a1815] mt-0.5">
                  <motion.div
                    className="h-full bg-[#c9a96e]"
                    initial={{ width: 0 }}
                    animate={{ width: `${scenario.biometric.coherence * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed">
              {scenario.brief}
            </p>
          </div>

          {/* Insight flash */}
          {insightText && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-[#c9a96e]/10 border border-[#c9a96e]/20 p-3 mb-4"
            >
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] block mb-1">Diagnostic Insight</span>
              <p className="text-[11px] text-[#c9a96e] font-[var(--font-inter)] font-light">{insightText}</p>
            </motion.div>
          )}

          {/* Choices */}
          {!insightText && (
            <div className="space-y-2">
              {scenario.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(opt.next, opt.insight)}
                  className="w-full text-left px-4 py-3 border border-white/[0.04] hover:border-[#c9a96e]/20 hover:bg-[#c9a96e]/5 transition-all duration-300"
                >
                  <span className="text-[9px] tracking-[0.15em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
                    Option {i + 1}
                  </span>
                  <p className="text-[11px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light mt-0.5">
                    {opt.label}
                  </p>
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
