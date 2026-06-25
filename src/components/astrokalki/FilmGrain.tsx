/**
 * AstroKalki — FilmGrain Component
 * Extracted from 5 components that duplicated the same SVG feTurbulence overlay.
 * Renders a subtle grain texture at configurable opacity.
 */

interface FilmGrainProps {
  /** Opacity level — default 0.06 for most sections, 0.08 for PatternMosaic */
  opacity?: number;
  /** Additional CSS classes */
  className?: string;
}

export default function FilmGrain({ opacity = 0.06, className = '' }: FilmGrainProps) {
  return (
    <div
      className={`absolute inset-0 mix-blend-overlay pointer-events-none z-[1] ${className}`}
      style={{
        opacity,
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
      }}
      aria-hidden="true"
    />
  );
}
