import { loomify } from '@regraph/graph/highs/useLoomer';
import {
  init,
  addConnection,
  updateConnections,
  setConnections,
} from '../actions';

const layouter = ({ dispatch, getState }) => next => action => {
  const result = next(action);

  switch (action.type) {
    case init.type:
    case addConnection.type:
    case updateConnections.type: {
      const state = getState();
      const connections = loomify(state.connections);
      dispatch(setConnections(connections));
      break;
    }
    default:
  }
  return result;
};

export default layouter;
