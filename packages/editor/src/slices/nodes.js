import { createSlice } from '@reduxjs/toolkit';
import { remove as removeList, update as updateList } from './utils';

export default createSlice({
  name: 'nodes',
  initialState: [],
  reducers: {
    add(nodes, action) {
      const { node } = action.payload;
      nodes.push(node);
    },
    update(nodes, action) {
      const { ids, updates } = action.payload;
      updateList(nodes, ids, updates);
    },
    remove(nodes, action) {
      const { ids } = action.payload;
      ids.forEach(id => {
        removeList(nodes, id);
      });
    },
  },
});
