'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SPRING } from './utils/animation';

/**
 * BreathPacer — Rhythmic Somatic Breath-Pacer & Coherence Orb
 * 
 * Guides users through Vedic pranayama breathing cadences with
 * an expanding/contracting visual sphere. Synced with Web Audio
 * pings for nervous system regulation.
 */

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest';
type BreathPattern = 'box' | 'vayu' | 'tejas';

interface PatternConfig {
  name: string;
  sanskrit: string;
  phases: { phase: BreathPhase; duration: number }[];
  description: string;
}

const PATTERNS: Record<BreathPattern, PatternConfig> = {
  box: {
    name: 'Box Breathing',
    sanskrit: 'Sama Vritti',
    phases: [
      { phase: 'inhale', duration: 4000 },
      { phase: 'hold', duration: 4000 },
      { phase: 'exhale', duration: 4000 },
      { phase: 'rest', duration: 4000 },
    ],
    description: 'Equal rhythm. Tactical calm. Navy SEAL protocol adapted for nervous system reset.',
  },
  vayu: {
    name: 'Vayu Dissolution',
    sanskrit: 'Vayu Nirodha 4-7-8',
    phases: [
      { phase: 'inhale', duration: 4000 },
      { phase: 'hold', duration: 7000 },
      { phase: 'exhale', duration: 8000 },
      { phase: 'rest', duration: 1000 },
    ],
    description: 'Dissolves anxiety patterns. The extended exhale activates parasympathetic dominance.',
  },
  tejas: {
    name: 'Tejas Staccato Purge',
    sanskrit: 'Tejas Shuddhi',
    phases: [
      { phase: 'inhale', duration: 2000 },
      { phase: 'hold', duration: 500 },
      { phase: 'exhale', duration: 2000 },
      { phase: 'rest', duration: 500 },
    ],
    description: 'Rapid purge breathing. Activates Tejas — the fire of transformation. Not for the unprepared.',
  },
};

const PHASE_CONFIG: Record<BreathPhase, { scale: number; color: string; label: string; instruction: string }> = {
  inhale: { scale: 1.4, color: '#c9a96e', label: 'INHALE', instruction: 'Draw breath in slowly...' },
  hold: { scale: 1.4, color: '#d4b87a', label: 'HOLD', instruction: 'Retain. Let stillness build.' },
  exhale: { scale: 0.7, color: '#8a8078', label: 'EXHALE', instruction: 'Release completely...' },
  rest: { scale: 0.7, color: '#3a3530', label: 'REST', instruction: 'Empty. Wait for the next cycle.' },
};

export default function BreathPacer() {
  const [activePattern, setActivePattern] = useState<BreathPattern>('box');
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [timeInPhase, setTimeInPhase] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const prefersReduced = useReducedMotion();

  const pattern = PATTERNS[activePattern];
  const currentPhase = pattern.phases[currentPhaseIndex % pattern.phases.length];
  const phaseConfig = PHASE_CONFIG[currentPhase.phase];
  const progress = currentPhase.duration > 0 ? Math.min(timeInPhase / currentPhase.duration, 1) : 0;

  // Audio ping on phase change
  const playPing = useCallback((frequency: number) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = frequency;
    gain.gain.value = 0.06;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const tickInterval = 100;
    timerRef.current = setInterval(() => {
      setTimeInPhase(prev => {
        const next = prev + tickInterval;
        if (next >= currentPhase.duration) {
          // Move to next phase
          setCurrentPhaseIndex(prevIdx => {
            const nextIdx = (prevIdx + 1) % pattern.phases.length;
            if (nextIdx === 0) setCycleCount(c => c + 1);

            // Play audio ping
            const nextPhase = pattern.phases[nextIdx];
            if (nextPhase.phase === 'inhale') playPing(440);
            else if (nextPhase.phase === 'exhale') playPing(330);
            else playPing(220);

            return nextIdx;
          });
          return 0;
        }
        return next;
      });
    }, tickInterval);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning, currentPhase.duration, pattern.phases, playPing]);

  const startPacer = useCallback(() => {
    setIsRunning(true);
    setCurrentPhaseIndex(0);
    setTimeInPhase(0);
    setCycleCount(0);
    playPing(440);
  }, [playPing]);

  const stopPacer = useCallback(() => {
    setIsRunning(false);
    setCurrentPhaseIndex(0);
    setTimeInPhase(0);
  }, []);

  if (prefersReduced) {
    return (
      <section className="bg-[#050505] py-14 md:py-20 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-5 md:px-12 text-center">
          <p className="text-sm text-[#8a8078] font-[var(--font-inter)]">Breath Pacer is paused due to motion preferences.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#050505] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-5 md:px-12">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3">
            Somatic Calibration
          </p>
          <h2 className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0]">
            The Coherence <span className="italic font-light">Orb</span>
          </h2>
          <p className="mt-2 text-xs text-[#8a8078] font-[var(--font-inter)] font-light max-w-md mx-auto">
            Vedic pranayama translated into clinical nervous-system regulation. Breathe with the orb. The rhythm rewrites your state.
          </p>
        </div>

        {/* Pattern selector */}
        <div className="flex justify-center gap-3 mb-8">
          {(Object.entries(PATTERNS) as [BreathPattern, PatternConfig][]).map(([key, p]) => (
            <button
              key={key}
              onClick={() => { setActivePattern(key); if (isRunning) stopPacer(); }}
              className={`px-4 py-2 text-[9px] tracking-[0.15em] uppercase font-[var(--font-inter)] font-medium border transition-all duration-300 ${
                activePattern === key
                  ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10'
                  : 'border-white/[0.06] text-[#8a8078]/60 hover:text-[#8a8078] hover:border-white/[0.1]'
              }`}
              aria-label={`Select ${p.name} breathing pattern`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Pattern description */}
        <p className="text-center text-[10px] text-[#8a8078]/60 font-[var(--font-inter)] font-light italic mb-8">
          {pattern.sanskrit} — {pattern.description}
        </p>

        {/* Coherence Orb */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
            {/* Outer ring — progress */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1a1815" strokeWidth="0.5" />
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke={phaseConfig.color}
                strokeWidth="1"
                strokeDasharray={`${progress * 283} 283`}
                className="transition-all duration-100"
                opacity={0.6}
              />
            </svg>

            {/* The Orb */}
            <motion.div
              animate={{
                scale: isRunning ? phaseConfig.scale : 1,
                backgroundColor: phaseConfig.color,
              }}
              transition={isRunning ? { duration: currentPhase.duration / 1000, ease: 'linear' } : SPRING.gentle}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full opacity-30 blur-[1px]"
              style={{ boxShadow: `0 0 60px ${phaseConfig.color}40, 0 0 120px ${phaseConfig.color}20` }}
            />

            {/* Phase label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-[var(--font-inter)] font-medium transition-colors duration-500"
                style={{ color: phaseConfig.color }}
              >
                {phaseConfig.label}
              </span>
              {isRunning && (
                <span className="text-[9px] text-[#8a8078]/50 font-[var(--font-inter)] mt-1">
                  {currentPhase.duration / 1000}s
                </span>
              )}
            </div>
          </div>

          {/* Instruction */}
          <p className="mt-4 font-[var(--font-cormorant)] text-base text-[#f5f3f0]/50 italic">
            {isRunning ? phaseConfig.instruction : 'Select a pattern and begin'}
          </p>

          {/* Cycle counter */}
          {isRunning && (
            <span className="mt-2 text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/30 font-[var(--font-inter)]">
              Cycle {cycleCount + 1}
            </span>
          )}
        </div>

        {/* Start/Stop */}
        <div className="flex justify-center">
          <button
            onClick={isRunning ? stopPacer : startPacer}
            className={`px-8 py-4 text-[10px] tracking-[0.25em] uppercase font-[var(--font-inter)] font-semibold transition-all duration-300 ${
              isRunning
                ? 'border border-[#c9a96e]/30 text-[#c9a96e] hover:bg-[#c9a96e]/10'
                : 'bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a]'
            }`}
            aria-label={isRunning ? 'Stop breath pacer' : 'Begin breath pacer'}
          >
            {isRunning ? 'End Session' : 'Begin Calibration'}
          </button>
        </div>
      </div>
    </section>
  );
}
