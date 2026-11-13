import React from 'react';
import { Volume2, VolumeX, Shield, Activity, Compass, Cpu, Clock } from 'lucide-react';
import { sound } from '../utils/audioSynthesizer';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onQuickAudit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted,
  onQuickAudit,
}) => {
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) {
      sound.playTick();
    }
  };

  const navItems = [
    { id: 'matrix', label: '30-Layer Matrix', icon: Cpu },
    { id: 'audit', label: '60s System Audit', icon: Clock },
    { id: 'hyper', label: 'Hyper-Dimensions', icon: Compass },
    { id: 'shield', label: 'Faraday Shield', icon: Shield },
    { id: 'diagnostic', label: 'Diagnostic & Reset', icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#07090E]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('matrix')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <div className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                RSG 1080p Matrix
              </div>
              <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                Ruthless Simulator Genome
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 lg:gap-4 text-xs lg:text-sm font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    sound.playTick(true);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/60'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Audio Control */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleMute}
              className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                isMuted
                  ? 'border-slate-800 text-slate-500 hover:text-slate-300'
                  : 'border-cyan-800/60 text-cyan-400 bg-cyan-950/30 hover:bg-cyan-900/40'
              }`}
              title={isMuted ? 'Unmute Audio Harmonics' : 'Mute Audio Harmonics'}
              aria-label="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onQuickAudit}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Launch 60s Audit</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-slate-800/60 text-xs no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  sound.playTick(true);
                }}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-cyan-400 font-semibold bg-cyan-950/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
