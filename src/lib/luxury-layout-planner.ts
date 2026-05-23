/**
 * Luxury Layout Planner System
 * Orchestrates correct structural sections, padding rhythms, and visual pacing
 * across both mobile and desktop screen viewport states.
 */

import { SingularityBrand } from "../types";

export interface LayoutRhythmSection {
  id: string;
  componentType: string;
  bgOverride?: string;
  paddingY: string;    // "py-12" | "py-16" | "py-24" | "py-32"
  whitespaceRatio: number;
  hasAmbientAura: boolean;
}

export function plannedSections(brand: SingularityBrand): LayoutRhythmSection[] {
  // Ultra-luxury prioritizes quiet manifesto prior to product listings.
  // Standard high-end prioritizes heroic banner, products, then manifesto.
  const tier = brand.brandUnderstanding?.luxuryTier || "high-end";
  const layoutOrder: LayoutRhythmSection[] = [];

  // Every luxury plan starts with the Cinematic Hero Banner
  layoutOrder.push({
    id: "hero-section",
    componentType: "cinematic-hero",
    paddingY: "py-14 md:py-24",
    whitespaceRatio: 0.85,
    hasAmbientAura: true
  });

  if (tier === "ultra-luxury") {
    // Elegant manifesto acts as visual buffer early on
    layoutOrder.push({
      id: "manifesto-section",
      componentType: "luxury-brand-manifesto",
      paddingY: "py-20 md:py-32",
      whitespaceRatio: 0.92,
      hasAmbientAura: false
    });

    layoutOrder.push({
      id: "material-story-section",
      componentType: "material-story-section",
      paddingY: "py-16 md:py-24",
      whitespaceRatio: 0.88,
      hasAmbientAura: true
    });

    layoutOrder.push({
      id: "product-showcase",
      componentType: "editorial-product-grid",
      paddingY: "py-14 md:py-24",
      whitespaceRatio: 0.80,
      hasAmbientAura: false
    });
  } else {
    // Normal high-end pacing
    layoutOrder.push({
      id: "product-showcase",
      componentType: "editorial-product-grid",
      paddingY: "py-12 md:py-20",
      whitespaceRatio: 0.75,
      hasAmbientAura: false
    });

    layoutOrder.push({
      id: "material-story-section",
      componentType: "material-story-section",
      paddingY: "py-12 md:py-16",
      whitespaceRatio: 0.80,
      hasAmbientAura: true
    });

    layoutOrder.push({
      id: "manifesto-section",
      componentType: "luxury-brand-manifesto",
      paddingY: "py-16 md:py-24",
      whitespaceRatio: 0.85,
      hasAmbientAura: false
    });
  }

  // Common editorial sections for a sense of curated space
  layoutOrder.push({
    id: "spatial-gallery-section",
    componentType: "spatial-gallery",
    paddingY: "py-16 md:py-28",
    whitespaceRatio: 0.90,
    hasAmbientAura: true
  });

  return layoutOrder;
}

// 奢华布局规划器 - 智能空间分配

export interface LayoutPlan {
  sections: Array<{
    id: string;
    type: string;
    height: 'fullscreen' | 'oversized' | 'standard' | 'compact';
    marginTop: number; // px
    marginBottom: number; // px
    visualWeight: 'heavy' | 'medium' | 'light';
    scrollBehavior: 'normal' | 'sticky' | 'parallax' | 'fixed';
  }>;
  overall: {
    totalHeight: number; // 估算
    scrollDuration: number; // 预计滚动时间(ms)
    pace: 'luxury-slow' | 'cinematic' | 'editorial' | 'brisk';
    breakpoints: {
      mobile: { columns: 1; gutter: number };
      tablet: { columns: 2; gutter: number };
      desktop: { columns: 3; gutter: number };
    };
  };
}

// 节拍器 - 控制滚动节奏
export class LayoutMetronome {
  private baseDuration = 800; // 基础滚动时间(ms)
  
  calculatePace(luxuryTier: string): number {
    switch (luxuryTier) {
      case 'ultra': return this.baseDuration * 3;
      case 'premium': return this.baseDuration * 2;
      case 'editorial': return this.baseDuration * 1.5;
      default: return this.baseDuration;
    }
  }
  
  // 计算滚动到每个部分的时间
  calculateScrollTimes(heights: number[], pace: number): number[] {
    const times: number[] = [];
    let total = 0;
    
    heights.forEach(height => {
      const time = (height / 1000) * pace; // 简化计算
      times.push(total + time);
      total += time;
    });
    
    return times;
  }
}

// 视觉层级规划
export class VisualHierarchyPlanner {
  // 计算每个部分的视觉权重
  calculateVisualWeights(sections: Array<{ type: string; content?: any }>): Array<'heavy' | 'medium' | 'light'> {
    const weights: Array<'heavy' | 'medium' | 'light'> = [];
    
    const weightMap: Record<string, 'heavy' | 'medium' | 'light'> = {
      'cinematic-hero': 'heavy',
      'editorial-product-grid': 'medium',
      'museum-product-card': 'light',
      'luxury-brand-manifesto': 'heavy',
      'ritual-checkout': 'medium',
      'material-story-section': 'medium',
      'spatial-gallery': 'heavy',
      'immersive-lookbook': 'heavy',
      'ambient-footer': 'light'
    };
    
    sections.forEach(section => {
      weights.push(weightMap[section.type] || 'medium');
    });
    
    return weights;
  }
  
  // 确保视觉节奏 (重-轻-中-重-轻 等模式)
  optimizeVisualRhythm(weights: Array<'heavy' | 'medium' | 'light'>): Array<'heavy' | 'medium' | 'light'> {
    const optimized = [...weights];
    
    // 避免连续两个heavy
    for (let i = 0; i < optimized.length - 1; i++) {
      if (optimized[i] === 'heavy' && optimized[i + 1] === 'heavy') {
        optimized[i + 1] = 'medium';
      }
    }
    
    // 避免连续三个light
    for (let i = 0; i < optimized.length - 2; i++) {
      if (optimized[i] === 'light' && optimized[i + 1] === 'light' && optimized[i + 2] === 'light') {
        optimized[i + 1] = 'medium';
      }
    }
    
    return optimized;
  }
}

// 留白节奏规划
export class WhitespaceRhythmPlanner {
  // 计算各部分间距
  calculateMargins(
    visualWeights: Array<'heavy' | 'medium' | 'light'>,
    baseMargin: number = 120
  ): Array<{ top: number; bottom: number }> {
    const margins: Array<{ top: number; bottom: number }> = [];
    
    visualWeights.forEach((weight, index) => {
      let topMultiplier = 1;
      let bottomMultiplier = 1;
      
      // 根据前后权重调整间距
      if (index > 0) {
        const prevWeight = visualWeights[index - 1];
        if (weight === 'heavy' && prevWeight === 'light') {
          topMultiplier = 1.5;
        }
      }
      
      if (index < visualWeights.length - 1) {
        const nextWeight = visualWeights[index + 1];
        if (weight === 'heavy' && nextWeight === 'light') {
          bottomMultiplier = 1.5;
        }
      }
      
      // 根据自身权重调整
      if (weight === 'heavy') {
        topMultiplier *= 1.2;
        bottomMultiplier *= 1.2;
      } else if (weight === 'light') {
        topMultiplier *= 0.8;
        bottomMultiplier *= 0.8;
      }
      
      margins.push({
        top: Math.round(baseMargin * topMultiplier),
        bottom: Math.round(baseMargin * bottomMultiplier)
      });
    });
    
    return margins;
  }
  
  // 计算呼吸空间比例
  calculateBreathingSpace(
    totalHeight: number,
    contentHeights: number[]
  ): { ratio: number; status: 'optimal' | 'adequate' | 'crowded' } {
    const contentHeight = contentHeights.reduce((sum, h) => sum + h, 0);
    const whitespace = totalHeight - contentHeight;
    const ratio = totalHeight > 0 ? whitespace / totalHeight : 0;
    
    let status: 'optimal' | 'adequate' | 'crowded' = 'adequate';
    if (ratio >= 0.6) status = 'optimal';
    else if (ratio <= 0.4) status = 'crowded';
    
    return { ratio, status };
  }
}

// 图片节奏规划
export class ImagePacingPlanner {
  // 规划图片出现节奏
  planImageSequence(
    sections: Array<{ type: string; hasImages?: boolean }>
  ): Array<{ sectionIndex: number; imageCount: number; size: 'oversized' | 'large' | 'medium' | 'small' }> {
    const imagePlan: Array<{ sectionIndex: number; imageCount: number; size: 'oversized' | 'large' | 'medium' | 'small' }> = [];
    let imageSections = 0;
    
    sections.forEach((section, index) => {
      if (section.hasImages || this.sectionHasImages(section.type)) {
        imageSections++;
        
        // 控制图片密度
        let imageCount = 1;
        let size: 'oversized' | 'large' | 'medium' | 'small' = 'large';
        
        switch (section.type) {
          case 'cinematic-hero':
            imageCount = 1;
            size = 'oversized';
            break;
          case 'spatial-gallery':
            imageCount = 3;
            size = 'large';
            break;
          case 'editorial-product-grid':
            imageCount = 6;
            size = 'medium';
            break;
          case 'museum-product-card':
            imageCount = 1;
            size = 'medium';
            break;
          default:
            imageCount = 1;
            size = 'medium';
        }
        
        imagePlan.push({ sectionIndex: index, imageCount, size });
      }
    });
    
    // 确保图片分布均匀
    if (imageSections > 0) {
      const averageSpacing = sections.length / imageSections;
      if (averageSpacing < 2) {
        // 图片太密集，移除一些
        const toRemove = imagePlan.filter((_, i) => i % 2 === 1);
        toRemove.forEach(plan => {
          const idx = imagePlan.indexOf(plan);
          if (idx > -1) imagePlan.splice(idx, 1);
        });
      }
    }
    
    return imagePlan;
  }
  
  private sectionHasImages(type: string): boolean {
    const imageSections = [
      'cinematic-hero',
      'spatial-gallery',
      'editorial-product-grid',
      'museum-product-card',
      'immersive-lookbook',
      'material-story-section'
    ];
    return imageSections.includes(type);
  }
}

// 主布局规划器
export class LuxuryLayoutPlanner {
  private metronome = new LayoutMetronome();
  private hierarchyPlanner = new VisualHierarchyPlanner();
  private whitespacePlanner = new WhitespaceRhythmPlanner();
  private imagePlanner = new ImagePacingPlanner();
  
  plan(
    sections: Array<{ id: string; type: string; config?: any }>,
    luxuryTier: string = 'premium'
  ): LayoutPlan {
    // 1. 规划视觉层级
    const initialWeights = this.hierarchyPlanner.calculateVisualWeights(sections);
    const optimizedWeights = this.hierarchyPlanner.optimizeVisualRhythm(initialWeights);
    
    // 2. 规划留白节奏
    const baseMargin = luxuryTier === 'ultra' ? 150 : 
                      luxuryTier === 'premium' ? 120 :
                      luxuryTier === 'editorial' ? 90 : 60;
    const margins = this.whitespacePlanner.calculateMargins(optimizedWeights, baseMargin);
    
    // 3. 规划图片节奏
    const imagePlan = this.imagePlanner.planImageSequence(sections);
    
    // 4. 计算滚动节奏
    const sectionHeights = sections.map((section, index) => {
      const weight = optimizedWeights[index];
      switch (weight) {
        case 'heavy': return 1200;
        case 'medium': return 800;
        case 'light': return 500;
        default: return 600;
      }
    });
    
    const totalHeight = sectionHeights.reduce((sum, h) => sum + h, 0);
    const pace = this.metronome.calculatePace(luxuryTier);
    const scrollTimes = this.metronome.calculateScrollTimes(sectionHeights, pace);
    
    // 5. 构建布局计划
    const layoutSections = sections.map((section, index) => ({
      id: section.id,
      type: section.type,
      height: optimizedWeights[index] === 'heavy' ? 'oversized' as const : 
              optimizedWeights[index] === 'light' ? 'compact' as const : 'standard' as const,
      marginTop: margins[index].top,
      marginBottom: margins[index].bottom,
      visualWeight: optimizedWeights[index],
      scrollBehavior: this.getScrollBehavior(section.type, index)
    }));
    
    // 布局规划中保留 imagePlan，以满足参数匹配
    const spacingRatio = imagePlan.length > 0 ? 0.6 : 0.5;
    
    // 计算整体节奏
    let overallPace: 'luxury-slow' | 'cinematic' | 'editorial' | 'brisk' = 'editorial';
    switch (luxuryTier) {
      case 'ultra': overallPace = 'luxury-slow'; break;
      case 'premium': overallPace = 'cinematic'; break;
      case 'editorial': overallPace = 'editorial'; break;
      default: overallPace = 'brisk';
    }
    
    return {
      sections: layoutSections,
      overall: {
        totalHeight,
        scrollDuration: scrollTimes[scrollTimes.length - 1] || 0,
        pace: overallPace,
        breakpoints: {
          mobile: { columns: 1, gutter: 20 },
          tablet: { columns: 2, gutter: 30 },
          desktop: { columns: 3, gutter: 40 }
        }
      }
    };
  }
  
  private getScrollBehavior(type: string, index: number): 'normal' | 'sticky' | 'parallax' | 'fixed' {
    if (type === 'cinematic-hero' && index === 0) return 'fixed';
    if (type === 'luxury-brand-manifesto') return 'sticky';
    if (type === 'spatial-gallery') return 'parallax';
    return 'normal';
  }
  
  // 应用布局计划到DOM
  applyLayoutPlan(element: HTMLElement, plan: LayoutPlan): void {
    if (!element) return;
    const sections = element.querySelectorAll('.luxury-section');
    
    sections.forEach((sectionEl, index) => {
      const sectionPlan = plan.sections[index];
      if (!sectionPlan || !(sectionEl instanceof HTMLElement)) return;
      
      const style = sectionEl.style;
      style.marginTop = `${sectionPlan.marginTop}px`;
      style.marginBottom = `${sectionPlan.marginBottom}px`;
      style.minHeight = sectionPlan.height === 'oversized' ? '100vh' :
                       sectionPlan.height === 'compact' ? '50vh' : '80vh';
      
      // 应用滚动行为
      if (sectionPlan.scrollBehavior === 'sticky') {
        style.position = 'sticky';
        style.top = '0';
      } else if (sectionPlan.scrollBehavior === 'fixed') {
        style.position = 'fixed';
        style.top = '0';
        style.left = '0';
        style.width = '100%';
        style.zIndex = '1000';
      }
      
      // 添加数据属性供CSS使用
      sectionEl.dataset.visualWeight = sectionPlan.visualWeight;
      sectionEl.dataset.scrollBehavior = sectionPlan.scrollBehavior;
    });
    
    // 应用呼吸空间指示器
    const breathingSpace = this.whitespacePlanner.calculateBreathingSpace(
      plan.overall.totalHeight,
      plan.sections.map(s => 
        s.height === 'oversized' ? 1200 :
        s.height === 'compact' ? 500 : 800
      )
    );
    
    element.dataset.breathingSpace = breathingSpace.status;
    element.dataset.breathingRatio = breathingSpace.ratio.toFixed(2);
  }
}
