'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * LoopDetector (Pillar 2 · Decode)
 *
 * Track one behavior you're trying to break. One-tap log each time
 * it happens, with optional context (trigger + time). After 14 days,
 * AI surfaces the loop pattern.
 */

interface LogEntry {
  id: string;
  timestamp: number;
  trigger: string;
}

const STORAGE_KEY_PREFIX = 'astrokalki-loop-';

const TRIGGER_OPTIONS = [
  { id: 'stress', label: 'Stress', glyph: '⚡' },
  { id: 'boredom', label: 'Boredom', glyph: '○' },
  { id: 'loneliness', label: 'Loneliness', glyph: '◌' },
  { id: 'anger', label: 'Anger', glyph: '⚔' },
  { id: 'anxiety', label: 'Anxiety', glyph: '⟁' },
  { id: 'tiredness', label: 'Tiredness', glyph: '↓' },
  { id: 'social', label: 'After social', glyph: '◐' },
  { id: 'work', label: 'After work', glyph: '⊞' },
  { id: 'night', label: 'Late night', glyph: '☾' },
  { id: 'morning', label: 'Early morning', glyph: '☀' },
];

export default function LoopDetector() {
  const [behavior, setBehavior] = useState('');
  const [activeBehavior, setActiveBehavior] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);

  const storageKey = activeBehavior ? STORAGE_KEY_PREFIX + activeBehavior.toLowerCase().replace(/\s+/g, '-') : null;

  useEffect(() => {
    // Load active behavior from localStorage
    try {
      const savedBehavior = localStorage.getItem('astrokalki-loop-active');
      if (savedBehavior) {
        setActiveBehavior(savedBehavior);
        const key = STORAGE_KEY_PREFIX + savedBehavior.toLowerCase().replace(/\s+/g, '-');
        const raw = localStorage.getItem(key);
        if (raw) setLogs(JSON.parse(raw));
      }
    } catch {}
  }, []);

  const startTracking = () => {
    if (!behavior.trim()) return;
    const trimmed = behavior.trim();
    setActiveBehavior(trimmed);
    try { localStorage.setItem('astrokalki-loop-active', trimmed); } catch {}
    setBehavior('');
  };

  const log = () => {
    if (!selectedTrigger) return;
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
      trigger: selectedTrigger,
    };
    const next = [entry, ...logs];
    setLogs(next);
    if (storageKey) {
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
    }
    setSelectedTrigger(null);
  };

  const reset = () => {
    setActiveBehavior(null);
    setLogs([]);
    setSelectedTrigger(null);
    try { localStorage.removeItem('astrokalki-loop-active'); } catch {}
  };

  // Analysis: only after 14 days of data OR 7+ logs
  const analysis = useMemo(() => {
    if (logs.length < 5) return null;
    const earliest = logs[logs.length - 1].timestamp;
    const daysTracking = Math.max(1, Math.ceil((Date.now() - earliest) / 86400000));

    // Top trigger
    const triggerCounts: Record<string, number> = {};
    logs.forEach(l => { triggerCounts[l.trigger] = (triggerCounts[l.trigger] || 0) + 1; });
    const sortedTriggers = Object.entries(triggerCounts).sort((a, b) => b[1] - a[1]);
    const topTriggerId = sortedTriggers[0][0];
    const topTrigger = TRIGGER_OPTIONS.find(t => t.id === topTriggerId);
    const topTriggerPct = Math.round((sortedTriggers[0][1] / logs.length) * 100);

    // Time of day analysis
    const hourCounts = { morning: 0, afternoon: 0, evening: 0, night: 0 };
    logs.forEach(l => {
      const h = new Date(l.timestamp).getHours();
      if (h < 12) hourCounts.morning++;
      else if (h < 17) hourCounts.afternoon++;
      else if (h < 22) hourCounts.evening++;
      else hourCounts.night++;
    });
    const topTime = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];

    return {
      daysTracking,
      totalLogs: logs.length,
      topTrigger,
      topTriggerPct,
      topTime: topTime[0],
      topTimeCount: topTime[1],
    };
  }, [logs]);

  // Recent logs (last 7)
  const recentLogs = logs.slice(0, 7);

  if (!activeBehavior) {
    return (
      <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
            Pillar 2 · Decode
          </span>
        </div>
        <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Loop Detector</p>
        <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
          Name one behavior you keep repeating. We&apos;ll track when it happens and reveal the pattern underneath.
        </p>

        <input
          type="text"
          value={behavior}
          onChange={e => setBehavior(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && startTracking()}
          placeholder="e.g. doomscrolling, emotional eating, reaching out to ex..."
          maxLength={60}
          className="w-full mb-3 px-3 py-2.5 bg-[#050505] border border-white/[0.04] focus:border-[#c9a96e]/40 outline-none text-[11px] text-[#f5f3f0] font-[var(--font-inter)]"
        />
        <button
          onClick={startTracking}
          disabled={!behavior.trim()}
          className="w-full px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-semibold bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Start Tracking
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
            Pillar 2 · Decode
          </span>
        </div>
        <button onClick={reset} className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/40 hover:text-[#c9a96e] font-[var(--font-inter)]">
          Change
        </button>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Loop Detector</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Tracking: <span className="text-[#c9a96e]">{activeBehavior}</span> · {logs.length} {logs.length === 1 ? 'log' : 'logs'}
      </p>

      {/* Quick log */}
      <div className="mb-4">
        <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
          {logs.length > 0 ? 'Just happened? What triggered it?' : 'When it happens, tap the trigger'}
        </span>
        <div className="grid grid-cols-5 gap-1.5 mb-3">
          {TRIGGER_OPTIONS.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTrigger(t.id)}
              className={`p-2 border transition-all duration-200 flex flex-col items-center gap-0.5 ${
                selectedTrigger === t.id ? 'border-[#c9a96e] bg-[#c9a96e]/5' : 'border-white/[0.04] hover:border-white/[0.1]'
              }`}
            >
              <span className="text-[14px] leading-none text-[#8a8078]">{t.glyph}</span>
              <span className="text-[7px] font-[var(--font-inter)] text-[#8a8078] text-center leading-tight">{t.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={log}
          disabled={!selectedTrigger}
          className="w-full px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-semibold bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Log It
        </button>
      </div>

      {/* Analysis */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 border border-[#c9a96e]/30 bg-[#c9a96e]/[0.04]"
        >
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] block mb-1.5">
            Pattern Detected · {analysis.daysTracking}d tracked
          </span>
          <p className="text-[10px] text-[#f5f3f0]/80 font-[var(--font-cormorant)] italic leading-relaxed">
            You <span className="text-[#c9a96e]">{activeBehavior}</span> most often when triggered by <span className="text-[#c9a96e]">{analysis.topTrigger?.label.toLowerCase()}</span> ({analysis.topTriggerPct}% of logs), usually in the <span className="text-[#c9a96e]">{analysis.topTime}</span>.
          </p>
          <p className="text-[9px] text-[#8a8078]/70 font-[var(--font-inter)] italic mt-2 leading-relaxed">
            The behavior isn&apos;t random. The trigger is consistent. Interrupt the trigger and the loop loses its fuel.
          </p>
        </motion.div>
      )}

      {/* Recent logs */}
      {recentLogs.length > 0 && (
        <div className="pt-4 border-t border-white/[0.04]">
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
            Recent Logs
          </span>
          <div className="space-y-1">
            {recentLogs.map(l => {
              const trigger = TRIGGER_OPTIONS.find(t => t.id === l.trigger);
              const date = new Date(l.timestamp);
              return (
                <div key={l.id} className="flex items-center gap-2 text-[9px]">
                  <span className="text-[12px] text-[#c9a96e]">{trigger?.glyph}</span>
                  <span className="text-[#f5f3f0]/60 font-[var(--font-inter)] flex-1">{trigger?.label}</span>
                  <span className="text-[#8a8078]/50 font-[var(--font-inter)]">
                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
