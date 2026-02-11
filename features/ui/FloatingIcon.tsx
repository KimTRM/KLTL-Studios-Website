"use client";

import { useState, type ReactNode, type CSSProperties } from "react";

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
 * Designed for monochrome icons with gentle interactivity.
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
    const [hovered, setHovered] = useState(false);

    const baseStyle: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition:
            "transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 600ms ease",
        transform: hovered ? `scale(${hoverScale})` : "scale(1)",
        filter: hovered ? `drop-shadow(0 0 8px ${glowColor})` : "none",
        cursor: href ? "pointer" : "default",
        ...style,
    };

    const Tag = href ? "a" : "span";
    const linkProps = href
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : {};

    return (
        <Tag
            {...linkProps}
            className={className}
            style={baseStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label={label}
        >
            {children}
        </Tag>
    );
}
