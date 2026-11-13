import React, { useState } from 'react';
import NeuroRestoreApp from './apps/neurorestore/src/App';
import RsgApp from './apps/rsg/src/App';
import MindMeldApp from './apps/mind-meld/src/App';

const TAB_GUIDES = {
  reset: {
    title: 'How to Use: 1. Reset (Calm & Focus)',
    what: 'A 3-step breathing, audio frequency, and low-pressure journaling routine to calm your nervous system when you feel overwhelmed or distracted.',
    start: 'Click "Start 90s Breath Calibration" (or "Launch Daily De-framing" at the top right), breathe with the timer, and follow the 3 steps from top to bottom.',
  },
  audit: {
    title: 'How to Use: 2. Audit (30-Layer Matrix)',
    what: 'A structured mental checklist that breaks human thinking into 30 specific skills—from basic logic and senses up to intuition and pattern recognition.',
    start: 'Click "Launch 60s Audit" in the top right for a quick 1-minute check-in, or click "Inspect Layer →" on any skill card below to open its exercise.',
  },
  clarify: {
    title: 'How to Use: 3. Clarify (12-Question Quiz)',
    what: 'A 12-question self-reflection diagnostic that cuts through social noise and overthinking to reveal what actually energizes you.',
    start: 'Read Question 01 in the center card, type your honest answer into the response box, and click "Next Question >" to work through all 12 prompts.',
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'reset' | 'audit' | 'clarify'>('reset');
  const [showGuide, setShowGuide] = useState(true);

  const guide = TAB_GUIDES[activeTab];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg tracking-wide text-cyan-400">
            NeuroFocus Suite
          </span>
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:bg-slate-700 transition"
          >
            {showGuide ? 'Hide Guide' : '? How to Use'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
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

      {showGuide && (
        <div className="bg-cyan-950/40 border-b border-cyan-500/30 px-4 py-3 text-sm">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="font-semibold text-cyan-300">{guide.title}</div>
              <p className="text-slate-300">
                <span className="font-medium text-white">What it is:</span> {guide.what}
              </p>
              <p className="text-slate-300">
                <span className="font-medium text-cyan-400">Where to start:</span> {guide.start}
              </p>
            </div>
            <button
              onClick={() => setShowGuide(false)}
              className="self-start sm:self-center shrink-0 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-700 text-xs"
            >
              Got it ✕
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {activeTab === 'reset' && <NeuroRestoreApp />}
        {activeTab === 'audit' && <RsgApp />}
        {activeTab === 'clarify' && <MindMeldApp />}
      </main>
    </div>
  );
}
