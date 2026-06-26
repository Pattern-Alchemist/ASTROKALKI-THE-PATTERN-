'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Mirror (Pillar 2 · Decode)
 *
 * Type one sentence about someone who annoys you. Tool mirrors it
 * back as your own projection. 3 mirrors/day cap to keep it potent.
 * Shareable output.
 */

interface MirrorEntry {
  id: string;
  timestamp: number;
  input: string;
  mirror: string;
}

const STORAGE_KEY = 'astrokalki-mirror';
const DAILY_CAP = 3;

// Projection templates — each maps a complaint archetype to a mirror
const PROJECTION_TEMPLATES: { match: RegExp; mirror: (input: string) => string }[] = [
  {
    match: /(lazy|useless|does nothing|never does)/i,
    mirror: (input) => `Where in yourself are you refusing to act, and projecting that refusal outward as their laziness?`
  },
  {
    match: /(arrogant|cocky|full of themselves|thinks they're)/i,
    mirror: (input) => `Where are you pretending to be humble because you're afraid of your own ambition?`
  },
  {
    match: /(selfish|only cares about themselves|never thinks of)/i,
    mirror: (input) => `Where are you abandoning your own needs to look selfless — and resenting them for not doing the same?`
  },
  {
    match: /(annoying|irritating|gets on my|grates)/i,
    mirror: (input) => `What quality in them are you refusing to allow in yourself?`
  },
  {
    match: /(fake|phony|pretending|not real|two-faced)/i,
    mirror: (input) => `Where are you performing a version of yourself that doesn't match who you actually are?`
  },
  {
    match: /(controlling|manipulative|always has to|won't let)/i,
    mirror: (input) => `Where are you gripping too tight in your own life, and calling it love?`
  },
  {
    match: /(cold|distant|emotionally unavailable|shut down)/i,
    mirror: (input) => `Where have you closed yourself off, and now resent them for not breaking through?`
  },
  {
    match: /(needy|clingy|too much|dependent)/i,
    mirror: (input) => `What part of you are you starving, that you resent seeing fed in them?`
  },
  {
    match: /(rude|disrespectful|inconsiderate|mean)/i,
    mirror: (input) => `Where do you swallow your truth to be polite — and resent them for saying theirs?`
  },
  {
    match: /(stupid|dumb|idiot|ignorant|clueless)/i,
    mirror: (input) => `Where are you refusing to learn what life is trying to teach you, and calling them foolish instead?`
  },
  {
    match: /(weak|pathetic|coward|spineless)/i,
    mirror: (input) => `Where are you afraid to be vulnerable, and projecting your fear as their weakness?`
  },
  {
    match: /(bossy|tells me what|always ordering|commanding)/i,
    mirror: (input) => `Where are you giving away your authority — and resenting them for picking it up?`
  },
];

const DEFAULT_MIRROR = `What quality in them are you refusing to recognize in yourself? The complaint is the clue.`;

function generateMirror(input: string): string {
  for (const template of PROJECTION_TEMPLATES) {
    if (template.match.test(input)) return template.mirror(input);
  }
  return DEFAULT_MIRROR;
}

function isSameDay(t1: number, t2: number): boolean {
  const d1 = new Date(t1), d2 = new Date(t2);
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

export default function Mirror() {
  const [entries, setEntries] = useState<MirrorEntry[]>([]);
  const [input, setInput] = useState('');
  const [currentMirror, setCurrentMirror] = useState<MirrorEntry | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {}
  }, []);

  const todayCount = useMemo(() => {
    const now = Date.now();
    return entries.filter(e => isSameDay(e.timestamp, now)).length;
  }, [entries]);

  const remaining = Math.max(0, DAILY_CAP - todayCount);

  const mirror = () => {
    if (!input.trim() || remaining <= 0) return;
    const m = generateMirror(input);
    const entry: MirrorEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
      input: input.trim(),
      mirror: m,
    };
    const next = [entry, ...entries].slice(0, 30);
    setEntries(next);
    setCurrentMirror(entry);
    setInput('');
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const copyMirror = () => {
    if (!currentMirror) return;
    const text = `"${currentMirror.input}"\n\n→ ${currentMirror.mirror}\n\n— AstroKalki Mirror`;
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
            Pillar 2 · Decode
          </span>
        </div>
        <span className="text-[9px] tracking-[0.15em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">
          {remaining} left today
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Mirror</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Type one sentence about someone who annoys you. The mirror turns it back.
      </p>

      {/* Input */}
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="I hate how my coworker always acts so arrogant in meetings..."
        maxLength={200}
        rows={3}
        disabled={remaining === 0}
        className="w-full mb-3 p-3 bg-[#050505] border border-white/[0.04] focus:border-[#c9a96e]/40 outline-none text-[11px] text-[#f5f3f0] font-[var(--font-inter)] leading-relaxed resize-none disabled:opacity-50"
      />

      <button
        onClick={mirror}
        disabled={!input.trim() || remaining === 0}
        className="w-full px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-semibold bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        {remaining === 0 ? 'Come Back Tomorrow' : 'Show Me the Mirror'}
      </button>

      {/* Mirror output */}
      <AnimatePresence mode="wait">
        {currentMirror && (
          <motion.div
            key={currentMirror.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 border border-[#c9a96e]/30 bg-[#c9a96e]/[0.04]"
          >
            <div className="flex items-start gap-2 mb-2">
              <span className="text-[12px] text-[#8a8078]/60 mt-0.5">"</span>
              <p className="text-[10px] text-[#8a8078]/80 font-[var(--font-inter)] italic flex-1 leading-relaxed">
                {currentMirror.input}
              </p>
            </div>
            <div className="border-t border-[#c9a96e]/20 pt-3 mt-3">
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] block mb-1">
                The Mirror
              </span>
              <p className="text-[12px] text-[#f5f3f0] font-[var(--font-cormorant)] italic leading-relaxed">
                {currentMirror.mirror}
              </p>
            </div>
            <button
              onClick={copyMirror}
              className="mt-3 px-3 py-1.5 text-[8px] tracking-[0.15em] uppercase font-[var(--font-inter)] font-medium border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all"
            >
              {copied ? '✓ Copied' : 'Copy to Share'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Past mirrors */}
      {entries.length > 1 && (
        <div className="mt-5 pt-4 border-t border-white/[0.04]">
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
            Recent Mirrors
          </span>
          <div className="space-y-2 max-h-[160px] overflow-y-auto">
            {entries.slice(1, 6).map(e => (
              <div key={e.id} className="p-2 border border-white/[0.04] bg-[#050505]">
                <p className="text-[9px] text-[#8a8078]/60 font-[var(--font-inter)] italic mb-1 truncate">
                  "{e.input}"
                </p>
                <p className="text-[9px] text-[#f5f3f0]/60 font-[var(--font-cormorant)] italic leading-relaxed">
                  → {e.mirror}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-3 text-[8px] text-[#8a8078]/30 font-[var(--font-inter)] italic">
        3 mirrors per day. Scarcity keeps it potent.
      </p>
    </div>
  );
}
