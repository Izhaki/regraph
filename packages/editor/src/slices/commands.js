import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'commands',
  initialState: {
    stack: [],
    current: null,
  },
  reducers: {
    add({ stack }, action) {
      stack.push(action.payload);
    },
    undo({ stack }) {
      stack.pop();
    },
  },
});
