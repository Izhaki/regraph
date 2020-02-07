import { redoCommand, reinstate } from '../actions';
import { getRedoCommand } from '../selectors';

export default () => (dispatch, getState) => {
  const { afterState } = getRedoCommand(getState());
  dispatch(reinstate(afterState));
  dispatch(redoCommand());
};
