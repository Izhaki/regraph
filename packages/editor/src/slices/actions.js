import connections from './connections';
import nodes from './nodes';
import boxes from './boxes';
import selected from './selected';

export const {
  add: addConnection,
  update: updateConnections,
  remove: removeConnections,
} = connections.actions;

export const {
  add: addNode,
  update: updateNodes,
  remove: removeNodes,
} = nodes.actions;

export const { set: setBoxes, move: moveBox } = boxes.actions;

export const { select, clearSelection } = selected.actions;
