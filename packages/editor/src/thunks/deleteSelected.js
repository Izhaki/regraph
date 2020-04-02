import { clearSelection, addCommand } from '../actions';

export default () => (dispatch, getState, getEditPolicies) => {
  const state = getState();

  const { selected } = state;
  selected.forEach(target => {
    const policy = getEditPolicies(target).delete;
    if (policy) {
      policy(dispatch, getState)(target);
    }
  });

  dispatch(clearSelection());

  dispatch(
    addCommand({
      title: 'Delete',
      beforeState: state,
    })
  );
};
