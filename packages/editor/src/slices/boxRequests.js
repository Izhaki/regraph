import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'boxRequests',
  initialState: [],
  reducers: {
    set(_, action) {
      return action.payload;
    },
  },
});
