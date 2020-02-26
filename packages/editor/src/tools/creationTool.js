import { ensureArray } from '../utils';

const creationTool = getEditPolicies => ({ getState, dispatch }) => {
  return action => {
    switch (action.type) {
      case 'mouseDown': {
        const { target } = action.event;

        const policies = getEditPolicies(target);
        const createPolicy = policies.create;

        if (createPolicy) {
          ensureArray(createPolicy(action.event, getState)).forEach(dispatch);
        }
        break;
      }

      default:
    }
  };
};

export default creationTool;
