module.exports = {
  // reactStrictMode: true,
  images: {
    domains: [
      'picsum.photos',
      'images.ctfassets.net',
      'downloads.ctfassets.net',
    ],
  },
  webpack: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      // Unset client-side javascript that only works server-side
      fallback: { fs: false, module: false },
    },
  }),
};
