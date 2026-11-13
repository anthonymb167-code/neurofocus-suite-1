import React, { useState, useEffect } from 'react';
import { audioEngine } from '../utils/audioEngine.ts';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Waves,
  Sparkles,
  Zap,
  Activity,
  Heart,
  Wind,
  ShieldCheck
} from 'lucide-react';

export const AudioRegulator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<string>('none');
  const [nsdrActive, setNsdrActive] = useState<boolean>(false);
  const [nsdrTimer, setNsdrTimer] = useState<number>(600); // 10 minutes default
  const [sighPhase, setSighPhase] = useState<'Inhale 1 (Nose)' | 'Inhale 2 (Sniff)' | 'Long Exhale (Mouth)'>('Inhale 1 (Nose)');

  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  const handleStartMode = (mode: 'alpha' | 'gamma' | 'brown') => {
    if (activeMode === mode) {
      audioEngine.stop();
      setActiveMode('none');
    } else {
      if (mode === 'brown') audioEngine.startBrownNoise();
      else if (mode === 'alpha') audioEngine.startAlphaFlow();
      else if (mode === 'gamma') audioEngine.startGammaFocus();
      setActiveMode(mode);
    }
  };

  const handleStopAll = () => {
    audioEngine.stop();
    setActiveMode('none');
  };

  // Physiological sigh breath rhythm: 3s inhale 1, 1s quick sniff, 6s slow exhale
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (nsdrActive) {
      interval = setInterval(() => {
        setNsdrTimer((prev) => {
          if (prev <= 1) {
            setNsdrActive(false);
            audioEngine.playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [nsdrActive]);

  useEffect(() => {
    if (!nsdrActive) return;
    const cycle = (600 - nsdrTimer) % 10;
    if (cycle < 3) setSighPhase('Inhale 1 (Nose)');
    else if (cycle < 4) setSighPhase('Inhale 2 (Sniff)');
    else setSighPhase('Long Exhale (Mouth)');
  }, [nsdrActive, nsdrTimer]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>AUTONOMIC NEURO-REGULATION</span>
          <span aria-hidden="true">·</span>
          <span>ACOUSTIC ENTRAINMENT</span>
          <span aria-hidden="true">·</span>
          <span>VAGAL BRAKE PRIMING</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-100">
          Acoustic & Vagal Priming Console
        </h1>
        <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
          Pre-priming the nervous system prior to cognitive work cools down the Hypothalamic-Pituitary-Adrenal (HPA) axis and halts cortisol secretion, preventing the emergency firewall from blocking executive retrieval.
        </p>
      </div>

      {/* Web Audio Synthesizer Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Panel 1: Brown Noise */}
        <div
          className={`p-6 rounded-2xl border transition-all ${
            activeMode === 'brown'
              ? 'bg-slate-900 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-cyan-400">DMN SUPPRESSION</span>
            <div className={`w-2.5 h-2.5 rounded-full ${activeMode === 'brown' ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'}`} />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Deep Brown Noise</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Brownian random integrated noise with a 400Hz low-pass filter. Blurs intrusive Default Mode Network rumination and dampens ambient startle reflexes.
          </p>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Pure Web Audio Synth</span>
            <button
              onClick={() => handleStartMode('brown')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeMode === 'brown'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                  : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
              }`}
            >
              {activeMode === 'brown' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{activeMode === 'brown' ? 'Stop Noise' : 'Play Brown Noise'}</span>
            </button>
          </div>
        </div>

        {/* Panel 2: 10Hz Alpha Waves */}
        <div
          className={`p-6 rounded-2xl border transition-all ${
            activeMode === 'alpha'
              ? 'bg-slate-900 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-cyan-400">RELAXED FLOW COUPLING</span>
            <div className={`w-2.5 h-2.5 rounded-full ${activeMode === 'alpha' ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'}`} />
          </div>
          <h3 className="text-lg font-bold text-slate-100">10 Hz Alpha Entrainment</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Alpha frequency oscillation across a 216Hz carrier wave. Induces an alert yet calm somatic state, ideal for lateral conceptual synthesis and writing.
          </p>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">10 Hz LFO Binaural</span>
            <button
              onClick={() => handleStartMode('alpha')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeMode === 'alpha'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                  : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
              }`}
            >
              {activeMode === 'alpha' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{activeMode === 'alpha' ? 'Stop Tone' : 'Play Alpha Tone'}</span>
            </button>
          </div>
        </div>

        {/* Panel 3: 40Hz Gamma Focus */}
        <div
          className={`p-6 rounded-2xl border transition-all ${
            activeMode === 'gamma'
              ? 'bg-slate-900 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
              : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-cyan-400">EXECUTIVE SYNAPSE BINDING</span>
            <div className={`w-2.5 h-2.5 rounded-full ${activeMode === 'gamma' ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'}`} />
          </div>
          <h3 className="text-lg font-bold text-slate-100">40 Hz Gamma Focus</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            40 Hz harmonic pulses stimulate synchronous pyramidal interneuron firing in the prefrontal cortex, reinforcing long-term potentiation during complex tasks.
          </p>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">40 Hz Pulse</span>
            <button
              onClick={() => handleStartMode('gamma')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeMode === 'gamma'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                  : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
              }`}
            >
              {activeMode === 'gamma' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{activeMode === 'gamma' ? 'Stop Tone' : 'Play Gamma Pulse'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Physiological Sigh & NSDR Autonomic Reset Studio */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400">VAGAL BRAKE PROTOCOL</span>
            <h2 className="text-xl font-bold text-slate-100 mt-0.5">The Physiological Sigh Reset</h2>
            <p className="text-xs text-slate-400 mt-1">
              Two deep inhalations through the nose followed by a prolonged, unforced exhalation through the mouth. The fastest biological lever to deflate alveolar tension and lower resting heart rate.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (nsdrActive) setNsdrActive(false);
                else {
                  setNsdrActive(true);
                  if (nsdrTimer === 0) setNsdrTimer(600);
                }
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
            >
              {nsdrActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{nsdrActive ? 'Pause Sigh Rhythm' : 'Engage 10m Autonomic Reset'}</span>
            </button>
          </div>
        </div>

        {/* Breathing Visual Sphere */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div
            className={`w-40 h-40 rounded-full border-2 transition-all duration-1000 flex items-center justify-center ${
              sighPhase.includes('Inhale 1')
                ? 'border-cyan-400 scale-110 bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.25)]'
                : sighPhase.includes('Inhale 2')
                ? 'border-cyan-300 scale-125 bg-cyan-400/20'
                : 'border-indigo-400 scale-90 bg-indigo-500/10'
            }`}
          >
            <div className="text-center px-2">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
                {nsdrActive ? sighPhase : 'Ready'}
              </div>
              <div className="text-lg font-mono font-bold text-slate-100 tabular-nums">
                {Math.floor(nsdrTimer / 60)}:
                {(nsdrTimer % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="max-w-md text-center text-xs text-slate-400 leading-relaxed">
            <p>
              Perform 2 to 3 consecutive physiological sighs whenever you notice error-monitoring panic or the feeling that "my brain has locked up." The physical drop in thoracic pressure instantly reactivates parasympathetic innervation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
