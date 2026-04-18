import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Explicitly set project root to avoid lockfile-based root inference warnings.
    turbopack: {
        root: process.cwd(),
    },
};

export default nextConfig;
