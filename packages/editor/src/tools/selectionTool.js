import { select, clearSelection, addCommand } from '../actions';
import { ensureArray } from '../utils';

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
  let policies;
  let beforeState;
  let hasMoved = false;
  return next => action => {
    switch (action.type) {
      case 'mouseDown': {
        const { selected } = getState();
        const { target, shiftKey } = action.event;

        beforeState = getState();
        hasMoved = false;

        if (!shiftKey) {
          deselectAll(getEditPolicies, dispatch, selected);
        }

        policies = getEditPolicies(target);
        if (policies.select) {
          ensureArray(policies.select(target)).forEach(dispatch);
        }
        if (policies.select || policies.move) {
          current = target;
          return next(select({ targets: [target] }));
        }
        break;
      }
      case 'mouseMove': {
        if (current) {
          if (policies.move) {
            hasMoved = true;
            return next(policies.move(current, action.event));
          }
        }
        break;
      }

      case 'mouseUp': {
        if (hasMoved) {
          const state = getState();
          dispatch(
            addCommand({ title: 'Move', beforeState, afterState: state })
          );
          hasMoved = false;
          beforeState = null;
        }
        current = null;
        break;
      }

      default:
    }

    return next(action);
  };
};
