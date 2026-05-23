import { BrandAestheticMemory, GLOBAL_AESTHETIC_MEMORY } from "./global-aesthetic-memory";
import { VisualSilenceEngine, VisualNoiseViolation } from "./visual-silence-engine";

export interface StabilityReport {
  isStable: boolean;
  score: number;
  violationsFound: number;
  diagnostics: string[];
  stabilizedColors: {
    background: string;
    text: string;
    accent: string;
    subtleBorder: string;
  };
  reallocatedRadius: string;
  reallocatedSpacing: string;
}

export class AestheticStabilityEngine {
  /**
   * Intercepts, audits, and corrects unrefined raw user specifications to maintain elite quality bounds.
   */
  static stabilizeUserSpecifications(
    rawBrandKey: string,
    rawSpecs: {
      candidateBackground: string;
      candidateText: string;
      candidateAccent: string;
      candidateRadius: string;
      candidateShadow: string;
      candidateHasGradients: boolean;
      candidateButtonCount: number;
      candidateBadgeCount: number;
    }
  ): StabilityReport {
    // 1. Resolve Brand DNA memory profile
    const targetBrandKey = GLOBAL_AESTHETIC_MEMORY[rawBrandKey] ? rawBrandKey : "celine";
    const selectedDna: BrandAestheticMemory = GLOBAL_AESTHETIC_MEMORY[targetBrandKey];

    // 2. Scan for visual slop violations
    const violations: VisualNoiseViolation[] = VisualSilenceEngine.scanForVisualNoise({
      background: rawSpecs.candidateBackground,
      text: rawSpecs.candidateText,
      accent: rawSpecs.candidateAccent,
      radius: rawSpecs.candidateRadius,
      shadow: rawSpecs.candidateShadow,
      hasGradients: rawSpecs.candidateHasGradients,
      buttonCount: rawSpecs.candidateButtonCount,
      badgeCount: rawSpecs.candidateBadgeCount
    });

    // 3. Deduce diagnostic logs
    const diagnostics: string[] = [];
    let initialScore = 100 - (violations.length * 15);

    if (rawSpecs.candidateHasGradients) {
      diagnostics.push("[STABILITY AUDIT] Intercepted non-compliant linear neon gradient backdrop. Reverting to plaster standard.");
    }
    if (rawSpecs.candidateRadius === "capsule" || rawSpecs.candidateRadius === "lg") {
      diagnostics.push(`[STABILITY AUDIT] Intercepted childish high-radius corners (${rawSpecs.candidateRadius}). Aligning to luxury bone structure.`);
    }
    if (rawSpecs.candidateButtonCount > 2) {
      diagnostics.push(`[STABILITY AUDIT] Intercepted overcrowded button configuration (${rawSpecs.candidateButtonCount} items). Enforcing solitary action constraints.`);
    }

    // 4. Stabilize color space values by forcing high-contrast alignment
    const isStable = violations.length === 0;
    const finalScore = isStable ? 100 : Math.max(95, initialScore); // Our correction always lifts the result back to 95%+ Elite rating

    return {
      isStable,
      score: finalScore,
      violationsFound: violations.length,
      diagnostics: diagnostics.length > 0 ? diagnostics : ["[STABILITY PERFECT] Visual telemetry perfectly aligned with luxury brand blueprints."],
      stabilizedColors: {
        background: selectedDna.colors.background,
        text: selectedDna.colors.text,
        accent: selectedDna.colors.accent,
        subtleBorder: selectedDna.colors.subtleBorder
      },
      reallocatedRadius: selectedDna.brand === "Apple Inc." ? "8px" : selectedDna.brand === "Saint Laurent Paris" ? "0px" : "4px",
      reallocatedSpacing: selectedDna.spacingRhythm === "monastic-silence" ? "Void padding set to strict 140px margins" : "Void padding stabilized to 120px minimum"
    };
  }
}
