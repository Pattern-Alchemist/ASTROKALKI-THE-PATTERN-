'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SankalpaForge — Personal Resolve Generator
 *
 * A sankalpa is a Vedic "resolve" — a statement planted in the
 * subconscious during yoga nidra. It bypasses the analytical mind.
 *
 * Three-stage selection:
 *   1. Current challenge (what binds you)
 *   2. Aspirational state (what you would become)
 *   3. Vedic archetype (whose energy you invoke)
 *
 * Output: a crafted sankalpa statement, plus a meditation timer
 * that pulses the resolve at theta-rhythm intervals.
 */

type Challenge = 'anxiety' | 'anger' | 'addiction' | 'grief' | 'confusion' | 'disconnection';
type Aspiration = 'clarity' | 'compassion' | 'discipline' | 'surrender' | 'power' | 'devotion';
type Archetype = 'shiva' | 'durga' | 'ganesha' | 'kali' | 'hanuman' | 'lakshmi';

const CHALLENGES: { id: Challenge; label: string; descriptor: string }[] = [
  { id: 'anxiety', label: 'Anxiety', descriptor: 'a future-tense nervous system loop' },
  { id: 'anger', label: 'Anger', descriptor: 'an old boundary violation still burning' },
  { id: 'addiction', label: 'Addictive Pattern', descriptor: 'a numbing ritual I return to' },
  { id: 'grief', label: 'Grief', descriptor: 'a loss I have not fully metabolized' },
  { id: 'confusion', label: 'Confusion', descriptor: 'a fog preventing right action' },
  { id: 'disconnection', label: 'Disconnection', descriptor: 'a wall between me and what matters' },
];

const ASPIRATIONS: { id: Aspiration; label: string; verb: string }[] = [
  { id: 'clarity', label: 'Clarity', verb: 'see with precision' },
  { id: 'compassion', label: 'Compassion', verb: 'meet without armor' },
  { id: 'discipline', label: 'Discipline', verb: 'act without negotiation' },
  { id: 'surrender', label: 'Surrender', verb: 'release what is not mine' },
  { id: 'power', label: 'Power', verb: 'move with sovereignty' },
  { id: 'devotion', label: 'Devotion', verb: 'offer without condition' },
];

const ARCHETYPES: { id: Archetype; label: string; sanskrit: string; domain: string; color: string }[] = [
  { id: 'shiva', label: 'Shiva', sanskrit: 'Śiva', domain: 'dissolution, stillness, witness consciousness', color: '#c9c0d4' },
  { id: 'durga', label: 'Durga', sanskrit: 'Durgā', domain: 'boundary, protection, sovereign feminine', color: '#c95032' },
  { id: 'ganesha', label: 'Ganesha', sanskrit: 'Gaṇeśa', domain: 'obstacle removal, new beginnings', color: '#c9a96e' },
  { id: 'kali', label: 'Kali', sanskrit: 'Kālī', domain: 'severance, time, ego death', color: '#5d4e8a' },
  { id: 'hanuman', label: 'Hanuman', sanskrit: 'Hanumān', domain: 'devotion, impossible strength, service', color: '#c97032' },
  { id: 'lakshmi', label: 'Lakshmi', sanskrit: 'Lakṣmī', domain: 'abundance, fortune, harmonious flow', color: '#7da87a' },
];

function craftSankalpa(challenge: Challenge, aspiration: Aspiration, archetype: Archetype): string {
  const c = CHALLENGES.find(x => x.id === challenge)!;
  const a = ASPIRATIONS.find(x => x.id === aspiration)!;
  const arc = ARCHETYPES.find(x => x.id === archetype)!;

  const templates = [
    `I release ${c.label.toLowerCase()} as ${c.descriptor}. I now ${a.verb}, carrying the ${arc.domain} of ${arc.label}.`,
    `Where ${c.label.toLowerCase()} lived, I plant ${a.label.toLowerCase()}. May ${arc.label} guide my ${a.label.toLowerCase()} into form.`,
    `I am not ${c.label.toLowerCase()}. I am ${a.label.toLowerCase()}, shaped by ${arc.sanskrit}'s ${arc.domain}.`,
    `The pattern of ${c.label.toLowerCase()} ends in me. ${arc.sanskrit} awakens ${a.label.toLowerCase()} in its place.`,
  ];
  // Deterministic pick based on inputs
  const idx = (challenge.charCodeAt(0) + aspiration.charCodeAt(0) + archetype.charCodeAt(0)) % templates.length;
  return templates[idx];
}

export default function SankalpaForge() {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [aspiration, setAspiration] = useState<Aspiration | null>(null);
  const [archetype, setArchetype] = useState<Archetype | null>(null);
  const [copied, setCopied] = useState(false);

  const sankalpa = useMemo(() => {
    if (!challenge || !aspiration || !archetype) return '';
    return craftSankalpa(challenge, aspiration, archetype);
  }, [challenge, aspiration, archetype]);

  const handleArchetypeSelect = (id: Archetype) => {
    setArchetype(id);
    setTimeout(() => setStage(3), 300);
  };

  const reset = () => {
    setStage(0);
    setChallenge(null);
    setAspiration(null);
    setArchetype(null);
  };

  const copySankalpa = () => {
    try {
      navigator.clipboard.writeText(sankalpa);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Subconscious Imprint
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Sankalpa Forge</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        A sankalpa is a resolve planted below the analytic mind. Select three elements; the forge composes your statement. Repeat in yoga nidra for 21 days.
      </p>

      {/* Stage progress */}
      <div className="flex items-center gap-1.5 mb-5">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`flex-1 h-px ${i <= stage ? 'bg-[#c9a96e]' : 'bg-white/[0.06]'}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Stage 0: Challenge */}
        {stage === 0 && (
          <motion.div
            key="s0"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
          >
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#a07050]/60 font-[var(--font-inter)] block mb-3">
              Step 1 — What binds you?
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {CHALLENGES.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setChallenge(c.id); setStage(1); }}
                  className="p-3 border border-white/[0.04] hover:border-[#a07050]/40 hover:bg-[#a07050]/[0.03] text-left transition-all duration-200 group"
                >
                  <span className="text-[10px] font-[var(--font-cormorant)] font-bold text-[#f5f3f0] group-hover:text-[#a07050] block">
                    {c.label}
                  </span>
                  <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)] italic mt-1 block leading-relaxed">
                    {c.descriptor}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stage 1: Aspiration */}
        {stage === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
          >
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] block mb-3">
              Step 2 — What would you become?
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {ASPIRATIONS.map(a => (
                <button
                  key={a.id}
                  onClick={() => { setAspiration(a.id); setStage(2); }}
                  className="p-3 border border-white/[0.04] hover:border-[#c9a96e]/40 hover:bg-[#c9a96e]/[0.03] text-left transition-all duration-200 group"
                >
                  <span className="text-[10px] font-[var(--font-cormorant)] font-bold text-[#f5f3f0] group-hover:text-[#c9a96e] block">
                    {a.label}
                  </span>
                  <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)] italic mt-1 block">
                    I {a.verb}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStage(0)}
              className="mt-4 text-[9px] tracking-[0.2em] uppercase text-[#8a8078]/40 hover:text-[#8a8078] font-[var(--font-inter)] transition-colors"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {/* Stage 2: Archetype */}
        {stage === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
          >
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] block mb-3">
              Step 3 — Whose energy do you invoke?
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {ARCHETYPES.map(arc => (
                <button
                  key={arc.id}
                  onClick={() => handleArchetypeSelect(arc.id)}
                  className="p-3 border border-white/[0.04] hover:bg-white/[0.02] text-left transition-all duration-200 group"
                  style={{ ['--hover-color' as any]: arc.color }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${arc.color}66`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = ''; }}
                >
                  <span className="text-[10px] font-[var(--font-cormorant)] font-bold block" style={{ color: arc.color }}>
                    {arc.label}
                  </span>
                  <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)] italic mt-0.5 block">
                    {arc.sanskrit}
                  </span>
                  <span className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)] mt-1.5 block leading-relaxed">
                    {arc.domain}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStage(1)}
              className="mt-4 text-[9px] tracking-[0.2em] uppercase text-[#8a8078]/40 hover:text-[#8a8078] font-[var(--font-inter)] transition-colors"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {/* Stage 3: Result */}
        {stage === 3 && challenge && aspiration && archetype && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="border border-[#c9a96e]/30 bg-[#c9a96e]/[0.04] p-5 text-center">
              <span className="text-[8px] tracking-[0.3em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] block mb-3">
                Your Sankalpa
              </span>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-[var(--font-cormorant)] text-base md:text-lg text-[#f5f3f0] italic leading-relaxed"
              >
                {sankalpa}
              </motion.p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="border border-white/[0.04] bg-[#050505] p-2">
                <span className="text-[7px] tracking-[0.15em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block">Release</span>
                <span className="text-[10px] font-[var(--font-cormorant)] text-[#a07050] font-bold">{CHALLENGES.find(c => c.id === challenge)!.label}</span>
              </div>
              <div className="border border-white/[0.04] bg-[#050505] p-2">
                <span className="text-[7px] tracking-[0.15em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block">Cultivate</span>
                <span className="text-[10px] font-[var(--font-cormorant)] text-[#c9a96e] font-bold">{ASPIRATIONS.find(a => a.id === aspiration)!.label}</span>
              </div>
              <div className="border border-white/[0.04] bg-[#050505] p-2">
                <span className="text-[7px] tracking-[0.15em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block">Invoke</span>
                <span className="text-[10px] font-[var(--font-cormorant)] font-bold" style={{ color: ARCHETYPES.find(a => a.id === archetype)!.color }}>
                  {ARCHETYPES.find(a => a.id === archetype)!.label}
                </span>
              </div>
            </div>

            <div className="border border-white/[0.04] bg-[#050505] p-3">
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-1">
                Practice Protocol
              </span>
              <p className="text-[10px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed">
                Recite once silently at the beginning of yoga nidra, once at the end. Do not vary the wording for 21 days. The subconscious responds to repetition, not novelty.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copySankalpa}
                className="flex-1 px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all duration-300"
              >
                {copied ? '✓ Copied' : 'Copy Sankalpa'}
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border border-white/[0.06] text-[#8a8078]/60 hover:text-[#8a8078] hover:border-white/[0.1] transition-all duration-300"
              >
                Forge Anew
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
