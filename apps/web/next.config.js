/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@onlyflags/shared"],
  images: {
    domains: ["localhost", "api.dicebear.com"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
