// Pure client-side Web Audio synthesizer for neuro-acoustic regulation
// No external MP3 downloads or network dependencies

class AudioEngine {
  private ctx: AudioContext | null = null;
  private currentSource: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private activeMode: 'alpha' | 'gamma' | 'brown' | 'none' = 'none';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getActiveMode(): string {
    return this.activeMode;
  }

  public stop() {
    if (this.gainNode && this.ctx) {
      // Gentle fade out
      this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
      setTimeout(() => {
        try {
          if (this.currentSource) {
            (this.currentSource as AudioBufferSourceNode).stop?.();
            this.currentSource.disconnect();
            this.currentSource = null;
          }
        } catch {
          // ignore cleanup errors
        }
        this.activeMode = 'none';
      }, 250);
    } else {
      this.activeMode = 'none';
    }
  }

  public playChime() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, this.ctx.currentTime); // 528 Hz restorative tone
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 1.5);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.5);
    } catch {
      // Audio might fail if user has not interacted
    }
  }

  public startBrownNoise(volume = 0.25) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown noise integration
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Gentle low-pass filter to make it deeply soothing
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.3);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noiseSource.start();
    this.currentSource = noiseSource;
    this.gainNode = gain;
    this.activeMode = 'brown';
  }

  public startAlphaFlow(volume = 0.2) {
    // 10 Hz Alpha frequency modulation on a warm 216 Hz carrier
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    const carrier = this.ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(216, this.ctx.currentTime);

    // 10 Hz LFO to modulate amplitude gently (simulating alpha synchrony)
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(10, this.ctx.currentTime); // 10 Hz Alpha

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    masterGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.3);

    lfo.connect(carrier.frequency);
    carrier.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    carrier.start();
    lfo.start();

    this.currentSource = carrier;
    this.gainNode = masterGain;
    this.activeMode = 'alpha';
  }

  public startGammaFocus(volume = 0.15) {
    // 40 Hz Gamma pulse for high-level central executive binding
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    const carrier = this.ctx.createOscillator();
    carrier.type = 'triangle';
    carrier.frequency.setValueAtTime(160, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(40, this.ctx.currentTime); // 40 Hz Gamma

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    masterGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.3);

    lfo.connect(carrier.frequency);
    carrier.connect(masterGain);
    masterGain.connect(this.ctx.destination);

    carrier.start();
    lfo.start();

    this.currentSource = carrier;
    this.gainNode = masterGain;
    this.activeMode = 'gamma';
  }
}

export const audioEngine = new AudioEngine();
