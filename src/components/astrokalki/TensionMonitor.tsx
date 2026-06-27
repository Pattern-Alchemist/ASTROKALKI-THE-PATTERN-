'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * TensionMonitor — Micro-Somatic Facial Tension Monitor (Biometric Mock)
 * 
 * Simulated camera tracking interface that "scans" for tension blocks.
 * Provides interactive warnings about jaw clenching, brow furrowing, etc.
 */

interface TensionZone {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  baseIntensity: number;
}

const ZONES: TensionZone[] = [
  { id: 'jaw', label: 'Jaw', description: 'Clenching indicates suppressed aggression or unexpressed boundary violation. The jaw holds what the voice cannot.', x: 50, y: 75, baseIntensity: 0.6 },
  { id: 'brow', label: 'Brow', description: 'Furrowing signals cognitive overload — the prefrontal cortex is attempting to resolve an emotional problem through logic alone.', x: 50, y: 35, baseIntensity: 0.7 },
  { id: 'temples', label: 'Temples', description: 'Tension here indicates Vayu excess — the nervous system is running at elevated frequency without grounding.', x: 30, y: 40, baseIntensity: 0.45 },
  { id: 'throat', label: 'Throat', description: 'The Vishuddha block — unexpressed truth. The throat tightens when authentic communication is suppressed.', x: 50, y: 90, baseIntensity: 0.55 },
];

export default function TensionMonitor() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [scanActive, setScanActive] = useState(false);
  const [intensities, setIntensities] = useState<Record<string, number>>({});

  // Simulate fluctuating tension readings
  useEffect(() => {
    if (!scanActive) return;
    const interval = setInterval(() => {
      setIntensities(prev => {
        const next = { ...prev };
        ZONES.forEach(z => {
          const fluctuation = (Math.random() - 0.5) * 0.15;
          next[z.id] = Math.max(0.1, Math.min(1, (prev[z.id] || z.baseIntensity) + fluctuation));
        });
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [scanActive]);

  const startScan = () => {
    setScanActive(true);
    const initial: Record<string, number> = {};
    ZONES.forEach(z => { initial[z.id] = z.baseIntensity; });
    setIntensities(initial);
  };

  const zone = ZONES.find(z => z.id === activeZone);

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${scanActive ? 'bg-[#c9a96e] animate-pulse' : 'bg-[#3a3530]'}`} />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Somatic Scanner
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-2">
        Facial Tension Monitor
      </p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Simulated biometric interface. Identifies micro-somatic tension blocks that form during intellectual processing. Click zones for diagnostic.
      </p>

      {/* Face wireframe with tension hotspots */}
      <div className="relative w-48 h-56 mx-auto mb-4">
        <svg viewBox="0 0 100 120" className="w-full h-full">
          {/* Face outline */}
          <ellipse cx="50" cy="55" rx="32" ry="42" fill="none" stroke="#1a1815" strokeWidth="0.5" />
          {/* Eyes */}
          <ellipse cx="38" cy="48" rx="6" ry="3" fill="none" stroke="#3a3530" strokeWidth="0.5" />
          <ellipse cx="62" cy="48" rx="6" ry="3" fill="none" stroke="#3a3530" strokeWidth="0.5" />
          {/* Nose */}
          <line x1="50" y1="45" x2="50" y2="62" stroke="#1a1815" strokeWidth="0.5" />
          <line x1="46" y1="62" x2="54" y2="62" stroke="#1a1815" strokeWidth="0.5" />
          {/* Mouth */}
          <path d="M 42 72 Q 50 76 58 72" fill="none" stroke="#1a1815" strokeWidth="0.5" />
          {/* Target grid */}
          <line x1="20" y1="40" x2="80" y2="40" stroke="#1a1815" strokeWidth="0.3" strokeDasharray="2 4" />
          <line x1="20" y1="60" x2="80" y2="60" stroke="#1a1815" strokeWidth="0.3" strokeDasharray="2 4" />
          <line x1="20" y1="80" x2="80" y2="80" stroke="#1a1815" strokeWidth="0.3" strokeDasharray="2 4" />

          {/* Tension hotspots */}
          {ZONES.map(z => {
            const intensity = intensities[z.id] || 0;
            const isActive = activeZone === z.id;
            const radius = scanActive ? 4 + intensity * 6 : 4;
            const color = intensity > 0.6 ? '#c9a96e' : intensity > 0.4 ? '#8a8078' : '#3a3530';

            return (
              <g key={z.id} onClick={() => setActiveZone(isActive ? null : z.id)} style={{ cursor: 'pointer' }}>
                <circle cx={z.x} cy={z.y} r={radius} fill={color} fillOpacity={scanActive ? 0.3 : 0.1} stroke={color} strokeWidth={isActive ? 1.5 : 0.5} />
                <text x={z.x} y={z.y + radius + 8} textAnchor="middle" fill={isActive ? '#c9a96e' : '#3a3530'} fontSize="5" fontFamily="var(--font-inter)">
                  {z.label}
                </text>
              </g>
            );
          })}

          {/* Scan line animation */}
          {scanActive && (
            <motion.line
              x1="15" x2="85"
              animate={{ y1: [20, 100, 20], y2: [20, 100, 20] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              stroke="#c9a96e"
              strokeWidth="0.3"
              strokeOpacity="0.4"
            />
          )}
        </svg>
      </div>

      {/* Zone detail */}
      {zone && (
        <div className="bg-[#050505] border border-white/[0.04] p-3 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-[var(--font-cormorant)] text-sm text-[#f5f3f0] font-bold">{zone.label}</span>
            {scanActive && (
              <span className="text-[8px] text-[#c9a96e]/50 font-[var(--font-inter)]">
                Intensity: {((intensities[zone.id] || 0) * 100).toFixed(0)}%
              </span>
            )}
          </div>
          <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed">{zone.description}</p>
        </div>
      )}

      {/* Scan toggle */}
      <button
        onClick={() => scanActive ? setScanActive(false) : startScan()}
        className={`px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border transition-all duration-300 ${
          scanActive ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10' : 'border-white/[0.06] text-[#8a8078]/60 hover:text-[#8a8078]'
        }`}
      >
        {scanActive ? 'Scanning...' : 'Initiate Scan'}
      </button>
    </div>
  );
}
