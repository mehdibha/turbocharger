/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    remotePatterns: [],
  },
  reactStrictMode: false,
  transpilePackages: [
    "@turbocharger/ui",
    "@turbocharger/utils",
    "@turbocharger/database",
  ],
};
