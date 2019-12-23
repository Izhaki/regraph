export default () => {
  let dragged;
  return next => action => {
    switch (action.type) {
      case 'dragStart': {
        dragged = action.meta.id;
        break;
      }

      case 'drag': {
        return next({
          type: 'moveBox',
          id: dragged,
          delta: action.event.getDelta(),
        });
      }

      case 'dragEnd': {
        dragged = null;
        break;
      }
      default:
    }

    return next(action);
  };
};
