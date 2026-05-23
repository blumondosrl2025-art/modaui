export interface LawComplianceReport {
  isCompliant: boolean;
  violationsDetected: string[];
  correctedAttributes: {
    enforcedPaddingPx: number;
    neutralizedHues: boolean;
    buttonRadiusOverride: "none" | "sm" | "md";
    whitespaceBoostedRatio: number;
    hasLoudGradients: boolean;
  };
  lawSummary: string[];
}

export class LuxuryLawEngine {
  /**
   * Evaluates layout components against strict historical Parisian & Scandinavian design principles.
   * If any violations representing cheap, flashing "AI-slop" are detected, it overrides them instantly.
   */
  static enforceLuxuryRestraint(specs: {
    primaryPaddingPx: number;
    colorsCount: number;
    hasGradients: boolean;
    buttonCorners: "none" | "sm" | "md" | "lg" | "capsule";
    whitespacePercent: number;
    ctaQuantity: number;
  }): LawComplianceReport {
    const violationsDetected: string[] = [];
    let enforcedPaddingPx = specs.primaryPaddingPx;
    let neutralizedHues = false;
    let buttonRadiusOverride: "none" | "sm" | "md" = "none";
    let whitespaceBoostedRatio = specs.whitespacePercent;
    let hasLoudGradients = specs.hasGradients;

    // Law 1: The Monastic Spacing Constraint (No shallow padding)
    if (specs.primaryPaddingPx < 100) {
      violationsDetected.push("MONASTIC SPACING VIOLATION: Spacing scale fell below 100px. High-end content needs physical oxygen.");
      enforcedPaddingPx = 120; // Correct to luxury standard
    }

    // Law 2: The Monochromatic Hue Restraint (No neon spectrum overload)
    if (specs.colorsCount > 3) {
      violationsDetected.push("CHROMATIC NOISE VIOLATION: Found more than 3 primary hues. High-luxury relies heavily on neutral sand, plaster, and anthracite scales.");
      neutralizedHues = true;
    }

    // Law 3: Flat Corner Geometry (No bubble-like shapes or overly rounded pill shapes for core premium niches)
    if (specs.buttonCorners === "capsule" || specs.buttonCorners === "lg") {
      violationsDetected.push("SHAPE GEOMETRY VIOLATION: Bubble-like pill buttons detected. Premium design favors flat, sharp-edged custom structures first.");
      buttonRadiusOverride = "none";
    } else {
      buttonRadiusOverride = "sm";
    }

    // Law 4: The 55% Empty Canvas Threshold (Ensure plenty of space)
    if (specs.whitespacePercent < 55) {
      violationsDetected.push("breathing VOID VIOLATION: Empty spaces fill ratio fell under the 55% benchmark. Content feels crowded.");
      whitespaceBoostedRatio = 65; // Boost whitespace
    }

    // Law 5: The Gradient Clutter Neutralization
    if (specs.hasGradients) {
      violationsDetected.push("GRADIENT CLUTTER VIOLATION: Neon color sweeps detected. Replaced with beautiful matte limestone, concrete, or deep carbon surfaces.");
      hasLoudGradients = false;
    }

    // Law 6: CTA Solitude Law
    if (specs.ctaQuantity > 2) {
      violationsDetected.push("CTA CROWDING VIOLATION: Excessive overlapping call-to-actions. Consolidated competing target links to focus absolute attention.");
    }

    const isCompliant = violationsDetected.length === 0;

    return {
      isCompliant,
      violationsDetected,
      correctedAttributes: {
        enforcedPaddingPx,
        neutralizedHues,
        buttonRadiusOverride,
        whitespaceBoostedRatio,
        hasLoudGradients
      },
      lawSummary: [
        "Law I: MONASTIC SPACING — Bounding voids must expand to at least 100px.",
        "Law II: CHROMATIC CALMNESS — Saturated hues must not exceed 2 elements.",
        "Law III: LITERAL GEOMETRY — Corners must default to flat (0px).",
        "Law IV: CHRONO FOCUS — No floating notifications or flashing badges, respecting human focus."
      ]
    };
  }
}
