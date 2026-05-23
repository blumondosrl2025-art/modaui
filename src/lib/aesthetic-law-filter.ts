/**
 * Aesthetic Law Filter (绝对审美限制器)
 * Constrains, filters, and rectifies generated brand properties and class lists
 * to enforce elite luxury storefront rules. Supports both DOM-level and model-metadata-level corrections.
 */

import { SingularityBrand } from "../types";

export interface VisualNoiseDetection {
  hasCheapGradients: boolean;
  hasExcessiveCorners: boolean;
  hasLowContrast: boolean;
  hasCrowdedLayout: boolean;
  hasInconsistentSpacing: boolean;
  score: number; // 0-100
}

export interface LawCorrectionReport {
  rectifiedBrand: SingularityBrand;
  violations: string[];
}

// 1. Model / Brand State Rectification (Automated Backend Filter)
export function enforceAestheticLaws(brand: SingularityBrand): LawCorrectionReport {
  const violations: string[] = [];
  const rectified = { ...brand };

  // Anti-Cheap Gradient Law
  let hasCheapGradient = false;
  if (rectified.colors.background && (
    rectified.colors.background.startsWith("linear-gradient") || 
    rectified.colors.background.includes("to-r") || 
    rectified.colors.background.includes("from-purple")
  )) {
    hasCheapGradient = true;
    rectified.colors.background = "#FAF9F6"; // Restored to high-contrast sand alabaster
  }

  if (hasCheapGradient) {
    violations.push("ANTI-CHEAP-GRADIENT: Suppressed highly saturated neon gradients. Restored architectural flat matte finish.");
  }

  // CTA Density Limiter
  if (rectified.products) {
    rectified.products = rectified.products.map(prod => {
      let isNoisy = false;
      let cleanDesc = prod.description;
      if (prod.description.includes("!!!") || prod.description.includes("BUY NOW")) {
        isNoisy = true;
        cleanDesc = prod.description.replace(/!!!/g, ".").replace(/BUY NOW/i, "Acquire article");
      }
      if (isNoisy) {
        violations.push(`CTA-HYPERACTIVITY: Trimmed loud marketing exclamation marks/CTA caps inside product "${prod.name}"`);
      }
      return {
        ...prod,
        description: cleanDesc
      };
    });
  }

  // Spacing Repair & Density Laws
  const tier = rectified.brandUnderstanding?.luxuryTier || "high-end";
  if (tier === "ultra-luxury") {
    if (rectified.designTokens) {
      if (rectified.designTokens.spacingMax === "gap-8" || rectified.designTokens.spacingMax === "gap-12") {
        rectified.designTokens.spacingMax = "gap-24";
        violations.push("SPACING-REPAIR: Enlarged breathing margins (gap-24) to match ultra-luxury negative space rules.");
      }
    }
  }

  // Typography Harmonization
  const allowedDisplay = ["Space Grotesk", "Playfair Display", "Outfit", "Didot", "Cormorant Garamond", "Cinzel"];
  const currentDisplay = rectified.typography.display;
  let isHarmonized = false;
  
  const foundAllowed = allowedDisplay.find(f => currentDisplay.toLowerCase().includes(f.toLowerCase()));
  if (!foundAllowed) {
    rectified.typography.display = "Space Grotesk"; // Stabilized Display
    isHarmonized = true;
  }
  
  if (isHarmonized) {
    violations.push(`TYPOGRAPHY-HARMONIZATION: Harmonized display font '${currentDisplay}' to elite-proven Space Grotesk layout engine.`);
  }

  // Visual Ambient Noise Guard
  if (rectified.designTokens && rectified.designTokens.surfaceNoise > 0.08) {
    rectified.designTokens.surfaceNoise = 0.03;
    violations.push("ANTI-NOISE-LEVEL: Capped custom noise texture frequency under 3% density to prevent screen clutter.");
  }

  return {
    rectifiedBrand: rectified,
    violations
  };
}

// 2. DOM-level Visual Noise & Aesthetic Law Application (Direct DOM Helpers)
export function detectVisualNoise(element: HTMLElement): VisualNoiseDetection {
  if (!element) {
    return {
      hasCheapGradients: false,
      hasExcessiveCorners: false,
      hasLowContrast: false,
      hasCrowdedLayout: false,
      hasInconsistentSpacing: false,
      score: 100
    };
  }

  const computedStyle = window.getComputedStyle(element);
  const children = Array.from(element.children) as HTMLElement[];
  
  let issues = 0;
  const detection: VisualNoiseDetection = {
    hasCheapGradients: false,
    hasExcessiveCorners: false,
    hasLowContrast: false,
    hasCrowdedLayout: false,
    hasInconsistentSpacing: false,
    score: 100
  };
  
  // 1. Detect Cheap Gradients
  const background = computedStyle.backgroundImage || "";
  if (background.includes("linear-gradient") || background.includes("radial-gradient")) {
    detection.hasCheapGradients = true;
    issues++;
  }
  
  // 2. Detect Excessively Rounded Corners
  const borderRadius = computedStyle.borderRadius || "";
  if (borderRadius !== "0px" && borderRadius !== "" && parseInt(borderRadius) > 12) {
    detection.hasExcessiveCorners = true;
    issues++;
  }
  
  // 3. Detect Insufficient Contrast / Redundant Tone
  const bgColor = computedStyle.backgroundColor;
  const textColor = computedStyle.color;
  if (bgColor && textColor && bgColor === textColor) {
    detection.hasLowContrast = true;
    issues++;
  }
  
  // 4. Detect Crowded Layout
  const childCount = children.length;
  const elementWidth = element.offsetWidth;
  const avgChildWidth = childCount > 0 ? children.reduce((sum, child) => sum + child.offsetWidth, 0) / childCount : 0;
  
  if (childCount > 3 && (elementWidth / childCount) < (avgChildWidth * 1.5)) {
    detection.hasCrowdedLayout = true;
    issues++;
  }
  
  // 5. Detect Inconsistent Spacing
  if (children.length > 2) {
    const firstMargin = parseInt(window.getComputedStyle(children[0]).marginBottom || "0");
    const inconsistencies = children.slice(1).filter((child) => {
      const childStyle = window.getComputedStyle(child);
      const margin = parseInt(childStyle.marginTop || "0");
      return Math.abs(margin - firstMargin) > 4; // 4px tolerance margin of error
    }).length;
    
    if (inconsistencies > 1) {
      detection.hasInconsistentSpacing = true;
      issues++;
    }
  }
  
  detection.score = Math.max(0, 100 - (issues * 20));
  return detection;
}

export function applyLuxurySpacing(element: HTMLElement, minMargin: number = 120): void {
  const style = element.style;
  
  // Force spatial breathing margins
  if (!style.margin || parseInt(style.margin) < minMargin) {
    style.margin = `${minMargin}px auto`;
  }
  
  if (!style.padding || parseInt(style.padding) < minMargin / 2) {
    style.padding = `${Math.floor(minMargin / 2)}px`;
  }
  
  if (!style.lineHeight || parseFloat(style.lineHeight) < 1.7) {
    style.lineHeight = "1.8";
  }
}

export function harmonizeTypography(element: HTMLElement): void {
  const style = element.style;
  
  if (!style.letterSpacing || style.letterSpacing === "normal") {
    style.letterSpacing = "0.08em";
  }
  
  if (!style.fontFamily) {
    style.fontFamily = "'Space Grotesk', 'Playfair Display', 'Didot', sans-serif";
  }
  
  style.textDecoration = "none";
  style.fontWeight = "300";
}

export function removeCheapGradients(element: HTMLElement): void {
  const style = element.style;
  if (style.backgroundImage && style.backgroundImage.includes("gradient")) {
    style.backgroundImage = "none";
  }
}

export function limitCTADensity(element: HTMLElement, maxCTAs: number = 2): void {
  const ctas = element.querySelectorAll("button, a, .cta");
  if (ctas.length > maxCTAs) {
    Array.from(ctas).slice(maxCTAs).forEach((cta: Element) => {
      const el = cta as HTMLElement;
      el.style.opacity = "0.2";
      el.style.pointerEvents = "none";
    });
  }
}

export function applyAestheticLaws(
  element: HTMLElement, 
  luxuryTier: "ultra" | "premium" | "editorial" | "commercial" = "premium"
): VisualNoiseDetection {
  const noise = detectVisualNoise(element);
  
  const minMargin = luxuryTier === "ultra" ? 160 : 
                    luxuryTier === "premium" ? 120 : 
                    luxuryTier === "editorial" ? 90 : 60;
  
  applyLuxurySpacing(element, minMargin);
  harmonizeTypography(element);
  removeCheapGradients(element);
  
  if (luxuryTier !== "commercial") {
    limitCTADensity(element, luxuryTier === "ultra" ? 1 : 2);
  }
  
  return noise;
}

export function batchAestheticFilter(elements: HTMLElement[]): void {
  elements.forEach(element => {
    const tier = (element.getAttribute("data-luxury-tier") as any) || "premium";
    applyAestheticLaws(element, tier);
  });
}

// Keep backward compatibility for helper
export function applyAestheticLawsToConfig(config: Record<string, any>, tier: string): Record<string, any> {
  const cleaned = { ...config };
  if (cleaned.ctaText && (cleaned.ctaText.includes("!!!") || cleaned.ctaText.includes("BUY NOW"))) {
    cleaned.ctaText = "Acquire article";
  }
  return cleaned;
}
