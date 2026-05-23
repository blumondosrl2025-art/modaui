import { CrawledSiteData } from "../site-crawler";

export interface ExtractedBrandDNA {
  brand: string;
  spacingClassification: "ultra-airy" | "dense" | "absolute-restraint";
  typographyClassification: "editorial-minimal" | "technical-geometric" | "historical-serif";
  heroStyle: "quiet-luxury" | "kinetic-tension" | "split-grid" | "cinematic-hero";
  visualDensity: "low" | "medium" | "high";
  ctaStyle: "silent-premium" | "solid-utilitarian" | "zero-gravity-asymmetric";
  whitespaceScore: number; 
  coreParameters: {
    background: string;
    text: string;
    accent: string;
    borders: string;
    fontFamilyDisplay: string;
    fontFamilyBody: string;
    letterSpacingValue: string;
  };
}

export class DNAExtractor {
  /**
   * Translates crawlers specs cleanly into calibrated Brand DNA specifications.
   */
  static extractDNA(crawled: CrawledSiteData): ExtractedBrandDNA {
    let spacingClassification: "ultra-airy" | "dense" | "absolute-restraint" = "ultra-airy";
    if (crawled.spacingSpecs.whitespaceRatio < 0.50) {
      spacingClassification = "dense";
    } else if (crawled.spacingSpecs.whitespaceRatio > 0.70) {
      spacingClassification = "absolute-restraint";
    }

    let typographyClassification: "editorial-minimal" | "technical-geometric" | "historical-serif" = "editorial-minimal";
    if (crawled.typography.displayFamily === "Playfair Display" || crawled.typography.displayFamily === "Lora") {
      typographyClassification = "historical-serif";
    } else if (crawled.typography.displayFamily === "Space Grotesk") {
      typographyClassification = "technical-geometric";
    }

    let heroStyle: "quiet-luxury" | "kinetic-tension" | "split-grid" | "cinematic-hero" = "quiet-luxury";
    if (crawled.layoutRhythm === "monastic-silence") {
      heroStyle = "quiet-luxury";
    } else if (crawled.layoutRhythm === "high-friction") {
      heroStyle = "kinetic-tension";
    } else if (crawled.layoutRhythm === "asymmetric-stagger") {
      heroStyle = "cinematic-hero";
    }

    return {
      brand: crawled.domain.split(".")[0].toUpperCase(),
      spacingClassification,
      typographyClassification,
      heroStyle,
      visualDensity: crawled.spacingSpecs.whitespaceRatio > 0.65 ? "low" : "medium",
      ctaStyle: crawled.layoutRhythm === "monastic-silence" ? "silent-premium" : "solid-utilitarian",
      whitespaceScore: Math.round(crawled.spacingSpecs.whitespaceRatio * 100),
      coreParameters: {
        background: crawled.colorPalette.background,
        text: crawled.colorPalette.text,
        accent: crawled.colorPalette.accent,
        borders: crawled.colorPalette.borders,
        fontFamilyDisplay: crawled.typography.displayFamily,
        fontFamilyBody: crawled.typography.bodyFamily,
        letterSpacingValue: crawled.typography.letterTracking
      }
    };
  }
}
