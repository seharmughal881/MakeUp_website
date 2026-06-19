import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow images from any host so pasted image links (from any site) render.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
