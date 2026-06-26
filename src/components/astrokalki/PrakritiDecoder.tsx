'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PrakritiDecoder — Ayurvedic Constitution Quiz
 *
 * Determines the user's prakriti (innate constitution) across the
 * three doshas: Vata (air+ether), Pitta (fire+water), Kapha (earth+water).
 * 15 questions across body frame, metabolism, sleep, skin, temperament.
 * Output: dosha percentages + personalized diet/lifestyle recommendations.
 */

type Dosha = 'vata' | 'pitta' | 'kapha';

interface Question {
  id: string;
  category: string;
  prompt: string;
  options: { label: string; dosha: Dosha }[];
}

const QUESTIONS: Question[] = [
  { id: 'frame', category: 'Body', prompt: 'Your natural body frame is —', options: [
    { label: 'Thin, light, prominent joints', dosha: 'vata' },
    { label: 'Medium, muscular, athletic', dosha: 'pitta' },
    { label: 'Solid, broad, well-developed', dosha: 'kapha' },
  ]},
  { id: 'skin', category: 'Skin', prompt: 'Your skin tends to be —', options: [
    { label: 'Dry, thin, rough', dosha: 'vata' },
    { label: 'Warm, ruddy, freckled', dosha: 'pitta' },
    { label: 'Cool, moist, oily, smooth', dosha: 'kapha' },
  ]},
  { id: 'hair', category: 'Hair', prompt: 'Your hair is naturally —', options: [
    { label: 'Dry, brittle, frizzy', dosha: 'vata' },
    { label: 'Fine, premature graying / balding', dosha: 'pitta' },
    { label: 'Thick, lustrous, wavy, oily', dosha: 'kapha' },
  ]},
  { id: 'metabolism', category: 'Digestion', prompt: 'Your appetite and digestion —', options: [
    { label: 'Variable — sometimes ravenous, sometimes forgotten', dosha: 'vata' },
    { label: 'Strong, sharp — get hangry if delayed', dosha: 'pitta' },
    { label: 'Slow, steady — can skip meals easily', dosha: 'kapha' },
  ]},
  { id: 'weight', category: 'Weight', prompt: 'Your weight pattern is —', options: [
    { label: 'Hard to gain, easy to lose', dosha: 'vata' },
    { label: 'Stable, medium, easy to maintain', dosha: 'pitta' },
    { label: 'Easy to gain, hard to lose', dosha: 'kapha' },
  ]},
  { id: 'sleep', category: 'Sleep', prompt: 'Your sleep tends to be —', options: [
    { label: 'Light, interrupted, vivid dreams', dosha: 'vata' },
    { label: 'Moderate, wake refreshed, dream of conflict', dosha: 'pitta' },
    { label: 'Deep, long, heavy, hard to wake', dosha: 'kapha' },
  ]},
  { id: 'temperature', category: 'Climate', prompt: 'You are most bothered by —', options: [
    { label: 'Cold, wind, dryness', dosha: 'vata' },
    { label: 'Heat, sun, humidity', dosha: 'pitta' },
    { label: 'Damp, cool, cloudy', dosha: 'kapha' },
  ]},
  { id: 'temperament', category: 'Mind', prompt: 'Your natural mental tempo —', options: [
    { label: 'Quick, restless, multi-threading', dosha: 'vata' },
    { label: 'Sharp, focused, decisive', dosha: 'pitta' },
    { label: 'Steady, calm, slow to change', dosha: 'kapha' },
  ]},
  { id: 'memory', category: 'Cognition', prompt: 'Your memory pattern —', options: [
    { label: 'Learns fast, forgets fast', dosha: 'vata' },
    { label: 'Learns medium, remembers precisely', dosha: 'pitta' },
    { label: 'Learns slow, never forgets', dosha: 'kapha' },
  ]},
  { id: 'emotion', category: 'Emotion', prompt: 'Under stress, you default to —', options: [
    { label: 'Anxiety, fear, worry', dosha: 'vata' },
    { label: 'Irritation, anger, criticism', dosha: 'pitta' },
    { label: 'Attachment, withdrawal, possessiveness', dosha: 'kapha' },
  ]},
  { id: 'speech', category: 'Voice', prompt: 'Your natural voice —', options: [
    { label: 'Fast, high-pitched, talkative', dosha: 'vata' },
    { label: 'Sharp, articulate, commanding', dosha: 'pitta' },
    { label: 'Slow, low, melodic, measured', dosha: 'kapha' },
  ]},
  { id: 'movement', category: 'Gait', prompt: 'Your walking gait is —', options: [
    { label: 'Quick, light, often fast', dosha: 'vata' },
    { label: 'Purposeful, direct, moderate', dosha: 'pitta' },
    { label: 'Slow, deliberate, graceful', dosha: 'kapha' },
  ]},
  { id: 'stamina', category: 'Energy', prompt: 'Your physical stamina —', options: [
    { label: 'Bursts then depletion', dosha: 'vata' },
    { label: 'Strong, moderate endurance', dosha: 'pitta' },
    { label: 'Slow to start but enduring', dosha: 'kapha' },
  ]},
  { id: 'bowels', category: 'Elimination', prompt: 'Your bowel pattern —', options: [
    { label: 'Irregular, dry, gassy', dosha: 'vata' },
    { label: 'Regular, soft, sometimes loose', dosha: 'pitta' },
    { label: 'Slow, heavy, well-formed', dosha: 'kapha' },
  ]},
  { id: 'spirit', category: 'Soul', prompt: 'Your spiritual temperament —', options: [
    { label: 'Mystical, eclectic, drawn to subtle realms', dosha: 'vata' },
    { label: 'Disciplined, transformation-driven, leader', dosha: 'pitta' },
    { label: 'Devotional, traditional, loyal to lineage', dosha: 'kapha' },
  ]},
];

const DOSHA_INFO: Record<Dosha, {
  name: string; sanskrit: string; elements: string; color: string;
  archetype: string; description: string;
  diet: string[]; practices: string[]; avoid: string[];
}> = {
  vata: {
    name: 'Vata',
    sanskrit: 'Vāta Doṣa',
    elements: 'Vayu + Akasha (Air + Ether)',
    color: '#9a8a6a',
    archetype: 'The Wind',
    description: 'Governs movement — breath, circulation, nerve impulses, thought. When balanced: creative, quick, expansive. When aggravated: anxiety, depletion, dispersal.',
    diet: ['Warm, moist, grounding foods', 'Cooked grains, root vegetables, ghee', 'Spices: ginger, cinnamon, cardamom', 'Avoid: cold, raw, dry, carbonated'],
    practices: ['Abhyanga (warm oil massage) daily', 'Slow, grounding yoga — no power vinyasa', 'Regular routine — same sleep/wake times', 'Sesame oil nasya in morning'],
    avoid: ['Travel overload', 'Stimulants (caffeine, nicotine)', 'Skipping meals', 'Excessive talking'],
  },
  pitta: {
    name: 'Pitta',
    sanskrit: 'Pitta Doṣa',
    elements: 'Tejas + Apas (Fire + Water)',
    color: '#c97032',
    archetype: 'The Forge',
    description: 'Governs transformation — digestion, metabolism, perception, intellect. When balanced: sharp, decisive, illuminating. When aggravated: anger, inflammation, criticism.',
    diet: ['Cooling, sweet, bitter foods', 'Coconut, cucumber, leafy greens', 'Grains: rice, oats, barley', 'Avoid: fried, spicy, fermented, alcohol'],
    practices: ['Moonlit walks, cooling pranayama (sheetali)', 'Swimming, non-competitive yoga', 'Time in nature, especially near water', 'Meditation on compassion (metta)'],
    avoid: ['Midday sun exposure', 'Conflict, debate, confrontation', 'Skipping meals (causes irritability)', 'Overwork, perfectionism'],
  },
  kapha: {
    name: 'Kapha',
    sanskrit: 'Kapha Doṣa',
    elements: 'Prithvi + Apas (Earth + Water)',
    color: '#5d8a7a',
    archetype: 'The Mountain',
    description: 'Governs structure — tissues, lubrication, immunity, stability. When balanced: grounded, loving, enduring. When aggravated: lethargy, attachment, congestion.',
    diet: ['Light, warm, spicy, stimulating', 'Legumes, light fruits, bitter greens', 'Honey (raw), ginger, black pepper', 'Avoid: dairy, wheat, sweets, oily food'],
    practices: ['Vigorous exercise daily — run, hike, dance', 'Heated yoga, sun salutations', 'Early rising (before 6 AM)', 'Dry brushing, invigorating abhyanga'],
    avoid: ['Daytime napping', 'Heavy evening meals', 'Sedentary routine', 'Clinging to past relationships'],
  },
};

export default function PrakritiDecoder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<string, Dosha>>>({});
  const [showResults, setShowResults] = useState(false);

  const scores: Record<Dosha, number> = { vata: 0, pitta: 0, kapha: 0 };
  Object.values(answers).forEach(d => { if (d) scores[d]++; });
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;

  const handleAnswer = (qid: string, dosha: Dosha) => {
    const next = { ...answers, [qid]: dosha };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 200);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setShowResults(false);
  };

  if (showResults) {
    const sorted = (Object.entries(scores) as [Dosha, number][]).sort((a, b) => b[1] - a[1]);
    const primary = sorted[0][0];
    const secondary = sorted[1][0];
    const info = DOSHA_INFO[primary];
    const primaryPct = Math.round((scores[primary] / total) * 100);
    const secondaryPct = Math.round((scores[secondary] / total) * 100);

    return (
      <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
            Constitutional Decode
          </span>
        </div>
        <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-4">Your Prakriti</p>

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-5 mb-5">
          {/* Bar chart */}
          <div className="border border-white/[0.04] bg-[#050505] p-4">
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block mb-3">
              Constitutional Distribution
            </span>
            <div className="space-y-3">
              {(['vata', 'pitta', 'kapha'] as Dosha[]).map(d => {
                const pct = Math.round((scores[d] / total) * 100);
                const dInfo = DOSHA_INFO[d];
                return (
                  <div key={d}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[10px] font-[var(--font-cormorant)] font-bold" style={{ color: dInfo.color }}>
                        {dInfo.name}
                      </span>
                      <span className="text-[9px] text-[#8a8078]/50 font-[var(--font-inter)]">{pct}%</span>
                    </div>
                    <div className="h-2 bg-white/[0.04] relative overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{ background: dInfo.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)] italic mt-0.5 block">
                      {dInfo.elements}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Primary dosha summary */}
          <div className="border border-white/[0.04] bg-[#050505] p-4">
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block mb-2">
              Primary Constitution
            </span>
            <h3 className="font-[var(--font-cormorant)] text-2xl font-bold mb-1" style={{ color: info.color }}>
              {info.name}
            </h3>
            <p className="text-[9px] text-[#8a8078]/60 font-[var(--font-inter)] italic mb-3">
              {info.sanskrit} — {info.archetype}
            </p>
            <p className="text-[10px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed mb-3">
              {info.description}
            </p>
            <div className="text-[9px] text-[#c9a96e]/60 font-[var(--font-inter)]">
              Secondary: <span className="font-medium text-[#c9a96e]">{DOSHA_INFO[secondary].name}</span> ({secondaryPct}%)
            </div>
            <div className="text-[9px] text-[#8a8078]/40 font-[var(--font-inter)] mt-1">
              Type: <span className="italic">{info.name}-{DOSHA_INFO[secondary].name}</span> dual constitution
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="border border-white/[0.04] bg-[#050505] p-3">
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] block mb-2">Diet</span>
            <ul className="space-y-1">
              {info.diet.map((d, i) => (
                <li key={i} className="text-[9px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed pl-2 relative">
                  <span className="absolute left-0 text-[#c9a96e]/40">·</span>{d}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-white/[0.04] bg-[#050505] p-3">
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] block mb-2">Practice</span>
            <ul className="space-y-1">
              {info.practices.map((p, i) => (
                <li key={i} className="text-[9px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed pl-2 relative">
                  <span className="absolute left-0 text-[#c9a96e]/40">·</span>{p}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-white/[0.04] bg-[#050505] p-3">
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#a07050]/60 font-[var(--font-inter)] block mb-2">Avoid</span>
            <ul className="space-y-1">
              {info.avoid.map((a, i) => (
                <li key={i} className="text-[9px] text-[#a07050]/60 font-[var(--font-inter)] font-light leading-relaxed pl-2 relative">
                  <span className="absolute left-0 text-[#a07050]/40">×</span>{a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={reset}
          className="mt-5 px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border border-white/[0.06] text-[#8a8078]/60 hover:text-[#8a8078] hover:border-white/[0.1] transition-all duration-300"
        >
          Re-Decode
        </button>
      </div>
    );
  }

  const q = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Constitutional Decode
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-4">
        Prakriti Decoder
      </p>

      <div className="w-full h-px bg-white/[0.04] mb-4 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#c9a96e]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/40 font-[var(--font-inter)]">
          Probe {step + 1} of {QUESTIONS.length}
        </span>
        <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/40 font-[var(--font-inter)]">
          {q.category}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-5"
        >
          <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] mb-5 leading-snug">{q.prompt}</p>
          <div className="space-y-2">
            {q.options.map(opt => {
              const isSelected = answers[q.id] === opt.dosha;
              const info = DOSHA_INFO[opt.dosha];
              return (
                <button
                  key={opt.label}
                  onClick={() => handleAnswer(q.id, opt.dosha)}
                  className={`w-full text-left p-3 border transition-all duration-200 group ${
                    isSelected
                      ? 'border-[#c9a96e] bg-[#c9a96e]/5'
                      : 'border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: info.color, opacity: isSelected ? 1 : 0.4 }} />
                    <span className="text-[11px] text-[#f5f3f0]/80 font-[var(--font-inter)] font-light flex-1">{opt.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {step > 0 && (
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078]/40 hover:text-[#8a8078] font-[var(--font-inter)] transition-colors"
        >
          ← Previous
        </button>
      )}
    </div>
  );
}
