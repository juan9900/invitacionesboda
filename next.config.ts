import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16 uses Turbopack by default; filesystem caching is already on by
  // default (stable since v16.1.0). No extra memory flags needed.
};

export default nextConfig;
