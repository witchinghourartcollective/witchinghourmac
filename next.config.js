const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
