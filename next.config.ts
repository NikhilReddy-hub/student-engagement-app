const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Netlify deployment configuration
  serverExternalPackages: ['bcryptjs'],
};

export default nextConfig;
