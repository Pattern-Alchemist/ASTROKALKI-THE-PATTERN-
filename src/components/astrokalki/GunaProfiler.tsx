'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * GunaProfiler — Sattva / Rajas / Tamas Ternary Diagnostic
 *
 * A 12-question quiz mapping the user's present-state to the three
 * gunas (cosmic qualities). Output is a ternary triangle radar with
 * daily tracking persisted to localStorage — surfaces trend lines
 * over the last 7 sessions.
 */

type Guna = 'sattva' | 'rajas' | 'tamas';

interface Question {
  id: string;
  prompt: string;
  options: { label: string; guna: Guna }[];
}

const QUESTIONS: Question[] = [
  { id: 'q1', prompt: 'When you wake, your first mental weather is —', options: [
    { label: 'Clear, spacious, curious', guna: 'sattva' },
    { label: 'Already planning, slightly revved', guna: 'rajas' },
    { label: 'Heavy, reluctant, fogged', guna: 'tamas' },
  ]},
  { id: 'q2', prompt: 'Your relationship to food today is —', options: [
    { label: 'Moderate, mindful, energy-giving', guna: 'sattva' },
    { label: 'Spicy, stimulating, fast', guna: 'rajas' },
    { label: 'Heavy, leftover, numbing', guna: 'tamas' },
  ]},
  { id: 'q3', prompt: 'When triggered by another person, you —', options: [
    { label: 'Pause, observe the activation', guna: 'sattva' },
    { label: 'React, defend, escalate', guna: 'rajas' },
    { label: 'Withdraw, numb, avoid', guna: 'tamas' },
  ]},
  { id: 'q4', prompt: 'Your speech pattern is —', options: [
    { label: 'True, kind, unhurried', guna: 'sattva' },
    { label: 'Sharp, fast, persuasive', guna: 'rajas' },
    { label: 'Mumbled, withered, withheld', guna: 'tamas' },
  ]},
  { id: 'q5', prompt: 'Your sleep last night was —', options: [
    { label: 'Deep, restorative, sufficient', guna: 'sattva' },
    { label: 'Broken, dream-charged, light', guna: 'rajas' },
    { label: 'Excessive, sluggish, unrefreshing', guna: 'tamas' },
  ]},
  { id: 'q6', prompt: 'Your current primary emotion is —', options: [
    { label: 'Equanimity, gratitude, clarity', guna: 'sattva' },
    { label: 'Ambition, anxiety, irritation', guna: 'rajas' },
    { label: 'Apathy, grief, dread', guna: 'tamas' },
  ]},
  { id: 'q7', prompt: 'Your relationship to screens today —', options: [
    { label: 'Intentional, time-bound, purposeful', guna: 'sattva' },
    { label: 'Compulsive, multi-tab, scattered', guna: 'rajas' },
    { label: 'Binge, scroll, dissociate', guna: 'tamas' },
  ]},
  { id: 'q8', prompt: 'When faced with a difficult decision —', options: [
    { label: 'Sit with it until clarity arises', guna: 'sattva' },
    { label: 'Force a decision to relieve tension', guna: 'rajas' },
    { label: 'Procrastinate until decided by default', guna: 'tamas' },
  ]},
  { id: 'q9', prompt: 'Your body feels —', options: [
    { label: 'Light, energized, aligned', guna: 'sattva' },
    { label: 'Tense, wired, overheated', guna: 'rajas' },
    { label: 'Lethargic, congested, dull', guna: 'tamas' },
  ]},
  { id: 'q10', prompt: 'Your inner monologue is —', options: [
    { label: 'Witnessing, compassionate, sparse', guna: 'sattva' },
    { label: 'Critical, planning, looping', guna: 'rajas' },
    { label: 'Defeating, slow, repetitive', guna: 'tamas' },
  ]},
  { id: 'q11', prompt: 'Your environment right now is —', options: [
    { label: 'Clean, ordered, lit', guna: 'sattva' },
    { label: 'Cluttered, busy, noisy', guna: 'rajas' },
    { label: 'Messy, dim, stale', guna: 'tamas' },
  ]},
  { id: 'q12', prompt: 'Your impulse for spiritual practice —', options: [
    { label: 'Drawn inward naturally', guna: 'sattva' },
    { label: 'Disciplined but effortful', guna: 'rajas' },
    { label: 'Resistant, avoidant, "later"', guna: 'tamas' },
  ]},
];

const GUNA_INFO: Record<Guna, { name: string; sanskrit: string; color: string; archetype: string; description: string }> = {
  sattva: {
    name: 'Sattva',
    sanskrit: 'Sattva Guna',
    color: '#f5f3f0',
    archetype: 'The Witness',
    description: 'Clarity, harmony, lucidity. The guna of illumination — perception without distortion. The mind is a still mirror.',
  },
  rajas: {
    name: 'Rajas',
    sanskrit: 'Rajo Guna',
    color: '#c9a96e',
    archetype: 'The Driver',
    description: 'Motion, desire, friction. The guna of projection — the world is shaped by what is pursued. Necessary for action.',
  },
  tamas: {
    name: 'Tamas',
    sanskrit: 'Tamo Guna',
    color: '#5d4e3a',
    archetype: 'The Keeper',
    description: 'Inertia, density, preservation. The guna of substance — without it, no form would hold. In excess: stagnation.',
  },
};

interface Session {
  date: string;
  scores: Record<Guna, number>;
}

const STORAGE_KEY = 'astrokalki-guna-history';

export default function GunaProfiler() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<string, Guna>>>({});
  const [completed, setCompleted] = useState(false);
  const [history, setHistory] = useState<Session[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {}
  }, []);

  const computeScores = (): Record<Guna, number> => {
    const scores: Record<Guna, number> = { sattva: 0, rajas: 0, tamas: 0 };
    Object.values(answers).forEach(g => { if (g) scores[g]++; });
    const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
    return {
      sattva: scores.sattva / total,
      rajas: scores.rajas / total,
      tamas: scores.tamas / total,
    };
  };

  const handleAnswer = (qid: string, guna: Guna) => {
    const next = { ...answers, [qid]: guna };
    setAnswers(next);
    if (current < QUESTIONS.length - 1) {
      setTimeout(() => setCurrent(c => c + 1), 200);
    } else {
      // Save session
      const scores: Record<Guna, number> = { sattva: 0, rajas: 0, tamas: 0 };
      Object.values(next).forEach(g => { if (g) scores[g]++; });
      const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
      const normalized: Record<Guna, number> = {
        sattva: scores.sattva / total,
        rajas: scores.rajas / total,
        tamas: scores.tamas / total,
      };
      const session: Session = { date: new Date().toISOString(), scores: normalized };
      const updated = [...history.filter(h => !sameDay(new Date(h.date), new Date())), session].slice(-7);
      setHistory(updated);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
      setCompleted(true);
    }
  };

  const reset = () => {
    setAnswers({});
    setCurrent(0);
    setCompleted(false);
  };

  if (completed) {
    const scores = computeScores();
    const dominant = (Object.entries(scores) as [Guna, number][]).sort((a, b) => b[1] - a[1])[0][0];
    const info = GUNA_INFO[dominant];

    return (
      <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
            Guna Diagnostic
          </span>
        </div>
        <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-4">Present-State Spectrum</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Ternary triangle */}
          <div className="border border-white/[0.04] bg-[#050505] p-4">
            <svg viewBox="0 0 200 180" className="w-full h-auto">
              {/* Triangle outline */}
              <polygon points="100,20 180,160 20,160" fill="none" stroke="#1a1815" strokeWidth="0.8" />
              {/* Grid lines */}
              <line x1="100" y1="20" x2="100" y2="160" stroke="#1a1815" strokeWidth="0.3" strokeDasharray="2 3" />
              <line x1="60" y1="90" x2="140" y2="90" stroke="#1a1815" strokeWidth="0.3" strokeDasharray="2 3" />
              {/* Vertices */}
              <text x="100" y="14" textAnchor="middle" fill="#f5f3f0" fontSize="9" fontFamily="var(--font-cormorant)" fontWeight="700">Sattva</text>
              <text x="186" y="170" textAnchor="end" fill="#c9a96e" fontSize="9" fontFamily="var(--font-cormorant)" fontWeight="700">Rajas</text>
              <text x="14" y="170" textAnchor="start" fill="#8a8078" fontSize="9" fontFamily="var(--font-cormorant)" fontWeight="700">Tamas</text>
              {/* Plot point: weighted barycentric */}
              {(() => {
                const s = scores.sattva;
                const r = scores.rajas;
                const t = scores.tamas;
                const total = s + r + t || 1;
                const px = (100 * s + 180 * r + 20 * t) / total;
                const py = (20 * s + 160 * r + 160 * t) / total;
                return (
                  <motion.circle
                    cx={px} cy={py} r="5" fill={info.color}
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  />
                );
              })()}
              {/* Percentage labels */}
              <text x="100" y="30" textAnchor="middle" fill="#f5f3f0" fontSize="7" fontFamily="var(--font-inter)" opacity="0.7">{Math.round(scores.sattva * 100)}%</text>
              <text x="170" y="155" textAnchor="end" fill="#c9a96e" fontSize="7" fontFamily="var(--font-inter)" opacity="0.7">{Math.round(scores.rajas * 100)}%</text>
              <text x="30" y="155" textAnchor="start" fill="#8a8078" fontSize="7" fontFamily="var(--font-inter)" opacity="0.7">{Math.round(scores.tamas * 100)}%</text>
            </svg>
          </div>

          {/* Interpretation */}
          <div className="space-y-3">
            <div>
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Dominant Quality</span>
              <p className="font-[var(--font-cormorant)] text-xl font-bold" style={{ color: info.color }}>
                {info.name} <span className="text-[10px] text-[#8a8078]/50 italic font-light">— {info.archetype}</span>
              </p>
            </div>
            <p className="text-[11px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed">
              {info.description}
            </p>
            <div className="border-t border-white/[0.04] pt-3">
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] block mb-2">7-Session Trend</span>
              <div className="flex items-end gap-1 h-12">
                {history.length === 0 ? (
                  <span className="text-[9px] text-[#8a8078]/40 font-[var(--font-inter)]">No history yet.</span>
                ) : history.map((h, i) => {
                  const dom = (Object.entries(h.scores) as [Guna, number][]).sort((a, b) => b[1] - a[1])[0][0];
                  const height = Math.max(8, h.scores[dom] * 48);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end" title={`${new Date(h.date).toLocaleDateString()}: ${GUNA_INFO[dom].name}`}>
                      <div className="w-full" style={{ height: `${height}px`, background: GUNA_INFO[dom].color, opacity: 0.4 + i * 0.08 }} />
                      <span className="text-[6px] text-[#8a8078]/40 font-[var(--font-inter)] mt-1">D{i + 1}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={reset}
          className="mt-5 px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border border-white/[0.06] text-[#8a8078]/60 hover:text-[#8a8078] hover:border-white/[0.1] transition-all duration-300"
        >
          Retake Diagnostic
        </button>
      </div>
    );
  }

  const q = QUESTIONS[current];
  const progress = ((current + 1) / QUESTIONS.length) * 100;

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Guna Diagnostic
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-4">Sattva · Rajas · Tamas</p>

      <div className="w-full h-px bg-white/[0.04] mb-4 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[#c9a96e]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block mb-4">
        Inquiry {current + 1} of {QUESTIONS.length}
      </span>

      <motion.div
        key={q.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-5"
      >
        <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] mb-5 leading-snug">{q.prompt}</p>
        <div className="space-y-2">
          {q.options.map(opt => {
            const isSelected = answers[q.id] === opt.guna;
            const info = GUNA_INFO[opt.guna];
            return (
              <button
                key={opt.label}
                onClick={() => handleAnswer(q.id, opt.guna)}
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

      {current > 0 && (
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          className="text-[9px] tracking-[0.2em] uppercase text-[#8a8078]/40 hover:text-[#8a8078] font-[var(--font-inter)] transition-colors"
        >
          ← Previous
        </button>
      )}
    </div>
  );
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
