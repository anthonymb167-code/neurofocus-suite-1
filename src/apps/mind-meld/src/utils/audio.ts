/**
 * Ambient Soundscape & Somatic Audio Engine (Web Audio API)
 * Generates an atmospheric, gentle, and deep meditative theta wave drone (432Hz baseline)
 * completely client-side with zero external assets.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.15; // subtle default

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    try {
      this.initContext();
      if (!this.ctx) return;

      this.stop();

      // Master gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(
        this.volume,
        this.ctx.currentTime + 3
      );

      // Low-pass filter for warmth
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(320, this.ctx.currentTime);

      // Oscillator 1: 108Hz (subharmonic of 432Hz)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(108, this.ctx.currentTime);

      // Oscillator 2: 114Hz (6Hz difference produces 6Hz Theta wave binaural beat)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(114, this.ctx.currentTime);

      // Connect graph
      this.osc1.connect(this.filterNode);
      this.osc2.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn('Audio could not be initialized:', e);
    }
  }

  public stop() {
    if (this.ctx && this.gainNode && this.isPlaying) {
      try {
        this.gainNode.gain.exponentialRampToValueAtTime(
          0.0001,
          this.ctx.currentTime + 1.5
        );
        setTimeout(() => {
          this.osc1?.stop();
          this.osc2?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
          this.osc1 = null;
          this.osc2 = null;
          this.isPlaying = false;
        }, 1500);
      } catch (e) {
        this.isPlaying = false;
      }
    } else {
      this.isPlaying = false;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.ctx && this.gainNode && this.isPlaying) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Subtle acoustic pulse when a spark fires or a step settles
  public playSparkChime() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, this.ctx.currentTime); // 528Hz clarity frequency
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {
      // Audio autoplay policy
    }
  }
}

export const ambientSound = new AmbientSoundEngine();
