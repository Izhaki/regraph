import { createAction } from '@reduxjs/toolkit';
import connections from './connections';
import nodes from './nodes';
import boxes from './boxes';
import selected from './selected';
import commands from './commands';

export const {
  add: addConnection,
  update: updateConnections,
  remove: removeConnections,
} = connections.actions;

export const {
  set: setNodes,
  add: addNode,
  update: updateNodes,
  remove: removeNodes,
} = nodes.actions;

export const { set: setBoxes, move: moveBox } = boxes.actions;

export const { select, clearSelection } = selected.actions;

export const { add: addCommand } = commands.actions;
export const { undo: undoCommand } = commands.actions;

export const reinstate = createAction('reinstate');
