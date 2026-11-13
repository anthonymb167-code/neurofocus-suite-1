import React, { useMemo, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  Flame,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { DailySprintEntry, MicroSprintData } from '../types/framework';

interface MicroSprintTrackerProps {
  sprintData: MicroSprintData;
  onUpdateSprint: (data: MicroSprintData) => void;
  onNavigateToScaling: () => void;
}

export const MicroSprintTracker: React.FC<MicroSprintTrackerProps> = ({
  sprintData,
  onUpdateSprint,
  onNavigateToScaling,
}) => {
  const [activeDay, setActiveDay] = useState<number>(1);

  const currentEntry =
    sprintData.entries.find((e) => e.day === activeDay) ||
    sprintData.entries[0];

  const handleUpdateEntry = (
    field: keyof DailySprintEntry,
    value: string | number
  ) => {
    const nextEntries = sprintData.entries.map((entry) => {
      if (entry.day === activeDay) {
        return { ...entry, [field]: value };
      }
      return entry;
    });
    onUpdateSprint({ ...sprintData, entries: nextEntries });
  };

  // Calculations for Summary Matrix
  const stats = useMemo(() => {
    let totalScore = 0;
    let totalEnergy = 0;
    let totalFriction = 0;
    let totalAnon = 0;
    let completedDays = 0;

    sprintData.entries.forEach((e) => {
      const dailySum = e.energyGen + e.skillFriction + e.anonIntegrity;
      totalScore += dailySum;
      totalEnergy += e.energyGen;
      totalFriction += e.skillFriction;
      totalAnon += e.anonIntegrity;
      if (e.taskCompleted?.trim().length > 0) completedDays++;
    });

    const avgEnergy = totalEnergy / 7;
    const avgFriction = totalFriction / 7;
    const avgAnon = totalAnon / 7;
    const overallAvg = (avgEnergy + avgFriction + avgAnon) / 3;

    let verdict: 'green' | 'amber' | 'red' = 'amber';
    let verdictTitle = 'Amber Light: Structural Friction Detected';
    let verdictText =
      'Friction or structural issue detected. Isolate whether it is a skill gap or an energy drain. Re-adjust constraints and run a modified 3-day sprint.';

    if (totalScore >= 75 && avgEnergy >= 3.5 && avgFriction >= 3.5 && avgAnon >= 3.5) {
      verdict = 'green';
      verdictTitle = 'Green Light: Vector Validated';
      verdictText =
        'Vector validated. Intrinsic energy generation, effortless execution, and anonymity verified. Proceed with full integration into the Master Roadmap.';
    } else if (totalScore < 55 || avgAnon < 3.0 || avgEnergy < 3.0) {
      verdict = 'red';
      verdictTitle = 'Red Light: Status Trap or Burnout Vector Confirmed';
      verdictText =
        'Status trap or severe burnout confirmed. The vector is failing the intrinsic motivation or biological sustainability threshold. Re-route via Pivot Protocol.';
    }

    return {
      totalScore,
      avgEnergy,
      avgFriction,
      avgAnon,
      overallAvg,
      completedDays,
      verdict,
      verdictTitle,
      verdictText,
    };
  }, [sprintData]);

  return (
    <div className="space-y-8">
      {/* Sprint Overview & Setup Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
              Operational Template
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              7-Day Micro-Sprint Protocol
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Field-test the newly pivoted vector over 7 consecutive days, measuring
              intrinsic energy generation and friction before making long-term commitments.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-500">Days Logged:</span>
            <span className="font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">
              {stats.completedDays} / 7
            </span>
          </div>
        </div>

        {/* Setup Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 font-mono">
              Pivoted Vector Name:
            </label>
            <input
              type="text"
              value={sprintData.pivotedVectorName}
              onChange={(e) =>
                onUpdateSprint({
                  ...sprintData,
                  pivotedVectorName: e.target.value,
                })
              }
              placeholder="e.g. Open-Source Kernel Audit Engine"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 font-mono">
              Core Daily Deliverable:
            </label>
            <input
              type="text"
              value={sprintData.coreDeliverable}
              onChange={(e) =>
                onUpdateSprint({
                  ...sprintData,
                  coreDeliverable: e.target.value,
                })
              }
              placeholder="e.g. Write 400 lines of verified AST traversal code"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 font-mono">
              Peak Biological Window:
            </label>
            <input
              type="text"
              value={sprintData.peakWindow}
              onChange={(e) =>
                onUpdateSprint({
                  ...sprintData,
                  peakWindow: e.target.value,
                })
              }
              placeholder="e.g. 06:00 AM – 08:30 AM"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
            />
          </div>
        </div>

        {/* Anonymity Pledge Bar */}
        <div className="mt-5 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-700 dark:text-slate-300">
            <span className="font-semibold font-mono text-cyan-600 dark:text-cyan-400 mr-2">
              ANONYMITY PLEDGE:
            </span>
            I confirm I am executing this 7-day sprint purely for the intrinsic value
            of the work, with zero reliance on external recognition, social posts, or
            status.
          </div>
          <button
            onClick={() =>
              onUpdateSprint({
                ...sprintData,
                anonymityPledged: !sprintData.anonymityPledged,
              })
            }
            className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
              sprintData.anonymityPledged
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {sprintData.anonymityPledged ? '✓ Pledged' : 'Confirm Pledge'}
          </button>
        </div>

        {/* Daily Peak Window Focus Timer Strip */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Peak Window Focus Mode ({sprintData.peakWindow || '06:00 - 08:00'})
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Uninterrupted execution block: zero emails, zero notifications, pure flow.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const el = document.getElementById('daily-log-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-500 text-white rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              Log Today's Window
            </button>
          </div>
        </div>
      </div>

      {/* Stage 4: Non-Negotiable Operational Timeline Checklist */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
              Stage 4 Pipeline
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              The 7-Day Rescue Sprint Operational Timeline
            </h4>
          </div>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
            Systematic Execution
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-0.5">
              DAY 1: ISOLATION & PATH CLEARING
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              Audit root parameters; eliminate conflicting directories or naming overlaps.
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-0.5">
              DAY 2: DATA RE-BINDING & COMPLIANCE
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              Hardcode matching identity configs; standardize headers and public values.
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-0.5">
              DAY 3: PERSISTENT CORE HARDENING
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              Establish robust backend tracking; secure credential flows and timeouts.
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-0.5">
              DAY 4: RUNTIME REFACTOR & MODULE TESTING
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              Isolate heavy background tasks; verify local modules compile cleanly.
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-0.5">
              DAY 5: CLEAN DEPLOYMENT PASS
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              Execute clean build via verified paths; inspect logs line-by-line.
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-0.5">
              DAY 6: DISTRIBUTION LOGISTICS
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              Document launch specs; package modular assets for immediate review.
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 md:col-span-2">
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
              DAY 7: FINAL INTEGRATION LOCKDOWN
            </span>
            <span className="text-slate-600 dark:text-slate-400">
              Verify live engine runtimes, user persistence; freeze state and transition to monitoring.
            </span>
          </div>
        </div>
      </div>

      {/* Daily Tracking Log & Day Selector */}
      <div id="daily-log-section" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
            Daily Execution Log
          </span>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
            Day {activeDay} of 7
          </span>
        </div>

        {/* Day Tabs */}
        <div className="grid grid-cols-7 gap-2 my-5">
          {sprintData.entries.map((entry) => {
            const isCurrent = entry.day === activeDay;
            const hasTask = entry.taskCompleted?.trim().length > 0;
            const dailyTotal =
              entry.energyGen + entry.skillFriction + entry.anonIntegrity;

            return (
              <button
                key={entry.day}
                onClick={() => setActiveDay(entry.day)}
                className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30 ring-1 ring-cyan-500'
                    : hasTask
                    ? 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/10'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950'
                }`}
              >
                <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                  Day {entry.day}
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 tabular-nums">
                  {dailyTotal}/15
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Day Detail Form */}
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                Execution Window:
              </label>
              <input
                type="text"
                value={currentEntry.executionWindow}
                onChange={(e) =>
                  handleUpdateEntry('executionWindow', e.target.value)
                }
                placeholder="e.g. 06:00 - 08:30"
                className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                Task Completed:
              </label>
              <input
                type="text"
                value={currentEntry.taskCompleted}
                onChange={(e) =>
                  handleUpdateEntry('taskCompleted', e.target.value)
                }
                placeholder="e.g. Implemented memory leak detection AST parser"
                className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* 3 Metrics (1-5) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Metric 1 */}
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Energy Generation:
                </span>
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  {currentEntry.energyGen}/5
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                1 = Total burnout, 5 = High flow
              </p>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleUpdateEntry('energyGen', val)}
                    className={`flex-1 py-1 rounded text-xs font-mono font-bold cursor-pointer transition-colors ${
                      currentEntry.energyGen === val
                        ? 'bg-slate-900 dark:bg-cyan-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Skill Friction:
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {currentEntry.skillFriction}/5
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                1 = Massive gap, 5 = Effortless speed
              </p>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleUpdateEntry('skillFriction', val)}
                    className={`flex-1 py-1 rounded text-xs font-mono font-bold cursor-pointer transition-colors ${
                      currentEntry.skillFriction === val
                        ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Anonymity Integrity:
                </span>
                <span className="font-mono font-bold text-violet-600 dark:text-violet-400">
                  {currentEntry.anonIntegrity}/5
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                1 = Chasing approval, 5 = Absorbed
              </p>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleUpdateEntry('anonIntegrity', val)}
                    className={`flex-1 py-1 rounded text-xs font-mono font-bold cursor-pointer transition-colors ${
                      currentEntry.anonIntegrity === val
                        ? 'bg-slate-900 dark:bg-violet-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Qualitative Note */}
          <div>
            <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
              Daily Qualitative Note (Resistance or Flow State):
            </label>
            <input
              type="text"
              value={currentEntry.notes}
              onChange={(e) => handleUpdateEntry('notes', e.target.value)}
              placeholder="e.g. Total flow state from minute 10. No impulse to check notifications."
              className="w-full px-3 py-2 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Aggregate 7-Day Summary Table & Verdict */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
              Aggregated Synthesis
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              7-Day Sprint Summary Matrix
            </h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
              {stats.totalScore}{' '}
              <span className="text-xs font-mono text-slate-400 font-normal">
                / 105
              </span>
            </div>
          </div>
        </div>

        {/* Tabular Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3">Day</th>
                <th className="py-2.5 px-3">Energy Gen (1-5)</th>
                <th className="py-2.5 px-3">Friction (1-5)</th>
                <th className="py-2.5 px-3">Anon Integrity (1-5)</th>
                <th className="py-2.5 px-3 text-right">Daily Total (Max 15)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {sprintData.entries.map((e) => {
                const daySum = e.energyGen + e.skillFriction + e.anonIntegrity;
                return (
                  <tr
                    key={e.day}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
                  >
                    <td className="py-2 px-3 font-bold text-slate-900 dark:text-slate-100">
                      Day {e.day}
                    </td>
                    <td className="py-2 px-3 tabular-nums">{e.energyGen}</td>
                    <td className="py-2 px-3 tabular-nums">{e.skillFriction}</td>
                    <td className="py-2 px-3 tabular-nums">{e.anonIntegrity}</td>
                    <td className="py-2 px-3 tabular-nums font-semibold text-right">
                      {daySum}
                    </td>
                  </tr>
                );
              })}
              {/* Total row */}
              <tr className="border-t-2 border-slate-300 dark:border-slate-700 font-bold bg-slate-50/80 dark:bg-slate-950/50">
                <td className="py-3 px-3">TOTAL (Max 105)</td>
                <td className="py-3 px-3 tabular-nums">
                  Avg: {stats.avgEnergy.toFixed(1)}
                </td>
                <td className="py-3 px-3 tabular-nums">
                  Avg: {stats.avgFriction.toFixed(1)}
                </td>
                <td className="py-3 px-3 tabular-nums">
                  Avg: {stats.avgAnon.toFixed(1)}
                </td>
                <td className="py-3 px-3 tabular-nums text-right text-sm text-cyan-600 dark:text-cyan-400">
                  {stats.totalScore}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sprint Verdict Protocol Banner */}
        <div
          className={`p-4 rounded-lg border ${
            stats.verdict === 'green'
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700'
              : stats.verdict === 'amber'
              ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700'
              : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700'
          }`}
        >
          <div className="flex items-start gap-3">
            {stats.verdict === 'green' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-semibold text-sm text-slate-900 dark:text-white">
                {stats.verdictTitle}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {stats.verdictText}
              </p>
            </div>
          </div>
        </div>

        {/* Action to proceed to Scaling */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onNavigateToScaling}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <span>Proceed to 30-Day Bridge & Long-Term Scaling</span>
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
