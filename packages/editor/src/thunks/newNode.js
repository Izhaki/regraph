import { addCommand } from '../slices/actions';
import { ensureArray } from '../utils';

export default node => (dispatch, getState, getEditPolicies) => {
  const state = getState();

  const newNodePolicy = getEditPolicies({ type: 'node' }).new;
  if (newNodePolicy) {
    ensureArray(newNodePolicy(node)).forEach(dispatch);
    dispatch(
      addCommand({
        title: 'New Node',
        beforeState: state,
        afterState: getState(),
      })
    );
  }
};
