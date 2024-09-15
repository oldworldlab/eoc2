/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.yourdomain.com', // Adjust according to your use case
      },
    ],
  },
}

module.exports = nextConfig