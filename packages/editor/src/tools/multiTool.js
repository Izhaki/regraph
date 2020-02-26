import connectionTool from './connectionTool';
import selectionTool from './selectionTool';

const multiTool = getEditPolicies => store => {
  const tools = {
    connection: connectionTool(getEditPolicies)(store),
    selection: selectionTool(getEditPolicies)(store),
  };

  const defaultTool = tools.selection;
  let currentTool = defaultTool;

  return action => {
    switch (action.type) {
      case 'mouseDown': {
        const { target } = action.event;
        const { connection: connectionPolicy } = getEditPolicies(target);
        currentTool = connectionPolicy ? tools.connection : defaultTool;
        currentTool(action);
        break;
      }

      case 'mouseMove': {
        if (currentTool) {
          currentTool(action);
        }
        break;
      }
      case 'mouseUp': {
        if (currentTool) {
          currentTool(action);
          currentTool = defaultTool;
        }
        break;
      }
      default:
    }
  };
};

export default multiTool;
