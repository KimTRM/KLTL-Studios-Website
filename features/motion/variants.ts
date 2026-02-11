/**
 * Centralized Framer Motion variants for KLTL Studios.
 *
 * Design principles:
 * - Only animate opacity + transform (GPU-composited, no layout thrash)
 * - Calm, atmospheric easing — no aggressive springs or bounces
 * - Every variant has a purpose: guide the eye, reinforce depth, or reward interaction
 *
 * The KLTL identity is nocturnal, intentional, and quiet.
 * Motion should feel like starlight — present but never demanding.
 */
import type { Variants, Transition } from "framer-motion";

/* ─── Shared easing ─────────────────────────────────────── */
export const EASE_OUT_CUBIC: [number, number, number, number] = [
    0.25, 0.46, 0.45, 0.94,
];
export const EASE_OUT_QUART: [number, number, number, number] = [
    0.25, 1, 0.5, 1,
];

/** Default reveal transition — gentle deceleration */
export const REVEAL_TRANSITION: Transition = {
    duration: 0.7,
    ease: EASE_OUT_CUBIC,
};

/* ─── Section entrance ──────────────────────────────────── */
/**
 * Sections fade in with a subtle upward rise.
 * WHY: Creates a natural reading rhythm as user scrolls.
 *      The small translateY mimics depth emergence without being theatrical.
 */
export const sectionReveal: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { ...REVEAL_TRANSITION, duration: 0.8 },
    },
};

/* ─── Fade only (no positional shift) ───────────────────── */
export const fadeOnly: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: EASE_OUT_CUBIC },
    },
};

/* ─── Slide from left ───────────────────────────────────── */
export const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: -32 },
    visible: {
        opacity: 1,
        x: 0,
        transition: REVEAL_TRANSITION,
    },
};

/* ─── Slide from right ──────────────────────────────────── */
export const slideFromRight: Variants = {
    hidden: { opacity: 0, x: 32 },
    visible: {
        opacity: 1,
        x: 0,
        transition: REVEAL_TRANSITION,
    },
};

/* ─── Stagger container ─────────────────────────────────── */
/**
 * Parent container that staggers its children.
 * WHY: Text reveals feel more intentional when words/lines cascade
 *      rather than appearing simultaneously.
 */
export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

/** Individual stagger child — rise + fade */
export const staggerChild: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASE_OUT_CUBIC },
    },
};

/* ─── Project card hover ────────────────────────────────── */
/**
 * Cards lift slightly on hover with a soft Y translation.
 * WHY: Conveys interactivity and depth without disrupting layout.
 *      The subtle scale is intentionally absent — only Y-shift.
 */
export const cardHover = {
    rest: {
        y: 0,
        transition: { duration: 0.4, ease: EASE_OUT_CUBIC },
    },
    hover: {
        y: -4,
        transition: { duration: 0.35, ease: EASE_OUT_CUBIC },
    },
};

/* ─── Icon micro-interaction ────────────────────────────── */
/**
 * Icons scale gently on hover — never more than 1.12×.
 * WHY: Rewards curiosity without being distracting.
 *      The glow is handled via CSS filter, keeping FM lean.
 */
export const iconHover = {
    rest: {
        scale: 1,
        transition: { duration: 0.4, ease: EASE_OUT_CUBIC },
    },
    hover: {
        scale: 1.1,
        transition: { duration: 0.3, ease: EASE_OUT_CUBIC },
    },
};

/* ─── Hero-specific variants ────────────────────────────── */

/** Hero text stagger — slightly longer delays for dramatic entrance */
export const heroStagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

export const heroChild: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: EASE_OUT_CUBIC },
    },
};

/** Celestial orb — gentle scale-in */
export const orbReveal: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1.4, ease: EASE_OUT_QUART },
    },
};

/** Orbit ring — delayed fade-in */
export const orbitRingReveal: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1.2, ease: EASE_OUT_CUBIC, delay: 0.6 },
    },
};

/** Scroll indicator — late entrance */
export const scrollIndicatorReveal: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE_OUT_CUBIC, delay: 1.6 },
    },
};
