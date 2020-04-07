import { clearSelection, addCommand } from '../actions';

export default () => (dispatch, getState, getEditPolicies) => {
  const state = getState();

  const { selected } = state;
  if (selected.length) {
    selected.forEach(target => {
      const policies = getEditPolicies(target, 'delete');

      if (policies) {
        policies.forEach(policy => {
          policy(target);
        });
      }
    });

    dispatch(clearSelection());

    dispatch(
      addCommand({
        title: 'Delete',
        beforeState: state,
      })
    );
  }
};
