import React, { useState, useEffect, useRef } from 'react';
import { SIDEWAYS_PROMPTS, LATERAL_COMBINATIONS } from '../data/prompts.ts';
import { SidewaysPrompt } from '../types/neuro.ts';
import { audioEngine } from '../utils/audioEngine.ts';
import confetti from 'canvas-confetti';
import {
  ShieldAlert,
  Compass,
  Feather,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Brain,
  HelpCircle,
  Download,
  AlertCircle
} from 'lucide-react';

interface SandboxStudioProps {
  onCompleteExercise?: () => void;
}

export const SandboxStudio: React.FC<SandboxStudioProps> = ({ onCompleteExercise }) => {
  // Current Step in the 3-step sequence (1: Sensory Anchor, 2: Sideways Prompt, 3: Stream Flow)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedPromptId, setSelectedPromptId] = useState<string>('day-1');
  const [activeModuleFilter, setActiveModuleFilter] = useState<'ALL' | 'A' | 'B' | 'C'>('ALL');

  // Custom prompt state
  const [customPromptText, setCustomPromptText] = useState<string | null>(null);
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);

  // Step 1: Sensory Anchor Timer & Breathing Pacer
  const [anchorTimeRemaining, setAnchorTimeRemaining] = useState<number>(90); // 1.5 min
  const [anchorActive, setAnchorActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');

  // Step 3: Stream Flow state
  const [flowDurationMinutes, setFlowDurationMinutes] = useState<number>(5);
  const [flowSecondsRemaining, setFlowSecondsRemaining] = useState<number>(300);
  const [isFlowRunning, setIsFlowRunning] = useState<boolean>(false);
  const [flowText, setFlowText] = useState<string>('');
  const [forwardOnlyMode, setForwardOnlyMode] = useState<boolean>(false);
  const [audioMode, setAudioMode] = useState<'none' | 'alpha' | 'brown'>('brown');
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);

  const selectedPrompt = customPromptText
    ? {
        id: 'custom',
        day: 0,
        module: 'A' as const,
        moduleTitle: 'Custom Lateral Synthesis',
        title: 'Custom Cross-Domain Lateral Synthesis',
        prompt: customPromptText,
        subtext: 'Bypass the protective gatekeeper by mapping structural parallels between these disparate concepts.',
        neuroRationale: 'Zero-evaluative conceptual mapping removes the risk of being "wrong", allowing prefrontal synapses to fire freely.',
        divergenceSeeds: ['Structural fault-lines', 'Resource bottlenecks', 'Equilibrium recovery']
      }
    : SIDEWAYS_PROMPTS.find((p) => p.id === selectedPromptId) || SIDEWAYS_PROMPTS[0];

  // Breath pacer cycle for Step 1
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (anchorActive && anchorTimeRemaining > 0) {
      interval = setInterval(() => {
        setAnchorTimeRemaining((prev) => {
          if (prev <= 1) {
            setAnchorActive(false);
            audioEngine.playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [anchorActive, anchorTimeRemaining]);

  // Breathing 4-4-4-2 cycle
  useEffect(() => {
    if (!anchorActive) return;
    const cycleTime = (90 - anchorTimeRemaining) % 14;
    if (cycleTime < 4) setBreathPhase('Inhale');
    else if (cycleTime < 8) setBreathPhase('Hold');
    else if (cycleTime < 12) setBreathPhase('Exhale');
    else setBreathPhase('Rest');
  }, [anchorActive, anchorTimeRemaining]);

  // Stream flow timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isFlowRunning && flowSecondsRemaining > 0) {
      interval = setInterval(() => {
        setFlowSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsFlowRunning(false);
            audioEngine.stop();
            audioEngine.playChime();
            setSessionCompleted(true);
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
            if (onCompleteExercise) onCompleteExercise();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFlowRunning, flowSecondsRemaining, onCompleteExercise]);

  const handleToggleAudio = (mode: 'none' | 'alpha' | 'brown') => {
    setAudioMode(mode);
    if (mode === 'none') {
      audioEngine.stop();
    } else if (mode === 'alpha') {
      audioEngine.startAlphaFlow();
    } else if (mode === 'brown') {
      audioEngine.startBrownNoise();
    }
  };

  const handleStartFlow = () => {
    setIsFlowRunning(true);
    setFlowSecondsRemaining(flowDurationMinutes * 60);
    setSessionCompleted(false);
    if (audioMode === 'brown') audioEngine.startBrownNoise();
    else if (audioMode === 'alpha') audioEngine.startAlphaFlow();
  };

  const handleStopFlow = () => {
    setIsFlowRunning(false);
    audioEngine.stop();
  };

  const handleResetFlow = () => {
    setIsFlowRunning(false);
    audioEngine.stop();
    setFlowSecondsRemaining(flowDurationMinutes * 60);
    setSessionCompleted(false);
  };

  const handleInjectRescueAnchor = () => {
    const rescuePhrases = [
      ' [Anchor: The surface of the desk is cool, the air is still, the mechanism continues...] ',
      ' [Anchor: Shifting focus back to the structure of the concept, ignoring all evaluation...] ',
      ' [Anchor: Describing the physical geometry of the room to keep the fluid motion alive...] '
    ];
    const phrase = rescuePhrases[Math.floor(Math.random() * rescuePhrases.length)];
    setFlowText((prev) => prev + phrase);
  };

  const generateRandomLateralPrompt = () => {
    const dA = LATERAL_COMBINATIONS.domainA[Math.floor(Math.random() * LATERAL_COMBINATIONS.domainA.length)];
    const dB = LATERAL_COMBINATIONS.domainB[Math.floor(Math.random() * LATERAL_COMBINATIONS.domainB.length)];
    const angle = LATERAL_COMBINATIONS.angles[Math.floor(Math.random() * LATERAL_COMBINATIONS.angles.length)];
    const generated = angle.replace('[A]', `"${dA}"`).replace('[B]', `"${dB}"`);
    setCustomPromptText(generated);
  };

  const handleDownloadSession = () => {
    const blob = new Blob(
      [
        `NEURORESTORE DE-FRAMING SESSION\n` +
          `Date: ${new Date().toISOString()}\n` +
          `Prompt: ${selectedPrompt.title}\n` +
          `Question: ${selectedPrompt.prompt}\n\n` +
          `STREAM-OF-CONSCIOUSNESS OUTPUT:\n\n` +
          flowText
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neurorestore-deframing-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredPrompts = SIDEWAYS_PROMPTS.filter(
    (p) => activeModuleFilter === 'ALL' || p.module === activeModuleFilter
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Editorial Header Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>CLINICAL PROTOCOL</span>
          <span aria-hidden="true">·</span>
          <span>LATERAL COGNITIVE ENGAGEMENT</span>
          <span aria-hidden="true">·</span>
          <span>DEFENSE FIREWALL BYPASS</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-100 max-w-3xl">
          The "Sandbox De-framing" Daily Exercise
        </h1>
        <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
          When psychogenic suppression and internalized stigma are active, forcing your brain to "perform" or "be smart" flags the task as a social or psychological threat, triggering a cognitive freeze. We trick the executive network into running high-level processing under a zero-stakes, non-evaluative task.
        </p>
      </div>

      {/* 3-Step Sequence Progress Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 bg-slate-900/80 rounded-xl border border-slate-800">
        <button
          onClick={() => setCurrentStep(1)}
          className={`flex items-start gap-3 p-3.5 rounded-lg text-left transition-all cursor-pointer ${
            currentStep === 1
              ? 'bg-slate-800 text-slate-100 shadow-sm border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <div className={`p-2 rounded-md shrink-0 ${currentStep === 1 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-0.5">STEP 1 (1–2 MIN)</div>
            <div className="text-sm font-semibold">Sensory Anchor</div>
            <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">Cool down HPA axis & cortisol</div>
          </div>
        </button>

        <button
          onClick={() => setCurrentStep(2)}
          className={`flex items-start gap-3 p-3.5 rounded-lg text-left transition-all cursor-pointer ${
            currentStep === 2
              ? 'bg-slate-800 text-slate-100 shadow-sm border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <div className={`p-2 rounded-md shrink-0 ${currentStep === 2 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-0.5">STEP 2 (5–8 MIN)</div>
            <div className="text-sm font-semibold">The Sideways Prompt</div>
            <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">Abstract synthesis with zero metrics</div>
          </div>
        </button>

        <button
          onClick={() => setCurrentStep(3)}
          className={`flex items-start gap-3 p-3.5 rounded-lg text-left transition-all cursor-pointer ${
            currentStep === 3
              ? 'bg-slate-800 text-slate-100 shadow-sm border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <div className={`p-2 rounded-md shrink-0 ${currentStep === 3 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
            <Feather className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-0.5">STEP 3 (3–5 MIN)</div>
            <div className="text-sm font-semibold">Stream Flow Sandbox</div>
            <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">Uninhibited output, zero monitoring</div>
          </div>
        </button>
      </div>

      {/* ================= STEP 1: SENSORY ANCHOR ================= */}
      {currentStep === 1 && (
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Biological Grounding Routine</span>
              <h2 className="text-2xl font-bold text-slate-100 mt-1">1. Establish the Sensory Anchor</h2>
              <p className="text-sm text-slate-400 mt-1">
                Before opening cognitive pathways, signal to your amygdala that your immediate physical space is safe from social evaluation.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (anchorActive) setAnchorActive(false);
                  else {
                    setAnchorActive(true);
                    if (anchorTimeRemaining === 0) setAnchorTimeRemaining(90);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                {anchorActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{anchorActive ? 'Pause Anchor' : 'Start 90s Breath Calibration'}</span>
              </button>
              <button
                onClick={() => {
                  setAnchorActive(false);
                  setAnchorTimeRemaining(90);
                }}
                className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Somatic Triad Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-cyan-400">SENSATION 01</div>
              <h3 className="text-base font-semibold text-slate-200">Somatic Gravitation</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Feel the physical weight of your body pressing into your chair. Observe the firmness of the contact points.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-cyan-400">SENSATION 02</div>
              <h3 className="text-base font-semibold text-slate-200">Thermal Boundary</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Notice the temperature of the air moving across the skin on your hands and face. Contrast cool air with warm clothing.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-cyan-400">SENSATION 03</div>
              <h3 className="text-base font-semibold text-slate-200">Autonomic Rhythm</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Follow the rise and fall of your lower diaphragm. Extend each exhalation slightly longer than the inhalation.
              </p>
            </div>
          </div>

          {/* Visual Physiological Pacer */}
          <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative flex items-center justify-center">
              <div
                className={`w-36 h-36 rounded-full border-2 transition-all duration-1000 flex items-center justify-center ${
                  breathPhase === 'Inhale'
                    ? 'border-cyan-400 scale-125 bg-cyan-500/10 shadow-[0_0_25px_rgba(6,182,212,0.3)]'
                    : breathPhase === 'Hold'
                    ? 'border-amber-400 scale-125 bg-amber-500/10'
                    : breathPhase === 'Exhale'
                    ? 'border-indigo-400 scale-90 bg-indigo-500/10'
                    : 'border-slate-600 scale-100 bg-transparent'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-sm font-bold tracking-wider uppercase text-slate-200">
                    {anchorActive ? breathPhase : 'Ready'}
                  </div>
                  <div className="text-xs font-mono text-cyan-400 tabular-nums">
                    {Math.floor(anchorTimeRemaining / 60)}:
                    {(anchorTimeRemaining % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-md text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">The Neuro-Goal:</p>
              <p>
                Prolonged exhalation activates the vagus nerve, reducing heart rate and signaling the hypothalamus to halt cortisol secretion. This unlocks the prefrontal cortex's working memory registers.
              </p>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              className="mt-2 flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <span>Proceed to Step 2: Select Sideways Prompt</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: SIDEWAYS PROMPT ================= */}
      {currentStep === 2 && (
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Abstract Conceptual Synthesis</span>
              <h2 className="text-2xl font-bold text-slate-100 mt-1">2. Select Your Sideways Prompt</h2>
              <p className="text-sm text-slate-400 mt-1">
                Because these prompts have no "correct" answer, your brain cannot fail. Internalized stigma is neutralized.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={generateRandomLateralPrompt}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-lg border border-cyan-500/20 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Spin Custom Synthesis</span>
              </button>
            </div>
          </div>

          {/* Module Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setActiveModuleFilter('ALL');
                setCustomPromptText(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeModuleFilter === 'ALL' && !customPromptText
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              All 15 Curated Prompts
            </button>
            <button
              onClick={() => {
                setActiveModuleFilter('A');
                setCustomPromptText(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeModuleFilter === 'A' && !customPromptText
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Module A: Cosmic & Physics (Days 1–5)
            </button>
            <button
              onClick={() => {
                setActiveModuleFilter('B');
                setCustomPromptText(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeModuleFilter === 'B' && !customPromptText
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Module B: Identity & Bridges (Days 6–10)
            </button>
            <button
              onClick={() => {
                setActiveModuleFilter('C');
                setCustomPromptText(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeModuleFilter === 'C' && !customPromptText
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Module C: Bio & Cybernetics (Days 11–15)
            </button>
          </div>

          {/* Active Prompt Spotlight Card */}
          <div className="p-6 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
              <span>{customPromptText ? 'CUSTOM SYNTHESIS SEED' : `DAY ${selectedPrompt.day} · MODULE ${selectedPrompt.module}`}</span>
              <span>ZERO EVALUATION METRIC</span>
            </div>
            <h3 className="text-xl font-bold text-slate-100">{selectedPrompt.title}</h3>
            <p className="text-lg text-cyan-200/90 leading-relaxed font-serif italic">
              "{selectedPrompt.prompt}"
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              {selectedPrompt.subtext}
            </p>

            <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-slate-300 block mb-1">Divergence Angles to Explore:</span>
                <ul className="space-y-1 text-slate-400">
                  {selectedPrompt.divergenceSeeds.map((seed, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-cyan-400">·</span>
                      <span>{seed}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-semibold text-slate-300 block mb-1">Why this bypasses the gatekeeper:</span>
                <p className="text-slate-400 leading-relaxed">{selectedPrompt.neuroRationale}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                <span>Engage Stream Flow with this Prompt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Prompt Selection Grid */}
          {!customPromptText && (
            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-400">SELECT ANOTHER CURATED PROMPT:</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {filteredPrompts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPromptId(p.id)}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedPromptId === p.id
                        ? 'bg-slate-800/90 border-cyan-500/50 shadow-sm'
                        : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Day {p.day}</span>
                      <span>Mod {p.module}</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-200 line-clamp-1">{p.title}</div>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">{p.prompt}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= STEP 3: STREAM FLOW SANDBOX ================= */}
      {currentStep === 3 && (
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          {/* Header & Flow Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span>STEP 3 · STREAM-OF-CONSCIOUSNESS OUTPUT</span>
                <span aria-hidden="true">·</span>
                <span>ZERO TRACKING ENFORCED</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-100">{selectedPrompt.title}</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Rule: Write continuously without pausing to edit, correct grammar, or judge vocabulary. If your brain stutters, describe the physical room until fluid momentum returns.
              </p>
            </div>

            {/* Timer and Audio Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Duration selector */}
              {!isFlowRunning && (
                <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg text-xs">
                  {[3, 5, 8].map((min) => (
                    <button
                      key={min}
                      onClick={() => {
                        setFlowDurationMinutes(min);
                        setFlowSecondsRemaining(min * 60);
                      }}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        flowDurationMinutes === min
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {min}m
                    </button>
                  ))}
                </div>
              )}

              {/* Countdown badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg font-mono text-sm text-cyan-300 tabular-nums">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>
                  {Math.floor(flowSecondsRemaining / 60)}:
                  {(flowSecondsRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Start/Pause */}
              <button
                onClick={isFlowRunning ? handleStopFlow : handleStartFlow}
                className={`flex items-center gap-2 px-4 py-2 font-semibold text-xs rounded-lg transition-colors cursor-pointer ${
                  isFlowRunning
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                }`}
              >
                {isFlowRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isFlowRunning ? 'Pause Flow' : 'Begin Stream'}</span>
              </button>

              <button
                onClick={handleResetFlow}
                className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Prompt Reference Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-sm">
            <span className="text-xs font-mono uppercase text-slate-400 block mb-1">Active Exploration Bridge:</span>
            <p className="text-slate-200 font-medium italic">"{selectedPrompt.prompt}"</p>
          </div>

          {/* Neuro Safeguard Settings */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800/80">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={forwardOnlyMode}
                  onChange={(e) => setForwardOnlyMode(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Forward-Only Mode (Disables Backspace self-editing)</span>
              </label>

              <span className="hidden sm:inline text-slate-600">|</span>

              <div className="flex items-center gap-2">
                <span>Acoustic Priming:</span>
                <button
                  onClick={() => handleToggleAudio('brown')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    audioMode === 'brown' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
                  }`}
                >
                  Brown Noise
                </button>
                <button
                  onClick={() => handleToggleAudio('alpha')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    audioMode === 'alpha' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
                  }`}
                >
                  10Hz Alpha
                </button>
                <button
                  onClick={() => handleToggleAudio('none')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    audioMode === 'none' ? 'bg-slate-800 text-slate-300' : 'text-slate-500'
                  }`}
                >
                  Off
                </button>
              </div>
            </div>

            {/* Emergency Freeze Unblocker */}
            <button
              onClick={handleInjectRescueAnchor}
              className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 underline underline-offset-4 cursor-pointer"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Mind Frozen? Inject Somatic Anchor</span>
            </button>
          </div>

          {/* Zero-Tracking Writing Canvas */}
          <div className="relative">
            <textarea
              value={flowText}
              onChange={(e) => setFlowText(e.target.value)}
              onKeyDown={(e) => {
                if (forwardOnlyMode && (e.key === 'Backspace' || e.key === 'Delete')) {
                  e.preventDefault();
                }
              }}
              // spellCheck false is critical: no red squiggles to trigger internal error monitor!
              spellCheck={false}
              placeholder="Begin writing continuously here. Let your thoughts cascade naturally. Do not pause to edit, correct spelling, or re-read previous sentences. If you hesitate, describe the temperature of your hands or the sound in the room until the momentum resumes..."
              className="w-full h-80 p-6 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 text-slate-200 placeholder:text-slate-600 font-sans text-base leading-relaxed resize-none transition-colors outline-none"
            />
          </div>

          {/* Session Complete Debrief & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Zero scores. Zero character counts. Your prefrontal cortex just executed high-level synthesis completely unbothered by the gatekeeper.
              </span>
            </div>

            <div className="flex items-center gap-3">
              {flowText.length > 0 && (
                <button
                  onClick={handleDownloadSession}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Journal Note</span>
                </button>
              )}
              <button
                onClick={() => {
                  setSessionCompleted(true);
                  confetti({ particleCount: 50, spread: 70 });
                }}
                className="flex items-center gap-2 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Practice Complete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
