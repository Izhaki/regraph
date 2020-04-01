import {
  init,
  moveBox,
  setBoxes,
  addConnection,
  updateConnections,
  setConnections,
  setBoxRequests,
} from '../actions';

const layouter = layout => ({ dispatch, getState }) => {
  const preformLayout = (handleMissingBoxes, needsLayout) => {
    const state = getState();
    const { connections, endsMissingBoxes } = layout(state, needsLayout);

    if (handleMissingBoxes) {
      const boxRequests = endsMissingBoxes.map(({ id, port }) => ({
        id,
        port,
      }));
      dispatch(setBoxRequests(boxRequests));
    }

    dispatch(setConnections(connections));
  };

  return next => action => {
    const result = next(action);

    switch (action.type) {
      case init.type:
      case setBoxes.type: {
        preformLayout(true);
        break;
      }

      case updateConnections.type: {
        const { ids } = action.payload;
        const needsLayout = connection => ids.includes(connection.id);
        preformLayout(true, needsLayout);
        break;
      }

      case addConnection.type: {
        const connectionId = action.payload.id;
        const needsLayout = connection => connection.id === connectionId;
        preformLayout(true, needsLayout);
        break;
      }

      case moveBox.type: {
        const boxId = action.payload.id;
        const needsLayout = connection =>
          connection.src.id === boxId || connection.dst.id === boxId;
        preformLayout(true, needsLayout);
        break;
      }
      default:
    }
    return result;
  };
};

export default layouter;
