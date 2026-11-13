import React, { useState } from 'react';
import { Header } from './components/Header';
import { MatrixExplorer } from './components/MatrixExplorer';
import { AuditConsole } from './components/AuditConsole';
import { HyperDimensions } from './components/HyperDimensions';
import { ShieldDefense } from './components/ShieldDefense';
import { DiagnosticAssessment } from './components/DiagnosticAssessment';
import { sound } from './utils/audioSynthesizer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('matrix');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleQuickAudit = () => {
    setActiveTab('audit');
    sound.playPhaseCue(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onQuickAudit={handleQuickAudit}
      />

      {/* Main Workspace Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'matrix' && <MatrixExplorer />}
        {activeTab === 'audit' && <AuditConsole />}
        {activeTab === 'hyper' && <HyperDimensions />}
        {activeTab === 'shield' && <ShieldDefense />}
        {activeTab === 'diagnostic' && <DiagnosticAssessment />}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/80 bg-[#07090E] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">RSG Intelligence Matrix</span>
            <span aria-hidden="true">·</span>
            <span>Ruthless Simulator Genome Architecture</span>
            <span aria-hidden="true">·</span>
            <span>1080p Operating Standard</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActiveTab('matrix');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Matrix (1–30)
            </button>
            <button
              onClick={() => {
                setActiveTab('audit');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              60s Audit
            </button>
            <button
              onClick={() => {
                setActiveTab('hyper');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Hyper-Dimensions
            </button>
            <button
              onClick={() => {
                setActiveTab('shield');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Faraday Shield
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
