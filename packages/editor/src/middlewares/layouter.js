import {
  init,
  moveBox,
  setBoxes,
  addConnection,
  updateConnections,
  setConnections,
  setBoxRequests,
} from '../actions';

const layouter = layout => ({ dispatch, getState }) => next => action => {
  const result = next(action);

  switch (action.type) {
    case init.type:
    case addConnection.type:
    case setBoxes.type:
    case updateConnections.type: {
      const state = getState();
      const { connections, endsMissingBoxes } = layout(state);
      const boxRequests = endsMissingBoxes.map(({ id, port }) => ({
        id,
        port,
      }));

      dispatch(setBoxRequests(boxRequests));
      dispatch(setConnections(connections));
      break;
    }

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
