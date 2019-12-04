export default () => {
  let dragged;
  return next => action => {
    switch (action.type) {
      case 'dragStart': {
        dragged = action.meta.id;
        break;
      }

      case 'drag': {
        const { delta } = action.event;
        return next({ type: 'moveBox', id: dragged, delta });
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
