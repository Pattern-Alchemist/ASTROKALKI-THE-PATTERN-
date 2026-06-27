'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPRING } from './utils/animation';

/**
 * DreamLog — Interactive Dream-Weave Log & Archetype Extractor
 * 
 * Private dream journal with client-side Jungian archetype detection.
 * Highlights terms matching mythic patterns and presents descriptive popups.
 */

interface Archetype {
  terms: string[];
  name: string;
  description: string;
  color: string;
}

const ARCHETYPES: Archetype[] = [
  { terms: ['mother', 'mom', 'mama', 'parent', 'nurturing', 'womb'], name: 'The Great Mother', description: 'The primordial source. Appears when unconscious needs for safety or nourishment surface. Can manifest as devouring (engulfment) or nourishing (unconditional holding).', color: '#5090c0' },
  { terms: ['father', 'dad', 'authority', 'king', 'law', 'judge'], name: 'The Father/King', description: 'The principle of order and law. Represents internalized authority — both protective and tyrannical. Dreams of the father reveal your relationship with structure and power.', color: '#c9a96e' },
  { terms: ['shadow', 'dark', 'hidden', 'monster', 'demon', 'enemy', 'stranger'], name: 'The Shadow', description: 'Everything you have refused to acknowledge in yourself. The shadow in dreams is never external — it is the disowned self demanding recognition.', color: '#8a8078' },
  { terms: ['animus', 'man', 'male', 'masculine', 'warrior', 'soldier', 'knife', 'sword'], name: 'The Animus', description: 'The masculine principle within. For all dreamers, the animus represents the capacity for decisive action, boundary-setting, and logical discrimination.', color: '#e8a040' },
  { terms: ['anima', 'woman', 'female', 'feminine', 'goddess', 'priestess', 'water', 'moon'], name: 'The Anima', description: 'The feminine principle within. The anima carries emotional depth, intuition, and the capacity for relatedness. She is the bridge to the unconscious.', color: '#a0a0d0' },
  { terms: ['wise', 'old man', 'sage', 'elder', 'teacher', 'guide', 'mentor'], name: 'The Wise Old Man', description: 'The archetype of meaning and spiritual guidance. Appears when the ego is ready for a deeper truth it cannot reach alone. He speaks in paradox and metaphor.', color: '#d4b87a' },
  { terms: ['child', 'baby', 'infant', 'young', 'innocent', 'orphan'], name: 'The Divine Child', description: 'The potential for renewal. The child in dreams represents the emerging self — the part of you that is still becoming, still innocent, still unshaped by the world.', color: '#80a060' },
  { terms: ['death', 'dying', 'funeral', 'grave', 'ending', 'funeral', 'corpse'], name: 'Death/Rebirth', description: 'Never literal. Death in dreams is always transformation — the old pattern dying so the new can emerge. Resistance to dream-death parallels resistance to change.', color: '#a07050' },
];

interface DreamEntry {
  id: string;
  text: string;
  timestamp: number;
  archetypes: string[];
}

const STORAGE_KEY = 'ak_dream_log';

function detectArchetypes(text: string): string[] {
  const lower = text.toLowerCase();
  return ARCHETYPES.filter(a => a.terms.some(t => lower.includes(t))).map(a => a.name);
}

export default function DreamLog() {
  const [entries, setEntries] = useState<DreamEntry[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [detectedArchetypes, setDetectedArchetypes] = useState<string[]>([]);
  const [activeArchetype, setActiveArchetype] = useState<Archetype | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {}
  }, []);

  const handleTextChange = useCallback((text: string) => {
    setCurrentText(text);
    setDetectedArchetypes(detectArchetypes(text));
  }, []);

  const saveEntry = useCallback(() => {
    if (!currentText.trim()) return;
    const entry: DreamEntry = {
      id: Date.now().toString(36),
      text: currentText,
      timestamp: Date.now(),
      archetypes: detectedArchetypes,
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setCurrentText('');
    setDetectedArchetypes([]);
  }, [currentText, detectedArchetypes, entries]);

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Unconscious Channel
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">
        Dream-Weave Log
      </p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Register dream dispatches. The archetype extractor identifies Jungian patterns in your unconscious narrative.
      </p>

      {/* Input */}
      <textarea
        value={currentText}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="Describe your dream dispatch..."
        className="w-full h-24 bg-[#050505] border border-white/[0.06] p-3 text-[12px] text-[#f5f3f0]/80 font-[var(--font-inter)] font-light leading-relaxed resize-none placeholder:text-[#8a8078]/30 focus:outline-none focus:border-[#c9a96e]/30 transition-colors"
        aria-label="Dream description input"
      />

      {/* Detected archetypes */}
      {detectedArchetypes.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {detectedArchetypes.map(name => {
            const archetype = ARCHETYPES.find(a => a.name === name);
            return (
              <button
                key={name}
                onClick={() => archetype && setActiveArchetype(activeArchetype?.name === name ? null : archetype)}
                className="px-2 py-1 text-[8px] tracking-[0.1em] uppercase border transition-all duration-300"
                style={{
                  borderColor: archetype?.color + '40',
                  color: archetype?.color,
                  backgroundColor: activeArchetype?.name === name ? archetype?.color + '15' : 'transparent',
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}

      {/* Archetype detail */}
      <AnimatePresence>
        {activeArchetype && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={SPRING.stiff}
            className="overflow-hidden mt-2"
          >
            <div className="bg-[#050505] border border-white/[0.04] p-3">
              <p className="font-[var(--font-cormorant)] text-sm text-[#f5f3f0] font-bold mb-1">{activeArchetype.name}</p>
              <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed">{activeArchetype.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save button */}
      <div className="flex items-center gap-3 mt-3">
        <button
          onClick={saveEntry}
          disabled={!currentText.trim()}
          className="px-4 py-2 text-[9px] tracking-[0.2em] uppercase border border-[#c9a96e]/30 text-[#c9a96e] font-[var(--font-inter)] font-medium hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#c9a96e]"
        >
          Weave Entry
        </button>
        {entries.length > 0 && (
          <span className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)]">{entries.length} dispatches recorded</span>
        )}
      </div>

      {/* Recent entries */}
      {entries.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/[0.04] space-y-2 max-h-32 overflow-y-auto">
          {entries.slice(0, 5).map(entry => (
            <div key={entry.id} className="bg-[#050505] border border-white/[0.04] p-2">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)]">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </span>
                {entry.archetypes.length > 0 && (
                  <span className="text-[7px] text-[#c9a96e]/40 font-[var(--font-inter)]">
                    {entry.archetypes.join(' · ')}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#8a8078]/60 font-[var(--font-inter)] font-light mt-0.5 line-clamp-2">
                {entry.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
