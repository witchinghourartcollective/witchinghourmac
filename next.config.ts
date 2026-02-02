import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname)
  },
  experimental: {
    turbo: {
      root: path.resolve(__dirname)
    }
  }
};

export default nextConfig;
