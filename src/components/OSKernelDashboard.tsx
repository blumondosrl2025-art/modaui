import React, { useState, useEffect } from "react";
import { SystemHardware, SystemProcess, SystemVariables } from "../types";
import { Cpu, HardDrive, Zap, Network, Activity, RotateCcw, Power, ShieldAlert, Sparkles, CheckCircle, Sliders } from "lucide-react";
import { motion } from "motion/react";

interface OSKernelDashboardProps {
  hardware: SystemHardware | null;
  processes: SystemProcess[];
  variables: SystemVariables;
  onRefresh: () => void;
  onControlProcess: (id: string, action: "START" | "STOP" | "RESTART") => void;
  onUpdateVariable: (key: string, value: any) => void;
  logAction: (msg: string) => void;
}

export default function OSKernelDashboard({
  hardware,
  processes,
  variables,
  onRefresh,
  onControlProcess,
  onUpdateVariable,
  logAction
}: OSKernelDashboardProps) {
  const [activeTab, setActiveTab] = useState<"METRICS" | "PROCESSES" | "CONFIG">("METRICS");
  const [editingVar, setEditingVar] = useState<string | null>(null);
  const [varValue, setVarValue] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      onRefresh();
    }, 4500);
    return () => clearInterval(interval);
  }, [onRefresh]);

  if (!hardware) {
    return (
      <div className="flex h-64 items-center justify-center border border-zinc-800 bg-cosmos-gray/50 rounded-lg p-6">
        <div className="flex flex-col items-center gap-2">
          <Activity className="w-8 h-8 animate-pulse text-blue-500" />
          <span className="font-mono text-xs text-zinc-500">Initializing Core Infrastructure Diagnostician...</span>
        </div>
      </div>
    );
  }

  // Helper values
  const totalProcessesCount = processes.length;
  const runningProcessesCount = processes.filter(p => p.status === "RUNNING").length;
  const cpuPercent = hardware.cpuTotal;
  const ramPercent = parseFloat(((hardware.ramUsed / hardware.ramTotal) * 100).toFixed(1));

  const handleSaveVariable = (key: string) => {
    let parsedValue: any = varValue;
    if (key === "semanticTemperature") parsedValue = parseFloat(varValue);
    if (key === "maxStepsQuota") parsedValue = parseInt(varValue);
    if (key === "activeSandboxGasLimit") parsedValue = parseInt(varValue);
    if (key === "networkEnforceStrict") parsedValue = varValue === "true";

    onUpdateVariable(key, parsedValue);
    logAction(`Updated system parameter: ${key} -> ${varValue}`);
    setEditingVar(null);
  };

  return (
    <div id="kernel-dashboard" className="border border-zinc-800/80 bg-cosmos-gray/70 rounded-lg p-5 flex flex-col h-[520px]">
      {/* Header telemetry bar */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
          <h2 className="font-display font-semibold text-sm uppercase tracking-widest text-zinc-200">
            System Hardware & Kernel core
          </h2>
        </div>
        <div className="flex gap-1.5 bg-black/50 p-0.5 rounded border border-zinc-800 text-[10px] font-mono">
          {(["METRICS", "PROCESSES", "CONFIG"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer select-none ${
                activeTab === tab ? "bg-zinc-800 text-bone-white font-medium" : "text-zinc-500 hover:text-zinc-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Tab Content */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar pr-1">
        {activeTab === "METRICS" && (
          <div className="space-y-5">
            {/* Visual Dials / Progress blocks */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {/* CPU load */}
              <div className="bg-black/40 border border-zinc-900 rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
                    <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-blue-400" /> CPU Core</span>
                    <span className="text-zinc-300 font-bold">{cpuPercent}%</span>
                  </div>
                  {/* Miniature Spark SVG Chart represent dummy historical values */}
                  <div className="h-8 mt-2 overflow-hidden shrink-0">
                    <svg className="w-full h-full text-blue-500" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        d={`M 0,${20 - (cpuPercent/6)} L 20,${15 - Math.random() * 5} L 40,${18 - Math.random() * 3} L 60,${20 - (cpuPercent/5)} L 80,10 L 100,${20 - (cpuPercent/5)}`}
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-zinc-500 font-mono">
                  Scale weight: {hardware.gpuLoadUsed > 50 ? "Heavy GPU assist" : "Intel base cycles"}
                </div>
              </div>

              {/* RAM Usage */}
              <div className="bg-black/40 border border-zinc-900 rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
                    <span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5 text-zinc-400" /> RAM Alloc</span>
                    <span className="text-zinc-300 font-bold">{ramPercent}%</span>
                  </div>
                  <div className="mt-3.5 space-y-1">
                    <div className="h-1.5 w-full bg-zinc-900 rounded overflow-hidden">
                      <div
                        className="h-full bg-zinc-300 transition-all duration-500"
                        style={{ width: `${ramPercent}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-zinc-600">
                      <span>{hardware.ramUsed} MB</span>
                      <span>8.1 GB Limit</span>
                    </div>
                  </div>
                </div>
                <div className="mt-1.5 text-[10px] text-zinc-500 font-mono">
                  Heap threshold: 1,024 MB nominal
                </div>
              </div>

              {/* Latency & GPU Status */}
              <div className="bg-black/40 border border-zinc-900 rounded-lg p-4 col-span-2 md:col-span-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
                    <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-400" /> Latency</span>
                    <span className="text-zinc-300 font-bold">{hardware.latencyMs} ms</span>
                  </div>
                  <div className="flex gap-2 justify-between items-center mt-3 bg-zinc-900/40 p-2 rounded border border-zinc-900 text-[10px] font-mono">
                    <div className="text-zinc-500">
                      GPU Core: <span className="text-white">{hardware.gpuLoadUsed}%</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-zinc-500 font-mono">
                  Telemetry relay secure
                </div>
              </div>
            </div>

            {/* Quick overview indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-zinc-900/30 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wiest block mb-2">Omni Execution Pool</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display font-medium text-bone-white">{runningProcessesCount}</span>
                  <span className="text-xs text-zinc-500">/ {totalProcessesCount} Active processes</span>
                </div>
                <div className="flex gap-1.5 mt-3 text-[10px] font-mono">
                  <span className="bg-blue-950/40 text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded">Kernel OK</span>
                  <span className="bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded">Sandbox secure</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900/30 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wiest block mb-1">State Environment Variables</span>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-zinc-400 font-mono mt-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Temp:</span>
                      <span className="text-zinc-300">{variables.semanticTemperature}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Gas Q:</span>
                      <span className="text-blue-400">{variables.activeSandboxGasLimit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Net:</span>
                      <span className={variables.networkEnforceStrict ? "text-amber-500" : "text-zinc-500"}>
                        {variables.networkEnforceStrict ? "Strict" : "Permiss"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Steps:</span>
                      <span className="text-zinc-300">{variables.maxStepsQuota}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab("CONFIG")}
                  className="text-right text-[10px] text-blue-400 hover:text-blue-300 font-mono mt-2 flex items-center gap-1.5 self-end cursor-pointer"
                >
                  <Sliders className="w-3 h-3" /> Adjust Config
                </button>
              </div>
            </div>
          </div>
        )}

        {/* System Process List */}
        {activeTab === "PROCESSES" && (
          <div className="border border-zinc-800 rounded-lg overflow-hidden bg-black/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-zinc-900/70 text-zinc-500 border-b border-zinc-800 font-medium">
                    <th className="p-2.5">Process Target</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5 text-right">CPU</th>
                    <th className="p-2.5 text-right">RAM</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5 text-right">Sys-Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {processes.map(proc => (
                    <tr key={proc.id} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="p-2.5 flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          proc.status === "RUNNING" ? "bg-green-400 animate-pulse" : proc.status === "SUSPENDED" ? "bg-zinc-600" : "bg-blue-400"
                        }`}></span>
                        <span className="text-zinc-200 font-medium">{proc.name}</span>
                      </td>
                      <td className="p-2.5">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-900 text-zinc-500 uppercase border border-zinc-800/55">
                          {proc.type}
                        </span>
                      </td>
                      <td className="p-2.5 text-right text-zinc-400">{proc.cpu}%</td>
                      <td className="p-2.5 text-right text-zinc-400">{proc.ram}MB</td>
                      <td className="p-2.5">
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${
                          proc.status === "RUNNING" ? "text-green-500" : proc.status === "SUSPENDED" ? "text-zinc-600" : "text-zinc-400"
                        }`}>
                          {proc.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-right">
                        <div className="inline-flex gap-1.5">
                          {proc.status === "RUNNING" ? (
                            <button
                              onClick={() => onControlProcess(proc.id, "STOP")}
                              className="text-zinc-500 hover:text-rose-400 p-0.5 rounded cursor-pointer transition-colors"
                              title="Suspend Process"
                            >
                              <Power className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => onControlProcess(proc.id, "START")}
                              className="text-zinc-500 hover:text-green-400 p-0.5 rounded cursor-pointer transition-colors"
                              title="Resume Process"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => onControlProcess(proc.id, "RESTART")}
                            className="text-zinc-500 hover:text-blue-400 p-0.5 rounded cursor-pointer transition-colors"
                            title="Hot Restart"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* System environment parameter controllers */}
        {activeTab === "CONFIG" && (
          <div className="space-y-4 font-mono text-xs">
            <span className="text-[10px] text-zinc-500 block uppercase tracking-wier border-b border-zinc-800 pb-1 mb-2">
              System Runtime Config Variables (Read/Write)
            </span>

            <div className="space-y-3.5">
              {/* Variable 1: Temperature */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 bg-zinc-900/30 border border-zinc-800/80 rounded-lg">
                <div>
                  <div className="font-semibold text-zinc-300">semanticTemperature</div>
                  <div className="text-[10px] text-zinc-500">Heuristics temperature for LLM execution choices. Coerces strictness versus creativity.</div>
                </div>
                <div className="flex items-center gap-2">
                  {editingVar === "semanticTemperature" ? (
                    <div className="flex gap-1">
                      <input
                        type="number"
                        step="0.1"
                        min="0.0"
                        max="1.5"
                        value={varValue}
                        onChange={e => setVarValue(e.target.value)}
                        className="bg-black text-white px-2 py-1 rounded w-16 border border-zinc-700 font-bold"
                      />
                      <button onClick={() => handleSaveVariable("semanticTemperature")} className="bg-blue-600 px-2 py-1 rounded text-[10px] uppercase font-bold text-white hover:bg-blue-500">Set</button>
                      <button onClick={() => setEditingVar(null)} className="text-zinc-500 px-1 py-1 text-[10px]">Cancel</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-blue-400 font-bold">{variables.semanticTemperature}</span>
                      <button
                        onClick={() => { setEditingVar("semanticTemperature"); setVarValue(String(variables.semanticTemperature)); }}
                        className="text-[10px] uppercase bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white px-2 py-1 rounded cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Variable 2: Gas Limit */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 bg-zinc-900/30 border border-zinc-800/80 rounded-lg">
                <div>
                  <div className="font-semibold text-zinc-300">activeSandboxGasLimit</div>
                  <div className="text-[10px] text-zinc-500">Maximum execution cost units per Sandbox iteration, prevents runaway recursion in code compilers.</div>
                </div>
                <div className="flex items-center gap-2">
                  {editingVar === "activeSandboxGasLimit" ? (
                    <div className="flex gap-1">
                      <input
                        type="number"
                        step="10000"
                        min="10000"
                        max="1000000"
                        value={varValue}
                        onChange={e => setVarValue(e.target.value)}
                        className="bg-black text-white px-2 py-1 rounded w-28 border border-zinc-700 font-bold"
                      />
                      <button onClick={() => handleSaveVariable("activeSandboxGasLimit")} className="bg-blue-600 px-2 py-1 rounded text-[10px] uppercase font-bold text-white hover:bg-blue-500">Set</button>
                      <button onClick={() => setEditingVar(null)} className="text-zinc-500 px-1 py-1 text-[10px]">Cancel</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-blue-400 font-bold">{variables.activeSandboxGasLimit}</span>
                      <button
                        onClick={() => { setEditingVar("activeSandboxGasLimit"); setVarValue(String(variables.activeSandboxGasLimit)); }}
                        className="text-[10px] uppercase bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white px-2 py-1 rounded cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Variable 3: Network firewall toggle */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 bg-zinc-900/30 border border-zinc-800/80 rounded-lg">
                <div>
                  <div className="font-semibold text-zinc-300">networkEnforceStrict</div>
                  <div className="text-[10px] text-zinc-500">When enabled, sandbox runtimes strictly deny network packet transmission without pre-signed keys.</div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      const next = !variables.networkEnforceStrict;
                      onUpdateVariable("networkEnforceStrict", next);
                      logAction(`Switched firewall mode: networkEnforceStrict -> ${next}`);
                    }}
                    className={`px-3 py-1.5 rounded uppercase font-bold text-[10px] border cursor-pointer select-none transition-all ${
                      variables.networkEnforceStrict
                        ? "bg-amber-950/40 text-amber-400 border-amber-900/50"
                        : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-white"
                    }`}
                  >
                    {variables.networkEnforceStrict ? "STRICT_ON (Active)" : "PERMISSIVE_ACCESS"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 shrink-0 text-[10px] font-mono text-zinc-600 border-t border-zinc-900/60 pt-3 flex items-center justify-between">
        <span>Hardware Ref: Dual-Socket Cascade 64c</span>
        <span>Secure Cluster: Cloud Execution Space v4</span>
      </div>
    </div>
  );
}
