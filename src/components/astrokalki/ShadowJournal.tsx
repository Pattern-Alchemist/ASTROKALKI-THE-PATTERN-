'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ShadowJournal — Guided Shadow-Work Journal
 *
 * 10 archetype-themed journaling prompts. Free text entry with mood
 * rating (1–5). Saves to localStorage with timestamp. Timeline view
 * shows past entries grouped by archetype. Word count + mock
 * "depth" analysis based on length and emotional vocabulary.
 */

type Archetype =
  | 'shadow' | 'anima' | 'mother' | 'father' | 'wise' | 'child'
  | 'death' | 'trickster' | 'hero' | 'sage';

interface Prompt {
  archetype: Archetype;
  name: string;
  prompt: string;
  guidance: string;
}

const PROMPTS: Prompt[] = [
  {
    archetype: 'shadow',
    name: 'The Shadow',
    prompt: 'What trait do you most despise in others? Where does it live in you?',
    guidance: 'The shadow is what you refuse to see in yourself but project onto others. Begin with the strongest revulsion.',
  },
  {
    archetype: 'anima',
    name: 'Anima / Animus',
    prompt: 'What quality of your inner feminine / masculine have you exiled? What would it ask of you today?',
    guidance: 'The contra-sexual inner figure. Often appears in dreams as the opposite-sex stranger.',
  },
  {
    archetype: 'mother',
    name: 'The Great Mother',
    prompt: 'Where did you receive too little nourishment — or too much that smothered?',
    guidance: 'The Mother holds both womb and tomb. Examine the form of your wounding.',
  },
  {
    archetype: 'father',
    name: 'The Father / King',
    prompt: 'Whose authority have you internalized? Does it serve or enslave you?',
    guidance: 'The internalized father sets the law of your inner kingdom. Whose voice speaks when you fail?',
  },
  {
    archetype: 'wise',
    name: 'The Wise Old Man / Woman',
    prompt: 'What do you know now that you could not have known at 20? Who taught it to you?',
    guidance: 'The wisdom archetype often appears when the ego has exhausted its strategies.',
  },
  {
    archetype: 'child',
    name: 'The Divine Child',
    prompt: 'What did the child-you want that the adult-you stopped asking for?',
    guidance: 'The Divine Child carries original impulse — pure, vulnerable, and unafraid.',
  },
  {
    archetype: 'death',
    name: 'Death / Rebirth',
    prompt: 'What in you is dying? What is being born in its place?',
    guidance: 'Death appears when an old identity has become too small. Do not rescue what is meant to fall.',
  },
  {
    archetype: 'trickster',
    name: 'The Trickster',
    prompt: 'Where have you betrayed your own values? What did the betrayal teach?',
    guidance: 'The Trickster exposes hypocrisy with humor and cruelty. Listen without defending.',
  },
  {
    archetype: 'hero',
    name: 'The Hero',
    prompt: 'What quest have you been avoiding? What dragon guards its threshold?',
    guidance: 'The Hero must leave the known world. The dragon is always the one you most fear.',
  },
  {
    archetype: 'sage',
    name: 'The Sage',
    prompt: 'What belief are you certain of? What would it cost to be wrong?',
    guidance: 'The Sage tests certainty. The most dangerous beliefs are the ones you do not see as beliefs.',
  },
];

interface Entry {
  id: string;
  date: string;
  archetype: Archetype;
  prompt: string;
  text: string;
  mood: number;
  wordCount: number;
  depthScore: number;
}

const STORAGE_KEY = 'astrokalki-shadow-journal';

const EMOTION_WORDS = ['fear', 'fearful', 'afraid', 'rage', 'angry', 'grief', 'grieving', 'lost', 'alone', 'shame', 'ashamed', 'broken', 'dead', 'die', 'death', 'mother', 'father', 'love', 'hate', 'despair', 'hope', 'empty', 'full', 'surrender', 'release', 'hold', 'let go', 'cannot'];

function analyzeDepth(text: string): number {
  const words = text.toLowerCase().split(/\s+/);
  const emotionalHits = words.filter(w => EMOTION_WORDS.some(e => w.includes(e))).length;
  const lengthScore = Math.min(text.length / 800, 1);
  const emotionScore = Math.min(emotionalHits / 8, 1);
  return Math.round((lengthScore * 0.4 + emotionScore * 0.6) * 100);
}

const ARCHETYPE_COLORS: Record<Archetype, string> = {
  shadow: '#5d4e3a',
  anima: '#9a6a8a',
  mother: '#7da87a',
  father: '#c9a96e',
  wise: '#a0b5c9',
  child: '#c9c0d4',
  death: '#3a3530',
  trickster: '#c97032',
  hero: '#a83232',
  sage: '#6a5d9a',
};

export default function ShadowJournal() {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [text, setText] = useState('');
  const [mood, setMood] = useState(3);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [view, setView] = useState<'compose' | 'timeline'>('compose');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {}
  }, []);

  const wordCount = useMemo(() => text.trim() ? text.trim().split(/\s+/).length : 0, [text]);

  const saveEntry = () => {
    if (!selectedPrompt || !text.trim()) return;
    const entry: Entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
      archetype: selectedPrompt.archetype,
      prompt: selectedPrompt.prompt,
      text: text.trim(),
      mood,
      wordCount,
      depthScore: analyzeDepth(text),
    };
    const updated = [entry, ...entries].slice(0, 100);
    setEntries(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
    setText('');
    setMood(3);
    setSelectedPrompt(null);
    setView('timeline');
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  };

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Depth Psychological Workspace
        </span>
      </div>
      <div className="flex items-baseline justify-between mb-1">
        <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold">Shadow Journal</p>
        <div className="flex gap-1">
          <button
            onClick={() => setView('compose')}
            className={`px-2 py-1 text-[8px] tracking-[0.15em] uppercase font-[var(--font-inter)] font-medium border transition-all ${
              view === 'compose' ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5' : 'border-white/[0.04] text-[#8a8078]/60'
            }`}
          >
            Compose
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`px-2 py-1 text-[8px] tracking-[0.15em] uppercase font-[var(--font-inter)] font-medium border transition-all ${
              view === 'timeline' ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5' : 'border-white/[0.04] text-[#8a8078]/60'
            }`}
          >
            Timeline ({entries.length})
          </button>
        </div>
      </div>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Ten archetypal prompts. All entries stored locally. None leave this device. Write without revision.
      </p>

      <AnimatePresence mode="wait">
        {view === 'compose' ? (
          <motion.div key="compose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {!selectedPrompt ? (
              <div>
                <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-3">
                  Select an Archetype
                </span>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5">
                  {PROMPTS.map(p => (
                    <button
                      key={p.archetype}
                      onClick={() => setSelectedPrompt(p)}
                      className="p-2 border border-white/[0.04] hover:border-white/[0.08] text-center transition-all duration-200 group"
                    >
                      <div
                        className="w-2 h-2 rounded-full mx-auto mb-1.5 transition-transform group-hover:scale-150"
                        style={{ background: ARCHETYPE_COLORS[p.archetype] }}
                      />
                      <span className="text-[8px] font-[var(--font-cormorant)] font-bold text-[#f5f3f0] group-hover:text-[#c9a96e] block leading-tight">
                        {p.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                key={selectedPrompt.archetype}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="border border-white/[0.04] bg-[#050505] p-4 mb-3">
                  <div className="flex items-baseline gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: ARCHETYPE_COLORS[selectedPrompt.archetype] }} />
                    <span className="text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium" style={{ color: ARCHETYPE_COLORS[selectedPrompt.archetype] }}>
                      {selectedPrompt.name}
                    </span>
                  </div>
                  <p className="font-[var(--font-cormorant)] text-base text-[#f5f3f0] italic mb-2 leading-snug">
                    {selectedPrompt.prompt}
                  </p>
                  <p className="text-[9px] text-[#8a8078]/60 font-[var(--font-inter)] font-light leading-relaxed">
                    {selectedPrompt.guidance}
                  </p>
                </div>

                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Begin. Do not edit. Let the first sentence lead..."
                  className="w-full min-h-[180px] p-3 bg-[#050505] border border-white/[0.04] focus:border-[#c9a96e]/40 outline-none text-[11px] font-[var(--font-inter)] text-[#f5f3f0]/90 leading-relaxed resize-y"
                  autoFocus
                />

                <div className="flex items-center justify-between mt-2 mb-3">
                  <span className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)]">
                    {wordCount} words · Depth score: {analyzeDepth(text)}/100
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)] uppercase tracking-[0.15em]">Mood</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(m => (
                        <button
                          key={m}
                          onClick={() => setMood(m)}
                          className={`w-5 h-5 text-[10px] font-[var(--font-inter)] border transition-all ${
                            mood === m
                              ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10'
                              : 'border-white/[0.04] text-[#8a8078]/50'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={saveEntry}
                    disabled={!text.trim()}
                    className="flex-1 px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Seal Entry
                  </button>
                  <button
                    onClick={() => setSelectedPrompt(null)}
                    className="px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border border-white/[0.06] text-[#8a8078]/60 hover:text-[#8a8078] transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div key="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {entries.length === 0 ? (
              <div className="text-center py-12 border border-white/[0.04] bg-[#050505]">
                <p className="text-[11px] text-[#8a8078]/50 font-[var(--font-cormorant)] italic">
                  The archive is empty. Begin in Compose.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 custom-scroll">
                {entries.map(e => (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border border-white/[0.04] bg-[#050505] p-3 group"
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: ARCHETYPE_COLORS[e.archetype] }} />
                        <span className="text-[8px] tracking-[0.15em] uppercase font-[var(--font-inter)] font-medium" style={{ color: ARCHETYPE_COLORS[e.archetype] }}>
                          {PROMPTS.find(p => p.archetype === e.archetype)?.name}
                        </span>
                      </div>
                      <span className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)]">
                        {new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {new Date(e.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[9px] text-[#8a8078]/60 font-[var(--font-inter)] italic mb-2 leading-relaxed">
                      {e.prompt}
                    </p>
                    <p className="text-[10px] text-[#f5f3f0]/80 font-[var(--font-inter)] font-light leading-relaxed line-clamp-3">
                      {e.text}
                    </p>
                    <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/[0.04]">
                      <span className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)]">{e.wordCount} words</span>
                      <span className="text-[8px] text-[#c9a96e]/60 font-[var(--font-inter)]">Depth: {e.depthScore}</span>
                      <span className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)]">Mood: {e.mood}/5</span>
                      <button
                        onClick={() => deleteEntry(e.id)}
                        className="ml-auto text-[8px] text-[#a07050]/50 hover:text-[#a07050] font-[var(--font-inter)] uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Burn
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
