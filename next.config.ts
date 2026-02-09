import type { NextConfig } from "next";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Serverless output for Vercel deployment
  output: 'standalone',

  // Ensure Prisma client is included in the build
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
};

export default nextConfig;
