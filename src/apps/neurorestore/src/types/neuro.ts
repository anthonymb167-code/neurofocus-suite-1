export interface SidewaysPrompt {
  id: string;
  day: number;
  module: 'A' | 'B' | 'C';
  moduleTitle: string;
  title: string;
  prompt: string;
  subtext: string;
  neuroRationale: string;
  divergenceSeeds: string[];
}

export interface WeeklyProtocol {
  week: number;
  title: string;
  subtitle: string;
  targetMechanism: string;
  clinicalStrategy: {
    name: string;
    description: string;
    actionItems: string[];
  };
  neuroplasticStrategy: {
    name: string;
    protocol: string;
    mechanism: string;
  };
  cognitiveLoad: {
    level: string;
    description: string;
    rules: string[];
  };
  dailyRoutines: {
    day: number;
    title: string;
    task: string;
    duration: string;
  }[];
}

export interface CognitiveDistortionEntry {
  id: string;
  timestamp: number;
  type: 'mental_filtering' | 'catastrophizing' | 'fixed_gift' | 'internalized_stigma' | 'nocebo_loop';
  negativeThought: string;
  evidenceFor: string;
  objectiveCounterEvidence: string;
  reconstructedTruth: string;
  schemaShift: string;
}

export interface BehavioralExperiment {
  id: string;
  timestamp: number;
  title: string;
  catastrophicPrediction: string;
  anxietyRating: number; // 1-10
  lowStakesTask: string;
  processFocusAnchor: string;
  observedOutcome: string;
  actualLimitationIdentified: 'anxiety_freeze' | 'pure_fatigue' | 'lack_of_capacity_disproven';
  clinicalTakeaway: string;
  completed: boolean;
}

export interface SocraticQuestionPath {
  id: string;
  category: string;
  initialBelief: string;
  steps: {
    question: string;
    intent: string;
    sampleReflections: string[];
  }[];
}

export interface PhenomenonCard {
  id: string;
  name: string;
  primaryDriver: string;
  whatActuallyHappens: string;
  neurobiology: string;
  clinicalAntidote: string;
  severityProfile: string;
}
