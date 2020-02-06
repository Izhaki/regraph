import { combineReducers } from '@reduxjs/toolkit';
import nodes from './slices/nodes';
import boxes from './slices/boxes';
import connections from './slices/connections';
import selected from './slices/selected';
import commands from './slices/commands';
import { reinstate } from './actions';

const slices = combineReducers({
  nodes: nodes.reducer,
  boxes: boxes.reducer,
  connections: connections.reducer,
  selected: selected.reducer,
  commands: commands.reducer,
});

// Used for undo/redo.
// Restores the a state, but without the commands slice
const rootReducer = (state, { type, payload: newRootState }) => {
  if (type === reinstate.type) {
    return {
      ...newRootState,
      commands: state.commands,
    };
  }
  return state;
};

export default (state, action) => {
  const intermediateState = slices(state, action);
  const finalState = rootReducer(intermediateState, action);
  return finalState;
};
