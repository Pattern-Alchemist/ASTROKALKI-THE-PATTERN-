import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  allowedDevOrigins: [
    "*.astrokalki.com",
    "www.astrokalki.com",
    "astrokalki.com",
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 112, 128],
  },
};

export default nextConfig;
