module.exports = {
  // reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
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
