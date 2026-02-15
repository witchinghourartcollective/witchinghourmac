const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.join(__dirname)
  },
  output: "export",
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
