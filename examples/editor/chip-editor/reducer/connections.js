import { createSlice } from '@reduxjs/toolkit';
import { remove as removeFromList, update } from './utils';

const slice = createSlice({
  name: 'connections',
  initialState: [],
  reducers: {
    addConnection(connections, action) {
      const connection = action.payload;
      connections.push(connection);
    },
    updateConnections(connections, action) {
      const { ids, updates } = action.payload;
      update(connections, ids, updates);
    },
    removeConnections(connections, action) {
      const { ids } = action.payload;
      ids.forEach(id => {
        removeFromList(connections, id);
      });
    },
  },
});

export const {
  addConnection,
  updateConnections,
  removeConnections,
} = slice.actions;

export default slice.reducer;
