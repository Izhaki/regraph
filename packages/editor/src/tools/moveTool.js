import { isFunction } from '@regraph/core/';
import { ensureArray } from '../utils';

const moveTool = getEditPolicies => ({ getState, dispatch }) => {
  let current;
  let movePolicy;
  return action => {
    switch (action.type) {
      case 'mouseDown': {
        const { target } = action.event;
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

        if (movePolicy) {
          current = target;
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

export default moveTool;
