import React, { useState, useEffect, useRef } from 'react';
import { Compass, Clock, Zap, Waves, Cpu, Sparkles, Sliders, Volume2, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audioSynthesizer';

export const HyperDimensions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'4d' | 'parallel' | 'density' | 'strings' | 'laminar' | 'root_cause'>('4d');

  const tabs = [
    { id: '4d', label: '1. 3D to 4D Temporal Thinking' },
    { id: 'parallel', label: '2. High-Speed Parallel Realities' },
    { id: 'density', label: '3. Data Density (360p vs 1080p)' },
    { id: 'strings', label: '4. Resonant String Plucker' },
    { id: 'laminar', label: '5. Laminar vs Turbulent Flow' },
    { id: 'root_cause', label: '6. Root-Cause Translucency' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>HIGH-RESOLUTION OVERLAYS // EXTREME COGNITIVE MODES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Cognitive Hyper-Dimensions
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Six extreme operating states of the Ruthless Simulator Genome: temporal 4D projection, parallel reality processing, data density calibration, resonant acoustic interfaces, laminar logic curves, and atomic root-cause dissolution.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              sound.playTick(true);
            }}
            className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Dimension Panel */}
      <div className="rounded-xl border border-slate-800 bg-[#0B0E17] p-6 lg:p-8">
        {activeTab === '4d' && <TemporalThinkingSimulator />}
        {activeTab === 'parallel' && <ParallelRealitiesSimulator />}
        {activeTab === 'density' && <DataDensityComparator />}
        {activeTab === 'strings' && <ResonantStringInterface />}
        {activeTab === 'laminar' && <LaminarFlowSimulator />}
        {activeTab === 'root_cause' && <RootCauseTranslucency />}
      </div>
    </div>
  );
};

/* =========================================================================
   1. 3D to 4D Thinking (Temporal Projection Engine)
   ========================================================================= */
const TemporalThinkingSimulator: React.FC = () => {
  const [temporalTime, setTemporalTime] = useState<number>(0); // -10 to +10 years
  const [selectedEntity, setSelectedEntity] = useState<'enterprise' | 'organism' | 'mind'>('enterprise');

  const entities = {
    enterprise: {
      past: 'Raw idea, high entropy, zero market presence, chaotic resource burn.',
      present: 'Current functioning company, revenue engine, operational friction points.',
      future: 'Autonomous ecosystem or technological obsolescence based on current vector trajectory.',
      temporalTube: 'Spatiotemporal manifold showing resource flows from genesis to terminal state.',
    },
    organism: {
      past: 'Pre-embryonic stem cell code, maternal nutrition inputs, infantile precognition.',
      present: 'Current metabolic state, cellular repair balance, lactate/glucose ratio.',
      future: 'Telomere maintenance vs systemic degeneration based on insulin momentum and mineral balance.',
      temporalTube: 'Continuous bio-energetic conduit spanning birth, peak performance, and genetic transfer.',
    },
    mind: {
      past: 'Early conditioning, trauma static, initial cached beliefs.',
      present: 'Current observer state, thinking frame rate, 360p vs 1080p resolution filter.',
      future: 'Unified master coder operating at wisdom (#30) with zero external static infection.',
      temporalTube: 'The Observer’s unbroken thread of awareness running through time without decay.',
    },
  };

  const current = entities[selectedEntity];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>3D vs 4D Temporal Projection</span>
            <span className="text-xs font-mono text-cyan-400 font-normal">// Seeing Time as Substance</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            3D thinking sees only a static snapshot. 4D thinking sees the full spatiotemporal tube from origin to future collision.
          </p>
        </div>

        {/* Entity Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedEntity('enterprise')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              selectedEntity === 'enterprise' ? 'bg-cyan-400 text-slate-950 font-semibold' : 'text-slate-400'
            }`}
          >
            Enterprise
          </button>
          <button
            onClick={() => setSelectedEntity('organism')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              selectedEntity === 'organism' ? 'bg-cyan-400 text-slate-950 font-semibold' : 'text-slate-400'
            }`}
          >
            Bio-Organism
          </button>
          <button
            onClick={() => setSelectedEntity('mind')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              selectedEntity === 'mind' ? 'bg-cyan-400 text-slate-950 font-semibold' : 'text-slate-400'
            }`}
          >
            Mind Engine
          </button>
        </div>
      </div>

      {/* Interactive Simulation Slider */}
      <div className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">PAST (-10 Years)</span>
          <span className="text-cyan-400 font-bold text-sm">
            {temporalTime < 0
              ? `T ${temporalTime} Years (Causal Foundation)`
              : temporalTime === 0
              ? 'T = 0 (Present Cross-Section)'
              : `T +${temporalTime} Years (Temporal Projection)`}
          </span>
          <span className="text-slate-400">FUTURE (+10 Years)</span>
        </div>

        <input
          type="range"
          min="-10"
          max="10"
          value={temporalTime}
          onChange={(e) => {
            setTemporalTime(Number(e.target.value));
            sound.playTick(true);
          }}
          className="w-full accent-cyan-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
        />

        <div className="p-4 rounded-lg bg-[#07090E] border border-slate-800 text-xs">
          <div className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider mb-1">
            4D Spatiotemporal Tube State:
          </div>
          <p className="text-slate-200 leading-relaxed">
            {temporalTime < -2 ? current.past : temporalTime > 2 ? current.future : current.present}
          </p>
        </div>
      </div>

      {/* 3D vs 4D Comparison Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
          <div className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-2">
            Weak 3D Observer (Single Frame)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Locked in the momentary spatial coordinates. Assumes present conditions are permanent. Constantly blindsided by the future because they treat objects as static matter rather than flowing trajectories.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-800/60">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            RSG 4D Master (Full Temporal Tube)
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {current.temporalTube} You see where the object originated and its terminal collision 5 steps ahead. You step out of the trajectory before impact occurs.
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. High-Speed Parallel Realities Engine
   ========================================================================= */
const ParallelRealitiesSimulator: React.FC = () => {
  const [activeBranch, setActiveBranch] = useState<'alpha' | 'beta' | 'gamma'>('alpha');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [divergenceStep, setDivergenceStep] = useState<number>(3);

  const branches = {
    alpha: {
      name: 'Branch Alpha (Laminar Path)',
      description: 'Zero resistance: applies root-cause translucent deconstruction to bypass emotional friction.',
      entropy: 'Low (0.12 J/K)',
      renderSpeed: '144 FPS',
      collisionRisk: '0.04%',
      outcome: 'System hardens into 1080p stable equilibrium.',
    },
    beta: {
      name: 'Branch Beta (Turbulent Collision)',
      description: 'Emotional static dominates: reacts to external conduits, generating severe cognitive friction.',
      entropy: 'High (0.89 J/K)',
      renderSpeed: '28 FPS (Lagging)',
      collisionRisk: '84.2%',
      outcome: 'System overheats and requires emergency autophagy reset.',
    },
    gamma: {
      name: 'Branch Gamma (Phase-Shift Resonance)',
      description: 'Selective permeability shield active: absorbs high-resolution node patches while deflecting noise.',
      entropy: 'Minimal (0.05 J/K)',
      renderSpeed: '120 FPS',
      collisionRisk: '1.2%',
      outcome: 'Hardware and software evolve simultaneously without friction.',
    },
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>High-Speed Thinking: Parallel Realities</span>
          <span className="text-xs font-mono text-cyan-400 font-normal">// Simultaneous Spacetime Branches</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Rendering 2 or 3 parallel causal trajectories for the same object in the same space and time, discovering divergence without cognitive delay.
        </p>
      </div>

      {/* Parallel Track Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(['alpha', 'beta', 'gamma'] as const).map((key) => {
          const b = branches[key];
          const isSelected = activeBranch === key;
          return (
            <button
              key={key}
              onClick={() => {
                setActiveBranch(key);
                sound.playTick();
              }}
              className={`p-4 rounded-lg text-left transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-md ring-1 ring-cyan-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                {b.name.split('(')[0]}
              </div>
              <div className="text-sm font-semibold text-white mt-1">
                {b.name.split('(')[1]?.replace(')', '') || 'Branch'}
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Entropy: {b.entropy}</span>
                <span className={key === 'beta' ? 'text-rose-400' : 'text-emerald-400'}>
                  {b.renderSpeed}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Branch Diagnostic HUD */}
      <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-cyan-400 uppercase">Parallel Branch Telemetry: {branches[activeBranch].name}</span>
          <span className="text-slate-400">Divergence Node: #{divergenceStep}</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {branches[activeBranch].description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800 text-xs font-mono">
          <div>
            <div className="text-slate-500 uppercase">Collision Probability</div>
            <div className={`text-base font-bold tabular-nums ${activeBranch === 'beta' ? 'text-rose-400' : 'text-emerald-400'}`}>
              {branches[activeBranch].collisionRisk}
            </div>
          </div>
          <div>
            <div className="text-slate-500 uppercase">System Entropy</div>
            <div className="text-base font-bold text-white tabular-nums">
              {branches[activeBranch].entropy}
            </div>
          </div>
          <div>
            <div className="text-slate-500 uppercase">Render Velocity</div>
            <div className="text-base font-bold text-cyan-400 tabular-nums">
              {branches[activeBranch].renderSpeed}
            </div>
          </div>
        </div>

        <div className="p-3 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <strong className="text-cyan-300 font-mono">Terminal Outcome:</strong> {branches[activeBranch].outcome}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. Data Density: 360p Lie vs 1080p Truth
   ========================================================================= */
const DataDensityComparator: React.FC = () => {
  const [resolution, setResolution] = useState<number>(1080); // 360 to 1080

  const isLowRes = resolution < 600;
  const isMidRes = resolution >= 600 && resolution < 900;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Perception of Substance & Data Density</span>
          <span className="text-xs font-mono text-cyan-400 font-normal">// 360p Lie vs 1080p Truth</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Weak logic relies on low-resolution emotional watercolor. The RSG master renders reality at 1080p with mathematical gravity.
        </p>
      </div>

      {/* Interactive Resolution Slider */}
      <div className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className={isLowRes ? 'text-rose-400 font-bold' : 'text-slate-500'}>
            360p (Emotional Fog & Lie)
          </span>
          <span className="text-cyan-400 font-bold text-base tabular-nums">
            {resolution}p {resolution === 1080 ? '(Pure Invariant Truth)' : ''}
          </span>
          <span className={resolution >= 1000 ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
            1080p (Gravity Math)
          </span>
        </div>

        <input
          type="range"
          min="360"
          max="1080"
          step="30"
          value={resolution}
          onChange={(e) => {
            setResolution(Number(e.target.value));
            sound.playTick(true);
          }}
          className="w-full accent-cyan-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
        />

        {/* Visualized Comparison Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Simulated View Box */}
          <div
            className="p-5 rounded-lg border border-slate-800 transition-all flex flex-col justify-center min-h-[160px]"
            style={{
              filter: `blur(${Math.max(0, (1080 - resolution) / 140)}px)`,
              opacity: 0.4 + (resolution / 1080) * 0.6,
              backgroundColor: isLowRes ? '#1a0d14' : '#07090e',
            }}
          >
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              Internal Simulation Feed
            </div>
            <div className="text-sm font-semibold text-white">
              {isLowRes
                ? 'Truth is subjective... People are against me... I feel overwhelmed by events.'
                : isMidRes
                ? 'Variables are interacting. Need higher computational focus to de-stuff the root cause.'
                : 'F = G*(m1*m2)/r^2. Invariants mapped. Zero personal grievance; strictly physics.'}
            </div>
          </div>

          {/* Breakdown description */}
          <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2">
            <div className="text-[11px] font-mono text-slate-400 uppercase">
              Data Density Characteristics
            </div>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>
                  <strong>Signal-to-Noise Ratio:</strong> {Math.round((resolution / 1080) * 100)}%
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>
                  <strong>Susceptibility to Trauma Static:</strong> {Math.round((1 - resolution / 1080) * 100)}%
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>
                  <strong>Structural Rigor:</strong> {resolution >= 1000 ? 'Lossless Gravity Math' : 'Watercolor Guess'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. Resonant Handshaking Interface (String Plucker)
   ========================================================================= */
const ResonantStringInterface: React.FC = () => {
  const [activeFrequency, setActiveFrequency] = useState<number>(432);
  const [pluckedIndex, setPluckedIndex] = useState<number | null>(null);

  const strings = [
    { freq: 216, name: 'Sub-Harmonic Foundation', label: 'Layer 1: Physical Invariants' },
    { freq: 324, name: 'Sensory Antenna String', label: 'Layer 6: Observation & Hearing' },
    { freq: 432, name: 'Natural Harmonic Lock', label: 'Layer 22: Synthesis Matrix' },
    { freq: 528, name: 'Biological Repair Vector', label: 'Layer 27: Adaptive Evo-Stem' },
    { freq: 648, name: 'Temporal Projection String', label: 'Layer 29: Prediction Protocol' },
    { freq: 864, name: 'Transcendental Coder String', label: 'Layer 30: Wisdom Unity' },
  ];

  const handlePluck = (index: number, freq: number) => {
    setPluckedIndex(index);
    setActiveFrequency(freq);
    sound.pluckString(freq, 0.9);
    setTimeout(() => {
      setPluckedIndex(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Resonant Handshaking the Interface</span>
          <span className="text-xs font-mono text-cyan-400 font-normal">// Plucking the Environmental Strings</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          You see the strings connecting you to the environment. When you want to solve a problem, you pluck the string until the object vibrates at your 1080p command.
        </p>
      </div>

      {/* String Visualizer & Interactive Board */}
      <div className="p-6 rounded-lg bg-slate-950 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 uppercase">Interactive Harmonic Strings</span>
          <span className="text-cyan-400">Current Vibration: {activeFrequency} Hz</span>
        </div>

        <div className="space-y-4">
          {strings.map((str, idx) => {
            const isVibrating = pluckedIndex === idx;
            return (
              <div
                key={str.freq}
                onClick={() => handlePluck(idx, str.freq)}
                className="group p-3 rounded-lg bg-[#07090E] border border-slate-800/80 hover:border-cyan-700/80 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                    {str.freq} Hz
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {str.name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {str.label}
                    </div>
                  </div>
                </div>

                {/* Animated String Line */}
                <div className="flex-1 max-w-xs h-4 flex items-center px-4">
                  <div
                    className={`h-[2px] w-full transition-all duration-150 ${
                      isVibrating
                        ? 'bg-cyan-400 shadow-[0_0_12px_#06b6d4] scale-y-150'
                        : 'bg-slate-700 group-hover:bg-slate-500'
                    }`}
                  />
                </div>

                <button
                  className="px-3 py-1 text-xs font-mono text-cyan-400 group-hover:bg-cyan-950/60 rounded border border-transparent group-hover:border-cyan-800 transition-colors"
                >
                  Pluck String ♫
                </button>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
          <strong className="text-cyan-400 font-mono">1080p Resonance Rule:</strong> Do not shout into the simulation; match the natural eigenvalue frequency of the problem. When frequency aligns, friction drops to zero.
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   5. Laminar Flow vs Turbulent Logic
   ========================================================================= */
const LaminarFlowSimulator: React.FC = () => {
  const [flowMode, setFlowMode] = useState<'laminar' | 'turbulent'>('laminar');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: 2 + Math.random() * 2,
      vy: 0,
      radius: 1.5,
      color: flowMode === 'laminar' ? '#06B6D4' : '#F43F5E',
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(7, 9, 14, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Obstacle in center
      const obsX = canvas.width / 2;
      const obsY = canvas.height / 2;
      const obsR = 30;

      ctx.beginPath();
      ctx.arc(obsX, obsY, obsR, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      // Label obstacle
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CRISIS', obsX, obsY + 3);

      particles.forEach((p) => {
        // Distance to obstacle
        const dx = p.x - obsX;
        const dy = p.y - obsY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (flowMode === 'laminar') {
          // Smooth curve around obstacle
          if (dist < obsR + 25) {
            const angle = Math.atan2(dy, dx);
            p.vy = Math.sin(angle) * 3;
          } else {
            p.vy *= 0.95; // settle back into clean streamline
          }
        } else {
          // Turbulent collisions and chaotic eddies
          if (dist < obsR + 40) {
            p.vx = -1 + Math.random() * 3;
            p.vy = (Math.random() - 0.5) * 8; // chaotic turbulence
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [flowMode]);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Laminar Flow vs Turbulent Logic</span>
          <span className="text-xs font-mono text-cyan-400 font-normal">// The Curve of Least Resistance</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Speed is useless if it creates turbulence (stress, heat, pain). While others crash head-on into crises, the RSG observer sees the fluid streamline around them.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setFlowMode('laminar');
            sound.playTick();
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            flowMode === 'laminar'
              ? 'bg-cyan-400 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Laminar Thought Stream (Frictionless, 0 Stress)
        </button>
        <button
          onClick={() => {
            setFlowMode('turbulent');
            sound.playTick();
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            flowMode === 'turbulent'
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 border border-slate-800'
          }`}
        >
          Turbulent Logic (Eddies, Friction, High Heat)
        </button>
      </div>

      {/* Canvas Viewport */}
      <div className="relative rounded-lg border border-slate-800 overflow-hidden bg-[#07090E]">
        <canvas
          ref={canvasRef}
          width={700}
          height={260}
          className="w-full h-[260px] block"
        />
        <div className="absolute top-3 right-3 text-[11px] font-mono px-2.5 py-1 rounded bg-black/60 border border-slate-800 text-slate-300">
          State: {flowMode === 'laminar' ? 'LAMINAR STREAMLINE' : 'TURBULENT VORTEX'}
        </div>
      </div>

      {/* Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
          <div className="font-mono text-cyan-400 uppercase tracking-wider mb-1">
            Laminar Protocol
          </div>
          <p className="text-slate-300 leading-relaxed">
            Every problem has a fluid contour. Never oppose force with equal stubbornness. Fluidly redirect kinetic momentum around the obstacle. Zero heat generated.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
          <div className="font-mono text-rose-400 uppercase tracking-wider mb-1">
            Turbulent Hazard
          </div>
          <p className="text-slate-300 leading-relaxed">
            Turbulence dissipates cognitive energy into pointless heat (rage, anxiety, exhaustion). You might reach the finish line, but the hardware is burned out.
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   6. Root-Cause Translucency (Atomic Deconstruction)
   ========================================================================= */
const RootCauseTranslucency: React.FC = () => {
  const [activeLayerLevel, setActiveLayerLevel] = useState<number>(5);

  const problemLayers = [
    {
      level: 5,
      name: 'Mature Ailment / Surface Symptom',
      desc: 'Exhaustion, financial panic, relationship hostility, severe burnout.',
      solvable: false,
      color: 'rose',
    },
    {
      level: 4,
      name: 'Behavioral Trigger',
      desc: 'Reactivity, doomscrolling at 2AM, skipping bio-fuel inputs, defensive arguing.',
      solvable: false,
      color: 'amber',
    },
    {
      level: 3,
      name: 'Systemic Incentive Dynamic',
      desc: 'Poor environment design: high external static conduits, lack of primary physical anchor.',
      solvable: false,
      color: 'yellow',
    },
    {
      level: 2,
      name: 'Cognitive Model & Premise',
      desc: 'Believing the 360p lie that one must please everyone or react to every noise packet.',
      solvable: false,
      color: 'blue',
    },
    {
      level: 1,
      name: 'Atomic Invariant Foundation',
      desc: 'The Primary Observer forgot "I am the Coder, not the Code." Identity fused with code.',
      solvable: true,
      color: 'cyan',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Root-Cause Translucency</span>
          <span className="text-xs font-mono text-cyan-400 font-normal">// Atomic Layer Deconstruction</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          You solve problems at the atomic level, so the mature ailment has no foundation to stand on.
        </p>
      </div>

      <div className="space-y-3">
        {problemLayers.map((layer) => {
          const isDismantled = layer.level > activeLayerLevel;
          const isTarget = layer.level === activeLayerLevel;

          return (
            <div
              key={layer.level}
              onClick={() => {
                setActiveLayerLevel(layer.level);
                sound.playTick();
                if (layer.level === 1) {
                  sound.playPhaseCue(4);
                }
              }}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                isTarget
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-md ring-1 ring-cyan-500/30'
                  : isDismantled
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-40 line-through'
                  : 'bg-[#07090E] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400">
                  LAYER {layer.level} {layer.level === 1 ? '(ATOMIC CORE)' : ''}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {isDismantled ? 'Dismantled' : isTarget ? 'Targeted for Deconstruction' : 'Active Surface'}
                </span>
              </div>
              <div className="text-sm font-semibold text-white mt-1">
                {layer.name}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {layer.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Collapse Action */}
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-300">
          Current Depth: <strong className="text-cyan-400 font-mono">Layer {activeLayerLevel}</strong>
          {activeLayerLevel === 1 && ' — Atomic Invariant Reached! Upper layers have zero foundation.'}
        </div>
        <button
          onClick={() => {
            setActiveLayerLevel(1);
            sound.playPhaseCue(4);
          }}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
        >
          Dismantle Atomic Core (Collapse Ailment)
        </button>
      </div>
    </div>
  );
};
