/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                "source": "/(.*)",
                "destination": "/api/proxy"
            },
        ];
    },
}

module.exports = nextConfig
