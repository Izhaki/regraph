import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
  name: 'commands',
  initialState: {
    stack: [],
    head: -1,
  },
  reducers: {
    add(commands, action) {
      // If we had undos and then push a new commands we lose the redos.
      // So remove any commands _following_ the current head
      commands.stack.splice(commands.head + 1);
      // Push the new command
      commands.stack.push(action.payload);
      // Advance head
      commands.head += 1;
    },
    undo(commands) {
      commands.head -= 1;
    },
    redo(commands) {
      commands.head += 1;
    },
  },
});
