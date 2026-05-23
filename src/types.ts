/**
 * AI RUNTIME OS - Shared System Types
 * Core schemas for system processes, neural memory vectors, and isolation runtimes.
 */

export interface SystemHardware {
  cpuTotal: number;
  ramUsed: number;
  ramTotal: number;
  diskUsed: number;
  latencyMs: number;
  gpuLoadUsed: number;
  timestamp: string;
}

export interface SystemProcess {
  id: string;
  name: string;
  type: string;
  status: "RUNNING" | "SUSPENDED" | "IDLE";
  cpu: number;
  ram: number;
  threads: number;
  uptime: number; // in seconds
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
}

export interface SystemVariables {
  semanticTemperature: number;
  maxStepsQuota: number;
  networkEnforceStrict: boolean;
  activeSandboxGasLimit: number;
  memoryPurgePolicy: string;
}

export interface VectorMemory {
  key: string;
  tags: string[];
  coords: [number, number];
  tokens: number;
  summary: string;
  similarity?: number;
}

export interface ExecutionTrace {
  status: "SUCCESS" | "WARNING" | "FATAL";
  logs: string[];
  scheduledTask: {
    taskName: string;
    assignedProcess: string;
    gasUsed: number;
    memoryDelta: string;
  };
  neuralHits: string[];
  outcome: {
    title: string;
    description: string;
    vectorUpdate?: string;
  };
}

export interface SandboxEvent {
  timestamp: string;
  type: "SYSCALL" | "NETWORK" | "FILE_WRITE" | "GAS_CONSUMP" | "SECURITY_BLOCK";
  message: string;
  level: "INFO" | "WARN" | "DENIED";
}

export interface WholesaleDNAProtocol {
  // 产品展示密度
  productDensity: 'museum' | 'gallery' | 'archive' | 'warehouse';
  
  // 批发商分级系统
  tierVisibility: {
    public: boolean;      // 公开可见内容
    registered: boolean;  // 注册用户可见
    vip: boolean;         // VIP客户可见
  };
  
  // 批量操作界面
  batchOperations: {
    bulkSelection: boolean;
    compareView: boolean;
    sampleRequestFlow: boolean;
  };
  
  // 专业属性筛选
  professionalFilters: {
    materials: string[];      // 面料/材质筛选
    techniques: string[];     // 工艺筛选
    seasons: string[];        // 季节筛选
    moq: boolean;             // 最小起订量显示
  };
}

export interface SingularityProduct {
  id?: string;
  name: string;
  price: string;
  description: string;
  silhouette: string;
  material: string;
  image?: string; // High quality placeholder or generated visual representation
  wholesalePrice?: string; // B2B tier price
  moq?: number; // Minimum Order Quantity
  stocks?: number; // Stocks level in ERP
  techniques?: string[]; // Crafts techniques e.g., Handloom, Fine Knit, Stone washed
  colors?: string[]; // Multi-color colorways e.g. ["#FAF9F6", "#121212", "#4F5D4E"]
}

export interface SingularityBrand {
  brandName: string;
  slogan: string;
  designerVibe: string;
  colors: {
    background: string;
    text: string;
    accent: string;
    subtle: string;
  };
  typography: {
    display: string;
    body: string;
    style: "Minimalist" | "Avant-Garde" | "Intellectual" | "Brutalist";
  };
  products: SingularityProduct[];
  editorialBlock: {
    title: string;
    body: string;
  };
  scores: {
    visualTension: number;
    luxuryFeeling: number;
    structuralUniqueness: number;
    brandConsistency: number;
    whitespaceScore?: number;
    cognitiveNoise?: number;
    typographicHarmony?: number;
    premiumDensity?: number;
  };
  critique: string;
  wholesale?: WholesaleDNAProtocol;
  // Industrialized 7-Layer Compiler Properties
  brandUnderstanding?: {
    luxuryTier: "ultra-luxury" | "high-end" | "niche-avantgarde";
    materials: string[];
    spatialAtmosphere: string;
    silenceRatio: number; // e.g., 0.82
    customerProfile: string;
    materialLanguage?: string;
  };
  designTokens?: {
    radius: string;      // "0" | "2px" | "6px" | "16px"
    spacingMax: string;  // "gap-6" | "gap-12" | "gap-16" | "gap-24"
    surfaceNoise: number; // e.g., 0.03
    transitionCurve: string; // e.g., "cubic-bezier(0.16, 1, 0.3, 1)"
    borderPhilosophy: "ultra-thin" | "invisible" | "hairline";
  };
  theme?: {
    fontScale: number; // e.g. 1.15
    imageAspectRatio: "aspect-[3/4]" | "aspect-square" | "aspect-video";
    accentVapor: string; // transparent accent color
    grainDensity: number;
  };
  composition?: {
    whitespaceScore: number;
    densityControl: "silent" | "spacious" | "standard";
    activeComponents: string[]; // e.g., ["cinematic-hero", "material-story", "museum-grid", "philosophy"]
  };
}

