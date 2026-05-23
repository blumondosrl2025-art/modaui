import { BrandAestheticMemory } from "./global-aesthetic-memory";

export interface VisualNoiseViolation {
  id: string;
  category: "gradient" | "color-overflow" | "badge-clutter" | "typography-noise" | "corner-noise";
  severity: "high" | "medium";
  description: string;
  remedy: string;
}

export interface PureStaticSpecs {
  background: string;
  text: string;
  accent: string;
  subtleBorder: string;
  borderRadius: string;
  shadingBg: string;
  buttonStyle: string;
  gradientNeutralized: boolean;
  densityScore: number; // Percentage of volume, ideal is below 30%
}

export class VisualSilenceEngine {
  /**
   * Scans a visual draft or set of UI properties for visual noise and generates a list of violations.
   */
  static scanForVisualNoise(specs: {
    background: string;
    text: string;
    accent: string;
    radius: string;
    shadow: string;
    hasGradients: boolean;
    buttonCount: number;
    badgeCount: number;
  }): VisualNoiseViolation[] {
    const violations: VisualNoiseViolation[] = [];

    if (specs.hasGradients) {
      violations.push({
        id: "v_gradient",
        category: "gradient",
        severity: "high",
        description: "Chaotic neon background gradient detected. Luxury design relies on physical plaster or clinical matte grounds.",
        remedy: "Neutralize background gradient into solid, rich off-whites or deep industrial charcoals."
      });
    }

    if (specs.radius === "capsule" || specs.radius === "lg") {
      violations.push({
        id: "v_radius",
        category: "corner-noise",
        severity: "medium",
        description: "Amateur high-curvature rounded corners detected, resembling bubbly children's toys.",
        remedy: "Flatten corner radius to either strict 0px (Celine) or meticulous subtle 4px to 8px max (Apple)."
      });
    }

    if (specs.buttonCount > 2) {
      violations.push({
        id: "v_badge",
        category: "badge-clutter",
        severity: "high",
        description: "Panic conversion: Multiple call-to-actions are screaming for user attention, lowering luxury scarcity value.",
        remedy: "Limit active CTA count to absolute maximum of 1 primary button, supplemented by 1 thin typographic prompt."
      });
    }

    if (specs.badgeCount > 1) {
      violations.push({
        id: "v_badge",
        category: "badge-clutter",
        severity: "medium",
        description: "Visual spam: Excessive high-contrast flash icons and promotional stickers corrupting display margins.",
        remedy: "Erase all animated promotional badges. Clean look relies on silent space to command respect."
      });
    }

    return violations;
  }

  /**
   * Enforces aesthetic silence on a dirty visual state using active Brand DNA.
   */
  static purgeVisualNoise(
    violations: VisualNoiseViolation[],
    dna: BrandAestheticMemory
  ): { Specs: PureStaticSpecs; logs: string[] } {
    const logs: string[] = [];
    
    logs.push(`[Silence Core] Purging ${violations.length} critical visual eye sores...`);
    
    // Purge bad color space, replace with brand standard
    const Specs: PureStaticSpecs = {
      background: dna.colors.background,
      text: dna.colors.text,
      accent: dna.colors.accent,
      subtleBorder: dna.colors.subtleBorder,
      borderRadius: dna.brand === "Apple Inc." ? "8px" : dna.brand === "Saint Laurent Paris" || dna.brand === "CELINE Paris" ? "0px" : "4px",
      shadingBg: dna.colors.shadingTone,
      buttonStyle: dna.brand === "Apple Inc." ? "rounded-md" : "border uppercase tracking-widest text-[9px]",
      gradientNeutralized: true,
      densityScore: dna.whitespaceRatio > 0.70 ? 12 : 22
    };

    violations.forEach(v => {
      if (v.category === "gradient") {
        logs.push(`[CLARITY] Solved layout gradient. Repositioned solid Plaster layer (${dna.colors.background}).`);
      }
      if (v.category === "corner-noise") {
        logs.push(`[STRUCTURE] Shaved amateur corner radius from bubble shape to architectural crisp (${Specs.borderRadius}).`);
      }
      if (v.category === "badge-clutter") {
        logs.push(`[RESTRAINT] Removed overlapping action buttons and flash banners. Scarcity principle applied.`);
      }
    });

    if (violations.length === 0) {
      logs.push("[Clarity Stable] No active architectural pollutants. Visual rest score is perfect.");
    }

    return { Specs, logs };
  }
}
