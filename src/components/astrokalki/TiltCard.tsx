'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from './hooks/useReducedMotion';

/**
 * TiltCard — Cursor-aware 3D tilt interaction
 * 
 * Features:
 * - Tracks mouse position within card to calculate 3D rotation
 * - Spring physics for natural deceleration on mouse leave
 * - Subtle gold glare/shine effect that follows cursor
 * - Respects prefers-reduced-motion (disables tilt entirely)
 * - Keyboard-accessible: tilt disabled for keyboard users
 * - Configurable tilt intensity and glare
 */

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees — default 6 */
  maxTilt?: number;
  /** Glare intensity 0-1 — default 0.06 */
  glareIntensity?: number;
  /** Scale on hover — default 1.01 */
  hoverScale?: number;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  glareIntensity = 0.06,
  hoverScale = 1.01,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  // Motion values for raw rotation
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);

  // Spring-smoothed rotation for natural feel
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 25, mass: 0.5 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 25, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized position -1 to 1
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);

      // Rotate Y follows X cursor, Rotate X follows Y cursor (inverted for natural feel)
      rotateYRaw.set(normalizedX * maxTilt);
      rotateXRaw.set(-normalizedY * maxTilt);

      // Update glare position (percentage 0-100)
      const percentX = ((e.clientX - rect.left) / rect.width) * 100;
      const percentY = ((e.clientY - rect.top) / rect.height) * 100;
      setGlarePos({ x: percentX, y: percentY });
    },
    [prefersReduced, maxTilt, rotateXRaw, rotateYRaw]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    // Spring back to neutral
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }, [rotateXRaw, rotateYRaw]);

  // If reduced motion, render without tilt
  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={{
        scale: isHovering ? hoverScale : 1,
      }}
      transition={{ scale: { type: 'spring', stiffness: 300, damping: 25 } }}
      className={className}
    >
      {children}

      {/* Glare overlay — follows cursor position */}
      {isHovering && glareIntensity > 0 && (
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(201, 169, 110, ${glareIntensity}), transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}
