'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reset (Pillar 3 · Interrupt)
 *
 * 90-second guided recovery when triggered. Phases: notice → name →
 * locate in body → breathe → allow. Logs the trigger + recovery time.
 * Over weeks shows reactivity baseline.
 */

type Phase = 'idle' | 'notice' | 'name' | 'locate' | 'breathe' | 'allow' | 'complete';

const PHASES: { id: Phase; label: string; instruction: string; duration: number; color: string }[] = [
  { id: 'notice', label: 'Notice', instruction: 'Stop. Notice what\'s happening in your body right now. Don\'t fix it. Just see it.', duration: 15, color: '#a83232' },
  { id: 'name', label: 'Name', instruction: 'Name the emotion underneath. Not "stressed" — try: rage, fear, grief, shame, longing. One word.', duration: 15, color: '#c97032' },
  { id: 'locate', label: 'Locate', instruction: 'Where is it in your body? Jaw. Chest. Belly. Throat. Hands. Find the exact place.', duration: 15, color: '#c9a96e' },
  { id: 'breathe', label: 'Breathe', instruction: 'Breathe into that exact spot. In for 4. Out for 6. The exhale is longer on purpose.', duration: 30, color: '#7da87a' },
  { id: 'allow', label: 'Allow', instruction: 'Let it be there for 15 more seconds. Don\'t argue with it. Don\'t fix it. Allow.', duration: 15, color: '#6a5d9a' },
];

const TRIGGER_OPTIONS = [
  { id: 'conversation', label: 'Conversation' },
  { id: 'message', label: 'A message' },
  { id: 'memory', label: 'A memory' },
  { id: 'work', label: 'Work pressure' },
  { id: 'family', label: 'Family' },
  { id: 'partner', label: 'Partner' },
  { id: 'news', label: 'News / social' },
  { id: 'other', label: 'Something else' },
];

interface LogEntry {
  id: string;
  timestamp: number;
  trigger: string;
  durationSec: number;
}

const STORAGE_KEY = 'astrokalki-reset-log';

export default function Reset() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLogs(JSON.parse(raw));
    } catch {}
  }, []);

  const currentPhase = phaseIdx < PHASES.length ? PHASES[phaseIdx] : null;

  useEffect(() => {
    if (phase === 'idle' || phase === 'complete') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    if (!currentPhase) return;
    setTimeLeft(currentPhase.duration);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Advance phase
          setPhaseIdx(idx => {
            const next = idx + 1;
            if (next >= PHASES.length) {
              // Complete
              setPhase('complete');
              logSession();
              return idx;
            }
            return next;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseIdx, phase]);

  const start = () => {
    if (!selectedTrigger) return;
    setPhaseIdx(0);
    setPhase('notice');
    startTimeRef.current = Date.now();
  };

  const logSession = () => {
    const durationSec = Math.round((Date.now() - startTimeRef.current) / 1000);
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
      trigger: selectedTrigger || 'unknown',
      durationSec,
    };
    const next = [entry, ...logs].slice(0, 100);
    setLogs(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const reset = () => {
    setPhase('idle');
    setPhaseIdx(0);
    setTimeLeft(0);
    setSelectedTrigger(null);
  };

  // Stats
  const stats = useMemo(() => {
    if (logs.length === 0) return null;
    const last7 = logs.filter(l => Date.now() - l.timestamp < 7 * 86400000);
    const avgDuration = logs.reduce((sum, l) => sum + l.durationSec, 0) / logs.length;
    // Trigger frequency
    const triggerCounts: Record<string, number> = {};
    logs.forEach(l => { triggerCounts[l.trigger] = (triggerCounts[l.trigger] || 0) + 1; });
    const topTrigger = Object.entries(triggerCounts).sort((a, b) => b[1] - a[1])[0];
    return {
      totalSessions: logs.length,
      last7Count: last7.length,
      avgDuration: Math.round(avgDuration),
      topTrigger: topTrigger ? TRIGGER_OPTIONS.find(t => t.id === topTrigger[0])?.label : null,
      topTriggerCount: topTrigger ? topTrigger[1] : 0,
    };
  }, [logs]);

  if (phase === 'idle') {
    return (
      <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
            Pillar 3 · Interrupt
          </span>
        </div>
        <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Reset</p>
        <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
          90 seconds. Triggered right now? Use this. Notice → name → locate → breathe → allow.
        </p>

        <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
          What triggered you?
        </span>
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {TRIGGER_OPTIONS.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTrigger(t.id)}
              className={`p-2 border text-[9px] font-[var(--font-inter)] transition-all ${
                selectedTrigger === t.id ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5' : 'border-white/[0.04] text-[#8a8078]/60 hover:border-white/[0.1]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button
          onClick={start}
          disabled={!selectedTrigger}
          className="w-full px-4 py-3 text-[10px] tracking-[0.25em] uppercase font-[var(--font-inter)] font-semibold bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Begin 90-Second Reset
        </button>

        {stats && (
          <div className="mt-5 pt-4 border-t border-white/[0.04] grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-[16px] font-[var(--font-cormorant)] font-bold text-[#c9a96e] tabular-nums">{stats.totalSessions}</p>
              <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Total Resets</p>
            </div>
            <div>
              <p className="text-[16px] font-[var(--font-cormorant)] font-bold text-[#c9a96e] tabular-nums">{stats.last7Count}</p>
              <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Last 7 Days</p>
            </div>
            <div>
              <p className="text-[16px] font-[var(--font-cormorant)] font-bold text-[#c9a96e] tabular-nums">{stats.avgDuration}s</p>
              <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Avg Duration</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (phase === 'complete') {
    return (
      <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-[#7da87a] rounded-full animate-pulse" />
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#7da87a]/70 font-[var(--font-inter)] font-medium">
            Reset Complete
          </span>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6"
        >
          <div className="text-[40px] text-[#7da87a] mb-2">○</div>
          <p className="font-[var(--font-cormorant)] text-xl text-[#f5f3f0] font-bold mb-2">You made it through</p>
          <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] italic max-w-xs mx-auto leading-relaxed">
            90 seconds. The reaction is no longer running you. Notice what changed — even slightly.
          </p>
        </motion.div>
        <button
          onClick={reset}
          className="w-full px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border border-white/[0.06] text-[#8a8078]/60 hover:text-[#8a8078] hover:border-white/[0.1] transition-all"
        >
          Done
        </button>
      </div>
    );
  }

  // Active phase UI
  const progress = currentPhase ? ((currentPhase.duration - timeLeft) / currentPhase.duration) * 100 : 0;

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: currentPhase?.color }} />
          <span className="text-[9px] tracking-[0.25em] uppercase font-[var(--font-inter)] font-medium" style={{ color: currentPhase?.color }}>
            Phase {phaseIdx + 1} of 5
          </span>
        </div>
        <span className="text-[10px] text-[#8a8078]/60 font-[var(--font-inter)] tabular-nums">{timeLeft}s</span>
      </div>

      <div className="py-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={phaseIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="font-[var(--font-cormorant)] text-2xl font-bold mb-3" style={{ color: currentPhase?.color }}>
              {currentPhase?.label}
            </p>
            <p className="text-[11px] text-[#f5f3f0]/80 font-[var(--font-inter)] italic max-w-xs mx-auto leading-relaxed">
              {currentPhase?.instruction}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/[0.04] relative overflow-hidden mb-3">
        <motion.div
          className="h-full"
          style={{ background: currentPhase?.color }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'linear' }}
        />
      </div>

      {/* Phase dots */}
      <div className="flex justify-center gap-1.5 mb-4">
        {PHASES.map((p, i) => (
          <div
            key={p.id}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{
              background: i < phaseIdx ? p.color : i === phaseIdx ? p.color : '#3a3530',
              opacity: i <= phaseIdx ? 1 : 0.3,
            }}
          />
        ))}
      </div>

      <button
        onClick={reset}
        className="w-full px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border border-white/[0.06] text-[#8a8078]/40 hover:text-[#8a8078] transition-all"
      >
        End Early
      </button>
    </div>
  );
}
