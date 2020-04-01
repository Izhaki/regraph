import { createSlice } from '@reduxjs/toolkit';
import { transpose } from '@regraph/geo/rect';

export default createSlice({
  name: 'boxes',
  initialState: [],
  reducers: {
    add(boxes, action) {
      const { id, box } = action.payload;
      boxes[id] = box;
    },
    update(boxes, action) {
      const newBoxes = action.payload;
      return {
        ...boxes,
        ...newBoxes,
      };
    },
    move(boxes, action) {
      const { id, delta } = action.payload;
      boxes[id] = transpose(boxes[id], delta);
    },
  },
});
