import { isFunction } from '@regraph/core/';
import { ensureArray } from '../utils';

export default getEditPolicies => ({ dispatch, getState }) => {
  let policy = null;
  return next => action => {
    switch (action.type) {
      case 'mouseDown': {
        const { target } = action.event;
        policy = getEditPolicies(target).connection;
        if (isFunction(policy)) {
          policy = policy();
        }
        if (policy) {
          ensureArray(policy.start(action.event, getState())).forEach(dispatch);
          return undefined;
        }
        break;
      }

      case 'mouseMove': {
        if (policy) {
          return next(policy.drag(action.event, getState()));
        }
        break;
      }

      case 'mouseUp': {
        if (policy) {
          ensureArray(policy.end(action.event, getState())).forEach(dispatch);
          policy = null;
          return undefined;
        }
        break;
      }
      default:
    }

    return next(action);
  };
};
