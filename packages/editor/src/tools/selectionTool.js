import { select, clearSelection } from '../actions';

const isEmpty = collection => collection.length === 0;

const deselectAll = (getEditPolicies, dispatch, selected) => {
  if (isEmpty(selected)) {
    return false;
  }

  selected.forEach(target => {
    const { deselect: deselectPolicy } = getEditPolicies(target);
    if (deselectPolicy) {
      dispatch(deselectPolicy(target));
    }
  });

  return dispatch(clearSelection());
};

export default getEditPolicies => ({ getState, dispatch }) => {
  let current;
  return next => action => {
    switch (action.type) {
      case 'mouseDown': {
        const { selected } = getState();
        deselectAll(getEditPolicies, dispatch, selected);

        const { target } = action.event;
        const { select: selectPolicy } = getEditPolicies(target);
        if (selectPolicy) {
          current = target;
          dispatch(selectPolicy(target));
          return next(select({ targets: [target] }));
        }
        break;
      }
      case 'mouseMove': {
        if (current) {
          const { target } = action.event;
          const { move } = getEditPolicies(target);
          if (move) {
            return next(move(target, action.event));
          }
        }
        break;
      }

      case 'mouseUp': {
        current = null;
        break;
      }

      default:
    }

    return next(action);
  };
};
