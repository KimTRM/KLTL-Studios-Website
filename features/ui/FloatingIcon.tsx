"use client";

import { type ReactNode, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { iconHover } from "@/features/motion";

interface FloatingIconProps {
    children: ReactNode;
    /** Scale on hover (1 = no change) */
    hoverScale?: number;
    /** Glow color on hover */
    glowColor?: string;
    /** Additional class */
    className?: string;
    style?: CSSProperties;
    label?: string;
    href?: string;
}

/**
 * Wraps an icon with subtle hover glow + scale animation.
 * Uses Framer Motion for GPU-composited scale transform.
 *
 * WHY: Icons deserve micro-feedback — a gentle scale rewards curiosity.
 *      The glow is CSS filter (composited), keeping everything smooth.
 */
export default function FloatingIcon({
    children,
    hoverScale = 1.12,
    glowColor = "rgba(220, 20, 60, 0.35)",
    className = "",
    style,
    label,
    href,
}: FloatingIconProps) {
    const baseStyle: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: href ? "pointer" : "default",
        ...style,
    };

    const customHover = {
        rest: { ...iconHover.rest, filter: "none" },
        hover: {
            scale: hoverScale,
            filter: `drop-shadow(0 0 8px ${glowColor})`,
            transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
        },
    };

    const Tag = href ? "a" : "span";
    const MotionTag = motion.create(Tag);
    const linkProps = href
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : {};

    return (
        <MotionTag
            {...linkProps}
            className={className}
            style={baseStyle}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={customHover}
            aria-label={label}
        >
            {children}
        </MotionTag>
    );
}
