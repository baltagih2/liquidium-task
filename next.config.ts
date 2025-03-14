import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: "bis-ord-content.fra1.cdn.digitaloceanspaces.com",
      },
      { hostname: "bis-ord-renders.fra1.cdn.digitaloceanspaces.com" },
    ],
  },
};

export default nextConfig;
