import { mergeConnections } from '@regraph/core';
import { init, addConnection, setConnections } from '../actions';

const connectionDefaults = defaults => ({
  dispatch,
  getState,
}) => next => action => {
  switch (action.type) {
    case addConnection.type: {
      action.payload = mergeConnections(defaults, action.payload);
      break;
    }

    case init.type: {
      const state = getState();
      const connections = state.connections.map(connection =>
        mergeConnections(defaults, connection)
      );

      dispatch(setConnections(connections));
      break;
    }

    default:
  }
  return next(action);
};

export default connectionDefaults;
