'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * InnerVoices (Pillar 1 · Observe)
 *
 * Track which inner character ran your day. One tap. Weekly distribution
 * reveals which voice dominates — and which is missing.
 */

interface Voice {
  id: string;
  name: string;
  glyph: string;
  color: string;
  description: string;
}

const VOICES: Voice[] = [
  { id: 'critic', name: 'The Critic', glyph: '✕', color: '#a83232', description: 'Found fault in everything, including you.' },
  { id: 'child', name: 'The Child', glyph: '◐', color: '#c97032', description: 'Wanted love, attention, or comfort.' },
  { id: 'achiever', name: 'The Achiever', glyph: '↑', color: '#c9a96e', description: 'Pushed hard. Measured worth in output.' },
  { id: 'avoider', name: 'The Avoider', glyph: '⌫', color: '#5d8a7a', description: 'Steered around what mattered.' },
  { id: 'performer', name: 'The Performer', glyph: '◉', color: '#9a8a6a', description: 'Played a role. Forgot who you were.' },
  { id: 'witness', name: 'The Witness', glyph: '◎', color: '#f5f3f0', description: 'Watched without judgment. Rare.' },
];

interface Entry { date: string; voiceId: string; }
const STORAGE_KEY = 'astrokalki-inner-voices';

function todayKey(): string { return new Date().toISOString().slice(0, 10); }

export default function InnerVoices() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [todayId, setTodayId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Entry[] = JSON.parse(raw);
        setEntries(parsed);
        const today = todayKey();
        const t = parsed.find(e => e.date === today);
        if (t) setTodayId(t.voiceId);
      }
    } catch {}
  }, []);

  const select = (voiceId: string) => {
    const today = todayKey();
    const next = [...entries.filter(e => e.date !== today), { date: today, voiceId }];
    setEntries(next);
    setTodayId(voiceId);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  // Last 7 days distribution
  const weekDistribution = useMemo(() => {
    const last7: Entry[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const e = entries.find(en => en.date === key);
      if (e) last7.push(e);
    }
    const counts: Record<string, number> = {};
    last7.forEach(e => { counts[e.voiceId] = (counts[e.voiceId] || 0) + 1; });
    return VOICES.map(v => ({
      ...v,
      count: counts[v.id] || 0,
    })).sort((a, b) => b.count - a.count);
  }, [entries]);

  const todayVoice = VOICES.find(v => v.id === todayId);
  const dominant = weekDistribution[0];
  const hasWeekData = weekDistribution.some(v => v.count > 0);

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Pillar 1 · Observe
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Inner Voices</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Which inner character ran your day? One tap. The distribution tells the truth.
      </p>

      {/* Today's voice */}
      <div className="mb-4 p-4 border border-white/[0.04] bg-[#050505] text-center min-h-[80px] flex flex-col items-center justify-center">
        {todayVoice ? (
          <motion.div key={todayVoice.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="text-[24px] mb-1" style={{ color: todayVoice.color }}>{todayVoice.glyph}</div>
            <p className="font-[var(--font-cormorant)] text-sm font-bold" style={{ color: todayVoice.color }}>{todayVoice.name}</p>
            <p className="text-[9px] text-[#8a8078]/70 font-[var(--font-inter)] italic mt-1 max-w-[220px]">{todayVoice.description}</p>
          </motion.div>
        ) : (
          <p className="text-[10px] text-[#8a8078]/40 font-[var(--font-inter)] italic">Who ran your day?</p>
        )}
      </div>

      {/* Voice selector */}
      <div className="grid grid-cols-3 gap-1.5 mb-4">
        {VOICES.map(v => (
          <button
            key={v.id}
            onClick={() => select(v.id)}
            className={`p-2.5 border transition-all duration-200 flex flex-col items-center gap-1 ${
              todayId === v.id ? 'border-[#c9a96e] bg-[#c9a96e]/5' : 'border-white/[0.04] hover:border-white/[0.1]'
            }`}
            style={todayId === v.id ? { borderColor: v.color } : {}}
          >
            <span className="text-[18px] leading-none" style={{ color: todayId === v.id ? v.color : '#8a8078' }}>{v.glyph}</span>
            <span className="text-[7px] font-[var(--font-inter)] font-medium text-center leading-tight" style={{ color: todayId === v.id ? v.color : '#8a8078' }}>
              {v.name}
            </span>
          </button>
        ))}
      </div>

      {/* Week distribution */}
      <div className="pt-4 border-t border-white/[0.04]">
        <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
          This Week&apos;s Cast
        </span>
        {!hasWeekData ? (
          <p className="text-[9px] text-[#8a8078]/40 font-[var(--font-inter)] italic">Log a few days to see your distribution.</p>
        ) : (
          <div className="space-y-1.5">
            {weekDistribution.filter(v => v.count > 0).map(v => {
              const pct = (v.count / 7) * 100;
              return (
                <div key={v.id} className="flex items-center gap-2">
                  <span className="text-[14px] w-4 text-center" style={{ color: v.color }}>{v.glyph}</span>
                  <span className="text-[9px] text-[#f5f3f0]/70 font-[var(--font-inter)] w-24 shrink-0">{v.name}</span>
                  <div className="flex-1 h-2 bg-white/[0.04] relative overflow-hidden">
                    <motion.div className="h-full" style={{ background: v.color }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
                  </div>
                  <span className="text-[8px] text-[#8a8078] font-[var(--font-inter)] tabular-nums w-3 text-right">{v.count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Insight */}
      {hasWeekData && dominant.count >= 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 border border-[#c9a96e]/20 bg-[#c9a96e]/[0.03]">
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] block mb-1">
            Dominant Voice
          </span>
          <p className="text-[10px] text-[#f5f3f0]/80 font-[var(--font-cormorant)] italic leading-relaxed">
            <span style={{ color: dominant.color }}>{dominant.name}</span> ran your week. The Witness showed up {weekDistribution.find(v => v.id === 'witness')?.count || 0}×.
          </p>
        </motion.div>
      )}
    </div>
  );
}
