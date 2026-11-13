import React, { useState } from 'react';
import {
  Eye,
  Sliders,
  Sparkles,
  Zap,
  Compass,
  Flame,
  Layers,
  ArrowRight,
  Maximize2,
  Minimize2,
  Shield,
  Volume2,
} from 'lucide-react';
import { PerceptualDecryptionData, SensoryFilterKey } from '../types/framework';
import { ambientSound } from '../utils/audio';

interface PerceptualDecryptionModuleProps {
  data?: PerceptualDecryptionData;
  onUpdateData: (data: PerceptualDecryptionData) => void;
  candidatePurpose: string;
}

const DEFAULT_PERCEPTUAL_DATA: PerceptualDecryptionData = {
  activeSensorFilter: 'feline',
  apertureWidthPercent: 20,
  softProblemStatement: 'I feel like I lack time and people might judge my work if it is not immediately polished or validated.',
  cuboidStructuralEdges: 'The project is not a vague amorphous cloud; it has 6 hard boundaries: 1 database schema, 1 parsing engine, 1 CLI interface, 1 deployment pipeline, 1 test harness, and 1 documentation file.',
  magneticVectorPull: 'An unyielding inward pull to solve concurrency and latency issues, completely independent of whether anyone retweets or applauds.',
  thermalHeatTask: 'Deep compiler optimization and memory benchmarking generate high thermal metabolic heat; status meetings are sub-zero hypothermic drains.',
  uvLandingStrips: 'Hidden modular interfaces and open-source standards that allow direct integration into existing enterprise kernels.',
  compactionCompleted: false,
};

export const PerceptualDecryptionModule: React.FC<PerceptualDecryptionModuleProps> = ({
  data = DEFAULT_PERCEPTUAL_DATA,
  onUpdateData,
  candidatePurpose,
}) => {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(2);
  const [apertureWidth, setApertureWidth] = useState<number>(data.apertureWidthPercent || 25);
  const [selectedSensor, setSelectedSensor] = useState<SensoryFilterKey>(data.activeSensorFilter || 'feline');
  const [compactionTriggered, setCompactionTriggered] = useState<boolean>(data.compactionCompleted || false);

  const handleSensorSelect = (sensor: SensoryFilterKey) => {
    setSelectedSensor(sensor);
    ambientSound.playSparkChime();
    onUpdateData({
      ...data,
      activeSensorFilter: sensor,
    });
  };

  const handleApertureChange = (val: number) => {
    setApertureWidth(val);
    onUpdateData({
      ...data,
      apertureWidthPercent: val,
    });
  };

  const handleFieldChange = (field: keyof PerceptualDecryptionData, val: any) => {
    onUpdateData({
      ...data,
      [field]: val,
    });
  };

  const triggerCompaction = () => {
    setCompactionTriggered(true);
    ambientSound.playSparkChime();
    onUpdateData({
      ...data,
      compactionCompleted: true,
    });
  };

  return (
    <div className="space-y-8">
      {/* Narrative Header: The 1% Human Simulation */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-8 text-slate-100 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase">
              Advanced Perceptual Module
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">Slit-Aperture Diffraction & Sensor Integration</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            Deconstructing The 1% Human Simulation
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-cyan-500/60 pl-3.5 my-2">
            "What you call reality is just a 1% simulation—a 480p watercolor crop rendered
            by human biological hardware to keep you alive, not to show you absolute truth.
            Every other organism tunes into a channel you are blind to."
          </p>

          {/* 3-Stage Perceptual Pipeline Strip */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
            <button
              onClick={() => setActiveStage(1)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeStage === 1
                  ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-400/30'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                Stage 1
              </div>
              <div className="font-semibold text-white mt-0.5">The Sensor Gap</div>
              <div className="text-[11px] opacity-75 mt-0.5">Deconstruct Human 480p</div>
            </button>

            <button
              onClick={() => setActiveStage(2)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeStage === 2
                  ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-400/30'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                Stage 2
              </div>
              <div className="font-semibold text-white mt-0.5">Cross-Species Meld</div>
              <div className="text-[11px] opacity-75 mt-0.5">Multi-Sensor Simulation</div>
            </button>

            <button
              onClick={() => setActiveStage(3)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeStage === 3
                  ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-400/30'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
                Stage 3
              </div>
              <div className="font-semibold text-white mt-0.5">The Compaction</div>
              <div className="text-[11px] opacity-75 mt-0.5">Unified Master View</div>
            </button>
          </div>
        </div>
      </div>

      {/* STAGE 1: THE SENSOR GAP & BANDWIDTH SELECTOR */}
      {activeStage === 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Stage 1: Calibration
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                The Bandwidth Selector: How Species Render Reality
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
              Interactive Lens Filter
            </span>
          </div>

          {/* Sensor Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              {
                id: 'human',
                name: 'Human',
                tag: '480p Visible Crop',
                spectrum: '400 - 700 nm',
                desc: 'Circular bloom, 60fps limit, soft watercolor blur',
                color: 'text-slate-400',
              },
              {
                id: 'feline',
                name: 'Feline',
                tag: 'Slit Aperture',
                spectrum: 'Diffraction Lattice',
                desc: 'Acutance asymmetry; hard edges & cuboids',
                color: 'text-amber-400',
              },
              {
                id: 'avian',
                name: 'Avian',
                tag: 'Magnetoreception',
                spectrum: 'Quantum Cryptochrome',
                desc: 'Earth magnetic field vectors overlaid',
                color: 'text-cyan-400',
              },
              {
                id: 'viper',
                name: 'Pit Viper',
                tag: 'Infrared Thermal',
                spectrum: '7,000 - 14,000 nm',
                desc: 'Thermal heat maps blooming through dark',
                color: 'text-rose-400',
              },
              {
                id: 'insectoid',
                name: 'Insectoid',
                tag: 'Ultraviolet UV',
                spectrum: '300 - 400 nm',
                desc: 'Hidden guidance landing strips & runway',
                color: 'text-violet-400',
              },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => handleSensorSelect(s.id as SensoryFilterKey)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  selectedSensor === s.id
                    ? 'border-cyan-500 bg-slate-950 text-white ring-1 ring-cyan-500 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className={`text-xs font-mono font-bold ${s.color}`}>
                  {s.name}
                </div>
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 mt-1 truncate">
                  {s.tag}
                </div>
                <div className="text-[10px] font-mono opacity-70 mt-0.5 truncate">
                  {s.spectrum}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {s.desc}
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Aperture Canvas Visualizer */}
          <div className="relative h-64 sm:h-80 w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
            {/* Visual simulation corresponding to selected sensor */}
            {selectedSensor === 'human' && (
              <div className="relative flex items-center justify-center text-center">
                <div className="w-48 h-48 rounded-full bg-slate-200/20 blur-md border border-white/20 animate-pulse" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                    Human 480p Perception
                  </span>
                  <p className="text-[11px] text-slate-400 max-w-xs mt-1">
                    Soft circular lens. Life obstacles appear amorphous, rounded, and
                    confusing because biological hardware blurs hard edges.
                  </p>
                </div>
              </div>
            )}

            {selectedSensor === 'feline' && (
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Slit Aperture & Diffraction Lattice */}
                <div
                  className="absolute bg-amber-400/20 border-x-2 border-amber-400 transition-all duration-300"
                  style={{
                    width: `${Math.max(8, apertureWidth * 1.5)}px`,
                    height: '90%',
                  }}
                />
                {/* 6-Sided Cuboid Frame Wireframe */}
                <svg width="240" height="200" className="relative z-10">
                  {/* Hexagonal / Cuboid wireframe */}
                  <polygon
                    points="120,20 200,65 200,145 120,190 40,145 40,65"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  <line x1="120" y1="20" x2="120" y2="105" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="200" y1="65" x2="120" y2="105" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="40" y1="65" x2="120" y2="105" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="120" y1="105" x2="120" y2="190" stroke="#F59E0B" strokeWidth="1.5" />
                  {/* Center glowing focal point */}
                  <circle cx="120" cy="105" r="5" fill="#F59E0B" className="animate-ping" />
                </svg>

                <div className="absolute bottom-3 left-4 text-xs font-mono text-amber-400 bg-slate-900/80 px-2.5 py-1 rounded border border-amber-400/30">
                  Feline Slit Diffraction: Soft problems collapse into a 6-sided cuboid
                </div>
              </div>
            )}

            {selectedSensor === 'avian' && (
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Magnetic field lines */}
                <svg width="320" height="220" className="absolute inset-0 m-auto">
                  <path
                    d="M 60,110 C 60,20 260,20 260,110 C 260,200 60,200 60,110"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="opacity-60"
                  />
                  <path
                    d="M 90,110 C 90,45 230,45 230,110 C 230,175 90,175 90,110"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="1.5"
                    className="opacity-80"
                  />
                  {/* Vector Arrow Pointer */}
                  <line x1="160" y1="150" x2="160" y2="60" stroke="#22D3EE" strokeWidth="3" />
                  <polygon points="160,50 152,70 168,70" fill="#22D3EE" />
                </svg>

                <div className="relative z-10 text-center max-w-sm px-4">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                    Avian Magnetoreception
                  </span>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Visualizes invisible directional forces. Points directly along your
                    true vector without consulting human opinion.
                  </p>
                </div>
              </div>
            )}

            {selectedSensor === 'viper' && (
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Thermal gradient bloom */}
                <div className="w-56 h-56 rounded-full bg-gradient-to-r from-blue-900 via-rose-600 to-amber-400 blur-xl opacity-60 animate-pulse" />
                <div className="relative z-10 text-center p-4">
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase">
                    Pit Viper Infrared Thermal
                  </span>
                  <p className="text-[11px] text-slate-200 max-w-sm mt-1">
                    Separates hot metabolic fuel from cold distraction. Status seeking
                    reads as sub-zero blue; deep technical craftsmanship burns infrared red.
                  </p>
                </div>
              </div>
            )}

            {selectedSensor === 'insectoid' && (
              <div className="relative flex items-center justify-center w-full h-full">
                {/* UV Landing Runway lines */}
                <svg width="280" height="200" className="absolute inset-0 m-auto">
                  <line x1="40" y1="180" x2="130" y2="40" stroke="#A78BFA" strokeWidth="2" strokeDasharray="6 3" />
                  <line x1="240" y1="180" x2="150" y2="40" stroke="#A78BFA" strokeWidth="2" strokeDasharray="6 3" />
                  <circle cx="140" cy="40" r="12" fill="none" stroke="#C084FC" strokeWidth="2" className="animate-ping" />
                  <circle cx="140" cy="40" r="4" fill="#C084FC" />
                </svg>
                <div className="relative z-10 text-center p-4">
                  <span className="text-xs font-mono font-bold text-violet-400 uppercase">
                    Insectoid Ultraviolet Landing Strips
                  </span>
                  <p className="text-[11px] text-slate-200 max-w-sm mt-1">
                    Reveals invisible runways into execution that standard human logic
                    overlooks.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveStage(2)}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Proceed to Stage 2: Cross-Species Meld Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: THE CROSS-SPECIES MELD & "CUBOID MOON" PERSPECTIVE FLIP */}
      {activeStage === 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Stage 2: Diagnostic Inquiry
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                The "Cuboid Moon" Perspective Flip
              </h3>
            </div>
            <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
              Module Spotlight
            </span>
          </div>

          {/* Prompt banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <p className="font-semibold mb-1">THE PERCEPTUAL CHALLENGE:</p>
            "When you look at your current life problem through human eyes, it appears
            smooth and soft—like a round moon. Now engage the Feline Aperture. See the
            hidden six-sided cuboid ring framing it. What hard structural edges are you
            ignoring because your human lens blurred them out?"
          </div>

          {/* Interactive Aperture Shift Slider */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 dark:text-slate-400">
                Aperture Geometry Transition:
              </span>
              <span className="font-bold text-cyan-600 dark:text-cyan-400">
                {apertureWidth > 75
                  ? 'Human Circular Bloom (100% Blur)'
                  : apertureWidth > 30
                  ? 'Asymmetric Diffraction Transition'
                  : 'Feline Slit Aperture (Cuboid Acutance)'}
              </span>
            </div>

            <input
              type="range"
              min="5"
              max="100"
              value={apertureWidth}
              onChange={(e) => handleApertureChange(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>5% Slit Aperture (Maximum Acutance / Hard Edges)</span>
              <span>100% Circular Bloom (Human 480p Watercolor)</span>
            </div>
          </div>

          {/* Two-Column Problem Formulation: Soft Human vs. Cuboid Structural */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Column 1: Soft Human View */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                  1. Soft Problem (Human 480p Lens)
                </span>
                <span className="text-[11px] text-slate-400">Rounded / Emotional</span>
              </div>
              <textarea
                value={data.softProblemStatement}
                onChange={(e) =>
                  handleFieldChange('softProblemStatement', e.target.value)
                }
                placeholder="Describe how the problem feels through human eyes (vague excuses, worries about what people think)..."
                rows={4}
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Column 2: Cuboid Structural Edges */}
            <div className="p-4 rounded-xl border border-amber-300/60 dark:border-amber-800/60 bg-amber-50/20 dark:bg-amber-950/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                  2. Hard Cuboid Edges (Feline Slit Aperture)
                </span>
                <span className="text-[11px] text-amber-500 font-mono">6-Sided Geometry</span>
              </div>
              <textarea
                value={data.cuboidStructuralEdges}
                onChange={(e) =>
                  handleFieldChange('cuboidStructuralEdges', e.target.value)
                }
                placeholder="What hard 6-sided operational constraints or architectural modules exist once soft excuses are stripped?"
                rows={4}
                className="w-full p-3 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Diagnostic Cross-Species Matrix Rows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Avian Magnetic Pull */}
            <div className="p-4 rounded-xl border border-cyan-200 dark:border-cyan-800/60 bg-cyan-50/20 dark:bg-cyan-950/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                <Compass className="w-3.5 h-3.5" />
                <span>Avian Magnetic Vector</span>
              </div>
              <p className="text-[11px] text-slate-500">
                What invisible internal pull guides your direction when you stop asking
                for human approval?
              </p>
              <textarea
                value={data.magneticVectorPull}
                onChange={(e) =>
                  handleFieldChange('magneticVectorPull', e.target.value)
                }
                placeholder="State your directional vector..."
                rows={3}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Viper Thermal Heat */}
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-800/60 bg-rose-50/20 dark:bg-rose-950/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase">
                <Flame className="w-3.5 h-3.5" />
                <span>Viper Thermal Heat</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Which specific task generates genuine metabolic warmth versus sub-zero
                cold status traps?
              </p>
              <textarea
                value={data.thermalHeatTask}
                onChange={(e) =>
                  handleFieldChange('thermalHeatTask', e.target.value)
                }
                placeholder="State your thermal heat task..."
                rows={3}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            {/* Insectoid UV Runway */}
            <div className="p-4 rounded-xl border border-violet-200 dark:border-violet-800/60 bg-violet-50/20 dark:bg-violet-950/20 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-violet-600 dark:text-violet-400 uppercase">
                <Zap className="w-3.5 h-3.5" />
                <span>Insectoid UV Runway</span>
              </div>
              <p className="text-[11px] text-slate-500">
                What hidden structural landing strip or modular standard is invisible to
                surface analytical logic?
              </p>
              <textarea
                value={data.uvLandingStrips}
                onChange={(e) =>
                  handleFieldChange('uvLandingStrips', e.target.value)
                }
                placeholder="State your hidden landing strip..."
                rows={3}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveStage(1)}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Back to Stage 1
            </button>
            <button
              onClick={() => setActiveStage(3)}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Proceed to Stage 3: The Compaction Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: THE COMPACTION ENGINE & MASTER PERCEPTION BLUEPRINT */}
      {activeStage === 3 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Stage 3: Master Synthesis
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                The Compaction Engine: The Unified Master View
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Multi-Sensor Stitching
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Instead of forcing you to juggle multiple conflicting sensor feeds (which
            causes data overload), the Compaction Engine stitches human, feline, avian,
            and viper signals into a single unified blueprint.
          </p>

          {/* Stitched Master Blueprint Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Graphic Blueprint Visualization */}
              <div className="relative w-56 h-56 shrink-0 flex items-center justify-center">
                <svg width="220" height="220" className="relative z-10">
                  {/* Feline 6-sided cuboid wireframe */}
                  <polygon
                    points="110,25 185,68 185,152 110,195 35,152 35,68"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <line x1="110" y1="25" x2="110" y2="110" stroke="#F59E0B" strokeWidth="1" />
                  <line x1="185" y1="68" x2="110" y2="110" stroke="#F59E0B" strokeWidth="1" />
                  <line x1="35" y1="68" x2="110" y2="110" stroke="#F59E0B" strokeWidth="1" />
                  <line x1="110" y1="110" x2="110" y2="195" stroke="#F59E0B" strokeWidth="1" />

                  {/* Avian Magnetic Vector arrow */}
                  <line x1="110" y1="160" x2="110" y2="45" stroke="#22D3EE" strokeWidth="2.5" />
                  <polygon points="110,35 103,52 117,52" fill="#22D3EE" />

                  {/* Viper Thermal Core Glow */}
                  <circle cx="110" cy="110" r="28" fill="#F43F5E" className="opacity-40 blur-xs animate-pulse" />
                  <circle cx="110" cy="110" r="14" fill="#FB7185" className="opacity-80" />
                  <circle cx="110" cy="110" r="5" fill="#FFFFFF" />

                  {/* Insectoid UV tick marks */}
                  <circle cx="110" cy="25" r="3" fill="#A78BFA" />
                  <circle cx="185" cy="68" r="3" fill="#A78BFA" />
                  <circle cx="185" cy="152" r="3" fill="#A78BFA" />
                  <circle cx="110" cy="195" r="3" fill="#A78BFA" />
                  <circle cx="35" cy="152" r="3" fill="#A78BFA" />
                  <circle cx="35" cy="68" r="3" fill="#A78BFA" />
                </svg>
              </div>

              {/* Stitched Specifications */}
              <div className="space-y-4 flex-1 text-xs">
                <div>
                  <span className="font-mono uppercase font-bold text-amber-400 block mb-0.5">
                    1. Geometry (Feline Slit Acutance):
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {data.cuboidStructuralEdges || 'No structural edges recorded.'}
                  </p>
                </div>

                <div>
                  <span className="font-mono uppercase font-bold text-rose-400 block mb-0.5">
                    2. Thermal Energy (Pit Viper Infrared):
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {data.thermalHeatTask || 'No thermal task recorded.'}
                  </p>
                </div>

                <div>
                  <span className="font-mono uppercase font-bold text-cyan-400 block mb-0.5">
                    3. Magnetic Vector (Avian Cryptochrome):
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {data.magneticVectorPull || 'No magnetic pull recorded.'}
                  </p>
                </div>

                <div>
                  <span className="font-mono uppercase font-bold text-violet-400 block mb-0.5">
                    4. Ultraviolet Runway (Insectoid Guidance):
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {data.uvLandingStrips || 'No UV landing strips recorded.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Compaction action confirmation */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-[11px] font-mono text-slate-400">
                Status: {compactionTriggered ? '✓ Multi-Sensor Feeds Compacted into Master Blueprint' : 'Pending Stitched Lock'}
              </div>
              <button
                onClick={triggerCompaction}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-mono font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {compactionTriggered ? '✓ Master Blueprint Sealed' : 'Seal Compaction Blueprint'}
              </button>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setActiveStage(2)}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Back to Stage 2: Cross-Species Meld
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
