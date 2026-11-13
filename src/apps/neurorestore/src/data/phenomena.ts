import { PhenomenonCard } from '../types/neuro.ts';

export const PHENOMENA_DATA: PhenomenonCard[] = [
  {
    id: 'golem-effect',
    name: 'The Golem Effect',
    primaryDriver: 'External negative expectations & assisted sabotage',
    whatActuallyHappens: 'When peers, supervisors, or toxic social environments subtly or overtly project low expectations, an individual gradually internalizes these expectations, resulting in actual performance collapse.',
    neurobiology: 'Constant social threat activates the dorsal anterior cingulate cortex (dACC), elevating basal cortisol and dampening prefrontal working memory registers.',
    clinicalAntidote: 'Social boundary hardening, Socratic deconstruction of external authority validity, and sovereign performance benchmarking.',
    severityProfile: 'External Social Induction'
  },
  {
    id: 'nocebo-effect',
    name: 'The Cognitive Nocebo Effect',
    primaryDriver: 'Negative self-hypnosis & autosuggestion loops',
    whatActuallyHappens: 'The polar opposite of the placebo effect. If an individual repeatedly tells themselves that their brain is deteriorating or that their genius is permanently broken, the brain chemically manifests genuine cognitive sluggishness.',
    neurobiology: 'Anticipation of cognitive failure activates the HPA axis, triggering systemic cortisol release which down-regulates dopamine D1 receptors in the prefrontal cortex.',
    clinicalAntidote: 'Cognitive Restructuring, Counter-Suggestion protocols, and somatic refocusing on physical sensory reality.',
    severityProfile: 'Belief-Driven Biochemical Cascade'
  },
  {
    id: 'internalized-stigma',
    name: 'Internalized Stigmatization',
    primaryDriver: 'Social exclusion fear & unconscious intelligence suppression',
    whatActuallyHappens: 'High intelligence or creative outliers often face jealousy, ostracization, or alienation. To maintain belonging, the individual unconsciously learns to suppress their analytical speed.',
    neurobiology: 'The brain\'s survival mechanism flags exceptional analytical output as a social risk, placing an automatic inhibitory firewall over executive pathways.',
    clinicalAntidote: 'Decoupling personal safety from social conformity; finding high-density intellectual communities where depth is embraced.',
    severityProfile: 'Protective Evolutionary Mechanism'
  },
  {
    id: 'psychogenic-suppression',
    name: 'Psychogenic Cognitive Suppression',
    primaryDriver: 'Trauma response, severe burnout, or autosuggestive blockades',
    whatActuallyHappens: 'The underlying biological hardware and structural IQ remain 100% intact, but the brain drops a functional encryption firewall over the retrieval pathways. The patient feels like the gears are missing when the password was simply hidden.',
    neurobiology: 'Transient functional hypofrontality. The Central Executive Network (CEN) is starved of glucose and dopamine while the Default Mode Network (DMN) consumes metabolic energy with rumination.',
    clinicalAntidote: 'Lateral non-evaluative engagement (The Sandbox De-framing technique) to sneak complex reasoning past the internal firewall without alerting the security gatekeeper.',
    severityProfile: 'Functional Pathway Blockade'
  },
  {
    id: 'choking-under-pressure',
    name: 'Choking Under Pressure',
    primaryDriver: 'Performance anxiety & explicit monitoring of automatic skills',
    whatActuallyHappens: 'High stakes cause an individual to consciously over-analyze tasks that previously occurred in fluid, subconscious flow. This hyper-monitoring consumes the limited capacity of working memory.',
    neurobiology: 'Prefrontal hyper-vigilance interferes with the basal ganglia and cerebellum, turning effortless procedural mastery into stuttering, clunky manual calculations.',
    clinicalAntidote: 'Attention Bias Modification (ABM), external sensory anchors, and process-focused behavioral experiments.',
    severityProfile: 'Working Memory Overwhelm'
  },
  {
    id: 'burnout-deficit',
    name: 'Burnout-Induced Cognitive Deficit',
    primaryDriver: 'Chronic unremitting stress & sleep deprivation',
    whatActuallyHappens: 'Sustained elevated glucocorticoids physically prune dendritic spines in the prefrontal cortex and hippocampus, causing genuine drops in recall, verbal fluency, and executive decision-making.',
    neurobiology: 'Reduced Brain-Derived Neurotrophic Factor (BDNF), shrinkage of apical dendrites in pyramidal neurons, and microglial inflammation in the hippocampus.',
    clinicalAntidote: 'Zone 2 cardio to stimulate BDNF release, non-sleep deep rest (NSDR), sleep hygiene optimization, and micro-loading.',
    severityProfile: 'Structural Synaptic Atrophy (Reversible)'
  }
];

export const NEURO_CIRCUITS_EXPLANATION = {
  pfc: {
    name: 'Prefrontal Cortex (PFC)',
    role: 'The Chief Executive Officer',
    healthyState: 'Optimal working memory, abstract synthesis, top-down cognitive governance, and emotional regulation.',
    suppressedState: 'Functional hypofrontality: down-regulated activity, sluggish retrieval, feeling "foggy" or "locked out".',
    recoveryMechanism: 'Progressive cognitive loading, acetylcholine novelty markers, and dopamine micro-wins.'
  },
  hpaAxis: {
    name: 'Hypothalamic-Pituitary-Adrenal (HPA) Axis',
    role: 'The Threat Alarm & Hormone Firestorm',
    healthyState: 'Calm basal cortisol, sharp cortisol morning peak, quick recovery from acute challenges.',
    suppressedState: 'Chronic hyperactivation: flooding neurons with cortisol, dampening dopamine, pruning dendritic spines.',
    recoveryMechanism: 'Sensory Anchoring (1-2 min somatic grounding), physiological sighs, non-sleep deep rest (NSDR).'
  },
  networks: {
    name: 'Central Executive Network (CEN) vs Default Mode Network (DMN)',
    role: 'The Mental Attention Tug-of-War',
    healthyState: 'CEN is dominant during deep problem-solving; DMN quiets down, creating effortless flow and time dilation.',
    suppressedState: 'Hyperactive DMN hijacks metabolic bandwidth with self-doubt and error tracking, suffocating the CEN.',
    recoveryMechanism: 'Attention Bias Modification (ABM) and uninhibited lateral stream-of-consciousness writing.'
  },
  plasticity: {
    name: 'Long-Term Potentiation (LTP) & BDNF',
    role: 'The Biological Rewiring Engine',
    healthyState: 'Synapses that fire together wire together; high BDNF levels act as neural fertilizer for rapid dendritic growth.',
    suppressedState: 'Synaptic atrophy due to disuse and chronic cortisol; high threat signals prevent synaptic potentiation.',
    recoveryMechanism: 'Aerobic exercise immediately prior to cognitive tasks, micro-success repetition, and restorative slow-wave sleep.'
  }
};
