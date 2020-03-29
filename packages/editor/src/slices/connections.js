import { createSlice } from '@reduxjs/toolkit';
import { remove as removeFromList, update as updateList } from './utils';

export default createSlice({
  name: 'connections',
  initialState: [],
  reducers: {
    set(_, action) {
      return action.payload;
    },
    add(connections, action) {
      const connection = action.payload;
      connections.push(connection);
    },
    update(connections, action) {
      const { ids, updates } = action.payload;
      updateList(connections, ids, updates);
    },
    remove(connections, action) {
      const { ids } = action.payload;
      ids.forEach(id => {
        removeFromList(connections, id);
      });
    },
  },
});
