const resolve = require('resolve');

module.exports = (source, aliases) => {
  // For require('alias')
  if (aliases[source]) {
    return aliases[source];
  }

  // For require('alias/x')
  const aliasNames = Object.keys(aliases);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < aliasNames.length; i++) {
    const alias = aliasNames[i];
    if (source.startsWith(alias)) {
      const path = source.replace(alias, aliases[alias]);
      return resolve.sync(path, { extensions: ['.js', '.jsx', '.ts', '.tsx'] });
    }
  }

  return undefined;
};
