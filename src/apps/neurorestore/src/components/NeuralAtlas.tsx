import React, { useState } from 'react';
import { PHENOMENA_DATA, NEURO_CIRCUITS_EXPLANATION } from '../data/phenomena.ts';
import {
  Brain,
  Zap,
  Activity,
  Layers,
  ShieldAlert,
  Search,
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';

export const NeuralAtlas: React.FC = () => {
  const [selectedCircuit, setSelectedCircuit] = useState<'pfc' | 'hpaAxis' | 'networks' | 'plasticity'>('pfc');
  const [selectedPhenomenonId, setSelectedPhenomenonId] = useState<string>('psychogenic-suppression');

  const circuit = NEURO_CIRCUITS_EXPLANATION[selectedCircuit];
  const activePhenomenon = PHENOMENA_DATA.find((p) => p.id === selectedPhenomenonId) || PHENOMENA_DATA[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>NEUROBIOLOGICAL ARCHITECTURE</span>
          <span aria-hidden="true">·</span>
          <span>SYSTEMIC DOWN-REGULATION ATLAS</span>
          <span aria-hidden="true">·</span>
          <span>SYNAPTIC RE-POTENTIATION</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-100">
          The Neurobiology of the Cognitive Firewall
        </h1>
        <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
          A genius does not lose raw neurological capacity (structural brain power). Instead, negative suggestions, hypnosis, and self-sabotage fundamentally disrupt the brain's executive control network and alter its neurochemistry.
        </p>
      </div>

      {/* High-Resolution Scientific Medical Imagery Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel 1: Prefrontal Cortex Mapping */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Activity className="w-4 h-4" />
              <span>PREFRONTAL CORTEX (PFC) PATHWAY MAP</span>
            </div>
            <span className="text-xs font-mono text-slate-400">ISOMETRIC IMAGING</span>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src="/src/assets/images/neuro_prefrontal_network_1793608913073.jpg"
              alt="Isometric scientific visualization of prefrontal cortex neural pathways and synaptic circuits"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 backdrop-blur-sm bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
              <strong className="text-cyan-300 font-semibold">Frontal Lobe Down-Regulation: </strong>
              Negative suggestions induce hypofrontality, disconnecting top-down cognitive control from vast underlying memory banks.
            </div>
          </div>
        </div>

        {/* Panel 2: Synaptic Cleft & Dendritic Spines */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Zap className="w-4 h-4" />
              <span>DENDRITIC SPINE & ACETYLCHOLINE JUNCTIONS</span>
            </div>
            <span className="text-xs font-mono text-slate-400">MICROSCOPY SCAN</span>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src="/src/assets/images/synaptic_flow_matrix_1793608912377.jpg"
              alt="High-precision scientific rendering of dendritic spines and acetylcholine receptor junctions"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 backdrop-blur-sm bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
              <strong className="text-cyan-300 font-semibold">Dendritic Repair via LTP: </strong>
              Micro-tasks and novelty trigger bursts of acetylcholine and dopamine, marking dormant dendritic spines for rapid synaptic potentiation.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Circuit Deep-Dive */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400">BIOCHEMICAL MECHANICS</span>
            <h2 className="text-xl font-bold text-slate-100 mt-0.5">Explore Key Neuro-Circuits</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'pfc', label: '1. Prefrontal Cortex' },
              { id: 'hpaAxis', label: '2. HPA Axis & Cortisol' },
              { id: 'networks', label: '3. CEN vs DMN Networks' },
              { id: 'plasticity', label: '4. LTP & BDNF' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedCircuit(btn.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCircuit === btn.id
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Circuit Detailed Matrix */}
        <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-cyan-400 uppercase">{circuit.role}</span>
            <span>CLINICAL CITATION: NIH / NEUROSCIENCE</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100">{circuit.name}</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1.5">
              <span className="font-semibold text-emerald-400 block uppercase">Optimal Baseline State:</span>
              <p className="text-slate-300 leading-relaxed">{circuit.healthyState}</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/60 border border-rose-950/50 space-y-1.5">
              <span className="font-semibold text-rose-400 block uppercase">Suppressed / Sabotaged State:</span>
              <p className="text-slate-300 leading-relaxed">{circuit.suppressedState}</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/60 border border-cyan-950/50 space-y-1.5">
              <span className="font-semibold text-cyan-300 block uppercase">Clinical Recovery Protocol:</span>
              <p className="text-slate-300 leading-relaxed">{circuit.recoveryMechanism}</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Phenomenon Matrix Comparison Table */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-mono uppercase text-cyan-400">DIAGNOSTIC TAXONOMY</span>
          <h2 className="text-xl font-bold text-slate-100 mt-0.5">The Phenomenon Matrix</h2>
          <p className="text-xs text-slate-400 mt-1">
            Understanding whether your block stems from external sabotage, negative autosuggestion, or social protective suppression.
          </p>
        </div>

        {/* Phenomenon Selector Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {PHENOMENA_DATA.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPhenomenonId(p.id)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                selectedPhenomenonId === p.id
                  ? 'bg-cyan-500/10 border-cyan-500 text-slate-100'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <div className="text-xs font-semibold line-clamp-1">{p.name}</div>
              <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{p.severityProfile}</div>
            </button>
          ))}
        </div>

        {/* Active Phenomenon Card */}
        <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
            <span>{activePhenomenon.severityProfile.toUpperCase()}</span>
            <span>FUNCTIONAL REVERSIBLE PROFILE</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100">{activePhenomenon.name}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-slate-400 block mb-1">Primary Driver:</span>
                <p className="text-slate-200">{activePhenomenon.primaryDriver}</p>
              </div>
              <div>
                <span className="font-semibold text-slate-400 block mb-1">What Actually Happens:</span>
                <p className="text-slate-300 leading-relaxed">{activePhenomenon.whatActuallyHappens}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-semibold text-cyan-400 block mb-1">Neurobiology & Endocrine Cascades:</span>
                <p className="text-slate-300 leading-relaxed">{activePhenomenon.neurobiology}</p>
              </div>
              <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20">
                <span className="font-semibold text-cyan-300 block mb-1">Clinical Antidote:</span>
                <p className="text-cyan-100 leading-relaxed">{activePhenomenon.clinicalAntidote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
