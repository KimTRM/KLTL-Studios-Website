"use client";

import type { ReactNode, CSSProperties } from "react";

interface SectionHeaderProps {
    /** Section label shown above the heading (e.g. "01") */
    label?: string;
    /** Main heading text */
    heading: string;
    /** Optional subtext */
    sub?: string;
    /** Alignment */
    align?: "left" | "center";
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export default function SectionHeader({
    label,
    heading,
    sub,
    align = "left",
    children,
    className = "",
    style,
}: SectionHeaderProps) {
    return (
        <header
            className={`section-header ${className}`}
            style={{
                textAlign: align,
                marginBottom: "2.5rem",
                ...style,
            }}
        >
            {label && (
                <span
                    style={{
                        display: "block",
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.75rem",
                        letterSpacing: "3px",
                        textTransform: "uppercase",
                        color: "var(--accent-maroon)",
                        marginBottom: "0.5rem",
                    }}
                >
                    {label}
                </span>
            )}
            <h2
                style={{
                    fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    color: "var(--moon-white)",
                    margin: 0,
                    lineHeight: 1.2,
                }}
            >
                {heading}
            </h2>
            {sub && (
                <p
                    style={{
                        marginTop: "0.75rem",
                        color: "var(--text-dim)",
                        fontSize: "1rem",
                        maxWidth: "50ch",
                        lineHeight: 1.7,
                        ...(align === "center" ? { marginLeft: "auto", marginRight: "auto" } : {}),
                    }}
                >
                    {sub}
                </p>
            )}
            {children}
        </header>
    );
}
