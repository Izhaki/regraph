import getDomainTarget from './getDomainTarget';
import isValidConnection from './isValidConnection';

// TODO: out of here - also applies to node dragging
const isValidDragSource = source => source && Boolean(source.port);

export default ({ getState }) => {
  let source = null;
  return next => action => {
    switch (action.type) {
      case 'dragStart': {
        const state = getState();
        const target = getDomainTarget(action.event.target, state);
        if (!isValidDragSource(target)) {
          return false; // Cancel drag
        }
        source = target;
        const isValid = isValidConnection(source, target, state.connections);
        return next({
          type: 'connectionStart',
          source,
          target,
          event: action.event,
          isValid,
        });
      }

      case 'drag': {
        const state = getState();
        const target = getDomainTarget(action.event.target, state);
        const isValid = isValidConnection(source, target, state.connections);
        return next({
          type: 'connectionDrag',
          source,
          target,
          event: action.event,
          isValid,
        });
      }

      case 'dragEnd': {
        const state = getState();
        const target = getDomainTarget(action.event.target, state);
        const isValid = isValidConnection(source, target, state.connections);
        return next({ type: 'connectionEnd', source, target, isValid });
      }
      default:
    }

    return next(action);
  };
};
