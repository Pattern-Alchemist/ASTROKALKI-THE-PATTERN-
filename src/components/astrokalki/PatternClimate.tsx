'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * PatternClimate (Pillar 1 · Observe)
 *
 * One-tap daily pattern-of-the-day. Even simpler than DailyPattern —
 * no intensity, no note. Just: what pattern ran today?
 * Over time reveals your climate baseline.
 */

interface Climate {
  id: string;
  label: string;
  glyph: string;
  color: string;
  description: string;
}

const CLIMATES: Climate[] = [
  { id: 'avoidance', label: 'Avoidance', glyph: '⌫', color: '#5d8a7a', description: 'You sidestepped what mattered today.' },
  { id: 'performing', label: 'Performer', glyph: '◐', color: '#9a8a6a', description: 'You wore a mask for most of the day.' },
  { id: 'controlling', label: 'Control', glyph: '⊞', color: '#a83232', description: 'You gripped too hard today.' },
  { id: 'people-pleasing', label: 'People Pleasing', glyph: '❤', color: '#c97032', description: 'You abandoned yourself to keep others happy.' },
  { id: 'projection', label: 'Projection', glyph: '⌖', color: '#6a5d9a', description: 'You saw your own shadow in others.' },
  { id: 'anger', label: 'Anger', glyph: '⚔', color: '#a83232', description: 'Old rage leaked through today.' },
  { id: 'numbness', label: 'Numbness', glyph: '◍', color: '#8a8078', description: 'You went flat to survive the day.' },
  { id: 'witness', label: 'Witness', glyph: '◉', color: '#c9a96e', description: 'You watched yourself today. Rare.' },
];

interface Entry { date: string; climateId: string; }
const STORAGE_KEY = 'astrokalki-pattern-climate';

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function PatternClimate() {
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
        if (t) setTodayId(t.climateId);
      }
    } catch {}
  }, []);

  const select = (climateId: string) => {
    const today = todayKey();
    const next = [...entries.filter(e => e.date !== today), { date: today, climateId }];
    setEntries(next);
    setTodayId(climateId);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  // Last 14 days
  const last14 = useMemo(() => {
    const days: { date: string; entry: Entry | undefined }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({ date: key, entry: entries.find(e => e.date === key) });
    }
    return days;
  }, [entries]);

  // Baseline: most common climate in last 30 days
  const baseline = useMemo(() => {
    if (entries.length < 5) return null;
    const counts: Record<string, number> = {};
    entries.forEach(e => { counts[e.climateId] = (counts[e.climateId] || 0) + 1; });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) return null;
    const [topId, count] = sorted[0];
    const climate = CLIMATES.find(c => c.id === topId);
    if (!climate) return null;
    const pct = Math.round((count / entries.length) * 100);
    return { climate, count, pct };
  }, [entries]);

  const todayClimate = CLIMATES.find(c => c.id === todayId);

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Pillar 1 · Observe
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Pattern Climate</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        One tap. What pattern ran today? The climate reveals itself over time.
      </p>

      {/* Today's climate readout */}
      <div className="mb-4 p-4 border border-white/[0.04] bg-[#050505] text-center min-h-[80px] flex flex-col items-center justify-center">
        {todayClimate ? (
          <motion.div
            key={todayClimate.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-[24px] mb-1" style={{ color: todayClimate.color }}>{todayClimate.glyph}</div>
            <p className="font-[var(--font-cormorant)] text-sm font-bold" style={{ color: todayClimate.color }}>{todayClimate.label}</p>
            <p className="text-[9px] text-[#8a8078]/70 font-[var(--font-inter)] italic mt-1 max-w-[220px]">{todayClimate.description}</p>
          </motion.div>
        ) : (
          <p className="text-[10px] text-[#8a8078]/40 font-[var(--font-inter)] italic">Tap below to log today's climate</p>
        )}
      </div>

      {/* Quick-select grid */}
      <div className="grid grid-cols-4 gap-1.5 mb-4">
        {CLIMATES.map(c => (
          <button
            key={c.id}
            onClick={() => select(c.id)}
            className={`p-2 border transition-all duration-200 flex flex-col items-center gap-1 ${
              todayId === c.id ? 'border-[#c9a96e] bg-[#c9a96e]/5' : 'border-white/[0.04] hover:border-white/[0.1]'
            }`}
            style={todayId === c.id ? { borderColor: c.color } : {}}
          >
            <span className="text-[16px] leading-none" style={{ color: todayId === c.id ? c.color : '#8a8078' }}>{c.glyph}</span>
            <span className="text-[7px] font-[var(--font-inter)] font-medium text-center leading-tight" style={{ color: todayId === c.id ? c.color : '#8a8078' }}>
              {c.label}
            </span>
          </button>
        ))}
      </div>

      {/* 14-day strip */}
      <div className="pt-4 border-t border-white/[0.04]">
        <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
          Last 14 Days
        </span>
        <div className="flex gap-[3px]">
          {last14.map(({ date, entry }) => {
            const climate = entry ? CLIMATES.find(c => c.id === entry.climateId) : null;
            return (
              <div
                key={date}
                title={entry ? `${date}: ${climate?.label}` : date}
                className="flex-1 aspect-square border border-white/[0.02]"
                style={{ background: climate ? climate.color : 'transparent', opacity: climate ? 0.7 : 0.05 }}
              />
            );
          })}
        </div>
      </div>

      {/* Baseline */}
      {baseline && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 border border-[#c9a96e]/20 bg-[#c9a96e]/[0.03]"
        >
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] block mb-1">
            Your Climate Baseline
          </span>
          <p className="text-[10px] text-[#f5f3f0]/80 font-[var(--font-cormorant)] italic leading-relaxed">
            You report <span className="text-[#c9a96e]">{baseline.climate.label}</span> {baseline.pct}% of the time. That&apos;s your default state, not your fault.
          </p>
        </motion.div>
      )}
    </div>
  );
}
