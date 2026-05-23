import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Compass, BookOpen, Award, Sliders, 
  Send, X, Loader2, RefreshCw
} from "lucide-react";
import { SingularityBrand } from "../../types";

interface AmbientAIConciergeProps {
  brand: SingularityBrand;
  onHaptic?: () => void;
  productContext?: any;
  ritualContext?: any;
}

export default function AmbientAIConcierge({ 
  brand, 
  onHaptic, 
  productContext, 
  ritualContext 
}: AmbientAIConciergeProps) {
  // Configurable states mirroring "DNA Spec Layer"
  const [enabled, setEnabled] = useState(true);
  const [persona, setPersona] = useState<"curator" | "archivist" | "personal-shopper">("archivist");
  const [tone, setTone] = useState<"reverent" | "poetic" | "minimalist">("poetic");
  const [position, setPosition] = useState<"bottom-right" | "bottom-left" | "edge-right">("bottom-right");
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const currentThemeMaterial = brand.brandUnderstanding?.materials?.[0] || "raw ceramic";

  // Conversation States
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; text: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    `品味${currentThemeMaterial}的感官厚度`,
    "定制新月送达仪式",
    "获取空间陈列建议"
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dynamic automatic DNA-level induction of personality parameters & initial delay of 10s (10000ms)
  useEffect(() => {
    const vibe = (brand.designerVibe || "").toLowerCase();
    
    let inductedPersona: "curator" | "archivist" | "personal-shopper" = "archivist";
    let inductedTone: "reverent" | "poetic" | "minimalist" = "poetic";
    let subList = [
      `品味${currentThemeMaterial}的感官厚度`,
      "定制新月送达仪式",
      "获取空间陈列建议"
    ];

    if (vibe.includes("monastic") || vibe.includes("monk") || vibe.includes("architecture")) {
      inductedPersona = "archivist";
      inductedTone = "reverent";
      subList = [
        `解读静穆空间的材质律动`,
        `追寻「${currentThemeMaterial}」工艺源头`,
        `探讨纯白空间的消隐设计`
      ];
    } else if (vibe.includes("glass") || vibe.includes("smoked") || vibe.includes("minimal")) {
      inductedPersona = "curator";
      inductedTone = "minimalist";
      subList = [
        `分析「${currentThemeMaterial}」质地与阴翳`,
        `获取一小时内沉默配送建议`,
        `探讨微平面几何对称学`
      ];
    } else if (vibe.includes("metal") || vibe.includes("brass") || vibe.includes("gold") || vibe.includes("luxury")) {
      inductedPersona = "personal-shopper";
      inductedTone = "reverent";
      subList = [
        `尊启「${currentThemeMaterial}」专属微定制`,
        `预约工坊手作封漆仪式`,
        `探讨金石交错的重力陈列`
      ];
    } else {
      // Default ceramic / raw linen
      inductedPersona = "archivist";
      inductedTone = "poetic";
      subList = [
        `品味「${currentThemeMaterial}」在窑火中的变化`,
        `定制「新月投递」长伴契约`,
        `模拟午后斜射光线下的陈列`
      ];
    }

    setPersona(inductedPersona);
    setTone(inductedTone);
    setSuggestions(subList);

    // Precise 10 seconds (10000ms) delay to respect "Passive silence and elite composure"
    const timer = setTimeout(() => {
      setVisible(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [brand.designerVibe, currentThemeMaterial]);

  // Scroll to bottom on conversation grow
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const triggerHaptic = () => {
    if (onHaptic) onHaptic();
  };

  // Trigger conversational agent through the secure full-stack API path
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || loading) return;

    triggerHaptic();
    const userMsg = { role: "user" as const, text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/premium/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: brand.brandName,
          designerVibe: brand.designerVibe,
          material: currentThemeMaterial,
          persona,
          tone,
          userMessage: textToSend,
          chatHistory: messages,
          productContext,
          ritualContext
        })
      });

      if (!response.ok) {
        throw new Error("Cognitive link down");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "model" as const, text: data.reply }]);
      if (data.suggestions && data.suggestions.length > 0) {
        setSuggestions(data.suggestions);
      }
    } catch (err) {
      console.error("Concierge link error:", err);
      // Soft, high-architectural fallback
      const fallbackReply = `[物理介质感应离线] 在对「${currentThemeMaterial}」物质的重力解读中，电磁共鸣存在轻微迟滞。但正如泥室的陶土，未竟的沉默同样是时间最崇高的赠礼。`;
      setMessages(prev => [...prev, { role: "model" as const, text: fallbackReply }]);
    } finally {
      setLoading(false);
    }
  };

  // Pre-configured trigger triggers
  const handleScenarioTrigger = (scenario: "material" | "spacial" | "ritual") => {
    let msg = "";
    if (scenario === "material") {
      msg = `能解构一下品牌核心材质「${currentThemeMaterial}」在工匠手感与光线下的微观质地吗？`;
    } else if (scenario === "spacial") {
      msg = `如何用极简主义比例和留白规律，为这一系列器物做一次陈列空间设计？`;
    } else if (scenario === "ritual") {
      msg = `如果下单此作品，如何规划最具仪式感的购买与送达方案？`;
    }
    handleSendMessage(msg);
  };

  if (!enabled || !visible) return null;

  // Determine static layout positions
  const positionClasses = {
    "bottom-right": "bottom-6 right-6 md:right-8",
    "bottom-left": "bottom-6 left-6 md:left-8",
    "edge-right": "top-1/2 -translate-y-1/2 right-0 rounded-l-md"
  }[position];

  return (
    <>
      {/* Dynamic Floating Touch Trigger Box */}
      <div className={`fixed z-50 ${positionClasses}`}>
        <motion.button
          onClick={() => {
            triggerHaptic();
            setOpen(!open);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-12 h-12 rounded-full cursor-pointer flex items-center justify-center overflow-hidden group shadow-lg border backdrop-blur-md transition-all duration-1000"
          style={{ 
            backgroundColor: (brand.colors as any).accentHover || `${brand.colors.accent}d0`,
            color: "#FFFFFF",
            borderColor: `${brand.colors.text}1F`
          }}
        >
          {/* Breathing aura circle behind icon representing active cognition */}
          <div className="absolute inset-0 w-full h-full rounded-full animate-ping opacity-25 bg-white pointer-events-none" style={{ animationDuration: "3s" }} />
          
          {/* Subtle micro-noise texture */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:3px_3px]" />

          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="sparkle-icon"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex flex-col items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-[7.5px] tracking-[0.05em] scale-75 uppercase opacity-95 block font-mono">Concierge</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Main Elegant AI Concierge Dialogue Hub Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed md:right-8 bottom-20 md:bottom-24 w-[calc(100vw-2.5rem)] md:w-[400px] h-[550px] shadow-2xl rounded-2xl border flex flex-col overflow-hidden backdrop-blur-xl z-50 text-left font-sans"
            style={{ 
              backgroundColor: `${brand.colors.background}f5`, 
              color: brand.colors.text,
              borderColor: `${brand.colors.text}1F`
            }}
          >
            {/* Header: Pure restraint */}
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: `${brand.colors.text}10` }}>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full animate-pulse mr-0.5" style={{ backgroundColor: brand.colors.accent }} />
                <div className="text-left">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider">{brand.brandName} Ambient Concierge</h4>
                  <p className="text-[9px] opacity-40 font-mono tracking-wide uppercase">
                    Persona: {persona} / Tone: {tone}
                  </p>
                </div>
              </div>

              {/* Action config calibration button in header */}
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => {
                    triggerHaptic();
                    setShowConfig(!showConfig);
                  }}
                  className="p-1 px-2 rounded border border-zinc-200 hover:bg-zinc-100 flex items-center gap-1 text-[8px] font-mono tracking-wider cursor-pointer transition uppercase"
                  style={{ color: brand.colors.text, borderColor: `${brand.colors.text}1A` }}
                >
                  <Sliders className="w-2.5 h-2.5" />
                  <span>配置 DNA</span>
                </button>
                <button 
                  onClick={() => {
                    triggerHaptic();
                    setOpen(false);
                  }}
                  className="p-1 rounded hover:bg-zinc-100 cursor-pointer text-zinc-400 hover:text-zinc-650 transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Config Sandbox Calibration Layer */}
            {showConfig && (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="bg-zinc-50/95 border-b p-3 space-y-3 overflow-hidden text-[10px] font-mono"
                style={{ borderColor: `${brand.colors.text}1A`, backgroundColor: `${brand.colors.background}` }}
              >
                <div className="font-bold text-[8.5px] uppercase opacity-75 pb-1 border-b" style={{ borderColor: `${brand.colors.text}10` }}>
                  🤖 Brand Concierge Configuration DNA Parameters (智能体律法调试板)
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span className="text-[8px] opacity-60 uppercase block">💬 对话人格 Persona</span>
                    <select
                      value={persona}
                      onChange={(e) => { triggerHaptic(); setPersona(e.target.value as any); }}
                      className="w-full bg-white border p-1 rounded text-[10px]"
                      style={{ color: brand.colors.text, borderColor: `${brand.colors.text}1a` }}
                    >
                      <option value="archivist">Archivist (材质与断代编年史) </option>
                      <option value="curator">Curator (空间秩序策展人) </option>
                      <option value="personal-shopper">Personal Shopper ( bespoke 仪式定制) </option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[8px] opacity-60 uppercase block">✦ 语言修辞风格 Tone</span>
                    <select
                      value={tone}
                      onChange={(e) => { triggerHaptic(); setTone(e.target.value as any); }}
                      className="w-full bg-white border p-1 rounded text-[10px]"
                      style={{ color: brand.colors.text, borderColor: `${brand.colors.text}1a` }}
                    >
                      <option value="poetic">Poetic (静谧感官诗意)</option>
                      <option value="reverent">Reverent (神圣敬畏手作)</option>
                      <option value="minimalist">Minimalist (极其克制缄默)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="space-y-1">
                    <span className="text-[8px] opacity-60 uppercase block">📍 悬浮绝对位置 Position</span>
                    <div className="flex gap-1">
                      {["bottom-right", "bottom-left"].map((pos) => (
                        <button
                          key={pos}
                          onClick={() => { triggerHaptic(); setPosition(pos as any); }}
                          className={`flex-1 p-1 py-0.5 border text-[8.5px] rounded uppercase ${position === pos ? "bg-black text-white" : "bg-white"}`}
                          style={{ borderColor: `${brand.colors.text}1a` }}
                        >
                          {pos === "bottom-right" ? "Right" : "Left"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[8px] opacity-60 uppercase block">🧪 状态重置 Sequence</span>
                    <button
                      onClick={() => {
                        triggerHaptic();
                        setMessages([]);
                        setSuggestions(["品味粗陶的感官厚度", "定制新月送达仪式", "获取空间陈列建议"]);
                      }}
                      className="w-full py-1 text-red-500 hover:bg-neutral-100/50 border border-red-200 uppercase rounded text-[9px] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>高奢脑区重置 (Reset)</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Scrollable Chat Viewport Container */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 font-light text-xs leading-relaxed max-h-[380px]">
              {messages.length === 0 ? (
                <div className="py-8 space-y-4">
                  {/* Empty state brand welcome citation */}
                  <div className="space-y-2 border-l-2 pl-3 py-1 text-[11px]" style={{ borderColor: `${brand.colors.accent}40` }}>
                    <p className="opacity-80 italic italic-quote leading-relaxed">
                      「物既具有重力，阴翳亦有厚度。在沉默的工作坊里，材质不经雕琢的细微呼吸，便是一切语言的起点。」
                    </p>
                    <span className="block font-mono text-[9px] opacity-50 uppercase">— {brand.brandName} 策展备忘之页</span>
                  </div>

                  {/* Core functional scenario buttons to guide intent */}
                  <div className="space-y-2 text-left">
                    <span className="text-[9px] font-mono uppercase opacity-50 tracking-wider block">选择一种智慧叙事场景 (Scenario Trigger):</span>
                    <div className="space-y-1.5">
                      <button 
                        onClick={() => handleScenarioTrigger("material")}
                        className="w-full p-2.5 bg-zinc-100/30 hover:bg-zinc-100/70 border border-zinc-200/50 cursor-pointer rounded flex items-center gap-2 text-left transition hover:translate-x-1"
                        style={{ borderColor: `${brand.colors.text}10`, backgroundColor: `${brand.colors.background}cc` }}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                        <div>
                          <span className="font-mono text-[9.5px] font-bold block uppercase tracking-wide">① 材质叙事者 Material Storyteller</span>
                          <span className="text-[9px] opacity-60 block line-clamp-1">解构「{currentThemeMaterial}」原料拉伸与光影折射</span>
                        </div>
                      </button>

                      <button 
                        onClick={() => handleScenarioTrigger("spacial")}
                        className="w-full p-2.5 bg-zinc-100/30 hover:bg-zinc-100/70 border border-zinc-200/50 cursor-pointer rounded flex items-center gap-2 text-left transition hover:translate-x-1"
                        style={{ borderColor: `${brand.colors.text}10`, backgroundColor: `${brand.colors.background}cc` }}
                      >
                        <Compass className="w-3.5 h-3.5 text-indigo-400" />
                        <div>
                          <span className="font-mono text-[9.5px] font-bold block uppercase tracking-wide">② 空间策展人 Spacial Coordinates</span>
                          <span className="text-[9px] opacity-60 block line-clamp-1">定制极简留白、黑曜石与微型温差陈立绘图</span>
                        </div>
                      </button>

                      <button 
                        onClick={() => handleScenarioTrigger("ritual")}
                        className="w-full p-2.5 bg-zinc-100/30 hover:bg-zinc-100/70 border border-zinc-200/50 cursor-pointer rounded flex items-center gap-2 text-left transition hover:translate-x-1"
                        style={{ borderColor: `${brand.colors.text}10`, backgroundColor: `${brand.colors.background}cc` }}
                      >
                        <Award className="w-3.5 h-3.5 text-emerald-550" />
                        <div>
                          <span className="font-mono text-[9.5px] font-bold block uppercase tracking-wide">③ 购买仪式引导者 Ritualistic Order Guide</span>
                          <span className="text-[9px] opacity-60 block line-clamp-1">规划新月静默投递、陶器命名及重力信札打包</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[85%] p-3 rounded-lg flex flex-col ${
                        msg.role === "user" 
                          ? "bg-zinc-100/80 border text-neutral-800" 
                          : "border leading-relaxed"
                      }`}
                      style={{ 
                        backgroundColor: msg.role === "user" ? `${brand.colors.text}0d` : "transparent",
                        borderColor: `${brand.colors.text}15`
                      }}
                    >
                      <p className="text-[11.5px] font-light leading-relaxed tracking-wide">
                        {msg.text}
                      </p>
                      <span className="text-[7.5px] block opacity-30 mt-1 uppercase text-right tracking-widest font-mono">
                        {msg.role === "user" ? "Verified Human" : `${brand.brandName} Core`}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="p-3 bg-zinc-50 border rounded-lg flex items-center gap-2 font-mono text-[9.5px] opacity-60" style={{ borderColor: `${brand.colors.text}10` }}>
                    <Loader2 className="w-3 h-3 animate-spin text-zinc-400" />
                    <span>Cognitive stream formulating...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Conversation Interactive Suggestion Pills */}
            {suggestions.length > 0 && (
              <div className="px-4 py-2 border-t flex flex-wrap gap-1.5" style={{ borderColor: `${brand.colors.text}08` }}>
                {suggestions.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSendMessage(sug)}
                    disabled={loading}
                    className="p-1.5 px-2.5 bg-zinc-100/30 hover:bg-zinc-100 border border-zinc-200 rounded text-[9.5px] cursor-pointer inline-flex items-center gap-1 transition-all text-neutral-650 hover:text-black font-light leading-none"
                    style={{ borderColor: `${brand.colors.text}10`, backgroundColor: `${brand.colors.background}` }}
                  >
                    <Sparkles className="w-2.5 h-2.5 opacity-60" style={{ color: brand.colors.accent }} />
                    <span>{sug}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Bottom text Input Area */}
            <div className="p-3 border-t bg-white/20 select-none flex items-center gap-2" style={{ borderColor: `${brand.colors.text}10` }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                disabled={loading}
                placeholder="对AI管家发出意图指令（如询问材质、定制仪式）..."
                className="flex-1 bg-transparent text-xs p-1.5 outline-none font-sans font-light"
                style={{ color: brand.colors.text }}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !inputMessage.trim()}
                className="p-2 rounded cursor-pointer transition flex items-center justify-center disabled:opacity-45"
                style={{ 
                  backgroundColor: inputMessage.trim() ? brand.colors.accent : `${brand.colors.accent}40`,
                  color: "#FFFFFF" 
                }}
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
