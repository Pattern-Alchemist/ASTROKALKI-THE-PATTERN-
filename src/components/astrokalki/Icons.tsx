export const EclipseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2 A 10 10 0 0 1 12 22" fill="currentColor" stroke="none" />
  </svg>
);

export const MirrorIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <ellipse cx="12" cy="12" rx="6" ry="10" />
    <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="2 2" />
  </svg>
);

export const PathIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <path d="M4 20 C 8 20, 8 4, 12 4 C 16 4, 16 20, 20 20" />
    <circle cx="4" cy="20" r="2" fill="currentColor" />
    <circle cx="20" cy="20" r="2" fill="currentColor" />
  </svg>
);

export const ThreadIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <path d="M3 18 C 8 18, 10 12, 12 12 C 14 12, 16 6, 21 6" />
    <path d="M3 6 C 8 6, 10 12, 12 12 C 14 12, 16 18, 21 18" strokeDasharray="2 4" />
  </svg>
);

export const WarriorIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <path d="M12 2 L15 8 L22 9 L17 14 L18 21 L12 18 L6 21 L7 14 L2 9 L9 8 Z" />
  </svg>
);

export const GoldenThreadIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <path d="M2 12 C 6 8, 10 16, 14 12 C 18 8, 22 16, 22 12" />
    <circle cx="2" cy="12" r="1.5" fill="currentColor" />
    <circle cx="22" cy="12" r="1.5" fill="currentColor" />
  </svg>
);
