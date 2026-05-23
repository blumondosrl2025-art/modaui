import React, { useState } from "react";
import { 
  Sparkles, ShieldCheck, Ruler, Sliders, Play, Trash2, 
  PlusCircle, Edit2, Check, RefreshCw, AlertCircle, Info, Lock, Unlock, 
  BarChart2, FileText, Globe, Tag, CheckCircle2, CloudLightning, Download, Upload
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LuxuryLawEngine, TEMPLATE_LIBRARY_PROFILES } from "../premium-template-library";

interface TemplateControlCenterProps {
  logAction: (msg: string) => void;
}

export default function TemplateControlCenter({ logAction }: TemplateControlCenterProps) {
  // Navigation for User Control Center directory subpaths
  const [activeSubPath, setActiveSubPath] = useState<"dna-manager" | "template-manager" | "crawler-manager" | "luxury-law-manager" | "template-scoring" | "industry-manager">("luxury-law-manager");

  // DNA Manager simulated DB
  const [dnaProfiles, setDnaProfiles] = useState([
    { brand: "Hermès Paris", displayFont: "Playfair Display", spacing: "140px Void", lettersTracking: "0.15em", mainBg: "#FAF9F6", textColor: "#111111", accentColor: "#C25E28" },
    { brand: "CELINE Paris", displayFont: "Playfair Display", spacing: "150px Void", lettersTracking: "0.18em", mainBg: "#FAF9F6", textColor: "#1A1A1A", accentColor: "#9C8A70" },
    { brand: "Acne Studios", displayFont: "Space Grotesk", spacing: "125px Void", lettersTracking: "0.08em", mainBg: "#FAF4F5", textColor: "#2B1A22", accentColor: "#F4B2C3" },
    { brand: "Blue Bottle", displayFont: "Outfit", spacing: "110px Void", lettersTracking: "0.05em", mainBg: "#FAF9F5", textColor: "#0A2540", accentColor: "#00A9E0" },
    { brand: "Stripe", displayFont: "Inter", spacing: "100px Void", lettersTracking: "0.02em", mainBg: "#FFFFFF", textColor: "#0A2540", accentColor: "#635BFF" }
  ]);
  const [selectedDnaIndex, setSelectedDnaIndex] = useState<number>(0);
  const [activeDnaEditIndex, setActiveDnaEditIndex] = useState<number | null>(null);

  // Template Manager simulated rows
  const [templates, setTemplates] = useState([
    { id: "tmpl-apparel", name: "Archival Ready-To-Wear Lookbook", category: "Apparel", score: 96, isLocked: false },
    { id: "tmpl-leather", name: "Premium Calfskin saddle Showcase", category: "Leather Bags", score: 99, isLocked: false },
    { id: "tmpl-ecom", name: "Editorial Brutalist Store Grid", category: "Retail E-Commerce", score: 94, isLocked: false },
    { id: "tmpl-gastro", name: "Kyoto Clean Wood Pour Cafe", category: "F&B Lifestyle", score: 92, isLocked: true },
    { id: "tmpl-shopify", name: "High-Conversion Essential Cushion", category: "Shopify D2C", score: 98, isLocked: false }
  ]);
  const [newTemplateName, setNewTemplateName] = useState("");

  // Temp JSON Upload handlers & states
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processJsonFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const data = JSON.parse(text);
        
        let templatesAddedCount = 0;
        let dnasAddedCount = 0;
        
        const parseSingleTemplate = (obj: any) => {
          if (!obj) return null;
          // If the uploaded JSON has a visual_dna schema (from our Exporter)
          if (obj.visual_dna || obj.template_title || obj.brand_style) {
            const brandName = obj.template_title || obj.brand_style || "Uploaded Custom Theme";
            
            // Check if we need to add a DNA profile
            const existsDna = dnaProfiles.some(d => d.brand.toLowerCase() === brandName.toLowerCase());
            if (!existsDna) {
              const displayFontRaw = obj.visual_dna?.display_font || "serif";
              const mappedFont = displayFontRaw.includes("serif") ? "Playfair Display" : 
                                 displayFontRaw.includes("sans-display") ? "Space Grotesk" :
                                 displayFontRaw.includes("mono") ? "Fira Code" : "Inter";
              
              const newDna = {
                brand: brandName,
                displayFont: mappedFont,
                spacing: obj.visual_dna?.heritage_story?.theme?.match(/\d+px Void/)?.[0] || "130px Void",
                lettersTracking: obj.visual_dna?.heritage_story?.theme?.match(/0\.\d+em/)?.[0] || "0.12em",
                mainBg: obj.visual_dna?.bg_color || "#FAF9F6",
                textColor: obj.visual_dna?.text_color || "#111111",
                accentColor: obj.visual_dna?.accent_color || "#C25E28"
              };
              setDnaProfiles(prev => [newDna, ...prev]);
              dnasAddedCount++;
            }

            return {
              id: obj.template_id || `tmpl-seed-${Date.now()}`,
              name: brandName,
              category: obj.category || "Luxury Heritage",
              score: 97,
              isLocked: false
            };
          } else {
            // General template structure
            const templateName = obj.name || obj.title || "Untitled Custom Asset";
            return {
              id: obj.id || `tmpl-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              name: templateName,
              category: obj.category || "General Asset",
              score: typeof obj.score === "number" ? obj.score : 95,
              isLocked: !!obj.isLocked
            };
          }
        };

        let newTemplatesToInject: any[] = [];
        if (Array.isArray(data)) {
          data.forEach(item => {
            const processed = parseSingleTemplate(item);
            if (processed) {
              newTemplatesToInject.push(processed);
              templatesAddedCount++;
            }
          });
        } else {
          if (data.templates && Array.isArray(data.templates)) {
            data.templates.forEach((item: any) => {
              const processed = parseSingleTemplate(item);
              if (processed) {
                newTemplatesToInject.push(processed);
                templatesAddedCount++;
              }
            });
          } else if (data.assets && Array.isArray(data.assets)) {
            data.assets.forEach((item: any) => {
              const processed = parseSingleTemplate(item);
              if (processed) {
                newTemplatesToInject.push(processed);
                templatesAddedCount++;
              }
            });
          } else {
            const processed = parseSingleTemplate(data);
            if (processed) {
              newTemplatesToInject.push(processed);
              templatesAddedCount++;
            }
          }
        }

        if (newTemplatesToInject.length > 0) {
          setTemplates(prev => {
            const existingIds = prev.map(t => t.id);
            const nonDuplicates = newTemplatesToInject.filter(t => !existingIds.includes(t.id));
            return [...nonDuplicates, ...prev];
          });

          setUploadSuccess(`Success: Imported ${templatesAddedCount} template layout(s)${dnasAddedCount > 0 ? ` & ${dnasAddedCount} brand DNA seed(s)` : ''}!`);
          setUploadError(null);
          logAction(`Template Importer: Parsed and successfully loaded JSON configuration. Added ${templatesAddedCount} layouts to the operational state.`);
        } else {
          setUploadError("Could not find any compatible template assets in the uploaded JSON file.");
          setUploadSuccess(null);
        }
      } catch (err) {
        setUploadError("Invalid JSON file formatting. Please verify structure.");
        setUploadSuccess(null);
      }
    };
    reader.onerror = () => {
      setUploadError("An error occurred reading the upload stream.");
      setUploadSuccess(null);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/json" || file.name.endsWith(".json")) {
        processJsonFile(file);
      } else {
        setUploadError("Only JSON configuration files (*.json) are supported.");
        setUploadSuccess(null);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/json" || file.name.endsWith(".json")) {
        processJsonFile(file);
      } else {
        setUploadError("Only JSON configuration files (*.json) are supported.");
        setUploadSuccess(null);
      }
    }
  };

  // Crawler playground state
  const [crawlerUrl, setCrawlerUrl] = useState("zara.com");
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlerLogs, setCrawlerLogs] = useState<string[]>([]);
  const [harvestedBlocks, setHarvestedBlocks] = useState<{ name: string; visualWeight: string; entropy: number }[]>([]);

  // Luxury Law configurations
  const [minPaddingPx, setMinPaddingPx] = useState<number>(120);
  const [maxColorCount, setMaxColorCount] = useState<number>(3);
  const [maxCtaLimit, setMaxCtaLimit] = useState<number>(1);
  const [buttonCornersMode, setButtonCornersMode] = useState<"none" | "sm" | "md">("none");
  const [suppressGradientsRule, setSuppressGradientsRule] = useState<boolean>(true);

  // Industries settings
  const [industries, setIndustries] = useState([
    { key: "Fashion", brands: ["COS", "Acne Studios", "Toteme"], conversionRate: "4.2%" },
    { key: "Luxury Bags", brands: ["Hermès", "Bottega Veneta", "Loewe"], conversionRate: "2.8%" },
    { key: "Coffee & Cafe", brands: ["Blue Bottle", "% Arabica"], conversionRate: "5.1%" },
    { key: "Skincare", brands: ["Aesop", "Le Labo"], conversionRate: "3.9%" },
    { key: "D2C Apparel", brands: ["Allbirds", "Gymshark"], conversionRate: "4.8%" }
  ]);
  const [newIndustryKey, setNewIndustryKey] = useState("");

  // Handle template creation
  const handleAddTemplate = () => {
    if (!newTemplateName.trim()) return;
    const newTmpl = {
      id: `tmpl-custom-${Date.now()}`,
      name: newTemplateName.trim(),
      category: "Skincare",
      score: 95,
      isLocked: false
    };
    setTemplates(prev => [newTmpl, ...prev]);
    setNewTemplateName("");
    logAction(`Template Manager: Created new luxury layout [${newTmpl.name}]. Assigned Skincare sector.`);
  };

  // Handle template toggle lock
  const handleToggleLock = (id: string) => {
    setTemplates(prev => prev.map(tmpl => {
      if (tmpl.id === id) {
        logAction(`Template Manager: Toggled lock status of Layout [${tmpl.name}] to ${!tmpl.isLocked ? "LOCKED" : "UNLOCKED"}`);
        return { ...tmpl, isLocked: !tmpl.isLocked };
      }
      return tmpl;
    }));
  };

  // Handle brand DNA export as structured JSON file for cross-app reuse
  const handleDownloadDna = (profile: typeof dnaProfiles[0]) => {
    if (!profile) return;
    
    // Construct structured cross-app compliant representation of lookbook variables
    const rawData = {
      template_id: profile.brand.toLowerCase().replace(/\s+/g, "-"),
      template_title: profile.brand,
      brand_style: `${profile.brand} Premium Heritage DNA`,
      author: "Atelier Aesthetic Control System",
      category: "Bespoke Luxury Landing Pages",
      visual_dna: {
        initial_monogram: profile.brand.substring(0, 2).toUpperCase(),
        display_font: profile.displayFont === "Playfair Display" ? "font-serif" : profile.displayFont === "Space Grotesk" ? "font-sans-display" : "font-mono",
        bg_color: profile.mainBg || "#FAF9F6",
        text_color: profile.textColor || "#111111",
        accent_color: profile.accentColor || "#C25E28",
        heritage_story: {
          concept: `${profile.brand} design ethos crafted in modern React frameworks.`,
          theme: `Visual environment representing ${profile.spacing} monastic margins with heavy ${profile.lettersTracking} letters tracking.`,
          details: `Compiled reference parameters of ${profile.brand}. Handled elegantly under 0px flat border rules.`,
          trigger: "Exposed linen fabrics, sand dunes shadows, raw concrete textures.",
          heritage: `EST. 2026 • ${profile.brand.toUpperCase()}`
        }
      },
      customized_settings: {
        title: `THE ${profile.brand.toUpperCase()} ARCHIVE`,
        slogan: `Spatial emptiness proportions emphasizing ${profile.lettersTracking} letters tracking.`,
        monogram: profile.brand.substring(0, 2).toUpperCase(),
        accent_color: profile.accentColor || "#C25E28",
        scale_proportion: "default"
      },
      products_catalog: [
        {
          id: `${profile.brand.toLowerCase().substring(0, 3)}-prod-1`,
          name: "Archival Linen Modular Dresser",
          description: "Solid oak construction with raw heavyweight textured visual layers.",
          price: "$4,850",
          image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=600"
        },
        {
          id: `${profile.brand.toLowerCase().substring(0, 3)}-prod-2`,
          name: "Symmetric Matte Travertine Vessel",
          description: "Individually combed stone body representing pure monastic architecture.",
          price: "$1,200",
          image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=600"
        }
      ],
      footer_settings: {
        tagline: "Form reflecting structural code beauty.",
        coordinates: `Atelier Headquarters • 48.8566° N, 2.3522° E`,
        copyright: `© 2026 ${profile.brand.toUpperCase()}. ALL RIGHTS RESERVED.`
      }
    };

    try {
      const jsonStr = JSON.stringify(rawData, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${profile.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-dna-seed.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      logAction(`DNA Exporter: Successfully serialized and downloaded cross-app compliant '${profile.brand}' DNA seed file!`);
    } catch (err) {
      console.error("Failed to export DNA profile as JSON:", err);
      logAction(`DNA Exporter ERROR: Could not compile lookbook binary stream for ${profile.brand}.`);
    }
  };

  // Launch crawl simulation
  const handleLaunchCrawl = () => {
    if (!crawlerUrl.trim()) return;
    setIsCrawling(true);
    setCrawlerLogs([]);
    setHarvestedBlocks([]);
    logAction(`Crawler Engine: Booting active scraper targeting https://${crawlerUrl}...`);

    const logs = [
      `Resolving hostname ${crawlerUrl} DNS server routes...`,
      `Established socket hook. Downloading index root (payload size 148kB)...`,
      "Parsing layout hierarchies matching standard grid selectors...",
      "Found image references & raw background styles. Initiating DNA Decoupler...",
      "Scanned 4 primary container blocks. Synthesizing visual indices completed."
    ];

    let logCounter = 0;
    const logTimer = setInterval(() => {
      if (logCounter < logs.length) {
        setCrawlerLogs(prev => [...prev, logs[logCounter]]);
        logCounter++;
      } else {
        clearInterval(logTimer);
        setIsCrawling(false);
        setHarvestedBlocks([
          { name: "Header Section: Monogram layout with narrow margins", visualWeight: "Low density (8% cover-weight)", entropy: 0.12 },
          { name: "Editorial Canvas: Large central portrait with floating text block", visualWeight: "Optimal negative space (68% breathing)", entropy: 0.04 },
          { name: "Catalog Grid Model: 3 asymmetrical columns displaying products", visualWeight: "Medium weight density", entropy: 0.35 },
          { name: "Footer Coordinates Address Block: Clean typewriter style text", visualWeight: "Low weight density", entropy: 0.08 }
        ]);
        logAction(`Crawler Engine: Processed https://${crawlerUrl} flawlessly. Decoded styling patterns cached.`);
      }
    }, 450);
  };

  return (
    <div id="premium-control-center" className="space-y-6">
      
      {/* Route Directory Simulator bar */}
      <div className="bg-[#0b0c10] border border-zinc-900 px-4 py-2.5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">ACTIVE ROUTE DIRECTORY:</span>
          <span className="font-mono text-[10px] text-zinc-200 bg-[#16181f] px-2 py-0.5 rounded border border-zinc-850">
            /apps/template-control-center/{activeSubPath}
          </span>
        </div>
        <div className="flex bg-black p-0.5 rounded border border-zinc-900 text-[9.5px] font-mono select-none overflow-x-auto max-w-full">
          {[
            { id: "luxury-law-manager", label: "[1] Luxury Laws Engine" },
            { id: "dna-manager", label: "[2] DNA Adjuster" },
            { id: "template-manager", label: "[3] Layout Manager" },
            { id: "crawler-manager", label: "[4] URL Scraper" },
            { id: "template-scoring", label: "[5] Scoring Audits" },
            { id: "industry-manager", label: "[6] Sector Config" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSubPath(tab.id as any);
                logAction(`Control Center: Opened path /apps/template-control-center/${tab.id}`);
              }}
              className={`px-3 py-1 rounded cursor-pointer transition whitespace-nowrap ${
                activeSubPath === tab.id 
                  ? "bg-zinc-805 text-amber-400 font-bold border border-zinc-800" 
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* RENDER VIEW: LUXURY LAW MANAGER */}
      {activeSubPath === "luxury-law-manager" && (
        <div className="bg-[#0d0e12] border border-zinc-900 rounded-xl p-6 text-left space-y-6">
          <div className="space-y-1.5 border-b border-zinc-900 pb-4">
            <span className="font-mono text-[9px] text-amber-500 uppercase tracking-widest font-black block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              Luxury Laws & Spatial Safeguards Configuration
            </span>
            <h3 className="text-sm font-sans font-bold text-zinc-150 uppercase tracking-wide">
              PROGRAMMED DESIGN CONSTRAINTS (奢侈感克制律指标参数)
            </h3>
            <p className="text-[11px] text-zinc-440 font-light max-w-2xl leading-relaxed">
              Define the automated rules our aesthetic engine monitors. Any crawled visual inputs or user-designed templates that violate these rules representing low-end chatter or messy interfaces will be instantly corrected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            {/* Active Control Adjustments sliders */}
            <div className="space-y-5 bg-[#0a0b0e] p-5 rounded-lg border border-zinc-900/60">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">Rule Threshold Adjusters</span>
              
              {/* Minimal Padding constraint slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline text-xs font-mono">
                  <span className="text-zinc-400">1. Monastic Border Padding Constraint:</span>
                  <span className="text-amber-400 font-bold">{minPaddingPx}px</span>
                </div>
                <input 
                  type="range" 
                  min="80" 
                  max="160" 
                  value={minPaddingPx}
                  onChange={(e) => {
                    setMinPaddingPx(Number(e.target.value));
                    logAction(`Luxury Laws: Adjusted minimum monastic boundary margin to ${e.target.value}px`);
                  }}
                  className="w-full accent-amber-500 bg-zinc-900 h-1 rounded-sm appearance-none outline-none cursor-pointer"
                />
                <span className="text-[9.5px] text-zinc-550 italic block leading-normal">
                  * Law I: Content requires physical oxygen. Fall below standard will be repaired to protect focus.
                </span>
              </div>

              {/* Chromatical color constraint limits */}
              <div className="space-y-2 pt-2 border-t border-zinc-900/40">
                <div className="flex justify-between items-baseline text-xs font-mono">
                  <span className="text-zinc-400">2. Maximum Permissible Hue spectrum count:</span>
                  <span className="text-amber-400 font-bold">{maxColorCount} solid colors</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="5" 
                  value={maxColorCount}
                  onChange={(e) => {
                    setMaxColorCount(Number(e.target.value));
                    logAction(`Luxury Laws: Set chromatical limits to ${e.target.value} hues`);
                  }}
                  className="w-full accent-amber-500 bg-zinc-900 h-1 rounded-sm appearance-none outline-none cursor-pointer"
                />
                <span className="text-[9.5px] text-zinc-555 italic block leading-normal">
                  * Law II: Saturated neon palettes violate modern publishing standards. Enforce sand, anthracite, and ivory tones first.
                </span>
              </div>

              {/* CTA limits */}
              <div className="space-y-2 pt-2 border-t border-zinc-900/40">
                <div className="flex justify-between items-baseline text-xs font-mono">
                  <span className="text-zinc-400">3. Maximum Floating CTA targets limit:</span>
                  <span className="text-amber-400 font-bold">{maxCtaLimit} anchor</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  value={maxCtaLimit}
                  onChange={(e) => {
                    setMaxCtaLimit(Number(e.target.value));
                    logAction(`Luxury Laws: Configured CTA solitaire capacity to ${e.target.value}`);
                  }}
                  className="w-full accent-amber-500 bg-zinc-900 h-1 rounded-sm appearance-none outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Geometry adjustments & compliance checklists */}
            <div className="space-y-4 bg-[#0a0b0e] p-5 rounded-lg border border-zinc-900/60 font-mono text-xs text-zinc-400">
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">Rule Settings Boolean Flags</span>
              
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-zinc-950">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[11px] font-sans font-bold text-zinc-300">Suppress Linear Gradients</span>
                    <p className="text-[9.5px] text-zinc-500 leading-normal font-sans">Bans cheap web color blending completely.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={suppressGradientsRule} 
                    onChange={(e) => {
                      setSuppressGradientsRule(e.target.checked);
                      logAction(`Luxury Laws Set: Suppress Gradients set to ${e.target.checked}`);
                    }}
                    className="w-4 h-4 rounded text-amber-500 bg-zinc-900 border-zinc-950 focus:ring-amber-505 accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-zinc-950">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[11px] font-sans font-bold text-zinc-300 font-bold">Square Button Corner Rules</span>
                    <p className="text-[9.5px] text-zinc-500 leading-normal font-sans text-xs">Forbids round bubble-like pill shapes.</p>
                  </div>
                  <select 
                    value={buttonCornersMode}
                    onChange={(e) => {
                      setButtonCornersMode(e.target.value as any);
                      logAction(`Luxury Laws: Enforced custom button corner type to ${e.target.value}`);
                    }}
                    className="bg-[#121319] border border-zinc-850 p-1 px-2 text-[10.5px] hover:border-zinc-700 rounded text-zinc-300 outline-none"
                  >
                    <option value="none">Flat (0px Square)</option>
                    <option value="sm">Subtle (4px Curve)</option>
                    <option value="md">Combed (8px Segment)</option>
                  </select>
                </div>
              </div>

              <div className="bg-amber-950/15 border border-amber-900/20 rounded p-4 text-[10px] leading-relaxed text-amber-400 lowercase uppercase text-left space-y-1">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-[8.5px] tracking-wider text-amber-500 font-mono">
                  <CloudLightning className="w-3.5 h-3.5 text-amber-400 animate-bounce" /> Luxury law engine active
                </div>
                * Our engine enforces visual quietude programmatically by rewriting CSS attributes to comply with Hermès & Celine design metrics.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER VIEW: DNA ADJUSTER */}
      {activeSubPath === "dna-manager" && (
        <div className="bg-[#0d0e12] border border-zinc-900 rounded-xl p-6 text-left space-y-5">
          <div className="space-y-1.5 border-b border-zinc-900 pb-4">
            <span className="font-mono text-[9px] text-amber-500 uppercase tracking-widest font-black block">Aesthetic Brand Configuration Panel</span>
            <h3 className="font-sans font-bold text-xs text-zinc-200 uppercase tracking-widest">
              DNA Brand Variables Database (高级感基因配置)
            </h3>
            <p className="text-[11px] text-zinc-440 font-light max-w-2xl leading-relaxed">
              Manually modify visual assets, colors and display face values for cached luxury reference lines. 
              These settings drive dynamic template rendering and direct cross-brand style mapping properties. Click on any brand's row to preview its live UI DNA and download its seed definition for cross-app reuse.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Reference Brand List Table */}
            <div className="lg:col-span-8 overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-zinc-900 text-zinc-500 uppercase tracking-wider text-[9px]">
                    <th className="py-2.5 px-2">Status</th>
                    <th className="py-2.5 px-3">Reference Brand</th>
                    <th className="py-2.5 px-3">Display Typography</th>
                    <th className="py-2.5 px-3">Symmetric Padding</th>
                    <th className="py-2.5 px-3">Letter tracking</th>
                    <th className="py-2.5 px-3">Base Hue</th>
                    <th className="py-2.5 px-3 text-right">Settings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-950 text-zinc-300">
                  {dnaProfiles.map((item, index) => {
                    const isSelected = selectedDnaIndex === index;
                    return (
                      <tr 
                        key={item.brand} 
                        onClick={() => {
                          setSelectedDnaIndex(index);
                          logAction(`Control Center: Selected active brand '${item.brand}' for live DNA simulation.`);
                        }}
                        className={`hover:bg-zinc-950/40 cursor-pointer transition-all duration-150 ${
                          isSelected ? "bg-zinc-950/80 border-l-2 border-amber-500" : ""
                        }`}
                      >
                        <td className="py-3 px-2 text-center">
                          <span className={`inline-block w-2 h-2 rounded-full ${isSelected ? "bg-amber-500 animate-pulse" : "bg-zinc-700"}`} />
                        </td>
                        <td className="py-3 px-3 font-sans font-bold text-zinc-150">{item.brand}</td>
                        <td className="py-3 px-3 font-semibold text-zinc-400">
                          {activeDnaEditIndex === index ? (
                            <input 
                              type="text" 
                              value={item.displayFont} 
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                const updated = [...dnaProfiles];
                                updated[index].displayFont = e.target.value;
                                setDnaProfiles(updated);
                              }}
                              className="bg-black border border-zinc-800 rounded px-1.5 py-0.5 text-[10px] text-zinc-150 outline-none w-32 font-mono"
                            />
                          ) : (
                            item.displayFont
                          )}
                        </td>
                        <td className="py-3 px-3">
                          {activeDnaEditIndex === index ? (
                            <input 
                              type="text" 
                              value={item.spacing} 
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                const updated = [...dnaProfiles];
                                updated[index].spacing = e.target.value;
                                setDnaProfiles(updated);
                              }}
                              className="bg-black border border-zinc-800 rounded px-1.5 py-0.5 text-[10px] text-zinc-150 outline-none w-24 font-mono"
                            />
                          ) : (
                            item.spacing
                          )}
                        </td>
                        <td className="py-3 px-3">
                          {activeDnaEditIndex === index ? (
                            <input 
                              type="text" 
                              value={item.lettersTracking} 
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                const updated = [...dnaProfiles];
                                updated[index].lettersTracking = e.target.value;
                                setDnaProfiles(updated);
                              }}
                              className="bg-black border border-zinc-800 rounded px-1.5 py-0.5 text-[10px] text-zinc-150 outline-none w-20 font-mono"
                            />
                          ) : (
                            item.lettersTracking
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex flex-col gap-1.5">
                            {activeDnaEditIndex === index ? (
                              <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center gap-1">
                                  <span className="text-[8px] text-zinc-500 w-8">Bg:</span>
                                  <input 
                                    type="text" 
                                    value={item.mainBg} 
                                    onChange={(e) => {
                                      const updated = [...dnaProfiles];
                                      updated[index].mainBg = e.target.value;
                                      setDnaProfiles(updated);
                                    }}
                                    className="bg-black border border-zinc-800 rounded px-1.5 py-0.5 text-[9px] text-zinc-150 outline-none w-18 font-mono"
                                  />
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-[8px] text-zinc-500 w-8">Tx:</span>
                                  <input 
                                    type="text" 
                                    value={item.textColor || "#111111"} 
                                    onChange={(e) => {
                                      const updated = [...dnaProfiles];
                                      updated[index].textColor = e.target.value;
                                      setDnaProfiles(updated);
                                    }}
                                    className="bg-black border border-zinc-800 rounded px-1.5 py-0.5 text-[9px] text-zinc-150 outline-none w-18 font-mono"
                                  />
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-[8px] text-zinc-500 w-8">Ac:</span>
                                  <input 
                                    type="text" 
                                    value={item.accentColor || "#10B981"} 
                                    onChange={(e) => {
                                      const updated = [...dnaProfiles];
                                      updated[index].accentColor = e.target.value;
                                      setDnaProfiles(updated);
                                    }}
                                    className="bg-black border border-zinc-800 rounded px-1.5 py-0.5 text-[9px] text-zinc-150 outline-none w-18 font-mono"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full border border-zinc-800 block" style={{ backgroundColor: item.mainBg }} title={`Background: ${item.mainBg}`} />
                                <span className="w-2.5 h-2.5 rounded-full border border-zinc-800 block" style={{ backgroundColor: item.textColor || "#111111" }} title={`Texts Color: ${item.textColor}`} />
                                <span className="w-2.5 h-2.5 rounded-full border border-zinc-800 block" style={{ backgroundColor: item.accentColor || "#10B981" }} title={`Accent Color: ${item.accentColor}`} />
                                <span className="text-zinc-[500] font-sans text-[9px] font-medium shrink-0 ml-1">Swatches</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right select-none">
                          {activeDnaEditIndex === index ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDnaEditIndex(null);
                                logAction(`DNA Manager: Corrected details for reference brand blueprint: ${item.brand}`);
                              }}
                              className="px-2 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 font-bold rounded text-[9px] cursor-pointer"
                            >
                              LOCK STATE
                            </button>
                          ) : (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveDnaEditIndex(index);
                                  logAction(`DNA Manager: Editing visual assets variables for ${item.brand}`);
                                }}
                                className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-850 hover:text-zinc-100 text-zinc-400 font-semibold rounded text-[9.5px] cursor-pointer"
                              >
                                EDIT
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownloadDna(item);
                                }}
                                className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-amber-500 rounded cursor-pointer border border-zinc-800"
                                title="Instant Export JSON"
                              >
                                <Download className="w-3 h-3 text-amber-500" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Right Column: Visual Preview Card & JSON Builder */}
            <div className="lg:col-span-4 bg-[#07080b] border border-zinc-900 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <div className="text-left space-y-0.5">
                  <span className="font-mono text-[8.5px] text-amber-505 uppercase tracking-widest font-black block">ACTIVE PREVIEW BRAND</span>
                  <h4 className="text-xs font-sans font-black text-zinc-200 uppercase tracking-wider leading-tight">
                    {dnaProfiles[selectedDnaIndex]?.brand}
                  </h4>
                </div>
                <span className="font-mono text-[8px] uppercase font-bold text-zinc-550 bg-[#121319] p-1 px-2 border border-stone-900/60 rounded">
                  DNA SEED
                </span>
              </div>

              <div className="space-y-3.5">
                {/* Visual sample box simulating target look layout */}
                <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-900/80 relative overflow-hidden group">
                  <div className="absolute top-1.5 right-1.5 font-mono text-[7px] text-zinc-650 tracking-widest">LIVE RENDER PREVIEW</div>
                  
                  <div className="space-y-2.5 mt-1">
                    <div className="font-sans text-left text-[9px] text-zinc-500 font-medium">
                      Display faces utilizing <span className="font-mono text-[10px] text-amber-400 font-bold">{dnaProfiles[selectedDnaIndex]?.displayFont}</span>
                    </div>
                    
                    <p 
                      className="text-center font-bold text-lg select-none py-1.5 overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-300" 
                      style={{
                        letterSpacing: dnaProfiles[selectedDnaIndex]?.lettersTracking || "0.15em",
                        color: dnaProfiles[selectedDnaIndex]?.textColor || "#E0E0E0",
                        fontFamily: dnaProfiles[selectedDnaIndex]?.displayFont === "Playfair Display" ? "'Playfair Display', serif" :
                                    dnaProfiles[selectedDnaIndex]?.displayFont === "Space Grotesk" ? "'Space Grotesk', sans-serif" :
                                    dnaProfiles[selectedDnaIndex]?.displayFont === "Outfit" ? "'Outfit', sans-serif" :
                                    dnaProfiles[selectedDnaIndex]?.displayFont === "Inter" ? "'Inter', sans-serif" : "monospace"
                      }}
                    >
                      {dnaProfiles[selectedDnaIndex]?.brand.substring(0, dnaProfiles[selectedDnaIndex]?.brand.indexOf(" ") > 0 ? dnaProfiles[selectedDnaIndex]?.brand.indexOf(" ") : undefined).toUpperCase() || "ATELIER"}
                    </p>

                    <div className="flex justify-between font-mono text-[8px] pt-1.5 border-t border-zinc-900/80 text-zinc-550">
                      <span>KERNING: {dnaProfiles[selectedDnaIndex]?.lettersTracking}</span>
                      <span>VOID: {dnaProfiles[selectedDnaIndex]?.spacing}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-palette Swatches */}
                <div className="space-y-2">
                  <span className="font-mono text-[8.5px] uppercase text-zinc-500 tracking-wider text-left block">Interactive Palette Swatches</span>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 rounded bg-zinc-950 border border-zinc-900/60 flex flex-col items-center gap-1 hover:border-zinc-800 transition">
                      <div className="w-full h-7 rounded border border-zinc-900 shadow-inner animate-fade-in" style={{ backgroundColor: dnaProfiles[selectedDnaIndex]?.mainBg }} />
                      <span className="font-mono text-[7px] text-zinc-[500] uppercase font-black text-center whitespace-nowrap">Background</span>
                      <span className="font-mono text-[8px] text-zinc-600">{dnaProfiles[selectedDnaIndex]?.mainBg}</span>
                    </div>

                    <div className="p-2 rounded bg-zinc-950 border border-zinc-900/60 flex flex-col items-center gap-1 hover:border-zinc-800 transition">
                      <div className="w-full h-7 rounded border border-zinc-900 shadow-inner animate-fade-in" style={{ backgroundColor: dnaProfiles[selectedDnaIndex]?.textColor || "#111111" }} />
                      <span className="font-mono text-[7px] text-zinc-[500] uppercase font-black text-center whitespace-nowrap">Typography</span>
                      <span className="font-mono text-[8px] text-zinc-600">{dnaProfiles[selectedDnaIndex]?.textColor || "#111111"}</span>
                    </div>

                    <div className="p-2 rounded bg-zinc-950 border border-zinc-900/60 flex flex-col items-center gap-1 hover:border-zinc-800 transition">
                      <div className="w-full h-7 rounded border border-zinc-900 shadow-inner animate-fade-in" style={{ backgroundColor: dnaProfiles[selectedDnaIndex]?.accentColor || "#10B981" }} />
                      <span className="font-mono text-[7px] text-zinc-[500] uppercase font-black text-center whitespace-nowrap">Brand Accent</span>
                      <span className="font-mono text-[8px] text-zinc-600">{dnaProfiles[selectedDnaIndex]?.accentColor || "#10B981"}</span>
                    </div>
                  </div>
                </div>

                {/* Compliant status */}
                <div className="bg-zinc-950 border border-zinc-900/80 p-3 rounded-lg text-left text-[9.5px] font-mono text-zinc-500 leading-normal space-y-1">
                  <span className="text-amber-500 font-bold block">✓ ATELIER CORE COMPLIANT METRICS</span>
                  <p className="font-sans font-light text-zinc-450">
                    Exposes correct visual parameters matching lookbook presets. Exporting compiles custom title rules, monogram seeds, font tags, and background tones. Ideal for cross-app rendering.
                  </p>
                </div>

                {/* Main Exporter download button */}
                <button
                  onClick={() => handleDownloadDna(dnaProfiles[selectedDnaIndex])}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black rounded-lg text-xs font-mono font-extrabold tracking-wider transition uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-97"
                >
                  <Download className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                  <span>EXPORT ACTIVE BRAND DNA</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER VIEW: TEMPLATE MANAGER */}
      {activeSubPath === "template-manager" && (
        <div className="bg-[#0d0e12] border border-zinc-900 rounded-xl p-6 text-left space-y-6">
          <div className="space-y-1 border-b border-zinc-900 pb-4">
            <span className="font-mono text-[9px] text-zinc-550 block">Active Layout Core Allocations</span>
            <h3 className="font-sans font-bold text-xs text-zinc-200 uppercase tracking-widest">
              Template Warehouse Catalog Manager (模板资产库)
            </h3>
            <p className="text-[11px] text-zinc-450 font-light leading-relaxed">
              Verify existing template architectures or import pre-configured luxury theme asset files and DNA seed modules asynchronously.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: CONTROL & FILE UPLOAD ZONE */}
            <div className="lg:col-span-4 space-y-5">
              {/* Quick adding container input */}
              <div className="bg-black/40 border border-zinc-900 rounded-lg p-5 space-y-4">
                <span className="font-mono text-[9.5px] text-amber-550 uppercase font-black tracking-wider block">Add Template Asset manually</span>
                <div className="space-y-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[8.5px] uppercase tracking-wider text-zinc-500 font-mono">Template Name:</label>
                    <input 
                      type="text" 
                      value={newTemplateName}
                      onChange={(e) => setNewTemplateName(e.target.value)}
                      placeholder="E.g. Archival Ready-To-Wear Lookbook"
                      className="bg-black border border-zinc-850 focus:border-amber-500 rounded px-3 py-2 text-xs text-zinc-150 outline-none font-sans w-full"
                    />
                  </div>
                  <button
                    onClick={handleAddTemplate}
                    className="w-full py-2 bg-zinc-900 hover:bg-zinc-850 hover:text-white border border-zinc-800 text-zinc-355 font-bold text-xs font-sans rounded cursor-pointer transition select-none flex items-center justify-center gap-1.5 leading-none"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Add Template Item</span>
                  </button>
                </div>
              </div>

              {/* PREMIUM INTERACTIVE FILE UPLOADER */}
              <div className="bg-black/40 border border-zinc-900 rounded-lg p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9.5px] text-amber-505 uppercase font-black tracking-wider block">Import JSON configs</span>
                  <span className="text-[8px] bg-zinc-900 border border-zinc-800 p-0.5 px-1.5 rounded text-zinc-400 font-mono uppercase">Drag & Drop</span>
                </div>

                {/* Upload drag drop zone wrapper */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-5 text-center transition duration-200 cursor-pointer flex flex-col items-center justify-center gap-2.5 relative ${
                    dragActive 
                      ? "border-amber-500 bg-amber-500/5 text-amber-400" 
                      : "border-zinc-850 bg-black/50 hover:border-zinc-700 text-zinc-450 hover:bg-black/70"
                  }`}
                  onClick={() => document.getElementById("json-file-picker")?.click()}
                >
                  <input
                    id="json-file-picker"
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-850 flex items-center justify-center text-amber-505 shadow-inner transition">
                    <Upload className="w-5 h-5 text-amber-500" />
                  </div>

                  <div className="space-y-1">
                    <p className="font-sans font-bold text-[11px] text-zinc-200">
                      Drag & Drop lookbook JSON or <span className="text-amber-500 underline decoration-dotted">Browse Files</span>
                    </p>
                    <p className="font-mono text-[8px] text-zinc-500 tracking-wider">
                      Supports direct JSON templates & DNA Seeds
                    </p>
                  </div>
                </div>

                {/* Status messages alerts */}
                <AnimatePresence mode="wait">
                  {uploadError && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="p-3 rounded-lg bg-red-950/40 border border-red-900/30 flex gap-2 items-start"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span className="font-sans text-[10px] text-red-400 leading-snug text-left">{uploadError}</span>
                    </motion.div>
                  )}

                  {uploadSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/30 flex gap-2 items-start"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="font-sans text-[10px] text-emerald-400 leading-snug text-left">{uploadSuccess}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* JSON Architecture Info guidelines */}
                <div className="bg-zinc-950 border border-zinc-900 p-3 rounded-lg text-left space-y-1">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-amber-500 font-bold block">✓ Dynamic Integration</span>
                  <p className="font-sans font-light text-[9.5px] text-zinc-500 leading-normal">
                    Files exported from the <span className="font-mono text-[9px] text-zinc-400 underline">DNA Variables Database</span> panel can be dragged back here directly. It will import templates and register core values into running lists instantaneously.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CATALOGUE LIST */}
            <div className="lg:col-span-8 space-y-3 max-h-[550px] overflow-y-auto pr-1">
              <span className="font-mono text-[9.5px] text-zinc-500 uppercase font-black tracking-wider block mb-2">Registered Layout Catalog ({templates.length} items)</span>
              
              {templates.map((tmpl) => (
                <div key={tmpl.id} className="bg-black/40 border border-zinc-950 hover:border-zinc-900 rounded-lg p-4 flex items-center justify-between gap-4 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-black text-sm text-zinc-200 leading-tight">{tmpl.name}</span>
                      <span className="text-[8px] bg-[#121318] text-zinc-550 px-1.5 py-0.2 rounded border border-zinc-900 uppercase">
                        {tmpl.id}
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-sans font-light flex items-center gap-2">
                      <span>Category segment: <strong className="text-zinc-400 font-medium">{tmpl.category}</strong></span>
                      <span>•</span>
                      <span className="text-amber-500 font-bold">Standard score: {tmpl.score}/100</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 select-none">
                    <button
                      onClick={() => handleToggleLock(tmpl.id)}
                      className={`px-3 py-1.5 rounded text-[10.5px] font-sans font-semibold border flex items-center gap-1 cursor-pointer transition uppercase ${
                        tmpl.isLocked 
                          ? "bg-red-955 text-red-400 border-red-900/35" 
                          : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-850"
                      }`}
                    >
                      {tmpl.isLocked ? (
                        <>
                          <Lock className="w-3 h-3" />
                          <span>FROZEN (冻结)</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>ACTIVE (发布)</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setTemplates(prev => prev.filter(t => t.id !== tmpl.id));
                        logAction(`Template Manager: Aborted template model: ${tmpl.name}`);
                      }}
                      className="p-1.5 rounded bg-zinc-900/60 border border-zinc-950 text-zinc-500 hover:text-red-400 hover:border-red-900/25 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {templates.length === 0 && (
                <div className="text-center py-12 text-zinc-650 uppercase font-mono text-xs border border-dashed border-zinc-900 rounded-lg bg-black/10">
                  Warehouse catalogue empty. Import config files to begin.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RENDER VIEW: SCRAPER CRAWLER PLAYGROUND */}
      {activeSubPath === "crawler-manager" && (
        <div className="bg-[#0b0c10] border border-zinc-900 rounded-xl p-6 text-left space-y-6">
          <div className="space-y-1.5 border-b border-zinc-900 pb-4">
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-amber-500" /> Auto-Harvesting crawling subsystem
            </span>
            <h3 className="font-sans font-black text-xs text-zinc-200 uppercase tracking-widest">
              Commercial Site Scraper & DNA Extractor Playground (智能采集测试)
            </h3>
            <p className="text-[11px] text-zinc-450 font-light leading-relaxed max-w-xl">
              Type in reference fashion domains (e.g. <code>zara.com</code>, <code>frama.dk</code>) to simulate our background crawler parsing structural elements and analyzing their empty space values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scraper controls and inputs */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-405 block">Host URL to Crawl:</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={crawlerUrl}
                    onChange={(e) => setCrawlerUrl(e.target.value)}
                    placeholder="E.g. celine.com"
                    className="flex-1 bg-black/40 border border-zinc-850 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs text-zinc-100 outline-none font-mono"
                  />
                  <button
                    onClick={handleLaunchCrawl}
                    disabled={isCrawling}
                    className="bg-amber-500 disabled:opacity-50 text-black px-4 py-2 font-bold text-xs font-sans rounded cursor-pointer select-none h-9 flex items-center justify-center gap-1 leading-none shadow-md shrink-0"
                  >
                    {isCrawling ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                    Scrape Site
                  </button>
                </div>
              </div>

              {/* Crawl logs real-time monitor panel */}
              <div className="bg-black/60 p-4 rounded-lg border border-zinc-950 font-mono text-[9.5px] leading-relaxed select-none h-[180px] overflow-y-auto space-y-1 text-zinc-500 select-none">
                <span className="text-zinc-550 block font-black border-b border-zinc-950 pb-1 mb-1.5 uppercase text-[8.5px] tracking-wider">CRAWLING SHELL TERMINAL ENGINE LOGS</span>
                {crawlerLogs.map((logStr, i) => (
                  <div key={i} className="flex gap-2 items-start text-xs font-light">
                    <span className="text-zinc-650 shrink-0">[{i + 1}]</span>
                    <span className="text-zinc-400 leading-normal">{logStr}</span>
                  </div>
                ))}
                {crawlerLogs.length === 0 && (
                  <div className="text-zinc-600 block pt-12 text-center uppercase">Awaiting scraper activation loop...</div>
                )}
              </div>
            </div>

            {/* Scanned sections harvested blocks block */}
            <div className="space-y-4 font-mono text-xs text-zinc-400">
              <span className="text-[9px] text-zinc-550 block font-bold uppercase tracking-widest">Harvested layout elements detected</span>
              
              <div className="space-y-2 bg-black/30 p-4 border border-zinc-950 rounded-lg h-[210px] overflow-y-auto select-none">
                {harvestedBlocks.map((block) => (
                  <div key={block.name} className="border-b border-zinc-950 pb-2 mb-2 flex flex-col space-y-1 text-left">
                    <span className="text-zinc-200 font-sans font-semibold leading-none">{block.name}</span>
                    <div className="flex justify-between font-mono text-[9px] text-zinc-500 uppercase pt-0.5">
                      <span>Density details: {block.visualWeight}</span>
                      <span className="text-amber-500 font-bold">Variance: {block.entropy}</span>
                    </div>
                  </div>
                ))}

                {harvestedBlocks.length === 0 && (
                  <div className="text-zinc-650 uppercase block text-center pt-16">No harvested sections matching cache directory definitions.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER VIEW: SCRIPTS SCORING AUDIT */}
      {activeSubPath === "template-scoring" && (
        <div className="bg-[#0c0d11] border border-zinc-900 rounded-xl p-6 text-left space-y-6">
          <div className="space-y-1.5 border-b border-zinc-900 pb-4">
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-black block flex items-center gap-1">
              <BarChart2 className="w-3.5 h-3.5 text-amber-500" />
              Comprehensive Layout Audit Scores
            </span>
            <h3 className="font-sans font-black text-xs text-zinc-200 uppercase tracking-widest">
              Template scoring Engine Metrics (高级感量化评分)
            </h3>
            <p className="text-[11.5px] text-zinc-450 leading-relaxed max-w-xl font-light font-sans">
              Visualize the 4 essential commerce performance values verified programmatically by the DNA engine across current lookbook releases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
            {[
              { label: "Luxury Index (质感度)", value: 99, color: "text-amber-400", bg: "bg-amber-955/20 border-amber-900/30", details: "Measures spacing intervals ratio & layout deceleration boundaries." },
              { label: "Commerce Rating (多品支持)", value: 94, color: "text-zinc-200", bg: "bg-zinc-900/50 border-zinc-850", details: "Tracks asymmetrical grid product columns support checks." },
              { label: "Minimalist Empty Space", value: 96, color: "text-zinc-200", bg: "bg-zinc-900/50 border-zinc-850", details: "Ensures void ratio doesn't collapse below the 55% constraint." },
              { label: "Conversion Index (转化率)", value: 98, color: "text-emerald-400", bg: "bg-emerald-955/20 border-emerald-900/30", details: "Audits checkouts button visibility and monogram entries." }
            ].map((metric) => (
              <div key={metric.label} className={`rounded-xl p-5 space-y-3 border flex flex-col justify-between ${metric.bg}`}>
                <div className="space-y-1 text-left">
                  <span className="font-sans font-bold text-xs text-zinc-300 block leading-tight">{metric.label}</span>
                  <p className="text-[10px] text-zinc-505 leading-relaxed font-sans font-light">{metric.details}</p>
                </div>
                
                {/* SVG Radial percentage visualization */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="#1d2024" strokeWidth="3" fill="transparent" />
                      <circle cx="24" cy="24" r="20" stroke="#e0a96d" strokeWidth="3.5" fill="transparent" strokeDasharray="125" strokeDashoffset={125 - (1.25 * metric.value)} />
                    </svg>
                    <span className="absolute font-mono text-[9px] text-zinc-200 font-bold">{metric.value}%</span>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-440 uppercase">AESTHETIC VERIFIED SECURITY</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Scoring Simulator Slider block */}
          <div className="p-4 rounded-lg bg-black/40 border border-zinc-950 font-mono text-xs text-zinc-400 text-left space-y-3">
            <span className="text-[9px] text-zinc-500 block uppercase font-black">Scoring Rule Explanation</span>
            <p className="text-[11px] font-sans font-light leading-relaxed">
              If a template injects multiple flashing stickers, has shallow vertical voids under 100px, or configures more than 3 competing call-to-action targets, the visual index drops immediately to "Slop". Enforcing the Luxury Laws rules raises the design criteria instantly.
            </p>
          </div>
        </div>
      )}

      {/* RENDER VIEW: INDUSTRIES CONFIG */}
      {activeSubPath === "industry-manager" && (
        <div className="bg-[#0b0c10] border border-zinc-900 rounded-xl p-6 text-left space-y-6">
          <div className="space-y-1.5 border-b border-zinc-900 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-zinc-550 block">Commerce Sectors Settings</span>
              <h3 className="font-sans font-black text-xs text-zinc-200 uppercase tracking-widest">
                Sector Categories list Manager (行业参数池)
              </h3>
            </div>

            {/* Config quick adding */}
            <div className="flex gap-2 font-mono text-[10px]">
              <input 
                type="text" 
                value={newIndustryKey}
                onChange={(e) => setNewIndustryKey(e.target.value)}
                placeholder="E.g. Luxury Skincare..."
                className="bg-black border border-zinc-850 focus:border-amber-505 rounded px-2.5 py-1 text-xs text-zinc-100 outline-none font-sans w-36"
              />
              <button
                onClick={() => {
                  if (!newIndustryKey.trim()) return;
                  setIndustries(prev => [...prev, { key: newIndustryKey.trim(), brands: ["Aesop", "Le Labo"], conversionRate: "4.0%" }]);
                  setNewIndustryKey("");
                  logAction(`Industry Manager: Registered custom fashion sector segment: ${newIndustryKey}`);
                }}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black font-bold font-sans rounded cursor-pointer leading-none flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Add Segment
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            {industries.map((sec) => (
              <div key={sec.key} className="bg-black/40 border border-zinc-950 p-4 rounded-lg text-left flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-zinc-[400] font-sans font-black tracking-wide block uppercase text-zinc-200">{sec.key}</span>
                  <span className="text-[9.5px] text-zinc-550 block">Conversion rates metric: {sec.conversionRate}</span>
                </div>

                <div className="pt-2 border-t border-zinc-905 flex justify-between items-center text-[10px] text-zinc-500 uppercase">
                  <span>Brands: {sec.brands.join(", ")}</span>
                  <button
                    onClick={() => {
                      setIndustries(prev => prev.filter(i => i.key !== sec.key));
                      logAction(`Industry Manager: De-registered custom sector segment: ${sec.key}`);
                    }}
                    className="p-1 rounded bg-zinc-900 border border-zinc-950 text-zinc-400 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
