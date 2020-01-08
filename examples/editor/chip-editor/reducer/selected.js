import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'selection',
  initialState: [],
  reducers: {
    select(selected, action) {
      const { metas } = action.payload;
      selected.push(...metas);
    },
    deselect(selected, action) {
      const { all } = action.payload;
      if (all) {
        selected.length = 0;
      }
    },
  },
});

export const { select, deselect } = slice.actions;

export default slice.reducer;
