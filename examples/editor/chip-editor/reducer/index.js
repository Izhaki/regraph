import produce from 'immer';

import * as connections from './connections';
import * as boxes from './boxes';
import * as markValidPorts from './markValidPorts';

const reducers = [connections, boxes, markValidPorts];

export default produce((state, action) => {
  reducers.forEach(reducer => {
    if (reducer[action.type]) {
      reducer[action.type](state, action);
    }
  });
});
