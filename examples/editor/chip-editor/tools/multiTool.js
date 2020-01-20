import connectionTool from './connectionTool';
import selectionTool from './selectionTool';
import getEditPolicies from '../editPolicies';

export default store => {
  const tools = {
    connection: connectionTool(store),
    selection: selectionTool(store),
  };

  const defaultToll = tools.selection;
  let currentTool = defaultToll;

  return next => action => {
    switch (action.type) {
      case 'mouseDown': {
        const { target } = action.event;
        const { connection: connectionPolicy } = getEditPolicies(target);
        currentTool = connectionPolicy ? tools.connection : defaultToll;
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
          currentTool = defaultToll;
          return result;
        }
        break;
      }
      default:
    }

    return next(action);
  };
};
