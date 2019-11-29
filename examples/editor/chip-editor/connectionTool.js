import getDomainTarget from './getDomainTarget';
import isValidConnection from './isValidConnection';

// TODO: out of here - also applies to node dragging
const isValidDragSource = source => source && Boolean(source.port);

export default ({ getState }) => {
  let source = null;
  return next => action => {
    switch (action.type) {
      case 'dragStart': {
        const target = getDomainTarget(action.event.target, getState());
        if (!isValidDragSource(target)) {
          return false; // Cancel drag
        }
        source = target;
        const isValid = isValidConnection(source, target);
        return next({
          type: 'connectionStart',
          source,
          target,
          event: action.event,
          isValid,
        });
      }

      case 'drag': {
        const target = getDomainTarget(action.event.target, getState());
        const isValid = isValidConnection(source, target);
        return next({
          type: 'connectionDrag',
          source,
          target,
          event: action.event,
          isValid,
        });
      }

      case 'dragEnd': {
        const target = getDomainTarget(action.event.target, getState());
        const isValid = isValidConnection(source, target);
        return next({ type: 'connectionEnd', source, target, isValid });
      }
      default:
    }

    return next(action);
  };
};
