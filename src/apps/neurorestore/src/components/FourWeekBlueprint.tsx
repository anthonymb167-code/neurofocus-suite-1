import React, { useState, useEffect } from 'react';
import { FOUR_WEEK_BLUEPRINT } from '../data/blueprint.ts';
import { WeeklyProtocol } from '../types/neuro.ts';
import confetti from 'canvas-confetti';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  Brain,
  Layers,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';

export const FourWeekBlueprint: React.FC = () => {
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const [completedRoutines, setCompletedRoutines] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('neurorestore_completed_routines');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('neurorestore_completed_routines', JSON.stringify(completedRoutines));
    } catch {
      // storage unavailable
    }
  }, [completedRoutines]);

  const activeProtocol = FOUR_WEEK_BLUEPRINT.find((p) => p.week === selectedWeekNum) || FOUR_WEEK_BLUEPRINT[0];

  const toggleDayCompletion = (day: number) => {
    setCompletedRoutines((prev) => {
      const next = { ...prev, [day]: !prev[day] };
      if (!prev[day]) {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
      }
      return next;
    });
  };

  const totalDaysCompleted = Object.values(completedRoutines).filter(Boolean).length;
  const currentWeekDaysCompleted = activeProtocol.dailyRoutines.filter((r) => completedRoutines[r.day]).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Editorial Title */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>PROGRAM ARCHITECTURE</span>
          <span aria-hidden="true">·</span>
          <span>4-WEEK NEUROPLASTIC RECOVERY</span>
          <span aria-hidden="true">·</span>
          <span>PROGRESSIVE COGNITIVE LOADING</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-100">
          The 4-Week Cognitive Restoration Blueprint
        </h1>
        <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
          Because this is a functional block rather than structural damage, your cognitive capacity remains entirely intact. Re-establishing access requires treating the block not as a broken gear, but as an active security protocol that needs to be safely decommissioned.
        </p>
      </div>

      {/* Program Core Principles Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">The Rule of Micro-Successes</h3>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              To prevent triggering the stress-response firewall, all cognitive tasks start below your historical threshold and scale progressively. Guaranteed wins prevent cortisol spikes.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Neuro-Chemical Priming</h3>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              Every cognitive session is preceded by an autonomic activity that lowers cortisol (NSDR, sensory anchor) or spikes dopamine/acetylcholine/BDNF (novelty, Zone 2 exercise) to maximize neuroplasticity.
            </p>
          </div>
        </div>
      </div>

      {/* Week Navigation Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {FOUR_WEEK_BLUEPRINT.map((protocol) => {
          const isSelected = selectedWeekNum === protocol.week;
          const weekDoneCount = protocol.dailyRoutines.filter((r) => completedRoutines[r.day]).length;
          return (
            <button
              key={protocol.week}
              onClick={() => setSelectedWeekNum(protocol.week)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500/60 shadow-sm'
                  : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-mono text-cyan-400">WEEK {protocol.week}</span>
                <span className="font-mono tabular-nums">{weekDoneCount}/7 DAYS</span>
              </div>
              <div className="text-sm font-semibold text-slate-100 line-clamp-1">{protocol.title}</div>
              <div className="text-xs text-slate-400 line-clamp-1 mt-1">{protocol.targetMechanism}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Week Clinical Blueprint Dashboard */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-8">
        {/* Week Title & Subtitle */}
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              STAGE 0{activeProtocol.week} REHABILITATION BLUEPRINT
            </span>
            <span className="text-xs font-mono text-slate-400">
              {currentWeekDaysCompleted} OF 7 PROTOCOLS ACTIVE
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">{activeProtocol.title}</h2>
          <p className="text-sm text-cyan-200/80">{activeProtocol.subtitle}</p>
        </div>

        {/* 3 Pillars of this Week: Clinical CBT, Neuroplastic Strategy, Cognitive Load */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pillar 1: Clinical CBT Strategy */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Brain className="w-4 h-4" />
              <span>CLINICAL STRATEGY (CBT)</span>
            </div>
            <h3 className="text-base font-semibold text-slate-200">{activeProtocol.clinicalStrategy.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {activeProtocol.clinicalStrategy.description}
            </p>
            <ul className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
              {activeProtocol.clinicalStrategy.actionItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 shrink-0">·</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pillar 2: Neuroplastic Strategy */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>NEUROPLASTIC RE-WIRING</span>
            </div>
            <h3 className="text-base font-semibold text-slate-200">{activeProtocol.neuroplasticStrategy.name}</h3>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-slate-300 block mb-0.5">The Protocol:</span>
                <p className="text-slate-400 leading-relaxed">{activeProtocol.neuroplasticStrategy.protocol}</p>
              </div>
              <div className="pt-2 border-t border-slate-800/80">
                <span className="font-semibold text-slate-300 block mb-0.5">The Biological Mechanism:</span>
                <p className="text-slate-400 leading-relaxed">{activeProtocol.neuroplasticStrategy.mechanism}</p>
              </div>
            </div>
          </div>

          {/* Pillar 3: Cognitive Load Bounds */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Target className="w-4 h-4" />
              <span>COGNITIVE LOAD ENVELOPE</span>
            </div>
            <h3 className="text-base font-semibold text-slate-200">{activeProtocol.cognitiveLoad.level}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {activeProtocol.cognitiveLoad.description}
            </p>
            <ul className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
              {activeProtocol.cognitiveLoad.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 shrink-0">·</span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Daily Schedule Checklist for Selected Week */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-200">Daily Execution Syllabus</h3>
            <span className="text-xs font-mono text-slate-400">NON-EVALUATIVE TRACKING</span>
          </div>

          <div className="space-y-2">
            {activeProtocol.dailyRoutines.map((routine) => {
              const isDone = !!completedRoutines[routine.day];
              return (
                <div
                  key={routine.day}
                  onClick={() => toggleDayCompletion(routine.day)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                    isDone
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        isDone
                          ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                          : 'border-slate-700 bg-slate-900 text-transparent hover:border-slate-600'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-cyan-400">DAY {routine.day}</span>
                        <span aria-hidden="true" className="text-xs text-slate-600">·</span>
                        <span className={`text-sm font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                          {routine.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{routine.task}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 shrink-0 ml-4">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{routine.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
