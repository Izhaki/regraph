import { createSlice } from '@reduxjs/toolkit';
import { transpose } from '@regraph/geo/rect';

export default createSlice({
  name: 'boxes',
  initialState: [],
  reducers: {
    set(_boxes, action) {
      return action.payload.boxes;
    },
    move(boxes, action) {
      const { id, delta } = action.payload;
      boxes[id] = transpose(boxes[id], delta);
    },
  },
});
