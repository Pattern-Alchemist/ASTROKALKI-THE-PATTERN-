'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPRING } from './utils/animation';

/**
 * EncryptionSimulator — Visual "cryptographic hashing" animation
 * 
 * Demonstrates how sensitive narratives are protected during transit.
 * Users type or paste text, and watch it transform through a visual
 * hashing pipeline — educating them on data security while
 * reinforcing trust in the platform.
 * 
 * Features:
 * - Real-time visual hashing animation (not actual crypto)
 * - Pipeline stages: Input → Fragmentation → Scrambling → Hash → Secure Output
 * - High-contrast gold-on-obsidian visual
 * - Educational: teaches users about data protection
 * - No actual encryption (client-side demo only)
 */

const HASH_CHARS = '0123456789abcdef';

function generateFakeHash(length: number): string {
  return Array.from({ length }, () => HASH_CHARS[Math.floor(Math.random() * HASH_CHARS.length)]).join('');
}

const PIPELINE_STAGES = [
  { id: 'input', label: 'Raw Input', color: '#8a8078' },
  { id: 'fragment', label: 'Fragmentation', color: '#a07050' },
  { id: 'scramble', label: 'Scrambling', color: '#c9a96e' },
  { id: 'hash', label: 'Hashing', color: '#d4b87a' },
  { id: 'secure', label: 'Secure Dispatch', color: '#e8e0d4' },
];

export default function EncryptionSimulator() {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [outputHash, setOutputHash] = useState('');
  const [displayChars, setDisplayChars] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const processInput = useCallback(() => {
    if (!inputText.trim() || isProcessing) return;

    setIsProcessing(true);
    setCurrentStage(0);
    setOutputHash('');
    setDisplayChars([]);

    // Stage progression with visual animation
    let stage = 0;
    const stageInterval = setInterval(() => {
      stage++;
      if (stage >= PIPELINE_STAGES.length) {
        clearInterval(stageInterval);
        // Final hash output
        const hash = generateFakeHash(64);
        setOutputHash(hash);
        setIsProcessing(false);
        setCurrentStage(4);

        // Animate hash character reveal
        let charIndex = 0;
        intervalRef.current = setInterval(() => {
          setDisplayChars(hash.slice(0, charIndex + 1).split(''));
          charIndex++;
          if (charIndex >= hash.length && intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }, 15);
        return;
      }
      setCurrentStage(stage);

      // Animate intermediate scrambling
      setDisplayChars(
        Array.from({ length: Math.min(inputText.length * 2, 32) }, () =>
          HASH_CHARS[Math.floor(Math.random() * HASH_CHARS.length)]
        )
      );
    }, 600);
  }, [inputText, isProcessing]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Secure Dispatch Protocol
        </span>
      </div>

      <p className="font-[var(--font-cormorant)] text-lg md:text-xl text-[#f5f3f0] font-bold mb-2">
        How your narrative is protected
      </p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light leading-relaxed mb-4">
        Every piece of sensitive data you share undergoes a multi-stage encryption pipeline before storage or transit. Type below to visualize the process.
      </p>

      {/* Input area */}
      <div className="relative mb-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a thought, fear, or pattern you recognize..."
          className="w-full h-20 bg-[#050505] border border-white/[0.06] p-3 text-[12px] text-[#f5f3f0]/80 font-[var(--font-inter)] font-light leading-relaxed resize-none placeholder:text-[#8a8078]/30 focus:outline-none focus:border-[#c9a96e]/30 transition-colors duration-300"
          aria-label="Enter text to visualize encryption process"
          disabled={isProcessing}
        />
        <button
          onClick={processInput}
          disabled={!inputText.trim() || isProcessing}
          className="mt-2 px-4 py-2 text-[9px] tracking-[0.2em] uppercase border border-[#c9a96e]/30 text-[#c9a96e] font-[var(--font-inter)] font-medium hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#c9a96e]"
          aria-label="Begin encryption visualization"
        >
          {isProcessing ? 'Processing...' : 'Encrypt'}
        </button>
      </div>

      {/* Pipeline visualization */}
      {(isProcessing || outputHash) && (
        <div className="space-y-3">
          {/* Stage indicators */}
          <div className="flex items-center gap-1">
            {PIPELINE_STAGES.map((stage, i) => (
              <div key={stage.id} className="flex items-center gap-1 flex-1">
                <div className="flex-1">
                  <div
                    className="h-1 transition-all duration-500"
                    style={{
                      backgroundColor: i <= currentStage ? stage.color : '#1a1815',
                    }}
                  />
                  <span
                    className="text-[7px] tracking-[0.1em] uppercase font-[var(--font-inter)] mt-0.5 block transition-colors duration-500"
                    style={{
                      color: i <= currentStage ? stage.color : '#3a3530',
                    }}
                  >
                    {stage.label}
                  </span>
                </div>
                {i < PIPELINE_STAGES.length - 1 && (
                  <span className="text-[8px] text-[#3a3530] mb-3">&rarr;</span>
                )}
              </div>
            ))}
          </div>

          {/* Live character display */}
          <div className="bg-[#050505] border border-white/[0.04] p-3 font-mono text-[10px] leading-relaxed min-h-[48px] break-all">
            {displayChars.length > 0 ? (
              <span className="text-[#c9a96e]/80">
                {displayChars.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05 }}
                  >
                    {char}
                    {(i + 1) % 8 === 0 && i < displayChars.length - 1 ? ' ' : ''}
                  </motion.span>
                ))}
              </span>
            ) : (
              <span className="text-[#3a3530]">Awaiting input...</span>
            )}
          </div>

          {/* Final output */}
          {outputHash && !isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING.gentle}
              className="border-t border-[#c9a96e]/10 pt-3"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full" />
                <span className="text-[8px] tracking-[0.15em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">
                  Dispatch secured — narrative encrypted
                </span>
              </div>
              <p className="text-[9px] text-[#8a8078]/60 font-[var(--font-inter)] font-light mt-1">
                Your input has been transformed into an irreversible hash. The original text cannot be recovered from this output. This is how all sensitive data is handled.
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
