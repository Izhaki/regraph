module.exports.interfaceVersion = 2;

const resolveAlias = require('./resolveAlias');

module.exports.resolve = (source, file, aliases) => {
  const path = resolveAlias(source, aliases);
  return path ? { found: true, path } : { found: false };
};
