export interface ScalePreset {
  displaySize: string; // e.g. text-5xl (48px) to text-7xl (72px)
  displayWeight: string; // e.g. font-light, font-thin
  displayTransform: string; // uppercase, lowercase, normal-case
  tracking: string; // tracking-widest, tracking-[0.35em]
  bodySize: string; // text-xs, text-sm
  bodyLeading: string; // leading-loose, leading-relaxed
  idealParagraphWordLimit: number;
}

export const LUXURY_TYPO_PRESETS: Record<string, ScalePreset> = {
  saint_laurent_regime: {
    displaySize: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
    displayWeight: "font-normal",
    displayTransform: "uppercase",
    tracking: "tracking-[0.42em]", // ultra wide space stance
    bodySize: "text-[11px]",
    bodyLeading: "leading-[1.75]",
    idealParagraphWordLimit: 22
  },
  celine_poetics: {
    displaySize: "text-3xl md:text-5xl lg:text-6xl",
    displayWeight: "font-light",
    displayTransform: "normal-case",
    tracking: "tracking-[0.22em]",
    bodySize: "text-[12px]",
    bodyLeading: "leading-relaxed",
    idealParagraphWordLimit: 26
  },
  apple_rational: {
    displaySize: "text-4xl md:text-5xl lg:text-5xl xl:text-6xl",
    displayWeight: "font-semibold",
    displayTransform: "normal-case",
    tracking: "tracking-tight",
    bodySize: "text-[14px]",
    bodyLeading: "leading-relaxed",
    idealParagraphWordLimit: 40
  },
  aesop_literary: {
    displaySize: "text-2xl md:text-3xl lg:text-4xl",
    displayWeight: "font-light",
    displayTransform: "normal-case",
    tracking: "tracking-wide",
    bodySize: "text-[13px]",
    bodyLeading: "leading-loose",
    idealParagraphWordLimit: 32
  }
};

export class LuxuryTypographyIntelligence {
  /**
   * Refactors any raw string paragraph by cutting off visual fluff, conforming to the ideal word limits.
   */
  static applyWordDensityLimit(rawText: string, limit: number): string {
    const words = rawText.split(/\s+/);
    if (words.length <= limit) return rawText;
    return words.slice(0, limit).join(" ") + "...";
  }

  /**
   * Returns exact CSS classes for a typography scale selection.
   */
  static getTypoPreset(key: string): ScalePreset {
    return LUXURY_TYPO_PRESETS[key] || LUXURY_TYPO_PRESETS.celine_poetics;
  }
}
