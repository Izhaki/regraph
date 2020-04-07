export default node => (dispatch, getState, getEditPolicies) => {
  const policies = getEditPolicies({ type: 'node' }, 'new');

  if (policies) {
    policies.forEach(policy => {
      policy(node);
    });
  }
};
