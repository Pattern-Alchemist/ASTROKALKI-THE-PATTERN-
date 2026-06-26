'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * PatternDNA (Phase 3 · Personal Intelligence)
 *
 * The evolving psychological fingerprint. Six dimensions, each 0-100,
 * updating from every interaction across the Pattern Intelligence System.
 *
 * Dimensions:
 *   Avoidance  — fed by avoidance/withdrawing logs, avoider voice
 *   Control    — fed by controlling/overworking logs, achiever voice
 *   Performer  — fed by performing/people-pleasing logs, performer voice
 *   Rescuer    — fed by people-pleasing logs, relationship rescuing
 *   Shadow     — fed by Mirror sessions, critic voice, suppressed material
 *   Witness    — the aspiration. Grows from Reset, Reflection, witness voice
 *
 * The first five are patterns you're working WITH.
 * Witness is what you're working TOWARD.
 */

interface Dimension {
  id: string;
  name: string;
  glyph: string;
  color: string;
  description: string;
  isAspiration?: boolean;
}

const DIMENSIONS: Dimension[] = [
  { id: 'avoidance', name: 'Avoidance', glyph: '⌫', color: '#5d8a7a', description: 'Steering around what matters.' },
  { id: 'control', name: 'Control', glyph: '⊞', color: '#a83232', description: 'Gripping too tight.' },
  { id: 'performer', name: 'Performer', glyph: '◐', color: '#9a8a6a', description: 'Wearing a mask.' },
  { id: 'rescuer', name: 'Rescuer', glyph: '✚', color: '#c97032', description: 'Earning love through over-functioning.' },
  { id: 'shadow', name: 'Shadow', glyph: '◐', color: '#6a5d9a', description: 'The disowned self, projected outward.' },
  { id: 'witness', name: 'Witness', glyph: '◉', color: '#c9a96e', description: 'The one who watches. What you\'re growing toward.', isAspiration: true },
];

interface DnaState {
  avoidance: number;
  control: number;
  performer: number;
  rescuer: number;
  shadow: number;
  witness: number;
}

const DEFAULT_DNA: DnaState = {
  avoidance: 35,
  control: 30,
  performer: 40,
  rescuer: 45,
  shadow: 30,
  witness: 10,
};

const STORAGE_KEYS = {
  dailyPattern: 'astrokalki-daily-pattern',
  patternClimate: 'astrokalki-pattern-climate',
  innerVoices: 'astrokalki-inner-voices',
  dailyReflection: 'astrokalki-daily-reflection',
  mirror: 'astrokalki-mirror',
  reset: 'astrokalki-reset-log',
  loopPrefix: 'astrokalki-loop-',
  dnaHistory: 'astrokalki-dna-history',
};

// Mapping: which inputs boost which dimensions
const PATTERN_TO_DNA: Record<string, keyof DnaState> = {
  'people-pleasing': 'rescuer',
  'avoidance': 'avoidance',
  'overworking': 'control',
  'numbing': 'avoidance',
  'controlling': 'control',
  'withdrawing': 'avoidance',
  'performing': 'performer',
  'overthinking': 'control',
};

const VOICE_TO_DNA: Record<string, keyof DnaState> = {
  'critic': 'shadow',
  'child': 'shadow',
  'achiever': 'control',
  'avoider': 'avoidance',
  'performer': 'performer',
  'witness': 'witness',
};

const CLIMATE_TO_DNA: Record<string, keyof DnaState> = {
  'avoidance': 'avoidance',
  'performing': 'performer',
  'controlling': 'control',
  'people-pleasing': 'rescuer',
  'projection': 'shadow',
  'anger': 'shadow',
  'numbness': 'avoidance',
  'witness': 'witness',
};

function computeDna(): DnaState {
  const dna = { ...DEFAULT_DNA };

  try {
    // Daily Pattern logs (last 30 days)
    const dpRaw = localStorage.getItem(STORAGE_KEYS.dailyPattern);
    if (dpRaw) {
      const entries = JSON.parse(dpRaw);
      const cutoff = Date.now() - 30 * 86400000;
      entries.forEach((e: any) => {
        if (new Date(e.date + 'T00:00:00').getTime() > cutoff) {
          const dim = PATTERN_TO_DNA[e.patternId];
          if (dim) dna[dim] = Math.min(100, dna[dim] + (e.intensity || 3));
        }
      });
    }

    // Inner Voices (last 30 days)
    const ivRaw = localStorage.getItem(STORAGE_KEYS.innerVoices);
    if (ivRaw) {
      const entries = JSON.parse(ivRaw);
      const cutoff = Date.now() - 30 * 86400000;
      entries.forEach((e: any) => {
        if (new Date(e.date + 'T00:00:00').getTime() > cutoff) {
          const dim = VOICE_TO_DNA[e.voiceId];
          if (dim) dna[dim] = Math.min(100, dna[dim] + 4);
        }
      });
    }

    // Pattern Climate (last 30 days)
    const pcRaw = localStorage.getItem(STORAGE_KEYS.patternClimate);
    if (pcRaw) {
      const entries = JSON.parse(pcRaw);
      const cutoff = Date.now() - 30 * 86400000;
      entries.forEach((e: any) => {
        if (new Date(e.date + 'T00:00:00').getTime() > cutoff) {
          const dim = CLIMATE_TO_DNA[e.climateId];
          if (dim) dna[dim] = Math.min(100, dna[dim] + 3);
        }
      });
    }

    // Mirror sessions (last 30 days) → boost Shadow + Witness
    const mRaw = localStorage.getItem(STORAGE_KEYS.mirror);
    if (mRaw) {
      const entries = JSON.parse(mRaw);
      const cutoff = Date.now() - 30 * 86400000;
      const recentMirrors = entries.filter((e: any) => e.timestamp > cutoff);
      dna.shadow = Math.min(100, dna.shadow + recentMirrors.length * 5);
      dna.witness = Math.min(100, dna.witness + recentMirrors.length * 3);
    }

    // Reset sessions (last 30 days) → boost Witness, reduce dominant
    const rRaw = localStorage.getItem(STORAGE_KEYS.reset);
    if (rRaw) {
      const entries = JSON.parse(rRaw);
      const cutoff = Date.now() - 30 * 86400000;
      const recentResets = entries.filter((e: any) => e.timestamp > cutoff);
      dna.witness = Math.min(100, dna.witness + recentResets.length * 4);
    }

    // Daily Reflection (last 30 days) → boost Witness
    const drRaw = localStorage.getItem(STORAGE_KEYS.dailyReflection);
    if (drRaw) {
      const entries = JSON.parse(drRaw);
      const cutoff = Date.now() - 30 * 86400000;
      const recentReflections = entries.filter((e: any) => new Date(e.date + 'T00:00:00').getTime() > cutoff);
      dna.witness = Math.min(100, dna.witness + recentReflections.length * 3);
    }
  } catch {}

  return dna;
}

export default function PatternDNA() {
  const [dna, setDna] = useState<DnaState>(DEFAULT_DNA);
  const [dna30Ago, setDna30Ago] = useState<DnaState | null>(null);
  const [hasData, setHasData] = useState(false);
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'image-ready'>('idle');
  const shareCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const current = computeDna();
    setDna(current);

    // Load snapshot from 30 days ago if exists
    try {
      const histRaw = localStorage.getItem(STORAGE_KEYS.dnaHistory);
      if (histRaw) {
        const history: { date: string; dna: DnaState }[] = JSON.parse(histRaw);
        const cutoff = Date.now() - 25 * 86400000; // ~25 days ago for comparison
        const old = history.find(h => new Date(h.date).getTime() < cutoff);
        if (old) {
          setDna30Ago(old.dna);
          setHasData(true);
        }
      }
      // Check if there's any data at all
      const anyData = ['dailyPattern', 'patternClimate', 'innerVoices', 'dailyReflection', 'mirror', 'reset'].some(k =>
        localStorage.getItem(STORAGE_KEYS[k as keyof typeof STORAGE_KEYS])
      );
      setHasData(anyData);

      // Save today's snapshot if not already saved
      const today = new Date().toISOString().slice(0, 10);
      const histRaw2 = localStorage.getItem(STORAGE_KEYS.dnaHistory);
      const history: { date: string; dna: DnaState }[] = histRaw2 ? JSON.parse(histRaw2) : [];
      if (!history.some(h => h.date === today)) {
        history.push({ date: today, dna: current });
        // Keep last 90 days
        const trimmed = history.slice(-90);
        try { localStorage.setItem(STORAGE_KEYS.dnaHistory, JSON.stringify(trimmed)); } catch {}
      }
    } catch {}
  }, []);

  const sortedDims = useMemo(() => {
    return DIMENSIONS.map(d => ({
      ...d,
      value: dna[d.id as keyof DnaState],
      prevValue: dna30Ago ? dna30Ago[d.id as keyof DnaState] : null,
    })).sort((a, b) => {
      // Witness always last (as aspiration)
      if (a.isAspiration) return 1;
      if (b.isAspiration) return -1;
      return b.value - a.value;
    });
  }, [dna, dna30Ago]);

  const dominantPattern = sortedDims[0];
  const witnessValue = dna.witness;

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e] rounded-full animate-pulse" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          The Intelligence Engine · Live Output
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Pattern DNA</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Your evolving psychological fingerprint. Every pattern you log, every mirror you face, every reset you complete — it all feeds here.
      </p>

      {!hasData ? (
        <div className="p-6 border border-white/[0.04] bg-[#050505] text-center">
          <div className="text-[32px] mb-3 opacity-30">◉</div>
          <p className="text-[11px] text-[#8a8078]/60 font-[var(--font-cormorant)] italic max-w-xs mx-auto leading-relaxed">
            Your DNA begins to form with your first log.
            Use <span className="text-[#c9a96e]">Daily Pattern</span>, <span className="text-[#c9a96e]">Mirror</span>, or <span className="text-[#c9a96e]">Daily Reflection</span> to start.
          </p>
        </div>
      ) : (
        <>
          {/* DNA visualization — horizontal bars */}
          <div className="space-y-2.5 mb-4">
            {sortedDims.map((d, i) => {
              const delta = d.prevValue !== null ? d.value - d.prevValue : null;
              return (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={d.isAspiration ? 'pt-3 border-t border-[#c9a96e]/20' : ''}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px]" style={{ color: d.color }}>{d.glyph}</span>
                      <span className="text-[10px] font-[var(--font-cormorant)] font-bold" style={{ color: d.isAspiration ? d.color : '#f5f3f0' }}>
                        {d.name}
                      </span>
                      {d.isAspiration && (
                        <span className="text-[7px] tracking-[0.15em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] italic">
                          aspiration
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {delta !== null && delta !== 0 && (
                        <span className={`text-[8px] font-[var(--font-inter)] tabular-nums ${delta > 0 ? 'text-[#c9a96e]' : 'text-[#7da87a]'}`}>
                          {delta > 0 ? '+' : ''}{delta}
                        </span>
                      )}
                      <span className="text-[10px] font-[var(--font-inter)] tabular-nums" style={{ color: d.color }}>
                        {d.value}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/[0.04] relative overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ background: d.color, opacity: d.isAspiration ? 0.8 : 0.7 }}
                      initial={{ width: 0 }}
                      animate={{ width: `${d.value}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interpretation */}
          <div className="mt-4 p-3 border border-[#c9a96e]/30 bg-[#c9a96e]/[0.04]">
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] block mb-1.5">
              Your Current Fingerprint
            </span>
            <p className="text-[11px] text-[#f5f3f0]/80 font-[var(--font-cormorant)] italic leading-relaxed">
              {dominantPattern && !dominantPattern.isAspiration ? (
                <>
                  <span style={{ color: dominantPattern.color }}>{dominantPattern.name}</span> is your dominant pattern right now. {dominantPattern.description} The Witness sits at <span className="text-[#c9a96e]">{witnessValue}/100</span> — that&apos;s the one worth growing.
                </>
              ) : (
                <>
                  The Witness is your dominant state. Rare. Whatever you&apos;ve been doing — keep doing it.
                </>
              )}
            </p>
          </div>

          {/* 30-day comparison */}
          {dna30Ago && (
            <div className="mt-3 p-3 border border-white/[0.04] bg-[#050505]">
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-1">
                30-Day Shift
              </span>
              <p className="text-[9px] text-[#8a8078]/70 font-[var(--font-inter)] italic leading-relaxed">
                Your DNA has evolved since your first logs. The numbers above show the change — patterns you&apos;ve worked with have shifted, and the Witness has grown (or not). This is real evidence, not a personality test.
              </p>
            </div>
          )}

          <p className="mt-4 text-[8px] text-[#8a8078]/30 font-[var(--font-inter)] italic">
            Unlike personality tests, your DNA changes. Every interaction updates it. Come back tomorrow.
          </p>

          {/* Shareable snippet — the growth-loop signature feature */}
          <div className="mt-5 pt-4 border-t border-[#c9a96e]/20">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">
                Shareable Snippet
              </span>
              <span className="text-[7px] text-[#8a8078]/40 font-[var(--font-inter)] italic">
                Privacy-safe · no personal data leaves your device
              </span>
            </div>

            {/* Visual snippet preview */}
            <div className="p-4 border border-[#c9a96e]/30 bg-gradient-to-br from-[#0a0a0a] to-[#050505] mb-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[8px] tracking-[0.25em] uppercase text-[#c9a96e] font-[var(--font-inter)] font-medium">
                  My Pattern DNA
                </span>
                <span className="text-[7px] text-[#8a8078]/50 font-[var(--font-inter)]">astrokalki.com</span>
              </div>
              <div className="space-y-1.5 mb-3">
                {sortedDims.slice(0, 5).map(d => (
                  <div key={d.id} className="flex items-center gap-2">
                    <span className="text-[8px] font-[var(--font-inter)] w-16 shrink-0" style={{ color: d.color }}>
                      {d.name}
                    </span>
                    <div className="flex-1 h-1.5 bg-white/[0.04] relative overflow-hidden">
                      <div className="h-full" style={{ width: `${d.value}%`, background: d.color, opacity: 0.85 }} />
                    </div>
                    <span className="text-[8px] font-[var(--font-inter)] tabular-nums w-6 text-right" style={{ color: d.color }}>
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-[#f5f3f0]/60 font-[var(--font-cormorant)] italic leading-snug border-t border-white/[0.04] pt-2">
                {dominantPattern && !dominantPattern.isAspiration ? (
                  <>Dominant: <span style={{ color: dominantPattern.color }}>{dominantPattern.name}</span>. Witness at {witnessValue}/100.</>
                ) : (
                  <>Witness state dominant. Rare.</>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  const text = `My Pattern DNA (astrokalki.com)\n\n${sortedDims.slice(0, 5).map(d => `${d.name}: ${d.value}/100`).join('\n')}\n\n${dominantPattern && !dominantPattern.isAspiration ? `Dominant: ${dominantPattern.name}. Witness at ${witnessValue}/100.` : 'Witness state dominant. Rare.'}\n\n— Decoded via AstroKalki · The Pattern Intelligence System™`;
                  try {
                    navigator.clipboard.writeText(text);
                    setShareState('copied');
                    setTimeout(() => setShareState('idle'), 2000);
                  } catch {}
                }}
                className="px-3 py-2 text-[9px] tracking-[0.15em] uppercase font-[var(--font-inter)] font-semibold bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] transition-all"
              >
                {shareState === 'copied' ? '✓ Copied' : 'Copy Snippet'}
              </button>
              <button
                onClick={() => {
                  const text = encodeURIComponent(`My Pattern DNA from astrokalki.com — ${dominantPattern && !dominantPattern.isAspiration ? `dominant pattern: ${dominantPattern.name}` : 'Witness state dominant'}. Decode yours:`);
                  const url = encodeURIComponent('https://astrokalki.com#pattern-intelligence-system');
                  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
                }}
                className="px-3 py-2 text-[9px] tracking-[0.15em] uppercase font-[var(--font-inter)] font-semibold border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all"
              >
                Share on X
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
