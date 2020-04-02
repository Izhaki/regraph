export default node => (dispatch, getState, getEditPolicies) => {
  const policy = getEditPolicies({ type: 'node' }).new;
  if (policy) {
    policy(dispatch, getState)(node);
  }
};
