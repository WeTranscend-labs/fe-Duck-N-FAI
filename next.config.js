/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // For static export
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: { unoptimized: true },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
