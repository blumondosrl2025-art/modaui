import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lock, Unlock, ShieldCheck, HardDrive, RefreshCw, Send, SlidersHorizontal, 
  ArrowUpRight, ChevronRight, Bookmark, Circle, Package, Truck, ClipboardList, 
  TrendingUp, Check, X, Search, FileText, Sparkles, Sliders, ChevronDown, Eye, Info
} from "lucide-react";
import { SingularityBrand, SingularityProduct } from "../../types";

interface B2BWholesalePortalProps {
  brand: SingularityBrand;
  onHaptic?: () => void;
  brandColors: { background: string; text: string; accent: string; subtle: string };
  displayFont: string;
  onAddToCart?: (product: SingularityProduct) => void;
}

export default function B2BWholesalePortal({
  brand,
  onHaptic,
  brandColors,
  displayFont,
  onAddToCart
}: B2BWholesalePortalProps) {
  // Master sub-sections
  const [activePortalView, setActivePortalView] = useState<"PORTAL" | "FABRIC" | "ARCHIVE" | "INQUIRY" | "TRACKING">("PORTAL");

  // Authentication & Tier status
  const [b2bTier, setB2bTier] = useState<"guest" | "registered" | "vip">("guest");
  const [verifyCode, setVerifyCode] = useState("");
  const [kycLoading, setKycLoading] = useState(false);
  const [kycSuccessMsg, setKycSuccessMsg] = useState("");

  // Fabric selection & interactive light
  const [activeFabricIndex, setActiveFabricIndex] = useState(0);
  const [lightMode, setLightMode] = useState<"studio" | "atelier" | "shadow">("atelier");

  // Comparison & Archive selections
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [archiveSearch, setArchiveSearch] = useState("");
  const [materialFilter, setMaterialFilter] = useState("all");

  // Bulk Inquiry Sheet state
  const [inquiryCart, setInquiryCart] = useState<Array<{
    product: SingularityProduct;
    quantities: { S: number; M: number; L: number; XL: number };
    color: string;
    remarks: string;
  }>>([]);
  const [orderRemarks, setOrderRemarks] = useState("");
  const [isQuotesExporting, setIsQuotesExporting] = useState(false);
  const [quoteExportedSuccess, setQuoteExportedSuccess] = useState(false);

  // Active tracking order selected
  const [selectedOrderNo, setSelectedOrderNo] = useState("COSMO-B2B-8962-AW26");

  const triggerHaptic = () => {
    if (onHaptic) onHaptic();
  };

  // Static high-end luxury fabric materials list
  const CORE_FABRICS = [
    {
      name: "Inner Mongolian Cashmere (阿鲁科尔沁顶级山羊绒)",
      english: "Pristine Mongolian Cashmere",
      composition: "100% Baby Cashmere (山羊底绒)",
      gauge: "18 Gauge Spun Pattern (18针超高密精纺)",
      micron: "15.4 to 15.8 microns",
      weight: "320g / Linen-Weft Metres",
      origin: "Inner Mongolia • Gobi Desert Sourced",
      aspect: "High light scattering coefficient, fuzzy fiber alignment giving deep matte warmth",
      physioRating: "Thermal Coefficient: 9.8/10 | Lustre Rate: 4.5/10 | Elastic Recovery: 92%"
    },
    {
      name: "Tuscan Nappa Box-Calf (意大利油蜡箱包小牛皮)",
      english: "Aniline Box-Calf Nappa",
      composition: "Full-Grain Calfhide (100% 托斯卡纳原生态小牛皮)",
      gauge: "Vegetable Chrome-Free Tannery (无铬植物鞣制工艺)",
      micron: "Thickness: 1.2mm balanced fiber density",
      weight: "740g / Flat Metres square",
      origin: "Florence • Arno Tannery Reserve",
      aspect: "Slight waxy drag, high-tensile organic drapes which absorb skin moisture over years",
      physioRating: "Tension Resist: 480 N/cm² | Saturation Rate: 7.8/10 | Wax Drag Index: 6.2/10"
    },
    {
      name: "French Mulberry Silk Satin (法国重磅桑蚕真丝)",
      english: "Heavyweight Mulberry Silk Satin",
      composition: "100% Organic Mulberry Silk (40姆米重磅桑蚕丝)",
      gauge: "Couture Warp Satin Weave (高定斜纹锻面)",
      micron: "Momme count: 40 Momme",
      weight: "180g / Metres Square",
      origin: "Lyon • Atelier de Soie Reserve",
      aspect: "Ultra-fluid gravity cascade, mirror highlights reflecting high-key atelier shadows gracefully",
      physioRating: "Fluidity Index: 10/10 | Lustre Rate: 9.6/10 | Thermal Coefficient: 3.2/10"
    },
    {
      name: "Double-Faced Merino Fleece Wool (极度高密双面美利奴初剪羊毛)",
      english: "Virgin Double-Faced Merino Fleece",
      composition: "85% Virgin Merino, 15% Cashmere Core",
      gauge: "Hand-stitched Split seam edges (全手工拆针暗缝扣合)",
      micron: "18.5 microns pure wool yarn",
      weight: "580g / Metres Square",
      origin: "Biella • Piedmont Wool Mills",
      aspect: "Heavy three-dimensional silhouette posture, low hairiness, high-crease bounce resistance",
      physioRating: "Crease Bounce Rate: 98% | Structure Guard: 9.5/10 | Density Coefficient: 1.4"
    }
  ];

  // Wholesaler Authentication function
  const handleWholesalerKYC = (code?: string) => {
    triggerHaptic();
    const targetCode = code || verifyCode;
    setKycLoading(true);
    setKycSuccessMsg("");

    setTimeout(() => {
      setKycLoading(false);
      if (targetCode.toUpperCase() === "COSMOVIP") {
        setB2bTier("vip");
        setKycSuccessMsg("尊贵的首席核心买手联署会员 (VIP Elite Boutique Council) 认证成功。");
      } else {
        setB2bTier("registered");
        setKycSuccessMsg("注册企业批发商 (Registered Wholesaler ID) 认证通过，批发底价格已尊享解锁。");
      }
    }, 1200);
  };

  // Helper to dynamically calculate customized wholesale / tier values based on public retail strings
  const parsePricing = (priceString: string, tier: "guest" | "registered" | "vip") => {
    const rawNum = parseInt(priceString.replace(/[^0-9]/g, "")) || 350;
    if (tier === "guest") {
      return { text: "•••••• (需认证可见)", blurred: true, save: 0 };
    }
    const ratio = tier === "vip" ? 0.35 : 0.45;
    const value = Math.round(rawNum * ratio);
    const savePercent = Math.round((1 - ratio) * 100);
    return {
      text: priceString.startsWith("¥") ? `¥${value * 7} CNY` : `$${value}`,
      blurred: false,
      save: savePercent,
      originalPrice: priceString
    };
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return brand.products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(archiveSearch.toLowerCase()) || 
                          p.description.toLowerCase().includes(archiveSearch.toLowerCase());
      
      if (materialFilter === "all") return matchSearch;
      if (materialFilter === "cashmere") return matchSearch && (p.material.includes("绒") || p.material.toLowerCase().includes("cashmere"));
      if (materialFilter === "leather") return matchSearch && (p.material.includes("皮") || p.material.toLowerCase().includes("leather") || p.material.toLowerCase().includes("calf"));
      if (materialFilter === "silk") return matchSearch && (p.material.includes("丝") || p.material.toLowerCase().includes("silk"));
      
      return matchSearch;
    });
  }, [brand.products, archiveSearch, materialFilter]);

  // Handle inquiry quantities mutation
  const handleAddProductToInquiry = (product: SingularityProduct) => {
    triggerHaptic();
    const moqLimit = product.moq || 50;

    // Check if item already exists
    const idx = inquiryCart.findIndex(item => item.product.name === product.name);
    if (idx >= 0) {
      const updated = [...inquiryCart];
      updated[idx].quantities.M += moqLimit; // Default add to size M
      setInquiryCart(updated);
    } else {
      setInquiryCart([
        ...inquiryCart,
        {
          product,
          quantities: { S: 0, M: moqLimit, L: 0, XL: 0 },
          color: product.colors?.[0] || "#FAF9F6",
          remarks: "Bespoke label wrapping requested."
        }
      ]);
    }
    
    // Switch to inquiry view
    setActivePortalView("INQUIRY");
  };

  const handleInquiryQtyChange = (index: number, size: "S" | "M" | "L" | "XL", val: number) => {
    const updated = [...inquiryCart];
    updated[index].quantities[size] = Math.max(0, val);
    setInquiryCart(updated);
  };

  const calculateInquiryTotals = () => {
    let totalQty = 0;
    let totalPrice = 0;
    let savings = 0;

    inquiryCart.forEach(item => {
      const itemQty = item.quantities.S + item.quantities.M + item.quantities.L + item.quantities.XL;
      const originalNum = parseInt(item.product.price.replace(/[^0-9]/g, "")) || 0;
      
      // Calculate active tier price
      const discountRatio = b2bTier === "vip" ? 0.35 : 0.45;
      const promoSingle = Math.round(originalNum * discountRatio);

      totalQty += itemQty;
      totalPrice += promoSingle * itemQty;
      savings += (originalNum - promoSingle) * itemQty;
    });

    return { totalQty, totalPrice, savings };
  };

  // Generate luxury PDF quote simulation
  const handleExportQuote = () => {
    triggerHaptic();
    setIsQuotesExporting(true);
    setQuoteExportedSuccess(false);

    setTimeout(() => {
      setIsQuotesExporting(false);
      setQuoteExportedSuccess(true);
    }, 1500);
  };

  return (
    <div id="b2b-wholesale-portal" className="flex flex-col flex-grow py-10 font-sans tracking-wide">
      {/* Dynamic Sub Navbar Menu */}
      <div 
        className="w-full flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-8 border-b text-[10px] tracking-[0.2em] font-mono"
        style={{ borderColor: `${brandColors.text}1c` }}
      >
        <div className="flex items-center gap-1 opacity-70">
          <Sliders className="w-3.5 h-3.5 text-amber-500" />
          <span className="uppercase text-amber-500 font-bold">B2B COUTURE ENGINE • 专项解决方案</span>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 md:mt-0 font-bold uppercase select-none">
          {[
            { id: "PORTAL", label: "Ⅰ. 贵宾门户 / PORTAL ENTRY" },
            { id: "FABRIC", label: "Ⅱ. 物理面料库 / FABRIC LIBRARY" },
            { id: "ARCHIVE", label: "Ⅲ. 高高密档案馆 / PRODUCT MATRIX" },
            { id: "INQUIRY", label: `Ⅳ. 批量议价台 / BULK INQUIRY (${inquiryCart.length})` },
            { id: "TRACKING", label: "Ⅴ. 定制生产线 / LIVE TRACKING" }
          ].map(tab => {
            const isSelected = activePortalView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { triggerHaptic(); setActivePortalView(tab.id as any); }}
                className={`py-1 transition-all duration-300 relative outline-none cursor-pointer hover:opacity-100 ${
                  isSelected ? "text-amber-500 font-black" : "opacity-60"
                }`}
                style={{ color: isSelected ? undefined : brandColors.text }}
              >
                <span>{tab.label}</span>
                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-amber-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container Switch */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* SECTION 1: WHOLESALER PORTAL */}
          {activePortalView === "PORTAL" && (
            <motion.div
              key="portal-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Form: Entrance Gate */}
              <div 
                className="lg:col-span-7 p-8 rounded border flex flex-col justify-between"
                style={{ 
                  borderColor: `${brandColors.text}1a`,
                  backgroundColor: `${brandColors.text}03` 
                }}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-amber-500 uppercase tracking-[0.25em] block">
                      AUTHENTICATION GATEWAY
                    </span>
                    <h3 className="text-2xl font-light" style={{ fontFamily: displayFont }}>
                      服装/皮包 B端买家信用验证系统
                    </h3>
                    <p className="text-xs font-light opacity-80 leading-relaxed max-w-xl">
                      受“高奢静默法则”约束，White Cosmos 批发底价、高密面料经纬细节以及出厂库存等级，仅对通过企业信贷认证或特邀联署会买手公开。您可以测试不同的买手权限阶层。
                    </p>
                  </div>

                  {b2bTier === "guest" ? (
                    <div className="space-y-4 max-w-md pt-4">
                      <div className="flex flex-col gap-1.5 font-mono text-[9px] text-zinc-400">
                        <label className="uppercase tracking-wider">ENTER CONSORTIUM PASSCODE / KYC CODE</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={verifyCode}
                            onChange={(e) => setVerifyCode(e.target.value)}
                            placeholder=" 输入验证码 (如: COSMOVIP)"
                            className="bg-black/20 border text-xs px-3 py-2 rounded-none outline-none focus:border-amber-500 flex-1"
                            style={{ 
                              borderColor: `${brandColors.text}1c`, 
                              color: brandColors.text 
                            }}
                          />
                          <button
                            onClick={() => handleWholesalerKYC()}
                            disabled={kycLoading}
                            className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-[10px] uppercase font-mono tracking-widest transition"
                          >
                            {kycLoading ? "Verifying..." : "Validate"}
                          </button>
                        </div>
                        <p className="text-[8.5px] italic text-zinc-500 tracking-normal leading-relaxed pt-1">
                          测试输入<strong>「COSMOVIP」</strong>可解锁极高层 VIP Boutique Consortium 价格率 (3.5折)，一般激活码或直击认证 unlock 4.5折批发价。
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 select-none">
                        <button 
                          onClick={() => handleWholesalerKYC("COSMOHUB")} 
                          className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 border text-[9px] font-mono tracking-widest text-zinc-350"
                          style={{ borderColor: `${brandColors.text}15` }}
                        >
                          一键快速资质评估验证 (DEMO Registered)
                        </button>
                        <button 
                          onClick={() => handleWholesalerKYC("COSMOVIP")} 
                          className="px-3 py-1 bg-amber-950/20 hover:bg-amber-950/40 border border-amber-900/40 text-[9px] font-mono tracking-widest text-amber-500"
                        >
                          模拟最高权限 VIP 准入
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border p-6 rounded relative overflow-hidden" style={{ borderColor: `${brandColors.accent}2d`, backgroundColor: `${brandColors.accent}05` }}>
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 border border-emerald-900/40 bg-emerald-950/10 text-emerald-400 text-[8px] font-mono rounded uppercase">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified {b2bTier.toUpperCase()}</span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Unlock className="w-5 h-5 text-emerald-500" />
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                              企业高额信贷及底价授权已尊享开启
                            </h4>
                            <p className="text-[10px] text-zinc-400 font-light">
                              欧洲与大中华买手联盟认证账套: <span className="font-mono bg-neutral-900 px-1 text-zinc-300">#B2B-EUR-78961</span>
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t pt-4 text-[10px] font-mono" style={{ borderColor: `${brandColors.text}10` }}>
                          <div>
                            <span className="text-zinc-500 uppercase text-[8.5px] block">信用授信額额 (Simulated Lim)</span>
                            <span className="text-zinc-200 block text-sm font-bold mt-0.5">
                              {b2bTier === "vip" ? "¥2,500,000 CNY" : "¥500,000 CNY"}
                            </span>
                          </div>
                          <div>
                            <span className="text-zinc-500 uppercase text-[8.5px] block">专属客户首席商务经理</span>
                            <span className="text-zinc-200 block text-xs mt-0.5">
                              {b2bTier === "vip" ? "Valerie Dumont (高高定联络总监)" : "Atelier Specialist Representative"}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2.5 pt-2">
                          <button 
                            onClick={() => { setB2bTier("guest"); setVerifyCode(""); setKycSuccessMsg(""); }}
                            className="text-[9px] font-mono text-zinc-500 underline uppercase"
                          >
                            登出并退回公共橱窗 (Logout B2B Mode)
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {kycSuccessMsg && (
                    <div className="bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 p-3.5 text-[10.5px] rounded font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>{kycSuccessMsg}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mt-6 text-[9.5px] font-mono text-zinc-500 flex justify-between items-center" style={{ borderColor: `${brandColors.text}10` }}>
                  <span>TAX EXEMPT LEVEL: EU CUSTOMS NO-DUTY WAIVER</span>
                  <span>ERP CONCURRENT CONNECTION: ACTIVE</span>
                </div>
              </div>

              {/* Right Panel: Digital Twin B2B Card */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div 
                  className="p-6 rounded border flex flex-col justify-between space-y-6"
                  style={{ borderColor: `${brandColors.text}12`, background: "linear-gradient(145deg, rgba(20,20,20,0.5), rgba(10,10,10,0.8))" }}
                >
                  <div className="flex justify-between items-start pb-4 border-b border-zinc-900">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-[#B39359] block uppercase font-bold">White Cosmos Enterprise ID</span>
                      <h4 className="text-sm font-light text-zinc-150-display uppercase" style={{ fontFamily: displayFont }}>
                        Atelier Consortium Card
                      </h4>
                    </div>
                    <span className="text-[8px] font-mono text-zinc-500">AW26 SERIES</span>
                  </div>

                  <div className="space-y-4 text-xs font-light">
                    <div className="space-y-1 select-none">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block">WHOLESALE CUSTOMER STATUS</span>
                      <span className={`text-[10.5px] font-mono py-0.5 px-2 border uppercase inline-block font-bold ${
                        b2bTier === "vip" 
                          ? "border-[#B39359] text-[#B39359] bg-[#B39359]/5" 
                          : b2bTier === "registered" 
                          ? "border-amber-500/50 text-amber-500 bg-amber-500/5" 
                          : "border-zinc-800 text-zinc-500"
                      }`}>
                        {b2bTier === "vip" 
                          ? "★ VIP BOUTIQUE CONSORTIUM MEMBERSHIP" 
                          : b2bTier === "registered" 
                          ? "✔ REGISTERED TRADING WHOLESALER" 
                          : "🛩 PUBLIC GUEST RETENTION"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-[9.5px]">
                      <div>
                        <span className="text-zinc-550 block">EST. ANNUAL PURCHASE</span>
                        <span className="text-zinc-300 block mt-0.5">{b2bTier === "vip" ? "¥15,000,000 CNY" : b2bTier === "registered" ? "¥2,000,000 CNY" : "Public view limit"}</span>
                      </div>
                      <div>
                        <span className="text-zinc-550 block">CARGO PREFERENCE</span>
                        <span className="text-zinc-300 block mt-0.5">{b2bTier === "vip" ? "AIR FREIGHT SHIELD (+4-DAY DELIVERY)" : "SEA FREIGHT MULTI-MODAL"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-900 flex justify-between items-baseline font-mono text-[8px] text-zinc-500 uppercase tracking-widest">
                    <span>COSMO LOGISTICS ENFORCED</span>
                    <span>No. {b2bTier === "vip" ? "896-VIP-991" : b2bTier === "registered" ? "420-WHS-230" : "000-GST-000"}</span>
                  </div>
                </div>

                {/* Wholesaler Port Quick Benefits */}
                <div className="bg-amber-950/10 border border-amber-900/25 p-4 rounded text-zinc-400 space-y-2">
                  <div className="text-[10px] font-mono text-amber-500 uppercase tracking-wider font-bold">
                    【高奢批发特权：分层信息展现】
                  </div>
                  <ul className="text-[10.5px] space-y-1 list-disc list-inside">
                    <li>第一层（公开）：提供衣服高奢设计、艺术大图与品牌精神。</li>
                    <li>第二层（注册批发商）：解锁<strong> 4.5 折 </strong> wholesale 起版价格、大货剩余在庫。</li>
                    <li>第三层（VIP 贵宾买手联属）：解锁特需<strong> 3.5 折 </strong> 奢华出货价、生产线视频追踪、手工领牌微型高定贴牌权限。</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 2: FABRIC & MATERIAL LIBRARY */}
          {activePortalView === "FABRIC" && (
            <motion.div
              key="fabric-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Selector & Swatch Description */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[9px] font-mono text-amber-500 uppercase tracking-[0.25em] block font-bold">
                  TACTILE PHYSICS LIBRARY / 面料皮料图书馆
                </span>
                <p className="text-xs font-light opacity-80 leading-relaxed">
                  全球高奢买手在订购成衣大货前，极重材质的重力感与光泽度。此处集中展示系列高奢面料核心物理与耐物理测试。点击面料即可在下方过滤相关商品并批量备单。
                </p>

                <div className="space-y-2.5 pt-4">
                  {CORE_FABRICS.map((fabric, idx) => {
                    const isSelected = activeFabricIndex === idx;
                    return (
                      <button
                        key={fabric.name}
                        onClick={() => { triggerHaptic(); setActiveFabricIndex(idx); }}
                        className={`w-full text-left p-4 rounded-none border transition-all duration-300 flex items-center justify-between outline-none cursor-pointer ${
                          isSelected 
                            ? "border-amber-500/70 bg-amber-500/5 text-zinc-100" 
                            : "bg-transparent text-zinc-400 hover:text-zinc-250"
                        }`}
                        style={{ borderColor: isSelected ? undefined : `${brandColors.text}10` }}
                      >
                        <div className="space-y-1">
                          <span className="font-mono text-[8.5px] text-zinc-500 block">FABRIC MATERIAL 0{idx + 1}</span>
                          <span className="text-xs font-semibold">{fabric.name.split(" (")[0]}</span>
                          <span className="text-[9.5px] font-mono text-zinc-400 block opacity-80">{fabric.english}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition ${isSelected ? "text-amber-500 rotate-90" : "opacity-40"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Panel: Interactive Light simulator */}
              <div 
                className="lg:col-span-7 rounded border p-6 flex flex-col justify-between"
                style={{ 
                  borderColor: `${brandColors.text}1a`,
                  backgroundColor: `${brandColors.text}03` 
                }}
              >
                {/* Simulator Area */}
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 text-left">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase block">ACTIVE TACTILE VIEW</span>
                      <h4 className="text-lg font-light" style={{ fontFamily: displayFont }}>
                        {CORE_FABRICS[activeFabricIndex].name}
                      </h4>
                    </div>

                    {/* Light simulator toggles */}
                    <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded font-mono text-[8px] border border-zinc-800 select-none">
                      {[
                        { id: "studio", label: "STUDIO HIGH" },
                        { id: "atelier", label: "ATELIER ACCENT" },
                        { id: "shadow", label: "SHADOW CONTRAST" }
                      ].map(mode => (
                        <button
                          key={mode.id}
                          onClick={() => { triggerHaptic(); setLightMode(mode.id as any); }}
                          className={`px-2 py-1 rounded transition cursor-pointer ${
                            lightMode === mode.id 
                              ? "bg-amber-500 text-black font-bold" 
                              : "text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Visual Swatch Texture Container */}
                  <div className="relative aspect-[16/7] w-full rounded border overflow-hidden bg-neutral-950 flex items-center justify-center" style={{ borderColor: `${brandColors.text}12` }}>
                    {/* Simulated texture using Unsplash swatch image overlays */}
                    <img 
                      src={
                        activeFabricIndex === 0 
                          ? "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80" // Cashmere knit texture
                          : activeFabricIndex === 1
                          ? "https://images.unsplash.com/photo-1590156696999-edb5b906a5ce?auto=format&fit=crop&w=700&q=80" // leather texture
                          : activeFabricIndex === 2
                          ? "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=700&q=80" // silk silk satin textile
                          : "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=700&q=80" // heavy merino coat wool
                      } 
                      alt="Tactile Swatch representation" 
                      className={`w-full h-full object-cover transition-all duration-750 opacity-80 ${
                        lightMode === "studio" 
                          ? "brightness-110 contrast-100 filter-none" 
                          : lightMode === "atelier"
                          ? "brightness-95 contrast-125 saturate-95"
                          : "brightness-70 contrast-150 saturate-[0.80]"
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {/* Light angle overlay representing rays direction */}
                    <div 
                      className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
                        lightMode === "studio" 
                          ? "bg-gradient-to-tr from-white/10 via-transparent to-white/10" 
                          : lightMode === "atelier"
                          ? "bg-gradient-to-b from-transparent via-[#000000]/30 to-[#000000]/80"
                          : "bg-radial-pulse bg-gradient-to-r from-[#000000]/95 via-transparent to-[#000000]/95"
                      }`}
                    />

                    {/* Physical micro indicators mapping coordinates */}
                    <div className="absolute left-6 bottom-4 font-mono text-[8.5px] text-zinc-300 space-y-0.5 bg-black/60 px-2 py-1 rounded">
                      <p>LIGHT INTERFERENCE: {lightMode === "studio" ? "HIGH (STUDIO HIGH LIGHT)" : lightMode === "atelier" ? "LOW (ATELIER SHADOW)" : "EXTREME GRAPH SHADOW"}</p>
                      <p>COMPRESSION RESISTANCE RATIO: {(activeFabricIndex + 1) * 24} N/cm²</p>
                    </div>
                  </div>

                  {/* Technical properties */}
                  <div className="grid grid-cols-2 gap-4 border-t pt-4 text-[11px]" style={{ borderColor: `${brandColors.text}10` }}>
                    <div className="space-y-1">
                      <span className="font-mono text-[8px] text-zinc-550 block">PHYSICAL COMPOSITION</span>
                      <p className="text-zinc-200 font-medium">{CORE_FABRICS[activeFabricIndex].composition}</p>
                      <span className="font-mono text-[8px] text-zinc-550 block pt-1">MATERIAL THREAD LIMITS</span>
                      <p className="font-mono text-zinc-350 text-[10px]">{CORE_FABRICS[activeFabricIndex].gauge}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono text-[8px] text-zinc-550 block">MICRON WEIGHT METRICS</span>
                      <p className="font-mono text-zinc-300 text-[10px]">{CORE_FABRICS[activeFabricIndex].micron} • {CORE_FABRICS[activeFabricIndex].weight}</p>
                      <span className="font-mono text-[8px] text-zinc-550 block pt-1">ORIGIN GEOGRAPHICS</span>
                      <p className="font-mono text-zinc-300 text-[10px]">{CORE_FABRICS[activeFabricIndex].origin}</p>
                    </div>
                  </div>

                  {/* Material aspect discussion excerpt */}
                  <div className="bg-black/40 border p-3 rounded font-mono text-[8.5px] text-zinc-500 leading-relaxed uppercase">
                    <strong> 感官评述 (AESTHETIC CRITIQUE):</strong> &ldquo;{CORE_FABRICS[activeFabricIndex].aspect}&rdquo;
                  </div>
                </div>

                {/* Relational products actions */}
                <div 
                  className="mt-6 pt-4 border-t font-mono text-[10px] flex justify-between items-center" 
                  style={{ borderColor: `${brandColors.text}10` }}
                >
                  <span className="text-zinc-400">PHYSICAL ANALYSIS STATUS: VERIFIED BY WHITE COSMOS</span>
                  
                  {/* Shortcut key to filter products */}
                  <button
                    onClick={() => {
                      triggerHaptic();
                      const type = activeFabricIndex === 0 ? "cashmere" : activeFabricIndex === 1 ? "leather" : activeFabricIndex === 2 ? "silk" : "all";
                      setMaterialFilter(type);
                      setActivePortalView("ARCHIVE");
                    }}
                    className="text-amber-500 hover:text-amber-400 flex items-center gap-1 font-bold underline uppercase"
                  >
                    <span>筛选关联商品 (Explore related B2B SKUs)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 3: WHOLESALE ARCHIVE & COMPARISON GRID */}
          {activePortalView === "ARCHIVE" && (
            <motion.div
              key="archive-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 text-left">
                  <span className="text-[9px] font-mono text-amber-500 uppercase tracking-[0.25em] block font-bold">
                    WHOLESALE ARCHIVE MATRIX / 博物馆级产品高置密度检索线
                  </span>
                  <p className="text-xs font-light text-zinc-400">
                    B端大批量进货要求高效分类。支持拖选与并排产品对比（在左下角勾选商品即可拉起多维对比橱窗）。
                  </p>
                </div>

                {/* Compare toggle trigger */}
                {selectedProductIds.length > 0 && (
                  <button
                    onClick={() => { triggerHaptic(); setIsCompareMode(true); }}
                    className="px-4 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 font-mono text-[9px] uppercase tracking-wider font-bold transition flex items-center gap-1"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>对比选中商品 ({selectedProductIds.length}) / Compare selected</span>
                  </button>
                )}
              </div>

              {/* Filters bars */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch font-mono text-[9.5px]">
                {/* Search */}
                <div className="md:col-span-5 flex relative">
                  <input
                    type="text"
                    value={archiveSearch}
                    onChange={(e) => setArchiveSearch(e.target.value)}
                    placeholder=" 搜索高定成衣面料、廓形或者Ref.编码..."
                    className="w-full bg-black/20 border rounded px-3 py-2 pr-8 outline-none focus:border-amber-500"
                    style={{ borderColor: `${brandColors.text}1a`, color: brandColors.text }}
                  />
                  <Search className="w-4.5 h-4.5 text-zinc-500 absolute right-2.5 top-2.5" />
                </div>

                {/* Material category selector */}
                <div className="md:col-span-4 flex items-center bg-[#0d0d0d] rounded border px-3" style={{ borderColor: `${brandColors.text}14` }}>
                  <span className="text-zinc-500 uppercase shrink-0 font-bold whitespace-nowrap mr-2.5">按面料过滤/FILTER TACTILE:</span>
                  <div className="flex gap-2">
                    {[
                      { id: "all", label: "ALL" },
                      { id: "cashmere", label: "CASHMERE" },
                      { id: "leather", label: "LEATHER/CALF" },
                      { id: "silk", label: "SILK" }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => { triggerHaptic(); setMaterialFilter(type.id); }}
                        className={`transition hover:text-white ${
                          materialFilter === type.id ? "text-amber-500 font-extrabold" : "text-zinc-400"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Status summary */}
                <div className="md:col-span-3 flex items-center justify-end font-mono text-zinc-550 font-bold">
                  <span>UNLOCKED UNITS: {filteredProducts.length} DESIGNS</span>
                </div>
              </div>

              {/* High-density grid display (4-column on desk) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-4 select-none">
                {filteredProducts.map((p, idx) => {
                  const pricing = parsePricing(p.price, b2bTier);
                  const moq = p.moq || 50;
                  const stocks = p.stocks || 1400;
                  const refCode = `REF-COSMO-${idx + 101}`;

                  const isCheckedForCompare = selectedProductIds.includes(refCode);

                  return (
                    <div 
                      key={refCode}
                      className="group border rounded-lg bg-neutral-950/20 overflow-hidden flex flex-col justify-between transition hover:border-zinc-800"
                      style={{ borderColor: `${brandColors.text}10` }}
                    >
                      {/* Product display card */}
                      <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden">
                        {p.image ? (
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="w-full h-full object-cover transition duration-750 group-hover:scale-105" 
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center opacity-40 text-[9px] font-mono">
                            No Silhouette Photo
                          </div>
                        )}

                        {/* Top selection checkbox representing compare logic */}
                        <div className="absolute top-2.5 left-2.5">
                          <button
                            onClick={() => {
                              triggerHaptic();
                              if (isCheckedForCompare) {
                                setSelectedProductIds(prev => prev.filter(id => id !== refCode));
                              } else {
                                if (selectedProductIds.length >= 3) {
                                  alert("最多只能同时选择3个商品进行对比 / You can compare up to 3 designs.");
                                  return;
                                }
                                setSelectedProductIds(prev => [...prev, refCode]);
                              }
                            }}
                            className={`w-4 h-4 rounded border flex items-center justify-center transition outline-none cursor-pointer ${
                              isCheckedForCompare ? "bg-amber-500 border-amber-500 text-black" : "bg-black/60 border-zinc-700 hover:border-zinc-500"
                            }`}
                          >
                            {isCheckedForCompare && <Check className="w-3 h-3 stroke-[3]" />}
                          </button>
                        </div>

                        {/* Silhouette and techniques list layer */}
                        <div className="absolute bottom-2 left-2 right-2 bg-black/75 p-2 rounded text-[8.5px] opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                          <p className="text-zinc-400 font-mono">SILHOUETTE: {p.silhouette}</p>
                          <p className="text-zinc-500 font-mono">CRAFTS: {p.techniques?.join(", ") || "Precision Draping"}</p>
                        </div>
                      </div>

                      {/* Info and pricing data */}
                      <div className="p-4 space-y-3 flex-grow flex flex-col justify-between text-left">
                        <div className="space-y-1">
                          <div className="flex justify-between items-baseline font-mono text-[8px] text-zinc-500">
                            <span>{refCode}</span>
                            <span>MOQ: {moq}件</span>
                          </div>
                          <h5 className="text-xs font-semibold text-zinc-200 line-clamp-1 truncate">{p.name}</h5>
                          <span className="font-mono text-[9px] text-[#B39359] block truncate">{p.material}</span>
                        </div>

                        {/* Wholesale Pricing details */}
                        <div className="bg-black/40 border p-2.5 rounded-none space-y-1.5" style={{ borderColor: `${brandColors.text}0d` }}>
                          <div className="flex justify-between items-baseline font-mono text-[8.5px] text-zinc-550">
                            <span>公立零售价 / Retail:</span>
                            <span className="line-through">{p.price}</span>
                          </div>
                          <div className="flex justify-between items-baseline font-mono">
                            <span className="text-amber-500 text-[8.5px] font-bold">批订价 / B2B Price:</span>
                            {pricing.blurred ? (
                              <span className="text-zinc-500 flex items-center gap-1 scale-90">
                                <Lock className="w-2.5 h-2.5 text-zinc-650" />
                                <span>•••••• (未认证)</span>
                              </span>
                            ) : (
                              <span className="text-amber-500 font-black text-xs font-mono">{pricing.text}</span>
                            )}
                          </div>
                        </div>

                        {/* Stats indicator and actions inside the drawer */}
                        <div className="space-y-2 border-t pt-3" style={{ borderColor: `${brandColors.text}0c` }}>
                          <div className="flex justify-between text-[8px] font-mono text-zinc-500">
                            <span>ERP现货储备 / Stock:</span>
                            <span className="text-zinc-300">{stocks}件</span>
                          </div>
                          
                          <button
                            onClick={() => handleAddProductToInquiry(p)}
                            className="w-full py-1.5 bg-[#121212] hover:bg-neutral-900 border text-[9.5px] font-semibold tracking-wider font-mono uppercase transition flex items-center justify-center gap-1 cursor-pointer hover:border-zinc-750"
                            style={{ borderColor: `${brandColors.text}18`, color: brandColors.text }}
                          >
                            <ClipboardList className="w-3.5 h-3.5 text-[#B39359]" />
                            <span>备入询货台 / Add to inquiry</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Side-by-side comparison modal overlay panel */}
              {isCompareMode && selectedProductIds.length > 0 && (() => {
                const comparedDesigns = brand.products.filter((p, idx) => selectedProductIds.includes(`REF-COSMO-${idx + 101}`));
                return (
                  <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#0b0c0f] border border-zinc-805 w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl flex flex-col">
                      {/* Compare Title */}
                      <div className="p-4 border-b border-zinc-900 bg-zinc-950 flex justify-between items-center text-left">
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                          <SlidersHorizontal className="w-4 h-4 text-amber-500 animate-pulse" />
                          <span className="uppercase text-zinc-300 font-extrabold">COUTURE B2B DESIGN PREFERENCE COMPARISON</span>
                        </div>
                        <button 
                          onClick={() => { triggerHaptic(); setIsCompareMode(false); }}
                          className="text-zinc-500 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Content Table */}
                      <div className="overflow-x-auto p-6">
                        <table className="w-full text-left font-mono text-[10px] text-zinc-400 border-collapse">
                          <thead>
                            <tr className="border-b border-zinc-900">
                              <th className="pb-3 text-zinc-550 uppercase">参数维度 / Dimension</th>
                              {comparedDesigns.map(cd => (
                                <th key={cd.name} className="pb-3 px-4 font-sans text-xs font-semibold text-zinc-100">{cd.name}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-900">
                            {[
                              { label: "面料成分 / Fabric", draw: (cd: SingularityProduct) => cd.material },
                              { label: "设计廓形 / Silhouette", draw: (cd: SingularityProduct) => cd.silhouette },
                              { label: "零售参考价 / Retail Price", draw: (cd: SingularityProduct) => cd.price },
                              { 
                                label: "核心批发订货价 / Wholesale Price", 
                                draw: (cd: SingularityProduct) => {
                                  const pr = parsePricing(cd.price, b2bTier);
                                  return pr.blurred ? "••••• (需企业认证可见)" : `${pr.text} (${pr.save}% OFF Savings)`;
                                } 
                              },
                              { label: "起订标准 / MOQ", draw: (cd: SingularityProduct) => `${cd.moq || 50} 件` },
                              { label: "工艺特点 / Master Techniques", draw: (cd: SingularityProduct) => cd.techniques?.join(", ") || "高定打板立裁" },
                              { label: "库存水位 / ERP Stocks", draw: (cd: SingularityProduct) => `${cd.stocks || 1400} 件` },
                              { label: "货期 / Est. Drapes Lead Time", draw: (cd: SingularityProduct) => "14 - 18 天" }
                            ].map(row => (
                              <tr key={row.label} className="hover:bg-zinc-900/10">
                                <td className="py-3 text-zinc-500 font-bold uppercase">{row.label}</td>
                                {comparedDesigns.map(cd => (
                                  <td key={cd.name} className="py-3 px-4 text-zinc-200">{row.draw(cd)}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Bottom close button */}
                      <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex justify-end">
                        <button
                          onClick={() => { triggerHaptic(); setIsCompareMode(false); }}
                          className="px-6 py-2 bg-neutral-900 hover:bg-neutral-850 border border-zinc-800 text-zinc-300 font-mono text-[9px] uppercase tracking-widest transition"
                        >
                          返回矩阵并继续检索 (Close Comparison)
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* SECTION 4: BULK INQUIRY DESK & MOQ SYSTEM */}
          {activePortalView === "INQUIRY" && (
            <motion.div
              key="inquiry-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Order list sheet */}
              <div className="lg:col-span-8 space-y-4 text-left">
                <span className="text-[9px] font-mono text-amber-500 uppercase tracking-[0.25em] block font-bold">
                  BULK SELECTION SHEET & SPECIFIERS / 批量仪式询货台与选品订制
                </span>
                <p className="text-xs font-light text-zinc-400">
                  买手批量向工坊确认尺码数量分布、外挂高订贴签（Bespoke labels）并统一下单生成 pro-forma 报价单。
                </p>

                {inquiryCart.length === 0 ? (
                  <div className="py-16 text-center border border-dashed rounded-lg font-mono text-zinc-550 flex flex-col justify-center items-center gap-3" style={{ borderColor: `${brandColors.text}10` }}>
                    <ClipboardList className="w-8 h-8 opacity-40 text-amber-500 animate-pulse" />
                    <p>您的批量询货台暂空。可在「高奢产品档案馆」直接备入首选大货款式。</p>
                    <button
                      onClick={() => { triggerHaptic(); setActivePortalView("ARCHIVE"); }}
                      className="px-4 py-1.5 bg-neutral-950 text-amber-500 text-[10px] font-bold border border-amber-900/30 font-mono rounded-none uppercase transition"
                    >
                      前往大货网格 / Go to Archive Catalog
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiryCart.map((item, index) => {
                      const moq = item.product.moq || 50;
                      const productQty = item.quantities.S + item.quantities.M + item.quantities.L + item.quantities.XL;
                      const isMoqViolated = productQty < moq;

                      const pricing = parsePricing(item.product.price, b2bTier);

                      return (
                        <div 
                          key={`${item.product.name}-${index}`}
                          className="p-5 border rounded bg-[#0b0c0e]/30 grid grid-cols-1 md:grid-cols-12 gap-5 relative text-xs"
                          style={{ borderColor: `${brandColors.text}14` }}
                        >
                          {/* Close item */}
                          <button
                            onClick={() => {
                              triggerHaptic();
                              setInquiryCart(prev => prev.filter((_, idx) => idx !== index));
                            }}
                            className="absolute top-2 right-2 text-zinc-550 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          {/* Info Column */}
                          <div className="md:col-span-4 space-y-1.5 align-top">
                            <h6 className="font-bold text-zinc-200 line-clamp-1">{item.product.name}</h6>
                            <p className="text-[10px] text-amber-500 font-mono italic">{item.product.material}</p>
                            
                            <div className="flex items-center gap-2 pt-1 font-mono text-[9px] text-zinc-500">
                              <span>Ref: AW26-{100 + index}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span className="text-zinc-400">出货价格: {pricing.text}</span>
                            </div>

                            {/* MOQ WARNING ALERT */}
                            {isMoqViolated && (
                              <div className="bg-amber-950/20 text-amber-400 border border-amber-900/30 p-1 px-2 text-[8px] font-mono rounded flex items-center gap-1.5 mt-2">
                                <Info className="w-3 h-3 block shrink-0" />
                                <span>未达该款最低起订量 ({moq}件)。追加分配!</span>
                              </div>
                            )}
                          </div>

                          {/* Quantities Editor Matrix */}
                          <div className="md:col-span-8 flex flex-col justify-center space-y-3 pt-2">
                            <span className="text-[8px] font-mono text-zinc-500 block uppercase tracking-wider">配型尺码分拨矩阵 / Qty Distribution Matrix</span>
                            
                            <div className="grid grid-cols-4 gap-2 font-mono text-[9.5px]">
                              {(["S", "M", "L", "XL"] as const).map(size => (
                                <div key={size} className="bg-black/30 border p-1 rounded-none flex flex-col items-center" style={{ borderColor: `${brandColors.text}10` }}>
                                  <span className="text-zinc-550 text-[8px] block uppercase font-bold">{size} SIZE</span>
                                  <input
                                    type="number"
                                    value={item.quantities[size]}
                                    onChange={(e) => handleInquiryQtyChange(index, size, parseInt(e.target.value) || 0)}
                                    className="bg-transparent text-center font-bold text-zinc-250 w-full outline-none mt-1"
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Custom Label spec remarks */}
                            <div className="flex gap-2 font-mono text-[9px]">
                              <span className="text-zinc-500 uppercase flex items-center whitespace-nowrap">外贴高订工艺备注:</span>
                              <input
                                type="text"
                                value={item.remarks}
                                onChange={(e) => {
                                  const updated = [...inquiryCart];
                                  updated[index].remarks = e.target.value;
                                  setInquiryCart(updated);
                                }}
                                className="bg-transparent border-b outline-none flex-1 text-zinc-300"
                                style={{ borderColor: `${brandColors.text}15` }}
                                placeholder="如: 要求19.5μm手工刺绣贴牌, 环保木骨架衣架挂袋出货"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Calculations & action Checkout summary */}
              <div className="lg:col-span-4 flex flex-col space-y-4">
                <div 
                  className="p-6 rounded border flex flex-col justify-between space-y-5"
                  style={{ 
                    borderColor: `${brandColors.text}15`, 
                    backgroundColor: `${brandColors.text}03` 
                  }}
                >
                  <div className="pb-3 border-b border-zinc-900 font-mono text-left">
                    <span className="text-[9px] text-zinc-500 uppercase block font-bold">INQUIRY BILL CALCULATOR</span>
                    <h5 className="text-[11.5px] text-zinc-300">系列大货首订费用预估</h5>
                  </div>

                  {(() => {
                    const stats = calculateInquiryTotals();
                    // Multi-volume discount rules
                    let appliedDiscount = 0;
                    if (stats.totalQty >= 500) {
                      appliedDiscount = 0.12; // 12% off for >500 pcs
                    } else if (stats.totalQty >= 200) {
                      appliedDiscount = 0.05; // 5% off for >200
                    }

                    const finalTotal = Math.round(stats.totalPrice * (1 - appliedDiscount));
                    const volumeSavings = Math.round(stats.totalPrice * appliedDiscount);

                    return (
                      <div className="space-y-4 text-xs font-light text-left">
                        <div className="space-y-2 font-mono text-[10.5px]">
                          <div className="flex justify-between">
                            <span className="text-zinc-550 font-bold uppercase">共配款式 / Designs:</span>
                            <span className="text-zinc-300">{inquiryCart.length} 款</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-550 font-bold uppercase">订货总计 / Total Qty:</span>
                            <span className="text-zinc-300">{stats.totalQty} 件</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-550 font-bold uppercase">原合规批发价 / Standard Wh:</span>
                            <span className="text-zinc-300">¥{stats.totalPrice * 7} CNY</span>
                          </div>

                          {appliedDiscount > 0 && (
                            <div className="flex justify-between text-amber-500">
                              <span className="font-bold uppercase">量大专属折扣 ({appliedDiscount * 100}% OFF):</span>
                              <span>- ¥{volumeSavings * 7} CNY</span>
                            </div>
                          )}

                          <div className="flex justify-between text-emerald-400">
                            <span className="font-bold uppercase">比公共零售省去 / Total Savings:</span>
                            <span>¥{(stats.savings + volumeSavings) * 7} CNY</span>
                          </div>

                          <div className="border-t border-zinc-900 pt-3 flex justify-between items-baseline">
                            <span className="font-bold text-zinc-300 uppercase text-[11px]">预计商定出厂价:</span>
                            <span className="text-lg font-black text-amber-500">¥{finalTotal * 7} CNY</span>
                          </div>
                        </div>

                        {/* Bulk remarks block */}
                        <div className="space-y-1.5 font-mono text-[10px] pt-2 border-t border-zinc-900">
                          <label className="text-zinc-550 uppercase font-bold block">大订单总体特殊需求备注 (General instructions)</label>
                          <textarea
                            value={orderRemarks}
                            onChange={(e) => setOrderRemarks(e.target.value)}
                            className="bg-black/25 p-2 rounded w-full border text-[9.5px] outline-none focus:border-amber-500 resize-none h-14"
                            style={{ borderColor: `${brandColors.text}10`, color: brandColors.text }}
                            placeholder="如: 对比色样色卡要求物理匹配度达4.8级, 需要提供 SGS 物理面料质检报告"
                          />
                        </div>

                        {/* Action export quote */}
                        {inquiryCart.length > 0 && (
                          <div className="space-y-2.5 pt-2">
                            <button
                              onClick={handleExportQuote}
                              disabled={isQuotesExporting}
                              className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-55 text-black font-semibold text-[10px] uppercase font-mono tracking-widest transition flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              {isQuotesExporting ? (
                                <>
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                  <span>Generating Invoice PDF...</span>
                                </>
                              ) : (
                                <>
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>导出高奢订货 pro-forma 报价单</span>
                                </>
                              )}
                            </button>
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest text-center block">
                              AUTOMATIC TAX RECONCILIATION ACTIVE
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Export quote success animation feedback */}
                  {quoteExportedSuccess && (
                    <div className="bg-emerald-950/25 border border-emerald-900/40 text-emerald-400 p-3 text-[10px] rounded font-mono flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 block shrink-0" />
                      <div>
                        <p className="font-bold">高奢批发报价单 PDF 已尊享导出</p>
                        <p className="text-[8.5px] opacity-80 mt-0.5">文件: CO_QUOTE_AW26_AWB.pdf (包含 SGS 物检、分级完税明细)。</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* SECTION 5: COUTURE PRODUCTION & ORDER TRACKING WALL */}
          {activePortalView === "TRACKING" && (
            <motion.div
              key="tracking-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Selector orders */}
              <div className="lg:col-span-4 space-y-4 text-left">
                <span className="text-[9px] font-mono text-amber-500 uppercase tracking-[0.25em] block font-bold">
                  ACTIVE B2B CONTRACT ORDERS / 大货订单追踪墙
                </span>
                <p className="text-xs font-light text-zinc-400">
                  跟踪您的工坊生产进度、SGS 织造耐磨检验日志与新月海关派送遥测，提供高奢买手极克制的进度推送。
                </p>

                <div className="space-y-2.5 pt-4">
                  {[
                    { id: "COSMO-B2B-8962-AW26", label: "AW26 托斯卡纳重型皮包订量首案", qty: "650 件大货", date: "AW26 Series" },
                    { id: "COSMO-B2B-1205-CASH", label: "AW26 蒙古顶度山羊绒成衣首批次", qty: "1,200 匹成衣", date: "AW26 Core" }
                  ].map(ord => {
                    const isSelected = selectedOrderNo === ord.id;
                    return (
                      <button
                        key={ord.id}
                        onClick={() => { triggerHaptic(); setSelectedOrderNo(ord.id); }}
                        className={`w-full text-left p-4 rounded border transition outline-none cursor-pointer ${
                          isSelected 
                            ? "border-amber-500/75 bg-amber-500/5 text-zinc-100" 
                            : "bg-transparent text-zinc-400 hover:text-zinc-200"
                        }`}
                        style={{ borderColor: isSelected ? undefined : `${brandColors.text}10` }}
                      >
                        <div className="space-y-1">
                          <span className="font-mono text-[8px] text-zinc-550 block">ORDER TRACKING #</span>
                          <span className="text-[11.5px] font-semibold">{ord.id}</span>
                          <div className="flex justify-between text-[9px] pt-1 font-mono text-zinc-500">
                            <span>批额: {ord.qty}</span>
                            <span>{ord.date}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Gantt Trajectory timeline */}
              <div 
                className="lg:col-span-8 rounded border p-6 flex flex-col justify-between"
                style={{ 
                  borderColor: `${brandColors.text}1a`,
                  backgroundColor: `${brandColors.text}03` 
                }}
              >
                <div className="space-y-6 text-left">
                  <div className="flex justify-between items-baseline border-b pb-3 mb-4" style={{ borderColor: `${brandColors.text}0b` }}>
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-mono text-zinc-500 uppercase block">LIVE TELEMETRY STATION</span>
                      <h4 className="text-lg font-light" style={{ fontFamily: displayFont }}>
                        进度轨迹追踪: <span className="font-mono text-sm bg-neutral-900 px-1.5 text-zinc-350">{selectedOrderNo}</span>
                      </h4>
                    </div>
                    <span className="bg-emerald-950/20 text-emerald-400 border border-emerald-900/30 text-[8.5px] font-mono px-2 py-0.5 rounded font-bold uppercase">
                      ● 生产中 (On Atelier loom)
                    </span>
                  </div>

                  {/* Horizontal Gantt chart Representation */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-[9px] text-zinc-400">
                    {[
                      { step: "1. 选皮纺线 / Yarn Spinner", date: "已完成 (Completed)", current: false, desc: "内蒙重度幼绒核检, 托斯卡纳原皮鞣制理化测试 passed" },
                      { step: "2. 首版确认 / Mock pattern", date: "已完成 (Completed)", current: false, desc: "买手样版实物确认, 立体剪裁线比例微调完成" },
                      { step: "3. 织造打板 / Weft Looming", date: "进行中 (65% ACTIVE)", current: true, desc: "Biella 进口无缝多针织机投机, 织造密度控制18GG" },
                      { step: "4. SGS 质检 / ISO Audit", date: "排定 (Pending)", current: false, desc: "耐摩擦色牢度等级 ISO 105 测试排期中" },
                      { step: "5. 新月海运 / Moonlight Sail", date: "排定 (Pending)", current: false, desc: "订量装甲高定密封箱运载, 安排次月新月前始离里昂港" }
                    ].map((phase, idx) => (
                      <div 
                        key={phase.step} 
                        className={`p-3 border rounded flex flex-col justify-between min-h-[110px] relative ${
                          phase.current 
                            ? "border-amber-500/50 bg-amber-500/5" 
                            : idx < 2 
                            ? "border-emerald-900/40 bg-emerald-950/5 opacity-80"
                            : "border-zinc-900 bg-neutral-950/15 opacity-60"
                        }`}
                      >
                        {/* Number Indicator */}
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-[8.5px] text-[#B39359]">0{idx + 1}</span>
                          <span className={`text-[7.5px] font-extrabold uppercase px-1 rounded ${
                            phase.current 
                              ? "bg-amber-500 text-black" 
                              : idx < 2 
                              ? "bg-emerald-950 text-emerald-400" 
                              : "bg-neutral-900 text-zinc-400"
                          }`}>{phase.date}</span>
                        </div>

                        <div className="space-y-1.5">
                          <p className="font-semibold text-zinc-200 text-[9.5px]">{phase.step.split(" / ")[0]}</p>
                          <p className="text-[8px] text-zinc-500 leading-normal line-clamp-2 truncate uppercase">{phase.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SGS Certified Log Check */}
                  <div className="bg-black/40 border p-3.5 rounded font-mono text-[9px] text-zinc-450 leading-relaxed space-y-2" style={{ borderColor: `${brandColors.text}0d` }}>
                    <div className="flex justify-between items-center text-[8px] text-zinc-500 uppercase font-black">
                      <span>SGS TENSION & TEXTILE AUDIT METRICS LOG (物理质检验收)</span>
                      <span className="text-emerald-500 font-bold">✓ ALL TEST PASS</span>
                    </div>
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-zinc-400">
                      <li>• Weaving Tension Ratio: 420N/50mm (Normative pass)</li>
                      <li>• Colorfastness Rubbing Rate: Wet Grade 4.5 | Dry Grade 4.8</li>
                      <li>• Pure Cashmere Purity Index: 98.6% Native Fiber verified</li>
                      <li>• Chromate Tanning Exceed limit: 0% Extreme non-toxic</li>
                    </ul>
                  </div>
                </div>

                <div 
                  className="mt-6 pt-4 border-t font-mono text-[9.5px] text-zinc-500 flex justify-between items-center" 
                  style={{ borderColor: `${brandColors.text}10` }}
                >
                  <span>MAPPED CONTAINER TELEMETRY: COSU-AW26-FR89</span>
                  <span>EST. DISPATCH: 14 BUSINESS DAYS</span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
