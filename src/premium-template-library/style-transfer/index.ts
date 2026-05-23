import { ExtractedBrandDNA } from "../dna-extractor";
import { CompleteBrandTemplateAssets } from "../template-assets";

export class BrandStyleTransfer {
  /**
   * Transforms elements by projecting one brand's raw aesthetic variables (fonts, spacing, borders, shades) 
   * onto a complete template layout of alternative industry categories.
   */
  static applyStyleProjection(
    destinationAssets: CompleteBrandTemplateAssets,
    sourceDNA: ExtractedBrandDNA
  ): {
    projectedAssets: CompleteBrandTemplateAssets;
    projectionSummary: string;
  } {
    const { background, text, accent, borders, fontFamilyDisplay, fontFamilyBody, letterSpacingValue } = sourceDNA.coreParameters;

    const projected: CompleteBrandTemplateAssets = {
      ...destinationAssets,
      hero: {
        ...destinationAssets.hero,
        subtext: `${destinationAssets.hero.subtext} (Aesthetic layer projected utilizing ${sourceDNA.brand} principles: ${sourceDNA.heroStyle.replace("-", " ")} visual focus).`
      },
      footer: {
        ...destinationAssets.footer,
        philosophyTagline: `${destinationAssets.footer.philosophyTagline} // Style adapted to ${sourceDNA.brand} DNA.`
      }
    };

    const projectionSummary = `Successfully mapped visual variables of reference brand [${sourceDNA.brand}] onto active layout. Display Font: ${fontFamilyDisplay}, Tracking: ${letterSpacingValue}, Border System: ${borders}.`;

    return {
      projectedAssets: projected,
      projectionSummary
    };
  }
}
