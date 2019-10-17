import { useMemo } from 'react';
import update from './update';

const removeWhitespace = str => str.replace(/\s/g, '');

const toValidId = removeWhitespace;

const getEndId = end => end.id || `(${end.x},${end.y})`;

const getIdFromEnds = ({ src, dst }) => `${getEndId(src)}->${getEndId(dst)}`;

const stampId = update(connection => ({
  id: toValidId(getIdFromEnds(connection)),
}));

const ensureId = connection =>
  connection.id ? connection : stampId(connection);

export default update(({ connections }) => ({
  connections: useMemo(() => connections.map(ensureId), [connections]),
}));
