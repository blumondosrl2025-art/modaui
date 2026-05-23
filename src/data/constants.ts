import { VectorMemory } from "../types";

export const DEFAULT_VECTORS: VectorMemory[] = [
  { key: "kernel.core.heuristics", tags: ["core", "scheduler", "parameters"], coords: [0.12, 0.85], tokens: 248, summary: "Main boot policies, thread count limits, safe telemetry flags, CPU scale weights." },
  { key: "security.sandbox.boundary_policy", tags: ["security", "sandbox", "gas"], coords: [0.89, 0.15], tokens: 1024, summary: "Disallow raw write syscalls under active agent tasks. Gas throttle thresholds." },
  { key: "agent.memory.session_history", tags: ["session", "agent", "user"], coords: [0.65, 0.44], tokens: 4120, summary: "Previous conversations, system summaries, customized cognitive constraints of user." },
  { key: "router.semantic_temperature", tags: ["routing", "temperature", "llm"], coords: [0.34, 0.72], tokens: 196, summary: "Configured temperature mapping. Auto-scales from 0.2 (strict) to 1.1 (creative brainstorm)." },
  { key: "user.intent.personalized_context", tags: ["user", "preferences", "biography"], coords: [0.71, 0.82], tokens: 850, summary: "Direct personalization constraints. Limits response token ceiling for high-verbosity queries." },
  { key: "vector.indexer.metadata_graph", tags: ["vector", "index", "memory"], coords: [0.45, 0.23], tokens: 1450, summary: "Relational maps between key value pairs and context variables. Re-calculated hourly." },
  { key: "sandbox.packet_filter.rules", tags: ["security", "network", "firewall"], coords: [0.81, 0.32], tokens: 530, summary: "Deny outbound communication to untrusted domains during agent code synthesis steps." }
];

export const OS_CLI_HELP_SUGGESTIONS = [
  "sys-status --verbose",
  "vector-search 'sandbox bound laws'",
  "sandbox --init-isolated 'AgentWebChecker'",
  "scheduler optimize -cpu",
  "var semanticTemperature set 0.2",
  "clear-memory --soft"
];
