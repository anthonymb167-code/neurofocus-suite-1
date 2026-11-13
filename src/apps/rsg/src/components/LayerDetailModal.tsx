import React, { useState } from 'react';
import { X, ArrowRight, Zap, Eye, CheckCircle2, RefreshCw } from 'lucide-react';
import { MatrixLayer, MATRIX_LAYERS } from '../data/matrixData';
import { sound } from '../utils/audioSynthesizer';

interface LayerDetailModalProps {
  layer: MatrixLayer | null;
  onClose: () => void;
  onSelectLayer: (layer: MatrixLayer) => void;
}

export const LayerDetailModal: React.FC<LayerDetailModalProps> = ({
  layer,
  onClose,
  onSelectLayer,
}) => {
  if (!layer) return null;

  // Micro-Drill Interactive State
  const [drillCompleted, setDrillCompleted] = useState<boolean>(false);
  const [userDrillInput, setUserDrillInput] = useState<string>('');
  const [testResult, setTestResult] = useState<string | null>(null);

  // Focus drill timer
  const [focusTimer, setFocusTimer] = useState<number>(30);
  const [focusActive, setFocusActive] = useState<boolean>(false);

  // Calculation drill state
  const [calcPrior, setCalcPrior] = useState<number>(50);
  const [calcEvidence, setCalcEvidence] = useState<number>(75);

  const handleRunDrill = () => {
    sound.playTick();
    if (layer.id === 1) {
      // Bayesian update
      const p = (calcPrior * calcEvidence) / (calcPrior * calcEvidence + (100 - calcPrior) * (100 - calcEvidence));
      setTestResult(`Calculated Posterior Probability: ${Math.round(p * 100)}%. Expectation calibrated.`);
      setDrillCompleted(true);
    } else if (layer.id === 25) {
      // Focus timer
      setFocusActive(true);
      sound.playLaserLock();
      const interval = setInterval(() => {
        setFocusTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setFocusActive(false);
            setDrillCompleted(true);
            sound.playPhaseCue(3);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (userDrillInput.trim().length > 3) {
        setTestResult(`Protocol Executed: Insight Hardened into 1080p memory ledger.`);
        setDrillCompleted(true);
        sound.playPhaseCue(2);
      } else {
        setTestResult(`Input too short. Provide a concrete invariant or data point.`);
      }
    }
  };

  const relatedLayers = MATRIX_LAYERS.filter((l) => layer.vectorConnections.includes(l.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#0B0E17] border border-slate-800 rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#07090E]/80">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/80 text-cyan-400">
              LAYER #{layer.id.toString().padStart(2, '0')}
            </span>
            <span className="text-xs text-slate-400">
              {layer.masterBlockTitle}
            </span>
          </div>
          <button
            onClick={() => {
              sound.playTick(true);
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Title & Subtitle */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              {layer.name}
              <span className="text-sm font-normal text-cyan-400 font-mono">
                // {layer.subtitle}
              </span>
            </h2>
            <div className="mt-2 text-xs font-mono text-slate-400 flex items-center gap-2">
              <span>Domain: {layer.hardwareSoftware}</span>
              <span>·</span>
              <span>Classification: {layer.category}</span>
            </div>
          </div>

          {/* Raw Definition */}
          <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              Base Definition
            </div>
            <p className="text-sm italic text-slate-200">
              "{layer.rawDefinition}"
            </p>
          </div>

          {/* RSG Architecture Role */}
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              RSG Architecture Specification
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {layer.rsgRole}
            </p>
          </div>

          {/* 360p vs 1080p Resolution Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/40">
              <div className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-1">
                360p Low-Res Static (Vulnerability)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {layer.resolutionComparison.lowRes360p}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-800/50">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                1080p Hardened Truth (Mastery)
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {layer.resolutionComparison.highRes1080p}
              </p>
            </div>
          </div>

          {/* Interactive Tactical Drill */}
          <div className="p-5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Tactical Micro-Drill
              </div>
              {drillCompleted && (
                <span className="text-xs font-mono text-emerald-400">
                  Status: Calibrated ✓
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300">
              {layer.tacticalDrill}
            </p>

            {/* Drill specific inputs */}
            {layer.id === 1 ? (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Prior Probability Expectation: {calcPrior}%</span>
                  <input
                    type="range"
                    min="1"
                    max="99"
                    value={calcPrior}
                    onChange={(e) => setCalcPrior(Number(e.target.value))}
                    className="w-32 accent-cyan-400"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>New Physical Evidence Weight: {calcEvidence}%</span>
                  <input
                    type="range"
                    min="1"
                    max="99"
                    value={calcEvidence}
                    onChange={(e) => setCalcEvidence(Number(e.target.value))}
                    className="w-32 accent-cyan-400"
                  />
                </div>
                <button
                  onClick={handleRunDrill}
                  className="w-full py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                >
                  Calculate Bayesian Invariant
                </button>
              </div>
            ) : layer.id === 25 ? (
              <div className="space-y-3 pt-2 text-center">
                <div className="text-3xl font-mono font-bold text-cyan-400">
                  00:{focusTimer.toString().padStart(2, '0')}
                </div>
                <p className="text-xs text-slate-400">
                  {focusActive
                    ? 'Target Locked. All ambient background static is muted.'
                    : 'Press lock to isolate one focal coordinate for 30s.'}
                </p>
                <button
                  disabled={focusActive}
                  onClick={handleRunDrill}
                  className={`w-full py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    focusActive
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'text-slate-950 bg-amber-400 hover:bg-amber-300'
                  }`}
                >
                  {focusActive ? 'Laser-Lock In Progress...' : 'Initiate Laser-Lock (30s)'}
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <input
                  type="text"
                  placeholder="Record empirical deduction / observation..."
                  value={userDrillInput}
                  onChange={(e) => setUserDrillInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleRunDrill()}
                />
                <button
                  onClick={handleRunDrill}
                  className="w-full py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                >
                  Execute Tactical Micro-Drill
                </button>
              </div>
            )}

            {testResult && (
              <div className="p-2.5 rounded bg-slate-950 border border-cyan-900/60 text-xs font-mono text-cyan-300">
                {testResult}
              </div>
            )}
          </div>

          {/* Interconnected Vector Connections */}
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Coupled Simulation Vectors
            </div>
            <div className="flex flex-wrap gap-2">
              {relatedLayers.map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => {
                    sound.playTick(true);
                    onSelectLayer(rel);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-800 text-xs text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span className="font-mono text-cyan-400">#{rel.id}</span>
                  <span>{rel.name}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer navigation */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-[#07090E]/80 text-xs text-slate-400">
          <button
            onClick={() => {
              const prevId = layer.id > 1 ? layer.id - 1 : 30;
              const prev = MATRIX_LAYERS.find((l) => l.id === prevId);
              if (prev) {
                sound.playTick(true);
                onSelectLayer(prev);
              }
            }}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            ← Previous Layer
          </button>
          <span className="font-mono">
            {layer.id} / 30
          </span>
          <button
            onClick={() => {
              const nextId = layer.id < 30 ? layer.id + 1 : 1;
              const next = MATRIX_LAYERS.find((l) => l.id === nextId);
              if (next) {
                sound.playTick(true);
                onSelectLayer(next);
              }
            }}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            Next Layer →
          </button>
        </div>
      </div>
    </div>
  );
};
