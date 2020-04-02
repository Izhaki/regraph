const connectionTool = getEditPolicies => ({ dispatch, getState }) => {
  let source = null;
  let policy = null;
  return action => {
    switch (action.type) {
      case 'mouseDown': {
        const { target } = action.event;
        action.event.source = target;
        policy = getEditPolicies(target).connection;
        if (policy) {
          policy = policy(dispatch, getState);
          source = target;
          policy.start(action.event);
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
        if (policy) {
          action.event.source = source;
          policy.end(action.event);
          policy = null;
        }
        break;
      }
      default:
    }
  };
};

export default connectionTool;
