/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable static generation for auth pages
  experimental: {
    appDir: true,
  },
  // Handle static files from frontend
  async rewrites() {
    return [
      {
        source: '/app/:path*',
        destination: '/app',
      },
    ];
  },
  // Copy frontend build files to public
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  // Optimize for Vercel
  output: 'standalone',
  poweredByHeader: false,
};

module.exports = nextConfig; 