import connectionTool from './connectionTool';
import moveTool from './moveTool';
import selectionTool from './selectionTool';

export default store => {
  let currentTool = null;

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
