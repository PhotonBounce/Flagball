/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  transpilePackages: ["@onlyflags/shared"],
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
