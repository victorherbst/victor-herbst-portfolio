import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.victorherbst.com.br' }],
        destination: 'https://victorherbst.com.br/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
