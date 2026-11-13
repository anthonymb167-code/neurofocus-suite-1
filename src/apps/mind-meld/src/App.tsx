/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { NeuralCascadeVisualizer } from './components/NeuralCascadeVisualizer';
import { DiagnosticSuite } from './components/DiagnosticSuite';
import { VectorSynthesis } from './components/VectorSynthesis';
import { PivotProtocolView } from './components/PivotProtocolView';
import { MicroSprintTracker } from './components/MicroSprintTracker';
import { ScalingAndFramework } from './components/ScalingAndFramework';
import { ExportModal } from './components/ExportModal';
import { CalibrationOnboarding } from './components/CalibrationOnboarding';
import { MeldAssistantDrawer } from './components/MeldAssistantDrawer';
import { PerceptualDecryptionModule } from './components/PerceptualDecryptionModule';
import { ambientSound } from './utils/audio';
import {
  BLANK_PROFILE,
  PROFILE_ELENA,
  PROFILE_MARCUS,
  calculateDVI,
} from './data/presets';
import {
  AssessmentProfile,
  CalibrationArchiveData,
  DiagnosticScores,
  EnergyAuditItem,
  FilterKey,
  PerceptualDecryptionData,
  ScoreRationales,
} from './types/framework';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('diagnostic');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('psychology');
  const [activeProfileId, setActiveProfileId] = useState<string>('custom');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isCalibrationOpen, setIsCalibrationOpen] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Active working profile
  const [customProfile, setCustomProfile] = useState<AssessmentProfile>(() => {
    try {
      const saved = localStorage.getItem('mind_meld_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // Fallback
    }
    return BLANK_PROFILE;
  });

  // Current active profile reference
  const currentProfile: AssessmentProfile = useMemo(() => {
    if (activeProfileId === 'marcus') return PROFILE_MARCUS;
    if (activeProfileId === 'elena') return PROFILE_ELENA;
    return customProfile;
  }, [activeProfileId, customProfile]);

  // Synchronize dark mode class on <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Persist custom profile to localStorage
  useEffect(() => {
    if (activeProfileId === 'custom') {
      try {
        localStorage.setItem(
          'mind_meld_profile',
          JSON.stringify(customProfile)
        );
      } catch (e) {
        // LocalStorage quota or disabled
      }
    }
  }, [customProfile, activeProfileId]);

  // Audio toggle
  const handleToggleAudio = () => {
    const active = ambientSound.toggle();
    setIsAudioPlaying(active);
  };

  // Answer handler
  const handleAnswerChange = (questionId: string, value: string) => {
    if (activeProfileId !== 'custom') {
      // If user starts editing Marcus or Elena, clone into custom
      setCustomProfile({
        ...currentProfile,
        id: 'custom',
        name: 'My Assessment',
        answers: {
          ...currentProfile.answers,
          [questionId]: value,
        },
      });
      setActiveProfileId('custom');
    } else {
      setCustomProfile((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: value,
        },
      }));
    }
  };

  // Candidate purpose handler
  const handleCandidatePurposeChange = (val: string) => {
    if (activeProfileId !== 'custom') {
      setCustomProfile({
        ...currentProfile,
        id: 'custom',
        name: 'My Assessment',
        candidatePurpose: val,
      });
      setActiveProfileId('custom');
    } else {
      setCustomProfile((prev) => ({
        ...prev,
        candidatePurpose: val,
      }));
    }
  };

  // Score handler
  const handleScoreChange = (
    dimension: keyof DiagnosticScores,
    value: number
  ) => {
    if (activeProfileId !== 'custom') {
      setCustomProfile({
        ...currentProfile,
        id: 'custom',
        name: 'My Assessment',
        scores: {
          ...currentProfile.scores,
          [dimension]: value,
        },
      });
      setActiveProfileId('custom');
    } else {
      setCustomProfile((prev) => ({
        ...prev,
        scores: {
          ...prev.scores,
          [dimension]: value,
        },
      }));
    }
  };

  // Rationale handler
  const handleRationaleChange = (
    dimension: keyof ScoreRationales,
    value: string
  ) => {
    if (activeProfileId !== 'custom') {
      setCustomProfile({
        ...currentProfile,
        id: 'custom',
        rationales: {
          ...currentProfile.rationales,
          [dimension]: value,
        },
      });
      setActiveProfileId('custom');
    } else {
      setCustomProfile((prev) => ({
        ...prev,
        rationales: {
          ...prev.rationales,
          [dimension]: value,
        },
      }));
    }
  };

  // Strategic plan handler
  const handleStrategicPlanChange = (
    key: 'immediateExecution' | 'noiseReduction' | 'blockerResolution',
    val: string
  ) => {
    if (activeProfileId !== 'custom') {
      setCustomProfile({
        ...currentProfile,
        id: 'custom',
        strategicPlan: {
          ...currentProfile.strategicPlan,
          [key]: val,
        },
      });
      setActiveProfileId('custom');
    } else {
      setCustomProfile((prev) => ({
        ...prev,
        strategicPlan: {
          ...prev.strategicPlan,
          [key]: val,
        },
      }));
    }
  };

  // Sprint data handler
  const handleSprintUpdate = (newSprintData: any) => {
    if (activeProfileId !== 'custom') {
      setCustomProfile({
        ...currentProfile,
        id: 'custom',
        sprintData: newSprintData,
      });
      setActiveProfileId('custom');
    } else {
      setCustomProfile((prev) => ({
        ...prev,
        sprintData: newSprintData,
      }));
    }
  };

  // Calibration archive data handler
  const handleCalibrationSave = (calib: CalibrationArchiveData) => {
    if (activeProfileId !== 'custom') {
      setCustomProfile({
        ...currentProfile,
        id: 'custom',
        calibrationData: calib,
      });
      setActiveProfileId('custom');
    } else {
      setCustomProfile((prev) => ({
        ...prev,
        calibrationData: calib,
      }));
    }
  };

  // Energy audit items handler
  const handleEnergyAuditUpdate = (items: EnergyAuditItem[]) => {
    if (activeProfileId !== 'custom') {
      setCustomProfile({
        ...currentProfile,
        id: 'custom',
        energyAuditItems: items,
      });
      setActiveProfileId('custom');
    } else {
      setCustomProfile((prev) => ({
        ...prev,
        energyAuditItems: items,
      }));
    }
  };

  // Perceptual decryption data handler
  const handlePerceptualDataUpdate = (pData: PerceptualDecryptionData) => {
    if (activeProfileId !== 'custom') {
      setCustomProfile({
        ...currentProfile,
        id: 'custom',
        perceptualData: pData,
      });
      setActiveProfileId('custom');
    } else {
      setCustomProfile((prev) => ({
        ...prev,
        perceptualData: pData,
      }));
    }
  };

  // Profile switch
  const handleSelectProfile = (id: string) => {
    setActiveProfileId(id);
  };

  // Import JSON profile
  const handleImportProfile = (imported: AssessmentProfile) => {
    setCustomProfile({
      ...imported,
      id: 'custom',
    });
    setActiveProfileId('custom');
  };

  // Calculate entropy reduction percentage based on answered questions
  const entropyReduction = useMemo(() => {
    const answeredCount = Object.values(currentProfile.answers).filter(
      (a) => a && a.trim().length > 0
    ).length;
    return Math.round((answeredCount / 12) * 100);
  }, [currentProfile.answers]);

  const answeredCount = useMemo(() => {
    return Object.values(currentProfile.answers).filter(
      (a) => a && a.trim().length > 0
    ).length;
  }, [currentProfile.answers]);

  const dviScore = useMemo(
    () => calculateDVI(currentProfile.scores),
    [currentProfile.scores]
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        onOpenExport={() => setIsExportOpen(true)}
        activeProfileId={activeProfileId}
        onSelectProfile={handleSelectProfile}
        entropyReduction={entropyReduction}
        onOpenCalibration={() => setIsCalibrationOpen(true)}
        onOpenMeldAssistant={() => setIsAssistantOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Workspace Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Dynamic Entropy & Cascade Visualizer Banner */}
        <NeuralCascadeVisualizer
          answers={currentProfile.answers}
          activeFilter={activeFilter}
          onFilterSelect={(f) => {
            setActiveFilter(f);
            setActiveTab('diagnostic');
          }}
          entropyReduction={entropyReduction}
          dviScore={dviScore}
        />

        {/* Tab 1: Diagnostic Suite (12 Questions across 4 Filters) */}
        {activeTab === 'diagnostic' && (
          <DiagnosticSuite
            answers={currentProfile.answers}
            onAnswerChange={handleAnswerChange}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            energyAuditItems={currentProfile.energyAuditItems || []}
            onUpdateEnergyAuditItems={handleEnergyAuditUpdate}
          />
        )}

        {/* Tab 1.5: Advanced Perceptual Decryption (The 1% Simulation & Multi-Sensor Meld) */}
        {activeTab === 'perception' && (
          <PerceptualDecryptionModule
            data={currentProfile.perceptualData}
            onUpdateData={handlePerceptualDataUpdate}
            candidatePurpose={currentProfile.candidatePurpose}
          />
        )}

        {/* Tab 2: Vector Synthesis & Scoring Matrix (DVI) */}
        {activeTab === 'synthesis' && (
          <VectorSynthesis
            candidatePurpose={currentProfile.candidatePurpose}
            onCandidatePurposeChange={handleCandidatePurposeChange}
            scores={currentProfile.scores}
            onScoreChange={handleScoreChange}
            rationales={currentProfile.rationales}
            onRationaleChange={handleRationaleChange}
            strategicPlan={currentProfile.strategicPlan}
            onStrategicPlanChange={handleStrategicPlanChange}
            onNavigateToPivot={() => setActiveTab('pivot')}
            profile={currentProfile}
          />
        )}

        {/* Tab 3: False Path Redirect & Pivot Protocol */}
        {activeTab === 'pivot' && (
          <PivotProtocolView
            scores={currentProfile.scores}
            onNavigateToSprint={() => setActiveTab('sprint')}
          />
        )}

        {/* Tab 4: 7-Day Micro-Sprint Tracker */}
        {activeTab === 'sprint' && (
          <MicroSprintTracker
            sprintData={currentProfile.sprintData}
            onUpdateSprint={handleSprintUpdate}
            onNavigateToScaling={() => setActiveTab('scaling')}
          />
        )}

        {/* Tab 5: Post-Sprint Scaling & Framework Master Manual */}
        {activeTab === 'scaling' && <ScalingAndFramework />}
      </main>

      {/* Quiet Non-Pill Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Mind Meld Framework
            </span>
            <span aria-hidden="true">·</span>
            <span>Neural Alignment System</span>
            <span aria-hidden="true">·</span>
            <span>Directional Viability Index (DVI)</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span>DVI Threshold: ≥ 18.0</span>
            <span aria-hidden="true">·</span>
            <span>Auth & Feas: ≥ 4.0</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsCalibrationOpen(true)}
              className="text-amber-500 hover:underline cursor-pointer"
            >
              Recalibrate Zero-Point
            </button>
          </div>
        </div>
      </footer>

      {/* Stage 1: Zero-Point Calibration & Archive Recovery Modal */}
      <CalibrationOnboarding
        isOpen={isCalibrationOpen}
        onClose={() => setIsCalibrationOpen(false)}
        data={currentProfile.calibrationData}
        onSave={handleCalibrationSave}
        onInitiateMeld={() => {
          setActiveTab('diagnostic');
          ambientSound.playSparkChime();
        }}
      />

      {/* Embedded Meld Assistant Conversational Drawer */}
      <MeldAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        candidatePurpose={currentProfile.candidatePurpose}
        answeredCount={answeredCount}
        dviScore={dviScore}
      />

      {/* Export & Mobile Sync Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        profile={currentProfile}
        onImportProfile={handleImportProfile}
      />
    </div>
  );
}
