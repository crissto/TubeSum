/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  reactStrictMode: true,
  transpilePackages: [],
};

module.exports = nextConfig;
