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
      case 'mouseDown': {
        const target = getDomainMeta(action.event.target);
        if (isValidDragSource(target)) {
          dragged = target.id;
        } else {
          return false; // Cancel drag
        }
        break;
      }

      case 'mouseMove': {
        if (dragged) {
          return next(
            moveBox({
              id: dragged,
              delta: action.event.getDelta(),
            })
          );
        }
        break;
      }

      case 'mouseUp': {
        dragged = null;
        break;
      }
      default:
    }

    return next(action);
  };
};
