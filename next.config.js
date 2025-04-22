/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Static HTML Export için gerekli
  images: {
    unoptimized: true, // Cloudflare Pages için gerekli
  },
  trailingSlash: true, // URL sonlarına / ekler
}

module.exports = nextConfig
