import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Vercel Blob public URLs (uploaded images in production)
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
