import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'commands',
  initialState: {
    stack: [],
    head: -1,
  },
  reducers: {
    add(commands, action) {
      commands.head += 1;
      commands.stack.splice(commands.head);
      commands.stack.push(action.payload);
    },
    undo(commands) {
      commands.head -= 1;
    },
    redo(commands) {
      commands.head += 1;
    },
  },
});
