import React from 'react';
import { Sparkles, Activity } from 'lucide-react';

interface TopBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQuickStart: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ activeTab, setActiveTab, onQuickStart }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setActiveTab('sandbox');
        }}
        className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-100 whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors"
      >
        <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
        NeuroRestore
      </a>

      {/* Zone 2: 4-5 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('sandbox')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'sandbox' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : ''
          }`}
        >
          Daily Sandbox
        </button>
        <button
          onClick={() => setActiveTab('blueprint')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'blueprint' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : ''
          }`}
        >
          4-Week Blueprint
        </button>
        <button
          onClick={() => setActiveTab('cbt')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'cbt' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : ''
          }`}
        >
          CBT & Experiments
        </button>
        <button
          onClick={() => setActiveTab('atlas')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'atlas' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : ''
          }`}
        >
          Neural Atlas
        </button>
        <button
          onClick={() => setActiveTab('audio')}
          className={`hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
            activeTab === 'audio' ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400' : ''
          }`}
        >
          Acoustic Priming
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onQuickStart}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Launch Daily De-framing</span>
        </button>
      </div>
    </header>
  );
};
