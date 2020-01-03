import getDomainMeta from '../getDomainMeta';
import connectionTool from './connectionTool';
import moveTool from './moveTool';
import selectionTool from './selectionTool';

export default store => {
  let currentTool = null;

  const getMeta = action => {
    const state = store.getState();
    return getDomainMeta(action.event.target, state);
  };

  const tools = {
    connection: connectionTool(store),
    move: moveTool(store),
    selection: selectionTool(store),
  };

  const targetTypeToTool = {
    input: tools.connection,
    output: tools.connection,
    node: tools.move,
  };

  return next => action => {
    switch (action.type) {
      case 'dragStart': {
        const meta = getMeta(action);
        if (meta.draggable) {
          action.meta = meta;
          currentTool = targetTypeToTool[meta.type];
          return currentTool(next)(action);
        }
        return false; // Cancel drag
      }

      case 'drag':
      case 'dragEnd': {
        return currentTool(next)(action);
      }
      case 'click': {
        return tools.selection(next)(action);
      }
      default:
    }

    return next(action);
  };
};
