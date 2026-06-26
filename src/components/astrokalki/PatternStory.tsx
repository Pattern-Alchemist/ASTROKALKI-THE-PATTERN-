'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * PatternStory (Pillar 4 · Transform) — THE SIGNATURE
 *
 * The 90-day "Story of Your Mind." Reads from all other Pattern
 * Intelligence System features (DailyPattern, PatternClimate,
 * InnerVoices, LoopDetector, DailyReflection) and weaves them
 * into a timeline narrative. This is why every other feature exists.
 */

interface DayData {
  date: string;
  pattern?: string; // from DailyPattern
  climate?: string; // from PatternClimate
  voice?: string;   // from InnerVoices
  reflection?: string; // from DailyReflection
  loopLogs?: number; // count of LoopDetector logs that day
}

const STORAGE_KEYS = {
  dailyPattern: 'astrokalki-daily-pattern',
  patternClimate: 'astrokalki-pattern-climate',
  innerVoices: 'astrokalki-inner-voices',
  dailyReflection: 'astrokalki-daily-reflection',
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

const CLIMATE_LABELS: Record<string, string> = {
  'avoidance': 'Avoidance',
  'performing': 'Performer',
  'controlling': 'Control',
  'people-pleasing': 'People Pleasing',
  'projection': 'Projection',
  'anger': 'Anger',
  'numbness': 'Numbness',
  'witness': 'Witness',
};

const VOICE_LABELS: Record<string, string> = {
  'critic': 'The Critic',
  'child': 'The Child',
  'achiever': 'The Achiever',
  'avoider': 'The Avoider',
  'performer': 'The Performer',
  'witness': 'The Witness',
};

export default function PatternStory() {
  const [days, setDays] = useState<DayData[]>([]);

  useEffect(() => {
    // Load all data and merge by date
    const merged: Record<string, DayData> = {};

    const addDay = (date: string) => {
      if (!merged[date]) merged[date] = { date };
      return merged[date];
    };

    try {
      // Daily Pattern
      const dpRaw = localStorage.getItem(STORAGE_KEYS.dailyPattern);
      if (dpRaw) {
        JSON.parse(dpRaw).forEach((e: any) => {
          addDay(e.date).pattern = e.patternId;
        });
      }

      // Pattern Climate
      const pcRaw = localStorage.getItem(STORAGE_KEYS.patternClimate);
      if (pcRaw) {
        JSON.parse(pcRaw).forEach((e: any) => {
          addDay(e.date).climate = e.climateId;
        });
      }

      // Inner Voices
      const ivRaw = localStorage.getItem(STORAGE_KEYS.innerVoices);
      if (ivRaw) {
        JSON.parse(ivRaw).forEach((e: any) => {
          addDay(e.date).voice = e.voiceId;
        });
      }

      // Daily Reflection
      const drRaw = localStorage.getItem(STORAGE_KEYS.dailyReflection);
      if (drRaw) {
        JSON.parse(drRaw).forEach((e: any) => {
          addDay(e.date).reflection = e.answer;
        });
      }

      // Loop Detector (active behavior)
      const activeLoop = localStorage.getItem('astrokalki-loop-active');
      if (activeLoop) {
        const loopKey = STORAGE_KEYS.loopPrefix + activeLoop.toLowerCase().replace(/\s+/g, '-');
        const loopRaw = localStorage.getItem(loopKey);
        if (loopRaw) {
          const logs = JSON.parse(loopRaw);
          const loopByDay: Record<string, number> = {};
          logs.forEach((l: any) => {
            const date = new Date(l.timestamp).toISOString().slice(0, 10);
            loopByDay[date] = (loopByDay[date] || 0) + 1;
          });
          Object.entries(loopByDay).forEach(([date, count]) => {
            addDay(date).loopLogs = count;
          });
        }
      }
    } catch {}

    // Convert to sorted array (oldest first)
    const allDays = Object.values(merged).sort((a, b) => a.date.localeCompare(b.date));
    setDays(allDays);
  }, []);

  // Generate story segments
  const story = useMemo(() => {
    if (days.length < 3) return null;

    const segments: { period: string; narrative: string; highlight: boolean }[] = [];
    const totalDays = days.length;

    // First third
    const firstThird = days.slice(0, Math.floor(totalDays / 3));
    const firstThirdDominantPattern = getDominant(firstThird.map(d => d.pattern).filter(Boolean) as string[]);
    const firstThirdDominantVoice = getDominant(firstThird.map(d => d.voice).filter(Boolean) as string[]);

    if (firstThird.length > 0) {
      segments.push({
        period: 'Beginning',
        narrative: `You started this stretch logging ${firstThirdDominantPattern ? (PATTERN_LABELS[firstThirdDominantPattern] || 'mixed patterns') : 'mixed patterns'} most often. ${firstThirdDominantVoice ? `${VOICE_LABELS[firstThirdDominantVoice]} ran those days.` : ''} You were collecting evidence — even when it did not feel like that is what you were doing.`,
        highlight: false,
      });
    }

    // Middle third
    const middleThird = days.slice(Math.floor(totalDays / 3), Math.floor((2 * totalDays) / 3));
    if (middleThird.length > 0) {
      const midPattern = getDominant(middleThird.map(d => d.pattern).filter(Boolean) as string[]);
      const midVoice = getDominant(middleThird.map(d => d.voice).filter(Boolean) as string[]);
      const witnessCount = middleThird.filter(d => d.voice === 'witness').length;

      segments.push({
        period: 'Middle',
        narrative: `${midPattern ? `The pattern shifted toward ${PATTERN_LABELS[midPattern] || 'something new'}.` : ''} ${witnessCount > 0 ? `The Witness showed up ${witnessCount} time${witnessCount > 1 ? 's' : ''} — that is not nothing.` : 'The Witness had not arrived yet.'} Something was being seen that was not visible before.`,
        highlight: witnessCount > 0,
      });
    }

    // Last third
    const lastThird = days.slice(Math.floor((2 * totalDays) / 3));
    if (lastThird.length > 0) {
      const lastPattern = getDominant(lastThird.map(d => d.pattern).filter(Boolean) as string[]);
      const lastVoice = getDominant(lastThird.map(d => d.voice).filter(Boolean) as string[]);
      const reflectionsCount = lastThird.filter(d => d.reflection).length;

      segments.push({
        period: 'Recent',
        narrative: `${lastPattern ? `Lately, ${PATTERN_LABELS[lastPattern] || 'a new pattern'} has been dominant.` : ''} ${lastVoice && lastVoice !== firstThirdDominantVoice ? `The inner cast shifted — ${VOICE_LABELS[lastVoice]} started showing up more.` : ''} ${reflectionsCount > 0 ? `${reflectionsCount} reflection${reflectionsCount > 1 ? 's' : ''} sealed in this period.` : ''} You are not the same person who started logging ${totalDays} days ago.`,
        highlight: true,
      });
    }

    // Closing
    segments.push({
      period: 'The Thread',
      narrative: `Across ${totalDays} days, you logged ${days.filter(d => d.pattern).length} patterns, ${days.filter(d => d.voice).length} voices, and ${days.filter(d => d.reflection).length} reflections. The story is not in any single day — it is in the trajectory. Keep logging. The pattern is revealing itself.`,
      highlight: false,
    });

    return { segments, totalDays };
  }, [days]);

  // Stats header
  const stats = useMemo(() => {
    return {
      totalDays: days.length,
      patternLogs: days.filter(d => d.pattern).length,
      voiceLogs: days.filter(d => d.voice).length,
      climateLogs: days.filter(d => d.climate).length,
      reflections: days.filter(d => d.reflection).length,
      loopDays: days.filter(d => d.loopLogs).length,
    };
  }, [days]);

  if (days.length < 3) {
    return (
      <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
            Pillar 4 · Transform · Signature
          </span>
        </div>
        <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Your Pattern Story</p>
        <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
          The Story of Your Mind — woven from every pattern you&apos;ve logged.
        </p>
        <div className="p-6 border border-white/[0.04] bg-[#050505] text-center">
          <div className="text-[32px] mb-3 opacity-30">○</div>
          <p className="text-[11px] text-[#8a8078]/60 font-[var(--font-cormorant)] italic max-w-xs mx-auto leading-relaxed">
            Your story begins to weave after 3 days of logging.
            Use <span className="text-[#c9a96e]">Daily Pattern</span>, <span className="text-[#c9a96e]">Inner Voices</span>, or <span className="text-[#c9a96e]">Daily Reflection</span> to start.
          </p>
          <p className="text-[9px] text-[#8a8078]/40 font-[var(--font-inter)] mt-3">
            {days.length} {days.length === 1 ? 'day' : 'days'} logged so far
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
          Pillar 4 · Transform · Signature
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Your Pattern Story</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        {stats.totalDays} days of data. The story isn&apos;t in any single day — it&apos;s in the trajectory.
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2 mb-5 text-center">
        <div className="p-2 border border-white/[0.04] bg-[#050505]">
          <p className="text-[16px] font-[var(--font-cormorant)] font-bold text-[#c9a96e] tabular-nums">{stats.patternLogs}</p>
          <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Patterns</p>
        </div>
        <div className="p-2 border border-white/[0.04] bg-[#050505]">
          <p className="text-[16px] font-[var(--font-cormorant)] font-bold text-[#c9a96e] tabular-nums">{stats.voiceLogs}</p>
          <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Voices</p>
        </div>
        <div className="p-2 border border-white/[0.04] bg-[#050505]">
          <p className="text-[16px] font-[var(--font-cormorant)] font-bold text-[#c9a96e] tabular-nums">{stats.reflections}</p>
          <p className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Reflections</p>
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="mb-5 p-3 border border-white/[0.04] bg-[#050505]">
        <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
          Timeline
        </span>
        <div className="flex gap-[2px] h-12">
          {days.map(d => {
            const hasData = d.pattern || d.voice || d.climate || d.reflection;
            const intensity = (d.pattern ? 1 : 0) + (d.voice ? 1 : 0) + (d.climate ? 1 : 0) + (d.reflection ? 1 : 0);
            return (
              <div
                key={d.date}
                title={`${d.date}: ${d.pattern ? PATTERN_LABELS[d.pattern] : ''} ${d.voice ? '· ' + VOICE_LABELS[d.voice] : ''}`}
                className="flex-1 bg-[#c9a96e]"
                style={{ opacity: hasData ? 0.3 + (intensity / 4) * 0.7 : 0.05 }}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-1 text-[7px] text-[#8a8078]/40 font-[var(--font-inter)]">
          <span>{days[0]?.date.slice(5)}</span>
          <span>{days[Math.floor(days.length / 2)]?.date.slice(5)}</span>
          <span>{days[days.length - 1]?.date.slice(5)}</span>
        </div>
      </div>

      {/* Story segments */}
      {story && (
        <div className="space-y-3">
          {story.segments.map((seg, i) => (
            <motion.div
              key={seg.period}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`p-3 border ${seg.highlight ? 'border-[#c9a96e]/30 bg-[#c9a96e]/[0.03]' : 'border-white/[0.04] bg-[#050505]'}`}
            >
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] block mb-1">
                {seg.period}
              </span>
              <p className="text-[11px] text-[#f5f3f0]/80 font-[var(--font-cormorant)] italic leading-relaxed">
                {seg.narrative}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      <p className="mt-4 text-[8px] text-[#8a8078]/30 font-[var(--font-inter)] italic">
        Your story updates as you log more data. Keep going.
      </p>
    </div>
  );
}

function getDominant(values: string[]): string | null {
  if (values.length === 0) return null;
  const counts: Record<string, number> = {};
  values.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}
