/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'https://https://merch.biya.com.ng/auth/:path*'
      }
    ]
  }
};

export default nextConfig;
