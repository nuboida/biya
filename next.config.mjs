/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'http://http://merch.biya.com.ng:5000/auth/:path*'
      }
    ]
  }
};

export default nextConfig;
