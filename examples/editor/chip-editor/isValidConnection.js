const connectionAlreadyExist = (from, to, connections) => {
  const [src, dst] = from.type === 'output' ? [from, to] : [to, from];
  return connections.some(
    connection =>
      connection.id !== '@@draggedConnection' &&
      connection.src.id === src.id &&
      connection.dst.id === dst.id &&
      connection.src.port === src.port.id &&
      connection.dst.port === dst.port.id
  );
};

export default (src, dst, connections) =>
  src &&
  dst &&
  src.id !== dst.id &&
  src.type !== dst.type &&
  src.port &&
  dst.port &&
  src.port.type === dst.port.type &&
  !connectionAlreadyExist(src, dst, connections);
