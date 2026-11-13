import React from 'react';
import {
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Target,
  Sparkles,
  ArrowRight,
  Zap,
} from 'lucide-react';
import {
  DiagnosticScores,
  ScoreRationales,
  AssessmentProfile,
} from '../types/framework';
import { evaluateDVI, generateGhostTrace } from '../data/presets';

interface VectorSynthesisProps {
  candidatePurpose: string;
  onCandidatePurposeChange: (val: string) => void;
  scores: DiagnosticScores;
  onScoreChange: (dimension: keyof DiagnosticScores, value: number) => void;
  rationales: ScoreRationales;
  onRationaleChange: (dimension: keyof ScoreRationales, value: string) => void;
  strategicPlan: {
    immediateExecution: string;
    noiseReduction: string;
    blockerResolution: string;
  };
  onStrategicPlanChange: (key: 'immediateExecution' | 'noiseReduction' | 'blockerResolution', val: string) => void;
  onNavigateToPivot: () => void;
  profile?: AssessmentProfile;
}

export const VectorSynthesis: React.FC<VectorSynthesisProps> = ({
  candidatePurpose,
  onCandidatePurposeChange,
  scores,
  onScoreChange,
  rationales,
  onRationaleChange,
  strategicPlan,
  onStrategicPlanChange,
  onNavigateToPivot,
  profile,
}) => {
  const evaluation = evaluateDVI(scores);
  const { dvi, verdict, title, description, clearsGates, breakdown } = evaluation;

  // Radar chart mathematical calculations (5 axes)
  // Axes: 0: Authenticity (top), 1: Feasibility (top-right), 2: Resilience (bottom-right), 3: Energy (bottom-left), 4: Resonance (top-left)
  const radarDimensions: Array<{
    key: keyof DiagnosticScores;
    name: string;
    weight: number;
    source: string;
    gateMin: number;
  }> = [
    { key: 'authenticity', name: 'Authenticity', weight: 1.5, source: 'Intuition (Q10, Q12)', gateMin: 4 },
    { key: 'feasibility', name: 'Feasibility', weight: 1.25, source: 'Science (Q04-Q06)', gateMin: 4 },
    { key: 'resilience', name: 'Resilience', weight: 1.0, source: 'Randomness (Q07-Q09)', gateMin: 3 },
    { key: 'energy', name: 'Energy', weight: 0.75, source: 'Psychology (Q01)', gateMin: 3 },
    { key: 'resonance', name: 'Resonance', weight: 0.5, source: 'Context (Q02, Q11)', gateMin: 3 },
  ];

  const radarRadius = 100;
  const radarCenter = { x: 140, y: 130 };

  const getCoordinates = (index: number, score: number, maxScore = 5) => {
    // 5 dimensions: angle = index * (2 * PI / 5) - PI / 2 (start at top)
    const angle = index * ((2 * Math.PI) / 5) - Math.PI / 2;
    const r = (score / maxScore) * radarRadius;
    return {
      x: radarCenter.x + r * Math.cos(angle),
      y: radarCenter.y + r * Math.sin(angle),
    };
  };

  // Generate polygon points for current scores
  const scorePolygonPoints = radarDimensions
    .map((dim, i) => {
      const coord = getCoordinates(i, scores[dim.key]);
      return `${coord.x.toFixed(1)},${coord.y.toFixed(1)}`;
    })
    .join(' ');

  // Generate polygon points for benchmark (A:4, F:4, R:3, E:3, S:3)
  const benchmarkPolygonPoints = radarDimensions
    .map((dim, i) => {
      const coord = getCoordinates(i, dim.gateMin);
      return `${coord.x.toFixed(1)},${coord.y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="space-y-8">
      {/* Candidate Trajectory Input Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <label
          htmlFor="candidate-purpose"
          className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono mb-2"
        >
          Candidate Purpose / Trajectory Under Diagnostic
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="candidate-purpose"
            type="text"
            value={candidatePurpose}
            onChange={(e) => onCandidatePurposeChange(e.target.value)}
            placeholder="e.g. Building an Independent Open-Source Systems Audit & Reliability Framework"
            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-slate-400"
          />
        </div>

        {/* Ghost Trace Synthesis Box for Optimal Self Amnesia */}
        {profile && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            {(() => {
              const ghost = generateGhostTrace(profile);
              return (
                <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-300/30 dark:border-amber-700/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                        {ghost.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Subconscious Retrieval
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {ghost.clues.map((clue, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-mono">›</span>
                        <span>{clue}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-amber-200 dark:border-amber-900/60 text-xs italic text-amber-900 dark:text-amber-200">
                    <span className="font-semibold not-italic font-mono uppercase text-[10px] text-amber-600 dark:text-amber-400 block mb-0.5">
                      1% Reconnection Action (7-Day Permission Slip):
                    </span>
                    {ghost.permissionSlip}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Main Scoring Matrix & DVI Engine Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 5-Dimension Signal Scoring Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Phase 1 of Synthesis
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Signal Scoring Matrix (1 to 5)
              </h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Raw Scale: [1-5]
            </span>
          </div>

          <div className="space-y-5">
            {radarDimensions.map((dim, idx) => {
              const currentScore = scores[dim.key];
              const passesGate = currentScore >= dim.gateMin;

              return (
                <div
                  key={dim.key}
                  className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                          0{idx + 1}.
                        </span>
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {dim.name.toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          (×{dim.weight.toFixed(2)})
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {dim.source} · Min gate: ≥ {dim.gateMin}
                      </div>
                    </div>

                    {/* 1 - 5 Segmented Buttons */}
                    <div className="flex items-center gap-1 self-start sm:self-auto bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => onScoreChange(dim.key, val)}
                          className={`w-8 h-8 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                            currentScore === val
                              ? 'bg-slate-900 dark:bg-cyan-600 text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dimension Rationale input */}
                  <div className="mt-3">
                    <input
                      type="text"
                      value={rationales[dim.key] || ''}
                      onChange={(e) => onRationaleChange(dim.key, e.target.value)}
                      placeholder={`Rationale for score ${currentScore}: why is this ${dim.name.toLowerCase()} high or low?`}
                      className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: DVI Score Engine & Radar Chart (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* DVI Calculation Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Phase 2: Signal Synthesis
              </span>
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                Formula Engine
              </span>
            </div>

            {/* Score Display Big Number */}
            <div className="my-5 flex items-baseline justify-between">
              <div>
                <span className="text-4xl font-mono font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
                  {dvi.toFixed(2)}
                </span>
                <span className="text-sm font-mono text-slate-400 ml-2">/ 25.0</span>
              </div>

              <div
                className={`px-3 py-1 rounded text-xs font-mono font-semibold uppercase tracking-wider ${
                  verdict === 'anchor_vector'
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                    : verdict === 'status_trap'
                    ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                }`}
              >
                {verdict.replace('_', ' ')}
              </div>
            </div>

            {/* Verdict Box */}
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                {verdict === 'anchor_vector' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                )}
                <span>{title}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {description}
              </p>

              {verdict !== 'anchor_vector' && (
                <div className="pt-2">
                  <button
                    onClick={onNavigateToPivot}
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-600 dark:text-cyan-400 font-semibold hover:underline cursor-pointer"
                  >
                    <span>Execute False Path Redirect & Pivot Protocol</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Formula Breakdown Table */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
                Algorithm Breakdown:
              </div>
              <div className="space-y-1.5 text-xs font-mono text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>1.50 × {scores.authenticity} (Authenticity)</span>
                  <span className="tabular-nums font-semibold text-slate-900 dark:text-slate-200">
                    = {breakdown.authenticityWeighted.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>1.25 × {scores.feasibility} (Feasibility)</span>
                  <span className="tabular-nums font-semibold text-slate-900 dark:text-slate-200">
                    = {breakdown.feasibilityWeighted.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>1.00 × {scores.resilience} (Resilience)</span>
                  <span className="tabular-nums font-semibold text-slate-900 dark:text-slate-200">
                    = {breakdown.resilienceWeighted.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>0.75 × {scores.energy} (Energy)</span>
                  <span className="tabular-nums font-semibold text-slate-900 dark:text-slate-200">
                    = {breakdown.energyWeighted.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>0.50 × {scores.resonance} (Resonance)</span>
                  <span className="tabular-nums font-semibold text-slate-900 dark:text-slate-200">
                    = {breakdown.resonanceWeighted.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Benchmark Checks */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="flex items-center gap-1.5">
                <span
                  className={
                    dvi >= 18 ? 'text-emerald-500 font-bold' : 'text-slate-400'
                  }
                >
                  {dvi >= 18 ? '✓' : '✗'}
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  Total ≥ 18.0
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={
                    scores.authenticity >= 4
                      ? 'text-emerald-500 font-bold'
                      : 'text-slate-400'
                  }
                >
                  {scores.authenticity >= 4 ? '✓' : '✗'}
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  Auth ≥ 4.0
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={
                    scores.feasibility >= 4
                      ? 'text-emerald-500 font-bold'
                      : 'text-slate-400'
                  }
                >
                  {scores.feasibility >= 4 ? '✓' : '✗'}
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  Feas ≥ 4.0
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={
                    scores.resilience >= 3
                      ? 'text-emerald-500 font-bold'
                      : 'text-slate-400'
                  }
                >
                  {scores.resilience >= 3 ? '✓' : '✗'}
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  Resil ≥ 3.0
                </span>
              </div>
            </div>
          </div>

          {/* Radar Spider Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
            <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">
              Dimensional Profile Radar
            </div>
            <div className="flex justify-center">
              <svg width="280" height="260" className="overflow-visible">
                {/* Background concentric polygons (rings for 1, 2, 3, 4, 5) */}
                {[1, 2, 3, 4, 5].map((lvl) => {
                  const ringPoints = radarDimensions
                    .map((_, i) => {
                      const c = getCoordinates(i, lvl);
                      return `${c.x.toFixed(1)},${c.y.toFixed(1)}`;
                    })
                    .join(' ');
                  return (
                    <polygon
                      key={lvl}
                      points={ringPoints}
                      fill="none"
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800"
                      strokeWidth={lvl === 5 ? '1.5' : '1'}
                      strokeDasharray={lvl === 4 ? '3 3' : 'none'}
                    />
                  );
                })}

                {/* Axis lines */}
                {radarDimensions.map((_, i) => {
                  const c = getCoordinates(i, 5);
                  return (
                    <line
                      key={i}
                      x1={radarCenter.x}
                      y1={radarCenter.y}
                      x2={c.x}
                      y2={c.y}
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Benchmark Gate Polygon (dashed red/amber) */}
                <polygon
                  points={benchmarkPolygonPoints}
                  fill="rgba(245, 158, 11, 0.05)"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />

                {/* User Score Polygon (cyan filled) */}
                <polygon
                  points={scorePolygonPoints}
                  fill="rgba(6, 182, 212, 0.25)"
                  stroke="#06B6D4"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />

                {/* Points on user polygon */}
                {radarDimensions.map((dim, i) => {
                  const coord = getCoordinates(i, scores[dim.key]);
                  return (
                    <circle
                      key={dim.key}
                      cx={coord.x}
                      cy={coord.y}
                      r="4"
                      className="fill-cyan-500 stroke-white dark:stroke-slate-900 transition-all duration-300"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* Labels at extremities */}
                {radarDimensions.map((dim, i) => {
                  const labelCoord = getCoordinates(i, 5.8);
                  return (
                    <text
                      key={dim.key}
                      x={labelCoord.x}
                      y={labelCoord.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="text-[10px] font-mono font-medium fill-slate-500 dark:fill-slate-400"
                    >
                      {dim.name} ({scores[dim.key]})
                    </text>
                  );
                })}
              </svg>
            </div>
            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-cyan-500 rounded-xs inline-block" />
                <span>Your Vector</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 border-t border-dashed border-amber-500 inline-block" />
                <span>Benchmark Gate (18.0)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vector Intersection Visualizer Diagram */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
              Phase 3: Qualitative Pattern Mapping
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              The Alignment Core: Vector Intersection
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            3-Axis Convergence
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 items-stretch">
          {/* Psychology / Drivers */}
          <div className="p-4 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                1. Psychology (Drivers)
              </span>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1">
                Intrinsic Fuel
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Energy sustainability & persistent problem friction. What powers your
                system from within without burnout.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-sky-200 dark:border-sky-800/60 text-xs font-mono text-sky-700 dark:text-sky-300">
              Avg: {((scores.energy + scores.resonance) / 2).toFixed(1)} / 5.0
            </div>
          </div>

          {/* Science / Capabilities */}
          <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                2. Science (Capabilities)
              </span>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1">
                Empirical Baseline
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Hard resource runway, 3x skill speedup advantage, and biological
                circadian peak synchronization.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-emerald-200 dark:border-emerald-800/60 text-xs font-mono text-emerald-700 dark:text-emerald-300">
              Score: {scores.feasibility} / 5.0
            </div>
          </div>

          {/* Intuition / Truth */}
          <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/60 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400 uppercase">
                3. Intuition (Truth)
              </span>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1">
                Status-Free Drive
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Visceral gut avoidance unmasked, lifelong narrative resonance, and the
                decisive Anonymity Filter test.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-violet-200 dark:border-violet-800/60 text-xs font-mono text-violet-700 dark:text-violet-300">
              Score: {scores.authenticity} / 5.0
            </div>
          </div>

          {/* Convergence Result (The Anchor Vector) */}
          <div
            className={`p-4 rounded-lg border flex flex-col justify-between ${
              verdict === 'anchor_vector'
                ? 'bg-slate-900 dark:bg-cyan-950/50 border-cyan-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100'
            }`}
          >
            <div>
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-cyan-400">
                Convergence Node
              </span>
              <h4 className="text-sm font-semibold mt-1">
                The Anchor Vector
              </h4>
              <p className="text-xs mt-2 leading-relaxed opacity-85">
                {verdict === 'anchor_vector'
                  ? 'Intersection verified. Raw drivers align with empirical capabilities and authentic truth.'
                  : 'Vector mismatch detected. Re-route via Pivot Protocol.'}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-white/10 text-xs font-mono font-bold text-cyan-400 truncate">
              {candidatePurpose || 'No Vector Defined'}
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Implementation Protocol Block */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
            Phase 4: Roadmap Execution
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            Strategic Implementation Blueprint
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Convert the verified anchor vector into immediate non-negotiable operational moves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 font-mono">
              01. Immediate Execution (Biological Peak Window):
            </label>
            <textarea
              value={strategicPlan.immediateExecution}
              onChange={(e) =>
                onStrategicPlanChange('immediateExecution', e.target.value)
              }
              placeholder="e.g. Shift 6:00 AM – 10:00 AM window away from administrative work directly to core engine development..."
              rows={3}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 font-mono">
              02. Noise Reduction (Eliminated Distractions):
            </label>
            <textarea
              value={strategicPlan.noiseReduction}
              onChange={(e) =>
                onStrategicPlanChange('noiseReduction', e.target.value)
              }
              placeholder="e.g. Ruthlessly cancel secondary corporate consulting options and surface UI projects..."
              rows={3}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 font-mono">
              03. Blocker Resolution (Anonymity / Fear Neutralization):
            </label>
            <textarea
              value={strategicPlan.blockerResolution}
              onChange={(e) =>
                onStrategicPlanChange('blockerResolution', e.target.value)
              }
              placeholder="e.g. Bypass fear of public exposure by releasing builds anonymously under an open collective..."
              rows={3}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-y"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
