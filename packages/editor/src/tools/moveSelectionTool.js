const moveSelectionTool = getEditPolicies => ({ getState, dispatch }) => {
  let selected = null;
  let policy;
  return action => {
    switch (action.type) {
      case 'mouseDown': {
        selected = getState().selected;

        if (selected.length) {
          const { target } = action.event;
          action.event.source = target;

          policy = getEditPolicies(target).move;

          if (policy) {
            policy = policy(dispatch, getState);
            if (policy.start) {
              policy.start(action.event);
            }
          }
        }

        break;
      }
      case 'mouseMove': {
        if (policy) {
          selected.forEach(target => {
            action.event.source = target;
            policy.drag(action.event);
          });
        }
        break;
      }

      case 'mouseUp': {
        if (policy && policy.end) {
          selected.forEach(target => {
            action.event.source = target;
            policy.end(action.event);
          });
        }

        policy = null;
        break;
      }

      default:
    }
  };
};

export default moveSelectionTool;
