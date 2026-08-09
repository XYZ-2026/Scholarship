import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly disable standalone output on Vercel to allow Vercel's native serverless builder to construct page traces
  output: process.env.VERCEL ? undefined : "standalone",
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
