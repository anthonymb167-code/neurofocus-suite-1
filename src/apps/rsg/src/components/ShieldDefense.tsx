import React, { useState } from 'react';
import { Shield, Radio, Anchor, RefreshCw, Eye, CheckCircle2, AlertOctagon, Sparkles } from 'lucide-react';
import { sound } from '../utils/audioSynthesizer';

export const ShieldDefense: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'acoustic' | 'geometric' | 'resonance' | 'glymphatic'>('acoustic');

  // 1. Acoustic Buffer state
  const [rawStaticInput, setRawStaticInput] = useState<string>(
    'Why did you do that?! This is completely ruined! You never listen to anyone!'
  );
  const [decompiledData, setDecompiledData] = useState<string | null>(null);

  // 2. Geometric Anchor state
  const [anchorName, setAnchorName] = useState<string>(() => {
    return localStorage.getItem('rsg_primary_anchor') || 'Clean Desk Solid Oak Block & Brass Compass';
  });
  const [anchorLocked, setAnchorLocked] = useState<boolean>(false);
  const [anchorCountdown, setAnchorCountdown] = useState<number>(15);

  // 3. Phase-Shift Resonance state
  const [selectedNode, setSelectedNode] = useState<string>('Foundational Physics Principles');
  const [handshakeActive, setHandshakeActive] = useState<boolean>(false);

  // 4. Glymphatic Boundary state
  const [purgedCount, setPurgedCount] = useState<number>(0);
  const [isPurging, setIsPurging] = useState<boolean>(false);

  // Decompile sentient static into raw data
  const handleDecompileStatic = () => {
    sound.playShieldDeflect();
    setDecompiledData(
      `[RAW PACKET METADATA DECODED]\n` +
      `• Source Signal: Sentient Static (360p Emotional Turbulence)\n` +
      `• Primary Driver: Amygdala Threat Spasm (Uncalibrated Fear / Ego Defense)\n` +
      `• Command Code Status: REJECTED (Zero execution authority inside internal simulation)\n` +
      `• Extracted Acoustic Data: Decibel peak ~78dB, lexical syntax: high generalization ("never", "ruined").\n` +
      `• Observer Conclusion: External system noise observed without somatic absorption.`
    );
  };

  // Run geometric anchor lock
  const handleLockAnchor = () => {
    setAnchorLocked(true);
    setAnchorCountdown(15);
    sound.playLaserLock();
    try {
      localStorage.setItem('rsg_primary_anchor', anchorName);
    } catch {}

    const interval = setInterval(() => {
      setAnchorCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setAnchorLocked(false);
          sound.playPhaseCue(3);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Initiate resonance handshake
  const handleInitiateHandshake = () => {
    sound.playTick();
    setHandshakeActive(true);
    setTimeout(() => {
      sound.playPhaseCue(4);
    }, 800);
  };

  // Execute Nightly Glymphatic Reset
  const handleRunPurge = () => {
    setIsPurging(true);
    sound.playPurgeStream();
    setTimeout(() => {
      setIsPurging(false);
      setPurgedCount((c) => c + 1);
    }, 1800);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>DEFENSE PROTOCOL // SELECTIVE PERMEABILITY SHIELD</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Selective Permeability Shield
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl">
          An electronic Faraday cage mixed with a biological cell membrane. Blocks 360p emotional static and toxic conduits, while remaining completely open to 1080p high-resolution resonance and software updates.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {[
          { id: 'acoustic', label: '1. Acoustic Buffer (Sentient Static)', icon: Radio },
          { id: 'geometric', label: '2. Geometric Anchor (Environment)', icon: Anchor },
          { id: 'resonance', label: '3. Phase-Shift Resonance (Handshake)', icon: Sparkles },
          { id: 'glymphatic', label: '4. Glymphatic Boundary (Nightly Reset)', icon: RefreshCw },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as typeof activeTab);
                sound.playTick(true);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === item.id
                  ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Panel Container */}
      <div className="rounded-xl border border-slate-800 bg-[#0B0E17] p-6 lg:p-8 space-y-6">
        {/* =========================================================================
            1. Acoustic Buffer (Sentient Static Filter)
           ========================================================================= */}
        {activeTab === 'acoustic' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>The Acoustic Buffer</span>
                <span className="text-xs font-mono text-cyan-400 font-normal">// Filtering Sentient Static</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                When around low-resolution humans emitting trauma static or anger clipping, their conduits attempt to sync with your mirror neurons. Use Abstraction (#28) to observe it as raw system noise, never command code.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
              <label className="block text-xs font-mono text-slate-400 uppercase">
                Incoming External Static Transmission (Scream / Accusation / Trauma)
              </label>
              <textarea
                rows={2}
                value={rawStaticInput}
                onChange={(e) => setRawStaticInput(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#07090E] border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />

              <button
                onClick={handleDecompileStatic}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span>Apply Abstraction (#28): Decompile to Raw Data</span>
              </button>

              {decompiledData && (
                <div className="p-4 rounded-lg bg-[#07090E] border border-cyan-900/60 font-mono text-xs text-cyan-300 whitespace-pre-line leading-relaxed">
                  {decompiledData}
                </div>
              )}
            </div>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 text-xs text-slate-300">
              <strong className="text-cyan-400 font-mono">RSG Core Logic:</strong> You see the watercolor blur of their emotional collapse without letting it harden into your internal ledger. It is their clipping error, not yours.
            </div>
          </div>
        )}

        {/* =========================================================================
            2. Geometric Shield (Environment Hardening)
           ========================================================================= */}
        {activeTab === 'geometric' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>The Geometric Shield</span>
                <span className="text-xs font-mono text-cyan-400 font-normal">// Environment Hardening</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Toxic environments act as a parasitic drain on Attention (#16). Establish a "Primary Anchor"—a physical hard-structure in your space that anchors your 1080p truth.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-slate-950 border border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Designate Your Primary Anchor (Physical Hard Object)
                </label>
                <input
                  type="text"
                  value={anchorName}
                  onChange={(e) => setAnchorName(e.target.value)}
                  placeholder="e.g. Clean Solid Oak Desk, Specific Plant, Brass Compass..."
                  className="w-full px-3 py-2 text-xs bg-[#07090E] border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {anchorLocked ? (
                <div className="p-6 rounded-lg bg-cyan-950/40 border border-cyan-500 text-center space-y-2">
                  <div className="text-3xl font-mono font-bold text-cyan-400">
                    00:{anchorCountdown.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-slate-200">
                    Target Locked on <strong>{anchorName}</strong>.
                  </div>
                  <div className="text-[11px] font-mono text-cyan-300">
                    All ambient environmental clutter muted. Internal refresh rate (#4) stabilizing...
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLockAnchor}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Execute #25 Laser-Lock on Anchor (15s Stabilization)</span>
                </button>
              )}
            </div>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 text-xs text-slate-300">
              <strong className="text-cyan-400 font-mono">Stabilization Protocol:</strong> Whenever environmental static escalates, lock eyes with your anchor for 15 seconds. This signals the genome to mute 99% of background noise.
            </div>
          </div>
        )}

        {/* =========================================================================
            3. Phase-Shift Resonance (High-Res Handshake)
           ========================================================================= */}
        {activeTab === 'resonance' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Phase-Shift Resonance</span>
                <span className="text-xs font-mono text-cyan-400 font-normal">// The Tuning Fork Handshake</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                You do not want to be a closed bunker. Use Pattern Recognition (#23) to identify 1080p High-Resolution Nodes (books, masters, environments) and execute a clean software patch.
              </p>
            </div>

            <div className="space-y-3">
              {[
                'Foundational Physics Principles (Feynman, Newton, Maxwell)',
                'Biological Invariants (Cellular Autophagy, Zone 2 Lactate)',
                'Master Craftsman Disciplines (Zero Friction, Perfect Joinery)',
                'Stoic Executive Protocols (Marcus Aurelius, Invariant Reason)',
              ].map((node) => {
                const isSelected = selectedNode === node;
                return (
                  <div
                    key={node}
                    onClick={() => {
                      setSelectedNode(node);
                      setHandshakeActive(false);
                      sound.playTick();
                    }}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-medium">{node}</div>
                    <span className="text-[11px] font-mono text-cyan-400">
                      1080p Verified Node
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleInitiateHandshake}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Initiate 1080p Handshake Protocol</span>
            </button>

            {handshakeActive && (
              <div className="p-4 rounded-lg bg-emerald-950/30 border border-emerald-800 font-mono text-xs text-emerald-300 space-y-1 animate-in fade-in">
                <div>✓ Handshake Protocol Verified // Phase Coherence: 99.8%</div>
                <div>✓ Layers #18 (Cognition) & #22 (Synthesis) opened to incoming node data.</div>
                <div>✓ Software patch merged into 1080p permanent truth ledger.</div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            4. Glymphatic Boundary (The Nightly Delete)
           ========================================================================= */}
        {activeTab === 'glymphatic' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>The Glymphatic Boundary</span>
                <span className="text-xs font-mono text-cyan-400 font-normal">// The Nightly Data Purge</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                No matter how much static you encounter during the day, you must not let it harden into your Memory Ledger (#15). Wash away the 360p watercolor residue with a 1080p clear stream before sleep.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-4">
              <div className="max-w-md mx-auto space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase">
                  Nightly Defragmentation Engine
                </div>
                <div className="text-sm text-slate-200">
                  Total Purge Sessions Executed: <strong className="text-cyan-400 font-mono">{purgedCount}</strong>
                </div>
              </div>

              {isPurging ? (
                <div className="p-6 rounded-lg bg-cyan-950/30 border border-cyan-800 text-cyan-300 font-mono text-xs space-y-2 animate-pulse">
                  <div>🌊 1080p Clear Stream Flowing...</div>
                  <div>Deleting cached static... Washing away emotional watercolor...</div>
                </div>
              ) : (
                <button
                  onClick={handleRunPurge}
                  className="px-6 py-3 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all cursor-pointer shadow-lg inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Execute Nightly Glymphatic Reset</span>
                </button>
              )}
            </div>

            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 text-xs text-slate-300">
              <strong className="text-cyan-400 font-mono">The Morning Guarantee:</strong> When you initialize tomorrow morning, your Initial Cells will be clean and completely unclipped by yesterday's pollution.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
