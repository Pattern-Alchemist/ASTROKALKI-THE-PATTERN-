'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SPRING } from './utils/animation';
import { somaticSync, BreathSyncData } from '@/lib/somatic-sync';

/**
 * AmbientSoundscape — Neuro-Somatic Soundscape Synthesizer
 * 
 * Now coupled with BreathPacer via SomaticSync:
 * - Inhale → lowpass filter opens (brightness increases)
 * - Exhale → lowpass filter closes (warmth deepens)
 * - Hold → filter holds current position
 * - Rest → filter settles to center
 * 
 * This creates a closed-loop somatic feedback system where
 * breathing cadence directly shapes the sonic environment.
 */

interface SoundLayer {
  id: string;
  label: string;
  frequency: number;
  type: OscillatorType;
  gain: number;
  description: string;
}

const LAYERS: SoundLayer[] = [
  { id: 'root', label: 'Root Drone', frequency: 55, type: 'sine', gain: 0.12, description: 'Foundation frequency — grounding resonance' },
  { id: 'harmonic', label: 'Harmonic', frequency: 110, type: 'sine', gain: 0.06, description: 'Second harmonic — inner clarity' },
  { id: 'sub', label: 'Sub-Bass', frequency: 27.5, type: 'sine', gain: 0.08, description: 'Sub-audio pulse — nervous system entrainment' },
  { id: 'ethereal', label: 'Ethereal', frequency: 220, type: 'triangle', gain: 0.03, description: 'Higher overtone — pattern illumination' },
];

// Filter frequency ranges for breath modulation
const FILTER_CLOSED = 200;   // Exhale — warm, muffled
const FILTER_OPEN = 2000;    // Inhale — bright, clear
const FILTER_CENTER = 800;   // Rest — neutral

export default function AmbientSoundscape() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [layerGains, setLayerGains] = useState<Record<string, number>>(
    Object.fromEntries(LAYERS.map(l => [l.id, l.gain]))
  );
  const [breathPhase, setBreathPhase] = useState<string>('standby');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<Record<string, OscillatorNode>>({});
  const gainNodesRef = useRef<Record<string, GainNode>>({});
  const masterGainRef = useRef<GainNode | null>(null);
  const lowpassFilterRef = useRef<BiquadFilterNode | null>(null);
  const prefersReduced = useReducedMotion();

  // Subscribe to breath sync data
  useEffect(() => {
    const unsubscribe = somaticSync.subscribe((data: BreathSyncData) => {
      setBreathPhase(data.isActive ? data.phase : 'standby');

      // Modulate the lowpass filter based on breath phase
      if (!lowpassFilterRef.current || !audioCtxRef.current || !isPlaying) return;
      const ctx = audioCtxRef.current;
      const filter = lowpassFilterRef.current;

      let targetFreq: number;
      switch (data.phase) {
        case 'inhale':
          targetFreq = FILTER_CLOSED + (FILTER_OPEN - FILTER_CLOSED) * data.progress;
          break;
        case 'exhale':
          targetFreq = FILTER_OPEN - (FILTER_OPEN - FILTER_CENTER) * data.progress;
          break;
        case 'hold':
          targetFreq = filter.frequency.value; // Hold current
          return;
        case 'rest':
          targetFreq = FILTER_CENTER;
          break;
        default:
          targetFreq = FILTER_CENTER;
      }

      filter.frequency.cancelScheduledValues(ctx.currentTime);
      filter.frequency.setValueAtTime(filter.frequency.value, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(targetFreq, ctx.currentTime + 0.15);
    });

    return unsubscribe;
  }, [isPlaying]);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Lowpass filter — modulated by breath pacer
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = FILTER_CENTER;
    lowpass.Q.value = 2; // Resonance for audible sweep
    lowpassFilterRef.current = lowpass;

    // Master gain for fade in/out
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(lowpass);
    lowpass.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Create oscillators for each layer
    LAYERS.forEach(layer => {
      const osc = ctx.createOscillator();
      osc.type = layer.type;
      osc.frequency.value = layer.frequency;

      // Slight frequency modulation for organic feel
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.1 + Math.random() * 0.15;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = layer.frequency * 0.003;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      const gainNode = ctx.createGain();
      gainNode.gain.value = layerGains[layer.id];

      osc.connect(gainNode);
      gainNode.connect(masterGain);
      osc.start();

      oscillatorsRef.current[layer.id] = osc;
      gainNodesRef.current[layer.id] = gainNode;
    });
  }, [layerGains]);

  const togglePlay = useCallback(() => {
    if (prefersReduced) return;

    if (!isPlaying) {
      initAudio();
      const ctx = audioCtxRef.current!;
      if (ctx.state === 'suspended') ctx.resume();

      masterGainRef.current!.gain.cancelScheduledValues(ctx.currentTime);
      masterGainRef.current!.gain.setValueAtTime(0, ctx.currentTime);
      masterGainRef.current!.gain.linearRampToValueAtTime(1, ctx.currentTime + 2);
      setIsPlaying(true);
    } else {
      const ctx = audioCtxRef.current;
      if (ctx && masterGainRef.current) {
        masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, ctx.currentTime);
        masterGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        setTimeout(() => { setIsPlaying(false); }, 1500);
      }
    }
  }, [isPlaying, initAudio, prefersReduced]);

  const updateLayerGain = useCallback((layerId: string, value: number) => {
    setLayerGains(prev => ({ ...prev, [layerId]: value }));
    const gainNode = gainNodesRef.current[layerId];
    if (gainNode && audioCtxRef.current) {
      gainNode.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
      gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtxRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(value, audioCtxRef.current.currentTime + 0.3);
    }
  }, []);

  useEffect(() => {
    return () => { if (audioCtxRef.current) audioCtxRef.current.close(); };
  }, []);

  if (prefersReduced) return null;

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center border border-[#c9a96e]/30 bg-[#050505]/90 backdrop-blur-xl hover:border-[#c9a96e] transition-colors duration-500 group"
        aria-label={isOpen ? 'Close soundscape controls' : 'Open soundscape controls'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, ...SPRING.gentle }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#c9a96e]/70 group-hover:text-[#c9a96e] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 12h2l3-7 4 14 4-10 3 6h4" />
        </svg>
        {isPlaying && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#c9a96e] rounded-full animate-pulse" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={SPRING.gentle}
            className="fixed bottom-20 right-6 z-50 w-72 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.06] p-5"
            role="dialog"
            aria-label="Soundscape synthesizer controls"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">
                  Neuro-Somatic
                </p>
                <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0]">
                  Soundscape
                </p>
              </div>
              <button
                onClick={togglePlay}
                className={`px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border transition-all duration-300 ${
                  isPlaying
                    ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10'
                    : 'border-[#c9a96e]/30 text-[#c9a96e]/70 hover:text-[#c9a96e] hover:border-[#c9a96e]'
                }`}
                aria-label={isPlaying ? 'Pause soundscape' : 'Play soundscape'}
              >
                {isPlaying ? 'Active' : 'Engage'}
              </button>
            </div>

            <p className="text-[10px] text-[#8a8078]/70 font-[var(--font-inter)] font-light leading-relaxed mb-4">
              Low-frequency resonance for nervous system calibration. Not music — frequency architecture.
            </p>

            {/* Breath coupling indicator */}
            <div className="flex items-center gap-2 mb-3 px-2 py-1.5 bg-[#050505] border border-white/[0.04]">
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                breathPhase === 'inhale' ? 'bg-[#c9a96e]' :
                breathPhase === 'exhale' ? 'bg-[#8a8078]' :
                breathPhase === 'hold' ? 'bg-[#d4b87a]' :
                breathPhase === 'standby' ? 'bg-[#3a3530]' : 'bg-[#3a3530]'
              }`} />
              <span className="text-[8px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">
                {breathPhase === 'standby'
                  ? 'Breath sync: standby'
                  : `Breath sync: ${breathPhase} → filter ${breathPhase === 'inhale' ? 'opening' : breathPhase === 'exhale' ? 'closing' : 'held'}`}
              </span>
            </div>

            <div className="space-y-3">
              {LAYERS.map(layer => (
                <div key={layer.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] tracking-[0.15em] uppercase text-[#8a8078] font-[var(--font-inter)]">
                      {layer.label}
                    </span>
                    <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)]">
                      {layer.frequency}Hz
                    </span>
                  </div>
                  <input
                    type="range" min="0" max="0.2" step="0.005"
                    value={layerGains[layer.id]}
                    onChange={(e) => updateLayerGain(layer.id, parseFloat(e.target.value))}
                    className="w-full h-1 bg-[#1a1815] rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#c9a96e] [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
                    aria-label={`${layer.label} volume — ${layer.description}`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.04]">
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isPlaying ? 'bg-[#c9a96e] animate-pulse' : 'bg-[#3a3530]'}`} />
                <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">
                  {isPlaying ? 'Resonance active — neural entrainment engaged' : 'Standby — awaiting activation'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
