/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add your webpack configurations if needed
    return config
  },
  // Ensure proper image domains if you're using next/image
  images: {
    domains: ['your-domain.com'],
  },
}

module.exports = nextConfig 