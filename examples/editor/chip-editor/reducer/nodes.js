import { createSlice } from '@reduxjs/toolkit';
import { remove, update } from './utils';

const slice = createSlice({
  name: 'nodes',
  initialState: [],
  reducers: {
    addNode(nodes, action) {
      const { node } = action.payload;
      nodes.push(node);
    },
    updateNodes(nodes, action) {
      const { ids, updates } = action.payload;
      update(nodes, ids, updates);
    },
    removeNodes(nodes, action) {
      const { ids } = action.payload;
      ids.forEach(id => {
        remove(nodes, id);
      });
    },
  },
});

export const { addNode, updateNodes, removeNodes } = slice.actions;

export default slice.reducer;
