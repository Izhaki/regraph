import {
  init,
  moveBox,
  updateBoxes,
  addConnection,
  updateConnections,
  setConnections,
  setBoxRequests,
} from '../actions';

// action.payload → connection → boolean
const actionNeedLayout = {
  [init]: () => () => true, // All connections need layout
  [updateBoxes]: updatedBoxes => ({ src, dst }) =>
    updatedBoxes[src.id] || updatedBoxes[dst.id],
  [updateConnections]: ({ ids }) => connection => ids.includes(connection.id),
  [addConnection]: ({ id: connectionId }) => connection =>
    connection.id === connectionId,
  [moveBox]: ({ id: boxId }) => ({ src, dst }) =>
    src.id === boxId || dst.id === boxId,
};

const layouter = layout => ({ dispatch, getState }) => {
  const preformLayout = needsLayout => {
    const state = getState();
    const { connections, endsMissingBoxes } = layout(state, needsLayout);

    if (endsMissingBoxes.length) {
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

    const needsLayout = actionNeedLayout[action.type];
    if (needsLayout) {
      preformLayout(needsLayout(action.payload));
    }

    return result;
  };
};

export default layouter;
