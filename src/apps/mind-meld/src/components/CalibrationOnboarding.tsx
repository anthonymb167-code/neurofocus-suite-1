import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Fingerprint,
  ArrowRight,
  Shield,
  Activity,
  Archive,
  Volume2,
  VolumeX,
  X,
  Compass,
} from 'lucide-react';
import { CalibrationArchiveData } from '../types/framework';
import { ambientSound } from '../utils/audio';

interface CalibrationOnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  data: CalibrationArchiveData;
  onSave: (data: CalibrationArchiveData) => void;
  onInitiateMeld: () => void;
}

export const CalibrationOnboarding: React.FC<CalibrationOnboardingProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onInitiateMeld,
}) => {
  const [screen, setScreen] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<CalibrationArchiveData>(data);
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [showArchivalProbes, setShowArchivalProbes] = useState<boolean>(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Thumbprint hold animation timer
  useEffect(() => {
    let timer: any;
    if (isHolding) {
      timer = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            handlePledgeCompleted();
            return 100;
          }
          return prev + 5;
        });
      }, 50);
    } else {
      setHoldProgress(0);
    }
    return () => clearInterval(timer);
  }, [isHolding]);

  const handlePledgeCompleted = () => {
    const updated = { ...formData, anonymityOathConfirmed: true };
    setFormData(updated);
    onSave(updated);
    ambientSound.playSparkChime();
    setTimeout(() => {
      onInitiateMeld();
      onClose();
    }, 600);
  };

  const handleToggleSound = () => {
    const active = ambientSound.toggle();
    setAudioActive(active);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md transition-all duration-700">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-10 text-slate-100 overflow-hidden">
        {/* Subtle background ambient pulse glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 font-mono text-slate-400">
            <span className="text-amber-400 uppercase tracking-wider font-semibold">
              STAGE 1: THE CALIBRATION
            </span>
            <span aria-hidden="true">·</span>
            <span>Zero-Point Archive Recovery</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                audioActive
                  ? 'border-cyan-500 text-cyan-400 bg-cyan-950/40'
                  : 'border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle atmospheric 432Hz theta drone"
            >
              {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SCREEN 1: THE SILENCE */}
        {screen === 1 && (
          <div className="py-8 space-y-6 animate-in fade-in duration-500">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Take a breath.
            </h3>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed max-w-xl">
              <p>
                If your mind feels blank... if you can't remember the last time you felt
                lit up by anything... that is entirely okay.
              </p>
              <p className="text-slate-400">
                You haven't lost who you are. You've just survived so long under noise,
                expectations, and static that your optimal self has gone dark to protect
                itself.
              </p>
              <p className="text-slate-400">
                We aren't going to force you to invent a brand-new future today. We are
                just going to look for the footprints left behind.
              </p>
            </div>

            <div className="pt-6 flex justify-start">
              <button
                onClick={() => setScreen(2)}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Begin the Recovery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: THE AMNESIA ACKNOWLEDGMENT & STATIC NOISE DUMP */}
        {screen === 2 && (
          <div className="py-6 space-y-6 animate-in fade-in duration-500">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                Step 1 of 3: The Static Check
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Drop the Heaviest Stone You're Carrying
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Most apps ask: "What is your passion? What is your dream?" If you're
                empty right now, that question feels like a brick wall. So let's drop it
                entirely.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2 font-medium">
                Look at your current week. What specific routine, obligation, or
                expectation makes your chest feel tight just thinking about it?
              </label>
              <textarea
                value={formData.staticNoiseDump}
                onChange={(e) =>
                  setFormData({ ...formData, staticNoiseDump: e.target.value })
                }
                placeholder="Drop the raw static here—no filtering, no optimistic polish. What is exhausting you the most right now?"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-500 resize-none leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setScreen(1)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => {
                  onSave(formData);
                  setScreen(3);
                }}
                disabled={!formData.staticNoiseDump.trim()}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-white text-slate-900 font-semibold rounded-lg text-xs transition-colors disabled:opacity-40 cursor-pointer"
              >
                <span>Dissolve Static & Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: BYPASSING THE BLANKNESS & SOMATIC BASELINE */}
        {screen === 3 && (
          <div className="py-6 space-y-6 animate-in fade-in duration-500">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                Step 2 of 3: Somatic Baseline
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                When Memory Goes Offline, The Body Remembers
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Let's bypass analytical thoughts entirely. Think back over the last
                month. Even if it was just for five minutes—eating a meal in silence,
                organizing a drawer, or fixing a broken bracket—when did your shoulders
                actually drop?
              </p>
            </div>

            {/* Energy vs Dilation Slider */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Current Nervous System State:</span>
                <span
                  className={`font-bold ${
                    formData.energyVsDilationScore > 0
                      ? 'text-cyan-400'
                      : formData.energyVsDilationScore < 0
                      ? 'text-amber-400'
                      : 'text-slate-400'
                  }`}
                >
                  {formData.energyVsDilationScore > 0
                    ? `+${formData.energyVsDilationScore} (Flow State)`
                    : formData.energyVsDilationScore < 0
                    ? `${formData.energyVsDilationScore} (High Drain)`
                    : '0 (Neutral / Numb)'}
                </span>
              </div>

              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={formData.energyVsDilationScore}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    energyVsDilationScore: Number(e.target.value),
                  })
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>-5 Total Executive Burnout</span>
                <span>0 Numb/Dissociated</span>
                <span>+5 Deep Kinetic Flow</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2 font-medium">
                Log the last moment you felt your shoulders drop or noise quiet down:
              </label>
              <input
                type="text"
                value={formData.baselineShouldersDroppedMoment}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    baselineShouldersDroppedMoment: e.target.value,
                  })
                }
                placeholder="e.g. Refactoring a messy function late Sunday night while lo-fi beats played..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-500"
              />
            </div>

            {/* Archival Excavation Probes Toggle */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowArchivalProbes(!showArchivalProbes)}
                className="text-xs text-amber-400 font-mono hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Archive className="w-3.5 h-3.5" />
                <span>
                  {showArchivalProbes
                    ? 'Hide Deep Memory Probes'
                    : 'Open Deep Memory Retrieval Probes (Optional)'}
                </span>
              </button>

              {showArchivalProbes && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4 text-xs">
                  <div>
                    <span className="font-semibold text-slate-200 font-mono block mb-1">
                      1. The Pre-Corruption Probe:
                    </span>
                    <p className="text-slate-400 mb-1.5">
                      Think back to age 10–16 before worrying about careers. What was an
                      activity you did purely for kinetic joy where time vanished?
                    </p>
                    <input
                      type="text"
                      value={formData.preCorruptionMemory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preCorruptionMemory: e.target.value,
                        })
                      }
                      placeholder="e.g. Taking apart radios or drawing elaborate level designs..."
                      className="w-full px-3 py-1.5 rounded border border-slate-700 bg-slate-900 text-slate-200"
                    />
                  </div>

                  <div>
                    <span className="font-semibold text-slate-200 font-mono block mb-1">
                      2. The Contradiction Audit (Cringe Compass):
                    </span>
                    <p className="text-slate-400 mb-1.5">
                      Which specific part of your daily routine causes the deepest
                      internal cringe ("Why am I even pretending to care about this?")?
                    </p>
                    <input
                      type="text"
                      value={formData.contradictionAuditCringe}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contradictionAuditCringe: e.target.value,
                        })
                      }
                      placeholder="e.g. Nodding in performative status meetings..."
                      className="w-full px-3 py-1.5 rounded border border-slate-700 bg-slate-900 text-slate-200"
                    />
                  </div>

                  <div>
                    <span className="font-semibold text-slate-200 font-mono block mb-1">
                      3. The Envy Detector:
                    </span>
                    <p className="text-slate-400 mb-1.5">
                      Who have you secretly envied recently? Strip money/fame—what specific
                      trait or freedom do they have that your soul screams for?
                    </p>
                    <input
                      type="text"
                      value={formData.envyDetectorInsight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          envyDetectorInsight: e.target.value,
                        })
                      }
                      placeholder="e.g. Envious of quiet craftsmen who work in deep isolation..."
                      className="w-full px-3 py-1.5 rounded border border-slate-700 bg-slate-900 text-slate-200"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setScreen(2)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => {
                  onSave(formData);
                  setScreen(4);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-white text-slate-900 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
              >
                <span>Proceed to The Anonymity Oath</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: THE ANONYMITY OATH (DIGITAL THUMBPRINT PLEDGE) */}
        {screen === 4 && (
          <div className="py-6 space-y-6 text-center animate-in fade-in duration-500">
            <div className="max-w-md mx-auto space-y-2">
              <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                Step 3 of 3: The Seal
              </span>
              <h3 className="text-2xl font-bold text-white">The Anonymity Oath</h3>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                Everything you've been chasing—the approval, the titles, the visibility,
                the pressure to figure it all out—that belongs to the static. The optimal
                self you forgot doesn't care about a public scoreboard.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 max-w-md mx-auto text-xs text-slate-300 italic leading-relaxed">
              "I pledge to look for a path I would walk even if no one else ever knew I
              was doing it. I trade public validation for intrinsic capacity."
            </div>

            {/* Hold to Confirm Touch Target */}
            <div className="pt-4 flex flex-col items-center justify-center">
              <button
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onTouchStart={() => setIsHolding(true)}
                onTouchEnd={() => setIsHolding(false)}
                className="relative w-28 h-28 rounded-full bg-slate-800/80 border-2 border-slate-700 hover:border-cyan-400 flex flex-col items-center justify-center transition-all cursor-pointer select-none active:scale-95 overflow-hidden"
              >
                {/* Radial progress filling */}
                <div
                  className="absolute bottom-0 left-0 right-0 bg-cyan-500/30 transition-all pointer-events-none"
                  style={{ height: `${holdProgress}%` }}
                />

                <Fingerprint
                  className={`w-12 h-12 relative z-10 transition-colors ${
                    holdProgress > 50 ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                />
                <span className="text-[10px] font-mono text-slate-300 mt-1 relative z-10">
                  {holdProgress > 0 ? `${holdProgress}%` : 'Hold to Seal'}
                </span>
              </button>

              <p className="text-[11px] font-mono text-slate-500 mt-3">
                Press and hold to seal the oath and initiate the Mind Meld
              </p>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setScreen(3)}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                Back to previous step
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
