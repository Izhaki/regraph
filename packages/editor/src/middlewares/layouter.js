import {
  init,
  moveBox,
  setConnections,
  addConnection,
  updateConnections,
} from '../actions';

const layouter = layout => ({ dispatch, getState }) => next => action => {
  const result = next(action);

  switch (action.type) {
    case init.type:
    case addConnection.type:
    case updateConnections.type:
    case moveBox.type: {
      const state = getState();
      const { connections } = layout(state);
      dispatch(setConnections(connections));
      break;
    }
    default:
  }
  return result;
};

export default layouter;
