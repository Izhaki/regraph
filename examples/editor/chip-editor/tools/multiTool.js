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
      case 'mouseDown': {
        const meta = getMeta(action);
        tools.selection(next)(action);
        if (meta.draggable) {
          action.meta = meta;
          currentTool = targetTypeToTool[meta.type];
          return currentTool(next)(action);
        }
        break;
      }

      case 'mouseMove': {
        if (currentTool) {
          return currentTool(next)(action);
        }
        break;
      }
      case 'mouseUp': {
        if (currentTool) {
          const result = currentTool(next)(action);
          currentTool = null;
          return result;
        }
        break;
      }
      default:
    }

    return next(action);
  };
};
