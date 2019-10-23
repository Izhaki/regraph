import { useMemo } from 'react';
import update from './update';

const { values } = Object;

const removeWhitespace = str => str.replace(/\s/g, '');

const toValidId = removeWhitespace;

const getEndId = end => end.id || `(${end.x},${end.y})`;

const getIdFromEnds = ({ src, dst }) => `${getEndId(src)}->${getEndId(dst)}`;

const stampId = (connection, idConnectionsMap) => {
  const id = toValidId(getIdFromEnds(connection));
  const stamped = { ...connection, id };
  (idConnectionsMap[id] = idConnectionsMap[id] || []).push(stamped);
  return stamped;
};

const ensureId = idConnectionsMap => connection =>
  connection.id ? connection : stampId(connection, idConnectionsMap);

const hasMultipleConnections = connections => connections.length > 1;

const deduplicate = idConnectionsMap => {
  values(idConnectionsMap)
    .filter(hasMultipleConnections)
    .forEach(connections => {
      connections.forEach((connection, index) => {
        // Mutating here is fine, as all connection are clones anyhow
        connection.id = `${index + 1}.${connection.id}`;
      });
    });
};

export default update(({ connections }) => ({
  connections: useMemo(() => {
    const idConnectionsMap = {};
    const connectionsWithIds = connections.map(ensureId(idConnectionsMap));
    deduplicate(idConnectionsMap);
    return connectionsWithIds;
  }, [connections]),
}));
