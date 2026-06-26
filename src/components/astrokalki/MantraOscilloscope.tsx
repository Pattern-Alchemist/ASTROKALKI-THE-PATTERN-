'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * MantraOscilloscope — Mantra Wave Visualizer with Repetition Counter
 *
 * Select a mantra (Om, Gayatri, Mahamrityunjaya, Om Namah Shivaya).
 * Plays a synthesized tone via Web Audio API while rendering a live
 * oscilloscope of the waveform. Tracks repetitions on a virtual
 * 108-bead mala, estimates brainwave state from session duration.
 */

type MantraId = 'om' | 'gayatri' | 'mahamrityunjaya' | 'shiva';

interface Mantra {
  id: MantraId;
  name: string;
  sanskrit: string;
  text: string;
  frequency: number; // Base frequency
  harmonics: number[];
  targetReps: number;
  meaning: string;
  effect: string;
}

const MANTRAS: Mantra[] = [
  {
    id: 'om',
    name: 'Om',
    sanskrit: 'Praṇava',
    text: 'ॐ',
    frequency: 136.1, // "Om" frequency
    harmonics: [1, 2, 3, 4],
    targetReps: 108,
    meaning: 'The primordial sound — the vibration of existence itself.',
    effect: 'Grounds, centers, opens the anahata.',
  },
  {
    id: 'gayatri',
    name: 'Gayatri',
    sanskrit: 'Gāyatrī Mantra',
    text: 'Om Bhur Bhuvaḥ Svahaḥ',
    frequency: 528,
    harmonics: [1, 1.5, 2],
    targetReps: 108,
    meaning: 'Illumination mantra to Surya — the solar intelligence.',
    effect: 'Sharpens intellect, dissolves cognitive fog, activates Ajna.',
  },
  {
    id: 'mahamrityunjaya',
    name: 'Mahamrityunjaya',
    sanskrit: 'Mahāmṛtyuṅjaya',
    text: 'Om Tryambakam Yajamahe...',
    frequency: 417,
    harmonics: [1, 1.5, 2.5],
    targetReps: 108,
    meaning: 'The death-conquering mantra to Shiva — healing and protection.',
    effect: 'Releases fear of death, supports cellular healing.',
  },
  {
    id: 'shiva',
    name: 'Om Namah Shivaya',
    sanskrit: 'Pañchākṣara',
    text: 'Om Namaḥ Śivāya',
    frequency: 396,
    harmonics: [1, 2, 3],
    targetReps: 108,
    meaning: 'The five-syllable mantra — honors Shiva as inner consciousness.',
    effect: 'Dissolves tamasic residue, stabilizes the nervous system.',
  },
];

const BRAINWAVE_STATES = [
  { range: '0–5 min', state: 'Beta', color: '#a07050', description: 'Active mind, ordinary waking' },
  { range: '5–15 min', state: 'Alpha', color: '#c9a96e', description: 'Relaxed focus, meditative entry' },
  { range: '15–30 min', state: 'Theta', color: '#7da87a', description: 'Deep meditation, subconscious access' },
  { range: '30+ min', state: 'Delta', color: '#5d8a9a', description: 'Deep stillness, healing states' },
];

export default function MantraOscilloscope() {
  const [selected, setSelected] = useState<MantraId>('om');
  const [isPlaying, setIsPlaying] = useState(false);
  const [reps, setReps] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mantra = MANTRAS.find(m => m.id === selected)!;

  const stopTone = useCallback(() => {
    oscillatorsRef.current.forEach(o => { try { o.stop(); } catch {} });
    oscillatorsRef.current = [];
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3);
    }
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setIsPlaying(false);
  }, []);

  const startTone = useCallback((m: Mantra) => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    const ctx = audioCtxRef.current;
    stopTone();

    setTimeout(() => {
      if (!audioCtxRef.current) return;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.5);

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;

      gain.connect(analyser);
      analyser.connect(ctx.destination);

      // Create oscillators for each harmonic
      m.harmonics.forEach((h, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.value = m.frequency * h;
        const harmGain = ctx.createGain();
        harmGain.gain.value = 1 / (i + 1) ** 1.5;
        osc.connect(harmGain);
        harmGain.connect(gain);
        osc.start();
        oscillatorsRef.current.push(osc);
      });

      gainRef.current = gain;
      analyserRef.current = analyser;
      startTimeRef.current = ctx.currentTime;
      setIsPlaying(true);
      drawWaveform();
    }, 50);
  }, [stopTone]);

  const drawWaveform = useCallback(() => {
    if (!analyserRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const analyser = analyserRef.current;
    const buffer = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      analyser.getByteTimeDomainData(buffer);
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      // Center line
      ctx.strokeStyle = '#1a1815';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // Waveform
      ctx.strokeStyle = mantra.id === 'om' ? '#c9a96e' : mantra.id === 'gayatri' ? '#7da87a' : mantra.id === 'mahamrityunjaya' ? '#9a8a6a' : '#a07050';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const slice = w / buffer.length;
      let x = 0;
      for (let i = 0; i < buffer.length; i++) {
        const v = buffer[i] / 128.0;
        const y = (v * h) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += slice;
      }
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };
    draw();
  }, [mantra.id]);

  const performanceStart = useRef(0);
  useEffect(() => {
    if (!isPlaying) {
      setElapsed(0);
      return;
    }
    performanceStart.current = performance.now();
    const interval = setInterval(() => {
      setElapsed(Math.floor((performance.now() - performanceStart.current) / 1000));
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => () => stopTone(), [stopTone]);

  const handleToggle = () => {
    if (isPlaying) {
      stopTone();
    } else {
      startTone(mantra);
    }
  };

  const handleMantraChange = (id: MantraId) => {
    stopTone();
    setSelected(id);
    setReps(0);
  };

  const handleRepIncrement = () => {
    setReps(r => (r + 1) % (mantra.targetReps + 1));
  };

  const brainwaveIndex = elapsed < 300 ? 0 : elapsed < 900 ? 1 : elapsed < 1800 ? 2 : 3;
  const brainwave = BRAINWAVE_STATES[brainwaveIndex];
  const beadProgress = (reps / mantra.targetReps) * 100;

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#c9a96e] animate-pulse' : 'bg-[#3a3530]'}`} />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Sonic Sadhana
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Mantra Oscilloscope</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Select a mantra. The oscillator synthesizes its tonal signature with harmonic overtones. Track your japa on a 108-bead mala.
      </p>

      {/* Mantra selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 mb-4">
        {MANTRAS.map(m => (
          <button
            key={m.id}
            onClick={() => handleMantraChange(m.id)}
            className={`p-2 border text-center transition-all duration-200 ${
              selected === m.id
                ? 'border-[#c9a96e] bg-[#c9a96e]/5'
                : 'border-white/[0.04] hover:border-white/[0.08]'
            }`}
          >
            <span className={`text-[9px] font-[var(--font-inter)] font-medium block ${selected === m.id ? 'text-[#c9a96e]' : 'text-[#8a8078]/60'}`}>
              {m.name}
            </span>
            <span className="text-[7px] text-[#8a8078]/40 font-[var(--font-inter)] italic block mt-0.5 truncate">
              {m.sanskrit}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4">
        {/* Oscilloscope */}
        <div>
          <div className="border border-white/[0.04] bg-[#050505] p-3">
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block mb-2">
              Waveform · {mantra.frequency} Hz
            </span>
            <canvas
              ref={canvasRef}
              width={400}
              height={120}
              className="w-full h-[120px]"
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.04]">
              <div>
                <span className="text-[8px] text-[#8a8078]/40 font-[var(--font-inter)] uppercase tracking-[0.15em] block">
                  Brainwave
                </span>
                <span className="text-[10px] font-[var(--font-cormorant)] font-bold" style={{ color: brainwave.color }}>
                  {brainwave.state} <span className="text-[8px] text-[#8a8078]/50 font-[var(--font-inter)] italic font-light">— {brainwave.description}</span>
                </span>
              </div>
              <span className="text-[10px] text-[#c9a96e]/70 font-[var(--font-inter)] tabular-nums">
                {Math.floor(elapsed / 60)}:{(elapsed % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          <button
            onClick={handleToggle}
            className={`w-full mt-3 px-4 py-3 text-[10px] tracking-[0.25em] uppercase font-[var(--font-inter)] font-semibold transition-all duration-300 ${
              isPlaying
                ? 'border border-[#c9a96e]/30 text-[#c9a96e] bg-[#c9a96e]/10 hover:bg-[#c9a96e]/15'
                : 'bg-[#c9a96e] text-[#050505] hover:bg-[#d4b87a]'
            }`}
          >
            {isPlaying ? 'Stop Tone' : 'Begin Sadhana'}
          </button>
        </div>

        {/* Mala + Rep counter */}
        <div className="border border-white/[0.04] bg-[#050505] p-3">
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/40 font-[var(--font-inter)] block mb-2">
            Mala Counter · {reps} / {mantra.targetReps}
          </span>

          {/* Bead circle */}
          <div className="relative w-full aspect-square max-w-[180px] mx-auto mb-3">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#1a1815" strokeWidth="0.3" />
              {Array.from({ length: mantra.targetReps }).map((_, i) => {
                const angle = (i / mantra.targetReps) * 2 * Math.PI - Math.PI / 2;
                const x = 50 + 42 * Math.cos(angle);
                const y = 50 + 42 * Math.sin(angle);
                const isFilled = i < reps;
                return (
                  <circle
                    key={i}
                    cx={x} cy={y} r="0.9"
                    fill={isFilled ? '#c9a96e' : '#2a2722'}
                    style={{ transition: 'fill 0.2s' }}
                  />
                );
              })}
              {/* Center sumi bead */}
              <circle cx="50" cy="50" r="4" fill="none" stroke="#c9a96e" strokeWidth="0.4" />
              <text x="50" y="52" textAnchor="middle" fill="#c9a96e" fontSize="7" fontFamily="var(--font-cormorant)" fontWeight="700">
                {reps}
              </text>
            </svg>
          </div>

          <button
            onClick={handleRepIncrement}
            className="w-full px-4 py-2.5 text-[9px] tracking-[0.25em] uppercase font-[var(--font-inter)] font-medium border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all duration-300"
          >
            + Repetition ({reps})
          </button>

          <div className="mt-3 pt-3 border-t border-white/[0.04]">
            <span className="text-[8px] tracking-[0.15em] uppercase text-[#c9a96e]/50 font-[var(--font-inter)] block mb-1">
              Meaning
            </span>
            <p className="text-[10px] text-[#f5f3f0]/70 font-[var(--font-inter)] font-light leading-relaxed">
              {mantra.meaning}
            </p>
            <p className="text-[9px] text-[#8a8078]/60 font-[var(--font-inter)] italic mt-1.5">
              {mantra.effect}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
