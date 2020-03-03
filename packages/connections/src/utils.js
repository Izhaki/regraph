export const getUniqueId = ({ src, dst }, connections) => {
  const id = `${src.id}->${dst.id}`;
  const numDotId = new RegExp(`(\\d+).${id}`);
  const nextOrdinal = connections.reduce((maxOrdinal, connection) => {
    const match = connection.id.match(numDotId);
    const ordinal = match ? parseInt(match[1], 10) : 0;
    return Math.max(maxOrdinal, ordinal + 1);
  }, 1);
  return `${nextOrdinal}.${id}`;
};
