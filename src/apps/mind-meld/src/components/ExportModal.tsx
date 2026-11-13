import React, { useMemo, useState } from 'react';
import { Check, Copy, Download, FileText, Upload, X } from 'lucide-react';
import { AssessmentProfile } from '../types/framework';
import { DIAGNOSTIC_QUESTIONS, calculateDVI, evaluateDVI } from '../data/presets';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: AssessmentProfile;
  onImportProfile: (imported: AssessmentProfile) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  profile,
  onImportProfile,
}) => {
  const [exportFormat, setExportFormat] = useState<'txt' | 'md' | 'json'>('txt');
  const [copied, setCopied] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  const evaluation = useMemo(() => evaluateDVI(profile.scores), [profile.scores]);

  // Generate plain text optimized for Samsung Notes & phone text editors
  const plainTextContent = useMemo(() => {
    let out = '';
    out += `================================================================================\n`;
    out += `         STRUCTURED EXISTENTIAL NAVIGATION — MASTER ASSESSMENT\n`;
    out += `                  (Optimized for Mobile & Samsung Notes)\n`;
    out += `================================================================================\n\n`;

    out += `SUBJECT / VECTOR : ${profile.candidatePurpose || profile.name}\n`;
    out += `DATE GENERATED   : ${new Date().toISOString().split('T')[0]}\n`;
    out += `CALCULATED DVI   : ${evaluation.dvi.toFixed(2)} / 25.0\n`;
    out += `VERDICT STATUS   : ${evaluation.verdict.toUpperCase().replace('_', ' ')}\n\n`;

    out += `--------------------------------------------------------------------------------\n`;
    out += `1. DIAGNOSTIC RESPONSES (12 QUESTIONS)\n`;
    out += `--------------------------------------------------------------------------------\n\n`;

    out += `■ FILTER 1: PSYCHOLOGICAL DATA (PATTERN RECOGNITION)\n`;
    out += `• Q01 (Energy Audit): ${profile.answers.Q01 || '[Not answered]'}\n`;
    out += `• Q02 (Friction Analysis): ${profile.answers.Q02 || '[Not answered]'}\n`;
    out += `• Q03 (Values Under Pressure): ${profile.answers.Q03 || '[Not answered]'}\n\n`;

    out += `■ FILTER 2: SCIENTIFIC DATA (EMPIRICAL GROUNDING)\n`;
    out += `• Q04 (Resource Bounds): ${profile.answers.Q04 || '[Not answered]'}\n`;
    out += `• Q05 (Skill Distribution & Mastery): ${profile.answers.Q05 || '[Not answered]'}\n`;
    out += `• Q06 (Chronotype & Peak Focus): ${profile.answers.Q06 || '[Not answered]'}\n\n`;

    out += `■ FILTER 3: CONTROLLED RANDOMNESS (STOCHASTIC SPARK)\n`;
    out += `• Q07 (Arbitrary Constraint): ${profile.answers.Q07 || '[Not answered]'}\n`;
    out += `• Q08 (Perspective Flip): ${profile.answers.Q08 || '[Not answered]'}\n`;
    out += `• Q09 (Wild Card Scenario): ${profile.answers.Q09 || '[Not answered]'}\n\n`;

    out += `■ FILTER 4: INTUITION & CONTEXT (THE "ETC." LAYER)\n`;
    out += `• Q10 (The Gut Response): ${profile.answers.Q10 || '[Not answered]'}\n`;
    out += `• Q11 (Resonance Check): ${profile.answers.Q11 || '[Not answered]'}\n`;
    out += `• Q12 (The Final Filter): ${profile.answers.Q12 || '[Not answered]'}\n\n`;

    out += `--------------------------------------------------------------------------------\n`;
    out += `2. SIGNAL SCORING & DVI SYNTHESIS\n`;
    out += `--------------------------------------------------------------------------------\n`;
    out += `• [${profile.scores.authenticity}/5] Core Authenticity (Intuition: Q10, Q12)\n`;
    out += `    >> Rationale: ${profile.rationales.authenticity || 'N/A'}\n`;
    out += `• [${profile.scores.feasibility}/5] Empirical Feasibility (Science: Q04-Q06)\n`;
    out += `    >> Rationale: ${profile.rationales.feasibility || 'N/A'}\n`;
    out += `• [${profile.scores.resilience}/5] Adaptive Resilience (Randomness: Q07-Q09)\n`;
    out += `    >> Rationale: ${profile.rationales.resilience || 'N/A'}\n`;
    out += `• [${profile.scores.energy}/5] Energy Sustainability (Psychology: Q01)\n`;
    out += `    >> Rationale: ${profile.rationales.energy || 'N/A'}\n`;
    out += `• [${profile.scores.resonance}/5] Problem Resonance (Context: Q02, Q11)\n`;
    out += `    >> Rationale: ${profile.rationales.resonance || 'N/A'}\n\n`;

    out += `[ THE ALGORITHM ]\n`;
    out += `DVI = (1.5 × A) + (1.25 × B) + (1.0 × C) + (0.75 × D) + (0.5 × E)\n`;
    out += `    = (1.50 × ${profile.scores.authenticity}) + (1.25 × ${profile.scores.feasibility}) + (1.00 × ${profile.scores.resilience}) + (0.75 × ${profile.scores.energy}) + (0.50 × ${profile.scores.resonance})\n`;
    out += `    = ${evaluation.breakdown.authenticityWeighted} + ${evaluation.breakdown.feasibilityWeighted} + ${evaluation.breakdown.resilienceWeighted} + ${evaluation.breakdown.energyWeighted} + ${evaluation.breakdown.resonanceWeighted}\n`;
    out += `FINAL DVI: ${evaluation.dvi.toFixed(2)} / 25.0\n\n`;

    out += `--------------------------------------------------------------------------------\n`;
    out += `3. STRATEGIC ROADMAP VECTOR\n`;
    out += `--------------------------------------------------------------------------------\n`;
    out += `• Immediate Execution : ${profile.strategicPlan.immediateExecution || 'N/A'}\n`;
    out += `• Noise Reduction     : ${profile.strategicPlan.noiseReduction || 'N/A'}\n`;
    out += `• Blocker Resolution  : ${profile.strategicPlan.blockerResolution || 'N/A'}\n\n`;

    out += `--------------------------------------------------------------------------------\n`;
    out += `4. 7-DAY MICRO-SPRINT SUMMARY\n`;
    out += `--------------------------------------------------------------------------------\n`;
    out += `• Vector Name     : ${profile.sprintData.pivotedVectorName || 'N/A'}\n`;
    out += `• Core Deliverable: ${profile.sprintData.coreDeliverable || 'N/A'}\n`;
    out += `• Peak Window     : ${profile.sprintData.peakWindow || 'N/A'}\n`;
    out += `• Anonymity Pledge: ${profile.sprintData.anonymityPledged ? 'CONFIRMED' : 'UNCONFIRMED'}\n\n`;

    out += `+-----+-------------------+----------------+---------------------+-------------+\n`;
    out += `| Day | Energy Gen (1-5)  | Friction (1-5) | Anon Integrity(1-5) | Daily Total |\n`;
    out += `+-----+-------------------+----------------+---------------------+-------------+\n`;
    let sprintTotal = 0;
    profile.sprintData.entries.forEach((e) => {
      const daySum = e.energyGen + e.skillFriction + e.anonIntegrity;
      sprintTotal += daySum;
      out += `|  ${e.day}  |         ${e.energyGen}         |        ${e.skillFriction}       |          ${e.anonIntegrity}          |   ${daySum.toString().padStart(2, ' ')} / 15    |\n`;
    });
    out += `+-----+-------------------+----------------+---------------------+-------------+\n`;
    out += `| TOT |                   |                |                     |  ${sprintTotal.toString().padStart(3, ' ')} / 105   |\n`;
    out += `+-----+-------------------+----------------+---------------------+-------------+\n\n`;

    if (profile.perceptualData) {
      out += `--------------------------------------------------------------------------------\n`;
      out += `5. MASTER PERCEPTION BLUEPRINT (CROSS-SPECIES MULTI-SENSOR DECRYPTION)\n`;
      out += `--------------------------------------------------------------------------------\n`;
      out += `• Geometry (Feline Slit)     : ${profile.perceptualData.cuboidStructuralEdges || 'N/A'}\n`;
      out += `• Thermal Heat (Viper IR)    : ${profile.perceptualData.thermalHeatTask || 'N/A'}\n`;
      out += `• Magnetic Vector (Avian)    : ${profile.perceptualData.magneticVectorPull || 'N/A'}\n`;
      out += `• Ultraviolet Runway (Insect): ${profile.perceptualData.uvLandingStrips || 'N/A'}\n`;
      out += `• Aperture Width             : ${profile.perceptualData.apertureWidthPercent || 25}%\n\n`;
    }

    out += `================================================================================\n`;
    return out;
  }, [profile, evaluation]);

  // Markdown format
  const markdownContent = useMemo(() => {
    return `# Structured Existential Navigation — Master Assessment

**Candidate Purpose:** ${profile.candidatePurpose || profile.name}  
**DVI Score:** ${evaluation.dvi.toFixed(2)} / 25.0  
**Status:** ${evaluation.title}  

---

## 1. Diagnostic Responses (12 Questions)

### Phase 1: Psychological Data (Pattern Recognition)
- **Q01 (Energy Audit):** ${profile.answers.Q01 || '_Not answered_'}
- **Q02 (Friction Analysis):** ${profile.answers.Q02 || '_Not answered_'}
- **Q03 (Values Under Pressure):** ${profile.answers.Q03 || '_Not answered_'}

### Phase 2: Scientific Data (Empirical Grounding)
- **Q04 (Resource Bounds):** ${profile.answers.Q04 || '_Not answered_'}
- **Q05 (Skill Distribution & Mastery):** ${profile.answers.Q05 || '_Not answered_'}
- **Q06 (Chronotype & Peak Focus):** ${profile.answers.Q06 || '_Not answered_'}

### Phase 3: Controlled Randomness (Stochastic Spark)
- **Q07 (Arbitrary Constraint):** ${profile.answers.Q07 || '_Not answered_'}
- **Q08 (Perspective Flip):** ${profile.answers.Q08 || '_Not answered_'}
- **Q09 (Wild Card Scenario):** ${profile.answers.Q09 || '_Not answered_'}

### Phase 4: Intuition & Context (The "Etc." Layer)
- **Q10 (The Gut Response):** ${profile.answers.Q10 || '_Not answered_'}
- **Q11 (Resonance Check):** ${profile.answers.Q11 || '_Not answered_'}
- **Q12 (The Final Filter - Anonymity):** ${profile.answers.Q12 || '_Not answered_'}

---

## 2. Evaluation & DVI Formula

\`\`\`
DVI = (1.5 × A) + (1.25 × B) + (1.0 × C) + (0.75 × D) + (0.5 × E)
DVI = ${evaluation.dvi.toFixed(2)} / 25.0
\`\`\`

- **Authenticity (A):** ${profile.scores.authenticity}/5 (${profile.rationales.authenticity || 'N/A'})
- **Feasibility (B):** ${profile.scores.feasibility}/5 (${profile.rationales.feasibility || 'N/A'})
- **Resilience (C):** ${profile.scores.resilience}/5 (${profile.rationales.resilience || 'N/A'})
- **Energy Sustainability (D):** ${profile.scores.energy}/5 (${profile.rationales.energy || 'N/A'})
- **Problem Resonance (E):** ${profile.scores.resonance}/5 (${profile.rationales.resonance || 'N/A'})

---

## 3. Strategic Execution Plan
- **Immediate Execution:** ${profile.strategicPlan.immediateExecution || 'N/A'}
- **Noise Reduction:** ${profile.strategicPlan.noiseReduction || 'N/A'}
- **Blocker Resolution:** ${profile.strategicPlan.blockerResolution || 'N/A'}
`;
  }, [profile, evaluation]);

  const jsonContent = useMemo(() => {
    return JSON.stringify(profile, null, 2);
  }, [profile]);

  const activeContent =
    exportFormat === 'txt'
      ? plainTextContent
      : exportFormat === 'md'
      ? markdownContent
      : jsonContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extension = exportFormat;
    const blob = new Blob([activeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mind_meld_assessment_${new Date().toISOString().split('T')[0]}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      setImportError('');
      const parsed = JSON.parse(importJsonText);
      if (!parsed.scores || !parsed.answers) {
        throw new Error('Invalid format: missing required scores or answers keys.');
      }
      onImportProfile(parsed);
      onClose();
    } catch (err: any) {
      setImportError(err.message || 'Failed to parse JSON');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Export Master Log / Transfer to Phone
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Optimized for mobile note apps (Samsung Notes, Apple Notes), Markdown, or JSON.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="px-6 pt-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono">
            <button
              onClick={() => setExportFormat('txt')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                exportFormat === 'txt'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Plain Text (.txt / Samsung Notes)
            </button>
            <button
              onClick={() => setExportFormat('md')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                exportFormat === 'md'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Markdown (.md)
            </button>
            <button
              onClick={() => setExportFormat('json')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                exportFormat === 'json'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              JSON Backup & Restore
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-500 text-xs font-medium text-white transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-6 flex-1 overflow-y-auto">
          {exportFormat === 'json' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                  JSON Export Data:
                </label>
                <textarea
                  readOnly
                  value={jsonContent}
                  rows={8}
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Restore / Import JSON:
                </label>
                <textarea
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste assessment JSON here to load..."
                  rows={4}
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                {importError && (
                  <p className="text-xs text-rose-500 mt-1">{importError}</p>
                )}
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={handleImport}
                    disabled={!importJsonText.trim()}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium disabled:opacity-40 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Load JSON into App</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <pre className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed select-all">
              {activeContent}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
