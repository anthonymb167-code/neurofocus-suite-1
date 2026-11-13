import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Dice5,
  HelpCircle,
  Sparkles,
  RotateCcw,
  BookOpen,
  Timer,
  Clock,
  Sliders,
  Flame,
  Plus,
  Trash2,
  Zap,
} from 'lucide-react';
import {
  DIAGNOSTIC_QUESTIONS,
  FILTERS,
  STOCHASTIC_OBJECTS,
  PROFILE_MARCUS,
  PROFILE_ELENA,
} from '../data/presets';
import { EnergyAuditItem, FilterKey, StochasticObject } from '../types/framework';
import { ambientSound } from '../utils/audio';

interface DiagnosticSuiteProps {
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, value: string) => void;
  activeFilter: FilterKey;
  onFilterChange: (filter: FilterKey) => void;
  energyAuditItems: EnergyAuditItem[];
  onUpdateEnergyAuditItems: (items: EnergyAuditItem[]) => void;
}

export const DiagnosticSuite: React.FC<DiagnosticSuiteProps> = ({
  answers,
  onAnswerChange,
  activeFilter,
  onFilterChange,
  energyAuditItems,
  onUpdateEnergyAuditItems,
}) => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);
  const [stochasticIndex, setStochasticIndex] = useState<number>(0);
  const [shakeActive, setShakeActive] = useState<boolean>(false);

  // 15-second raw input countdown timer for Q10
  const [timerSeconds, setTimerSeconds] = useState<number>(15);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // New energy audit item input
  const [newActivity, setNewActivity] = useState<string>('');
  const [newActivityScore, setNewActivityScore] = useState<number>(4);

  const currentQuestion = DIAGNOSTIC_QUESTIONS[selectedQuestionIndex];
  const currentFilter = FILTERS.find((f) => f.id === currentQuestion.filterId)!;
  const currentObject: StochasticObject = STOCHASTIC_OBJECTS[stochasticIndex];

  // Timer effect for Q10 Raw Input Pad
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      ambientSound.playSparkChime();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const startRawInputTimer = () => {
    setTimerSeconds(15);
    setIsTimerRunning(true);
  };

  const rollRandomObject = () => {
    setShakeActive(true);
    let nextIdx = Math.floor(Math.random() * STOCHASTIC_OBJECTS.length);
    if (nextIdx === stochasticIndex) {
      nextIdx = (stochasticIndex + 1) % STOCHASTIC_OBJECTS.length;
    }
    setStochasticIndex(nextIdx);
    ambientSound.playSparkChime();
    setTimeout(() => setShakeActive(false), 600);
  };

  const handleNext = () => {
    if (selectedQuestionIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      const nextIndex = selectedQuestionIndex + 1;
      setSelectedQuestionIndex(nextIndex);
      onFilterChange(DIAGNOSTIC_QUESTIONS[nextIndex].filterId);
    }
  };

  const handlePrev = () => {
    if (selectedQuestionIndex > 0) {
      const prevIndex = selectedQuestionIndex - 1;
      setSelectedQuestionIndex(prevIndex);
      onFilterChange(DIAGNOSTIC_QUESTIONS[prevIndex].filterId);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setSelectedQuestionIndex(index);
    onFilterChange(DIAGNOSTIC_QUESTIONS[index].filterId);
  };

  const handleFilterClick = (filterId: FilterKey) => {
    onFilterChange(filterId);
    const firstQIndex = DIAGNOSTIC_QUESTIONS.findIndex(
      (q) => q.filterId === filterId
    );
    if (firstQIndex !== -1) {
      setSelectedQuestionIndex(firstQIndex);
    }
  };

  const loadExampleAnswer = (type: 'marcus' | 'elena') => {
    const val =
      type === 'marcus'
        ? PROFILE_MARCUS.answers[currentQuestion.id]
        : PROFILE_ELENA.answers[currentQuestion.id];
    onAnswerChange(currentQuestion.id, val);
    ambientSound.playSparkChime();
  };

  const handleAddEnergyAuditItem = () => {
    if (!newActivity.trim()) return;
    const newItem: EnergyAuditItem = {
      id: `${Date.now()}`,
      activity: newActivity.trim(),
      score: newActivityScore,
    };
    onUpdateEnergyAuditItems([...energyAuditItems, newItem]);
    setNewActivity('');
    // Reflect into Q01 answer
    const summary = [...energyAuditItems, newItem]
      .map((i) => `[${i.score > 0 ? `+${i.score}` : i.score}] ${i.activity}`)
      .join('; ');
    onAnswerChange('Q01', summary);
  };

  const handleRemoveEnergyAuditItem = (id: string) => {
    const nextItems = energyAuditItems.filter((i) => i.id !== id);
    onUpdateEnergyAuditItems(nextItems);
    const summary = nextItems
      .map((i) => `[${i.score > 0 ? `+${i.score}` : i.score}] ${i.activity}`)
      .join('; ');
    onAnswerChange('Q01', summary);
  };

  return (
    <div className="space-y-6">
      {/* Filter Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {FILTERS.map((f) => {
          const isCurrent = f.id === currentFilter.id;
          const questionsInFilter = DIAGNOSTIC_QUESTIONS.filter(
            (q) => q.filterId === f.id
          );
          const answeredInFilter = questionsInFilter.filter(
            (q) => answers[q.id]?.trim().length > 0
          ).length;

          return (
            <button
              key={f.id}
              onClick={() => handleFilterClick(f.id)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-white dark:bg-slate-900 border-cyan-500 shadow-xs ring-1 ring-cyan-500/20'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span>Phase 0{f.number}</span>
                <span className="tabular-nums">
                  {answeredInFilter}/{questionsInFilter.length}
                </span>
              </div>
              <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 mt-1 truncate">
                {f.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                {f.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* 12 Question Mini-Rail */}
      <div className="flex items-center gap-1.5 p-2 bg-slate-100 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
        {DIAGNOSTIC_QUESTIONS.map((q, idx) => {
          const isSelected = idx === selectedQuestionIndex;
          const isAnswered = answers[q.id]?.trim().length > 0;

          return (
            <button
              key={q.id}
              onClick={() => handleJumpToQuestion(idx)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 dark:bg-cyan-600 text-white shadow-xs font-semibold'
                  : isAnswered
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{q.id}</span>
              {isAnswered && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                {currentQuestion.id}
              </span>
              <span aria-hidden="true">·</span>
              <span>Phase 0{currentFilter.number}: {currentFilter.name}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-700 dark:text-slate-300">
                {currentQuestion.dimensionMapped}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {currentQuestion.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {currentQuestion.objective}
            </p>
          </div>

          {/* Quick Example Loaders */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-xs hidden sm:inline">Reference:</span>
            <button
              onClick={() => loadExampleAnswer('marcus')}
              className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
            >
              Marcus
            </button>
            <button
              onClick={() => loadExampleAnswer('elena')}
              className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
            >
              Elena
            </button>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="py-5">
          <div className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
            {currentQuestion.questionPrompt}
          </div>

          <div className="flex items-start gap-2 mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <HelpCircle className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
            <span>{currentQuestion.hint}</span>
          </div>

          {/* MODULE A ENHANCEMENT: Energy vs Drain Interactive Spectrum for Q01 */}
          {currentQuestion.id === 'Q01' && (
            <div className="mt-5 p-4 rounded-xl bg-sky-500/5 border border-sky-400/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-sky-500" />
                  <span>Energy vs. Drain Spectrum Builder</span>
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Scale: -5 (Drain) to +5 (Flow)
                </span>
              </div>

              {/* Add item */}
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  placeholder="Add specific recent activity (e.g. Refactoring parser)..."
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                />
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={newActivityScore}
                    onChange={(e) => setNewActivityScore(Number(e.target.value))}
                    className="accent-sky-500 w-28"
                  />
                  <span className="text-xs font-mono font-bold text-sky-600 w-8 text-center">
                    {newActivityScore > 0 ? `+${newActivityScore}` : newActivityScore}
                  </span>
                  <button
                    onClick={handleAddEnergyAuditItem}
                    className="px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log</span>
                  </button>
                </div>
              </div>

              {/* Activity Chips / List */}
              <div className="space-y-1.5 pt-2">
                {energyAuditItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  >
                    <span className="text-slate-800 dark:text-slate-200">
                      {item.activity}
                    </span>
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono font-bold ${
                          item.score > 0
                            ? 'text-emerald-500'
                            : item.score < 0
                            ? 'text-rose-500'
                            : 'text-slate-400'
                        }`}
                      >
                        {item.score > 0 ? `+${item.score}` : item.score}
                      </span>
                      <button
                        onClick={() => handleRemoveEnergyAuditItem(item.id)}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE B ENHANCEMENT: Chronotype & Peak Focus Picker for Q06 */}
          {currentQuestion.id === 'Q06' && (
            <div className="mt-5 p-4 rounded-xl bg-emerald-500/5 border border-emerald-400/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>Circadian Peak Focus Window Picker</span>
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Biological Optimization
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { label: 'Dawn Peak', window: '05:00 - 09:00 AM', desc: 'Pre-social silence' },
                  { label: 'Morning Peak', window: '06:00 - 10:00 AM', desc: 'Standard high-executive' },
                  { label: 'Afternoon Peak', window: '13:00 - 17:00 PM', desc: 'Post-metabolic flow' },
                  { label: 'Night Owl Peak', window: '20:00 - 00:00 AM', desc: 'Zero external comms' },
                ].map((chron) => (
                  <button
                    key={chron.label}
                    onClick={() =>
                      onAnswerChange(
                        'Q06',
                        `My peak executive function occurs during ${chron.window} (${chron.label}). Dedicated to deep work.`
                      )
                    }
                    className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-left hover:border-emerald-400 transition-colors cursor-pointer"
                  >
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {chron.label}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {chron.window}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{chron.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MODULE C ENHANCEMENT: Stochastic Sparks & "Meld Shake" for Q08 */}
          {currentQuestion.id === 'Q08' && (
            <div
              className={`mt-5 p-4 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-300/40 dark:border-amber-700/40 transition-all ${
                shakeActive ? 'animate-bounce' : ''
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-amber-200 dark:border-amber-800/60">
                <div className="flex items-center gap-2">
                  <Dice5 className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono">
                    Stochastic Object Generator: {currentObject.name}
                  </span>
                </div>
                <button
                  onClick={rollRandomObject}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/40 hover:bg-amber-200 dark:hover:bg-amber-800/60 text-amber-900 dark:text-amber-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Meld Shake / Roll</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Physical Properties:
                  </span>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    {currentObject.physicalProperties.map((prop, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-500">·</span>
                        <span>{prop}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Lateral Vector Metaphor:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 italic">
                    "{currentObject.philosophicalMetaphor}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* MODULE D ENHANCEMENT: The Raw Input Pad (15s Countdown) for Q10 */}
          {currentQuestion.id === 'Q10' && (
            <div className="mt-5 p-4 rounded-xl bg-violet-500/5 border border-violet-400/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 flex items-center gap-2">
                  <Timer className="w-4 h-4 text-violet-500" />
                  <span>The 15-Second Raw Gut Trigger</span>
                </span>

                <button
                  onClick={startRawInputTimer}
                  className="flex items-center gap-1.5 px-3 py-1 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-mono cursor-pointer"
                >
                  <Zap className="w-3 h-3" />
                  <span>{isTimerRunning ? `${timerSeconds}s Remaining` : 'Trigger 15s Timer'}</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Analytical logic produces excuses and ego-protection. You have 15
                seconds to write the very first thing you are avoiding building before
                your brain justifies a delay.
              </p>
            </div>
          )}

          {/* Answer Textarea */}
          <div className="mt-5">
            <label
              htmlFor={`answer-${currentQuestion.id}`}
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 font-mono"
            >
              Your Diagnostic Response:
            </label>
            <textarea
              id={`answer-${currentQuestion.id}`}
              value={answers[currentQuestion.id] || ''}
              onChange={(e) =>
                onAnswerChange(currentQuestion.id, e.target.value)
              }
              placeholder={currentQuestion.placeholder}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-y"
            />
          </div>
        </div>

        {/* Card Footer Navigation */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handlePrev}
            disabled={selectedQuestionIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedQuestionIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Question</span>
          </button>

          <div className="text-xs font-mono text-slate-400">
            <span>Question {selectedQuestionIndex + 1} of 12</span>
          </div>

          <button
            onClick={handleNext}
            disabled={selectedQuestionIndex === DIAGNOSTIC_QUESTIONS.length - 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedQuestionIndex === DIAGNOSTIC_QUESTIONS.length - 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-500 text-white'
            }`}
          >
            <span>Next Question</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
