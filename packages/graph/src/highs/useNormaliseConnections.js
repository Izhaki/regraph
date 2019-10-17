import { useMemo } from 'react';
import { isObject } from '@regraph/core/';
import update from './update';

const getNormalisedEnds = ({ src, dst }) => ({
  src: isObject(src) ? src : { id: src },
  dst: isObject(dst) ? dst : { id: dst },
});

const normaliseConnection = connection => {
  const { src, dst } = getNormalisedEnds(connection);
  const isNormalised = src !== connection.src || dst !== connection.dst;
  return isNormalised ? { ...connection, src, dst } : connection;
};

export default update(({ connections }) => ({
  connections: useMemo(() => connections.map(normaliseConnection), [
    connections,
  ]),
}));
