/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// 高奢组件协议 - 所有组件必须遵守
export interface LuxuryComponentProtocol {
  // 组件等级
  tier: 'ultra' | 'premium' | 'editorial' | 'commercial';
  
  // 视觉安静度 (0-1, 越高越安静)
  silenceRatio: number;
  
  // 动效曲线
  motionProfile: 'luxury-slow' | 'cinematic' | 'ritual' | 'silent';
  
  // 信息密度 (0-1, 越低越高级)
  density: number;
  
  // 允许材质
  allowedMaterials: Array<
    'brushed-brass' | 'raw-ceramic' | 'smoked-glass' | 
    'obsidian' | 'raw-linen' | 'matte-black' | 'terracotta'
  >;
  
  // 视觉温度 (-1 冷峻, 0 中性, 1 温暖)
  visualTemperature: number;
  
  // 抗噪等级
  antiNoiseLevel: 1 | 2 | 3; // 1=严格, 3=宽松
  
  // 移动端行为
  mobileBehavior: {
    touchSpacing: number; // px
    overscrollBehavior: 'contain' | 'none';
    gestureAmplification: number; // 1.0-2.0
  };
  
  // 必须遵守的奢华法则
  enforcedLaws: Array<{
    id: string;
    description: string;
    validator: (component: any) => boolean;
  }>;

  // AI 助手行为规范
  aiConcierge?: {
    modality: 'icon' | 'subtle-text' | 'ambient-orb'; // 呈现形态
    activation: 'hover' | 'scroll-depth' | 'idle' | 'product-focus'; // 触发逻辑
    persona: 'curator' | 'archivist' | 'personal-shopper'; // 对话人格
    tone: 'reverent' | 'poetic' | 'minimalist'; // 语言风格
    
    // 必须遵守的“静默”规则
    maxInterruptionsPerSession: number;
    initialDelay: number; // 页面加载后延迟出现(ms)
  };
}
