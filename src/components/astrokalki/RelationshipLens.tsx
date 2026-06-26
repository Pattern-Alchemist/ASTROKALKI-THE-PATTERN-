'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * RelationshipLens (Pillar 2 · Decode)
 *
 * User writes one sentence about a relationship dynamic.
 * AI decodes it into: Pattern → Trigger → Protective Strategy
 * → Healthy Response. No astrology. Just psychological clarity.
 */

interface Decoding {
  pattern: string;
  trigger: string;
  strategy: string;
  response: string;
}

// Keyword-based decoder
function decode(input: string): Decoding {
  const lower = input.toLowerCase();

  // Abandonment / ignoring / pulling away
  if (/(ignor|not respond|didn't reply|ghost|pull(?:ed|s)? away|distant|cold|shut (?:me )?out|silent treatment|left me on read)/.test(lower)) {
    return {
      pattern: 'Fear of abandonment',
      trigger: 'Emotional inconsistency — the other person\'s distance activates an old wound from a caregiver who was emotionally unavailable.',
      strategy: 'Overthinking — replaying the interaction, scanning for what you did wrong, preparing for the worst to soften the fall.',
      response: 'Wait 24 hours before reacting. The intensity you feel is from the past, not the present. Reach out once, then let the silence be data, not a verdict.',
    };
  }

  // Criticism / blame
  if (/(criticiz|blamed?|judg|said i'm not|told me i|always wrong|nothing i do)/.test(lower)) {
    return {
      pattern: 'Internalized critic',
      trigger: 'A caregiver\'s voice was sharper than their presence. Criticism now registers as a threat to belonging, not just feedback.',
      strategy: 'Collapsing — you agree too quickly, apologize for things you didn\'t do, or shut down to avoid further attack.',
      response: 'Distinguish the criticism from the critic. The content may have a thread of truth. The delivery is theirs. Address the content; let go of the tone.',
    };
  }

  // Controlling / bossy
  if (/(controll|telling me what|won't let|always orders|command|bossy|forcing)/.test(lower)) {
    return {
      pattern: 'Surrendered authority',
      trigger: 'A pattern of giving away your agency — often from modeling by a parent who yielded to the other, or from learning early that compliance kept you safe.',
      strategy: 'Passive resistance — agreeing outwardly while resenting inwardly. The resentment becomes the relationship\'s slow poison.',
      response: 'Name what you actually want, out loud, without softening. The friction this creates is the friction of self-respect returning.',
    };
  }

  // People-pleasing / not enough
  if (/(do everything|never enough|gave everything|unappreciated|took advantage|used me|one-sided)/.test(lower)) {
    return {
      pattern: 'Compensatory giving',
      trigger: 'A belief that love must be earned through over-functioning — usually from a childhood where affection was conditional on performance.',
      strategy: 'Over-giving — you do more than your share, then resent the other person for not matching a generosity they never asked for.',
      response: 'Stop. Do exactly half. Notice what happens. The relationship will either recalibrate or reveal itself — both are useful.',
    };
  }

  // Avoidance / shut down
  if (/(won't talk|shuts down|avoid|won't engage|walks away|changes subject|deflect)/.test(lower)) {
    return {
      pattern: 'Avoidant dynamic',
      trigger: 'One or both of you learned that conflict is dangerous — so any raised voice or hard topic triggers the freeze response.',
      strategy: 'Topic-switching or physical exit. The avoidance protects short-term peace at the cost of long-term intimacy.',
      response: 'Name the pattern aloud without accusation: "I notice we both go quiet when this comes up. Can we stay for 5 more minutes?" Small windows build capacity.',
    };
  }

  // Repeated argument
  if (/(same fight|always argue|never ends|again and again|same thing|loop|can't stop)/.test(lower)) {
    return {
      pattern: 'Reenactment loop',
      trigger: 'The argument isn\'t about the topic. It\'s about an older wound that the current situation is standing in for. The loop is the wound trying to be heard.',
      strategy: 'Escalation — each repetition gets louder because the underlying need was never met the first 50 times.',
      response: 'Stop the next iteration mid-sentence and ask: "What are we actually fighting about? Not the dishes — the thing underneath." Then listen for 2 minutes without responding.',
    };
  }

  // Jealousy / suspicion
  if (/(jealous|suspicious|cheat|flirt|who were you|checking phone|trust)/.test(lower)) {
    return {
      pattern: 'Attachment insecurity',
      trigger: 'A past betrayal — often not from this relationship — has sensitized the nervous system to threat cues, real or imagined.',
      strategy: 'Surveillance — checking, asking, monitoring. The monitoring reduces anxiety for 10 minutes, then feeds it long-term.',
      response: 'Distinguish past from present. The fear is real. The threat may not be. State the fear directly: "I\'m feeling insecure, not accusing you." Watch the response.',
    };
  }

  // Default
  return {
    pattern: 'Unrecognized repetition',
    trigger: 'The dynamic you\'re describing has roots in an earlier relationship — usually the first one (caregivers). The current person is standing in for someone else.',
    strategy: 'Whatever you do now is what you learned to do then. It worked at age 6. It\'s not working at your current age.',
    response: 'Ask yourself: "Who does this person remind me of?" The answer is usually immediate and surprising. That\'s where the real work begins.',
  };
}

export default function RelationshipLens() {
  const [input, setInput] = useState('');
  const [decoding, setDecoding] = useState<Decoding | null>(null);
  const [submittedInput, setSubmittedInput] = useState('');

  const analyze = () => {
    if (!input.trim()) return;
    setSubmittedInput(input.trim());
    setDecoding(decode(input));
  };

  const reset = () => {
    setInput('');
    setDecoding(null);
    setSubmittedInput('');
  };

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Pillar 2 · Decode
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Relationship Lens</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Describe a relationship moment in one sentence. The lens decodes the pattern underneath.
      </p>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="My boyfriend ignored my message all day then texted 'sorry, busy' at midnight..."
        maxLength={300}
        rows={3}
        disabled={!!decoding}
        className="w-full mb-3 p-3 bg-[#050505] border border-white/[0.04] focus:border-[#c9a96e]/40 outline-none text-[11px] text-[#f5f3f0] font-[var(--font-inter)] leading-relaxed resize-none disabled:opacity-50"
      />

      <button
        onClick={analyze}
        disabled={!input.trim() || !!decoding}
        className="w-full px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-semibold bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        Decode the Pattern
      </button>

      <AnimatePresence mode="wait">
        {decoding && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 space-y-3"
          >
            {/* Original */}
            <div className="p-3 border border-white/[0.04] bg-[#050505]">
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block mb-1">
                What you wrote
              </span>
              <p className="text-[10px] text-[#8a8078]/80 font-[var(--font-inter)] italic leading-relaxed">"{submittedInput}"</p>
            </div>

            {/* Decoded layers */}
            <div className="space-y-2">
              {[
                { label: 'Pattern', value: decoding.pattern, color: '#c97032', icon: '⚔' },
                { label: 'Likely Trigger', value: decoding.trigger, color: '#a83232', icon: '⚡' },
                { label: 'Protective Strategy', value: decoding.strategy, color: '#9a8a6a', icon: '🛡' },
                { label: 'Healthy Response', value: decoding.response, color: '#c9a96e', icon: '→' },
              ].map((layer, i) => (
                <motion.div
                  key={layer.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="p-3 border bg-[#050505]"
                  style={{ borderColor: `${layer.color}40` }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[14px]" style={{ color: layer.color }}>{layer.icon}</span>
                    <span className="text-[8px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium" style={{ color: layer.color }}>
                      {layer.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#f5f3f0]/80 font-[var(--font-inter)] leading-relaxed">
                    {layer.value}
                  </p>
                </motion.div>
              ))}
            </div>

            <button
              onClick={reset}
              className="w-full px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border border-white/[0.06] text-[#8a8078]/60 hover:text-[#8a8078] hover:border-white/[0.1] transition-all"
            >
              Decode Another
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
