const aliases = require('./aliases.config');

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        // https://github.com/tleunen/babel-plugin-module-resolver/issues/338
        // There seem to be a bug with module-resolver under mono-repo setup:
        // It doesn't resolve paths correctly when using root/alias combo, so we
        // use this function instead.
        resolvePath(sourcePath) {
          // This will return undefined if aliases has no key for the sourcePath,
          // in which case module-resolver will fallback on its default behaviour.
          return aliases[sourcePath];
        },
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
