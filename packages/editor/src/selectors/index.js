import { createSelector } from '@reduxjs/toolkit';

const liftId = (_, id) => id;

const getConnections = state => state.connections;

export const getConnectionById = createSelector(
  [getConnections, liftId],
  (connections, connectionId) =>
    connections.find(connection => connection.id === connectionId)
);

export const getNodeConnections = createSelector(
  [getConnections, liftId],
  (connections, nodeId) =>
    connections.filter(
      connection => connection.src.id === nodeId || connection.dst.id === nodeId
    )
);

export const getNodeConnectionsIds = createSelector(
  [getNodeConnections],
  connections => connections.map(connection => connection.id)
);
