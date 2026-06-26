'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * ConsultationPreparation (Phase 3 · Personal Intelligence)
 *
 * Generates a downloadable brief from 30+ days of logged data.
 * Replaces the intake form with evidence. The visitor hands this
 * to the operator before the consultation.
 *
 * Output includes:
 *   - Pattern DNA snapshot
 *   - Dominant patterns last 30 days
 *   - Top triggers (from Loop Detector)
 *   - Recent Mirror insights (shadow work done)
 *   - Recent reflections summary
 *   - Questions for the operator
 */

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

const TRIGGER_LABELS: Record<string, string> = {
  'stress': 'Stress',
  'boredom': 'Boredom',
  'loneliness': 'Loneliness',
  'anger': 'Anger',
  'anxiety': 'Anxiety',
  'tiredness': 'Tiredness',
  'social': 'After social interaction',
  'work': 'After work',
  'night': 'Late night',
  'morning': 'Early morning',
};

interface BriefData {
  daysTracked: number;
  totalLogs: number;
  dominantPattern: { label: string; count: number } | null;
  dominantVoice: { label: string; count: number } | null;
  witnessCount: number;
  mirrorCount: number;
  resetCount: number;
  reflectionCount: number;
  loopBehavior: string | null;
  loopCount: number;
  topTriggers: { label: string; count: number }[];
  recentMirrors: { input: string; mirror: string }[];
  recentReflections: { question: string; answer: string }[];
  generatedDate: string;
}

function getDominant(values: string[], labels: Record<string, string>): { label: string; count: number } | null {
  if (values.length === 0) return null;
  const counts: Record<string, number> = {};
  values.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return null;
  return { label: labels[sorted[0][0]] || sorted[0][0], count: sorted[0][1] };
}

function loadBriefData(): BriefData | null {
  const cutoff = Date.now() - 30 * 86400000;
  const cutoffDate = new Date(cutoff).toISOString().slice(0, 10);

  const patterns: string[] = [];
  const voices: string[] = [];
  let reflections = 0;
  let mirrors = 0;
  let resets = 0;
  let daysTracked = new Set<string>();
  let loopBehavior: string | null = null;
  let loopLogs: { trigger: string }[] = [];
  const recentMirrors: { input: string; mirror: string }[] = [];
  const recentReflections: { question: string; answer: string }[] = [];

  try {
    const dpRaw = localStorage.getItem(STORAGE_KEYS.dailyPattern);
    if (dpRaw) {
      JSON.parse(dpRaw).forEach((e: any) => {
        if (e.date >= cutoffDate) {
          patterns.push(e.patternId);
          daysTracked.add(e.date);
        }
      });
    }

    const ivRaw = localStorage.getItem(STORAGE_KEYS.innerVoices);
    if (ivRaw) {
      JSON.parse(ivRaw).forEach((e: any) => {
        if (e.date >= cutoffDate) voices.push(e.voiceId);
      });
    }

    const drRaw = localStorage.getItem(STORAGE_KEYS.dailyReflection);
    if (drRaw) {
      JSON.parse(drRaw).forEach((e: any) => {
        if (e.date >= cutoffDate) {
          reflections++;
          if (recentReflections.length < 3) {
            recentReflections.push({ question: e.question, answer: e.answer });
          }
        }
      });
    }

    const mRaw = localStorage.getItem(STORAGE_KEYS.mirror);
    if (mRaw) {
      const allMirrors = JSON.parse(mRaw);
      const recent = allMirrors.filter((m: any) => m.timestamp > cutoff);
      mirrors = recent.length;
      recent.slice(0, 3).forEach((m: any) => {
        recentMirrors.push({ input: m.input, mirror: m.mirror });
      });
    }

    const rRaw = localStorage.getItem(STORAGE_KEYS.reset);
    if (rRaw) {
      const allResets = JSON.parse(rRaw);
      resets = allResets.filter((r: any) => r.timestamp > cutoff).length;
    }

    const activeLoop = localStorage.getItem('astrokalki-loop-active');
    if (activeLoop) {
      const loopKey = STORAGE_KEYS.loopPrefix + activeLoop.toLowerCase().replace(/\s+/g, '-');
      const loopRaw = localStorage.getItem(loopKey);
      if (loopRaw) {
        loopBehavior = activeLoop;
        loopLogs = JSON.parse(loopRaw).filter((l: any) => l.timestamp > cutoff);
      }
    }
  } catch {}

  const totalLogs = patterns.length + voices.length + reflections + mirrors + resets + loopLogs.length;

  if (totalLogs === 0) return null;

  // Top triggers
  const triggerCounts: Record<string, number> = {};
  loopLogs.forEach(l => { triggerCounts[l.trigger] = (triggerCounts[l.trigger] || 0) + 1; });
  const topTriggers = Object.entries(triggerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, count]) => ({ label: TRIGGER_LABELS[id] || id, count }));

  return {
    daysTracked: daysTracked.size,
    totalLogs,
    dominantPattern: getDominant(patterns, PATTERN_LABELS),
    dominantVoice: getDominant(voices, VOICE_LABELS),
    witnessCount: voices.filter(v => v === 'witness').length,
    mirrorCount: mirrors,
    resetCount: resets,
    reflectionCount: reflections,
    loopBehavior,
    loopCount: loopLogs.length,
    topTriggers,
    recentMirrors,
    recentReflections,
    generatedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  };
}

function generateTextBrief(data: BriefData): string {
  const lines: string[] = [];
  lines.push('ASTROKALKI · PATTERN INTELLIGENCE BRIEF');
  lines.push('=========================================');
  lines.push(`Generated: ${data.generatedDate}`);
  lines.push(`Days tracked: ${data.daysTracked} | Total data points: ${data.totalLogs}`);
  lines.push('');
  lines.push('PATTERN SUMMARY (last 30 days)');
  lines.push('-----------------------------------------');
  if (data.dominantPattern) {
    lines.push(`Dominant pattern: ${data.dominantPattern.label} (${data.dominantPattern.count} logs)`);
  }
  if (data.dominantVoice) {
    lines.push(`Dominant inner voice: ${data.dominantVoice.label} (${data.dominantVoice.count} days)`);
  }
  lines.push(`Witness appearances: ${data.witnessCount}`);
  lines.push('');
  lines.push('BEHAVIORAL LOOPS');
  lines.push('-----------------------------------------');
  if (data.loopBehavior) {
    lines.push(`Tracked behavior: ${data.loopBehavior}`);
    lines.push(`Occurrences (30d): ${data.loopCount}`);
    if (data.topTriggers.length > 0) {
      lines.push(`Top triggers: ${data.topTriggers.map(t => `${t.label} (${t.count}×)`).join(', ')}`);
    }
  } else {
    lines.push('No specific behavior tracked.');
  }
  lines.push('');
  lines.push('SHADOW WORK');
  lines.push('-----------------------------------------');
  lines.push(`Mirror sessions: ${data.mirrorCount}`);
  if (data.recentMirrors.length > 0) {
    lines.push('Recent mirrors:');
    data.recentMirrors.forEach((m, i) => {
      lines.push(`  ${i + 1}. Complaint: "${m.input}"`);
      lines.push(`     Mirror: ${m.mirror}`);
    });
  }
  lines.push('');
  lines.push('INTERVENTIONS');
  lines.push('-----------------------------------------');
  lines.push(`Resets used: ${data.resetCount}`);
  lines.push(`Daily reflections: ${data.reflectionCount}`);
  lines.push('');
  lines.push('RECENT REFLECTIONS');
  lines.push('-----------------------------------------');
  if (data.recentReflections.length > 0) {
    data.recentReflections.forEach((r, i) => {
      lines.push(`Q: ${r.question}`);
      lines.push(`A: ${r.answer}`);
      lines.push('');
    });
  } else {
    lines.push('No reflections in last 30 days.');
  }
  lines.push('QUESTIONS FOR THE OPERATOR');
  lines.push('-----------------------------------------');
  if (data.dominantPattern) {
    lines.push(`1. The pattern "${data.dominantPattern.label}" has been dominant. What is its root structure?`);
  }
  if (data.dominantVoice && data.dominantVoice.label !== 'The Witness') {
    lines.push(`2. ${data.dominantVoice.label} has been running the days. When did this voice first appear?`);
  }
  if (data.witnessCount === 0) {
    lines.push(`3. The Witness hasn't appeared in 30 days. What would it take to develop meta-awareness?`);
  }
  if (data.loopBehavior && data.loopCount > 5) {
    lines.push(`4. The loop "${data.loopBehavior}" occurred ${data.loopCount} times. What need is it serving?`);
  }
  lines.push('');
  lines.push('---');
  lines.push('Generated by AstroKalki · The Pattern Intelligence System');

  return lines.join('\n');
}

export default function ConsultationPreparation() {
  const [brief, setBrief] = useState<BriefData | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    setBrief(loadBriefData());
  }, []);

  const generate = () => {
    setBrief(loadBriefData());
  };

  const copyBrief = () => {
    if (!brief) return;
    try {
      navigator.clipboard.writeText(generateTextBrief(brief));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const downloadBrief = () => {
    if (!brief) return;
    const text = generateTextBrief(brief);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `astrokalki-brief-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Phase 3 · Bridge to Consultation
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Consultation Preparation</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Your consultation starts with months of behavioral evidence — not a 5-minute intake form. Generate a brief from your logged data and hand it to your operator.
      </p>

      {!brief ? (
        <div className="p-6 border border-white/[0.04] bg-[#050505] text-center">
          <div className="text-[32px] mb-3 opacity-30">✦</div>
          <p className="text-[11px] text-[#8a8078]/60 font-[var(--font-cormorant)] italic max-w-xs mx-auto leading-relaxed">
            Your brief generates from 30 days of logged data.
            Use <span className="text-[#c9a96e]">Daily Pattern</span>, <span className="text-[#c9a96e]">Mirror</span>, or <span className="text-[#c9a96e]">Daily Reflection</span> to start collecting evidence.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Brief preview */}
          <div className="p-4 border border-white/[0.04] bg-[#050505] mb-4">
            <div className="flex items-baseline justify-between mb-3 pb-3 border-b border-white/[0.04]">
              <div>
                <p className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)]">
                  Pattern Intelligence Brief
                </p>
                <p className="text-[9px] text-[#8a8078]/60 font-[var(--font-inter)] mt-0.5">
                  Generated {brief.generatedDate}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[16px] font-[var(--font-cormorant)] font-bold text-[#c9a96e] tabular-nums">{brief.daysTracked}</p>
                <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">days tracked</p>
              </div>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-4 gap-2 mb-4 text-center">
              <div>
                <p className="text-[14px] font-[var(--font-cormorant)] font-bold text-[#f5f3f0] tabular-nums">{brief.dominantPattern?.count || 0}</p>
                <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Patterns</p>
              </div>
              <div>
                <p className="text-[14px] font-[var(--font-cormorant)] font-bold text-[#f5f3f0] tabular-nums">{brief.mirrorCount}</p>
                <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Mirrors</p>
              </div>
              <div>
                <p className="text-[14px] font-[var(--font-cormorant)] font-bold text-[#f5f3f0] tabular-nums">{brief.resetCount}</p>
                <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Resets</p>
              </div>
              <div>
                <p className="text-[14px] font-[var(--font-cormorant)] font-bold text-[#f5f3f0] tabular-nums">{brief.reflectionCount}</p>
                <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Reflections</p>
              </div>
            </div>

            {/* Dominant pattern + voice */}
            {brief.dominantPattern && (
              <div className="mb-2">
                <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Dominant pattern</span>
                <p className="text-[11px] text-[#c9a96e] font-[var(--font-cormorant)] font-bold">
                  {brief.dominantPattern.label} <span className="text-[9px] text-[#8a8078]/50 font-[var(--font-inter)] font-normal">({brief.dominantPattern.count} logs)</span>
                </p>
              </div>
            )}
            {brief.dominantVoice && (
              <div className="mb-2">
                <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Dominant inner voice</span>
                <p className="text-[11px] text-[#f5f3f0]/80 font-[var(--font-cormorant)] font-bold">
                  {brief.dominantVoice.label} <span className="text-[9px] text-[#8a8078]/50 font-[var(--font-inter)] font-normal">({brief.dominantVoice.count} days)</span>
                </p>
              </div>
            )}
            {brief.loopBehavior && (
              <div className="mb-2">
                <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Tracked loop</span>
                <p className="text-[11px] text-[#f5f3f0]/80 font-[var(--font-cormorant)] font-bold">
                  {brief.loopBehavior} <span className="text-[9px] text-[#8a8078]/50 font-[var(--font-inter)] font-normal">({brief.loopCount}× in 30d)</span>
                </p>
                {brief.topTriggers.length > 0 && (
                  <p className="text-[9px] text-[#8a8078]/70 font-[var(--font-inter)] italic mt-1">
                    Top triggers: {brief.topTriggers.map(t => `${t.label} (${t.count}×)`).join(', ')}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Auto-generated questions for operator */}
          <div className="p-3 border border-[#c9a96e]/30 bg-[#c9a96e]/[0.03] mb-4">
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] block mb-2">
              Questions Generated for Your Operator
            </span>
            <ul className="space-y-1.5">
              {brief.dominantPattern && (
                <li className="text-[10px] text-[#f5f3f0]/70 font-[var(--font-inter)] leading-relaxed pl-3">
                  <span className="text-[#c9a96e]">1.</span> The pattern "{brief.dominantPattern.label}" has been dominant. What is its root structure?
                </li>
              )}
              {brief.dominantVoice && brief.dominantVoice.label !== 'The Witness' && (
                <li className="text-[10px] text-[#f5f3f0]/70 font-[var(--font-inter)] leading-relaxed pl-3">
                  <span className="text-[#c9a96e]">2.</span> {brief.dominantVoice.label} has been running the days. When did this voice first appear?
                </li>
              )}
              {brief.witnessCount === 0 && (
                <li className="text-[10px] text-[#f5f3f0]/70 font-[var(--font-inter)] leading-relaxed pl-3">
                  <span className="text-[#c9a96e]">3.</span> The Witness hasn&apos;t appeared in 30 days. What would it take to develop meta-awareness?
                </li>
              )}
              {brief.loopBehavior && brief.loopCount > 5 && (
                <li className="text-[10px] text-[#f5f3f0]/70 font-[var(--font-inter)] leading-relaxed pl-3">
                  <span className="text-[#c9a96e]">4.</span> The loop "{brief.loopBehavior}" occurred {brief.loopCount} times. What need is it serving?
                </li>
              )}
            </ul>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={copyBrief}
              className="px-3 py-2.5 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-semibold bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a] transition-all"
            >
              {copied ? '✓ Copied' : 'Copy Brief'}
            </button>
            <button
              onClick={downloadBrief}
              className="px-3 py-2.5 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-semibold border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all"
            >
              {downloaded ? '✓ Downloaded' : 'Download .txt'}
            </button>
          </div>

          <button
            onClick={generate}
            className="w-full mt-2 px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border border-white/[0.06] text-[#8a8078]/60 hover:text-[#8a8078] hover:border-white/[0.1] transition-all"
          >
            Refresh Brief
          </button>

          <p className="mt-4 text-[8px] text-[#8a8078]/40 font-[var(--font-inter)] italic">
            Hand this brief to your operator before your consultation. They&apos;ll start with months of evidence instead of a 5-minute intake.
          </p>
        </motion.div>
      )}
    </div>
  );
}
