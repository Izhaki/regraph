import { mergeConnections } from '@regraph/core';
import { addConnection } from '../actions';

const connectionDefaults = defaults => () => next => action => {
  switch (action.type) {
    case addConnection.type: {
      action.payload = mergeConnections(defaults, action.payload);
      return next(action);
    }
    default:
  }
  return next(action);
};

connectionDefaults.applyToState = defaults => state => ({
  ...state,
  connections: state.connections.map(connection =>
    mergeConnections(defaults, connection)
  ),
});

export default connectionDefaults;
