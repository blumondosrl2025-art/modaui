import { TemplateCollectionProfile, TEMPLATE_LIBRARY_PROFILES } from "../template-library";

export interface IndustryPresetResult {
  query: string;
  matchedIndustry: "apparel" | "leather" | "ecom" | "food" | "shopify" | "generic-luxury";
  primaryProfile: TemplateCollectionProfile;
  secondaryDNAKeys: string[];
  vibeJustification: string;
}

export class IndustryPresets {
  /**
   * Evaluates natural phrases (e.g. "高级皮包品牌", "aesthetic french womenswear") and binds to premium brand DNAs and assets.
   */
  static matchPhrase(query: string): IndustryPresetResult {
    const q = query.toLowerCase().trim();
    
    // 1. 高级服装 (Womenswear, Menswear, Premium Apparel)
    if (
      q.includes("zara") || 
      q.includes("cos") || 
      q.includes("arket") || 
      q.includes("massimo") || 
      q.includes("dutti") || 
      q.includes("jacquemus") || 
      q.includes("fear of god") || 
      q.includes("acne") || 
      q.includes("ami") || 
      q.includes("frankie") || 
      q.includes("toteme") || 
      q.includes("服装") || 
      q.includes("衣服") || 
      q.includes("男装") || 
      q.includes("女装") || 
      q.includes("潮牌") || 
      q.includes("大衣") || 
      q.includes("毛衣") || 
      q.includes("apparel") || 
      q.includes("clothing") || 
      q.includes("fashion") || 
      q.includes("wardrobe")
    ) {
      return {
        query,
        matchedIndustry: "apparel",
        primaryProfile: TEMPLATE_LIBRARY_PROFILES["apparel-premium"],
        secondaryDNAKeys: ["acnestudios.com", "cos.com", "zara.com", "jacquemus.com"],
        vibeJustification: "Matched with Premium Apparel & Lookbook standard. Evokes Acne Studios / COS architectural elegance with immediate multi-size selection and real-time color swatches."
      };
    }
    
    // 2. 高级皮包 / 奢侈品 (Bags, Luxury, Leather)
    if (
      q.includes("hermes") || 
      q.includes("bottega") || 
      q.includes("celine") || 
      q.includes("ysl") || 
      q.includes("saint laurent") || 
      q.includes("loewe") || 
      q.includes("polene") || 
      q.includes("coach") || 
      q.includes("longchamp") || 
      q.includes("皮包") || 
      q.includes("包包") || 
      q.includes("皮具") || 
      q.includes("奢侈品") || 
      q.includes("高客单") || 
      q.includes("手工袋") || 
      q.includes("leather") || 
      q.includes("luxury") || 
      q.includes("handbag") || 
      q.includes("briefcase")
    ) {
      return {
        query,
        matchedIndustry: "leather",
        primaryProfile: TEMPLATE_LIBRARY_PROFILES["leather-luxury"],
        secondaryDNAKeys: ["hermes.com", "celine.com", "polene-paris.com"],
        vibeJustification: "Matched with Luxury Leather & Artisan Craftsmanship. Mimics Bottega Veneta Intrecciato weaves and Hermès saddle stitches, integrating prestigious queue slots and single-product focal layouts."
      };
    }
    
    // 3. 商业电商 / 集约百货 (E-commerce / Retail)
    if (
      q.includes("ssense") || 
      q.includes("mr porter") || 
      q.includes("net-a-porter") || 
      q.includes("farfetch") || 
      q.includes("mytheresa") || 
      q.includes("hbx") || 
      q.includes("百货") || 
      q.includes("买手店") || 
      q.includes("多品牌") || 
      q.includes("商业电商") || 
      q.includes("卖货") || 
      q.includes("开店") || 
      q.includes("商品重") || 
      q.includes("curated") || 
      q.includes("department") || 
      q.includes("ecom") || 
      q.includes("retail") || 
      q.includes("store")
    ) {
      return {
        query,
        matchedIndustry: "ecom",
        primaryProfile: TEMPLATE_LIBRARY_PROFILES["multi-brand-ecom"],
        secondaryDNAKeys: ["ssense.com", "mrporter.com"],
        vibeJustification: "Matched with Multi-Brand Editorial E-commerce. Portrays the dense brutalist matrix grid structure of SSENSE and MR PORTER to optimize rapid catalog queries and cross-checks."
      };
    }

    // 4. 高级 F&B / 咖啡 (F&B Gastronomy)
    if (
      q.includes("blue bottle") || 
      q.includes("bottle coffee") || 
      q.includes("arabica") || 
      q.includes("aime leon") || 
      q.includes("shake shack") || 
      q.includes("sweetgreen") || 
      q.includes("erewhon") || 
      q.includes("咖啡") || 
      q.includes("餐馆") || 
      q.includes("烘焙") || 
      q.includes("面包") || 
      q.includes("食品") || 
      q.includes("奶茶") || 
      q.includes("下午茶") || 
      q.includes("酒吧") || 
      q.includes("restaurant") || 
      q.includes("cafe") || 
      q.includes("coffee") || 
      q.includes("bakery") || 
      q.includes("gastronomy") || 
      q.includes("food")
    ) {
      return {
        query,
        matchedIndustry: "food",
        primaryProfile: TEMPLATE_LIBRARY_PROFILES["fb-lifestyle"],
        secondaryDNAKeys: ["bluebottlecoffee.com"],
        vibeJustification: "Matched with Fine F&B & Lifestyle. Composes Kyoto-grade wood textures like % Arabica and Erewhon organic tags, driving diners from warm aesthetics to instant ordering coordinates."
      };
    }

    // 5. High-Conversion Shopify
    if (
      q.includes("allbirds") || 
      q.includes("gymshark") || 
      q.includes("mvmt") || 
      q.includes("ritual") || 
      q.includes("glossier") || 
      q.includes("shopify") || 
      q.includes("d2c") || 
      q.includes("独立站") || 
      q.includes("高转化") || 
      q.includes("爆款") || 
      q.includes("转换率") || 
      q.includes("d2c brand") || 
      q.includes("conversion")
    ) {
      return {
        query,
        matchedIndustry: "shopify",
        primaryProfile: TEMPLATE_LIBRARY_PROFILES["shopify-high-conv"],
        secondaryDNAKeys: ["allbirds.com", "gymshark.com"],
        vibeJustification: "Matched with High-Conversion D2C Shopify. Implements dynamic trust elements, shipping countdowns, money-back guarantees, and glowing buy buttons on the spot."
      };
    }

    // Fallback standard
    return {
      query,
      matchedIndustry: "generic-luxury",
      primaryProfile: TEMPLATE_LIBRARY_PROFILES["shopify-high-conv"],
      secondaryDNAKeys: ["allbirds.com", "cos.com"],
      vibeJustification: "Standard high-performance premium conversion shell applied. Symmetrical layouts with checkout-proven action targets and immediate customer trust highlights."
    };
  }
}
