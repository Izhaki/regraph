module.exports.interfaceVersion = 2;

const resolveAlias = require('./resolveAlias');

module.exports.resolve = (source, file, aliases) => {
  const resolution = resolveAlias(source, aliases);
  return resolution ? { found: true, path: resolution } : { found: false };
};
