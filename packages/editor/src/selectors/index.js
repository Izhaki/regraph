import { createSelector } from '@reduxjs/toolkit';

const liftId = (_, id) => id;

const getConnections = state => state.connections;
const getCommands = state => state.commands;

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

export const getUndoCommand = createSelector(
  [getCommands],
  ({ stack, head }) => stack[head]
);

export const getRedoCommand = createSelector(
  [getCommands],
  ({ stack, head }) => stack[head + 1]
);
