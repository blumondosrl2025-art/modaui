import React, { useState, useEffect } from "react";
import { SandboxEvent } from "../types";
import { Shield, Lock, Unlock, Eye, RefreshCw, Cpu, Activity, Play, AlertOctagon, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OSSandboxManagerProps {
  gasQuota: number;
  onRefreshEvents: () => void;
  logAction: (msg: string) => void;
}

export default function OSSandboxManager({
  gasQuota,
  onRefreshEvents,
  logAction
}: OSSandboxManagerProps) {
  const [activeSandbox, setActiveSandbox] = useState<"Sandbox_01" | "Sandbox_02">("Sandbox_01");
  const [strictMode, setStrictMode] = useState(true);
  const [events, setEvents] = useState<SandboxEvent[]>([
    { timestamp: new Date(Date.now() - 5000 * 12).toLocaleTimeString(), type: "SYSCALL", message: "Initialize isolated v8 isolates assembly stack", level: "INFO" },
    { timestamp: new Date(Date.now() - 4000 * 12).toLocaleTimeString(), type: "FILE_WRITE", message: "Disallowed raw output stream write to persistent index /dist/", level: "INFO" },
    { timestamp: new Date(Date.now() - 3000 * 12).toLocaleTimeString(), type: "GAS_CONSUMP", message: "Consumed 820 gas credits for thought cycle iteration", level: "INFO" },
    { timestamp: new Date(Date.now() - 1000 * 12).toLocaleTimeString(), type: "NETWORK", message: "Blocked suspicious outbound API handshake request to unauthorized DNS", level: "WARN" }
  ]);

  useEffect(() => {
    const handleEvents = setInterval(() => {
      const logTypes: ("SYSCALL" | "NETWORK" | "FILE_WRITE" | "GAS_CONSUMP" | "SECURITY_BLOCK")[] = ["SYSCALL", "NETWORK", "FILE_WRITE", "GAS_CONSUMP", "SECURITY_BLOCK"];
      const messages = [
        "Allocated clean 12MB virtual address range inside isolated node",
        "Captured local file sys check on /src/App.tsx - redirection verified",
        "Calculated state weights similarity against vector.indexer.metadata_graph",
        "Refused network packet injection outside secure SSL endpoints",
        "Gas load meter stable at 1.4% total runtime allocation quota",
        "Thread pool balance optimized dynamically inside active node structure"
      ];

      const levels: ("INFO" | "WARN" | "DENIED")[] = ["INFO", "INFO", "INFO", "WARN", "INFO", "INFO"];
      const randIdx = Math.floor(Math.random() * messages.length);

      const newEv: SandboxEvent = {
        timestamp: new Date().toLocaleTimeString(),
        type: logTypes[Math.floor(Math.random() * logTypes.length)],
        message: messages[randIdx],
        level: randIdx === 3 ? "DENIED" : levels[randIdx]
      };

      setEvents(prev => [newEv, ...prev.slice(0, 15)]);
    }, 11000);

    return () => clearInterval(handleEvents);
  }, []);

  const triggerInjectPolicy = () => {
    const newBlockedEv: SandboxEvent = {
      timestamp: new Date().toLocaleTimeString(),
      type: "SECURITY_BLOCK",
      message: `Enforced strict boundary rule block on active ${activeSandbox}. All shell evaluations locked.`,
      level: "DENIED"
    };
    setEvents(prev => [newBlockedEv, ...prev]);
    logAction(`Injected strict security policy rule lock over ${activeSandbox}`);
  };

  const triggerResetSandbox = () => {
    onRefreshEvents();
    const newResetEv: SandboxEvent = {
      timestamp: new Date().toLocaleTimeString(),
      type: "SYSCALL",
      message: `Hard scrubbed container buffers. Cold starting pristine runtime isolate for ${activeSandbox}`,
      level: "INFO"
    };
    setEvents(prev => [newResetEv, ...prev]);
    logAction(`Triggered hard container state reset over ${activeSandbox}`);
  };

  return (
    <div id="sandbox-manager" className="border border-zinc-800/80 bg-cosmos-gray/70 rounded-lg p-5 flex flex-col h-[520px]">
      {/* Banner */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-400" />
          <h2 className="font-display font-semibold text-sm uppercase tracking-widest text-zinc-200">
            Secure Sandbox Isolation Node
          </h2>
        </div>
        <div className="flex gap-1 bg-black/50 p-0.5 rounded border border-zinc-800 text-[10px] font-mono">
          {(["Sandbox_01", "Sandbox_02"] as const).map(box => (
            <button
              key={box}
              onClick={() => setActiveSandbox(box)}
              className={`px-2 py-0.5 rounded select-none cursor-pointer transition-colors ${
                activeSandbox === box ? "bg-zinc-805 text-bone-white font-bold bg-zinc-800" : "text-zinc-500 hover:text-zinc-400"
              }`}
            >
              {box}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sandbox telemetry and controls split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">
        {/* State parameters & manual inject controls */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-3 bg-black/40 border border-zinc-900 rounded-lg space-y-2.5">
              <span className="text-[10px] text-zinc-500 font-mono block uppercase tracking-wider">
                Node {activeSandbox} Security profile
              </span>
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Isolation Layer:</span>
                  <span className="text-zinc-300 font-bold">V8 Isolate Secure Container</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Active Gas Limit:</span>
                  <span className="text-blue-400 font-bold">{gasQuota} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Allowed system directories:</span>
                  <span className="text-zinc-300 font-bold">/tmp/, /dev/null</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">CPU Thread Limit:</span>
                  <span className="text-zinc-305 text-zinc-300">2 Cores (Fixed Scaling)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-zinc-500 font-mono block uppercase tracking-wider">
                Direct isolation overrides:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={triggerInjectPolicy}
                  className="bg-zinc-900 border border-zinc-800 hover:border-rose-900 hover:text-rose-400 text-zinc-300 px-3 py-2 text-[10px] uppercase font-bold tracking-wider rounded flex items-center justify-center gap-1 cursor-pointer transition"
                >
                  <AlertOctagon className="w-3.5 h-3.5" /> Inject Rule
                </button>
                <button
                  onClick={triggerResetSandbox}
                  className="bg-zinc-900 border border-zinc-800 hover:border-blue-900 hover:text-blue-400 text-zinc-300 px-3 py-2 text-[10px] uppercase font-bold tracking-wider rounded flex items-center justify-center gap-1 cursor-pointer transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-Init Sandbox
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-950/10 border border-blue-900/30 rounded-lg text-xs leading-relaxed text-zinc-400 font-mono">
            <div className="flex items-center gap-1.5 text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1">
              <Info className="w-3.5 h-3.5 shrink-0" /> Policy protection rule
            </div>
            When Strict mode is active, any file-creation event requested by an autonomous agent trace triggers an instant authorization check.
          </div>
        </div>

        {/* Real-time events trace list */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-black/60 rounded-lg border border-zinc-900 p-3 h-full">
          <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono border-b border-zinc-900 pb-1.5 mb-2 shrink-0">
            <span>REAL-TIME CONTAINER EVENTS LOG</span>
            <span className="text-zinc-600">Max elements: 15</span>
          </div>

          <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-2.5 scrollbar pr-1">
            <AnimatePresence initial={false}>
              {events.map((ev, idx) => (
                <motion.div
                  key={idx + "-" + ev.timestamp}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-2 rounded border leading-relaxed flex items-start gap-2 ${
                    ev.level === "DENIED"
                      ? "bg-rose-950/20 border-rose-900/40 text-rose-300"
                      : ev.level === "WARN"
                      ? "bg-amber-950/20 border-amber-900/45 text-amber-300"
                      : "bg-zinc-900/40 border-zinc-900/60 text-zinc-400"
                  }`}
                >
                  <span className="text-zinc-650 text-zinc-500 shrink-0 font-light select-none">{ev.timestamp}</span>
                  <div className="flex-1">
                    <span className="font-bold underline uppercase mr-1.5 text-zinc-500 text-[9px]">[{ev.type}]</span>
                    <span>{ev.message}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
