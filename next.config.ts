import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Needed so Prisma's generated client is bundled correctly in Next.js
    serverExternalPackages: ['@prisma/client', 'prisma', 'twilio'],

    images: {
        formats: ['image/webp', 'image/avif'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;
