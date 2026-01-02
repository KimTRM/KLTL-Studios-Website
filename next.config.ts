import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'output: export' for Vercel deployment with dynamic routes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    unoptimized: false,
  },
  trailingSlash: true,
}

export default nextConfig;
