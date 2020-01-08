import { combineReducers } from '@reduxjs/toolkit';
import nodes from './slices/nodes';
import boxes from './slices/boxes';
import connections from './slices/connections';
import selected from './slices/selected';

export default combineReducers({
  nodes: nodes.reducer,
  boxes: boxes.reducer,
  connections: connections.reducer,
  selected: selected.reducer,
});
