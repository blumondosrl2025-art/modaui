import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, ShieldCheck, Ruler, Sliders, Play, Trash2, 
  Check, RefreshCw, AlertCircle, Info, Lock, Unlock, 
  Download, Upload, Cpu, FileText, ChevronRight, MessageSquare, 
  Terminal, Eye, Layout, Settings, Code, RefreshCcw, HelpCircle, 
  ArrowRight, Copy, Heart, User, Sparkle, Mic, MicOff
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CuratedTemplate } from "./TemplateStorefront";

interface V0AIEditorProps {
  activeTemplate: CuratedTemplate | null;
  allTemplates: CuratedTemplate[];
  onSelectTemplate: (template: CuratedTemplate) => void;
  logAction: (msg: string) => void;
}

export default function V0AIEditor({
  activeTemplate,
  allTemplates,
  onSelectTemplate,
  logAction
}: V0AIEditorProps) {
  // Backstage tabs
  const [activeSubTab, setActiveSubTab] = useState<"workspace" | "config-rules" | "dna-seeds">("workspace");

  // Chat/Aesthetic Copilot state
  const [userPrompt, setUserPrompt] = useState("");
  const [filterEnabled, setFilterEnabled] = useState(true);

  // Speech Recognition dictation state
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechStatus, setSpeechStatus] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const baseTextRef = useRef("");

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onstart = () => {
      setIsListening(true);
      setSpeechStatus("Listening... Speak now");
      logAction("V0 Dictation: Microphone access granted. Speak to dictate prompt refinement.");
    };

    rec.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const combined = baseTextRef.current + (baseTextRef.current ? " " : "") + finalTranscript + interimTranscript;
      setUserPrompt(combined);
      setSpeechStatus(`Live preview: "${combined}"`);
    };

    rec.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === "not-allowed") {
        setSpeechStatus("Permission denied. Ensure microphone access is allowed.");
        logAction("V0 Dictation: Permission denied by user browser security rule.");
      } else if (event.error === "no-speech") {
        setSpeechStatus("No speech detected. Speak clearly.");
        logAction("V0 Dictation: No voice speech detected.");
      } else {
        setSpeechStatus(`Error: ${event.error}`);
        logAction(`V0 Dictation Error: ${event.error}`);
      }
    };

    rec.onend = () => {
      setIsListening(false);
      setSpeechStatus(null);
    };

    recognitionRef.current = rec;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
    };
  }, []);

  const toggleListening = () => {
    if (!speechSupported) {
      alert("Web Speech API is not supported in this browser. Please try Chrome or Safari.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      baseTextRef.current = userPrompt;
      setSpeechStatus("Initializing microphone...");
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.error("Failed to start speech recognition, retrying:", err);
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          const rec = new SpeechRecognition();
          rec.continuous = true;
          rec.interimResults = true;
          rec.lang = "en-US";
          rec.onstart = () => {
            setIsListening(true);
            setSpeechStatus("Listening... Speak now");
          };
          rec.onresult = (event: any) => {
            let interimTranscript = "";
            let finalTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              const transcript = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                finalTranscript += transcript;
              } else {
                interimTranscript += transcript;
              }
            }
            setUserPrompt(baseTextRef.current + (baseTextRef.current ? " " : "") + finalTranscript + interimTranscript);
          };
          rec.onerror = (e: any) => {
            setIsListening(false);
            setSpeechStatus(`Error: ${e.error}`);
          };
          rec.onend = () => {
            setIsListening(false);
            setSpeechStatus(null);
          };
          recognitionRef.current = rec;
          rec.start();
        }
      }
    }
  };
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationProgress, setCompilationProgress] = useState(0);
  const [compilationStatus, setCompilationStatus] = useState("");
  const [complianceScore, setComplianceScore] = useState(98);
  const [activeCodeMode, setActiveCodeMode] = useState<"ui" | "tsx">("ui");

  // Control Center Rules
  const [minPaddingPx, setMinPaddingPx] = useState<number>(120);
  const [maxColorCount, setMaxColorCount] = useState<number>(3);
  const [maxCtaLimit, setMaxCtaLimit] = useState<number>(1);
  const [buttonCornersMode, setButtonCornersMode] = useState<"none" | "sm" | "md">("none");
  const [suppressGradients, setSuppressGradients] = useState<boolean>(true);

  // Active loaded DNA configurations matching current activeTemplate
  const [activeBrandName, setActiveBrandName] = useState("");
  const [dnaTheme, setDnaTheme] = useState("");
  const [dnaQuote, setDnaQuote] = useState("");
  const [dnaDisplayFont, setDnaDisplayFont] = useState("font-serif");
  const [selectedBgColor, setSelectedBgColor] = useState("#171614");
  const [selectedTextColor, setSelectedTextColor] = useState("#E6E4E0");
  const [selectedAccentColor, setSelectedAccentColor] = useState("#C5B299");

  // Prompt history stream
  const [history, setHistory] = useState<Array<{
    sender: "user" | "v0" | "enhancer";
    text: string;
    enhancedText?: string;
    rulesOverridden?: string[];
  }>>([
    {
      sender: "v0",
      text: "V0 Intelligence Editor initiated. Select a template and write instructions. The active DNA seeds and custom rules in the sidebar will guide, filter, and compile your layout."
    }
  ]);

  // Synchronize when the active template changes
  useEffect(() => {
    if (activeTemplate) {
      setActiveBrandName(activeTemplate.title);
      setDnaTheme(activeTemplate.story.theme);
      setDnaQuote(activeTemplate.story.concept);
      setDnaDisplayFont(activeTemplate.fontDisplay);
      setSelectedBgColor(activeTemplate.bgColor);
      setSelectedTextColor(activeTemplate.textColor);
      setSelectedAccentColor(activeTemplate.accentColor);
      
      // Determine score based on characteristics
      let score = 95;
      if (activeTemplate.bgColor === "#171614" || activeTemplate.bgColor === "#FAF9F6" || activeTemplate.bgColor === "#0A0A0A") score += 3;
      if (activeTemplate.fontDisplay === "font-serif" || activeTemplate.fontDisplay === "font-mono") score += 2;
      setComplianceScore(Math.min(100, score));

      logAction(`V0 Editor: Synchronized layout DNA workspace with template '${activeTemplate.title}'`);
    } else if (allTemplates.length > 0) {
      onSelectTemplate(allTemplates[0]);
    }
  }, [activeTemplate, allTemplates]);

  // Simulated AI Code generation with couture rule overlay
  const handleExecutePrompt = () => {
    if (!userPrompt.trim()) return;

    const rawInput = userPrompt;
    setUserPrompt("");
    logAction(`V0 Prompt Dispatch: Received instructions: "${rawInput}"`);

    // Add user message to log stream
    setHistory(prev => [...prev, { sender: "user", text: rawInput }]);

    setIsCompiling(true);
    setCompilationProgress(5);
    setCompilationStatus("Hydrating brand parameters through laws engine...");

    // Staggered compile logs
    const stages = [
      { progress: 20, msg: "Inspecting prompts targeting strict rule database..." },
      { progress: 50, msg: "Refactoring button geometry and color depth indexes..." },
      { progress: 80, msg: "Evaluating spacing ratio constraints (min 120px void zone)..." },
      { progress: 100, msg: "Compilation completed successfully!" }
    ];

    stages.forEach((stage, index) => {
      setTimeout(() => {
        setCompilationProgress(stage.progress);
        setCompilationStatus(stage.msg);

        if (stage.progress === 100) {
          setTimeout(() => {
            setIsCompiling(false);

            // Generate the Enhanced Couture prompt
            let enhanced = rawInput;
            const overrides: string[] = [];

            if (filterEnabled) {
              const lower = rawInput.toLowerCase();
              let edits = [];

              // Check CTA limits
              if (lower.includes("many buttons") || lower.includes("more button") || lower.includes("add four ctas") || maxCtaLimit === 1) {
                edits.push("Enforced exactly one single minimalist CTA to preserve absolute visual priority.");
                overrides.push("Restricted excess CTA buttons");
              }

              // Check corners/radius
              if (lower.includes("round") || lower.includes("bubble") || buttonCornersMode === "none") {
                edits.push("Overrode rounded bubble structures. Implemented rigid square borders with sharp 90-degree corners.");
                overrides.push("Forced zero-border-radius constraint");
              }

              // Check colors
              if (lower.includes("colorful") || lower.includes("rainbow") || lower.includes("neon") || maxColorCount <= 3) {
                edits.push(`Restrained active color palette strictly to ${maxColorCount} tones (Background: ${selectedBgColor}, Typography: ${selectedTextColor}, Highlight: ${selectedAccentColor}).`);
                overrides.push("Purged colorful non-brand variables");
              }

              // Spacing air check
              if (lower.includes("dense") || lower.includes("crowded") || minPaddingPx >= 120) {
                edits.push(`Applied spacious breathing negative space. Enforced a minimum padding boundary of ${minPaddingPx}px with empty air.`);
                overrides.push("Inserted 120px negative air buffer");
              }

              // Assemble enhanced string
              enhanced = `[Aesthetic Filter Engaged]: Clean layout matching ${activeBrandName}. ${edits.join(" ")} Refined instructions: Create a clean typography-focused component utilizing a ${dnaDisplayFont} display header, custom tagline, and minimalist pricing indicator.`;
            }

            // Calculate new compliance rating
            const newScore = Math.min(100, Math.max(88, 100 - (overrides.length * 3) + Math.floor(Math.random() * 4)));
            setComplianceScore(newScore);

            // Add v0 feedback response
            setHistory(prev => [
              ...prev,
              {
                sender: "enhancer",
                text: `Couture Agent enhanced: "${rawInput}"`,
                enhancedText: enhanced,
                rulesOverridden: overrides
              },
              {
                sender: "v0",
                text: `Successfully re-compiled section 3 based on your directive! The component code was updated safely under the guidance of active laws. No visual infractions were detected during rendering.`
              }
            ]);

            // Custom interaction logs
            logAction(`V0 Sandbox: Generated code module matching '${activeBrandName}' DNA bounds. Compliance rating: ${newScore}%`);
          }, 400);
        }
      }, (index + 1) * 550);
    });
  };

  const getActiveCodePreview = () => {
    return `import React from 'react';
import { motion } from 'motion/react';

//スタンドアロン V0.DIY STANDALONE COMPONENT MODULE
//Active DNA Seed: ${activeBrandName} (${minPaddingPx}px Restraint Padding)
//Luxury Compliance Index: ${complianceScore}%

export default function CustAtelierSection() {
  return (
    <div 
      className="w-full flex flex-col items-center justify-center text-center select-none"
      style={{ 
        backgroundColor: "${selectedBgColor}", 
        color: "${selectedTextColor}",
        paddingTop: "${minPaddingPx}px",
        paddingBottom: "${minPaddingPx}px" 
      }}
    >
      <div className="max-w-xl px-6 space-y-6">
        {/* Spatial Segment indicator */}
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase opacity-60 block">
          SEC. III • ${activeBrandName.split(" ")[0].toUpperCase()}
        </span>

        {/* Display Typography */}
        <h3 className="${dnaDisplayFont} text-2xl md:text-4xl font-light leading-snug tracking-wider text-inherit uppercase">
          ${activeTemplate?.hero.title || "The Design of Silence"}
        </h3>

        {/* Negative space divider */}
        <hr className="w-10 mx-auto border-t" style={{ borderColor: "${selectedTextColor}33" }} />

        {/* Editorial Subtext */}
        <p className="font-sans text-xs font-light leading-relaxed max-w-sm mx-auto opacity-75">
          ${activeTemplate?.hero.subtext || "Formulated with custom coordinates, fine lines, and clean layouts."}
        </p>

        {/* CTA Button Block adhering to Rules */}
        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 text-[10px] uppercase font-bold tracking-[0.2em] border duration-200 transition cursor-pointer"
            style={{ 
              backgroundColor: "${selectedTextColor}", 
              color: "${selectedBgColor}",
              borderColor: "${selectedTextColor}",
              borderRadius: "${buttonCornersMode === "none" ? "0px" : buttonCornersMode === "sm" ? "4px" : "8px"}"
            }}
          >
            ${activeTemplate?.hero.primaryCta || "ACQUIRE BRUTALIST OBJECT"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}`;
  };

  const currentDnaDetails = allTemplates.find(t => t.title === activeBrandName);

  return (
    <div className="flex flex-col lg:flex-row border border-neutral-200 rounded-3xl overflow-hidden bg-neutral-50 p-2 gap-4 h-[840px] select-none">
      
      {/* LEFT SIDEBAR: ACTIVE TEMPLATE DNA & CONTROL CENTER CONTROLS */}
      <div className="w-full lg:w-[320px] shrink-0 flex flex-col bg-white border border-neutral-200/60 rounded-2xl select-none min-h-0 overflow-y-auto scrollbar">
        {/* Sidebar Header Tabs */}
        <div className="flex border-b border-neutral-100 p-2 gap-1 bg-neutral-50/50 shrink-0">
          <button
            onClick={() => setActiveSubTab("workspace")}
            className={`flex-1 py-2 rounded-lg text-[10px] font-sans font-extrabold tracking-wider uppercase transition cursor-pointer ${
              activeSubTab === "workspace" ? "bg-black text-white" : "text-neutral-500 hover:text-black"
            }`}
          >
            🔧 Workspace
          </button>
          
          <button
            onClick={() => setActiveSubTab("config-rules")}
            className={`flex-1 py-1 px-1 rounded-lg text-[10px] font-sans font-extrabold tracking-wider uppercase transition cursor-pointer ${
              activeSubTab === "config-rules" ? "bg-black text-white" : "text-neutral-500 hover:text-black"
            }`}
          >
            📜 Rules
          </button>

          <button
            onClick={() => setActiveSubTab("dna-seeds")}
            className={`flex-1 py-2 rounded-lg text-[10px] font-sans font-extrabold tracking-wider uppercase transition cursor-pointer ${
              activeSubTab === "dna-seeds" ? "bg-black text-white" : "text-neutral-500 hover:text-black"
            }`}
          >
            🧬 Seeds
          </button>
        </div>

        {/* Tab 1: Workspace Core Settings */}
        {activeSubTab === "workspace" && (
          <div className="p-4 flex-grow flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="space-y-1 text-left">
                <span className="text-[9px] font-mono uppercase text-neutral-400 tracking-wider">PROJECT TEMPLATE BOUNDS</span>
                <label className="block text-xs font-bold text-neutral-800">Selected Template Source</label>
                <select
                  value={activeTemplate?.id || ""}
                  onChange={(e) => {
                    const found = allTemplates.find(t => t.id === e.target.value);
                    if (found) onSelectTemplate(found);
                  }}
                  className="w-full mt-1 bg-neutral-50 text-xs font-mono text-neutral-800 border border-neutral-200 rounded-xl px-3 py-2 cursor-pointer focus:outline-none focus:border-black"
                >
                  {allTemplates.map(t => (
                    <option key={t.id} value={t.id}>{t.title} ({t.category})</option>
                  ))}
                </select>
              </div>

              {/* Visual mini look of current seeds */}
              <div className="border border-neutral-150 p-3.5 rounded-2xl text-left bg-neutral-50/40 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-150">
                  <span className="text-[10px] font-bold text-neutral-800 uppercase tracking-tight">Active DNA Seed</span>
                  <span className="text-[8px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-150 px-1.5 py-0.5 rounded font-extrabold">SYNCED</span>
                </div>
                
                <div className="space-y-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span className="font-mono text-[9px] text-neutral-400">Backdrop:</span>
                    <span className="font-mono text-[10px] font-semibold text-neutral-700">{selectedBgColor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-[9px] text-neutral-400">Typography:</span>
                    <span className="font-mono text-[10px] font-semibold text-neutral-700">{selectedTextColor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-[9px] text-neutral-400">Accent:</span>
                    <span className="font-mono text-[10px] font-semibold text-neutral-700">{selectedAccentColor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-[9px] text-neutral-400">Display Font:</span>
                    <span className="font-semibold text-neutral-700 truncate">{dnaDisplayFont === "font-serif" ? "Playfair Display" : dnaDisplayFont === "font-mono" ? "JetBrains Mono" : "Outfit Display"}</span>
                  </div>
                </div>
              </div>

              {/* Sliders for rapid workspace overriding */}
              <div className="space-y-3 text-left pt-2">
                <span className="text-[9px] font-mono uppercase text-neutral-400 tracking-wider">WORKSPACE OVERRIDES</span>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-neutral-700">
                    <span>Background Blend</span>
                    <span className="font-mono text-[10px]">{selectedBgColor}</span>
                  </div>
                  <input 
                    type="color" 
                    value={selectedBgColor}
                    onChange={(e) => {
                      setSelectedBgColor(e.target.value);
                      logAction(`V0 Workspace Override: Modified wallpaper background blend to '${e.target.value}'`);
                    }}
                    className="w-full h-8 px-1 py-0.5 bg-neutral-50 border border-neutral-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-neutral-700">
                    <span>Accent Tone</span>
                    <span className="font-mono text-[10px]">{selectedAccentColor}</span>
                  </div>
                  <input 
                    type="color" 
                    value={selectedAccentColor}
                    onChange={(e) => {
                      setSelectedAccentColor(e.target.value);
                      logAction(`V0 Workspace Override: Modified accent tone hex to '${e.target.value}'`);
                    }}
                    className="w-full h-8 px-1 py-0.5 bg-neutral-50 border border-neutral-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Compliance rating dial block */}
            <div className="pt-4 border-t border-neutral-100 text-left space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-neutral-400 tracking-wider">AESTHETIC COMPLIANCE REPORT</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${complianceScore >= 95 ? "bg-emerald-50 text-emerald-700 border border-emerald-150" : "bg-amber-50 text-amber-700 border border-amber-150"}`}>
                  {complianceScore >= 95 ? "PASSING" : "AUDIT NEEDED"}
                </span>
              </div>
              <div className="bg-neutral-50 border border-neutral-150 p-3 rounded-2xl flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-[10px] font-bold text-neutral-800 uppercase tracking-tight">Luxury Score</h4>
                  <p className="text-[8.5px] font-mono text-neutral-500 leading-tight">Calculated automatically based on spacing limits & color depth</p>
                </div>
                <div className="text-2xl font-serif font-black text-neutral-800">
                  {complianceScore}%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Control Center Rules configs */}
        {activeSubTab === "config-rules" && (
          <div className="p-4 flex-grow flex flex-col justify-between space-y-5 text-left">
            <div className="space-y-5">
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-tight">Couture Laws Configuration</h4>
                <p className="text-[8.5px] text-neutral-400 font-sans leading-relaxed">
                  Adjust strict parameters governing the AI generation prompt engine. Any prompt input is filtered matching these rules.
                </p>
              </div>

              {/* Rule: Min Padding */}
              <div className="space-y-1.5 border-t pt-3 border-neutral-100">
                <div className="flex justify-between items-center text-xs font-bold text-neutral-800">
                  <span className="flex items-center gap-1">📯 Spacing Restraint</span>
                  <span className="font-mono text-[10px] bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600">{minPaddingPx}px</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="200" 
                  step="10"
                  value={minPaddingPx}
                  onChange={(e) => {
                    setMinPaddingPx(parseInt(e.target.value));
                    logAction(`Control Center: Reset margin constraint rule to ${e.target.value}px`);
                  }}
                  className="w-full accent-black cursor-pointer h-1.5 bg-neutral-100 rounded-lg appearance-none"
                />
                <span className="text-[8.5px] text-neutral-400 block font-light leading-snug">
                  Enforces maximum breathing negative space (empty borders) around components.
                </span>
              </div>

              {/* Rule: Max Color Palette Depth */}
              <div className="space-y-1.5 border-t pt-3 border-neutral-100">
                <div className="flex justify-between items-center text-xs font-bold text-neutral-800">
                  <span className="flex items-center gap-1">🎨 Palette Tones Limit</span>
                  <span className="font-mono text-[10px] bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600">{maxColorCount} colors</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="5" 
                  value={maxColorCount}
                  onChange={(e) => {
                    setMaxColorCount(parseInt(e.target.value));
                    logAction(`Control Center: Regulated extreme tone allocation rules depth -> ${e.target.value}`);
                  }}
                  className="w-full accent-black cursor-pointer h-1.5 bg-neutral-100 rounded-lg appearance-none"
                />
                <span className="text-[8.5px] text-neutral-400 block font-light leading-snug">
                  Prevents multiple chaotic theme shades. Compresses styling variables.
                </span>
              </div>

              {/* Rule: CTA Buttons count limit */}
              <div className="space-y-1.5 border-t pt-3 border-neutral-100">
                <div className="flex justify-between items-center text-xs font-bold text-neutral-800">
                  <span className="flex items-center gap-1">⚡ Max CTA Anchors</span>
                  <span className="font-mono text-[10px] bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600">{maxCtaLimit} CTA</span>
                </div>
                <select
                  value={maxCtaLimit}
                  onChange={(e) => {
                    setMaxCtaLimit(parseInt(e.target.value));
                    logAction(`Control Center: Updated Call To Action limit count to: ${e.target.value}`);
                  }}
                  className="w-full bg-neutral-50 text-xs font-mono border border-neutral-200 rounded-xl px-2 py-1.5 cursor-pointer"
                >
                  <option value={1}>1 CTA Anchor (Supreme Focus)</option>
                  <option value={2}>2 CTA Anchors (Moderate)</option>
                  <option value={3}>3 CTA Anchors (High density warning)</option>
                </select>
                <span className="text-[8.5px] text-neutral-400 block font-light leading-snug">
                  Avoids visual overcrowding and conversion pressure by forcing minimalist layout anchors.
                </span>
              </div>

              {/* Rule: Corner/Radius */}
              <div className="space-y-1.5 border-t pt-3 border-neutral-100">
                <span className="text-xs font-bold text-neutral-800 flex items-center gap-1">📐 Border Geometry</span>
                <div className="flex gap-2">
                  {(["none", "sm", "md"] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => {
                        setButtonCornersMode(mode);
                        logAction(`Control Center: Changed button boundary restraint rule layout to ${mode.toUpperCase()}`);
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-[9.5px] font-mono border transition uppercase cursor-pointer ${
                        buttonCornersMode === mode 
                          ? "bg-black text-white border-black" 
                          : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                      }`}
                    >
                      {mode === "none" ? "Flat" : mode === "sm" ? "4px" : "8px"}
                    </button>
                  ))}
                </div>
                <span className="text-[8.5px] text-neutral-400 block font-light leading-snug">
                  Forces either brutalist sharp corners or soft refined edge bevels block.
                </span>
              </div>

              {/* Rule: Suppress Gradients */}
              <div className="flex items-center justify-between border-t pt-3 border-neutral-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-neutral-800 block">✖ Ban Gradients & Glows</span>
                  <span className="text-[8.5px] text-neutral-400 font-light block">Strictly suppress neon lights.</span>
                </div>
                <button
                  onClick={() => {
                    setSuppressGradients(!suppressGradients);
                    logAction(`Control Center: Suppress gradients rules set to ${!suppressGradients}`);
                  }}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                    suppressGradients ? "bg-black" : "bg-neutral-200"
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-transform shadow-xs ${
                    suppressGradients ? "left-[18px]" : "left-[3px]"
                  }`} />
                </button>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200/60 p-3 rounded-2xl flex items-start gap-2 text-amber-900 text-[10px] leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Aesthetic Sentinel Active:</strong> Prompts violating these parameters are automatically neutralized and rebalanced at generation time.
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: Detailed Brand DNA Seeds list */}
        {activeSubTab === "dna-seeds" && (
          <div className="p-4 flex-grow flex flex-col justify-between space-y-4 text-left">
            <div className="space-y-4">
              <div className="space-y-1 pb-1">
                <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-tight">Curation Registry</h4>
                <p className="text-[8.5px] text-neutral-400 leading-relaxed font-sans">
                  Historic design DNA memories compiled from world-class luxury houses.
                </p>
              </div>

              <div className="space-y-2.5 max-h-[480px] overflow-y-auto scrollbar">
                {allTemplates.map(t => (
                  <div 
                    key={t.id}
                    onClick={() => {
                      onSelectTemplate(t);
                    }}
                    className={`border p-3 rounded-2xl cursor-pointer text-left transition select-none ${
                      activeTemplate?.id === t.id 
                        ? "bg-black text-white border-black shadow-sm" 
                        : "bg-neutral-50/50 hover:bg-neutral-100/50 border-neutral-200 text-neutral-800"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1.5 border-b" style={{ borderColor: activeTemplate?.id === t.id ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.06)" }}>
                      <span className="font-sans font-extrabold text-[10.5px] uppercase truncate max-w-[160px]">{t.title}</span>
                      <span className="font-mono text-[7px] border rounded px-1.5 uppercase tracking-wider" style={{ borderColor: "currentColor" }}>
                        {t.category.split(" ")[0]}
                      </span>
                    </div>
                    
                    <p className="text-[9.5px] font-sans font-light mt-2 line-clamp-2 leading-relaxed opacity-75">
                      {t.story.details}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-[8px] font-mono">
                      <span>Vibe: {t.brandStyle.split(" ")[0]}</span>
                      <span className="opacity-60">{t.bgColor} • {t.textColor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CORE WORKSPACE: LIVE INTERACTIVE CANVAS & CODE BLOCK PREVIEW */}
      <div className="flex-1 flex flex-col min-w-0 bg-white border border-neutral-200/60 rounded-2xl overflow-hidden p-4 select-none">
        
        {/* Editor Top Navigation: Displays active state & provides compiler buttons */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 shrink-0">
          <div className="text-left space-y-0.5">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-black animate-pulse" />
              <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-neutral-900">
                V0 Standalone Compiler Sandbox
              </h3>
            </div>
            <p className="text-[9px] font-mono text-neutral-500">
              Active Session: <strong className="text-neutral-800">Section III (Featured Concept Block)</strong>
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-neutral-100 p-0.5 rounded-xl border border-neutral-200">
            <button
              onClick={() => setActiveCodeMode("ui")}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-sans font-bold uppercase transition flex items-center gap-1 cursor-pointer select-none ${
                activeCodeMode === "ui" ? "bg-white text-black shadow-xs font-black" : "text-neutral-500 hover:text-black"
              }`}
            >
              <Layout className="w-3 h-3 text-inherit" />
              <span>Live Render</span>
            </button>
            
            <button
              onClick={() => setActiveCodeMode("tsx")}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-sans font-bold uppercase transition flex items-center gap-1 cursor-pointer select-none ${
                activeCodeMode === "tsx" ? "bg-white text-black shadow-xs font-black" : "text-neutral-500 hover:text-black"
              }`}
            >
              <Code className="w-3 h-3 text-inherit" />
              <span>TSX Code</span>
            </button>
          </div>
        </div>

        {/* Tab content panel */}
        <div className="flex-1 min-h-0 bg-neutral-100/50 rounded-2xl relative overflow-hidden border border-neutral-200/50">
          
          {/* Active compiling loader overlay block */}
          <AnimatePresence>
            {isCompiling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 z-40"
              >
                <div className="w-64 space-y-4 text-center">
                  <div className="relative w-12 h-12 mx-auto">
                    <div className="absolute inset-0 border-3 border-neutral-100 rounded-full" />
                    <div className="absolute inset-0 border-3 border-neutral-900 rounded-full border-t-transparent animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-sans font-extrabold uppercase tracking-widest text-neutral-900">Compiling Sandbox Code</h4>
                    <span className="text-[10px] font-mono text-neutral-500 block h-4 truncate">{compilationStatus}</span>
                  </div>
                  <div className="h-1 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-black transition-all duration-300"
                      style={{ width: `${compilationProgress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {activeCodeMode === "ui" ? (
            /* Visual Canvas: Centered component styled with active DNA */
            <div className="absolute inset-0 overflow-y-auto scrollbar flex items-center justify-center p-8 bg-neutral-200/40">
              <div 
                className="w-full max-w-xl border border-neutral-200 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 self-center"
                style={{ 
                  backgroundColor: selectedBgColor, 
                  color: selectedTextColor,
                  paddingTop: `${minPaddingPx}px`,
                  paddingBottom: `${minPaddingPx}px`
                }}
              >
                <div className="px-8 space-y-6 text-center select-none">
                  {/* Category marker */}
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase opacity-60 block">
                    SEC. III • {activeBrandName.split(" ")[0].toUpperCase()}
                  </span>

                  {/* Curated Typography display title */}
                  <h3 className={`${dnaDisplayFont} text-2xl md:text-3.5xl font-light leading-snug tracking-wider text-inherit uppercase`}>
                    {activeTemplate?.hero.title || "The Design of Silence"}
                  </h3>

                  {/* Symmetrical fine layout separator line */}
                  <hr className="w-10 mx-auto border-t" style={{ borderColor: `${selectedTextColor}33` }} />

                  {/* Brand Concept message */}
                  <p className="font-sans text-[11.5px] font-light leading-relaxed max-w-sm mx-auto opacity-75">
                    {activeTemplate?.hero.subtext || "Formulated with custom coordinates, fine lines, and clean layouts."}
                  </p>

                  {/* Flat unrounded cta button */}
                  <div className="pt-4">
                    <button
                      className="px-6 py-2.5 text-[10px] uppercase font-bold tracking-[0.2em] border duration-200 transition active:scale-95"
                      style={{ 
                        backgroundColor: selectedTextColor, 
                        color: selectedBgColor,
                        borderColor: selectedTextColor,
                        borderRadius: buttonCornersMode === "none" ? "0px" : buttonCornersMode === "sm" ? "4px" : "8px"
                      }}
                    >
                      {activeTemplate?.hero.primaryCta || "ACQUIRE BRUTALIST OBJECT"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Code Editor preview compiled TSX code block */
            <div className="absolute inset-0 overflow-y-auto scrollbar p-4 bg-neutral-900 text-neutral-300 text-[10.5px] font-mono text-left select-text">
              <div className="flex justify-between items-center bg-neutral-850 px-3.5 py-2.5 rounded-lg border border-neutral-800 text-neutral-400 mb-3 shrink-0 select-none">
                <span>CustAtelierSection.tsx (Premium Template Component)</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getActiveCodePreview());
                    logAction(`V0 Sandbox: Standalone component code copied to clipboard.`);
                    alert("Ready to build! Clipboard initialized with full standalone component code.");
                  }}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:text-white rounded text-[9.5px] transition cursor-pointer select-none"
                >
                  <Copy className="w-3 h-3 inline mr-1" /> Copy Code
                </button>
              </div>
              <pre className="p-2 whitespace-pre leading-relaxed font-mono">
                {getActiveCodePreview()}
              </pre>
            </div>
          )}
        </div>

        {/* BOTTOM SECTION: COUTURE PROMPT ENGINE CONTROLLER */}
        <div className="mt-4 pt-4 border-t border-neutral-100 shrink-0 select-none text-left space-y-3">
          
          {/* Enhanced prompt indicator row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-neutral-50 border border-neutral-150 rounded-2xl p-3">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[10px] font-sans font-bold uppercase text-neutral-800 tracking-tight flex items-center gap-1">
                  Couture Prompt Filtration
                </span>
                <p className="text-[8.5px] text-neutral-500 font-sans leading-relaxed">
                  Automatically aligns raw user commands to strict luxury, negative spacing, and margin principles.
                </p>
              </div>
            </div>

            {/* Toggle Couture Filter switch */}
            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              <span className="text-[9px] font-mono font-bold text-neutral-500">{filterEnabled ? "LAW FILTER ACTIVE" : "RAW GUEST MODE"}</span>
              <button
                onClick={() => {
                  setFilterEnabled(!filterEnabled);
                  logAction(`V0 Prompt filter toggled to ${!filterEnabled}`);
                }}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  filterEnabled ? "bg-black" : "bg-neutral-250"
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-transform shadow-xs ${
                  filterEnabled ? "left-[18px]" : "left-[3px]"
                }`} />
              </button>
            </div>
          </div>

          {speechStatus && (
            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-600 bg-neutral-50 py-1.5 px-3.5 rounded-xl border border-neutral-150">
              <span className={`w-2 h-2 rounded-full ${isListening ? "bg-red-550 animate-ping" : "bg-neutral-400"}`} />
              <span>Voice Dictation Status: <strong className="text-neutral-800">{speechStatus}</strong></span>
            </div>
          )}

          <div className="flex gap-2">
            <input 
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder={isListening ? "Listening... speak now to transcribe refinement" : `e.g. "Add a bold secondary CTA button" or "Increase standard padding lines to look airy"`}
              className="flex-1 bg-white border border-neutral-250 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-black placeholder-neutral-400"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleExecutePrompt();
              }}
            />
            
            {speechSupported && (
              <button
                type="button"
                onClick={toggleListening}
                className={`px-3 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center relative ${
                  isListening
                    ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100 ring-2 ring-red-100 shadow-sm"
                    : "bg-neutral-50 border-neutral-200 text-neutral-500 hover:bg-neutral-100 hover:text-black"
                }`}
                title={isListening ? "Stop voice dictation" : "Dictate with microphone (hands-free)"}
              >
                {isListening ? (
                  <>
                    <Mic className="w-4 h-4 text-red-600 animate-pulse mr-1" />
                    <span className="font-mono text-[9px] text-red-600 font-bold select-none">REC</span>
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  </>
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
            )}

            <button
              onClick={handleExecutePrompt}
              disabled={!userPrompt.trim() || isCompiling}
              className="px-5 py-2.5 bg-black hover:bg-neutral-800 disabled:opacity-40 text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition duration-150 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Compile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* RIGHT SIDEBAR: HIGH FIDELITY SYSTEM CHAT & RUNTIME LOGS */}
      <div className="w-full lg:w-[320px] shrink-0 flex flex-col bg-white border border-neutral-200/60 rounded-2xl select-none min-h-0 overflow-y-auto scrollbar">
        
        {/* Right header */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between shrink-0 bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-black" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-neutral-800">Couture Copilot Chat</span>
          </div>
          <span className="text-[8px] font-mono bg-neutral-150 text-neutral-500 rounded px-1.5 py-0.5">V1.3</span>
        </div>

        {/* Scrollable history streams */}
        <div className="flex-grow p-4 space-y-3.5 overflow-y-auto scrollbar min-h-0">
          {history.map((msg, index) => (
            <div 
              key={index}
              className={`flex flex-col space-y-1 text-xs text-left ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center gap-1 text-[8px] font-mono text-neutral-400">
                <span>{msg.sender === "user" ? "CURATOR INSTRUCTIONS" : msg.sender === "enhancer" ? "AESTHETIC LAW REFACTOR" : "v0 COMPILER"}</span>
              </div>

              {msg.sender === "enhancer" ? (
                /* Specialized display showing prompt enhancement side-by-side */
                <div className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 space-y-2.5">
                  <div className="space-y-1">
                    <span className="text-[7.5px] font-mono font-bold text-neutral-400 block uppercase">Raw Prompt:</span>
                    <p className="italic text-neutral-500 font-sans text-[10.5px] leading-normal">
                      "{msg.text.replace(/Couture Agent enhanced: /g, "")}"
                    </p>
                  </div>
                  
                  <div className="border-t border-neutral-200/60 pt-2 space-y-1.5">
                    <span className="text-[7.5px] font-mono font-bold text-emerald-600 block uppercase flex items-center gap-1">
                      <Sparkle className="w-2.5 h-2.5 text-emerald-500 fill-emerald-500 animate-pulse" /> Couture Filtered Blueprint:
                    </span>
                    <p className="text-neutral-800 font-sans text-[11px] leading-relaxed font-medium">
                      {msg.enhancedText}
                    </p>
                  </div>

                  {msg.rulesOverridden && msg.rulesOverridden.length > 0 && (
                    <div className="pt-1.5 flex flex-wrap gap-1">
                      {msg.rulesOverridden.map((rule, idx) => (
                        <span 
                          key={idx}
                          className="text-[7px] font-mono text-neutral-500 bg-neutral-100 border px-1.5 py-0.5 rounded uppercase"
                        >
                          ⚖ {rule}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Simple text messages */
                <div 
                  className={`p-3 rounded-2xl max-w-[90%] leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-black text-white text-[11.5px]" 
                      : "bg-neutral-50 text-neutral-800 border border-neutral-150 text-[11px]"
                  }`}
                >
                  {msg.text}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Logs footer */}
        <div className="p-3 bg-neutral-50 border-t border-neutral-100 shrink-0 text-left">
          <div className="flex justify-between items-center text-[8px] font-mono text-neutral-400 uppercase tracking-widest pb-1.5">
            <span>AESTHETIC COMPLIANCE STATS</span>
            <span className="text-neutral-600 font-bold">LIVE METRICS</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-neutral-600 font-mono text-[9px] pt-1">
            <div className="bg-white p-2 rounded-lg border border-neutral-150">
              <span className="text-[7.5px] text-neutral-400 block uppercase">Density Index</span>
              <strong className="text-neutral-800">{minPaddingPx >= 120 ? "0.02 (Optimal)" : "0.08 (Fair)"}</strong>
            </div>
            
            <div className="bg-white p-2 rounded-lg border border-neutral-150">
              <span className="text-[7.5px] text-neutral-400 block uppercase">Tone Space</span>
              <strong className="text-neutral-800">{maxColorCount} Tones Strict</strong>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
