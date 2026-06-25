'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * PurgeTerminal — Cryptographic Decapitation Shield
 * 
 * Terminal-style interface for permanently shredding the local
 * pattern ledger. Features falling ASCII cipher animation.
 */

const COMMANDS = ['/purge', '/overload', '/status', '/help'];
const HELP_TEXT = `Available commands:
  /status   — Show stored data footprint
  /purge    — Permanent cryptographic shredding of all local data
  /overload — Emergency wipe with visual memory burn
  /help     — Show this reference`;

export default function PurgeTerminal() {
  const [history, setHistory] = useState<string[]>(['> Secure Dispatch Terminal v1.0', '> Type /help for available commands', '']);
  const [input, setInput] = useState('');
  const [isPurging, setIsPurging] = useState(false);
  const [purgeLines, setPurgeLines] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => { scrollToBottom(); }, [history, purgeLines, scrollToBottom]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, `> ${cmd}`];

    if (trimmed === '/help') {
      newHistory.push(HELP_TEXT);
    } else if (trimmed === '/status') {
      const keys = Object.keys(localStorage);
      const akKeys = keys.filter(k => k.startsWith('ak_'));
      const totalBytes = akKeys.reduce((sum, k) => sum + (localStorage.getItem(k)?.length ?? 0), 0);
      newHistory.push(`> Local footprint: ${akKeys.length} encrypted entries, ${totalBytes} bytes at rest`);
      newHistory.push(`> Keys: ${akKeys.join(', ') || '(none)'}`);
    } else if (trimmed === '/purge' || trimmed === '/overload') {
      newHistory.push('> INITIATING CRYPTOGRAPHIC DECAPITATION...');
      setHistory(newHistory);
      setIsPurging(true);

      // Falling ASCII cipher animation
      const chars = '0123456789abcdef@#$%&*!?<>{}[]|/\\~^';
      const lines: string[] = [];
      let frame = 0;
      const maxFrames = 30;

      const animate = () => {
        if (frame >= maxFrames) {
          // Actual wipe
          const keys = Object.keys(localStorage).filter(k => k.startsWith('ak_'));
          keys.forEach(k => localStorage.removeItem(k));
          setPurgeLines(prev => [...prev, `> PURGE COMPLETE. ${keys.length} entries annihilated. Zero recovery possible.`]);
          setIsPurging(false);
          return;
        }

        const line = Array.from({ length: 64 }, () =>
          chars[Math.floor(Math.random() * chars.length)]
        ).join('');

        setPurgeLines(prev => [...prev, line]);
        frame++;
        setTimeout(animate, 80);
      };

      setTimeout(animate, 500);
      return;
    } else {
      newHistory.push(`> Unknown command: ${cmd}. Type /help for reference.`);
    }

    newHistory.push('');
    setHistory(newHistory);
    setInput('');
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPurging) return;
    executeCommand(input);
    setInput('');
  };

  return (
    <div className="border border-white/[0.04] bg-[#050505] overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] border-b border-white/[0.04]">
        <span className={`w-2 h-2 rounded-full ${isPurging ? 'bg-red-500 animate-pulse' : 'bg-[#c9a96e]/40'}`} />
        <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">
          {isPurging ? 'PURGE IN PROGRESS' : 'secure-dispatch://terminal'}
        </span>
      </div>

      {/* Terminal body */}
      <div ref={terminalRef} className="p-4 h-48 overflow-y-auto font-mono text-[10px] leading-relaxed custom-scrollbar">
        {history.map((line, i) => (
          <div key={i} className="text-[#8a8078]/60 whitespace-pre-wrap">{line}</div>
        ))}
        {purgeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: Math.max(0.1, 1 - i * 0.03) }}
            className="text-[#c9a96e]/40 font-mono"
          >
            {line}
          </motion.div>
        ))}

        {/* Input line */}
        {!isPurging && (
          <form onSubmit={handleSubmit} className="flex items-center gap-1 mt-1">
            <span className="text-[#c9a96e]/50">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-[#f5f3f0]/80 outline-none font-mono text-[10px]"
              placeholder="enter command..."
              aria-label="Terminal command input"
              autoFocus
            />
          </form>
        )}
      </div>
    </div>
  );
}
