import getDomainMeta from '../getDomainMeta';
import isValidConnection from '../isValidConnection';

export default ({ getState }) => {
  let srcMeta = null;
  return next => action => {
    switch (action.type) {
      case 'dragStart': {
        const { connections } = getState();
        const dstMeta = action.meta;
        srcMeta = dstMeta;
        const isValid = isValidConnection(srcMeta, dstMeta, connections);
        return next({
          type: 'connectionStart',
          srcMeta,
          dstMeta,
          event: action.event,
          isValid,
        });
      }

      case 'drag': {
        const state = getState();
        const dstMeta = getDomainMeta(action.event.target, state);
        const isValid = isValidConnection(srcMeta, dstMeta, state.connections);
        return next({
          type: 'connectionDrag',
          srcMeta,
          dstMeta,
          event: action.event,
          isValid,
        });
      }

      case 'dragEnd': {
        const state = getState();
        const dstMeta = getDomainMeta(action.event.target, state);
        const isValid = isValidConnection(srcMeta, dstMeta, state.connections);
        return next({
          type: 'connectionEnd',
          srcMeta,
          dstMeta,
          isValid,
        });
      }
      default:
    }

    return next(action);
  };
};
