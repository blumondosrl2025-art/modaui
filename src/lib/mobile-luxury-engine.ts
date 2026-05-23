// 移动端奢华引擎 - 移动优先的高奢体验

import { useEffect, useState } from "react";

export interface MobileLuxuryConfig {
  // 触控系统
  touch: {
    minTouchTarget: number; // px, 最小触控目标
    touchFeedback: 'haptic' | 'visual' | 'both' | 'none';
    swipeSensitivity: number; // 1-10
    longPressDuration: number; // ms
  };
  
  // 滚动系统
  scroll: {
    momentum: boolean;
    overscrollBehavior: 'contain' | 'none' | 'auto';
    snapPoints: boolean;
    parallaxIntensity: number; // 0-1
  };
  
  // 视觉系统
  visual: {
    oversizeImagery: boolean;
    cinematicScroll: boolean;
    dynamicTypography: boolean;
    reducedMotion: boolean;
  };
  
  // 布局系统
  layout: {
    verticalRhythm: number; // 基础垂直节奏(px)
    horizontalPadding: number; // 水平内边距(px)
    safeAreaInset: boolean;
    adaptiveSpacing: boolean;
  };
  
  // 动效系统
  motion: {
    luxurySpeed: number; // 奢华模式速度乘数
    gestureAmplification: number; // 手势放大倍数
    physicsFidelity: 'high' | 'medium' | 'low';
  };
}

// 移动奢华体验优化器
export class MobileLuxuryEngine {
  private config: MobileLuxuryConfig = {
    touch: {
      minTouchTarget: 44,
      touchFeedback: 'both',
      swipeSensitivity: 5,
      longPressDuration: 500
    },
    scroll: {
      momentum: true,
      overscrollBehavior: 'contain',
      snapPoints: true,
      parallaxIntensity: 0.3
    },
    visual: {
      oversizeImagery: true,
      cinematicScroll: true,
      dynamicTypography: true,
      reducedMotion: false
    },
    layout: {
      verticalRhythm: 8,
      horizontalPadding: 20,
      safeAreaInset: true,
      adaptiveSpacing: true
    },
    motion: {
      luxurySpeed: 1.5,
      gestureAmplification: 1.2,
      physicsFidelity: 'high'
    }
  };
  
  private isMobileDevice = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    }
  }

  // 检测是否为移动端
  getIsMobile(): boolean {
    return this.isMobileDevice;
  }

  // 更新配置
  updateConfig(newConfig: Partial<MobileLuxuryConfig>): void {
    this.config = {
      ...this.config,
      ...newConfig
    };
  }

  // 获取当前配置
  getConfig(): MobileLuxuryConfig {
    return this.config;
  }

  // 触控触觉回馈模拟 (Web Haptic Vibration API)
  triggerHaptic(duration = 8): void {
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      if (this.config.touch.touchFeedback === "haptic" || this.config.touch.touchFeedback === "both") {
        window.navigator.vibrate(duration);
      }
    }
  }

  // 计算移动网格及触控区域自适应
  optimizeElementTouchTargets(element: HTMLElement): void {
    if (!element) return;
    const buttons = element.querySelectorAll("button, [role='button'], a");
    buttons.forEach((btn) => {
      const el = btn as HTMLElement;
      const rect = el.getBoundingClientRect();
      const minTarget = this.config.touch.minTouchTarget;

      // 自动拓展过小的触控目标 (小于最小44px目标高宽时)
      let needsAdjustment = false;
      if (rect.width < minTarget) {
        const diffX = minTarget - rect.width;
        el.style.paddingLeft = `${parseFloat(el.style.paddingLeft || "0") + diffX / 2}px`;
        el.style.paddingRight = `${parseFloat(el.style.paddingRight || "0") + diffX / 2}px`;
        needsAdjustment = true;
      }
      if (rect.height < minTarget) {
        const diffY = minTarget - rect.height;
        el.style.paddingTop = `${parseFloat(el.style.paddingTop || "0") + diffY / 2}px`;
        el.style.paddingBottom = `${parseFloat(el.style.paddingBottom || "0") + diffY / 2}px`;
        needsAdjustment = true;
      }

      if (needsAdjustment) {
        el.style.display = "inline-flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
      }

      // 添加防多次重复触发微缩阻尼类 (防止轻佻连点)
      el.classList.add("touch-target-optimized");
    });
  }

  // 自适应流式排版字体缩放规则
  getAdaptiveFontSize(desktopSizePx: number, minScale = 0.82): number {
    if (!this.isMobileDevice) return desktopSizePx;
    // 根绝流体方程式收缩
    return Math.max(desktopSizePx * minScale, 14);
  }

  // 写入全身流体惯性与仪式微振动CSS
  generateMobileEngineStyles(): string {
    return `
/* 移动端奢华体验专用全局样式 */
.mobile-luxury-container {
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: ${this.config.scroll.overscrollBehavior};
}

.luxury-snap-viewport {
  scroll-snap-type: y mandatory;
}

.luxury-snap-section {
  scroll-snap-align: start;
}

/* 高雅触控模拟微形变 */
.touch-target-optimized {
  min-width: ${this.config.touch.minTouchTarget}px;
  min-height: ${this.config.touch.minTouchTarget}px;
  transition: transform ${300 * this.config.motion.luxurySpeed}ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms;
}

.touch-target-optimized:active {
  transform: scale(0.96);
  opacity: 0.85;
}

/* 安全区自维护轨道 */
.safe-padding-bottom {
  padding-bottom: env(safe-area-inset-bottom, 16px);
}

.safe-padding-top {
  padding-top: env(safe-area-inset-top, 16px);
}
    `;
  }
}

// React 自适应钩子
export function useMobileLuxury() {
  const [isMobile, setIsMobile] = useState(false);
  const [engine] = useState(() => new MobileLuxuryEngine());

  useEffect(() => {
    setIsMobile(engine.getIsMobile());
    
    // 自适应执行DOM优化
    if (engine.getIsMobile()) {
      const container = document.getElementById("chrono-root-app");
      if (container) {
        engine.optimizeElementTouchTargets(container);
      }
    }
  }, [engine]);

  const triggerHapticFeedback = (duration = 8) => {
    engine.triggerHaptic(duration);
  };

  return {
    isMobile,
    engine,
    triggerHapticFeedback,
    config: engine.getConfig()
  };
}
