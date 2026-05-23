import { CompleteBrandTemplateAssets, TEMPLATE_ASSETS_PRESETS } from "../template-assets";

export interface TemplateCollectionProfile {
  categoryKey: 
    | "apparel-premium"      
    | "leather-luxury"       
    | "multi-brand-ecom"     
    | "fb-lifestyle"         
    | "shopify-high-conv"     
    | "quiet-luxury" 
    | "future-tech" 
    | "editorial-fashion" 
    | "luxury-commerce" 
    | "cinematic-brand" 
    | "minimal-premium" 
    | "scandinavian-luxury" 
    | "ai-saas-premium";
  name: string;
  underlyingDNAKey: string;
  visualVibe: string;
  description: string;
  pacingStructure: string;
  recommendedSpacingGapsPx: number;
  supportedBrands: string[]; 
  conversionHook: string;    
  assetPresetKey: "apparel" | "leather" | "multi_brand_ecom" | "fb_lifestyle" | "shopify_d2c";
}

export const TEMPLATE_LIBRARY_PROFILES: Record<string, TemplateCollectionProfile> = {
  "apparel-premium": {
    categoryKey: "apparel-premium",
    name: "高级服装商业服饰 (Premium Apparel & Lookbooks)",
    underlyingDNAKey: "celine",
    visualVibe: "Nordic whitespace lines, color swatch controls, grid image ratios, quick-cart overlay triggers.",
    description: "Designed for premium clothing stores, wholesale, and designer select shops. Highlights materials, fits, and sizing to trigger rapid cart-add cycles.",
    pacingStructure: "Consistent product grid grids paired with sizing indicators.",
    recommendedSpacingGapsPx: 120,
    supportedBrands: ["ZARA", "COS", "ARKET", "Massimo Dutti", "Jacquemus", "Fear of God", "Acne Studios", "Ami Paris", "The Frankie Shop", "Toteme"],
    conversionHook: "Multi-size selection & express color-swatch dynamic updates.",
    assetPresetKey: "apparel"
  },
  "leather-luxury": {
    categoryKey: "leather-luxury",
    name: "高级皮包与顶级奢侈品 (Premium Leather & High Luxury)",
    underlyingDNAKey: "hermes",
    visualVibe: "Exquisite wax leather shade curves, clean thin separator lines, absolute silent layout frames, scarcity stock alerts.",
    description: "Built for high-end boutique bags, premium footwear, and handmade leather jewelry. Inspires deep sensory longing and generational quality trust.",
    pacingStructure: "Asymmetrical spacious layouts highlighting single custom products.",
    recommendedSpacingGapsPx: 140,
    supportedBrands: ["Hermès", "Bottega Veneta", "CELINE", "Saint Laurent", "Loewe", "Polène Paris", "Coach", "Longchamp"],
    conversionHook: "Prestige waitlist priority allocations and custom sizing counters.",
    assetPresetKey: "leather"
  },
  "multi-brand-ecom": {
    categoryKey: "multi-brand-ecom",
    name: "集约百货与精品买手电商 (Multi-Brand & Editorial E-Commerce)",
    underlyingDNAKey: "ssense",
    visualVibe: "Highly-organized brutalist borders, density catalog columns, quick category tabs, seamless courier tags.",
    description: "The gold standard for multi-label fashion department stores. Built to handle dense catalogs safely without feeling messy or spammy.",
    pacingStructure: "Continuous dense columns with clear pricing and brand label systems.",
    recommendedSpacingGapsPx: 90,
    supportedBrands: ["SSENSE", "MR PORTER", "NET-A-PORTER", "Farfetch", "Mytheresa", "HBX"],
    conversionHook: "Express global duty-prepaid speed, saved style profiles, and one-click checkouts.",
    assetPresetKey: "multi_brand_ecom"
  },
  "fb-lifestyle": {
    categoryKey: "fb-lifestyle",
    name: "餐饮咖啡与高档新绿食品 (Premium Gastronomy & F&B Lifestyle)",
    underlyingDNAKey: "bluebottlecoffee",
    visualVibe: "Kyoto clean timber and concrete textures, elegant cafe menu setups, offline neighborhood map coordinates.",
    description: "Designed for fine dining, custom roasters, bakeries, juice labs, and modern bars. Bridges spatial atmosphere with instant online order queues.",
    pacingStructure: "Atmospheric, warm image-driven panels layered with structured menu components.",
    recommendedSpacingGapsPx: 130,
    supportedBrands: ["Blue Bottle Coffee", "% ARABICA", "Aimé Leon Dore Cafe", "Shake Shack", "Sweetgreen", "Erewhon Market"],
    conversionHook: "Instant rotating subscriptions and online-ordering location queues.",
    assetPresetKey: "fb_lifestyle"
  },
  "shopify-high-conv": {
    categoryKey: "shopify-high-conv",
    name: "顶级 D2C Shopify 转化之选 (High-Conversion D2C Shopify Standard)",
    underlyingDNAKey: "allbirds",
    visualVibe: "High-contrast dynamic checkout banners, custom feedback stars, clear bulletproof returns lists, active benefit checkmarks.",
    description: "Optimized for extreme transactional execution. Integrates social proof proof tags, delivery promises, and comparative ratings into a pristine aesthetic wrapper.",
    pacingStructure: "Highly structured rows emphasizing purchase trust and immediate CTA clicks.",
    recommendedSpacingGapsPx: 100,
    supportedBrands: ["Allbirds", "Gymshark", "MVMT", "Ritual", "Glossier"],
    conversionHook: "30-Day risk-free trial, free courier exchanges, and 240,000+ verified customer stars.",
    assetPresetKey: "shopify_d2c"
  },

  // Legacy fallback support for back compatibility
  "quiet-luxury": {
    categoryKey: "quiet-luxury",
    name: "Quiet Luxury (Apothecary Classics)",
    underlyingDNAKey: "hermes",
    visualVibe: "Warm herbal base notes, wide letter spacing, bookish serif titles.",
    description: "The classic Hermès & Aesop fusion layout.",
    pacingStructure: "Alternating slow asymmetrical blocks.",
    recommendedSpacingGapsPx: 140,
    supportedBrands: ["Aesop", "The Row"],
    conversionHook: "Apothecary seasonal release access keys.",
    assetPresetKey: "leather"
  },
  "future-tech": {
    categoryKey: "future-tech",
    name: "Future Tech (Stripe Grid Classic)",
    underlyingDNAKey: "ssense",
    visualVibe: "Monochromatic dark/light grids, ultra-fine 1px lines.",
    description: "Cold geometric computer screens.",
    pacingStructure: "Perfect grids with tight margins.",
    recommendedSpacingGapsPx: 120,
    supportedBrands: ["Linear", "Stripe"],
    conversionHook: "Direct SDK installation integration.",
    assetPresetKey: "multi_brand_ecom"
  },
  "editorial-fashion": {
    categoryKey: "editorial-fashion",
    name: "Editorial Couture (Legacy Parisian Lookbook)",
    underlyingDNAKey: "celine",
    visualVibe: "Raw portraits in massive blank frames.",
    description: "Classic Paris runway spacing.",
    pacingStructure: "Extreme visual silence spans.",
    recommendedSpacingGapsPx: 160,
    supportedBrands: ["Celine", "Saint Laurent"],
    conversionHook: "Lookbook invitation registries.",
    assetPresetKey: "apparel"
  },
  "luxury-commerce": {
    categoryKey: "luxury-commerce",
    name: "Premium Object Commerce",
    underlyingDNAKey: "hermes",
    visualVibe: "Raw linen textures, clay tones.",
    description: "French Provence pottery style drops.",
    pacingStructure: "Flowing horizontal catalogs.",
    recommendedSpacingGapsPx: 130,
    supportedBrands: ["Jacquemus", "Lemaire"],
    conversionHook: "Limited atelier single product batches.",
    assetPresetKey: "leather"
  },
  "cinematic-brand": {
    categoryKey: "cinematic-brand",
    name: "Cinematic Brand Focus",
    underlyingDNAKey: "celine",
    visualVibe: "Deep solid anthracite, cinematic aspects.",
    description: "Digital theater lookbooks.",
    pacingStructure: "Slow physical shutter fade effects.",
    recommendedSpacingGapsPx: 150,
    supportedBrands: ["Leica", "A24 Labs"],
    conversionHook: "Premium physical release priority queuing.",
    assetPresetKey: "leather"
  },
  "minimal-premium": {
    categoryKey: "minimal-premium",
    name: "Minimal Hardware Standard",
    underlyingDNAKey: "allbirds",
    visualVibe: "Smooth grey cards, balanced geometric titles.",
    description: "Apple hardware style display models.",
    pacingStructure: "Centric rows with comfortable padding.",
    recommendedSpacingGapsPx: 120,
    supportedBrands: ["Apple", "Humane"],
    conversionHook: "Instant product configuration selector.",
    assetPresetKey: "shopify_d2c"
  },
  "scandinavian-luxury": {
    categoryKey: "scandinavian-luxury",
    name: "Nordic Architecture Vibe",
    underlyingDNAKey: "cos",
    visualVibe: "Warm beige concrete, matte linen covers.",
    description: "Tactile spatial rooms.",
    pacingStructure: "Geometric letterpress splits.",
    recommendedSpacingGapsPx: 140,
    supportedBrands: ["Frama", "Menu Design"],
    conversionHook: "Studio visit reservations.",
    assetPresetKey: "fb_lifestyle"
  },
  "ai-saas-premium": {
    categoryKey: "ai-saas-premium",
    name: "Enterprise Developer SaaS",
    underlyingDNAKey: "ssense",
    visualVibe: "Glossy dark panels, clean console logs.",
    description: "Vercel & Stripe style tech products.",
    pacingStructure: "Continuous streaming debug text layers.",
    recommendedSpacingGapsPx: 110,
    supportedBrands: ["Vercel", "Scale AI"],
    conversionHook: "Secure sandbox workspace activation keys.",
    assetPresetKey: "multi_brand_ecom"
  }
};

export class TemplateLibrary {
  /**
   * Builds the structure and feeds corresponding clean assets profile.
   */
  static generateTemplateStructure(categoryKey: string): {
    profile: TemplateCollectionProfile;
    assets: CompleteBrandTemplateAssets;
  } {
    const matchedProfile = TEMPLATE_LIBRARY_PROFILES[categoryKey] || TEMPLATE_LIBRARY_PROFILES["apparel-premium"];
    const baseKey = matchedProfile.assetPresetKey;
    const baseAssets = TEMPLATE_ASSETS_PRESETS[baseKey] || TEMPLATE_ASSETS_PRESETS["apparel"];

    const customAssets: CompleteBrandTemplateAssets = {
      ...baseAssets,
      hero: {
        ...baseAssets.hero,
        layoutType: ["apparel-premium", "multi-brand-ecom"].includes(categoryKey)
          ? "kinetic-tension"
          : matchedProfile.underlyingDNAKey === "hermes"
          ? "quiet-luxury"
          : matchedProfile.underlyingDNAKey === "ssense"
          ? "split-grid"
          : "cinematic-hero"
      }
    };

    return {
      profile: matchedProfile,
      assets: customAssets
    };
  }
}
