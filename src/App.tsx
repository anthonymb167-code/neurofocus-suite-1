import React, { useState } from 'react';
import NeuroRestoreApp from './apps/neurorestore/src/App';
import RsgApp from './apps/rsg/src/App';
import MindMeldApp from './apps/mind-meld/src/App';

export default function App() {
  const [activeTab, setActiveTab] = useState<'reset' | 'audit' | 'clarify'>('reset');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="font-bold text-lg tracking-wide text-cyan-400">
          NeuroFocus Suite
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('reset')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              activeTab === 'reset'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            1. Reset (Calm & Focus)
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              activeTab === 'audit'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            2. Audit (30-Layer Matrix)
          </button>
          <button
            onClick={() => setActiveTab('clarify')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              activeTab === 'clarify'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            3. Clarify (12-Question Quiz)
          </button>
        </div>
      </nav>

      <main className="flex-1">
        {activeTab === 'reset' && <NeuroRestoreApp />}
        {activeTab === 'audit' && <RsgApp />}
        {activeTab === 'clarify' && <MindMeldApp />}
      </main>
    </div>
  );
}
