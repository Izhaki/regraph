module.exports.interfaceVersion = 2;

const resolveAlias = require('./resolveAlias');

module.exports.resolve = (source, file, aliases) => {
  const resolution = resolveAlias(source, aliases);
  if (resolveAlias(source, aliases)) {
    return { found: true, path: resolution };
  }
  return { found: false };
};
