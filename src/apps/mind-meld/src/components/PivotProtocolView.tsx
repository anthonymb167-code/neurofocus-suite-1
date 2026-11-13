import React, { useState } from 'react';
import {
  AlertOctagon,
  ArrowRight,
  CheckSquare,
  Compass,
  CornerDownRight,
  HelpCircle,
  RefreshCw,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { DiagnosticScores } from '../types/framework';

interface PivotProtocolViewProps {
  scores: DiagnosticScores;
  onNavigateToSprint: () => void;
}

export const PivotProtocolView: React.FC<PivotProtocolViewProps> = ({
  scores,
  onNavigateToSprint,
}) => {
  const [selectedPivotType, setSelectedPivotType] = useState<
    'inward' | 'grounding' | 'reset'
  >(
    scores.authenticity < 3 && scores.feasibility >= 4
      ? 'inward'
      : scores.authenticity >= 4 && scores.feasibility < 3
      ? 'grounding'
      : 'inward'
  );

  const [hiddenNeed, setHiddenNeed] = useState<string>('');
  const [unmaskedSuperpower, setUnmaskedSuperpower] = useState<string>('');
  const [coreDrainFactor, setCoreDrainFactor] = useState<string>('');
  const [anonymityVerified, setAnonymityVerified] = useState<boolean>(false);
  const [frictionVerified, setFrictionVerified] = useState<boolean>(false);
  const [sprintCommitted, setSprintCommitted] = useState<boolean>(false);

  // Auto-detect failure reason
  const authenticityFailed = scores.authenticity <= 3;
  const feasibilityFailed = scores.feasibility <= 3;
  const energyFailed = scores.energy <= 3;

  return (
    <div className="space-y-8">
      {/* Banner Notice */}
      <div className="bg-amber-500/10 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 rounded-xl p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-bold text-amber-900 dark:text-amber-200">
              Critical Protocol: The False Path Redirect
            </h3>
            <p className="text-xs text-amber-800 dark:text-amber-300/90 mt-1 leading-relaxed">
              When a candidate purpose fails the 18-point benchmark or violates key
              gating metrics, it is not a loss—it is a critical circuit breaker that
              prevents years of wasted momentum chasing an ego trap. This 4-phase
              protocol converts that diagnostic signal into executable clarity.
            </p>
          </div>
        </div>
      </div>

      {/* Phase 1: Deconstruct the Failure Signal */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
            Phase 1
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            Deconstruct the Failure Signal
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Isolate precisely which operational gate collapsed during your matrix evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Authenticity Signal */}
          <div
            className={`p-4 rounded-lg border ${
              authenticityFailed
                ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
                Authenticity Gate
              </span>
              <span
                className={`text-xs font-mono font-bold ${
                  authenticityFailed ? 'text-rose-600' : 'text-emerald-500'
                }`}
              >
                {scores.authenticity}/5 {authenticityFailed ? '(FAIL)' : '(PASS)'}
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-2">
              Status or Relief Trap
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              "What specific outcome was I hoping this path would grant me (respect,
              public admiration, escape from a job)?"
            </p>
            <input
              type="text"
              value={hiddenNeed}
              onChange={(e) => setHiddenNeed(e.target.value)}
              placeholder="e.g. Elena: Wanted admiration of being a founder..."
              className="mt-3 w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          {/* Feasibility Signal */}
          <div
            className={`p-4 rounded-lg border ${
              feasibilityFailed
                ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
                Feasibility Gate
              </span>
              <span
                className={`text-xs font-mono font-bold ${
                  feasibilityFailed ? 'text-rose-600' : 'text-emerald-500'
                }`}
              >
                {scores.feasibility}/5 {feasibilityFailed ? '(FAIL)' : '(PASS)'}
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-2">
              Skill & Resource Mismatch
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              "What baseline skill did this path demand that I currently lack the
              intrinsic drive or baseline velocity to master?"
            </p>
            <input
              type="text"
              value={unmaskedSuperpower}
              onChange={(e) => setUnmaskedSuperpower(e.target.value)}
              placeholder="e.g. Demanded on-camera charisma, but my speed is quant math..."
              className="mt-3 w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          {/* Energy Signal */}
          <div
            className={`p-4 rounded-lg border ${
              energyFailed
                ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
                Energy Gate
              </span>
              <span
                className={`text-xs font-mono font-bold ${
                  energyFailed ? 'text-rose-600' : 'text-emerald-500'
                }`}
              >
                {scores.energy}/5 {energyFailed ? '(FAIL)' : '(PASS)'}
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-2">
              Burnout Vector
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              "What part of the daily execution felt like pure continuous friction and
              executive depletion?"
            </p>
            <input
              type="text"
              value={coreDrainFactor}
              onChange={(e) => setCoreDrainFactor(e.target.value)}
              placeholder="e.g. Video editing and social media engagement monitoring..."
              className="mt-3 w-full px-2.5 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
        </div>
      </div>

      {/* Phase 2: Extract Residual Assets */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
            Phase 2
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            Extract Residual Assets
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Even a totally false path contains genuine data points. Isolate what can be
            recycled before pivoting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 text-xs">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono block mb-1">
              1. Transferable High-Scoring Questions:
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Identify which individual questions in Phase 1-4 revealed true signals.
              For Elena, Q05 (Quantitative financial modeling top 5%) and Q11 (Quiet
              masterminds behind the scenes) survived completely intact.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono block mb-1">
              2. Isolate True Superpowers:
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              What domain knowledge, programming languages, mathematical models, or
              crafts do you perform 2-3x faster than peers? You will anchor your new
              vector onto these exact assets.
            </p>
          </div>
        </div>
      </div>

      {/* Phase 3: The Directional Pivot Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
            Phase 3
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            The Directional Pivot Matrix
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Select the structural pivot matching your diagnostic breakdown.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Pivot 1: Inward Pivot */}
          <button
            onClick={() => setSelectedPivotType('inward')}
            className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
              selectedPivotType === 'inward'
                ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20 ring-1 ring-cyan-500'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950'
            }`}
          >
            <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase">
              1. Inward Pivot
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
              Low Authenticity + High Feasibility
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              You have the skills, but you are doing it for external status or
              validation.
            </p>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] font-medium text-cyan-700 dark:text-cyan-300">
              Action: Retain your technical tools; redirect to an anonymous, intrinsic
              purpose.
            </div>
          </button>

          {/* Pivot 2: Grounding Pivot */}
          <button
            onClick={() => setSelectedPivotType('grounding')}
            className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
              selectedPivotType === 'grounding'
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-1 ring-emerald-500'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950'
            }`}
          >
            <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              2. Grounding Pivot
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
              High Authenticity + Low Feasibility
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              You care deeply about the mission, but you lack the current execution
              layer.
            </p>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
              Action: Retain core mission; change execution layer to match your actual
              top-5% skillset.
            </div>
          </button>

          {/* Pivot 3: Full Reset */}
          <button
            onClick={() => setSelectedPivotType('reset')}
            className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
              selectedPivotType === 'reset'
                ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-amber-500'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950'
            }`}
          >
            <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
              3. Full Reset
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
              Low Authenticity + Low Feasibility
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Total structural mismatch on both raw drive and actual capability.
            </p>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] font-medium text-amber-700 dark:text-amber-300">
              Action: Abandon concept completely. Re-run Phase 1 focusing strictly on
              verified past behavioral data.
            </div>
          </button>
        </div>

        {/* Recovery Framework v2 Operational Matrix */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            System Failure Signal Reference:
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                  <th className="py-2 px-3">Failure Signal</th>
                  <th className="py-2 px-3">Residual Assets Extrapolated</th>
                  <th className="py-2 px-3">Actionable Pivot Vector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100">
                    [01] Root / Path Configuration Error
                  </td>
                  <td className="py-2.5 px-3">
                    Core scripts intact; repository structure validated
                  </td>
                  <td className="py-2.5 px-3 text-cyan-600 dark:text-cyan-400">
                    Re-map prefix config; change directory depth
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100">
                    [02] System Delay / Build Timeout
                  </td>
                  <td className="py-2.5 px-3">
                    Heavy raw data / assets preserved safely
                  </td>
                  <td className="py-2.5 px-3 text-cyan-600 dark:text-cyan-400">
                    Open separate worker context; decouple long tasks from UI
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-slate-100">
                    [03] Compliance / Naming Mismatch
                  </td>
                  <td className="py-2.5 px-3">
                    Functional processing engine fully works
                  </td>
                  <td className="py-2.5 px-3 text-cyan-600 dark:text-cyan-400">
                    Apply strict branding passes; sanitize lines for public delivery
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Phase 4: 3-Point Verification Gate */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
            Phase 4
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            3-Point Verification Gate Before Long-Term Commitment
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Subject the new pivoted candidate vector to this rapid gate before
            dedicating months.
          </p>
        </div>

        <div className="space-y-4 mt-6">
          {/* Check 1 */}
          <label className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={anonymityVerified}
              onChange={(e) => setAnonymityVerified(e.target.checked)}
              className="mt-0.5 rounded text-cyan-600 focus:ring-cyan-500 h-4 w-4"
            />
            <div>
              <span className="font-semibold text-xs text-slate-900 dark:text-white uppercase font-mono block">
                1. The Anonymity Filter
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Would you execute this new pivoted vector if no one ever found out you
                were doing it and you received zero public recognition?
              </p>
            </div>
          </label>

          {/* Check 2 */}
          <label className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={frictionVerified}
              onChange={(e) => setFrictionVerified(e.target.checked)}
              className="mt-0.5 rounded text-cyan-600 focus:ring-cyan-500 h-4 w-4"
            />
            <div>
              <span className="font-semibold text-xs text-slate-900 dark:text-white uppercase font-mono block">
                2. The Friction Check
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Does the daily workflow rely on skills you can execute 2-3x faster
                than average without immediate executive burnout?
              </p>
            </div>
          </label>

          {/* Check 3 */}
          <label className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={sprintCommitted}
              onChange={(e) => setSprintCommitted(e.target.checked)}
              className="mt-0.5 rounded text-cyan-600 focus:ring-cyan-500 h-4 w-4"
            />
            <div>
              <span className="font-semibold text-xs text-slate-900 dark:text-white uppercase font-mono block">
                3. The 7-Day Micro-Sprint Commitment
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Commit to a 7-day trial executing the core task for 1 hour every
                morning during your biological peak window.
              </p>
            </div>
          </label>
        </div>

        {/* Action to proceed to sprint tracker */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onNavigateToSprint}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <span>Launch 7-Day Micro-Sprint Tracking Log</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
