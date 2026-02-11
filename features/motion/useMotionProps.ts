/**
 * Re-exports Framer Motion's useReducedMotion hook
 * and a helper that returns static props when the user prefers reduced motion.
 *
 * WHY: Centralizing this ensures every animated component respects
 *      prefers-reduced-motion without duplicating the check.
 *      Animations should never block interaction or cause discomfort.
 */
"use client";

import { useReducedMotion } from "framer-motion";

export { useReducedMotion };

/**
 * Returns animation props suitable for motion components.
 * When reduced motion is preferred, elements render in their final state immediately.
 */
export function useMotionProps(
    variants: { hidden: object; visible: object },
    viewport?: { once?: boolean; amount?: number },
) {
    const shouldReduce = useReducedMotion();

    if (shouldReduce) {
        // Render in final state — no animation at all
        return {
            initial: "visible",
            animate: "visible",
            variants,
        };
    }

    return {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.15, ...viewport },
        variants,
    };
}
