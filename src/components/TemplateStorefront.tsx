import React, { useState, useMemo } from "react";
import { 
  Search, Sliders, ChevronDown, Bookmark, ExternalLink, 
  ArrowLeft, Monitor, Tablet, Smartphone, Check, Eye, Layout, 
  Sparkles, SlidersHorizontal, Lock, ArrowRight, Save, Mic, 
  CornerDownLeft, RefreshCw, Send, Code, Play, CheckCircle, 
  FileText, Copy, Heart, User, Download, Upload
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface BrandGenome {
  stylePreset: "Minimalist" | "Vintage" | "Future-Ism" | "Avant-Garde";
  moodPreset: "Silent" | "Active" | "Luxury";
  behavioral_dna: {
    interactionPatterns: string[];
    animationCurves: string[];
    microInteractions: string[];
    gridRatios: string;
  };
  semantic_dna: {
    archetype: string;
    valueProps: string[];
    inspirationSource: string;
    emotionalExpression: string;
    moodboardSwatches: string[];
  };
}

// Curated White-themed High-End Templates matching the v0 layout style
export interface CuratedTemplate {
  id: string;
  title: string;
  brandStyle: string;
  author: string;
  avatar: string;
  likes: string;
  views: string;
  initial: string;
  category: "Apps and Games" | "Landing Pages" | "Components" | "Dashboards";
  coverImage: string;
  badge: "Premium" | "Curated" | "Verified" | "New" | "Popular";
  brandGenome?: BrandGenome;
  hero: {
    title: string;
    slogan: string;
    quote: string;
    subtext: string;
    primaryCta: string;
  };
  products: Array<{
    id: string;
    refCode: string;
    title: string;
    description: string;
    price: string;
    tag: string;
    silhouette?: string;
  }>;
  story: {
    concept: string;
    theme: string;
    details: string;
    trigger: string;
    heritage: string;
  };
  footer: {
    tagline: string;
    coordinates: string;
    copyright: string;
  };
  bgColor: string;
  textColor: string;
  accentColor: string;
  fontDisplay: string;
}

export const BOUTIQUE_TEMPLATES: CuratedTemplate[] = [
  {
    id: "nano-banana",
    title: "Nano Banana Pro Playground",
    brandStyle: "Minimal Creative Lab",
    author: "Jordan K.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    likes: "651",
    views: "5.9K",
    initial: "NB",
    category: "Apps and Games",
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    badge: "Premium",
    hero: {
      title: "Playground of Pure Thought",
      slogan: "Interactive Physical Friction",
      quote: "“Ideas need room to slide. This sandbox strips secondary noise so you focus strictly on physical interactive layouts.”",
      subtext: "Designed with clean off-white chalkboards, absolute spatial typography, and responsive micro-adjustors helper grids.",
      primaryCta: "INITIALIZE PLAYGROUND"
    },
    products: [
      { id: "nb1", refCode: "REF-NBP-01", title: "Dynamic Kinetic Spring", description: "Smooth acceleration triggers, raw gesture canvas hooks, physical weight representation guidelines.", price: "Free Component", tag: "Hot Sandbox" },
      { id: "nb2", refCode: "REF-NBP-02", title: "Raw Canvas Layout Guide", description: "Minimal guidelines assisting coordinate adjustments without introducing bulky layout sidebars.", price: "$12 Archive", tag: "Popular Cut" }
    ],
    story: {
      concept: "Frictionless Design Acceleration",
      theme: "Oatmeal physical panels, matte bone borders, high contrast mono status labels.",
      details: "No colorful promo details. Pure canvas engineering structure designed to let modern products sit cleanly.",
      trigger: "Uncoated sketchbooks, soft morning light, fresh charcoal sketch leads.",
      heritage: "EST. 2026 • STOCKHOLM LABS"
    },
    footer: {
      tagline: "Unrefined structural blueprints for developers.",
      coordinates: "Stockholm • 59.3293° N, 18.0686° E",
      copyright: "© 2026 NANO BANANA LABS. RIGHTS DISPOSED."
    },
    bgColor: "#FFFFFF",
    textColor: "#121212",
    accentColor: "#DEE2E6",
    fontDisplay: "font-mono"
  },
  {
    id: "brillance-saas",
    title: "Brillance SaaS Landing Page",
    brandStyle: "Contemporary High-Contrast Cases",
    author: "Elena M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    likes: "1.9K",
    views: "13K",
    initial: "B",
    category: "Landing Pages",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    hero: {
      title: "Effortless custom contract billing by Brillance",
      slogan: "SaaS Deceleration Paradigm",
      quote: "“Streamline your complex billing pipelines with seamless, invisible automation tailored for premium teams.”",
      subtext: "No colorful visual noise. Just crisp black ink, highly-spaced table elements, and direct functional interactions.",
      primaryCta: "START FOR FREE"
    },
    products: [
      { id: "bs1", refCode: "REF-BRL-01", title: "Standard Micro-Billing Engine", description: "Provides automated instant triggers to invoice international partners without structural friction.", price: "$89/mo Core", tag: "Select Tier" },
      { id: "bs2", refCode: "REF-BRL-02", title: "Enterprise Customization Suite", description: "Bespoke ledger variables designed to comply with high-end financial registry criteria globally.", price: "$299/mo Premium", tag: "Strict Allocation" }
    ],
    story: {
      concept: "Invisible Enterprise Accounting",
      theme: "Pristine white spaces, slate gray lines, thin rounded cells, strict layout symmetry.",
      details: "Our interfaces run without colorful gradients. We make financial operations look as clean as premium design monographs.",
      trigger: "Structured typewriter keys, thick linen envelopes, cold steel table rims.",
      heritage: "EST. 2024 • SAN FRANCISCO / MILAN"
    },
    footer: {
      tagline: "Highly compliant billing systems for strict aesthetics.",
      coordinates: "New York • 40.7128° N, 74.0060° W",
      copyright: "© 2026 BRILLANCE SOFTWARE AG. ALL RIGHTS RESERVED."
    },
    bgColor: "#FCFCFB",
    textColor: "#111111",
    accentColor: "#E2E8F0",
    fontDisplay: "font-sans-display"
  },
  {
    id: "parisian-minimal",
    title: "Parisian Minimal Brand Store",
    brandStyle: "Hermès Heritage Vibe",
    author: "Adèle C.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    likes: "2.4K",
    views: "15K",
    initial: "H",
    category: "Landing Pages",
    coverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    badge: "Premium",
    hero: {
      title: "The Art of Slow Living",
      slogan: "Saddle-Stitched Elegance",
      quote: "“True luxury is felt in silent shapes, spacious cotton weaves, and generations of absolute focus.”",
      subtext: "Honoring classical Parisian lines. Structured collar cuts paired with custom hand-draped silhouettes, using heavyweight biological organic linen.",
      primaryCta: "REQUEST BESPOKE WARDROBE"
    },
    products: [
      { id: "p1", refCode: "REF-HMS-01", title: "Matte Grain Trench Wrap", description: "Vegetable tanned linen thread accents, classic folded storm flaps, deep structured shoulder slots.", price: "¥18,400 CNY", tag: "Limited Archive" },
      { id: "p2", refCode: "REF-HMS-02", title: "Hand-Rolled Silk Scarf", description: "Original print block artwork illustrating classic French horse riding reins, delicate hand-stitched borders.", price: "¥4,200 CNY", tag: "Few Remaining" }
    ],
    story: {
      concept: "Timeless Parisian Deceleration",
      theme: "Classic beeswax scents, hand-polished horn button accents, and spacious empty margins.",
      details: "Each piece is cut inside historical Paris workshop grids, allowing full fiber relaxation before finalizing seams.",
      trigger: "Warm organic wax, raw cedarwood oils, and premium heavy cardboard packing layers.",
      heritage: "EST. 1837 • PARIS, FRANCE"
    },
    footer: {
      tagline: "Generational silence for modern movement.",
      coordinates: "Paris, France • 48.8566° N, 2.3522° E",
      copyright: "© 2026 HERMÈS WORKSHOP ARCHIVES. ALL RIGHTS RETAINED."
    },
    bgColor: "#FAF9F6",
    textColor: "#121212",
    accentColor: "#E07A5F",
    fontDisplay: "font-serif"
  },
  {
    id: "kyoto-coffee",
    title: "Kyoto Coffee Clean Rituals",
    brandStyle: "Blue Bottle Clean Mind",
    author: "Kenji Y.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    likes: "1.2K",
    views: "8K",
    initial: "BB",
    category: "Components",
    coverImage: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80",
    badge: "Curated",
    hero: {
      title: "A Study in Solid Ceramics",
      slogan: "Kyoto Clean Timber Joints",
      quote: "“We slowly drip pure vertical mountain spring water over freshly-milled organic beans to honor stillness.”",
      subtext: "Designed with clean lime-washed concrete benches, absolute spatial empty gaps, and custom pouring rigs.",
      primaryCta: "BROWSE TODAY'S ROASTS"
    },
    products: [
      { id: "p3", refCode: "REF-BBC-01", title: "Single-Origin Kyoto Roast", description: "Harvested at high-altitudes of honey process organic micro-lots. Gentle berry notes, jasmine flowers, clean cedar syrups.", price: "$28 USD", tag: "Roasted Yesterday" },
      { id: "p4", refCode: "REF-BBC-02", title: "Porcelain Pouring Carafe", description: "Handcrafted inside historic Kyoto kilns. Optimized neck curve to maintain ideal water kinetic speeds.", price: "$85 USD", tag: "Select Stock" }
    ],
    story: {
      concept: "Sensory Awareness & Empty Tables",
      theme: "Warm Japanese oak wood details, raw volcanic stone slabs, and minimal graphic accents.",
      details: "We brew precisely at 92 degrees Celsius using hand-tapered organic paper shields to extract premium clean profiles.",
      trigger: "Steamed oat crop, freshly cracked dark shells, damp limestone morning steps.",
      heritage: "EST. 2002 • OAKLAND / KYOTO"
    },
    footer: {
      tagline: "Slow-roasted liquids for quiet observation.",
      coordinates: "Kyoto, Japan • 35.0116° N, 135.7681° E",
      copyright: "© 2026 BLUE BOTTLE COFFEE GLOBAL. ALL RIGHTS RESERVED."
    },
    bgColor: "#FAF9F5",
    textColor: "#2B2A27",
    accentColor: "#00A0DD",
    fontDisplay: "font-sans-display"
  },
  {
    id: "3d-gallery",
    title: "3D Gallery Photography Template",
    brandStyle: "Oversized Brutalist Lookbook",
    author: "Hiroshi T.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    likes: "783",
    views: "3K",
    initial: "G",
    category: "Components",
    coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    hero: {
      title: "I create; therefore I am",
      slogan: "Optical Precision Framework",
      quote: "“Photography isn't capturing frames. It's organizing visual light tension to challenge standard structures.”",
      subtext: "Oversized bold display typography, monochrome background layers, and heavy block outlines.",
      primaryCta: "VIEW PHOTOGRAPHY ARCHIVE"
    },
    products: [
      { id: "g1", refCode: "REF-PHO-01", title: "Linen Fine-Art Print (A2)", description: "Heavyweight 310gsm archival cotton rag, fine pigment oil inks, signed and uniquely numbered on back.", price: "$145 USD", tag: "Rigid Shipping" },
      { id: "g2", refCode: "REF-PHO-02", title: "Monograph: Visual Friction Vol. 1", description: "240 pages of architectural shadows and raw raw urban facades captured inside Tokyo morning grids.", price: "$65 USD", tag: "Strict Allocation" }
    ],
    story: {
      concept: "Structured Lens Perspective",
      theme: "Raw dark asphalt contrasts paired with blinding museum white gallery walls.",
      details: "No decorative graphic details or border curves. Only layout coordinates in their rawest geometric state.",
      trigger: "Dry developer solution, heavy glass lens weight, concrete dark basements.",
      heritage: "EST. 2021 • SHIBUYA / TOKYO"
    },
    footer: {
      tagline: "We organize photons to challenge standard perception.",
      coordinates: "Kyoto, Japan • 35.0116° N, 135.7681° E",
      copyright: "© 2026 HIROSHI PHOTOGRAPHY RESEARCH. ALL REPRODUCTION PREVENTED."
    },
    bgColor: "#FFFFFF",
    textColor: "#1C1C1E",
    accentColor: "#111111",
    fontDisplay: "font-display"
  },
  {
    id: "quiet-luxury",
    title: "The Row Atelier Restraint",
    brandStyle: "Monastic Luxury",
    author: "Zoe L.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    likes: "4.5K",
    views: "24K",
    initial: "R",
    category: "Dashboards",
    coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    hero: {
      title: "Monastic Sophistication",
      slogan: "Absolute Structural Restraint",
      quote: "“No visible brand logo, zero superficial decorations. Pure cashmere and flowing double-faced silk.”",
      subtext: "Designed in New York for the selective few who understand luxury as heavy textile volume and calm neutral sands.",
      primaryCta: "RESERVE PRIVATE PREVIEW"
    },
    products: [
      { id: "p7", refCode: "REF-ROW-01", title: "Double-Faced Cashmere Cape", description: "Exquisite handmade stitch-free edges. Absolute featherweight warmth, beautiful loose fluid flow.", price: "$3,600 USD", tag: "Private Registry Only" },
      { id: "p8", refCode: "REF-ROW-02", title: "Pleated Silk Lounge Pajama", description: "Pure heavyweight mulberry silk satin. Structured collars paired with relaxed side slits.", price: "$1,850 USD", tag: "Bespoke Cut" }
    ],
    story: {
      concept: "The Quiet Absolute",
      theme: "Soft oatmeal tones, unpolished raw sand stones, fluid silhouettes catching subtle window drafts.",
      details: "Crafted strictly without exterior branding markers. Attention is focused entirely on the premium thread weave.",
      trigger: "Pure cashmere dust, clean limestone concrete, high letterpress linen sheets.",
      heritage: "EST. 2006 • NEW YORK, USA"
    },
    footer: {
      tagline: "Silent garments for modern presence.",
      coordinates: "New York, USA • 40.7128° N, 74.0060° W",
      copyright: "© 2026 THE ROW ATELIER. REGISTERED PARTNERS."
    },
    bgColor: "#FAF9F6",
    textColor: "#222222",
    accentColor: "#8B7E66",
    fontDisplay: "font-serif"
  },
  {
    id: "simplicity-apothecary",
    title: "Aesop Simplicity Formulation",
    brandStyle: "Aesthetic Clean Botanic",
    author: "Marcus W.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    likes: "3.2K",
    views: "19K",
    initial: "A",
    category: "Apps and Games",
    coverImage: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80",
    badge: "Verified",
    hero: {
      title: "Botanical Formulation Suites",
      slogan: "Apothecary Restorative Curation",
      quote: "“Formulating certified skin-loving herbal distillations inside signature amber glass to resist seasonal fluctuations.”",
      subtext: "Each bottle is transparently sourced. We formulate with strict herbal components to bring absolute balance.",
      primaryCta: "EXPLORE SKIN FORMULATOR"
    },
    products: [
      { id: "p9", refCode: "REF-AES-01", title: "Resurrection Aromatique Hand Balm", description: "Enriched with sweet mandarin rinds, rosemary leaves, cedar bark oils. Intensely hydrating organic cream texture.", price: "$38 USD", tag: "Most Desired" },
      { id: "p10", refCode: "REF-AES-02", title: "Parsley Seed Facial Serum", description: "High-dose vitamin defense layer with white parsley seed extract. Absorbs cleanly under morning moisturizers.", price: "$85 USD", tag: "Verified Clean" }
    ],
    story: {
      concept: "Monodose Botanical Cleanliness",
      theme: "Aunt-classic amber vessels sitting cleanly on raw stone slabs beneath soft laboratory warm track lighting.",
      details: "No colorful promo decals. Just pure handwritten latin ingredients, designed in Melbourne with ultimate respect.",
      trigger: "Sweet lavender stems, orange zests, cold dark granite damp countertops.",
      heritage: "EST. 1987 • MELBOURNE, AUSTRALIA"
    },
    footer: {
      tagline: "Certified apothecary formulations for skin and soul.",
      coordinates: "Melbourne, Australia • 37.8136° S, 144.9631° E",
      copyright: "© 2026 AESOP COSMETICS LABS. ALL REPRODUCTION PREVENTED."
    },
    bgColor: "#FAF9F5",
    textColor: "#3C3530",
    accentColor: "#7A8275",
    fontDisplay: "font-sans-display"
  },
  {
    id: "la-maison",
    title: "Jacquemus Provence Accents",
    brandStyle: "Sun-Bleached Warm Clay",
    author: "Baptiste R.",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=150&q=80",
    likes: "1.7K",
    views: "11K",
    initial: "J",
    category: "Landing Pages",
    coverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    badge: "Premium",
    hero: {
      title: "The Provence Palette",
      slogan: "Sun-Bleached Geometric Silhouettes",
      quote: "“Capturing French clay tiles, hot linen beach umbrellas, and rich gold brass logo hardware details.”",
      subtext: "Exquisite asymmetrical silhouettes, natural fine grain calfskin hides, and simple playful lines.",
      primaryCta: "DISCOVER THE HANDBAGS"
    },
    products: [
      { id: "p11", refCode: "REF-JAC-01", title: "Chiquito Top Handle Pochette", description: "Iconic structured micro-bag. Stiff circular handle, gold brand lettering plaque, long adjustable matching shoulder belt.", price: "$680 USD", tag: "Season Best" },
      { id: "p12", refCode: "REF-JAC-02", title: "Provence Canvas Beach Tote", description: "Durable woven cotton flax, thick leather handles, interior zippered keys compartment. Elegant seaside companion.", price: "$490 USD", tag: "New Release" }
    ],
    story: {
      concept: "Sun-Drenched Southern Luxury",
      theme: "Southern France sand tiles, dry stalks, warm terracotta plates, and playfulness within clean boundaries.",
      details: "Each carryall represents French architectural simplicity. Balanced geometry is made for effortless afternoon cafes.",
      trigger: "Dry summer wheat stalks, sun-bleached sand grain, natural wax finish.",
      heritage: "EST. 2009 • SALON-DE-PROVENCE, FRANCE"
    },
    footer: {
      tagline: "Sunlit geometric objects for effortless presence.",
      coordinates: "Provence, France • 43.6300° N, 5.0970° E",
      copyright: "© 2026 JACQUEMUS ATELIER ARCHIVE. REGISTERED WORLDWIDE."
    },
    bgColor: "#F8F6F0",
    textColor: "#4E3E2F",
    accentColor: "#9C6644",
    fontDisplay: "font-serif"
  },
  {
    id: "monastic-architecture",
    title: "Monastic Arch Cloisters",
    brandStyle: "Sacred Stone Geometry",
    author: "Constantin V.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    likes: "3.8K",
    views: "18K",
    initial: "MA",
    category: "Components",
    coverImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
    badge: "Premium",
    hero: {
      title: "The Architecture of Silence",
      slogan: "Sacred Geometric Arches",
      quote: "“The heavy restraint of carved limestone cloisters. We eliminate digital noise to capture raw stone light.”",
      subtext: "Formulated with 70% void negative space, cold dark basalt textures, and raw linen display modules. An ode to silent monastic discipline.",
      primaryCta: "ACQUIRE BRUTALIST OBJECT"
    },
    products: [
      { 
        id: "p13", 
        refCode: "REF-MNA-01", 
        title: "Vaulted Alabaster Column Unit", 
        description: "A solid translucent columnar pillar. Transmits ambient gold glows when backlit, capturing ancient Roman arch proportions.", 
        price: "$4,200 USD", 
        tag: "Archival Cast",
        silhouette: "arch_column"
      },
      { 
        id: "p14", 
        refCode: "REF-MNA-02", 
        title: "Benedictine Cast-Iron Incense Crucible", 
        description: "Heavy carbon-forged metal vessel suspended by brutalist steel chain lines. Perfect gravity balance, micro-geometry detailing.", 
        price: "$1,890 USD", 
        tag: "Inorganic Solid",
        silhouette: "incense_crucible"
      },
      { 
        id: "p15", 
        refCode: "REF-MNA-03", 
        title: "Limestone Refectory Dining Plinth", 
        description: "Massive solid blocks of damp Jura limestone. Carved over 300 hours with raw unpolished hand-struck chisel boundaries.", 
        price: "$9,500 USD", 
        tag: "Monolith Core",
        silhouette: "refectory_plinth"
      }
    ],
    story: {
      concept: "Monolithic Sacred Symmetries",
      theme: "Cold basalt stonework, sacred light shafts, and sand-scratched plaster surfaces.",
      details: "No colorful logos, gradients, or promotional taglines. Only the absolute geometry of quiet stone columns and vaulted frames.",
      trigger: "Incense smoke rings, damp cold cellar dust, freshly oil-rubbed dark iron.",
      heritage: "EST. 1098 • CÎTEAUX / BURGUNDY"
    },
    footer: {
      tagline: "Sacred stones reflecting cold quiet geometry.",
      coordinates: "Citeaux Abbey • 47.1293° N, 5.0931° E",
      copyright: "© 2026 MONASTIC DESIGN INVENTORIES. ALL CHARTERS RESERVED."
    },
    bgColor: "#171614",
    textColor: "#E6E4E0",
    accentColor: "#C5B299",
    fontDisplay: "font-serif"
  }
];

// v0 Style Quick Starter Pills
const QUICK_PROMPT_PILLS = [
  { text: "Paris Minimal Boutique Store", icon: "🗼", prompt: "Build a Paris Minimal brand storefront for an archival linen atelier with slow living quotes, earthy matte tones, and spacious editorial layout margins." },
  { text: "Single-Origin Kyoto Coffee rituals", icon: "☕", prompt: "Create a Kyoto Coffee landing page styled with clean lime-washed concrete colors, Japanese timber joints concepts, and slow pour-over kinetics." },
  { text: "Apothecary Skin Balms layout", icon: "🌿", prompt: "Design an apothecary formulation suite matching Aesop amber bottles, latin ingredients labels on raw stone, and clean botanical layout details." },
  { text: "Brutalist Monochrome Photographic grid", icon: "📸", prompt: "Build a brutalist high-contrast typography lookbook portfolio for an architectural photographer featuring heavy black outlines and asymmetrical photo rows." }
];

const CAT_TABS = [
  "All",
  "Apps and Games",
  "Landing Pages",
  "Components",
  "Dashboards"
];

export function resolveTemplateGenome(item: CuratedTemplate): BrandGenome {
  if (item.brandGenome) return item.brandGenome;

  const id = item.id;
  if (id === "nano-banana") {
    return {
      stylePreset: "Minimalist",
      moodPreset: "Active",
      behavioral_dna: {
        interactionPatterns: ["Hover dynamic slide", "Spring kinetic drag", "Absolute layout helper guide grids"],
        animationCurves: ["cubic-bezier(0.19, 1, 0.22, 1)", "spring(1, 90, 8)"],
        microInteractions: ["Coordinates HUD tooltip", "Kinetic balance slider triggers"],
        gridRatios: "Golden Proportions (1.618)"
      },
      semantic_dna: {
        archetype: "The Innovative Craftsman",
        valueProps: ["Frictionless Acceleration", "Structural Blueprint Rawness", "Physical Kinetic Presence"],
        inspirationSource: "Damp unvarnished lime timber joined and raw carbon design sketches.",
        emotionalExpression: "Intellectual playfulness, clean acceleration, quiet lab focus",
        moodboardSwatches: ["#FFFFFF", "#F5F5F5", "#E0E0E0", "#121212"]
      }
    };
  }

  if (id === "brillance-saas") {
    return {
      stylePreset: "Minimalist",
      moodPreset: "Active",
      behavioral_dna: {
        interactionPatterns: ["Hover crisp fade-in", "Synchronized ledger list reveal"],
        animationCurves: ["cubic-bezier(0.16, 1, 0.3, 1)", "ease-out"],
        microInteractions: ["Symmetrical grid balance", "Fluid pricing tier transitions"],
        gridRatios: "Balanced Monolithic Half Grid (1:1)"
      },
      semantic_dna: {
        archetype: "The Sovereign Governor",
        valueProps: ["Invisible Enterprise Ledger", "Contemporary Contrast Harmony", "Compliance Restraint"],
        inspirationSource: "Traditional typewriter mechanical levers and high-register heavy paper bonds.",
        emotionalExpression: "Impeccably corporate, serene financial architecture, quiet security",
        moodboardSwatches: ["#FCFCFB", "#F1F5F9", "#E2E8F0", "#111111"]
      }
    };
  }

  if (id === "parisian-minimal") {
    return {
      stylePreset: "Vintage",
      moodPreset: "Luxury",
      behavioral_dna: {
        interactionPatterns: ["Slow magnetic hover drag", "Plush scrolling offset delay", "Glow-on-scroll vignette shifts"],
        animationCurves: ["cubic-bezier(0.25, 1, 0.5, 1)", "spring(1, 40, 16)"],
        microInteractions: ["Hand-stitch texture fades", "Progressive collection disclosure"],
        gridRatios: "Paris Classical Atelier Triad Grid (1:3:1)"
      },
      semantic_dna: {
        archetype: "The Sovereign Explorer",
        valueProps: ["Generational Atelier Focus", "Saddle-Stitched Linen Grace", "Warm Wax Patinas"],
        inspirationSource: "The Parisian morning limestone walls and aged brass coat hooks.",
        emotionalExpression: "Timeless heritage, slow organic grace, silent luxurious rest",
        moodboardSwatches: ["#FAF9F6", "#F5F3EF", "#E07A5F", "#121212"]
      }
    };
  }

  if (id === "kyoto-coffee") {
    return {
      stylePreset: "Minimalist",
      moodPreset: "Silent",
      behavioral_dna: {
        interactionPatterns: ["Gravity drip scroll-down parallax", "Delayed fade staggering"],
        animationCurves: ["cubic-bezier(0.1, 0.9, 0.2, 1)", "ease-in-out"],
        microInteractions: ["Drip liquid loader animations", "Interactive thermal balance tooltips"],
        gridRatios: "Kyoto Tatami Dual Grid Structure"
      },
      semantic_dna: {
        archetype: "The Silent Sage",
        valueProps: ["Thermal Pouring Precision", "Acoustics of Solitude", "Tactility of Ash & Clay"],
        inspirationSource: "Fine unpolished tea bowls and standard carbon coal lines.",
        emotionalExpression: "Monastic composure, clean thermal steam, absolute organic stillness",
        moodboardSwatches: ["#FAF9F5", "#F4F3ED", "#00A0DD", "#2B2A27"]
      }
    };
  }

  if (id === "3d-gallery") {
    return {
      stylePreset: "Avant-Garde",
      moodPreset: "Luxury",
      behavioral_dna: {
        interactionPatterns: ["Fluid photographic slide swap", "Asymmetric offset gallery scroll"],
        animationCurves: ["cubic-bezier(0.76, 0, 0.24, 1)", "spring(2, 60, 12)"],
        microInteractions: ["Focus depth magnification", "Fine lines crosshair hover follow"],
        gridRatios: "Extreme Brutalist Offset Grid"
      },
      semantic_dna: {
        archetype: "The Creator Artisan",
        valueProps: ["Optical Blueprint Tension", "Blinding Museum Contrast", "Zero-Ornament Geometry"],
        inspirationSource: "Rough dark asphalt tarmac and unpolished concrete gallery pedestals.",
        emotionalExpression: "Sublime artistic rigor, cold high-concept space, absolute focus",
        moodboardSwatches: ["#FFFFFF", "#EEEEEE", "#1C1C1E", "#0A0A0A"]
      }
    };
  }

  if (id === "quiet-luxury") {
    return {
      stylePreset: "Minimalist",
      moodPreset: "Luxury",
      behavioral_dna: {
        interactionPatterns: ["Slow-motion fade transitions", "Liquid boundary swipe", "Whisper-quiet hover delay"],
        animationCurves: ["cubic-bezier(0.12, 0.82, 0.38, 0.98)", "ease-out-smooth"],
        microInteractions: ["Sensory cashmere texture hover zoom", "Zero logo reveal hover interactions"],
        gridRatios: "Infinite Spacing Blank Void Ratio"
      },
      semantic_dna: {
        archetype: "The Quiet Master",
        valueProps: ["Label-free Absolute Silence", "Double-Faced Flow Proportions", "Cashmere Dust Comfort"],
        inspirationSource: "The New York loft unpolished plaster boards and morning mist sky.",
        emotionalExpression: "Ultimate status under-statement, warm high-end shelter",
        moodboardSwatches: ["#FAF9F6", "#ECEAE4", "#8B7E66", "#222222"]
      }
    };
  }

  if (id === "simplicity-apothecary") {
    return {
      stylePreset: "Minimalist",
      moodPreset: "Luxury",
      behavioral_dna: {
        interactionPatterns: ["Grid alignment hover indicators", "Slow botanical fade stagger"],
        animationCurves: ["cubic-bezier(0.2, 0.8, 0.2, 1)", "spring(1.2, 70, 15)"],
        microInteractions: ["Amber glass refraction gloss hover", "Botanical formula balance sliders"],
        gridRatios: "Apothecary Laboratory Compartment System"
      },
      semantic_dna: {
        archetype: "The Botanic Scholar",
        valueProps: ["Amber-glass UV Protection", "Aroma Compound Formulation", "Absolute Raw Sincerity"],
        inspirationSource: "Dried herbal extracts, botanical handbooks, and dark slate slabs.",
        emotionalExpression: "Clean apothecary structure, cold ceramic texture, warm eucalyptus breath",
        moodboardSwatches: ["#FAF9F5", "#EAE6DF", "#7A8275", "#3C3530"]
      }
    };
  }

  if (id === "la-maison") {
    return {
      stylePreset: "Vintage",
      moodPreset: "Active",
      behavioral_dna: {
        interactionPatterns: ["Asymmetrical layout hover lift", "Clay texture kinetic drag"],
        animationCurves: ["cubic-bezier(0.34, 1.56, 0.64, 1)", "spring(1, 100, 10)"],
        microInteractions: ["Playful clasp lock clicking", "Sun-bleached linen weave shimmer"],
        gridRatios: "Provence Sunlit Courtyard Grid (3:2:1)"
      },
      semantic_dna: {
        archetype: "The Solar Artist",
        valueProps: ["Sun-Bleached Terracotta Clay", "Exquisite Micro Handbag Proportions", "Rustic Gold Hardware Highlights"],
        inspirationSource: "Provence sun-drenched grain fields and fresh clay tiles.",
        emotionalExpression: "Effortlessly sunny, golden-hour radiance, structural playfulness",
        moodboardSwatches: ["#F8F6F0", "#EEE9DF", "#9C6644", "#4E3E2F"]
      }
    };
  }

  if (id === "monastic-architecture") {
    return {
      stylePreset: "Future-Ism",
      moodPreset: "Silent",
      behavioral_dna: {
        interactionPatterns: ["Sacred column depth shadow parallax", "Hover solid block focus highlight"],
        animationCurves: ["cubic-bezier(0.25, 1, 0.25, 1)", "spring(2, 50, 15)"],
        microInteractions: ["Limestone chisel impact ripples", "Vaulted geometric column alignment markers"],
        gridRatios: "Benedictine Monastery Monolithic Column grid"
      },
      semantic_dna: {
        archetype: "The Monastic Architect",
        valueProps: ["The Sacred Architecture of Negative Spaces", "Carved Jura Limestone monolith columns", "Benedictine Cast-Iron Incense Rituals"],
        inspirationSource: "Burial crypts, carved abbey archways, and unpolished cold Romanesque stone.",
        emotionalExpression: "Solemn monolithic silence, structural weight, historical sacred echo",
        moodboardSwatches: ["#171614", "#2E2A27", "#C5B299", "#E6E4E0"]
      }
    };
  }

  // DEFAULT FALLBACK
  return {
    stylePreset: "Minimalist",
    moodPreset: "Silent",
    behavioral_dna: {
      interactionPatterns: ["Standard minimalist hover fade"],
      animationCurves: ["cubic-bezier(0.25, 1, 0.5, 1)"],
      microInteractions: ["Clean line alignment tracers"],
      gridRatios: "Golden Proportions (1.618)"
    },
    semantic_dna: {
      archetype: "The Artisan Scholar",
      valueProps: ["Pristine layout symmetry", "Absolute restraint of color channels"],
      inspirationSource: "Uncoated cotton cardboards and studio natural light.",
      emotionalExpression: "Calm and focused absolute silent luxury",
      moodboardSwatches: ["#FFFFFF", "#F9F9F9", "#E0E0E0", "#111111"]
    }
  };
}

interface TemplateStorefrontProps {
  logAction: (msg: string) => void;
  onEditInV0?: (template: CuratedTemplate) => void;
}

export default function TemplateStorefront({ logAction, onEditInV0 }: TemplateStorefrontProps) {
  // Core generator state
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [promptInput, setPromptInput] = useState<string>("");
  const [modelDropdown, setModelDropdown] = useState<string>("v0 Max");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<"Newest" | "Popular" | "Name">("Popular");

  // Advanced DNA taxonomy filters & genome sheet drawer states
  const [selectedStylePreset, setSelectedStylePreset] = useState<string>("All");
  const [selectedMoodPreset, setSelectedMoodPreset] = useState<string>("All");
  const [genomeDetailTarget, setGenomeDetailTarget] = useState<CuratedTemplate | null>(null);

  // Dynamic sandbox code compilation & generation simulators
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationProgress, setCompilationProgress] = useState(0);
  const [compilationStatus, setCompilationStatus] = useState("");

  // Favorites library state
  const [favorites, setFavorites] = useState<string[]>(["nano-banana", "parisian-minimal", "kyoto-coffee"]);

  // Active Template Previewing & Customizing States
  const [allTemplates, setAllTemplates] = useState<CuratedTemplate[]>(BOUTIQUE_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<CuratedTemplate | null>(null);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activePreviewSection, setActivePreviewSection] = useState<"hero" | "products" | "story" | "footer">("hero");
  const [previewTab, setPreviewTab] = useState<"ui" | "code">("ui");

  // Customization Form State (live values updating inside the iframe representation)
  const [customTitle, setCustomTitle] = useState("");
  const [customSlogan, setCustomSlogan] = useState("");
  const [customAccent, setCustomAccent] = useState("");
  const [customScale, setCustomScale] = useState<"default" | "oversized" | "condensed">("default");
  const [monogramText, setMonogramText] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Edit Prompt State for the Side-by-side editor chat AI tool
  const [aiEditorPrompt, setAiEditorPrompt] = useState("");
  const [editorHistory, setEditorHistory] = useState<Array<{ sender: "user" | "v0", text: string }>>([
    { sender: "v0", text: "Successfully initialized premium template code blocks! Input instructions here to dynamically refine layout proportions, typography, margins, or color moods via AI simulation." }
  ]);

  // Toggle Favorite Action
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      if (prev.includes(id)) {
        logAction(`Storefront: Removed project template '${id}' from storage.`);
        return prev.filter(item => item !== id);
      } else {
        logAction(`Storefront: Saved project template '${id}' to collection.`);
        return [...prev, id];
      }
    });
  };

  // Live prompt submission - Simulates v0 generating code
  const handleGeneratePrompt = (customPromptText?: string) => {
    const targetPrompt = customPromptText || promptInput;
    if (!targetPrompt.trim()) return;

    logAction(`Storefront: Dispatched prompt code parsing cycle: "${targetPrompt}"`);
    setPromptInput("");
    setIsCompiling(true);
    setCompilationProgress(5);
    setCompilationStatus("Initializing AI Generation Context...");

    // Simulated staggered compilation states
    const steps = [
      { progress: 20, msg: "Parsing design guidelines and layout variables..." },
      { progress: 45, msg: "Synthesizing minimal light component architecture..." },
      { progress: 70, msg: "Applying elite margins and typography ratios..." },
      { progress: 95, msg: "Compiling standalone React application code module..." },
      { progress: 100, msg: "Build completed successfully!" }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setCompilationProgress(step.progress);
        setCompilationStatus(step.msg);
        if (step.progress === 100) {
          setTimeout(() => {
            setIsCompiling(false);
            // Dynamic routing based on prompt keywords to load a preview instantly
            const lowerPrompt = targetPrompt.toLowerCase();
            let templateToLoad = BOUTIQUE_TEMPLATES[0]; // default Nano Banana
            if (lowerPrompt.includes("kyoto") || lowerPrompt.includes("coffee")) {
              templateToLoad = BOUTIQUE_TEMPLATES.find(t => t.id === "kyoto-coffee") || BOUTIQUE_TEMPLATES[3];
            } else if (lowerPrompt.includes("paris") || lowerPrompt.includes("wardrobe") || lowerPrompt.includes("hermes") || lowerPrompt.includes("living")) {
              templateToLoad = BOUTIQUE_TEMPLATES.find(t => t.id === "parisian-minimal") || BOUTIQUE_TEMPLATES[2];
            } else if (lowerPrompt.includes("apothecary") || lowerPrompt.includes("aesop") || lowerPrompt.includes("balm") || lowerPrompt.includes("skin")) {
              templateToLoad = BOUTIQUE_TEMPLATES.find(t => t.id === "simplicity-apothecary") || BOUTIQUE_TEMPLATES[6];
            } else if (lowerPrompt.includes("brutalist") || lowerPrompt.includes("photography") || lowerPrompt.includes("lens") || lowerPrompt.includes("gallery")) {
              templateToLoad = BOUTIQUE_TEMPLATES.find(t => t.id === "3d-gallery") || BOUTIQUE_TEMPLATES[4];
            } else if (lowerPrompt.includes("saas") || lowerPrompt.includes("bill") || lowerPrompt.includes("brillance")) {
              templateToLoad = BOUTIQUE_TEMPLATES.find(t => t.id === "brillance-saas") || BOUTIQUE_TEMPLATES[1];
            }
            handleOpenPreview(templateToLoad);
            addEditorSystemAlert(`AI generated a luxury layout customized according to: "${targetPrompt}". Applied "${templateToLoad.title}" frame blueprint variables.`);
          }, 600);
        }
      }, (idx + 1) * 600);
    });
  };

  const addEditorSystemAlert = (text: string) => {
    setEditorHistory(prev => [...prev, { sender: "v0", text }]);
  };

  // Filter Logic matching categories & text updates
  const filteredTemplates = useMemo(() => {
    let result = [...allTemplates];

    // Advanced Taxonomy: Style Preset Filter
    if (selectedStylePreset !== "All") {
      result = result.filter(item => resolveTemplateGenome(item).stylePreset === selectedStylePreset);
    }

    // Advanced Taxonomy: Mood Preset Filter
    if (selectedMoodPreset !== "All") {
      result = result.filter(item => resolveTemplateGenome(item).moodPreset === selectedMoodPreset);
    }

    // Category Tabs (Fashion, Luxury Bags, Coffee, Beauty)
    if (activeTab !== "All") {
      result = result.filter(item => item.category === activeTab);
    }

    // Text Search
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.brandStyle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
      );
    }

    // Sorting Options
    if (selectedSort === "Name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === "Popular") {
      // Sort primarily by likes (higher first)
      result.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));
    }

    return result;
  }, [allTemplates, activeTab, searchQuery, selectedSort, selectedStylePreset, selectedMoodPreset]);

  // Open Preview Modal Simulator
  const handleOpenPreview = (template: CuratedTemplate) => {
    setSelectedTemplate(template);
    // Bind template defaults
    setCustomTitle(template.hero.title);
    setCustomSlogan(template.hero.slogan);
    setCustomAccent(template.accentColor);
    setCustomScale("default");
    setMonogramText(template.initial);
    setActivePreviewSection("hero");
    setPreviewTab("ui");
    setIsSaved(false);
    logAction(`Storefront: Initialized real-time simulation sandbox for '${template.title}'`);
  };

  // Dynamic code editor update triggers, simulating the AI agent updating the React file code on client instruction
  const handleExecuteAIEditorPrompt = () => {
    if (!aiEditorPrompt.trim()) return;

    const userMsg = aiEditorPrompt;
    setAiEditorPrompt("");
    setEditorHistory(prev => [...prev, { sender: "user", text: userMsg }]);

    logAction(`AI Sandbox: Received request: "${userMsg}"`);
    setIsCompiling(true);
    setCompilationProgress(30);
    setCompilationStatus("Scanning React workspace rules...");

    setTimeout(() => {
      setCompilationProgress(75);
      setCompilationStatus("Applying customized UI attributes...");

      setTimeout(() => {
        setCompilationProgress(100);
        setIsCompiling(false);

        // Parse and change state based on standard keywords
        const lower = userMsg.toLowerCase();
        let feedback = "Successfully compiled! Modified your active code block to incorporate custom guidelines. Check out the updated Live Preview.";
        
        if (lower.includes("title") || lower.includes("heading") || lower.includes("name")) {
          setCustomTitle("Customized Live Atelier");
          feedback = "Updated absolute layout header component and title properties to 'Customized Live Atelier'.";
        } else if (lower.includes("color") || lower.includes("green") || lower.includes("blue") || lower.includes("red") || lower.includes("accent")) {
          setCustomAccent("#2E7D32"); // sage green placeholder
          feedback = "Adjusted CSS accent palette properties to sophisticated botanical green values.";
        } else if (lower.includes("slogan") || lower.includes("subtext") || lower.includes("quote")) {
          setCustomSlogan("A study in absolute visual control");
          feedback = "Refined brand slogan to: 'A study in absolute visual control' inside the lookbook container.";
        } else if (lower.includes("large") || lower.includes("big") || lower.includes("scale") || lower.includes("oversize")) {
          setCustomScale("oversized");
          feedback = "Adjusted typography size factors scaling headings and padding matrices up +15%.";
        } else if (lower.includes("small") || lower.includes("condensed") || lower.includes("tight")) {
          setCustomScale("condensed");
          feedback = "Condensed margins and typography size factors scaling margins down -10%.";
        }

        setEditorHistory(prev => [...prev, { sender: "v0", text: feedback }]);
        logAction(`AI Sandbox: ${feedback}`);
      }, 700);
    }, 700);
  };

  const handleUseTemplate = () => {
    logAction(`Storefront: Executed export module call. Template configured as live brand.`);
    alert(`Applied '${selectedTemplate?.title}' properties (Custom title: "${customTitle || selectedTemplate?.hero.title}") as your main production workspace layout.`);
  };

  const handleSaveCustomization = () => {
    setIsSaved(true);
    logAction(`Storefront: Cataloged custom template attributes.`);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDownloadTemplateAssets = () => {
    if (!selectedTemplate) {
      logAction("Export Error: No active template loaded for structured asset compilation.");
      return;
    }
    
    // Construct premium structured JSON payload representation
    const payload = {
      platform: "V0.dev Cosmos Core",
      compliance_status: "PASSED",
      exported_at: new Date().toISOString(),
      template_id: selectedTemplate.id,
      template_title: selectedTemplate.title,
      category: selectedTemplate.category,
      brand_style: selectedTemplate.brandStyle,
      author: selectedTemplate.author,
      badge: selectedTemplate.badge,
      
      customized_settings: {
        title: customTitle || selectedTemplate.hero.title,
        slogan: customSlogan || selectedTemplate.hero.slogan,
        monogram: monogramText || selectedTemplate.initial,
        accent_color: customAccent || selectedTemplate.accentColor,
        scale_proportion: customScale
      },
      
      visual_dna: {
        bg_color: selectedTemplate.bgColor,
        text_color: selectedTemplate.textColor,
        display_font: selectedTemplate.fontDisplay,
        body_font: selectedTemplate.fontBody,
        initial_monogram: selectedTemplate.initial,
        heritage_story: selectedTemplate.story
      },
      
      active_color_palette: {
        background: selectedTemplate.bgColor,
        foreground: selectedTemplate.textColor,
        brand_accent: customAccent || selectedTemplate.accentColor,
        subtle_border_opaque: `${selectedTemplate.textColor}1A`,
        subtle_border_transparent: `${selectedTemplate.textColor}0D`
      },
      
      products_catalog: selectedTemplate.products,
      footer_settings: selectedTemplate.footer
    };

    try {
      // Serialize and download JSON
      const jsonStr = JSON.stringify(payload, null, 2);
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonStr);
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `v0_${selectedTemplate.id}_export.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      
      logAction(`Export Dynamic: Successfully compiled configuration files. Downloaded '${selectedTemplate.title}' live brand coordinates JSON bundle.`);
      addEditorSystemAlert(`Downloaded '${selectedTemplate.title}' custom assets configuration bundle!`);
    } catch (err) {
      console.error("Failed to generate file download for layout assets", err);
      logAction("Export Error: Asset packaging run faced unexpected stream interrupt.");
    }
  };

  const handleUploadTemplateAssets = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const jsonContent = event.target?.result as string;
        const uploaded = JSON.parse(jsonContent);

        // Basic validation of uploaded JSON format
        if (!uploaded || typeof uploaded !== "object") {
          throw new Error("Invalid JSON structure: Root node is not a dictionary.");
        }

        // Check if there is a matching template
        const templateId = uploaded.template_id;
        let matchedTemplate = allTemplates.find(t => t.id === templateId);

        if (matchedTemplate) {
          // Case A: Exists. Let's load the template and apply customizing overrides!
          logAction(`Uploader: Found cached template blueprint match for '${matchedTemplate.title}'. Hydrating layout.`);
          
          setSelectedTemplate(matchedTemplate);
          
          // Hydrate customized settings override
          if (uploaded.customized_settings) {
            setCustomTitle(uploaded.customized_settings.title ?? matchedTemplate.hero.title);
            setCustomSlogan(uploaded.customized_settings.slogan ?? matchedTemplate.hero.slogan);
            setMonogramText(uploaded.customized_settings.monogram ?? matchedTemplate.initial);
            setCustomAccent(uploaded.customized_settings.accent_color ?? matchedTemplate.accentColor);
            setCustomScale(uploaded.customized_settings.scale_proportion ?? "default");
          } else {
            // Apply standard default values as fallback
            setCustomTitle(matchedTemplate.hero.title);
            setCustomSlogan(matchedTemplate.hero.slogan);
            setMonogramText(matchedTemplate.initial);
            setCustomAccent(matchedTemplate.accentColor);
            setCustomScale("default");
          }

          setActivePreviewSection("hero");
          setPreviewTab("ui");
          setIsSaved(false);

          addEditorSystemAlert(`Successfully uploaded and loaded custom assets for '${matchedTemplate.title}'!`);
          alert(`Success: Overlaid your custom '${matchedTemplate.title}' settings into the sandbox workspace.`);
        } else {
          // Case B: Create and inject a completely brand new CuratedTemplate
          const newId = templateId || `custom-upload-${Date.now()}`;
          const newTemplate: CuratedTemplate = {
            id: newId,
            title: uploaded.template_title || uploaded.customized_settings?.title || "Uploaded Custom Atelier",
            brandStyle: uploaded.brand_style || "Imported Sacred Symmetries",
            author: uploaded.author || "Guest Curator",
            avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=150&q=80",
            likes: "1.2K",
            views: "5.4K",
            initial: uploaded.customized_settings?.monogram || uploaded.visual_dna?.initial_monogram || "UP",
            category: (uploaded.category && ["Apps and Games", "Landing Pages", "Components", "Dashboards"].includes(uploaded.category)) 
              ? uploaded.category 
              : "Landing Pages",
            coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
            badge: "Premium",
            hero: {
              title: uploaded.customized_settings?.title || uploaded.template_title || "The Design of Raw Presences",
              slogan: uploaded.customized_settings?.slogan || "Bespoke Geometric Fluidity",
              quote: uploaded.visual_dna?.heritage_story?.concept 
                ? `“${uploaded.visual_dna.heritage_story.concept}”` 
                : "“A tactile tribute to modern proportions.”",
              subtext: uploaded.visual_dna?.heritage_story?.details || "Formulated with custom coordinates, fine lines, and clean layouts.",
              primaryCta: uploaded.hero?.primaryCta || "DISCOVER ARCHIVE"
            },
            products: uploaded.products_catalog || [
              { id: `up-p1-${Date.now()}`, refCode: "REF-UP-01", title: "Custom Formulation Unit 01", description: "Bespoke architectural layout element crafted securely.", price: "$1,200 USD", tag: "Uploaded" }
            ],
            story: {
              concept: uploaded.visual_dna?.heritage_story?.concept || "Monolithic Spatial Order",
              theme: uploaded.visual_dna?.heritage_story?.theme || "Polished stones, pristine margins, high-contrast dark lines.",
              details: uploaded.visual_dna?.heritage_story?.details || "The absolute restraint of user-driven uploads.",
              trigger: uploaded.visual_dna?.heritage_story?.trigger || "Wax seals, archival heavy linen textures, fresh spring wind.",
              heritage: uploaded.visual_dna?.heritage_story?.heritage || "EST. 2026 • DIGITAL ATELIER"
            },
            footer: {
              tagline: uploaded.footer_settings?.tagline || "Form reflecting structural code beauty.",
              coordinates: uploaded.footer_settings?.coordinates || "Atelier Workspace • 0.00° N, 0.00° E",
              copyright: uploaded.footer_settings?.copyright || "© 2026 ATELIER DESIGNS. ALL RIGHTS RESERVED."
            },
            bgColor: uploaded.visual_dna?.bg_color || uploaded.active_color_palette?.background || "#FFFFFF",
            textColor: uploaded.visual_dna?.text_color || uploaded.active_color_palette?.foreground || "#111111",
            accentColor: uploaded.customized_settings?.accent_color || uploaded.active_color_palette?.brand_accent || "#10B981",
            fontDisplay: uploaded.visual_dna?.display_font || "font-sans-display"
          };

          // Append to dynamic template library list
          setAllTemplates(prev => [newTemplate, ...prev]);
          
          // Select it and hydrate overrides
          setSelectedTemplate(newTemplate);
          setCustomTitle(uploaded.customized_settings?.title || newTemplate.hero.title);
          setCustomSlogan(uploaded.customized_settings?.slogan || newTemplate.hero.slogan);
          setMonogramText(uploaded.customized_settings?.monogram || newTemplate.initial);
          setCustomAccent(uploaded.customized_settings?.accent_color || newTemplate.accentColor);
          setCustomScale(uploaded.customized_settings?.scale_proportion || "default");
          
          setActivePreviewSection("hero");
          setPreviewTab("ui");
          setIsSaved(false);

          logAction(`Uploader: Dynamically registered brand new custom template: '${newTemplate.title}'`);
          addEditorSystemAlert(`Constructed brand new custom template '${newTemplate.title}' through premium asset loader successfully.`);
          alert(`Import Successful! Registered and activated completely new custom template '${newTemplate.title}' in your storefront.`);
        }
      } catch (err: any) {
        console.error("Failed to parse uploaded template asset file:", err);
        logAction(`Import Error: ${err.message || "Unreadable layout JSON stream."}`);
        alert(`Failed to load asset file: ${err.message || "Invalid template JSON format."}`);
      }
    };
    
    fileReader.readAsText(file);
    // Reset file input target value so the same file can be uploaded again if modified
    e.target.value = "";
  };

  // Copy simulated code
  const handleCopyCode = () => {
    const code = getMockCodeString();
    navigator.clipboard.writeText(code);
    logAction(`Storefront Code: Copied simulated lookbook React block.`);
    alert("Copied code module to clipboard!");
  };

  // Helper code renderer with live parameter extraction
  const getMockCodeString = () => {
    if (!selectedTemplate) return "";
    const activeAccent = customAccent || selectedTemplate.accentColor;
    const activeTitle = customTitle || selectedTemplate.hero.title;
    const activeSlogan = customSlogan || selectedTemplate.hero.slogan;
    const activeInit = monogramText || selectedTemplate.initial;

    return `import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

/**
 * BRAND FOUNDATION ATELIER: ${selectedTemplate.title}
 * Style Model: ${selectedTemplate.brandStyle}
 * Created dynamically in White Cosmos v0 engine.
 */
export default function InteractiveAtelier() {
  const [monogram] = useState("${activeInit}");
  
  return (
    <div className="min-h-screen bg-[${selectedTemplate.bgColor}] text-[${selectedTemplate.textColor}] font-sans p-8 md:p-14 selection:bg-black selection:text-white">
      {/* Absolute minimalist label banner */}
      <div className="max-w-xl mx-auto space-y-8 select-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-500 block">
          / ${activeInit} • ${activeSlogan}
        </span>
        
        <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-none uppercase">
          ${activeTitle}
        </h1>

        <p className="text-xs font-light leading-relaxed opacity-90 max-w-md">
          ${selectedTemplate.hero.subtext}
        </p>

        <blockquote className="border-l border-neutral-300 pl-4 py-0.5 italic text-xs text-neutral-600">
          ${selectedTemplate.hero.quote}
        </blockquote>

        <div className="pt-4">
          <button 
            className="px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300"
            style={{ 
              backgroundColor: "${selectedTemplate.textColor}", 
              className: "hover:opacity-90" 
            }}
          >
            ${selectedTemplate.hero.primaryCta}
          </button>
        </div>
      </div>
    </div>
  );
}`;
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white text-neutral-900 select-none font-sans">
      
      {/* DYNAMIC PROGRESS INJECTOR OVERLAY */}
      <AnimatePresence>
        {isCompiling && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="max-w-md w-full space-y-6">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-neutral-100" />
                <div className="absolute inset-0 rounded-full border-4 border-black border-t-transparent animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="font-sans font-bold text-sm tracking-wider uppercase text-black">
                  Compiling Code Engine
                </h3>
                <p className="text-xs text-neutral-500 font-mono">
                  {compilationStatus}
                </p>
              </div>
              <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden border border-neutral-200">
                <motion.div 
                  className="bg-black h-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${compilationProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                {compilationProgress}% Complete
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!selectedTemplate ? (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-grow flex flex-col"
          >
            
            {/* 1. v0.app-style HEROSCAPE PROMPT BOX */}
            <div className="w-full bg-white border-b border-neutral-100 pt-16 pb-12 px-4 text-center sticky top-0 bg-white/95 backdrop-blur-md z-30">
              <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Heading Styled identically to v0 */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 font-sans select-none antialiased">
                  您想创建什么？
                </h2>

                {/* Main dynamic generated search / chatbot frame */}
                <div className="bg-white border border-neutral-200 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 focus-within:border-neutral-400 focus-within:shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-1">
                  
                  {/* Text typing field */}
                  <textarea
                    rows={2}
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleGeneratePrompt();
                      }
                    }}
                    placeholder="让 v0 构建..."
                    className="w-full bg-transparent border-0 text-sm md:text-base text-neutral-900 focus:outline-none placeholder-neutral-400 px-4 py-3 resize-none select-text"
                  />

                  {/* Interactive input accessory bar */}
                  <div className="flex items-center justify-between px-3 pb-2 pt-1.5 border-t border-neutral-150">
                    
                    {/* Model selector dropdown pill */}
                    <div className="relative">
                      <button
                        onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                        className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-150 rounded-lg text-xs font-bold text-neutral-700 font-mono flex items-center gap-1.5 cursor-pointer border border-neutral-200"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-neutral-500" />
                        <span>{modelDropdown}</span>
                        <ChevronDown className="w-3 h-3 text-neutral-500" />
                      </button>
                      
                      {modelDropdownOpen && (
                        <div className="absolute left-0 bottom-full mb-1 bg-white border border-neutral-200 rounded-xl shadow-xl w-36 py-1 z-40 text-left overflow-hidden">
                          {["v0 Max", "v0 Mini", "v0 Experimental"].map((ver) => (
                            <button
                              key={ver}
                              onClick={() => {
                                setModelDropdown(ver);
                                setModelDropdownOpen(false);
                                logAction(`Model Setting: Changed model to '${ver}'`);
                              }}
                              className="w-full px-3 py-2 text-xs font-mono text-neutral-700 hover:bg-neutral-100 text-left flex items-center justify-between"
                            >
                              <span>{ver}</span>
                              {modelDropdown === ver && <Check className="w-3.5 h-3.5 text-black" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Submit layout parameters trigger buttons */}
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => {
                          logAction("Triggered dynamic voice input simulation.");
                          setPromptInput("Build a Paris minimalist slow living wardrobe catalog with hand-draped silhouettes");
                        }}
                        className="p-2 hover:bg-neutral-100 text-neutral-500 rounded-lg transition cursor-pointer"
                        title="Speech Input"
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleGeneratePrompt()}
                        disabled={!promptInput.trim()}
                        className={`p-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
                          promptInput.trim() 
                            ? "bg-black text-white cursor-pointer hover:bg-neutral-800" 
                            : "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                        }`}
                        title="Generate Design"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Quick select buttons with beautiful custom visual icons */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {QUICK_PROMPT_PILLS.map((pill, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleGeneratePrompt(pill.prompt)}
                      className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-xs font-sans text-neutral-700 transition cursor-pointer border border-neutral-100 flex items-center gap-1.5 select-none"
                    >
                      <span>{pill.icon}</span>
                      <span>{pill.text}</span>
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => {
                      logAction("Storefront: Randomly initialized prompt variable layout.");
                      const randomPrompt = QUICK_PROMPT_PILLS[Math.floor(Math.random() * QUICK_PROMPT_PILLS.length)].prompt;
                      setPromptInput(randomPrompt);
                    }}
                    className="p-1.5 hover:bg-neutral-100 border border-neutral-200 rounded-full transition cursor-pointer"
                    title="Load Random Designer Brief"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-neutral-600" />
                  </button>
                </div>

              </div>
            </div>

            {/* 2. MAIN TEMPLATE STOREFRONT LIST */}
            <div className="max-w-7xl mx-auto w-full px-6 py-12 space-y-10 flex-grow text-left">
              
              {/* Filtering row header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-neutral-200 pb-5">
                <div className="space-y-1">
                  <h3 className="font-sans font-bold text-xl text-neutral-900 uppercase tracking-tight">
                    Start with a template
                  </h3>
                  <p className="text-xs text-neutral-500 font-sans font-light">
                    Browse responsive layouts, luxury frameworks, and bespoke code models ready to deploy.
                  </p>
                </div>

                {/* Tab layout matching the white UI mockup from v0 */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {CAT_TABS.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          logAction(`Storefront: Changed active filter to '${tab}'`);
                        }}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-lg font-sans transition cursor-pointer whitespace-nowrap ${
                          activeTab === tab
                            ? "bg-black text-white"
                            : "text-neutral-600 bg-neutral-100 hover:bg-neutral-200"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Vertical divider line */}
                  <span className="hidden sm:inline h-4 w-[1px] bg-neutral-250" />

                  {/* High fidelity dynamic layout importer file input */}
                  <label className="px-3.5 py-2 text-xs font-semibold rounded-lg font-sans transition cursor-pointer whitespace-nowrap bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center gap-1.5 border border-dashed border-neutral-300 select-none">
                    <Upload className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Import Settings JSON</span>
                    <input 
                      type="file" 
                      accept=".json" 
                      className="hidden" 
                      onChange={handleUploadTemplateAssets} 
                    />
                  </label>
                </div>
              </div>

              {/* Integrated Search and Sort bar */}
              <div className="relative flex items-center bg-white border border-neutral-200 rounded-xl px-4 focus-within:border-neutral-400 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <Search className="w-4 h-4 text-neutral-400 mr-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates, author labels, or brand styles..."
                  className="w-full bg-transparent border-none text-xs text-neutral-900 focus:outline-none placeholder-neutral-400 h-11 font-sans select-text"
                />
                
                {/* Clean divider line */}
                <div className="h-4 w-[1px] bg-neutral-200 mx-3 shrink-0" />
                
                {/* Embedded Sort By dropdown */}
                <div className="flex items-center gap-1.5 shrink-0 font-sans">
                  <span className="text-neutral-400 uppercase tracking-widest text-[9px] font-mono hidden sm:inline">Sort:</span>
                  <select
                    value={selectedSort}
                    onChange={(e) => {
                      setSelectedSort(e.target.value as any);
                      logAction(`Sorter: Changed list sorting to ${e.target.value}`);
                    }}
                    className="py-1 px-1 text-xs text-neutral-700 bg-transparent border-none cursor-pointer focus:outline-none font-sans font-semibold"
                  >
                    <option value="Popular">Most Popular</option>
                    <option value="Newest">New Editions</option>
                    <option value="Name">Name A-Z</option>
                  </select>
                </div>
              </div>

              {/* Aesthetic Taxonomy Multi-dimensional Selection Row */}
              <div className="flex flex-wrap items-center gap-4 text-xs bg-neutral-50/50 p-3 rounded-2xl border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-neutral-400 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 font-bold">DNA Taxonomy:</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-5">
                  {/* Style preset switcher */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-neutral-400 font-medium font-mono">STYLE:</span>
                    <div className="flex gap-1.5">
                      {["All", "Minimalist", "Vintage", "Future-Ism", "Avant-Garde"].map((st) => (
                        <button
                          key={st}
                          onClick={() => {
                            setSelectedStylePreset(st);
                            logAction(`Storefront: Set Style taxonomy to ${st}`);
                          }}
                          className={`px-2.5 py-1 text-[10px] rounded-lg font-mono transition cursor-pointer ${
                            selectedStylePreset === st
                              ? "bg-black text-white font-bold"
                              : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vertical divider */}
                  <span className="hidden md:inline h-3 w-[1px] bg-neutral-300" />

                  {/* Mood preset switcher */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-neutral-400 font-medium font-mono">MOOD:</span>
                    <div className="flex gap-1.5">
                      {["All", "Silent", "Active", "Luxury"].map((md) => (
                        <button
                          key={md}
                          onClick={() => {
                            setSelectedMoodPreset(md);
                            logAction(`Storefront: Set Mood taxonomy to ${md}`);
                          }}
                          className={`px-2.5 py-1 text-[10px] rounded-lg font-mono transition cursor-pointer ${
                            selectedMoodPreset === md
                              ? "bg-black text-white font-bold"
                              : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                          }`}
                        >
                          {md}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Template high fidelity cards grid */}
              {filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTemplates.map((item) => (
                    <motion.div
                      key={item.id}
                      onClick={() => handleOpenPreview(item)}
                      whileHover={{ 
                        y: -8,
                        boxShadow: "0 22px 40px rgba(0, 0, 0, 0.08)",
                        borderColor: "rgba(0,0,0,0.3)"
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="bg-white border border-neutral-200 rounded-2xl group cursor-pointer overflow-hidden flex flex-col justify-between relative"
                    >
                      {/* Interactive Visual lookbook Image block */}
                      <div className="relative aspect-[1.5/1] w-full overflow-hidden bg-neutral-100 border-b border-neutral-150">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                        />
                        
                        {/* Interactive floating badges */}
                        <div className="absolute top-4 left-4">
                          <span className="text-[9px] font-mono tracking-widest uppercase bg-black text-white px-2.5 py-0.5 rounded-full font-bold">
                            {item.badge}
                          </span>
                        </div>
                        
                        <div className="absolute top-4 right-4 animate-fade-in group-hover:opacity-0 duration-300">
                          <span className="text-[9px] font-mono uppercase bg-white/95 text-neutral-800 px-2 py-0.5 rounded-full font-bold border border-neutral-200">
                            {item.category}
                          </span>
                        </div>

                        {/* Elegant hover overlay with "Quick View" trigger */}
                        <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuickViewId(item.id);
                              logAction(`Storefront: Activated real-time Quick-View overlay for template '${item.title}'`);
                            }}
                            className="px-4 py-2 bg-white hover:bg-neutral-50 text-black text-[10px] font-mono tracking-widest font-extrabold uppercase rounded-xl shadow-lg flex items-center gap-1.5 transition duration-200 active:scale-95 cursor-pointer border border-neutral-200"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Quick View</span>
                          </button>
                        </div>
                      </div>

                      {/* Simplified Inline Quick View Modal Covering Card */}
                      <AnimatePresence>
                        {quickViewId === item.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute inset-0 z-20 p-5 flex flex-col justify-between select-none"
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                          >
                            {/* Header */}
                            <div className="flex items-start justify-between border-b pb-2" style={{ borderColor: `${item.textColor}24` }}>
                              <div className="flex items-center gap-2.5">
                                <div 
                                  className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11px] tracking-tight shrink-0 border"
                                  style={{ backgroundColor: item.textColor, color: item.bgColor, borderColor: `${item.textColor}33` }}
                                >
                                  {item.initial}
                                </div>
                                <div className="text-left">
                                  <h5 className="text-[11px] font-sans font-bold uppercase tracking-wider line-clamp-1 h-[14px]">
                                    {item.title}
                                  </h5>
                                  <span className="text-[8px] font-mono tracking-widest opacity-60 block mt-0.5 uppercase">
                                    Aesthetic Blueprint
                                  </span>
                                </div>
                              </div>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setQuickViewId(null);
                                }}
                                className="w-5 h-5 rounded-full flex items-center justify-center border hover:opacity-75 transition duration-150 cursor-pointer"
                                style={{ borderColor: `${item.textColor}33`, color: item.textColor }}
                              >
                                <span className="text-[14px] leading-none select-none">×</span>
                              </button>
                            </div>

                            {/* Middle contents: Typography & Color swatches */}
                            <div className="grid grid-cols-2 gap-4 py-3 my-auto">
                              {/* Left Column: Typography Scale */}
                              <div className="space-y-3.5 text-left border-r pr-3" style={{ borderColor: `${item.textColor}1A` }}>
                                <div>
                                  <span className="text-[8px] font-mono uppercase tracking-wider block opacity-70 mb-1">
                                    Display Scale
                                  </span>
                                  <div className="space-y-1">
                                    <p className={`${item.fontDisplay} text-base md:text-lg font-black tracking-tight leading-tight uppercase`}>
                                      Abc 123
                                    </p>
                                    <span className="text-[8px] font-mono opacity-50 block">
                                      {item.fontDisplay === "font-mono" ? "JetBrains Mono" : item.fontDisplay === "font-serif" ? "Playfair Serif" : "Outfit Display"}
                                    </span>
                                  </div>
                                </div>

                                <div>
                                  <span className="text-[8px] font-mono uppercase tracking-wider block opacity-70 mb-1">
                                    Text Balance
                                  </span>
                                  <p className="font-mono text-[9px] font-medium leading-relaxed opacity-90 line-clamp-2">
                                    The restraint of heavy architectural shapes is embedded.
                                  </p>
                                </div>
                              </div>

                              {/* Right Column: Colors & Swatches */}
                              <div className="space-y-4 text-left">
                                <div className="space-y-2">
                                  <span className="text-[8px] font-mono uppercase tracking-wider block opacity-70">
                                    Selected Palette
                                  </span>
                                  
                                  <div className="flex items-center gap-2">
                                    {/* Swatch 1: Bg */}
                                    <div className="flex flex-col items-center">
                                      <div 
                                        className="w-5.5 h-5.5 rounded-full border border-current shadow-sm"
                                        style={{ backgroundColor: item.bgColor }}
                                        title={`Backdrop Color: ${item.bgColor}`}
                                      />
                                      <span className="text-[7.5px] font-mono opacity-65 mt-1">{item.bgColor}</span>
                                    </div>

                                    {/* Swatch 2: Text */}
                                    <div className="flex flex-col items-center">
                                      <div 
                                        className="w-5.5 h-5.5 rounded-full border border-current shadow-sm"
                                        style={{ backgroundColor: item.textColor }}
                                        title={`Ink Color: ${item.textColor}`}
                                      />
                                      <span className="text-[7.5px] font-mono opacity-65 mt-1">{item.textColor}</span>
                                    </div>

                                    {/* Swatch 3: Accent */}
                                    <div className="flex flex-col items-center">
                                      <div 
                                        className="w-5.5 h-5.5 rounded-full border border-current shadow-sm"
                                        style={{ backgroundColor: item.accentColor }}
                                        title={`Accent Highlight: ${item.accentColor}`}
                                      />
                                      <span className="text-[7.5px] font-mono opacity-65 mt-1">{item.accentColor}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-2 border-t border-current/[0.08] space-y-0.5">
                                  <span className="text-[8px] font-mono uppercase tracking-wider block opacity-70">
                                    Aesthetic Law
                                  </span>
                                  <span className="text-[9.5px] font-bold tracking-wide uppercase line-clamp-1 block">
                                    {item.brandStyle.split(" ")[0]} Decent Ratio
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Bottom CTA block */}
                            <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: `${item.textColor}24` }}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setQuickViewId(null);
                                  handleOpenPreview(item);
                                }}
                                className="flex-1 py-2 rounded-xl text-[10px] font-bold tracking-[0.1em] transition duration-200 uppercase flex items-center justify-center gap-1 cursor-pointer border hover:opacity-90 active:scale-98"
                                style={{ backgroundColor: item.textColor, color: item.bgColor, borderColor: item.textColor }}
                              >
                                <Sparkles className="w-3 h-3 text-inherit" />
                                <span>Customize</span>
                              </button>

                              {onEditInV0 && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setQuickViewId(null);
                                    onEditInV0(item);
                                  }}
                                  className="flex-1 py-2 rounded-xl text-[10px] font-extrabold tracking-[0.1em] transition duration-200 uppercase flex items-center justify-center gap-1 cursor-pointer border border-amber-500 hover:opacity-95 active:scale-98"
                                  style={{ backgroundColor: "#F59E0B", color: "#000000" }}
                                >
                                  <Sparkles className="w-3 h-3 text-current fill-current animate-pulse" />
                                  <span>Edit V0</span>
                                </button>
                              )}
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setQuickViewId(null);
                                }}
                                className="px-3 py-2 rounded-xl text-[10px] font-mono border hover:opacity-85 active:scale-98 transition duration-200 cursor-pointer"
                                style={{ borderColor: `${item.textColor}33` }}
                              >
                                Back
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Info & Metrics panel matching v0 metadata */}
                      <div className="p-5 space-y-3">
                        <div className="space-y-1">
                          <h4 className="font-sans font-bold text-sm text-neutral-900 group-hover:text-black transition uppercase tracking-wider truncate">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-neutral-500 font-sans tracking-wide truncate">
                            {item.brandStyle}
                          </p>
                        </div>

                        {/* Interactive Taxonomy & Genome trigger row */}
                        <div className="flex items-center justify-between gap-1 bg-neutral-50 p-2.5 rounded-xl transition duration-300 group-hover:bg-neutral-100/50 border border-neutral-100">
                          <div className="flex gap-1 select-none">
                            <span className="text-[7.5px] font-mono uppercase bg-white text-neutral-500 border border-neutral-200/40 px-1.5 py-0.5 rounded">
                              Style: {resolveTemplateGenome(item).stylePreset}
                            </span>
                            <span className="text-[7.5px] font-mono uppercase bg-white text-neutral-500 border border-neutral-200/40 px-1.5 py-0.5 rounded">
                              Mood: {resolveTemplateGenome(item).moodPreset}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setGenomeDetailTarget(item);
                              logAction(`Storefront: Opened Brand Genome Sheet for '${item.title}'`);
                            }}
                            className="text-[8.5px] font-mono font-extrabold uppercase tracking-wider text-black flex items-center gap-0.5 hover:opacity-85 transition duration-150 cursor-pointer bg-white px-2 py-0.5 border border-neutral-200 rounded shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                          >
                            <span>🧬 Genome</span>
                          </button>
                        </div>

                        {/* Designer avatar meta bar */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100 text-neutral-500 font-sans">
                          {/* Designer Identity */}
                          <div className="flex items-center gap-2">
                            <img 
                              src={item.avatar} 
                              alt={item.author} 
                              className="w-5 h-5 rounded-full object-cover border border-neutral-200"
                            />
                            <span className="text-[11px] text-neutral-700 font-semibold">{item.author}</span>
                          </div>

                          {/* Stat count icons identical to v0 visual indicators */}
                          <div className="flex items-center gap-3 text-neutral-400 text-xs">
                            <div className="flex items-center gap-1" title="Views">
                              <Eye className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-mono font-medium">{item.views}</span>
                            </div>
                            
                            <button
                              onClick={(e) => handleToggleFavorite(item.id, e)}
                              className="flex items-center gap-1 focus:outline-none hover:text-red-500 transition cursor-pointer"
                              title="Favorites"
                            >
                              <Heart className={`w-3.5 h-3.5 ${favorites.includes(item.id) ? "fill-red-500 text-red-500" : ""}`} />
                              <span className="text-[10px] font-mono font-medium">
                                {favorites.includes(item.id) ? parseInt(item.likes) + 1 : item.likes}
                              </span>
                            </button>
                          </div>
                        </div>

                      </div>

                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-16 text-center space-y-4 max-w-lg mx-auto">
                  <span className="text-4xl block opacity-30">📁</span>
                  <h4 className="font-sans font-bold text-neutral-800">No Projects Found</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto">
                    Try adjusting your search criteria, clearing search text inputs, or switching category headers to explore creative assets.
                  </p>
                  <div>
                    <button
                      onClick={() => {
                        setActiveTab("All");
                        setSearchQuery("");
                      }}
                      className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold uppercase transition hover:bg-neutral-800 cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              )}

            </div>

          </motion.div>
        ) : (
          
          /* 3. COUTURE SIDE-BY-SIDE SANDBOX CUSTOMIZER (FULL-SCREEN REACT MODAL OVERLAY) */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/65 backdrop-blur-md z-50 flex items-center justify-center p-0 md:p-6"
          >
            <motion.div
              initial={{ y: "20%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "20%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="bg-[#FAF9F6] w-full h-full md:rounded-3xl shadow-2xl flex flex-col overflow-hidden max-w-[96vw] md:max-h-[92vh] border border-neutral-200"
            >
            
            {/* Context/Control Header inside the editor */}
            <div className="bg-white border-b border-neutral-200 px-6 py-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedTemplate(null);
                    logAction("Storefront: Exited workspace sandbox back to catalog overview.");
                  }}
                  className="p-2 border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 text-neutral-850 rounded-xl transition cursor-pointer bg-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono uppercase bg-neutral-100 border border-neutral-200 text-neutral-600 px-2 py-0.5 rounded-full font-bold">
                      {selectedTemplate.category}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">By {selectedTemplate.author}</span>
                  </div>
                  <h3 className="font-sans font-extrabold text-base text-neutral-900 uppercase">
                    {selectedTemplate.title} — WORKSPACE
                  </h3>
                </div>
              </div>

              {/* Viewports layout controls */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px]">
                
                {/* View/Code Tabs Toggle */}
                <div className="flex bg-neutral-100 p-0.5 rounded-xl border border-neutral-200">
                  <button
                    onClick={() => {
                      setPreviewTab("ui");
                      logAction("Sandbox: Swapped view panel to lookbook frame UI.");
                    }}
                    className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition flex items-center gap-1.5 font-bold ${
                      previewTab === "ui" 
                        ? "bg-white text-black shadow-sm" 
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    <Layout className="w-3.5 h-3.5" />
                    <span>PREVIEW UI</span>
                  </button>
                  <button
                    onClick={() => {
                      setPreviewTab("code");
                      logAction("Sandbox: Swapped view panel to standalone React source code.");
                    }}
                    className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition flex items-center gap-1.5 font-bold ${
                      previewTab === "code" 
                        ? "bg-white text-black shadow-sm" 
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>SOURCE CODE</span>
                  </button>
                </div>

                {/* Viewport Resizer widget */}
                {previewTab === "ui" && (
                  <div className="flex bg-neutral-100 p-0.5 rounded-xl border border-neutral-200">
                    {[
                      { id: "desktop", label: "DESKTOP", icon: <Monitor className="w-3.5 h-3.5" /> },
                      { id: "tablet", label: "TABLET", icon: <Tablet className="w-3.5 h-3.5" /> },
                      { id: "mobile", label: "MOBILE", icon: <Smartphone className="w-3.5 h-3.5" /> }
                    ].map((dev) => (
                      <button
                        key={dev.id}
                        onClick={() => {
                          setPreviewDevice(dev.id as any);
                          logAction(`Viewport Scale: Swapped simulator grid width limit to '${dev.id}'`);
                        }}
                        className={`px-3 py-1.5 rounded-lg cursor-pointer transition flex items-center gap-1.5 font-black uppercase tracking-wider ${
                          previewDevice === dev.id 
                            ? "bg-white text-black shadow-sm" 
                            : "text-neutral-500 hover:text-neutral-800"
                        }`}
                        title={`Preview in ${dev.label}`}
                      >
                        {dev.icon}
                        <span className="hidden sm:inline">{dev.label}</span>
                      </button>
                    ))}
                  </div>
                )}

              </div>

            </div>

            {/* Split canvas grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 items-start flex-1 min-h-[580px]">
              
              {/* Left Column: Configurator & Chat Modify Sidebar */}
              <div className="lg:col-span-4 space-y-5 bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm text-left">
                
                {/* Active Parameters Controls Accordion */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                    <span className="font-sans font-bold text-xs uppercase text-neutral-900 tracking-wider">
                      Atelier Variables Customizer
                    </span>
                    <Sliders className="w-3.5 h-3.5 text-neutral-400" />
                  </div>

                  {/* Custom Title Input */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-neutral-600 uppercase font-sans">Bespoke Title:</label>
                    <input
                      type="text"
                      value={customTitle}
                      onChange={(e) => {
                        setCustomTitle(e.target.value);
                        logAction(`Sandbox Customization: Changed brand title parameter dynamically.`);
                      }}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 font-sans select-text"
                    />
                  </div>

                  {/* Custom Slogan Input */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-neutral-600 uppercase font-sans">Brand Slogan:</label>
                    <input
                      type="text"
                      value={customSlogan}
                      onChange={(e) => {
                        setCustomSlogan(e.target.value);
                        logAction(`Sandbox Customization: Changed brand slogan parameter dynamically.`);
                      }}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 font-sans select-text"
                    />
                  </div>

                  {/* Row of custom details */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Monogram / Signature */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-neutral-600 uppercase font-sans">Aesthetic Mark:</label>
                      <input
                        type="text"
                        value={monogramText}
                        onChange={(e) => {
                          setMonogramText(e.target.value.toUpperCase());
                          logAction(`Sandbox Customization: Changed signature monogram mark dynamically.`);
                        }}
                        maxLength={5}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-400 uppercase font-mono tracking-widest select-text"
                      />
                    </div>

                    {/* Accent Color picker */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-neutral-600 uppercase font-sans">Atmosphere Tint:</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={customAccent || selectedTemplate.accentColor}
                          onChange={(e) => {
                            setCustomAccent(e.target.value);
                            logAction(`Atmosphere: Set primary hex color value to ${e.target.value}`);
                          }}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none shrink-0"
                        />
                        <span className="text-[10px] font-mono text-neutral-500 uppercase">
                          {customAccent || selectedTemplate.accentColor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scale adjustment slider */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-neutral-600 uppercase block font-sans">Layout Proportion Dynamics:</span>
                    <div className="flex bg-neutral-100 p-1 rounded-lg border border-neutral-200 text-[10px] font-sans">
                      {[
                        { id: "condensed", label: "Condensed (-10%)" },
                        { id: "default", label: "Default Ratio" },
                        { id: "oversized", label: "Editorial Wide (+15%)" }
                      ].map((sc) => (
                        <button
                          key={sc.id}
                          onClick={() => {
                            setCustomScale(sc.id as any);
                            logAction(`Proportions Setting: Swapped scale focus to ${sc.id}`);
                          }}
                          className={`flex-1 py-1.5 rounded-md cursor-pointer text-center font-bold transition ${
                            customScale === sc.id 
                              ? "bg-white text-black shadow-sm" 
                              : "text-neutral-500 hover:text-black"
                          }`}
                        >
                          {sc.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Simulated AI dynamic modifier prompt feed - v0.app style */}
                <div className="pt-4 border-t border-neutral-150 space-y-3.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-neutral-850" />
                    <span className="font-sans font-bold text-xs uppercase text-neutral-900 tracking-wider">
                      v0 Real-Time AI Generation Agent
                    </span>
                  </div>

                  {/* Scrollable instructions feed dialogue box representing simulated compilation logs */}
                  <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-200 font-sans text-xs space-y-2 max-h-40 overflow-y-auto select-text">
                    {editorHistory.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`p-2 rounded-lg leading-relaxed ${
                          item.sender === "v0" 
                            ? "bg-white text-neutral-700 italic border border-neutral-150" 
                            : "bg-black text-white font-medium ml-4"
                        }`}
                      >
                        <span className="font-bold font-mono text-[9px] uppercase tracking-wider block opacity-75 mb-0.5">
                          {item.sender === "v0" ? "✦ Assistant" : "👤 User Instruction"}
                        </span>
                        {item.text}
                      </div>
                    ))}
                  </div>

                  {/* Text typing field for compiling prompts */}
                  <div className="flex items-center gap-2 bg-neutral-50 rounded-xl p-1.5 border border-neutral-200">
                    <input
                      type="text"
                      value={aiEditorPrompt}
                      onChange={(e) => setAiEditorPrompt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleExecuteAIEditorPrompt();
                        }
                      }}
                      placeholder="Prompt AI designer to alter layout details..."
                      className="flex-grow bg-transparent border-0 text-xs text-neutral-900 focus:outline-none placeholder-neutral-400 px-3 py-2 select-text"
                    />
                    <button
                      onClick={handleExecuteAIEditorPrompt}
                      disabled={!aiEditorPrompt.trim()}
                      className={`p-2 rounded-lg transition ${
                        aiEditorPrompt.trim() 
                          ? "bg-black text-white cursor-pointer hover:bg-neutral-800" 
                          : "bg-neutral-200 text-neutral-300 cursor-not-allowed"
                      }`}
                    >
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary boutique controls */}
                <div className="space-y-2 pt-4 border-t border-neutral-150 font-sans">
                  {onEditInV0 && (
                    <button
                      onClick={() => {
                        onEditInV0(selectedTemplate!);
                        setSelectedTemplate(null);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black text-xs font-black tracking-[0.2em] rounded-xl cursor-pointer text-center flex items-center justify-center gap-1.5 transition uppercase shadow-md active:scale-98"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-black fill-black animate-pulse" />
                      <span>Edit in V0 AI Editor</span>
                    </button>
                  )}

                  <button
                    onClick={handleUseTemplate}
                    className="w-full py-3 bg-black text-white text-xs font-bold tracking-[0.2em] rounded-xl cursor-pointer text-center block transition hover:bg-neutral-800 uppercase shadow-md"
                  >
                    DEPLOY THIS DESIGN
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleDownloadTemplateAssets}
                      className="py-2.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-xl text-neutral-800 text-[10px] font-bold tracking-[0.12em] flex items-center justify-center gap-1.5 cursor-pointer transition uppercase"
                    >
                      <Download className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                      <span>Download JSON</span>
                    </button>
                    <label className="py-2.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-xl text-neutral-800 text-[10px] font-bold tracking-[0.12em] flex items-center justify-center gap-1.5 cursor-pointer transition uppercase text-center select-none">
                      <Upload className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                      <span>Upload JSON</span>
                      <input 
                        type="file" 
                        accept=".json" 
                        className="hidden" 
                        onChange={handleUploadTemplateAssets} 
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleSaveCustomization}
                      className={`py-2.5 rounded-lg text-[11px] font-bold tracking-[0.1em] border flex items-center justify-center gap-1.5 cursor-pointer uppercase transition ${
                        isSaved ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          ARCHIVED
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5 text-neutral-500" />
                          Save Config
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        logAction("Sandbox: Refreshed simulator variable state.");
                        handleOpenPreview(selectedTemplate);
                        addEditorSystemAlert("Reverted active design back to template default variables.");
                      }}
                      className="py-2.5 bg-white border border-neutral-200 hover:border-neutral-400 rounded-lg text-[11px] font-bold tracking-[0.1em] text-neutral-700 flex items-center justify-center gap-1.5 cursor-pointer transition uppercase"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-neutral-400" />
                      Restore
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic Lookbook Live Frame OR Code panel */}
              <div className="lg:col-span-8 flex flex-col items-center">
                
                {previewTab === "ui" ? (
                  
                  /* RESPONSIVE ATELIER PREVIEW SHELL */
                  <div 
                    className={`bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.04)] transition-all duration-300 relative ${
                      previewDevice === "desktop" 
                        ? "w-full min-h-[580px]" 
                        : previewDevice === "tablet" 
                        ? "w-[580px] min-h-[540px]" 
                        : "w-[330px] min-h-[510px]"
                    }`}
                  >
                    
                    {/* Simulated Browser Access Toolbar Stripe */}
                    <div className="bg-neutral-50 px-4 py-2.5 border-b border-neutral-150 flex items-center justify-between select-none text-[10px] font-mono text-neutral-500 uppercase">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-neutral-200 border border-neutral-200 block" />
                        <span className="text-neutral-600 font-bold">{customTitle || selectedTemplate.title} — LIVE PREVIEW</span>
                      </div>
                      
                      {/* Nav anchors through interactive lookbook details */}
                      <div className="hidden md:flex items-center gap-2.5 text-[9.5px]">
                        {["hero", "products", "story", "footer"].map((section) => (
                          <button
                            key={section}
                            onClick={() => {
                              setActivePreviewSection(section as any);
                              logAction(`Atelier Navigation: Clicked anchor jump to section '${section}'`);
                            }}
                            className={`px-2 py-0.5 rounded transition uppercase ${
                              activePreviewSection === section
                                ? "bg-black text-white"
                                : "text-neutral-400 hover:text-black"
                            }`}
                          >
                            {section}
                          </button>
                        ))}
                      </div>

                      <div className="bg-[#FAF9F5] border border-neutral-200 text-neutral-700 font-bold px-2 py-0.5 rounded-md text-[9px] tracking-wide">
                        {previewDevice.toUpperCase()}
                      </div>
                    </div>

                    {/* INTERACTIVE COMPRESSED IFRAME EMULATION PANEL */}
                    <div 
                      className="p-8 md:p-14 text-left relative transition-all duration-300 flex flex-col justify-center min-h-[440px] font-sans overflow-y-auto"
                      style={{
                        backgroundColor: selectedTemplate.bgColor,
                        color: selectedTemplate.textColor,
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {activePreviewSection === "hero" && (
                          <motion.div 
                            key="hero"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6 max-w-xl mx-auto w-full"
                          >
                            <span 
                              className="font-mono tracking-[0.25em] block uppercase opacity-75 font-bold"
                              style={{ 
                                fontSize: customScale === "oversized" ? "10px" : customScale === "condensed" ? "8px" : "9px",
                              }}
                            >
                              / {monogramText || selectedTemplate.initial} — {customSlogan || selectedTemplate.hero.slogan}
                            </span>
                            
                            <h2 
                              className={`leading-none font-light tracking-[0.05em] text-inherit uppercase ${selectedTemplate.fontDisplay}`}
                              style={{
                                fontSize: customScale === "oversized" ? "3.2rem" : customScale === "condensed" ? "2rem" : "2.5rem",
                              }}
                            >
                              {customTitle || selectedTemplate.hero.title}
                            </h2>
                            
                            <p className="text-xs font-light leading-relaxed opacity-85">
                              {selectedTemplate.hero.subtext}
                            </p>

                            <blockquote className="border-l border-neutral-300 pl-4 py-0.5 italic text-xs opacity-75">
                              {selectedTemplate.hero.quote}
                            </blockquote>

                            <div className="pt-2">
                              {/* Apply custom atmospheric color parameters to button layout attributes */}
                              <button 
                                className="px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer transition-all duration-350 shadow-sm"
                                style={{
                                  border: `1px solid ${selectedTemplate.textColor}`,
                                  backgroundColor: selectedTemplate.textColor,
                                  color: selectedTemplate.bgColor
                                }}
                              >
                                {selectedTemplate.hero.primaryCta}
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {activePreviewSection === "products" && (
                          <motion.div 
                            key="products"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6 w-full"
                          >
                            <span className="font-mono text-[9px] tracking-[0.2em] block uppercase opacity-85 border-b border-current/15 pb-2 font-bold">
                              / SELECTED ARCHIVAL INVENTORY PIECES
                            </span>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                              {selectedTemplate.products.map((p) => (
                                <div 
                                  key={p.id} 
                                  className="border p-5 flex flex-col justify-between space-y-4 bg-current/[0.01]"
                                  style={{ borderColor: `${selectedTemplate.textColor}1A` }}
                                >
                                  <div className="space-y-1.5 flex-grow">
                                    <span className="font-mono text-[8px] opacity-70 block tracking-wider">{p.refCode}</span>
                                    <h4 className="font-sans font-bold text-xs uppercase text-inherit tracking-widest">{p.title}</h4>
                                    <p className="text-[10.5px] font-light leading-relaxed opacity-80">{p.description}</p>
                                    
                                    {p.silhouette && (
                                      <div className="mt-4 pt-4 border-t border-current/[0.05] flex items-center justify-center h-28 w-full bg-current/[0.01] rounded-lg relative overflow-hidden group">
                                        {/* Subtle atmospheric design grids inside the silhouette viewport */}
                                        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_center,#000_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                                        
                                        {p.silhouette === "arch_column" && (
                                          <svg viewBox="0 0 100 100" className="w-16 h-16 stroke-current fill-none opacity-50 transition-all duration-500 group-hover:scale-105" strokeWidth="1.2">
                                            {/* Column pedestal base */}
                                            <rect x="36" y="25" width="28" height="60" rx="1" />
                                            {/* Inverted Cloister Arch inside */}
                                            <path d="M 40 55 A 10 10 0 0 1 60 55" />
                                            <path d="M 40 55 L 43 85" />
                                            <path d="M 60 55 L 57 85" />
                                            {/* Circular sacred alignment halo */}
                                            <circle cx="50" cy="40" r="14" strokeDasharray="2,3" className="opacity-40" />
                                            {/* Foundations */}
                                            <line x1="28" y1="85" x2="72" y2="85" />
                                            <line x1="33" y1="25" x2="67" y2="25" />
                                          </svg>
                                        )}
                                        {p.silhouette === "incense_crucible" && (
                                          <svg viewBox="0 0 100 100" className="w-16 h-16 stroke-current fill-none opacity-50 transition-all duration-500 group-hover:scale-105" strokeWidth="1.2">
                                            {/* Suspended chains */}
                                            <line x1="50" y1="5" x2="50" y2="38" strokeDasharray="3,3" />
                                            <line x1="32" y1="12" x2="38" y2="38" opacity="0.6" strokeDasharray="3,3" />
                                            <line x1="68" y1="12" x2="62" y2="38" opacity="0.6" strokeDasharray="3,3" />
                                            {/* Heavy metal cauldron body */}
                                            <path d="M 28 38 C 28 72, 72 72, 72 38 Z" />
                                            <path d="M 28 38 Q 50 25 72 38" />
                                            {/* Central cross icon */}
                                            <line x1="50" y1="46" x2="50" y2="58" />
                                            <line x1="44" y1="52" x2="56" y2="52" />
                                            {/* Weight base */}
                                            <circle cx="50" cy="72" r="3.5" />
                                          </svg>
                                        )}
                                        {p.silhouette === "refectory_plinth" && (
                                          <svg viewBox="0 0 100 100" className="w-16 h-16 stroke-current fill-none opacity-50 transition-all duration-500 group-hover:scale-105" strokeWidth="1.2">
                                            {/* Thick raw wood/limestone monolithic table top */}
                                            <polygon points="12,38 88,38 78,50 22,50" />
                                            {/* Solid columns stone block legs */}
                                            <path d="M 26 50 L 26 82 L 38 82 L 38 50 Z" />
                                            <path d="M 62 50 L 62 82 L 74 82 L 74 50 Z" />
                                            {/* Floor plate limit lines */}
                                            <line x1="8" y1="82" x2="92" y2="82" />
                                            {/* Brutalist sacred geometry guidelines */}
                                            <path d="M 50 15 L 50 82" strokeDasharray="2,3" className="opacity-30" />
                                            <circle cx="50" cy="44" r="10" strokeDasharray="2,3" className="opacity-30" />
                                          </svg>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  <div 
                                    className="flex justify-between items-center font-mono text-[9.5px] uppercase pt-2 border-t"
                                    style={{ borderTopColor: `${selectedTemplate.textColor}1A` }}
                                  >
                                    <span className="font-bold text-xs">{p.price}</span>
                                    <span className="opacity-70 bg-current/5 px-2 py-0.5 text-[8.5px] rounded border border-current/10">
                                      {p.tag}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {activePreviewSection === "story" && (
                          <motion.div 
                            key="story"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6 max-w-xl mx-auto w-full"
                          >
                            <span className="font-mono text-[9px] tracking-[0.2em] block uppercase opacity-80 border-b border-current/15 pb-2 font-bold">
                              / BRAND PHILOSOPHY & DNA CONCEPT
                            </span>

                            <div className="space-y-5">
                              <div>
                                <span className="font-mono text-[8.5px] uppercase opacity-60 block">Design Philosophy:</span>
                                <h4 className="font-sans font-bold text-xs uppercase text-inherit tracking-widest">{selectedTemplate.story.concept}</h4>
                              </div>

                              <p className="text-[11px] font-light leading-relaxed opacity-85">
                                {selectedTemplate.story.details}
                              </p>

                              <p className="text-[11px] font-light leading-relaxed opacity-85 italic">
                                <strong>Sensory Triggers:</strong> {selectedTemplate.story.trigger}
                              </p>

                              <div className="text-right pt-2 font-mono text-[10px] tracking-widest opacity-70">
                                {selectedTemplate.story.heritage}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {activePreviewSection === "footer" && (
                          <motion.div 
                            key="footer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8 w-full border-t border-current/15 pt-6"
                          >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                              <div className="space-y-1">
                                <span className="font-sans font-extrabold text-[#111111] text-xs uppercase block tracking-wider">
                                  {customTitle || selectedTemplate.title}
                                </span>
                                <p className="text-[10.5px] font-light opacity-80 max-w-sm">{selectedTemplate.footer.tagline}</p>
                              </div>

                              <div className="space-y-1 font-mono text-right text-[10px]">
                                <span className="block opacity-70">{selectedTemplate.footer.coordinates}</span>
                                <span className="block text-[8.5px] opacity-65">{selectedTemplate.footer.copyright}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Sticky navigation helper row at the base of the iframe */}
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-white border-t border-neutral-150 flex justify-between items-center text-[10px] text-neutral-400 font-sans z-10">
                      <span>Live Sandbox compiling output active</span>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-pulse" />
                        <span className="text-neutral-600 font-mono text-[9px] uppercase font-bold">Ready</span>
                      </div>
                    </div>

                  </div>
                ) : (
                  
                  /* RAW STANDALONE CODE BLOCK VIEWER */
                  <div className="w-full bg-[#1e1e1e] border border-neutral-800 rounded-2xl overflow-hidden shadow-xl text-left font-mono">
                    
                    {/* Console header bar */}
                    <div className="bg-[#151515] px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-neutral-400" />
                        <span className="text-neutral-300 text-xs font-bold leading-none">InteractiveAtelier.tsx</span>
                      </div>

                      <button
                        onClick={handleCopyCode}
                        className="px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#383838] rounded-lg text-[10px] text-zinc-300 hover:text-white transition cursor-pointer flex items-center gap-1 border border-neutral-700 font-bold"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY CODE</span>
                      </button>
                    </div>

                    {/* Preformatted highlight representation block */}
                    <pre className="p-6 text-xs text-neutral-300 overflow-x-auto leading-relaxed max-h-[500px] select-text">
                      <code>{getMockCodeString()}</code>
                    </pre>

                    {/* base info labels */}
                    <div className="bg-[#151515] px-4 py-2 border-t border-neutral-850 text-[10px] text-neutral-500 text-right">
                      Format: React Functional Component • Total size: ~1.4KB
                    </div>

                  </div>
                )}

              </div>

            </div>

          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* 🧬 BRAND GENOME LUXURY DRAWER SHEET OVERLAY */}
      <AnimatePresence>
        {genomeDetailTarget && (() => {
          const gene = resolveTemplateGenome(genomeDetailTarget);
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 select-none"
              onClick={() => setGenomeDetailTarget(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.98 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white border border-neutral-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar shadow-2xl flex flex-col text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-10 border-b border-neutral-100 flex justify-between items-start bg-neutral-50/50">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-[#B59F82] uppercase font-bold block">
                      🧬 ARCHITECTURAL BRAND GENOME PROFILE
                    </span>
                    <h3 className="font-sans font-black text-xl text-neutral-900 uppercase tracking-tight">
                      {genomeDetailTarget.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500 font-sans font-light">
                      Curated style taxonomy, design philosophy curves, and interaction dynamics definition.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      logAction(`Storefront: Dismissed Brand Genome interactive overlay.`);
                      setGenomeDetailTarget(null);
                    }}
                    className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-black hover:border-neutral-400 transition cursor-pointer text-xl leading-none"
                  >
                    ×
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-8 space-y-6 flex-1 overflow-y-auto">
                  
                  {/* Row 1: Taxonomy & Brand Archetype */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-50 p-4 border border-neutral-200/60 rounded-2xl space-y-2">
                      <span className="text-[8.5px] font-mono font-bold text-neutral-400 block uppercase tracking-wider">
                        STYLE TAXONOMY:
                      </span>
                      <p className="font-sans font-extrabold text-[#111111] text-xs uppercase">
                        {gene.stylePreset} PRESET
                      </p>
                      <span className="text-[9.5px] text-neutral-500 block leading-relaxed">
                        Enforces precise grid boundaries, shape curves limitations, and layout element densities inside the builder environment.
                      </span>
                    </div>

                    <div className="bg-neutral-50 p-4 border border-neutral-200/60 rounded-2xl space-y-2">
                      <span className="text-[8.5px] font-mono font-bold text-neutral-400 block uppercase tracking-wider">
                        MOOD TAXONOMY:
                      </span>
                      <p className="font-sans font-extrabold text-[#111111] text-xs uppercase">
                        {gene.moodPreset} DIRECTION
                      </p>
                      <span className="text-[9.5px] text-neutral-500 block leading-relaxed">
                        Defines contrast indexes, empty canvas voids ratio targets, and filters neon or cheap colorful saturation overflows.
                      </span>
                    </div>
                  </div>

                  {/* SECTION A: SEMANTIC GENOME & STORY BOARD */}
                  <div className="border border-neutral-200/80 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                      <span className="text-sm">📝</span>
                      <h4 className="font-sans font-bold text-xs uppercase text-neutral-800 tracking-wider">
                        Semantic Genome & Storyline
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-neutral-700">
                      <div className="space-y-1">
                        <span className="font-mono text-[8px] uppercase text-neutral-450 font-bold block">Archetype Archeology:</span>
                        <p className="font-semibold text-neutral-900">{gene.semantic_dna.archetype}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="font-mono text-[8px] uppercase text-neutral-450 font-bold block">Aesthetic Value Pillars:</span>
                        <p className="font-semibold text-neutral-900 leading-snug">{gene.semantic_dna.valueProps.join(" • ")}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="font-mono text-[8px] uppercase text-neutral-450 font-bold block">Design Genesis Source:</span>
                        <p className="text-neutral-600 leading-relaxed">{gene.semantic_dna.inspirationSource}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="font-mono text-[8px] uppercase text-neutral-450 font-bold block">Suited Emotional Expression:</span>
                        <p className="text-neutral-600 leading-relaxed">{gene.semantic_dna.emotionalExpression}</p>
                      </div>
                    </div>

                    {/* MOODBOARD COLOR SWATCHES */}
                    <div className="pt-3 border-t border-neutral-100 space-y-2.5">
                      <span className="font-mono text-[8px] uppercase text-neutral-450 font-bold block">Inspirational Moodboard Swatches:</span>
                      <div className="flex flex-wrap items-center gap-4">
                        {gene.semantic_dna.moodboardSwatches.map((hex, i) => (
                          <div key={hex + i} className="flex items-center gap-2.5 bg-neutral-50 border border-neutral-200/60 p-1.5 rounded-xl font-mono text-[8.5px]">
                            <div className="w-6 h-6 rounded-lg border border-neutral-300 shadow-sm" style={{ backgroundColor: hex }} />
                            <div>
                              <p className="font-bold text-neutral-800">{hex}</p>
                              <span className="text-[7px] tracking-tight opacity-50 block uppercase">Color {i + 1}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SECTION B: BEHAVIORAL INTERACTIVE GENOME */}
                  <div className="border border-neutral-200/80 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
                      <span className="text-sm">⚙️</span>
                      <h4 className="font-sans font-bold text-xs uppercase text-neutral-800 tracking-wider">
                        Behavioral Animation & Interaction Blueprints
                      </h4>
                    </div>

                    <div className="space-y-3 font-sans text-xs">
                      <div>
                        <span className="font-mono text-[8px] uppercase text-neutral-450 font-bold block mb-1">Interaction Micro-Patterns:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {gene.behavioral_dna.interactionPatterns.map((pt, i) => (
                            <span key={pt + i} className="bg-neutral-50 border border-neutral-200/60 px-2 py-0.5 rounded text-[10px] text-neutral-700">
                              • {pt}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-mono text-[8px] uppercase text-neutral-450 font-bold block mb-1">Cubic-Bezier Curves & Mass Spring Specs:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {gene.behavioral_dna.animationCurves.map((cr, i) => (
                            <span key={cr + i} className="bg-neutral-50 border border-neutral-200/60 px-2.5 py-0.5 rounded text-[10px] text-neutral-700 font-mono">
                              friction: {cr}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-mono text-[8px] uppercase text-neutral-450 font-bold block mb-1">Micro Interaction Target:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {gene.behavioral_dna.microInteractions.map((mi, i) => (
                            <span key={mi + i} className="bg-neutral-50 border border-neutral-200/60 px-2 py-0.5 rounded text-[10px] text-neutral-750">
                              ⚡ {mi}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2.5 border-t border-neutral-50 grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-mono text-[8px] uppercase text-neutral-450 font-bold block">Grid Division Constant:</span>
                          <span className="font-mono text-neutral-700 block font-extrabold mt-0.5">{gene.behavioral_dna.gridRatios}</span>
                        </div>
                        <div>
                          <span className="font-mono text-[8px] uppercase text-neutral-450 font-extrabold block">Required Minimum Void Ratio:</span>
                          <span className="font-mono text-neutral-700 block font-extrabold mt-0.5">{genomeDetailTarget.bgColor === "#171614" ? "75%" : "60%"} Air Breathing Constraint</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between font-mono text-[9px] rounded-b-3xl">
                  <span className="text-neutral-400 uppercase">GENOME ENFORCED DIRECTLY BY WHITE COSMOS LUXURY ENGINE</span>
                  <button
                    onClick={() => setGenomeDetailTarget(null)}
                    className="px-4 py-2 bg-neutral-950 text-white hover:bg-neutral-800 rounded-xl font-bold uppercase transition active:scale-95 cursor-pointer"
                  >
                    DISMISS BLUEPRINT
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
      
    </div>
  );
}
