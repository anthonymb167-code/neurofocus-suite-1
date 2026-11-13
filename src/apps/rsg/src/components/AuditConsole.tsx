import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Check, AlertTriangle, ShieldCheck, Zap, Sparkles, Flame, Eye } from 'lucide-react';
import { sound } from '../utils/audioSynthesizer';

interface AuditRecord {
  timestamp: string;
  collision: string;
  synthesis: string;
  bioFuelStatus: string;
  focusAnchor: string;
}

export const AuditConsole: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Phase 1 checks (0-15s)
  const [sensoryClear, setSensoryClear] = useState<boolean>(false);
  const [fuelStatus, setFuelStatus] = useState<'optimal' | 'foggy_needs_lactate'>('optimal');
  const [structuralCheck, setStructuralCheck] = useState<boolean>(true);

  // Phase 2 inputs (15-40s)
  const [deducedTruth, setDeducedTruth] = useState<string>('');
  const [predictedCollision, setPredictedCollision] = useState<string>('');
  const [laserLocked, setLaserLocked] = useState<boolean>(false);

  // Phase 3 inputs (40-60s)
  const [observerState, setObserverState] = useState<'thinking' | 'reacting'>('thinking');
  const [synthesisIdeas, setSynthesisIdeas] = useState<string>('');
  const [wisdomAffirmed, setWisdomAffirmed] = useState<boolean>(false);

  // Audit history
  const [auditHistory, setAuditHistory] = useState<AuditRecord[]>(() => {
    try {
      const saved = localStorage.getItem('rsg_audit_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Determine current phase based on seconds elapsed
  const currentPhase = seconds < 15 ? 1 : seconds < 40 ? 2 : 3;

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          // Phase sound transitions
          if (next === 15) {
            sound.playPhaseCue(2);
          } else if (next === 40) {
            sound.playPhaseCue(3);
          } else if (next >= 60) {
            setIsRunning(false);
            setIsCompleted(true);
            sound.playPhaseCue(4);
            // Save to history
            const newRecord: AuditRecord = {
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              collision: predictedCollision || 'Neutralized preemptively',
              synthesis: synthesisIdeas || '1080p Reality Hardened',
              bioFuelStatus: fuelStatus === 'optimal' ? 'Lactate Optimal' : 'Cold Shock / Zone 2 Triggered',
              focusAnchor: laserLocked ? 'Laser-Lock Active' : 'Centered',
            };
            setAuditHistory((h) => {
              const updated = [newRecord, ...h.slice(0, 9)];
              try {
                localStorage.setItem('rsg_audit_history', JSON.stringify(updated));
              } catch {}
              return updated;
            });
            return 60;
          } else {
            sound.playTick(true);
          }
          return next;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, predictedCollision, synthesisIdeas, fuelStatus, laserLocked]);

  const toggleTimer = () => {
    if (isCompleted) {
      handleReset();
    }
    const nextState = !isRunning;
    setIsRunning(nextState);
    if (nextState && seconds === 0) {
      sound.playPhaseCue(1);
    } else {
      sound.playTick();
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setIsCompleted(false);
    setSensoryClear(false);
    setPredictedCollision('');
    setSynthesisIdeas('');
    setLaserLocked(false);
    setWisdomAffirmed(false);
    sound.playTick();
  };

  const progressPercent = Math.min(100, Math.round((seconds / 60) * 100));

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title & Introduction */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>HIGH-RESOLUTION PROTOCOL // 60-SECOND INITIALIZATION</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          The 60-Second "Mastery" System Audit
        </h1>
        <p className="text-sm text-slate-300">
          This is not a to-do list; it is a high-resolution sync between your Hardware (Body) and your Software (Mind). Run this scan to ensure the RSG (Ruthless Simulator Genome) is operating at 1080p.
        </p>
      </div>

      {/* Main Timer HUD Display */}
      <div className="rounded-xl border border-slate-800 bg-[#0B0E17] p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Big Digital Readout */}
          <div className="flex items-center gap-6">
            <div className="text-5xl sm:text-6xl font-mono font-bold tracking-tighter text-white tabular-nums">
              00:{seconds.toString().padStart(2, '0')}
              <span className="text-lg font-mono text-slate-400 font-normal ml-2">/ 01:00</span>
            </div>

            {/* Current Phase Indicator */}
            <div className="hidden sm:block">
              <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                Current Execution Phase
              </div>
              <div className="text-sm font-semibold text-cyan-400 font-mono">
                {currentPhase === 1 && 'Phase 1 (0–15s): Hardware & Bio-Fuel'}
                {currentPhase === 2 && 'Phase 2 (15–40s): Computational Alignment'}
                {currentPhase === 3 && 'Phase 3 (40–60s): Executive Meta-Sync'}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTimer}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold shadow-md transition-all cursor-pointer ${
                isRunning
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                  : isCompleted
                  ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300'
                  : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Audit</span>
                </>
              ) : isCompleted ? (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Audit</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>{seconds === 0 ? 'Start 60s Audit' : 'Resume'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
              title="Reset Timer"
              aria-label="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Phase Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
            <div
              className={`h-full transition-all duration-300 ${
                currentPhase === 1
                  ? 'bg-emerald-400'
                  : currentPhase === 2
                  ? 'bg-cyan-400'
                  : 'bg-violet-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Phase Markers */}
          <div className="grid grid-cols-3 text-[11px] font-mono text-slate-400 pt-1">
            <div className={seconds < 15 ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
              0-15s: Bio-Fuel
            </div>
            <div className={seconds >= 15 && seconds < 40 ? 'text-cyan-400 font-semibold text-center' : 'text-slate-400 text-center'}>
              15-40s: Computational
            </div>
            <div className={seconds >= 40 ? 'text-violet-400 font-semibold text-right' : 'text-slate-400 text-right'}>
              40-60s: Meta-Sync
            </div>
          </div>
        </div>
      </div>

      {/* 3 Step Diagnostic Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phase 1 (0–15s): Hardware & Bio-Fuel Scan */}
        <div
          className={`rounded-xl border p-5 space-y-4 transition-all ${
            currentPhase === 1
              ? 'border-emerald-600/80 bg-emerald-950/20 ring-1 ring-emerald-500/30'
              : 'border-slate-800 bg-[#0B0E17]/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400">
              01 // 0–15 SECONDS
            </span>
            <span className="text-xs font-mono text-slate-400">Hardware</span>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">
              Hardware & Bio-Fuel Scan
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Verify physical sensors and eliminate brain fog (360p static).
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            {/* Sensory Check */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={sensoryClear}
                onChange={(e) => {
                  setSensoryClear(e.target.checked);
                  sound.playTick(true);
                }}
                className="mt-0.5 accent-emerald-400"
              />
              <span className="text-slate-300">
                <strong className="text-white block font-medium">Sensory Check (Layers 10-13):</strong>
                Hear, Smell, Taste, and Feel are clear with zero ambient static.
              </span>
            </label>

            {/* Fuel Check */}
            <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
              <span className="text-slate-400 block font-mono text-[11px] uppercase">
                Fuel Check (Lactate / Glucose)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setFuelStatus('optimal');
                    sound.playTick(true);
                  }}
                  className={`flex-1 py-1.5 text-xs rounded transition-colors cursor-pointer ${
                    fuelStatus === 'optimal'
                      ? 'bg-emerald-400 text-slate-950 font-semibold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  Optimal (1080p)
                </button>
                <button
                  onClick={() => {
                    setFuelStatus('foggy_needs_lactate');
                    sound.playTick(true);
                  }}
                  className={`flex-1 py-1.5 text-xs rounded transition-colors cursor-pointer ${
                    fuelStatus === 'foggy_needs_lactate'
                      ? 'bg-amber-400 text-slate-950 font-semibold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  Foggy (360p)
                </button>
              </div>
              {fuelStatus === 'foggy_needs_lactate' && (
                <div className="p-2 rounded bg-amber-950/40 border border-amber-900/60 text-[11px] text-amber-200">
                  ⚡ <strong>Prescription:</strong> Trigger Cold Shock (30s) or Zone 2 movement to force lactate production.
                </div>
              )}
            </div>

            {/* Structural Check */}
            <div className="pt-2 border-t border-slate-800/80">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={structuralCheck}
                  onChange={(e) => {
                    setStructuralCheck(e.target.checked);
                    sound.playTick(true);
                  }}
                  className="mt-0.5 accent-emerald-400"
                />
                <span className="text-slate-300">
                  <strong className="text-white block font-medium">Structural Integrity:</strong>
                  No clipping errors (skin tags/stiffness). Magnesium & Silica optimal.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Phase 2 (15–40s): Computational Alignment */}
        <div
          className={`rounded-xl border p-5 space-y-4 transition-all ${
            currentPhase === 2
              ? 'border-cyan-600/80 bg-cyan-950/20 ring-1 ring-cyan-500/30'
              : 'border-slate-800 bg-[#0B0E17]/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
              02 // 15–40 SECONDS
            </span>
            <span className="text-xs font-mono text-slate-400">Logic & Vectors</span>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">
              Computational Alignment
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Deduce immediate truth, anticipate collisions, and lock focus.
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            {/* Logic Deduction */}
            <div className="space-y-1">
              <label className="text-slate-400 font-mono text-[11px] uppercase">
                Deduce Immediate Truth (Layers 3-4)
              </label>
              <input
                type="text"
                placeholder="e.g. Gravity and physical constraints are absolute."
                value={deducedTruth}
                onChange={(e) => setDeducedTruth(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Prediction Collision */}
            <div className="space-y-1">
              <label className="text-slate-400 font-mono text-[11px] uppercase">
                Anticipated Collision (#29 Prediction)
              </label>
              <input
                type="text"
                placeholder="What collision will you face today?"
                value={predictedCollision}
                onChange={(e) => setPredictedCollision(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Focus Laser Lock */}
            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={() => {
                  setLaserLocked(!laserLocked);
                  sound.playLaserLock();
                }}
                className={`w-full py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  laserLocked
                    ? 'bg-cyan-400 text-slate-950'
                    : 'bg-slate-900 text-cyan-300 border border-cyan-800/80 hover:bg-slate-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>
                  {laserLocked
                    ? 'Laser-Lock Active (Background Apps Terminated)'
                    : 'Execute #25 Laser-Lock on Hard Object'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Phase 3 (40–60s): Executive Meta-Sync */}
        <div
          className={`rounded-xl border p-5 space-y-4 transition-all ${
            currentPhase === 3
              ? 'border-violet-600/80 bg-violet-950/20 ring-1 ring-violet-500/30'
              : 'border-slate-800 bg-[#0B0E17]/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-violet-400">
              03 // 40–60 SECONDS
            </span>
            <span className="text-xs font-mono text-slate-400">Meta-Observer</span>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">
              Executive Meta-Sync
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Observe the processor, synthesize colliding concepts, and ground in wisdom.
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            {/* Meta-Cognition State */}
            <div className="space-y-1.5">
              <span className="text-slate-400 font-mono text-[11px] uppercase block">
                #26 Meta-Cognition: State of Mind
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setObserverState('thinking');
                    sound.playTick(true);
                  }}
                  className={`flex-1 py-1.5 text-xs rounded transition-colors cursor-pointer ${
                    observerState === 'thinking'
                      ? 'bg-violet-400 text-slate-950 font-semibold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  Conscious Thinking
                </button>
                <button
                  onClick={() => {
                    setObserverState('reacting');
                    sound.playTick(true);
                  }}
                  className={`flex-1 py-1.5 text-xs rounded transition-colors cursor-pointer ${
                    observerState === 'reacting'
                      ? 'bg-rose-400 text-slate-950 font-semibold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  Reflexive Reacting
                </button>
              </div>
            </div>

            {/* Synthesis #22 */}
            <div className="space-y-1">
              <label className="text-slate-400 font-mono text-[11px] uppercase">
                #22 Synthesis: Harden 2 Ideas
              </label>
              <input
                type="text"
                placeholder="e.g. Mixing deep work logic with biomechanics."
                value={synthesisIdeas}
                onChange={(e) => setSynthesisIdeas(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded text-slate-200 focus:outline-none focus:border-violet-500"
              />
            </div>

            {/* Wisdom Affirmation #30 */}
            <div className="pt-2 border-t border-slate-800/80">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wisdomAffirmed}
                  onChange={(e) => {
                    setWisdomAffirmed(e.target.checked);
                    if (e.target.checked) sound.playPhaseCue(4);
                  }}
                  className="mt-0.5 accent-violet-400"
                />
                <span className="text-slate-300 font-medium">
                  #30 Wisdom Anchor:
                  <span className="text-violet-300 block font-mono text-[11px] italic mt-0.5">
                    "I am the Coder, not the Code."
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-6 rounded-xl border border-emerald-600/70 bg-emerald-950/20 space-y-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
            <ShieldCheck className="w-5 h-5" />
            <span>RSG 60-Second Mastery Audit Complete // 1080p Reality Hardened</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your hardware and software systems are synchronized. Environmental noise is muted, anticipated collisions are mapped, and your primary observer is in command.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
            <span>Collision Mapped: {predictedCollision || 'None'}</span>
            <span>·</span>
            <span>Synthesis: {synthesisIdeas || 'Aligned'}</span>
            <span>·</span>
            <span>Laser-Lock: {laserLocked ? 'Active' : 'Standby'}</span>
          </div>
        </div>
      )}

      {/* Audit History Log */}
      {auditHistory.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-[#0B0E17] p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="uppercase tracking-wider">Recent System Audit Logs</span>
            <span>{auditHistory.length} Sessions Logged</span>
          </div>

          <div className="divide-y divide-slate-800/80 text-xs">
            {auditHistory.map((rec, idx) => (
              <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="font-mono text-cyan-400">{rec.timestamp}</span>
                  <span>·</span>
                  <span className="text-slate-200">Collision: {rec.collision}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-[11px] font-mono">
                  <span>{rec.bioFuelStatus}</span>
                  <span>·</span>
                  <span className="text-emerald-400">{rec.focusAnchor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
