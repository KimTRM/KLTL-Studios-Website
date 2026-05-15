import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Explicitly set project root to avoid lockfile-based root inference warnings.
    turbopack: {
        root: process.cwd(),
    },
    // Allow access to remote image placeholder.
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
                port: "",
                pathname: "/**", // This allows any path under the hostname
            },
        ],
    },
    transpilePackages: ["motion"],
};

export default nextConfig;
