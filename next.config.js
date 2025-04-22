/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // TypeScript hataları için daha detaylı raporlama
  typescript: {
    ignoreBuildErrors: false,
  }
}

module.exports = nextConfig
