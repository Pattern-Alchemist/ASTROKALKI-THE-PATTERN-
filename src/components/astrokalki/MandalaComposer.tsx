'use client';

import { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * MandalaComposer — Sacred Geometry Mandala Composer
 *
 * A live mandala generator with controls for:
 *   - Petal count (4 / 8 / 12 / 16 / 24)
 *   - Inner symbol (Bindu, Yantra, Lotus, Shatkona, Trikona)
 *   - Outer ring (none / 1 ring / 3 rings / concentric squares)
 *   - Color palette (5 Vedic palettes)
 *
 * Renders an SVG mandala in real-time. "Download SVG" exports the
 * current composition as a .svg file.
 */

type PetalCount = 4 | 8 | 12 | 16 | 24;
type InnerSymbol = 'bindu' | 'yantra' | 'lotus' | 'shatkona' | 'trikona';
type OuterRing = 'none' | 'single' | 'triple' | 'squares';
type PaletteId = 'gold' | 'vermillion' | 'soma' | 'agni' | 'indigo';

const PALETTES: Record<PaletteId, { name: string; primary: string; secondary: string; tertiary: string; bg: string }> = {
  gold: { name: 'Surya Gold', primary: '#c9a96e', secondary: '#d4b87a', tertiary: '#8a8078', bg: '#0a0a0a' },
  vermillion: { name: 'Sindoor', primary: '#c95032', secondary: '#d47045', tertiary: '#8a3a2a', bg: '#0a0807' },
  soma: { name: 'Soma Moon', primary: '#a0b5c9', secondary: '#c0cdd9', tertiary: '#6a7a8a', bg: '#080a0d' },
  agni: { name: 'Agni Fire', primary: '#e0a040', secondary: '#c97030', tertiary: '#9a3030', bg: '#0d0805' },
  indigo: { name: 'Krishna Indigo', primary: '#4a4a8a', secondary: '#6a6aaa', tertiary: '#3a3a6a', bg: '#08080d' },
};

const PETAL_OPTIONS: PetalCount[] = [4, 8, 12, 16, 24];
const INNER_SYMBOLS: { id: InnerSymbol; name: string }[] = [
  { id: 'bindu', name: 'Bindu (Point)' },
  { id: 'yantra', name: 'Yantra (Square+Circle)' },
  { id: 'lotus', name: 'Lotus' },
  { id: 'shatkona', name: 'Shatkona (Hexagram)' },
  { id: 'trikona', name: 'Trikona (Triangle)' },
];
const OUTER_RINGS: { id: OuterRing; name: string }[] = [
  { id: 'none', name: 'None' },
  { id: 'single', name: 'Single Ring' },
  { id: 'triple', name: 'Triple Ring' },
  { id: 'squares', name: 'Concentric Squares' },
];

export default function MandalaComposer() {
  const [petals, setPetals] = useState<PetalCount>(12);
  const [symbol, setSymbol] = useState<InnerSymbol>('lotus');
  const [ring, setRing] = useState<OuterRing>('triple');
  const [palette, setPalette] = useState<PaletteId>('gold');
  const svgRef = useRef<SVGSVGElement | null>(null);

  const colors = PALETTES[palette];

  const mandalaSVG = useMemo(() => {
    const elements: string[] = [];
    const cx = 100, cy = 100;
    const petalR = 65;
    const petalLen = 30;

    // Background
    elements.push(`<circle cx="${cx}" cy="${cy}" r="95" fill="${colors.bg}" />`);

    // Outer rings
    if (ring === 'single') {
      elements.push(`<circle cx="${cx}" cy="${cy}" r="92" fill="none" stroke="${colors.primary}" stroke-width="0.5" opacity="0.7" />`);
    } else if (ring === 'triple') {
      [92, 88, 84].forEach((r, i) => {
        elements.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors.primary}" stroke-width="0.4" opacity="${0.7 - i * 0.15}" />`);
      });
    } else if (ring === 'squares') {
      // Rotated squares
      [0, 22.5, 45].forEach((rot, i) => {
        const half = 85 - i * 6;
        elements.push(`<rect x="${cx - half}" y="${cy - half}" width="${half * 2}" height="${half * 2}" fill="none" stroke="${colors.primary}" stroke-width="0.4" opacity="0.6" transform="rotate(${rot} ${cx} ${cy})" />`);
      });
    }

    // Petals
    for (let i = 0; i < petals; i++) {
      const angle = (i / petals) * 360;
      const angleRad = (angle * Math.PI) / 180;
      const x1 = cx + petalR * Math.cos(angleRad);
      const y1 = cy + petalR * Math.sin(angleRad);
      const x2 = cx + (petalR + petalLen) * Math.cos(angleRad);
      const y2 = cy + (petalR + petalLen) * Math.sin(angleRad);
      // Ellipse petal
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      elements.push(`<ellipse cx="${midX}" cy="${midY}" rx="${petalLen / 2}" ry="${(2 * Math.PI * petalR) / petals / 2.5}" fill="${colors.secondary}" fill-opacity="0.25" stroke="${colors.primary}" stroke-width="0.4" transform="rotate(${angle} ${midX} ${midY})" />`);
    }

    // Petal ring (where petals connect)
    elements.push(`<circle cx="${cx}" cy="${cy}" r="${petalR}" fill="none" stroke="${colors.primary}" stroke-width="0.5" opacity="0.8" />`);

    // Inner symbol
    if (symbol === 'bindu') {
      elements.push(`<circle cx="${cx}" cy="${cy}" r="8" fill="${colors.primary}" opacity="0.7" />`);
      elements.push(`<circle cx="${cx}" cy="${cy}" r="3" fill="${colors.tertiary}" />`);
    } else if (symbol === 'yantra') {
      elements.push(`<circle cx="${cx}" cy="${cy}" r="35" fill="none" stroke="${colors.primary}" stroke-width="0.6" />`);
      elements.push(`<rect x="${cx - 25}" y="${cy - 25}" width="50" height="50" fill="none" stroke="${colors.primary}" stroke-width="0.6" />`);
      elements.push(`<circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="${colors.secondary}" stroke-width="0.4" />`);
    } else if (symbol === 'lotus') {
      for (let i = 0; i < 8; i++) {
        const angle = i * 45;
        const angleRad = (angle * Math.PI) / 180;
        const midX = cx + 20 * Math.cos(angleRad);
        const midY = cy + 20 * Math.sin(angleRad);
        elements.push(`<ellipse cx="${midX}" cy="${midY}" rx="20" ry="8" fill="none" stroke="${colors.primary}" stroke-width="0.5" transform="rotate(${angle} ${midX} ${midY})" />`);
      }
      elements.push(`<circle cx="${cx}" cy="${cy}" r="6" fill="${colors.primary}" opacity="0.5" />`);
    } else if (symbol === 'shatkona') {
      elements.push(`<polygon points="${cx},${cy - 30} ${cx + 26},${cy + 15} ${cx - 26},${cy + 15}" fill="none" stroke="${colors.primary}" stroke-width="0.6" />`);
      elements.push(`<polygon points="${cx},${cy + 30} ${cx + 26},${cy - 15} ${cx - 26},${cy - 15}" fill="none" stroke="${colors.secondary}" stroke-width="0.6" />`);
    } else if (symbol === 'trikona') {
      elements.push(`<polygon points="${cx},${cy - 30} ${cx + 26},${cy + 15} ${cx - 26},${cy + 15}" fill="${colors.primary}" fill-opacity="0.15" stroke="${colors.primary}" stroke-width="0.6" />`);
    }

    return elements.join('\n      ');
  }, [petals, symbol, ring, colors]);

  const downloadSVG = () => {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="800" height="800" ref="${svgRef}">\n      ${mandalaSVG}\n    </svg>`;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mandala-${palette}-${petals}p-${symbol}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-white/[0.04] p-5 md:p-6 bg-[#0a0a0a]/50">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-[#c9a96e]/40 rounded-full" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-[#c9a96e]/60 font-[var(--font-inter)] font-medium">
          Sacred Geometry Studio
        </span>
      </div>
      <p className="font-[var(--font-cormorant)] text-lg text-[#f5f3f0] font-bold mb-1">Mandala Composer</p>
      <p className="text-[10px] text-[#8a8078] font-[var(--font-inter)] font-light mb-4">
        Compose your own yantra. Each parameter combination produces a distinct resonance. Sit with what you make.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-5">
        {/* Live preview */}
        <div className="border border-white/[0.04] bg-[#050505] p-4 flex items-center justify-center">
          <motion.svg
            ref={svgRef as any}
            viewBox="0 0 200 200"
            className="w-full max-w-[280px] aspect-square"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            dangerouslySetInnerHTML={{ __html: mandalaSVG }}
          />
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Palette */}
          <div>
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
              Palette · {colors.name}
            </span>
            <div className="grid grid-cols-5 gap-1.5">
              {(Object.keys(PALETTES) as PaletteId[]).map(p => (
                <button
                  key={p}
                  onClick={() => setPalette(p)}
                  className={`aspect-square border transition-all duration-200 ${
                    palette === p ? 'border-[#c9a96e] scale-110' : 'border-white/[0.04] hover:border-white/[0.1]'
                  }`}
                  style={{ background: PALETTES[p].primary }}
                  aria-label={`Select ${PALETTES[p].name} palette`}
                  title={PALETTES[p].name}
                />
              ))}
            </div>
          </div>

          {/* Petals */}
          <div>
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
              Petal Count
            </span>
            <div className="grid grid-cols-5 gap-1">
              {PETAL_OPTIONS.map(p => (
                <button
                  key={p}
                  onClick={() => setPetals(p)}
                  className={`py-1.5 text-[9px] font-[var(--font-inter)] font-medium border transition-all ${
                    petals === p
                      ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5'
                      : 'border-white/[0.04] text-[#8a8078]/60 hover:border-white/[0.08]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Inner symbol */}
          <div>
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
              Inner Symbol
            </span>
            <div className="space-y-1">
              {INNER_SYMBOLS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSymbol(s.id)}
                  className={`w-full text-left py-1.5 px-2 text-[9px] font-[var(--font-inter)] border transition-all ${
                    symbol === s.id
                      ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5'
                      : 'border-white/[0.04] text-[#8a8078]/60 hover:border-white/[0.08]'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Outer ring */}
          <div>
            <span className="text-[8px] tracking-[0.2em] uppercase text-[#8a8078]/50 font-[var(--font-inter)] block mb-2">
              Outer Ring
            </span>
            <div className="grid grid-cols-2 gap-1">
              {OUTER_RINGS.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRing(r.id)}
                  className={`py-1.5 text-[8px] font-[var(--font-inter)] font-medium border transition-all ${
                    ring === r.id
                      ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5'
                      : 'border-white/[0.04] text-[#8a8078]/60 hover:border-white/[0.08]'
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>

          {/* Download */}
          <button
            onClick={downloadSVG}
            className="w-full px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-[var(--font-inter)] font-medium border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all duration-300"
          >
            ↓ Download SVG
          </button>
        </div>
      </div>
    </div>
  );
}
