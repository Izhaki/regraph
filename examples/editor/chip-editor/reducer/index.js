import produce from 'immer';

import * as selection from './selection';
import * as connections from './connections';
import * as nodes from './nodes';
import * as boxes from './boxes';
import * as markValidPorts from './markValidPorts';

const reducers = [selection, connections, nodes, boxes, markValidPorts];

export default produce((state, action) => {
  reducers.forEach(reducer => {
    if (reducer[action.type]) {
      reducer[action.type](state, action);
    }
  });
});
