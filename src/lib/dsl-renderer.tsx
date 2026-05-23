import React, { useState } from "react";
import { SingularityBrand, SingularityProduct } from "../types";
import { lookupMaterialConfig } from "./material-language-engine";
import { plannedSections } from "./luxury-layout-planner";
import { useMobileLuxury } from "./mobile-luxury-engine";
import AmbientAIConcierge from "../components/luxury-commerce/AmbientAIConcierge";
import B2BWholesalePortal from "../components/luxury-commerce/B2BWholesalePortal";
import { 
  ShoppingBag, Sparkles, Sliders, ShieldCheck, Heart, 
  ArrowRight, Info, Award, Compass, Layers, Check, X,
  ExternalLink, Eye, EyeOff, CheckCircle2, Moon, Sun, Hammer,
  Lock, FileText, User, Upload, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ==========================================
// 1. SILENT NAVBAR (静默高奢导航)
// ==========================================
interface SilentNavbarProps {
  brandName: string;
  luxuryTier: string;
  cartCount: number;
  currentTab: "HOME" | "PRODUCTS" | "PHILOSOPHY" | "B2B" | "CART";
  onTabChange: (tab: "HOME" | "PRODUCTS" | "PHILOSOPHY" | "B2B" | "CART") => void;
  brandColors: { background: string; text: string; accent: string; subtle: string };
  displayFont: string;
  onHaptic?: () => void;
}

export function SilentNavbar({
  brandName,
  luxuryTier,
  cartCount,
  currentTab,
  onTabChange,
  brandColors,
  displayFont,
  onHaptic
}: SilentNavbarProps) {
  return (
    <nav 
      className="sticky top-0 z-50 w-full px-6 py-4 border-b transition-all duration-300 backdrop-blur-md"
      style={{ 
        borderColor: `${brandColors.text}0D`,
        backgroundColor: `${brandColors.background}F0`
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo and Tier Info */}
        <div className="flex items-center gap-2">
          <span 
            className="text-lg uppercase tracking-[0.25em] font-light cursor-pointer touch-target-optimized"
            style={{ fontFamily: displayFont }}
            onClick={() => {
              onHaptic?.();
              onTabChange("HOME");
            }}
          >
            {brandName}
          </span>
          <span 
            className="text-[8px] font-mono px-2 py-0.5 border uppercase tracking-wider opacity-60 ml-2"
            style={{ borderColor: `${brandColors.text}2B` }}
          >
            {luxuryTier === "ultra-luxury" ? "ULTRA • 极奢" : luxuryTier === "niche-avantgarde" ? "AVANTGARDE • 先锋" : "PREMIUM • 奢华"}
          </span>
        </div>

        {/* Dynamic Navigation Links */}
        <div className="flex items-center gap-6 text-[9.5px] tracking-[0.2em] font-mono uppercase">
          {(["HOME", "PRODUCTS", "PHILOSOPHY", "B2B", "CART"] as const).map((tab) => {
            const isActive = currentTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  onHaptic?.();
                  onTabChange(tab);
                }}
                className="relative py-1 transition-all duration-300 cursor-pointer touch-target-optimized select-none outline-none"
                style={{ color: isActive ? brandColors.accent : brandColors.text, opacity: isActive ? 1 : 0.6 }}
              >
                <span>
                  {tab === "HOME" ? "空间 ATELIER" : 
                   tab === "PRODUCTS" ? "物语 MONOLITH" : 
                   tab === "PHILOSOPHY" ? "重构 PHILOSOPHY" : 
                   tab === "B2B" ? "贵宾批发 B2B PORTAL" :
                   `收纳 BAG (${cartCount})`}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px]"
                    style={{ backgroundColor: brandColors.accent }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// ==========================================
// 2. CINEMATIC HERO (电影级品牌宣言区)
// ==========================================
interface CinematicHeroProps {
  brand: SingularityBrand;
  onExplore: () => void;
  displayFont: string;
  onHaptic?: () => void;
}

export function CinematicHero({ brand, onExplore, displayFont, onHaptic }: CinematicHeroProps) {
  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Decorative Blueprint Line Matrix behind text */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="0" x2="10%" y2="100%" stroke={brand.colors.text} strokeWidth="0.5" strokeDasharray="1,5" />
        <line x1="90%" y1="0" x2="90%" y2="100%" stroke={brand.colors.text} strokeWidth="0.5" strokeDasharray="1,5" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke={brand.colors.text} strokeWidth="0.25" strokeDasharray="1,5" />
        <circle cx="50%" cy="50%" r="200" fill="none" stroke={brand.colors.accent} strokeWidth="0.5" strokeDasharray="2,8" />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 max-w-4xl relative z-10"
      >
        <span 
          className="text-[9px] uppercase tracking-[0.4em] block font-mono opacity-50 transition-all duration-700 hover:tracking-[0.5.em]"
          style={{ color: brand.colors.accent }}
        >
          {brand.brandUnderstanding?.customerProfile || "ATELIER DIRECTIVE ONE"}
        </span>

        <h1 
          className="text-5xl md:text-8xl font-light tracking-tight leading-[1.05]"
          style={{ fontFamily: displayFont }}
        >
          {brand.brandName}
        </h1>

        <p className="text-sm md:text-base font-extralight tracking-[0.1em] max-w-2xl mx-auto italic opacity-80 leading-relaxed">
          &ldquo;{brand.slogan}&rdquo;
        </p>

        <div className="pt-8 flex justify-center items-center gap-6">
          <button
            onClick={() => {
              onHaptic?.();
              onExplore();
            }}
            className="px-8 py-3.5 text-[9.5px] uppercase tracking-[0.25em] font-mono border transition-all duration-500 hover:invert touch-target-optimized"
            style={{ 
              borderColor: brand.colors.text, 
              color: brand.colors.text,
              borderRadius: brand.designTokens?.radius === "none" ? "0" : "2px"
            }}
          >
            Explore Monoliths →
          </button>
        </div>
      </motion.div>

      {/* Breathing indicator at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 font-mono text-[8px] tracking-[0.3em] uppercase">
        <span className="animate-pulse">SCROLL TO COMPREHEND</span>
        <div className="w-[1px] h-8 bg-current animate-bounce" />
      </div>
    </div>
  );
}

// ==========================================
// 3. LUXURY BRAND MANIFESTO (奢侈品牌宣言区)
// ==========================================
interface LuxuryManifestoProps {
  title: string;
  body: string;
  designerVibe: string;
  brandColors: any;
  displayFont: string;
}

export function LuxuryManifesto({ title, body, designerVibe, brandColors, displayFont }: LuxuryManifestoProps) {
  return (
    <div 
      className="py-24 border-t border-b overflow-hidden relative"
      style={{ borderColor: `${brandColors.text}0D`, backgroundColor: `${brandColors.text}02` }}
    >
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="space-y-3 md:col-span-1">
          <span 
            className="text-[9px] uppercase tracking-[0.3em] font-mono block"
            style={{ color: brandColors.accent }}
          >
            THEORETICAL CODE
          </span>
          <h2 
            className="text-3xl font-light tracking-tight leading-none"
            style={{ fontFamily: displayFont }}
          >
            {title}
          </h2>
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pt-2">
            VIBE: {designerVibe}
          </div>
        </div>

        <div className="md:col-span-2 space-y-6 text-xs md:text-sm font-light leading-relaxed text-justify opacity-90 max-w-[65ch]">
          <p className="whitespace-pre-line">
            {body}
          </p>
          <div className="pt-4 border-l pl-4 font-mono italic text-[11px] opacity-70" style={{ borderColor: brandColors.accent }}>
            &ldquo;We design to isolate, align, and refine. Every finished item carries the profound weight of natural absolute silences.&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. MATERIAL SHOWCASE (材质故事展示区)
// ==========================================
interface MaterialShowcaseProps {
  materials: string[];
  activeMaterial: string;
  brandColors: any;
}

export function MaterialShowcase({ materials, activeMaterial, brandColors }: MaterialShowcaseProps) {
  const materialsList = materials.length > 0 ? materials : ["obsidian black", "raw limestone", "smocked glass", "undressed brass", "raw cotton linen"];
  const materialDetails: Record<string, string> = {
    "brushed-brass": "Polished with soft precision to achieve a muted satin golden reflection that resists standard environmental oils.",
    "raw-ceramic": "Hand-molded coarse stoneware, baked under organic firewood kiln systems yielding uneven earthly textures.",
    "smoked-glass": "Subtly darkened crystal structures crafted to distort incoming light rays into comforting dark shadows.",
    "obsidian": "Volcanic quartz glass sheared into razor sharp geometric blocks, conveying infinite depth and density.",
    "raw-linen": "Coarsely woven undyed plant fibers preserved with real fabric husks, radiating natural off-white tactile feedback.",
    "matte-black": "Extreme zero-gloss powder coating designed to fully absorb stray light particles, maximizing absolute visual calm."
  };

  const currentDetails = materialDetails[activeMaterial] || "Strict biological and geological raw materials synthesized using rigorous ancient crafting protocols.";

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto w-full">
      <div 
        className="p-8 md:p-12 border rounded relative overflow-hidden"
        style={{ 
          borderColor: `${brandColors.text}1F`,
          backgroundColor: `${brandColors.text}03`
        }}
      >
        {/* Subtle decorative background metal wireframe graph */}
        <div className="absolute top-0 right-0 w-64 h-64 origin-top-right scale-75 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <polygon points="50,10 90,50 50,90 10,50" fill="none" stroke={brandColors.text} strokeWidth="0.5" />
            <line x1="10" y1="50" x2="90" y2="50" stroke={brandColors.text} strokeWidth="0.25" />
            <line x1="50" y1="10" x2="50" y2="90" stroke={brandColors.text} strokeWidth="0.25" />
          </svg>
        </div>

        <span className="text-[10px] uppercase tracking-[0.25em] opacity-50 block font-mono mb-6">
          MATERIAL CHRONICLES (高奢材质语汇)
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          <div className="space-y-4 md:col-span-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest block">Core Medium Focus</span>
            <p className="text-xs font-light opacity-85 leading-relaxed">
              {currentDetails}
            </p>
            <div className="text-[10px] font-mono text-zinc-500">
              Active System Material: <span className="text-amber-500">{activeMaterial.toUpperCase()}</span>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-3 items-center">
            {materialsList.map((mat) => (
              <span 
                key={mat}
                className="px-4 py-2 text-xs font-mono uppercase bg-white/5 border rounded shadow-sm hover:bg-white/10 hover:border-zinc-400 transition-all cursor-crosshair flex items-center gap-2"
                style={{ borderColor: `${brandColors.text}25` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                {mat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. MUSEUM PRODUCT CARD (博物馆级产品卡片)
// ==========================================
interface MuseumProductCardProps {
  product: SingularityProduct;
  index: number;
  brandColors: any;
  onAddToCart: () => void;
  key?: React.Key;
  onHaptic?: () => void;
}

export function MuseumProductCard({ product, index, brandColors, onAddToCart, onHaptic }: MuseumProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="flex flex-col justify-between h-[400px] p-5 border transition-all hover:-translate-y-1 relative group bg-white/5 backdrop-blur-xs"
      style={{
        borderColor: `${brandColors.text}12`,
        borderRadius: "0px"
      }}
    >
      {/* Product Silhouette Blueprint */}
      <div 
        className="h-44 rounded relative flex flex-col justify-between p-3 overflow-hidden bg-zinc-950/5 border"
        style={{ borderColor: `${brandColors.text}08` }}
      >
        <div className="flex justify-between text-[8px] font-mono opacity-40 z-10">
          <span>CATALOG-{100 + index}</span>
          <span>{product.silhouette || "MONOLITHIC SHAPE"}</span>
        </div>

        {product.image && (
          <div className="absolute inset-0 z-0 opacity-45 mix-blend-multiply flex items-center justify-center p-3">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain saturate-[0.15] group-hover:saturate-100 transition-all duration-700 pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Minimal Drafting Lines overlay to avoid catalog noise */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" viewBox="0 0 100 80">
          <line x1="50" y1="0" x2="50" y2="80" stroke={brandColors.accent} strokeWidth="0.3" strokeDasharray="1,3" />
          <circle cx="50" cy="40" r="22" fill="none" stroke={brandColors.text} strokeWidth="0.3" strokeDasharray="1,4" />
        </svg>

        <span className="text-[8px] font-mono text-right opacity-60 uppercase tracking-widest block z-10 mt-auto">
          {product.material.split(" ")[0]}
        </span>
      </div>

      {/* Description & Cart Action */}
      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex justify-between items-baseline gap-2">
            <h4 className="font-medium text-xs tracking-tight text-zinc-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h4>
            <span className="text-xs font-mono font-bold text-zinc-900 shrink-0">
               {product.price}
            </span>
          </div>
          <p className="text-[10px] opacity-70 leading-relaxed font-light line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="space-y-3 pt-3 border-t border-dashed" style={{ borderColor: `${brandColors.text}1F` }}>
          <div className="text-[8.5px] font-mono opacity-50 leading-none">
            MEDIUM: {product.material}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onHaptic?.();
              onAddToCart();
            }}
            className="w-full py-2.5 text-[8.5px] tracking-[0.2em] font-mono font-bold uppercase text-white transition hover:opacity-95 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer touch-target-optimized"
            style={{ backgroundColor: brandColors.accent }}
          >
            <ShoppingBag className="w-3 h-3" />
            <span>ACQUIRE MONOLITH (定制购买)</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// 6. EDITORIAL PRODUCT GRID (编辑级产品网格)
// ==========================================
interface EditorialGridProps {
  products: SingularityProduct[];
  brandColors: any;
  onAddToCart: (product: SingularityProduct) => void;
  onHaptic?: () => void;
}

export function EditorialGrid({ products, brandColors, onAddToCart, onHaptic }: EditorialGridProps) {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto w-full space-y-10">
      <div className="flex justify-between items-baseline border-b pb-3" style={{ borderColor: `${brandColors.text}15` }}>
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-60">
          CURATED MONOLITH SERIAL (物语单品编目)
        </span>
        <span className="text-[9px] opacity-40 font-mono">
          Layout pacing: Zero-shadow Asymmetric Gaps
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((prod, index) => (
          <MuseumProductCard 
            key={index} 
            product={prod} 
            index={index} 
            brandColors={brandColors} 
            onAddToCart={() => onAddToCart(prod)} 
            onHaptic={onHaptic}
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 7. SPATIAL GALLERY (空间感画廊)
// ==========================================
interface SpatialGalleryProps {
  spatialAtmosphere: string;
  silenceRatio: number;
  brandColors: any;
}

export function SpatialGallery({ spatialAtmosphere, silenceRatio, brandColors }: SpatialGalleryProps) {
  return (
    <div className="py-24 text-center space-y-4 max-w-3xl mx-auto px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-current opacity-25" />
      
      <Compass className="w-7 h-7 mx-auto opacity-35 text-indigo-400 animate-spin" style={{ animationDuration: "14s" }} />
      <span className="text-[9.5px] uppercase tracking-[0.35em] opacity-50 block font-mono">
        SPATIAL COMPOSE RHYTHM (重力与光栅)
      </span>
      <p className="text-xs md:text-sm font-mono italic opacity-75 max-w-lg mx-auto leading-relaxed">
        &ldquo;{spatialAtmosphere}&rdquo;
      </p>
      
      <div className="pt-4 flex flex-col items-center gap-1.5">
        <span className="text-[9.5px] text-indigo-400 font-bold uppercase tracking-widest font-mono">
          Validated Whitespace Density: {(silenceRatio * 100).toFixed(0)}% Score (符合极高白噪比)
        </span>
        <div className="h-[2px] w-24 bg-indigo-500/20 rounded">
          <div className="h-full bg-indigo-400 rounded transition-all duration-1000" style={{ width: `${silenceRatio * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. FLOATING PRODUCT SCENE (空间建模仿真仪)
// ==========================================
interface FloatingProductSceneProps {
  brandColors: any;
  designerStyle: string;
}

export function FloatingProductScene({ brandColors, designerStyle }: FloatingProductSceneProps) {
  const [activeAxis, setActiveAxis] = useState<"X" | "Y" | "Z">("Z");
  
  return (
    <div className="py-16 px-6 max-w-5xl mx-auto w-full">
      <div 
        className="p-8 border rounded relative flex flex-col md:flex-row items-center justify-between gap-8 bg-zinc-950/5"
        style={{ borderColor: `${brandColors.text}12` }}
      >
        <div className="space-y-4 max-w-xs md:max-w-sm">
          <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 block font-mono">
            AXIS CAD REPRESENTATION (物性形态模拟器)
          </span>
          <h3 className="text-sm font-semibold uppercase tracking-wider font-mono">
            Spatial Tension Coordinates ({designerStyle})
          </h3>
          <p className="text-[10px] font-light leading-relaxed opacity-75">
            Interact with the abstract focal alignments. The wireframe scales and rotates on live sensory feedback to ensure structural integrity and correct dimensional margins.
          </p>

          <div className="flex gap-2">
            {(["X", "Y", "Z"] as const).map((axis) => (
              <button
                key={axis}
                onClick={() => setActiveAxis(axis)}
                className={`px-3 py-1 font-mono text-[9px] border hover:bg-neutral-900 hover:text-white transition cursor-pointer ${activeAxis === axis ? "border-indigo-400 bg-indigo-400/10 text-indigo-400 font-bold" : "border-zinc-300"}`}
              >
                AX-{axis} GRID
              </button>
            ))}
          </div>
        </div>

        {/* Visual interactive CAD matrix */}
        <div className="w-56 h-56 rounded border flex items-center justify-center relative bg-white/70 overflow-hidden shadow-sm" style={{ borderColor: `${brandColors.text}1F` }}>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
          
          <motion.div 
            animate={{ 
              rotateX: activeAxis === "X" ? [0, 360] : 0,
              rotateY: activeAxis === "Y" ? [0, 360] : 0,
              rotateZ: activeAxis === "Z" ? [0, 360] : 0
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 relative flex items-center justify-center transform preserve-3d"
          >
            {/* Interactive lines simulation */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <rect x="20" y="20" width="60" height="60" fill="none" stroke={brandColors.accent} strokeWidth="0.5" strokeDasharray="1,1" />
              <circle cx="50" cy="50" r="28" fill="none" stroke={brandColors.text} strokeWidth="0.5" />
              <circle cx="50" cy="50" r="3" fill="currentColor" className="text-amber-500 animate-ping" />
              <polygon points="50,15 80,75 20,75" fill="none" stroke={brandColors.accent} strokeWidth="0.25" opacity="0.6" />
            </svg>
          </motion.div>

          <span className="absolute bottom-2 right-2 font-mono text-[8px] opacity-40">
            DENSITY CORRECTION: SECURE
          </span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. SILENT CART & RITUAL CHECKOUT (静默结算)
// ==========================================
interface SilentCartCheckoutProps {
  cart: SingularityProduct[];
  brandColors: any;
  onClearCart: () => void;
  displayFont: string;
  onHaptic?: () => void;
}

export function SilentCartCheckout({ cart, brandColors, onClearCart, displayFont, onHaptic }: SilentCartCheckoutProps) {
  const [step, setStep] = useState<"intention" | "selection" | "commitment" | "completion">("intention");
  const [address, setAddress] = useState("");
  const [customizer, setCustomizer] = useState("Original");

  if (cart.length === 0) {
    return (
      <div className="py-24 max-w-lg mx-auto text-center px-6 space-y-4">
        <X className="w-8 h-8 mx-auto opacity-30 text-amber-500" />
        <span className="font-mono text-[10px] uppercase opacity-50 block">Your shopping bag is clean and quiet.</span>
        <p className="text-xs font-light opacity-80 max-w-xs mx-auto">
          No items have been assigned yet. Explore the object collections to add custom monographs.
        </p>
      </div>
    );
  }

  const handleNextStep = () => {
    onHaptic?.();
    if (step === "intention") setStep("selection");
    else if (step === "selection") setStep("commitment");
    else if (step === "commitment") setStep("completion");
  };

  return (
    <div className="py-16 max-w-4xl mx-auto px-6 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-50 block">RITUAL TRANSACTION ENGINE (仪式自洁收银坊)</span>
        <h2 className="text-3xl font-light" style={{ fontFamily: displayFont }}>Modular Checkout sequence</h2>
      </div>

      {/* Luxury Progress indicator */}
      <div className="flex md:max-w-2xl mx-auto justify-between items-center relative gap-2 pt-4">
        <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-zinc-300 -translate-y-1/2 z-0" />
        
        {(["intention", "selection", "commitment", "completion"] as const).map((s, idx) => {
          const isDone = s === step || (step === "selection" && idx < 1) || (step === "commitment" && idx < 2) || (step === "completion");
          const isCurrent = s === step;
          return (
            <div key={s} className="relative z-10 flex flex-col items-center gap-1.5 bg-neutral-50 px-3">
              <div 
                className={`w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[9px] transition-all ${isCurrent ? "border-indigo-500 bg-indigo-500 text-white font-bold animate-pulse" : isDone ? "border-amber-400 bg-amber-400 text-neutral-900" : "border-zinc-300 bg-stone-100"}`}
              >
                {isDone ? "✓" : idx + 1}
              </div>
              <span className={`text-[8.5px] uppercase tracking-wider font-mono ${isCurrent ? "font-bold text-indigo-500" : "opacity-50"}`}>
                {s === "intention" ? "意向 Intent" : 
                 s === "selection" ? "选材 Select" : 
                 s === "commitment" ? "确约 Commit" : 
                 "造册 Done"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-4">
        {/* Step contents */}
        <div className="md:col-span-2 p-6 rounded border bg-white/40 space-y-5" style={{ borderColor: `${brandColors.text}1C` }}>
          <AnimatePresence mode="wait">
            {step === "intention" && (
              <motion.div 
                key="intent" 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="flex gap-2 items-center text-xs font-mono font-bold uppercase tracking-wider text-indigo-500">
                  <ShieldCheck className="w-4 h-4" /> STEP 1: VERIFIED STATEMENT OF INTENT
                </div>
                <p className="text-xs font-light leading-relaxed opacity-85">
                  We require conscious intent. Our custom items represent years of volcanic cooling and material maturation. Confirm you have studied the visual silences of this brand blueprint.
                </p>
                <div className="border-l pl-3 italic text-[11px] opacity-60">
                  &ldquo;I acknowledge that my chosen objects are individual works, not standard factory models.&rdquo;
                </div>
              </motion.div>
            )}

            {step === "selection" && (
              <motion.div 
                key="select" 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="flex gap-2 items-center text-xs font-mono font-bold uppercase tracking-wider text-indigo-500">
                  <Sliders className="w-4 h-4" /> STEP 2: FINE ELEMENT CUSTOMIZER
                </div>
                <p className="text-xs font-light leading-relaxed opacity-85">
                  Select the target finish variant for the chosen inventory. These coatings react differently to local UV indices:
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[9px]">
                  {["Original Flat Matte", "Charcoal Cast Iron", "Organic Sand Glaze", "Oyster Shell Dust"].map((variant) => (
                    <button
                      key={variant}
                      onClick={() => {
                        onHaptic?.();
                        setCustomizer(variant);
                      }}
                      className={`p-2.5 border text-left transition ${customizer === variant ? "border-amber-400 bg-amber-400/5 font-bold" : "border-zinc-200"} touch-target-optimized`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "commitment" && (
              <motion.div 
                key="commit" 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="flex gap-2 items-center text-xs font-mono font-bold uppercase tracking-wider text-indigo-500">
                  <Award className="w-4 h-4" /> STEP 3: COUTURE SHIPPING ATELIER
                </div>
                <p className="text-xs font-light leading-relaxed opacity-85">
                  Enter your physical shelter coordinates where the finished item will sit. Our carriers travel inside humidity-locked cases:
                </p>
                <input
                  type="text"
                  placeholder="Atelier address, City, Shelter coordinates..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 text-xs border rounded font-mono focus:outline-indigo-500/20 bg-white shadow-inner"
                  style={{ borderColor: `${brandColors.text}1F` }}
                />
              </motion.div>
            )}

            {step === "completion" && (
              <motion.div 
                key="done" 
                initial={{ opacity: 0, scale: 0.98 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="text-center py-6 space-y-4"
              >
                <div className="w-12 h-12 rounded-full border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-500 shadow-sm animate-bounce">
                  ✓
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
                  COUTURE RITUAL COMPLETED SUCCESSFULLY (制造工坊立书)
                </div>
                <p className="text-[10.5px] font-light leading-relaxed opacity-85 max-w-sm mx-auto">
                  Your intention has been logged under custom index block. The crafting fire will be ignited over the raw materials in sequence.
                </p>
                <div className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-widest pt-2">
                  SHIP COORD: {address || "NOT SPECIFIED"} | COAT STYLE: {customizer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step !== "completion" && (
            <div className="pt-4 border-t flex justify-between" style={{ borderColor: `${brandColors.text}10` }}>
              <button
                onClick={() => {
                  onHaptic?.();
                  onClearCart();
                }}
                className="text-[9px] text-red-500 uppercase tracking-widest font-mono hover:underline touch-target-optimized"
              >
                Flush Bag
              </button>
              <button
                onClick={handleNextStep}
                disabled={step === "commitment" && !address.trim()}
                className="px-5 py-2 text-[9px] uppercase tracking-[0.2em] font-mono font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-40 transition cursor-pointer touch-target-optimized"
              >
                Advance Sequence →
              </button>
            </div>
          )}
        </div>

        {/* Selected Monographs List */}
        <div className="space-y-4">
          <span className="text-[9px] uppercase tracking-widest font-mono opacity-55 block">Selected items:</span>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {cart.map((item, index) => (
              <div 
                key={index}
                className="p-3 border rounded text-xs leading-normal flex justify-between items-center bg-zinc-100/50"
                style={{ borderColor: `${brandColors.text}1F` }}
              >
                <div>
                  <h5 className="font-semibold tracking-tight">{item.name}</h5>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">{item.price}</span>
                </div>
                <span className="text-[8px] font-mono px-2 py-0.5 border opacity-60">
                  MONO
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-zinc-100 rounded border border-dashed text-xs space-y-2">
            <div className="flex justify-between font-mono text-[10px] uppercase text-zinc-500">
              <span>ITEMS:</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between font-bold text-xs uppercase pt-1 border-t border-dashed border-zinc-300">
              <span>ACCUMULATED VALUE:</span>
              <span className="text-indigo-500">CURATED RESERVATION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10. AMBIENT FOOTER (页脚与评分)
// ==========================================
interface AmbientFooterProps {
  brandName: string;
  scores: any;
  brandColors: any;
}

export function AmbientFooter({ brandName, scores, brandColors }: AmbientFooterProps) {
  return (
    <footer 
      className="border-t py-16 px-6 mt-16 max-w-7xl mx-auto w-full z-10 text-[9px] font-mono uppercase tracking-[0.25em] opacity-60 space-y-10"
      style={{ borderColor: `${brandColors.text}1A` }}
    >
      {/* Absolute metrics dashboard displaying compiled results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-dashed" style={{ borderColor: `${brandColors.text}12` }}>
        <div className="space-y-1">
          <span className="opacity-45 block">Luxury Quotient</span>
          <span className="text-xs font-bold text-zinc-800">{scores?.luxuryFeeling || 95}%</span>
        </div>
        <div className="space-y-1">
          <span className="opacity-45 block">Whitespace Score</span>
          <span className="text-xs font-bold text-zinc-800">{scores?.whitespaceScore || 88}%</span>
        </div>
        <div className="space-y-1">
          <span className="opacity-45 block">Visual Noise Cap</span>
          <span className="text-xs font-bold text-emerald-500">{(scores?.cognitiveNoise || 12)}% (SECURE)</span>
        </div>
        <div className="space-y-1">
          <span className="opacity-45 block">Brand Integrity</span>
          <span className="text-xs font-bold text-zinc-800">{scores?.brandConsistency || 92}%</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
        <span>{brandName} • CHRONO CORE DESIGNER OS</span>
        <div className="flex flex-wrap justify-center gap-6">
          <span className="hover:text-indigo-500 cursor-pointer transition">PARIS ATELIER</span>
          <span className="hover:text-amber-500 cursor-pointer transition">MILAN ATELIER</span>
          <span className="hover:text-indigo-500 cursor-pointer transition">TOKYO SATELLITE</span>
          <span>SHANGHAI ROOM</span>
        </div>
        <span>EST. 2026. ALL RIGHTS RESERVED. IN SILENCE WE ALIGN.</span>
      </div>
    </footer>
  );
}

// ==========================================
// 9.5 B2B WHOLESALE PORTAL & EXCLUSIVE ARCHIVE (高奢服装/皮包批发专项组件 - FALLBACK DEPRECATED)
// ==========================================
interface OldB2BWholesalePortalProps {
  brand: SingularityBrand;
  brandColors: any;
  displayFont: string;
  onAddToCart: (product: SingularityProduct) => void;
  onHaptic?: () => void;
}

function OldB2BWholesalePortal({
  brand,
  brandColors,
  displayFont,
  onAddToCart,
  onHaptic
}: OldB2BWholesalePortalProps) {
  // Authentication & Tier status states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authTier, setAuthTier] = useState<"public" | "registered" | "vip">("public");
  const [buyerName, setBuyerName] = useState("");
  const [vatCode, setVatCode] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Fabric selection filters
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);

  // Wholesale Archive selections & comparisons
  const [selectedSkus, setSelectedSkus] = useState<Record<string, boolean>>({});
  const [compareList, setCompareList] = useState<SingularityProduct[]>([]);

  // Bulk Inquiry Form values
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [dyeColors, setDyeColors] = useState<Record<string, string>>({});
  const [customRemarks, setCustomRemarks] = useState("");
  const [techPackFile, setTechPackFile] = useState<string | null>(null);
  const [isInquiring, setIsInquiring] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Simulated uploader state
  const [isDragOver, setIsDragOver] = useState(false);

  // Default Fabric Definitions
  const FABRIC_LIBRARY = [
    {
      id: "cashmere",
      name: "特级内蒙古超细山羊绒 (S-Grade Baby Cashmere)",
      purity: "99.8% Certified Purity",
      diameter: "14.2 µm (Micron Scale)",
      origin: "Alashan Plateau, Inner Mongolia",
      description: "Harvested through gentle manual combing under early spring solar shifts, generating unmatched thermal lock buffers and extreme weight-neutral comfort.",
      colorHex: "#FAF5EE"
    },
    {
      id: "boxcalf",
      name: "托斯卡纳双重油蜡马鞍皮 (Tuscany Full-Grain Box-Calf)",
      purity: "First-Tier Full Grain Leather",
      diameter: "1.2 - 1.4 mm Calibrated Thickness",
      origin: "Santa Croce sull'Arno, Italy",
      description: "Saturated in pure cold olive organic wax oils for a unique self-healing structure that matures into a deep walnut golden patina upon physical friction.",
      colorHex: "#8B5A2B"
    },
    {
      id: "mulberrysilk",
      name: "太湖流域重磅桑蚕丝 (Mulberry Silk Satin-Twill)",
      purity: "Grade 6A Mulberry Silk",
      diameter: "42 Momme Heavy Density",
      origin: "Taihu Basin, Suzhou, China",
      description: "Spun with tight 6-ply twists to create a highly structured, pearlescent luster drape with heavy linear fiber tension suitable for custom architectural lining.",
      colorHex: "#FFFDF6"
    }
  ];

  // Simulated 200 SKU Archive Expanders (clones standard brand products to show massive wholesale SKU catalog)
  const wholesaleProducts = React.useMemo(() => {
    const originalProds = brand.products.length > 0 ? brand.products : [
      { name: "Premium Cashmere Coat", price: "$680 B2B", description: "Elite level drapes coat", material: "Mongolian Cashmere", silhouette: "Relaxed Cocoon", image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80" }
    ];

    // Generate simulated high density SKU list (with unique references and parameters block)
    const expanded: SingularityProduct[] = [];
    const sizeKeys = ["S", "M", "L", "XL"];
    const weightTiers = ["Light 12gg", "Medium 7gg", "Heavy 3gg"];
    
    for (let i = 0; i < 9; i++) {
      const orig = originalProds[i % originalProds.length];
      const isBag = orig.name.toLowerCase().includes("bag") || orig.name.toLowerCase().includes("pochette") || orig.name.toLowerCase().includes("tote") || i % 3 === 1;
      
      const matType = isBag ? "Box-Calf Saddle Leather" : "Mongolian Baby Cashmere";
      const silhouetteType = isBag ? "Structured Trapezoidal Envelope" : "Semi-Slit Architectural Raglan";
      
      expanded.push({
        ...orig,
        id: `sku-${i}`,
        name: `${orig.name.split(" (")[0]} - Lot-${i+101}`,
        price: i % 2 === 0 ? `$${parseInt(orig.price.replace(/[^0-9]/g, "")) || 450} B2B` : `$${(parseInt(orig.price.replace(/[^0-9]/g, "")) || 450) + 50} B2B`,
        description: `${orig.description} Checked and certified under index code LP-Z-${124 + i}.`,
        material: i % 3 === 0 ? "Premium Inner Mongolian Cashmere" : i % 3 === 1 ? "Italian Box-Calf Saddle Leather" : "Heavyweight Silk Twill Thread",
        silhouette: `${silhouetteType} (${weightTiers[i % 3]})`
      });
    }

    // Filter by fabric click
    if (selectedFabric) {
      if (selectedFabric === "cashmere") {
        return expanded.filter(p => p.material.toLowerCase().includes("cashmere") || p.material.toLowerCase().includes("羊绒"));
      }
      if (selectedFabric === "boxcalf") {
        return expanded.filter(p => p.material.toLowerCase().includes("calf") || p.material.toLowerCase().includes("leather") || p.material.toLowerCase().includes("皮"));
      }
      if (selectedFabric === "mulberrysilk") {
        return expanded.filter(p => p.material.toLowerCase().includes("silk") || p.material.toLowerCase().includes("丝"));
      }
    }

    return expanded;
  }, [brand.products, selectedFabric]);

  // Login handler
  const handleAuthenticate = (tier: "registered" | "vip") => {
    onHaptic?.();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsAuthenticated(true);
      setAuthTier(tier);
      setBuyerName(tier === "vip" ? "SENSITIVE PRESTIGE AG - London Bureau" : "REGIONAL BOUTIQUE APPAREL INC");
      setVatCode(tier === "vip" ? "GB-VAT-9032488" : "EU-VAT-5511204");
    }, 1200);
  };

  const handleToggleSkuSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onHaptic?.();
    setSelectedSkus(prev => {
      const updated = { ...prev };
      if (updated[id]) {
        delete updated[id];
      } else {
        updated[id] = true;
      }
      return updated;
    });
  };

  const handleAddToCompare = (product: SingularityProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onHaptic?.();
    setCompareList(prev => {
      if (prev.find(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert("Maximum 3 structural items compared side-by-side.");
        return prev;
      }
      return [...prev, product];
    });
  };

  const selectedItemsCount = Object.keys(selectedSkus).length;

  // Bulk inquiry submitter
  const handleSubmitInquiry = () => {
    onHaptic?.();
    setIsInquiring(true);
    setTimeout(() => {
      setIsInquiring(false);
      setInquirySuccess(true);
      setSelectedSkus({});
      setTimeout(() => setInquirySuccess(false), 5000);
    }, 1800);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-6 space-y-16">
      
      {/* SECTION 1: WHOLSALER GATE (VIP认证系统) */}
      <div 
        className="p-8 border rounded-lg relative overflow-hidden transition-all duration-700"
        style={{ 
          borderColor: `${brandColors.text}1F`, 
          backgroundColor: isAuthenticated ? `${brandColors.text}03` : `${brandColors.background}` 
        }}
      >
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${brandColors.text} 1px, transparent 1px)`,
            backgroundSize: "24px 24px"
          }}
        ></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-indigo-400">
                SECURITY REGISTRY PORTAL (高奢B端验证中枢)
              </span>
            </div>
            
            <h2 className="text-2.5xl font-light tracking-tight" style={{ fontFamily: displayFont }}>
              {isAuthenticated ? "Authenticated Wholesaler Session Active" : "Private Wholesaler & Buyer Verification"}
            </h2>
            
            <p className="text-xs font-light leading-relaxed opacity-80">
              {isAuthenticated 
                ? `Welcome back, ${buyerName}. Your exclusive client-tiered pricing, bulk MOQ parameters, and material library references are fully activated.`
                : "This gateway protects proprietary materials formulas and wholesales price structures. Access is strictly granted to verified regional boutiques, premium retail curations, and showroom buyers."}
            </p>
          </div>

          {!isAuthenticated && !isAuthenticating && (
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => handleAuthenticate("registered")}
                className="px-5 py-3 text-[9.5px] uppercase tracking-widest font-mono font-bold border transition bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
              >
                Simulate Buyer Access
              </button>
              <button
                onClick={() => handleAuthenticate("vip")}
                className="px-5 py-3 text-[9.5px] uppercase tracking-widest font-mono font-bold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
              >
                Validate Golden VIP Access
              </button>
            </div>
          )}

          {isAuthenticating && (
            <div className="flex items-center gap-3 font-mono text-xs text-indigo-400 animate-pulse">
              <RefreshCw className="w-4.5 h-4.5 animate-spin" />
              <span>Verifying Vatican Registry and VAT credentials...</span>
            </div>
          )}

          {isAuthenticated && (
            <div className="flex items-center gap-3 bg-white/40 border p-3 rounded font-mono text-[10px] uppercase" style={{ borderColor: `${brandColors.text}1C` }}>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-500 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>TIER: {authTier.toUpperCase() === "VIP" ? "VIP CIRCLE PARTNER (特级合伙人)" : "REGISTERED BUYER (正式注册买手)"}</span>
                </div>
                <div className="opacity-70">REG NAME: {buyerName}</div>
                <div className="opacity-70">TAX VAT ID: {vatCode}</div>
              </div>
              <button 
                onClick={() => {
                  onHaptic?.();
                  setIsAuthenticated(false);
                  setCompareList([]);
                  setSelectedSkus({});
                }} 
                className="ml-5 text-[9px] text-red-500 hover:underline cursor-pointer"
              >
                Exit Gate
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE FABRIC / MATERIAL LIBRARY (白名单：面料图书馆) */}
      <div className="space-y-6">
        <div className="flex justify-between items-baseline border-b pb-3" style={{ borderColor: `${brandColors.text}1C` }}>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-70">
              FABRIC & TEXTURE LIBRARY (面料与皮质物性图书馆)
            </span>
          </div>
          <span className="text-[9px] opacity-40 font-mono">
            Focus: Direct physical fibers and tensile integrity specs
          </span>
        </div>

        <p className="text-xs font-light leading-relaxed max-w-3xl opacity-80">
          Click on a premium raw fabric block below to filter our Wholesale Archive. Our cashmere is sourced from the Alashan Plateau morning shear, and all leather hides are vegetable tanned under Tuscan cedar barrels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FABRIC_LIBRARY.map((fabric) => {
            const isActive = selectedFabric === fabric.id;
            return (
              <div
                key={fabric.id}
                onClick={() => {
                  onHaptic?.();
                  setSelectedFabric(isActive ? null : fabric.id);
                }}
                className={`p-6 border rounded-lg cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isActive ? "ring-1 ring-indigo-500 border-indigo-500" : "hover:border-zinc-400"
                }`}
                style={{
                  backgroundColor: isActive ? `${brandColors.text}06` : `${brandColors.text}02`,
                  borderColor: isActive ? "transparent" : `${brandColors.text}12`
                }}
              >
                {/* Simulated physical fabric swatch block */}
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-mono opacity-50 block">Medium Spec No-{fabric.id.toUpperCase()}</span>
                    <h3 className="font-semibold text-xs tracking-tight">{fabric.name}</h3>
                  </div>
                  {/* Swatch sphere block */}
                  <div 
                    className="w-8 h-8 rounded-full border shadow-inner flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: fabric.colorHex, borderColor: `${brandColors.text}1C` }}
                  >
                    <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:4px_4px]" />
                  </div>
                </div>

                <div className="space-y-3.5">
                  <p className="text-[10.5px] font-light leading-relaxed opacity-75">{fabric.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-dashed text-[9.5px] font-mono" style={{ borderColor: `${brandColors.text}20` }}>
                    <div>
                      <span className="opacity-45 block uppercase">Composition Price Tier:</span>
                      <span className="font-bold">{fabric.purity}</span>
                    </div>
                    <div>
                      <span className="opacity-45 block uppercase">Weave Metric:</span>
                      <span className="font-bold">{fabric.diameter}</span>
                    </div>
                  </div>
                </div>

                {isActive && (
                  <div className="absolute top-2 right-2 text-[8px] font-mono text-indigo-500 font-bold uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded">
                    Active Swatch Filter
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: WHOLESALE ARCHIVE GRID (白名单：批发型产品网格) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 border-b pb-3" style={{ borderColor: `${brandColors.text}1C` }}>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-70">
              WHOLESALE EXPANDED ARCHIVE ({wholesaleProducts.length} ACTIVE LOT SKUS DISPLAYED)
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono">
            {selectedFabric && (
              <button 
                onClick={() => {
                  onHaptic?.();
                  setSelectedFabric(null);
                }}
                className="text-red-500 font-bold hover:underline cursor-pointer"
              >
                Clear Swatch Swatch Filter [x]
              </button>
            )}
            <span className="opacity-40">Showing high-density museum parameters layout</span>
          </div>
        </div>

        {/* Dense Grid layout representation */}
        <div className="grid grid-cols-1 mr-[-8px] sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wholesaleProducts.map((p, idx) => {
            const isSelected = !!selectedSkus[p.id || ""];
            const isInCompare = !!compareList.find(c => c.id === p.id);
            return (
              <div
                key={p.id || idx}
                onClick={(e) => handleToggleSkuSelect(p.id || "", e)}
                className={`p-4 border rounded relative transition-all flex flex-col justify-between h-[390px] cursor-pointer ${
                  isSelected ? "ring-1 ring-amber-400 border-amber-400 scale-[0.99]" : "hover:border-zinc-400"
                }`}
                style={{
                  backgroundColor: isSelected ? `${brandColors.text}04` : `${brandColors.text}01`,
                  borderColor: isSelected ? "transparent" : `${brandColors.text}0F`
                }}
              >
                {/* Checkbox badge overlay */}
                <div 
                  className={`absolute top-3 left-3 w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    isSelected ? "bg-amber-400 border-amber-400 text-neutral-900 font-bold" : "border-zinc-300"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div className="space-y-3">
                  {/* Photo representation */}
                  <div className="h-40 rounded flex flex-col justify-between p-2.5 relative overflow-hidden bg-zinc-950/5 border" style={{ borderColor: `${brandColors.text}08` }}>
                    <div className="flex justify-between items-center z-10 text-[8px] font-mono opacity-40 ml-6">
                      <span>LOT REF: WS-{100 + idx}</span>
                      <span>MOQ: {idx % 2 === 0 ? "15pcs" : "10pcs"}</span>
                    </div>

                    {p.image && (
                      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply flex items-center justify-center p-3">
                        <img 
                          src={p.image} 
                          alt={p.name}
                          className="w-full h-full object-contain saturate-[0.15] hover:saturate-100 transition-all pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 80">
                      <rect x="25" y="15" width="50" height="50" fill="none" stroke={brandColors.accent} strokeWidth="0.25" strokeDasharray="1,2" />
                      <line x1="0" y1="40" x2="100" y2="40" stroke={brandColors.text} strokeWidth="0.25" />
                    </svg>

                    <div className="z-10 mt-auto flex justify-between items-end">
                      <span className="text-[8.5px] font-mono uppercase bg-neutral-950/5 px-2 py-0.5 rounded opacity-60">
                        {p.silhouette.split(" (")[0]}
                      </span>
                      <span className="text-[8.5px] font-mono uppercase font-bold text-amber-600 block sm:hidden lg:block">
                        {p.material.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Lot Details */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-semibold text-xs tracking-tight line-clamp-1">{p.name}</h4>
                      <div className="text-right">
                        {/* Tiered price visibility */}
                        {isAuthenticated ? (
                          <div className="space-y-0.5">
                            <span className="text-xs font-mono font-bold text-indigo-500 block">{p.price}</span>
                            <span className="text-[7.5px] font-mono text-zinc-400 block uppercase line-through">MSRP {(parseInt(p.price.replace(/[^0-9]/g, ""))*3 || 2400)}</span>
                          </div>
                        ) : (
                          <span className="text-[9.5px] font-mono text-zinc-400 uppercase tracking-widest bg-zinc-200/50 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5 text-zinc-400" /> Locked Price
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-[10px] opacity-75 leading-relaxed font-light line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-dashed" style={{ borderColor: `${brandColors.text}1A` }}>
                  <div className="flex justify-between items-center text-[9px] font-mono">
                    <span className="opacity-50 uppercase">Medium Composition:</span>
                    <span className="font-semibold">{p.material}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleAddToCompare(p, e)}
                      className={`flex-1 py-1.5 text-[8.5px] font-mono uppercase font-bold border transition duration-300 rounded ${
                        isInCompare 
                          ? "bg-amber-100 border-amber-400 text-amber-800"
                          : "border-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      {isInCompare ? "✓ Compared" : "Compare Lot"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onHaptic?.();
                        onAddToCart(p);
                      }}
                      className="px-3.5 py-1.5 text-[8.5px] uppercase font-bold text-white transition hover:opacity-90 active:scale-95 flex items-center justify-center rounded"
                      style={{ backgroundColor: brandColors.accent }}
                    >
                      Acquire Sample
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side-by-Side Structural Component Compare Drawer */}
        {compareList.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            className="p-6 border rounded-lg bg-zinc-900 text-zinc-100 space-y-4"
          >
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2.5">
              <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-amber-400">
                <Sliders className="w-4 h-4" />
                <span>Side-by-Side Lot Compare Matrix (双品对齐比较面板)</span>
              </div>
              <button 
                onClick={() => {
                  onHaptic?.();
                  setCompareList([]);
                }} 
                className="text-[10px] font-mono text-red-400 hover:underline uppercase"
              >
                Reset Comparison [x]
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-[10.5px]">
              {compareList.map((c) => (
                <div key={c.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded space-y-3 relative">
                  <button 
                    onClick={(e) => handleAddToCompare(c, e)} 
                    className="absolute top-2 right-2 text-[10px] text-red-500 hover:text-red-400 font-bold"
                  >
                    [x]
                  </button>
                  <h5 className="font-bold text-xs pr-4 text-white uppercase">{c.name}</h5>
                  <div className="divide-y divide-zinc-900 text-[10px] space-y-1">
                    <div className="py-1 flex justify-between"><span className="opacity-50">Lot Ref:</span><span>{c.id?.toUpperCase()}</span></div>
                    <div className="py-1 flex justify-between"><span className="opacity-50">B2B Cost:</span><span className="text-amber-300 font-bold">{c.price}</span></div>
                    <div className="py-1 flex justify-between"><span className="opacity-50">Tensile Spec:</span><span>{c.silhouette}</span></div>
                    <div className="py-1 flex justify-between"><span className="opacity-50">Core Material:</span><span className="text-zinc-300">{c.material}</span></div>
                    <div className="py-1 flex justify-between"><span className="opacity-50">Standard MOQ:</span><span>15pcs</span></div>
                  </div>
                </div>
              ))}
              {compareList.length < 3 && (
                <div className="border border-dashed border-zinc-800 rounded flex items-center justify-center p-6 text-zinc-500 font-light italic text-xs leading-relaxed">
                  Select {3 - compareList.length} more Lot SKU(s) from Archive to complete comparing drapes.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* SECTION 4: BULK INQUIRY DESK (白名单：批量询价台) */}
      <div className="space-y-6">
        <div className="flex justify-between items-baseline border-b pb-3" style={{ borderColor: `${brandColors.text}1C` }}>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-70">
              BULK ACQUISITION & INQUIRY DESK (贵宾多规格批量询价中枢)
            </span>
          </div>
          <span className="text-[9px] opacity-40 font-mono">
            B2B direct pro-forma quote sheet
          </span>
        </div>

        <p className="text-xs font-light leading-relaxed max-w-3xl opacity-80">
          Check boxes on SKUs in the archive above to automatically assemble your bulk inquiries ledger below. Sliding numerical controls allows custom color codes matching and MOQ certification blocks.
        </p>

        {selectedItemsCount === 0 ? (
          <div className="p-8 border border-dashed text-center rounded flex flex-col items-center justify-center space-y-3 opacity-60" style={{ borderColor: `${brandColors.text}1C` }}>
            <ClipboardListIcon className="w-8 h-8 text-neutral-400" />
            <span className="font-mono text-xs uppercase tracking-widest">Your Inquiry Ledger is Empty</span>
            <p className="text-[10.5px] max-w-xs font-light leading-relaxed">
              Check product boxes on the Wholesaler Archive above to automatically generate a luxury B2B pro-forma transaction.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Left lists form variables */}
            <div className="md:col-span-2 space-y-4 p-6 border rounded bg-white/40 shadow-sm" style={{ borderColor: `${brandColors.text}12` }}>
              <div className="flex justify-between items-center pb-2.5 border-b" style={{ borderColor: `${brandColors.text}12` }}>
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-500">Lot Item Selected ({selectedItemsCount})</span>
                <span className="text-[9px] font-mono opacity-50">Bulk Scaling parameters configured</span>
              </div>

              <div className="divide-y" style={{ borderColor: `${brandColors.text}12` }}>
                {wholesaleProducts.filter(p => !!selectedSkus[p.id || ""]).map((p) => {
                  const id = p.id || "";
                  const activeQty = quantities[id] || 50;
                  const activeDye = dyeColors[id] || "raw-oat";
                  
                  return (
                    <div key={id} className="py-4 space-y-3">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <h5 className="font-bold text-xs uppercase">{p.name}</h5>
                          <p className="text-[9px] font-mono text-zinc-500">{p.material} • Minimum MOQ: 15pcs</p>
                        </div>
                        <button 
                          onClick={(e) => handleToggleSkuSelect(id, e)} 
                          className="text-[9.5px] text-red-500 font-mono hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Flex counter row */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                        {/* Numerical control */}
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between text-[9px] font-mono opacity-60">
                            <span>Adjust quantity:</span>
                            <span className="font-bold text-indigo-500">{activeQty} units</span>
                          </div>
                          <input 
                            type="range" 
                            min="15" 
                            max="1000" 
                            step="5"
                            value={activeQty}
                            onChange={(e) => {
                              onHaptic?.();
                              setQuantities(prev => ({ ...prev, [id]: parseInt(e.target.value) }));
                            }}
                            className="w-full accent-indigo-500 outline-none h-1.5 bg-zinc-200 rounded"
                          />
                        </div>

                        {/* Custom Dye list */}
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono opacity-60 block">Custom Dye Formulation:</label>
                          <select
                            value={activeDye}
                            onChange={(e) => {
                              onHaptic?.();
                              setDyeColors(prev => ({ ...prev, [id]: e.target.value }));
                            }}
                            className="p-1 px-2 border rounded text-[10px] font-mono bg-white focus:outline-indigo-500/20"
                            style={{ borderColor: `${brandColors.text}1F` }}
                          >
                            <option value="raw-oat">Default Organic Warm Oat</option>
                            <option value="walnut">Aged Walnut Dark Dye</option>
                            <option value="indigo">Midnight Slate Deep Indigo</option>
                            <option value="lichen">Mountain Forest Lichen Green</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Text area and Drag and Drop techpack PDF file upload section */}
              <div className="space-y-3 pt-3">
                <label className="text-[10px] font-mono uppercase block opacity-60">Production remarks / custom dimension files:</label>
                <textarea
                  placeholder="Insert custom dye metrics coordinates, special collar drape parameters or private labeling requests here..."
                  value={customRemarks}
                  onChange={(e) => setCustomRemarks(e.target.value)}
                  className="w-full p-2.5 text-xs border rounded font-mono bg-white shadow-inner focus:outline-indigo-500/20 h-20"
                  style={{ borderColor: `${brandColors.text}1F` }}
                />

                {/* Simulated file uploader block */}
                <div 
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    onHaptic?.();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      setTechPackFile(e.dataTransfer.files[0].name);
                    }
                  }}
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.onchange = (e: any) => {
                      if (e.target.files && e.target.files[0]) {
                        onHaptic?.();
                        setTechPackFile(e.target.files[0].name);
                      }
                    };
                    input.click();
                  }}
                  className={`border-2 border-dashed rounded p-5 text-center transition cursor-pointer flex flex-col items-center justify-center space-y-2 ${
                    isDragOver ? "border-indigo-400 bg-indigo-50/20" : "border-zinc-300 hover:border-zinc-400 bg-black/5"
                  }`}
                >
                  <Upload className="w-5 h-5 opacity-40 text-indigo-400 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-wider block">
                    {techPackFile ? "✓ Uploaded Tech Pack:" : "Drag & Drop CAD Tech Pack (CAD尺寸/辅料标准附件)"}
                  </span>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    {techPackFile ? techPackFile : "Accepts PDF, DXF, or Color Lab specters. Standalone simulation layer secure."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right sidebar quotes dispatch trigger */}
            <div className="space-y-4 p-6 border rounded bg-zinc-950 text-zinc-100" style={{ borderColor: `${brandColors.text}25` }}>
              <div className="space-y-1.5 border-b border-zinc-800 pb-2 flex justify-between items-baseline">
                <span className="text-[9.5px] font-mono uppercase tracking-widest text-amber-400">Transaction Appraisal</span>
                <span className="text-[8px] font-mono opacity-50">7-Layer Secure Escrow</span>
              </div>

              <div className="divide-y divide-zinc-900 text-[10px] font-mono space-y-1 pt-1">
                <div className="py-1 flex justify-between"><span className="opacity-45">Total Lot item:</span><span>{selectedItemsCount} Products</span></div>
                <div className="py-1 flex justify-between">
                  <span className="opacity-45">Aggregate Units:</span>
                  <span>{Object.values(quantities).reduce((a: number, b: any) => a + (Number(b) || 0), 0) || selectedItemsCount * 50} Units</span>
                </div>
                <div className="py-1 flex justify-between">
                  <span className="opacity-45">Escrow Pricing:</span>
                  <span className="text-amber-400 font-bold">{isAuthenticated ? "Tier Quote Generated" : "Auth Gate Required"}</span>
                </div>
                <div className="py-1 flex justify-between"><span className="opacity-45">Lead Time:</span><span>28 Solar cycles</span></div>
                <div className="py-1 flex justify-between"><span className="opacity-45">Shipping Route:</span><span>Genoa Harbor Maritime Carrier</span></div>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleSubmitInquiry}
                  disabled={isInquiring || inquirySuccess}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 text-white font-mono text-[10px] font-bold uppercase tracking-widest text-center transition cursor-pointer"
                >
                  {isInquiring ? "Dispatched..." : inquirySuccess ? "✓ Appraisal Confirmed" : "Dispatch Bulk Pro-Forma Quote"}
                </button>
                <p className="text-[8.5px] text-zinc-500 font-light leading-relaxed text-center">
                  Quotes maps directly to standard international credit letters and escrow contracts.
                </p>
              </div>

              {inquirySuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="p-3 bg-emerald-950/40 border border-emerald-900/50 rounded text-[10px] font-mono text-emerald-400 space-y-1.5"
                >
                  <div className="font-bold flex items-center gap-1.5 uppercase">
                    <CheckCircle2 className="w-4 h-4" /> B2B INQUIRY DISPATCHED!
                  </div>
                  <p className="font-light opacity-80 leading-relaxed">
                    Our luxury client supervisor (Alessandro) was assigned. Pro-forma contract drafted and uploaded to your secure corporate inbox index.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 5: REAL-TIME PRODUCTION & LOGISTICS TIMELINE (白名单：订单追踪墙) */}
      <div className="space-y-6">
        <div className="flex justify-between items-baseline border-b pb-3" style={{ borderColor: `${brandColors.text}1C` }}>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono opacity-70">
              ACTIVE PRODUCTION & PROGRESS TRACKING WALL (工坊染色、打板、海运实时追踪墙)
            </span>
          </div>
          <span className="text-[9px] opacity-40 font-mono">
            PO-Lot Reference: LP-8802-EU (Active)
          </span>
        </div>

        <p className="text-xs font-light leading-relaxed opacity-80">
          Monitor raw material development cycles, yarn tensioning, hand loom stitch sequences, and physical oceanic shipping vectors in real-time discretion.
        </p>

        {/* Timeline blocks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          
          {/* Node 1 */}
          <div className="p-4 bg-white/40 border rounded space-y-3 relative overflow-hidden" style={{ borderColor: `${brandColors.text}12` }}>
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase font-bold">✓ Phase Complete</span>
              <span className="text-[8px] font-mono opacity-40">Rome Bureau • May 04</span>
            </div>
            <div className="space-y-1">
              <h5 className="font-mono font-bold text-xs uppercase text-neutral-800">1. Yarn Sourcing & Testing</h5>
              <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
                Raw Mongolian goat fiber tested for tension purity and humidity parameters. Mean diameter certified at 14.18µm.
              </p>
            </div>
          </div>

          {/* Node 2 */}
          <div className="p-4 bg-white/40 border rounded space-y-3 relative overflow-hidden" style={{ borderColor: `${brandColors.text}12` }}>
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 uppercase font-bold animate-pulse">● Active Knitting</span>
              <span className="text-[8px] font-mono opacity-40">Milling Room • May 14</span>
            </div>
            <div className="space-y-1">
              <h5 className="font-mono font-bold text-xs uppercase text-neutral-800">2. Prototyping & Weaving</h5>
              <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
                Setting 7gg linear needles to knit tailored double-pleat collar blocks. Continuous stitching checked by Hand-Loom Operator.
              </p>
            </div>
          </div>

          {/* Node 3 */}
          <div className="p-4 bg-white/40 border rounded space-y-3 opacity-60 relative overflow-hidden" style={{ borderColor: `${brandColors.text}12` }}>
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 uppercase">Pending Queue</span>
              <span className="text-[8px] font-mono opacity-40">Dyeing Vat • May 28</span>
            </div>
            <div className="space-y-1">
              <h5 className="font-mono font-bold text-xs uppercase text-zinc-700">3. Saturated Natural Dyeing</h5>
              <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                Submerging knitted blocks under natural organic walnut bark vats at steady 92 degree celsius for warm earthy preservation.
              </p>
            </div>
          </div>

          {/* Node 4 */}
          <div className="p-4 bg-white/40 border rounded space-y-3 opacity-60 relative overflow-hidden" style={{ borderColor: `${brandColors.text}12` }}>
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600">Pending Queue</span>
              <span className="text-[8px] font-mono opacity-40">Genoa Port • June 05</span>
            </div>
            <div className="space-y-1">
              <h5 className="font-mono font-bold text-xs uppercase text-zinc-700">4. Crescent Ocean Carrier</h5>
              <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                Loading cases under warm humidity-calibrated sea vaults for maritime transit directly to buyer warehouse coordinates.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

// Simple fallback vector/clipboard list icon for standalone usage
function ClipboardListIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22H15" />
      <path d="M8 6h8" />
      <path d="M8 10h8" />
      <path d="M8 14h8" />
      <path d="M8 18h8" />
    </svg>
  );
}
interface DSLRendererProps {
  brand: SingularityBrand | null;
  onAddToCart?: (product: SingularityProduct) => void;
  cartCount?: number;
  onNavigateToTab?: (tab: "HOME" | "PRODUCTS" | "PHILOSOPHY" | "B2B" | "CART") => void;
}

export function DSLRenderer({ 
  brand, 
  onAddToCart,
  cartCount = 0,
  onNavigateToTab
}: DSLRendererProps) {
  
  if (!brand) {
    return (
      <div className="py-24 text-center text-xs font-mono opacity-50 space-y-3">
        <Layers className="w-8 h-8 mx-auto animate-pulse" />
        <p>Awaiting brand DNA compilation sequence...</p>
      </div>
    );
  }

  // Mobile luxury engine integrations
  const { isMobile, triggerHapticFeedback, engine } = useMobileLuxury();
  const mobileStyles = engine.generateMobileEngineStyles();
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isMobile && containerRef.current) {
      engine.optimizeElementTouchTargets(containerRef.current);
    }
  }, [isMobile, containerRef.current]);

  // Manage subtab internal state gracefully
  const [internalTab, setInternalTab] = useState<"HOME" | "PRODUCTS" | "PHILOSOPHY" | "B2B" | "CART">("HOME");
  const [cartList, setCartList] = useState<SingularityProduct[]>([]);

  const handleTabSelect = (tab: "HOME" | "PRODUCTS" | "PHILOSOPHY" | "B2B" | "CART") => {
    triggerHapticFeedback();
    setInternalTab(tab);
    if (onNavigateToTab) {
      onNavigateToTab(tab);
    }
  };

  const handleItemAdd = (product: SingularityProduct) => {
    setCartList(prev => [...prev, product]);
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const currentCartCount = cartList.length > 0 ? cartList.length : cartCount;

  const material = brand.brandUnderstanding?.materialLanguage || "raw-linen";
  const materialConfig = lookupMaterialConfig(material as any || "raw-linen");
  const layouts = plannedSections(brand);

  const displayFontFamily = brand.typography.display === "Space Grotesk" 
    ? "Space Grotesk, sans-serif" 
    : brand.typography.display === "Playfair Display" 
    ? "Playfair Display, serif" 
    : "Outfit, sans-serif";

  return (
    <div 
      ref={containerRef}
      className={`w-full relative min-h-screen font-sans flex flex-col justify-between transition-colors duration-1000 shadow-inner rounded-md ${isMobile ? "mobile-luxury-container pb-safe" : ""}`}
      style={{
        backgroundColor: brand.colors.background,
        color: brand.colors.text
      }}
    >
      {/* Dynamic mobile luxury optimized styles */}
      <style dangerouslySetInnerHTML={{ __html: mobileStyles }} />

      {/* Ambient AI Concierge (环境AI管家) */}
      <AmbientAIConcierge brand={brand} onHaptic={triggerHapticFeedback} />

      {/* Background Micro Noise Tactile Finish Layer */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(${brand.colors.text} 1px, transparent 1px)`,
          backgroundSize: materialConfig.noiseSize,
          opacity: materialConfig.grainOpacity
        }}
      ></div>

      {/* Extreme Low-glow Accent Aura */}
      <div 
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full filter blur-[150px] pointer-events-none mix-blend-screen transition-all duration-1000"
        style={{
          backgroundColor: brand.colors.accent,
          opacity: 0.05
        }}
      ></div>

      {/* 1. Silent Top Navbar */}
      <SilentNavbar 
        brandName={brand.brandName}
        luxuryTier={brand.brandUnderstanding?.luxuryTier || "high-end"}
        cartCount={currentCartCount}
        currentTab={internalTab}
        onTabChange={handleTabSelect}
        brandColors={brand.colors}
        displayFont={displayFontFamily}
        onHaptic={triggerHapticFeedback}
      />

      {/* MAIN VIEWPORT */}
      <div className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          {internalTab === "HOME" && (
            <motion.div
              key="home-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col"
            >
              <CinematicHero 
                brand={brand} 
                onExplore={() => handleTabSelect("PRODUCTS")} 
                displayFont={displayFontFamily} 
                onHaptic={triggerHapticFeedback}
              />

              <LuxuryManifesto 
                title={brand.editorialBlock?.title || "Sovereignty of Tactility"}
                body={brand.editorialBlock?.body || "Rejecting transient packaging hype. We cultivate raw materials that command silence."}
                designerVibe={brand.designerVibe}
                brandColors={brand.colors}
                displayFont={displayFontFamily}
              />

              <MaterialShowcase 
                materials={brand.brandUnderstanding?.materials || ["raw ceramic", "undressed bronze", "linen"]}
                activeMaterial={material}
                brandColors={brand.colors}
              />

              <FloatingProductScene 
                brandColors={brand.colors}
                designerStyle={brand.typography.style}
              />

              <SpatialGallery 
                spatialAtmosphere={brand.brandUnderstanding?.spatialAtmosphere || "Muted grey lines under strict white drapes."}
                silenceRatio={brand.brandUnderstanding?.silenceRatio || 0.8}
                brandColors={brand.colors}
              />
            </motion.div>
          )}

          {internalTab === "PRODUCTS" && (
            <motion.div
              key="prod-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow"
            >
              <EditorialGrid 
                products={brand.products}
                brandColors={brand.colors}
                onAddToCart={handleItemAdd}
                onHaptic={triggerHapticFeedback}
              />
            </motion.div>
          )}

          {internalTab === "PHILOSOPHY" && (
            <motion.div
              key="philosophy-layout"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-16 max-w-4xl mx-auto px-6 space-y-12"
            >
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 block font-mono">
                  THE ARCHITECTURAL CHARTER (造物不凡书)
                </span>
                <h3 className="text-3xl font-light" style={{ fontFamily: displayFontFamily }}>
                  Profound Gravity over Transient Glitz
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4 p-6 border bg-zinc-100/30 rounded" style={{ borderColor: `${brand.colors.text}10` }}>
                  <span className="font-mono text-[9px] text-indigo-400 font-bold uppercase block">I. Minimalist Layout Restraint</span>
                  <p className="text-xs font-light leading-relaxed opacity-80">
                    Traditional e-commerce designs prioritize screen space filling to optimize click-through retention. We optimize only for structural peace. The screen space layout maintains a strict minimum padding threshold of 120px to honor negative space.
                  </p>
                </div>

                <div className="space-y-4 p-6 border bg-zinc-100/30 rounded" style={{ borderColor: `${brand.colors.text}10` }}>
                  <span className="font-mono text-[9px] text-amber-500 font-bold uppercase block">II. Tactile Medium Preservoirs</span>
                  <p className="text-xs font-light leading-relaxed opacity-80">
                    Every active artifact carries a tactile weight ratio. Utilizing unprocessed metals and linen allows the objects to mature naturally, developing deep unique patinas through user interactions in real space.
                  </p>
                </div>
              </div>

              {/* Display score checklist to certify the compliance */}
              <div className="border p-6 font-mono text-xs rounded space-y-3" style={{ borderColor: `${brand.colors.text}1F` }}>
                <div className="text-[10px] font-bold text-zinc-500 uppercase">SYSTEM DIAGNOSTIC SCORE SHEET (AI 奢华准度核对)</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-zinc-700">
                  <div className="flex justify-between items-center bg-zinc-50 p-2.5 rounded">
                    <span>Aesthetic Score Coefficient:</span>
                    <span className="text-indigo-600 font-bold">✓ EVALUATED PASS</span>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-50 p-2.5 rounded">
                    <span>Cheap Gradient Suppressed:</span>
                    <span className="text-emerald-500 font-bold">✓ 100% ABSENT</span>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-50 p-2.5 rounded">
                    <span>Visual Balance Ratio:</span>
                    <span className="text-indigo-600 font-bold">✓ {(brand.scores?.whitespaceScore || 88)}%</span>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-50 p-2.5 rounded">
                    <span>Materials Whitelist Rule:</span>
                    <span className="text-emerald-500 font-bold">✓ COMPLIANT</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {internalTab === "B2B" && (
            <motion.div
              key="b2b-portal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow"
            >
              <B2BWholesalePortal 
                brand={brand}
                brandColors={brand.colors}
                displayFont={displayFontFamily}
                onAddToCart={handleItemAdd}
                onHaptic={triggerHapticFeedback}
              />
            </motion.div>
          )}

          {internalTab === "CART" && (
            <motion.div
              key="cart-checklist"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow"
            >
               <SilentCartCheckout 
                cart={cartList}
                brandColors={brand.colors}
                onClearCart={() => setCartList([])}
                displayFont={displayFontFamily}
                onHaptic={triggerHapticFeedback}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 10. Ambient Couture Footer with Scoring Metrics */}
      <AmbientFooter 
        brandName={brand.brandName}
        scores={brand.scores}
        brandColors={brand.colors}
      />
    </div>
  );
}
