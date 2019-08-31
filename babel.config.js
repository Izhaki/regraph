const aliases = require('./aliases.config');
const resolveAlias = require('./resolveAlias');

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        // https://github.com/tleunen/babel-plugin-module-resolver/issues/338
        // There seem to be a bug with module-resolver under mono-repo setup:
        // It doesn't resolve paths correctly when using root/alias combo, so we
        // use this function instead.
        // Will return undefined if not found in which case module-resolver will
        // fallback on its default behaviour.
        resolvePath: source => resolveAlias(source, aliases),
      },
    ],
  ],
  env: {
    debug: {
      sourceMaps: 'inline',
      retainLines: true,
    },
  },
};
