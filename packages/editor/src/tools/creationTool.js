const creationTool = getEditPolicies => ({ getState, dispatch }) => {
  return action => {
    switch (action.type) {
      case 'mouseUp': {
        const { target } = action.event;

        const policy = getEditPolicies(target).create;

        if (policy) {
          policy(dispatch, getState)(action.event, getState);
        }
        break;
      }

      default:
    }
  };
};

export default creationTool;
