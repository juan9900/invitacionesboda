import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16 uses Turbopack by default; filesystem caching is already on by
  // default (stable since v16.1.0). No extra memory flags needed.
  images: {
    // Next 16 only allows the qualities listed here (default `[75]`) and
    // coerces any other `quality` prop to the closest allowed value. 95 is for
    // the gifts background, which is scaled up and shows compression artifacts.
    qualities: [75, 95],
  },
};

export default nextConfig;
