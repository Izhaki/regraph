const moveTool = getEditPolicies => ({ getState, dispatch }) => {
  let source;
  let policy;
  return action => {
    switch (action.type) {
      case 'mouseDown': {
        const { target } = action.event;
        action.event.source = target;

        policy = getEditPolicies(target).move;

        if (policy) {
          policy = policy(dispatch, getState);
          if (policy.start) {
            policy.start(action.event);
          }
          source = target;
        }
        break;
      }
      case 'mouseMove': {
        if (policy) {
          action.event.source = source;
          policy.drag(action.event);
        }
        break;
      }

      case 'mouseUp': {
        if (policy && policy.end) {
          action.event.source = source;
          policy.end(action.event);
        }

        policy = null;
        break;
      }

      default:
    }
  };
};

export default moveTool;
