import React, { useMemo, useState } from 'react';
import { Sparkles, Zap, Shield, Compass, Activity, Brain } from 'lucide-react';
import { FILTERS } from '../data/presets';
import { FilterKey } from '../types/framework';

interface NeuralCascadeVisualizerProps {
  answers: Record<string, string>;
  activeFilter: FilterKey;
  onFilterSelect: (filterId: FilterKey) => void;
  entropyReduction: number;
  dviScore: number;
}

export const NeuralCascadeVisualizer: React.FC<NeuralCascadeVisualizerProps> = ({
  answers,
  activeFilter,
  onFilterSelect,
  entropyReduction,
  dviScore,
}) => {
  const [pulseActive, setPulseActive] = useState(false);

  // Calculate sparks per filter
  const filterSparkCounts = useMemo(() => {
    const counts = {
      psychology: 0,
      science: 0,
      randomness: 0,
      intuition: 0,
    };

    ['Q01', 'Q02', 'Q03'].forEach((q) => {
      if (answers[q]?.trim().length > 0) counts.psychology++;
    });
    ['Q04', 'Q05', 'Q06'].forEach((q) => {
      if (answers[q]?.trim().length > 0) counts.science++;
    });
    ['Q07', 'Q08', 'Q09'].forEach((q) => {
      if (answers[q]?.trim().length > 0) counts.randomness++;
    });
    ['Q10', 'Q11', 'Q12'].forEach((q) => {
      if (answers[q]?.trim().length > 0) counts.intuition++;
    });

    return counts;
  }, [answers]);

  const totalAnswered = useMemo(() => {
    return Object.values(answers).filter((a) => a && a.trim().length > 0).length;
  }, [answers]);

  const triggerCascadeShock = () => {
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 900);
  };

  return (
    <div className="w-full bg-slate-900 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 text-slate-100 shadow-sm relative overflow-hidden">
      {/* Background ambient grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10">
        {/* Top telemetry line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Entropy Reduction & Neural Cascade Engine</span>
            </div>
            <h2 className="text-lg font-semibold text-white mt-0.5">
              The 4-Filter Collapse Mechanism
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 font-mono text-xs">
              <span className="text-slate-400">Sparks Lit:</span>
              <span className="text-cyan-400 font-bold tabular-nums">
                {totalAnswered} / 12
              </span>
            </div>

            <button
              onClick={triggerCascadeShock}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs text-amber-300 font-medium rounded-lg border border-amber-500/30 transition-all cursor-pointer"
              title="Test a stochastic neural pulse across all 4 filters"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Stochastic Shock</span>
            </button>
          </div>
        </div>

        {/* Funnel Diagram (Universal Noise -> 4 Filters -> Anchor Vector) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-5 items-stretch">
          {/* Stage 1: The Input (Universal Noise) */}
          <div className="lg:col-span-3 flex flex-col justify-between p-4 rounded-lg bg-slate-950/60 border border-slate-800">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Stage 1: Input
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1">
                Universal Noise
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Infinite variations, conflicting societal demands, and chaotic
                existential uncertainty.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Entropy Cloud:</span>
                <span className="font-mono text-amber-400 tabular-nums">
                  {100 - entropyReduction}% Noise
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-amber-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.max(10, 100 - entropyReduction)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Stage 2: The 4 Core Filters */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {FILTERS.map((f) => {
              const count = filterSparkCounts[f.id];
              const isSelected = activeFilter === f.id;
              const isFullyLit = count === 3;

              return (
                <button
                  key={f.id}
                  onClick={() => onFilterSelect(f.id)}
                  className={`flex flex-col justify-between p-3 rounded-lg border text-left transition-all relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  {/* Pulse visual shock wave */}
                  {pulseActive && (
                    <div className="absolute inset-0 bg-cyan-400/10 animate-ping pointer-events-none" />
                  )}

                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>0{f.number}</span>
                      <span
                        className={`tabular-nums font-bold ${
                          isFullyLit ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        {count}/3
                      </span>
                    </div>

                    <div className="font-semibold text-xs text-slate-200 mt-1.5 leading-snug">
                      {f.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {f.mechanism}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          count >= 1 ? 'bg-cyan-400 shadow-xs' : 'bg-slate-700'
                        }`}
                      />
                      <div
                        className={`w-2 h-2 rounded-full ${
                          count >= 2 ? 'bg-cyan-400 shadow-xs' : 'bg-slate-700'
                        }`}
                      />
                      <div
                        className={`w-2 h-2 rounded-full ${
                          count >= 3 ? 'bg-emerald-400 shadow-xs' : 'bg-slate-700'
                        }`}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stage 3: The Target (The Anchor Vector) */}
          <div className="lg:col-span-3 flex flex-col justify-between p-4 rounded-lg bg-slate-950/60 border border-slate-800">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Stage 3: Extraction
              </div>
              <div className="text-sm font-semibold text-white mt-1 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>The Anchor Vector</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Noise stripped away. Operating at true capacity where psychological
                fuel, empirical skills, and honest truth meet.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">DVI Viability:</span>
                <span
                  className={`font-bold tabular-nums ${
                    dviScore >= 18
                      ? 'text-emerald-400'
                      : dviScore >= 15
                      ? 'text-cyan-400'
                      : 'text-amber-400'
                  }`}
                >
                  {dviScore.toFixed(1)} / 25.0
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    dviScore >= 18
                      ? 'bg-emerald-400'
                      : dviScore >= 15
                      ? 'bg-cyan-400'
                      : 'bg-amber-400'
                  }`}
                  style={{ width: `${Math.min(100, (dviScore / 25) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Selected Filter Logic Strip */}
        <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono">Filter Logic:</span>
            <span className="text-slate-200">
              {FILTERS.find((f) => f.id === activeFilter)?.logic}
            </span>
          </div>
          <div className="text-cyan-400 font-mono whitespace-nowrap">
            {FILTERS.find((f) => f.id === activeFilter)?.subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};
