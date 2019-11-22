/* Used by webpack, babel and eslint */

const { resolve } = require('path');

const getPackageSourcePath = packageName =>
  resolve(__dirname, `packages/${packageName}/src`);

module.exports = {
  docs: resolve(__dirname, 'docs'),
  examples: resolve(__dirname, 'examples'),
  '@regraph/core': getPackageSourcePath('core'),
  '@regraph/graph': getPackageSourcePath('graph'),
  '@regraph/geo': getPackageSourcePath('geo'),
  '@regraph/connections': getPackageSourcePath('connections'),
  '@regraph/nodes': getPackageSourcePath('nodes'),
  '@regraph/arrowheads': getPackageSourcePath('arrowheads'),
  '@regraph/editor': getPackageSourcePath('editor'),
};
