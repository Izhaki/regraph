import connectionTool from './connectionTool';
import selectionTool from './selectionTool';

export default store => {
  let currentTool = null;

  const tools = {
    connection: connectionTool(store),
    selection: selectionTool(store),
  };

  const targetTypeToTool = {
    input: tools.connection,
    output: tools.connection,
    node: tools.selection,
  };

  return next => action => {
    switch (action.type) {
      case 'mouseDown': {
        tools.selection(next)(action);
        const { target } = action.event;
        if (target.draggable) {
          currentTool = targetTypeToTool[target.type];
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
