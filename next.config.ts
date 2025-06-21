import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ["ui-avatars.com", "https://objectstorage.eu-frankfurt-1.oraclecloud.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  output:'standalone',

  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://merchant.biya.com.ng/api/v1/auth/:path*'
      },
      {
        source: '/api/employee/:employeeId',
        destination: 'https://merchant.biya.com.ng/api/v1/employees/:employeeId'
      },
      {
        source: '/api/merchants/:path*',
        destination: 'https://merchant.biya.com.ng/api/v1/merchants/:path*'
      },
      {
        source: '/api/merchants/:merchantId/:path*',
        destination: 'https://merchant.biya.com.ng/api/v1/merchants/:merchantId/:path*'
      },
      {
        source: "/api/:path*",
        destination: "https://merchant.biya.com.ng/api/v1/:path*"
      },
    ];
  }
};

export default nextConfig;
