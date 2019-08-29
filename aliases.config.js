/* Used by webpack, babel and eslint */

const { resolve } = require('path');

const getPackageSourcePath = packageName =>
  resolve(__dirname, `packages/${packageName}/src`);

module.exports = {
  docs: resolve(__dirname, 'docs'),
  '@regraph/graph': getPackageSourcePath('graph'),
  '@regraph/connections': getPackageSourcePath('connections'),
};
