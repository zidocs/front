import remarkFrontmatter from 'remark-frontmatter';
import nextMDX from '@next/mdx';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'meta' }],
    ],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
});

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: false,
};

export default withMDX(nextConfig);
