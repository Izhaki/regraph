import getDomainTarget from '../getDomainTarget';
import connectionTool from './connectionTool';
import moveTool from './moveTool';

const isValidDragSource = target => target && target.type;

export default store => {
  let currentTool = null;
  const tools = {
    connection: connectionTool(store),
    move: moveTool(store),
  };

  const targetTypeToTool = {
    input: tools.connection,
    output: tools.connection,
    chip: tools.move,
  };

  return next => action => {
    switch (action.type) {
      case 'dragStart': {
        const state = store.getState();
        const source = getDomainTarget(action.event.target, state);
        if (isValidDragSource(source)) {
          action.domainTarget = source;
          currentTool = targetTypeToTool[source.type];
          return currentTool(next)(action);
        }
        return false; // Cancel drag
      }

      case 'drag':
      case 'dragEnd': {
        return currentTool(next)(action);
      }
      default:
    }

    return next(action);
  };
};
