import React, { useState, useEffect } from 'react';
import { CognitiveDistortionEntry, BehavioralExperiment } from '../types/neuro.ts';
import confetti from 'canvas-confetti';
import {
  Brain,
  Scale,
  FlaskConical,
  HelpCircle,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Trash2
} from 'lucide-react';

const INITIAL_DISTORTIONS: CognitiveDistortionEntry[] = [
  {
    id: 'dist-1',
    timestamp: Date.now() - 86400000,
    type: 'mental_filtering',
    negativeThought: 'I struggled to recall an author’s name this morning—my memory and intellectual edge are completely gone.',
    evidenceFor: 'Took 45 seconds to remember the name of a researcher I read last month.',
    objectiveCounterEvidence: 'Yesterday I synthesized a 30-page complex architecture document, wrote 200 lines of bug-free code, and debugged a subtle logic error in minutes.',
    reconstructedTruth: 'Word recall latency is a standard symptom of transient sleep deficit and cortisol elevation. Minor retrieval delays do not equate to structural cortical deterioration.',
    schemaShift: 'From: "My memory must be 100% instantaneous or I am broken" -> To: "Information retrieval fluctuates with autonomic recovery; the underlying knowledge base is fully intact."'
  },
  {
    id: 'dist-2',
    timestamp: Date.now() - 43200000,
    type: 'catastrophizing',
    negativeThought: 'Having a slow thinking day means my cognitive decline is permanent and irreversible.',
    evidenceFor: 'Felt sluggish during this afternoon\'s deep reading block.',
    objectiveCounterEvidence: 'The brain undergoes homeostatic metabolic fluctuations. Athletes do not consider muscle fatigue as permanent muscular destruction.',
    reconstructedTruth: 'Cognitive fatigue is a physical homeostatic signal to down-regulate top-down control for rest, not biological neurodegeneration.',
    schemaShift: 'From: "A sluggish day is a death sentence for my intellect" -> To: "Fatigue is a temporary neurochemical state; deep rest resets prefrontal receptor sensitivity."'
  },
  {
    id: 'dist-3',
    timestamp: Date.now() - 10000000,
    type: 'fixed_gift',
    negativeThought: 'My genius was a fragile innate gift, and now that it has cracked under pressure, I have lost it forever.',
    evidenceFor: 'I cannot effortlessly jump into world-class problems without feeling friction.',
    objectiveCounterEvidence: 'Intelligence is supported by dynamic, living neuroplastic circuits, not a brittle porcelain vase. Dormant synapses can be re-potentiated through LTP and BDNF.',
    reconstructedTruth: 'The prefrontal cortex is an adaptable biological organ. The neural pathways are dormant due to elevated stress markers, not structurally destroyed.',
    schemaShift: 'From: "Fragile fixed gift" -> To: "Resilient neuroplastic organism capable of continuous synaptic restoration."'
  }
];

const INITIAL_EXPERIMENTS: BehavioralExperiment[] = [
  {
    id: 'exp-1',
    timestamp: Date.now() - 172800000,
    title: 'The Non-Evaluative Logic Probe',
    catastrophicPrediction: 'If I try to solve this abstract logic sequence, my brain will freeze and prove I am empty.',
    anxietyRating: 8,
    lowStakesTask: 'Solve an un-timed abstract pattern puzzle with zero scores or time tracking.',
    processFocusAnchor: 'Deliberately observe the shape outlines and color contrast; intentionally discard any thought of getting the right answer.',
    observedOutcome: 'At minute 2, felt an anxious tightening in throat, but acknowledged it as anxiety rather than mental incapacity. By minute 4, spotted the underlying rotation matrix naturally.',
    actualLimitationIdentified: 'anxiety_freeze',
    clinicalTakeaway: 'The freeze was driven by performance panic, not absent processing hardware. When decoupled from outcome, the executive network functioned smoothly.',
    completed: true
  },
  {
    id: 'exp-2',
    timestamp: Date.now() - 86400000,
    title: 'Process-Only Domain Translation',
    catastrophicPrediction: 'I will be unable to formulate a coherent philosophical critique of this paper.',
    anxietyRating: 7,
    lowStakesTask: 'Write 3 unpolished sentences describing the foundational premises of the argument.',
    processFocusAnchor: 'Focus solely on the physical feeling of keyboard keys and the sound of breathing. Write the first thought that comes without backspacing.',
    observedOutcome: 'Wrote 120 words in 4 minutes. The synthesis was clear, nuanced, and structurally sound.',
    actualLimitationIdentified: 'lack_of_capacity_disproven',
    clinicalTakeaway: 'The cognitive firewall drops the instant I stop trying to "prove" my intellect to an imaginary external critic.',
    completed: true
  }
];

export const CBTWorkbench: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'restructuring' | 'socratic' | 'experiments'>('restructuring');

  // Distortions state
  const [distortions, setDistortions] = useState<CognitiveDistortionEntry[]>(() => {
    try {
      const saved = localStorage.getItem('neurorestore_distortions');
      return saved ? JSON.parse(saved) : INITIAL_DISTORTIONS;
    } catch {
      return INITIAL_DISTORTIONS;
    }
  });

  // Experiments state
  const [experiments, setExperiments] = useState<BehavioralExperiment[]>(() => {
    try {
      const saved = localStorage.getItem('neurorestore_experiments');
      return saved ? JSON.parse(saved) : INITIAL_EXPERIMENTS;
    } catch {
      return INITIAL_EXPERIMENTS;
    }
  });

  // Form states for adding new distortion
  const [showAddDistortion, setShowAddDistortion] = useState(false);
  const [newThought, setNewThought] = useState('');
  const [newType, setNewType] = useState<CognitiveDistortionEntry['type']>('mental_filtering');
  const [newEvidenceFor, setNewEvidenceFor] = useState('');
  const [newCounterEvidence, setNewCounterEvidence] = useState('');
  const [newReconstructed, setNewReconstructed] = useState('');
  const [newSchema, setNewSchema] = useState('');

  // Form states for adding new experiment
  const [showAddExperiment, setShowAddExperiment] = useState(false);
  const [expTitle, setExpTitle] = useState('');
  const [expPrediction, setExpPrediction] = useState('');
  const [expAnxiety, setExpAnxiety] = useState(6);
  const [expTask, setExpTask] = useState('');
  const [expAnchor, setExpAnchor] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('neurorestore_distortions', JSON.stringify(distortions));
    } catch {
      // storage unavailable
    }
  }, [distortions]);

  useEffect(() => {
    try {
      localStorage.setItem('neurorestore_experiments', JSON.stringify(experiments));
    } catch {
      // storage unavailable
    }
  }, [experiments]);

  const handleSaveDistortion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThought || !newCounterEvidence) return;
    const entry: CognitiveDistortionEntry = {
      id: `dist-${Date.now()}`,
      timestamp: Date.now(),
      type: newType,
      negativeThought: newThought,
      evidenceFor: newEvidenceFor || 'Perceived internal lag or error.',
      objectiveCounterEvidence: newCounterEvidence,
      reconstructedTruth: newReconstructed || 'Stress-induced working memory restriction, not structural decay.',
      schemaShift: newSchema || 'From fragile fixed deficit to adaptable biological plasticity.'
    };
    setDistortions([entry, ...distortions]);
    setShowAddDistortion(false);
    setNewThought('');
    setNewEvidenceFor('');
    setNewCounterEvidence('');
    setNewReconstructed('');
    setNewSchema('');
    confetti({ particleCount: 40, spread: 50 });
  };

  const handleSaveExperiment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle || !expPrediction || !expTask) return;
    const exp: BehavioralExperiment = {
      id: `exp-${Date.now()}`,
      timestamp: Date.now(),
      title: expTitle,
      catastrophicPrediction: expPrediction,
      anxietyRating: expAnxiety,
      lowStakesTask: expTask,
      processFocusAnchor: expAnchor || 'Focus on keyboard clicks and fluid uninterrupted rhythm.',
      observedOutcome: 'Pending execution.',
      actualLimitationIdentified: 'anxiety_freeze',
      clinicalTakeaway: 'Bypassing outcome orientation proves structural processing capacity remains intact.',
      completed: false
    };
    setExperiments([exp, ...experiments]);
    setShowAddExperiment(false);
    setExpTitle('');
    setExpPrediction('');
    setExpTask('');
    setExpAnchor('');
  };

  const handleDeleteDistortion = (id: string) => {
    setDistortions(distortions.filter((d) => d.id !== id));
  };

  const handleDeleteExperiment = (id: string) => {
    setExperiments(experiments.filter((e) => e.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Editorial Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>CLINICAL CBT SUITE</span>
          <span aria-hidden="true">·</span>
          <span>COGNITIVE RESTRUCTURING</span>
          <span aria-hidden="true">·</span>
          <span>BEHAVIORAL EXPERIMENTS</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-100">
          CBT & "De-Hypnosis" Counter-Suggestion Lab
        </h1>
        <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
          Therapists don't just tell you that you are still intelligent; they make you prove it to your own Central Executive Network through structured tests and objective evidence gathering.
        </p>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900/80 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveSubTab('restructuring')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'restructuring'
              ? 'bg-slate-800 text-cyan-400 shadow-sm border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Cognitive Restructuring</span>
        </button>
        <button
          onClick={() => setActiveSubTab('socratic')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'socratic'
              ? 'bg-slate-800 text-cyan-400 shadow-sm border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Socratic Fallacy Auditor</span>
        </button>
        <button
          onClick={() => setActiveSubTab('experiments')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'experiments'
              ? 'bg-slate-800 text-cyan-400 shadow-sm border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>Behavioral Experiments</span>
        </button>
      </div>

      {/* ================= 1. COGNITIVE RESTRUCTURING ================= */}
      {activeSubTab === 'restructuring' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Dismantling Cognitive Distortions</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                When a genius accepts the suggestion that they have lost their edge, their mind falls victim to Mental Filtering and Catastrophizing. Force the brain to assemble hard evidence for and against.
              </p>
            </div>
            <button
              onClick={() => setShowAddDistortion(!showAddDistortion)}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddDistortion ? 'Close Form' : 'Deconstruct New Thought'}</span>
            </button>
          </div>

          {/* Add Form */}
          {showAddDistortion && (
            <form onSubmit={handleSaveDistortion} className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-4">
              <div className="text-xs font-mono uppercase text-cyan-400">Step-by-Step Cognitive Restructuring</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Negative Suggestion / Core Belief</label>
                  <textarea
                    required
                    value={newThought}
                    onChange={(e) => setNewThought(e.target.value)}
                    placeholder="e.g. 'I forgot an equation today, my intelligence is declining permanently...'"
                    className="w-full h-24 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Distortion Category</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as CognitiveDistortionEntry['type'])}
                    className="w-full p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none mb-3"
                  >
                    <option value="mental_filtering">Mental Filtering (Ignoring 99% wins, obsessing on 1 lapse)</option>
                    <option value="catastrophizing">Catastrophizing (Treating 1 slow day as structural brain damage)</option>
                    <option value="fixed_gift">Fixed Gift Fallacy (Believing genius is a brittle crystal)</option>
                    <option value="internalized_stigma">Internalized Stigmatization (Suppressing speed to fit in)</option>
                    <option value="nocebo_loop">Nocebo Loop (Expecting failure, causing cortisol choke)</option>
                  </select>

                  <label className="block text-xs font-semibold text-slate-300 mb-1">Perceived "Evidence For" (The flaw)</label>
                  <input
                    type="text"
                    value={newEvidenceFor}
                    onChange={(e) => setNewEvidenceFor(e.target.value)}
                    placeholder="e.g. 'Took longer than usual to debug a script.'"
                    className="w-full p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Objective Counter-Evidence (Undeniable facts)</label>
                  <textarea
                    required
                    value={newCounterEvidence}
                    onChange={(e) => setNewCounterEvidence(e.target.value)}
                    placeholder="e.g. 'Synthesized complex data yesterday, resolved a multi-variable argument last week...'"
                    className="w-full h-24 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Reconstructed Truth (Clinical recontextualization)</label>
                  <textarea
                    required
                    value={newReconstructed}
                    onChange={(e) => setNewReconstructed(e.target.value)}
                    placeholder="e.g. 'Lapse was driven by sleep deficit and high cortisol, not loss of neural hardware.'"
                    className="w-full h-24 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Schema Shift (Fixed Mindset -&gt; Resilient Mindset)</label>
                <input
                  type="text"
                  value={newSchema}
                  onChange={(e) => setNewSchema(e.target.value)}
                  placeholder="e.g. From 'Fragile gift shattered' to 'Dynamic neuroplastic brain that re-wires under reduced threat.'"
                  className="w-full p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDistortion(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Commit Restructured Belief
                </button>
              </div>
            </form>
          )}

          {/* List of Distortion Cards */}
          <div className="space-y-4">
            {distortions.map((dist) => (
              <div key={dist.id} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <span className="uppercase">{dist.type.replace('_', ' ')}</span>
                    <span aria-hidden="true">·</span>
                    <span>COGNITIVE AUDIT</span>
                  </div>
                  <button
                    onClick={() => handleDeleteDistortion(dist.id)}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* The Negative Trap */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-950/40 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Negative Suggestion / Trap</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-medium">"{dist.negativeThought}"</p>
                    <p className="text-xs text-slate-400 pt-1 border-t border-slate-800/60">
                      <span className="text-slate-400 font-semibold">Perceived Trigger: </span>
                      {dist.evidenceFor}
                    </p>
                  </div>

                  {/* Objective Evidence & Reconstructed Truth */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-950/40 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Objective Counter-Evidence</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{dist.objectiveCounterEvidence}</p>
                    <div className="pt-2 border-t border-slate-800/60 text-xs">
                      <span className="text-cyan-300 font-semibold block mb-0.5">Clinical Truth:</span>
                      <p className="text-slate-300 leading-relaxed">{dist.reconstructedTruth}</p>
                    </div>
                  </div>
                </div>

                {/* Schema Shift Banner */}
                <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-center gap-2.5 text-xs">
                  <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-cyan-200 leading-relaxed">
                    <strong className="text-cyan-300">Schema Shift: </strong>
                    {dist.schemaShift}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 2. SOCRATIC QUESTIONING ================= */}
      {activeSubTab === 'socratic' && (
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-cyan-400">CLINICAL SOCRATIC METHOD</span>
            <h2 className="text-xl font-bold text-slate-100 mt-1">Exposing the Logical Flaws of Negative Suggestion</h2>
            <p className="text-sm text-slate-400 mt-1">
              Therapists do not argue; they ask precise questions that force the brain's own logical architecture to identify the absurdity of the negative suggestion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="text-xs font-mono text-cyan-400">SOCRATIC PROBE 01</div>
              <h3 className="text-sm font-semibold text-slate-200">The Argument Formulation Paradox</h3>
              <p className="text-xs text-cyan-200/90 italic font-serif leading-relaxed">
                "If your intelligence is entirely gone, what neurological engine just allowed you to formulate such a complex, grammatically intricate, multi-layered argument to prove you are no longer smart?"
              </p>
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                <strong>Clinical Takeaway:</strong> The very act of ruminating and building an existential case against your intellect requires high-order executive processing. The engine isn't missing; it is simply pointing inward.
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="text-xs font-mono text-cyan-400">SOCRATIC PROBE 02</div>
              <h3 className="text-sm font-semibold text-slate-200">The Athlete Analogy Invariant</h3>
              <p className="text-xs text-cyan-200/90 italic font-serif leading-relaxed">
                "If an Olympic sprinter runs a marathon with a 40-pound weighted vest while sleep-deprived, do you diagnose their leg muscles as permanently destroyed, or do you remove the vest and let the muscles replenish glycogen?"
              </p>
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                <strong>Clinical Takeaway:</strong> Chronic cortisol and performance surveillance are the weighted vest. Your working memory is choked, not atrophied.
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="text-xs font-mono text-cyan-400">SOCRATIC PROBE 03</div>
              <h3 className="text-sm font-semibold text-slate-200">The Single-Lapse Generalization</h3>
              <p className="text-xs text-cyan-200/90 italic font-serif leading-relaxed">
                "Would you conclude that a supercomputer's hardware has physically melted because a single background query timed out due to high network traffic?"
              </p>
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                <strong>Clinical Takeaway:</strong> Mental filtering turns a temporary buffer timeout into an existential hardware failure. Objective reality disproves this correlation.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. BEHAVIORAL EXPERIMENTS ================= */}
      {activeSubTab === 'experiments' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Behavioral Experiments Crucible</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                The patient is given low-stakes, highly engaging cognitive tasks with instructions to intentionally focus on the process rather than the outcome. This bypasses performance anxiety and proves processing power is intact.
              </p>
            </div>
            <button
              onClick={() => setShowAddExperiment(!showAddExperiment)}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddExperiment ? 'Close Form' : 'Design New Experiment'}</span>
            </button>
          </div>

          {/* Add Experiment Form */}
          {showAddExperiment && (
            <form onSubmit={handleSaveExperiment} className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-4">
              <div className="text-xs font-mono uppercase text-cyan-400">New Behavioral Experiment Design</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Experiment Title</label>
                  <input
                    type="text"
                    required
                    value={expTitle}
                    onChange={(e) => setExpTitle(e.target.value)}
                    placeholder="e.g. 5-Minute Unscored Math Derivation"
                    className="w-full p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Catastrophic Prediction to Test</label>
                  <input
                    type="text"
                    required
                    value={expPrediction}
                    onChange={(e) => setExpPrediction(e.target.value)}
                    placeholder="e.g. 'If I look at line 3, my brain will draw a total blank.'"
                    className="w-full p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Low-Stakes Task Description</label>
                  <textarea
                    required
                    value={expTask}
                    onChange={(e) => setExpTask(e.target.value)}
                    placeholder="e.g. Solve 3 easy pattern questions; terminate after 5 minutes regardless of score."
                    className="w-full h-20 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Process Focus Anchor (Outcome Bypass)</label>
                  <textarea
                    value={expAnchor}
                    onChange={(e) => setExpAnchor(e.target.value)}
                    placeholder="e.g. Focus on the geometry of the lines, ignore correct/incorrect."
                    className="w-full h-20 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-100 focus:border-cyan-500 outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddExperiment(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Commit Experiment Protocol
                </button>
              </div>
            </form>
          )}

          {/* List of Experiments */}
          <div className="space-y-4">
            {experiments.map((exp) => (
              <div key={exp.id} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400">CRUCIBLE TRIAL</span>
                    <span aria-hidden="true" className="text-xs text-slate-600">·</span>
                    <span className="text-sm font-semibold text-slate-100">{exp.title}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteExperiment(exp.id)}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    title="Delete experiment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider block">Hypothesized Catastrophe:</span>
                    <p className="text-slate-200 italic font-serif text-sm">"{exp.catastrophicPrediction}"</p>
                    <div className="pt-2 border-t border-slate-800/80 text-slate-400">
                      <strong>Process Anchor:</strong> {exp.processFocusAnchor}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <span className="font-semibold text-cyan-400 uppercase tracking-wider block">Observed Outcome & Evidence:</span>
                    <p className="text-slate-300 leading-relaxed">{exp.observedOutcome}</p>
                    <div className="pt-2 border-t border-slate-800/80 text-cyan-200">
                      <strong>Clinical Verdict:</strong> {exp.clinicalTakeaway}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
