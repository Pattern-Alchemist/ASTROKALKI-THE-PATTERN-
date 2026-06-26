'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * PanchangaScheduler — Vedic Calendar Ritual Planner
 *
 * Computes the five limbs of the Vedic calendar (Panchanga) for the
 * current date and the next four days:
 *   - Tithi (lunar day, 30 total)
 *   - Nakshatra (lunar mansion, 27 total)
 *   - Yoga (sun-moon angular combination, 27 total)
 *   - Karana (half-tithi, 11 total)
 *   - Vara (weekday, ruled by a planet)
 *
 * Maps each Tithi to a recommended ritual practice.
 */

// Simplified lunar phase calculation (synodic month ~29.53 days)
// Reference new moon: 2000-01-06 18:14 UTC (JDE 2451550.1)
const NEW_MOON_JDE = 2451550.1;
const SYNODIC_MONTH = 29.530588853;

interface Panchanga {
  date: Date;
  vara: { name: string; ruler: string; rulerSanskrit: string; symbol: string };
  tithi: { index: number; name: string; paksha: string; ritual: string; quality: string };
  nakshatra: { index: number; name: string; ruler: string; symbol: string; quality: string };
  yoga: { index: number; name: string; meaning: string };
  karana: { index: number; name: string; meaning: string };
}

const VARAS = [
  { name: 'Sunday', ruler: 'Sun', rulerSanskrit: 'Surya', symbol: '☉' },
  { name: 'Monday', ruler: 'Moon', rulerSanskrit: 'Chandra', symbol: '☽' },
  { name: 'Tuesday', ruler: 'Mars', rulerSanskrit: 'Mangala', symbol: '♂' },
  { name: 'Wednesday', ruler: 'Mercury', rulerSanskrit: 'Budha', symbol: '☿' },
  { name: 'Thursday', ruler: 'Jupiter', rulerSanskrit: 'Guru', symbol: '♃' },
  { name: 'Friday', ruler: 'Venus', rulerSanskrit: 'Shukra', symbol: '♀' },
  { name: 'Saturday', ruler: 'Saturn', rulerSanskrit: 'Shani', symbol: '♄' },
];

const TITHIS: { name: string; ritual: string; quality: string }[] = [
  { name: 'Pratipad', ritual: 'Begin new endeavors, set sankalpa', quality: 'Foundation' },
  { name: 'Dwitiya', ritual: 'Consolidate, gather resources', quality: 'Stability' },
  { name: 'Tritiya', ritual: 'Cultivate, nurture growth', quality: 'Growth' },
  { name: 'Chaturthi', ritual: 'Remove obstacles — Ganesha invocation', quality: 'Clearance' },
  { name: 'Panchami', ritual: 'Honor teachers, study scripture', quality: 'Receptivity' },
  { name: 'Shashthi', ritual: 'Subtle-body practices, fasting', quality: 'Refinement' },
  { name: 'Saptami', ritual: 'Surya namaskar, vitality practices', quality: 'Vitality' },
  { name: 'Ashtami', ritual: 'Tantric practices, deep meditation', quality: 'Power' },
  { name: 'Navami', ritual: 'Service, charitable acts', quality: 'Surrender' },
  { name: 'Dashami', ritual: 'Victory affirmations, completion rites', quality: 'Victory' },
  { name: 'Ekadashi', ritual: 'Fasting — Vishnu observance', quality: 'Purification' },
  { name: 'Dwadashi', ritual: 'Break fast with fruits, devote to rest', quality: 'Restoration' },
  { name: 'Trayodashi', ritual: 'Purification, decluttering', quality: 'Cleansing' },
  { name: 'Chaturdashi', ritual: 'Ancestor honor, shadow work', quality: 'Threshold' },
  { name: 'Purnima', ritual: 'Manifestation, full-moon meditation', quality: 'Fullness' },
  { name: 'Pratipad (K)', ritual: 'Begin shadow-phase practices', quality: 'Descent' },
  { name: 'Dwitiya (K)', ritual: 'Inventory attachments', quality: 'Inventory' },
  { name: 'Tritiya (K)', ritual: 'Release — what is no longer alive?', quality: 'Release' },
  { name: 'Chaturthi (K)', ritual: 'Face obstacles internally', quality: 'Confrontation' },
  { name: 'Panchami (K)', ritual: 'Solitude, silence practices', quality: 'Stillness' },
  { name: 'Shashthi (K)', ritual: 'Honor lineage, ancestral patterns', quality: 'Lineage' },
  { name: 'Saptami (K)', ritual: 'Digestive reset, light diet', quality: 'Reset' },
  { name: 'Ashtami (K)', ritual: 'Kali / Bhairavi invocation', quality: 'Dissolution' },
  { name: 'Navami (K)', ritual: 'Honor the dying, mortality meditation', quality: 'Mortality' },
  { name: 'Dashami (K)', ritual: 'Sever old patterns, vows', quality: 'Severance' },
  { name: 'Ekadashi (K)', ritual: 'Fasting — Vishnu observance', quality: 'Purification' },
  { name: 'Dwadashi (K)', ritual: 'Restore from fast, gentle re-entry', quality: 'Restoration' },
  { name: 'Trayodashi (K)', ritual: 'Honor the dark feminine, deep rest', quality: 'Receptivity' },
  { name: 'Chaturdashi (K)', ritual: 'Pre-amavasya rituals, energy clearing', quality: 'Preparation' },
  { name: 'Amavasya', ritual: 'Ancestor offerings (tarpana), deep silence', quality: 'Emptiness' },
];

const NAKSHATRAS = [
  { name: 'Ashwini', ruler: 'Ketu', symbol: 'Horse head', quality: 'Swift healing' },
  { name: 'Bharani', ruler: 'Venus', symbol: 'Yoni', quality: 'Creative endurance' },
  { name: 'Krittika', ruler: 'Sun', symbol: 'Razor', quality: 'Cutting clarity' },
  { name: 'Rohini', ruler: 'Moon', symbol: 'Ox cart', quality: 'Fertile manifestation' },
  { name: 'Mrigashira', ruler: 'Mars', symbol: 'Deer head', quality: 'Seeking' },
  { name: 'Ardra', ruler: 'Rahu', symbol: 'Teardrop', quality: 'Stormy transformation' },
  { name: 'Punarvasu', ruler: 'Jupiter', symbol: 'Quiver of arrows', quality: 'Renewal' },
  { name: 'Pushya', ruler: 'Saturn', symbol: 'Cow udder', quality: 'Nourishment' },
  { name: 'Ashlesha', ruler: 'Mercury', symbol: 'Coiled serpent', quality: 'Kundalini' },
  { name: 'Magha', ruler: 'Ketu', symbol: 'Throne', quality: 'Ancestral power' },
  { name: 'Purva Phalguni', ruler: 'Venus', symbol: 'Bed', quality: 'Rest & pleasure' },
  { name: 'Uttara Phalguni', ruler: 'Sun', symbol: 'Bed', quality: 'Contractual fidelity' },
  { name: 'Hasta', ruler: 'Moon', symbol: 'Hand', quality: 'Skillful craft' },
  { name: 'Chitra', ruler: 'Mars', symbol: 'Bright jewel', quality: 'Brilliant form' },
  { name: 'Swati', ruler: 'Rahu', symbol: 'Young sprout', quality: 'Independent flexibility' },
  { name: 'Vishakha', ruler: 'Jupiter', symbol: 'Triumphal arch', quality: 'Goal-driven' },
  { name: 'Anuradha', ruler: 'Saturn', symbol: 'Lotus', quality: 'Devotional friendship' },
  { name: 'Jyeshtha', ruler: 'Mercury', symbol: 'Earring', quality: 'Seniority' },
  { name: 'Mula', ruler: 'Ketu', symbol: 'Tied roots', quality: 'Root excavation' },
  { name: 'Purva Ashadha', ruler: 'Venus', symbol: 'Fan', quality: 'Invincible waters' },
  { name: 'Uttara Ashadha', ruler: 'Sun', symbol: 'Elephant tusk', quality: 'Lasting victory' },
  { name: 'Shravana', ruler: 'Moon', symbol: 'Ear', quality: 'Sacred listening' },
  { name: 'Dhanishta', ruler: 'Mars', symbol: 'Drum', quality: 'Rhythmic wealth' },
  { name: 'Shatabhisha', ruler: 'Rahu', symbol: 'Empty circle', quality: 'Hidden healing' },
  { name: 'Purva Bhadrapada', ruler: 'Jupiter', symbol: 'Sword', quality: 'Spiritual fire' },
  { name: 'Uttara Bhadrapada', ruler: 'Saturn', symbol: 'Twin serpent', quality: 'Cosmic serpent' },
  { name: 'Revati', ruler: 'Mercury', symbol: 'Fish', quality: 'Compassionate completion' },
];

const YOGAS = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti',
  'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata',
  'Variyana', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti',
];

const KARANAS = [
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Garaja', 'Vanija', 'Vishti',
  'Shakuni', 'Chatushpada', 'Naga', 'Kimstughna',
];

function computePanchanga(date: Date): Panchanga {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const jdeNow = dayStart.getTime() / 86400000 + 2440587.5;
  const lunarDays = (jdeNow - NEW_MOON_JDE) / SYNODIC_MONTH;
  const currentCycle = lunarDays - Math.floor(lunarDays / 1) * 0; // keep absolute
  const tithiFloat = (currentCycle * 30) % 30;
  const tithiIndex = Math.floor(tithiFloat);
  const paksha = tithiIndex < 15 ? 'Shukla (Waxing)' : 'Krishna (Waning)';

  // Nakshatra: moon moves ~13.33° per day through 27 mansions
  const nakshatraFloat = (lunarDays * 27) % 27;
  const nakshatraIndex = Math.floor(nakshatraFloat);

  // Yoga: sun+moon combined longitude / 13.33°
  const yogaFloat = (lunarDays * 27 + 6) % 27; // approximation
  const yogaIndex = Math.floor(yogaFloat);

  // Karana: half-tithi
  const karanaIndex = Math.floor(tithiFloat * 2) % 11;

  const dayOfWeek = dayStart.getDay();
  const vara = VARAS[dayOfWeek];

  return {
    date: dayStart,
    vara,
    tithi: { index: tithiIndex, name: TITHIS[tithiIndex].name, paksha, ritual: TITHIS[tithiIndex].ritual, quality: TITHIS[tithiIndex].quality },
    nakshatra: { index: nakshatraIndex, name: NAKSHATRAS[nakshatraIndex].name, ruler: NAKSHATRAS[nakshatraIndex].ruler, symbol: NAKSHATRAS[nakshatraIndex].symbol, quality: NAKSHATRAS[nakshatraIndex].quality },
    yoga: { index: yogaIndex, name: YOGAS[yogaIndex], meaning: 'Sun-moon angular alignment' },
    karana: { index: karanaIndex, name: KARANAS[karanaIndex], meaning: 'Half-tithi division' },
  };
}

export default function PanchangaScheduler() {
  const [today, setToday] = useState<Date | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const days = useMemo<Panchanga[]>(() => {
    if (!today) return [];
    return Array.from({ length: 5 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      return computePanchanga(d);
    });
  }, [today]);

  if (!today || days.length === 0) {
    return (
      <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
        <p className="text-[10px] text-[#8a8078]/50 font-[var(--font-inter)]">Computing ephemeris...</p>
      </div>
    );
  }

  const current = days[selectedDay];
  const isToday = selectedDay === 0;

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Vedic Ephemeris
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Panchanga Scheduler</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Five-limbed Vedic calendar — Tithi, Nakshatra, Yoga, Karana, Vara. Each combination carries a unique ritual signature.
      </p>

      {/* Day selector */}
      <div className="flex gap-1 mb-4 overflow-x-auto">
        {days.map((d, i) => {
          const isSel = selectedDay === i;
          const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
          return (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`px-3 py-2 shrink-0 border text-center transition-all duration-200 ${
                isSel
                  ? 'border-[#c9a96e] bg-[#c9a96e]/5'
                  : 'border-white/[0.04] hover:border-white/[0.08]'
              }`}
            >
              <span className={`text-[8px] uppercase tracking-[0.15em] font-[var(--font-inter)] block ${isSel ? 'text-[#c9a96e]' : 'text-[#8a8078]/60'}`}>
                {dayLabel}
              </span>
              <span className={`text-[10px] font-[var(--font-cormorant)] block ${isSel ? 'text-[#f5f3f0]' : 'text-[#8a8078]/50'}`}>
                {d.vara.symbol}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main panchanga readout */}
      <motion.div
        key={selectedDay}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        {/* Vara + Tithi */}
        <div className="border border-white/[0.04] bg-[#050505] p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[16px] text-[#c9a96e]">{current.vara.symbol}</span>
            <div>
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block">
                {isToday ? 'Today' : 'Selected day'}
              </span>
              <span className="text-[11px] font-[var(--font-cormorant)] font-bold text-[#f5f3f0]">
                {current.vara.name}
              </span>
            </div>
          </div>
          <div className="text-[9px] text-[#8a8078]/60 font-[var(--font-inter)]">
            Ruled by <span className="text-[#c9a96e]/70">{current.vara.rulerSanskrit}</span> ({current.vara.ruler})
          </div>
          <div className="mt-3 pt-3 border-t border-white/[0.04]">
            <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block mb-1">
              Tithi #{current.tithi.index + 1} · {current.tithi.paksha}
            </span>
            <p className="font-[var(--font-cormorant)] text-sm text-[#f5f3f0] font-bold">{current.tithi.name}</p>
            <p className="text-[9px] text-[#8a8078] font-[var(--font-inter)] italic mt-1">Quality: {current.tithi.quality}</p>
          </div>
        </div>

        {/* Nakshatra */}
        <div className="border border-white/[0.04] bg-[#050505] p-3">
          <span className="text-[8px] tracking-[0.15em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block mb-1">
            Nakshatra #{current.nakshatra.index + 1} of 27
          </span>
          <p className="font-[var(--font-cormorant)] text-sm text-[#f5f3f0] font-bold">{current.nakshatra.name}</p>
          <div className="mt-2 space-y-0.5">
            <div className="flex justify-between">
              <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)]">Ruler</span>
              <span className="text-[9px] text-[#c9a96e]/70 font-[var(--font-inter)]">{current.nakshatra.ruler}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)]">Symbol</span>
              <span className="text-[9px] text-[#f5f3f0]/70 font-[var(--font-inter)]">{current.nakshatra.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)]">Quality</span>
              <span className="text-[9px] text-[#f5f3f0]/70 font-[var(--font-inter)] italic">{current.nakshatra.quality}</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-white/[0.04]">
            <div className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)]">
              Yoga: <span className="text-[#c9a96e]/60">{current.yoga.name}</span> · Karana: <span className="text-[#c9a96e]/60">{current.karana.name}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ritual recommendation */}
      <motion.div
        key={`ritual-${selectedDay}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mt-3 border border-[#c9a96e]/20 bg-[#c9a96e]/[0.03] p-3"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full" />
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">
            Recommended Ritual
          </span>
        </div>
        <p className="text-[11px] text-[#f5f3f0]/80 font-[var(--font-cormorant)] italic leading-snug">
          {current.tithi.ritual}
        </p>
        <p className="text-[9px] text-[#8a8078]/50 font-[var(--font-inter)] font-light mt-1.5">
          Augmented by {current.nakshatra.name} energy — {current.nakshatra.quality.toLowerCase()}.
        </p>
      </motion.div>

      <div className="mt-3 text-[8px] text-[#8a8078]/30 font-[var(--font-inter)] italic">
        Calculations approximated from J2000.0 new-moon epoch. For exact muhurta, consult a panchangam.
      </div>
    </div>
  );
}
