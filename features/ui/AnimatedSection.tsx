"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

interface AnimatedSectionProps {
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
}

/**
 * A wrapper that fades/slides children into view on scroll.
 * Uses IntersectionObserver — no third-party animation library needed.
 */
export default function AnimatedSection({
    children,
    className = "",
    delay = 0,
    direction = "up",
    distance = 32,
    duration = 800,
    threshold = 0.15,
    as: Tag = "div",
    style,
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    const translateMap: Record<string, string> = {
        up: `translateY(${distance}px)`,
        down: `translateY(-${distance}px)`,
        left: `translateX(${distance}px)`,
        right: `translateX(-${distance}px)`,
        none: "none",
    };

    const baseStyle: CSSProperties = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : translateMap[direction],
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
    };

    return (
        // @ts-expect-error - dynamic tag
        <Tag ref={ref} className={className} style={baseStyle}>
            {children}
        </Tag>
    );
}
