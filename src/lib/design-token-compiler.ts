import { LuxuryComponentProtocol } from "../protocols/luxury-component.protocol";

export interface LuxuryDesignTokens {
  // 视觉安静度系统
  silenceSystem: {
    ratio: number; // 0-1, 默认0.65
    minMargin: number; // px, 默认120
    sectionSpacing: number; // rem, 默认4
  };
  
  // 排版系统
  typography: {
    scale: number; // 1.125, 1.25, 1.333, 1.414, 1.5
    letterSpacing: number; // em, 默认0.05
    lineHeight: number; // 默认1.8
    fontStack: {
      display: string[];
      body: string[];
      mono: string[];
    };
  };
  
  // 材质语言
  materialLanguage: {
    primary: string;
    secondary: string;
    accent: string;
    surfaceTreatment: "matte" | "gloss" | "textured" | "translucent";
  };
  
  // 视觉密度
  visualDensity: {
    productGrid: "sparse" | "balanced" | "dense";
    imageSize: "oversized" | "theatrical" | "standard";
    whitespaceWeight: "heavy" | "medium" | "light";
  };
  
  // 动效系统
  motionSystem: {
    speed: "luxury-slow" | "cinematic" | "editorial" | "functional";
    curve: string; // CSS cubic-bezier
    transitionDelay: number; // ms
  };
  
  // 奢华等级
  luxuryTier: "ultra" | "premium" | "editorial" | "accessible-luxury";

  // 批发行业特定令牌
  wholesale?: {
    densityMultiplier: number;      // 稍高密度但仍优雅
    informationHierarchy: 'professional' | 'standard';
    interactionDepth: 'deep' | 'standard';
    dataVisibility: 'layered' | 'public';     // 信息分层显示
    moqEnabled: boolean;
  };

  // BACKWARD COMPATIBILITY FIELDS FOR STABLE COMPILATION
  luxury_tier: "ultra-luxury" | "high-end" | "niche-avantgarde";
  material_language: "brushed-brass" | "raw-ceramic" | "smoked-glass" | "obsidian" | "raw-linen" | "matte-black";
  silence_ratio: number;
  visual_density: "silent" | "spacious" | "standard";
  themeColors: {
    background: string;
    text: string;
    accent: string;
    subtle: string;
  };
}

// 品牌描述解析器
export function parseBrandDescription(description: string): {
  keywords: string[];
  materials: string[];
  mood: string[];
  targetAudience: string;
} {
  const normalized = description.toLowerCase();
  const materialKeywords = ["铜", "陶", "石", "木", "玻璃", "亚麻", "皮革", "brass", "ceramic", "glass", "linen", "clay", "obsidian"];
  const moodKeywords = ["安静", "神圣", "简约", "温暖", "冷峻", "戏剧", "minimal", "goth", "wabi", "avant-garde"];
  
  const materials = materialKeywords.filter(keyword => 
    normalized.includes(keyword)
  );
  
  const mood = moodKeywords.filter(keyword => 
    normalized.includes(keyword)
  );
  
  return {
    keywords: description.split(/[\s,，、]+/),
    materials,
    mood,
    targetAudience: "luxury-conscious"
  };
}

// 主编译器函数
export function compileDesignTokens(
  brandDescription: string,
  componentRequirements?: Partial<LuxuryComponentProtocol>
): LuxuryDesignTokens {
  const parsed = parseBrandDescription(brandDescription);
  const normalized = brandDescription.toLowerCase();
  
  // 1. Determine material selection
  let primaryMaterial: "brushed-brass" | "raw-ceramic" | "smoked-glass" | "obsidian" | "raw-linen" | "matte-black" = "raw-linen";
  if (normalized.includes("wabi") || normalized.includes("clay") || normalized.includes("ceramic") || normalized.includes("砂") || normalized.includes("泥") || parsed.materials.includes("陶")) {
    primaryMaterial = "raw-ceramic";
  } else if (normalized.includes("goth") || normalized.includes("rick") || normalized.includes("black") || normalized.includes("obsidian") || normalized.includes("黑")) {
    primaryMaterial = "obsidian";
  } else if (normalized.includes("brass") || normalized.includes("bronze") || normalized.includes("copper") || normalized.includes("铜") || parsed.materials.includes("铜")) {
    primaryMaterial = "brushed-brass";
  } else if (normalized.includes("glass") || normalized.includes("smoke") || normalized.includes("镜") || normalized.includes("玻璃") || parsed.materials.includes("玻璃")) {
    primaryMaterial = "smoked-glass";
  } else if (normalized.includes("matte") || normalized.includes("minimalist")) {
    primaryMaterial = "matte-black";
  }

  // 2. Set luxury tier & silence ratio
  let luxuryTier: "ultra" | "premium" | "editorial" | "accessible-luxury" = "premium";
  let luxury_tier: "ultra-luxury" | "high-end" | "niche-avantgarde" = "high-end";
  let silenceRatio = 0.75;
  let visual_density: "silent" | "spacious" | "standard" = "spacious";

  if (normalized.includes("ultra") || primaryMaterial === "raw-ceramic" || primaryMaterial === "brushed-brass") {
    luxuryTier = "ultra";
    luxury_tier = "ultra-luxury";
    silenceRatio = 0.88;
    visual_density = "silent";
  } else if (normalized.includes("avant") || primaryMaterial === "obsidian") {
    luxuryTier = "ultra";
    luxury_tier = "niche-avantgarde";
    silenceRatio = 0.82;
    visual_density = "silent";
  } else if (normalized.includes("editorial")) {
    luxuryTier = "editorial";
    luxury_tier = "high-end";
    silenceRatio = 0.80;
    visual_density = "spacious";
  }

  if (componentRequirements?.silenceRatio) {
    silenceRatio = componentRequirements.silenceRatio;
  }

  // 3. Default color palettes
  let background = "#FAF9F6"; // Alabaster/Oyster
  let text = "#111111";       // Charcoal
  let accent = "#4F5D4E";     // Sage Green
  let subtle = "rgba(17,17,17,0.04)";

  if (primaryMaterial === "obsidian" || primaryMaterial === "matte-black") {
    background = "#0A0A0A";
    text = "#ECEFF1";
    accent = "#888888";
    subtle = "rgba(255,255,255,0.05)";
  } else if (primaryMaterial === "raw-ceramic") {
    background = "#F5ECE1"; // Raw warm clay tone
    text = "#2C2621";
    accent = "#A05A42";     // Terracotta earth
    subtle = "rgba(44,38,33,0.05)";
  } else if (primaryMaterial === "brushed-brass") {
    background = "#FDFCF7";
    text = "#1E1A17";
    accent = "#C5A880";     // Gold patina
    subtle = "rgba(30,26,23,0.04)";
  } else if (primaryMaterial === "smoked-glass") {
    background = "#141619";
    text = "#F3F4F6";
    accent = "#90A4AE";
    subtle = "rgba(243,244,246,0.06)";
  }

  // 4. Automatically apply wholesale logic if matching keywords are found
  const isWholesale = normalized.includes("批发") || normalized.includes("b2b") || normalized.includes("wholesale") || normalized.includes("买手店") || normalized.includes("sku") || normalized.includes("面料");
  
  const tokens: LuxuryDesignTokens = {
    silenceSystem: {
      ratio: isWholesale ? Math.max(0.6, silenceRatio - 0.15) : silenceRatio, // Slate density calibration
      minMargin: isWholesale ? 80 : 120,
      sectionSpacing: isWholesale ? 3 : 4
    },
    
    typography: {
      scale: luxuryTier === "ultra" ? 1.25 : 1.125,
      letterSpacing: 0.08,
      lineHeight: 1.8,
      fontStack: {
        display: luxuryTier === "ultra" ? ["Didot", "Bodoni", "Cormorant Garamond", "serif"] : ["Space Grotesk", "Outfit", "sans-serif"],
        body: ["Inter", "Neue Haas Grotesk", "Helvetica Neue", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"]
      }
    },
    
    materialLanguage: {
      primary: primaryMaterial,
      secondary: "matte-black",
      accent: "brushed-brass",
      surfaceTreatment: primaryMaterial === "smoked-glass" ? "translucent" : "matte"
    },
    
    visualDensity: {
      productGrid: isWholesale ? "dense" : (silenceRatio > 0.8 ? "sparse" : "balanced"),
      imageSize: isWholesale ? "standard" : "oversized",
      whitespaceWeight: isWholesale ? "light" : "heavy"
    },
    
    motionSystem: {
      speed: luxuryTier === "ultra" ? "luxury-slow" : "cinematic",
      curve: "cubic-bezier(0.16, 1, 0.3, 1)",
      transitionDelay: 100
    },
    
    luxuryTier,

    // Backward compatibility mappings
    luxury_tier,
    material_language: primaryMaterial,
    silence_ratio: silenceRatio,
    visual_density: isWholesale ? "standard" : visual_density,
    themeColors: {
      background,
      text,
      accent,
      subtle
    }
  };

  if (isWholesale) {
    tokens.wholesale = {
      densityMultiplier: 1.3,
      informationHierarchy: "professional",
      interactionDepth: "deep",
      dataVisibility: "layered",
      moqEnabled: true
    };
  }

  return tokens;
}

// 批发行业专属设计令牌增强器
export function compileWholesaleTokens(description: string): LuxuryDesignTokens {
  const tokens = compileDesignTokens(description);
  
  if (description.includes("批发") || description.includes("B2B") || description.toLowerCase().includes("wholesale") || description.includes("买手") || description.includes("工坊")) {
    return {
      ...tokens,
      wholesale: {
        densityMultiplier: 1.3,      // 稍高密度但仍优雅
        informationHierarchy: 'professional',
        interactionDepth: 'deep',
        dataVisibility: 'layered',     // 信息分层显示
        moqEnabled: true
      }
    };
  }
  
  return tokens;
}

// 令牌应用函数
export function applyDesignTokens(
  element: HTMLElement,
  tokens: LuxuryDesignTokens
): void {
  const root = document.documentElement;
  
  root.style.setProperty("--luxury-silence-ratio", tokens.silenceSystem.ratio.toString());
  root.style.setProperty("--luxury-min-margin", `${tokens.silenceSystem.minMargin}px`);
  root.style.setProperty("--luxury-section-spacing", `${tokens.silenceSystem.sectionSpacing}rem`);
  
  root.style.setProperty("--luxury-typography-scale", tokens.typography.scale.toString());
  root.style.setProperty("--luxury-letter-spacing", `${tokens.typography.letterSpacing}em`);
  root.style.setProperty("--luxury-line-height", tokens.typography.lineHeight.toString());
  
  // Apply visual tag to the element
  element.setAttribute("data-luxury-tier", tokens.luxuryTier);
  element.setAttribute("data-material", tokens.materialLanguage.primary);
}

