/**
 * SomaticSync — Lightweight event bus for Breath↔Soundscape coupling
 * 
 * BreathPacer emits phase changes → AmbientSoundscape reads them
 * to modulate its lowpass filter frequency in real-time.
 * 
 * This creates a closed-loop somatic feedback system:
 * breathing cadence directly shapes the sonic environment.
 */

type Listener = (data: BreathSyncData) => void;

export interface BreathSyncData {
  phase: 'inhale' | 'hold' | 'exhale' | 'rest';
  progress: number; // 0-1 within current phase
  pattern: 'box' | 'vayu' | 'tejas';
  cycleCount: number;
  isActive: boolean;
}

class SomaticSyncBus {
  private listeners: Set<Listener> = new Set();
  private lastData: BreathSyncData | null = null;

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    // Send current state immediately
    if (this.lastData) fn(this.lastData);
    return () => this.listeners.delete(fn);
  }

  emit(data: BreathSyncData) {
    this.lastData = data;
    this.listeners.forEach(fn => fn(data));
  }

  getLast(): BreathSyncData | null {
    return this.lastData;
  }
}

// Singleton — shared across BreathPacer and AmbientSoundscape
export const somaticSync = new SomaticSyncBus();
