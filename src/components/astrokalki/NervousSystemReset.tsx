'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * NervousSystemReset (Pillar 3 · Interrupt)
 *
 * Menu of 30-second body resets for different current states.
 * One tap starts a guided reset. Daily streak counter.
 * The "I need this now" tool.
 */

interface Reset {
  id: string;
  state: string; // What you're feeling
  glyph: string;
  color: string;
  cue: string; // The 30-second instruction
}

const RESETS: Reset[] = [
  { id: 'jaw', state: 'Jaw tight', glyph: '◳', color: '#a83232', cue: 'Close your mouth. Let your jaw drop slightly. Breathe through your nose. On each exhale, let the jaw soften one millimeter more. 30 seconds. The jaw holds what the voice can\'t say.' },
  { id: 'chest-anxious', state: 'Chest anxious', glyph: '⟁', color: '#c97032', cue: 'Place one hand on your sternum. Breathe in for 4, out for 8. Longer exhale = parasympathetic. The chest tightens because the breath is shallow. Deepen the exhale, the chest follows.' },
  { id: 'brain-fog', state: 'Brain fog', glyph: '◌', color: '#9a8a6a', cue: 'Close your right nostril with your thumb. Inhale through the left for 4. Close left, exhale through right for 6. Repeat for 30 seconds. Left nostril = parasympathetic. The fog is your nervous system asking for downshift.' },
  { id: 'depleted', state: 'Depleted', glyph: '↓', color: '#6a5d9a', cue: 'Lie down. Legs up the wall or on a chair. Arms wide. Breathe naturally. 30 seconds. Inversions reverse the vascular load and reset the vagus nerve. Doing nothing is the practice.' },
  { id: 'wired-tired', state: 'Wired + tired', glyph: '↯', color: '#c9a96e', cue: 'Sigh three times. Loud, audible, full exhale. After the third sigh, breathe normally for 20 seconds. The sigh discharges the trapped activation. Wired-tired is a nervous system that forgot how to land.' },
  { id: 'overheated', state: 'Overheated, angry', glyph: '⚔', color: '#a83232', cue: 'Roll your tongue (or purse your lips if you can\'t roll). Inhale through the tongue. Exhale through the nose. 30 seconds. This is sheetali — the cooling breath. Anger is heat. Heat leaves through the tongue.' },
  { id: 'overwhelmed', state: 'Overwhelmed', glyph: '⊞', color: '#5d8a7a', cue: 'Look around. Name 5 things you see. Name 4 sounds you hear. Name 3 things you feel touching you. Name 2 smells. Name 1 taste. This is grounding. Overwhelm lives in the future; the senses live now.' },
  { id: 'disconnected', state: 'Disconnected', glyph: '○', color: '#8a8078', cue: 'Place your hand on your heart. Feel the beat. Count 10 beats. Notice the rhythm. 30 seconds. Disconnection is dissociation from the body. The heartbeat is the most reliable anchor back.' },
];

const STORAGE_KEY = 'astrokalki-nsr-log';

interface LogEntry {
  id: string;
  timestamp: number;
  resetId: string;
}

export default function NervousSystemReset() {
  const [active, setActive] = useState<Reset | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLogs(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (!active) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    setTimeLeft(30);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Log completion
          const entry: LogEntry = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            timestamp: Date.now(),
            resetId: active.id,
          };
          setLogs(prevLogs => {
            const next = [entry, ...prevLogs].slice(0, 100);
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
            return next;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [active]);

  // Streak
  const streak = useMemo(() => {
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      if (logs.some(l => new Date(l.timestamp).toISOString().slice(0, 10) === key)) count++;
      else if (i > 0) break;
    }
    return count;
  }, [logs]);

  const todayCount = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return logs.filter(l => new Date(l.timestamp).toISOString().slice(0, 10) === today).length;
  }, [logs]);

  const isComplete = active && timeLeft === 0;

  if (active && !isComplete) {
    return (
      <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: active.color }} />
            <span className="text-[9px] tracking-[0.25em] uppercase font-[var(--font-inter)] font-medium" style={{ color: active.color }}>
              Active Reset
            </span>
          </div>
          <span className="text-[10px] text-[#8a8078]/60 font-[var(--font-inter)] tabular-nums">{timeLeft}s</span>
        </div>

        <div className="py-6 text-center">
          <div className="text-[40px] mb-3" style={{ color: active.color }}>{active.glyph}</div>
          <p className="font-[var(--font-cormorant)] text-lg font-bold mb-3" style={{ color: active.color }}>
            {active.state}
          </p>
          <p className="text-[11px] text-[#f5f3f0]/80 font-[var(--font-inter)] italic max-w-xs mx-auto leading-relaxed">
            {active.cue}
          </p>
        </div>

        {/* Progress ring */}
        <div className="flex justify-center mb-4">
          <svg width="60" height="60" viewBox="0 0 60 60" className="-rotate-90">
            <circle cx="30" cy="30" r="26" fill="none" stroke="#1a1815" strokeWidth="2" />
            <circle
              cx="30" cy="30" r="26" fill="none"
              stroke={active.color} strokeWidth="2"
              strokeDasharray={`${((30 - timeLeft) / 30) * 163.36} 163.36`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 1s linear' }}
            />
          </svg>
        </div>

        <button
          onClick={() => setActive(null)}
          className="w-full px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border border-white/[0.06] text-[#8a8078]/40 hover:text-[#8a8078] transition-all"
        >
          End Early
        </button>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6"
        >
          <div className="text-[32px] text-[#7da87a] mb-2">○</div>
          <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Reset complete</p>
          <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] italic">
            30 seconds. Notice what shifted.
          </p>
        </motion.div>
        <button
          onClick={() => setActive(null)}
          className="w-full px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-semibold bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] transition-all"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
            Pillar 3 · Interrupt
          </span>
        </div>
        <span className="text-[9px] tracking-[0.15em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)]">
          🔥 {streak} · {todayCount} today
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Nervous System Reset</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        What state are you in right now? 30 seconds. The body knows what to do.
      </p>

      <div className="grid grid-cols-2 gap-1.5">
        {RESETS.map(r => (
          <button
            key={r.id}
            onClick={() => setActive(r)}
            className="p-3 border border-white/[0.04] hover:border-white/[0.1] transition-all duration-200 flex items-center gap-2 text-left"
          >
            <span className="text-[18px] leading-none" style={{ color: r.color }}>{r.glyph}</span>
            <span className="text-[10px] font-[var(--font-inter)] font-medium text-[#f5f3f0] flex-1 leading-tight">{r.state}</span>
          </button>
        ))}
      </div>

      <p className="mt-4 text-[8px] text-[#8a8078]/30 font-[var(--font-inter)] italic">
        Each reset is 30 seconds. Pick the one that matches your state. Don&apos;t overthink it.
      </p>
    </div>
  );
}
