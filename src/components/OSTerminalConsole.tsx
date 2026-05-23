import React, { useState, useRef, useEffect } from "react";
import { ExecutionTrace } from "../types";
import { Terminal, Cpu, Play, HelpCircle, HardDrive, Shield, Sparkles, AlertCircle } from "lucide-react";
import { OS_CLI_HELP_SUGGESTIONS } from "../data/constants";
import { motion, AnimatePresence } from "motion/react";

interface OSTerminalConsoleProps {
  onExecute: (cmd: string) => Promise<ExecutionTrace | null>;
  onTriggerVectorSearch: (query: string) => void;
  logAction: (msg: string) => void;
}

export default function OSTerminalConsole({
  onExecute,
  onTriggerVectorSearch,
  logAction
}: OSTerminalConsoleProps) {
  const [command, setCommand] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ type: "cmd" | "resp" | "err" | "trace"; text: string; details?: any }[]>([
    { type: "resp", text: "=== OMNI-EXISTENCE RUNTIME KERNEL (v10.4.8-OS) COLD BOOT ===" },
    { type: "resp", text: "Core state nodes verified. Secure sandbox communication operational." },
    { type: "resp", text: "Ready. Input command or direct semantic instructions for AI Core Kernel below." }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cmdTrimmed = command.trim();
    if (!cmdTrimmed) return;

    setHistory(prev => [...prev, { type: "cmd", text: cmdTrimmed }]);
    setCommand("");
    setLoading(true);
    logAction(`Terminal command injected: "${cmdTrimmed}"`);

    try {
      // Check if command is a vector search helper shortcut
      if (cmdTrimmed.startsWith("vector-search ")) {
        const queryText = cmdTrimmed.substring(14).replace(/['"]/g, "");
        onTriggerVectorSearch(queryText);
        setHistory(prev => [
          ...prev,
          { type: "resp", text: `Triggering vector coordinate analysis for: "${queryText}"` }
        ]);
        setLoading(false);
        return;
      }

      const res = await onExecute(cmdTrimmed);
      if (res) {
        setHistory(prev => [
          ...prev,
          {
            type: "trace",
            text: res.outcome.title,
            details: res
          }
        ]);
      } else {
        setHistory(prev => [...prev, { type: "err", text: "Server telemetry disconnect. Unable to process." }]);
      }
    } catch (err: any) {
      setHistory(prev => [...prev, { type: "err", text: `Kernel Exception: ${err?.message || "Internal failure"}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggested: string) => {
    setCommand(suggested);
  };

  return (
    <div id="terminal-console" className="border border-zinc-800/80 bg-cosmos-black rounded-lg flex flex-col h-[520px] overflow-hidden">
      {/* Banner */}
      <div className="bg-zinc-950 p-3 border-b border-zinc-900 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-500" />
          <span className="font-mono text-xs font-semibold text-zinc-300 uppercase tracking-widest">
            Cognitive Kernel CLI Terminal
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span>Online / Live-Trace</span>
        </div>
      </div>

      {/* History Console Output */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-3.5 scrollbar bg-black/60">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            {item.type === "cmd" && (
              <div className="flex items-start text-zinc-300 font-medium">
                <span className="text-blue-500 select-none mr-2">omni-OS:~#</span>
                <span>{item.text}</span>
              </div>
            )}

            {item.type === "resp" && (
              <div className="text-zinc-400 pl-4 border-l border-zinc-900 leading-relaxed whitespace-pre-wrap font-light">
                {item.text}
              </div>
            )}

            {item.type === "err" && (
              <div className="text-rose-400 pl-4 border-l border-rose-950 flex items-center gap-1.5 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{item.text}</span>
              </div>
            )}

            {item.type === "trace" && item.details && (
              <div className="pl-4 border-l border-blue-900/60 bg-blue-950/10 p-3 rounded-md space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-900/40 text-blue-400 text-[10px] px-1.5 py-0.5 rounded font-bold border border-blue-900/40">
                    TRACE_{item.details.status}
                  </span>
                  <span className="text-zinc-200 font-medium text-xs">{item.text}</span>
                </div>

                {/* Performance overview tags */}
                <div className="flex gap-3 text-[10px] text-zinc-400 font-mono bg-black/30 p-2 rounded border border-zinc-900 w-fit">
                  <span>Task: <strong className="text-white">{item.details.scheduledTask?.taskName}</strong></span>
                  <span>| Gas: <strong className="text-blue-400">{item.details.scheduledTask?.gasUsed}</strong></span>
                  <span>| Heap ∆: <strong className="text-amber-400">{item.details.scheduledTask?.memoryDelta}</strong></span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {item.details.outcome?.description}
                </p>

                {/* Traced sub logs */}
                {item.details.logs && item.details.logs.length > 0 && (
                  <div className="space-y-1 pt-1 border-t border-zinc-900">
                    <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">Low-level execution threads:</span>
                    <div className="font-mono text-[10px] text-blue-300/80 space-y-0.5 max-h-24 overflow-y-auto scrollbar">
                      {item.details.logs.map((logLine: string, lIdx: number) => (
                        <div key={lIdx}>{logLine}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Neural vector memory hits */}
                {item.details.neuralHits && item.details.neuralHits.length > 0 && (
                  <div className="flex items-center gap-1.5 text-[9px] text-zinc-500">
                    <span>Queried Matrix Nodes:</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {item.details.neuralHits.map((hit: string, hIdx: number) => (
                        <span key={hIdx} className="bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 text-zinc-400 font-bold">
                          {hit}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2.5 text-blue-400 text-xs animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>AI Core executing cognitive trace instructions...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestion CLI helpers */}
      <div className="bg-zinc-950 px-4 py-2 border-t border-zinc-900 overflow-x-auto shrink-0 select-none">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Quick Directives:</span>
          <div className="flex gap-2">
            {OS_CLI_HELP_SUGGESTIONS.map(sug => (
              <button
                key={sug}
                onClick={() => handleSuggestionClick(sug)}
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white px-2 py-0.5 text-[10px] font-mono rounded border border-zinc-800/80 cursor-pointer transition-all"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Command Input line form */}
      <form onSubmit={handleSubmit} className="border-t border-zinc-900 bg-zinc-950 p-3 shrink-0 flex gap-2">
        <div className="flex-1 bg-black rounded border border-zinc-800 px-3 py-1.5 flex items-center gap-2">
          <span className="text-blue-500 font-mono text-xs select-none font-bold">#</span>
          <input
            type="text"
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-zinc-700"
            placeholder="Instruct operating kernel (e.g. 'sandbox initialize checker model' or 'clean memory caches')"
            value={command}
            onChange={e => setCommand(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !command.trim()}
          className="bg-blue-600 disabled:bg-zinc-900 disabled:text-zinc-600 text-white font-mono text-[11px] font-bold px-4 rounded border border-blue-500 disabled:border-zinc-800 flex items-center gap-1.5 cursor-pointer select-none uppercase hover:bg-blue-500 transition-colors"
        >
          <Play className="w-3 h-3" />
          Process
        </button>
      </form>
    </div>
  );
}
