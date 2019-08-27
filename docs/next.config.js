const withPlugins = require('next-compose-plugins');
const rehypePrism = require('@mapbox/rehype-prism');
const withTM = require('next-transpile-modules');
const withCSS = require('@zeit/next-css');
const withMDX = require('@zeit/next-mdx')({
  options: {
    rehypePlugins: [rehypePrism],
  },
});
const aliases = require('../aliases.config');

module.exports = withPlugins(
  [
    withCSS,
    [withMDX, { pageExtensions: ['js', 'jsx', 'mdx'] }],
    [withTM, { transpileModules: Object.values(aliases) }],
  ],
  {
    webpack: config => {
      config.resolve.alias = {
        ...config.resolve.alias,
        ...aliases,
      };
      return config;
    },
  }
);
