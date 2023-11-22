const nextConfig = {
  //trailingSlash: true,
  //output: 'export',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: false,
  transpilePackages: [],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zidocs-assets.nyc3.cdn.digitaloceanspaces.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
