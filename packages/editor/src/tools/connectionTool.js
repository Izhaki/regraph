import { isFunction } from '@regraph/core/';
import { ensureArray } from '../utils';

export default getEditPolicies => ({ dispatch, getState }) => {
  let source = null;
  let policy = null;
  return action => {
    switch (action.type) {
      case 'mouseDown': {
        const { target } = action.event;
        action.event.source = target;
        policy = getEditPolicies(target).connection;
        if (isFunction(policy)) {
          policy = policy();
        }
        if (policy) {
          source = target;
          ensureArray(policy.start(action.event, getState())).forEach(dispatch);
          return undefined;
        }
        break;
      }

      case 'mouseMove': {
        if (policy) {
          action.event.source = source;
          dispatch(policy.drag(action.event, getState()));
        }
        break;
      }

      case 'mouseUp': {
        if (policy) {
          action.event.source = source;
          ensureArray(policy.end(action.event, getState())).forEach(dispatch);
          policy = null;
          return undefined;
        }
        break;
      }
      default:
    }
  };
};
