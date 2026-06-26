'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from './hooks/useReducedMotion';

/**
 * ChakraTuner — Seven-Chakra Solfeggio Resonator
 *
 * Renders the 7 Vedic chakras as an interactive vertical column. Each
 * chakra is associated with a sacred yantra (geometric form), a bija
 * mantra, an element, and a solfeggio frequency. Clicking a chakra
 * plays its frequency via Web Audio API and animates its yantra.
 */

interface Chakra {
  id: string;
  name: string;
  sanskrit: string;
  bija: string;
  element: string;
  color: string;
  frequency: number; // Solfeggio Hz
  petals: number;
  description: string;
  blockedSign: string;
  yantra: 'square' | 'circle' | 'triangle' | 'hexagram' | 'lotus' | 'crescent' | 'thousand';
}

const CHAKRAS: Chakra[] = [
  {
    id: 'muladhara',
    name: 'Root',
    sanskrit: 'Muladhara',
    bija: 'LAM',
    element: 'Prithvi (Earth)',
    color: '#a83232',
    frequency: 396,
    petals: 4,
    description: 'Foundation, survival, tribal belonging. The base from which all ascending energy rises.',
    blockedSign: 'Anxiety, scarcity thinking, lower-back pain, hypervigilance.',
    yantra: 'square',
  },
  {
    id: 'svadhisthana',
    name: 'Sacral',
    sanskrit: 'Svadhisthana',
    bija: 'VAM',
    element: 'Apas (Water)',
    color: '#c97032',
    frequency: 417,
    petals: 6,
    description: 'Creativity, sexuality, emotional fluidity. The pelvis as creative cauldron.',
    blockedSign: 'Guilt, creative stagnation, intimacy avoidance, emotional flooding.',
    yantra: 'crescent',
  },
  {
    id: 'manipura',
    name: 'Solar Plexus',
    sanskrit: 'Manipura',
    bija: 'RAM',
    element: 'Tejas (Fire)',
    color: '#c9a96e',
    frequency: 528,
    petals: 10,
    description: 'Will, agency, metabolization of experience. The fire that transmutes input into action.',
    blockedSign: 'Shame, will-paralysis, digestive disorders, chronic deference.',
    yantra: 'triangle',
  },
  {
    id: 'anahata',
    name: 'Heart',
    sanskrit: 'Anahata',
    bija: 'YAM',
    element: 'Vayu (Air)',
    color: '#7da87a',
    frequency: 639,
    petals: 12,
    description: 'Compassion, integration, the bridge between lower and higher self.',
    blockedSign: 'Grief storage, armoring, conditional love, breath restriction.',
    yantra: 'hexagram',
  },
  {
    id: 'vishuddha',
    name: 'Throat',
    sanskrit: 'Vishuddha',
    bija: 'HAM',
    element: 'Akasha (Ether)',
    color: '#5d8a9a',
    frequency: 741,
    petals: 16,
    description: 'Truth, authentic expression, the purification of voice.',
    blockedSign: 'Throat constriction, swallowed words, fear of speaking, lying.',
    yantra: 'circle',
  },
  {
    id: 'ajna',
    name: 'Third Eye',
    sanskrit: 'Ajna',
    bija: 'OM (AUM)',
    element: 'Mahat (Cosmic Mind)',
    color: '#6a5d9a',
    frequency: 852,
    petals: 96,
    description: 'Intuitive perception, pattern recognition beyond logic.',
    blockedSign: 'Rumination, mental rigidity, dismissed intuition, projection.',
    yantra: 'lotus',
  },
  {
    id: 'sahasrara',
    name: 'Crown',
    sanskrit: 'Sahasrara',
    bija: 'OM (Silence)',
    element: 'Brahman (Absolute)',
    color: '#c9c0d4',
    frequency: 963,
    petals: 1000,
    description: 'Unity consciousness, dissolution of the separate self.',
    blockedSign: 'Isolation, spiritual cynicism, meaning collapse, attachment to identity.',
    yantra: 'thousand',
  },
];

function YantraSVG({ type, color, spinning }: { type: Chakra['yantra']; color: string; spinning: boolean }) {
  const rotate = spinning ? { rotate: 360 } : { rotate: 0 };
  const transition = spinning ? { duration: 12, repeat: Infinity, ease: 'linear' as const } : { duration: 0 };

  switch (type) {
    case 'square':
      return (
        <motion.g animate={rotate} transition={transition} style={{ transformOrigin: '50px 50px' }}>
          <rect x="20" y="20" width="60" height="60" fill="none" stroke={color} strokeWidth="0.8" />
          <rect x="30" y="30" width="40" height="40" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.6" />
          <line x1="20" y1="20" x2="80" y2="80" stroke={color} strokeWidth="0.4" strokeOpacity="0.5" />
          <line x1="80" y1="20" x2="20" y2="80" stroke={color} strokeWidth="0.4" strokeOpacity="0.5" />
        </motion.g>
      );
    case 'triangle':
      return (
        <motion.g animate={rotate} transition={transition} style={{ transformOrigin: '50px 50px' }}>
          <polygon points="50,15 85,75 15,75" fill="none" stroke={color} strokeWidth="0.8" />
          <polygon points="50,85 15,25 85,25" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.6" />
        </motion.g>
      );
    case 'hexagram':
      return (
        <motion.g animate={rotate} transition={transition} style={{ transformOrigin: '50px 50px' }}>
          <polygon points="50,12 84,72 16,72" fill="none" stroke={color} strokeWidth="0.7" />
          <polygon points="50,88 16,28 84,28" fill="none" stroke={color} strokeWidth="0.7" />
          <circle cx="50" cy="50" r="22" fill="none" stroke={color} strokeWidth="0.4" strokeOpacity="0.5" />
        </motion.g>
      );
    case 'circle':
      return (
        <motion.g animate={rotate} transition={transition} style={{ transformOrigin: '50px 50px' }}>
          <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth="0.8" />
          <circle cx="50" cy="50" r="22" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.6" />
          <circle cx="50" cy="50" r="12" fill="none" stroke={color} strokeWidth="0.3" strokeOpacity="0.4" />
          {[0, 60, 120, 180, 240, 300].map(deg => (
            <line key={deg} x1="50" y1="50"
              x2={50 + 32 * Math.cos((deg * Math.PI) / 180)}
              y2={50 + 32 * Math.sin((deg * Math.PI) / 180)}
              stroke={color} strokeWidth="0.3" strokeOpacity="0.4" />
          ))}
        </motion.g>
      );
    case 'crescent':
      return (
        <motion.g animate={rotate} transition={transition} style={{ transformOrigin: '50px 50px' }}>
          <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="0.8" />
          <path d="M 35 25 A 30 30 0 0 1 35 75 A 22 22 0 0 0 35 25 Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0.5" />
          <circle cx="65" cy="50" r="3" fill={color} fillOpacity="0.5" />
        </motion.g>
      );
    case 'lotus':
      return (
        <motion.g animate={rotate} transition={transition} style={{ transformOrigin: '50px 50px' }}>
          <circle cx="50" cy="50" r="8" fill="none" stroke={color} strokeWidth="0.6" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x1 = 50 + 10 * Math.cos(angle);
            const y1 = 50 + 10 * Math.sin(angle);
            const x2 = 50 + 32 * Math.cos(angle);
            const y2 = 50 + 32 * Math.sin(angle);
            return (
              <ellipse key={i}
                cx={(x1 + x2) / 2} cy={(y1 + y2) / 2}
                rx="14" ry="6"
                fill="none" stroke={color} strokeWidth="0.5"
                transform={`rotate(${i * 45} ${(x1 + x2) / 2} ${(y1 + y2) / 2})`}
              />
            );
          })}
        </motion.g>
      );
    case 'thousand':
      return (
        <motion.g animate={rotate} transition={transition} style={{ transformOrigin: '50px 50px' }}>
          <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth="0.4" />
          <circle cx="50" cy="50" r="24" fill="none" stroke={color} strokeWidth="0.4" />
          <circle cx="50" cy="50" r="16" fill="none" stroke={color} strokeWidth="0.4" />
          <circle cx="50" cy="50" r="8" fill="none" stroke={color} strokeWidth="0.4" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            return (
              <line key={i} x1="50" y1="50"
                x2={50 + 32 * Math.cos(angle)}
                y2={50 + 32 * Math.sin(angle)}
                stroke={color} strokeWidth="0.2" strokeOpacity="0.5" />
            );
          })}
        </motion.g>
      );
  }
}

export default function ChakraTuner() {
  const [activeChakra, setActiveChakra] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.08);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const prefersReduced = useReducedMotion();

  const stopTone = useCallback(() => {
    if (oscillatorRef.current && gainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      oscillatorRef.current.stop(ctx.currentTime + 0.5);
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const playTone = useCallback((freq: number, vol: number) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    if (oscillatorRef.current) {
      stopTone();
    }
    setTimeout(() => {
      if (!audioCtxRef.current) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0;
      gain.gain.exponentialRampToValueAtTime(vol, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      oscillatorRef.current = osc;
      gainRef.current = gain;
      setIsPlaying(true);
    }, 50);
  }, [stopTone]);

  useEffect(() => () => stopTone(), [stopTone]);

  const handleChakraClick = (chakra: Chakra) => {
    if (activeChakra === chakra.id && isPlaying) {
      stopTone();
      setActiveChakra(null);
    } else {
      setActiveChakra(chakra.id);
      playTone(chakra.frequency, volume);
    }
  };

  const active = CHAKRAS.find(c => c.id === activeChakra);

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#c9a96e] animate-pulse' : 'bg-[#3a3530]'}`} />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Subtle Body Resonance
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Chakra Tuner</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Activate each center with its solfeggio frequency. Hold the tone. Notice which chakra resists — resistance is information.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-5">
        {/* Chakra column */}
        <div className="flex flex-col gap-1.5">
          {CHAKRAS.map(chakra => {
            const isActive = activeChakra === chakra.id;
            return (
              <button
                key={chakra.id}
                onClick={() => handleChakraClick(chakra)}
                className="flex items-center gap-3 p-2 border transition-all duration-300 text-left group"
                style={{
                  borderColor: isActive ? chakra.color : 'rgba(255,255,255,0.04)',
                  background: isActive ? `${chakra.color}10` : 'transparent',
                }}
                aria-label={`Activate ${chakra.sanskrit} chakra at ${chakra.frequency} Hz`}
              >
                <div className="w-8 h-8 shrink-0 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <YantraSVG type={chakra.yantra} color={isActive ? chakra.color : '#3a3530'} spinning={isActive && !prefersReduced} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-[11px] font-[var(--font-cormorant)] font-bold"
                      style={{ color: isActive ? chakra.color : '#f5f3f0' }}
                    >
                      {chakra.sanskrit}
                    </span>
                    <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)]">{chakra.frequency} Hz</span>
                  </div>
                  <span className="text-[8px] text-[#8a8078]/60 font-[var(--font-inter)] uppercase tracking-[0.1em]">
                    {chakra.name} · {chakra.bija}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active chakra detail */}
        <div className="border border-white/[0.04] bg-[#050505] p-4 min-h-[280px]">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-24 h-24 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <YantraSVG type={active.yantra} color={active.color} spinning={!prefersReduced} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">
                      {active.element}
                    </span>
                    <h3 className="font-[var(--font-cormorant)] text-xl font-bold" style={{ color: active.color }}>
                      {active.sanskrit}
                    </h3>
                    <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] uppercase tracking-[0.15em] mt-0.5">
                      Bija: {active.bija} · {active.petals === 1000 ? '1000' : active.petals} petals
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] block mb-1">
                      Function
                    </span>
                    <p className="text-[11px] text-[#f5f3f0]/80 font-[var(--font-inter)] font-light leading-relaxed">
                      {active.description}
                    </p>
                  </div>
                  <div>
                    <span className="text-[8px] tracking-[0.2em] uppercase text-[#a07050]/60 font-[var(--font-inter)] block mb-1">
                      Blocked Signal
                    </span>
                    <p className="text-[11px] text-[#a07050]/70 font-[var(--font-inter)] font-light leading-relaxed">
                      {active.blockedSign}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/[0.04]">
                    <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/40 font-[var(--font-inter)]">
                      Tone: {isPlaying ? 'Active' : 'Stopped'} · {active.frequency} Hz
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 mb-4 opacity-30">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#3a3530" strokeWidth="0.6" />
                    <circle cx="50" cy="50" r="22" fill="none" stroke="#3a3530" strokeWidth="0.4" />
                    <circle cx="50" cy="50" r="10" fill="none" stroke="#3a3530" strokeWidth="0.4" />
                  </svg>
                </div>
                <p className="text-[11px] text-[#8a8078]/60 font-[var(--font-inter)] font-light italic max-w-[220px]">
                  Select a chakra to activate its frequency and reveal its diagnostic.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Volume */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/40 font-[var(--font-inter)]">Volume</span>
        <input
          type="range" min={0.01} max={0.2} step={0.01}
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          className="flex-1 max-w-[200px] accent-[#c9a96e]"
          aria-label="Chakra tone volume"
        />
        <span className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)]">{Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
}
