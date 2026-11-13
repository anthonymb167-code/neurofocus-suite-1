import React, { useState } from 'react';
import {
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Layers,
  Lock,
  RefreshCw,
  ShieldAlert,
  Sliders,
  Sparkles,
  Zap,
} from 'lucide-react';
import { PROFILE_ELENA, PROFILE_MARCUS } from '../data/presets';

export const ScalingAndFramework: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bridge' | 'cadence' | 'entropy' | 'cases'>(
    'bridge'
  );
  const [caseStudyTab, setCaseStudyTab] = useState<'marcus' | 'elena'>('marcus');

  // Interactive state for 30-day bridge tasks
  const [bridgeChecks, setBridgeChecks] = useState<Record<string, boolean>>({
    w1: true,
    w2: false,
    w3: false,
    w4: false,
  });

  const toggleBridge = (key: string) => {
    setBridgeChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      {/* Category Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('bridge')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'bridge'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          30-Day Stabilization Bridge
        </button>
        <button
          onClick={() => setActiveTab('cadence')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'cadence'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Sustainable Cadence Matrix
        </button>
        <button
          onClick={() => setActiveTab('entropy')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'entropy'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Entropy Circuit Breakers
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'cases'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Marcus vs. Elena Case Studies
        </button>
      </div>

      {/* Tab 1: 30-Day Stabilization Bridge */}
      {activeTab === 'bridge' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
              Phase 1 of Scaling
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              The 30-Day Stabilization Bridge
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Transitioning abruptly from a 1-hour daily sprint to an open-ended
              permanent schedule leads to decision fatigue. Formalize your routine across
              4 calibrated weeks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Week 1 */}
            <div
              onClick={() => toggleBridge('w1')}
              className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${
                bridgeChecks.w1
                  ? 'bg-cyan-50/50 dark:bg-cyan-950/20 border-cyan-400 dark:border-cyan-700'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                  Week 1
                </span>
                <span className="text-slate-400">{bridgeChecks.w1 ? '✓ Active' : '○ Pending'}</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mt-2">
                Locking the Window
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Keep your exact peak biological window locked as a non-negotiable
                appointment with yourself, treated with the gravity of emergency surgery.
              </p>
            </div>

            {/* Week 2 */}
            <div
              onClick={() => toggleBridge('w2')}
              className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${
                bridgeChecks.w2
                  ? 'bg-cyan-50/50 dark:bg-cyan-950/20 border-cyan-400 dark:border-cyan-700'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                  Week 2
                </span>
                <span className="text-slate-400">{bridgeChecks.w2 ? '✓ Active' : '○ Pending'}</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mt-2">
                Incremental Expansion
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Expand core execution blocks by 15–30 minutes only if Week 1 felt fluid.
                Never scale time through sheer willpower; scale through momentum.
              </p>
            </div>

            {/* Week 3 */}
            <div
              onClick={() => toggleBridge('w3')}
              className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${
                bridgeChecks.w3
                  ? 'bg-cyan-50/50 dark:bg-cyan-950/20 border-cyan-400 dark:border-cyan-700'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                  Week 3
                </span>
                <span className="text-slate-400">{bridgeChecks.w3 ? '✓ Active' : '○ Pending'}</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mt-2">
                Systemizing Inputs
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Remove daily decision friction. Pre-set your environment the night
                before so when your peak window opens, execution begins with zero delay.
              </p>
            </div>

            {/* Week 4 */}
            <div
              onClick={() => toggleBridge('w4')}
              className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${
                bridgeChecks.w4
                  ? 'bg-cyan-50/50 dark:bg-cyan-950/20 border-cyan-400 dark:border-cyan-700'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                  Week 4
                </span>
                <span className="text-slate-400">{bridgeChecks.w4 ? '✓ Active' : '○ Pending'}</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mt-2">
                Milestone Review
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Evaluate output against a concrete deliverable metric (modules built,
                architecture written) rather than hours logged.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sustainable Cadence Matrix */}
      {activeTab === 'cadence' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
              Phase 2 of Scaling
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              The Sustainable Cadence Matrix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Prevent burnout and maintain elite focus over years using a tiered cadence
              structure.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-mono">
                  <th className="py-3 px-4 font-bold">Cadence Level</th>
                  <th className="py-3 px-4 font-bold">Operational Focus</th>
                  <th className="py-3 px-4 font-bold">Primary Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-semibold font-mono text-cyan-600 dark:text-cyan-400">
                    Daily Core
                  </td>
                  <td className="py-3.5 px-4">
                    Uninterrupted deep work during biological peak focus window.
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">
                    No email, no admin, no comms. Pure flow and creation.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-semibold font-mono text-emerald-600 dark:text-emerald-400">
                    Weekly Review
                  </td>
                  <td className="py-3.5 px-4">
                    Assess output quality, adjust constraints, clear administrative debt.
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">
                    Conducted strictly outside peak focus hours.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-semibold font-mono text-violet-600 dark:text-violet-400">
                    Quarterly Pivot Check
                  </td>
                  <td className="py-3.5 px-4">
                    Re-run the 12-question diagnostic matrix to ensure alignment hasn’t drifted.
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">
                    Protect against creep: adding secondary goals that dilute your primary anchor.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Entropy Circuit Breakers */}
      {activeTab === 'entropy' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
              Phase 3 of Scaling
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Guarding Against Long-Term Entropy
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Even a high-scoring vector degrades over time due to scope creep or creeping
              ego. Install these 3 automated circuit breakers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Circuit Breaker 1 */}
            <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase block">
                [-] Scope-Creep Firewall
              </span>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                N+1 Demands N-2
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                For every new project, feature, or obligation you add to your vector, you
                must systematically eliminate two existing ones. Your primary vector must
                remain razor-sharp.
              </p>
            </div>

            {/* Circuit Breaker 2 */}
            <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase block">
                [-] Status Trap Monitor
              </span>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                Mandatory 48-Hour Pause
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                If your primary motivation shifts from building the thing in secret to
                monitoring how many people are watching, trigger a mandatory 48-hour
                freeze. Re-verify alignment with the Anonymity Filter.
              </p>
            </div>

            {/* Circuit Breaker 3 */}
            <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase block">
                [-] Biological Baseline Protection
              </span>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                Non-Negotiable Inputs
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sleep, physical movement, and nutritional recovery are non-negotiable
                physical bounds. When your biological baseline drops below threshold,
                cognitive output drops exponentially. Never sacrifice biology for volume.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Marcus vs Elena Reference Studies */}
      {activeTab === 'cases' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Diagnostic Case Studies
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Reference Walkthroughs
              </h3>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono">
              <button
                onClick={() => setCaseStudyTab('marcus')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  caseStudyTab === 'marcus'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Marcus (Valid: 23.5)
              </button>
              <button
                onClick={() => setCaseStudyTab('elena')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  caseStudyTab === 'elena'
                    ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Elena (Status Trap: 6.25)
              </button>
            </div>
          </div>

          {caseStudyTab === 'marcus' ? (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800">
                <div className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                  Candidate: {PROFILE_MARCUS.candidatePurpose}
                </div>
                <div className="text-emerald-700 dark:text-emerald-400 font-mono mt-1">
                  FINAL DVI: 23.5 / 25.0 · VERDICT: PASS (≥ 18.0)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 font-mono mb-1">
                    Key Strengths:
                  </div>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    <li>· 3x skill speedup in low-level C / Rust infrastructure code</li>
                    <li>· 12 months financial living expenses saved</li>
                    <li>· Peak biological window: 6:00 AM – 10:00 AM</li>
                    <li>· Confirmed desire to build even if completely anonymous</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 font-mono mb-1">
                    Strategic Action:
                  </div>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    <li>· Shift 6:00–10:00 AM window away from admin/emails to core dev</li>
                    <li>· Ruthlessly eliminate corporate UI consulting tracks</li>
                    <li>· Neutralize fear of public failure by deploying anonymously</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-300 dark:border-rose-800">
                <div className="font-bold text-sm text-rose-900 dark:text-rose-200">
                  Candidate: {PROFILE_ELENA.candidatePurpose}
                </div>
                <div className="text-rose-700 dark:text-rose-400 font-mono mt-1">
                  FINAL DVI: 6.25 / 25.0 · VERDICT: FAIL (STATUS & VALIDATION TRAP)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 font-mono mb-1">
                    Root Failure Diagnosis:
                  </div>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    <li>· Creating videos causes immediate burnout (Energy: 2/5)</li>
                    <li>· Zero video production skills / 60hr finance day job (Feasibility: 1/5)</li>
                    <li>· Fails anonymity test; only wanted founder admiration (Authenticity: 1/5)</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 font-mono mb-1">
                    Corrective Grounding Pivot:
                  </div>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    <li>· Abandon lifestyle coaching and video production completely</li>
                    <li>· Extract true superpower: Top-5% quantitative financial modeling</li>
                    <li>· Pivot to quiet background algorithmic financial risk auditing</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
