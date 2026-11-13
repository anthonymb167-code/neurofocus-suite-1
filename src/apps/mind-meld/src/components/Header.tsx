import React from 'react';
import {
  Download,
  Moon,
  Sun,
  Sparkles,
  Bot,
  Compass,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onOpenExport: () => void;
  activeProfileId: string;
  onSelectProfile: (id: string) => void;
  entropyReduction: number;
  onOpenCalibration: () => void;
  onOpenMeldAssistant: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  onOpenExport,
  activeProfileId,
  onSelectProfile,
  entropyReduction,
  onOpenCalibration,
  onOpenMeldAssistant,
  isAudioPlaying,
  onToggleAudio,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('diagnostic')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap block">
                Mind Meld
              </span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-cyan-600 dark:text-cyan-400 font-medium">
                {entropyReduction}% Entropy Reduced
              </span>
            </div>
          </div>

          {/* Zone 2: 4–5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-left cursor-pointer ${
                activeTab === 'diagnostic'
                  ? 'border-cyan-500 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              Diagnostic (12Q)
            </button>
            <button
              onClick={() => setActiveTab('perception')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-left cursor-pointer ${
                activeTab === 'perception'
                  ? 'border-cyan-500 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              Perception (1% Gap)
            </button>
            <button
              onClick={() => setActiveTab('synthesis')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-left cursor-pointer ${
                activeTab === 'synthesis'
                  ? 'border-cyan-500 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              Vector Synthesis
            </button>
            <button
              onClick={() => setActiveTab('pivot')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-left cursor-pointer ${
                activeTab === 'pivot'
                  ? 'border-cyan-500 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              Pivot Protocol
            </button>
            <button
              onClick={() => setActiveTab('sprint')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-left cursor-pointer ${
                activeTab === 'sprint'
                  ? 'border-cyan-500 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              7-Day Sprint
            </button>
            <button
              onClick={() => setActiveTab('scaling')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-left cursor-pointer ${
                activeTab === 'scaling'
                  ? 'border-cyan-500 text-slate-900 dark:text-white font-semibold'
                  : 'border-transparent'
              }`}
            >
              Scaling & Cadence
            </button>
          </nav>

          {/* Zone 3: Primary action + utility controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Profile selector */}
            <div className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
              <button
                onClick={() => onSelectProfile('custom')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  activeProfileId === 'custom'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Custom Assessment
              </button>
              <button
                onClick={() => onSelectProfile('marcus')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  activeProfileId === 'marcus'
                    ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Marcus (23.5)
              </button>
              <button
                onClick={() => onSelectProfile('elena')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  activeProfileId === 'elena'
                    ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Elena (6.25)
              </button>
            </div>

            {/* Ambient Soundscape Toggle */}
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isAudioPlaying
                  ? 'border-cyan-500/60 bg-cyan-950/40 text-cyan-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title={isAudioPlaying ? 'Mute 432Hz Ambient Theta Drone' : 'Play 432Hz Meditative Drone'}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Calibration / Archive Recovery Modal Trigger */}
            <button
              onClick={onOpenCalibration}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium text-amber-700 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg border border-amber-400/30 transition-colors cursor-pointer"
              title="Open Stage 1: Zero-Point Calibration & Archive Recovery"
            >
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Calibration</span>
            </button>

            {/* Meld Assistant Conversational Panel Trigger */}
            <button
              onClick={onOpenMeldAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg border border-cyan-400/30 transition-colors cursor-pointer"
              title="Open Meld Assistant (AI Cognitive Catalyst)"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-500" />
              <span>Assistant</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenExport}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-cyan-600 dark:hover:bg-cyan-500 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Master Log</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="flex md:hidden items-center justify-between overflow-x-auto py-2 border-t border-slate-200 dark:border-slate-800 gap-4 text-xs font-medium no-scrollbar">
          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`whitespace-nowrap px-2 py-1 rounded ${
              activeTab === 'diagnostic'
                ? 'bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400'
                : 'text-slate-500'
            }`}
          >
            Diagnostic (12Q)
          </button>
          <button
            onClick={() => setActiveTab('perception')}
            className={`whitespace-nowrap px-2 py-1 rounded ${
              activeTab === 'perception'
                ? 'bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400'
                : 'text-slate-500'
            }`}
          >
            Perception (1% Gap)
          </button>
          <button
            onClick={() => setActiveTab('synthesis')}
            className={`whitespace-nowrap px-2 py-1 rounded ${
              activeTab === 'synthesis'
                ? 'bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400'
                : 'text-slate-500'
            }`}
          >
            DVI Synthesis
          </button>
          <button
            onClick={() => setActiveTab('pivot')}
            className={`whitespace-nowrap px-2 py-1 rounded ${
              activeTab === 'pivot'
                ? 'bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400'
                : 'text-slate-500'
            }`}
          >
            Pivot Protocol
          </button>
          <button
            onClick={() => setActiveTab('sprint')}
            className={`whitespace-nowrap px-2 py-1 rounded ${
              activeTab === 'sprint'
                ? 'bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400'
                : 'text-slate-500'
            }`}
          >
            7-Day Sprint
          </button>
          <button
            onClick={() => setActiveTab('scaling')}
            className={`whitespace-nowrap px-2 py-1 rounded ${
              activeTab === 'scaling'
                ? 'bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400'
                : 'text-slate-500'
            }`}
          >
            Scaling
          </button>
        </div>
      </div>
    </header>
  );
};
