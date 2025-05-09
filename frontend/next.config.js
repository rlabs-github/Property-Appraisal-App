// next.config.js
/** @type {import('next').NextConfig} */
const path = require('path'); // Import the Node.js 'path' module

const nextConfig = {
  reactStrictMode: true,

  // ✅ Ensure Next.js does not run ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
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