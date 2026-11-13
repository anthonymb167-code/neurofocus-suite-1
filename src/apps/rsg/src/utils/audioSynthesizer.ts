/**
 * Web Audio API Synthesizer for RSG Cognitive Terminal
 * Generates acoustic harmonics, audit timing cues, resonant string frequencies, and shield pulses.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazily initialized on first user gesture to comply with browser autoplay policies
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Play a clean sine tone with an exponential envelope
   */
  public playTone(freq: number, duration: number = 0.2, type: OscillatorType = 'sine', gainVal: number = 0.15) {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback silent
    }
  }

  /**
   * Simulates plucking a resonant string in 1080p mode
   */
  public pluckString(baseFreq: number = 432, tension: number = 0.8) {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const harmonics = [1, 2, 3, 4, 5];
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.25, now);
      masterGain.connect(ctx.destination);

      harmonics.forEach((h, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = index === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(baseFreq * h, now);

        const decay = Math.max(0.2, (1.8 / (h * 0.8)) * tension);
        gain.gain.setValueAtTime(0.12 / h, now);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + decay);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + decay);
      });
    } catch {
      // Audio fallback
    }
  }

  /**
   * Audit cue for phase transitions
   */
  public playPhaseCue(phaseNumber: number) {
    if (this.isMuted) return;
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const base = freqs[phaseNumber - 1] || 659.25;
    this.playTone(base, 0.35, 'triangle', 0.2);
    setTimeout(() => {
      this.playTone(base * 1.5, 0.4, 'sine', 0.15);
    }, 120);
  }

  /**
   * Countdown tick
   */
  public playTick(subtle: boolean = false) {
    if (this.isMuted) return;
    this.playTone(subtle ? 880 : 1200, 0.05, 'sine', subtle ? 0.04 : 0.08);
  }

  /**
   * Laser-lock or anchor target cue
   */
  public playLaserLock() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.15);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Shield deflection cue
   */
  public playShieldDeflect() {
    if (this.isMuted) return;
    this.playTone(320, 0.1, 'square', 0.08);
    setTimeout(() => {
      this.playTone(640, 0.2, 'sine', 0.12);
    }, 80);
  }

  /**
   * Nightly Glymphatic Purge Stream
   */
  public playPurgeStream() {
    if (this.isMuted) return;
    const freqs = [880, 784, 659, 523, 440];
    freqs.forEach((f, i) => {
      setTimeout(() => {
        this.playTone(f, 0.5, 'sine', 0.1 - i * 0.015);
      }, i * 140);
    });
  }
}

export const sound = new AudioSynthesizer();
