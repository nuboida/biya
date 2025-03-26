import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  async rewrites() {
    return process.env.NODE_ENV === "development" ? [
      {
        source: '/api/auth/:path*',
        destination: 'http://172.208.53.166:5000/api/v1/auth/:path*'
      },
      {
        source: '/api/employee/:employeeId',
        destination: 'http://172.208.53.166:5000/api/v1/employees/:employeeId'
      },
      {
        source: '/api/merchants/:merchantId/:path*',
        destination: 'http://172.208.53.166:5000/api/v1/merchants/:merchantId/:path*'
      },
      {
        source: '/api/:path*',
        destination: 'http://172.208.53.166:5000/api/v1/:path*'
      },
    ] : [
      {
        source: '/api/auth/:path*',
        destination: 'https://merch.biya.com.ng/api/v1/auth/:path*'
      },
      {
        source: '/api/employee/:employeeId',
        destination: 'https://merch.biya.com.ng/api/v1/employees/:employeeId'
      },
      {
        source: '/api/merchants/:merchantId/:path*',
        destination: 'https://merch.biya.com.ng/api/v1/merchants/:merchantId/:path*'
      },
      {
        source: "/api/:path*",
        destination: "https://merch.biya.com.ng/api/v1/:path*"
      },
    ];
  }
};

export default nextConfig;
