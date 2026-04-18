/**
 * Motion barrel export.
 * Import all motion utilities from @/features/motion.
 */
export {
    sectionReveal,
    fadeOnly,
    slideFromLeft,
    slideFromRight,
    staggerContainer,
    staggerChild,
    cardHover,
    iconHover,
    heroStagger,
    heroChild,
    orbReveal,
    orbitRingReveal,
    scrollIndicatorReveal,
    EASE_OUT_CUBIC,
    EASE_OUT_QUART,
    REVEAL_TRANSITION,
} from "./variants";

export { useReducedMotion, useMotionProps } from "./useMotionProps";
// Note: useReducedMotion should NOT be used to conditionally change
// initial/children in SSR components — it causes hydration mismatches.
// Framer Motion v12 respects prefers-reduced-motion automatically.
