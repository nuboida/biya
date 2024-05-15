/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return process.env.NODE_ENV === "development" ? [
      {
        source: '/api/auth/:path*',
        destination: 'http://merch.biya.com.ng:5000/api/v1/auth/:path*'
      },
      {
        source: '/auth',
        destination: 'http://merch.biya.com.ng:5000/api/v1/auth'
      },
      {
        source: '/api/merchant/:path*',
        destination: 'http://merch.biya.com.ng:5000/api/v1/merchant/:path*'
      }
    ] : [
      {
        source: '/api/auth/login',
        destination: 'https://merch.biya.com.ng/api/v1/auth/login'
      },
      {
        source: '/api/auth',
        destination: 'https://merch.biya.com.ng/api/v1/auth'
      },
      {
        source: '/api/merchant/:path*',
        destination: 'https://merch.biya.com.ng/api/v1/merchant/:path*'
      }
    ];
  }
};

export default nextConfig;
