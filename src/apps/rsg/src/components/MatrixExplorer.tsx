import React, { useState, useMemo } from 'react';
import { Search, Filter, Layers, LayoutGrid, Cpu, ArrowUpRight, Check, Eye } from 'lucide-react';
import { MATRIX_LAYERS, MASTER_BLOCKS, MatrixLayer, MasterBlock } from '../data/matrixData';
import { LayerDetailModal } from './LayerDetailModal';
import { sound } from '../utils/audioSynthesizer';

export const MatrixExplorer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'blocks' | 'sequential'>('blocks');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
  const [activeLayer, setActiveLayer] = useState<MatrixLayer | null>(null);

  // Filtered layers
  const filteredLayers = useMemo(() => {
    return MATRIX_LAYERS.filter((l) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.rawDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.rsgRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.id.toString() === searchQuery.trim();

      const matchesBlock = selectedBlockId === null || l.masterBlockId === selectedBlockId;
      return matchesSearch && matchesBlock;
    });
  }, [searchQuery, selectedBlockId]);

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <section className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-[#07090E] p-6 lg:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>RSG ARCHITECTURE // 1080P SIMULATION FRAMEWORK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            The 30-Layer Intelligence Matrix
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            From baseline computational engines to transcendental meta-awareness. Moving from a linear data processor to a self-correcting, predictive engine running at 1080p resolution without environmental static.
          </p>
        </div>

        {/* Quick KPI Strip */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <div className="text-slate-500 uppercase">Architecture</div>
            <div className="text-lg font-bold text-white tabular-nums">30 Layers</div>
          </div>
          <div>
            <div className="text-slate-500 uppercase">Master-Blocks</div>
            <div className="text-lg font-bold text-cyan-400 tabular-nums">6 Domains</div>
          </div>
          <div>
            <div className="text-slate-500 uppercase">Foundation</div>
            <div className="text-lg font-bold text-emerald-400 tabular-nums">21 Base Layers</div>
          </div>
          <div>
            <div className="text-slate-500 uppercase">Executive Overlays</div>
            <div className="text-lg font-bold text-violet-400 tabular-nums">9 High-Frequency</div>
          </div>
        </div>
      </section>

      {/* Control Bar: Search & View Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search layers by name, code, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-300"
            >
              Clear
            </button>
          )}
        </div>

        {/* View Mode & Block Filter */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => {
                setViewMode('blocks');
                sound.playTick(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'blocks'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Master-Blocks</span>
            </button>
            <button
              onClick={() => {
                setViewMode('sequential');
                sound.playTick(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'sequential'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>1 to 30 Sequence</span>
            </button>
          </div>
        </div>
      </div>

      {/* Block Filter Pills (clean segmented control) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        <button
          onClick={() => {
            setSelectedBlockId(null);
            sound.playTick(true);
          }}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            selectedBlockId === null
              ? 'bg-white text-slate-950 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
          }`}
        >
          All 30 Layers
        </button>
        {MASTER_BLOCKS.map((b) => (
          <button
            key={b.id}
            onClick={() => {
              setSelectedBlockId(b.id === selectedBlockId ? null : b.id);
              sound.playTick(true);
            }}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              selectedBlockId === b.id
                ? 'bg-cyan-400 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
            }`}
          >
            Block {b.roman}: {b.title}
          </button>
        ))}
      </div>

      {/* Content Rendering: Master-Blocks View */}
      {viewMode === 'blocks' && (
        <div className="space-y-8">
          {MASTER_BLOCKS.filter(
            (b) => selectedBlockId === null || b.id === selectedBlockId
          ).map((block) => {
            const blockLayers = filteredLayers.filter(
              (l) => l.masterBlockId === block.id
            );
            if (blockLayers.length === 0) return null;

            return (
              <section
                key={block.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 sm:p-6 space-y-4"
              >
                {/* Block Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400">
                        BLOCK {block.roman}
                      </span>
                      <h2 className="text-lg font-bold text-white tracking-tight">
                        {block.title}
                      </h2>
                    </div>
                    <p className="mt-1 text-xs text-slate-400 max-w-2xl">
                      {block.description}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {blockLayers.length} Layers Active
                  </span>
                </div>

                {/* Layer Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {blockLayers.map((layer) => (
                    <LayerCard
                      key={layer.id}
                      layer={layer}
                      onSelect={() => {
                        sound.playTick();
                        setActiveLayer(layer);
                      }}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Content Rendering: Sequential View */}
      {viewMode === 'sequential' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredLayers.map((layer) => (
            <LayerCard
              key={layer.id}
              layer={layer}
              onSelect={() => {
                sound.playTick();
                setActiveLayer(layer);
              }}
            />
          ))}
        </div>
      )}

      {/* Layer Detail Modal */}
      {activeLayer && (
        <LayerDetailModal
          layer={activeLayer}
          onClose={() => setActiveLayer(null)}
          onSelectLayer={(l) => setActiveLayer(l)}
        />
      )}
    </div>
  );
};

interface LayerCardProps {
  layer: MatrixLayer;
  onSelect: () => void;
}

const LayerCard: React.FC<LayerCardProps> = ({ layer, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="group relative flex flex-col justify-between p-4 rounded-lg bg-[#0B0E17] border border-slate-800/90 hover:border-cyan-700/80 hover:bg-slate-900/60 transition-all cursor-pointer"
    >
      <div className="space-y-2">
        {/* Layer Header */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-700 transition-colors">
            #{layer.id.toString().padStart(2, '0')}
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            {layer.hardwareSoftware}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
            <span>{layer.name}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
          </h3>
          <div className="text-xs font-mono text-cyan-400/90">
            {layer.subtitle}
          </div>
        </div>

        {/* Definition */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {layer.rawDefinition}
        </p>
      </div>

      {/* Bottom Micro Footer */}
      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="text-slate-400 truncate max-w-[180px]">
          {layer.masterBlockTitle.split(':')[0] || layer.masterBlockTitle}
        </span>
        <span className="text-cyan-400 font-medium">Inspect Layer →</span>
      </div>
    </div>
  );
};
