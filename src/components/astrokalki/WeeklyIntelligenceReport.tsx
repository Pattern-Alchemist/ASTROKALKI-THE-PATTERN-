'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * WeeklyIntelligenceReport (Pillar 4 · Transform)
 *
 * Every Sunday (or any day the user opens it after 7 days of data),
 * generates a narrative summary: dominant pattern, biggest trigger,
 * strongest emotional shift, most common relationship dynamic,
 * one actionable recommendation, one question to reflect on.
 *
 * Reads from all other Pattern Intelligence System features.
 */

const STORAGE_KEYS = {
  dailyPattern: 'astrokalki-daily-pattern',
  patternClimate: 'astrokalki-pattern-climate',
  innerVoices: 'astrokalki-inner-voices',
  dailyReflection: 'astrokalki-daily-reflection',
  loopPrefix: 'astrokalki-loop-',
  reset: 'astrokalki-reset-log',
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

interface Report {
  weekRange: { start: string; end: string };
  dominantPattern: { label: string; count: number; pct: number } | null;
  dominantVoice: { label: string; count: number; pct: number } | null;
  witnessCount: number;
  resetsCount: number;
  reflectionsCount: number;
  loopBehavior: string | null;
  loopCount: number;
  topLoopTrigger: string | null;
  narrative: string[];
  recommendation: string;
  reflectionQuestion: string;
}

function getDominantWithPct(values: string[], labels: Record<string, string>): { label: string; count: number; pct: number } | null {
  if (values.length === 0) return null;
  const counts: Record<string, number> = {};
  values.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return null;
  const [id, count] = sorted[0];
  return {
    label: labels[id] || id,
    count,
    pct: Math.round((count / values.length) * 100),
  };
}

const REFLECTION_QUESTIONS = [
  'If this week\'s pattern were trying to teach you something, what would it be?',
  'What would change if you stopped apologizing for what you actually need?',
  'Whose voice becomes yours when you criticize yourself?',
  'What are you afraid would happen if you let the Witness run your week?',
  'Where did this week\'s pattern first show up in your life?',
  'What would soften in you if you stopped performing for one day?',
  'What is the pattern protecting you from feeling?',
];

const RECOMMENDATIONS: Record<string, string> = {
  'people-pleasing': 'Practice one small "no" per day this week. Don\'t explain it. Notice what happens.',
  'avoidance': 'Pick the one conversation you\'re avoiding. Schedule it. Don\'t rehearse it.',
  'overworking': 'Stop working at a fixed hour for 5 days. The work will expand to fill the time you give it.',
  'numbing': 'Replace one numbing behavior with 90 seconds of breath. Same trigger, different response.',
  'controlling': 'Identify one thing you\'re gripping. Release it for a week. Watch what happens.',
  'withdrawing': 'Reach out to one person you\'ve gone quiet on. No agenda. Just contact.',
  'performing': 'Spend one hour this week with no audience. No posting, no sharing. Just you.',
  'overthinking': 'When the loop starts, write 3 sentences. Then close the document.',
};

export default function WeeklyIntelligenceReport() {
  const [report, setReport] = useState<Report | null>(null);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  useEffect(() => {
    try {
      const last = localStorage.getItem('astrokalki-weekly-report-last');
      if (last) setLastGenerated(last);
    } catch {}
  }, []);

  const generate = () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 86400000);
    const weekStartStr = weekAgo.toISOString().slice(0, 10);
    const weekEndStr = now.toISOString().slice(0, 10);

    // Collect this week's data
    const weeklyPatterns: string[] = [];
    const weeklyVoices: string[] = [];
    const weeklyClimates: string[] = [];
    let weeklyReflections = 0;
    let weeklyResets = 0;
    let loopBehavior: string | null = null;
    let loopLogs: { timestamp: number; trigger: string }[] = [];

    try {
      const dpRaw = localStorage.getItem(STORAGE_KEYS.dailyPattern);
      if (dpRaw) {
        JSON.parse(dpRaw).forEach((e: any) => {
          if (e.date >= weekStartStr && e.date <= weekEndStr) weeklyPatterns.push(e.patternId);
        });
      }

      const ivRaw = localStorage.getItem(STORAGE_KEYS.innerVoices);
      if (ivRaw) {
        JSON.parse(ivRaw).forEach((e: any) => {
          if (e.date >= weekStartStr && e.date <= weekEndStr) weeklyVoices.push(e.voiceId);
        });
      }

      const pcRaw = localStorage.getItem(STORAGE_KEYS.patternClimate);
      if (pcRaw) {
        JSON.parse(pcRaw).forEach((e: any) => {
          if (e.date >= weekStartStr && e.date <= weekEndStr) weeklyClimates.push(e.climateId);
        });
      }

      const drRaw = localStorage.getItem(STORAGE_KEYS.dailyReflection);
      if (drRaw) {
        JSON.parse(drRaw).forEach((e: any) => {
          if (e.date >= weekStartStr && e.date <= weekEndStr) weeklyReflections++;
        });
      }

      const resetRaw = localStorage.getItem(STORAGE_KEYS.reset);
      if (resetRaw) {
        JSON.parse(resetRaw).forEach((e: any) => {
          if (e.timestamp >= weekAgo.getTime()) weeklyResets++;
        });
      }

      const activeLoop = localStorage.getItem('astrokalki-loop-active');
      if (activeLoop) {
        const loopKey = STORAGE_KEYS.loopPrefix + activeLoop.toLowerCase().replace(/\s+/g, '-');
        const loopRaw = localStorage.getItem(loopKey);
        if (loopRaw) {
          loopBehavior = activeLoop;
          loopLogs = JSON.parse(loopRaw).filter((l: any) => l.timestamp >= weekAgo.getTime());
        }
      }
    } catch {}

    // If no data at all
    if (weeklyPatterns.length === 0 && weeklyVoices.length === 0 && weeklyReflections === 0 && loopLogs.length === 0) {
      setReport(null);
      return;
    }

    const dominantPattern = getDominantWithPct(weeklyPatterns, PATTERN_LABELS);
    const dominantVoice = getDominantWithPct(weeklyVoices, VOICE_LABELS);
    const witnessCount = weeklyVoices.filter(v => v === 'witness').length;

    // Top loop trigger
    let topLoopTrigger: string | null = null;
    if (loopLogs.length > 0) {
      const triggerCounts: Record<string, number> = {};
      loopLogs.forEach(l => { triggerCounts[l.trigger] = (triggerCounts[l.trigger] || 0) + 1; });
      topLoopTrigger = Object.entries(triggerCounts).sort((a, b) => b[1] - a[1])[0][0];
    }

    // Build narrative
    const narrative: string[] = [];
    if (dominantPattern) {
      narrative.push(`Your dominant pattern this week was ${dominantPattern.label} — logged ${dominantPattern.count} time${dominantPattern.count > 1 ? 's' : ''} (${dominantPattern.pct}% of your entries).`);
    }
    if (dominantVoice) {
      narrative.push(`${dominantVoice.label} ran your week, showing up ${dominantVoice.count} day${dominantVoice.count > 1 ? 's' : ''}. ${witnessCount > 0 ? `The Witness appeared ${witnessCount} time${witnessCount > 1 ? 's' : ''}.` : 'The Witness didn\'t show up this week.'}`);
    }
    if (loopBehavior && loopLogs.length > 0) {
      narrative.push(`You logged ${loopBehavior} ${loopLogs.length} time${loopLogs.length > 1 ? 's' : ''}${topLoopTrigger ? `, most often triggered by ${topLoopTrigger}` : ''}.`);
    }
    if (weeklyResets > 0) {
      narrative.push(`You used the Reset tool ${weeklyResets} time${weeklyResets > 1 ? 's' : ''} — meaning you caught yourself ${weeklyResets > 1 ? 'those times' : 'that time'} before the reaction ran you.`);
    }
    if (weeklyReflections > 0) {
      narrative.push(`${weeklyReflections} reflection${weeklyReflections > 1 ? 's' : ''} sealed. The questions are doing their work.`);
    }

    // Recommendation
    const recommendation = dominantPattern
      ? RECOMMENDATIONS[Object.keys(PATTERN_LABELS).find(k => PATTERN_LABELS[k] === dominantPattern.label) || ''] || 'Keep logging. The pattern is revealing itself.'
      : 'Log a few days this week. The pattern needs data to reveal itself.';

    // Reflection question
    const reflectionQuestion = REFLECTION_QUESTIONS[Math.floor(Math.random() * REFLECTION_QUESTIONS.length)];

    setReport({
      weekRange: { start: weekStartStr, end: weekEndStr },
      dominantPattern,
      dominantVoice,
      witnessCount,
      resetsCount: weeklyResets,
      reflectionsCount: weeklyReflections,
      loopBehavior,
      loopCount: loopLogs.length,
      topLoopTrigger,
      narrative,
      recommendation,
      reflectionQuestion,
    });

    const nowStr = now.toISOString();
    try { localStorage.setItem('astrokalki-weekly-report-last', nowStr); } catch {}
    setLastGenerated(nowStr);
  };

  const hasAnyData = useMemo(() => {
    // Quick check if any pattern data exists
    try {
      return ['dailyPattern', 'patternClimate', 'innerVoices', 'dailyReflection'].some(key =>
        localStorage.getItem(STORAGE_KEYS[key as keyof typeof STORAGE_KEYS])
      );
    } catch { return false; }
  }, []);

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Pillar 4 · Transform
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Weekly Intelligence Report</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Your week in patterns. Generate it anytime — best read on Sunday mornings.
      </p>

      {!report && (
        <div className="text-center py-6">
          <div className="text-[32px] mb-3 opacity-30">✦</div>
          <p className="text-[11px] text-[#8a8078]/60 font-[var(--font-cormorant)] italic max-w-xs mx-auto leading-relaxed mb-4">
            {hasAnyData
              ? 'Generate your weekly report. It reads from every pattern you\'ve logged in the last 7 days.'
              : 'No pattern data yet. Start with Daily Pattern, Inner Voices, or Daily Reflection — your report generates from there.'}
          </p>
          <button
            onClick={generate}
            disabled={!hasAnyData}
            className="px-6 py-2.5 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-semibold bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Generate Report
          </button>
        </div>
      )}

      {report && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Header */}
          <div className="p-3 border border-[#c9a96e]/30 bg-[#c9a96e]/[0.04] text-center">
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] block mb-1">
              Your Week in Patterns
            </span>
            <p className="text-[10px] text-[#8a8078]/70 font-[var(--font-inter)]">
              {report.weekRange.start} → {report.weekRange.end}
            </p>
          </div>

          {/* Narrative */}
          <div className="space-y-2">
            {report.narrative.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="text-[11px] text-[#f5f3f0]/80 font-[var(--font-cormorant)] italic leading-relaxed pl-3 border-l border-[#c9a96e]/30"
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-2 text-center pt-3 border-t border-white/[0.04]">
            <div>
              <p className="text-[14px] font-[var(--font-cormorant)] font-bold text-[#c9a96e] tabular-nums">{report.dominantPattern?.count || 0}</p>
              <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Patterns</p>
            </div>
            <div>
              <p className="text-[14px] font-[var(--font-cormorant)] font-bold text-[#c9a96e] tabular-nums">{report.dominantVoice?.count || 0}</p>
              <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Voices</p>
            </div>
            <div>
              <p className="text-[14px] font-[var(--font-cormorant)] font-bold text-[#c9a96e] tabular-nums">{report.reflectionsCount}</p>
              <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Reflections</p>
            </div>
            <div>
              <p className="text-[14px] font-[var(--font-cormorant)] font-bold text-[#c9a96e] tabular-nums">{report.resetsCount}</p>
              <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Resets</p>
            </div>
          </div>

          {/* Recommendation */}
          <div className="p-3 border border-[#7da87a]/30 bg-[#7da87a]/[0.03]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[14px] text-[#7da87a]">→</span>
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#7da87a]/70 font-[var(--font-inter)] font-medium">
                One Action This Week
              </span>
            </div>
            <p className="text-[10px] text-[#f5f3f0]/80 font-[var(--font-inter)] leading-relaxed">
              {report.recommendation}
            </p>
          </div>

          {/* Reflection question */}
          <div className="p-3 border border-[#c9a96e]/30 bg-[#c9a96e]/[0.03]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[14px] text-[#c9a96e]">?</span>
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">
                One Question to Sit With
              </span>
            </div>
            <p className="text-[11px] text-[#f5f3f0]/80 font-[var(--font-cormorant)] italic leading-relaxed">
              {report.reflectionQuestion}
            </p>
          </div>

          <button
            onClick={generate}
            className="w-full px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border border-white/[0.06] text-[#8a8078]/60 hover:text-[#8a8078] hover:border-white/[0.1] transition-all"
          >
            Regenerate
          </button>
        </motion.div>
      )}
    </div>
  );
}
