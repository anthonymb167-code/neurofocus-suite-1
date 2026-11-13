import {
  AssessmentProfile,
  ChatMessage,
  DiagnosticQuestion,
  DiagnosticScores,
  FilterDefinition,
  StochasticObject,
} from '../types/framework';

export const FILTERS: FilterDefinition[] = [
  {
    id: 'psychology',
    number: 1,
    name: 'Psychological Data',
    subtitle: 'Pattern Recognition',
    mechanism: 'Pattern Recognition',
    logic: 'Identifies internal echoes, filters out conditioned noise, and maps cognitive architecture.',
    color: '#38BDF8', // sky-400
    accentBg: 'rgba(56, 189, 248, 0.08)',
  },
  {
    id: 'science',
    number: 2,
    name: 'Scientific Data',
    subtitle: 'Empirical Grounding',
    mechanism: 'Empirical Bounds',
    logic: 'Establishes hard physical limits, mathematical truth, and falsifiable biological realities.',
    color: '#34D399', // emerald-400
    accentBg: 'rgba(52, 211, 153, 0.08)',
  },
  {
    id: 'randomness',
    number: 3,
    name: 'Controlled Randomness',
    subtitle: 'Stochastic Spark',
    mechanism: 'Provoke Adaptation',
    logic: 'Introduces controlled chaos and shocks to break rigid loops and force novel growth.',
    color: '#FBBF24', // amber-400
    accentBg: 'rgba(251, 191, 36, 0.08)',
  },
  {
    id: 'intuition',
    number: 4,
    name: 'Intuition & Context',
    subtitle: 'The "Etc." Layer',
    mechanism: 'Functional Execution / Truth',
    logic: 'Captures visceral, subconscious responses bypassing analytical logic and ego defense.',
    color: '#A78BFA', // violet-400
    accentBg: 'rgba(167, 139, 250, 0.08)',
  },
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  // Phase 1: Psychological Data
  {
    id: 'Q01',
    filterId: 'psychology',
    title: 'The Energy Audit',
    objective: 'Uncover recurring behavioral patterns and intrinsic metabolic fuel.',
    questionPrompt:
      'Looking back over the last 3–6 months, what specific activities consistently left you feeling energized afterward, regardless of physical exertion? Which tasks drained you even if they were light?',
    placeholder:
      'e.g. Deconstructing complex architectures leaves me alert for hours, while surface administrative syncs drain my executive function within 20 minutes...',
    hint: 'Focus on how your nervous system felt AFTER completing the task, not your anticipation before it.',
    dimensionMapped: 'Energy Sustainability (D)',
  },
  {
    id: 'Q02',
    filterId: 'psychology',
    title: 'Friction Analysis',
    objective: 'Map visceral problem resonance and intrinsic responsibility.',
    questionPrompt:
      'What recurring problem or inefficiency in the world around you consistently triggers a strong, visceral desire to step in and fix it?',
    placeholder:
      'e.g. I get furious when critical systems crash due to preventable corner-cutting or sloppy architectures...',
    hint: 'Look for friction that bothers you disproportionately compared to other people.',
    dimensionMapped: 'Problem Resonance (E)',
  },
  {
    id: 'Q03',
    filterId: 'psychology',
    title: 'Values Under Pressure',
    objective: 'Identify non-negotiable core principles during high-stakes trade-offs.',
    questionPrompt:
      'Recall a moment when you had to make a tough choice under stress. What underlying principle or non-negotiable value dictated your final decision?',
    placeholder:
      'e.g. During a catastrophic outage, I chose to fix the root architectural cause overnight rather than applying a cosmetic patch to appease management...',
    hint: 'Your true values are what you sacrifice convenience, comfort, or approval for.',
    dimensionMapped: 'Core Authenticity (A)',
  },

  // Phase 2: Scientific Data
  {
    id: 'Q04',
    filterId: 'science',
    title: 'Resource Bounds',
    objective: 'Establish hard physical and economic boundaries.',
    questionPrompt:
      'What are your hard empirical constraints right now (time, physiological health, financial runway)? What pathway optimizes impact within these exact parameters?',
    placeholder:
      'e.g. 12 months living expenses saved, robust physical health, 25 hours per week unallocated deep work runway...',
    hint: 'Be ruthlessly quantitative. No wishful thinking on sleep or finances.',
    dimensionMapped: 'Empirical Feasibility (B)',
  },
  {
    id: 'Q05',
    filterId: 'science',
    title: 'Skill Distribution & Mastery',
    objective: 'Isolate measurable velocity anomalies and empirical advantages.',
    questionPrompt:
      'What complex tasks or skill sets do you perform at a measurably higher baseline speed or accuracy compared to the average person in your field?',
    placeholder:
      'e.g. Diagnosing low-level system memory bottlenecks and writing concurrent systems code 3x faster than average seniors...',
    hint: 'Where do you experience effortless speed where others struggle with steep friction?',
    dimensionMapped: 'Empirical Feasibility (B)',
  },
  {
    id: 'Q06',
    filterId: 'science',
    title: 'Chronotype & Peak Focus',
    objective: 'Synchronize primary cognitive demands with biological circadian rhythm.',
    questionPrompt:
      'At what specific times of day is your executive cognitive function at its biological peak, and how well aligns your primary focus with that window?',
    placeholder:
      'e.g. Peak executive alertness is 6:00 AM – 10:00 AM. Currently misallocated to reading email instead of hard creative engineering...',
    hint: 'Biology always wins over scheduling hacks. Map the window when your working memory is crisp.',
    dimensionMapped: 'Empirical Feasibility (B)',
  },

  // Phase 3: Controlled Randomness
  {
    id: 'Q07',
    filterId: 'randomness',
    title: 'The Arbitrary Constraint',
    objective: 'Disrupt cognitive hoarding by enforcing radical loss.',
    questionPrompt:
      'If a random cosmic event forced you to eliminate 80% of your current goals tomorrow, which single objective would you keep to build your daily life around?',
    placeholder:
      'e.g. If 4 of my 5 goals were deleted forever, I would keep building high-reliability open-source infrastructure tools...',
    hint: 'Assume the other 80% are irreversibly forbidden. Which one survives without hesitation?',
    dimensionMapped: 'Adaptive Resilience (C)',
  },
  {
    id: 'Q08',
    filterId: 'randomness',
    title: 'Perspective Flip',
    objective: 'Force stochastic cross-domain neural connections through physical analogies.',
    questionPrompt:
      'Pick an object in your immediate view (or roll one below). If your core life problem were governed by the exact physical properties of that object (e.g. density, transparency, sharp cleavage), what insight would that reveal about your next move?',
    placeholder:
      'e.g. Obsidian glass: Dense in execution, transparent in architecture, cutting cleanly through unnecessary complexity...',
    hint: 'Use the Stochastic Object Generator below to shock your brain with an arbitrary physical metaphor.',
    dimensionMapped: 'Adaptive Resilience (C)',
  },
  {
    id: 'Q09',
    filterId: 'randomness',
    title: 'The Wild Card Scenario',
    objective: 'Test pivot agility against black swan disruptions.',
    questionPrompt:
      'Imagine an unexpected shift completely upends your industry or environment overnight. What secondary capability would you pivot to immediately?',
    placeholder:
      'e.g. If automated AI makes standard app code obsolete, I would immediately pivot to hardware-level embedded systems security...',
    hint: 'True resilience does not fear change because it understands its foundational skills.',
    dimensionMapped: 'Adaptive Resilience (C)',
  },

  // Phase 4: Intuition & Context
  {
    id: 'Q10',
    filterId: 'intuition',
    title: 'The Gut Response',
    objective: 'Bypass analytical rationalization to expose avoidance and fear.',
    questionPrompt:
      'Without taking time to reason, calculate, or justify, what is the very first answer that pops into your head when asked: What are you avoiding building right now?',
    placeholder:
      'e.g. Launching my own independent systems auditing framework because I fear public failure and exposure...',
    hint: 'Do not edit your initial flash of intuition. The first 3 seconds contain the uncorrupted signal.',
    dimensionMapped: 'Core Authenticity (A)',
  },
  {
    id: 'Q11',
    filterId: 'intuition',
    title: 'Resonance Check',
    objective: 'Extract the lifelong thematic baseline encoded in your subconscious.',
    questionPrompt:
      'Among art, writing, music, or stories that have moved you deeply throughout your life, what is the single central theme that binds them together?',
    placeholder:
      'e.g. Small disciplined teams applying quiet technical mastery under extreme adversity to avert catastrophe (Apollo 13)...',
    hint: 'What narratives consistently give you chills or intense emotional resonance?',
    dimensionMapped: 'Problem Resonance (E)',
  },
  {
    id: 'Q12',
    filterId: 'intuition',
    title: 'The Final Filter (Anonymity Test)',
    objective: 'Filter out status games, validation traps, and external ego inflation.',
    questionPrompt:
      'If you achieved your current target, but could never tell a single person or receive external recognition for it, would you still spend your life doing it?',
    placeholder:
      'e.g. Yes. Even if no one ever knew my name, building rock-solid systems that keep global critical infrastructure standing is inherently worth my lifetime...',
    hint: 'If the answer is no, you do not want the work—you want the applause.',
    dimensionMapped: 'Core Authenticity (A)',
  },
];

export const STOCHASTIC_OBJECTS: StochasticObject[] = [
  {
    name: 'Obsidian Glass',
    category: 'Mineral / Volcanic',
    physicalProperties: [
      'Amorphous vitreous structure',
      'Conchoidal fracture resulting in razor-sharp molecular edges',
      'High density and optical transparency when cut thin',
    ],
    philosophicalMetaphor:
      'Your work must be dense in execution, transparent in architecture, and razor-sharp to slice through systemic clutter.',
  },
  {
    name: 'Aerogel',
    category: 'Nanomaterial',
    physicalProperties: [
      '99.8% air volume',
      'Extreme thermal insulation',
      'Capable of supporting 4,000x its own weight despite near-zero bulk',
    ],
    philosophicalMetaphor:
      'Strip all unnecessary physical and administrative weight. Build a lightweight framework with immense structural strength.',
  },
  {
    name: 'Tungsten Gyroscope',
    category: 'Rotational Physics',
    physicalProperties: [
      'High rotational inertia',
      'Rigidity in space resisting angular torque',
      'Extreme melting point (3,422°C)',
    ],
    philosophicalMetaphor:
      'Maintain an unyielding rotational axis unaffected by external social turbulences or sudden directional shocks.',
  },
  {
    name: 'Optical Prism',
    category: 'Refraction & Optics',
    physicalProperties: [
      'Separates composite white noise into discrete spectral wavelengths',
      'Governed by Snell’s law of angular refraction',
      'Total internal reflection',
    ],
    philosophicalMetaphor:
      'Do not absorb raw chaotic noise; refract it into distinct, measurable components that reveal hidden structure.',
  },
  {
    name: 'Type-II Superconductor',
    category: 'Quantum Condensed Matter',
    physicalProperties: [
      'Zero electrical resistance below critical temperature',
      'Meissner effect: expels external magnetic fields completely',
      'Flux pinning maintains spatial stability without mechanical contact',
    ],
    philosophicalMetaphor:
      'Zero operational friction once you operate inside your biological critical temperature. Expel all extraneous social friction.',
  },
  {
    name: 'Memory Metal (Nitinol)',
    category: 'Metallurgy / Shape Memory',
    physicalProperties: [
      'Pseudo-elasticity under extreme mechanical strain',
      'Recovers precise programmed geometry when thermal activation is applied',
    ],
    philosophicalMetaphor:
      'Yield elastically to real-world trauma, but retain the exact crystalline memory of your original core purpose.',
  },
  {
    name: 'Bismuth Crystal Hopper',
    category: 'Crystalline Element',
    physicalProperties: [
      'Step-spiral geometric staircases formed by edge-growth rate differentials',
      'Diamagnetic repulsion of magnetic poles',
      'Iridescent oxidation layer reflecting light',
    ],
    philosophicalMetaphor:
      'Growth happens along deliberate step-by-step structural edges rather than smooth amorphous expansion.',
  },
];

// Sample Dialogue Transcript with Alex (from user prompt)
export const ALEX_MELD_DIALOGUE: ChatMessage[] = [
  {
    id: 'alex-1',
    sender: 'user',
    text: "Hey... I honestly don't even know why I downloaded this. I'm 32, working a mid-level project management job that pays fine, but I feel completely hollow. I spend hours scrolling through tech founders and creators on LinkedIn wishing I was doing something 'important,' but whenever I try to start a side business, I burn out in three days. I feel stuck.",
    timestamp: '14:02',
  },
  {
    id: 'alex-2',
    sender: 'assistant',
    text: "That hollow feeling usually happens when you are chasing the applause of a public scoreboard while ignoring what actually fuels your brain. Let's strip away the noise. Before we look outward, let's look inward. Looking back over the last three months, what specific task or problem made you lose track of time—even if it was just an hour of deep tinkering or organizing?",
    timestamp: '14:03',
    tag: 'reflection',
  },
  {
    id: 'alex-3',
    sender: 'user',
    text: "Um... I guess last month our deployment pipeline broke and the engineering team was panicking. I spent four hours straight mapping out a visual dependency chart and untangling the data structure. When it worked, I felt a massive rush. But my day-to-day meetings? Absolute torture.",
    timestamp: '14:04',
  },
  {
    id: 'alex-4',
    sender: 'assistant',
    text: "That's our first hard signal: structural problem-solving and visual system mapping energize you; corporate chatter drains you. Let's run that through Filter 2: Science and Empirical Bounds. What are your actual resource limits right now, and what complex task can you execute measurably faster or cleaner than the average person around you?",
    timestamp: '14:05',
    tag: 'friction_probe',
  },
  {
    id: 'alex-5',
    sender: 'user',
    text: "Well, I have about six months of savings. I'm decent at spotting bottlenecks in complex workflows and organizing chaotic data into clear roadmaps. My peak focus is strictly early morning—like 7:00 AM to 10:00 AM before my inbox explodes.",
    timestamp: '14:06',
  },
  {
    id: 'alex-6',
    sender: 'assistant',
    text: "Clear morning focus window, strong data mapping skills, six-month runway. Now let's test your resistance to loops and distraction using Filter 3: Controlled Randomness. Stop analyzing for a second. Look at the object closest to your right hand. If your current career bottleneck had the physical properties of that object, what would it reveal about your next move?",
    timestamp: '14:07',
    tag: 'stochastic_break',
  },
  {
    id: 'alex-7',
    sender: 'user',
    text: "Uh, my coffee mug. It's heavy, ceramic, and holds a specific volume. I guess... it means I'm trying to pour infinite status goals into a container that's only built to hold a specific kind of structural work?",
    timestamp: '14:08',
  },
  {
    id: 'alex-8',
    sender: 'assistant',
    text: "Precisely. You are trying to pour LinkedIn creator status into a container built for structural architecture. That brings us to Filter 4: Intuition and the Anonymity Test. Without overthinking, answer this: If you could build a quiet, highly optimized systems-mapping or workflow-auditing toolkit that saved teams from operational disasters, but you had to do it completely anonymously—no profile, no public praise, no followers—would you still spend your 7:00 AM window doing it?",
    timestamp: '14:09',
    tag: 'anonymity_probe',
  },
  {
    id: 'alex-9',
    sender: 'user',
    text: "...Honestly? Yes. That actually sounds like a relief. I wouldn't have to post anything or pretend to be an influencer.",
    timestamp: '14:10',
  },
  {
    id: 'alex-10',
    sender: 'assistant',
    text: "There is your true Anchor Vector. You don't want a personal brand; you want quiet, high-leverage architectural craftsmanship. Let's lock that in and build your 7-Day Micro-Sprint around shifting your 7:00 AM window exclusively to workflow mapping, starting tomorrow.",
    timestamp: '14:11',
    tag: 'reflection',
  },
];

export const PROFILE_MARCUS: AssessmentProfile = {
  id: 'marcus',
  name: 'Marcus (Systems Engineer)',
  subjectTitle: 'Valid Anchor Vector Benchmark',
  candidatePurpose:
    'Building an Independent Open-Source Systems Audit & Reliability Framework',
  answers: {
    Q01: 'Deconstructing complex legacy codebases and rebuilding them cleanly energizes me for hours. Managing corporate strategy meetings or handling surface-level UI design leaves me completely drained.',
    Q02: 'I get extremely frustrated when critical infrastructure or open-source software fails because of poor optimization or security oversights that could easily be prevented.',
    Q03: 'During a major server outage, I chose to stay up all night fixing the root architectural flaw rather than applying a quick patch just to get management off my back.',
    Q04: 'I have 12 months of living expenses saved, strong health, and can dedicate 25 hours per week outside my base job.',
    Q05: 'I analyze system bottlenecks and write low-level C/Rust code 3x faster than average mid-to-senior developers in my field.',
    Q06: 'My peak executive function occurs between 6:00 AM and 10:00 AM. I am currently using that time for email instead of deep engineering.',
    Q07: 'If forced to strip away 80% of my goals, I would focus exclusively on building high-reliability, open-source developer tooling.',
    Q08: 'Object: Obsidian glass. Glass is dense, sharp, and transparent. Applied to my situation: my work needs to be dense in execution, transparent in architecture, and cut through unnecessary complexity.',
    Q09: 'If AI renders standard application coding obsolete, I would pivot directly to hardware-level systems security and embedded firmware testing.',
    Q10: 'I am avoiding launching my own independent systems auditing framework because I fear public failure.',
    Q11: 'The recurring theme in stories I love (like Apollo 13) is small teams using technical mastery under extreme pressure to prevent catastrophe.',
    Q12: 'Yes. Even if no one knew my name, I would spend my life building robust systems that keep critical infrastructure from crashing.',
  },
  scores: {
    authenticity: 5,
    feasibility: 5,
    resilience: 4,
    energy: 5,
    resonance: 4,
  },
  rationales: {
    authenticity:
      'Confirmed desire to do the work anonymously; fear of failure identified as sole blocker.',
    feasibility:
      '3x skill speedup in low-level code, 12 months financial runway, clear morning focus window.',
    resilience:
      'Clear pivot path to hardware/embedded systems if market conditions shift.',
    energy:
      'Strong intrinsic driver; deep engineering work generates high intrinsic energy.',
    resonance:
      'High emotional attachment to infrastructure reliability and catastrophe prevention.',
  },
  strategicPlan: {
    immediateExecution:
      'Shift peak biological window (6:00 AM – 10:00 AM) away from administrative work/emails directly to core framework engineering.',
    noiseReduction:
      'Ruthlessly eliminate secondary options like corporate management tracks or UI consulting.',
    blockerResolution:
      'Bypass the fear of public failure by deploying early builds under an anonymous open-source collective rather than personal branding.',
  },
  sprintData: {
    pivotedVectorName: 'Open-Source Kernel Audit Engine',
    coreDeliverable: 'Write 400 lines of verified core memory-checking routines per day',
    peakWindow: '06:00 - 08:30',
    anonymityPledged: true,
    entries: [
      {
        day: 1,
        date: '2026-10-25',
        executionWindow: '06:00 - 08:30',
        taskCompleted: 'Scaffolded AST parser for memory leak detection',
        energyGen: 5,
        skillFriction: 4,
        anonIntegrity: 5,
        notes: 'Total flow state from minute 10. No desire to check metrics or socials.',
      },
      {
        day: 2,
        date: '2026-10-26',
        executionWindow: '06:00 - 08:30',
        taskCompleted: 'Implemented symbol table traversal logic',
        energyGen: 5,
        skillFriction: 5,
        anonIntegrity: 5,
        notes: 'C code compilation tests passed on first run.',
      },
      {
        day: 3,
        date: '2026-10-27',
        executionWindow: '06:00 - 08:30',
        taskCompleted: 'Benchmarked parser against Linux kernel headers',
        energyGen: 4,
        skillFriction: 4,
        anonIntegrity: 5,
        notes: 'Hit complex macro edge-case, worked through root cause cleanly.',
      },
      {
        day: 4,
        date: '2026-10-28',
        executionWindow: '06:00 - 08:30',
        taskCompleted: 'Drafted architecture spec for concurrency safety rules',
        energyGen: 5,
        skillFriction: 5,
        anonIntegrity: 5,
        notes: 'Extremely high clarity. Morning window is 100% sacred.',
      },
      {
        day: 5,
        date: '2026-10-29',
        executionWindow: '06:00 - 08:30',
        taskCompleted: 'Built test harness for synthetic pointer faults',
        energyGen: 5,
        skillFriction: 4,
        anonIntegrity: 5,
        notes: 'Caught subtle off-by-one error without fatigue.',
      },
      {
        day: 6,
        date: '2026-10-30',
        executionWindow: '06:00 - 08:30',
        taskCompleted: 'Optimized hash lookup table with zero allocations',
        energyGen: 5,
        skillFriction: 5,
        anonIntegrity: 5,
        notes: 'Execution speed beat clang baseline by 2.2x.',
      },
      {
        day: 7,
        date: '2026-10-31',
        executionWindow: '06:00 - 08:30',
        taskCompleted: 'End-to-end integration run on 12 sample modules',
        energyGen: 5,
        skillFriction: 5,
        anonIntegrity: 5,
        notes: 'Sprint completed. Feel energized to scale into the 30-day bridge.',
      },
    ],
  },
  calibrationData: {
    staticNoiseDump: 'Stuck in administrative corporate reviews that drain core engineering hours.',
    baselineShouldersDroppedMoment: 'Refactoring a 2,000-line concurrency module on Sunday morning at 6:30 AM in silence.',
    energyVsDilationScore: 4,
    anonymityOathConfirmed: true,
    preCorruptionMemory: 'Building a miniature wooden water wheel and kinetic pulley system by the creek as an 11-year-old.',
    contradictionAuditCringe: 'Attending executive status alignment meetings where everyone nods but no code is written.',
    envyDetectorInsight: 'Envious of anonymous cryptography contributors who publish high-impact tools without personal marketing.',
    timeElapsedDays: 90,
    technicalBottlenecks: 'Legacy compiler dependencies and manual release pipelines.',
    resourceCapacityCheck: '12 months living expenses saved, 25 hours deep work runway.',
  },
  energyAuditItems: [
    { id: '1', activity: 'Deconstructing legacy C/Rust codebases', score: 5 },
    { id: '2', activity: 'Corporate strategy alignment calls', score: -4 },
    { id: '3', activity: 'Writing memory safety unit benchmarks', score: 4 },
    { id: '4', activity: 'UI tweak consensus reviews', score: -3 },
  ],
  chatHistory: [],
};

export const PROFILE_ELENA: AssessmentProfile = {
  id: 'elena',
  name: 'Elena (Financial Analyst)',
  subjectTitle: 'Counter-Example: Status & Validation Trap',
  candidatePurpose:
    'Launching a High-End Lifestyle & Mindset Coaching Brand',
  answers: {
    Q01: 'Recording videos and editing content drains me completely after 30 minutes. However, reading about successful entrepreneurs and visualizing a large following gives me an immediate rush.',
    Q02: 'I feel irritated seeing people on social media post unverified financial advice when they lack traditional corporate experience.',
    Q03: 'When my recent blog post got zero engagement, I immediately deleted it out of embarrassment rather than keeping it up for its educational value.',
    Q04: 'I work 60 hours a week in finance. I have zero video production skills, minimal free time, and 3 months of savings.',
    Q05: 'My measurable superpower is quantitative data analysis and complex financial modeling (top 5% speed), not public speaking, charisma on camera, or digital marketing.',
    Q06: 'My peak focus is late morning, which is entirely consumed by my day job’s trading desk operations.',
    Q07: 'If forced to strip away 80% of my goals, social media content creation is the first thing I would drop—I only want the outcome, not the daily process.',
    Q08: 'Object: Mirror. A mirror reflects light but has no depth of its own. Applied to this goal: I am chasing a reflection of status rather than building solid internal depth.',
    Q09: 'If social media platforms were shut down tomorrow, I would have no desire to coach people in person.',
    Q10: 'I am avoiding admitting that I just want the status, freedom, and public admiration associated with famous online founders.',
    Q11: 'The recurring theme in stories I love is quiet masterminds operating behind the scenes to solve high-stakes crises.',
    Q12: 'No. If I could never tell anyone or gain public recognition, I would not make lifestyle coaching videos.',
  },
  scores: {
    authenticity: 1,
    feasibility: 1,
    resilience: 1,
    energy: 2,
    resonance: 2,
  },
  rationales: {
    authenticity:
      'Fails the anonymity test completely; driven by external validation and status seeking.',
    feasibility:
      'Major skill mismatch (quant skills vs. charisma/video), high time constraints, poor financial runway.',
    resilience:
      'Fragile goal; drops immediately under arbitrary constraints or platform changes.',
    energy:
      'Creating content causes immediate burnout; energy comes strictly from daydreaming about outcomes.',
    resonance:
      'Frustration with online gurus exists, but true personal resonance lies in quiet, technical mastermind roles.',
  },
  strategicPlan: {
    immediateExecution:
      'Trigger False Path Redirect immediately: Abandon the lifestyle brand concept entirely.',
    noiseReduction:
      'Eliminate video editing, personal branding social media setups, and courses.',
    blockerResolution:
      'Execute Grounding Pivot: Redirect top-5% quantitative modeling superpowers toward algorithmic backtesting or automated portfolio auditing.',
  },
  sprintData: {
    pivotedVectorName: 'Algorithmic Financial Risk Auditor',
    coreDeliverable: 'Build backtesting model for systemic risk anomalies in debt instruments',
    peakWindow: '20:00 - 21:30',
    anonymityPledged: true,
    entries: [
      {
        day: 1,
        date: '2026-10-25',
        executionWindow: '20:00 - 21:30',
        taskCompleted: 'Ingested raw SEC quarterly filing data',
        energyGen: 4,
        skillFriction: 4,
        anonIntegrity: 4,
        notes: 'Relief of not having to film myself was palpable. Quantitative flow state.',
      },
      {
        day: 2,
        date: '2026-10-26',
        executionWindow: '20:00 - 21:30',
        taskCompleted: 'Constructed debt-to-ebitda sensitivity matrix',
        energyGen: 4,
        skillFriction: 5,
        anonIntegrity: 5,
        notes: 'Math felt effortless. Completed in 45 mins what usually takes 2 hours.',
      },
      {
        day: 3,
        date: '2026-10-27',
        executionWindow: '20:00 - 21:30',
        taskCompleted: 'Wrote anomaly detection script for covariance spikes',
        energyGen: 5,
        skillFriction: 4,
        anonIntegrity: 5,
        notes: 'No craving for social applause. Pure problem solving.',
      },
      {
        day: 4,
        date: '2026-10-28',
        executionWindow: '20:00 - 21:30',
        taskCompleted: 'Tested historical crash data (2008 & 2020)',
        energyGen: 5,
        skillFriction: 5,
        anonIntegrity: 5,
        notes: 'Found intriguing outlier signal.',
      },
      {
        day: 5,
        date: '2026-10-29',
        executionWindow: '20:00 - 21:30',
        taskCompleted: 'Automated tabular parsing pipeline',
        energyGen: 4,
        skillFriction: 4,
        anonIntegrity: 5,
        notes: 'Felt tired from work, but doing deep modeling restored focus.',
      },
      {
        day: 6,
        date: '2026-10-30',
        executionWindow: '20:00 - 21:30',
        taskCompleted: 'Drafted technical whitepaper architecture',
        energyGen: 4,
        skillFriction: 5,
        anonIntegrity: 5,
        notes: 'Identified that quiet mastermind role is 100% authentic.',
      },
      {
        day: 7,
        date: '2026-10-31',
        executionWindow: '20:00 - 21:30',
        taskCompleted: 'Completed week 1 model verification',
        energyGen: 5,
        skillFriction: 5,
        anonIntegrity: 5,
        notes: 'Pivot validated! Energy returned, status trap avoided.',
      },
    ],
  },
  calibrationData: {
    staticNoiseDump: 'Chasing influencer status and comparing myself to LinkedIn founders while working 60 hours in trading.',
    baselineShouldersDroppedMoment: 'Calculating arbitrage spread curves late at night with lo-fi beats playing.',
    energyVsDilationScore: -3,
    anonymityOathConfirmed: true,
    preCorruptionMemory: 'Solving math olympiad logic riddles in middle school just for the thrill of cracking the code.',
    contradictionAuditCringe: 'Forcing a fake smiling posture in front of a ring light to film motivational reels.',
    envyDetectorInsight: 'Envious of quantitative hedge fund researchers who never have to show their faces or build personal brands.',
    timeElapsedDays: 45,
    technicalBottlenecks: 'Lack of video charisma, no camera team, extreme cognitive exhaustion after work.',
    resourceCapacityCheck: '60hr/week job, 3 months savings, high quant modeling velocity.',
  },
  energyAuditItems: [
    { id: '1', activity: 'Building multivariate risk regression models', score: 5 },
    { id: '2', activity: 'Filming talking-head videos', score: -5 },
    { id: '3', activity: 'Reading SEC 10-K risk disclosures', score: 4 },
    { id: '4', activity: 'Engagement farming on social media', score: -5 },
  ],
  chatHistory: [],
};

export const BLANK_PROFILE: AssessmentProfile = {
  id: 'custom',
  name: 'My Assessment',
  subjectTitle: 'Active Navigation Assessment',
  candidatePurpose: '',
  answers: {
    Q01: '',
    Q02: '',
    Q03: '',
    Q04: '',
    Q05: '',
    Q06: '',
    Q07: '',
    Q08: '',
    Q09: '',
    Q10: '',
    Q11: '',
    Q12: '',
  },
  scores: {
    authenticity: 3,
    feasibility: 3,
    resilience: 3,
    energy: 3,
    resonance: 3,
  },
  rationales: {
    authenticity: '',
    feasibility: '',
    resilience: '',
    energy: '',
    resonance: '',
  },
  strategicPlan: {
    immediateExecution: '',
    noiseReduction: '',
    blockerResolution: '',
  },
  sprintData: {
    pivotedVectorName: '',
    coreDeliverable: '',
    peakWindow: '06:00 - 08:00',
    anonymityPledged: false,
    entries: Array.from({ length: 7 }, (_, i) => ({
      day: i + 1,
      date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
      executionWindow: '',
      taskCompleted: '',
      energyGen: 3,
      skillFriction: 3,
      anonIntegrity: 3,
      notes: '',
    })),
  },
  calibrationData: {
    staticNoiseDump: '',
    baselineShouldersDroppedMoment: '',
    energyVsDilationScore: 0,
    anonymityOathConfirmed: false,
    preCorruptionMemory: '',
    contradictionAuditCringe: '',
    envyDetectorInsight: '',
    timeElapsedDays: 0,
    technicalBottlenecks: '',
    resourceCapacityCheck: '',
  },
  energyAuditItems: [
    { id: '1', activity: 'Deep focused solo creation / problem solving', score: 4 },
    { id: '2', activity: 'Repetitive status syncs and emails', score: -4 },
  ],
  chatHistory: [],
};

/**
 * Calculates the Directional Viability Index (DVI)
 * Formula: DVI = (1.5 * A) + (1.25 * B) + (1.0 * C) + (0.75 * D) + (0.5 * E)
 */
export function calculateDVI(scores: DiagnosticScores): number {
  const { authenticity, feasibility, resilience, energy, resonance } = scores;
  const raw =
    1.5 * authenticity +
    1.25 * feasibility +
    1.0 * resilience +
    0.75 * energy +
    0.5 * resonance;
  return Number(raw.toFixed(2));
}

export type DVIPassState = 'anchor_vector' | 'status_trap' | 'hobby' | 'burnout' | 'fragile' | 'unaligned';

export function evaluateDVI(scores: DiagnosticScores) {
  const dvi = calculateDVI(scores);
  const { authenticity, feasibility, resilience, energy, resonance } = scores;

  const isStable = dvi >= 15.0;
  const isCandidate = dvi >= 18.0;
  const clearsGates = authenticity >= 4 && feasibility >= 4 && resilience >= 3;

  let verdict: DVIPassState = 'unaligned';
  let title = 'Unaligned Trajectory';
  let description =
    'The vector scores below baseline viability. Deconstruction and re-testing are required.';

  if (authenticity < 3 && feasibility >= 4) {
    verdict = 'status_trap';
    title = 'Status & Validation Trap';
    description =
      'High empirical feasibility paired with low authenticity indicates you are chasing external applause or relief rather than intrinsic drive.';
  } else if (feasibility < 3 && (energy >= 4 || resonance >= 4)) {
    verdict = 'hobby';
    title = 'Hobby / Intellectual Interest';
    description =
      'High intrinsic energy and emotional resonance, but lacks empirical feasibility or hard skill speedups. Maintain as a hobby, not a primary roadmap.';
  } else if (energy < 3 && authenticity >= 4) {
    verdict = 'burnout';
    title = 'Burnout Vector';
    description =
      'Authentic mission, but the operational mechanism drains vital physical or psychological energy. Execution layer needs redesign.';
  } else if (resilience < 3 && authenticity >= 4) {
    verdict = 'fragile';
    title = 'Fragile Vector';
    description =
      'Vulnerable to external industry shocks or arbitrary constraints. Requires building secondary pivot capabilities.';
  } else if (isCandidate && clearsGates) {
    verdict = 'anchor_vector';
    title = 'Anchor Vector: Operating at True Capacity';
    description =
      'High-capacity operational highway. Raw internal drivers perfectly align with verifiable empirical capabilities and status-free authenticity.';
  } else if (isCandidate && !clearsGates) {
    verdict = 'unaligned';
    title = 'Marginal Vector Alignment';
    description =
      'Total score clears 18.0, but critical gates (Authenticity ≥ 4, Feasibility ≥ 4, Resilience ≥ 3) failed. Address bottlenecks before committing.';
  }

  return {
    dvi,
    isStable,
    isCandidate,
    clearsGates,
    verdict,
    title,
    description,
    breakdown: {
      authenticityWeighted: Number((1.5 * authenticity).toFixed(2)),
      feasibilityWeighted: Number((1.25 * feasibility).toFixed(2)),
      resilienceWeighted: Number((1.0 * resilience).toFixed(2)),
      energyWeighted: Number((0.75 * energy).toFixed(2)),
      resonanceWeighted: Number((0.5 * resonance).toFixed(2)),
    },
  };
}

/**
 * Synthesizes the "Ghost Trace Report" when the user has amnesia of their optimal self
 */
export function generateGhostTrace(profile: AssessmentProfile) {
  const { calibrationData, answers } = profile;
  const clues: string[] = [];

  if (calibrationData.preCorruptionMemory) {
    clues.push(`Archival Footprint: Pre-corruption memory indicates pure kinetic joy around "${calibrationData.preCorruptionMemory.slice(0, 80)}...".`);
  }
  if (calibrationData.contradictionAuditCringe) {
    clues.push(`Compass of Anti-Self: Deepest internal cringe arises when forced into "${calibrationData.contradictionAuditCringe.slice(0, 80)}...".`);
  }
  if (calibrationData.envyDetectorInsight) {
    clues.push(`Unmasked Soul Desire: Envy signal reveals a latent craving for "${calibrationData.envyDetectorInsight.slice(0, 80)}...".`);
  }
  if (calibrationData.baselineShouldersDroppedMoment) {
    clues.push(`Somatic Baseline: Nervous system calmed during "${calibrationData.baselineShouldersDroppedMoment.slice(0, 80)}...".`);
  }

  const defaultClues = clues.length > 0 ? clues : [
    'You forgot how to play, but your nervous system still lights up when organizing chaotic physical or conceptual systems in silence.',
    'Your natural velocity accelerates during uninterrupted early morning hours before social static intrudes.',
    'You do not want an influencer platform; you desire quiet, high-leverage architectural craftsmanship.',
  ];

  return {
    title: 'Ghost Trace Synthesis: Corrupted File Recovery',
    subtitle: 'Reconstructed footprints of your optimal self from subconscious data',
    clues: defaultClues,
    permissionSlip: 'You do not have to architect your entire 30-year life today. You only need to rebuild a 1% connection to one forgotten trait for the next 7 days in complete anonymity.',
  };
}
