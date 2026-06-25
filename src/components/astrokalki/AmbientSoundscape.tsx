'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SPRING } from './utils/animation';

/**
 * AmbientSoundscape — Neuro-Somatic Soundscape Synthesizer
 * 
 * Generates atmospheric low-frequency sine waves and harmonics
 * using the Web Audio API. Creates an immersive, meditative
 * sonic environment aligned with AstroKalki's clinical aesthetic.
 * 
 * Features:
 * - 4 frequency layers (root drone, harmonic, sub-bass, ethereal)
 * - Volume control per layer
 * - Master on/off with fade
 * - Respects prefers-reduced-motion (no auto-play)
 * - Accessible controls with ARIA labels
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

export default function AmbientSoundscape() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [layerGains, setLayerGains] = useState<Record<string, number>>(
    Object.fromEntries(LAYERS.map(l => [l.id, l.gain]))
  );
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<Record<string, OscillatorNode>>({});
  const gainNodesRef = useRef<Record<string, GainNode>>({});
  const masterGainRef = useRef<GainNode | null>(null);
  const prefersReduced = useReducedMotion();

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Master gain for fade in/out
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Create oscillators for each layer
    LAYERS.forEach(layer => {
      const osc = ctx.createOscillator();
      osc.type = layer.type;
      osc.frequency.value = layer.frequency;

      // Slight frequency modulation for organic feel
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.1 + Math.random() * 0.15; // Very slow drift
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = layer.frequency * 0.003; // Tiny pitch wobble
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

      // Fade in over 2 seconds
      masterGainRef.current!.gain.cancelScheduledValues(ctx.currentTime);
      masterGainRef.current!.gain.setValueAtTime(0, ctx.currentTime);
      masterGainRef.current!.gain.linearRampToValueAtTime(1, ctx.currentTime + 2);
      setIsPlaying(true);
    } else {
      const ctx = audioCtxRef.current;
      if (ctx && masterGainRef.current) {
        // Fade out over 1.5 seconds
        masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, ctx.currentTime);
        masterGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        setTimeout(() => {
          setIsPlaying(false);
        }, 1500);
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  if (prefersReduced) return null;

  return (
    <>
      {/* Floating trigger button — bottom right */}
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
        {/* Sound wave icon */}
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#c9a96e]/70 group-hover:text-[#c9a96e] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 12h2l3-7 4 14 4-10 3 6h4" />
        </svg>
        {/* Playing indicator */}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#c9a96e] rounded-full animate-pulse" />
        )}
      </motion.button>

      {/* Control panel */}
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
            {/* Header */}
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

            {/* Description */}
            <p className="text-[10px] text-[#8a8078]/70 font-[var(--font-inter)] font-light leading-relaxed mb-4">
              Low-frequency resonance for nervous system calibration. Not music — frequency architecture.
            </p>

            {/* Layer controls */}
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
                    type="range"
                    min="0"
                    max="0.2"
                    step="0.005"
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

            {/* Visual indicator */}
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
