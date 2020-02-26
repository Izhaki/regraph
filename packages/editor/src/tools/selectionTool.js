import { isFunction } from '@regraph/core/';
import { select, clearSelection } from '../actions';
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

const selectionTool = getEditPolicies => ({ getState, dispatch }) => {
  let current;
  let movePolicy;
  return action => {
    switch (action.type) {
      case 'mouseDown': {
        const { selected } = getState();
        const { target, shiftKey } = action.event;
        action.event.source = target;

        const policies = getEditPolicies(target);
        movePolicy = policies.move;
        if (isFunction(movePolicy)) {
          movePolicy = movePolicy();
        }

        if (movePolicy && movePolicy.start) {
          ensureArray(movePolicy.start(action.event, getState())).forEach(
            dispatch
          );
        }

        if (!shiftKey) {
          deselectAll(getEditPolicies, dispatch, selected);
        }

        if (policies.select) {
          ensureArray(
            policies.select(target, action.event, getState())
          ).forEach(dispatch);
        }

        if (policies.select || movePolicy) {
          current = target;
          dispatch(select({ targets: [target] }));
        }
        break;
      }
      case 'mouseMove': {
        if (current && movePolicy) {
          action.event.source = current;
          dispatch(movePolicy.drag(action.event));
        }
        break;
      }

      case 'mouseUp': {
        if (current && movePolicy && movePolicy.end) {
          action.event.source = current;
          ensureArray(movePolicy.end(action.event, getState())).forEach(
            dispatch
          );
        }

        current = null;
        break;
      }

      default:
    }
  };
};

export default selectionTool;
