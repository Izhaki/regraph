import { moveBox } from '@regraph/editor/actions';

export default () => {
  let dragged;
  return next => action => {
    switch (action.type) {
      case 'mouseDown': {
        dragged = action.meta.id;
        break;
      }

      case 'mouseMove': {
        return next(
          moveBox({
            id: dragged,
            delta: action.event.getDelta(),
          })
        );
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
