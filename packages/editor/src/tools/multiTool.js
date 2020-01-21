import connectionTool from './connectionTool';
import selectionTool from './selectionTool';

export default getEditPolicies => store => {
  const tools = {
    connection: connectionTool(getEditPolicies)(store),
    selection: selectionTool(getEditPolicies)(store),
  };

  const defaultTool = tools.selection;
  let currentTool = defaultTool;

  return next => action => {
    switch (action.type) {
      case 'mouseDown': {
        const { target } = action.event;
        const { connection: connectionPolicy } = getEditPolicies(target);
        currentTool = connectionPolicy ? tools.connection : defaultTool;
        return currentTool(next)(action);
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
          currentTool = defaultTool;
          return result;
        }
        break;
      }
      default:
    }

    return next(action);
  };
};
