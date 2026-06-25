'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * HoraClock — Chronobiological Hora Clock & Astrological Alignment Ticker
 * 
 * Real-time Vedic planetary ruler clock mapping hours to
 * clinical somatic focus windows.
 */

interface HoraData {
  planet: string;
  sanskrit: string;
  focus: string;
  optimalActivity: string;
  avoidActivity: string;
  element: string;
}

const HORA_SEQUENCE: HoraData[] = [
  { planet: 'Sun', sanskrit: 'Surya', focus: 'Authority, vitality, sovereign action', optimalActivity: 'Strategic decisions, leadership actions, boundary declarations', avoidActivity: 'Self-doubt, deferring to others, hiding from visibility', element: 'Tejas (Fire)' },
  { planet: 'Venus', sanskrit: 'Shukra', focus: 'Relationships, values, aesthetic discernment', optimalActivity: 'Relationship repair, value alignment, creative expression', avoidActivity: 'People-pleasing, compromising core values, numbing with pleasure', element: 'Apas (Water)' },
  { planet: 'Mercury', sanskrit: 'Budha', focus: 'Communication, analysis, pattern articulation', optimalActivity: 'Diagnostic writing, pattern journaling, clinical analysis', avoidActivity: 'Overthinking, rumination loops, verbal avoidance', element: 'Vayu (Air)' },
  { planet: 'Moon', sanskrit: 'Chandra', focus: 'Emotional body, subconscious patterns, maternal imprint', optimalActivity: 'Shadow observation, emotional processing, nervous system calming', avoidActivity: 'Emotional suppression, bypassing grief, attachment reenactment', element: 'Apas (Water)' },
  { planet: 'Saturn', sanskrit: 'Shani', focus: 'Discipline, structural integrity, karmic consequence', optimalActivity: 'Discipline reinforcement, structural audit, karmic boundary setting', avoidActivity: 'Avoiding responsibility, rigidity, self-punishment cycles', element: 'Prithvi (Earth)' },
  { planet: 'Jupiter', sanskrit: 'Guru', focus: 'Wisdom, expansion, dharma alignment', optimalActivity: 'Dharma navigation, philosophical integration, teaching others', avoidActivity: 'Spiritual bypassing, overextension, ungrounded optimism', element: 'Tejas (Fire)' },
];

function getCurrentHora(): { index: number; hora: HoraData } {
  const hour = new Date().getHours();
  // Hora sequence repeats: Sun→Venus→Mercury→Moon→Saturn→Jupiter→Sun...
  const index = hour % HORA_SEQUENCE.length;
  return { index, hora: HORA_SEQUENCE[index] };
}

export default function HoraClock() {
  const [time, setTime] = useState(new Date());
  const [hora, setHora] = useState(getCurrentHora());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now);
      setHora(getCurrentHora());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Chronobiological Alignment
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-4">
        Hora Clock
      </p>

      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Clock face */}
        <div className="relative w-48 h-48 shrink-0 mx-auto md:mx-0">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Outer ring */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="#1a1815" strokeWidth="1" />
            <circle cx="100" cy="100" r="85" fill="none" stroke="#0a0a0a" strokeWidth="8" />

            {/* Hour markers with Hora planet names */}
            {HORA_SEQUENCE.map((h, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x = 100 + 75 * Math.cos(angle);
              const y = 100 + 75 * Math.sin(angle);
              return (
                <g key={i}>
                  <line
                    x1={100 + 85 * Math.cos(angle)} y1={100 + 85 * Math.sin(angle)}
                    x2={100 + 90 * Math.cos(angle)} y2={100 + 90 * Math.sin(angle)}
                    stroke={i === hora.index ? '#c9a96e' : '#3a3530'}
                    strokeWidth={i === hora.index ? 2 : 0.5}
                  />
                  <text x={x} y={y + 3} textAnchor="middle" fill={i === hora.index ? '#c9a96e' : '#3a3530'}
                    fontSize="6" fontFamily="var(--font-inter)" fontWeight={i === hora.index ? '600' : '300'}>
                    {h.sanskrit.slice(0, 3)}
                  </text>
                </g>
              );
            })}

            {/* Hour hand */}
            <line x1="100" y1="100" x2={100 + 45 * Math.cos((hourAngle - 90) * Math.PI / 180)}
              y2={100 + 45 * Math.sin((hourAngle - 90) * Math.PI / 180)}
              stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" />
            {/* Minute hand */}
            <line x1="100" y1="100" x2={100 + 60 * Math.cos((minuteAngle - 90) * Math.PI / 180)}
              y2={100 + 60 * Math.sin((minuteAngle - 90) * Math.PI / 180)}
              stroke="#8a8078" strokeWidth="1" strokeLinecap="round" />
            {/* Center dot */}
            <circle cx="100" cy="100" r="3" fill="#c9a96e" />
          </svg>

          {/* Current time */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <span className="text-[10px] text-[#8a8078]/50 font-[var(--font-inter)] font-light">
              {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Hora info */}
        <div className="flex-1 min-w-0">
          <motion.div
            key={hora.hora.planet}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            <div>
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Current Ruler</span>
              <p className="font-[var(--font-cormorant)] text-2xl text-[#c9a96e] font-bold">{hora.hora.planet}</p>
              <p className="text-[9px] text-[#8a8078]/50 font-[var(--font-inter)] italic">{hora.hora.sanskrit} — {hora.hora.element}</p>
            </div>
            <div>
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-0.5">Somatic Focus</span>
              <p className="text-[11px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light">{hora.hora.focus}</p>
            </div>
            <div>
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)] block mb-0.5">Optimal Now</span>
              <p className="text-[11px] text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">{hora.hora.optimalActivity}</p>
            </div>
            <div>
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#a07050]/50 font-[var(--font-inter)] block mb-0.5">Avoid Now</span>
              <p className="text-[11px] text-[#a07050]/60 font-[var(--font-inter)] font-light">{hora.hora.avoidActivity}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
