/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // disable static export behavior
  output: undefined,

  // NAYA ADDITION: External images ko Vercel par load hone allow karne ke liye
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
      },
      {
        protocol: 'http',
        hostname: '**', 
      }
    ],
  },
};

module.exports = nextConfig;