import { type Variants, type Transition } from "framer-motion";

export const transitions = {
  spring: {
    type: "spring",
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  } as Transition,
  springSoft: {
    type: "spring",
    stiffness: 80,
    damping: 25,
    mass: 1,
  } as Transition,
  springStiff: {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  } as Transition,
  tween: {
    type: "tween",
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1] as const,
  } as Transition,
  tweenSlow: {
    type: "tween",
    duration: 1.2,
    ease: [0.25, 0.1, 0.25, 1] as const,
  } as Transition,
  tweenFast: {
    type: "tween",
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1] as const,
  } as Transition,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.tween },
  exit: { opacity: 0, transition: transitions.tweenFast },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.tween,
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: transitions.tweenFast,
  },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: transitions.spring },
  exit: { opacity: 0, y: -30, transition: transitions.tweenFast },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: transitions.tween },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: transitions.tween },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.springSoft,
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export const textReveal: Variants = {
  hidden: { y: "100%", skewY: 2 },
  visible: {
    y: 0,
    skewY: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export const counterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export const menuAnimation: Variants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const menuLinkAnimation: Variants = {
  closed: { opacity: 0, x: 40 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const imageReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};
