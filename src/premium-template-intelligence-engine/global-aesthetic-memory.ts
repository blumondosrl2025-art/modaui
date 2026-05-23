export interface BrandAestheticMemory {
  brand: string;
  philosophy: string;
  whitespaceRatio: number; // e.g. 0.70 for 70% negative space
  spacingRhythm: "cinematic-breathing" | "monastic-silence" | "high-friction" | "asymmetric-stagger";
  typography: {
    displayFont: string;
    bodyFont: string;
    uppercaseDisplay: boolean;
    trackingValue: string; // e.g. "tracking-widest"
    lineHeightLeading: string; // e.g. "leading-loose"
    scaleSystem: number[]; // hierarchy, e.g. [64, 40, [24, 16], 12]
  };
  commercePacing: "atmospheric-storytelling" | "editorial-publishing" | "sculptural-restraint";
  colors: {
    background: string;
    text: string;
    accent: string;
    subtleBorder: string;
    shadingTone: string;
  };
  compositionStrategy: string[];
  motionFeel: "inertia-float" | "cinematic-fade" | "optical-stillness";
}

export const GLOBAL_AESTHETIC_MEMORY: Record<string, BrandAestheticMemory> = {
  hermes: {
    brand: "Hermès Paris",
    philosophy: "The historical nobility of horse saddle leather transformed into quiet, eternal hand-crafted silence.",
    whitespaceRatio: 0.72,
    spacingRhythm: "monastic-silence",
    typography: {
      displayFont: "Playfair Display",
      bodyFont: "Inter",
      uppercaseDisplay: true,
      trackingValue: "tracking-widest",
      lineHeightLeading: "leading-relaxed",
      scaleSystem: [56, 36, 22, 14, 11]
    },
    commercePacing: "atmospheric-storytelling",
    colors: {
      background: "#FBF9F4", // warm raw silk white
      text: "#2B211A", // deep leather espresso
      accent: "#E65A28", // singular classic hermes orange pop
      subtleBorder: "#EAE2D5", // soft canvas line
      shadingTone: "#F4EEE1"
    },
    compositionStrategy: [
      "Centric product levitation within 75% negative white canvas volume.",
      "Complete avoidance of technical metric indicators or sales banners.",
      "Separators are always microscopic leather-stitch lines (#EAE2D5)."
    ],
    motionFeel: "cinematic-fade"
  },
  bottega_veneta: {
    brand: "Bottega Veneta",
    philosophy: "Intrecciato structural kinetic power. Massive, thick volume combined with complete logo-less anonymity.",
    whitespaceRatio: 0.65,
    spacingRhythm: "high-friction",
    typography: {
      displayFont: "Outfit",
      bodyFont: "JetBrains Mono",
      uppercaseDisplay: true,
      trackingValue: "tracking-tight",
      lineHeightLeading: "leading-none",
      scaleSystem: [72, 44, 26, 15, 10]
    },
    commercePacing: "sculptural-restraint",
    colors: {
      background: "#121212", // industrial absolute charcoal
      text: "#FFFFFF",
      accent: "#00BC4B", // iconic bottega parrot green
      subtleBorder: "#242424",
      shadingTone: "#181818"
    },
    compositionStrategy: [
      "Colossal display typography juxtaposed with absolute silent emptiness.",
      "Asymmetric product presentation with sharp cinematic crops.",
      "Complete removal of icons to focus purely on the structural weight of typeface."
    ],
    motionFeel: "inertia-float"
  },
  the_row: {
    brand: "The Row",
    philosophy: "Oversized structural silence. Absolute premium fabrics completely detached from marketing noise.",
    whitespaceRatio: 0.78,
    spacingRhythm: "monastic-silence",
    typography: {
      displayFont: "Playfair Display",
      bodyFont: "JetBrains Mono",
      uppercaseDisplay: true,
      trackingValue: "tracking-[0.3em]",
      lineHeightLeading: "leading-loose",
      scaleSystem: [48, 30, 18, 12, 9]
    },
    commercePacing: "editorial-publishing",
    colors: {
      background: "#FAF9F5", // organic paper linen tone
      text: "#151515",
      accent: "#7C705F", // warm slate grey
      subtleBorder: "#EAE7E0",
      shadingTone: "#F3F0E6"
    },
    compositionStrategy: [
      "Extreme void spaces pushing titles to the microscopic edges.",
      "No active buttons on landing grids. Direct click triggers on elements.",
      "Aesthetic tension built entirely through editorial photo layout rhythm."
    ],
    motionFeel: "optical-stillness"
  },
  aesop: {
    brand: "Aesop",
    philosophy: "Warm, cerebral apothecary literature. Quiet organic intelligence.",
    whitespaceRatio: 0.68,
    spacingRhythm: "cinematic-breathing",
    typography: {
      displayFont: "Playfair Display",
      bodyFont: "Inter",
      uppercaseDisplay: false,
      trackingValue: "tracking-wide",
      lineHeightLeading: "leading-relaxed",
      scaleSystem: [40, 26, 18, 14, 11]
    },
    commercePacing: "atmospheric-storytelling",
    colors: {
      background: "#FAF6F0", // matte warm limestone grey
      text: "#252520",
      accent: "#3B423B", // deep botanical moss green
      subtleBorder: "#E6E1D8",
      shadingTone: "#EFEBE2"
    },
    compositionStrategy: [
      "Layout emulates ancient medicinal catalogs or high-end publishing houses.",
      "Detailed, intelligent descriptions wrapped in heavy visual frame lines.",
      "Color values are kept perfectly matte and eye-safe, preventing digital fatigue."
    ],
    motionFeel: "cinematic-fade"
  },
  saint_laurent: {
    brand: "Saint Laurent Paris",
    philosophy: "Sharp, tailored aggression and high-friction French cinematic luxury.",
    whitespaceRatio: 0.75,
    spacingRhythm: "asymmetric-stagger",
    typography: {
      displayFont: "Outfit",
      bodyFont: "Inter",
      uppercaseDisplay: true,
      trackingValue: "tracking-[0.4em]",
      lineHeightLeading: "leading-[1.1]",
      scaleSystem: [60, 32, 18, 11, 8.5]
    },
    commercePacing: "editorial-publishing",
    colors: {
      background: "#000000",
      text: "#FFFFFF",
      accent: "#8B8B8B",
      subtleBorder: "#191919",
      shadingTone: "#0A0A0A"
    },
    compositionStrategy: [
      "Rigid rectangular gridlines mapping cold model crops.",
      "Zero visual curves or rounded corners in UI components.",
      "Asymmetrical display alignments where copy occupies less than 20% width."
    ],
    motionFeel: "optical-stillness"
  }
};
