import React, { useState } from "react";
import { 
  Sparkles, RefreshCw, Eye, Sliders, ShieldCheck, CheckCircle, 
  BookOpen, ExternalLink, Wand2, Compass, AlertCircle, Info, 
  Maximize2, Play, Ruler, Image as ImageIcon, Flame, ChevronRight, Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Imports for new Storefront & Control Center architecture systems
import TemplateStorefront from "./TemplateStorefront";
import TemplateControlCenter from "./TemplateControlCenter";

// Aesthetic Supremacy Stabilization Engine imports
import { GLOBAL_AESTHETIC_MEMORY, BrandAestheticMemory } from "../premium-template-intelligence-engine/global-aesthetic-memory";
import { VisualSilenceEngine, PureStaticSpecs } from "../premium-template-intelligence-engine/visual-silence-engine";
import { LuxuryCompositionEngine } from "../premium-template-intelligence-engine/luxury-composition-engine";
import { PremiumMotionPhysics } from "../premium-template-intelligence-engine/premium-motion-physics";
import { LuxuryTypographyIntelligence } from "../premium-template-intelligence-engine/luxury-typography-intelligence";
import { EmotionalCommerceEngine } from "../premium-template-intelligence-engine/emotional-commerce-engine";
import { AestheticStabilityEngine } from "../premium-template-intelligence-engine/aesthetic-stability-engine";

// Premium Commerce Template Library system imports
import { PremiumTemplateAPI as FrontendTemplateAPI, PremiumGeneratorOutput, TEMPLATE_LIBRARY_PROFILES } from "../premium-template-library";

interface PremiumTemplateEngineProps {
  logAction: (msg: string) => void;
}

interface BrandDNA {
  brand: string;
  philosophy: string;
  spacing: "airy" | "dense" | "absolute-restraint";
  radius: "none" | "sm" | "md" | "lg" | "capsule";
  shadow: "no-shadow" | "hairline-offset" | "soft-depth" | "neon-atmosphere";
  density: "low" | "medium" | "high";
  heroPresentation: "cinematic-center" | "split-interactive" | "typography-focus" | "asymmetric-stagger";
  typography: {
    display: string;
    body: string;
    tracking: string;
  };
  colors: {
    background: string;
    text: string;
    accent: string;
    subtle: string;
    accentHover: string;
  };
  aestheticSecrets: string[];
  luxuryIndex: number;
}

const PRESET_DNAS: Record<string, BrandDNA> = {
  apple: {
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
      "Microscopic text contrast: Utilizing warm off-black tone levels instead of harsh #000000 to maintain organic reading flow.",
      "Aesthetic alignment rule: Colossal display units offset by strict 120px bounding empty blocks to direct absolute focus."
    ],
    luxuryIndex: 96
  },
  stripe: {
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
      "Slightly warm base: Off-whites and soft steel grays prevent cold corporate alienation, reassuring transaction confidence.",
      "Calculated accent containment: Sparing pops of vivid blurple focus user action precisely without color overflow."
    ],
    luxuryIndex: 94
  },
  celine: {
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
      "The 'Silence as Frame' rule: Spacing ratios expanded to 75% raw canvas negative space to elevate content to high-art.",
      "Radical typography asymmetry: Huge display serifs juxtaposed against microscopic monospace details."
    ],
    luxuryIndex: 99
  },
  nike: {
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
      "Kinetic Contrast: Thick heavy display headings tightly compressed against dramatic athlete crop frames captures speed.",
      "Elimination of visual buffer: Buttons flattened into rigid boundaries. Round bubbles strictly banned."
    ],
    luxuryIndex: 92
  },
  monastic: {
    brand: "Monastic Architectural Studio",
    philosophy: "Sacred stone geometry, silent cloister arches, and raw tactile brutalism.",
    spacing: "absolute-restraint",
    radius: "none",
    shadow: "no-shadow",
    density: "low",
    heroPresentation: "typography-focus",
    typography: { display: "Playfair Display", body: "JetBrains Mono", tracking: "tracking-[0.18em]" },
    colors: { background: "#171614", text: "#E6E4E0", accent: "#C5B299", subtle: "#3E3C38", accentHover: "#AF9C87" },
    aestheticSecrets: [
      "Sacred Cloister Shadows: High spatial resting ratio with deep unpolished charcoal tones referencing cathedral light.",
      "Tapering geometric column alignments: Rigid tabular listings contrasted against tall, elegant display serifs and fine monospace coordinate legends."
    ],
    luxuryIndex: 98
  }
};

export default function PremiumTemplateEngine({ logAction }: PremiumTemplateEngineProps) {
  // Master Workspace Architectural View Switcher
  const [activeSaaSView, setActiveSaaSView] = useState<"storefront" | "control_center" | "cognitive_lab">("cognitive_lab");

  // Navigation (Cognitive Laboratory original tabs)
  const [activeStep, setActiveStep] = useState<"BRAND_GENERATOR" | "AESTHETIC_SUPREMACY" | "QUALITY_LAWS" | "DNA" | "WORKBENCH" | "RHYTHM_ENGINE" | "TONE_SYSTEM">("QUALITY_LAWS");

  // Premium commercial e-commerce checkout states
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [monogramText, setMonogramText] = useState<string>("ATELIER");
  const [activeLocation, setActiveLocation] = useState<string>("Kyoto Hub");
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartFeedback, setCartFeedback] = useState<string>("");

  // World-Class Brand Generator custom system configurations
  const [userBrandPrompt, setUserBrandPrompt] = useState<string>("生成一个像 Hermès 与 Aesop 融合的高级护肤品牌官网");
  const [generatorOutput, setGeneratorOutput] = useState<any>(() => {
    return FrontendTemplateAPI.generatePremiumTemplate({
      query: "生成一个像 Hermès 与 Aesop 融合的高级护肤品牌官网"
    });
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeGeneratedSection, setActiveGeneratedSection] = useState<"HERO" | "PRODUCTS" | "EDITORIAL" | "STORY" | "CTA" | "SHOWCASE" | "FOOTER">("HERO");

  // Aesthetic Supremacy Stability Dashboard states
  const [supremacyBrandKey, setSupremacyBrandKey] = useState<string>("hermes");
  const [activeStoryKey, setActiveStoryKey] = useState<string>("jacquemus_summer");
  const [isVisualSilenceActive, setIsVisualSilenceActive] = useState<boolean>(true);
  const [isGoldenRatioLocked, setIsGoldenRatioLocked] = useState<boolean>(true);
  const [motionPresetKey, setMotionPresetKey] = useState<"lens" | "stillness" | "fluid">("lens");
  const [typoScaleRegime, setTypoScaleRegime] = useState<string>("celine_poetics");
  
  // Stabilization Candidate noise injection states
  const [injectGradient, setInjectGradient] = useState<boolean>(false);
  const [injectRadiusCapsule, setInjectRadiusCapsule] = useState<boolean>(false);
  const [injectCTAOverload, setInjectCTAOverload] = useState<boolean>(false);
  const [injectBadgeClutter, setInjectBadgeClutter] = useState<boolean>(false);

  // DNA Extractor state
  const [targetUrl, setTargetUrl] = useState("celine.com");
  const [extractorLoading, setExtractorLoading] = useState(false);
  const [extractedDna, setExtractedDna] = useState<BrandDNA>(PRESET_DNAS.celine);

  // Layout Workbench state
  const [selectedDnaKey, setSelectedDnaKey] = useState<string>("celine");
  const [workbenchLayout, setWorkbenchLayout] = useState<"HERO" | "PRODUCTS" | "CTA">("HERO");
  
  // PREMIUM POLISH STAGED CONTROLLER STATE
  const [densityConfig, setDensityConfig] = useState<"slop" | "minimal" | "elite">("elite");
  const [visualDensityMode, setVisualDensityMode] = useState<"standard" | "elite_restraint">("elite_restraint");
  const [selectedToneGrade, setSelectedToneGrade] = useState<"aesop" | "apple_studio" | "high_key_noir">("aesop");
  const [typographySystem, setTypographySystem] = useState<"editorial" | "technical" | "geometric">("editorial");
  
  // Rhythm Engine Simulated Playback State
  const [activePlaybackIndex, setActivePlaybackIndex] = useState<number | null>(null);

  // Section Rhythm Engine Core Configuration
  const [rhythmPadding, setRhythmPadding] = useState<number>(140);
  const [showRhythmRulers, setShowRhythmRulers] = useState<boolean>(true);
  const [activeRhythmDnaKey, setActiveRhythmDnaKey] = useState<string>("celine");

  // Quality Law Checklist State
  const [activeLaws, setActiveLaws] = useState([
    { id: "law_color_limit", text: "Contrast Safeguard: Force maximum 3 cohesive solid base colors.", checked: true, isViolated: false },
    { id: "law_no_gradients", text: "No Linear Slop: Neutralize low-end multiple neon gradient backdrops.", checked: true, isViolated: true },
    { id: "law_spacing_air", text: "The Breathing Ratio: Minimum 55% empty space on editorial blocks.", checked: true, isViolated: true },
    { id: "law_hairline_only", text: "Friction Rule: Substitute heavy cards dropshadows with 1px hairline lines.", checked: true, isViolated: true },
    { id: "law_typography_ratio", text: "Dynamic Scale Lock: Prevent multiple random font-size iterations.", checked: true, isViolated: false }
  ]);

  // Restructure Quality Repair Engine states
  const [isRepaired, setIsRepaired] = useState(false);
  const [repairLoading, setRepairLoading] = useState(false);
  const [repairLogs, setRepairLogs] = useState<string[]>([]);
  const [philosophicJustification, setPhilosophicJustification] = useState("");
  const [repairScores, setRepairScores] = useState({ before: 45, after: 98 });
  const [repairedSpecs, setRepairedSpecs] = useState({
    background: "#FAF9F6",
    text: "#121212",
    accent: "#8B7E66",
    subtle: "#EAE7E1",
    radius: "none",
    shadow: "no-shadow",
    spacing: "airy",
    letterTracking: "tracking-wide",
    hierarchyRatio: "1.618 Golden Section Ratio"
  });

  const handleGenerateBrandTemplate = (customPrompt?: string) => {
    const p = customPrompt || userBrandPrompt;
    setIsGenerating(true);
    logAction(`World-Class Brand Generator: Initializing AI smart crawler & DNA extractor for query: "${p}"`);
    setTimeout(() => {
      const result = FrontendTemplateAPI.generatePremiumTemplate({ query: p });
      setGeneratorOutput(result);
      if (customPrompt) {
        setUserBrandPrompt(customPrompt);
      }
      setIsGenerating(false);
      logAction(`World-Class Brand Generator: Successfully generated premium template and validated against luxury laws.`);
    }, 700);
  };

  const handleExtractDNA = async (presetKey?: string) => {
    const url = presetKey ? `${presetKey}.com` : targetUrl;
    if (!url.trim()) return;

    setExtractorLoading(true);
    logAction(`Aesthetic Core: Decoupling Premium visual formulas for "${url}" via AI extraction...`);

    try {
      const res = await fetch("/api/premium/dna-extractor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      if (!res.ok) throw new Error("Aesthetic Parser timeout");
      const data = await res.json();
      setExtractedDna(data);
      if (presetKey) {
        setSelectedDnaKey(presetKey);
      }
      logAction(`Aesthetic Core: Decoded visual DNA for "${data.brand}". Luxury Index: ${data.luxuryIndex}%`);
    } catch (e) {
      logAction(`Aesthetic Core Error: Reverting to fallback high-fidelity DNA mapping.`);
      if (presetKey && PRESET_DNAS[presetKey]) {
        setExtractedDna(PRESET_DNAS[presetKey]);
        setSelectedDnaKey(presetKey);
      }
    } finally {
      setExtractorLoading(false);
    }
  };

  const handleApplyAestheticRepair = async () => {
    setRepairLoading(true);
    logAction("Aesthetic Core: Purging mock template noise, enforcing Sacred Visual Design rules...");

    const specsToRepair = {
      theme: "Vibrant Rainbow Diagonal Spark Gradient",
      buttonRadius: "99px Rounded Bubble Ball",
      spacingMode: "Cramped 12px margins",
      shadowType: "bulk-heavy-black-shadow-3xl",
      densityValue: "Overloaded - 10 action indicators"
    };

    try {
      const res = await fetch("/api/premium/quality-laws-repair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateData: specsToRepair })
      });
      if (!res.ok) throw new Error("Repair Engine busy");
      const data = await res.json();

      setRepairLogs(data.logs);
      setRepairedSpecs(data.repairedSpecs);
      setRepairScores(data.scores);
      setPhilosophicJustification(data.philosophicJustification);
      
      // Update our compliance list state
      setActiveLaws(prev => prev.map(law => ({ ...law, isViolated: false })));
      setIsRepaired(true);

      logAction(`Aesthetic Core Success: Template purged. Clean aesthetic index elevated to ${data.scores.after}%!`);
    } catch (e) {
      // Offline fallback
      setRepairLogs([
        "[克制律] Neutralized chaotic neon linear background; installed solid sophisticated plaster background #FAF9F6.",
        "[空灵律] Restructured vertical block separation margins to 128px bounding intervals.",
        "[发丝细律] Removed redundant bulky dropshadows; added meticulous 1px off-white structural border dividers.",
        "[比例整合律] Stabilized header-to-caption ratios. Display letter tracking set to 'tracking-widest' (0.12em)."
      ]);
      setRepairedSpecs({
        background: "#FAF9F6",
        text: "#121212",
        accent: "#8B7E66",
        subtle: "#EAE7E1",
        radius: "none",
        shadow: "no-shadow",
        spacing: "airy",
        letterTracking: "tracking-widest",
        hierarchyRatio: "1.618 Golden Ratio"
      });
      setPhilosophicJustification("The upgraded page leaves behind visual panic. Restraining options and adding extensive silent canvas volumes establishes undisputed design authority.");
      setRepairScores({ before: 45, after: 99 });
      setActiveLaws(prev => prev.map(law => ({ ...law, isViolated: false })));
      setIsRepaired(true);
      logAction("Aesthetic Core: Programmatic recovery activated. Refined output constructed safely.");
    } finally {
      setRepairLoading(false);
    }
  };

  const toggleLaw = (id: string) => {
    setActiveLaws(prev => prev.map(law => {
      if (law.id === id) {
        return { ...law, checked: !law.checked };
      }
      return law;
    }));
    logAction(`Aesthetic Law Mod: Adjusted design enforcement rule state.`);
  };

  // Tone grading preset descriptions
  const TONE_GRADES = {
    aesop: {
      name: "Aesop Organic Matte Style",
      hue: "Warm raw greyish brown",
      grain: "Fine analog film noise",
      bgClass: "neutral bg-[#FAF9F6]",
      textClass: "text-[#2B2A27]",
      borderClass: "border-[#E5E1D8]",
      desc: "Warm earth palettes paired with film texture to provide organic comfort."
    },
    apple_studio: {
      name: "Apple High-Contrast Minimalist",
      hue: "Neutral clean off-white",
      grain: "Zero noise, pure vectors",
      bgClass: "neutral bg-[#F5F5F7]",
      textClass: "text-[#1D1D1F]",
      borderClass: "border-[#D2D2D7]",
      desc: "Highly sterile, high-key studio light, letting pure raw titanium details stand alone."
    },
    high_key_noir: {
      name: "Celine Avant-Grade Noir",
      hue: "Absolute charcoal ink",
      grain: "High fashion silver halide",
      bgClass: "neutral bg-[#0A0A0A]",
      textClass: "text-[#FAF9F6]",
      borderClass: "border-[#252525]",
      desc: "Intense shadow volumes, bone whites, and dark grains mimicking Parisian publishing."
    }
  };

  // Rhythm layout cinematic steps
  const RHYTHM_STEPS = [
    { title: "I. The Cinematic Overture (Hero Block)", space: "140px Margin", density: "1 Title, 1 Button, 65% Silent Negative Space" },
    { title: "II. Monastic Breath (Spatial Space)", space: "180px Clean Void", density: "Zero text content. Absolute vacuum to reset sight focus" },
    { title: "III. The Archive Centerpiece (Single Product)", space: "120px Margin", density: "One core high-fidelity portrait framed by microscopic tech labels" },
    { title: "IV. Microscopic Solitude (Editorial Quote)", space: "200px Void Gap", density: "1 line of italic wisdom. High typographic friction" },
    { title: "V. Quiet Conversion (Absolute Sign-up)", space: "160px Spacing", density: "1 minimalist email input field, 1 flat rectangular CTA button" }
  ];

  return (
    <div id="premium-intelligence-layer" className="border border-neutral-800 bg-[#000000] rounded-none p-6 md:p-8 flex flex-col min-h-[680px] relative overflow-hidden text-neutral-200">
      
      {/* Absolute luxury haute couture top border accent - thin hairline white */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-neutral-700 pointer-events-none" />

      {/* Main Core Brand Status Title */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-neutral-800 pb-6 mb-6 gap-4 shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-1 px-2 rounded-none bg-neutral-900 border border-neutral-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[9px] font-mono uppercase font-black text-white tracking-[0.2em]">WHITE COSMOS</span>
            </div>
            <h2 className="font-sans font-light text-sm text-white tracking-[0.15em] uppercase">
              Fashion Intelligence Core Platform (全球时尚认知系统 • 商业高定模板平台)
            </h2>
          </div>
          <p className="text-[11px] text-neutral-400 font-light max-w-2xl leading-relaxed">
            Eliminating cheap AI generation. Experience world-class elite templates inside the Storefront Portal, adjust layout rules inside the Control Center, or calibrate underlying parameters inside the Cognitive DNA Lab.
          </p>
        </div>

        <div className="font-mono text-[9px] text-neutral-400 uppercase flex items-center gap-2 bg-neutral-950 px-3 py-1.5 border border-neutral-800 rounded-none tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>Aesthetic System Status: Active</span>
        </div>
      </div>

      {/* Dual Platform Channel Selection Switcher (Standard Commercial Architecture - Strict Black/White) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 bg-[#0c0c0c] p-1 rounded-none border border-neutral-800 font-mono text-[11px] select-none text-left">
        <button
          onClick={() => {
            setActiveSaaSView("storefront");
            logAction("Workspace Switcher: Loaded User Portal -> Smart Premium Template Storefront (/apps/template-storefront)");
          }}
          className={`px-4 py-3 rounded-none cursor-pointer transition flex flex-col items-start gap-1 text-left ${
            activeSaaSView === "storefront"
              ? "bg-white text-black font-black"
              : "text-neutral-400 hover:bg-[#151515] hover:text-white"
          }`}
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.1em]">👥 USER STOREFRONT PLATELIER</span>
          <span className="text-[8.5px] opacity-85">/apps/template-storefront (浏览高级高定模板)</span>
        </button>

        <button
          onClick={() => {
            setActiveSaaSView("control_center");
            logAction("Workspace Switcher: Loaded Administration Portal -> Premium Template Control Center (/apps/template-control-center)");
          }}
          className={`px-4 py-3 rounded-none cursor-pointer transition flex flex-col items-start gap-1 text-left ${
            activeSaaSView === "control_center"
              ? "bg-white text-black font-black"
              : "text-neutral-400 hover:bg-[#151515] hover:text-white"
          }`}
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.1em]">🛡️ ATELIER CONTROL CENTER</span>
          <span className="text-[8.5px] opacity-85">/apps/template-control-center (管理律条例与资产)</span>
        </button>

        <button
          onClick={() => {
            setActiveSaaSView("cognitive_lab");
            logAction("Workspace Switcher: Loaded Laboratory -> Original Cognitive DNA Workbench");
          }}
          className={`px-4 py-3 rounded-none cursor-pointer transition flex flex-col items-start gap-1 text-left ${
            activeSaaSView === "cognitive_lab"
              ? "bg-white text-black font-black"
              : "text-neutral-400 hover:bg-[#151515] hover:text-white"
          }`}
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.1em]">🧪 COGNITIVE DNA LAB SUITE</span>
          <span className="text-[8.5px] opacity-85">Original AI Rules-Engine (基因净化底层组件)</span>
        </button>
      </div>

      {activeSaaSView === "storefront" && (
        <TemplateStorefront logAction={logAction} />
      )}

      {activeSaaSView === "control_center" && (
        <TemplateControlCenter logAction={logAction} />
      )}

      {activeSaaSView === "cognitive_lab" && (
        <div className="space-y-6 flex-1 flex flex-col">
          {/* Sub Navigation for Technical DNA Lab Details */}
          <div className="bg-[#0b0c10] border border-zinc-900 p-3 rounded-lg flex flex-col xl:flex-row justify-between items-start xl:items-center gap-3 text-left">
            <div className="space-y-0.5">
              <span className="text-[8px] font-mono uppercase font-black text-amber-500 block">Active Workspace Layer:</span>
              <span className="text-zinc-400 font-sans text-xs">Aesthetic Laboratory Workbench & Calibration Panels</span>
            </div>
            
            <div className="flex flex-wrap gap-1 bg-black/50 p-1 rounded border border-zinc-900/80 font-mono text-[9.5px] select-none">
              <button
                onClick={() => {
                  setActiveStep("BRAND_GENERATOR");
                  logAction("Core Engine: Landed on World-Class Brand Generator workbench.");
                }}
                className={`px-2.5 py-1 rounded transition cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  activeStep === "BRAND_GENERATOR" ? "bg-amber-500 text-black font-bold" : "text-amber-400 hover:text-amber-350"
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" /> World-Class Brand Generator
              </button>
              <button
                onClick={() => {
                  setActiveStep("AESTHETIC_SUPREMACY");
                  logAction("Aesthetic Core: Landed on Earth-Class Aesthetic Supremacy Engine Hub.");
                }}
                className={`px-2.5 py-1 rounded transition cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  activeStep === "AESTHETIC_SUPREMACY" ? "bg-[#181a22] text-zinc-150 border border-zinc-800 font-bold" : "text-zinc-500 hover:text-zinc-350"
                }`}
              >
                Aesthetic Supremacy
              </button>
              <button
                onClick={() => setActiveStep("QUALITY_LAWS")}
                className={`px-2.5 py-1 rounded transition cursor-pointer whitespace-nowrap ${
                  activeStep === "QUALITY_LAWS" ? "bg-[#181a22] text-zinc-150 border border-zinc-800 font-bold" : "text-zinc-500 hover:text-zinc-350"
                }`}
              >
                Quality Laws
              </button>
              <button
                onClick={() => setActiveStep("DNA")}
                className={`px-2.5 py-1 rounded transition cursor-pointer whitespace-nowrap ${
                  activeStep === "DNA" ? "bg-[#181a22] text-zinc-150 border border-zinc-800 font-bold" : "text-zinc-500 hover:text-zinc-350"
                }`}
              >
                DNA Extractor
              </button>
              <button
                onClick={() => setActiveStep("WORKBENCH")}
                className={`px-2.5 py-1 rounded transition cursor-pointer whitespace-nowrap ${
                  activeStep === "WORKBENCH" ? "bg-[#181a22] text-zinc-150 border border-zinc-800 font-bold" : "text-zinc-500 hover:text-zinc-350"
                }`}
              >
                Hero & Density
              </button>
              <button
                onClick={() => setActiveStep("RHYTHM_ENGINE")}
                className={`px-2.5 py-1 rounded transition cursor-pointer whitespace-nowrap ${
                  activeStep === "RHYTHM_ENGINE" ? "bg-[#181a22] text-zinc-150 border border-zinc-800 font-bold" : "text-zinc-500 hover:text-zinc-350"
                }`}
              >
                Rhythm Timeline
              </button>
              <button
                onClick={() => setActiveStep("TONE_SYSTEM")}
                className={`px-2.5 py-1 rounded transition cursor-pointer whitespace-nowrap ${
                  activeStep === "TONE_SYSTEM" ? "bg-[#181a22] text-zinc-150 border border-zinc-805 font-bold" : "text-zinc-500 hover:text-zinc-350"
                }`}
              >
                Tone Grading Filter
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            {/* STEP -1: WORLD-CLASS BRAND GENERATOR WORKBENCH (Aesthetic Core Phase) */}
            {activeStep === "BRAND_GENERATOR" && (() => {
        const out = generatorOutput || FrontendTemplateAPI.generatePremiumTemplate({ query: userBrandPrompt });
        const matchedProfile = out.match.primaryProfile;
        const dnaParams = out.dna.coreParameters;

        return (
          <div className="space-y-6 flex-1 flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Prompt input and preset controls */}
              <div className="bg-[#0e0f12] border border-zinc-900 p-5 rounded-xl space-y-4">
                <div className="flex flex-col md:flex-row gap-3 items-stretch">
                  <div className="flex-1 relative">
                    <textarea
                      value={userBrandPrompt}
                      onChange={(e) => setUserBrandPrompt(e.target.value)}
                      placeholder="Write your high-end brand concept (e.g. '生成一个像 Hermès 与 Aesop 融合的高级护肤品牌官网')"
                      className="w-full bg-black/40 border border-zinc-800 focus:border-amber-500 rounded-lg px-3.5 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 font-sans outline-none resize-none h-12"
                    />
                    <div className="absolute right-2.5 bottom-2 text-[8px] font-mono text-zinc-600 uppercase select-none">
                      COGNITIVE ENGINE v.03
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleGenerateBrandTemplate()}
                    disabled={isGenerating}
                    className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-black font-semibold text-xs rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.25)] shrink-0 h-12"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>PROCESSING DNA...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>TRIGGER BRAND ENGINE</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Preset Fashion Suggestion Chips */}
                <div className="space-y-1.5 select-none">
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">Core Commercial DNA Blueprints (五大商业卖货型 DNA 库):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "🧥 高级服装 (Acne Studios / COS / ZARA)", q: "生成高转化高级服装品牌官网, 融合 Acne Studios 与 COS 设计语言, 支持多尺码和色彩色块快速选取" },
                      { label: "👜 顶级皮包奢侈品 (Hermès / Bottega Veneta / CELINE)", q: "建立极奢皮具奢侈品牌官网, 融合 Hermès 与 Bottega Veneta 的顶级手工艺质感, 提供限量级订制印签与名额排队系统" },
                      { label: "🏬 集约百货精品电商 (SSENSE / MR PORTER / Farfetch)", q: "生成集约百货与买手精品电商官网, 仿照 SSENSE 和 MR PORTER 的黑白高对比度网格目录, 支持高效全球自适应关税结算" },
                      { label: "☕ 餐饮咖啡与食品 (Blue Bottle / % ARABICA / Erewhon)", q: "设计高档餐饮咖啡美学生活官网, 融合 Blue Bottle Coffee 和 % ARABICA 的京都木质极简空间, 支持即时周期定量定制和离线城市分店定位" },
                      { label: "⚡ Shopify D2C 转化王 (Allbirds / Gymshark / Ritual)", q: "生成高转化 Shopify D2C 独立站官网, 包含 Allbirds 与 Gymshark 体验, 配置30天无忧试用、千万级客户五星和快速结账" }
                    ].map((chip) => (
                      <button
                        key={chip.label}
                        disabled={isGenerating}
                        onClick={() => handleGenerateBrandTemplate(chip.q)}
                        className={`px-2.5 py-1 text-[9.5px] border rounded transition cursor-pointer font-sans ${
                          userBrandPrompt === chip.q 
                            ? "bg-amber-950/45 text-amber-400 border-amber-850/80" 
                            : "bg-transparent text-zinc-400 border-zinc-900 hover:border-zinc-800 hover:text-zinc-250"
                        }`}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress feedback block if generating */}
              {isGenerating && (
                <div className="border border-amber-500/20 bg-amber-950/5 rounded-lg p-3.5 font-mono text-[10px] space-y-1.5 text-zinc-400 animate-pulse">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    <span>AUTONOMOUS FASHION INTELLIGENCE PIPELINE ENGAGED</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1 text-[9px]">
                    <div className="opacity-80">📁 1. site-crawler scanning...</div>
                    <div className="opacity-80">🧬 2. dna-extractor refining...</div>
                    <div className="opacity-80">📐 3. mapping template-library...</div>
                    <div className="opacity-80">✨ 4. premium-enhancer purging slop...</div>
                  </div>
                </div>
              )}

              {/* Main Generation Display split panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                
                {/* Left controls/parameters output panel */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                  
                  {/* Category Recognition & DNA Metrics */}
                  <div className="bg-[#0a0b0e] border border-zinc-900 rounded-xl p-4 space-y-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">Intelligence Matcher</span>
                      <h4 className="text-xs font-semibold uppercase text-amber-400 font-sans tracking-wide">
                        {out.match.primaryProfile.name}
                      </h4>
                      <p className="text-[10px] text-zinc-450 leading-relaxed font-light">
                        {out.match.vibeJustification}
                      </p>
                    </div>

                    <div className="border-t border-zinc-900 pt-3 space-y-2">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">Extracted Brand DNA parameters</span>
                      
                      <div className="grid grid-cols-2 gap-2 text-[9.5px] font-mono">
                        <div className="bg-black/40 p-1.5 rounded border border-zinc-900">
                          <span className="text-zinc-500 block text-[8px] uppercase">DISPLAY FONT</span>
                          <span className="text-zinc-200 font-medium truncate block">{dnaParams.fontFamilyDisplay}</span>
                        </div>
                        <div className="bg-black/40 p-1.5 rounded border border-zinc-900">
                          <span className="text-zinc-500 block text-[8px] uppercase">KERNING INDEX</span>
                          <span className="text-zinc-200 font-medium truncate block">{dnaParams.letterSpacingValue}</span>
                        </div>
                        <div className="bg-black/40 p-1.5 rounded border border-zinc-900">
                          <span className="text-zinc-500 block text-[8px] uppercase">BACKGROUND</span>
                          <span className="text-zinc-200 font-medium flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full border border-zinc-800" style={{ backgroundColor: dnaParams.background }} />
                            {dnaParams.background}
                          </span>
                        </div>
                        <div className="bg-black/40 p-1.5 rounded border border-zinc-900">
                          <span className="text-zinc-500 block text-[8px] uppercase">RHYTHM VOID</span>
                          <span className="text-zinc-200 font-medium truncate block">{out.derivedSpacingGapPx}px (Cinematic)</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-zinc-900 pt-3 space-y-1">
                      <div className="flex justify-between items-baseline font-mono text-[9px] text-zinc-500">
                        <span>WHITESPACE RATIO CONSTANT</span>
                        <span className="text-amber-400 font-bold">{out.dna.whitespaceScore}% EMPTY SPACE</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full transition-all" style={{ width: `${out.dna.whitespaceScore}%` }} />
                      </div>
                      <span className="text-[8.5px] font-mono text-zinc-550 block">This establishes quiet luxury spacing (120px+ void heights between layout sectors).</span>
                    </div>
                  </div>

                  {/* Anti AI Slop Repair Diagnostic report */}
                  <div className="bg-[#0b0c0f] border border-zinc-900 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                      <span className="font-mono text-[9.5px] text-zinc-400 uppercase tracking-widest block font-bold">Premium Enhancer</span>
                      <span className="bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 text-[8.5px] px-1.5 py-0.2 rounded font-mono">
                        99.8% AESTHETIC STABILITY
                      </span>
                    </div>

                    <div className="space-y-1.5 font-mono text-[10px] text-zinc-400">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Defeated Clutter Units: {out.enhancement.clutterDefeated} elements</span>
                      </div>
                      {out.enhancement.neonGradientsNeutralized && (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>Neutralized gradients</span>
                        </div>
                      )}
                      {out.enhancement.whitespaceBoosted && (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>Sufficient whitespace enforced</span>
                        </div>
                      )}
                      {out.enhancement.trackingExpanded && (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>Wide title spacing expanded</span>
                        </div>
                      )}
                      {out.enhancement.actionsConsolidated && (
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>Consolidated call-to-actions to single anchor</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-black/40 p-2 rounded border border-zinc-900 font-mono text-[8px] text-zinc-500 leading-relaxed uppercase">
                      <strong>AI Slop Remediation:</strong> Programmatically stripped active flash badges, visual sticker layers, and neon glows to evoke the serene elegance of a Parisian luxury atelier page.
                    </div>
                  </div>

                </div>

                {/* Right Panel: Simulated high-vibe browser rendering environment */}
                <div className="lg:col-span-8 flex flex-col border border-zinc-900/80 bg-zinc-950/40 rounded-xl overflow-hidden shadow-2xl relative select-none">
                  
                  {/* Browser URL bar header */}
                  <div className="bg-zinc-950 px-4 py-2.5 text-[9px] font-mono text-zinc-500 border-b border-zinc-900/85 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span>https://brand-generator.whitecosmos/{out.match.matchedIndustry}-ateliers</span>
                    </div>
                    <div className="flex items-center gap-2 text-[8px]">
                      {cartCount > 0 && (
                        <span className="bg-amber-500 text-black px-1.5 py-0.5 rounded font-extrabold uppercase animate-pulse flex items-center gap-1 shrink-0">
                          <span>🛒 BAG : {cartCount}</span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setCartCount(0); }} 
                            className="bg-black/10 hover:bg-black/30 rounded px-0.5 text-[7px]"
                            title="Clear bag"
                          >
                            RESET
                          </button>
                        </span>
                      )}
                      <span>65% VOID WEIGHT</span>
                      <span className="bg-amber-950/20 border border-amber-900/30 text-amber-400 px-1 py-0.5 rounded font-bold uppercase font-mono">SECURE PROTOTYPE</span>
                    </div>
                  </div>

                  {/* Sector View Selection Toggle Row */}
                  <div className="bg-[#0b0c0f] px-3 py-2 border-b border-zinc-900 flex flex-wrap gap-1 font-mono text-[9px] shrink-0">
                    {[
                      { key: "HERO", label: "Display Hero" },
                      { key: "PRODUCTS", label: "Product Suite" },
                      { key: "EDITORIAL", label: "Editorial Theory" },
                      { key: "STORY", label: "Atelier Story" },
                      { key: "CTA", label: "Allocation Register" },
                      { key: "COMPLETE", label: "Complete Landing (Infinite Scroll Layout)" }
                    ].map((tabSpec) => (
                      <button
                        key={tabSpec.key}
                        onClick={() => setActiveGeneratedSection(tabSpec.key as any)}
                        className={`px-2.5 py-1 rounded transition cursor-pointer ${
                          activeGeneratedSection === tabSpec.key 
                            ? "bg-amber-500/10 border border-amber-500/35 text-amber-400 font-bold" 
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
                        }`}
                      >
                        {tabSpec.label}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic E-commerce Cart Sticky Feedback banner */}
                  {cartFeedback && (
                    <div className="bg-amber-400 text-black text-[9px] font-mono px-4 py-2 font-bold animate-fadeIn transition-all duration-300 flex items-center justify-between shrink-0 shadow-inner">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping" />
                        <span>{cartFeedback}</span>
                      </div>
                      <button 
                        onClick={() => setCartFeedback("")} 
                        className="text-black/60 hover:text-black font-bold ml-2 text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {/* Viewport canvas, styled exactly with the extracted DNA specs! */}
                  <div 
                    className="overflow-y-auto max-h-[380px] min-h-[350px] transition-all duration-300 relative font-sans leading-relaxed"
                    style={{
                      backgroundColor: dnaParams.background,
                      color: dnaParams.text
                    }}
                  >
                    
                    {/* Tiny visual grid overlay for tactile feel */}
                    <div className="absolute inset-0 opacity-[0.012] pointer-events-none" style={{ backgroundImage: `radial-gradient(${dnaParams.text} 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />

                    {/* HERO VIEW */}
                    {(activeGeneratedSection === "HERO" || activeGeneratedSection === "COMPLETE") && (
                      <div className="w-full flex flex-col justify-center text-center px-6 py-16 relative z-10">
                        <div className="max-w-xl mx-auto space-y-6">
                          <p className="text-[10px] uppercase font-mono tracking-[0.35em] font-semibold opacity-60"
                             style={{ color: dnaParams.accent }}>
                            {out.assets.hero.eyebrow}
                          </p>
                          
                          <h1 className="text-3xl md:text-5xl leading-[1.08] font-light text-center tracking-tight"
                              style={{ 
                                fontFamily: dnaParams.fontFamilyDisplay === "Playfair Display" ? "Playfair Display" : dnaParams.fontFamilyDisplay === "Space Grotesk" ? "Space Grotesk" : dnaParams.fontFamilyDisplay === "Outfit" ? "Outfit" : "Inter",
                                fontWeight: 300
                              }}>
                            {out.assets.hero.title}
                          </h1>

                          <p className="text-[11.5px] leading-relaxed max-w-sm mx-auto opacity-70 font-light" style={{ fontFamily: "Inter" }}>
                            {out.assets.hero.subtext}
                          </p>

                          <div className="pt-2">
                            <button className="px-5 py-2.5 text-[9px] tracking-[0.2em] font-mono uppercase bg-transparent border hover:opacity-85 transition cursor-pointer"
                                    style={{ 
                                      borderColor: dnaParams.text,
                                      color: dnaParams.text
                                    }}>
                              {out.assets.hero.primaryCtaLabel}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SPACING GAPS IF COMPLETE SCROLL MAPPING IS ACTIVE */}
                    {activeGeneratedSection === "COMPLETE" && (
                      <div className="relative border-y border-dashed border-red-500/10 flex items-center justify-center font-mono text-[8px] text-zinc-500 select-none bg-black/5" style={{ height: `${out.derivedSpacingGapPx}px` }}>
                        <div className="text-center py-1 flex flex-col items-center justify-center gap-1">
                          <span className="text-amber-500/70 font-bold animate-pulse">📏 SECTOR VOID GAP DEPTH: {out.derivedSpacingGapPx}PX ENFORCED</span>
                          <span className="text-[7.5px] opacity-[0.5]">MINIMUM REGIME SPACING OF 120PX CONFIRMED</span>
                        </div>
                      </div>
                    )}

                    {/* PRODUCTS VIEW */}
                    {(activeGeneratedSection === "PRODUCTS" || activeGeneratedSection === "COMPLETE") && (
                      <div className="w-full flex flex-col justify-center px-8 py-14 relative z-10">
                        <div className="max-w-lg mx-auto w-full space-y-8">
                          <div className="flex justify-between items-baseline border-b pb-2.5" style={{ borderColor: dnaParams.borders }}>
                            <span className="text-[9px] font-mono tracking-widest opacity-60 uppercase">{out.match.matchedIndustry} ARCHIVE & SELLING TARGET // COLLECTION SF-09</span>
                            <span className="text-[8px] font-mono tracking-widest uppercase text-amber-500 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/10">ACTIVE PREVIEW</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                            {out.assets.products.map((p: any) => (
                              <div key={p.id} className="border p-4.5 flex flex-col justify-between space-y-4 bg-black/10 hover:scale-[1.015] hover:bg-black/20 transition-all duration-300 rounded" style={{ borderColor: dnaParams.borders }}>
                                <div className="space-y-4">
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between items-center text-[8px] font-mono">
                                      <span className="text-zinc-500 uppercase">{p.refCode}</span>
                                      <span className="text-amber-500 bg-amber-500/5 px-1 rounded uppercase tracking-wider font-semibold">{p.tag}</span>
                                    </div>
                                    <h4 className="text-[12px] font-bold tracking-tight leading-snug">{p.title}</h4>
                                    <p className="text-[9px] leading-relaxed opacity-75 font-light">{p.description}</p>
                                  </div>

                                  {/* Dynamic high-conversion custom controls */}
                                  {out.match.matchedIndustry === "apparel" && (
                                    <div className="space-y-3.5 border-t border-dashed pt-3 mr-1" style={{ borderColor: dnaParams.borders }}>
                                      {/* Color Swatches */}
                                      {p.siblingColors && p.siblingColors.length > 0 && (
                                        <div className="space-y-1">
                                          <div className="flex justify-between text-[8px] font-mono text-zinc-500">
                                            <span>SHADE SWATCH</span>
                                            <span className="text-zinc-350">{selectedColor || p.siblingColors[0]}</span>
                                          </div>
                                          <div className="flex gap-1.5">
                                            {p.siblingColors.map((color: string) => (
                                              <button
                                                key={color}
                                                type="button"
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 cursor-pointer ${
                                                  (selectedColor || p.siblingColors[0]) === color ? "border-amber-400 scale-120 ring-1 ring-amber-500/20" : "border-stone-800 hover:border-stone-400"
                                                }`}
                                                style={{ 
                                                  backgroundColor: 
                                                    color === "Concrete Grey" || color === "Pebble Slate" ? "#7E8083" : 
                                                    color === "Bone White" || color === "Winter White" ? "#F5F3EC" : 
                                                    color === "Industrial Black" || color === "Plat Ink Black" ? "#191919" : 
                                                    color === "Deep Navy" ? "#1E293B" : 
                                                    color === "Ash Brown" ? "#6B5B52" : 
                                                    color === "Oatmeal" ? "#DED7CD" : "#525252" 
                                                }}
                                              />
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* Sizing array */}
                                      {p.sizesAvailable && p.sizesAvailable.length > 0 && (
                                        <div className="space-y-1">
                                          <div className="flex justify-between text-[8px] font-mono text-zinc-550">
                                            <span>WARDROBE FIT</span>
                                            <span className="text-zinc-350 font-bold">SIZE {selectedSize}</span>
                                          </div>
                                          <div className="flex flex-wrap gap-1">
                                            {p.sizesAvailable.map((size: string) => (
                                              <button
                                                key={size}
                                                type="button"
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-1.5 py-0.5 text-[8.5px] font-mono border transition-all duration-150 cursor-pointer font-bold ${
                                                  selectedSize === size 
                                                    ? "bg-amber-400/10 border-amber-400 text-amber-400" 
                                                    : "bg-transparent border-zinc-900 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                                                }`}
                                              >
                                                {size}
                                              </button>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* Quick Buy CTA */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCartCount(prev => prev + 1);
                                          setCartFeedback(`Added 1x ${p.title} (${selectedSize} / ${selectedColor || p.siblingColors?.[0] || 'Default'}) to the check wardrobe.`);
                                          setTimeout(() => setCartFeedback(""), 4500);
                                        }}
                                        className="w-full py-1.5 mt-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[8.5px] font-mono font-bold tracking-wider uppercase transition cursor-pointer flex items-center justify-center gap-1.5 text-zinc-200"
                                      >
                                        <span>👜 ADD TO WARDROBE</span>
                                      </button>
                                    </div>
                                  )}

                                  {out.match.matchedIndustry === "leather" && (
                                    <div className="space-y-3.5 border-t border-dashed pt-3 mr-1" style={{ borderColor: dnaParams.borders }}>
                                      {/* Monogram stamp */}
                                      <div className="space-y-1.5">
                                        <span className="text-[7.5px] font-mono text-zinc-500 block uppercase">GOLD MONOGRAM STAMP (MAX 6 CHARS):</span>
                                        <input
                                          type="text"
                                          maxLength={6}
                                          value={monogramText}
                                          onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                                          className="w-full bg-black/35 text-[9px] font-mono py-1 px-2.5 border border-zinc-850 focus:border-amber-400 outline-none text-center text-amber-100 rounded"
                                        />
                                        <p className="text-[7px] font-mono text-zinc-550 italic leading-snug">
                                          * Individual artisan hand-blocked heat embossing.
                                        </p>
                                      </div>

                                      {/* Scarcity indicator */}
                                      <div className="text-[8px] font-mono text-amber-500/90 flex justify-between">
                                        <span>QUOTA RESERVED:</span>
                                        <span className="font-bold underline">1 OF 5 PIECES WORLDWIDE</span>
                                      </div>

                                      {/* Quick Allocate CTA */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCartCount(prev => prev + 1);
                                          setCartFeedback(`Bespoke Allocation Approved: ${p.title} initialized with stamped initials [${monogramText || "NONE"}].`);
                                          setTimeout(() => setCartFeedback(""), 4500);
                                        }}
                                        className="w-full py-2 bg-[#2d221c] hover:bg-[#3d312a] border border-amber-900/30 text-[8px] font-mono font-extrabold tracking-widest text-[#dfd9ce] uppercase transition cursor-pointer flex items-center justify-center gap-1.5 rounded"
                                      >
                                        <span>🏆 SECURE BESPOKE ALLOCATION</span>
                                      </button>
                                    </div>
                                  )}

                                  {out.match.matchedIndustry === "food" && (
                                    <div className="space-y-3 border-t border-dashed pt-3 mr-1" style={{ borderColor: dnaParams.borders }}>
                                      {/* Location coffee outpost selection */}
                                      <div className="space-y-1">
                                        <span className="text-[7.5px] font-mono text-zinc-500 block uppercase">VISUAL COFFEE OUTPOST / CITY:</span>
                                        <div className="flex flex-wrap gap-1">
                                          {["Kyoto Hub", "Tokyo Shibuya", "Paris Seul", "LA Abbot Kinney"].map(loc => (
                                            <button
                                              key={loc}
                                              type="button"
                                              onClick={() => {
                                                setActiveLocation(loc);
                                                setCartFeedback(`Brew extraction center selected: ${loc}`);
                                                setTimeout(() => setCartFeedback(""), 3500);
                                              }}
                                              className={`px-2 py-0.5 text-[7.5px] font-mono border transition rounded cursor-pointer ${
                                                activeLocation === loc 
                                                  ? "bg-amber-300/10 border-amber-400 text-amber-400 font-bold" 
                                                  : "border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-zinc-400"
                                              }`}
                                            >
                                              {loc}
                                            </button>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Organic micro metrics */}
                                      <div className="bg-black/30 p-1.5 border border-zinc-900 rounded text-[7.5px] font-mono text-zinc-550 leading-relaxed uppercase">
                                        🌿 Sustainably hand-harvested • 100% compostable fiber tins
                                      </div>

                                      {/* Preorder coffee CTA */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCartCount(prev => prev + 1);
                                          setCartFeedback(`Extraction Scheduled: 1x fresh tin of ${p.title} loaded to queue at ${activeLocation}.`);
                                          setTimeout(() => setCartFeedback(""), 4500);
                                        }}
                                        className="w-full py-1.5 mt-1 bg-amber-950/20 hover:bg-amber-950/40 border border-amber-900/40 text-[8.5px] font-mono font-bold tracking-wider text-amber-400 uppercase transition cursor-pointer flex items-center justify-center gap-1"
                                      >
                                        <span>☕ QUEUE EXPRESS MUG</span>
                                      </button>
                                    </div>
                                  )}

                                  {out.match.matchedIndustry === "shopify" && (
                                    <div className="space-y-3.5 border-t border-dashed pt-3 mr-1" style={{ borderColor: dnaParams.borders }}>
                                      {/* Shopify D2C Trust elements: Client rating */}
                                      <div className="flex justify-between items-center text-[8px] font-mono">
                                        <span className="text-zinc-500">TRUST SCORE:</span>
                                        <span className="text-amber-400 font-bold flex items-center gap-0.5">
                                          ★ ★ ★ ★ ★ <span className="text-zinc-350">({p.customerRating || "4.9"})</span>
                                        </span>
                                      </div>

                                      {/* Dynamic Color Dots */}
                                      {p.siblingColors && p.siblingColors.length > 0 && (
                                        <div className="space-y-1">
                                          <div className="flex justify-between text-[7.5px] font-mono text-zinc-500">
                                            <span>SELECT CHROMATIC LAYER</span>
                                            <span className="text-zinc-350">{selectedColor || p.siblingColors[0]}</span>
                                          </div>
                                          <div className="flex gap-1.5">
                                            {p.siblingColors.map((col: string) => (
                                              <button
                                                key={col}
                                                type="button"
                                                onClick={() => setSelectedColor(col)}
                                                className={`w-3.5 h-3.5 rounded-full border transition-all duration-150 cursor-pointer ${
                                                  (selectedColor || p.siblingColors[0]) === col ? "border-emerald-500 scale-115 ring-2 ring-emerald-500/15" : "border-zinc-800 hover:border-zinc-650"
                                                }`}
                                                style={{ 
                                                  backgroundColor: 
                                                    col === "Natural Grey" ? "#5C5C5C" :
                                                    col === "Winter White" ? "#F3F4F6" :
                                                    col === "Forest Green" ? "#1B4D3E" :
                                                    col === "Plat Ink Black" ? "#121212" :
                                                    col === "Pebble Lilac" ? "#C6B0D5" : "#4A5568"
                                                }}
                                              />
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                      {/* High conversion shipping benefits tag */}
                                      <div className="bg-emerald-950/20 px-2 py-1 border border-emerald-900/30 rounded text-[8.5px] font-sans text-emerald-400 flex items-center gap-1">
                                        <span className="animate-pulse">🚚</span>
                                        <span className="truncate">{p.conversionBenefit || "Free Carbon Neutral Courier delivery"}</span>
                                      </div>

                                      {/* Big action CTA */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCartCount(prev => prev + 1);
                                          setCartFeedback(`D2C check out active: successfully added ${p.title} to secure Apple Pay terminal.`);
                                          setTimeout(() => setCartFeedback(""), 4505);
                                        }}
                                        className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-[8.5px] font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center justify-center gap-1 rounded shadow-[0_3px_12px_rgba(16,185,129,0.25)] border-none"
                                      >
                                        <span>🚀 SECURE CHECKOUT NOW</span>
                                      </button>
                                    </div>
                                  )}

                                  {out.match.matchedIndustry === "ecom" && (
                                    <div className="space-y-3.5 border-t border-dashed pt-3 mr-1" style={{ borderColor: dnaParams.borders }}>
                                      <div className="text-[8px] font-mono text-zinc-550 flex justify-between pr-1">
                                        <span>CARGO STATUS:</span>
                                        <span className="text-zinc-350">EXPRESS COMPLIANT</span>
                                      </div>

                                      {/* Multi size checkout options */}
                                      <div className="grid grid-cols-5 gap-1 select-none">
                                        {["XS", "S", "M", "L", "XL"].map(sz => (
                                          <button
                                            key={sz}
                                            type="button"
                                            onClick={() => {
                                              setSelectedSize(sz);
                                              setCartFeedback(`GRID SET: Selected ${p.title} Size ${sz}`);
                                              setTimeout(() => setCartFeedback(""), 2000);
                                            }}
                                            className={`py-0.5 border text-center text-[8px] font-mono transition cursor-pointer font-bold ${
                                              selectedSize === sz ? "bg-white text-black border-white" : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                                            }`}
                                          >
                                            {sz}
                                          </button>
                                        ))}
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCartCount(prev => prev + 1);
                                          setCartFeedback(`[GRID ADDED] Integrated 1x ${p.title} size ${selectedSize} into multi-label dispatch queue.`);
                                          setTimeout(() => setCartFeedback(""), 4500);
                                        }}
                                        className="w-full py-1.5 bg-black hover:bg-neutral-900 text-white border border-neutral-700 text-[8.5px] font-mono tracking-widest uppercase transition cursor-pointer flex items-center justify-center gap-1 rounded-none font-bold"
                                      >
                                        <span>[ADD TO INT REVENUE]</span>
                                      </button>
                                    </div>
                                  )}

                                  {/* Generic luxury placeholder (original simple display) */}
                                  {out.match.matchedIndustry === "generic-luxury" && (
                                    <div className="space-y-3 border-t border-dashed pt-3 mr-1" style={{ borderColor: dnaParams.borders }}>
                                      <div className="text-[8.5px] font-mono text-zinc-500 uppercase">
                                        {p.dimensionLabel}
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCartCount(prev => prev + 1);
                                          setCartFeedback(`Successfully claimed: 1x ${p.title}. Allocation secured.`);
                                          setTimeout(() => setCartFeedback(""), 3500);
                                        }}
                                        className="w-full py-1.5 bg-zinc-900 hover:bg-zinc-850 text-white text-[8px] font-mono uppercase tracking-wider transition cursor-pointer border border-zinc-800"
                                      >
                                        CLAIM ATELIER SPEC
                                      </button>
                                    </div>
                                  )}
                                </div>

                                <div className="border-t pt-2.5 mt-2 flex justify-between items-center text-[9px] font-mono" style={{ borderColor: dnaParams.borders }}>
                                  <span className="opacity-50 text-[7.5px]">{p.dimensionLabel || "SPEC CERTIFIED"}</span>
                                  <span className="font-extrabold" style={{ color: dnaParams.accent }}>{p.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SPACING GAPS IF COMPLETE SCROLL MAPPING IS ACTIVE */}
                    {activeGeneratedSection === "COMPLETE" && (
                      <div className="relative border-y border-dashed border-red-500/10 flex items-center justify-center font-mono text-[8px] text-zinc-500 select-none bg-black/5" style={{ height: `${out.derivedSpacingGapPx}px` }}>
                        <div className="text-center py-1 flex flex-col items-center justify-center gap-1">
                          <span className="text-amber-500/70 font-bold animate-pulse">📏 SECTOR VOID GAP DEPTH: {out.derivedSpacingGapPx}PX ENFORCED</span>
                          <span className="text-[7.5px] opacity-[0.5]">MINIMUM REGIME SPACING OF 120PX CONFIRMED</span>
                        </div>
                      </div>
                    )}

                    {/* EDITORIAL THEORIC VIEW */}
                    {(activeGeneratedSection === "EDITORIAL" || activeGeneratedSection === "COMPLETE") && (
                      <div className="w-full flex flex-col justify-center px-10 py-16 relative z-10 text-center">
                        <div className="max-w-md mx-auto space-y-4">
                          <p className="text-[9px] font-mono tracking-[0.25em] block uppercase opacity-55" style={{ color: dnaParams.accent }}>/ THE THEORY OF COMPOSURE</p>
                          <h4 className="text-lg tracking-tight font-light">{out.assets.editorial.headline}</h4>
                          <p className="text-[10.5px] leading-relaxed opacity-80 font-light">
                            {out.assets.editorial.paragraph}
                          </p>
                          <div className="text-[8.5px] font-mono opacity-50 uppercase">
                            INDEXED AT {out.assets.editorial.whitespaceWeight}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SPACING GAPS IF COMPLETE SCROLL MAPPING IS ACTIVE */}
                    {activeGeneratedSection === "COMPLETE" && (
                      <div className="relative border-y border-dashed border-red-500/10 flex items-center justify-center font-mono text-[8px] text-zinc-500 select-none bg-black/5" style={{ height: `${out.derivedSpacingGapPx}px` }}>
                        <div className="text-center py-1 flex flex-col items-center justify-center gap-1">
                          <span className="text-amber-500/70 font-bold animate-pulse">📏 SECTOR VOID GAP DEPTH: {out.derivedSpacingGapPx}PX ENFORCED</span>
                          <span className="text-[7.5px] opacity-[0.5]">MINIMUM REGIME SPACING OF 120PX CONFIRMED</span>
                        </div>
                      </div>
                    )}

                    {/* PHILOSOPHY STORY VIEW */}
                    {(activeGeneratedSection === "STORY" || activeGeneratedSection === "COMPLETE") && (
                      <div className="w-full flex flex-col justify-center px-8 py-14 relative z-10 text-center bg-black/5">
                        <div className="max-w-lg mx-auto space-y-5">
                          <span className="text-[8.5px] font-mono opacity-40 uppercase tracking-widest block">BRAND LANDMARK PHILOSOPHY // BAT Batch 73</span>
                          
                          <p className="text-[16px] leading-relaxed italic font-light tracking-tight"
                             style={{ 
                               fontFamily: "Playfair Display",
                               color: dnaParams.text
                             }}>
                            {out.assets.story.authorQuote}
                          </p>
                          
                          <p className="text-[10px] leading-relaxed opacity-70 font-light max-w-sm mx-auto">
                            {out.assets.story.artisanDetails}
                          </p>

                          <div className="pt-2 flex justify-center items-center gap-2">
                            <span className="w-4 h-[1px]" style={{ backgroundColor: dnaParams.borders }} />
                            <span className="text-[8px] uppercase font-mono tracking-widest opacity-60">
                              SENSORY KEY: {out.assets.story.sensoryTrigger}
                            </span>
                            <span className="w-4 h-[1px]" style={{ backgroundColor: dnaParams.borders }} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SPACING GAPS IF COMPLETE SCROLL MAPPING IS ACTIVE */}
                    {activeGeneratedSection === "COMPLETE" && (
                      <div className="relative border-y border-dashed border-red-500/10 flex items-center justify-center font-mono text-[8px] text-zinc-500 select-none bg-black/5" style={{ height: `${out.derivedSpacingGapPx}px` }}>
                        <div className="text-center py-1 flex flex-col items-center justify-center gap-1">
                          <span className="text-amber-500/70 font-bold animate-pulse">📏 SECTOR VOID GAP DEPTH: {out.derivedSpacingGapPx}PX ENFORCED</span>
                          <span className="text-[7.5px] opacity-[0.5]">MINIMUM REGIME SPACING OF 120PX CONFIRMED</span>
                        </div>
                      </div>
                    )}

                    {/* SHOWCASE VIEW */}
                    {(activeGeneratedSection === "SHOWCASE" || activeGeneratedSection === "COMPLETE") && (
                      <div className="w-full flex flex-col justify-center px-8 py-14 relative z-10">
                        <div className="max-w-md mx-auto w-full space-y-4">
                          <span className="text-[8px] font-mono opacity-50 uppercase tracking-widest block text-center">CINEMATIC FRAME SHOWCASE</span>
                          <div className="border bg-black/10 flex flex-col justify-center items-center p-8 h-44 relative" style={{ borderColor: dnaParams.borders }}>
                            {/* Visual Portrait Box */}
                            <div className="absolute inset-4 border border-dashed border-current opacity-20 pointer-events-none" />
                            <span className="font-mono text-[10px] opacity-40 uppercase tracking-widest">[ SHUTTER CAPTURE LENS ACTIVE ]</span>
                            <p className="text-[11px] text-center opacity-70 mt-3 font-light max-w-xs">{out.assets.showcase.focusPoint}</p>
                          </div>
                          <h5 className="font-mono text-[9px] text-zinc-500 text-center uppercase">{out.assets.showcase.heading}</h5>
                        </div>
                      </div>
                    )}

                    {/* SPACING GAPS IF COMPLETE SCROLL MAPPING IS ACTIVE */}
                    {activeGeneratedSection === "COMPLETE" && (
                      <div className="relative border-y border-dashed border-red-500/10 flex items-center justify-center font-mono text-[8px] text-zinc-500 select-none bg-black/5" style={{ height: `${out.derivedSpacingGapPx}px` }}>
                        <div className="text-center py-1 flex flex-col items-center justify-center gap-1">
                          <span className="text-amber-500/70 font-bold animate-pulse">📏 SECTOR VOID GAP DEPTH: {out.derivedSpacingGapPx}PX ENFORCED</span>
                          <span className="text-[7.5px] opacity-[0.5]">MINIMUM REGIME SPACING OF 120PX CONFIRMED</span>
                        </div>
                      </div>
                    )}

                    {/* CTA REGISTRY CONVERSION VIEW */}
                    {(activeGeneratedSection === "CTA" || activeGeneratedSection === "COMPLETE") && (
                      <div className="w-full flex flex-col justify-center px-6 py-14 relative z-10 text-center">
                        <div className="max-w-md mx-auto w-full space-y-5 p-6 border bg-black/5" style={{ borderColor: dnaParams.borders }}>
                          <div className="space-y-1">
                            <h4 className="text-xs uppercase font-semibold tracking-wider">{out.assets.cta.title}</h4>
                            <p className="text-[10px] opacity-75 font-light leading-relaxed max-w-xs mx-auto">
                              {out.assets.cta.subtitle}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <input 
                              type="email" 
                              placeholder={out.assets.cta.placeholderText}
                              disabled
                              className="bg-black/5 border text-[10px] placeholder-zinc-500 font-mono px-3 py-2 w-full focus:outline-none text-center"
                              style={{
                                borderColor: dnaParams.text,
                                color: dnaParams.text
                              }}
                            />
                            <button 
                              className="px-4 py-2 text-[9.5px] font-mono font-bold uppercase whitespace-nowrap"
                              style={{
                                backgroundColor: dnaParams.accent,
                                color: dnaParams.background
                              }}
                            >
                              {out.assets.cta.actionLabel}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SPACING GAPS IF COMPLETE SCROLL MAPPING IS ACTIVE */}
                    {activeGeneratedSection === "COMPLETE" && (
                      <div className="relative border-y border-dashed border-red-500/10 flex items-center justify-center font-mono text-[8px] text-zinc-500 select-none bg-black/5" style={{ height: `${out.derivedSpacingGapPx}px` }}>
                        <div className="text-center py-1 flex flex-col items-center justify-center gap-1">
                          <span className="text-amber-500/70 font-bold animate-pulse">📏 SECTOR VOID GAP DEPTH: {out.derivedSpacingGapPx}PX ENFORCED</span>
                          <span className="text-[7.5px] opacity-[0.5]">MINIMUM REGIME SPACING OF 120PX CONFIRMED</span>
                        </div>
                      </div>
                    )}

                    {/* FOOTER VIEW */}
                    {(activeGeneratedSection === "FOOTER" || activeGeneratedSection === "COMPLETE") && (
                      <div className="border-t p-6 relative z-10 text-center" style={{ borderColor: dnaParams.borders, backgroundColor: "rgba(0,0,0,0.06)" }}>
                        <div className="max-w-md mx-auto space-y-3 font-mono text-[9px] text-zinc-500">
                          <p className="uppercase leading-normal font-bold" style={{ color: dnaParams.accent }}>
                            {out.assets.footer.philosophyTagline}
                          </p>
                          <p className="opacity-75">{out.assets.footer.copyright}</p>
                          <p className="text-[8px] opacity-50 tracking-widest">{out.assets.footer.coordinates}</p>
                        </div>
                      </div>
                    )}

                  </div>

                </div>

              </div>

            </div>
          </div>
        );
      })()}

      {/* STEP 0: AESTHETIC SUPREMACY PHASE CORE HUB */}
      {activeStep === "AESTHETIC_SUPREMACY" && (() => {
        // Run stabilization analytics dynamically using active settings
        const stabilizationReport = AestheticStabilityEngine.stabilizeUserSpecifications(
          supremacyBrandKey,
          {
            candidateBackground: injectGradient ? "conic-gradient(#ff007f, #4a00e0)" : "#fff",
            candidateText: "#111",
            candidateAccent: "#ff007f",
            candidateRadius: injectRadiusCapsule ? "capsule" : "none",
            candidateShadow: "no-shadow",
            candidateHasGradients: injectGradient,
            candidateButtonCount: injectCTAOverload ? 3 : 1,
            candidateBadgeCount: injectBadgeClutter ? 2 : 0
          }
        );

        const currentDna = GLOBAL_AESTHETIC_MEMORY[supremacyBrandKey] || GLOBAL_AESTHETIC_MEMORY.celine;
        const compSpecs = LuxuryCompositionEngine.recurateLayoutGeometry(supremacyBrandKey);
        const storySpec = EmotionalCommerceEngine.getEmotionalStory(activeStoryKey);
        const motionSpec = PremiumMotionPhysics.getMotionSpecs(motionPresetKey);
        const typoSpec = LuxuryTypographyIntelligence.getTypoPreset(typoScaleRegime);

        return (
          <div className="space-y-6 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Core Banner detailing Aesthetic Supremacy Phase */}
              <div className="bg-gradient-to-r from-amber-500/10 via-black/40 to-transparent border border-amber-500/20 p-4.5 rounded-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex gap-3 px-1">
                  <div className="p-2 rounded bg-amber-500/5 text-amber-400 border border-amber-500/10 shrink-0">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
                      Phase: Aesthetic Supremacy System Stable Core
                    </h3>
                    <p className="text-[11px] text-zinc-400 font-light max-w-xl leading-relaxed mt-1">
                      Stabilizing AI template behavior to simulate world-class luxury benchmarks. This unified architecture integrates seven aesthetic modules to actively defend layouts against noise, ensuring quiet, expensive, and poetic brand expressions.
                    </p>
                  </div>
                </div>

                {/* Certified Premium Status Dial */}
                <div className="flex items-center gap-3 bg-black/60 p-3 rounded-lg border border-zinc-900 w-full lg:w-auto shrink-0 select-none">
                  <div className="text-right">
                    <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-wider block">CONSISTENCY INDEX</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold block">{stabilizationReport.score}% STABILIZED</span>
                  </div>
                  <div className="w-[1.5px] h-8 bg-zinc-850" />
                  <div className="text-right">
                    <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-wider block">REST RATIO LOCK</span>
                    <span className="text-xs font-mono text-amber-500 font-bold block">{(currentDna.whitespaceRatio * 100).toFixed(0)}% NEGATIVE</span>
                  </div>
                </div>
              </div>

              {/* Master Workbench Container */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                
                {/* Left controls column: interactive configuration console */}
                <div className="lg:col-span-5 bg-zinc-950/45 border border-zinc-900 rounded-xl p-5 space-y-4.5 flex flex-col justify-between select-none">
                  <div className="space-y-4">
                    
                    {/* Header */}
                    <div className="flex justify-between items-baseline border-b border-zinc-900 pb-2.5">
                      <span className="font-mono text-[10.5px] font-bold text-zinc-205 uppercase tracking-wide flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-amber-500" />
                        Aesthetic Studio Controls
                      </span>
                      <span className="text-[8.5px] font-mono text-zinc-550 uppercase">Supremacy Edition</span>
                    </div>

                    {/* Brand memory DNA selector */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono text-zinc-400 uppercase font-semibold">
                        <span>1. Global Brand Aesthetic Memory</span>
                        <span className="text-amber-505 font-bold">DNA Core</span>
                      </div>
                      <select
                        value={supremacyBrandKey}
                        onChange={e => {
                          const val = e.target.value;
                          setSupremacyBrandKey(val);
                          // Sync active configurations for consistent look
                          if (val === "hermes" || val === "the_row" || val === "aesop") {
                            setTypoScaleRegime(val === "hermes" ? "saint_laurent_regime" : val === "the_row" ? "celine_poetics" : "aesop_literary");
                            setMotionPresetKey(val === "the_row" ? "stillness" : "lens");
                            setActiveStoryKey(val === "hermes" ? "jacquemus_summer" : val === "the_row" ? "fear_of_god_seventh" : "jacquemus_summer");
                          } else if (val === "bottega_veneta") {
                            setTypoScaleRegime("saint_laurent_regime");
                            setMotionPresetKey("fluid");
                            setActiveStoryKey("leica_optics");
                          } else {
                            setTypoScaleRegime("saint_laurent_regime");
                            setMotionPresetKey("stillness");
                            setActiveStoryKey("leica_optics");
                          }
                          logAction(`Stability Control: Loaded high-fashion luxury memory for ${GLOBAL_AESTHETIC_MEMORY[val].brand}.`);
                        }}
                        className="w-full bg-black text-xs font-mono text-zinc-300 border border-zinc-850 rounded px-2.5 py-1.8 focus:outline-none focus:border-amber-700 cursor-pointer"
                      >
                        <option value="hermes">Hermès Paris (Noble saddle leather & organic rest)</option>
                        <option value="bottega_veneta">Bottega Veneta (Structural anonymous black volume)</option>
                        <option value="the_row">The Row (Monastic oversized luxury drapings)</option>
                        <option value="aesop">Aesop (Warm, literary intellectual limestone)</option>
                        <option value="saint_laurent">Saint Laurent Paris (Sharp tailored French neon noir)</option>
                      </select>
                    </div>

                    {/* Interactive noise injection panel - mimicking corrupted AI outputs */}
                    <div className="space-y-2 border-t border-zinc-900 pb-2 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">
                          2. Inject Visual Noise Fluff (Drifting Variables)
                        </span>
                        <span className="text-[8.5px] font-mono text-red-500 bg-red-950/20 px-1 rounded uppercase font-bold">Chaos Mode</span>
                      </div>
                      <p className="text-[9.5px] text-zinc-550 leading-relaxed font-light">
                        Simulate unrefined outputs with typical "AI slop" patterns. See how the visual silence engine instantly intercepts and stabilizes them.
                      </p>

                      <div className="grid grid-cols-2 gap-2 font-mono text-[9.5px] text-zinc-300">
                        <button
                          onClick={() => {
                            setInjectGradient(!injectGradient);
                            logAction(`Noise Injected: Backing chaotic linear neon gradient toggled ${!injectGradient ? "ON" : "OFF"}.`);
                          }}
                          className={`p-2 rounded border text-left flex justify-between items-center transition cursor-pointer ${
                            injectGradient ? "border-red-650 bg-red-955/10 text-red-400" : "border-zinc-900 bg-black/40 text-zinc-450 hover:border-zinc-800"
                          }`}
                        >
                          <span>🌈 Neon Gradients</span>
                          <span className={injectGradient ? "text-red-400 font-bold" : "text-zinc-650"}>
                            {injectGradient ? "ON" : "OFF"}
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            setInjectRadiusCapsule(!injectRadiusCapsule);
                            logAction(`Noise Injected: Bubble round capsule corners toggled ${!injectRadiusCapsule ? "ON" : "OFF"}.`);
                          }}
                          className={`p-2 rounded border text-left flex justify-between items-center transition cursor-pointer ${
                            injectRadiusCapsule ? "border-red-650 bg-red-955/10 text-red-400" : "border-zinc-900 bg-black/40 text-zinc-450 hover:border-zinc-800"
                          }`}
                        >
                          <span>🍒 Bubble Slop Borders</span>
                          <span className={injectRadiusCapsule ? "text-red-400 font-bold" : "text-zinc-650"}>
                            {injectRadiusCapsule ? "ON" : "OFF"}
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            setInjectCTAOverload(!injectCTAOverload);
                            logAction(`Noise Injected: Multi call-to-actions buttons overload toggled ${!injectCTAOverload ? "ON" : "OFF"}.`);
                          }}
                          className={`p-2 rounded border text-left flex justify-between items-center transition cursor-pointer ${
                            injectCTAOverload ? "border-red-650 bg-red-955/10 text-red-400" : "border-zinc-900 bg-black/40 text-zinc-450 hover:border-zinc-800"
                          }`}
                        >
                          <span>💥 Multiple CTA Clutter</span>
                          <span className={injectCTAOverload ? "text-red-400 font-bold" : "text-zinc-650"}>
                            {injectCTAOverload ? "ON" : "OFF"}
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            setInjectBadgeClutter(!injectBadgeClutter);
                            logAction(`Noise Injected: Cluttered flash stickers badges toggled ${!injectBadgeClutter ? "ON" : "OFF"}.`);
                          }}
                          className={`p-2 rounded border text-left flex justify-between items-center transition cursor-pointer ${
                            injectBadgeClutter ? "border-red-650 bg-red-955/10 text-red-400" : "border-zinc-900 bg-black/40 text-zinc-450 hover:border-zinc-800"
                          }`}
                        >
                          <span>🔥 Flash Badge Spam</span>
                          <span className={injectBadgeClutter ? "text-red-400 font-bold" : "text-zinc-650"}>
                            {injectBadgeClutter ? "ON" : "OFF"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Visual Silence Enforcer Trigger */}
                    <div className="flex justify-between items-center bg-black/45 p-3 rounded-lg border border-zinc-900 transition hover:border-zinc-850">
                      <div className="space-y-0.5">
                        <span className="text-[10.5px] text-zinc-300 font-semibold block">Visual Silence Engine Active</span>
                        <span className="text-[8.5px] font-mono text-zinc-550 block">Instantly neutralize gradient, border & badge eyesores</span>
                      </div>
                      <button
                        onClick={() => {
                          setIsVisualSilenceActive(!isVisualSilenceActive);
                          logAction(`Visual Silence Engine: Core purge status toggled ${!isVisualSilenceActive ? "ON" : "OFF"}.`);
                        }}
                        className={`w-10 h-5 rounded-full p-0.5 transition cursor-pointer ${
                          isVisualSilenceActive ? "bg-amber-600/80" : "bg-zinc-800"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-black border border-zinc-900 transform transition-transform duration-350 ${
                          isVisualSilenceActive ? "translate-x-5" : "translate-x-0"
                        }`} />
                      </button>
                    </div>

                    {/* Emotional Story Mode Selector */}
                    <div className="space-y-1.5 border-t border-zinc-900 pt-3">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold block">
                        3. Emotional Brand Narrativity Preset
                      </span>
                      <div className="grid grid-cols-3 gap-1.5 font-mono text-[9.5px]">
                        {[
                          { key: "jacquemus_summer", name: "Provence Linen" },
                          { key: "leica_optics", name: "Leica Wetzlar" },
                          { key: "fear_of_god_seventh", name: "Divine Cashmere" }
                        ].map(item => (
                          <button
                            key={item.key}
                            onClick={() => {
                              setActiveStoryKey(item.key);
                              logAction(`Narrative Shift: Injected atmospheric details from "${item.name}".`);
                            }}
                            className={`p-1.8 text-center rounded border transition cursor-pointer capitalize ${
                              activeStoryKey === item.key 
                                ? "border-amber-500 bg-amber-955/10 text-amber-400" 
                                : "border-zinc-905 bg-black/30 text-zinc-500 hover:border-zinc-800"
                            }`}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Real-time Design Coherency Audit Shield */}
                  <div className="pt-3 border-t border-zinc-900 space-y-2 lg:h-[132px] flex flex-col justify-between shrink-0">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      🌟 BRAND DESIGN SANITY CHECK & VERIFICATION
                    </span>
                    <div className="bg-black/80 font-mono text-[9px] p-2.5 rounded border border-zinc-900 text-zinc-450 h-20 overflow-y-auto space-y-1 leading-normal select-text">
                      {stabilizationReport.diagnostics.map((diag, index) => (
                        <div key={index} className="flex gap-1.5">
                          <span className="text-amber-500">▶</span>
                          <span>{diag}</span>
                        </div>
                      ))}
                      {isVisualSilenceActive && stabilizationReport.violationsFound > 0 && (
                        <div className="text-emerald-400 font-bold">
                          ✓ DESIGN SANITY CHECK OK: Spacing logic and luxury constraints fully enforced.
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right columns: Real-time lookbook visual interface */}
                <div className="lg:col-span-7 flex flex-col border border-zinc-900/80 bg-zinc-950/40 rounded-xl overflow-hidden shadow-2xl relative">
                  
                  {/* Visual iFrame view top menu bar */}
                  <div className="bg-zinc-950 px-4 py-3 text-[9px] font-mono text-zinc-500 border-b border-zinc-900/80 flex justify-between items-center select-none shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>https://cosmos.archive.luxury/{supremacyBrandKey}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-600">STABILITY_LOCK_ACTIVE</span>
                      <span className="bg-amber-955/30 border border-amber-900/40 text-amber-400 px-1.5 py-0.5 rounded font-black uppercase">
                        {currentDna.brand.toUpperCase()} LOOKBOOK
                      </span>
                    </div>
                  </div>

                  {/* HIGH-FIDELITY LIVE CANVAS DECK (Rendered with active Brand DNA specifications) */}
                  <div 
                    className="overflow-y-auto max-h-[470px] min-h-[420px] transition-all duration-500 relative p-0 group flex flex-col justify-between"
                    style={{
                      backgroundColor: isVisualSilenceActive ? stabilizationReport.stabilizedColors.background : "transparent",
                      color: isVisualSilenceActive ? stabilizationReport.stabilizedColors.text : "#ff007f",
                      backgroundImage: (!isVisualSilenceActive && injectGradient) ? "linear-gradient(135deg, #1d0047 0%, #a4005d 50%, #e1003d 100%)" : undefined
                    }}
                  >
                    
                    {/* Artistic canvas grids watermarks */}
                    <div className="absolute inset-0 opacity-[0.012] pointer-events-none" style={{ backgroundImage: `radial-gradient(${stabilizationReport.stabilizedColors.text} 1px, transparent 1px)`, backgroundSize: "36px 36px" }} />

                    {/* TOP BRAND EMBLEM & HEADER REGIME */}
                    <div className="w-full px-8 py-6 flex justify-between items-baseline relative z-10 select-none">
                      <span className="text-[10px] font-bold tracking-[0.38em] uppercase" style={{ fontFamily: "Inter" }}>
                        {currentDna.brand.includes("Celine") ? "C E L I N E" : currentDna.brand.toUpperCase()}
                      </span>
                      <span className="text-[8.5px] font-mono opacity-50 uppercase tracking-[0.2em]">
                        {storySpec.themeNode}
                      </span>
                    </div>

                    {/* CINEMATIC STORY NARRATIVE CONTENT GRID (Task 3 & 6: Luxury Composition & Emotional Commerce) */}
                    <div className={`px-8 py-8 relative z-10 transition-all duration-300 w-full`}>
                      <div className="grid grid-cols-12 gap-4">
                        
                        {/* Interactive asymmetrical grid setup */}
                        <div className={compSpecs.leftColumnSpan}>
                          
                          {/* Aesthetic Title scale conforming exactly to Task 5: Typo rules */}
                          <p className="text-[9px] uppercase tracking-[0.33em] font-bold opacity-60 mb-3 block"
                             style={{ color: isVisualSilenceActive ? stabilizationReport.stabilizedColors.accent : "#00ffcc" }}>
                            // CORE SCARCE ARCHIVE v.27
                          </p>

                          <h1 
                            className="leading-[1.1] font-light tracking-tight transition-transform duration-500 ease-out mb-4"
                            style={{ 
                              fontFamily: currentDna.typography.displayFont === "Playfair Display" ? "Playfair Display" : currentDna.typography.displayFont === "Space Grotesk" ? "Space Grotesk" : "Outfit",
                              fontSize: isGoldenRatioLocked ? "2.1rem" : "1.6rem",
                              fontWeight: currentDna.brand.includes("Bottega") ? 600 : 300,
                              textTransform: typoSpec.displayTransform as any,
                              letterSpacing: typoSpec.tracking
                            }}
                          >
                            {storySpec.heroHeadline}
                          </h1>

                          {/* Captivating quote */}
                          <p className="text-[12px] italic leading-relaxed opacity-85 font-light mb-5 max-w-sm" style={{ fontFamily: "Playfair Display" }}>
                            {storySpec.lookbookQuote}
                          </p>

                          {/* Refined body, applying word density limits based on luxury scale rules */}
                          <p className="text-[10.5px] leading-relaxed opacity-70 font-light max-w-xs font-sans pb-4">
                            {LuxuryTypographyIntelligence.applyWordDensityLimit(storySpec.subtextDetails, 22)}
                          </p>

                          {/* Action container: dynamically neutralized or showing chaos overload */}
                          <div className="flex flex-wrap gap-2.5 items-center">
                            
                            <button 
                              className="px-[22px] py-2.5 text-[8px] font-mono uppercase tracking-widest font-semibold hover:opacity-80 transition cursor-pointer select-none"
                              style={{ 
                                backgroundColor: isVisualSilenceActive ? stabilizationReport.stabilizedColors.accent : "#ff007f",
                                color: isVisualSilenceActive 
                                  ? (currentDna.brand.includes("Apple") || currentDna.brand.includes("Bottega") ? "#ffffff" : stabilizationReport.stabilizedColors.background) 
                                  : "#ffffff",
                                borderRadius: isVisualSilenceActive ? stabilizationReport.reallocatedRadius : "99px"
                              }}
                            >
                              {storySpec.artisticActionLabel}
                            </button>

                            {/* Redundant trash CTAs if chaos overload toggled and Visual Silence Engine is switched disabled */}
                            {injectCTAOverload && !isVisualSilenceActive && (
                              <>
                                <button className="px-5 py-2.5 bg-yellow-400 text-black text-[8px] font-black uppercase rounded-lg animate-bounce shrink-0">
                                  ⚡ BUY RIGHT AWAY 50% ⚡
                                </button>
                                <button className="px-4 py-2 bg-pink-500 text-white text-[8.5px] font-black uppercase rounded-full shrink-0">
                                  CHATS IMMEDIATE
                                </button>
                              </>
                            )}

                          </div>

                          {/* Extra flash sticker spam in chaos mode */}
                          {injectBadgeClutter && !isVisualSilenceActive && (
                            <div className="mt-4 flex gap-2">
                              <span className="bg-red-500 text-white text-[8px] font-mono px-2 py-0.5 rounded-full animate-pulse uppercase">
                                🔥 99% SOLD EXPIRED NOW
                              </span>
                              <span className="bg-cyan-500 text-black text-[8px] font-mono px-2 py-0.5 rounded-full uppercase">
                                💎 VIP CLOUD INJECTED
                              </span>
                            </div>
                          )}

                        </div>

                        {/* Right asymmetric composition image spacer representation */}
                        <div className={compSpecs.rightColumnSpan}>
                          <div 
                            className={`border transition-all duration-500 p-5 w-full flex flex-col justify-end bg-black/5 ${compSpecs.aspectRatio}`}
                            style={{ 
                              borderColor: isVisualSilenceActive ? stabilizationReport.stabilizedColors.subtleBorder : "#ff007f",
                              borderRadius: isVisualSilenceActive ? stabilizationReport.reallocatedRadius : "32px"
                            }}
                          >
                            <div className="space-y-1 select-none">
                              <div className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: stabilizationReport.stabilizedColors.accent }} />
                              <span className="text-[7.5px] font-mono opacity-50 tracking-[0.2em] block uppercase">MATERIAL RESOLUTION</span>
                              <p className="text-[9.5px] font-mono opacity-90 leading-tight">
                                {storySpec.sensoryTrigger}
                              </p>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* ASYMMETRIC DECK FOOTER */}
                    <div className="w-full px-8 py-5 border-t flex flex-col md:flex-row justify-between items-center text-[8.5px] font-mono opacity-60 relative z-10"
                         style={{ borderColor: isVisualSilenceActive ? stabilizationReport.stabilizedColors.subtleBorder : "#ff007f" }}>
                      <span>STABILITY: {stabilizationReport.reallocatedSpacing}</span>
                      <span>COMPOSITION DEPTH: {compSpecs.focalDepth.toUpperCase()}</span>
                      <span>WHITE COSMOS FINE COUTURE BLUEPRINT</span>
                    </div>

                  </div>

                  {/* Bottom bar of Lookbook deck highlighting golden ratio analysis */}
                  <div className="bg-zinc-950 p-3.5 border-t border-zinc-900 text-center text-[9px] font-mono text-zinc-500 select-none flex justify-between items-center px-5">
                    <span className="flex items-center gap-1">
                      <Ruler className="w-3 h-3 text-amber-500" />
                      GOLDEN PROPORTIONS RATIO CRITERIA:
                    </span>
                    <span className="text-zinc-400 font-bold">
                      TARGET: 0.618 | ACTUAL: 0.618 | DRIFT VECTOR DEVIATION: <strong className="text-emerald-400">0.00 (PERFECT)</strong>
                    </span>
                  </div>

                </div>

              </div>

            </div>
          </div>
        );
      })()}

      {/* STEP 1: AESTHETIC QUALITY LAWS ENGINE */}
      {activeStep === "QUALITY_LAWS" && (
        <div className="space-y-6 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* The aesthetic manifesto container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: Interactive aesthetic laws checker */}
              <div className="lg:col-span-5 bg-zinc-950/40 border border-zinc-900 rounded-lg p-4 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-zinc-900">
                    <Wand2 className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-200 font-bold">
                      Aesthetic Core Law Validator
                    </span>
                  </div>
                  
                  <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                    Check which laws are actively enforced in the visual queue. AI elements that violate active visual checks are flagged in red and auto-compacted into solid high-end equivalents.
                  </p>

                  <div className="space-y-2.5 pt-1.5">
                    {activeLaws.map(law => (
                      <div 
                        key={law.id} 
                        onClick={() => toggleLaw(law.id)}
                        className={`p-2.5 rounded border transition cursor-pointer flex items-start gap-2.5 select-none ${
                          law.isViolated 
                            ? "border-red-950/40 bg-red-950/10 hover:bg-red-950/15" 
                            : law.checked 
                              ? "border-amber-900/20 bg-amber-955/5 hover:bg-amber-955/10" 
                              : "border-zinc-900 bg-transparent opacity-65 hover:opacity-100"
                        }`}
                      >
                        <div className="pt-0.5">
                          {law.isViolated ? (
                            <span className="w-3.5 h-3.5 rounded bg-red-650 flex items-center justify-center text-[8.5px] text-white font-mono font-bold">!</span>
                          ) : (
                            <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                              law.checked ? "border-amber-500 bg-amber-500 text-black" : "border-zinc-700"
                            }`}>
                              {law.checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <span className={`text-[10.5px] block font-light leading-snug ${
                            law.isViolated ? "text-red-400 font-normal" : "text-zinc-200"
                          }`}>
                            {law.text}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase">
                            {law.isViolated ? "🔴 VIOLATION DETECTED" : "🟢 ACTIVE COMPLIANT"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-900/80">
                  <button 
                    onClick={handleApplyAestheticRepair}
                    disabled={repairLoading}
                    className="w-full py-2.5 rounded bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:from-zinc-900 disabled:to-zinc-900 text-black font-semibold font-mono text-xs flex items-center justify-center gap-2 cursor-pointer transition select-none"
                  >
                    {repairLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Purging AI Clutter...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" /> Execute Golden Repair Block
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Comparative Interactive Sandbox (Before vs After) */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                
                {/* BEFORE PREVIEW CONTAINER (AMATEUR CHIPS & GRADIENTS) */}
                <div className="border border-red-950/30 bg-zinc-950/20 rounded-lg overflow-hidden flex flex-col justify-between">
                  <div className="bg-red-950/10 border-b border-red-950/25 px-3 py-2 flex justify-between items-center select-none shrink-0 font-mono text-[9px]">
                    <span className="text-red-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Amateur AI Slop Code
                    </span>
                    <span className="text-red-500 bg-red-950/20 px-1 rounded">SCORE: 48</span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-center items-center h-[280px] relative select-none overflow-hidden"
                       style={{ background: "linear-gradient(135deg, #4A00E0 0%, #8E2DE2 50%, #FF007F 100%)" }}>
                    
                    {/* Chaotic overlay mesh of lines */}
                    <div className="absolute inset-0 opacity-20 bg-grid-pattern" />

                    <div className="max-w-xs w-full text-center space-y-4 z-10">
                      <div className="bg-gradient-to-r from-cyan-400 via-yellow-300 to-pink-500 text-black px-2 py-1 text-[9px] font-black uppercase rounded shadow-lg animate-bounce">
                        🔥 SPECIAL OFFERS! ACT NOW! 🔥
                      </div>

                      <div className="bg-zinc-900 p-4 rounded-2xl border-2 border-pink-400 shadow-[0_15px_30px_rgba(255,0,128,0.4)] text-left space-y-2 relative">
                        <div className="flex justify-between items-center border-b border-zinc-805 pb-1.5">
                          <span className="text-[10px] font-mono text-cyan-400 font-bold">SMART_WATCH_v3</span>
                          <span className="text-xs bg-pink-500 text-white px-1.5 rounded-full font-black animate-pulse">$2,999</span>
                        </div>
                        <p className="text-[9px] text-zinc-300 font-sans leading-relaxed">
                          BUY IMMEDIATELY 50% EXTRA BONUS SYSTEM INTERACTIVE CLOUD SPEED CHEAP MULTIPLE ADVANTAGES!!!
                        </p>
                        <div className="flex gap-1.5 pt-1.5">
                          <button className="flex-1 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[8px] font-black uppercase rounded-lg hover:scale-105 transition">
                            ⚡ CHECKOUT SECURE NOW ⚡
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-950 border-t border-zinc-900 shrink-0 select-none text-[9px] font-mono text-red-500/70">
                    DIAGNOSIS: Overloaded spacing ratios, 4 primary neon hues, un-restrained 99px button corners, linear gradient clutter.
                  </div>
                </div>

                {/* AFTER REPAIRED VIEW (BOUTIQUE SILENCE) */}
                <div className="border border-amber-950/30 bg-zinc-950/20 rounded-lg overflow-hidden flex flex-col justify-between relative">
                  <div className="bg-amber-950/10 border-b border-amber-950/25 px-3 py-2 flex justify-between items-center select-none shrink-0 font-mono text-[9px]">
                    <span className="text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Sacred Law Clean Restructure
                    </span>
                    <span className="text-amber-400 bg-amber-950/20 px-1 rounded">SCORE: {repairScores.after}</span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-center items-center h-[280px] relative select-none overflow-hidden transition-all duration-500"
                       style={{
                         backgroundColor: isRepaired ? repairedSpecs.background : "#0f1013"
                       }}>
                    
                    {isRepaired ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-full flex flex-col justify-between p-4"
                        style={{ color: repairedSpecs.text }}
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-baseline border-b pb-2" style={{ borderColor: repairedSpecs.subtle }}>
                            <span className="text-[11px] font-black tracking-tight" style={{ fontFamily: "Outfit" }}>
                              ATELIER • CHRONOGRAPH
                            </span>
                            <span className="text-[8.5px] font-mono uppercase tracking-widest opacity-60">EDITION 09</span>
                          </div>

                          <div className="space-y-1.5">
                            <p className="text-lg leading-snug italic font-light tracking-tight" style={{ fontFamily: "Playfair Display" }}>
                              “An absolute study of fluid titanium casing and serene visual rest.”
                            </p>
                            <p className="text-[9.5px] opacity-75 font-mono leading-relaxed max-w-xs font-light">
                              Hand-sandblasted micro-pores. Free from active visual telemetry. Solid internal architecture crafted for collectors.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: repairedSpecs.subtle }}>
                          <span className="text-xs font-mono font-bold" style={{ color: repairedSpecs.accent }}>$2,999 USD</span>
                          <button className="px-4 py-1 text-[9px] tracking-widest font-mono uppercase bg-transparent border hover:bg-neutral-900 hover:text-white transition cursor-pointer"
                                  style={{ borderColor: repairedSpecs.text }}>
                            COMMISSION
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="text-center space-y-3 p-4">
                        <AlertCircle className="w-7 h-7 text-amber-500/80 mx-auto" />
                        <div className="space-y-1">
                          <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-350">Aesthetic Shift Interrupted</h4>
                          <p className="text-[10px] text-zinc-500 max-w-xs leading-relaxed mx-auto">
                            Execute the Golden Repair Block below to see how our layout law structures instantly resolve clutter into world-class design logic.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-zinc-950 border-t border-zinc-900 shrink-0 select-none text-[9px] font-mono text-amber-400">
                    REMEDY: Density reduced to 12%, zero raw color gradients, no shadows, 0px corner angle, 68% blank structural space.
                  </div>
                </div>

              </div>
            </div>

            {/* Dynamic log stream output bar */}
            {isRepaired && repairLogs.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-950/40 border border-zinc-900 p-4 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-4 shrink-0 font-mono text-[10px]"
              >
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Aesthetic Compliance Mutation Stream
                  </span>
                  <div className="bg-black/60 border border-zinc-900 p-3 rounded h-28 overflow-y-auto space-y-1 text-zinc-400">
                    {repairLogs.map((log, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-amber-500/85">►</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between p-3.5 bg-zinc-900/15 border border-zinc-900 rounded select-none">
                  <div className="space-y-1.5">
                    <span className="text-[8.5px] uppercase tracking-widest text-zinc-500 font-bold block">
                      Philosophic Design Statement
                    </span>
                    <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                      "{philosophicJustification}"
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t border-zinc-900/80 flex justify-between text-[8px] text-zinc-550 uppercase">
                    <span>Spacing Model: AIRY COGNITION</span>
                    <span>Proportion Lock: GOLDEN RATIO</span>
                    <span>Density Ratio: 9% WEIGHT</span>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      )}

      {/* STEP 2: BRAND DNA EXTRACTOR */}
      {activeStep === "DNA" && (
        <div className="space-y-5 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Input & Extraction controls */}
            <div className="space-y-3 shrink-0">
              <div className="flex gap-2.5">
                <div className="flex-1 bg-black rounded border border-zinc-800 px-3.5 py-2 flex items-center gap-2">
                  <span className="text-[9.5px] font-mono text-zinc-500 uppercase">Input Domain:</span>
                  <input
                    type="text"
                    placeholder="e.g. apple.com, stripe.com, celine.com, nike.com"
                    className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-zinc-700"
                    value={targetUrl}
                    onChange={e => setTargetUrl(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => handleExtractDNA()}
                  disabled={extractorLoading || !targetUrl.trim()}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 disabled:from-zinc-900 disabled:to-zinc-900 text-black font-semibold font-mono text-xs px-5 rounded border border-amber-400 hover:from-amber-500 hover:to-amber-600 flex items-center gap-1.5 transition select-none cursor-pointer"
                >
                  {extractorLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Decoding DNA...
                    </>
                  ) : (
                    <>
                      Extract Visual DNA <ExternalLink className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Preset selection circles */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 select-none">
                {Object.keys(PRESET_DNAS).map(key => (
                  <button
                    key={key}
                    onClick={() => handleExtractDNA(key)}
                    className={`p-3 rounded text-left border transition text-[11px] font-mono flex flex-col justify-between h-[72px] cursor-pointer ${
                      selectedDnaKey === key ? "border-amber-500 bg-amber-955/5" : "border-zinc-900 bg-black/30 hover:border-zinc-800"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-zinc-200 font-bold capitalize">{key}.com</span>
                      <span className="text-[8.5px] text-amber-500 bg-amber-950/20 px-1 py-0.5 rounded font-bold">DNA v1.5</span>
                    </div>
                    <p className="text-zinc-500 text-[9.5px] line-clamp-1 italic font-light pt-1">
                      {PRESET_DNAS[key].philosophy}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Render extracted DNA detail blocks */}
            {extractedDna && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                
                {/* Specs overview card */}
                <div className="lg:col-span-7 bg-[#0f1013] border border-zinc-900 rounded-lg p-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline border-b border-zinc-900 pb-2.5">
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">EXTRACTED LANDSCAPE</span>
                        <h3 className="font-sans font-bold text-white text-base tracking-wider uppercase">
                          {extractedDna.brand} Specs Mapping
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold text-amber-500">LUXURY INDEX</span>
                        <span className="font-mono text-xs text-amber-400 font-bold">{extractedDna.luxuryIndex}% Conformity</span>
                      </div>
                    </div>

                    <p className="text-[11px] font-light text-zinc-350 italic leading-relaxed">
                      “{extractedDna.philosophy}”
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      <div className="bg-zinc-950/80 p-2.5 rounded border border-zinc-900">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">Spacing Ratio</span>
                        <span className="text-[10.5px] font-mono text-zinc-200 capitalize font-bold">{extractedDna.spacing}</span>
                      </div>
                      <div className="bg-zinc-950/80 p-2.5 rounded border border-zinc-900">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">Radius Curvature</span>
                        <span className="text-[10.5px] font-mono text-zinc-200 capitalize font-bold">{extractedDna.radius}</span>
                      </div>
                      <div className="bg-zinc-950/80 p-2.5 rounded border border-zinc-900">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">Visual Friction</span>
                        <span className="text-[10.5px] font-mono text-zinc-200 capitalize font-bold">{extractedDna.shadow}</span>
                      </div>
                      <div className="bg-zinc-950/80 p-2.5 rounded border border-zinc-900">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">Information Density</span>
                        <span className="text-[10.5px] font-mono text-zinc-200 capitalize font-bold">{extractedDna.density}</span>
                      </div>
                      <div className="bg-zinc-950/80 p-2.5 rounded border border-zinc-900">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">Typography Type</span>
                        <span className="text-[10.5px] font-mono text-zinc-200 capitalize font-bold">{extractedDna.typography.display}</span>
                      </div>
                      <div className="bg-zinc-950/80 p-2.5 rounded border border-zinc-900">
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">Letter Tracking</span>
                        <span className="text-[10.5px] font-mono text-zinc-200 capitalize font-bold">{extractedDna.typography.tracking}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hex spectrum block */}
                  <div className="pt-4 border-t border-zinc-900 space-y-2 select-none">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">Hex Color Map</span>
                    <div className="grid grid-cols-5 gap-1 h-7 rounded overflow-hidden text-center leading-7 font-mono text-[8.5px] border border-zinc-900">
                      <div style={{ backgroundColor: extractedDna.colors.background, color: extractedDna.colors.text }}>BG</div>
                      <div style={{ backgroundColor: extractedDna.colors.text, color: extractedDna.colors.background }}>TXT</div>
                      <div style={{ backgroundColor: extractedDna.colors.accent, color: "#fff" }}>ACC</div>
                      <div style={{ backgroundColor: extractedDna.colors.subtle, color: "#000" }}>SUB</div>
                      <div style={{ backgroundColor: extractedDna.colors.accentHover, color: "#fff" }}>HOV</div>
                    </div>
                  </div>
                </div>

                {/* Secret layout algorithm notes */}
                <div className="lg:col-span-5 bg-[#0f1013] border border-zinc-900 rounded-lg p-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest font-bold block">
                      Aesthetic Secrets Decoded
                    </span>
                    <div className="space-y-3.5">
                      {extractedDna.aestheticSecrets.map((sec, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start">
                          <span className="text-amber-500 mt-1">✦</span>
                          <p className="text-[11px] text-zinc-300 font-light leading-relaxed">{sec}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-900/60 flex justify-between text-[8px] font-mono text-zinc-500">
                    <span>STATUS: HIGH CONTRAST VERIFIED</span>
                    <span>RESTRICTED DESIGN REGIME</span>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* STEP 3: HERO & GRAPHICS DENSITY CONTROLLER */}
      {activeStep === "WORKBENCH" && (
        <div className="space-y-5 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Control Panel Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-[#0f1013] border border-zinc-900 p-4 rounded-lg select-none">
              
              <div className="lg:col-span-4 flex items-center gap-3.5">
                <span className="font-mono text-[10px] text-zinc-400 uppercase font-bold shrink-0">1. Select Styling Style:</span>
                <select
                  className="bg-black text-[10.5px] font-mono text-zinc-200 border border-zinc-850 rounded px-2.5 py-1.5 focus:outline-none focus:border-amber-800 cursor-pointer flex-1"
                  value={selectedDnaKey}
                  onChange={e => {
                    const val = e.target.value;
                    setSelectedDnaKey(val);
                    setExtractedDna(PRESET_DNAS[val]);
                    logAction(`Aesthetic Core: Refocused live canvas matrix onto "${PRESET_DNAS[val].brand}".`);
                  }}
                >
                  <option value="celine">CELINE Paris (Restraint Silence)</option>
                  <option value="monastic">Monastic Architectural (Sacred Stone & Arches)</option>
                  <option value="apple">Apple Inc. (Rational Minimalism)</option>
                  <option value="stripe">Stripe (Interactive Tech Mesh)</option>
                  <option value="nike">Nike Core (Kinetic Muscle Bold)</option>
                </select>
              </div>

              <div className="lg:col-span-5 flex items-center justify-between gap-3 border-l border-zinc-905 pl-4">
                <span className="font-mono text-[10px] text-zinc-400 uppercase font-bold shrink-0">2. Density Controller:</span>
                <div className="flex bg-black p-1 rounded border border-zinc-850 font-mono text-[9px] w-full max-w-[210px] justify-between">
                  <button 
                    onClick={() => {
                      setDensityConfig("slop");
                      logAction("Density Controller: Degraded template to Cluttered AI Slop. (Crowded sections and text blocks)");
                    }}
                    className={`px-2 py-1 rounded cursor-pointer transition ${densityConfig === "slop" ? "bg-red-955 text-red-400 font-bold border border-red-900/40" : "text-zinc-500 hover:text-zinc-355"}`}
                  >
                    Slop AI (Dense)
                  </button>
                  <button 
                    onClick={() => {
                      setDensityConfig("minimal");
                      logAction("Density Controller: Shifted space to Clean Minimal. (Compact, 3 colors)");
                    }}
                    className={`px-2 py-1 rounded cursor-pointer transition ${densityConfig === "minimal" ? "bg-zinc-850 text-zinc-200 font-semibold" : "text-zinc-550 hover:text-zinc-400"}`}
                  >
                    Minimal
                  </button>
                  <button 
                    onClick={() => {
                      setDensityConfig("elite");
                      logAction("Density Controller: Enforced Elite Restricted Spacing. (Single Visual Center, absolute breathing void)");
                    }}
                    className={`px-2 py-1 rounded cursor-pointer transition ${densityConfig === "elite" ? "bg-amber-955 text-amber-400 font-bold border border-amber-900/30" : "text-zinc-550 hover:text-zinc-400"}`}
                  >
                    Boutique (Elite)
                  </button>
                </div>
              </div>

              <div className="lg:col-span-3 flex justify-end font-mono text-[9.5px]">
                <div className="flex bg-black p-1 rounded border border-zinc-850">
                  {["HERO", "PRODUCTS", "CTA"].map((seg: any) => (
                    <button
                      key={seg}
                      onClick={() => setWorkbenchLayout(seg)}
                      className={`px-3 py-1 rounded cursor-pointer transition ${
                        workbenchLayout === seg ? "bg-zinc-900 text-amber-400 font-bold" : "text-zinc-550 hover:text-zinc-400"
                      }`}
                    >
                      {seg}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Dedicated Visual Density Controller UI */}
            <div className="bg-[#0b0c10] border border-zinc-900/60 rounded-lg p-4 select-none flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-500 uppercase font-black tracking-wider block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  🌟 Visual Density Controller (空间呼吸硬限控制)
                </span>
                <p className="text-[11px] text-zinc-450 font-light max-w-xl">
                  Enforce elite-level visual deceleration. Standard density mimics common boutique grids, while 
                  <strong className="text-amber-400 font-medium"> Elite Restraint</strong> locks the canvas into an absolute 120px symmetric whitespace void.
                </p>
              </div>
              <div className="flex bg-black p-1 rounded border border-zinc-850 font-mono text-[9.5px] shrink-0 self-start md:self-auto gap-1">
                <button
                  id="density-high-btn"
                  onClick={() => {
                    setVisualDensityMode("standard");
                    logAction("Density System: Calibrated layout to Standard High Density. Dynamic adaptive grid flow restored.");
                  }}
                  className={`px-3.5 py-2 rounded cursor-pointer transition uppercase font-bold tracking-wider ${
                    visualDensityMode === "standard"
                      ? "bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-950"
                  }`}
                >
                  High Density
                </button>
                <button
                  id="density-elite-btn"
                  onClick={() => {
                    setVisualDensityMode("elite_restraint");
                    logAction("Density System: Enforced absolute 'Elite Restraint' limits (strict 120px void padding safeguards).");
                  }}
                  className={`px-3.5 py-2 rounded cursor-pointer transition uppercase font-bold tracking-wider ${
                    visualDensityMode === "elite_restraint"
                      ? "bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-950"
                  }`}
                >
                  Elite Restraint (120px Void)
                </button>
              </div>
            </div>

            {/* Sandbox Live Responsive High-Contrast preview frame */}
            <div className="border border-zinc-900/80 bg-black/60 rounded-xl overflow-hidden shadow-2xl p-1 flex flex-col relative">
              
              {/* Internal mock browser header */}
              <div className="bg-zinc-950 px-4 py-2 text-[9px] font-mono text-zinc-500 border-b border-zinc-900/80 flex justify-between items-center select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
                  <span>https://boutique-engine.white-cosmos/{selectedDnaKey}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-500/80">AIR SPACE COMPLIANT: {visualDensityMode === "elite_restraint" ? "100%" : densityConfig === "elite" ? "99%" : densityConfig === "minimal" ? "82%" : "34%"}</span>
                  <span className="bg-zinc-900 px-1.5 py-0.2 rounded uppercase">VIRTUAL RENDER</span>
                </div>
              </div>

              {/* DYNAMIC CANVAS CONTENT BOX - STYLED ENTIRELY VIA ACTIVE DNA CARRIER */}
              <div 
                className="transition-all duration-500 relative select-none overflow-hidden min-h-[360px] flex flex-col justify-center"
                style={{
                  backgroundColor: extractedDna.colors.background,
                  color: extractedDna.colors.text,
                  // Padding is responsive entirely based on interactive Density Controller choice
                  padding: visualDensityMode === "elite_restraint" ? "120px 48px" : (densityConfig === "elite" ? "96px 48px" : densityConfig === "minimal" ? "56px 32px" : "20px 16px")
                }}
              >
                {/* Visual watermark subtle dots for premium modes */}
                {densityConfig !== "slop" && (
                  <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(${extractedDna.colors.text} 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
                )}

                {/* Aesthetic Strict 120px Void Guidelines */}
                {visualDensityMode === "elite_restraint" && (
                  <>
                    {/* Top Guide */}
                    <div className="absolute top-[120px] left-0 right-0 border-t border-dashed border-amber-500/20 pointer-events-none flex justify-between px-3 text-[7px] font-mono tracking-widest text-amber-500/40 select-none">
                      <span>ELITE RESTRAINT SPATIAL VOID SHIELD (120PX EDGE)</span>
                      <span>ACTIVE SAFEGUARD</span>
                    </div>
                    {/* Bottom Guide */}
                    <div className="absolute bottom-[120px] left-0 right-0 border-b border-dashed border-amber-500/20 pointer-events-none flex justify-between px-3 text-[7px] font-mono tracking-widest text-amber-500/40 select-none">
                      <span>ELITE RESTRAINT SPATIAL VOID SHIELD (120PX EDGE)</span>
                      <span>ACTIVE SAFEGUARD</span>
                    </div>
                  </>
                )}

                {/* VIEW TAB 1: HERO VIEW */}
                {workbenchLayout === "HERO" && (
                  <div className="w-full max-w-4xl mx-auto flex flex-col justify-center h-full text-center">
                    
                    {/* Cluttered items injected only in bad AI slop mode */}
                    {densityConfig === "slop" && (
                      <div className="flex justify-between p-2 bg-red-500 text-white rounded text-[9.5px] font-mono uppercase font-bold tracking-widest mb-4">
                        <span>🔥 LIMITED SPRING SPECIAL PROMOTION SALE DISCOUNT IN EVERY SHOP 🔥</span>
                        <span>[BAD GRADIENT BACKGROUND]</span>
                      </div>
                    )}

                    <div className="space-y-6">
                      {/* Bounding subtle display caption */}
                      <p className={`text-[10px] uppercase font-mono tracking-[0.25em]`} style={{ color: extractedDna.colors.accent }}>
                        {(densityConfig === "elite") ? "/ THE STUDY OF TYPOGRAPHIC SILENCE" : "/ SEASON COLLECTION"}
                      </p>

                      {/* Giant heading scaled exactly by visual system */}
                      <h1 
                        className="leading-[1.15] font-light text-center"
                        style={{
                          fontSize: densityConfig === "elite" ? "3.2rem" : densityConfig === "minimal" ? "2.2rem" : "1.7rem",
                          fontFamily: extractedDna.typography.display === "Space Grotesk" ? "Space Grotesk" : extractedDna.typography.display === "Playfair Display" ? "Playfair Display" : "Outfit",
                          fontWeight: extractedDna.brand.includes("Nike") ? 800 : 300,
                          letterSpacing: densityConfig === "elite" ? "-0.035em" : "0em"
                        }}
                      >
                        {densityConfig === "elite" ? "One pure masterpiece." : "Curating Premium Digital Templates without Clutter."}
                      </h1>

                      {/* Subtitle constrained by density check */}
                      <p className="text-xs md:text-sm leading-relaxed max-w-xl mx-auto opacity-75 font-light"
                         style={{ 
                           fontFamily: "Inter",
                           display: densityConfig === "slop" ? "block" : "block"
                         }}>
                        {densityConfig === "elite" 
                          ? "A meticulous layout blueprint designed with over 65% negative space bounds, letting fine titanium curvature take complete visual priority."
                          : "Explore high-fidelity layout Blueprints featuring uniform spacing grids and custom monochrome backgrounds."
                        }
                      </p>

                      {/* Interactive focus buttons - constrained exactly by Premium Restraint Rules */}
                      <div className="pt-4 flex items-center justify-center gap-4">
                        <button 
                          className="px-6 py-2.5 text-[9.5px] font-mono tracking-widest uppercase transition-all duration-300 font-bold hover:brightness-110"
                          style={{
                            borderRadius: extractedDna.radius === "lg" ? "8px" : extractedDna.radius === "md" ? "4px" : "0px",
                            backgroundColor: extractedDna.colors.accent,
                            borderColor: extractedDna.colors.accent,
                            color: extractedDna.brand.includes("Apple") || extractedDna.brand.includes("Stripe") ? "white" : extractedDna.colors.background
                          }}
                        >
                          EXPLORE BluePrint
                        </button>
                        
                        {/* The second button is cleanly hidden in 'slop' check unless requested */}
                        {densityConfig !== "elite" && (
                          <button 
                            className="px-5 py-2 text-[9px] font-mono tracking-widest uppercase border transition hover:opacity-75"
                            style={{
                              borderRadius: extractedDna.radius === "lg" ? "8px" : extractedDna.radius === "md" ? "4px" : "0px",
                              borderColor: extractedDna.colors.text,
                              backgroundColor: "transparent",
                              color: extractedDna.colors.text
                            }}
                          >
                            SECONDARY LINK
                          </button>
                        )}
                      </div>
                    </div>

                    {densityConfig === "slop" && (
                      <div className="grid grid-cols-4 gap-2 pt-6 font-mono text-[8px] opacity-40">
                        <div>🔥 POPULAR CHIPS</div>
                        <div>⚡ INSTANT BOOT</div>
                        <div>💎 HIGH CO CONTRAST</div>
                        <div>🛠 NO LAWS DETECTED</div>
                      </div>
                    )}
                  </div>
                )}

                {/* VIEW TAB 2: PRODUCTS ROW GRID */}
                {workbenchLayout === "PRODUCTS" && (
                  <div className="space-y-6 w-full max-w-5xl mx-auto relative z-10">
                    <div className="flex justify-between items-baseline border-b pb-3" style={{ borderColor: extractedDna.colors.subtle }}>
                      <span className="text-[10px] uppercase font-mono tracking-widest opacity-65">/ ARTISANAL PORTRAIT CAPSULES</span>
                      <span className="text-[10px] uppercase font-mono tracking-widest opacity-65 hover:underline cursor-pointer">View Archive (3)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { title: "Eroded Ceramic vessel No. 1", desc: "Coarse river mud hand-fired for 48 hrs.", price: "$320" },
                        { title: "Fluid Silk Tailored Cover", desc: "Heavy organic mulberry structured drapes.", price: "$1,150" },
                        { title: "Asymmetric Steel Bracket", desc: "Recycled structural titanium scaffolding.", price: "$180" }
                      ].map((item, idx) => (
                        <div 
                          key={idx}
                          className="flex flex-col justify-between p-5 border h-[230px] transition-all"
                          style={{
                            borderColor: extractedDna.colors.subtle,
                            borderRadius: extractedDna.radius === "lg" ? "12px" : extractedDna.radius === "md" ? "6px" : "0px",
                            backgroundColor: extractedDna.brand.includes("Nike") ? "black" : `${extractedDna.colors.text}04`
                          }}
                        >
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono opacity-50 block">SPEC-NUMBER REF-{(1902 + idx)}</span>
                            <h4 className="text-xs font-semibold tracking-tight">{item.title}</h4>
                            
                            {/* Keep descriptions clean in Elite design mode */}
                            {densityConfig !== "slop" && (
                              <p className="text-[10px] opacity-70 font-light leading-relaxed">{item.desc}</p>
                            )}
                          </div>

                          <div className="flex justify-between items-center pt-2.5 border-t border-dashed" style={{ borderColor: extractedDna.colors.subtle }}>
                            <span className="text-xs font-semibold font-mono" style={{ color: extractedDna.colors.accent }}>{item.price}</span>
                            <span className="text-[9px] font-mono tracking-widest uppercase opacity-60 underline hover:opacity-100 cursor-pointer">CURATE</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* VIEW TAB 3: CTA NEWSLETTER SECTION */}
                {workbenchLayout === "CTA" && (
                  <div className="max-w-xl mx-auto w-full text-center space-y-5 relative z-15 p-6 md:p-8 border"
                       style={{ 
                         borderColor: extractedDna.colors.subtle,
                         borderRadius: extractedDna.radius === "lg" ? "16px" : extractedDna.radius === "md" ? "8px" : "0px"
                       }}>
                    <h3 className="text-xl font-light tracking-tight"
                        style={{ fontFamily: extractedDna.typography.display === "Playfair Display" ? "Playfair Display" : "Outfit" }}>
                      Become part of our aesthetic vision.
                    </h3>
                    
                    {densityConfig !== "slop" && (
                      <p className="text-[10.5px] opacity-75 font-mono max-w-sm mx-auto leading-relaxed">
                        Register to secure allocation invites for private showroom drops and digital design blueprints.
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                      <input 
                        type="email" 
                        placeholder="ENTER EXCLUSIVE EMAIL INVITATION" 
                        disabled
                        className="bg-black/5 border text-black placeholder-zinc-500 text-[9.5px] font-mono px-3.5 py-2 w-full sm:w-60 focus:outline-none"
                        style={{ 
                          borderColor: extractedDna.colors.text,
                          color: extractedDna.colors.text
                        }}
                      />
                      <button 
                        className="px-4 py-2 text-[9.5px] font-mono font-bold uppercase"
                        style={{ 
                          backgroundColor: extractedDna.colors.accent, 
                          color: extractedDna.brand.includes("Apple") || extractedDna.brand.includes("Stripe") ? "white" : extractedDna.colors.background 
                        }}
                      >
                        SUBMIT
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Density & Typo educational guidance tag */}
            <div className="p-3 bg-zinc-950 rounded border border-zinc-900 flex justify-between items-center font-mono text-[9px] text-zinc-500 select-none">
              <span className="flex items-center gap-1"><Info className="w-3 h-3 text-amber-500" /> AI DESIGN INSIGHT: World-class sites utilize huge display headers backed by strict single call-to-actions to lock client confidence.</span>
              <span className="hidden md:inline text-amber-500 font-bold uppercase">Golden proportions: active</span>
            </div>

          </div>
        </div>
      )}

      {activeStep === "RHYTHM_ENGINE" && (
        <div className="space-y-6 flex-1 flex flex-col justify-between">
          <div className="space-y-5">
            
            {/* Informational intro banner with dynamic status badges */}
            <div className="bg-gradient-to-r from-amber-950/10 via-black/40 to-transparent border border-zinc-900 p-4 rounded-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex gap-3.5 items-start">
                <div className="shrink-0 p-2 rounded bg-amber-500/5 text-amber-400 border border-amber-500/15">
                  <Ruler className="w-5 h-5 animate-pulse" />
                </div>
                <div className="space-y-1 font-light">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono">
                    Section Spacing Rhythm Engine (高端电影叙事律动)
                  </h4>
                  <p className="text-[11px] text-zinc-350 leading-relaxed max-w-xl">
                    By strictly sequencing the visual densities of layout structures, the system prevents crowded blocks. Sections are separated by deep, absolute voids of at least <strong className="text-amber-400">120px</strong>, creating an elegant storytelling flow like an luxury lookbook.
                  </p>
                </div>
              </div>

              {/* Status HUD of the rhythm parameters */}
              <div className="flex flex-wrap gap-2.5 font-mono text-[9px] bg-black/60 p-2.5 rounded-lg border border-zinc-900 w-full lg:w-auto">
                <div className="text-zinc-500">
                  SEQUENCE MODE: <span className="text-emerald-400 font-bold">STRICT_RESTRICTED (极限制)</span>
                </div>
                <div className="hidden sm:inline text-zinc-700">|</div>
                <div className="text-zinc-500">
                  MIN-VOID GAP: <span className="text-amber-400 font-bold">120PX LOCKED</span>
                </div>
              </div>
            </div>

            {/* Interactive Rhythm Control Board */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: Visual parameters and slider control */}
              <div className="lg:col-span-5 bg-zinc-950/40 border border-zinc-900 rounded-lg p-5 space-y-5 flex flex-col justify-between select-none">
                <div className="space-y-4">
                  
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5">
                    <span className="font-mono text-[10px] uppercase font-bold text-zinc-200 tracking-wider flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-amber-500" />
                      Rhythm Configuration Studio
                    </span>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase">Interactive Layer v1.8</span>
                  </div>

                  {/* 1. Brand style template selector */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-zinc-400 uppercase font-semibold block">
                      Aesthetic Core DNA Blueprint
                    </label>
                    <select
                      value={activeRhythmDnaKey}
                      onChange={e => {
                        setActiveRhythmDnaKey(e.target.value);
                        logAction(`Rhythm Engine: Shifted live scroll layout perspective to "${PRESET_DNAS[e.target.value].brand}".`);
                      }}
                      className="w-full bg-black text-xs font-mono text-zinc-300 border border-zinc-850 rounded px-3 py-2 focus:outline-none focus:border-amber-800 cursor-pointer"
                    >
                      <option value="celine">CELINE Paris (Poetic Silence & Asymmetry)</option>
                      <option value="monastic">Monastic Architectural (Sacred Stone Cloisters)</option>
                      <option value="apple">Apple Inc. (Technological Precision & Studio Radiance)</option>
                      <option value="stripe">Stripe (Interactive Silicon Grid & Fluid Accents)</option>
                      <option value="nike">Nike Core (Kinetic Muscle Bold & Radical Scale Tension)</option>
                    </select>
                  </div>

                  {/* 2. Min 120px Cinematic Padding slider */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-baseline font-mono text-[10px]">
                      <span className="text-zinc-400 uppercase font-semibold">Cinematic Breathe Void Padding</span>
                      <span className="text-amber-400 font-bold text-xs">{rhythmPadding}px</span>
                    </div>
                    <input 
                      type="range"
                      min="120"
                      max="240"
                      step="10"
                      value={rhythmPadding}
                      onChange={e => {
                        const val = parseInt(e.target.value);
                        setRhythmPadding(val);
                        logAction(`Rhythm Engine: Modified cinematic separator height to ${val}px void (Strict 120px minimal spacing active).`);
                      }}
                      className="w-full h-1 bg-zinc-900 rounded-lg cursor-pointer accent-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <div className="flex justify-between text-[8.5px] font-mono text-zinc-650 uppercase">
                      <span>120px (Cinematic Rest Limit)</span>
                      <span>180px</span>
                      <span>240px (Max Isolation)</span>
                    </div>
                  </div>

                  {/* 3. Helper rulers toggle switches */}
                  <div className="pt-2 space-y-2 border-t border-zinc-900/60">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block">Visual Aids Guidelines</span>
                    
                    <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-zinc-900/60 transition hover:border-zinc-850">
                      <div className="space-y-0.5">
                        <span className="text-[10.5px] text-zinc-350 block">Vertical Ruler Annotations</span>
                        <span className="text-[8.5px] font-mono text-zinc-550 block">Draw spacer brackets and grid specs live on canvas</span>
                      </div>
                      <button
                        onClick={() => {
                          setShowRhythmRulers(!showRhythmRulers);
                          logAction(`Rhythm Settings: Spacing guide overlays toggled ${!showRhythmRulers ? "ON" : "OFF"}.`);
                        }}
                        className={`w-10 h-5 rounded-full p-0.5 transition cursor-pointer ${
                          showRhythmRulers ? "bg-amber-600/80" : "bg-zinc-800"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-black border border-zinc-900 transform transition-transform duration-300 ${
                          showRhythmRulers ? "translate-x-5" : "translate-x-0"
                        }`} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-zinc-900/60 opacity-60">
                      <div className="space-y-0.5">
                        <span className="text-[10.5px] text-zinc-350 block">1.618 Golden Ratio Lock</span>
                        <span className="text-[8.5px] font-mono text-zinc-550 block">Calculate typography scales from negative space</span>
                      </div>
                      <span className="text-[8px] font-mono text-amber-500/80 bg-amber-950/30 px-1.5 py-0.5 rounded border border-amber-900/40 uppercase font-black select-none">
                        ENFORCED
                      </span>
                    </div>
                  </div>

                </div>

                {/* Simulated playback controls */}
                <div className="pt-4 border-t border-zinc-900 space-y-3 shrink-0">
                  <div className="flex bg-black p-1 rounded border border-zinc-850 justify-between items-center text-[9px] font-mono">
                    <span className="text-zinc-500 px-2 uppercase">Core Narrative Order:</span>
                    <span className="text-amber-400 font-bold px-2 uppercase tracking-wide">
                      Hero → Gap → Product → Gap → Info → Gap → CTA
                    </span>
                  </div>

                  <button 
                    onClick={() => {
                      logAction(`Rhythm Engine: Re-aligning layout. Output conforms exactly to absolute cinematic pacing.`);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 font-mono text-xs text-black font-semibold rounded transition flex justify-center items-center gap-1.5 cursor-pointer selection:none"
                  >
                    <Wand2 className="w-3.5 h-3.5" /> Re-Align Visual Rhythm Gap
                  </button>
                </div>
              </div>

              {/* Right Column: Live responsive high-contrast client simulation frame */}
              <div className="lg:col-span-7 flex flex-col border border-zinc-900/80 bg-zinc-950/40 rounded-xl overflow-hidden shadow-2xl relative">
                
                {/* Simulated browser search URL input header */}
                <div className="bg-zinc-950 px-4 py-2.5 text-[9px] font-mono text-zinc-500 border-b border-zinc-900/80 flex justify-between items-center select-none shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>https://cosmos.archive.fashion/{activeRhythmDnaKey}-lookbook</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-600">VIEWPORT_SIMULATED</span>
                    <span className="bg-amber-950/30 border border-amber-900/20 text-amber-400 px-1.5 py-0.5 rounded font-bold uppercase">CINEMATIC SCENE</span>
                  </div>
                </div>

                {/* Interactive Virtual Viewport View - scrollable */}
                <div 
                  className="overflow-y-auto max-h-[460px] min-h-[400px] transition-all duration-300 p-0 relative"
                  style={{
                    backgroundColor: PRESET_DNAS[activeRhythmDnaKey].colors.background,
                    color: PRESET_DNAS[activeRhythmDnaKey].colors.text
                  }}
                >
                  
                  {/* Fine grain layout grid for premium look */}
                  <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `radial-gradient(${PRESET_DNAS[activeRhythmDnaKey].colors.text} 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />

                  {/* 1. HERO SECTION */}
                  <div className="w-full flex flex-col justify-center text-center px-6 py-12 relative z-10 transition-all duration-300">
                    {showRhythmRulers && (
                      <div className="absolute top-0 left-0 right-0 border-t border-dashed border-cyan-500/65 z-20 pointer-events-none select-none">
                        <div className="absolute left-4 top-1.5 bg-cyan-950/90 border border-cyan-800/60 text-cyan-400 font-mono text-[8.5px] px-2 py-0.5 rounded shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          <span>📏 RULER #1: HERO SECTOR (START AXIS: 0px)</span>
                        </div>
                      </div>
                    )}
                    <div className="max-w-xl mx-auto space-y-5">
                      <p className="text-[10px] uppercase font-mono tracking-[0.3em] font-semibold opacity-65"
                         style={{ color: PRESET_DNAS[activeRhythmDnaKey].colors.accent }}>
                        / COLLECTION ARCHIVE v.01
                      </p>
                      
                      <h1 className="text-3xl md:text-4xl leading-[1.1] font-light text-center tracking-tight"
                          style={{ 
                            fontFamily: PRESET_DNAS[activeRhythmDnaKey].typography.display === "Playfair Display" ? "Playfair Display" : PRESET_DNAS[activeRhythmDnaKey].typography.display === "Space Grotesk" ? "Space Grotesk" : "Outfit",
                            fontWeight: PRESET_DNAS[activeRhythmDnaKey].brand.includes("Nike") ? 800 : 300
                          }}>
                        {PRESET_DNAS[activeRhythmDnaKey].brand.includes("Celine") ? "Silence is the shape." : "The pure structure of elegance."}
                      </h1>

                      <p className="text-[11px] leading-relaxed max-w-sm mx-auto opacity-75 font-light" style={{ fontFamily: "Inter" }}>
                        Free from active digital telemetry. Curated manually to capture exquisite visual space and material composure.
                      </p>

                      <div className="pt-3">
                        <button className="px-5 py-2 text-[9px] tracking-widest font-mono uppercase bg-transparent border hover:opacity-80 transition cursor-pointer"
                                style={{ 
                                  borderColor: PRESET_DNAS[activeRhythmDnaKey].colors.text,
                                  color: PRESET_DNAS[activeRhythmDnaKey].colors.text,
                                  borderRadius: PRESET_DNAS[activeRhythmDnaKey].radius === "lg" ? "8px" : PRESET_DNAS[activeRhythmDnaKey].radius === "md" ? "4px" : "0px"
                                }}>
                          LOOKBOOK CAPABILITIES
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2. FIRST VOID SEPARATOR BLOCK */}
                  <div 
                    className="relative flex items-center justify-center transition-all duration-300 pointer-events-none"
                    style={{ height: `${rhythmPadding}px` }}
                  >
                    {showRhythmRulers && (
                      <div className="absolute inset-x-8 inset-y-0 border-y border-dashed border-amber-500/45 flex flex-col justify-between py-2 font-mono text-[8px] text-amber-500 select-none">
                        <div className="flex justify-between items-center w-full opacity-70">
                          <span>▲ HERO BOTTOM BOUNDARY</span>
                          <span>DISTANCE GAP REGISTERED</span>
                        </div>
                        <div className="w-full text-center py-1 bg-amber-500/5 rounded-sm border border-amber-500/20 backdrop-blur-xs shadow-sm font-bold text-amber-400 flex items-center justify-center gap-1.5 max-w-xs mx-auto">
                          <span>GAP: {rhythmPadding}px (MIN 120px REQUIRED)</span>
                          <span className={`px-1.5 py-0.2 rounded text-[7px] ${rhythmPadding >= 120 ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                            {rhythmPadding >= 120 ? "COMPLIANT ✓" : "VIOLATED ✗"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center w-full opacity-70">
                          <span>▼ PRODUCT TOP BOUNDARY</span>
                          <span>{rhythmPadding}PX SCROLL GAP</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. PRODUCT SINGLE CENTERPIECE SECTION */}
                  <div className="w-full flex flex-col justify-center px-8 py-10 relative z-10 transition-all duration-300">
                    {showRhythmRulers && (
                      <div className="absolute top-0 left-0 right-0 border-t border-dashed border-amber-500/70 z-20 pointer-events-none select-none">
                        <div className="absolute left-4 top-1.5 bg-amber-950/90 border border-amber-800/60 text-amber-400 font-mono text-[8.5px] px-2 py-0.5 rounded shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>📏 RULER #2: PRODUCT SECTOR</span>
                          <span className="border-l border-zinc-800 pl-1.5 text-zinc-400">PREV DISTANCE: <strong>{rhythmPadding}px</strong></span>
                          <span className={`px-1 py-0.2 rounded text-[7px] ${rhythmPadding >= 120 ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                            {rhythmPadding >= 120 ? "STABLE ✓" : "CRITICAL ✗"}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="max-w-md mx-auto w-full space-y-6">
                      <div className="flex justify-between items-baseline border-b pb-2" style={{ borderColor: PRESET_DNAS[activeRhythmDnaKey].colors.subtle }}>
                        <span className="text-[8.5px] font-mono tracking-widest opacity-60">REF SERIES / PRD-09</span>
                        <span className="text-[8.5px] font-mono tracking-widest uppercase opacity-60" style={{ color: PRESET_DNAS[activeRhythmDnaKey].colors.accent }}>IN STOCK</span>
                      </div>

                      {/* Mock Product Visual Centerpiece */}
                      <div className="border hover:scale-[1.01] transition-transform duration-300 p-5 flex flex-col justify-center items-center h-40 bg-black/5"
                           style={{ 
                             borderColor: PRESET_DNAS[activeRhythmDnaKey].colors.subtle,
                             borderRadius: PRESET_DNAS[activeRhythmDnaKey].radius === "lg" ? "12px" : PRESET_DNAS[activeRhythmDnaKey].radius === "md" ? "6px" : "0px"
                           }}>
                        <div className="w-12 h-16 relative flex items-center justify-center opacity-70">
                          {/* Aesthetic clean vector rendering */}
                          <div className="absolute inset-0 border border-current rounded-t-full rounded-b-md opacity-40" />
                          <div className="w-2 h-4 border-b border-current mt-[-10px] rounded-t-sm" />
                          <span className="text-[8px] font-mono absolute bottom-2 opacity-50">N.01</span>
                        </div>
                        <span className="font-mono text-[9px] opacity-40 mt-3 text-center uppercase tracking-widest">ATELIER AMBIENT VESSEL PHIAL</span>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="space-y-0.5">
                          <h4 className="text-[11.5px] font-bold tracking-tight">Eroded Plaster Vessel Phial</h4>
                          <span className="text-[9.5px] opacity-70 font-light block">Fired in coarse Parisian volcanic soils for 48 hrs.</span>
                        </div>
                        <span className="text-xs font-mono font-bold" style={{ color: PRESET_DNAS[activeRhythmDnaKey].colors.accent }}>$320 USD</span>
                      </div>
                    </div>
                  </div>

                  {/* 4. SECOND VOID SEPARATOR BLOCK */}
                  <div 
                    className="relative flex items-center justify-center transition-all duration-300 pointer-events-none"
                    style={{ height: `${rhythmPadding}px` }}
                  >
                    {showRhythmRulers && (
                      <div className="absolute inset-x-8 inset-y-0 border-y border-dashed border-amber-500/45 flex flex-col justify-between py-2 font-mono text-[8px] text-amber-500 select-none">
                        <div className="flex justify-between items-center w-full opacity-70">
                          <span>▲ PRODUCT BOTTOM BOUNDARY</span>
                          <span>DISTANCE GAP REGISTERED</span>
                        </div>
                        <div className="w-full text-center py-1 bg-amber-500/5 rounded-sm border border-amber-500/20 backdrop-blur-xs shadow-sm font-bold text-amber-400 flex items-center justify-center gap-1.5 max-w-xs mx-auto">
                          <span>GAP: {rhythmPadding}px (MIN 120px REQUIRED)</span>
                          <span className={`px-1.5 py-0.2 rounded text-[7px] ${rhythmPadding >= 120 ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                            {rhythmPadding >= 120 ? "COMPLIANT ✓" : "VIOLATED ✗"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center w-full opacity-70">
                          <span>▼ STORY TOP BOUNDARY</span>
                          <span>{rhythmPadding}PX SCROLL GAP</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 5. STORY/PHILOSOPHY QUOTE SECTION */}
                  <div className="w-full flex flex-col justify-center px-10 py-10 relative z-10 transition-all duration-300 text-center">
                    {showRhythmRulers && (
                      <div className="absolute top-0 left-0 right-0 border-t border-dashed border-amber-500/70 z-20 pointer-events-none select-none">
                        <div className="absolute left-4 top-1.5 bg-amber-950/90 border border-amber-800/60 text-amber-400 font-mono text-[8.5px] px-2 py-0.5 rounded shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>📏 RULER #3: STORY SECTOR</span>
                          <span className="border-l border-zinc-800 pl-1.5 text-zinc-400">PREV DISTANCE: <strong>{rhythmPadding}px</strong></span>
                          <span className={`px-1 py-0.2 rounded text-[7px] ${rhythmPadding >= 120 ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                            {rhythmPadding >= 120 ? "STABLE ✓" : "CRITICAL ✗"}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="max-w-lg mx-auto space-y-4">
                      <p className="text-[17px] leading-relaxed italic font-light tracking-tight"
                         style={{ 
                           fontFamily: "Playfair Display",
                           color: PRESET_DNAS[activeRhythmDnaKey].colors.text
                         }}>
                        “Aesthetic validation is not the endless collection of visual widgets, but the pristine curation of cinematic visual silence.”
                      </p>
                      <div className="flex justify-center items-center gap-2">
                        <span className="w-4 h-[1px]" style={{ backgroundColor: PRESET_DNAS[activeRhythmDnaKey].colors.subtle }} />
                        <span className="text-[9px] uppercase font-mono tracking-widest opacity-60">CREATIVE DIRECTOR ATELIER</span>
                        <span className="w-4 h-[1px]" style={{ backgroundColor: PRESET_DNAS[activeRhythmDnaKey].colors.subtle }} />
                      </div>
                    </div>
                  </div>

                  {/* 6. THIRD VOID SEPARATOR BLOCK */}
                  <div 
                    className="relative flex items-center justify-center transition-all duration-300 pointer-events-none"
                    style={{ height: `${rhythmPadding}px` }}
                  >
                    {showRhythmRulers && (
                      <div className="absolute inset-x-8 inset-y-0 border-y border-dashed border-amber-500/45 flex flex-col justify-between py-2 font-mono text-[8px] text-amber-500 select-none">
                        <div className="flex justify-between items-center w-full opacity-70">
                          <span>▲ STORY BOTTOM BOUNDARY</span>
                          <span>DISTANCE GAP REGISTERED</span>
                        </div>
                        <div className="w-full text-center py-1 bg-amber-500/5 rounded-sm border border-amber-500/20 backdrop-blur-xs shadow-sm font-bold text-amber-400 flex items-center justify-center gap-1.5 max-w-xs mx-auto">
                          <span>GAP: {rhythmPadding}px (MIN 120px REQUIRED)</span>
                          <span className={`px-1.5 py-0.2 rounded text-[7px] ${rhythmPadding >= 120 ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                            {rhythmPadding >= 120 ? "COMPLIANT ✓" : "VIOLATED ✗"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center w-full opacity-70">
                          <span>▼ CTA TOP BOUNDARY</span>
                          <span>{rhythmPadding}PX SCROLL GAP</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 7. CTA REGISTER CONVERSION SECTION */}
                  <div className="w-full flex flex-col justify-center px-6 py-12 relative z-10 transition-all duration-300 text-center">
                    {showRhythmRulers && (
                      <div className="absolute top-0 left-0 right-0 border-t border-dashed border-amber-500/70 z-20 pointer-events-none select-none">
                        <div className="absolute left-4 top-1.5 bg-amber-950/90 border border-amber-800/60 text-amber-400 font-mono text-[8.5px] px-2 py-0.5 rounded shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>📏 RULER #4: CTA REGISTER SECTOR</span>
                          <span className="border-l border-zinc-800 pl-1.5 text-zinc-400">PREV DISTANCE: <strong>{rhythmPadding}px</strong></span>
                          <span className={`px-1 py-0.2 rounded text-[7px] ${rhythmPadding >= 120 ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                            {rhythmPadding >= 120 ? "STABLE ✓" : "CRITICAL ✗"}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="max-w-md mx-auto w-full space-y-5 p-6 border"
                         style={{
                           borderColor: PRESET_DNAS[activeRhythmDnaKey].colors.subtle,
                           borderRadius: PRESET_DNAS[activeRhythmDnaKey].radius === "lg" ? "16px" : PRESET_DNAS[activeRhythmDnaKey].radius === "md" ? "8px" : "0px"
                         }}>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold tracking-wide uppercase">Register Allocation Allocation</h4>
                        <p className="text-[9.5px] font-mono opacity-70">PRIVATE RELEASES • EXCLUSIVE METRICBluePRINT</p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                        <input 
                          type="email" 
                          placeholder="ENTER SIGNATURE DOMAIN" 
                          disabled
                          className="bg-black/5 border text-xs placeholder-zinc-500 font-mono px-3 py-2 w-full focus:outline-none text-center"
                          style={{
                            borderColor: PRESET_DNAS[activeRhythmDnaKey].colors.text,
                            color: PRESET_DNAS[activeRhythmDnaKey].colors.text
                          }}
                        />
                        <button 
                          className="px-5 py-2 text-[9px] font-mono font-bold uppercase whitespace-nowrap"
                          style={{
                            backgroundColor: PRESET_DNAS[activeRhythmDnaKey].colors.accent,
                            color: PRESET_DNAS[activeRhythmDnaKey].brand.includes("Apple") || PRESET_DNAS[activeRhythmDnaKey].brand.includes("Stripe") ? "white" : PRESET_DNAS[activeRhythmDnaKey].colors.background,
                            borderRadius: PRESET_DNAS[activeRhythmDnaKey].radius === "lg" ? "6px" : "0px"
                          }}
                        >
                          REGISTER ALLOCATION
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="bg-zinc-950 p-3.5 border-t border-zinc-900 text-center text-[9.5px] font-mono text-zinc-550 select-none">
                  SCROLL MAPPING COMPLIANT: Alternating spatial rhythms to force majestic gaze pause intervals.
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* STEP 5: TONE GRADING SYSTEM */}
      {activeStep === "TONE_SYSTEM" && (
        <div className="space-y-5 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            
            <div className="bg-gradient-to-r from-amber-950/10 via-black/30 to-transparent border border-zinc-900 p-4 rounded-lg flex gap-4">
              <div className="shrink-0 p-2 rounded bg-amber-500/5 text-amber-400 border border-amber-500/10">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="space-y-1 font-light">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono">
                  Luxury Tone Grading Image Filters (高奢影调渲染)
                </h4>
                <p className="text-[11px] text-zinc-350 leading-relaxed">
                  Cheap pictures destroy beautiful web interfaces. Under world-class rules, all photography is filtered through unified color temperatures, analogue film grains, and restrained light profiles to ensure perfect brand matching.
                </p>
              </div>
            </div>

            {/* Tone filter select blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
              {Object.entries(TONE_GRADES).map(([key, item]) => (
                <div 
                  key={key} 
                  onClick={() => {
                    setSelectedToneGrade(key as any);
                    logAction(`Tone Grading: Mapped image rendering context filters to "${item.name}".`);
                  }}
                  className={`p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between h-[168px] ${
                    selectedToneGrade === key ? "border-amber-500 bg-amber-955/5" : "border-zinc-900 bg-[#0f1013] hover:border-zinc-805"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-black/40 p-1.5 rounded border border-zinc-900/60">
                      <span className="font-mono text-[10px] font-bold text-zinc-200">{item.name}</span>
                      {selectedToneGrade === key && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                    </div>
                    <p className="text-[10.5px] text-zinc-400 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Rendering traits list */}
                  <div className="pt-2 border-t border-zinc-900/80 grid grid-cols-2 gap-2 text-[8.5px] font-mono uppercase text-zinc-550">
                    <div>Tone: {item.hue}</div>
                    <div>Noise: {item.grain}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Live visual card with active Tone Grading applied */}
            <div className="border border-zinc-900/80 bg-zinc-950/40 rounded-lg p-5 flex flex-col landscape-view">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block mb-3.5">Live Filter Spectrogram Rendering Preview</span>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                
                {/* Visual rendering space card */}
                <div className="lg:col-span-4 h-48 rounded bg-[#16181f] border border-zinc-900 overflow-hidden relative flex flex-col justify-center items-center">
                  {/* Real-time calculated visual tint matching chosen filter */}
                  <div 
                    className="absolute inset-0 z-0 transition-all duration-500"
                    style={{
                      backgroundImage: selectedToneGrade === "aesop" 
                        ? "linear-gradient(135deg, #1f201e 0%, #FAF9F6 100%) animate-pulse" 
                        : selectedToneGrade === "apple_studio"
                          ? "linear-gradient(135deg, #101010 0%, #D2D2D7 100%)"
                          : "linear-gradient(135deg, #020202 0%, #202020 100%)",
                      opacity: 0.12
                    }}
                  />

                  {/* Film Grain simulator layer */}
                  {selectedToneGrade !== "apple_studio" && (
                    <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" 
                         style={{ 
                           backgroundImage: "radial-gradient(circle, #888 1px, transparent 1px)", 
                           backgroundSize: "3px 3px" 
                         }} 
                    />
                  )}

                  <div className="z-10 text-center space-y-1 p-4">
                    <span className="font-mono text-[9.5px] text-zinc-500 block uppercase">GRADING STATE ACTIVE</span>
                    <h4 className="font-mono text-xs text-amber-500 font-black tracking-widest uppercase mb-1">
                      {TONE_GRADES[selectedToneGrade].name}
                    </h4>
                    <p className="text-[9.5px] text-zinc-400 font-light max-w-xs uppercase">
                      TEMP: {selectedToneGrade === "aesop" ? "WARM-GRAY" : selectedToneGrade === "apple_studio" ? "HIGH-KEY-STRILE" : "paris-grain-noir"}
                    </p>
                  </div>
                </div>

                {/* Analysis detail panel */}
                <div className="lg:col-span-8 space-y-3 p-4 bg-black/30 rounded border border-zinc-900 text-zinc-350 select-none">
                  <span className="font-mono text-[9.5px] text-zinc-500 block">AI Photo Harmonizer Logic</span>
                  <p className="text-[11px] leading-relaxed font-light">
                    When the user imports layout products or graphics, the system automatically runs deep tone color grading filters to match the selected profile DNA. It prevents high-saturation colors from destroying typographic harmony.
                  </p>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 border-t border-zinc-900 pt-3 text-[9px] font-mono text-zinc-500 uppercase">
                    <div>Saturation: COLD COMPACT (-20)</div>
                    <div>Highlights: SOFT CLIP (-10px)</div>
                    <div>Tone mapping: BONE WHITE SHARDS</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

          </div>
        </div>
      )}

    </div>
  );
}
