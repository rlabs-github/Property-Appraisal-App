// next.config.js
/** @type {import('next').NextConfig} */
const path = require('path'); // Import the Node.js 'path' module

const nextConfig = {
  reactStrictMode: true,

  // ✅ Ensure Next.js does not run ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Add API rewrite for Docker-based backend access
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:4000/api/:path*', // Docker service name
      },
    ];
  },

  // Webpack configuration for alias support
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
    };
    return config;
  },
};

module.exports = nextConfig;