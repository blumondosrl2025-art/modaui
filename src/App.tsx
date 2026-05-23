import React, { useState } from "react";
import TemplateStorefront, { BOUTIQUE_TEMPLATES, CuratedTemplate } from "./components/TemplateStorefront";
import PremiumTemplateEngine from "./components/PremiumTemplateEngine";
import V0AIEditor from "./components/V0AIEditor";
import OSSingularityEngine from "./components/OSSingularityEngine";
import { SingularityBrand } from "./types";
import { 
  Sparkles, Layers, Globe, Shield, Activity, 
  Settings, ChevronDown, CheckCircle, RefreshCw, LogIn 
} from "lucide-react";

export default function App() {
  // Navigation State - Core sections for the V0 Platform
  const [activeSection, setActiveSection] = useState<"storefront" | "dna_admin" | "v0_ai_editor" | "singularity_engine">("storefront");
  
  // Active selected template and unified template registry
  const [activeTemplate, setActiveTemplate] = useState<CuratedTemplate | null>(BOUTIQUE_TEMPLATES[0]);
  const [allTemplates, setAllTemplates] = useState<CuratedTemplate[]>(BOUTIQUE_TEMPLATES);

  // Header simulation states
  const [activeHeaderLink, setActiveHeaderLink] = useState<string>("Templates");

  // Shared action logging system
  const [logs, setLogs] = useState<string[]>([
    "V0 Engine Initialization: Activated White Cosmos style guides.",
    "Bespoke Framework loaded: Compiled 6 high-fidelity brand profiles."
  ]);

  const handleLogAction = (msg: string) => {
    console.log(`[V0 PLATFORM SYSTEM] ${msg}`);
    setLogs(prev => [msg, ...prev.slice(0, 15)]);
  };

  const handleEditInV0 = (template: CuratedTemplate) => {
    setActiveTemplate(template);
    if (!allTemplates.some(t => t.id === template.id)) {
      setAllTemplates(prev => [template, ...prev]);
    }
    setActiveSection("v0_ai_editor");
    handleLogAction(`Navigation: Dispatched template DNA seed '${template.title}' to V0 AI Editor workspace.`);
  };

  const handleInjectSingularityBrand = (brand: SingularityBrand) => {
    const newTemplate: CuratedTemplate = {
      id: `singularity-${Date.now()}`,
      title: brand.brandName,
      brandStyle: brand.designerVibe,
      author: "Singularity Architect",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80",
      likes: "188",
      views: "2.4K",
      initial: brand.brandName.substring(0, 2).toUpperCase(),
      category: "Landing Pages",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      badge: "New",
      hero: {
        title: brand.editorialBlock.title,
        slogan: brand.slogan,
        quote: brand.editorialBlock.body.substring(0, Math.min(brand.editorialBlock.body.length, 120)) + "...",
        subtext: brand.editorialBlock.body,
        primaryCta: "EXPLORE COLLECTION"
      },
      products: brand.products.map((p, idx) => ({
        id: `sing-p-${idx}`,
        refCode: `REF-${brand.brandName.substring(0, 3).replace(/[^\w]/g, "").toUpperCase()}-0${idx + 1}`,
        title: p.name,
        description: p.description,
        price: p.price,
        tag: p.material,
        silhouette: p.silhouette
      })),
      story: {
        concept: brand.slogan,
        theme: brand.designerVibe,
        details: brand.critique,
        trigger: brand.editorialBlock.title,
        heritage: "EST. 2026 • PARIS / SHANGHAI"
      },
      footer: {
        tagline: brand.slogan,
        coordinates: "Paris • 48.8566° N, 2.3522° E",
        copyright: `© 2026 ${brand.brandName.toUpperCase()}`
      },
      bgColor: brand.colors.background,
      textColor: brand.colors.text,
      accentColor: brand.colors.accent,
      fontDisplay: brand.typography.display === "Space Grotesk" ? "font-mono" : brand.typography.display === "Playfair Display" ? "font-serif" : "font-sans-display"
    };

    setAllTemplates(prev => {
      const filtered = prev.filter(t => t.title !== brand.brandName);
      return [newTemplate, ...filtered];
    });
    setActiveTemplate(newTemplate);
    setActiveSection("v0_ai_editor");
    handleLogAction(`Aesthetic Transition: Loaded new Singularity Brand '${brand.brandName}' into the V0 compilation workbench.`);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans flex flex-col relative overflow-x-hidden selection:bg-black selection:text-white">
      
      {/* Absolute silent background lines for layout texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-60" />
      
      {/* 1. BRIGHT GORGEOUS v0 NAVIGATION HEADER */}
      <header className="border-b border-neutral-200/80 bg-white/95 backdrop-blur-md px-6 py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4 shrink-0 select-none z-40 sticky top-0 shadow-[0_1px_2px_rgba(0,0,0,0.01)] h-[73px]">
        
        {/* v0 logo as shown in Figure 1 */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center gap-1.5 cursor-pointer" onClick={() => setActiveSection("storefront")}>
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center font-display text-white text-[15px] font-black tracking-tighter shadow-sm hover:opacity-90 duration-200">
              v0
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm tracking-tight text-neutral-950 font-sans">
                  V0 PORTAL
                </span>
                <span className="text-[8.5px] font-mono bg-neutral-100 border border-neutral-200 text-neutral-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                  COSMOS CORE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Link System mirroring Figure 1 */}
        <nav className="flex items-center flex-wrap gap-1 font-sans text-xs font-semibold">
          {[
            { id: "Templates", label: "Templates", hasArrow: true },
            { id: "Resources", label: "Resources", hasArrow: true },
            { id: "Enterprise", label: "Enterprise", hasArrow: false },
            { id: "Pricing", label: "Pricing", hasArrow: false },
            { id: "iOS", label: "iOS", hasArrow: false },
            { id: "Students", label: "Students", hasArrow: false },
            { id: "FAQ", label: "FAQ", hasArrow: false }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveHeaderLink(item.id);
                handleLogAction(`Navigation: Cleared current subpath and swaped to top category '${item.id}'`);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                activeHeaderLink === item.id
                  ? "bg-neutral-100 text-black font-extrabold"
                  : "text-neutral-500 hover:text-black hover:bg-neutral-50"
              }`}
            >
              <span>{item.label}</span>
              {item.hasArrow && <span className="text-[9px] opacity-70">▾</span>}
            </button>
          ))}
        </nav>

        {/* Authorizations */}
        <div className="flex items-center gap-2 justify-end">
          <button 
            onClick={() => {
              handleLogAction("Auth action: Dispatched login dialog.");
              alert("V0 Security Guard: Please configure your environment secrets to sign into real databases.");
            }}
            className="px-3.5 py-1.5 border border-neutral-250 hover:border-neutral-400 rounded-lg text-xs font-bold text-neutral-700 hover:text-black transition cursor-pointer bg-white"
          >
            <span>登录</span>
          </button>

          <button
            onClick={() => {
              handleLogAction("Auth action: Registered secure developer credential.");
              alert("V0 Workspace Notice: Signed up successfully with sandbox access permissions.");
            }}
            className="px-3.5 py-1.5 bg-black hover:bg-neutral-800 rounded-lg text-xs font-bold text-white transition cursor-pointer"
          >
            <span>注册</span>
          </button>
        </div>

      </header>

      {/* 2. DUAL SEGMENT CONSOLE SWITCHER BAR */}
      <div className="bg-neutral-50/85 border-b border-neutral-200/50 py-3 px-6 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-[73px] z-30 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            V0 Mode: <span className="font-bold text-neutral-900">{activeSection === "storefront" ? "世界品牌模板库" : activeSection === "v0_ai_editor" ? "V0 AI Editor Standalone" : activeSection === "singularity_engine" ? "✨ 奇点开店生成器" : "DNA 采集后台 (ADMIN)"}</span>
          </p>
        </div>
        
        {/* Toggle Pill Group */}
        <div className="bg-neutral-200/50 p-1 rounded-xl flex items-center border border-neutral-250/10 shadow-sm max-w-xl w-full sm:w-auto gap-0.5">
          <button
            onClick={() => {
              setActiveSection("storefront");
              handleLogAction("Workspace Switcher: Activated 世界品牌模板库 (Public storefront layout catalog).");
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-sans font-extrabold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSection === "storefront"
                ? "bg-white text-black shadow-md shadow-neutral-200/50 scale-[1.01]"
                : "text-neutral-500 hover:text-black hover:bg-white/40"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-inherit" />
            <span>🌐 世界品牌库</span>
          </button>

          <button
            onClick={() => {
              setActiveSection("singularity_engine");
              handleLogAction("Workspace Switcher: Activated Singularity Brand Creator (一句话开店奇点系统).");
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-sans font-extrabold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSection === "singularity_engine"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/50 scale-[1.01]"
                : "text-neutral-500 hover:text-black hover:bg-neutral-100/50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-inherit" />
            <span>✨ 奇点生成器</span>
          </button>

          <button
            onClick={() => {
              setActiveSection("v0_ai_editor");
              handleLogAction("Workspace Switcher: Activated V0 AI Editor standalone workstation.");
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-sans font-extrabold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSection === "v0_ai_editor"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-200/50 scale-[1.01]"
                : "text-neutral-500 hover:text-black hover:bg-neutral-100/50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-inherit" />
            <span>⚡️ V0 AI Editor</span>
          </button>
          
          <button
            onClick={() => {
              setActiveSection("dna_admin");
              handleLogAction("Workspace Switcher: Activated DNA 采集后台 (Aesthetic calibration admin suite).");
            }}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-sans font-extrabold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeSection === "dna_admin"
                ? "bg-black text-white shadow-md shadow-neutral-900/10 scale-[1.01]"
                : "text-neutral-500 hover:text-black hover:bg-neutral-100/50"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-inherit" />
            <span>🧪 DNA 采集后台</span>
          </button>
        </div>
        
        {/* Real-time system status indicators */}
        <div className="hidden lg:flex items-center gap-2 text-[10.5px] text-neutral-400 font-mono">
          <span className="text-neutral-300">|</span>
          <span className="text-neutral-500">Aesthetic laws compliance: 99.8%</span>
        </div>
      </div>

      {/* 3. MAIN CORE CONTENT AREA */}
      <main className="flex-grow w-full max-w-[1550px] mx-auto flex flex-col z-10 relative">
        {activeSection === "storefront" ? (
          <div className="flex-grow flex flex-col">
            <TemplateStorefront logAction={handleLogAction} onEditInV0={handleEditInV0} />
          </div>
        ) : activeSection === "v0_ai_editor" ? (
          <div className="flex-grow flex flex-col p-6 animate-fade-in">
            <V0AIEditor 
              activeTemplate={activeTemplate} 
              onSelectTemplate={setActiveTemplate}
              allTemplates={allTemplates}
              logAction={handleLogAction}
            />
          </div>
        ) : activeSection === "singularity_engine" ? (
          <div className="flex-grow flex flex-col p-6 animate-fade-in">
            <OSSingularityEngine 
              onInjectProcess={(procName) => handleLogAction(`OS Container Injector: Initialized sandbox background worker named '${procName}'`)}
              onInjectBrand={handleInjectSingularityBrand}
              logAction={handleLogAction}
            />
          </div>
        ) : (
          <div className="flex-grow flex flex-col p-6 animate-fade-in">
            {/* Direct access info for Administrators inside the DNA admin workspace */}
            <div className="mb-6 bg-gradient-to-r from-neutral-900 to-amber-950 text-white rounded-2xl p-6 shadow-lg border border-neutral-800 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black font-semibold text-[8px] tracking-widest uppercase font-mono">
                      SYSTEM ADMIN CONSOLE
                    </span>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  </div>
                  <h2 className="text-xl font-sans font-black uppercase tracking-tight">
                    DNA 采集后台 & 律法校准面板
                  </h2>
                  <p className="text-xs text-neutral-400 font-sans font-light">
                    Analyze, scrape, and extract visual DNA presets from world class brands, compile layouts using strict luxury laws, and audit design noise.
                  </p>
                </div>
                
                <div className="text-right text-[10px] font-mono text-zinc-400">
                  <span className="block">Engine status: <span className="text-emerald-400 font-bold">ONLINE</span></span>
                  <span className="block text-[9px] text-zinc-500">Scraped profiles: 5 active</span>
                </div>
              </div>

              {/* Action shortcuts explaining system laws */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-black/40 border border-neutral-800 p-3 rounded-xl hover:border-amber-500/30 transition">
                  <span className="font-mono text-[9px] uppercase text-amber-500 font-bold block mb-1">① DNA CRAWLER & CATCHER</span>
                  <p className="text-[10px] leading-relaxed text-neutral-300 font-sans font-light">
                    Insert URLs or keywords. The neural scraper extracts display fonts, background color codes, letter spacing ratios, and padding margins.
                  </p>
                </div>
                
                <div className="bg-black/40 border border-neutral-800 p-3 rounded-xl hover:border-amber-500/30 transition">
                  <span className="font-mono text-[9px] uppercase text-amber-500 font-bold block mb-1">② THE GOLDEN REPAIR LAW</span>
                  <p className="text-[10px] leading-relaxed text-neutral-300 font-sans font-light">
                    Purges visual clutter, excessive colorful buttons, alignment discrepancies, and guarantees 65% silent negative space blocks automatically.
                  </p>
                </div>
                
                <div className="bg-black/40 border border-neutral-800 p-3 rounded-xl hover:border-amber-500/30 transition">
                  <span className="font-mono text-[9px] uppercase text-amber-500 font-bold block mb-1">③ HARVESTED STATUS LOGS</span>
                  <p className="text-[10px] leading-relaxed text-neutral-300 font-sans font-light">
                    Outputs live audit logs as layout metrics compile, displaying spatial entropy ratios, luxury indices, and compliance reports.
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Luxury DNA Compiler Workbench */}
            <PremiumTemplateEngine logAction={handleLogAction} />
          </div>
        )}
      </main>

      {/* 4. REAL-TIME EVENT LOGGER (Toggles on-hold logs tracking) */}
      <div className="bg-neutral-900 border-t border-neutral-800 py-3 px-6 text-left shrink-0">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-3 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse animate-duration-1000" />
            <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
              Live V0 Engine Logs Output (系统事件流监测):
            </span>
          </div>
          
          <div className="flex-1 font-mono text-[10px] text-neutral-300 truncate md:ml-4 bg-black/50 px-3 py-1 rounded border border-neutral-800 max-w-3xl">
            {logs[0] || "No system actions logged yet. Initiate browser inputs to trigger diagnostic reports."}
          </div>
          
          <div className="text-[9px] font-mono text-neutral-500 shrink-0 text-right">
            Active: White Cosmos Model
          </div>
        </div>
      </div>

      {/* 5. HIGH-END BRAND FOOTER */}
      <footer className="border-t border-neutral-200/80 bg-neutral-50/50 py-10 px-6 text-center text-xs text-neutral-400 font-sans tracking-wide select-none z-10">
        <div className="max-w-xl mx-auto space-y-3">
          <p className="font-bold text-neutral-600 uppercase tracking-widest text-[9.5px]">v0.dev WORLD-CLASS TEMPLATE PLATFORM</p>
          <p className="text-[10.5px] text-neutral-400 font-light leading-relaxed">
            Delivering digital couture interfaces. Built strictly on silent design foundations, optimized for fluid responsiveness, and compiled on ultra-clean lightweight systems.
          </p>
          <p className="pt-2 text-[9px] font-mono opacity-70">
            © 2026 V0 CORE CLONE • ALL REPRODUCTION RIGHTS EXAMINED.
          </p>
        </div>
      </footer>
      
    </div>
  );
}
