import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'selection',
  initialState: [],
  reducers: {
    select(selected, action) {
      const { targets } = action.payload;
      selected.push(...targets);
    },
    clearSelection(selected) {
      selected.length = 0;
    },
  },
});
