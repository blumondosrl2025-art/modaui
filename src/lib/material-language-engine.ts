/**
 * Material Language Engine
 * Adapts visual feedback, shadows, blur, borders, and aura textures
 * to match selected luxury raw materials.
 */

export interface MaterialStyleConfig {
  shadowClass: string;
  blurClass: string;
  borderClass: string;
  grainOpacity: number;
  noiseSize: string;
  accentAuraColor: string;
}

export function lookupMaterialConfig(
  material: "brushed-brass" | "raw-ceramic" | "smoked-glass" | "obsidian" | "raw-linen" | "matte-black" | string
): MaterialStyleConfig {
  switch (material) {
    case "brushed-brass":
      return {
        shadowClass: "shadow-[0_4px_30px_rgba(197,168,128,0.08)]",
        blurClass: "backdrop-blur-sm",
        borderClass: "border-[0.5px] border-[#C5A880]/30",
        grainOpacity: 0.03,
        noiseSize: "16px 16px",
        accentAuraColor: "rgba(197, 168, 128, 0.08)"
      };

    case "raw-ceramic":
      return {
        shadowClass: "shadow-[0_12px_40px_rgba(44,38,33,0.04)]",
        blurClass: "backdrop-blur-none",
        borderClass: "border-[0.5px] border-[#2C2621]/20",
        grainOpacity: 0.05,
        noiseSize: "24px 24px",
        accentAuraColor: "rgba(160, 90, 66, 0.06)"
      };

    case "smoked-glass":
      return {
        shadowClass: "shadow-[2px_10px_40px_rgba(0,0,0,0.6)]",
        blurClass: "backdrop-blur-xl",
        borderClass: "border-[0.5px] border-white/10",
        grainOpacity: 0.015,
        noiseSize: "8px 8px",
        accentAuraColor: "rgba(144, 164, 174, 0.05)"
      };

    case "obsidian":
      return {
        shadowClass: "shadow-[0_12px_60px_rgba(0,0,0,0.95)]",
        blurClass: "backdrop-blur-lg",
        borderClass: "border-[0.5px] border-zinc-800/80",
        grainOpacity: 0.04,
        noiseSize: "32px 32px",
        accentAuraColor: "rgba(136, 136, 136, 0.04)"
      };

    case "raw-linen":
      return {
        shadowClass: "shadow-none",
        blurClass: "backdrop-blur-none",
        borderClass: "border-[0.5px] border-neutral-300/40",
        grainOpacity: 0.06,
        noiseSize: "28px 28px",
        accentAuraColor: "rgba(79, 93, 78, 0.04)"
      };

    case "matte-black":
    default:
      return {
        shadowClass: "shadow-[0_8px_32px_rgba(0,0,0,0.8)]",
        blurClass: "backdrop-blur-md",
        borderClass: "border-[0.5px] border-zinc-900",
        grainOpacity: 0.03,
        noiseSize: "12px 12px",
        accentAuraColor: "rgba(255, 255, 255, 0.03)"
      };
  }
}

// 材质语言引擎 - 材质到视觉的转换系统

export type MaterialType = 
  | 'brushed-brass'      // 拉丝黄铜
  | 'raw-ceramic'        // 粗陶
  | 'smoked-glass'       // 烟熏玻璃
  | 'obsidian'          // 黑曜石
  | 'raw-linen'         // 粗亚麻
  | 'matte-black'       // 哑光黑
  | 'terracotta'        // 赤陶
  | 'oxidized-copper'   // 氧化铜
  | 'concrete'          // 清水混凝土
  | 'oiled-wood'        // 油浸木
  | 'patina-bronze'     // 铜绿青铜
  | 'hammered-nickel';  // 锤纹镍

export interface MaterialProfile {
  id: MaterialType;
  name: string;
  description: string;
  visualProperties: {
    baseColor: string;
    highlightColor: string;
    shadowColor: string;
    roughness: number; // 0-1, 粗糙度
    metallic: number; // 0-1, 金属度
    sheen: number; // 0-1, 光泽度
    transparency: number; // 0-1, 透明度
  };
  typographyEffects: {
    fontFamily: string[];
    letterSpacing: number; // em
    fontWeight: number;
    textTransform: 'none' | 'uppercase' | 'lowercase';
  };
  spacingRules: {
    minMargin: number; // px
    sectionGap: number; // rem
    paragraphSpacing: number; // em
  };
  shadowRules: {
    blur: number; // px
    spread: number; // px
    opacity: number; // 0-1
    distance: number; // px
  };
  animationRules: {
    duration: number; // ms
    easing: string;
    delay: number; // ms
  };
  lightingRules: {
    ambient: number; // 0-1
    directional: number; // 0-1
    intensity: number; // 0-1
  };
  textureOverlay?: {
    url: string;
    blendMode: 'overlay' | 'multiply' | 'soft-light';
    opacity: number;
  };
}

// 材质数据库
const MATERIAL_DATABASE: Record<MaterialType, MaterialProfile> = {
  'brushed-brass': {
    id: 'brushed-brass',
    name: '拉丝黄铜',
    description: '温暖金属感，线性纹理，随时间产生自然氧化',
    visualProperties: {
      baseColor: '#B5A642',
      highlightColor: '#D4C15A',
      shadowColor: '#8C7A2B',
      roughness: 0.4,
      metallic: 0.8,
      sheen: 0.3,
      transparency: 0
    },
    typographyEffects: {
      fontFamily: ['Bodoni Moda', 'Didot', 'serif'],
      letterSpacing: 0.08,
      fontWeight: 400,
      textTransform: 'uppercase'
    },
    spacingRules: {
      minMargin: 120,
      sectionGap: 6,
      paragraphSpacing: 1.8
    },
    shadowRules: {
      blur: 20,
      spread: 0,
      opacity: 0.15,
      distance: 8
    },
    animationRules: {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      delay: 50
    },
    lightingRules: {
      ambient: 0.3,
      directional: 0.7,
      intensity: 0.8
    },
    textureOverlay: {
      url: '/textures/brushed-metal.jpg',
      blendMode: 'overlay',
      opacity: 0.1
    }
  },
  
  'raw-ceramic': {
    id: 'raw-ceramic',
    name: '粗陶',
    description: '自然质朴，哑光表面，细微颗粒质感',
    visualProperties: {
      baseColor: '#E8D8C5',
      highlightColor: '#F5EBDC',
      shadowColor: '#C7B8A5',
      roughness: 0.7,
      metallic: 0,
      sheen: 0.1,
      transparency: 0
    },
    typographyEffects: {
      fontFamily: ['GT America', 'Helvetica Now', 'sans-serif'],
      letterSpacing: 0.05,
      fontWeight: 300,
      textTransform: 'none'
    },
    spacingRules: {
      minMargin: 150,
      sectionGap: 8,
      paragraphSpacing: 2
    },
    shadowRules: {
      blur: 30,
      spread: 0,
      opacity: 0.08,
      distance: 4
    },
    animationRules: {
      duration: 800,
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
      delay: 100
    },
    lightingRules: {
      ambient: 0.6,
      directional: 0.4,
      intensity: 0.6
    }
  },
  
  'smoked-glass': {
    id: 'smoked-glass',
    name: '烟熏玻璃',
    description: '半透明深度，渐变层次，光线折射',
    visualProperties: {
      baseColor: '#1A1A1A',
      highlightColor: '#333333',
      shadowColor: '#0A0A0A',
      roughness: 0.2,
      metallic: 0.1,
      sheen: 0.6,
      transparency: 0.3
    },
    typographyEffects: {
      fontFamily: ['Neue Haas Grotesk', 'Inter', 'sans-serif'],
      letterSpacing: 0.12,
      fontWeight: 350,
      textTransform: 'uppercase'
    },
    spacingRules: {
      minMargin: 100,
      sectionGap: 4,
      paragraphSpacing: 1.6
    },
    shadowRules: {
      blur: 40,
      spread: 10,
      opacity: 0.2,
      distance: 0
    },
    animationRules: {
      duration: 1000,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      delay: 150
    },
    lightingRules: {
      ambient: 0.2,
      directional: 0.8,
      intensity: 1
    }
  },
  
  'obsidian': {
    id: 'obsidian',
    name: '黑曜石',
    description: '深邃黑色，镜面反射，锋利边缘',
    visualProperties: {
      baseColor: '#050505',
      highlightColor: '#1A1A1A',
      shadowColor: '#000000',
      roughness: 0.1,
      metallic: 0.9,
      sheen: 0.8,
      transparency: 0
    },
    typographyEffects: {
      fontFamily: ['Arial Black', 'Impact', 'sans-serif'],
      letterSpacing: 0.15,
      fontWeight: 900,
      textTransform: 'uppercase'
    },
    spacingRules: {
      minMargin: 200,
      sectionGap: 10,
      paragraphSpacing: 2.2
    },
    shadowRules: {
      blur: 0,
      spread: 0,
      opacity: 0,
      distance: 0
    },
    animationRules: {
      duration: 400,
      easing: 'cubic-bezier(0.7, 0, 0.84, 0)',
      delay: 0
    },
    lightingRules: {
      ambient: 0.1,
      directional: 0.9,
      intensity: 1
    }
  },
  
  'raw-linen': {
    id: 'raw-linen',
    name: '粗亚麻',
    description: '自然纹理，温暖触感，不规则编织',
    visualProperties: {
      baseColor: '#F5F1E8',
      highlightColor: '#FFFFFF',
      shadowColor: '#E5E1D8',
      roughness: 0.6,
      metallic: 0,
      sheen: 0.2,
      transparency: 0
    },
    typographyEffects: {
      fontFamily: ['Cormorant Garamond', 'Georgia', 'serif'],
      letterSpacing: 0.03,
      fontWeight: 300,
      textTransform: 'none'
    },
    spacingRules: {
      minMargin: 80,
      sectionGap: 3,
      paragraphSpacing: 1.5
    },
    shadowRules: {
      blur: 15,
      spread: 2,
      opacity: 0.1,
      distance: 2
    },
    animationRules: {
      duration: 500,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      delay: 30
    },
    lightingRules: {
      ambient: 0.8,
      directional: 0.2,
      intensity: 0.5
    },
    textureOverlay: {
      url: '/textures/linen-weave.jpg',
      blendMode: 'multiply',
      opacity: 0.15
    }
  },
  
  'matte-black': {
    id: 'matte-black',
    name: '哑光黑',
    description: '极致哑光，无反射，吸收所有光线',
    visualProperties: {
      baseColor: '#0F0F0F',
      highlightColor: '#1F1F1F',
      shadowColor: '#050505',
      roughness: 0.9,
      metallic: 0,
      sheen: 0,
      transparency: 0
    },
    typographyEffects: {
      fontFamily: ['Helvetica Now Display', 'SF Pro Display', 'sans-serif'],
      letterSpacing: 0.06,
      fontWeight: 400,
      textTransform: 'none'
    },
    spacingRules: {
      minMargin: 140,
      sectionGap: 5,
      paragraphSpacing: 1.7
    },
    shadowRules: {
      blur: 25,
      spread: 0,
      opacity: 0.12,
      distance: 6
    },
    animationRules: {
      duration: 700,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      delay: 80
    },
    lightingRules: {
      ambient: 0.4,
      directional: 0.6,
      intensity: 0.7
    }
  },

  'terracotta': {
    id: 'terracotta',
    name: '赤陶',
    description: '温暖红土色调，手工粘土粗糙感',
    visualProperties: {
      baseColor: '#C27D56',
      highlightColor: '#E6A780',
      shadowColor: '#8C5232',
      roughness: 0.75,
      metallic: 0,
      sheen: 0.05,
      transparency: 0
    },
    typographyEffects: {
      fontFamily: ['Cormorant Garamond', 'serif'],
      letterSpacing: 0.04,
      fontWeight: 300,
      textTransform: 'none'
    },
    spacingRules: {
      minMargin: 130,
      sectionGap: 7,
      paragraphSpacing: 1.9
    },
    shadowRules: {
      blur: 28,
      spread: 1,
      opacity: 0.11,
      distance: 5
    },
    animationRules: {
      duration: 750,
      easing: 'ease-out',
      delay: 90
    },
    lightingRules: {
      ambient: 0.7,
      directional: 0.3,
      intensity: 0.62
    }
  },

  'oxidized-copper': {
    id: 'oxidized-copper',
    name: '氧化铜',
    description: '铜绿质朴，多变灰绿斑驳质感',
    visualProperties: {
      baseColor: '#537A6D',
      highlightColor: '#7CAD9E',
      shadowColor: '#2E4C41',
      roughness: 0.6,
      metallic: 0.65,
      sheen: 0.25,
      transparency: 0
    },
    typographyEffects: {
      fontFamily: ['Bodoni Moda', 'serif'],
      letterSpacing: 0.07,
      fontWeight: 350,
      textTransform: 'uppercase'
    },
    spacingRules: {
      minMargin: 110,
      sectionGap: 5.5,
      paragraphSpacing: 1.75
    },
    shadowRules: {
      blur: 24,
      spread: 0,
      opacity: 0.14,
      distance: 7
    },
    animationRules: {
      duration: 650,
      easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
      delay: 60
    },
    lightingRules: {
      ambient: 0.45,
      directional: 0.55,
      intensity: 0.75
    }
  },

  'concrete': {
    id: 'concrete',
    name: '清水混凝土',
    description: '工业感，斑驳微孔，重力美学',
    visualProperties: {
      baseColor: '#8E9194',
      highlightColor: '#B6B9BC',
      shadowColor: '#636568',
      roughness: 0.8,
      metallic: 0.05,
      sheen: 0.02,
      transparency: 0
    },
    typographyEffects: {
      fontFamily: ['JetBrains Mono', 'monospace'],
      letterSpacing: 0.05,
      fontWeight: 400,
      textTransform: 'uppercase'
    },
    spacingRules: {
      minMargin: 160,
      sectionGap: 9,
      paragraphSpacing: 2.1
    },
    shadowRules: {
      blur: 35,
      spread: 2,
      opacity: 0.06,
      distance: 8
    },
    animationRules: {
      duration: 900,
      easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
      delay: 110
    },
    lightingRules: {
      ambient: 0.5,
      directional: 0.5,
      intensity: 0.55
    }
  },

  'oiled-wood': {
    id: 'oiled-wood',
    name: '油浸木',
    description: '天然年轮，深胡桃色泽，柔和漫反射',
    visualProperties: {
      baseColor: '#4A3427',
      highlightColor: '#6D5240',
      shadowColor: '#2D1F17',
      roughness: 0.5,
      metallic: 0,
      sheen: 0.4,
      transparency: 0
    },
    typographyEffects: {
      fontFamily: ['Playfair Display', 'serif'],
      letterSpacing: 0.03,
      fontWeight: 300,
      textTransform: 'none'
    },
    spacingRules: {
      minMargin: 100,
      sectionGap: 4.5,
      paragraphSpacing: 1.65
    },
    shadowRules: {
      blur: 22,
      spread: 0,
      opacity: 0.18,
      distance: 4
    },
    animationRules: {
      duration: 550,
      easing: 'ease-in-out',
      delay: 40
    },
    lightingRules: {
      ambient: 0.55,
      directional: 0.45,
      intensity: 0.68
    }
  },

  'patina-bronze': {
    id: 'patina-bronze',
    name: '铜绿青铜',
    description: '古典风霜，幽绿斑驳，厚重压舱感',
    visualProperties: {
      baseColor: '#47533E',
      highlightColor: '#6B7E60',
      shadowColor: '#2C3527',
      roughness: 0.65,
      metallic: 0.72,
      sheen: 0.18,
      transparency: 0
    },
    typographyEffects: {
      fontFamily: ['Bodoni Moda', 'Didot', 'serif'],
      letterSpacing: 0.1,
      fontWeight: 400,
      textTransform: 'uppercase'
    },
    spacingRules: {
      minMargin: 140,
      sectionGap: 6.5,
      paragraphSpacing: 1.95
    },
    shadowRules: {
      blur: 32,
      spread: 1,
      opacity: 0.13,
      distance: 9
    },
    animationRules: {
      duration: 720,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      delay: 75
    },
    lightingRules: {
      ambient: 0.4,
      directional: 0.6,
      intensity: 0.78
    }
  },

  'hammered-nickel': {
    id: 'hammered-nickel',
    name: '锤纹镍',
    description: '手工打制凹凸锤纹，闪耀金属光泽',
    visualProperties: {
      baseColor: '#9C9C9E',
      highlightColor: '#DFDFE1',
      shadowColor: '#69696A',
      roughness: 0.35,
      metallic: 0.85,
      sheen: 0.5,
      transparency: 0
    },
    typographyEffects: {
      fontFamily: ['Space Grotesk', 'sans-serif'],
      letterSpacing: 0.08,
      fontWeight: 300,
      textTransform: 'uppercase'
    },
    spacingRules: {
      minMargin: 110,
      sectionGap: 5,
      paragraphSpacing: 1.7
    },
    shadowRules: {
      blur: 18,
      spread: 0,
      opacity: 0.22,
      distance: 6
    },
    animationRules: {
      duration: 580,
      easing: 'ease-out',
      delay: 45
    },
    lightingRules: {
      ambient: 0.3,
      directional: 0.7,
      intensity: 0.85
    }
  }
};

// 材质引擎主类
export class MaterialLanguageEngine {
  private currentMaterial: MaterialType = 'matte-black';
  private appliedElements = new Set<HTMLElement>();
  
  // 设置材质
  setMaterial(material: MaterialType): void {
    this.currentMaterial = material;
    this.reapplyToAll();
  }
  
  // 获取当前材质配置
  getMaterialProfile(): MaterialProfile {
    return MATERIAL_DATABASE[this.currentMaterial];
  }
  
  // 获取所有可用材质
  getAllMaterials(): MaterialProfile[] {
    return Object.values(MATERIAL_DATABASE);
  }
  
  // 根据品牌描述推荐材质
  recommendMaterial(brandDescription: string): MaterialType {
    const desc = brandDescription.toLowerCase();
    
    if (desc.includes('铜') || desc.includes('金属') || desc.includes('温暖') || desc.includes('青铜')) {
      return 'brushed-brass';
    }
    
    if (desc.includes('陶') || desc.includes('土') || desc.includes('自然') || desc.includes('赤陶')) {
      return 'raw-ceramic';
    }
    
    if (desc.includes('玻璃') || desc.includes('透明') || desc.includes('现代') || desc.includes('烟熏')) {
      return 'smoked-glass';
    }
    
    if (desc.includes('黑') || desc.includes('暗') || desc.includes('锋利') || desc.includes('黑曜石')) {
      return 'obsidian';
    }
    
    if (desc.includes('亚麻') || desc.includes('布') || desc.includes('棉麻')) {
      return 'raw-linen';
    }
    
    return 'matte-black';
  }
  
  // 应用材质到元素
  applyToElement(element: HTMLElement, material?: MaterialType): void {
    if (!element) return;
    const profile = material ? MATERIAL_DATABASE[material] : this.getMaterialProfile();
    if (!profile) return;
    
    this.appliedElements.add(element);
    
    // 应用CSS变量
    const style = element.style;
    
    // 基础颜色
    style.setProperty('--material-base-color', profile.visualProperties.baseColor);
    style.setProperty('--material-highlight-color', profile.visualProperties.highlightColor);
    style.setProperty('--material-shadow-color', profile.visualProperties.shadowColor);
    
    // 材质属性
    style.setProperty('--material-roughness', profile.visualProperties.roughness.toString());
    style.setProperty('--material-metallic', profile.visualProperties.metallic.toString());
    style.setProperty('--material-sheen', profile.visualProperties.sheen.toString());
    
    // 排版
    style.fontFamily = profile.typographyEffects.fontFamily.join(', ');
    style.letterSpacing = `${profile.typographyEffects.letterSpacing}em`;
    style.fontWeight = profile.typographyEffects.fontWeight.toString();
    style.textTransform = profile.typographyEffects.textTransform;
    
    // 间距
    style.setProperty('--material-min-margin', `${profile.spacingRules.minMargin}px`);
    style.setProperty('--material-section-gap', `${profile.spacingRules.sectionGap}rem`);
    style.setProperty('--material-paragraph-spacing', `${profile.spacingRules.paragraphSpacing}em`);
    
    // 阴影
    style.setProperty('--material-shadow-blur', `${profile.shadowRules.blur}px`);
    style.setProperty('--material-shadow-spread', `${profile.shadowRules.spread}px`);
    style.setProperty('--material-shadow-opacity', profile.shadowRules.opacity.toString());
    style.setProperty('--material-shadow-distance', `${profile.shadowRules.distance}px`);
    
    // 动画
    style.setProperty('--material-animation-duration', `${profile.animationRules.duration}ms`);
    style.setProperty('--material-animation-easing', profile.animationRules.easing);
    style.setProperty('--material-animation-delay', `${profile.animationRules.delay}ms`);
    
    // 光照
    style.setProperty('--material-ambient-light', profile.lightingRules.ambient.toString());
    style.setProperty('--material-directional-light', profile.lightingRules.directional.toString());
    style.setProperty('--material-light-intensity', profile.lightingRules.intensity.toString());
    
    // 纹理覆盖
    if (profile.textureOverlay) {
      style.setProperty('--material-texture-url', `url("${profile.textureOverlay.url}")`);
      style.setProperty('--material-texture-blend-mode', profile.textureOverlay.blendMode);
      style.setProperty('--material-texture-opacity', profile.textureOverlay.opacity.toString());
    }
    
    // 添加材质类
    const classesToRemove = Array.from(element.classList).filter(c => c.startsWith('luxury-material-'));
    classesToRemove.forEach(c => element.classList.remove(c));
    element.classList.add(`luxury-material-${profile.id}`);
    
    // 设置数据属性
    element.dataset.material = profile.id;
    element.dataset.materialName = profile.name;
  }
  
  // 移除材质
  removeFromElement(element: HTMLElement): void {
    if (!element) return;
    this.appliedElements.delete(element);
    
    // 移除所有材质相关的CSS变量
    const style = element.style;
    const materialProps = Array.from(style)
      .filter(prop => prop.startsWith('--material-'));
    
    materialProps.forEach(prop => {
      style.removeProperty(prop);
    });
    
    // 移除材质类
    const materialClasses = Array.from(element.classList)
      .filter(className => className.startsWith('luxury-material-'));
    
    materialClasses.forEach(className => {
      element.classList.remove(className);
    });
    
    // 移除数据属性
    delete element.dataset.material;
    delete element.dataset.materialName;
  }
  
  // 重新应用到所有已应用的元素
  private reapplyToAll(): void {
    this.appliedElements.forEach(element => {
      this.applyToElement(element);
    });
  }
  
  // 生成材质CSS
  generateMaterialCSS(material: MaterialType): string {
    const profile = MATERIAL_DATABASE[material];
    if (!profile) return '';
    
    return `
/* ${profile.name} - ${profile.description} */
.luxury-material-${material} {
  /* 颜色系统 */
  --material-base-color: ${profile.visualProperties.baseColor};
  --material-highlight-color: ${profile.visualProperties.highlightColor};
  --material-shadow-color: ${profile.visualProperties.shadowColor};
  
  /* 材质属性 */
  --material-roughness: ${profile.visualProperties.roughness};
  --material-metallic: ${profile.visualProperties.metallic};
  --material-sheen: ${profile.visualProperties.sheen};
  
  /* 间距系统 */
  --material-min-margin: ${profile.spacingRules.minMargin}px;
  --material-section-gap: ${profile.spacingRules.sectionGap}rem;
  --material-paragraph-spacing: ${profile.spacingRules.paragraphSpacing}em;
  
  /* 阴影系统 */
  --material-shadow-blur: ${profile.shadowRules.blur}px;
  --material-shadow-spread: ${profile.shadowRules.spread}px;
  --material-shadow-opacity: ${profile.shadowRules.opacity};
  --material-shadow-distance: ${profile.shadowRules.distance}px;
  
  /* 动画系统 */
  --material-animation-duration: ${profile.animationRules.duration}ms;
  --material-animation-easing: ${profile.animationRules.easing};
  --material-animation-delay: ${profile.animationRules.delay}ms;
  
  /* 光照系统 */
  --material-ambient-light: ${profile.lightingRules.ambient};
  --material-directional-light: ${profile.lightingRules.directional};
  --material-light-intensity: ${profile.lightingRules.intensity};
  
  ${profile.textureOverlay ? `
  /* 纹理覆盖 */
  --material-texture-url: url("${profile.textureOverlay.url}");
  --material-texture-blend-mode: ${profile.textureOverlay.blendMode};
  --material-texture-opacity: ${profile.textureOverlay.opacity};
  ` : ''}
  
  /* 基础样式 */
  background-color: var(--material-base-color);
  color: var(--material-highlight-color);
  font-family: ${profile.typographyEffects.fontFamily.join(', ')};
  letter-spacing: ${profile.typographyEffects.letterSpacing}em;
  font-weight: ${profile.typographyEffects.fontWeight};
  text-transform: ${profile.typographyEffects.textTransform};
}
    `;
  }
  
  // 生成所有材质的CSS
  generateAllMaterialCSS(): string {
    return Object.keys(MATERIAL_DATABASE)
      .map(key => this.generateMaterialCSS(key as MaterialType))
      .join('\n\n');
  }
}
