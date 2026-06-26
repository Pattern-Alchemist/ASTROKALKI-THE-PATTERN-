'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * DailyPattern (Pillar 1 · Observe)
 *
 * 30-second daily check-in. Pick today's dominant pattern, rate intensity,
 * optional one-sentence note. Builds a 30-day heatmap. After 14 days,
 * surfaces auto-insights ("You log overworking 4× more on Mondays").
 */

interface Pattern {
  id: string;
  label: string;
  glyph: string;
  color: string;
}

const PATTERNS: Pattern[] = [
  { id: 'people-pleasing', label: 'People Pleasing', glyph: '❤', color: '#c97032' },
  { id: 'avoidance', label: 'Avoidance', glyph: '⌫', color: '#5d8a7a' },
  { id: 'overworking', label: 'Overworking', glyph: '↯', color: '#c9a96e' },
  { id: 'numbing', label: 'Numbing', glyph: '◍', color: '#6a5d9a' },
  { id: 'controlling', label: 'Controlling', glyph: '⊞', color: '#a83232' },
  { id: 'withdrawing', label: 'Withdrawing', glyph: '○', color: '#8a8078' },
  { id: 'performing', label: 'Performing', glyph: '◐', color: '#9a8a6a' },
  { id: 'overthinking', label: 'Overthinking', glyph: '⊗', color: '#5d4e8a' },
];

interface Entry {
  date: string; // YYYY-MM-DD
  patternId: string;
  intensity: number; // 1-5
  note?: string;
}

const STORAGE_KEY = 'astrokalki-daily-pattern';

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function last30Days(): string[] {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function dayName(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' });
}

export default function DailyPattern() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [todayPattern, setTodayPattern] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Entry[] = JSON.parse(raw);
        setEntries(parsed);
        const today = todayKey();
        const todayEntry = parsed.find(e => e.date === today);
        if (todayEntry) {
          setTodayPattern(todayEntry.patternId);
          setIntensity(todayEntry.intensity);
          setNote(todayEntry.note || '');
          setSaved(true);
        }
      }
    } catch {}
  }, []);

  const save = () => {
    if (!todayPattern) return;
    const today = todayKey();
    const entry: Entry = { date: today, patternId: todayPattern, intensity, note: note.trim() || undefined };
    const next = [...entries.filter(e => e.date !== today), entry];
    setEntries(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
    setSaved(true);
  };

  // Streak calculation
  const streak = useMemo(() => {
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      if (entries.some(e => e.date === key)) count++;
      else if (i > 0) break; // today might be empty
    }
    return count;
  }, [entries]);

  // Insights: pattern frequency by weekday (only after 14 entries)
  const insights = useMemo(() => {
    if (entries.length < 7) return null;
    const weekdayCount: Record<number, Record<string, number>> = {};
    entries.forEach(e => {
      const day = new Date(e.date + 'T00:00:00').getDay();
      if (!weekdayCount[day]) weekdayCount[day] = {};
      weekdayCount[day][e.patternId] = (weekdayCount[day][e.patternId] || 0) + 1;
    });
    // Find the day+pattern combo with highest count
    let maxDay = -1, maxPattern = '', maxCount = 0;
    Object.entries(weekdayCount).forEach(([day, patterns]) => {
      Object.entries(patterns).forEach(([pid, count]) => {
        if (count > maxCount) {
          maxCount = count;
          maxDay = parseInt(day);
          maxPattern = pid;
        }
      });
    });
    if (maxCount < 2) return null;
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][maxDay];
    const patternLabel = PATTERNS.find(p => p.id === maxPattern)?.label || '';
    return { dayName, patternLabel, count: maxCount };
  }, [entries]);

  const heatmap = last30Days();
  const activePattern = PATTERNS.find(p => p.id === todayPattern);

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
            Pillar 1 · Observe
          </span>
        </div>
        <span className="text-[9px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)]">
          🔥 {streak} day streak
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Daily Pattern</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        What pattern drove your day? 30 seconds. The data accumulates.
      </p>

      {/* Pattern grid */}
      <div className="grid grid-cols-4 gap-1.5 mb-4">
        {PATTERNS.map(p => (
          <button
            key={p.id}
            onClick={() => { setTodayPattern(p.id); setSaved(false); }}
            disabled={saved}
            className={`p-2.5 border transition-all duration-200 flex flex-col items-center gap-1 ${
              todayPattern === p.id
                ? 'border-[#c9a96e] bg-[#c9a96e]/5'
                : 'border-white/[0.04] hover:border-white/[0.1] disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
            style={todayPattern === p.id ? { borderColor: p.color } : {}}
          >
            <span className="text-[18px] leading-none" style={{ color: todayPattern === p.id ? p.color : '#8a8078' }}>{p.glyph}</span>
            <span className="text-[8px] font-[var(--font-inter)] font-medium leading-tight text-center" style={{ color: todayPattern === p.id ? p.color : '#8a8078' }}>
              {p.label}
            </span>
          </button>
        ))}
      </div>

      {/* Intensity */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Intensity</span>
          <span className="text-[10px] text-[#c9a96e] font-[var(--font-inter)] tabular-nums">{intensity}/5</span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              onClick={() => { setIntensity(n); setSaved(false); }}
              disabled={saved}
              className={`flex-1 h-6 border transition-all ${
                intensity >= n ? 'border-[#c9a96e]' : 'border-white/[0.04]'
              } disabled:cursor-not-allowed`}
              style={{ background: intensity >= n && activePattern ? activePattern.color : 'transparent', opacity: intensity >= n ? 0.6 : 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Optional note */}
      <input
        type="text"
        value={note}
        onChange={e => { setNote(e.target.value); setSaved(false); }}
        disabled={saved}
        placeholder="One sentence (optional)..."
        maxLength={120}
        className="w-full mb-3 px-3 py-2 bg-[#050505] border border-white/[0.04] focus:border-[#c9a96e]/40 outline-none text-[10px] text-[#f5f3f0] font-[var(--font-inter)] disabled:opacity-50"
      />

      <button
        onClick={save}
        disabled={!todayPattern || saved}
        className="w-full px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-semibold bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        {saved ? '✓ Logged Today' : 'Log Today\'s Pattern'}
      </button>

      {/* 30-day heatmap */}
      <div className="mt-5 pt-4 border-t border-white/[0.04]">
        <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
          Last 30 Days
        </span>
        <div className="grid grid-cols-10 gap-[3px]">
          {heatmap.map(date => {
            const entry = entries.find(e => e.date === date);
            const pattern = entry ? PATTERNS.find(p => p.id === entry.patternId) : null;
            return (
              <div
                key={date}
                title={entry ? `${date}: ${pattern?.label} (${entry.intensity}/5)` : date}
                className="aspect-square border border-white/[0.02]"
                style={{
                  background: pattern ? pattern.color : 'transparent',
                  opacity: entry ? 0.2 + (entry.intensity / 5) * 0.7 : 0.05,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Auto-insight */}
      {insights && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 border border-[#c9a96e]/20 bg-[#c9a96e]/[0.03]"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">
              Pattern Detected
            </span>
          </div>
          <p className="text-[10px] text-[#f5f3f0]/80 font-[var(--font-cormorant)] italic leading-relaxed">
            You log <span className="text-[#c9a96e]">{insights.patternLabel}</span> {insights.count}× more on {insights.dayName}s.
          </p>
        </motion.div>
      )}
    </div>
  );
}
