import React, { useState } from "react";
import { VectorMemory } from "../types";
import { Search, Compass, AlertCircle, Info, Sparkles, Filter, Database } from "lucide-react";

interface OSVectorSpaceProps {
  vectors: VectorMemory[];
  onSearch: (query: string) => void;
  loading: boolean;
  logAction: (msg: string) => void;
}

export default function OSVectorSpace({
  vectors,
  onSearch,
  loading,
  logAction
}: OSVectorSpaceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVector, setSelectedVector] = useState<VectorMemory | null>(vectors[0] || null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onSearch(searchQuery.trim());
    logAction(`Triggered Vector Space semantic scan: "${searchQuery}"`);
  };

  const handleVectorClick = (vec: VectorMemory) => {
    setSelectedVector(vec);
    logAction(`Inspected neural memory metadata tag: "${vec.key}"`);
  };

  return (
    <div id="vector-space" className="border border-zinc-800/80 bg-cosmos-gray/70 rounded-lg p-5 flex flex-col h-[520px]">
      {/* Banner */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-400" />
          <h2 className="font-display font-semibold text-sm uppercase tracking-widest text-zinc-200">
            Neural Memory Vector DB
          </h2>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
          High-Dimensional Euclidean Plane
        </span>
      </div>

      {/* Semantic Grid Coordinate Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* Interactive SVG Plane Coordinate Visualizer */}
        <div className="md:col-span-7 bg-black/60 rounded-lg border border-zinc-900 flex flex-col justify-between p-3 relative select-none">
          <div className="flex justify-between items-center text-[10px] text-zinc-600 font-mono">
            <span>Y-Axis: Semantic abstraction</span>
            <span className="text-[9px] text-zinc-700">Dim-Size: [512-Vect]</span>
          </div>

          {/* Core Coordinate Map Frame */}
          <div className="flex-1 relative my-3 border border-zinc-900 bg-[radial-gradient(#1f2026_1px,transparent_1px)] [background-size:16px_16px] rounded overflow-hidden">
            {/* Visual Crosshairs & boundary lines */}
            <div className="absolute inset-x-0 top-1/2 border-t border-zinc-900 border-dashed pointer-events-none"></div>
            <div className="absolute inset-y-0 left-1/2 border-l border-zinc-900 border-dashed pointer-events-none"></div>

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
              {/* Draw connections towards nearest neighbor logic if searched */}
              {vectors.map((vec, idx) => {
                const x = vec.coords[0] * 380 + 10;
                const y = (1 - vec.coords[1]) * 280 + 10; // Flip coordinates so Y is up

                // Highlight connections if very similar
                const isHighlySimilar = vec.similarity && vec.similarity > 0.4;
                if (isHighlySimilar && selectedVector) {
                  const selX = selectedVector.coords[0] * 380 + 10;
                  const selY = (1 - selectedVector.coords[1]) * 280 + 10;
                  return (
                    <line
                      key={`line-${idx}`}
                      x1={selX}
                      y1={selY}
                      x2={x}
                      y2={y}
                      stroke="#3B82F6"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                      opacity="0.35"
                    />
                  );
                }
                return null;
              })}

              {/* Draw elements */}
              {vectors.map((vec, idx) => {
                const x = vec.coords[0] * 380 + 10;
                const y = (1 - vec.coords[1]) * 280 + 10; // Flip Y

                const isSelected = selectedVector?.key === vec.key;
                const similarityScore = vec.similarity || 0;
                const isMatch = similarityScore > 0.45;

                return (
                  <g key={idx} className="cursor-pointer" onClick={() => handleVectorClick(vec)}>
                    {/* Concentric rings for selected values */}
                    {isSelected && (
                      <circle cx={x} cy={y} r="14" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.4" className="animate-ping" />
                    )}

                    {/* Flashing similarities */}
                    {isMatch && (
                      <circle cx={x} cy={y} r="10" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6" />
                    )}

                    {/* Node Core */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? "6" : "4.5"}
                      fill={isMatch ? "#3B82F6" : isSelected ? "#F3F4F6" : "#4A4D5A"}
                      className="transition-all hover:scale-125"
                    />

                    {/* Label Overlay */}
                    <text
                      x={x + 10}
                      y={y + 3.5}
                      className={`font-mono text-[8px] tracking-tight ${
                        isSelected ? "fill-white font-bold" : isMatch ? "fill-blue-400 font-medium" : "fill-zinc-600"
                      }`}
                    >
                      {vec.key.length > 18 ? `${vec.key.slice(0, 16)}...` : vec.key}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between items-center text-[10px] text-zinc-600 font-mono">
            <span>X-Axis: Conceptual distance</span>
            <span className="text-zinc-600">Scan status: Idle</span>
          </div>
        </div>

        {/* Right Panel Detail & Search Index */}
        <div className="md:col-span-5 bg-black/40 border border-zinc-900 rounded-lg p-3 flex flex-col justify-between">
          <div>
            {/* Search inputs */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-3.5">
              <div className="flex-1 bg-black rounded border border-zinc-800 px-2.5 py-1 flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-zinc-600" />
                <input
                  type="text"
                  placeholder="Scan vectors..."
                  className="flex-1 bg-transparent text-white font-mono text-[11px] focus:outline-none placeholder-zinc-700"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !searchQuery.trim()}
                className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white px-3 py-1 text-[10px] uppercase font-bold tracking-wider rounded cursor-pointer transition"
              >
                Scan
              </button>
            </form>

            <span className="text-[10px] text-zinc-500 font-mono block uppercase mb-2">Memory Tag Metadata Index</span>

            {/* Selected Item Inspections */}
            {selectedVector ? (
              <div className="space-y-3 p-3 bg-zinc-950/50 rounded-md border border-zinc-900">
                <div>
                  <div className="flex justify-between items-start gap-1">
                    <span className="text-xs font-mono font-bold text-zinc-200 break-all">{selectedVector.key}</span>
                    {selectedVector.similarity !== undefined && (
                      <span className="text-[9px] font-mono bg-blue-950 text-blue-400 px-1.5 py-0.5 rounded border border-blue-900 font-bold shrink-0">
                        Match: {Math.floor(selectedVector.similarity * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {selectedVector.tags.map(tag => (
                      <span key={tag} className="text-[8px] bg-zinc-900 text-zinc-500 border border-zinc-800 px-1.5 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase text-zinc-500 font-mono block">Relational Concept:</span>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {selectedVector.summary}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[9px] font-mono border-t border-zinc-900 pt-2 text-zinc-500">
                  <div>
                    Vector Token weight: <span className="text-zinc-300">{selectedVector.tokens} tok</span>
                  </div>
                  <div>
                    Coordinates: <span className="text-zinc-300">[{selectedVector.coords.join(", ")}]</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 font-mono text-zinc-700 text-xs">
                Select any visual vector coordinate to extract variables.
              </div>
            )}
          </div>

          <div className="text-[10px] font-mono text-zinc-600 bg-zinc-900/20 p-2 rounded border border-zinc-900 shrink-0 select-none mt-2">
            Tip: Similarity scans adjust vector highlight coordinates based on tag cosine match filters.
          </div>
        </div>
      </div>
    </div>
  );
}
