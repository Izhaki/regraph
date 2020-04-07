const creationTool = getEditPolicies => () => {
  return action => {
    switch (action.type) {
      case 'mouseUp': {
        const { target } = action.event;

        const policies = getEditPolicies(target, 'create');

        if (policies) {
          policies.forEach(policy => {
            policy(action.event);
          });
        }

        break;
      }

      default:
    }
  };
};

export default creationTool;
