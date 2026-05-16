"use client";

import { useEffect, useRef, useState } from "react";

interface UseMobileScrollHoverOptions {
    activation?: "viewport-center" | "in-view";
    centerOffsetPx?: number;
    mobileMaxWidth?: number;
    threshold?: number;
    rootMargin?: string;
}

/**
 * Activates hover-like states on touch devices when an element is in view.
 * Desktop devices keep native hover behavior.
 */
export function useMobileScrollHover<T extends HTMLElement>(
    options: UseMobileScrollHoverOptions = {},
) {
    const {
        activation = "viewport-center",
        centerOffsetPx = 0,
        mobileMaxWidth = 767,
        threshold = 0.5,
        rootMargin = "0px 0px -10% 0px",
    } = options;
    const ref = useRef<T | null>(null);
    const [canHover, setCanHover] = useState(true);
    const [isMobileViewport, setIsMobileViewport] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
        );

        const updateHoverSupport = () => {
            setCanHover(mediaQuery.matches);
        };

        updateHoverSupport();
        mediaQuery.addEventListener("change", updateHoverSupport);

        return () => {
            mediaQuery.removeEventListener("change", updateHoverSupport);
        };
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            `(max-width: ${mobileMaxWidth}px)`,
        );

        const updateViewport = () => {
            setIsMobileViewport(mediaQuery.matches);
        };

        updateViewport();
        mediaQuery.addEventListener("change", updateViewport);

        return () => {
            mediaQuery.removeEventListener("change", updateViewport);
        };
    }, [mobileMaxWidth]);

    useEffect(() => {
        if (canHover || !isMobileViewport) {
            setIsActive(false);
            return;
        }

        const node = ref.current;
        if (!node) return;

        if (activation === "viewport-center") {
            let ticking = false;

            const updateActiveFromCenter = () => {
                const rect = node.getBoundingClientRect();
                const viewportCenter = window.innerHeight / 2 + centerOffsetPx;
                setIsActive(
                    rect.top <= viewportCenter && rect.bottom >= viewportCenter,
                );
                ticking = false;
            };

            const onScrollOrResize = () => {
                if (ticking) return;
                ticking = true;
                window.requestAnimationFrame(updateActiveFromCenter);
            };

            updateActiveFromCenter();
            window.addEventListener("scroll", onScrollOrResize, {
                passive: true,
            });
            window.addEventListener("resize", onScrollOrResize);

            return () => {
                window.removeEventListener("scroll", onScrollOrResize);
                window.removeEventListener("resize", onScrollOrResize);
            };
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsActive(entry.isIntersecting);
            },
            { threshold, rootMargin },
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [
        activation,
        canHover,
        centerOffsetPx,
        isMobileViewport,
        rootMargin,
        threshold,
    ]);

    return {
        ref,
        isActive,
    };
}
