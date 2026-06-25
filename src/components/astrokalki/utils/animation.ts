/**
 * AstroKalki — Shared Animation Utilities
 * Spring physics, easing curves, stagger variants, and motion helpers.
 */

// ─── Easing Curves ────────────────────────────────────────────
export const EASE = {
  /** Deceleration curve for headline entries — snappy yet smooth */
  outExpo: [0.16, 1, 0.3, 1] as const,
  /** Legacy easeOutExpo variant (used in existing components) */
  outExpoLegacy: [0.22, 1, 0.36, 1] as const,
  /** Smooth deceleration for image reveals */
  outQuad: [0.25, 0.46, 0.45, 0.94] as const,
  /** Snappy ease for micro-interactions */
  outBack: [0.34, 1.56, 0.64, 1] as const,
};

// ─── Spring Presets ────────────────────────────────────────────
export const SPRING = {
  /** Gentle settling — CTAs, hero elements */
  gentle: { type: 'spring' as const, stiffness: 120, damping: 18, mass: 1 },
  /** Snappy pop — buttons, badges, hover states */
  snappy: { type: 'spring' as const, stiffness: 300, damping: 25, mass: 0.8 },
  /** Bouncy reveal — cards, list items */
  bouncy: { type: 'spring' as const, stiffness: 200, damping: 20, mass: 0.9 },
  /** Stiff & precise — accordion panels, drawer open/close */
  stiff: { type: 'spring' as const, stiffness: 400, damping: 30, mass: 1 },
  /** Cinematic float — loader exit, hero background */
  cinematic: { type: 'spring' as const, stiffness: 60, damping: 15, mass: 1.2 },
};

// ─── Framer Motion Variants ───────────────────────────────────

/** Fade + slide-up with stagger via parent container */
export const staggerContainer = (staggerDelay: number = 0.08) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
});

/** Child item for staggerContainer — fade up */
export const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...SPRING.gentle },
  },
};

/** Child item for staggerContainer — fade in (no slide) */
export const fadeInItem = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

/** Hero cascade — orchestrated from top to bottom */
export const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 2.1,
    },
  },
};

/** Hero child variant — fade + slide with spring */
export const heroChild = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...SPRING.gentle },
  },
};

/** Hero headline — heavier entry */
export const heroHeadline = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...SPRING.cinematic },
  },
};

// ─── Hover Micro-interactions ──────────────────────────────────

/** Premium CTA hover — subtle lift + scale */
export const ctaHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -1,
    transition: { ...SPRING.snappy },
  },
};

/** Card hover — subtle lift */
export const cardHover = {
  rest: { y: 0 },
  hover: {
    y: -2,
    transition: { ...SPRING.gentle },
  },
};

// ─── Utility ──────────────────────────────────────────────────

/** Generates stagger delay for array items */
export const stagger = (index: number, base: number = 0.06): number => index * base;

/** Alternate stagger from corners (0, 3, 1, 2) for 2x2 grid */
export const cornerStagger = [0, 2, 1, 3];

/** Corner stagger delay calculator */
export const cornerDelay = (index: number, base: number = 0.1): number => cornerStagger[index] * base;
