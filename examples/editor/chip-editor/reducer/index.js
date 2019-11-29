import produce from 'immer';

import * as connections from './connections';
import * as markValidPorts from './markValidPorts';

const reducers = [connections, markValidPorts];

export default produce((state, action) => {
  reducers.forEach(reducer => {
    if (reducer[action.type]) {
      reducer[action.type](state, action);
    }
  });
});
