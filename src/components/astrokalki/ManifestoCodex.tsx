'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ManifestoCodex — The AstroKalki Radical Self-Sovereignty Manifesto
 * 
 * Bento-grid reading codex with dynamic text-scrambling that reveals
 * as user scrolls. Clinical footnotes appear on hover.
 */

interface CodexEntry {
  id: string;
  title: string;
  text: string;
  footnote?: string;
  span: string; // Tailwind col-span
}

const CODEX_ENTRIES: CodexEntry[] = [
  {
    id: 'thesis',
    title: 'The Thesis of Invisible Imprisonment',
    text: 'You are not stuck. You are not broken. You are not lacking willpower or discipline or intelligence. You are running a program that was installed before you had language to name it. Every repeating pattern in your life — the relationships that collapse, the opportunities you self-destruct, the authority you cannot claim — is not a character flaw. It is an architecture. And architectures can be redesigned.',
    footnote: 'The distinction between "character flaw" and "behavioral architecture" is the foundational reframe of the Pattern Recognition Institute. This is not self-help optimism — it is diagnostic precision.',
    span: 'md:col-span-2',
  },
  {
    id: 'sovereignty',
    title: 'On Radical Self-Sovereignty',
    text: 'Self-sovereignty is not independence. It is not isolation or hyper-individualism. It is the capacity to witness your own patterns without being controlled by them. The sovereign self does not eliminate the shadow — the sovereign self negotiates with it from a position of awareness, not reaction.',
    footnote: 'In Vedic philosophy, this is svatantrya — the freedom that comes from self-knowledge, not self-denial.',
    span: '',
  },
  {
    id: 'nervous',
    title: 'The Nervous System Is the First Territory',
    text: 'Before you can change any pattern, you must regulate the nervous system that runs it. Your intellect cannot override your biology. The amygdala responds in 200 milliseconds; conscious thought takes 600. The pattern always wins the first 400ms. Regulation is not optional — it is the prerequisite for all transformation.',
    footnote: 'This is why the Breath Pacer exists. This is why every diagnostic begins with nervous system stabilization before cognitive restructuring.',
    span: '',
  },
  {
    id: 'diagnosis',
    title: 'Diagnosis Is Not Destiny',
    text: 'When a pattern is named, it does not disappear. It becomes visible. Visibility is not the same as freedom — but it is the prerequisite. You cannot leave a prison you cannot see. The moment of recognition is not the end of the work. It is the beginning of choice.',
    footnote: 'Many clients experience a "recognition high" after their first session — the relief of being seen. This is real but incomplete. The pattern will reassert itself. The question is whether you will see it coming next time.',
    span: 'md:col-span-2',
  },
  {
    id: 'warrior',
    title: 'The Warrior Does Not Bypass',
    text: 'The warrior archetype in the Kalki Framework is not a metaphor for aggression. It is the principle of conscious engagement with difficulty. The warrior does not bypass the dark — the warrior enters it with awareness, with breath, with the specific tools of pattern override. Bypass is the enemy. Engagement is the method.',
    span: '',
  },
  {
    id: 'dharma',
    title: 'Dharma Is Not Duty',
    text: 'Dharma is not what you should do. It is what you are built to do when the karmic overlay is removed. Your dharma is not a burden — it is the trajectory your life takes when it is no longer driven by unconscious repetition. Dharma is what remains when the pattern is seen through.',
    footnote: 'The Sanskrit root dhr means "to hold" or "to sustain." Your dharma is what sustains you — not what depletes you.',
    span: '',
  },
];

function ScrambleText({ text, isVisible }: { text: string; isVisible: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = '█▓░╫╬╪§¶†‡';

  useEffect(() => {
    if (!isVisible) {
      setDisplayText(text.split('').map(c => c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]).join(''));
      return;
    }

    let revealed = 0;
    const interval = setInterval(() => {
      revealed += 3;
      setDisplayText(
        text.split('').map((c, i) => {
          if (i < revealed) return c;
          if (c === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (revealed >= text.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [isVisible, text]);

  return <span>{displayText}</span>;
}

export default function ManifestoCodex() {
  const [hoveredFootnote, setHoveredFootnote] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="bg-[#080808] py-14 md:py-20 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] mb-3">
            The Codex
          </p>
          <h2 className="font-[var(--font-cormorant)] text-2xl md:text-4xl font-bold tracking-[-0.02em] text-[#f5f3f0]">
            The Radical Self-Sovereignty <span className="italic font-light">Manifesto</span>
          </h2>
          <p className="mt-2 text-xs text-[#8a8078] font-[var(--font-inter)] font-light max-w-md mx-auto">
            Foundational essays of the Pattern Recognition Institute. Text unscrambles as you scroll. Hover for clinical footnotes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {CODEX_ENTRIES.map(entry => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className={`border border-white/[0.04] p-5 md:p-6 hover:border-[#c9a96e]/10 transition-colors duration-500 ${entry.span}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1 h-1 bg-[#c9a96e]/30 rounded-full" />
                <h3 className="font-[var(--font-cormorant)] text-lg md:text-xl text-[#f5f3f0] font-bold">
                  {entry.title}
                </h3>
                {entry.footnote && (
                  <button
                    onMouseEnter={() => setHoveredFootnote(entry.id)}
                    onMouseLeave={() => setHoveredFootnote(null)}
                    className="text-[8px] text-[#c9a96e]/30 hover:text-[#c9a96e]/60 transition-colors duration-300 font-[var(--font-inter)] ml-auto"
                    aria-label={`Show clinical footnote for ${entry.title}`}
                  >
                    [†]
                  </button>
                )}
              </div>
              <p className="text-[11px] text-[#f5f3f0]/60 font-[var(--font-inter)] font-light leading-[1.7]">
                <ScrambleText text={entry.text} isVisible={isInView} />
              </p>

              {/* Footnote */}
              {entry.footnote && hoveredFootnote === entry.id && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 pt-3 border-t border-[#c9a96e]/10"
                >
                  <span className="text-[8px] tracking-[0.1em] uppercase text-[#c9a96e]/40 font-[var(--font-inter)] block mb-1">Clinical Footnote</span>
                  <p className="text-[10px] text-[#c9a96e]/50 font-[var(--font-inter)] font-light leading-relaxed italic">
                    {entry.footnote}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
