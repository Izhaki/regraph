import { moveBox } from '@regraph/editor/actions';

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
        return next(
          moveBox({
            id: dragged,
            delta: action.event.getDelta(),
          })
        );
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
