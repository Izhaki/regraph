import getDomainTarget from '../getDomainTarget';
import isValidConnection from '../isValidConnection';

export default ({ getState }) => {
  let source = null;
  return next => action => {
    switch (action.type) {
      case 'dragStart': {
        const { connections } = getState();
        const target = action.domainTarget;
        source = target;
        const isValid = isValidConnection(source, target, connections);
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
