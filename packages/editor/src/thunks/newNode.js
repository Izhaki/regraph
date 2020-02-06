import { ensureArray } from '../utils';

export default node => (dispatch, getState, getEditPolicies) => {
  const state = getState();

  const newNodePolicy = getEditPolicies({ type: 'node' }).new;
  if (newNodePolicy) {
    ensureArray(newNodePolicy(node, state)).forEach(dispatch);
  }
};
