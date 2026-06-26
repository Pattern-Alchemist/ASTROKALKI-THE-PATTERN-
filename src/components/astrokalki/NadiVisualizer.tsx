'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * NadiVisualizer — Ida / Pingala / Sushumna Prana Flow
 *
 * The three primary nadis (subtle channels):
 *   - Ida (left, lunar, cooling, parasympathetic)
 *   - Pingala (right, solar, heating, sympathetic)
 *   - Sushumna (center, neutral, awakened when Ida & Pingala balance)
 *
 * User controls breath dominance (Left / Right / Balanced). Animated
 * prana particles flow through the dominant nadi. Sustained balance
 * triggers the Ajna awakening pulse.
 */

type Dominance = 'ida' | 'pingala' | 'balanced';

interface Particle {
  id: number;
  t: number; // 0..1 along path
  speed: number;
}

const NADI_INFO: Record<Dominance, {
  name: string; sanskrit: string; color: string; quality: string;
  physiology: string; practice: string; ratio: string;
}> = {
  ida: {
    name: 'Ida Nadi',
    sanskrit: 'Idā',
    color: '#a0b5c9',
    quality: 'Lunar · Cooling · Parasympathetic',
    physiology: 'Activates the right brain hemisphere and parasympathetic nervous system. Dominant during left-nostril breathing, night, and introspective states.',
    practice: 'Chandra Bhedana Pranayama — inhale left, exhale right. Cools, calms, induces sleep.',
    ratio: 'Left nostril dominant',
  },
  pingala: {
    name: 'Pingala Nadi',
    sanskrit: 'Piṅgalā',
    color: '#c97032',
    quality: 'Solar · Heating · Sympathetic',
    physiology: 'Activates the left brain hemisphere and sympathetic nervous system. Dominant during right-nostril breathing, daytime, and active states.',
    practice: 'Surya Bhedana Pranayama — inhale right, exhale left. Heats, energizes, sharpens focus.',
    ratio: 'Right nostril dominant',
  },
  balanced: {
    name: 'Sushumna Nadi',
    sanskrit: 'Suṣumnā',
    color: '#c9a96e',
    quality: 'Central · Neutral · Awakened',
    physiology: 'When Ida and Pingala balance, prana enters Sushumna — the central channel. Kundalini rises through the chakras. This is the rarest and most sought-after state.',
    practice: 'Nadi Shodhana — alternate nostril breathing 4-4-4-4. Aims to balance and open Sushumna.',
    ratio: 'Both nostrils equal',
  },
};

export default function NadiVisualizer() {
  const [dominance, setDominance] = useState<Dominance>('ida');
  const [balanceHoldMs, setBalanceHoldMs] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const balanceStartRef = useRef<number | null>(null);

  // Spawn particles along the active nadi path
  useEffect(() => {
    let raf: number;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;

      // Track balance hold time
      if (dominance === 'balanced') {
        if (balanceStartRef.current === null) balanceStartRef.current = now;
        setBalanceHoldMs(now - balanceStartRef.current);
      } else {
        balanceStartRef.current = null;
        setBalanceHoldMs(0);
      }

      // Spawn particles
      const spawnInterval = dominance === 'balanced' ? 250 : 400;
      if (now - lastSpawnRef.current > spawnInterval) {
        lastSpawnRef.current = now;
        setParticles(prev => [
          ...prev.slice(-30),
          { id: particleIdRef.current++, t: 0, speed: 0.0008 + Math.random() * 0.0004 },
        ]);
      }

      // Advance particles
      setParticles(prev =>
        prev
          .map(p => ({ ...p, t: p.t + p.speed * dt }))
          .filter(p => p.t < 1)
      );

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dominance]);

  const info = NADI_INFO[dominance];
  const isAwakening = balanceHoldMs > 5000; // 5 seconds of balance = awakening pulse

  // SVG paths for each nadi — Sushumna is straight, Ida and Pingala weave
  const sushumnaPath = 'M 100 30 L 100 270';
  const idaPath = 'M 100 30 Q 70 60 100 90 Q 130 120 100 150 Q 70 180 100 210 Q 130 240 100 270';
  const pingalaPath = 'M 100 30 Q 130 60 100 90 Q 70 120 100 150 Q 130 180 100 210 Q 70 240 100 270';

  // Get particle position along path
  const getParticlePos = (path: string, t: number) => {
    // Use SVG path sampling via DOM (simplified — use parametric curves manually)
    const segments = 8;
    const segT = t * segments;
    const segIdx = Math.floor(segT);
    const localT = segT - segIdx;
    // Simplified: parametric sampling for each curve type
    if (path === sushumnaPath) {
      return { x: 100, y: 30 + 240 * t };
    } else if (path === idaPath) {
      // Approximate the weaving path
      const y = 30 + 240 * t;
      const phase = t * 4 * Math.PI;
      const x = 100 - 30 * Math.sin(phase);
      return { x, y };
    } else if (path === pingalaPath) {
      const y = 30 + 240 * t;
      const phase = t * 4 * Math.PI;
      const x = 100 + 30 * Math.sin(phase);
      return { x, y };
    }
    return { x: 100, y: 30 };
  };

  const activePath = dominance === 'balanced' ? sushumnaPath : dominance === 'ida' ? idaPath : pingalaPath;

  // Chakra intersection points (y positions on sushumna)
  const chakras = [
    { y: 50, name: 'Ajna', color: '#6a5d9a' },
    { y: 90, name: 'Vishuddha', color: '#5d8a9a' },
    { y: 135, name: 'Anahata', color: '#7da87a' },
    { y: 180, name: 'Manipura', color: '#c9a96e' },
    { y: 220, name: 'Svadhisthana', color: '#c97032' },
    { y: 260, name: 'Muladhara', color: '#a83232' },
  ];

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${isAwakening ? 'bg-[#c9a96e] animate-pulse' : 'bg-[#3a3530]'}`} />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Pranic Topology
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Nadi Visualizer</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        The three principal subtle channels. Direct breath dominance to see prana route through Ida (lunar) or Pingala (solar). Balance both — and Sushumna opens.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5">
        {/* SVG nadi system */}
        <div className="border border-white/[0.04] bg-[#050505] p-3 relative">
          <svg viewBox="0 0 200 300" className="w-full h-auto">
            {/* All three nadi paths (faint) */}
            <path d={idaPath} fill="none" stroke="#a0b5c9" strokeWidth="0.6" opacity={dominance === 'ida' ? 0.6 : 0.15} />
            <path d={pingalaPath} fill="none" stroke="#c97032" strokeWidth="0.6" opacity={dominance === 'pingala' ? 0.6 : 0.15} />
            <path d={sushumnaPath} fill="none" stroke="#c9a96e" strokeWidth="0.8" opacity={dominance === 'balanced' ? 0.8 : 0.25} />

            {/* Chakra nodes on sushumna */}
            {chakras.map((c, i) => (
              <g key={i}>
                <circle
                  cx="100" cy={c.y} r="4"
                  fill={dominance === 'balanced' ? c.color : '#1a1815'}
                  stroke={c.color} strokeWidth="0.6"
                  opacity={dominance === 'balanced' ? 0.8 : 0.4}
                  style={{ transition: 'all 0.4s' }}
                />
                <text x="115" y={c.y + 2} fill="#3a3530" fontSize="5" fontFamily="var(--font-inter)">{c.name}</text>
              </g>
            ))}

            {/* Particles */}
            {particles.map(p => {
              const pos = getParticlePos(activePath, p.t);
              return (
                <circle
                  key={p.id}
                  cx={pos.x} cy={pos.y} r="1.5"
                  fill={info.color}
                  opacity={1 - p.t * 0.5}
                />
              );
            })}

            {/* Ajna awakening pulse */}
            {isAwakening && (
              <motion.circle
                cx="100" cy="50" r="5"
                fill="none" stroke="#c9a96e" strokeWidth="0.8"
                initial={{ r: 5, opacity: 0.8 }}
                animate={{ r: 25, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}

            {/* Labels */}
            <text x="40" y="30" fill="#a0b5c9" fontSize="6" fontFamily="var(--font-cormorant)" fontWeight="700" opacity={dominance === 'ida' ? 1 : 0.5}>Ida</text>
            <text x="155" y="30" fill="#c97032" fontSize="6" fontFamily="var(--font-cormorant)" fontWeight="700" opacity={dominance === 'pingala' ? 1 : 0.5}>Pingala</text>
            <text x="100" y="20" textAnchor="middle" fill="#c9a96e" fontSize="6" fontFamily="var(--font-cormorant)" fontWeight="700" opacity={dominance === 'balanced' ? 1 : 0.5}>Sushumna</text>
          </svg>

          {/* Balance meter */}
          <div className="mt-3 pt-3 border-t border-white/[0.04]">
            <div className="flex justify-between text-[8px] text-[#8a8078]/40 font-[var(--font-inter)] mb-1">
              <span>Balance Hold</span>
              <span>{(balanceHoldMs / 1000).toFixed(1)}s</span>
            </div>
            <div className="h-1 bg-white/[0.04] relative overflow-hidden">
              <motion.div
                className="h-full bg-[#c9a96e]"
                animate={{ width: `${Math.min((balanceHoldMs / 5000) * 100, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <span className="text-[7px] text-[#8a8078]/40 font-[var(--font-inter)] italic mt-1 block">
              Hold balance 5s → Ajna awakening
            </span>
          </div>
        </div>

        {/* Controls + info */}
        <div>
          {/* Dominance selector */}
          <div className="grid grid-cols-3 gap-1.5 mb-4">
            {(['ida', 'balanced', 'pingala'] as Dominance[]).map(d => (
              <button
                key={d}
                onClick={() => setDominance(d)}
                className={`py-2.5 text-[9px] tracking-[0.15em] uppercase font-[var(--font-inter)] font-medium border transition-all duration-300 ${
                  dominance === d
                    ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5'
                    : 'border-white/[0.04] text-[#8a8078]/60 hover:border-white/[0.08]'
                }`}
                style={dominance === d ? { borderColor: NADI_INFO[d].color, color: NADI_INFO[d].color, background: `${NADI_INFO[d].color}10` } : {}}
              >
                {d === 'ida' ? '← Left' : d === 'pingala' ? 'Right →' : '● Balance'}
              </button>
            ))}
          </div>

          {/* Active nadi info */}
          <div className="border border-white/[0.04] bg-[#050505] p-4">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="w-3 h-3 rounded-full" style={{ background: info.color }} />
              <h3 className="font-[var(--font-cormorant)] text-lg font-bold" style={{ color: info.color }}>
                {info.name}
              </h3>
              <span className="text-[9px] text-[#8a8078]/50 font-[var(--font-inter)] italic">— {info.sanskrit}</span>
            </div>
            <p className="text-[9px] text-[#8a8078]/60 font-[var(--font-inter)] italic mb-3">
              {info.quality} · {info.ratio}
            </p>

            <div className="space-y-3">
              <div>
                <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block mb-1">
                  Physiology
                </span>
                <p className="text-[10px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed">
                  {info.physiology}
                </p>
              </div>
              <div>
                <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] block mb-1">
                  Recommended Practice
                </span>
                <p className="text-[10px] text-[#c9a96e]/80 font-[var(--font-cormorant)] italic leading-relaxed">
                  {info.practice}
                </p>
              </div>
            </div>

            {isAwakening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 pt-3 border-t border-[#c9a96e]/20"
              >
                <p className="text-[10px] text-[#c9a96e] font-[var(--font-cormorant)] italic">
                  ✦ Sushumna active. Prana ascends. Remain here.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
