import { undoCommand, reinstate } from '../slices/actions';
import { getUndoCommand } from '../selectors';

export default () => (dispatch, getState) => {
  const { beforeState } = getUndoCommand(getState());
  dispatch(reinstate(beforeState));
  dispatch(undoCommand());
};
