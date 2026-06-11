import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // GitHub Pages has no image optimization server; serve files as-is.
    unoptimized: true,
  },
};

export default nextConfig;
