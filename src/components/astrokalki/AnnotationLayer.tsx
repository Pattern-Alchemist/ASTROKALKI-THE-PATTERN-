'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPRING } from './utils/animation';

/**
 * AnnotationLayer — Intratextual Research Annotation System
 * 
 * Wraps text content and makes key clinical/psychological terms
 * interactive. Clicking a term reveals a micro-card with:
 * - Definition
 * - Clinical context
 * - Diagnostic recommendation
 * 
 * This creates a "research layer" over the DangerousKnowledge
 * section, deepening engagement without disrupting reading flow.
 */

export interface AnnotationTerm {
  term: string;
  definition: string;
  context: string;
  recommendation: string;
  category: 'shadow' | 'vedic' | 'attachment' | 'neuroscience' | 'dharma';
}

const ANNOTATION_DB: AnnotationTerm[] = [
  {
    term: 'karmic architecture',
    definition: 'The structural pattern of repeating behavioral loops inherited through familial and cultural conditioning, mapped through Vedic cognitive frameworks.',
    context: 'In Vedic psychology, karma is not fate — it is unconscious momentum. Your karmic architecture is the blueprint of what you came here to repeat.',
    recommendation: 'Stage 1 — Recognition: Begin with a Pattern Snapshot to identify your primary karmic loop.',
    category: 'vedic',
  },
  {
    term: 'shadow work',
    definition: 'The process of confronting and integrating disowned aspects of the psyche — the parts of yourself you have rejected, suppressed, or projected onto others.',
    context: 'Originating in Jungian depth psychology, shadow work reveals that what you cannot face in yourself, you will meet as fate.',
    recommendation: 'Stage 2 — Diagnosis: The Deep Dive includes rigorous shadow confrontation.',
    category: 'shadow',
  },
  {
    term: 'intermittent reinforcement',
    definition: 'A behavioral conditioning pattern where rewards are delivered unpredictably, creating the strongest possible psychological attachment — the same mechanism that drives gambling addiction.',
    context: 'This is the neurochemical engine behind trauma bonds. Unpredictable affection creates stronger attachment than consistent love.',
    recommendation: 'Pattern Recognition: Identify if your relationship follows this reinforcement schedule.',
    category: 'neuroscience',
  },
  {
    term: 'spiritual bypassing',
    definition: 'Using spiritual beliefs, practices, or language to avoid confronting unresolved emotional wounds, psychological pain, or developmental needs.',
    context: 'Coined by John Welwood in 1984. Telling a traumatized person they "attracted" their abuse is not spirituality — it is avoidance weaponized.',
    recommendation: 'Assessment: Take the Pattern Index to check for bypassing patterns in your own narrative.',
    category: 'attachment',
  },
  {
    term: 'dharma',
    definition: 'Your authentic path of right action — the life trajectory that aligns with your deepest truth rather than your conditioned patterns.',
    context: 'In Vedic philosophy, dharma is not duty. It is the alignment of action with essential nature. When you are off-dharma, stagnation is the signal.',
    recommendation: 'Stage 3 — Realignment: Dharma Navigation maps your authentic path through Vedic-Jungian analysis.',
    category: 'dharma',
  },
  {
    term: 'trauma bond',
    definition: 'A deep emotional attachment formed through cycles of abuse and reconciliation, where the victim becomes chemically dependent on the abuser\'s intermittent approval.',
    context: 'Trauma bonds are not love — they are addiction. The neurochemistry mirrors substance dependency: cortisol spikes during threat, dopamine floods during relief.',
    recommendation: 'Stage 1 — Recognition: Pattern Snapshot identifies trauma bond architecture.',
    category: 'attachment',
  },
  {
    term: 'nervous system trigger',
    definition: 'A sensory stimulus that activates an autonomic survival response (fight/flight/freeze/fawn) before conscious awareness can intervene.',
    context: 'Your intellect cannot override your nervous system. When triggered, the body responds in approximately 200 milliseconds — far faster than rational thought.',
    recommendation: 'Diagnostic: The Deep Dive maps your specific trigger architecture and override protocols.',
    category: 'neuroscience',
  },
  {
    term: 'attachment theory',
    definition: 'A psychological framework describing how early caregiver relationships create lifelong patterns of bonding, trust, and emotional regulation.',
    context: 'Your attachment style — secure, anxious, avoidant, or disorganized — determines how you connect with every significant person in your life.',
    recommendation: 'Assessment: The Pattern Index includes attachment pattern identification.',
    category: 'attachment',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  shadow: '#c9a96e',
  vedic: '#d4a574',
  attachment: '#b8977e',
  neuroscience: '#a89080',
  dharma: '#c9a96e',
};

const CATEGORY_LABELS: Record<string, string> = {
  shadow: 'Shadow Psychology',
  vedic: 'Vedic Framework',
  attachment: 'Attachment Theory',
  neuroscience: 'Neuroscience',
  dharma: 'Dharma Science',
};

interface AnnotationLayerProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnnotationLayer({ children, className = '' }: AnnotationLayerProps) {
  const [activeAnnotation, setActiveAnnotation] = useState<AnnotationTerm | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAnnotatedClick = useCallback((term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const annotation = ANNOTATION_DB.find(a => a.term.toLowerCase() === term.toLowerCase());
    if (!annotation) return;

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    setPopupPos({
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top - 8,
    });
    setActiveAnnotation(annotation);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!activeAnnotation) return;
    const handler = () => setActiveAnnotation(null);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [activeAnnotation]);

  // Process children to wrap annotated terms
  const processContent = (content: React.ReactNode): React.ReactNode => {
    if (typeof content !== 'string') return content;

    let result: React.ReactNode[] = [content];
    
    ANNOTATION_DB.forEach(annotation => {
      const newResult: React.ReactNode[] = [];
      result.forEach(part => {
        if (typeof part !== 'string') {
          newResult.push(part);
          return;
        }
        const regex = new RegExp(`(${annotation.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const segments = part.split(regex);
        segments.forEach((segment, i) => {
          if (segment.toLowerCase() === annotation.term.toLowerCase()) {
            newResult.push(
              <button
                key={`${annotation.term}-${i}`}
                onClick={(e) => handleAnnotatedClick(annotation.term, e)}
                className="text-[#c9a96e] border-b border-[#c9a96e]/30 hover:border-[#c9a96e] hover:text-[#d4b87a] transition-all duration-300 cursor-pointer bg-transparent border-t-0 border-l-0 border-r-0 p-0 m-0 font-[inherit] text-[inherit] leading-[inherit]"
                aria-label={`Learn more about: ${annotation.term}`}
                style={{ font: 'inherit' }}
              >
                {segment}
              </button>
            );
          } else {
            newResult.push(segment);
          }
        });
      });
      result = newResult;
    });

    return result;
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {processContent(children)}
      
      <AnimatePresence>
        {activeAnnotation && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={SPRING.snappy}
            className="absolute z-50 w-72 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.08] p-4 pointer-events-auto"
            style={{
              left: popupPos.x - 144,
              bottom: `calc(100% - ${popupPos.y}px + 16px)`,
              maxWidth: 'min(288px, calc(100vw - 16px))',
            }}
            onClick={(e) => e.stopPropagation()}
            role="tooltip"
            aria-label={`Annotation: ${activeAnnotation.term}`}
          >
            {/* Category badge */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[activeAnnotation.category] }}
              />
              <span className="text-[8px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium"
                style={{ color: CATEGORY_COLORS[activeAnnotation.category] }}>
                {CATEGORY_LABELS[activeAnnotation.category]}
              </span>
            </div>

            {/* Term */}
            <h4 className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1.5">
              {activeAnnotation.term}
            </h4>

            {/* Definition */}
            <p className="text-[11px] text-[#f5f3f0]/80 font-[var(--font-inter)] font-light leading-relaxed mb-2">
              {activeAnnotation.definition}
            </p>

            {/* Context */}
            <div className="border-t border-white/[0.04] pt-2 mb-2">
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/60 font-[var(--font-inter)] block mb-1">
                Clinical Context
              </span>
              <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed italic">
                {activeAnnotation.context}
              </p>
            </div>

            {/* Recommendation */}
            <div className="border-t border-[#c9a96e]/10 pt-2">
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)] block mb-1">
                Diagnostic Recommendation
              </span>
              <p className="text-[10px] text-[#c9a96e]/80 font-[var(--font-inter)] font-medium">
                {activeAnnotation.recommendation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
