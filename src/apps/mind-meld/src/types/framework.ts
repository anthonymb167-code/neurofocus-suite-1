/**
 * Types and interfaces for the Mind Meld: Structured Existential Navigation Framework
 */

export type FilterKey = 'psychology' | 'science' | 'randomness' | 'intuition';

export interface FilterDefinition {
  id: FilterKey;
  number: number;
  name: string;
  subtitle: string;
  mechanism: string;
  logic: string;
  color: string;
  accentBg: string;
}

export interface DiagnosticQuestion {
  id: string; // e.g. "Q01"
  filterId: FilterKey;
  title: string;
  objective: string;
  questionPrompt: string;
  placeholder: string;
  hint: string;
  dimensionMapped: string;
}

export interface DiagnosticScores {
  authenticity: number; // 1-5 (A - Intuition: Q10, Q12)
  feasibility: number;  // 1-5 (B - Science: Q04, Q05, Q06)
  resilience: number;   // 1-5 (C - Randomness: Q07, Q08, Q09)
  energy: number;       // 1-5 (D - Psychology: Q01)
  resonance: number;    // 1-5 (E - Psychology & Context: Q02, Q11)
}

export interface ScoreRationales {
  authenticity: string;
  feasibility: string;
  resilience: string;
  energy: string;
  resonance: string;
}

export interface StochasticObject {
  name: string;
  category: string;
  physicalProperties: string[];
  philosophicalMetaphor: string;
}

export interface DailySprintEntry {
  day: number; // 1-7
  date: string;
  executionWindow: string;
  taskCompleted: string;
  energyGen: number; // 1-5
  skillFriction: number; // 1-5
  anonIntegrity: number; // 1-5
  notes: string;
}

export interface MicroSprintData {
  pivotedVectorName: string;
  coreDeliverable: string;
  peakWindow: string;
  anonymityPledged: boolean;
  entries: DailySprintEntry[];
}

// Memory Retrieval and Archive Recovery state for optimal self amnesia
export interface CalibrationArchiveData {
  staticNoiseDump: string; // What is exhausting you most right now
  baselineShouldersDroppedMoment: string; // Moment background noise stopped
  energyVsDilationScore: number; // -5 (Total Drain) to +5 (High Flow)
  anonymityOathConfirmed: boolean;
  // Specialized Memory Retrieval Probes:
  preCorruptionMemory: string; // Kinetic joy before bills/career (age 10-16)
  contradictionAuditCringe: string; // Routine causing deepest internal cringe
  envyDetectorInsight: string; // Secret envy and underlying freedom
  // Baseline Metrics:
  timeElapsedDays: number;
  technicalBottlenecks: string;
  resourceCapacityCheck: string;
}

export interface EnergyAuditItem {
  id: string;
  activity: string;
  score: number; // -5 to +5
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  tag?: 'reflection' | 'anonymity_probe' | 'friction_probe' | 'stochastic_break';
}

export type SensoryFilterKey = 'human' | 'feline' | 'avian' | 'viper' | 'insectoid';

export interface PerceptualDecryptionData {
  activeSensorFilter: SensoryFilterKey;
  apertureWidthPercent: number; // 5 to 100% (100 = circular human bloom, 5 = sharp feline slit)
  softProblemStatement: string; // When looked at through soft 480p human eyes
  cuboidStructuralEdges: string; // The 6-sided hard structural framework uncovered
  magneticVectorPull: string; // Invisible directional force guiding execution
  thermalHeatTask: string; // High-heat intrinsic task vs cold status trap
  uvLandingStrips: string; // Hidden structural runway revealed by UV
  compactionCompleted: boolean;
}

export interface AssessmentProfile {
  id: string;
  name: string;
  subjectTitle: string;
  candidatePurpose: string;
  answers: Record<string, string>; // Q01 to Q12
  scores: DiagnosticScores;
  rationales: ScoreRationales;
  strategicPlan: {
    immediateExecution: string;
    noiseReduction: string;
    blockerResolution: string;
  };
  sprintData: MicroSprintData;
  calibrationData: CalibrationArchiveData;
  energyAuditItems: EnergyAuditItem[];
  chatHistory: ChatMessage[];
  perceptualData?: PerceptualDecryptionData;
}

