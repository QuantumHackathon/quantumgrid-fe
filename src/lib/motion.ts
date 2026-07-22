import type { Variants, Transition } from 'framer-motion';

// ============================================
// Transition Presets
// ============================================

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

export const smoothTransition: Transition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1],
};

export const fastTransition: Transition = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1],
};

export const slowTransition: Transition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

// ============================================
// Fade Variants
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: smoothTransition,
  },
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
};

// ============================================
// Scale Variants
// ============================================

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: fastTransition,
  },
  tap: {
    scale: 0.98,
  },
};

// ============================================
// Stagger Container
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// ============================================
// Stagger Item
// ============================================

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

// ============================================
// Slide Variants
// ============================================

export const slideInFromLeft: Variants = {
  hidden: {
    x: '-100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: fastTransition,
  },
};

export const slideInFromRight: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: fastTransition,
  },
};

export const slideInFromBottom: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: smoothTransition,
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: fastTransition,
  },
};

// ============================================
// Glow Effect Variants
// ============================================

export const glowPulse: Variants = {
  initial: {
    boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
  },
  animate: {
    boxShadow: [
      '0 0 20px rgba(0, 212, 255, 0.3)',
      '0 0 40px rgba(0, 212, 255, 0.6)',
      '0 0 20px rgba(0, 212, 255, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const borderGlow: Variants = {
  initial: {
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  hover: {
    borderColor: 'rgba(0, 212, 255, 0.6)',
    boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
    transition: fastTransition,
  },
};

// ============================================
// Float Animation
// ============================================

export const floatAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================
// Card Variants
// ============================================

export const cardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 0 0 rgba(0, 212, 255, 0)',
  },
  hover: {
    y: -4,
    boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)',
    transition: smoothTransition,
  },
};

// ============================================
// Page Transition
// ============================================

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// ============================================
// Scroll Animation Factory
// ============================================

export function createScrollVariants(
  distance: number = 50,
  duration: number = 0.6
): Variants {
  return {
    hidden: {
      opacity: 0,
      y: distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };
}

// ============================================
// Network Line Animation
// ============================================

export const networkLineVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: 'easeInOut' },
      opacity: { duration: 0.5 },
    },
  },
};

export const networkNodeVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: springTransition,
  },
};

// ============================================
// Text Reveal
// ============================================

export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

// ============================================
// Viewport Config
// ============================================

export const viewportOnce = {
  once: true,
  margin: '-100px',
};

export const viewportAlways = {
  once: false,
  margin: '-50px',
};
