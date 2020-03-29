import { addNode } from '../actions';

const nodeDefaults = defaults => () => next => action => {
  switch (action.type) {
    case addNode.type: {
      action.payload = { ...defaults, ...action.payload };
      return next(action);
    }
    default:
  }
  return next(action);
};

nodeDefaults.applyToState = defaults => state => ({
  ...state,
  nodes: state.nodes.map(node => ({ ...defaults, ...node })),
});

export default nodeDefaults;
