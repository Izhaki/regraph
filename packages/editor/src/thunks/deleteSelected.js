import { clearSelection } from '../slices/actions';
import { ensureArray } from '../utils';

export default () => (dispatch, getState, getEditPolicies) => {
  const state = getState();
  const { selected } = state;
  selected.forEach(target => {
    const deletePolicy = getEditPolicies(target).delete;
    if (deletePolicy) {
      ensureArray(deletePolicy(target, state)).forEach(dispatch);
    }
  });

  dispatch(clearSelection());
};
