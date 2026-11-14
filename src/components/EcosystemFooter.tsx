import React from 'react';

const ECOSYSTEM_APPS = [
  { name: 'OmniSci Foundry', url: 'https://onrender.com', color: 'text-cyan-400 hover:text-cyan-300' },
  { name: 'Science Journal', url: 'https://onrender.com', color: 'text-emerald-400 hover:text-emerald-300' },
  { name: 'Prismata Workstation', url: 'https://onrender.com', color: 'text-amber-400 hover:text-amber-300' },
  { name: 'OmniDesign Studio', url: 'https://onrender.com', color: 'text-pink-400 hover:text-pink-300' },
  { name: 'NeuroFocus Suite', url: 'https://onrender.com', color: 'text-sky-400 hover:text-sky-300' },
  { name: 'OmniSci Simulators', url: 'https://onrender.com', color: 'text-violet-400 hover:text-violet-300' },
];

export default function EcosystemFooter({ currentApp }: { currentApp: string }) {
  const otherApps = ECOSYSTEM_APPS.filter((app) => app.name !== currentApp);

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 px-4 py-5 text-center text-xs font-mono text-slate-400">
      <div className="max-w-5xl mx-auto space-y-2.5">
        <div className="uppercase tracking-widest text-[11px] font-semibold text-slate-500">
          Explore the OmniSci Foundry Ecosystem
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-medium">
          {otherApps.map((app, index) => (
            <React.Fragment key={app.name}>
              {index > 0 && <span className="text-slate-600">•</span>}
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${app.color} underline transition`}
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
