import { createAction } from '@reduxjs/toolkit';
import connections from './connections';
import nodes from './nodes';
import boxes from './boxes';
import selected from './selected';
import commands from './commands';
import tools from './tools';

export const {
  set: setConnections,
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

export const { add: addBox, set: setBoxes, move: moveBox } = boxes.actions;

export const { select, clearSelection } = selected.actions;

export const { undo: undoCommand, redo: redoCommand } = commands.actions;

export const { setCurrent: setCurrentTool } = tools.actions;

// We enrich the addCommand payload with the afterState property.
// This is used for redo.
export const addCommand = payload => (dispatch, getState) => {
  dispatch(commands.actions.add({ ...payload, afterState: getState() }));
};

export const reinstate = createAction('reinstate');
