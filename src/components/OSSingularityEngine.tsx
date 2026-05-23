import React, { useState } from "react";
import { SingularityBrand, SingularityProduct } from "../types";
import { 
  Sparkles, ArrowRight, RefreshCw, Layers, ShieldCheck, 
  Zap, Star, Layout, PenTool, CheckCircle, AlertCircle, 
  Download, ShoppingBag, Eye, Sliders, HardDrive, Info, Trash2, ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { enforceAestheticLaws } from "../lib/aesthetic-law-filter";
import { evaluateAestheticScores } from "../lib/aesthetic-score-engine";
import { compileDesignTokens } from "../lib/design-token-compiler";
import { DSLRenderer } from "../lib/dsl-renderer";

interface OSSingularityEngineProps {
  onInjectProcess: (procName: string) => void;
  onInjectBrand?: (brand: SingularityBrand) => void;
  logAction: (msg: string) => void;
}

const PRESETS = [
  {
    label: "Obsidian Goth • 漆黑先锋",
    prompt: "Rick Owens 漆黑极简先锋店阁，非对称玄武石切面与多边形不规则铸铁拉手，哑光黑色防水蜡染棉服",
    icon: "🌑"
  },
  {
    label: "Organic Clay • 素泥茶室",
    prompt: "侘寂粗砂赤陶东方茶室 showroom，原石粗糙浮雕搁板， undyed 亚麻轻盈罩衫与纯手工粘土粗陶罐",
    icon: "🏺"
  },
  {
    label: "Cyber Membrane • 零重极点",
    prompt: "Vortex 高性能真空模塑户外机能庇护所，碳纤维支撑外骨架，无缝压合乳胶背包与钛合金防风夹克",
    icon: "🪐"
  },
  {
    label: "Cashmere Wholesale • 绒系批发",
    prompt: "高端羊绒衫与高档皮包批发品牌，面向欧洲买手店，展示少量及大量结合的精美SKU，设计面料图书馆、高级分级询价与分级准入功能，Loro Piana极简奢华视觉",
    icon: "🦙"
  },
  {
    label: "Minimalist Atelier • 极简丝绸",
    prompt: "极致象牙白真丝手工高定制衣坊，极宽阔负空间，天然胡桃木弧形展示架，重磅桑蚕丝斜襟褶皱大衣",
    icon: "✨"
  }
];

export default function OSSingularityEngine({
  onInjectProcess,
  onInjectBrand,
  logAction
}: OSSingularityEngineProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generationPhase, setGenerationPhase] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"PREVIEW" | "TOKENS" | "EVALUATION">("PREVIEW");
  const [brand, setBrand] = useState<SingularityBrand | null>(null);
  const [injected, setInjected] = useState(false);
  const [auditViolations, setAuditViolations] = useState<string[]>([]);

  // Boutique Storefront Interactive sub-state
  const [boutiqueSubTab, setBoutiqueSubTab] = useState<"HOME" | "PRODUCTS" | "PHILOSOPHY" | "B2B" | "CART">("HOME");
  const [cart, setCart] = useState<SingularityProduct[]>([]);

  const simulateProgress = (text: string, ms: number): Promise<void> => {
    return new Promise(resolve => {
      setGenerationPhase(text);
      setTimeout(resolve, ms);
    });
  };

  const handleGenerate = async (selectedPrompt?: string) => {
    const targetPrompt = selectedPrompt || prompt;
    if (!targetPrompt.trim()) return;

    setLoading(true);
    setInjected(false);
    setCart([]);
    setBoutiqueSubTab("HOME");
    setAuditViolations([]);
    logAction(`Singularity Compiler Launch: Escalating prompt "${targetPrompt}" into 7-Layer high-fashion system`);

    try {
      await simulateProgress("Layer 1/7: Extracting Brand Semantic DNA & Luxury Tier...", 800);
      await simulateProgress("Layer 2/7: Compiling Design Tokens (Radius scale, Margins & Curves)...", 750);
      await simulateProgress("Layer 3/7: Synthesizing approved Luxury Catalog Components & Copy...", 850);
      await simulateProgress("Layer 4/7: Orchestrating Spatial Composition and density restraints...", 700);
      await simulateProgress("Layer 5/7: Building Responsive Mobile-First viewport rules...", 600);
      await simulateProgress("Layer 6/7: Checking Visual Stability Constraints & noise threshold...", 650);
      await simulateProgress("Layer 7/7: AI Fashion Director automated audit & scoring...", 550);

      const res = await fetch("/api/os/singularity-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: targetPrompt })
      });

      if (!res.ok) throw new Error("Singularity Compiler Busy");
      const data = await res.json();

      // Ensure stable token parsing
      const compiledTokens = compileDesignTokens(targetPrompt);
      const enrichedBrand: SingularityBrand = {
        ...data,
        brandUnderstanding: {
          ...data.brandUnderstanding,
          luxuryTier: compiledTokens.luxury_tier,
          materialLanguage: compiledTokens.material_language,
          silenceRatio: compiledTokens.silence_ratio
        },
        designTokens: {
          ...data.designTokens,
          radius: compiledTokens.luxury_tier === "ultra-luxury" ? "none" : (data.designTokens?.radius || "4px"),
          spacingMax: compiledTokens.visual_density === "silent" ? "gap-24" : "gap-16",
          surfaceNoise: compiledTokens.silence_ratio > 0.8 ? 0.02 : 0.04
        }
      };

      // Apply aesthetic constraints & scoring filters
      const { rectifiedBrand, violations } = enforceAestheticLaws(enrichedBrand);
      const auditScores = evaluateAestheticScores(rectifiedBrand);

      rectifiedBrand.scores = {
        ...rectifiedBrand.scores,
        visualTension: Math.min(98, auditScores.luxuryScore - 3),
        luxuryFeeling: auditScores.luxuryScore,
        whitespaceScore: auditScores.silenceScore,
        brandConsistency: auditScores.editorialScore,
        premiumDensity: auditScores.premiumDensity,
        cognitiveNoise: auditScores.visualNoise
      };

      setAuditViolations(violations);
      setBrand(rectifiedBrand);
      
      logAction(`[Compiler-Ready] "${rectifiedBrand.brandName}" compiled. Scores: Luxury: ${rectifiedBrand.scores.luxuryFeeling}% | Whitespace: ${rectifiedBrand.scores.whitespaceScore}%`);
      
      if (violations.length > 0) {
        logAction(`[Anti-Noise Guard] Cleaned & resolved ${violations.length} design rule alerts.`);
      }
    } catch (err) {
      logAction(`[Compiler Failure] Error during industrial synthesis pipeline.`);
    } finally {
      setLoading(false);
      setGenerationPhase("");
    }
  };

  const handleInjectToOS = () => {
    if (!brand) return;
    onInjectProcess(`Shopfront-${brand.brandName.split(" ")[0]}`);
    if (onInjectBrand) {
      onInjectBrand(brand);
    }
    logAction(`Injected curated "${brand.brandName}" design tokens and structures directly into V0 compiler.`);
    setInjected(true);
  };

  const handleDownloadJSON = () => {
    if (!brand) return;
    const dataStr = JSON.stringify(brand, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const cleanName = brand.brandName.replace(/[•\s·]+/g, "-").toLowerCase();
    link.href = url;
    link.download = `${cleanName || "brand"}-compiled-specs.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    logAction(`Brand Asset: Downloaded design specs of "${brand.brandName}" as verified JSON DSL`);
  };

  const handleAddToCart = (product: SingularityProduct) => {
    setCart(prev => [...prev, product]);
    logAction(`Brand Store: Added item "${product.name}" to luxury bag checklist.`);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(prev => prev.filter((_, idx) => idx !== index));
    logAction("Brand Store: Removed item from shopping checklist.");
  };

  return (
    <div id="singularity-engine" className="border border-zinc-800/80 bg-cosmos-gray/70 rounded-lg p-5 flex flex-col min-h-[520px]">
      {/* Header telemetry bar */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4.5 h-4.5 text-indigo-400 animate-pulse" />
          <h2 className="font-display font-semibold text-sm uppercase tracking-widest text-zinc-200">
            Industrial High-Luxury OS Brand Compiler (「一句话开店」工业化编译引擎)
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
            7-Layer Design State Machine Active
          </span>
        </div>
      </div>

      {/* Intro info section */}
      <div className="bg-gradient-to-r from-zinc-950/40 via-black/20 to-transparent border border-zinc-800/60 p-4 rounded-lg mb-4 text-xs">
        <div className="flex items-center gap-2 text-zinc-200 font-semibold mb-1.5">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>7 层生成管线 (7-Layer Commercial Synthesis Pipeline)</span>
        </div>
        <p className="text-zinc-400 font-light leading-relaxed">
          真正的专业级世界品牌店生成，超越简单的自由代码拼凑。系统通过
          <strong className="text-zinc-200 font-bold mx-1">①品牌理解层</strong>、
          <strong className="text-zinc-200 font-bold mx-1">②设计Token编译器</strong>、
          <strong className="text-zinc-200 font-bold mx-1">③高级组件库</strong>、
          <strong className="text-zinc-200 font-bold mx-1">④视线比例构图器</strong>、
          <strong className="text-zinc-200 font-bold mx-1">⑤高阶主题包</strong>以及
          <strong className="text-zinc-200 font-bold mx-1">⑥多重页面商用架</strong>，在绝对审美限制器（强约束）下输出完美的商用前端。
        </p>
      </div>

      {/* Manual Input Area or loader */}
      {!loading && !generationPhase ? (
        <div className="space-y-3 shrink-0">
          <div className="flex gap-2.5">
            <div className="flex-1 bg-black rounded border border-zinc-800 px-3 py-2.5 flex items-center gap-2">
              <input
                type="text"
                placeholder="输入一句话品牌构想 (e.g., '一间粗砂赤陶茶室，带有原木货架' or 'An ivory silk showroom with structured drapes')"
                className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-zinc-700"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleGenerate()}
              />
            </div>
            <button
              onClick={() => handleGenerate()}
              disabled={!prompt.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-900 disabled:text-zinc-600 disabled:border-zinc-800 text-white font-mono text-xs font-bold px-5 rounded border border-indigo-500 hover:border-indigo-400 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              Compile Store <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Presets Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {PRESETS.map(pre => (
              <button
                key={pre.label}
                onClick={() => {
                  setPrompt(pre.prompt);
                  handleGenerate(pre.prompt);
                }}
                className="bg-black/30 hover:bg-zinc-900/40 p-2.5 rounded text-left border border-zinc-900 hover:border-zinc-800 transition text-[11px] font-mono group cursor-pointer"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span>{pre.icon}</span>
                  <span className="text-zinc-300 font-bold group-hover:text-indigo-400 transition-colors">{pre.label}</span>
                </div>
                <p className="text-zinc-500 text-[9px] line-clamp-1 font-light leading-tight">{pre.prompt}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Loader Pipeline State */
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black/40 border border-zinc-900 rounded-lg">
          <div className="flex flex-col items-center max-w-md text-center space-y-4">
            <RefreshCw className="w-9 h-9 animate-spin text-indigo-400" />
            <div className="space-y-1.5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-200">
                STABLE INDUSTRIAL PIPELINE ACTIVE
              </h3>
              <p className="font-mono text-xs text-indigo-400 font-bold max-w-md break-words leading-relaxed animate-pulse">
                {generationPhase}
              </p>
            </div>
            <div className="w-56 bg-zinc-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-2/5 animate-[shuttle_1.5s_infinite_linear]"></div>
            </div>
          </div>
        </div>
      )}

      {/* Render Generated Brand Workspace */}
      {brand && !loading && (
        <div className="flex-1 min-h-0 mt-5 border border-zinc-800 rounded-lg overflow-hidden flex flex-col bg-black/30">
          
          {/* Main Tab Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center bg-zinc-950 p-3 border-b border-zinc-900 gap-3 shrink-0">
            <div className="flex gap-1.5 text-[11px] font-mono overflow-x-auto">
              <button
                onClick={() => setActiveTab("PREVIEW")}
                className={`px-3 py-1 rounded cursor-pointer select-none border transition whitespace-nowrap ${
                  activeTab === "PREVIEW" ? "bg-zinc-800 text-white border-zinc-700 font-bold" : "text-zinc-500 hover:text-zinc-400 border-transparent"
                }`}
              >
                🏠 多页商用预览 (Commercial Mockup)
              </button>
              <button
                onClick={() => setActiveTab("TOKENS")}
                className={`px-3 py-1 rounded cursor-pointer select-none border transition whitespace-nowrap ${
                  activeTab === "TOKENS" ? "bg-zinc-800 text-white border-zinc-700 font-bold" : "text-zinc-500 hover:text-zinc-400 border-transparent"
                }`}
              >
                ⚙️ 智能设计Token编译 (Design Tokens)
              </button>
              <button
                onClick={() => setActiveTab("EVALUATION")}
                className={`px-3 py-1 rounded cursor-pointer select-none border transition whitespace-nowrap ${
                  activeTab === "EVALUATION" ? "bg-zinc-800 text-white border-zinc-700 font-bold" : "text-zinc-500 hover:text-zinc-400 border-transparent"
                }`}
              >
                ⚖️ 审美品控分析 (Aesthetic Audit)
              </button>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={handleDownloadJSON}
                className="px-3 py-1 text-[11px] font-bold font-mono rounded select-none border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-600 text-amber-400 cursor-pointer flex items-center gap-1 transition-all"
                title="Download Compiled Brand Specs as JSON DSL Asset"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Specs JSON</span>
              </button>
              <button
                onClick={handleInjectToOS}
                disabled={injected}
                className={`px-3.5 py-1 text-[11px] font-bold font-mono rounded select-none border cursor-pointer flex items-center gap-1 transition-all ${
                  injected
                    ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/50 cursor-default"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500 active:scale-95"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{injected ? "Injected to V0" : "Inject to V0 Workbench"}</span>
              </button>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-4 min-h-[400px]">
            {/* TAB 1: COMMERCIAL MULTI-PAGE STORE PREVIEW */}
            {activeTab === "PREVIEW" && (
              <DSLRenderer 
                brand={brand} 
                onAddToCart={handleAddToCart} 
                cartCount={cart.length} 
                onNavigateToTab={(tab) => setBoutiqueSubTab(tab)} 
              />
            )}
            {false && activeTab === "PREVIEW" && (
              <div
                className="rounded-lg p-5 font-sans border shadow-2xl relative overflow-hidden transition-all duration-700"
                style={{
                  backgroundColor: brand.colors.background,
                  color: brand.colors.text,
                  borderColor: brand.colors.subtle
                }}
              >
                {/* Surface Fine Grain representation with background grain CSS */}
                <div
                  className="absolute inset-0 opacity-[0.025] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(${brand.colors.text} 1px, transparent 1px)`,
                    backgroundSize: "20px 20px"
                  }}
                ></div>

                {/* Micro Ambient Vapor Glow near top left */}
                <div 
                  className="absolute top-0 left-0 w-72 h-72 rounded-full filter blur-[100px] pointer-events-none transition-all"
                  style={{
                    backgroundColor: brand.colors.accent,
                    opacity: 0.05
                  }}
                ></div>

                {/* BRAND BOUTIQUE HEADER */}
                <div className="flex flex-col sm:flex-row justify-between items-center pb-5 border-b mb-6 relative z-10 gap-3"
                     style={{ borderColor: `${brand.colors.text}1F` }}>
                  <div className="flex items-center gap-2">
                    <span
                      className="tracking-widest uppercase text-lg"
                      style={{
                        fontFamily: brand.typography.display === "Space Grotesk" ? "Space Grotesk" : brand.typography.display === "Playfair Display" ? "Playfair Display" : "Outfit",
                        fontWeight: 700
                      }}
                    >
                      {brand.brandName}
                    </span>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded border uppercase opacity-60 ml-2"
                          style={{ borderColor: `${brand.colors.text}3B` }}>
                      {brand.brandUnderstanding?.luxuryTier || "ULTRA-LUXURY"}
                    </span>
                  </div>

                  {/* Dynamic Inline Store Sub Nav bar with counts */}
                  <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase font-mono">
                    <button
                      onClick={() => setBoutiqueSubTab("HOME")}
                      className={`transition-colors py-1 relative ${
                        boutiqueSubTab === "HOME" ? "font-bold text-indigo-500" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <span>首页 HOME</span>
                      {boutiqueSubTab === "HOME" && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500" />}
                    </button>
                    <button
                      onClick={() => setBoutiqueSubTab("PRODUCTS")}
                      className={`transition-colors py-1 relative ${
                        boutiqueSubTab === "PRODUCTS" ? "font-bold text-indigo-500" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <span>单品 CATALOG ({brand.products.length})</span>
                      {boutiqueSubTab === "PRODUCTS" && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500" />}
                    </button>
                    <button
                      onClick={() => setBoutiqueSubTab("PHILOSOPHY")}
                      className={`transition-colors py-1 relative ${
                        boutiqueSubTab === "PHILOSOPHY" ? "font-bold text-indigo-500" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <span>空间哲学 PHILOSOPHY</span>
                      {boutiqueSubTab === "PHILOSOPHY" && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500" />}
                    </button>
                    <button
                      onClick={() => setBoutiqueSubTab("CART")}
                      className={`transition-colors py-1 relative flex items-center gap-1.5 ${
                        boutiqueSubTab === "CART" ? "font-bold text-indigo-500" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>袋 BAG ({cart.length})</span>
                      {boutiqueSubTab === "CART" && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500" />}
                    </button>
                  </div>
                </div>

                {/* VIEW CONTROLLER AREA */}
                <AnimatePresence mode="wait">
                  {/* SUB-VIEW 1: STORY/EDITORIAL REVERSIBLE HERO FOOTLIGHT */}
                  {boutiqueSubTab === "HOME" && (
                    <motion.div
                      key="home"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-10 relative z-10"
                    >
                      {/* Interactive Cinematics Block */}
                      <div className="text-center py-10 md:py-14 space-y-4 max-w-2xl mx-auto">
                        <p
                          className="text-2xl md:text-3.5xl tracking-tight leading-snug font-light italic"
                          style={{
                            fontFamily: brand.typography.display === "Space Grotesk" ? "Space Grotesk" : brand.typography.display === "Playfair Display" ? "Playfair Display" : "Outfit"
                          }}
                        >
                          “{brand.slogan}”
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="h-[0.5px] w-8 opacity-30" style={{ backgroundColor: brand.colors.text }}></span>
                          <span className="text-[10px] uppercase tracking-[0.2em] font-mono opacity-60">
                            Designer Vibe: {brand.typography.style}
                          </span>
                          <span className="h-[0.5px] w-8 opacity-30" style={{ backgroundColor: brand.colors.text }}></span>
                        </div>
                      </div>

                      {/* Wide editorial placement with high composition focus */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
                        <div className="space-y-4">
                          <span className="text-[10px] uppercase tracking-widest opacity-50 block font-mono">
                            EDITORIAL DIRECTIVE
                          </span>
                          <h3
                            className="text-xl md:text-2.5xl font-semibold tracking-tight leading-normal"
                            style={{
                              fontFamily: brand.typography.display === "Space Grotesk" ? "Space Grotesk" : brand.typography.display === "Playfair Display" ? "Playfair Display" : "Outfit"
                            }}
                          >
                            {brand.editorialBlock.title}
                          </h3>
                          <p className="text-xs opacity-75 leading-relaxed font-light whitespace-pre-line text-justify">
                            {brand.editorialBlock.body}
                          </p>
                          <div className="pt-2">
                            <button
                              onClick={() => setBoutiqueSubTab("PRODUCTS")}
                              className="px-4 py-2 border text-[10px] tracking-widest font-mono font-bold uppercase transition hover:invert duration-300"
                              style={{ borderColor: brand.colors.text, color: brand.colors.text }}
                            >
                              Browse Curations →
                            </button>
                          </div>
                        </div>

                        {/* Museum Image / Architecture representation outline */}
                        <div 
                          className="aspect-square relative flex items-center justify-center rounded overflow-hidden p-6 border transition-all duration-500"
                          style={{ 
                            borderColor: `${brand.colors.text}1C`,
                            backgroundColor: `${brand.colors.text}06`
                          }}
                        >
                          <div className="absolute inset-2 border border-dashed opacity-25" style={{ borderColor: brand.colors.text }}></div>
                          <div className="text-center space-y-3 z-10 max-w-xs">
                            <span className="text-[9px] font-mono tracking-widest uppercase opacity-40">Spatial Perspective</span>
                            
                            {/* Sketch rendering based on style */}
                            <svg className="w-24 h-24 mx-auto opacity-35" viewBox="0 0 100 100">
                              {brand.typography.style === "Minimalist" ? (
                                <circle cx="50" cy="50" r="30" fill="none" stroke={brand.colors.text} strokeWidth="1" strokeDasharray="1,1" />
                              ) : brand.typography.style === "Brutalist" ? (
                                <rect x="20" y="20" width="60" height="60" fill="none" stroke={brand.colors.text} strokeWidth="1" />
                              ) : brand.typography.style === "Avant-Garde" ? (
                                <polygon points="50,15 85,80 15,80" fill="none" stroke={brand.colors.text} strokeWidth="1" />
                              ) : (
                                <ellipse cx="50" cy="50" rx="40" ry="25" fill="none" stroke={brand.colors.text} strokeWidth="1" />
                              )}
                              <line x1="10" y1="50" x2="90" y2="50" stroke={brand.colors.text} strokeWidth="0.5" opacity="0.4" />
                              <line x1="50" y1="10" x2="50" y2="90" stroke={brand.colors.text} strokeWidth="0.5" opacity="0.4" />
                            </svg>
                            
                            <p className="text-[10px] italic opacity-60 font-light leading-relaxed">
                              &quot;{brand.brandUnderstanding?.spatialAtmosphere || "Raw sand textures with quiet lighting transitions."}&quot;
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SUB-VIEW 2: COMMERCIAL PRODUCTS LIST */}
                  {boutiqueSubTab === "PRODUCTS" && (
                    <motion.div
                      key="products"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-6 relative z-10"
                    >
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] uppercase tracking-widest opacity-50 block font-mono">
                          MUSEUM PRODUCT CATALOG (精选单品库)
                        </span>
                        <span className="text-[9px] opacity-40 font-mono">
                          Spatial Scale: Standard Responsive
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {brand.products.map((prod, idx) => (
                          <div
                            key={idx}
                            className="rounded flex flex-col justify-between h-[360px] p-4 border transition-all hover:translate-y-[-2px]"
                            style={{
                              borderColor: brand.colors.subtle,
                              backgroundColor: `${brand.colors.text}06`,
                              borderRadius: brand.designTokens?.radius === "none" ? "0" : brand.designTokens?.radius || "4px"
                            }}
                          >
                            {/* Product Silhouette / Technical Line Drawing Diagram */}
                            <div
                              className="h-32 rounded flex flex-col justify-between p-2 relative overflow-hidden"
                              style={{
                                borderColor: `${brand.colors.text}1F`,
                                backgroundColor: brand.colors.background,
                                borderRadius: brand.designTokens?.radius === "none" ? "0" : brand.designTokens?.radius || "4px"
                              }}
                            >
                              <div className="flex justify-between text-[8px] font-mono opacity-40">
                                <span>Blueprint Rev-{104 + idx}</span>
                                <span>{prod.silhouette}</span>
                              </div>
                              
                              {prod.image ? (
                                <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply flex items-center justify-center p-2">
                                  <img 
                                    src={prod.image} 
                                    alt={prod.name}
                                    className="w-full h-full object-contain saturate-50 hover:saturate-100 transition-all pointer-events-none"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              ) : null}

                              {/* Geometry Drafting line art */}
                              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 80">
                                <circle cx="50" cy="40" r="18" fill="none" stroke={brand.colors.accent} strokeWidth="0.5" opacity="0.2" />
                                <rect x="35" y="25" width="30" height="30" fill="none" stroke={brand.colors.accent} strokeWidth="0.5" opacity="0.15" />
                                <path d="M10,40 L90,40" stroke={brand.colors.accent} strokeWidth="0.25" strokeDasharray="2,2" opacity="0.3" />
                              </svg>

                              <span className="text-[8px] font-mono text-right opacity-60 uppercase tracking-widest mt-auto z-10">
                                {prod.material.split(" ")[0]}
                              </span>
                            </div>

                            {/* Details and Pricing */}
                            <div className="mt-4 space-y-2 flex-1 flex flex-col justify-between">
                              <div className="space-y-1">
                                <div className="flex justify-between items-baseline gap-2">
                                  <h4 className="font-semibold text-xs tracking-tight line-clamp-1">{prod.name}</h4>
                                  <span className="text-xs font-mono font-bold shrink-0" style={{ color: brand.colors.accent }}>
                                    {prod.price}
                                  </span>
                                </div>
                                <p className="text-[10px] opacity-70 font-light leading-relaxed line-clamp-2">
                                  {prod.description}
                                </p>
                              </div>

                              <div className="space-y-2 pt-2 border-t border-dashed" style={{ borderColor: brand.colors.subtle }}>
                                <div className="text-[8.5px] font-mono opacity-50 leading-relaxed uppercase">
                                  材质: {prod.material}
                                </div>
                                <button
                                  onClick={() => handleAddToCart(prod)}
                                  className="w-full py-1.5 text-[9px] tracking-widest font-mono uppercase font-bold text-white transition hover:opacity-90 active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                                  style={{
                                    backgroundColor: brand.colors.accent,
                                    borderRadius: brand.designTokens?.radius === "none" ? "0" : brand.designTokens?.radius || "4px"
                                  }}
                                >
                                  <ShoppingBag className="w-2.5 h-2.5" />
                                  <span>CHECK IN TO BAG (加入清单)</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* SUB-VIEW 3: BRAND DNA / PHILOSOPHY */}
                  {boutiqueSubTab === "PHILOSOPHY" && (
                    <motion.div
                      key="philosophy"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-6 relative z-10"
                    >
                      <span className="text-[10px] uppercase tracking-widest opacity-50 block font-mono">
                        BRAND ARCHITECTURAL PHILOSOPHY (设计架构层)
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-black/5 p-4 rounded border space-y-3.5" style={{ borderColor: brand.colors.subtle }}>
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider opacity-90">
                            Layer 1: Brand Concept & Target
                          </h4>
                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="opacity-50 block font-mono text-[9px]">DESIGNER INTENT LEVEL</span>
                              <p className="font-light italic">{brand.designerVibe}</p>
                            </div>
                            <div>
                              <span className="opacity-50 block font-mono text-[9px]">TARGET CONSUMER GROUP</span>
                              <p className="font-light">{brand.brandUnderstanding?.customerProfile || "High-end art collectors and intellectual connoisseurs"}</p>
                            </div>
                            <div>
                              <span className="opacity-50 block font-mono text-[9px]">SPATIAL ATMOSPHERE SILENCE RATIO</span>
                              <p className="font-mono font-bold">{(brand.brandUnderstanding?.silenceRatio || 0.85) * 100}% Silence Degree</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-black/5 p-4 rounded border space-y-3.5" style={{ borderColor: brand.colors.subtle }}>
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider opacity-90">
                            Layer 2: Material Systems Map
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <span className="opacity-50 block font-mono text-[9px] mb-1.5">APPROVED NOISE LIMIT MATERIALS</span>
                              <div className="flex flex-wrap gap-1.5">
                                {(brand.brandUnderstanding?.materials || ["ash slate", "coarse granite", "undyed linen"]).map(mat => (
                                  <span key={mat} className="px-2 py-0.5 rounded text-[10px] font-mono border bg-white/40 uppercase"
                                        style={{ borderColor: `${brand.colors.text}1C` }}>
                                    {mat}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="opacity-50 block font-mono text-[9px]">ATMOSPHERIC TEXTURE EXPLANATION</span>
                              <p className="text-xs font-light leading-relaxed">
                                {brand.brandUnderstanding?.spatialAtmosphere || "Raw uncooperative minerals matched with slow lighting to generate intense visual weight."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Wide Manifesto quotation banner */}
                      <div className="p-6 text-center border rounded bg-black/5 flex flex-col items-center space-y-2" style={{ borderColor: brand.colors.subtle }}>
                        <Info className="w-5 h-5 opacity-40 mb-1" />
                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">DESIGN INTEGRITY COMMITMENT</span>
                        <p className="text-sm italic font-light max-w-xl leading-relaxed">
                          &quot;Luxury is derived purely from self-restraint and precise execution. We limit visual elements to allow your merchandise to speak with uncorrupted voice.&quot;
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* SUB-VIEW 4: ACTIVE SHOPPING BAG (CART) */}
                  {boutiqueSubTab === "CART" && (
                    <motion.div
                      key="cart"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-6 relative z-10"
                    >
                      <span className="text-[10px] uppercase tracking-widest opacity-50 block font-mono">
                        ESTATE ACQUISITIONS CHECKOUT (高规格结算)
                      </span>

                      {cart.length === 0 ? (
                        <div className="text-center py-12 border border-dashed rounded flex flex-col items-center justify-center space-y-3 opacity-60"
                             style={{ borderColor: brand.colors.subtle }}>
                          <ShoppingBag className="w-8 h-8 opacity-40" />
                          <p className="font-mono text-xs uppercase tracking-widest">Your acquisition bag is empty</p>
                          <button
                            onClick={() => setBoutiqueSubTab("PRODUCTS")}
                            className="px-3.5 py-1 text-[9px] font-mono font-bold border uppercase tracking-wider transition hover:invert"
                            style={{ borderColor: brand.colors.text }}
                          >
                            Add Curated Elements
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* List of checkout items with custom layout */}
                          <div className="divide-y" style={{ borderColor: `${brand.colors.text}1F` }}>
                            {cart.map((item, idx) => (
                              <div key={idx} className="py-4 flex justify-between items-center gap-4">
                                <div className="space-y-0.5">
                                  <h5 className="font-bold text-xs">{item.name}</h5>
                                  <p className="text-[10px] opacity-60 font-mono tracking-widest uppercase">
                                    {item.silhouette} • ({item.material.split(",")[0]})
                                  </p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="font-mono text-xs font-bold" style={{ color: brand.colors.accent }}>
                                    {item.price}
                                  </span>
                                  <button
                                    onClick={() => handleRemoveFromCart(idx)}
                                    className="p-1 hover:text-red-500 transition cursor-pointer"
                                    title="Remove item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Checkout total box */}
                          <div className="p-4 rounded border bg-black/5 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 pt-4 mt-6"
                               style={{ borderColor: brand.colors.subtle }}>
                            <div>
                              <span className="text-[10px] font-mono opacity-50 block uppercase tracking-wider">Acquisition Counts</span>
                              <span className="text-xs font-bold font-mono">{cart.length} Elite bespoke item(s) curated</span>
                            </div>
                            <button
                              onClick={() => {
                                alert(`Checkout Initiated! Direct integration with standard premium banking gateway (Pro-forma invoice requested of "${brand.brandName}").`);
                                logAction(`Boutique Checkout: Dispatched premium invoices matching ${cart.length} articles.`);
                              }}
                              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-widest text-center transition active:scale-95"
                              style={{ borderRadius: brand.designTokens?.radius === "none" ? "0" : brand.designTokens?.radius || "4px" }}
                            >
                              Initialize Escrow Transaction
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* VIBE DESCRIPTION FOOTER BLOCK */}
                <div
                  className="mt-12 pt-4 border-t flex justify-between items-center text-[9px] font-mono uppercase opacity-50 relative z-10"
                  style={{ borderColor: `${brand.colors.text}1F` }}
                >
                  <span>{brand.designerVibe}</span>
                  <span>EST. 2026 • PARIS / SHANGHAI COUTURE LABS</span>
                </div>
              </div>
            )}

            {/* TAB 2: COMPILED DESIGN TOKENS INSPECT MATRIX */}
            {activeTab === "TOKENS" && (
              <div className="space-y-5 animate-fade-in font-mono text-xs">
                <div className="bg-black/40 border border-zinc-800 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-1.5 text-zinc-200 font-bold uppercase text-[11px] tracking-wider mb-2">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <span>Design Token Compiler Layer (设计语言转换矩阵)</span>
                  </div>
                  <p className="text-zinc-400 font-sans text-xs pb-2 leading-relaxed">
                    专业前端生成器的最核心优势是不直接乱拼JJSX。AI接收输入后，会率先在绝对美感限制器规则下合成一套
                    <strong className="text-zinc-200">【Design Tokens】</strong>设计变量。根据该变量挑选受批套件组合，保证任意生成皆具有商业级的严谨规整性。
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Token Line 1: Radius */}
                    <div className="bg-zinc-950 p-3 rounded border border-zinc-900 flex justify-between items-center">
                      <div>
                        <span className="text-zinc-500 text-[10px] block font-mono uppercase">Radius Scale (圆角系统)</span>
                        <span className="text-zinc-200 font-mono font-bold">--border-radius</span>
                      </div>
                      <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-300 font-bold uppercase text-[10px]">
                        {brand.designTokens?.radius || "0px (None)"}
                      </span>
                    </div>

                    {/* Token Line 2: Spacing Max */}
                    <div className="bg-zinc-950 p-3 rounded border border-zinc-900 flex justify-between items-center">
                      <div>
                        <span className="text-zinc-500 text-[10px] block font-mono uppercase">Grid Flow Padding (呼吸间距)</span>
                        <span className="text-zinc-200 font-mono font-bold">--layout-spacing-max</span>
                      </div>
                      <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-300 font-bold uppercase text-[10px]">
                        {brand.designTokens?.spacingMax || "gap-24 (Spacious)"}
                      </span>
                    </div>

                    {/* Token Line 3: Surface Noise */}
                    <div className="bg-zinc-950 p-3 rounded border border-zinc-900 flex justify-between items-center">
                      <div>
                        <span className="text-zinc-500 text-[10px] block font-mono uppercase">Surface Noise Rate (噪点密度)</span>
                        <span className="text-zinc-200 font-mono font-bold">--grain-density</span>
                      </div>
                      <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-300 font-bold uppercase text-[10px]">
                        {((brand.designTokens?.surfaceNoise || 0.02) * 100).toFixed(1)}% Noise Rate
                      </span>
                    </div>

                    {/* Token Line 4: Transition ease */}
                    <div className="bg-zinc-950 p-3 rounded border border-zinc-900 flex justify-between items-center">
                      <div>
                        <span className="text-zinc-500 text-[10px] block font-mono uppercase">Animation Transition (高阻力阻尼)</span>
                        <span className="text-zinc-200 font-mono font-bold">--animation-ease</span>
                      </div>
                      <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-300 font-bold text-[10px] truncate max-w-[140px]">
                        {brand.designTokens?.transitionCurve || "cubic-bezier(0.16, 1, 0.3, 1)"}
                      </span>
                    </div>

                    {/* Token Line 5: Border Philosophy */}
                    <div className="bg-zinc-950 p-3 rounded border border-zinc-900 flex justify-between items-center">
                      <div>
                        <span className="text-zinc-500 text-[10px] block font-mono uppercase">Border Philosophy (细线哲学)</span>
                        <span className="text-zinc-200 font-mono font-bold">--border-thin-law</span>
                      </div>
                      <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-300 font-bold uppercase text-[10px]">
                        {brand.designTokens?.borderPhilosophy || "hairline ultra-thin"}
                      </span>
                    </div>

                    {/* Token Line 6: Image Aspect Crop */}
                    <div className="bg-zinc-950 p-3 rounded border border-zinc-900 flex justify-between items-center">
                      <div>
                        <span className="text-zinc-500 text-[10px] block font-mono uppercase">Image Crop Ratio (画幅控制)</span>
                        <span className="text-zinc-200 font-mono font-bold">--image-aspect</span>
                      </div>
                      <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-300 font-bold uppercase text-[10px]">
                        {brand.theme?.imageAspectRatio || "aspect-[3/4] portrait"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Theme Package Compiled Code */}
                <div className="bg-zinc-900/40 p-4 border border-zinc-800 rounded-lg space-y-2">
                  <div className="flex items-center gap-1 text-zinc-200 font-bold uppercase text-[10px]">
                    <HardDrive className="w-3.5 h-3.5 text-zinc-400" /> Compiled Design Token CSS Constants
                  </div>
                  <pre className="text-[10px] bg-black p-3 rounded border border-zinc-950 text-emerald-400 max-h-56 overflow-y-auto font-mono scrollbar leading-normal">
{`:root {
  --brand-name: "${brand.brandName}";
  --color-brand-bg: ${brand.colors.background};
  --color-brand-text: ${brand.colors.text};
  --color-brand-accent: ${brand.colors.accent};
  --color-brand-subtle: ${brand.colors.subtle};
  --font-display-scale: ${brand.theme?.fontScale || 1.15};
  --font-display: "${brand.typography.display}";
  --font-body: "${brand.typography.body}";
  --border-radius-token: ${brand.designTokens?.radius || "none"};
  --spacing-token-scale: ${brand.designTokens?.spacingMax || "gap-12"};
  --surface-noise-density: ${brand.designTokens?.surfaceNoise || 0.02};
  --ambient-glow-vapor: ${brand.theme?.accentVapor || "rgba(0,0,0,0.04)"};
  --transition-cubic: ${brand.designTokens?.transitionCurve || "cubic-bezier(0.16,1,0.3,1)"};
  --com-density: "${brand.composition?.densityControl || "silent"}";
}`}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB 3: AI FASHION DIRECTOR AESTHETIC AUDIT SCREEN */}
            {activeTab === "EVALUATION" && (
              <div className="space-y-6 animate-fade-in">
                {/* 5 Custom Score Dials */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5 text-center">
                  {/* Dial 1: Visual Tension */}
                  <div className="bg-zinc-950/70 border border-zinc-900 rounded-lg p-3.5 flex flex-col items-center justify-between min-h-[135px]">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Visual Tension</span>
                    <div className="relative flex items-center justify-center my-1.5">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle cx="28" cy="28" r="24" fill="none" stroke="#121319" strokeWidth="4" />
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="4"
                          strokeDasharray={151}
                          strokeDashoffset={151 - (151 * brand.scores.visualTension) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute font-mono text-xs text-white font-bold">{brand.scores.visualTension}%</span>
                    </div>
                    <span className="text-[8.5px] font-mono text-zinc-400">非对称空间对立系数</span>
                  </div>

                  {/* Dial 2: Luxury Atmosphere */}
                  <div className="bg-zinc-950/70 border border-zinc-900 rounded-lg p-3.5 flex flex-col items-center justify-between min-h-[135px]">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Luxury Aura</span>
                    <div className="relative flex items-center justify-center my-1.5">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle cx="28" cy="28" r="24" fill="none" stroke="#121319" strokeWidth="4" />
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="4"
                          strokeDasharray={151}
                          strokeDashoffset={151 - (151 * brand.scores.luxuryFeeling) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute font-mono text-xs text-white font-bold">{brand.scores.luxuryFeeling}%</span>
                    </div>
                    <span className="text-[8.5px] font-mono text-zinc-400">材质配比高奢感度</span>
                  </div>

                  {/* Dial 3: Whitespace Score */}
                  <div className="bg-zinc-950/70 border border-zinc-900 rounded-lg p-3.5 flex flex-col items-center justify-between min-h-[135px]">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Whitespace</span>
                    <div className="relative flex items-center justify-center my-1.5">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle cx="28" cy="28" r="24" fill="none" stroke="#121319" strokeWidth="4" />
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="4"
                          strokeDasharray={151}
                          strokeDashoffset={151 - (151 * (brand.scores.whitespaceScore || 95)) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute font-mono text-xs text-white font-bold">{brand.scores.whitespaceScore || 95}%</span>
                    </div>
                    <span className="text-[8.5px] font-mono text-zinc-400">负空间留空容积率</span>
                  </div>

                  {/* Dial 4: Cognitive restraint */}
                  <div className="bg-zinc-950/70 border border-zinc-900 rounded-lg p-3.5 flex flex-col items-center justify-between min-h-[135px]">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Restraint</span>
                    <div className="relative flex items-center justify-center my-1.5">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle cx="28" cy="28" r="24" fill="none" stroke="#121319" strokeWidth="4" />
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="4"
                          strokeDasharray={151}
                          strokeDashoffset={151 - (151 * (100 - (brand.scores.cognitiveNoise || 15))) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute font-mono text-xs text-white font-bold">{100 - (brand.scores.cognitiveNoise || 15)}%</span>
                    </div>
                    <span className="text-[8.5px] font-mono text-zinc-400">认知克制指数 (少即是多)</span>
                  </div>

                  {/* Dial 5: Brand Cohesion */}
                  <div className="bg-zinc-950/70 border border-zinc-900 rounded-lg p-3.5 flex flex-col items-center justify-between min-h-[135px]">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Cohesion</span>
                    <div className="relative flex items-center justify-center my-1.5">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle cx="28" cy="28" r="24" fill="none" stroke="#121319" strokeWidth="4" />
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="4"
                          strokeDasharray={151}
                          strokeDashoffset={151 - (151 * brand.scores.brandConsistency) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute font-mono text-xs text-white font-bold">{brand.scores.brandConsistency}%</span>
                    </div>
                    <span className="text-[8.5px] font-mono text-zinc-400">词藻与视觉概念统一度</span>
                  </div>
                </div>

                {/* Aesthetic Critic Review Section */}
                <div className="p-4 rounded-lg bg-zinc-900/30 border border-zinc-800 space-y-3.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold uppercase tracking-wider font-mono">
                    <PenTool className="w-4 h-4" /> AI Fashion Director Professional Audit
                  </div>
                  <div className="text-zinc-300 leading-relaxed font-light text-xs font-sans whitespace-pre-line text-justify pl-1">
                    {brand.critique}
                  </div>
                </div>

                {/* Aesthetic Law Active Interventions Panel */}
                <div className="p-4 rounded-lg bg-zinc-900/30 border border-zinc-800 space-y-3.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-bold uppercase tracking-wider font-mono">
                    <ShieldAlert className="w-4 h-4" /> Aesthetic Law Filter Active Interventions (审美限制器守护中)
                  </div>
                  <div className="text-zinc-400 leading-relaxed font-light text-xs pl-1">
                    {auditViolations.length === 0 ? (
                      <p className="text-xs italic text-emerald-400 font-mono">
                        ✓ 100% Brand DNA Compliance. No visual noise breaches detected. Restraint levels fully green.
                      </p>
                    ) : (
                      <div className="space-y-1.5">
                        <p className="text-[10px] font-mono text-zinc-500 uppercase">Enforced Guardrails on current compilation:</p>
                        {auditViolations.map((viol, index) => (
                          <div key={index} className="flex gap-2 items-start font-mono text-[10.5px] text-amber-200/95">
                            <span className="text-amber-500 shrink-0 select-none">➤</span>
                            <span>{viol}</span>
                          </div>
                        ))}
                      </div>
                    )}
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
