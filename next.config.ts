const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Netlify deployment configuration
  serverExternalPackages: ['bcryptjs'],
};

export default nextConfig;
