'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SPRING } from './utils/animation';

/**
 * AlchemicalForge — Element Transmutation Forge
 * 
 * Ayurvedic psychology sandbox where users adjust Tejas/Apas/Vayu/Prithvi
 * ratios to see behavioral predictions and somatic "prescriptions."
 */

interface Element {
  id: string;
  name: string;
  sanskrit: string;
  color: string;
  description: string;
  highTrait: string;
  lowTrait: string;
}

const ELEMENTS: Element[] = [
  { id: 'tejas', name: 'Fire', sanskrit: 'Tejas', color: '#e8a040', description: 'Transformative power. Will. Metabolism of experience into wisdom.', highTrait: 'Burnout, aggression, spiritual bypassing through intensity', lowTrait: 'Inertia, lack of drive, spiritual complacency' },
  { id: 'apas', name: 'Water', sanskrit: 'Apas', color: '#5090c0', description: 'Cohesion. Emotional binding. The fluid that holds patterns together.', highTrait: 'Emotional flooding, attachment, codependency', lowTrait: 'Emotional dryness, dissociation, inability to bond' },
  { id: 'vayu', name: 'Air', sanskrit: 'Vayu', color: '#a0a0d0', description: 'Movement. Nervous system activation. The carrier of pattern impulses.', highTrait: 'Anxiety, restlessness, nervous system hyperactivation', lowTrait: 'Stagnation, rigidity, inability to adapt' },
  { id: 'prithvi', name: 'Earth', sanskrit: 'Prithvi', color: '#80a060', description: 'Structure. Stability. The container that holds or resists change.', highTrait: 'Rigidity, stubbornness, refusal to evolve', lowTrait: 'Groundlessness, instability, inability to commit' },
];

function generateDiagnosis(values: Record<string, number>): string {
  const dominant = Object.entries(values).sort(([, a], [, b]) => b - a)[0];
  const recessive = Object.entries(values).sort(([, a], [, b]) => a - b)[0];
  const element = ELEMENTS.find(e => e.id === dominant[0]);
  const lowElement = ELEMENTS.find(e => e.id === recessive[0]);

  if (!element || !lowElement) return 'Adjust the sliders to reveal your elemental architecture.';

  const diagnoses: Record<string, string> = {
    tejas: `Excessive Tejas dominance: Your transformative fire is running unchecked, consuming structural stability. You push hard but collapse cyclically. The pattern is: burn bright → crash → self-blame → burn again. You need Prithvi grounding to contain the fire without extinguishing it.`,
    apas: `Excessive Apas dominance: Emotional cohesion has become emotional flooding. You absorb others' patterns as your own. Boundaries dissolve in relationships. The pattern is: merge → lose self → resent → withdraw → merge again. You need Vayu's discriminating movement to create healthy separation.`,
    vayu: `Excessive Vayu dominance: Your nervous system is in chronic activation. Anxiety is not a personality trait — it is a Vayu imbalance. Thoughts race but never land. The pattern is: activate → scatter → overwhelm → shut down → reactivate. You need Apas to cool and cohere the scattered impulses.`,
    prithvi: `Excessive Prithvi dominance: Structure has become prison. You hold positions long after they serve you. The pattern is: stabilize → rigidify → resist → erode → reluctantly shift. You need Tejas to ignite the transformative fire that melts crystallized patterns.`,
  };

  return `${diagnoses[dominant[0]]} Deficient ${lowElement.name} (${lowElement.sanskrit}): ${lowElement.lowTrait}.`;
}

export default function AlchemicalForge() {
  const [values, setValues] = useState<Record<string, number>>({
    tejas: 30,
    apas: 50,
    vayu: 60,
    prithvi: 40,
  });

  const updateValue = useCallback((id: string, val: number) => {
    setValues(prev => ({ ...prev, [id]: val }));
  }, []);

  const total = Object.values(values).reduce((a, b) => a + b, 0);
  const diagnosis = generateDiagnosis(values);

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Alchemical Forge
        </span>
      </div>

      <p className="font-[var(--font-cormorant)] text-lg md:text-xl text-[#f5f3f0] font-bold mb-2">
        Element Transmutation
      </p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed mb-5">
        Adjust your Ayurvedic elemental ratios. Observe how dominance in one element transmutes others — the behavioral architecture shifts in real-time.
      </p>

      {/* Element bars — proportional visualization */}
      <div className="flex h-3 mb-5 overflow-hidden">
        {ELEMENTS.map(el => (
          <motion.div
            key={el.id}
            animate={{ width: `${(values[el.id] / total) * 100}%` }}
            transition={SPRING.gentle}
            style={{ backgroundColor: el.color + '40' }}
            className="h-full transition-colors duration-300"
          />
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-4 mb-5">
        {ELEMENTS.map(el => (
          <div key={el.id}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: el.color }} />
                <span className="text-[9px] tracking-[0.15em] uppercase font-[var(--font-inter)] font-medium" style={{ color: el.color + 'cc' }}>
                  {el.sanskrit} ({el.name})
                </span>
              </div>
              <span className="text-[10px] text-[#8a8078]/50 font-[var(--font-inter)]">{values[el.id]}%</span>
            </div>
            <input
              type="range" min="5" max="100" step="1"
              value={values[el.id]}
              onChange={(e) => updateValue(el.id, parseInt(e.target.value))}
              className="w-full h-1 bg-[#1a1815] rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer"
              style={{ '--thumb-color': el.color } as React.CSSProperties}
              aria-label={`${el.sanskrit} element level`}
            />
            <p className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)] font-light mt-0.5">
              High: {el.highTrait}
            </p>
          </div>
        ))}
      </div>

      {/* Diagnosis output */}
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        className="border-t border-[#c9a96e]/10 pt-4"
      >
        <span className="text-[8px] tracking-[0.15em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)] block mb-2">
          Somatic Diagnostic Readout
        </span>
        <p className="text-[11px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed">
          {diagnosis}
        </p>
      </motion.div>
    </div>
  );
}
