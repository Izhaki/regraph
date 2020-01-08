import { createSlice } from '@reduxjs/toolkit';
import { transpose } from '@regraph/geo/rect';

const slice = createSlice({
  name: 'boxes',
  initialState: [],
  reducers: {
    moveBox(boxes, action) {
      const { id, delta } = action.payload;
      boxes[id] = transpose(boxes[id], delta);
    },
    setBoxes(_boxes, action) {
      return action.payload.boxes;
    },
  },
});

export const { moveBox, setBoxes } = slice.actions;

export default slice.reducer;
