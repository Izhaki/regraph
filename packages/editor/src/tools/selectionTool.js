import { isFunction } from '@regraph/core/';
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
  let movePolicy;
  return next => action => {
    switch (action.type) {
      case 'mouseDown': {
        const { selected } = getState();
        const { target, shiftKey } = action.event;

        const policies = getEditPolicies(target);
        movePolicy = policies.move;
        if (isFunction(movePolicy)) {
          movePolicy = movePolicy();
        }

        if (movePolicy && movePolicy.start) {
          ensureArray(
            movePolicy.start(target, action.event, getState())
          ).forEach(dispatch);
        }

        if (!shiftKey) {
          deselectAll(getEditPolicies, dispatch, selected);
        }

        if (policies.select) {
          ensureArray(policies.select(target)).forEach(dispatch);
        }

        if (policies.select || movePolicy) {
          current = target;
          return next(select({ targets: [target] }));
        }
        break;
      }
      case 'mouseMove': {
        if (current && movePolicy) {
          return next(movePolicy.drag(current, action.event));
        }
        break;
      }

      case 'mouseUp': {
        if (current && movePolicy && movePolicy.end) {
          dispatch(movePolicy.end(current, action.event, getState()));
        }

        current = null;
        break;
      }

      default:
    }

    return next(action);
  };
};
