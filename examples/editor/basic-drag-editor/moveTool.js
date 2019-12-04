const getDomainMeta = element => ({
  type: element.getAttribute('data-target'),
  id: element.id,
});

const isValidDragSource = target => target.type === 'node';

export default () => {
  let dragged;
  return next => action => {
    switch (action.type) {
      case 'dragStart': {
        const meta = getDomainMeta(action.event.target);
        if (isValidDragSource(meta)) {
          dragged = meta.id;
        } else {
          return false; // Cancel drag
        }
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
