import { clearSelection } from '../slices/actions';

const { isArray } = Array;

export default () => (dispatch, getState, getEditPolicies) => {
  const dispatchMany = (actions = []) => {
    (isArray(actions) ? actions : [actions]).forEach(dispatch);
  };
  const state = getState();
  const { selected } = state;
  selected.forEach(target => {
    const deletePolicy = getEditPolicies(target).delete;
    if (deletePolicy) {
      dispatchMany(deletePolicy(target, state));
    }
  });

  // Providing empty `targets` means connections and nodes won't remove the
  // selected flag from the (already deleted) items.
  // `all` will clear the `selected` array.
  dispatch(clearSelection());
};
