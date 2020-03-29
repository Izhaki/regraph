import { useMemo } from 'react';
import update from './update';
import { mergeConnections } from '@regraph/core';

export default defaults =>
  update(({ connections = [] }) => ({
    connections: useMemo(
      () =>
        connections.map(connection => mergeConnections(defaults, connection)),
      [connections]
    ),
  }));
