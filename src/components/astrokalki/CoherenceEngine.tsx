'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { somaticSync, BreathSyncData } from '@/lib/somatic-sync';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SPRING } from './utils/animation';

/**
 * CoherenceEngine — Somatic Coherence Scoring Dashboard
 * 
 * Computes a real-time "Somatic Coherence Score" (0-100) based on:
 * - Breath pacer engagement (are they breathing rhythmically?)
 * - Interaction regularity (steady scrolling = regulated)
 * - Session depth (time spent in diagnostic tools)
 * - Dream/ledger activity (self-reflection engagement)
 * 
 * No wearables. No APIs. No cost.
 * Uses the existing SomaticSync event bus + localStorage tracking.
 */

interface CoherenceMetrics {
  breathRegularity: number;   // 0-100 — how consistently they use the breath pacer
  breathPhaseSync: number;    // 0-100 — how well they follow the inhale/exhale cadence
  sessionDepth: number;       // 0-100 — cumulative engagement time
  reflectionActivity: number; // 0-100 — dream log + pattern ledger entries
  overallCoherence: number;   // 0-100 — weighted composite
  coherenceLevel: 'fragmented' | 'unsettled' | 'regulated' | 'coherent' | 'integrated';
}

const STORAGE_KEY = 'ak_coherence_data';

interface SessionData {
  breathCycles: number;
  breathPhaseTransitions: number;
  lastBreathPhase: string;
  lastBreathTime: number;
  sessionStart: number;
  reflectionEntries: number;
  toolInteractions: number;
}

function getSession(): SessionData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    breathCycles: 0,
    breathPhaseTransitions: 0,
    lastBreathPhase: 'rest',
    lastBreathTime: Date.now(),
    sessionStart: Date.now(),
    reflectionEntries: 0,
    toolInteractions: 0,
  };
}

function saveSession(data: SessionData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function computeCoherence(session: SessionData): CoherenceMetrics {
  const sessionMinutes = (Date.now() - session.sessionStart) / 60000;

  // Breath regularity — based on cycle count and session time
  const expectedCycles = sessionMinutes * 1.5; // ~1.5 cycles/min at normal pace
  const breathRegularity = Math.min(100, (session.breathCycles / Math.max(1, expectedCycles)) * 100);

  // Phase sync — transitions indicate following the pacer
  const breathPhaseSync = Math.min(100, session.breathPhaseTransitions * 3);

  // Session depth — logarithmic scale, caps at ~30 min
  const sessionDepth = Math.min(100, Math.log2(sessionMinutes + 1) * 20);

  // Reflection activity — dream logs + pattern entries
  const reflectionActivity = Math.min(100, session.reflectionEntries * 15);

  // Weighted composite
  const overallCoherence = Math.round(
    breathRegularity * 0.30 +
    breathPhaseSync * 0.25 +
    sessionDepth * 0.20 +
    reflectionActivity * 0.25
  );

  let coherenceLevel: CoherenceMetrics['coherenceLevel'];
  if (overallCoherence >= 85) coherenceLevel = 'integrated';
  else if (overallCoherence >= 65) coherenceLevel = 'coherent';
  else if (overallCoherence >= 45) coherenceLevel = 'regulated';
  else if (overallCoherence >= 25) coherenceLevel = 'unsettled';
  else coherenceLevel = 'fragmented';

  return {
    breathRegularity: Math.round(breathRegularity),
    breathPhaseSync: Math.round(breathPhaseSync),
    sessionDepth: Math.round(sessionDepth),
    reflectionActivity: Math.round(reflectionActivity),
    overallCoherence,
    coherenceLevel,
  };
}

const LEVEL_CONFIG: Record<string, { color: string; label: string; description: string }> = {
  fragmented: { color: '#a07050', label: 'Fragmented', description: 'Nervous system dysregulated. Multiple competing signals. Begin with breath calibration.' },
  unsettled: { color: '#8a8078', label: 'Unsettled', description: 'Partial regulation. Some signals aligning. Continue breath work to stabilize.' },
  regulated: { color: '#c9a96e', label: 'Regulated', description: 'Baseline coherence achieved. Nervous system stable. Diagnostic tools are now effective.' },
  coherent: { color: '#d4b87a', label: 'Coherent', description: 'Strong alignment between breath, body, and awareness. Pattern recognition is heightened.' },
  integrated: { color: '#e8e0d4', label: 'Integrated', description: 'Full somatic coherence. The warrior state — awareness, breath, and action are unified.' },
};

export default function CoherenceEngine() {
  const [metrics, setMetrics] = useState<CoherenceMetrics | null>(null);
  const sessionRef = useRef<SessionData>(getSession());
  const prefersReduced = useReducedMotion();

  // Listen to breath sync data
  useEffect(() => {
    const unsubscribe = somaticSync.subscribe((data: BreathSyncData) => {
      const session = sessionRef.current;

      if (data.isActive) {
        // Track phase transitions (user following the pacer)
        if (data.phase !== session.lastBreathPhase) {
          session.breathPhaseTransitions++;
        }
        session.lastBreathPhase = data.phase;

        // Track cycle completions
        if (data.phase === 'rest' && data.progress > 0.9) {
          session.breathCycles++;
        }
      }

      session.lastBreathTime = Date.now();
      sessionRef.current = session;
      saveSession(session);
      setMetrics(computeCoherence(session));
    });

    return unsubscribe;
  }, []);

  // Periodic coherence update (for session depth tracking)
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(computeCoherence(sessionRef.current));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Initial computation
  useEffect(() => {
    setMetrics(computeCoherence(sessionRef.current));
  }, []);

  const incrementReflection = useCallback(() => {
    const session = sessionRef.current;
    session.reflectionEntries++;
    sessionRef.current = session;
    saveSession(session);
    setMetrics(computeCoherence(session));
  }, []);

  const resetSession = useCallback(() => {
    const fresh: SessionData = {
      breathCycles: 0,
      breathPhaseTransitions: 0,
      lastBreathPhase: 'rest',
      lastBreathTime: Date.now(),
      sessionStart: Date.now(),
      reflectionEntries: 0,
      toolInteractions: 0,
    };
    sessionRef.current = fresh;
    saveSession(fresh);
    setMetrics(computeCoherence(fresh));
  }, []);

  if (!metrics) return null;

  const levelConfig = LEVEL_CONFIG[metrics.coherenceLevel];

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: levelConfig.color }} />
            <span className="text-[9px] tracking-[0.25em] uppercase font-[var(--font-inter)] font-medium" style={{ color: levelConfig.color }}>
              Somatic Coherence
            </span>
          </div>
          <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold">
            Coherence Engine
          </p>
        </div>
        <div className="text-right">
          <motion.p
            key={metrics.overallCoherence}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="font-[var(--font-cormorant)] text-3xl font-bold"
            style={{ color: levelConfig.color }}
          >
            {metrics.overallCoherence}
          </motion.p>
          <span className="text-[8px] tracking-[0.15em] uppercase font-[var(--font-inter)]" style={{ color: levelConfig.color + 'aa' }}>
            {levelConfig.label}
          </span>
        </div>
      </div>

      {/* Coherence bar */}
      <div className="h-2 bg-[#1a1815] mb-4 overflow-hidden">
        <motion.div
          className="h-full"
          style={{ backgroundColor: levelConfig.color }}
          initial={{ width: 0 }}
          animate={{ width: `${metrics.overallCoherence}%` }}
          transition={prefersReduced ? { duration: 0 } : { duration: 1.5, ease: 'easeOut' }}
        />
      </div>

      {/* Level description */}
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed mb-4">
        {levelConfig.description}
      </p>

      {/* Sub-metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: 'Breath Regularity', value: metrics.breathRegularity },
          { label: 'Phase Sync', value: metrics.breathPhaseSync },
          { label: 'Session Depth', value: metrics.sessionDepth },
          { label: 'Reflection Activity', value: metrics.reflectionActivity },
        ].map(m => (
          <div key={m.label} className="bg-[#050505] border border-white/[0.04] p-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">{m.label}</span>
              <span className="text-[9px] text-[#8a8078]/70 font-[var(--font-inter)]">{m.value}%</span>
            </div>
            <div className="h-1 bg-[#1a1815]">
              <div className="h-full bg-[#c9a96e]/30" style={{ width: `${m.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={incrementReflection}
          className="px-3 py-1.5 text-[8px] tracking-[0.15em] uppercase border border-[#c9a96e]/20 text-[#c9a96e]/60 hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-all duration-300 font-[var(--font-inter)]"
        >
          + Reflection
        </button>
        <button
          onClick={resetSession}
          className="px-3 py-1.5 text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/30 hover:text-[#8a8078]/60 transition-colors font-[var(--font-inter)]"
        >
          Reset Session
        </button>
      </div>
    </div>
  );
}
