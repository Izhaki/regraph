const aliases = require('../aliases.config');
const resolveAlias = require('../resolveAlias');

module.exports = {
  presets: ['next/babel'],
  plugins: [
    '@babel/plugin-transform-object-assign', // for IE 11 support
    [
      'babel-plugin-module-resolver',
      {
        resolvePath: source => resolveAlias(source, aliases),
      },
    ],
  ],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
};
