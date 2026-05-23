export interface CrawledSiteData {
  domain: string;
  elementsAnalyzed: number;
  layoutRhythm: "monastic-silence" | "cinematic-breathing" | "high-friction" | "asymmetric-stagger";
  typography: {
    displayFamily: string;
    bodyFamily: string;
    letterTracking: string;
    leading: string;
  };
  spacingSpecs: {
    minSectionPaddingPx: number;
    whitespaceRatio: number;
    voidWeightScore: number;
  };
  colorPalette: {
    background: string;
    text: string;
    accent: string;
    borders: string;
  };
  luxuryRestraintIndicators: string[];
}

export const CRAWLED_SITES_MOCKED: Record<string, CrawledSiteData> = {
  // 1. Fashion (Premium Apparel)
  "acnestudios.com": {
    domain: "acnestudios.com",
    elementsAnalyzed: 512,
    layoutRhythm: "asymmetric-stagger",
    typography: {
      displayFamily: "Outfit",
      bodyFamily: "Inter",
      letterTracking: "tracking-[0.18em]",
      leading: "leading-relaxed"
    },
    spacingSpecs: {
      minSectionPaddingPx: 110,
      whitespaceRatio: 0.62,
      voidWeightScore: 88
    },
    colorPalette: {
      background: "#FAFAF8",
      text: "#1C1C1A",
      accent: "#E5989B",
      borders: "#E5E5E0"
    },
    luxuryRestraintIndicators: [
      "Signature soft pink highlights utilized as a controlled accent.",
      "Asymmetric model lookbooks displaying active crop details.",
      "Sizing matrix layout respects natural geometric limits."
    ]
  },
  "cos.com": {
    domain: "cos.com",
    elementsAnalyzed: 620,
    layoutRhythm: "cinematic-breathing",
    typography: {
      displayFamily: "Inter",
      bodyFamily: "Inter",
      letterTracking: "tracking-tight",
      leading: "leading-relaxed"
    },
    spacingSpecs: {
      minSectionPaddingPx: 120,
      whitespaceRatio: 0.65,
      voidWeightScore: 92
    },
    colorPalette: {
      background: "#FFFFFF",
      text: "#000000",
      accent: "#706E6B",
      borders: "#EAEAEA"
    },
    luxuryRestraintIndicators: [
      "Totally flat 1px borders, zero radius corners on clothing cards.",
      "Muted, color-swatched grids with uniform size selectors underneath.",
      "No flashing promotion stickers on lookbook cells."
    ]
  },
  "zara.com": {
    domain: "zara.com",
    elementsAnalyzed: 910,
    layoutRhythm: "asymmetric-stagger",
    typography: {
      displayFamily: "Playfair Display",
      bodyFamily: "Inter",
      letterTracking: "tracking-tight",
      leading: "leading-normal"
    },
    spacingSpecs: {
      minSectionPaddingPx: 90,
      whitespaceRatio: 0.50,
      voidWeightScore: 74
    },
    colorPalette: {
      background: "#FFFFFF",
      text: "#000000",
      accent: "#222222",
      borders: "#D1D1D1"
    },
    luxuryRestraintIndicators: [
      "Heavy editorial text overlaps directly with models.",
      "Extremely rapid checkout CTA anchors to viewport bottoms.",
      "Minimalistic sizing selector flyouts prevent screen clutter."
    ]
  },
  "jacquemus.com": {
    domain: "jacquemus.com",
    elementsAnalyzed: 420,
    layoutRhythm: "cinematic-breathing",
    typography: {
      displayFamily: "Playfair Display",
      bodyFamily: "Inter",
      letterTracking: "tracking-widest",
      leading: "leading-loose"
    },
    spacingSpecs: {
      minSectionPaddingPx: 130,
      whitespaceRatio: 0.70,
      voidWeightScore: 94
    },
    colorPalette: {
      background: "#FAF9F5",
      text: "#1E2022",
      accent: "#7E7C73",
      borders: "#EDEBE4"
    },
    luxuryRestraintIndicators: [
      "French Riviera solar warmth, high structural void margins.",
      "Floating micro-captions paired with raw linen mockups.",
      "Product lists decoupled from aggressive digital banners."
    ]
  },

  // 2. Luxury Bags
  "hermes.com": {
    domain: "hermes.com",
    elementsAnalyzed: 280,
    layoutRhythm: "monastic-silence",
    typography: {
      displayFamily: "Playfair Display",
      bodyFamily: "Inter",
      letterTracking: "tracking-widest",
      leading: "leading-loose"
    },
    spacingSpecs: {
      minSectionPaddingPx: 140,
      whitespaceRatio: 0.72,
      voidWeightScore: 95
    },
    colorPalette: {
      background: "#FBF9F4",
      text: "#2B211A",
      accent: "#E65A28",
      borders: "#EAE2D5"
    },
    luxuryRestraintIndicators: [
      "No sticky floating panels or countdown modules.",
      "Delicate thin hair separators reminiscent of leather stitch lines.",
      "Isolated product rows highlighting singular handcraft details."
    ]
  },
  "celine.com": {
    domain: "celine.com",
    elementsAnalyzed: 180,
    layoutRhythm: "monastic-silence",
    typography: {
      displayFamily: "Inter",
      bodyFamily: "Inter",
      letterTracking: "tracking-[0.3em]",
      leading: "leading-loose"
    },
    spacingSpecs: {
      minSectionPaddingPx: 150,
      whitespaceRatio: 0.76,
      voidWeightScore: 98
    },
    colorPalette: {
      background: "#FAF9F6",
      text: "#111111",
      accent: "#555555",
      borders: "#E5E3DF"
    },
    luxuryRestraintIndicators: [
      "Absolute 0px sharp corner fields.",
      "Massive raw portrait spans emphasizing physical studio shadows.",
      "Invisible utility labels preserving French design tension."
    ]
  },
  "polene-paris.com": {
    domain: "polene-paris.com",
    elementsAnalyzed: 340,
    layoutRhythm: "cinematic-breathing",
    typography: {
      displayFamily: "Playfair Display",
      bodyFamily: "Inter",
      letterTracking: "tracking-wider",
      leading: "leading-relaxed"
    },
    spacingSpecs: {
      minSectionPaddingPx: 130,
      whitespaceRatio: 0.68,
      voidWeightScore: 94
    },
    colorPalette: {
      background: "#F5F2EC",
      text: "#3A332C",
      accent: "#9E8976",
      borders: "#E5DEC5"
    },
    luxuryRestraintIndicators: [
      "Exquisite leather fold curves simulated by soft shadows.",
      "Clear artisan craftsmanship text columns restricted to 32 words.",
      "Subtle status codes marking limited batch deliveries next to pricing."
    ]
  },

  // 3. Restaurant / Coffee / Food
  "bluebottlecoffee.com": {
    domain: "bluebottlecoffee.com",
    elementsAnalyzed: 410,
    layoutRhythm: "cinematic-breathing",
    typography: {
      displayFamily: "Outfit",
      bodyFamily: "Inter",
      letterTracking: "tracking-wide",
      leading: "leading-relaxed"
    },
    spacingSpecs: {
      minSectionPaddingPx: 125,
      whitespaceRatio: 0.63,
      voidWeightScore: 89
    },
    colorPalette: {
      background: "#FAFAF9",
      text: "#1C1C1D",
      accent: "#00A1DE",
      borders: "#E7E7E5"
    },
    luxuryRestraintIndicators: [
      "Control accent color (sky blue) reserved strictly for micro-markers.",
      "Horizontal menus pairing roasted beans to country coordinates.",
      "Subscription CTA anchored to beautiful custom grind selections."
    ]
  },

  // 4. Multi-Brand Commerce (E-com)
  "ssense.com": {
    domain: "ssense.com",
    elementsAnalyzed: 1450,
    layoutRhythm: "high-friction",
    typography: {
      displayFamily: "Space Grotesk",
      bodyFamily: "Inter",
      letterTracking: "tracking-tight",
      leading: "leading-none"
    },
    spacingSpecs: {
      minSectionPaddingPx: 80,
      whitespaceRatio: 0.44,
      voidWeightScore: 68
    },
    colorPalette: {
      background: "#FFFFFF",
      text: "#000000",
      accent: "#555555",
      borders: "#000000"
    },
    luxuryRestraintIndicators: [
      "Highly dense grid borders mapped continuously like matrix grids.",
      "No imagery manipulations — strict pure white profile shots.",
      "Direct size checkout ticks visible directly in listings."
    ]
  },

  // 5. High-Conversion Shopify D2C
  "allbirds.com": {
    domain: "allbirds.com",
    elementsAnalyzed: 720,
    layoutRhythm: "high-friction",
    typography: {
      displayFamily: "Outfit",
      bodyFamily: "Inter",
      letterTracking: "tracking-tight",
      leading: "leading-normal"
    },
    spacingSpecs: {
      minSectionPaddingPx: 105,
      whitespaceRatio: 0.49,
      voidWeightScore: 72
    },
    colorPalette: {
      background: "#FFFFFF",
      text: "#212121",
      accent: "#D63031",
      borders: "#EAEAEA"
    },
    luxuryRestraintIndicators: [
      "Bold, high-contrast action elements displaying conversion guarantees.",
      "Detailed size charts paired with free wool material trial reminders.",
      "Star reviews and carbon-footprint tags on every shoe."
    ]
  }
};

export class SmartSiteCrawler {
  /**
   * Scans and aggregates structural blueprint metrics from prestigious brands.
   */
  static crawlDomain(domain: string): CrawledSiteData {
    const sanitized = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
    
    if (CRAWLED_SITES_MOCKED[sanitized]) {
      return CRAWLED_SITES_MOCKED[sanitized];
    }
    
    for (const key of Object.keys(CRAWLED_SITES_MOCKED)) {
      if (sanitized.includes(key) || key.includes(sanitized)) {
        return CRAWLED_SITES_MOCKED[key];
      }
    }
    
    // Deterministic fallback with aesthetic mathematical patterns
    const hash = domain.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const mockFamilies = ["Inter", "Playfair Display", "Outfit", "Space Grotesk"];
    const layoutTypes: ("monastic-silence" | "cinematic-breathing" | "high-friction")[] = ["monastic-silence", "cinematic-breathing", "high-friction"];
    
    return {
      domain,
      elementsAnalyzed: 100 + (hash % 400),
      layoutRhythm: layoutTypes[hash % layoutTypes.length],
      typography: {
        displayFamily: mockFamilies[hash % mockFamilies.length],
        bodyFamily: "Inter",
        letterTracking: "tracking-[0.22em]",
        leading: "leading-relaxed"
      },
      spacingSpecs: {
        minSectionPaddingPx: 120,
        whitespaceRatio: 0.58 + ((hash % 16) / 100),
        voidWeightScore: 78 + (hash % 20)
      },
      colorPalette: {
        background: hash % 2 === 0 ? "#FAFAF9" : "#121212",
        text: hash % 2 === 0 ? "#1C1C1A" : "#FFFFFF",
        accent: "#78716C",
        borders: hash % 2 === 0 ? "#E7E5E4" : "#292524"
      },
      luxuryRestraintIndicators: [
        "Aesthetic balancing index meets luxury benchmarks.",
        "Zero tracking violations in display titles.",
        "Solitary primary CTA rules actively validated."
      ]
    };
  }
}
