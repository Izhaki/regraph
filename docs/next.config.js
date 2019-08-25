const rehypePrism = require('@mapbox/rehype-prism');
const withCSS = require('@zeit/next-css');
const withMDX = require('@zeit/next-mdx')({
  options: {
    hastPlugins: [rehypePrism],
  },
});

module.exports = withCSS(
  withMDX({
    pageExtensions: ['js', 'jsx', 'mdx'],
  })
);
