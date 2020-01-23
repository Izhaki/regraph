import { isFunction } from '@regraph/core/';

export default getEditPolicies => ({ getState }) => {
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
          return next(policy.start(action.event, getState()));
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
          const actions = policy.end(action.event, getState());
          policy = null;
          return next(actions);
        }
        break;
      }
      default:
    }

    return next(action);
  };
};
