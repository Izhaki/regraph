import { isObject } from '@regraph/core/';

const toValidId = str => str.replace(/([^A-Za-z0-9[\]{}_.:-])\s?/g, '');

const getEndId = end => (isObject(end) ? end.id || `(${end.x},${end.y})` : end);

const getConnectionIdByEnds = ({ src, dst }) =>
  `${getEndId(src)}->${getEndId(dst)}`;

export default connection =>
  toValidId(connection.id || getConnectionIdByEnds(connection));
