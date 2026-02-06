import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serverless output for Vercel deployment
  output: 'standalone',

  // Ensure Prisma client is included in the build
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
};

export default nextConfig;
