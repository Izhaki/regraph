import getDomainMeta from '../getDomainMeta';
import connectionTool from './connectionTool';
import moveTool from './moveTool';
import selectionTool from './selectionTool';

const isValidDragSource = meta => meta && meta.type;

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
    chip: tools.move,
    connection: tools.selection,
  };

  return next => action => {
    switch (action.type) {
      case 'dragStart': {
        const state = store.getState();
        const meta = getDomainMeta(action.event.target, state);
        if (isValidDragSource(meta)) {
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
