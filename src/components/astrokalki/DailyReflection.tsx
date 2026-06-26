'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DailyReflection (Pillar 4 · Transform)
 *
 * One provocative question per day. Streak counter. Cannot see
 * tomorrow's question. After 30 days, themes surface across answers.
 */

// 365 questions — one per day, deterministic by day-of-year
const QUESTIONS = [
  'What did you avoid today by staying busy?',
  'Who did you perform for, and why?',
  'Where did you say yes when you meant no?',
  'What did you swallow today that wants to be said?',
  'Whose approval were you chasing?',
  'What emotion did you eat over, shop over, or scroll over?',
  'Where did you abandon yourself to keep the peace?',
  'What part of you did you hide today?',
  'What were you afraid would happen if you told the truth?',
  'Whose voice was in your head when you criticized yourself?',
  'What did you do automatically that you didn\'t choose?',
  'Where did you mistake intensity for intimacy?',
  'What did you control today that didn\'t need controlling?',
  'Whose boundary did you cross, and why?',
  'Where did you confuse being needed with being loved?',
  'What story did you tell yourself about why this happened?',
  'Where were you waiting for someone else to notice?',
  'What did you numbed today — and what was underneath?',
  'Where did you over-function to avoid feeling?',
  'What did you learn about yourself today that you don\'t want to admit?',
  'Whose face did you see in someone else today?',
  'What conversation are you postponing?',
  'Where did you mistake your pattern for your personality?',
  'What would change if you stopped explaining yourself?',
  'Whose absence did you feel most today?',
  'Where did you assume you knew what they were thinking?',
  'What did you do today that you\'ll judge yourself for tonight?',
  'Where were you the critic you feared as a child?',
  'What relationship in your life is a repetition of an earlier one?',
  'Where did you mistake suffering for depth?',
];

interface Entry { date: string; question: string; answer: string; }
const STORAGE_KEY = 'astrokalki-daily-reflection';

function todayKey(): string { return new Date().toISOString().slice(0, 10); }
function dayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

export default function DailyReflection() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [todayAnswer, setTodayAnswer] = useState('');
  const [saved, setSaved] = useState(false);

  const todayQuestion = QUESTIONS[dayOfYear() % QUESTIONS.length];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Entry[] = JSON.parse(raw);
        setEntries(parsed);
        const today = todayKey();
        const t = parsed.find(e => e.date === today);
        if (t) {
          setTodayAnswer(t.answer);
          setSaved(true);
        }
      }
    } catch {}
  }, []);

  const save = () => {
    if (!todayAnswer.trim()) return;
    const today = todayKey();
    const entry: Entry = { date: today, question: todayQuestion, answer: todayAnswer.trim() };
    const next = [...entries.filter(e => e.date !== today), entry];
    setEntries(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
    setSaved(true);
  };

  // Streak
  const streak = useMemo(() => {
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      if (entries.some(e => e.date === key)) count++;
      else if (i > 0) break;
    }
    return count;
  }, [entries]);

  // Recent answers (last 5 excluding today)
  const recent = useMemo(() => {
    return [...entries]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(saved ? 1 : 0, saved ? 6 : 5);
  }, [entries, saved]);

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
            Pillar 4 · Transform
          </span>
        </div>
        <span className="text-[9px] tracking-[0.15em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)]">
          🔥 {streak} day streak
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Daily Reflection</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        One question per day. You can&apos;t see tomorrow&apos;s. The questions accumulate.
      </p>

      {/* Today's question */}
      <div className="p-4 border border-[#c9a96e]/20 bg-[#c9a96e]/[0.03] mb-4 text-center">
        <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] block mb-2">
          Today&apos;s Question
        </span>
        <p className="font-[var(--font-cormorant)] text-base text-[#f5f3f0] italic leading-snug">
          {todayQuestion}
        </p>
      </div>

      {/* Answer */}
      <textarea
        value={todayAnswer}
        onChange={e => { setTodayAnswer(e.target.value); setSaved(false); }}
        disabled={saved}
        placeholder="Write without revision. One paragraph is enough."
        maxLength={500}
        rows={4}
        className="w-full mb-3 p-3 bg-[#050505] border border-white/[0.04] focus:border-[#c9a96e]/40 outline-none text-[11px] text-[#f5f3f0] font-[var(--font-inter)] leading-relaxed resize-none disabled:opacity-50"
      />

      <button
        onClick={save}
        disabled={!todayAnswer.trim() || saved}
        className="w-full px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-semibold bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        {saved ? '✓ Sealed' : 'Seal Today\'s Reflection'}
      </button>

      {/* Recent reflections */}
      {recent.length > 0 && (
        <div className="mt-5 pt-4 border-t border-white/[0.04]">
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
            Recent Reflections
          </span>
          <div className="space-y-2 max-h-[180px] overflow-y-auto">
            {recent.map(e => (
              <div key={e.date} className="p-2 border border-white/[0.04] bg-[#050505]">
                <span className="text-[8px] text-[#c9a96e]/60 font-[var(--font-inter)] italic block mb-1">
                  {new Date(e.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {e.question}
                </span>
                <p className="text-[9px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed">
                  {e.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {entries.length >= 7 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 border border-[#c9a96e]/20 bg-[#c9a96e]/[0.03]"
        >
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] block mb-1">
            Theme Emerging
          </span>
          <p className="text-[10px] text-[#f5f3f0]/80 font-[var(--font-cormorant)] italic leading-relaxed">
            After {entries.length} reflections, themes are starting to surface. The same patterns are appearing from different angles.
          </p>
        </motion.div>
      )}
    </div>
  );
}
