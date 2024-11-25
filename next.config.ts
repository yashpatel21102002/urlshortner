import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint during the build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checks during the build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
