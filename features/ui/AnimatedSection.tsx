"use client";

import { type ReactNode, type CSSProperties } from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { EASE_OUT_CUBIC } from "@/features/motion/variants";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    className?: string;
    /** Delay before animation starts (ms) */
    delay?: number;
    /** Animation direction */
    direction?: "up" | "down" | "left" | "right" | "none";
    /** Distance to translate (px) */
    distance?: number;
    /** Duration of animation (ms) */
    duration?: number;
    /** Intersection threshold (0-1) */
    threshold?: number;
    /** HTML tag to render */
    as?: keyof HTMLElementTagNameMap;
    style?: CSSProperties;
    /** Optional custom Framer Motion variants (overrides direction/distance) */
    variants?: Variants;
}

/**
 * A wrapper that fades/slides children into view on scroll.
 * Powered by Framer Motion for GPU-optimised opacity + transform animation.
 * Respects prefers-reduced-motion automatically.
 *
 * WHY Framer Motion over raw IntersectionObserver?
 * - Automatic will-change management and GPU compositing
 * - Built-in reduced-motion support
 * - Consistent easing across the entire site via centralized variants
 */
export default function AnimatedSection({
    children,
    className = "",
    delay = 0,
    direction = "up",
    distance = 28,
    duration = 800,
    threshold = 0.15,
    as: Tag = "div",
    style,
    variants: customVariants,
    ...rest
}: AnimatedSectionProps) {
    // Build direction-based variants if no custom variants provided
    const directionMap: Record<string, { x?: number; y?: number }> = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {},
    };

    const defaultVariants: Variants = {
        hidden: { opacity: 0, ...directionMap[direction] },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: duration / 1000,
                ease: EASE_OUT_CUBIC,
                delay: delay / 1000,
            },
        },
    };

    const variants = customVariants ?? defaultVariants;

    // Cast Tag to a motion-compatible component
    const MotionTag = motion.create(Tag as "div");

    return (
        <MotionTag
            className={className}
            style={style}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: threshold }}
            variants={variants}
            {...rest}
        >
            {children}
        </MotionTag>
    );
}
