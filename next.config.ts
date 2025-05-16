import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.turkekspres.com.tr",
      },
      {
        protocol: "https",
        hostname: "images.dog.ceo",
      },

    ]
  }
};

export default nextConfig;
