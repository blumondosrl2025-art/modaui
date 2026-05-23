import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));
  
  // Clean inline CORS headers middleware
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // Initialize Gemini API Client securely
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      console.log("AI RUNTIME OS: Cognitive Gemini Kernel initialized successfully.");
    } catch (e) {
      console.error("AI RUNTIME OS: Error initializing Gemini Client, using backup synthetic emulator.", e);
    }
  } else {
    console.warn("AI RUNTIME OS: GEMINI_API_KEY missing. Activating high-accuracy heuristic emulation mode.");
  }

  // --- Core Simulated OS Database & State ---
  let systemProcesses = [
    { id: "proc-1", name: "OmniCore-Scheduler-v1", type: "Kernel", status: "RUNNING", cpu: 4.8, ram: 124, threads: 16, uptime: 1842, priority: "CRITICAL" },
    { id: "proc-2", name: "AgentMemory-VectorDB", type: "Storage", status: "RUNNING", cpu: 8.2, ram: 652, threads: 32, uptime: 1842, priority: "HIGH" },
    { id: "proc-3", name: "SemanticRouter-v4", type: "Routing", status: "RUNNING", cpu: 1.2, ram: 142, threads: 8, uptime: 1250, priority: "HIGH" },
    { id: "proc-4", name: "SecuredSandbox-Node_01", type: "Sandbox", status: "RUNNING", cpu: 0.1, ram: 64, threads: 4, uptime: 954, priority: "MEDIUM" },
    { id: "proc-5", name: "SecuredSandbox-Node_02", type: "Sandbox", status: "SUSPENDED", cpu: 0.0, ram: 12, threads: 1, uptime: 420, priority: "MEDIUM" },
    { id: "proc-6", name: "InternetWeb-CrawlerDaemon", type: "Network", status: "IDLE", cpu: 0.0, ram: 98, threads: 2, uptime: 110, priority: "LOW" },
    { id: "proc-7", name: "ModelInference-GPU-Bridge", type: "Inference", status: "RUNNING", cpu: 14.5, ram: 1048, threads: 64, uptime: 1842, priority: "CRITICAL" }
  ];

  let systemVariables = {
    semanticTemperature: 0.7,
    maxStepsQuota: 120,
    networkEnforceStrict: true,
    activeSandboxGasLimit: 500000,
    memoryPurgePolicy: "AUTO"
  };

  const vectorDbIndex = [
    { key: "kernel.core.heuristics", tags: ["core", "scheduler", "parameters"], coords: [0.12, 0.85], tokens: 248, summary: "Main boot policies, thread count limits, safe telemetry flags, CPU scale weights." },
    { key: "security.sandbox.boundary_policy", tags: ["security", "sandbox", "gas"], coords: [0.89, 0.15], tokens: 1024, summary: "Disallow raw write syscalls under active agent tasks. Gas throttle thresholds." },
    { key: "agent.memory.session_history", tags: ["session", "agent", "user"], coords: [0.65, 0.44], tokens: 4120, summary: "Previous conversations, system summaries, customized cognitive constraints of user." },
    { key: "router.semantic_temperature", tags: ["routing", "temperature", "llm"], coords: [0.34, 0.72], tokens: 196, summary: "Configured temperature mapping. Auto-scales from 0.2 (strict task) to 1.1 (creative brainstorm)." },
    { key: "user.intent.personalized_context", tags: ["user", "preferences", "biography"], coords: [0.71, 0.82], tokens: 850, summary: "Direct personalization constraints. Limits response token ceiling for high-verbosity queries." },
    { key: "vector.indexer.metadata_graph", tags: ["vector", "index", "memory"], coords: [0.45, 0.23], tokens: 1450, summary: "Relational maps between key value pairs and context variables. Re-calculated hourly." },
    { key: "sandbox.packet_filter.rules", tags: ["security", "network", "firewall"], coords: [0.81, 0.32], tokens: 530, summary: "Deny outbound communication to untrusted domains during agent code synthesis steps." }
  ];

  // --- API Routes ---

  // Endpoint 1: Get complete real-time OS Kernel diagnostics
  app.get("/api/os/diagnostics", (req, res) => {
    // Generate slight fluctuations to simulate living hardware metrics
    const cpuTotal = parseFloat((systemProcesses.reduce((acc, p) => acc + (p.status === "RUNNING" ? p.cpu : 0), 0) + Math.random() * 2).toFixed(1));
    const ramTotal = systemProcesses.reduce((acc, p) => acc + (p.status === "RUNNING" ? p.ram : 0), 0) + Math.floor(Math.random() * 8);
    const diskUsage = 64.2; // percent
    const latency = Math.floor(Math.sin(Date.now() / 10000) * 12 + 42); // ms

    res.json({
      hardware: {
        cpuTotal,
        ramUsed: ramTotal,
        ramTotal: 8192,
        diskUsed: diskUsage,
        latencyMs: Math.max(8, latency),
        gpuLoadUsed: cpuTotal > 20 ? 82 : 14,
        timestamp: new Date().toISOString()
      },
      processes: systemProcesses,
      variables: systemVariables
    });
  });

  // Endpoint 2: Toggle / Restart system processes
  app.post("/api/os/process-control", (req, res) => {
    const { processId, action } = req.body;
    const processIndex = systemProcesses.findIndex(p => p.id === processId);

    if (processIndex === -1) {
      return res.status(404).json({ error: "System Process Registry Code Not Found" });
    }

    const proc = systemProcesses[processIndex];
    if (action === "STOP") {
      proc.status = "SUSPENDED";
      proc.cpu = 0.0;
    } else if (action === "START") {
      proc.status = "RUNNING";
      proc.cpu = proc.priority === "CRITICAL" ? 12.0 : 4.5;
    } else if (action === "RESTART") {
      proc.status = "RUNNING";
      proc.cpu = 1.0;
      proc.uptime = 0;
    }

    res.json({ success: true, process: proc });
  });

  // Endpoint 3: Update system runtime variables
  app.post("/api/os/variable-update", (req, res) => {
    const { key, value } = req.body;
    if (key in systemVariables) {
      (systemVariables as any)[key] = value;
      return res.json({ success: true, variables: systemVariables });
    }
    res.status(400).json({ error: "Invalid Kernel Variable Identifier" });
  });

  // Endpoint 4: Search Neural Memory (Vector Space coordinates closest vector match)
  app.post("/api/os/vector-search", (req, res) => {
    const { query } = req.body;
    const cleanQuery = (query || "").toLowerCase();

    // Calculate simulated cosine similarity matching tags/keys
    const results = vectorDbIndex.map(vector => {
      let score = 0.15; // default base similarity
      
      const words = cleanQuery.split(/\s+/);
      words.forEach((word: string) => {
        if (!word) return;
        if (vector.key.toLowerCase().includes(word)) score += 0.45;
        vector.tags.forEach(tag => {
          if (tag.toLowerCase().includes(word)) score += 0.25;
        });
        if (vector.summary.toLowerCase().includes(word)) score += 0.15;
      });

      // Clamp score to 0.99
      const similarity = parseFloat(Math.min(0.99, score).toFixed(2));
      return {
        ...vector,
        similarity
      };
    });

    // Sort by highest similarity
    results.sort((a, b) => b.similarity - a.similarity);

    res.json({
      query: cleanQuery,
      results,
      status: "STRICT_SEMANTIC_MATCH_SECURED"
    });
  });

  // ==========================================
  // Premium Template Intelligence Engine Endpoints
  // ==========================================

  // Endpoint P1: Brand DNA Extractor
  app.post("/api/premium/dna-extractor", async (req, res) => {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Missing Target URL for Premium DNA Extraction" });
    }

    const cleanUrl = url.toLowerCase().trim();

    // System prompt for Gemini-assisted Luxury Visual DNA breakdown
    const systemPromptText = `
      You are the AI Luxury Brand Visual DNA Extractor (高级视觉系统分析师).
      Given a premium brand name or website URL, extract its precise, top-tier aesthetic blueprints and styling attributes.
      You must return a valid, clean JSON response. Do not include markdown code blocks.
      Use this exact JSON schema:
      {
        "brand": "The cleaned up official name",
        "philosophy": "A poetic designer level philosophy (e.g., 'Radical intellectual restraint.'), about 1-2 sentences",
        "spacing": "airy" | "dense" | "absolute-restraint",
        "radius": "none" | "sm" | "md" | "lg" | "capsule",
        "shadow": "no-shadow" | "hairline-offset" | "soft-depth" | "neon-atmosphere",
        "density": "low" | "medium" | "high",
        "heroPresentation": "cinematic-center" | "split-interactive" | "typography-focus" | "asymmetric-stagger",
        "typography": {
          "display": "font name for titles, e.g. Space Grotesk, Playfair Display, Outfit",
          "body": "font name for bodies, e.g. Inter, JetBrains Mono",
          "tracking": "tracking-tight" | "tracking-wide" | "tracking-widest"
        },
        "colors": {
          "background": "A matching luxurious hex code, e.g., #FAF9F6",
          "text": "Main text color, e.g., #1A1A1A",
          "accent": "Minimalist pop accent hex code, e.g., #4F46E5",
          "subtle": "Soft separator styling lines hex, e.g., #E5E7EB",
          "accentHover": "Slightly altered accent for animations, e.g. #3730A3"
        },
        "aestheticSecrets": [
          "Unique aesthetic detail 1, e.g., Extreme empty space (65%+ negative space ratio) is used to contextualize editorial photography.",
          "Unique aesthetic detail 2, e.g., Complete elimination of color gradients and rounded buttons to focus on mechanical box typography."
        ],
        "luxuryIndex": 98
      }
    `;

    // Try Gemini if available
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `System Instruction: ${systemPromptText}\n\nExtract and parse Luxury Brand DNA details for input: "${cleanUrl}"`,
          config: {
            responseMimeType: "application/json"
          }
        });

        const textOutput = response.text || "";
        try {
          const parsedResult = JSON.parse(textOutput.trim());
          return res.json(parsedResult);
        } catch (parseError) {
          console.warn("AI PREMIUM ENGINE: Could not parse output, extracting with regex", parseError);
          const jsonMatch = textOutput.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return res.json(JSON.parse(jsonMatch[0]));
          }
          throw new Error("Unable to parse brand DNA schema");
        }
      } catch (e) {
        console.warn("AI PREMIUM ENGINE: Gemini failed, calling back to premium preset rules", e);
      }
    }

    // High fidelity presets fallback if local offline
    if (cleanUrl.includes("apple")) {
      return res.json({
        brand: "Apple Inc.",
        philosophy: "The ultimate synthesis of engineering logic and visual minimalism.",
        spacing: "airy",
        radius: "lg",
        shadow: "soft-depth",
        density: "low",
        heroPresentation: "cinematic-center",
        typography: { display: "Outfit", body: "Inter", tracking: "tracking-tight" },
        colors: { background: "#F5F5F7", text: "#1D1D1F", accent: "#0071E3", subtle: "#D2D2D7", accentHover: "#0058B0" },
        aestheticSecrets: [
          "Microscopic text contrast: Utilizing subtle dark grays instead of pure #000000 to keep visual reading smooth and warm.",
          "Perfect spatial rhythm: 120px desktop padding gaps are strictly paired with absolute display type hierarchy."
        ],
        luxuryIndex: 96
      });
    }

    if (cleanUrl.includes("stripe")) {
      return res.json({
        brand: "Stripe",
        philosophy: "A fluid, complex visual grid of cyber-native transaction architecture.",
        spacing: "airy",
        radius: "md",
        shadow: "soft-depth",
        density: "medium",
        heroPresentation: "split-interactive",
        typography: { display: "Space Grotesk", body: "Inter", tracking: "tracking-tight" },
        colors: { background: "#FFFFFF", text: "#0A2540", accent: "#635BFF", subtle: "#EAF0F6", accentHover: "#5145CD" },
        aestheticSecrets: [
          "Slightly warm base: Background tones are kept perfectly off-white to encourage transaction confidence.",
          "Subdued active highlights: Interactive details are given highly specific color states to minimize cognitive distraction."
        ],
        luxuryIndex: 94
      });
    }

    if (cleanUrl.includes("nike")) {
      return res.json({
        brand: "Nike Design Core",
        philosophy: "Aggressive visual tension and colossal, heavy-impact display grids.",
        spacing: "absolute-restraint",
        radius: "none",
        shadow: "no-shadow",
        density: "high",
        heroPresentation: "asymmetric-stagger",
        typography: { display: "Outfit", body: "Inter", tracking: "tracking-tighter" },
        colors: { background: "#111111", text: "#FAF9F6", accent: "#FFFFFF", subtle: "#2C2C2C", accentHover: "#CCCCCC" },
        aestheticSecrets: [
          "Kinetic Tension: High-density italic tracking is mapped directly beside massive product photos to evoke immediate energy.",
          "Elimination of visual fluff: Standard buttons are flattened into sharp rectangles, avoiding all modern round-bubble trends."
        ],
        luxuryIndex: 92
      });
    }

    if (cleanUrl.includes("celine") || cleanUrl.includes("luxury")) {
      return res.json({
        brand: "CELINE Paris",
        philosophy: "Poetic intellectual silence. Elite European high-fashion publishing restraint.",
        spacing: "airy",
        radius: "none",
        shadow: "no-shadow",
        density: "low",
        heroPresentation: "typography-focus",
        typography: { display: "Playfair Display", body: "JetBrains Mono", tracking: "tracking-widest" },
        colors: { background: "#FAF9F6", text: "#0A0A0A", accent: "#8B7E66", subtle: "#EAE7E1", accentHover: "#6E624C" },
        aestheticSecrets: [
          "The 'Silence as Frame' rule: Spacing ratios are expanded to 75% raw canvas negative space.",
          "Radical typography asymmetry: Big serif titles are offset against tiny monospace technical annotations."
        ],
        luxuryIndex: 99
      });
    }

    // Default Custom Extrapolated Brand DNA
    return res.json({
      brand: url.charAt(0).toUpperCase() + url.slice(1),
      philosophy: "Synthesized visual elegance curating a modern, responsive digital canvas.",
      spacing: "airy",
      radius: "md",
      shadow: "soft-depth",
      density: "medium",
      heroPresentation: "cinematic-center",
      typography: { display: "Outfit", body: "Inter", tracking: "tracking-tight" },
      colors: { background: "#FAF9F6", text: "#1A1A1A", accent: "#4F46E5", subtle: "#E5E7EB", accentHover: "#3730A3" },
      aestheticSecrets: [
        "Balanced empty segments (40%-50% negative space) ensuring content has immediate spatial volume.",
        "Precise borders instead of bulky shadows to emphasize high-end architectural discipline."
      ],
      luxuryIndex: 90
    });
  });

  // Endpoint P2: Aesthetic Quality Laws Repair Engine
  app.post("/api/premium/quality-laws-repair", async (req, res) => {
    const { templateData } = req.body;
    if (!templateData) {
      return res.status(400).json({ error: "Missing Template Specs to aestheticize" });
    }

    // Deep high-end transformation rules
    const systemPromptText = `
      You are the AI Supreme Aesthetic Refinement Engine (高级感净化引擎).
      Your core job is to take a cheap, cluttered, visually broken UI template layout configuration (represented as a JSON structure with low contrast, messy radial gradients, heavy bulky shadows, dense spacing, rounded bubbles, the hallmarks of amateur design) and repair it into an ultra-premium visual masterpiece of world-class design standards.

      Explain the aesthetic transformation step-by-step applying the 4 Sacred Aesthetic Laws:
      1. CRITICAL RESTRAINT (克制律) - Eliminate aggressive gradients, multiple primary colors, heavy shadows. Convert to high-contrast solid sophisticated systems.
      2. AIRY SPACE (空灵律) - Blow out cramped paddings and spacing. Enforce breathing margins (60%+ empty ratio).
      3. PATTERNS OF FRICTION (肌理感/发丝影) - Turn bulky shadows into hairline separators (#eaeaea, 1px) or subtle offset borders.
      4. INTEGRAL RATIO (比例整合律) - Fine-tune typography scales, line-heights, display letter tracking.

      You must return a valid, clean JSON response. Do not include markdown code blocks.
      Conform exactly to this JSON schema:
      {
        "logs": [
          "Step-by-step details of transformations applied according to the Aesthetic Laws, e.g., '[克制律] Removed cheap multi-color linear gradient; replaced with warm bone white solid background (#F9F6F0).'"
        ],
        "repairedSpecs": {
          "background": "Luxurious hex code of new background",
          "text": "Main elegant font color hex",
          "accent": "Minimal focus accent hex",
          "subtle": "Styling borders hex",
          "radius": "none" | "sm" | "md",
          "shadow": "hairline-offset" | "no-shadow",
          "spacing": "airy" | "absolute-restraint",
          "letterTracking": "tracking-tight" | "tracking-wide" | "tracking-widest",
          "hierarchyRatio": "Perfect scale ratio description, e.g. '1.618 Golden Section'"
        },
        "scores": {
          "before": number (usually 40-55),
          "after": number (must be 95-99 with clear reasoning)
        },
        "philosophicJustification": "A summary of how this refactoring replaced 'visual noise' with 'aesthetic authority'."
      }
    `;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `System Prompt: ${systemPromptText}\n\nDirty Cluttered Template Data: ${JSON.stringify(templateData)}`,
          config: {
            responseMimeType: "application/json"
          }
        });

        const textOutput = response.text || "";
        try {
          const parsedResult = JSON.parse(textOutput.trim());
          return res.json(parsedResult);
        } catch (parseError) {
          console.warn("AI PREMIUM ENGINE: Could not parse repair response, regexing", parseError);
          const jsonMatch = textOutput.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return res.json(JSON.parse(jsonMatch[0]));
          }
          throw new Error("Unable to parse repair model output");
        }
      } catch (e) {
        console.warn("AI PREMIUM ENGINE: Quality repair model failed, invoking programmatic backup", e);
      }
    }

    // Programmatic high-end repair fallback
    return res.json({
      logs: [
        "[克制律] Removed chaotic blue-to-pink neon linear gradient text and cards; restored pure charcoal (#121212) text with bone white background.",
        "[空灵律] Expanded container padding from cramped 12px to airy 48px; increased vertical block spacing into 110px gaps.",
        "[发丝细律] Eliminated bulk black CSS shadow 'shadow-2xl'; installed clean hairline neutral border separators.",
        "[比例整合律] Altered title letter-tracking from normal to tracking-tight (-0.025em); increased technical specs to tracking-widest (0.15em)."
      ],
      repairedSpecs: {
        background: "#FAF9F6",
        text: "#121212",
        accent: "#4F46E5",
        subtle: "#E5E1DA",
        radius: "none",
        shadow: "no-shadow",
        spacing: "airy",
        letterTracking: "tracking-tight",
        hierarchyRatio: "1.618 Golden Proportion"
      },
      scores: {
        before: 48,
        after: 97
      },
      philosophicJustification: "The repaired structure transitions from heavy developer-clutter into elite high-luxury silence. By eliminating the heavy borders and gradients, focus is returned exclusively to content, typography proportions, and breathable empty volumes."
    });
  });

  // Endpoint P3: Ambient AI Concierge Core Routing (Active Brand DNA Narrative Agent)
  app.post("/api/premium/concierge", async (req, res) => {
    const { 
      brandName, 
      designerVibe, 
      material, 
      persona = "archivist", 
      tone = "poetic", 
      userMessage, 
      chatHistory = [], 
      productContext = null,
      ritualContext = null 
    } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: "Missing conversational message query" });
    }

    const brandNameClean = brandName || "White Cosmos";
    const materialClean = material || "raw-linen";
    const vibeClean = designerVibe || "Intellectual minimalism";

    // System instruction mapping based on Luxury Laws and aesthetic profiles
    const systemInstruction = `
      You are the Ambient AI Concierge (环境AI管家) for the high-luxury storefront brand: "${brandNameClean}".
      The brand's visual identity operates under: "${vibeClean}". Its core materials are centered around: "${materialClean}".
      
      Your personality is: "${persona}" (curator: design curator & personal coordinates planner, archivist: chronicles raw textures, heritage & geological epochs of ceramics/obsidians, personal-shopper: handles pairing coordinates and custom bespoke rituals).
      Your speech style is strictly: "${tone}" (reverent: discusses artisanal labor as a silent ritual, poetic: slow sensory pauses, light-casts, and material decay, minimalist: severe, quiet restraint with short sentence structures).

      CRITICAL CONSTRAINTS (必须遵守的高奢静默法则):
      1. Active Restraint (克制律): NEVER use exclamation points, customer service emojis (like 😊, ✨, 🙌), or generic marketing pitch language. Speak with the composure of an elite museum archivist or an ancient tea ceremony master.
      2. No Cheap Clichés (消解凡俗): Do not say things like "Welcome!", "How can I help you today?", or "Have a great day!". Address the visitor with silent respect.
      3. Focus on Materiality & Shadows (感知材质与光影):
         - If discussing products, analyze their structural drape, weight, light absorption, and tactile texture.
         - If the visitor focuses on a product: "${productContext ? JSON.stringify(productContext) : 'None'}", provide deep aesthetic criticism of its silhouette and micro-textures.
         - If the visitor is in a shopping/checkout state: "${ritualContext ? JSON.stringify(ritualContext) : 'None'}", guide them through a "buying ritual" (e.g., suggesting a naming ceremony for their stoneware plate, recommending the item to be delivered on the next new moon for a fresh beginning, or pairing with raw incense logs).

      FORMATTING:
      Return a valid JSON object matching this schema exactly. Do not wrap with markdown blocks like \`\`\`json.
      {
        "reply": "Your rich, elegant conversational response in Chinese, utilizing high-level, poetic fashion-tech vocabulary.",
        "suggestions": ["A list of 2 or 3 short, restrained, poetic conversation prompt suggestions that the user can click next, designed to deepen the artistic discussion, e.g. '品味粗陶的微结构变化', '定制新月送达仪式'"]
      }
    `;

    // Initialize/use Gemini client if active
    if (ai) {
      try {
        const contents = [];
        // Append history
        for (const turn of chatHistory) {
          contents.push({ role: turn.role === "user" ? "user" : "model", parts: [{ text: turn.text }] });
        }
        contents.push({ role: "user", parts: [{ text: userMessage }] });

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: contents as any,
          config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json"
          }
        });

        const outputText = response.text || "";
        try {
          const parsed = JSON.parse(outputText.trim());
          return res.json(parsed);
        } catch (parseError) {
          console.warn("AI CONCIERGE API router: Output parse failed, extracting via regex.", parseError);
          const jsonMatch = outputText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return res.json(JSON.parse(jsonMatch[0]));
          }
          throw new Error("Unable to parse generated concierge schema");
        }
      } catch (gemError) {
        console.warn("AI CONCIERGE GATEWAY: Gemini model query failed. Activating high-accuracy aesthetic backup.", gemError);
      }
    }

    // High premium offline local heuristic emulator
    let fallbackReply = `在这个瞬息万变的数字化时代，${brandNameClean} 依然坚持对「${materialClean}」材质进行克制的探索。`;
    let fallbackSuggestions = ["探索材质的感官厚度", "了解未竟之美的叙事"];

    const msgLower = userMessage.toLowerCase();
    if (msgLower.includes("材质") || msgLower.includes("material") || productContext) {
      fallbackReply = `「${materialClean}」不仅是一种感官介质，更是时间的沉默造像。在 ${brandNameClean}，我们拒绝过滤表面的不均匀痕迹，使其与下午光线的折射以及使用者指尖的油脂结合，自然滋润出深邃的肌理。正如这件作品，在漫长的窑火或拉伸中保留了本真的不规则边缘。`;
      fallbackSuggestions = ["探讨与铸铁器皿的陈列搭配", "体验其在不同光影表现"];
    } else if (msgLower.includes("配") || msgLower.includes("搭配") || msgLower.includes("策展") || msgLower.includes("空间")) {
      fallbackReply = `为您构想一处静谧之所：以未处理的 ${materialClean} 与深色黑曜石或斑驳粗陶交错。在 40% 的弱光笼罩中，流线型的空间留白与极简家具比例（如 1:1.618 的黄金截面）相携，引导视线停驻在材质故事的转折点。若需，我可以为您生成局部的陈列建议。`;
      fallbackSuggestions = ["获得客厅空间静穆蓝图", "探索光影在留白处的流动"];
    } else if (msgLower.includes("买") || msgLower.includes("购物车") || msgLower.includes("结算") || msgLower.includes("仪式") || ritualContext) {
      fallbackReply = `选择这件带有永恒重力的 ${materialClean} 杰作，并不是一次普通的交换，而是一场长久陪伴的契约仪式。我们为您提供「新月日静音送达」，并在包装内附带一块未打磨的源生矿石作为重力信柬，希望您能为这件陶器冠以一个象征直觉的名字。`;
      fallbackSuggestions = ["选择新月送达并命名", "定制手工木盒蜡封包装"];
    }

    res.json({
      reply: fallbackReply,
      suggestions: fallbackSuggestions
    });
  });

  // Endpoint 5: Cognitive Instruction Terminal Execute Router (Gemini Powered)
  app.post("/api/os/execute", async (req, res) => {
    const { command, activeDir } = req.body;

    const systemPromptText = `
      You are the AI Native OS Cognitive Core Kernel representing the 'Omni-Existence-Runtime' (AI Runtime OS).
      Your task is to parse the natural-language request from the server terminal and return a comprehensive system execution trace in JSON format.
      
      The target environment is an advanced AI OS composed of:
      - Kernel Scheduler: schedules agent thoughts and cycles.
      - Neural Memory DB: queries semantic state nodes.
      - Sandbox Isolation Engine: spins up clean node sandboxes.
      - Resource Balancer: controls GPU inference scaling.

      Based on user input, generate the logical path the AI Runtime OS took to fulfill this command.
      
      You must return a valid, clean JSON response. Do not include markdown wraps like \`\`\`json.
      The JSON structure MUST conform precisely to:
      {
        "status": "SUCCESS" | "WARNING" | "FATAL",
        "logs": [
          "string list of sequential low-level kernel event messages with mock microseconds timestamp e.g. [0.002ms] Init logical routing"
        ],
        "scheduledTask": {
          "taskName": "string describing execution job",
          "assignedProcess": "string name of system process from diagnostics that handled this, or new sub-routine",
          "gasUsed": number (from 100 to 800000),
          "memoryDelta": "string showing RAM increase/decrease like '+24 MB'"
        },
        "neuralHits": [
          "list of key identities queried from the Vector Space (e.g. ['kernel.core.heuristics', 'security.sandbox.boundary_policy'])"
        ],
        "outcome": {
          "title": "Short outcome summary",
          "description": "Rich technical summary of how the OS orchestrated the agent memory, isolated execution, and secured output.",
          "vectorUpdate": "Description of any new conceptual state saved to the vector coordinates"
        }
      }

      Keep response technical, precise, and highly immersive. Let it speak of real operating infrastructure components, gas throttling, semantic indexes, and thread management. No fluff.
    `;

    if (ai && command) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `System Prompt: ${systemPromptText}\n\nUser CLI Input: "${command}" (Active Directory: "${activeDir || "/"}")`,
          config: {
            responseMimeType: "application/json"
          }
        });

        const textOutput = response.text || "";
        try {
          const parsedResult = JSON.parse(textOutput.trim());
          return res.json(parsedResult);
        } catch (parseError) {
          console.warn("AI RUNTIME OS: Could not parse output as valid JSON, extracting object with regex", parseError);
          const jsonMatch = textOutput.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return res.json(JSON.parse(jsonMatch[0]));
          }
          throw new Error("Unable to parse Gemini output structure");
        }
      } catch (e) {
        console.error("AI RUNTIME OS: Gemini API Failure, fallback to expert emulation.", e);
        return res.json(getEmulatedExecutionTrace(command));
      }
    } else {
      // Fallback to rich, dynamic simulated response matching search criteria
      return res.json(getEmulatedExecutionTrace(command));
    }
  });

  // Endpoint 7: Inject custom brand process into active OS cluster
  app.post("/api/os/process-inject", (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Missing process name" });

    const newProc = {
      id: `proc-singularity-${Date.now()}`,
      name: name,
      type: "Storefront",
      status: "RUNNING" as const,
      cpu: parseFloat((1.5 + Math.random() * 2.5).toFixed(1)),
      ram: Math.floor(82 + Math.random() * 45),
      threads: 4,
      uptime: 5,
      priority: "HIGH" as const
    };

    systemProcesses.push(newProc);
    res.json({ success: true, process: newProc });
  });

  // Endpoint 6: Singularity Brand Generator (一句化开店, 模板品牌化)
  app.post("/api/os/singularity-generate", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt or storefront concept instruction" });
    }

    const systemPromptText = `
      You are the Industrial-Grade AI Luxury Commerce OS Singularity Brand Compiler (高级世界品牌店工业化生成引擎).
      Your core duty is to take a single-sentence store description (一句化开店) and compile it into an elite-tier luxury brand storefront using a highly structured, stable Design Token System. You must strictly constrain the layout so it is elite, clean, and never crowded or messy.

      LANG COMPATIBILITY:
      If the user query is in Chinese, you MUST output the fields 'brandName' (preferably bilingual like 'KERA • 泥室'), 'slogan', 'designerVibe', 'products' (name, description, material, silhouette), 'editorialBlock' (title, body), and 'critique' in elegant Chinese. Use high-concept fashion terms (e.g. 空间张力, 无彩色, 极简主义, 侘寂, 质地肌理).

      You must return a valid, clean JSON response without markdown code blocks.
      Conform exactly to this unified JSON schema, filling in all industrial design tokens and criteria properties:
      {
        "brandName": "A premium elevated brand name, e.g. 'KERA • 泥室'",
        "slogan": "An elegant, poetic philosophy slogan, e.g. 'Where raw earth meets contemporary drapes.'",
        "designerVibe": "An insightful description of style drapes, e.g., 'Intellectual minimalism referencing Axel Vervoordt'",
        "colors": {
          "background": "A premium dominant hex code, e.g. #FAF9F6",
          "text": "Deep primary text hex code, e.g. #1A1A1A",
          "accent": "An elegant luxury focus accent hex, e.g. #4F5D4E",
          "subtle": "Neutral thin borders/accents hex, e.g. #E5E1DA"
        },
        "typography": {
          "display": "Elegant display font name for titles, e.g. 'Space Grotesk' or 'Playfair Display' or 'Outfit'",
          "body": "Clean legible font for body, e.g. 'Inter' or 'JetBrains Mono'",
          "style": "Minimalist" | "Avant-Garde" | "Intellectual" | "Brutalist"
        },
        "products": [
          {
            "name": "Luxury product name, e.g., 'Eroded Ash Mug'",
            "price": "Boutique pricing string, e.g., '$185'",
            "description": "Artisanal copy emphasizing materiality, structure, and drape",
            "silhouette": "The structural outline, e.g. 'Asymmetric low cylinder'",
            "material": "The fine materials, e.g. 'Coarse raw iron clay'",
            "image": "Choose a premium real unsplash item photo URL matching the product style (e.g. a high-end minimalist ceramic cup, marble sculpture, or silk coat texture on high-contrast backdrop)"
          },
          { "name": "...", "price": "...", "description": "...", "silhouette": "...", "material": "...", "image": "..." },
          { "name": "...", "price": "...", "description": "...", "silhouette": "...", "material": "...", "image": "..." }
        ],
        "editorialBlock": {
          "title": "A captivating, literary editorial title, e.g. 'The Weight of Earth'",
          "body": "A deep, premium paragraph detailing the brand story or material choice."
        },
        "scores": {
          "visualTension": 85,
          "luxuryFeeling": 92,
          "structuralUniqueness": 88,
          "brandConsistency": 90,
          "whitespaceScore": 95,
          "cognitiveNoise": 15,
          "typographicHarmony": 96,
          "premiumDensity": 20
        },
        "brandUnderstanding": {
          "luxuryTier": "ultra-luxury" | "high-end" | "niche-avantgarde",
          "materials": ["ceramic", "ash slate", "brushed brass", "linen"],
          "spatialAtmosphere": "An description of the spatial design like 'coarse clay walls, narrow slits of morning light, and silent shadows'",
          "silenceRatio": 0.85,
          "customerProfile": "Collector of high-craft architectural accessories"
        },
        "designTokens": {
          "radius": "none" | "3px" | "8px" | "16px",
          "spacingMax": "gap-12" | "gap-16" | "gap-24",
          "surfaceNoise": 0.02,
          "transitionCurve": "cubic-bezier(0.16, 1, 0.3, 1)",
          "borderPhilosophy": "ultra-thin" | "invisible" | "hairline"
        },
        "theme": {
          "fontScale": 1.15,
          "imageAspectRatio": "aspect-[3/4]" | "aspect-square" | "aspect-video",
          "accentVapor": "rgba(79, 93, 78, 0.06)",
          "grainDensity": 0.04
        },
        "composition": {
          "whitespaceScore": 96,
          "densityControl": "silent" | "spacious" | "standard",
          "activeComponents": ["cinematic-hero", "material-story", "museum-grid", "luxury-manifesto"]
        },
        "critique": "A professional fashion critique, analyzing why this design token layout achieves supreme architectural harmony and commercial power."
      }
    `;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `System Prompt: ${systemPromptText}\n\nUser Branding Intent: "${prompt}"`,
          config: {
            responseMimeType: "application/json"
          }
        });

        const textOutput = response.text || "";
        try {
          const parsedResult = JSON.parse(textOutput.trim());
          return res.json(parsedResult);
        } catch (parseError) {
          console.warn("AI RUNTIME OS: Could not parse output as valid JSON, extracting with regex", parseError);
          const jsonMatch = textOutput.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return res.json(JSON.parse(jsonMatch[0]));
          }
          throw new Error("Unable to parse Gemini output structure");
        }
      } catch (e) {
        console.error("AI RUNTIME OS: Singularity Gemini failure, using backup program-matic generator", e);
        return res.json(getEmulatedSingularityBrand(prompt));
      }
    } else {
      return res.json(getEmulatedSingularityBrand(prompt));
    }
  });

  // Programmatic Brand elevation fallback with 7-layer industrial compiler schemas
  function getEmulatedSingularityBrand(promptText: string) {
    const input = (promptText || "").toLowerCase();

    // 0. High-Luxury Cashmere & Leather Bag B2B Wholesale Match
    if (input.includes("批发") || input.includes("b2b") || input.includes("wholesale") || input.includes("loro") || input.includes("cashmere") || input.includes("羊绒") || input.includes("皮包") || input.includes("手袋") || input.includes("买手店") || input.includes("skus") || input.includes("工坊")) {
      return {
        brandName: "COSMOS • 绒系 / VECTRA WHOLESALE",
        slogan: "Premium Cashmere, Fine Fabrics & Leather Bag B2B Showroom.",
        designerVibe: "Pure Italian minimal luxury inspired by Loro Piana and Brunello Cucinelli's organic textures and B2B scale efficiency.",
        colors: {
          background: "#F5F2EB", // Warm cream beige
          text: "#1F1C1A",       // Deep walnut
          accent: "#9B7E5D",     // Rich saddle gold
          subtle: "#E4DCC3"      // Soft linen thread
        },
        typography: {
          display: "Playfair Display",
          body: "Inter",
          style: "Minimalist"
        },
        products: [
          {
            name: "100% Mongolian Cashmere Double-Pleated Coat",
            price: "$680 B2B (MSRP $2,400)",
            description: "Ultra-fine raw cashmere hand-loomed fibers measuring 14.5µm width for ultimate heat retention, tactile softness and continuous seamless drape.",
            silhouette: "Extruded relaxed waist cocoon coat",
            material: "100% Inner Mongolian Baby Cashmere (14.5µm)",
            image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80"
          },
          {
            name: "Full-Grain Calf-Skin Box Shoulder Bag",
            price: "$450 B2B (MSRP $1,800)",
            description: "Finest Italian full-grain box calf leather, double hand-saddle stitched with natural wax finish and solid brushed brass accessories detail.",
            silhouette: "Structured trapezoidal architectural profile",
            material: "Italian Box-Calf Hide with Silt Lining",
            image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80"
          },
          {
            name: "Mulberry Silk-Cashmere Gauze Lightweight Shawl",
            price: "$180 B2B (MSRP $650)",
            description: "Organic hand-spun silk wefted directly into active baby cashmere core yarn. Extremely breathable thermal regulation suitable for all-season European retail boutiques.",
            silhouette: "Translucent featherweight long wrap",
            material: "70% Grade-A Mulberry Silk, 30% Baby Cashmere",
            image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=400&q=80"
          }
        ],
        editorialBlock: {
          title: "From Silk Roads to Modern Showrooms: B2B Direct",
          body: "VECTRA WHOLESALE establishes direct luxury logistics. By replacing noisy trade show tables with quiet, high-integrity digital archives, we provide vetted boutique owners with transparent materials profiles, interactive samples logs, and an elegant multi-step bulk request flow while maintaining strict brand discretion."
        },
        scores: {
          visualTension: 90,
          luxuryFeeling: 98,
          structuralUniqueness: 92,
          brandConsistency: 96,
          whitespaceScore: 90,
          cognitiveNoise: 8,
          typographicHarmony: 96,
          premiumDensity: 28
        },
        brandUnderstanding: {
          luxuryTier: "ultra-luxury",
          materials: ["baby cashmere", "box-calf saddle leather", "mulberry silk", "merino wool"],
          spatialAtmosphere: "Vast minimalist travertine foyer, floating oak tables, diffused golden-warm backlights, and soft linen drapes.",
          silenceRatio: 0.85,
          customerProfile: "Selective boutique buyers and high-luxury retail curation houses"
        },
        designTokens: {
          radius: "3px",
          spacingMax: "gap-16",
          surfaceNoise: 0.02,
          transitionCurve: "cubic-bezier(0.16, 1, 0.3, 1)",
          borderPhilosophy: "hairline"
        },
        theme: {
          fontScale: 1.15,
          imageAspectRatio: "aspect-[3/4]",
          accentVapor: "rgba(155, 126, 93, 0.06)",
          grainDensity: 0.02
        },
        composition: {
          whitespaceScore: 94,
          densityControl: "standard",
          activeComponents: ["wholesaler-portal", "fabric-library", "wholesale-archive", "bulk-inquiry-desk", "order-tracking-wall"]
        },
        critique: "A magnificent example of architectural B2B luxury. By merging traditional silk road values with high-fidelity digital components, a heavy wholesale archive looks as elegant as an art monograph. Deep Saddle Gold accents on raw cream linen colors establish immediate premium trust."
      };
    }

    // 1. Rick Owens obsidian / heavy dark goth style
    if (input.includes("dark") || input.includes("rick") || input.includes("goth") || input.includes("black") || input.includes("noir") || input.includes("obsidian")) {
      return {
        brandName: "KARYX • 漆原",
        slogan: "Sculptural armor for the contemporary nomad.",
        designerVibe: "Dark industrial monolith inspired by John Galliano and Rick Owens' asymmetric drapes.",
        colors: {
          background: "#0A0A0C",
          text: "#FAF9F6",
          accent: "#3A3D40",
          subtle: "#1F2124"
        },
        typography: {
          display: "Space Grotesk",
          body: "JetBrains Mono",
          style: "Brutalist"
        },
        products: [
          {
            name: "Ceramic-Coated Titanium Eyewear",
            price: "$420",
            description: "Laser-cut memory metal finished with a microscopic matte carbon coat.",
            silhouette: "Severe geometric blade",
            material: "Grade 5 Titanium & Industrial Ceramic",
            image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80"
          },
          {
            name: "Distressed Waxed Canvas Parka",
            price: "$820",
            description: "High-density rigid cotton saturated in mineral paraffin and distressed for visual tension.",
            silhouette: "Extruded high neck with unstructured cocoon hem",
            material: "Waxed double-spun canvas",
            image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&q=80"
          },
          {
            name: "Raw Cast-Iron Incense Crucible",
            price: "$180",
            description: "Sand-molded heavy iron basin designed to develop a personalized oxidized patina over time.",
            silhouette: "Monolithic brutalist cup",
            material: "Rough spheroidal cast iron",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
          }
        ],
        editorialBlock: {
          title: "The Architecture of Shadow",
          body: "KARYX rejects superficial embellishments. Our garments are structural shields, drafted as three-dimensional silhouettes that contour the active posture. In bringing this vault to life, we celebrate the extreme tension of carbon-neutral finishes and raw, uncoated metals that bear historical weight."
        },
        scores: {
          visualTension: 96,
          luxuryFeeling: 91,
          structuralUniqueness: 95,
          brandConsistency: 98,
          whitespaceScore: 94,
          cognitiveNoise: 12,
          typographicHarmony: 95,
          premiumDensity: 18
        },
        brandUnderstanding: {
          luxuryTier: "niche-avantgarde",
          materials: ["basalt", "cast iron", "waxed cotton", "titanium"],
          spatialAtmosphere: "Extruded high vaults, solid concrete plinths, and high-frequency dramatic shadow casts.",
          silenceRatio: 0.82,
          customerProfile: "Intellectual avant-garde collector seeking tactile protective monoliths"
        },
        designTokens: {
          radius: "none",
          spacingMax: "gap-24",
          surfaceNoise: 0.04,
          transitionCurve: "cubic-bezier(0.25, 1, 0.5, 1)",
          borderPhilosophy: "ultra-thin"
        },
        theme: {
          fontScale: 1.12,
          imageAspectRatio: "aspect-[3/4]",
          accentVapor: "rgba(58, 61, 64, 0.08)",
          grainDensity: 0.05
        },
        composition: {
          whitespaceScore: 95,
          densityControl: "silent",
          activeComponents: ["cinematic-hero", "material-story", "museum-grid", "luxury-manifesto"]
        },
        critique: "A flawless translation of dark luxury. The combination of Space Grotesk display headings with technical JetBrains Mono achieves excellent industrial friction. The severe color palette instantly commands prestige."
      };
    }

    // 2. Japandi / Ceramic / Tea / Warm Clay Restraint
    if (input.includes("tea") || input.includes("clay") || input.includes("minimalist") || input.includes("organic") || input.includes("ceramic") || input.includes("quiet") || input.includes("linen") || input.includes("wabi")) {
      return {
        brandName: "AMANE • 素泥",
        slogan: "The quiet luxury of organic clay and raw stone.",
        designerVibe: "Warm organic purity with reference to Axel Vervoordt and Miuccia Prada's intellectual restraint.",
        colors: {
          background: "#FAF8F5",
          text: "#1A1B1D",
          accent: "#5C635B",
          subtle: "#EAE7E1"
        },
        typography: {
          display: "Playfair Display",
          body: "Inter",
          style: "Minimalist"
        },
        products: [
          {
            name: "Hand-thrown Coarse Stone Vase",
            price: "$310",
            description: "Individually thrown on a manual kick wheel, left unglazed on the exterior to showcase the natural iron-speckled composition.",
            silhouette: "Sculptural organic gourd",
            material: "Local river-bed clay and iron grain",
            image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80"
          },
          {
            name: "Raw Linen Kimono Overcoat",
            price: "$290",
            description: "Undyed coarse-weave flax featuring dropped shoulder lines and continuous sleeve folding for a fluid, comforting drape.",
            silhouette: "Oversized unstructured drape",
            material: "105% Organic Belgian flax",
            image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80"
          },
          {
            name: "Sand-Blasted Ceramic Tea Set",
            price: "$165",
            description: "A three-piece ritual set characterized by tactile exterior grit and a warm oyster-colored internal glaze.",
            silhouette: "Low curved vessel with hollow center",
            material: "Fired kaolin with native silica grain",
            image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=400&q=80"
          }
        ],
        editorialBlock: {
          title: "In Praise of the Incomplete",
          body: "AMANE honors the silent spaces. We design for environments where shadows drift slowly across coarse linen and unglazed earthenware. Our items are not designed to attract instant focus; they are meant to merge into your daily routine, acquiring character as the natural oils of your skin tint their organic fibers."
        },
        scores: {
          visualTension: 78,
          luxuryFeeling: 95,
          structuralUniqueness: 88,
          brandConsistency: 94,
          whitespaceScore: 96,
          cognitiveNoise: 8,
          typographicHarmony: 97,
          premiumDensity: 15
        },
        brandUnderstanding: {
          luxuryTier: "ultra-luxury",
          materials: ["terracotta", "raw flax", "kaolin clay", "granite sand"],
          spatialAtmosphere: "Textured clay walls, raw timber shelves, and generous open apertures holding natural daylight.",
          silenceRatio: 0.92,
          customerProfile: "Quiet luxury collector curating high-craft domestic artifacts"
        },
        designTokens: {
          radius: "3px",
          spacingMax: "gap-16",
          surfaceNoise: 0.02,
          transitionCurve: "cubic-bezier(0.16, 1, 0.3, 1)",
          borderPhilosophy: "hairline"
        },
        theme: {
          fontScale: 1.18,
          imageAspectRatio: "aspect-[3/4]",
          accentVapor: "rgba(92, 99, 91, 0.05)",
          grainDensity: 0.03
        },
        composition: {
          whitespaceScore: 96,
          densityControl: "silent",
          activeComponents: ["cinematic-hero", "material-story", "museum-grid", "philosophy"]
        },
        critique: "AMANE succeeds brilliantly through quiet luxury. By pairing Playfair Display with soft oyster and muted moss green, the template transcends mass-market lookbooks. The products focus heavily on tactile materiality, which conveys immense premium quality."
      };
    }

    // 3. Cyber / High performance futuristic active
    if (input.includes("tech") || input.includes("futuristic") || input.includes("cyber") || input.includes("carbon") || input.includes("performance") || input.includes("sport") || input.includes("speed")) {
      return {
        brandName: "VORTEX • 极点",
        slogan: "Zero-gravity garments for high-altitude velocity.",
        designerVibe: "Synthetic structural high-performance drapery inspired by Rei Kawakubo and early Demna.",
        colors: {
          background: "#0D0F12",
          text: "#E5E9F0",
          accent: "#8FBCBB",
          subtle: "#1B222C"
        },
        typography: {
          display: "Space Grotesk",
          body: "JetBrains Mono",
          style: "Avant-Garde"
        },
        products: [
          {
            name: "Vacuum-Molded Polar Sunglasses",
            price: "$290",
            description: "Single-lens zero-hinge eyewear crafted from flexible carbon composites that cling to facial geometry.",
            silhouette: "Aerodynamic wraparound blade",
            material: "Polished carbon fiber & UV protect lens",
            image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=400&q=80"
          },
          {
            name: "Liquid Latex Modular Backpack",
            price: "$380",
            description: "Fully seamless waterproof storage container featuring magnetic seal latches and adjustable compression ribbing.",
            silhouette: "Architectural molded shield",
            material: "Reinforced vulcanized rubber & aluminum snaps",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80"
          },
          {
            name: "Asymmetrical Shell Jacket",
            price: "$690",
            description: "Windproof and breathable multi-layer membrane featuring a diagonal storm zipper and anatomical pre-curved sleeves.",
            silhouette: "Asymmetrical sharp angular paneling",
            material: "Three-ply ripstop nylon with PTFE core",
            image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&q=80"
          }
        ],
        editorialBlock: {
          title: "The Kinetic Threshold",
          body: "We do not construct for stillness. VORTEX exists on the boundary between architectural defense and dynamic movement. Each laser-fused seam is scientifically stress-tested to guarantee total structural integrity during high-speed transit. This is performance apparel elevated to severe couture."
        },
        scores: {
          visualTension: 92,
          luxuryFeeling: 85,
          structuralUniqueness: 94,
          brandConsistency: 91,
          whitespaceScore: 90,
          cognitiveNoise: 22,
          typographicHarmony: 93,
          premiumDensity: 25
        },
        brandUnderstanding: {
          luxuryTier: "high-end",
          materials: ["vulcanized rubber", "carbon fibers", "PTFE membrane", "ripstop nylon"],
          spatialAtmosphere: "Anodized aluminum panels, vacuum chamber display tubes, and high-frequency cold neon backlighting.",
          silenceRatio: 0.76,
          customerProfile: "Urban cyber- couture performance technical clothing enthusiast"
        },
        designTokens: {
          radius: "8px",
          spacingMax: "gap-12",
          surfaceNoise: 0.01,
          transitionCurve: "cubic-bezier(0.19, 1, 0.22, 1)",
          borderPhilosophy: "invisible"
        },
        theme: {
          fontScale: 1.15,
          imageAspectRatio: "aspect-[3/4]",
          accentVapor: "rgba(143, 188, 187, 0.06)",
          grainDensity: 0.02
        },
        composition: {
          whitespaceScore: 90,
          densityControl: "standard",
          activeComponents: ["cinematic-hero", "material-story", "museum-grid", "luxury-manifesto"]
        },
        critique: "A highly dynamic and original interface template. The tech-focused metallic gray tones contrast smartly with the neon-like white accents, delivering structural tension. The design positions itself expertly in the futuristic high-luxury streetwear space."
      };
    }

    // Default: Elegant Editorial Luxury
    return {
      brandName: "AÉTHER • 灵动",
      slogan: "Curating light, shadow, and architectural drape.",
      designerVibe: "Post-modern luxury pairing high-contrast indigo highlights with fine architectural structure.",
      colors: {
        background: "#FAF9F6",
        text: "#1A1A1A",
        accent: "#4F46E5",
        subtle: "#E5E7EB"
      },
      typography: {
        display: "Outfit",
        body: "Inter",
        style: "Minimalist"
      },
      products: [
        {
          name: "Silk Sculptural Blazer",
          price: "$950",
          description: "A tailored single-breasted jacket featuring exaggerated padded shoulders and a highly structured waist wrap.",
          silhouette: "Hourglass structured tailoring",
          material: "100% heavy mulberry silk and wool inner core",
          image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Minimalist Brass Helix Earrings",
          price: "$180",
          description: "An elegant spiral jewelry pair made from hand-polished recycled copper and silver plating.",
          silhouette: "Double concentric continuous loop",
          material: "Sterling silver plated solid brass",
          image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Bone White Leather Clutch",
          price: "$520",
          description: "A pristine travel container bound in smooth full-grain calfskin and lined with lush suede.",
          silhouette: "Geometric flat envelop",
          material: "Supple full-grain calf leather & steel zippers",
          image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80"
        }
      ],
      editorialBlock: {
        title: "A Study of Continuous Drapes",
        body: "AÉTHER re-imagines classical romance through the lens of modern minimalism. Our newest collection isolates the shoulder line, extending proportions to form a beautiful silhouette of authority and ease. Elegant lines, flawless seams, and luxurious materials define our visual world."
      },
      scores: {
        visualTension: 88,
        luxuryFeeling: 94,
        structuralUniqueness: 89,
        brandConsistency: 92,
        whitespaceScore: 95,
        cognitiveNoise: 15,
        typographicHarmony: 96,
        premiumDensity: 20
      },
      brandUnderstanding: {
        luxuryTier: "high-end",
        materials: ["mulberry silk", "recycled solid brass", "calf leather", "pure cashmere"],
        spatialAtmosphere: "Pristine white geometric cubes, architectural screens, and bright indirect spotlights.",
        silenceRatio: 0.85,
        customerProfile: "Contemporary designer clothing collector appreciating sculptural silhouttes"
      },
      designTokens: {
        radius: "16px",
        spacingMax: "gap-12",
        surfaceNoise: 0.02,
        transitionCurve: "cubic-bezier(0.16, 1, 0.3, 1)",
        borderPhilosophy: "hairline"
      },
      theme: {
        fontScale: 1.15,
        imageAspectRatio: "aspect-[3/4]",
        accentVapor: "rgba(79, 70, 229, 0.04)",
        grainDensity: 0.02
      },
      composition: {
        whitespaceScore: 95,
        densityControl: "spacious",
        activeComponents: ["cinematic-hero", "material-story", "museum-grid", "luxury-manifesto"]
      },
      critique: "The editorial balance of this template is truly world-class. The Outfit display typography pairs effortlessly with deep indigo pop accents. The brand story creates genuine organic engagement that commands an elite premium pricing model."
    };
  }

  // Dynamic simulation for the local execution trace fallback
  function getEmulatedExecutionTrace(cmd: string) {
    const cleanCmd = (cmd || "").toLowerCase();
    
    let outcomeTitle = "User Directed Pipeline Event Executed";
    let outcomeDesc = "The AI OS parsed the request as a general orchestration instructions. A modular sub-process was loaded inside Sandbox-Node_01, querying the static vector parameters to secure local sandbox compliance.";
    let taskName = "General Orchestration Thread Launch";
    let ramIncrease = "+14 MB";
    let gas = 45000;
    let queriedVectors = ["kernel.core.heuristics"];
    let logsArr = [
      "[0.001ms] CLI_INPUT_INGESTED: Initialized semantic parsing loop",
      "[0.015ms] SYSCALL: Requested context mapping vector db",
      "[0.098ms] COGNITIVE_THREAD: Locked memory cache match search",
      "[0.220ms] SANDBOX_SPINUP: Initialized isolated clean virtual stack Sandbox-Node_01",
      "[1.405ms] RUNTIME: Executed targeted sub-script inside safe boundary",
      "[1.942ms] MEMORY_PERSIST: Syncing state change metrics back to local variables"
    ];

    if (cleanCmd.includes("sandbox") || cleanCmd.includes("isolate") || cleanCmd.includes("security") || cleanCmd.includes("run")) {
      outcomeTitle = "Secure Agent Isolation Sequence Initiated";
      outcomeDesc = "A restricted-permission secure environment was constructed under Sandbox-Node_01 constraints. Network packet injection filter was verified. General execution is bound to 500,000 gas limit quota to prevent recursive LLM loops.";
      taskName = "Agent Code Execution Sandbox Launch";
      ramIncrease = "+64 MB";
      gas = 285400;
      queriedVectors = ["security.sandbox.boundary_policy", "sandbox.packet_filter.rules"];
      logsArr = [
        "[0.001ms] CLI: Ingested task sandbox instructions",
        "[0.008ms] SYSCALL: Loaded sandbox security driver",
        "[0.040ms] DISK_IO: Rendered clean temporary sandbox file directory",
        "[0.110ms] FIREWALL_SECURE: Activating strict tcp/udp outbound filters",
        "[0.550ms] GAS_METER: Attaching gas counter to execution cycles",
        "[2.120ms] RUNTIME: Sandbox Node_01 thread actively running",
        "[3.490ms] CRITICAL: Thread exits with status code 0 (NOMINAL_EXIT)"
      ];
    } else if (cleanCmd.includes("vector") || cleanCmd.includes("search") || cleanCmd.includes("memory") || cleanCmd.includes("concept")) {
      outcomeTitle = "Semantic Vector Re-indexing Triggered";
      outcomeDesc = "Queried the high-dimensional index database. Core heuristics have parsed nearest semantic coordinate matches. Recalculated index weight models to reflect context adjustments.";
      taskName = "Vector Database Indexing & Match Query";
      ramIncrease = "+212 MB";
      gas = 120500;
      queriedVectors = ["vector.indexer.metadata_graph", "agent.memory.session_history"];
      logsArr = [
        "[0.001ms] SEMANTIC_CORE: Requested vector representation search",
        "[0.012ms] VECTORDB: Parallel scanning index shards [Active Coords, 7 elements]",
        "[0.045ms] COSINE_DISTANCE: Calculated closest distance clusters",
        "[0.180ms] THREAD_LOCK: Locked nearest neighbor pointers in memory",
        "[0.485ms] CACHE: Filled cognitive context pool tags"
      ];
    } else if (cleanCmd.includes("scheduler") || cleanCmd.includes("cpu") || cleanCmd.includes("kill") || cleanCmd.includes("restart")) {
      outcomeTitle = "Kernel Scheduler Thread Cycle Allocation Shift";
      outcomeDesc = "Modified resource priorities across active tasks. Core kernel thread scheduler evaluated thread load distributions. Model inference GPU bridges scale gracefully to prevent out-of-memory lockups.";
      taskName = "Process Balancer Optimization Event";
      ramIncrease = "-30 MB (Memory Purge)";
      gas = 12500;
      queriedVectors = ["kernel.core.heuristics", "router.semantic_temperature"];
      logsArr = [
        "[0.001ms] KERNEL: Shift command captured",
        "[0.005ms] BALANCER: Reviewing thread priority coefficients",
        "[0.024ms] SYSTEM: Process state transitions initiated safely",
        "[0.102ms] GC: Forcing immediate Garbage Collection of suspended memory",
        "[0.890ms] CPU: Adjusted load factor. Latency nominal."
      ];
    }

    return {
      status: "SUCCESS",
      logs: logsArr,
      scheduledTask: {
        taskName,
        assignedProcess: "OmniCore-Scheduler-v1",
        gasUsed: gas,
        memoryDelta: ramIncrease
      },
      neuralHits: queriedVectors,
      outcome: {
        title: outcomeTitle,
        description: outcomeDesc,
        vectorUpdate: "Conceptual coordinates updated dynamically in client graph."
      }
    };
  }

  // --- End API Routes ---

  // Handle Vite middleware in development vs static rendering in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("AI RUNTIME OS: Vite development server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("AI RUNTIME OS: Serving production static files from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI RUNTIME OS: Operating Infrastructure booted and listening on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("AI RUNTIME OS: Cold Boot Interrupted Fatal Kernel Error", error);
});
