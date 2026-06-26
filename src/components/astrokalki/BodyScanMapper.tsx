'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BodyScanMapper — Full-Body Somatic Emotion Map
 *
 * An interactive SVG human silhouette with 8 clickable regions.
 * Each region reveals the somatic emotion typically stored there
 * (per clinical somatic experiencing + Vedic marma theory) and
 * a release protocol. Distinct from the face-only Tension Monitor.
 */

interface Region {
  id: string;
  label: string;
  sanskrit?: string;
  marma?: string;
  emotion: string;
  description: string;
  protocol: string[];
  // SVG path or coordinates
  cx: number;
  cy: number;
  r: number;
  hot: boolean;
}

const REGIONS: Region[] = [
  {
    id: 'head',
    label: 'Head / Crown',
    sanskrit: 'Sahasrara Adhisthana',
    marma: 'Adhipati Marma',
    emotion: 'Existential collapse · meaning loss · spiritual crisis',
    description: 'Tension at the crown signals a fracture in the narrative self. The person can no longer locate themselves in their story.',
    protocol: ['Silent sitting, no technique', 'Question "Who am I?" — Ramana Maharshi', 'Long walks in nature without input'],
    cx: 60, cy: 25, r: 12, hot: false,
  },
  {
    id: 'throat',
    label: 'Throat',
    sanskrit: 'Vishuddha Sthana',
    marma: 'Nila & Manya Marma',
    emotion: 'Swallowed words · suppressed truth · creative suffocation',
    description: 'The throat constricts around what cannot be said. Often paired with jaw clenching — the two form a unified suppression mechanism.',
    protocol: ['Humming on exhale — Bhramari pranayama', 'Write the unsaid, then burn it', 'Sigh audibly 12 times'],
    cx: 60, cy: 50, r: 8, hot: true,
  },
  {
    id: 'heart',
    label: 'Heart / Chest',
    sanskrit: 'Anahata Sthana',
    marma: 'Hridaya Marma',
    emotion: 'Grief · unmet love · protective armoring',
    description: 'The chest walls itself against further loss. Breath becomes shallow — the body refuses to expand into the space where feeling lives.',
    protocol: ['Long held heart-openers (Setu Bandha)', 'Place hand on sternum, breathe into it', 'Allow one tearsession per day, no narrative'],
    cx: 60, cy: 70, r: 12, hot: true,
  },
  {
    id: 'solar',
    label: 'Solar Plexus',
    sanskrit: 'Manipura Sthana',
    marma: 'Nabhi Marma',
    emotion: 'Disempowerment · swallowed will · gut shame',
    description: 'The fire center collapses when agency has been repeatedly overridden. Digestion becomes irregular; the will sputters.',
    protocol: ['Kapalabhati (skull-shining breath)', 'Boundary practice — say one "no" per day', 'Sun exposure 6–8 AM'],
    cx: 60, cy: 92, r: 9, hot: true,
  },
  {
    id: 'belly',
    label: 'Belly / Sacral',
    sanskrit: 'Svadhisthana Sthana',
    marma: 'Basti Marma',
    emotion: 'Creative freeze · sexual shame · emotional flooding',
    description: 'The pelvis holds what the spine refuses to feel. Creativity narrows; pleasure becomes anxious.',
    protocol: ['Hip-opening asana (Pigeon, Eka Pada Rajakapotasana)', 'Warm castor oil pack on lower abdomen', 'Free-form dance, 10 min/day, no mirror'],
    cx: 60, cy: 115, r: 9, hot: true,
  },
  {
    id: 'pelvis',
    label: 'Pelvic Floor',
    sanskrit: 'Muladhara Adhisthana',
    marma: 'Guda Marma',
    emotion: 'Survival fear · rootlessness · hypervigilance',
    description: 'When safety is compromised, the pelvic floor chronically clenches — the body braced against groundlessness.',
    protocol: ['Mula bandha release — gentle, not held', 'Walking barefoot on earth', 'Weighted blanket + slow exhale, 4-7-8'],
    cx: 60, cy: 138, r: 7, hot: true,
  },
  {
    id: 'hands',
    label: 'Hands / Arms',
    sanskrit: 'Hasta Pradesha',
    marma: 'Kurpara & Manibandha Marma',
    emotion: 'Held-back aggression · unexpressed giving · grasping',
    description: 'The hands close around what cannot be released — old relationships, old identities, old rage.',
    protocol: ['Open palms on thighs, breathe 5 min', 'Clay work or kneading dough', 'Tense-release progressive, 4 reps per hand'],
    cx: 30, cy: 90, r: 5, hot: false,
  },
  {
    id: 'legs',
    label: 'Legs / Feet',
    sanskrit: 'Pada Pradesha',
    marma: 'Talahridaya Marma',
    emotion: 'Stuck grief · forward-flight freeze · disconnection from ground',
    description: 'Heavy legs, cold feet — the body refusing to move toward what the mind has decided. The future cannot be walked into.',
    protocol: ['Standing forward fold (Uttanasana), 2 min', 'Foot massage with sesame oil before sleep', 'Walk 20 min outdoors, no destination'],
    cx: 60, cy: 175, r: 6, hot: false,
  },
];

export default function BodyScanMapper() {
  const [active, setActive] = useState<string | null>('heart');

  const region = REGIONS.find(r => r.id === active);

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Somatic Topography
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Body Scan Mapper</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Eight regions where unprocessed experience deposits. Click a hotspot to reveal its somatic signature and release protocol.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5">
        {/* Body silhouette */}
        <div className="border border-white/[0.04] bg-[#050505] p-3">
          <svg viewBox="0 0 120 220" className="w-full h-auto">
            {/* Body outline — simple silhouette */}
            {/* Head */}
            <ellipse cx="60" cy="25" rx="14" ry="16" fill="none" stroke="#3a3530" strokeWidth="0.6" />
            {/* Neck */}
            <line x1="56" y1="40" x2="56" y2="48" stroke="#3a3530" strokeWidth="0.6" />
            <line x1="64" y1="40" x2="64" y2="48" stroke="#3a3530" strokeWidth="0.6" />
            {/* Torso */}
            <path d="M 44 48 Q 38 60 36 90 Q 36 110 42 130 L 50 145 L 50 165 L 56 165 L 58 130 L 62 130 L 64 165 L 70 165 L 70 145 L 78 130 Q 84 110 84 90 Q 82 60 76 48 Z"
              fill="none" stroke="#3a3530" strokeWidth="0.6" />
            {/* Arms */}
            <path d="M 44 50 Q 28 70 22 95 Q 20 105 26 120 L 30 130" fill="none" stroke="#3a3530" strokeWidth="0.6" />
            <path d="M 76 50 Q 92 70 98 95 Q 100 105 94 120 L 90 130" fill="none" stroke="#3a3530" strokeWidth="0.6" />
            {/* Legs */}
            <line x1="56" y1="165" x2="50" y2="220" stroke="#3a3530" strokeWidth="0.6" />
            <line x1="64" y1="165" x2="70" y2="220" stroke="#3a3530" strokeWidth="0.6" />
            {/* Feet */}
            <ellipse cx="48" cy="218" rx="6" ry="2.5" fill="none" stroke="#3a3530" strokeWidth="0.4" />
            <ellipse cx="72" cy="218" rx="6" ry="2.5" fill="none" stroke="#3a3530" strokeWidth="0.4" />

            {/* Hotspots */}
            {REGIONS.map(r => {
              const isActive = active === r.id;
              const color = r.hot ? '#c9a96e' : '#8a8078';
              return (
                <g key={r.id} onClick={() => setActive(isActive ? null : r.id)} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={r.cx} cy={r.cy} r={isActive ? r.r + 2 : r.r}
                    fill={color} fillOpacity={isActive ? 0.4 : 0.15}
                    stroke={color} strokeWidth={isActive ? 1.2 : 0.5}
                    style={{ transition: 'all 0.3s' }}
                  />
                  {isActive && (
                    <motion.circle
                      cx={r.cx} cy={r.cy} r={r.r + 6}
                      fill="none" stroke={color} strokeWidth="0.5"
                      initial={{ opacity: 0.6, r: r.r }}
                      animate={{ opacity: 0, r: r.r + 8 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  <text
                    x={r.cx + r.r + 4} y={r.cy + 2}
                    fill={isActive ? color : '#3a3530'}
                    fontSize="5" fontFamily="var(--font-inter)"
                  >
                    {r.label}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="mt-2 pt-2 border-t border-white/[0.04] text-[8px] text-[#8a8078]/40 font-[var(--font-inter)] italic">
            Hot regions = frequent somatic storage sites.
          </div>
        </div>

        {/* Region detail */}
        <div className="min-h-[280px]">
          <AnimatePresence mode="wait">
            {region && (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border border-white/[0.04] bg-[#050505] p-4 mb-3">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-[var(--font-cormorant)] text-xl font-bold text-[#f5f3f0]">
                      {region.label}
                    </h3>
                    {region.sanskrit && (
                      <span className="text-[9px] text-[#c9a96e]/60 font-[var(--font-inter)] italic">
                        {region.sanskrit}
                      </span>
                    )}
                  </div>
                  {region.marma && (
                    <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block mb-3">
                      Marma: {region.marma}
                    </span>
                  )}

                  <div className="space-y-3">
                    <div>
                      <span className="text-[8px] tracking-[0.2em] uppercase text-[#a07050]/60 font-[var(--font-inter)] block mb-1">
                        Stored Emotion
                      </span>
                      <p className="text-[11px] text-[#a07050]/80 font-[var(--font-cormorant)] italic leading-relaxed">
                        {region.emotion}
                      </p>
                    </div>

                    <div>
                      <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-1">
                        Clinical Note
                      </span>
                      <p className="text-[10px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed">
                        {region.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-[#c9a96e]/20 bg-[#c9a96e]/[0.03] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full" />
                    <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">
                      Release Protocol
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {region.protocol.map((p, i) => (
                      <li key={i} className="text-[10px] text-[#f5f3f0]/80 font-[var(--font-inter)] font-light leading-relaxed pl-3 relative">
                        <span className="absolute left-0 text-[#c9a96e]/60 text-[10px]">{i + 1}.</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
