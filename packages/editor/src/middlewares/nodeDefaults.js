import { init, addNode, setNodes } from '../actions';

const nodeDefaults = defaults => ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case addNode.type: {
      action.payload = { ...defaults, ...action.payload };
      return next(action);
    }

    case init.type: {
      const state = getState();
      const nodes = state.nodes.map(node => ({ ...defaults, ...node }));

      dispatch(setNodes(nodes));
      break;
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
