"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  size: string;
  animationDuration: number;
  animationDelay: number;
  opacityPeak: number;
}

export function StarsBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1 + "px",
      // duration in seconds (2 - 4s) for looping ambient motion
      animationDuration: Math.random() * 2 + 2,
      animationDelay: Math.random() * 2,
      // make peak opacities more visible (0.4 - 1.0)
      opacityPeak: Math.random() * 0.6 + 0.4,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setPrefersReduced(Boolean(mq.matches));
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  if (stars.length === 0) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none animation-container"
      style={{ isolation: "isolate" }}
      aria-hidden
    >
      {stars.map((star) => {
        const glow = Math.max(2, parseFloat(star.size) * 2);
        const alpha = Math.min(0.25, star.opacityPeak);

        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              backgroundColor: "var(--starlight)",
              willChange: "transform, opacity",
              boxShadow: `0 0 ${glow}px rgb(var(--palette-light-1-rgb) / ${alpha})`,
            }}
            animate={{
              opacity: [0, star.opacityPeak, 0],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              duration: star.animationDuration,
              delay: star.animationDelay,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        );
      })}
    </div>
  );
}
