import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only enable standalone output for Docker builds (Vercel uses its native serverless output)
  ...(process.env.BUILD_STANDALONE === "true" ? { output: "standalone" } : {}),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
