/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lightweight-charts'],
  output: 'export',
  trailingSlash: true,
};

module.exports = nextConfig;