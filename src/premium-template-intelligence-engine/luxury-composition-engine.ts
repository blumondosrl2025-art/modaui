export interface GridCompositionSpecs {
  gridColumns: "grid-cols-1" | "grid-cols-12" | "grid-cols-3";
  leftColumnSpan: string; // e.g. "col-span-12 xl:col-span-7"
  rightColumnSpan: string;
  alignment: "text-center" | "text-left" | "text-right";
  contentSymmetry: "asymmetric-left" | "symmetric-center" | "asymmetric-staggered";
  aspectRatio: "aspect-[3/4]" | "aspect-square" | "aspect-video";
  emptySpaceWeight: string; // Percentage of the layout block left empty
  focalDepth: "deep-focus" | "flat-monochromatic" | "sculptural-parallax";
}

export class LuxuryCompositionEngine {
  /**
   * Generates composition geometry based on the style mood of the brand.
   */
  static recurateLayoutGeometry(brandKey: string): GridCompositionSpecs {
    switch (brandKey) {
      case "celine":
      case "the_row":
        return {
          gridColumns: "grid-cols-12",
          leftColumnSpan: "col-span-12 xl:col-span-8 pr-12 xl:pr-24",
          rightColumnSpan: "col-span-12 xl:col-span-4 flex justify-end items-end",
          alignment: "text-left",
          contentSymmetry: "asymmetric-left",
          aspectRatio: "aspect-[3/4]", // classic high-fashion portrait crop
          emptySpaceWeight: "75% raw emptiness (The Silence Ratio)",
          focalDepth: "flat-monochromatic"
        };
      
      case "apple":
        return {
          gridColumns: "grid-cols-1",
          leftColumnSpan: "col-span-12 max-w-2xl mx-auto",
          rightColumnSpan: "col-span-12 max-w-lg mx-auto mt-10",
          alignment: "text-center",
          contentSymmetry: "symmetric-center",
          aspectRatio: "aspect-video", // broad landscape product focus
          emptySpaceWeight: "58% breathing dome space",
          focalDepth: "sculptural-parallax"
        };

      case "bottega_veneta":
      case "saint_laurent":
        return {
          gridColumns: "grid-cols-12",
          leftColumnSpan: "col-span-12 xl:col-span-6 relative border-r border-[#242424] pr-12 py-10",
          rightColumnSpan: "col-span-12 xl:col-span-6 pl-12 py-10 self-center",
          alignment: "text-left",
          contentSymmetry: "asymmetric-staggered",
          aspectRatio: "aspect-square",
          emptySpaceWeight: "62% heavy industrial void",
          focalDepth: "deep-focus"
        };

      default:
        // Default classic minimalist guidelines
        return {
          gridColumns: "grid-cols-12",
          leftColumnSpan: "col-span-12 xl:col-span-7",
          rightColumnSpan: "col-span-12 xl:col-span-5",
          alignment: "text-left",
          contentSymmetry: "asymmetric-left",
          aspectRatio: "aspect-[3/4]",
          emptySpaceWeight: "50% split focus space",
          focalDepth: "flat-monochromatic"
        };
    }
  }

  /**
   * Helper calculation to verify if layout conforms to Golden Section ratio limits.
   */
  static verifyGoldenProportion(contentWidthPx: number, totalContainerWidthPx: number): {
    actualRatio: number;
    conforms: boolean;
    deviation: number;
  } {
    const actualRatio = contentWidthPx / totalContainerWidthPx;
    const goldenRatio = 0.618;
    const deviation = Math.abs(actualRatio - goldenRatio);
    return {
      actualRatio,
      conforms: deviation <= 0.1, // deviation less than 10%
      deviation
    };
  }
}
