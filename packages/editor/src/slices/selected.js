import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'selection',
  initialState: [],
  reducers: {
    select(selected, action) {
      const { targets } = action.payload;
      selected.push(...targets);
    },
    deselect(selected, action) {
      const { all } = action.payload;
      if (all) {
        selected.length = 0;
      }
    },
  },
});
