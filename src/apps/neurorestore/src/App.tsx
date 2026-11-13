import React, { useState } from 'react';
import { TopBar } from './components/TopBar.tsx';
import { SandboxStudio } from './components/SandboxStudio.tsx';
import { FourWeekBlueprint } from './components/FourWeekBlueprint.tsx';
import { CBTWorkbench } from './components/CBTWorkbench.tsx';
import { NeuralAtlas } from './components/NeuralAtlas.tsx';
import { AudioRegulator } from './components/AudioRegulator.tsx';
import {
  ShieldAlert,
  Brain,
  Compass,
  Activity,
  ArrowRight,
  BookOpen,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('sandbox');
  const [completedSessionsCount, setCompletedSessionsCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('neurorestore_completed_sessions_count');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const handleCompleteSession = () => {
    setCompletedSessionsCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('neurorestore_completed_sessions_count', next.toString());
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Strict 3-Zone Top Bar */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickStart={() => setActiveTab('sandbox')}
      />

      {/* Main Workspace Stage */}
      <main className="flex-1 pb-16">
        {/* Subtle Hero Breadcrumb Kicker for Context */}
        {activeTab === 'sandbox' && (
          <div className="border-b border-slate-900 bg-gradient-to-b from-slate-900/40 to-transparent">
            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="text-cyan-400">ACTIVE PROTOCOL:</span>
                  <span>DE-FRAMING THE PSYCHOLOGICAL FIREWALL</span>
                  <span aria-hidden="true">·</span>
                  <span>PREFRONTAL RETRIEVAL RESTORATION</span>
                </div>
                <p className="text-xs text-slate-300">
                  Your raw intelligence is structurally intact. We bypass the threat gatekeeper by running complex analytical thought through zero-evaluative lateral prompts.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
                  <span>Sessions Completed: </span>
                  <span className="font-mono text-cyan-400 font-bold tabular-nums">
                    {completedSessionsCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Modules */}
        {activeTab === 'sandbox' && (
          <SandboxStudio onCompleteExercise={handleCompleteSession} />
        )}

        {activeTab === 'blueprint' && <FourWeekBlueprint />}

        {activeTab === 'cbt' && <CBTWorkbench />}

        {activeTab === 'atlas' && <NeuralAtlas />}

        {activeTab === 'audio' && <AudioRegulator />}
      </main>

      {/* Quiet, Compliant Footer (No fake telemetry tickers or pseudo-code clutter) */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-6 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-300">NeuroRestore Lab</span>
            <span aria-hidden="true">·</span>
            <span>Clinical CBT & Neuroplastic Recovery Protocol</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <span>Cognitive Restructuring</span>
            <span aria-hidden="true">·</span>
            <span>Attention Bias Modification</span>
            <span aria-hidden="true">·</span>
            <span>Prefrontal Hypofrontality Reversal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
