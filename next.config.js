/** @type {import('next').NextConfig} */
process.setMaxListeners(0);
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
