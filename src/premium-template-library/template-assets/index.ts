export interface PremiumHeroAsset {
  layoutType: "quiet-luxury" | "kinetic-tension" | "split-grid" | "cinematic-hero";
  eyebrow: string;
  title: string;
  quote: string;
  subtext: string;
  primaryCtaLabel: string;
  trustBadge?: string; 
}

export interface LuxuryProductAsset {
  id: string;
  refCode: string;
  title: string;
  description: string;
  price: string;
  tag: string;
  dimensionLabel: string;
  siblingColors?: string[]; 
  sizesAvailable?: string[]; 
  customerRating?: string;   
  conversionBenefit?: string; 
}

export interface EditorialSectionAsset {
  headline: string;
  paragraph: string;
  whitespaceWeight: string;
  conversionFocusLabel?: string; 
}

export interface BrandStoryAsset {
  conceptTheme: string;
  authorQuote: string;
  artisanDetails: string;
  sensoryTrigger: string;
  heritageYear?: string;
}

export interface QuietLuxuryCtaAsset {
  title: string;
  subtitle: string;
  placeholderText: string;
  actionLabel: string;
  trustGuaranteeLabel?: string; 
}

export interface CinematicShowcaseAsset {
  heading: string;
  focusPoint: string;
  aspectRatio: string;
  metricLabel?: string;
}

export interface PremiumFooterAsset {
  copyright: string;
  philosophyTagline: string;
  coordinates: string;
  trustBadges?: string[]; 
}

export interface CompleteBrandTemplateAssets {
  hero: PremiumHeroAsset;
  products: LuxuryProductAsset[];
  editorial: EditorialSectionAsset;
  story: BrandStoryAsset;
  cta: QuietLuxuryCtaAsset;
  showcase: CinematicShowcaseAsset;
  footer: PremiumFooterAsset;
}

export const TEMPLATE_ASSETS_PRESETS: Record<string, CompleteBrandTemplateAssets> = {
  apparel: {
    hero: {
      layoutType: "cinematic-hero",
      eyebrow: "/ ARCHIVAL READY-TO-WEAR",
      title: "Asymmetrical Cotton Structure",
      quote: "“A study of fluid movement, raw heavyweight flax, and physical deceleration.”",
      subtext: "Crafted in Stockholm from organic eco-cotton fibers. Structured shoulder cuts with zero-gravity drape angles.",
      primaryCtaLabel: "ADD TO SECTOR WARDROBE",
      trustBadge: "★ ★ ★ ★ ★ Elite Atelier Fit Certified"
    },
    products: [
      {
        id: "ap1",
        refCode: "REF-ACNE-01",
        title: "Raw Flax Studio Overshirt",
        description: "Heavyweight 310g linen-cotton blend. Dropped shoulders, matte concrete button loops, interior dry passport node.",
        price: "¥2,950 CNY",
        tag: "RESTRICTED",
        dimensionLabel: "Fit: Boxy Oversized (100% Retained Shape)",
        siblingColors: ["Concrete Grey", "Bone White", "Industrial Black"],
        sizesAvailable: ["XS", "S", "M", "L", "XL"],
        customerRating: "4.9 (182 reviews)",
        conversionBenefit: "In Stock — Departs Stockholm within 24 hours"
      },
      {
        id: "ap2",
        refCode: "REF-COS-02",
        title: "Pleated Wool Fluid Trousers",
        description: "Sourced from non-mulesed Tasmanian merino. Gentle forward stitch folds, dynamic elasticized side tabs.",
        price: "¥1,450 CNY",
        tag: "SCARCE",
        dimensionLabel: "Length: Unfinished Hem 34\" for custom drape",
        siblingColors: ["Deep Navy", "Ash Brown", "Pebble Slate"],
        sizesAvailable: ["S", "M", "L"],
        customerRating: "4.8 (340 reviews)",
        conversionBenefit: "Free Express Shipping & Complimentary Hemming"
      },
      {
        id: "ap3",
        refCode: "REF-ARKET-03",
        title: "Heavy-Ribbed Knitted Cardigan",
        description: "Double-plied combed organic knit. Microscopic seam work to survive retail cycles with grace.",
        price: "¥1,850 CNY",
        tag: "AVAILABLE",
        dimensionLabel: "Thickness: 12-Gauge Midweight Comfort",
        siblingColors: ["Oatmeal", "Winter Charcoal"],
        sizesAvailable: ["S", "M", "L", "XL"],
        customerRating: "4.9 (90 reviews)",
        conversionBenefit: "30-Day Seamless Wardrobe Exchange Policy"
      }
    ],
    editorial: {
      headline: "The Science of Everyday Wear",
      paragraph: "Luxury is not a museum piece. True style is experienced in the frictionless movement of a custom shoulder line during morning transition. We compose garments that resist gravity.",
      whitespaceWeight: "58% breathing layout margin",
      conversionFocusLabel: "RESPONSIVE RETIREMENT SYSTEM"
    },
    story: {
      conceptTheme: "Nordic Loom & Pressed Chalk",
      authorQuote: "“We do not design styles. We formulate modular wardrobes that eliminate cognitive choice fatigue.”",
      artisanDetails: "Spun under monitored humidity checks to prevent fiber stress. Each collar line is hand-locked with Parisian double-tack needles.",
      sensoryTrigger: "Warm chalk dust, raw linen scent, unrefined cardboard shipping boxes",
      heritageYear: "EST. 2012 / STOCKHOLM"
    },
    cta: {
      title: "Join the Seasonal Allocation",
      subtitle: "Acquire single-use key code tokens for exclusive release catalog drops, private styling allocations, and localized sample trunk shows.",
      placeholderText: "YOUR ATELIER SIGNATURE COGNITION",
      actionLabel: "CLAIM SECURE TOKEN",
      trustGuaranteeLabel: "Immediate delivery. Zero marketing clutter guaranteed."
    },
    showcase: {
      heading: "Atelier No. 12 Loom Station",
      focusPoint: "High-speed optical camera evaluating thread alignment before yarn dyeing.",
      aspectRatio: "aspect-[3/4]",
      metricLabel: "99.87% Alignment Index"
    },
    footer: {
      copyright: "© 2026 APPAREL CORE COGNIZANT. REGISTERED WORLDWIDE.",
      philosophyTagline: "Engineered drape for modern movement.",
      coordinates: "Stockholm, Sweden • 59.3293° N, 18.0686° E",
      trustBadges: ["Free Worldwide Courier", "Duty-Paid Delivery", "Frictionless Returns"]
    }
  },
  leather: {
    hero: {
      layoutType: "quiet-luxury",
      eyebrow: "/ SACRE ARTISANAL WORKSHOP",
      title: "Uncompromising Matte Calfskin",
      quote: "“A clean physical document of thick hand-stitched saddle leather, cast brass hinges, and silent, heavy buckles.”",
      subtext: "Pure vegetable-tanned hides selected individually by French leather masters. No synthetic clear coatings over organic natural wrinkles.",
      primaryCtaLabel: "REQUEST ATELIER ALLOCATION",
      trustBadge: "🏆 Single-Atelier Heritage Guaranteed"
    },
    products: [
      {
        id: "l1",
        refCode: "REF-HERM-01",
        title: "Atelier Saddle Briefcase II",
        description: "Fourteen hours of manual saddle-stitching. Solid lock clasp, protective interior felt buffer, dynamic wax edges.",
        price: "$4,250 USD",
        tag: "EXCLUSIVE",
        dimensionLabel: "Material: Full-grain French Calfskin"
      },
      {
        id: "l2",
        refCode: "REF-BOT-02",
        title: "Intrecciato Seamless Clutch",
        description: "Meticulously woven strips of glove-weight lambskin. Entirely stitchless structural edges for ultimate structural quietude.",
        price: "$2,850 USD",
        tag: "SCARCE BATCH",
        dimensionLabel: "Texture: Raw semi-matte natural grain"
      },
      {
        id: "l3",
        refCode: "REF-POL-03",
        title: "Nomad Grain Shoulder Fold",
        description: "Clean organic shape echoing curves of historical sand dunes. Hand-finished suede backing layout.",
        price: "$780 USD",
        tag: "ALLOCATED",
        dimensionLabel: "Weight: 680g featherweight premium carry"
      }
    ],
    editorial: {
      headline: "Handwritten Luxury Heritage",
      paragraph: "A premium leather bag is not software. It is a physical entity that shares your skin oils, records your accidental scuffs, and adapts gracefully to your hand grip over forty years of world travel.",
      whitespaceWeight: "68% luxurious negative space",
      conversionFocusLabel: "HEREDITARY VALUATION STANDARDS"
    },
    story: {
      conceptTheme: "French Beeswax & Cast Brass",
      authorQuote: "“The artisan's calloused palm leaves an invisible fingerprint of care that no metal hydraulic press can replicate.”",
      artisanDetails: "Stitched exclusively using pure Irish linen thread pre-fortified with raw pine sap wax to resist atmospheric degradation.",
      sensoryTrigger: "Warm cedarwood oil, rich beeswax, heavy brass oxidation",
      heritageYear: "EST. 1837 / PARIS"
    },
    cta: {
      title: "Request Private Registry Entry",
      subtitle: "Secure priority queuing for bespoke monogram requests and customized hardware fittings. Private entries are strictly vetted.",
      placeholderText: "SECURE IDENTITY SIGNATURE",
      actionLabel: "APPLY FOR REGISTRY REGISTER",
      trustGuaranteeLabel: "All applications hand-reviewed within 2 hours."
    },
    showcase: {
      heading: "Atelier Stitching Bench",
      focusPoint: "Hand-clamped wooden stitching vise aligning raw-cut leather layers.",
      aspectRatio: "aspect-video",
      metricLabel: "9 Stitching Points / Inch"
    },
    footer: {
      copyright: "© 2026 HERITAGE LEATHER CRAFT. ALL RIGHTS RETAINED.",
      philosophyTagline: "Generations of silent premium craftsmanship.",
      coordinates: "Paris, France • 48.8566° N, 2.3522° E"
    }
  },
  multi_brand_ecom: {
    hero: {
      layoutType: "kinetic-tension",
      eyebrow: "/ GLOBALLY CURATED INDEX",
      title: "The Editorial Retail Grid",
      quote: "“The high-frequency catalog compiling the world's most aggressive design collections.”",
      subtext: "Over 400 global fashion houses compiled under a single monochrome responsive payment terminal. Express custom duty-paid clearance.",
      primaryCtaLabel: "DISCOVER LATEST RELEASES"
    },
    products: [
      {
        id: "me1",
        refCode: "REF-SSEN-09",
        title: "Balenciaga Gargoyle Boots",
        description: "Scattered tread patterns with thick molded TPU soles. Absolute visual volume matched with featherweight comfort.",
        price: "$1,120 USD",
        tag: "BESTSELLER",
        dimensionLabel: "Brand Focus: BALENCIAGA"
      },
      {
        id: "me2",
        refCode: "REF-MRPO-10",
        title: "Loro Piana Cashmere Cap",
        description: "Water-repellent storm-system cashmere. Structured shield peak, customized leather adjustable buckle track.",
        price: "$495 USD",
        tag: "GLOBAL SCARCITY",
        dimensionLabel: "Brand Focus: LORO PIANA"
      },
      {
        id: "me3",
        refCode: "REF-FARF-11",
        title: "Margiela Tabi Patent Flats",
        description: "Split-toe avant-garde classic. Cracked patent leather finish, singular hand-painted monochrome contrast border.",
        price: "$750 USD",
        tag: "AVAILABLE NOW",
        dimensionLabel: "Brand Focus: MAISON MARGIELA"
      }
    ],
    editorial: {
      headline: "The Speed of Curation",
      paragraph: "We filter out 98% of seasonal noise to isolate only the garments that redefine silhouettes. No commercial spam banners. Only raw, unmanipulated product layouts verified against design core values.",
      whitespaceWeight: "45% high-frequency dense alignment"
    },
    story: {
      conceptTheme: "Brutalist Concrete Archive",
      authorQuote: "“Curation is the act of defensive exclusion. We tell you what not to buy, so your wardrobe achieves visual weight.”",
      artisanDetails: "Our sorting center analyzes lookbooks in realtime. All items are packaged in clean cardboard wraps keeping fabric breathing space premium.",
      sensoryTrigger: "Industrial concrete, heavy polybag seals, fresh ink of archival lookbooks",
      heritageYear: "EST. 2003 / MONTREAL"
    },
    cta: {
      title: "Activate Seamless Procurement",
      subtitle: "Enter your email to unlock one-click checkout across all compiled luxury labels. Saved size telemetry, duty-free.",
      placeholderText: "YOUR ELECTRONIC ORDER SYSTEM ADDRESS",
      actionLabel: "ESTABLISH SEAMLESS CONVERSION ID",
      trustGuaranteeLabel: "Instantly synchronizes details with Apple Pay & international couriers."
    },
    showcase: {
      heading: "Automated Logistics Core",
      focusPoint: "Robotic barcode routing through cold storage facility in Quebec.",
      aspectRatio: "aspect-video"
    },
    footer: {
      copyright: "© 2026 SEAMLESS RETAIL INTEGRATED. TRANSIT SECURED.",
      philosophyTagline: "The central computational terminal for elite fashion.",
      coordinates: "Montreal, Canada • 45.5017° N, 73.5673° W"
    }
  },
  fb_lifestyle: {
    hero: {
      layoutType: "quiet-luxury",
      eyebrow: "/ THE LIFESTYLE INITIATIVE",
      title: "Single-Origin Organic Roast",
      quote: "“A quiet, slow study of light limestone concrete rooms, warm ground espresso, and toasted bread oils.”",
      subtext: "We harvest micro-lots in high-altitude environments. Hand-poured over physical drip stands under absolute atmospheric calmness.",
      primaryCtaLabel: "FIND THE NEAREST BENCH"
    },
    products: [
      {
        id: "fb1",
        refCode: "REF-BLUE-01",
        title: "Bella Donovan Studio Roast",
        description: "Composed of organic Ethiopian honey-process beans. Mild notes of warm red current, dark chocolate, and cedar-wood syrup.",
        price: "$24 USD / Bag",
        tag: "ROASTED YESTERDAY",
        dimensionLabel: "Roast Profile: Medium-Dark"
      },
      {
        id: "fb2",
        refCode: "REF-ARAB-02",
        title: "Single-Origin Kyoto Geisha",
        description: "Ultra-rare high-nitrogen roast yielding extreme floral cleanliness. Hints of white mountain jasmine and sweet bergamot.",
        price: "$65 USD / Tin",
        tag: "LIMITED STOCK",
        dimensionLabel: "Origin: Kyoto Micro-Atelier"
      },
      {
        id: "fb3",
        refCode: "REF-EREW-03",
        title: "Raw Cold Pressed Chlorophyll",
        description: "Slow-squeezed organic wild celery, dark pine moss, marine phytoplankton, and cold deep sea spring salts.",
        price: "$18 USD / Vessel",
        tag: "FRESHLY PRESSED",
        dimensionLabel: "Life cycle: 12 Hours Cold-Chain Active"
      }
    ],
    editorial: {
      headline: "The Geometry of Gastronomy",
      paragraph: "A cafe table is not a workspace. It is a physical boundary configured to slow down human neural speed. We formulate beverages that demand your full physical presence to experience properly.",
      whitespaceWeight: "60% spacious spatial breathing"
    },
    story: {
      conceptTheme: "Kyoto Timber & Pour Stands",
      authorQuote: "“Coffee is a liquid clock. Running it too fast ruins the mechanical gear alignment. We drip water at 15g per minute.”",
      artisanDetails: "Our roasting drum rotates at exactly 44 RPM to guarantee uniform radiant heat transfer throughout each organic bean segment.",
      sensoryTrigger: "Freshly cracked dark coffee shell, steamed oat milk, cold concrete dampness",
      heritageYear: "EST. 2002 / OAKLAND"
    },
    cta: {
      title: "Establish Daily Ritual",
      subtitle: "Claim your subscription schedule to receive freshly roasted bags straight from our gas-fired drum to your mailbox within 48 hours.",
      placeholderText: "YOUR DAILY COFFEINE DESTINATION",
      actionLabel: "COMMENCE ROTATING SUBSCRIPTION",
      trustGuaranteeLabel: "No lock-in contracts. Pause or abort with a single-click script."
    },
    showcase: {
      heading: "Atelier Drip Bench",
      focusPoint: "Slow vertical water drop releasing steam through a porous paper shield.",
      aspectRatio: "aspect-[3/4]"
    },
    footer: {
      copyright: "© 2026 ORGANIC GASTRO LABS. SUSTAINABLE CROPS.",
      philosophyTagline: "Slow-roasted liquids for sensory awareness.",
      coordinates: "Kyoto, Japan • 35.0116° N, 135.7681° E"
    }
  },
  shopify_d2c: {
    hero: {
      layoutType: "split-grid",
      eyebrow: "/ SECURE DIRECT-TO-CONSUMER PROTOTYPE",
      title: "The High-Conversion Sneaker Core",
      quote: "“Optimized interface structures achieving 4.8% baseline purchase conversion rates.”",
      subtext: "Crafted with lightweight merino yarn fiber, biological sugarcane midsoles, and clear value proposition metrics.",
      primaryCtaLabel: "CLAIM YOUR AIR COMFORT",
      trustBadge: "★ ★ ★ ★ ★ Rated 4.9 by over 240,000 active runners"
    },
    products: [
      {
        id: "sd1",
        refCode: "REF-ALLB-01",
        title: "Wool Runner Daily Cushion",
        description: "Breathable merino wool knit. Machine washable, ultra-soft interior feel, clean carbon-neutral certification badge.",
        price: "¥899 CNY",
        tag: "MOST POPULAR",
        dimensionLabel: "Fit: True to size (Wide foot layout accommodated)",
        siblingColors: ["Natural Grey", "Winter White", "Forest Green"],
        sizesAvailable: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
        customerRating: "4.9 (4,230 reviews)",
        conversionBenefit: "Free 30-Day trial. We pay return courier fees."
      },
      {
        id: "sd2",
        refCode: "REF-GYM-02",
        title: "Seamless High-Tension Leggings",
        description: "Four-way compression ribbing. Humidity-clearing fiber tech designed to hold maximum physical form securely.",
        price: "¥399 CNY",
        tag: "HIGH DEMAND BATCH",
        dimensionLabel: "Compression: 85% Absolute Body Retract Index",
        siblingColors: ["Plat Ink Black", "Pebble Lilac"],
        sizesAvailable: ["XS", "S", "M", "L"],
        customerRating: "4.8 (8,910 reviews)",
        conversionBenefit: "Over 820 purchased this week"
      },
      {
        id: "sd3",
        refCode: "REF-RIT-03",
        title: "Modular Essential Vitamin Suite",
        description: "Delayed-release beadlet-in-oil capsule design. Transparent supply chain tracing from raw sources to ingestible capsules.",
        price: "¥240 CNY",
        tag: "ESTABLISHED TRUST",
        dimensionLabel: "Volume: 30 Capsules (1-Month Dose)",
        sizesAvailable: ["Standard Supply"],
        customerRating: "4.9 (12,300 reviews)",
        conversionBenefit: "Save 15% with recurring auto-delivery schedules"
      }
    ],
    editorial: {
      headline: "The Science of High-Trust E-commerce",
      paragraph: "A high-converting website doesn't scream. It builds immediate visual authority by placing crisp product mockups, customer rating proof blocks, clear warranty policies, and fast Checkout points alongside generous breathing space.",
      whitespaceWeight: "48% optimized conversion space",
      conversionFocusLabel: "99.98% SUCCESS RATULATE INDEX"
    },
    story: {
      conceptTheme: "Sugarcane Organic Foam",
      authorQuote: "“E-commerce is the art of eliminating human friction. If purchasing requires more than two visual checks, you lose interest.”",
      artisanDetails: "All custom shoe midsoles are pressure-molded using clean solar energy. Backed by full 100% money-back structural guarantees.",
      sensoryTrigger: "Freshly machine-woven merino wool, clean sugarcane foam, premium recyclable boxes",
      heritageYear: "EST. 2016 / SAN FRANCISCO"
    },
    cta: {
      title: "Try for 30 Days Risk-Free",
      subtitle: "Enter your email for instant priority ship validation. No charge if returned under standard trial constraints.",
      placeholderText: "YOUR PRIORITY CONVERSION DESCR",
      actionLabel: "START RISK-FREE TRIAL",
      trustGuaranteeLabel: "📦 Zero-fee returns. Pre-printed shipping labels inside every package."
    },
    showcase: {
      heading: "Sugarcane Compression Press",
      focusPoint: "Molding sugarcane sap into highly buoyant rubber bubbles.",
      aspectRatio: "aspect-video"
    },
    footer: {
      copyright: "© 2026 SHOPIFY CONVERSION ENGINE. STABILIZED FRAME.",
      philosophyTagline: "Frictionless transactional excellence.",
      coordinates: "San Francisco, USA • 37.7749° N, 122.4194° W",
      trustBadges: ["Free DHL Shipping", "30-Day Fit Guarantee", "AES-256 Bit Secure Encryption"]
    }
  }
};
