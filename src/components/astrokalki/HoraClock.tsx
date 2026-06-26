'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * HoraClock — Chronobiological Hora Clock with Astronomical Ephemeris
 * 
 * Calculates real sunrise/sunset times and Vedic planetary hours (Horas)
 * based on solar position. Each Hora is exactly 1/12 of daytime or
 * nighttime, mapping to the classical Vedic planetary sequence.
 * 
 * Uses simplified solar position equations for sunrise/sunset.
 */

interface HoraData {
  planet: string;
  sanskrit: string;
  focus: string;
  optimalActivity: string;
  avoidActivity: string;
  element: string;
  symbol: string;
}

const HORA_PLANETS: HoraData[] = [
  { planet: 'Sun', sanskrit: 'Surya', focus: 'Authority, vitality, sovereign action', optimalActivity: 'Strategic decisions, leadership actions, boundary declarations', avoidActivity: 'Self-doubt, deferring to others, hiding from visibility', element: 'Tejas (Fire)', symbol: '☉' },
  { planet: 'Venus', sanskrit: 'Shukra', focus: 'Relationships, values, aesthetic discernment', optimalActivity: 'Relationship repair, value alignment, creative expression', avoidActivity: 'People-pleasing, compromising core values, numbing with pleasure', element: 'Apas (Water)', symbol: '♀' },
  { planet: 'Mercury', sanskrit: 'Budha', focus: 'Communication, analysis, pattern articulation', optimalActivity: 'Diagnostic writing, pattern journaling, clinical analysis', avoidActivity: 'Overthinking, rumination loops, verbal avoidance', element: 'Vayu (Air)', symbol: '☿' },
  { planet: 'Moon', sanskrit: 'Chandra', focus: 'Emotional body, subconscious patterns, maternal imprint', optimalActivity: 'Shadow observation, emotional processing, nervous system calming', avoidActivity: 'Emotional suppression, bypassing grief, attachment reenactment', element: 'Apas (Water)', symbol: '☽' },
  { planet: 'Saturn', sanskrit: 'Shani', focus: 'Discipline, structural integrity, karmic consequence', optimalActivity: 'Discipline reinforcement, structural audit, karmic boundary setting', avoidActivity: 'Avoiding responsibility, rigidity, self-punishment cycles', element: 'Prithvi (Earth)', symbol: '♄' },
  { planet: 'Jupiter', sanskrit: 'Guru', focus: 'Wisdom, expansion, dharma alignment', optimalActivity: 'Dharma navigation, philosophical integration, teaching others', avoidActivity: 'Spiritual bypassing, overextension, ungrounded optimism', element: 'Tejas (Fire)', symbol: '♃' },
];

// Vedic Hora sequence: Sun → Venus → Mercury → Moon → Saturn → Jupiter → repeat
const HORA_ORDER = [0, 1, 2, 3, 4, 5]; // Indexes into HORA_PLANETS

// Simplified sunrise/sunset calculation (declination-based)
function calculateSunTimes(lat: number, lng: number, date: Date): { sunrise: Date; sunset: Date } {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const declination = -23.45 * Math.cos((2 * Math.PI / 365) * (dayOfYear + 10));
  const decRad = (declination * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;

  const hourAngle = Math.acos(
    -Math.tan(latRad) * Math.tan(decRad)
  );

  const hourAngleDeg = (hourAngle * 180) / Math.PI;
  const solarNoon = 12 - lng / 15; // Approximate, ignoring equation of time

  const sunriseHour = solarNoon - hourAngleDeg / 15;
  const sunsetHour = solarNoon + hourAngleDeg / 15;

  const sunrise = new Date(date);
  sunrise.setHours(Math.floor(sunriseHour) + 5, Math.floor((sunriseHour % 1) * 60) + 30, 0); // UTC+5:30 IST

  const sunset = new Date(date);
  sunset.setHours(Math.floor(sunsetHour) + 5, Math.floor((sunsetHour % 1) * 60) + 30, 0);

  return { sunrise, sunset };
}

// Determine which Hora is currently active based on planetary hour system
function getCurrentHora(sunrise: Date, sunset: Date, now: Date): {
  horaIndex: number;
  hora: HoraData;
  isDaytime: boolean;
  horaNumber: number;
  horaStart: Date;
  horaEnd: Date;
} {
  const isDaytime = now >= sunrise && now < sunset;
  const dayStart = isDaytime ? sunrise : sunset;
  const dayEnd = isDaytime ? sunset : new Date(sunset.getTime() + (sunrise.getTime() - sunset.getTime() + 86400000));

  const totalDuration = dayEnd.getTime() - dayStart.getTime();
  const horaDuration = totalDuration / 12;
  const elapsed = now.getTime() - dayStart.getTime();
  const horaNumber = Math.min(Math.floor(elapsed / horaDuration), 11);

  // Starting planet for day Hora is based on day of week
  const dayOfWeek = now.getDay(); // 0=Sun
  const startPlanetIndex = dayOfWeek % 6;

  // Current hora planet
  const currentPlanetIndex = (startPlanetIndex + horaNumber) % 6;

  const horaStart = new Date(dayStart.getTime() + horaNumber * horaDuration);
  const horaEnd = new Date(dayStart.getTime() + (horaNumber + 1) * horaDuration);

  return {
    horaIndex: currentPlanetIndex,
    hora: HORA_PLANETS[currentPlanetIndex],
    isDaytime,
    horaNumber: horaNumber + 1,
    horaStart,
    horaEnd,
  };
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

export default function HoraClock() {
  const [time, setTime] = useState(new Date());
  const [sunData, setSunData] = useState<{ sunrise: Date; sunset: Date } | null>(null);
  const [horaInfo, setHoraInfo] = useState<ReturnType<typeof getCurrentHora> | null>(null);

  useEffect(() => {
    // Default to Mumbai coordinates (AstroKalki's base)
    const lat = 19.076;
    const lng = 72.8777;

    const update = () => {
      const now = new Date();
      setTime(now);
      const sun = calculateSunTimes(lat, lng, now);
      setSunData(sun);
      setHoraInfo(getCurrentHora(sun.sunrise, sun.sunset, now));
    };

    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;

  const hora = horaInfo?.hora || HORA_PLANETS[3]; // Default Moon

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Chronobiological Alignment
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-4">
        Hora Clock
      </p>

      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Clock face */}
        <div className="relative w-48 h-48 shrink-0 mx-auto md:mx-0">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Outer ring */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="#1a1815" strokeWidth="1" />
            <circle cx="100" cy="100" r="85" fill="none" stroke="#0a0a0a" strokeWidth="8" />

            {/* Day/Night arc */}
            {sunData && horaInfo && (
              <>
                {/* Day arc (gold) */}
                <path
                  d={`M ${100 + 85 * Math.cos(((sunData.sunrise.getHours() + sunData.sunrise.getMinutes() / 60) / 12 * 360 - 90) * Math.PI / 180)} ${100 + 85 * Math.sin(((sunData.sunrise.getHours() + sunData.sunrise.getMinutes() / 60) / 12 * 360 - 90) * Math.PI / 180)} A 85 85 0 ${horaInfo.isDaytime ? 0 : 1} ${100 + 85 * Math.cos(((sunData.sunset.getHours() + sunData.sunset.getMinutes() / 60) / 12 * 360 - 90) * Math.PI / 180)} ${100 + 85 * Math.sin(((sunData.sunset.getHours() + sunData.sunset.getMinutes() / 60) / 12 * 360 - 90) * Math.PI / 180)}`}
                  fill="none" stroke="#c9a96e" strokeWidth="2" strokeOpacity="0.3"
                />
                {/* Sunrise marker */}
                <circle
                  cx={100 + 85 * Math.cos(((sunData.sunrise.getHours() + sunData.sunrise.getMinutes() / 60) / 12 * 360 - 90) * Math.PI / 180)}
                  cy={100 + 85 * Math.sin(((sunData.sunrise.getHours() + sunData.sunrise.getMinutes() / 60) / 12 * 360 - 90) * Math.PI / 180)}
                  r="3" fill="#c9a96e" fillOpacity="0.6"
                />
                {/* Sunset marker */}
                <circle
                  cx={100 + 85 * Math.cos(((sunData.sunset.getHours() + sunData.sunset.getMinutes() / 60) / 12 * 360 - 90) * Math.PI / 180)}
                  cy={100 + 85 * Math.sin(((sunData.sunset.getHours() + sunData.sunset.getMinutes() / 60) / 12 * 360 - 90) * Math.PI / 180)}
                  r="3" fill="#8a8078" fillOpacity="0.6"
                />
              </>
            )}

            {/* Hour markers with planet symbols */}
            {HORA_PLANETS.map((h, i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180);
              const x = 100 + 75 * Math.cos(angle);
              const y = 100 + 75 * Math.sin(angle);
              const isActive = horaInfo?.horaIndex === i;
              return (
                <g key={i}>
                  <line
                    x1={100 + 85 * Math.cos(angle)} y1={100 + 85 * Math.sin(angle)}
                    x2={100 + 90 * Math.cos(angle)} y2={100 + 90 * Math.sin(angle)}
                    stroke={isActive ? '#c9a96e' : '#3a3530'}
                    strokeWidth={isActive ? 2 : 0.5}
                  />
                  <text x={x} y={y + 3} textAnchor="middle" fill={isActive ? '#c9a96e' : '#3a3530'}
                    fontSize="8" fontFamily="var(--font-inter)" fontWeight={isActive ? '600' : '300'}>
                    {h.symbol}
                  </text>
                </g>
              );
            })}

            {/* Hour hand */}
            <line x1="100" y1="100" x2={100 + 45 * Math.cos((hourAngle - 90) * Math.PI / 180)}
              y2={100 + 45 * Math.sin((hourAngle - 90) * Math.PI / 180)}
              stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" />
            {/* Minute hand */}
            <line x1="100" y1="100" x2={100 + 60 * Math.cos((minuteAngle - 90) * Math.PI / 180)}
              y2={100 + 60 * Math.sin((minuteAngle - 90) * Math.PI / 180)}
              stroke="#8a8078" strokeWidth="1" strokeLinecap="round" />
            <circle cx="100" cy="100" r="3" fill="#c9a96e" />
          </svg>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <span className="text-[10px] text-[#8a8078]/50 font-[var(--font-inter)] font-light">
              {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')} IST
            </span>
          </div>
        </div>

        {/* Hora info + Ephemeris */}
        <div className="flex-1 min-w-0">
          <motion.div
            key={hora.planet}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            <div>
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)]">Current Planetary Ruler</span>
              <p className="font-[var(--font-cormorant)] text-2xl text-[#c9a96e] font-bold">{hora.symbol} {hora.planet}</p>
              <p className="text-[9px] text-[#8a8078]/50 font-[var(--font-inter)] italic">{hora.sanskrit} — {hora.element}</p>
            </div>

            {/* Ephemeris data */}
            <div className="grid grid-cols-2 gap-2">
              {sunData && (
                <>
                  <div className="bg-[#050505] border border-white/[0.04] p-2">
                    <span className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/40 font-[var(--font-inter)]">Sunrise</span>
                    <p className="text-[11px] text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">{formatTime(sunData.sunrise)}</p>
                  </div>
                  <div className="bg-[#050505] border border-white/[0.04] p-2">
                    <span className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/40 font-[var(--font-inter)]">Sunset</span>
                    <p className="text-[11px] text-[#8a8078]/70 font-[var(--font-inter)] font-medium">{formatTime(sunData.sunset)}</p>
                  </div>
                </>
              )}
              {horaInfo && (
                <>
                  <div className="bg-[#050505] border border-white/[0.04] p-2">
                    <span className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/40 font-[var(--font-inter)]">Hora #{horaInfo.horaNumber}</span>
                    <p className="text-[11px] text-[#f5f3f0]/50 font-[var(--font-inter)]">{horaInfo.isDaytime ? 'Day' : 'Night'} Hora</p>
                  </div>
                  <div className="bg-[#050505] border border-white/[0.04] p-2">
                    <span className="text-[7px] tracking-[0.1em] uppercase text-[#8a8078]/40 font-[var(--font-inter)]">Hora Window</span>
                    <p className="text-[11px] text-[#f5f3f0]/50 font-[var(--font-inter)]">{formatTime(horaInfo.horaStart)}–{formatTime(horaInfo.horaEnd)}</p>
                  </div>
                </>
              )}
            </div>

            <div>
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)] block mb-0.5">Optimal Now</span>
              <p className="text-[11px] text-[#c9a96e]/70 font-[var(--font-inter)] font-medium">{hora.optimalActivity}</p>
            </div>
            <div>
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#a07050]/50 font-[var(--font-inter)] block mb-0.5">Avoid Now</span>
              <p className="text-[11px] text-[#a07050]/60 font-[var(--font-inter)] font-light">{hora.avoidActivity}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
