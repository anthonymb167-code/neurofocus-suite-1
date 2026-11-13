import React, { useState, useEffect } from 'react';
import { Activity, RefreshCw, CheckCircle2, AlertTriangle, ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';
import { MASTER_BLOCKS, MATRIX_LAYERS, MasterBlock } from '../data/matrixData';
import { sound } from '../utils/audioSynthesizer';

export const DiagnosticAssessment: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'assessment' | 'autophagy'>('assessment');

  // Scores per master-block (1 to 6) stored as 0-100%
  const [blockScores, setBlockScores] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('rsg_block_scores');
      return saved ? JSON.parse(saved) : { 1: 82, 2: 74, 3: 88, 4: 90, 5: 78, 6: 85 };
    } catch {
      return { 1: 82, 2: 74, 3: 88, 4: 90, 5: 78, 6: 85 };
    }
  });

  // Autophagy 24-Hour Timer state
  const [autophagyHoursLeft, setAutophagyHoursLeft] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('rsg_autophagy_hours');
      return saved ? Number(saved) : 24;
    } catch {
      return 24;
    }
  });
  const [autophagyActive, setAutophagyActive] = useState<boolean>(false);

  const handleScoreChange = (blockId: number, val: number) => {
    const updated = { ...blockScores, [blockId]: val };
    setBlockScores(updated);
    try {
      localStorage.setItem('rsg_block_scores', JSON.stringify(updated));
    } catch {}
  };

  const overallAverage = Math.round(
    Object.values(blockScores).reduce((a, b) => a + b, 0) / MASTER_BLOCKS.length
  );

  // Identify bottleneck block (lowest score) and anchor block (highest score)
  const sortedBlocks = [...MASTER_BLOCKS].sort(
    (a, b) => (blockScores[a.id] || 0) - (blockScores[b.id] || 0)
  );
  const bottleneckBlock = sortedBlocks[0];
  const anchorBlock = sortedBlocks[sortedBlocks.length - 1];

  // Radar polygon calculation (Hexagon for 6 blocks)
  const size = 260;
  const center = size / 2;
  const radius = center - 35;

  const points = MASTER_BLOCKS.map((block, idx) => {
    const angle = (Math.PI * 2 * idx) / MASTER_BLOCKS.length - Math.PI / 2;
    const scoreFraction = (blockScores[block.id] || 50) / 100;
    const r = radius * scoreFraction;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const gridCircles = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>CALIBRATION & REGENERATION // SYSTEM DIAGNOSTIC</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          RSG Diagnostic & "Initial Cell" Reset
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          Evaluate your activation state across the 6 primary Master-Blocks, isolate cognitive bottlenecks, and execute the weekly 24-hour zero-input autophagy reset to prevent simulation fragmentation.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setActiveSubTab('assessment');
            sound.playTick(true);
          }}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'assessment'
              ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          30-Layer Matrix Calibration
        </button>
        <button
          onClick={() => {
            setActiveSubTab('autophagy');
            sound.playTick(true);
          }}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'autophagy'
              ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          "Initial Cell" Weekly 24h Reset
        </button>
      </div>

      {/* =========================================================================
          Tab 1: 30-Layer Matrix Calibration
         ========================================================================= */}
      {activeSubTab === 'assessment' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Radar Chart & Diagnostics (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-[#0B0E17] p-6 space-y-6 flex flex-col items-center justify-between">
            <div className="w-full text-center">
              <div className="text-xs font-mono text-slate-400 uppercase">
                Hexagonal Balance Topology
              </div>
              <div className="text-3xl font-mono font-bold text-white mt-1 tabular-nums">
                {overallAverage}% <span className="text-xs font-normal text-cyan-400 font-mono">1080p Fidelity</span>
              </div>
            </div>

            {/* SVG Radar */}
            <div className="relative">
              <svg width={size} height={size} className="overflow-visible">
                {/* Background Web Circles */}
                {gridCircles.map((frac, i) => (
                  <circle
                    key={i}
                    cx={center}
                    cy={center}
                    r={radius * frac}
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="1"
                    strokeDasharray={frac === 1 ? 'none' : '3 3'}
                  />
                ))}

                {/* Axes */}
                {MASTER_BLOCKS.map((_, idx) => {
                  const angle = (Math.PI * 2 * idx) / MASTER_BLOCKS.length - Math.PI / 2;
                  const x = center + radius * Math.cos(angle);
                  const y = center + radius * Math.sin(angle);
                  return (
                    <line
                      key={idx}
                      x1={center}
                      y1={center}
                      x2={x}
                      y2={y}
                      stroke="#1E293B"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Filled Radar Polygon */}
                <polygon
                  points={points}
                  fill="rgba(6, 182, 212, 0.2)"
                  stroke="#06B6D4"
                  strokeWidth="2"
                />

                {/* Axis Labels */}
                {MASTER_BLOCKS.map((block, idx) => {
                  const angle = (Math.PI * 2 * idx) / MASTER_BLOCKS.length - Math.PI / 2;
                  const labelRadius = radius + 22;
                  const x = center + labelRadius * Math.cos(angle);
                  const y = center + labelRadius * Math.sin(angle);
                  return (
                    <text
                      key={block.id}
                      x={x}
                      y={y}
                      fill="#94A3B8"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      B-{block.roman}
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* Quick Bottleneck & Anchor Strip */}
            <div className="w-full space-y-2 text-xs pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono">Dominant Anchor:</span>
                <span className="text-emerald-400 font-semibold">
                  Block {anchorBlock.roman} ({blockScores[anchorBlock.id]}%)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono">System Bottleneck:</span>
                <span className="text-rose-400 font-semibold">
                  Block {bottleneckBlock.roman} ({blockScores[bottleneckBlock.id]}%)
                </span>
              </div>
            </div>
          </div>

          {/* Master-Block Interactive Sliders (7 cols) */}
          <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-[#0B0E17] p-6 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-white">
                Master-Block Activation Scrubbers
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Calibrate your perceived activation for each domain. Adjusting values automatically recalibrates your Hexagonal Topology.
              </p>
            </div>

            <div className="space-y-4">
              {MASTER_BLOCKS.map((block) => {
                const score = blockScores[block.id] || 50;
                return (
                  <div key={block.id} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono text-cyan-400 mr-2">Block {block.roman}</span>
                        <strong className="text-white">{block.title}</strong>
                        <span className="text-slate-400 text-[11px] block sm:inline sm:ml-2">
                          ({block.subtitle})
                        </span>
                      </div>
                      <span className="font-mono font-bold text-white tabular-nums">
                        {score}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={score}
                      onChange={(e) => {
                        handleScoreChange(block.id, Number(e.target.value));
                        sound.playTick(true);
                      }}
                      className="w-full accent-cyan-400 h-1.5 bg-slate-900 rounded cursor-pointer"
                    />

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Layers: {block.layerIds.map((id) => `#${id}`).join(', ')}</span>
                      <span>{score >= 80 ? 'Optimal (1080p)' : score >= 60 ? 'Moderate' : 'Clipping Alert'}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Prescription */}
            <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-800/60 text-xs text-slate-300 space-y-1">
              <strong className="text-cyan-400 font-mono">RSG Tuning Prescription:</strong> Focus on{' '}
              <strong className="text-white">Block {bottleneckBlock.roman} ({bottleneckBlock.title})</strong>. Run tactical micro-drills on layers{' '}
              {bottleneckBlock.layerIds.map((id) => `#${id}`).join(', ')} to eliminate latency and cognitive drag.
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          Tab 2: "Initial Cell" Weekly Adjustment (24h Zero-Input)
         ========================================================================= */}
      {activeSubTab === 'autophagy' && (
        <div className="rounded-xl border border-slate-800 bg-[#0B0E17] p-6 lg:p-8 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>The "Initial Cell" Weekly Adjustment</span>
              <span className="text-xs font-mono text-cyan-400 font-normal">// 24 Hours of Zero-Input</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              To keep the 30 layers from friction, you must perform a System Delete once a week. 24 hours of zero digital input forces mental autophagy (#17 - Action) to vaporize cached data causing fragmentation. You return to the simulation with clarity and understanding that takes others years to cultivate.
            </p>
          </div>

          {/* Autophagy Status HUD */}
          <div className="p-6 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Autophagy Reset Countdown
              </div>
              <div className="text-5xl font-mono font-bold text-white tabular-nums mt-1">
                {autophagyHoursLeft.toString().padStart(2, '0')}:00:00
                <span className="text-xs font-normal text-slate-400 font-mono ml-2">HOURS</span>
              </div>
              <div className="text-xs text-cyan-400 font-mono mt-1">
                {autophagyActive ? 'Autophagy Active // Mental Cache Purging' : 'Protocol Ready for Activation'}
              </div>
            </div>

            <button
              onClick={() => {
                setAutophagyActive(!autophagyActive);
                sound.playLaserLock();
              }}
              className={`px-5 py-3 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-md ${
                autophagyActive
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
              }`}
            >
              {autophagyActive ? 'Pause Autophagy Reset' : 'Initialize 24-Hour Zero-Input'}
            </button>
          </div>

          {/* Protocol Rules Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="font-mono text-cyan-400 uppercase tracking-wider">
                1. Zero Digital Static
              </div>
              <p className="text-slate-300 leading-relaxed">
                No feeds, no algorithmic prompts, no messaging. Disconnect all external digital conduits.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="font-mono text-cyan-400 uppercase tracking-wider">
                2. Mental Cache Deletion
              </div>
              <p className="text-slate-300 leading-relaxed">
                Allow accumulated fragmented assumptions to starve out. The brain recycles damaged synaptic connections.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="font-mono text-cyan-400 uppercase tracking-wider">
                3. The 1080p Re-Initialization
              </div>
              <p className="text-slate-300 leading-relaxed">
                Wake on the 7th morning with pristine Initial Cells. The 30 layers run at maximum refresh rate with zero clipping.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
