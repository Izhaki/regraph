import { createSlice } from '@reduxjs/toolkit';
import boxes from './boxes';

const { update: updateBoxes } = boxes.actions;

export default createSlice({
  name: 'boxRequests',
  initialState: [],
  reducers: {
    set(_, action) {
      return action.payload;
    },
  },
  extraReducers: {
    // Box requests lead to an updateBoxes action after render, so empty the requests.
    [updateBoxes]: () => [],
  },
});
