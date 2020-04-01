import { createAction } from '@reduxjs/toolkit';
import connections from './connections';
import nodes from './nodes';
import boxes from './boxes';
import selected from './selected';
import commands from './commands';
import tools from './tools';
import boxRequests from './boxRequests';

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

export const {
  add: addBox,
  update: updateBoxes,
  move: moveBox,
} = boxes.actions;

export const { select, clearSelection } = selected.actions;

export const { undo: undoCommand, redo: redoCommand } = commands.actions;

export const { setCurrent: setCurrentTool } = tools.actions;

export const { set: setBoxRequests } = boxRequests.actions;

// We enrich the addCommand payload with the afterState property.
// This is used for redo.
export const addCommand = payload => (dispatch, getState) => {
  dispatch(commands.actions.add({ ...payload, afterState: getState() }));
};

export const reinstate = createAction('reinstate');
