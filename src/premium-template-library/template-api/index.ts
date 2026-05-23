import { SmartSiteCrawler, CrawledSiteData } from "../site-crawler";
import { DNAExtractor, ExtractedBrandDNA } from "../dna-extractor";
import { CompleteBrandTemplateAssets } from "../template-assets";
import { TemplateLibrary, TemplateCollectionProfile } from "../template-library";
import { IndustryPresets, IndustryPresetResult } from "../industry-presets";
import { LuxuryLawEngine, LawComplianceReport } from "../luxury-laws";
import { BrandStyleTransfer } from "../style-transfer";
import { PremiumEnhancer, EnhancementReport } from "../premium-enhancer";

export interface PremiumGeneratorOutput {
  query: string;
  match: IndustryPresetResult;
  dna: ExtractedBrandDNA;
  assets: CompleteBrandTemplateAssets;
  enhancement: EnhancementReport;
  derivedSpacingGapPx: number;
  compliance: LawComplianceReport;
  styleTransferLog?: string;
}

export class PremiumTemplateAPI {
  /**
   * Evaluates natural descriptions, invokes crawlers and DNA filters, runs luxury checks, 
   * adaptively projects styles, and builds a gorgeous commercial layout specification.
   */
  static generatePremiumTemplate(options: {
    query: string;
    targetStyleVibe?: string; // Optional manual override, e.g. "celine", "hermes"
    optimizeForSilence?: boolean;
  }): PremiumGeneratorOutput {
    // 1. Natural language matching to industry presets
    const matchResult = IndustryPresets.matchPhrase(options.query || "luxury apparel");

    // 2. Resolve default crawling reference domain
    const targetVibe = options.targetStyleVibe || matchResult.primaryProfile.underlyingDNAKey;
    const domainToCrawl = `${targetVibe.replace(".com", "")}.com`;

    // 3. Crawl reference domain
    const crawledSpecs = SmartSiteCrawler.crawlDomain(domainToCrawl);

    // 4. Extract design DNA parameters
    const extractedDNA = DNAExtractor.extractDNA(crawledSpecs);

    // 5. Build core templated schema
    const libraryResult = TemplateLibrary.generateTemplateStructure(matchResult.primaryProfile.categoryKey);

    // 6. Project style adapts onto templates
    const { projectedAssets, projectionSummary } = BrandStyleTransfer.applyStyleProjection(
      libraryResult.assets,
      extractedDNA
    );

    // 7. Core premium layout enhancements
    const enhancementSpecs = PremiumEnhancer.enhanceLayout({
      hasGradients: extractedDNA.coreParameters.background.includes("gradient") || false,
      buttonCount: libraryResult.assets.hero.primaryCtaLabel ? 2 : 1,
      badgeCount: 0,
      letterSpacing: extractedDNA.coreParameters.letterSpacingValue,
      whitespaceWeightPercent: extractedDNA.whitespaceScore
    });

    // 8. Design verification via Luxury Law Engine
    const complianceProfile = LuxuryLawEngine.enforceLuxuryRestraint({
      primaryPaddingPx: extractedDNA.coreParameters.background === "#FFFFFF" ? 120 : 90,
      colorsCount: extractedDNA.coreParameters.accent ? 3 : 2,
      hasGradients: false,
      buttonCorners: "none",
      whitespacePercent: extractedDNA.whitespaceScore,
      ctaQuantity: libraryResult.assets.hero.primaryCtaLabel ? 1 : 2
    });

    return {
      query: options.query,
      match: matchResult,
      dna: extractedDNA,
      assets: projectedAssets,
      enhancement: enhancementSpecs,
      derivedSpacingGapPx: libraryResult.profile.recommendedSpacingGapsPx,
      compliance: complianceProfile,
      styleTransferLog: projectionSummary
    };
  }
}
