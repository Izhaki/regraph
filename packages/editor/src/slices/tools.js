import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'tools',
  initialState: {
    current: 0,
  },
  reducers: {
    setCurrent(tools, action) {
      tools.current = action.payload;
    },
  },
});
