import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/mumbai-darshan-cab-service',
        destination: '/mumbai-darshan',
        statusCode: 301,
      },
      {
        source: '/terms',
        destination: '/terms-and-conditions',
        statusCode: 301,
      }
    ]
  },
}

export default withPayload(nextConfig)