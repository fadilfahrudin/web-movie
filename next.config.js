/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shikimori.one',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
                port: '',
            },
        ],
    }
}

module.exports = nextConfig
