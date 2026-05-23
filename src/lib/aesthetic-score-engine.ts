/**
 * Aesthetic Score Engine
 * Automatically audits visual and editorial properties to compute high-luxury commercial fitness scores.
 */

import { SingularityBrand } from "../types";

export interface AestheticMetrics {
  luxuryScore: number;       // 0 - 100
  silenceScore: number;      // 0 - 100
  editorialScore: number;    // 0 - 100
  premiumDensity: number;    // 0 - 100 (lower density mapping to better luxury)
  visualNoise: number;       // 0 - 100 (lower is calmer/more premium)
  passedThreshold: boolean;
}

export function evaluateAestheticScores(brand: SingularityBrand): AestheticMetrics {
  let luxuryScore = 80;
  let silenceScore = 75;
  let editorialScore = 82;
  let premiumDensity = 25;
  let visualNoise = 15;

  // 1. Audit materials and luxury tier
  const tier = brand.brandUnderstanding?.luxuryTier || "high-end";
  if (tier === "ultra-luxury") {
    luxuryScore += 12;
    silenceScore += 15;
    premiumDensity -= 10; // lower density
  } else if (tier === "niche-avantgarde") {
    luxuryScore += 8;
    silenceScore += 5;
    visualNoise += 8; // high tech friction
  }

  // 2. Audit copywriting literary depth
  const sloganLength = (brand.slogan || "").length;
  const bodyLength = (brand.editorialBlock?.body || "").length;
  if (sloganLength > 15 && sloganLength < 60) {
    editorialScore += 10;
  }
  if (bodyLength > 80) {
    editorialScore += 8;
  }

  // 3. Spacing analysis
  const spacingToken = brand.designTokens?.spacingMax || "gap-12";
  if (spacingToken === "gap-24") {
    silenceScore += 10;
    premiumDensity -= 5;
  } else if (spacingToken === "gap-16") {
    silenceScore += 5;
  } else if (spacingToken === "gap-12") {
    premiumDensity += 12; // tighter spacing
  }

  // 4. Color harmony check
  const bg = (brand.colors.background || "").toLowerCase();
  const text = (brand.colors.text || "").toLowerCase();
  
  // High contrast luxury colors (shades of whites, oyster, severe charcoal obsidian)
  if (bg === "#faf9f6" || bg === "#fdfcf7" || bg === "#fafafa" || bg === "#0a0a0a" || bg === "#141619") {
    luxuryScore += 6;
    visualNoise -= 5;
  }

  // Final clipping limits
  luxuryScore = Math.max(0, Math.min(100, luxuryScore));
  silenceScore = Math.max(0, Math.min(100, silenceScore));
  editorialScore = Math.max(0, Math.min(100, editorialScore));
  premiumDensity = Math.max(0, Math.min(100, premiumDensity));
  visualNoise = Math.max(0, Math.min(100, visualNoise));

  // Determine threshold match (Luxury OS standard is luxuryScore >= 85 and visualNoise <= 30)
  const passedThreshold = luxuryScore >= 85 && visualNoise <= 30;

  return {
    luxuryScore,
    silenceScore,
    editorialScore,
    premiumDensity,
    visualNoise,
    passedThreshold
  };
}

// 美学评分引擎 - 量化评估设计质量

export interface AestheticScore {
  luxuryScore: number; // 0-100, 奢华感
  silenceScore: number; // 0-100, 安静度
  editorialScore: number; // 0-100, 编辑感
  premiumDensity: number; // 0-1, 高级密度 (越低越好)
  visualNoise: number; // 0-100, 视觉噪音 (越低越好)
  overall: number; // 综合评分
  passed: boolean; // 是否通过阈值
  recommendations: string[]; // 改进建议
}

// 权重配置
const SCORE_WEIGHTS = {
  luxuryScore: 0.3,
  silenceScore: 0.25,
  editorialScore: 0.2,
  premiumDensity: 0.15,
  visualNoise: 0.1
};

// 通过阈值
const PASSING_THRESHOLDS = {
  overall: 75,
  luxuryScore: 70,
  silenceScore: 65
};

// 计算奢华分数
function calculateLuxuryScore(element: HTMLElement): number {
  if (typeof window === "undefined" || !element) return 50;
  const style = window.getComputedStyle(element);
  let score = 50; // 基础分
  
  // 1. 字体检查
  const fontFamily = style.fontFamily.toLowerCase();
  if (fontFamily.includes('didot') || fontFamily.includes('bodoni') || fontFamily.includes('playfair')) {
    score += 15;
  }
  
  // 2. 字间距检查
  const letterSpacing = parseFloat(style.letterSpacing);
  if (!isNaN(letterSpacing) && letterSpacing >= 0.05) {
    score += 10;
  }
  
  // 3. 颜色检查
  const color = style.color;
  if (!color.includes('rgb(255') && !color.includes('#fff')) { // 不是纯白
    score += 10;
  }
  
  // 4. 边距检查
  const margin = parseInt(style.margin || '0');
  if (margin >= 100) {
    score += 15;
  }
  
  return Math.min(100, score);
}

// 计算安静分数
function calculateSilenceScore(element: HTMLElement): number {
  if (!element) return 60;
  const children = element.children;
  let score = 60;
  
  // 1. 元素数量
  const childCount = children.length;
  if (childCount <= 5) score += 20;
  else if (childCount <= 10) score += 10;
  else score -= 10;
  
  // 2. 文本密度
  const textContent = element.textContent || '';
  const wordCount = textContent.split(/\s+/).filter(Boolean).length;
  if (wordCount <= 100) score += 10;
  else if (wordCount <= 200) score += 5;
  else score -= 5;
  
  // 3. 动画数量
  const animations = element.querySelectorAll('[class*="animate"], [style*="animation"]');
  if (animations.length === 0) score += 10;
  else if (animations.length <= 2) score += 5;
  else score -= 5;
  
  return Math.min(100, Math.max(0, score));
}

// 计算编辑分数
function calculateEditorialScore(element: HTMLElement): number {
  if (!element) return 50;
  let score = 50;
  
  // 1. 图片比例
  const images = Array.from(element.querySelectorAll('img'));
  const validRatios = images.filter(img => {
    const { width, height } = img.getBoundingClientRect();
    if (height === 0) return false;
    const ratio = width / height;
    // 允许微小浮点误差
    return Math.abs(ratio - 1) < 0.1 || Math.abs(ratio - 4/3) < 0.1 || Math.abs(ratio - 16/9) < 0.1;
  }).length;
  
  if (images.length > 0) {
    if (validRatios === images.length) score += 20;
    else if (validRatios >= images.length * 0.7) score += 10;
  }
  
  // 2. 排版层次
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (headings.length >= 2 && headings.length <= 4) score += 15;
  
  // 3. 对齐检查
  const rects = Array.from(element.children).map(child => 
    child.getBoundingClientRect()
  );
  
  const alignedX = new Set(rects.map(rect => Math.round(rect.left)));
  const alignedY = new Set(rects.map(rect => Math.round(rect.top)));
  
  if (alignedX.size <= 3 && alignedY.size <= 5) score += 15;
  
  return Math.min(100, score);
}

// 计算高级密度
function calculatePremiumDensity(element: HTMLElement): number {
  if (!element) return 0.5;
  const area = element.offsetWidth * element.offsetHeight;
  if (area === 0) return 0.5;
  
  // 计算内容占据的面积
  let contentArea = 0;
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_ELEMENT,
    null
  );
  
  let node: Element | null;
  while ((node = walker.nextNode() as Element | null)) {
    const rect = node.getBoundingClientRect();
    contentArea += rect.width * rect.height;
  }
  
  // 密度 = 内容面积 / 总面积
  const density = contentArea / area;
  
  // 转换为分数 (密度越低分数越高)
  if (density <= 0.3) return 0.9; // 非常稀疏
  if (density <= 0.5) return 0.7; // 适中
  if (density <= 0.7) return 0.5; // 较密
  return 0.3; // 非常密集
}

// 计算视觉噪音
function calculateVisualNoise(element: HTMLElement): number {
  if (typeof window === "undefined" || !element) return 0;
  const style = window.getComputedStyle(element);
  let noise = 0;
  
  // 1. 颜色数量
  const allElements = element.querySelectorAll('*');
  const colors = new Set<string>();
  allElements.forEach(el => {
    const elStyle = window.getComputedStyle(el);
    colors.add(elStyle.color);
    colors.add(elStyle.backgroundColor);
    colors.add(elStyle.borderColor);
  });
  
  if (colors.size > 5) noise += 20;
  else if (colors.size > 3) noise += 10;
  
  // 2. 字体数量
  const fonts = new Set<string>();
  allElements.forEach(el => {
    fonts.add(window.getComputedStyle(el).fontFamily);
  });
  
  if (fonts.size > 3) noise += 20;
  else if (fonts.size > 2) noise += 10;
  
  // 3. 圆角检查
  const borderRadius = style.borderRadius;
  if (borderRadius && borderRadius !== '0px') {
    const radiusValue = parseInt(borderRadius);
    if (!isNaN(radiusValue) && radiusValue > 8) noise += 15;
  }
  
  // 4. 阴影检查
  if (style.boxShadow && style.boxShadow !== 'none') noise += 10;
  if (style.textShadow && style.textShadow !== 'none') noise += 10;
  
  // 5. 渐变检查
  if (style.backgroundImage && style.backgroundImage.includes('gradient')) {
    noise += 25;
  }
  
  return Math.min(100, noise);
}

// 主评分函数
export function calculateAestheticScore(element: HTMLElement): AestheticScore {
  const luxuryScore = calculateLuxuryScore(element);
  const silenceScore = calculateSilenceScore(element);
  const editorialScore = calculateEditorialScore(element);
  const premiumDensity = calculatePremiumDensity(element);
  const visualNoise = calculateVisualNoise(element);
  
  // 计算综合分
  const overall = 
    luxuryScore * SCORE_WEIGHTS.luxuryScore +
    silenceScore * SCORE_WEIGHTS.silenceScore +
    editorialScore * SCORE_WEIGHTS.editorialScore +
    premiumDensity * 100 * SCORE_WEIGHTS.premiumDensity +
    (100 - visualNoise) * SCORE_WEIGHTS.visualNoise;
  
  // 生成改进建议
  const recommendations: string[] = [];
  if (luxuryScore < 70) recommendations.push('增加字间距至0.05em以上');
  if (silenceScore < 65) recommendations.push('减少页面元素数量，增加留白');
  if (editorialScore < 60) recommendations.push('统一图片比例，优化排版层次');
  if (visualNoise > 30) recommendations.push('减少颜色和字体种类，移除渐变和阴影');
  if (premiumDensity < 0.5) recommendations.push('内容过于密集，建议增加间距');
  
  const passed = 
    overall >= PASSING_THRESHOLDS.overall &&
    luxuryScore >= PASSING_THRESHOLDS.luxuryScore &&
    silenceScore >= PASSING_THRESHOLDS.silenceScore;
  
  return {
    luxuryScore: Math.round(luxuryScore),
    silenceScore: Math.round(silenceScore),
    editorialScore: Math.round(editorialScore),
    premiumDensity: parseFloat(premiumDensity.toFixed(2)),
    visualNoise: Math.round(visualNoise),
    overall: Math.round(overall),
    passed,
    recommendations
  };
}

// 批量评分
export function batchAestheticScore(elements: HTMLElement[]): Map<HTMLElement, AestheticScore> {
  const scores = new Map<HTMLElement, AestheticScore>();
  
  elements.forEach(element => {
    scores.set(element, calculateAestheticScore(element));
  });
  
  return scores;
}

// 自动重新生成触发器
export function shouldRegenerate(score: AestheticScore): boolean {
  return !score.passed || score.overall < 60;
}

// 生成评分报告
export function generateScoreReport(
  scores: AestheticScore | Map<HTMLElement, AestheticScore>,
  element?: HTMLElement
): string {
  if (scores instanceof Map) {
    let report = `美学评分报告 (共${scores.size}个元素)\n\n`;
    let passedCount = 0;
    
    scores.forEach((score, el) => {
      report += `元素: ${el.tagName}${el.id ? `#${el.id}` : ''}${el.className ? `.${el.className}` : ''}\n`;
      report += `综合分: ${score.overall}/100 ${score.passed ? '✅' : '❌'}\n`;
      report += `奢华分: ${score.luxuryScore} | 安静分: ${score.silenceScore} | 编辑分: ${score.editorialScore}\n`;
      report += `高级密度: ${score.premiumDensity} | 视觉噪音: ${score.visualNoise}\n`;
      
      if (score.recommendations.length > 0) {
        report += '改进建议:\n';
        score.recommendations.forEach(rec => {
          report += `  • ${rec}\n`;
        });
      }
      
      report += '\n';
      if (score.passed) passedCount++;
    });
    
    const passRate = Math.round((passedCount / scores.size) * 100);
    report += `通过率: ${passRate}% (${passedCount}/${scores.size})\n`;
    
    return report;
  } else {
    const score = scores as AestheticScore;
    return `单个元素美学评分报告\n
综合评分: ${score.overall}/100 ${score.passed ? '✅ 通过' : '❌ 未通过'}

详细分数:
• 奢华感: ${score.luxuryScore}/100
• 安静度: ${score.silenceScore}/100  
• 编辑感: ${score.editorialScore}/100
• 高级密度: ${score.premiumDensity}
• 视觉噪音: ${score.visualNoise}/100

${score.recommendations.length > 0 ? '改进建议:\n' + score.recommendations.map(r => `  • ${r}`).join('\n') : '✅ 符合所有高奢标准'}`;
  }
}
