import React from 'react';

const ECOSYSTEM_APPS = [
  { name: 'OmniSci Foundry', url: 'https://omnisci-practical-feasibility-research-va4n.onrender.com' },
  { name: 'Science Journal', url: 'https://omnisci-science-journal-1.onrender.com' },
  { name: 'Prismata Workstation', url: 'https://prismata-optical-workstation.onrender.com' },
  { name: 'OmniDesign Studio', url: 'https://omnidesign-studio.onrender.com' },
  { name: 'NeuroFocus Suite', url: 'https://neurofocus-suite.onrender.com' },
  { name: 'OmniSci Simulators', url: 'https://omnisci-simulators.onrender.com' },
];

export default function EcosystemFooter({ currentApp }: { currentApp: string }) {
  const otherApps = ECOSYSTEM_APPS.filter((app) => app.name !== currentApp);

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 px-4 py-5 text-center text-xs text-slate-400">
      <div className="max-w-5xl mx-auto space-y-2.5">
        <div className="uppercase tracking-widest text-[11px] font-semibold text-slate-400">
          Explore the OmniSci Foundry Ecosystem
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-cyan-400 font-medium">
          {otherApps.map((app, index) => (
            <React.Fragment key={app.name}>
              {index > 0 && <span className="text-slate-600">•</span>}
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 hover:underline transition"
              >
                {app.name}
              </a>
            </React.Fragment>
          ))}
        </div>

        <p className="text-amber-300/90 text-[11px]">
          A quick heads-up: Free-tier apps in this ecosystem may take up to a minute to wake. Please keep this page open while one loads—thanks for your patience.
        </p>
      </div>
    </footer>
  );
}
