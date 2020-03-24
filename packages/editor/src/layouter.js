import { moveBox, replaceConnections } from './actions';

const layouter = layout => store => next => action => {
  const result = next(action);
  switch (action.type) {
    case moveBox.type: {
      const state = store.getState();
      const { connections } = layout(state);
      store.dispatch(replaceConnections(connections));
      break;
    }
    default:
  }
  return result;
};

export default layouter;
