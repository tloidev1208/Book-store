import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"m.media-amazon.com",
        port: "",
      },
      {
        protocol:"https",
        hostname:"ik.imagekit.io",
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }

};

export default nextConfig;
