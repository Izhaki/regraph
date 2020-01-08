import { combineReducers } from '@reduxjs/toolkit';
import nodes from './nodes';
import boxes from './boxes';
import connections from './connections';
import selected from './selected';

export default combineReducers({
  nodes,
  boxes,
  connections,
  selected,
});
