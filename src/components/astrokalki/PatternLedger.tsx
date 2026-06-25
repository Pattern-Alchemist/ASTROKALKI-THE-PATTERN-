'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPRING } from './utils/animation';

/**
 * PatternLedger — Client-Side Secure Pattern Storage
 * 
 * Stores pattern assessment results in localStorage with
 * a simple obfuscation layer. Tracks:
 * - Pattern type identified
 * - Assessment date
 * - Confidence score
 * - Recommended stage
 * 
 * Security notes:
 * - Uses base64 encoding (NOT encryption) for at-rest obfuscation
 * - Real encryption would require a user-provided key or server-side KMS
 * - Clearly communicates this to users
 * - No sensitive data is stored without user consent
 */

interface PatternEntry {
  id: string;
  timestamp: number;
  patternType: string;
  confidence: number;
  recommendedStage: string;
  notes: string;
}

const STORAGE_KEY = 'ak_pattern_ledger';
const ENCODING_PREFIX = 'ak_v1:';

function encode(data: string): string {
  return ENCODING_PREFIX + btoa(unescape(encodeURIComponent(data)));
}

function decode(data: string): string {
  if (!data.startsWith(ENCODING_PREFIX)) return data;
  return decodeURIComponent(escape(atob(data.slice(ENCODING_PREFIX.length))));
}

function getLedger(): PatternEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(decode(raw));
  } catch {
    return [];
  }
}

function saveLedger(entries: PatternEntry[]): void {
  localStorage.setItem(STORAGE_KEY, encode(JSON.stringify(entries)));
}

const PATTERN_TYPES = [
  'Repeating Heartbreak',
  'Self-Sabotage',
  'Glass Ceiling',
  'The Mask',
  'Trauma Bond',
  'Spiritual Bypassing',
  'People-Pleasing',
];

const STAGES = [
  'Stage 1 — Recognition',
  'Stage 2 — Diagnosis',
  'Stage 3 — Realignment',
  'Stage 4 — Integration',
];

export default function PatternLedger() {
  const [entries, setEntries] = useState<PatternEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newPattern, setNewPattern] = useState('');
  const [newConfidence, setNewConfidence] = useState(70);
  const [newStage, setNewStage] = useState(STAGES[0]);
  const [newNotes, setNewNotes] = useState('');
  const [showSecurity, setShowSecurity] = useState(false);

  // Load entries on mount
  useEffect(() => {
    setEntries(getLedger());
  }, []);

  const addEntry = useCallback(() => {
    if (!newPattern) return;
    const entry: PatternEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      timestamp: Date.now(),
      patternType: newPattern,
      confidence: newConfidence,
      recommendedStage: newStage,
      notes: newNotes,
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    saveLedger(updated);

    // Reset form
    setNewPattern('');
    setNewConfidence(70);
    setNewStage(STAGES[0]);
    setNewNotes('');
  }, [newPattern, newConfidence, newStage, newNotes, entries]);

  const clearLedger = useCallback(() => {
    setEntries([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
              Pattern Ledger
            </span>
          </div>
          <p className="font-[var(--font-cormorant)] text-lg md:text-xl text-[#f5f3f0] font-bold">
            Your secure pattern archive
          </p>
        </div>
        <button
          onClick={() => setShowSecurity(!showSecurity)}
          className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/50 hover:text-[#c9a96e] transition-colors duration-300 font-[var(--font-inter)]"
          aria-label="Toggle security information"
        >
          {showSecurity ? 'Hide' : 'Security'}
        </button>
      </div>

      {/* Security info */}
      <AnimatePresence>
        {showSecurity && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING.stiff}
            className="overflow-hidden mb-4"
          >
            <div className="bg-[#050505] border border-white/[0.04] p-3">
              <p className="text-[9px] text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed">
                <strong className="text-[#c9a96e]/70 font-medium">Data Storage:</strong> All entries are stored locally in your browser using base64 encoding. No data is transmitted to any server. This encoding provides obfuscation, not encryption — for true encryption, use a client-side key management system.
              </p>
              <p className="text-[9px] text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed mt-1">
                <strong className="text-[#c9a96e]/70 font-medium">Your Control:</strong> You can delete all stored data at any time. No cookies or tracking are used.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed mb-4">
        Record patterns you recognize in yourself. Track your diagnostic progression over time. All data stays on your device.
      </p>

      {/* Add new entry */}
      <div className="space-y-3 mb-5">
        <div>
          <label className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/60 font-[var(--font-inter)] block mb-1">
            Pattern Type
          </label>
          <select
            value={newPattern}
            onChange={(e) => setNewPattern(e.target.value)}
            className="w-full bg-[#050505] border border-white/[0.06] px-3 py-2 text-[11px] text-[#f5f3f0]/80 font-[var(--font-inter)] font-light focus:outline-none focus:border-[#c9a96e]/30 transition-colors"
            aria-label="Select pattern type"
          >
            <option value="">Select a pattern...</option>
            {PATTERN_TYPES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/60 font-[var(--font-inter)] block mb-1">
              Confidence: {newConfidence}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={newConfidence}
              onChange={(e) => setNewConfidence(parseInt(e.target.value))}
              className="w-full h-1 bg-[#1a1815] rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#c9a96e] [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:cursor-pointer"
              aria-label="Confidence level"
            />
          </div>
          <div className="flex-1">
            <label className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/60 font-[var(--font-inter)] block mb-1">
              Recommended Stage
            </label>
            <select
              value={newStage}
              onChange={(e) => setNewStage(e.target.value)}
              className="w-full bg-[#050505] border border-white/[0.06] px-3 py-2 text-[11px] text-[#f5f3f0]/80 font-[var(--font-inter)] font-light focus:outline-none focus:border-[#c9a96e]/30 transition-colors"
              aria-label="Recommended diagnostic stage"
            >
              {STAGES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/60 font-[var(--font-inter)] block mb-1">
            Notes (optional)
          </label>
          <input
            type="text"
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            placeholder="What did you notice?"
            className="w-full bg-[#050505] border border-white/[0.06] px-3 py-2 text-[11px] text-[#f5f3f0]/80 font-[var(--font-inter)] font-light focus:outline-none focus:border-[#c9a96e]/30 transition-colors placeholder:text-[#8a8078]/30"
            aria-label="Personal notes about this pattern"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={addEntry}
            disabled={!newPattern}
            className="px-4 py-2 text-[9px] tracking-[0.2em] uppercase border border-[#c9a96e]/30 text-[#c9a96e] font-[var(--font-inter)] font-medium hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#c9a96e]"
            aria-label="Record pattern entry"
          >
            Record Pattern
          </button>
          {entries.length > 0 && (
            <button
              onClick={clearLedger}
              className="px-4 py-2 text-[9px] tracking-[0.2em] uppercase text-[#8a8078]/30 hover:text-[#8a8078]/60 transition-colors duration-300 font-[var(--font-inter)]"
              aria-label="Clear all stored patterns"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Entry list */}
      {entries.length > 0 && (
        <div className="border-t border-white/[0.04] pt-4">
          <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-3">
            Recorded Patterns ({entries.length})
          </span>
          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
            {entries.map(entry => (
              <div key={entry.id} className="bg-[#050505] border border-white/[0.04] p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-[var(--font-cormorant)] text-sm text-[#f5f3f0] font-bold">
                    {entry.patternType}
                  </span>
                  <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)]">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[8px] text-[#c9a96e]/60 font-[var(--font-inter)]">
                    Confidence: {entry.confidence}%
                  </span>
                  <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)]">
                    {entry.recommendedStage}
                  </span>
                </div>
                {entry.notes && (
                  <p className="text-[9px] text-[#8a8078]/60 font-[var(--font-inter)] font-light mt-1 italic">
                    &ldquo;{entry.notes}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {entries.length === 0 && (
        <div className="text-center py-6 border-t border-white/[0.04]">
          <p className="text-[10px] text-[#8a8078]/30 font-[var(--font-inter)] font-light">
            No patterns recorded yet. Begin your diagnostic above.
          </p>
        </div>
      )}
    </div>
  );
}
