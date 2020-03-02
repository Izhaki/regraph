import { isFunction } from '@regraph/core/';
import { ensureArray } from '../utils';

const moveSelectionTool = getEditPolicies => ({ getState, dispatch }) => {
  let selected = null;
  let movePolicy;
  return action => {
    switch (action.type) {
      case 'mouseDown': {
        selected = getState().selected;

        if (selected.length) {
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
        }

        break;
      }
      case 'mouseMove': {
        if (movePolicy) {
          selected.forEach(target => {
            action.event.source = target;
            dispatch(movePolicy.drag(action.event));
          });
        }
        break;
      }

      case 'mouseUp': {
        if (movePolicy && movePolicy.end) {
          selected.forEach(target => {
            action.event.source = target;
            ensureArray(movePolicy.end(action.event, getState())).forEach(
              dispatch
            );
          });
        }

        movePolicy = null;
        break;
      }

      default:
    }
  };
};

export default moveSelectionTool;
