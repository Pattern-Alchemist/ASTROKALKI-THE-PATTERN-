'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * PatternBiography (Phase 3 · Personal Intelligence)
 *
 * Upgrade from Pattern Story. Chapter-based, more literary.
 *
 * Instead of "Beginning / Middle / Recent / The Thread" segments,
 * generates chapters:
 *
 *   Chapter 1: [Date Range] — [Theme]
 *   "Every relationship after 2021 began with rescuing someone emotionally."
 *
 * Each chapter covers ~30 days. Theme = dominant pattern + shift.
 * The signature output of the entire system.
 */

interface DayData {
  date: string;
  pattern?: string;
  climate?: string;
  voice?: string;
  reflection?: string;
  mirrorCount?: number;
  resetCount?: number;
}

const STORAGE_KEYS = {
  dailyPattern: 'astrokalki-daily-pattern',
  patternClimate: 'astrokalki-pattern-climate',
  innerVoices: 'astrokalki-inner-voices',
  dailyReflection: 'astrokalki-daily-reflection',
  mirror: 'astrokalki-mirror',
  reset: 'astrokalki-reset-log',
  loopPrefix: 'astrokalki-loop-',
};

const PATTERN_LABELS: Record<string, string> = {
  'people-pleasing': 'People Pleasing',
  'avoidance': 'Avoidance',
  'overworking': 'Overworking',
  'numbing': 'Numbing',
  'controlling': 'Controlling',
  'withdrawing': 'Withdrawing',
  'performing': 'Performing',
  'overthinking': 'Overthinking',
};

const VOICE_LABELS: Record<string, string> = {
  'critic': 'The Critic',
  'child': 'The Child',
  'achiever': 'The Achiever',
  'avoider': 'The Avoider',
  'performer': 'The Performer',
  'witness': 'The Witness',
};

// Chapter title templates — keyed by dominant pattern
const CHAPTER_TITLES: Record<string, string[]> = {
  'people-pleasing': [
    'Every yes was a smaller no to yourself.',
    'You earned love by over-functioning.',
    'The rescuer was running the week.',
  ],
  'avoidance': [
    'You sidestepped what mattered most.',
    'Avoidance wore the costume of self-care.',
    'The thing you avoided was the thing that needed you.',
  ],
  'overworking': [
    'Productivity became the avoidance strategy.',
    'You measured your worth in output.',
    'The work expanded to fill the unmet feeling.',
  ],
  'numbing': [
    'You went flat to survive the days.',
    'The numbness was protecting something.',
    'You checked out before the day could hurt you.',
  ],
  'controlling': [
    'You gripped too tight to feel safe.',
    'Control was the price of belonging.',
    'You managed everyone else to avoid being managed.',
  ],
  'withdrawing': [
    'You disappeared before being left.',
    'The silence was a strategy.',
    'You went quiet when it mattered most.',
  ],
  'performing': [
    'You wore a role and forgot who played it.',
    'The audience became the mirror.',
    'You performed yourself out of yourself.',
  ],
  'overthinking': [
    'You thought your way out of feeling.',
    'The loop was louder than the answer.',
    'You rehearsed a life you weren\'t living.',
  ],
};

interface Chapter {
  number: number;
  dateRange: string;
  title: string;
  body: string;
  highlight: boolean;
}

function getDominant(values: string[]): string | null {
  if (values.length === 0) return null;
  const counts: Record<string, number> = {};
  values.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function buildChapter(number: number, days: DayData[], allDays: DayData[]): Chapter | null {
  if (days.length < 3) return null;

  const startDate = days[0].date;
  const endDate = days[days.length - 1].date;
  const dateRange = `${new Date(startDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → ${new Date(endDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

  const patterns = days.map(d => d.pattern).filter(Boolean) as string[];
  const voices = days.map(d => d.voice).filter(Boolean) as string[];
  const reflections = days.filter(d => d.reflection).length;
  const mirrors = days.reduce((sum, d) => sum + (d.mirrorCount || 0), 0);
  const resets = days.reduce((sum, d) => sum + (d.resetCount || 0), 0);
  const witnessCount = voices.filter(v => v === 'witness').length;

  const dominantPattern = getDominant(patterns);
  const dominantVoice = getDominant(voices);

  // Title
  let title = 'A chapter without a clear theme yet.';
  if (dominantPattern && CHAPTER_TITLES[dominantPattern]) {
    const titles = CHAPTER_TITLES[dominantPattern];
    title = titles[(number - 1) % titles.length];
  }

  // Body — literary, not statistical
  const bodyParts: string[] = [];

  if (dominantPattern) {
    bodyParts.push(`${PATTERN_LABELS[dominantPattern] || 'A pattern'} showed up most often — ${patterns.length} day${patterns.length > 1 ? 's' : ''} of this chapter.`);
  }

  if (dominantVoice) {
    if (dominantVoice === 'witness') {
      bodyParts.push(`The Witness ran more than any other voice. That is not nothing — most people never meet the Witness at all.`);
    } else {
      bodyParts.push(`${VOICE_LABELS[dominantVoice]} ran those days, making the decisions you didn\'t remember deciding.`);
    }
  }

  if (witnessCount > 0 && dominantVoice !== 'witness') {
    bodyParts.push(`The Witness appeared ${witnessCount} time${witnessCount > 1 ? 's' : ''}. Each appearance was a moment you saw yourself while you were being yourself.`);
  }

  if (mirrors > 0) {
    bodyParts.push(`You faced the Mirror ${mirrors} time${mirrors > 1 ? 's' : ''}. Each time, a complaint became a clue.`);
  }

  if (resets > 0) {
    bodyParts.push(`You caught yourself ${resets} time${resets > 1 ? 's' : ''} and used the Reset. Those ${resets} moment${resets > 1 ? 's' : ''} were the practice — not the failure.`);
  }

  if (reflections > 0) {
    bodyParts.push(`${reflections} reflection${reflections > 1 ? 's' : ''} sealed. The questions did their work even when you didn\'t.`);
  }

  // Closing line — the through-line
  if (number === 1) {
    bodyParts.push(`This was the beginning. You were collecting evidence — even when it didn\'t feel like that\'s what you were doing.`);
  } else if (number === 2 || number === 3) {
    bodyParts.push(`The pattern was becoming visible. What was unconscious was starting to be named.`);
  } else {
    bodyParts.push(`The trajectory is real. You are not the same person who started logging.`);
  }

  return {
    number,
    dateRange,
    title,
    body: bodyParts.join(' '),
    highlight: witnessCount > 0 || dominantVoice === 'witness',
  };
}

export default function PatternBiography() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const merged: Record<string, DayData> = {};
    const addDay = (date: string) => {
      if (!merged[date]) merged[date] = { date };
      return merged[date];
    };

    try {
      const dpRaw = localStorage.getItem(STORAGE_KEYS.dailyPattern);
      if (dpRaw) JSON.parse(dpRaw).forEach((e: any) => { addDay(e.date).pattern = e.patternId; });

      const ivRaw = localStorage.getItem(STORAGE_KEYS.innerVoices);
      if (ivRaw) JSON.parse(ivRaw).forEach((e: any) => { addDay(e.date).voice = e.voiceId; });

      const pcRaw = localStorage.getItem(STORAGE_KEYS.patternClimate);
      if (pcRaw) JSON.parse(pcRaw).forEach((e: any) => { addDay(e.date).climate = e.climateId; });

      const drRaw = localStorage.getItem(STORAGE_KEYS.dailyReflection);
      if (drRaw) JSON.parse(drRaw).forEach((e: any) => { addDay(e.date).reflection = e.answer; });

      // Mirrors and resets — group by day
      const mRaw = localStorage.getItem(STORAGE_KEYS.mirror);
      if (mRaw) {
        JSON.parse(mRaw).forEach((e: any) => {
          const date = new Date(e.timestamp).toISOString().slice(0, 10);
          addDay(date).mirrorCount = (addDay(date).mirrorCount || 0) + 1;
        });
      }

      const rRaw = localStorage.getItem(STORAGE_KEYS.reset);
      if (rRaw) {
        JSON.parse(rRaw).forEach((e: any) => {
          const date = new Date(e.timestamp).toISOString().slice(0, 10);
          addDay(date).resetCount = (addDay(date).resetCount || 0) + 1;
        });
      }
    } catch {}

    const allDays = Object.values(merged).sort((a, b) => a.date.localeCompare(b.date));
    setTotalDays(allDays.length);

    // Group into ~30-day chapters
    if (allDays.length < 3) {
      setChapters([]);
      return;
    }

    const builtChapters: Chapter[] = [];
    const chapterSize = 30;
    let chapterNum = 1;
    for (let i = 0; i < allDays.length; i += chapterSize) {
      const slice = allDays.slice(i, i + chapterSize);
      const ch = buildChapter(chapterNum, slice, allDays);
      if (ch) {
        builtChapters.push(ch);
        chapterNum++;
      }
    }

    setChapters(builtChapters);
  }, []);

  if (totalDays < 3) {
    return (
      <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-[#c9a96e] rounded-full" />
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
            Phase 3 · The Signature Output
          </span>
        </div>
        <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Your Pattern Biography</p>
        <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
          The life manual you write by living. Auto-generated from every pattern you log.
        </p>
        <div className="p-6 border border-white/[0.04] bg-[#050505] text-center">
          <div className="text-[32px] mb-3 opacity-30">✦</div>
          <p className="text-[11px] text-[#8a8078]/60 font-[var(--font-cormorant)] italic max-w-xs mx-auto leading-relaxed">
            Your biography begins after 3 days of logging.
            Use <span className="text-[#c9a96e]">Daily Pattern</span>, <span className="text-[#c9a96e]">Inner Voices</span>, or <span className="text-[#c9a96e]">Daily Reflection</span> to start.
          </p>
          <p className="text-[9px] text-[#8a8078]/40 font-[var(--font-inter)] mt-3">
            {totalDays} {totalDays === 1 ? 'day' : 'days'} logged so far
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e] rounded-full animate-pulse" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Phase 3 · The Signature Output
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Your Pattern Biography</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        {totalDays} days of evidence. The story isn&apos;t in any single day — it&apos;s in the trajectory. This is your life&apos;s operating manual, written as you live it.
      </p>

      {/* Chapters */}
      <div className="space-y-4">
        {chapters.map((ch, i) => (
          <motion.div
            key={ch.number}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`p-4 border ${ch.highlight ? 'border-[#c9a96e]/30 bg-[#c9a96e]/[0.03]' : 'border-white/[0.04] bg-[#050505]'}`}
          >
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[8px] tracking-[0.25em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">
                Chapter {ch.number}
              </span>
              <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)] italic">
                {ch.dateRange}
              </span>
            </div>
            <p className="font-[var(--font-cormorant)] text-base text-[#f5f3f0] italic font-bold leading-snug mb-2">
              "{ch.title}"
            </p>
            <p className="text-[10px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed">
              {ch.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Closing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: chapters.length * 0.15 + 0.3 }}
        className="mt-5 p-4 border border-[#c9a96e]/40 bg-[#c9a96e]/[0.05] text-center"
      >
        <p className="text-[10px] text-[#c9a96e]/80 font-[var(--font-cormorant)] italic leading-relaxed">
          The biography is not finished. It updates as you log. The next chapter is being written by what you do tomorrow.
        </p>
      </motion.div>

      <p className="mt-4 text-[8px] text-[#8a8078]/30 font-[var(--font-inter)] italic">
        Unlike a personality test, this is not a snapshot. It is a trajectory. Come back in 30 days.
      </p>
    </div>
  );
}
