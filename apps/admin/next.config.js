/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@onlyflags/shared"],
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
