export interface PremiumPhysicsTransition {
  type: "spring" | "tween";
  stiffness?: number; // low stiffness to represent heavy luxury inertia
  damping?: number; // high damping to eliminate all cheap bounciness
  mass?: number;
  duration?: number;
  ease?: string | number[];
}

export const MOTION_PHYSICS_PRESETS: Record<string, {
  entrance: PremiumPhysicsTransition;
  hover: PremiumPhysicsTransition;
  scrollParallax: number;
  desc: string;
}> = {
  pneumatic_lens: {
    entrance: {
      type: "spring",
      stiffness: 45, // slow progressive build
      damping: 24, // highly over-damped, absolutely zero shudder/bounce
      mass: 1.2
    },
    hover: {
      type: "tween",
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1] // clean exponential deceleration
    },
    scrollParallax: 0.05,
    desc: "Mimicking the internal pneumatic friction of premium heavy camera telephoto lenses."
  },
  cinematic_stillness: {
    entrance: {
      type: "tween",
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] // extreme ultra-slow deceleration luxury curve
    },
    hover: {
      type: "tween",
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    },
    scrollParallax: 0.02,
    desc: "Almost static Parisian publishing house feel. Elements glide slowly with nearly invisible friction."
  },
  silicon_fluid: {
    entrance: {
      type: "spring",
      stiffness: 85,
      damping: 38,
      mass: 0.9
    },
    hover: {
      type: "tween",
      duration: 0.4,
      ease: [0.25, 0.8, 0.25, 1]
    },
    scrollParallax: 0.08,
    desc: "Vite/Linear type interactive smoothness. Responsive yet deeply stabilized."
  }
};

export class PremiumMotionPhysics {
  /**
   * Translates our premium transition specs directly into Framer Motion / Motion.JS compatible parameters.
   */
  static getMotionSpecs(presetKey: "lens" | "stillness" | "fluid"): any {
    const key = presetKey === "lens" ? "pneumatic_lens" : presetKey === "stillness" ? "cinematic_stillness" : "silicon_fluid";
    const selected = MOTION_PHYSICS_PRESETS[key];
    
    return {
      transition: selected.entrance,
      hoverTransition: selected.hover,
      fadeVariants: {
        hidden: { opacity: 0, y: 12 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: selected.entrance.type === "tween" ? selected.entrance.duration : undefined,
            stiffness: selected.entrance.stiffness,
            damping: selected.entrance.damping,
            mass: selected.entrance.mass,
            ease: selected.entrance.ease
          }
        }
      }
    };
  }
}
