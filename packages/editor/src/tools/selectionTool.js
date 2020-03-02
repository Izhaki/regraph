import { select, clearSelection } from '../actions';
import { ensureArray } from '../utils';

const isEmpty = collection => collection.length === 0;

const deselectAll = (getEditPolicies, dispatch, selected) => {
  if (isEmpty(selected)) {
    return false;
  }

  selected.forEach(target => {
    const { deselect: deselectPolicy } = getEditPolicies(target);
    if (deselectPolicy) {
      dispatch(deselectPolicy(target));
    }
  });

  return dispatch(clearSelection());
};

const selectionTool = getEditPolicies => ({ getState, dispatch }) => {
  return action => {
    switch (action.type) {
      case 'mouseDown': {
        const { selected } = getState();
        const { target, shiftKey } = action.event;
        action.event.source = target;

        const policies = getEditPolicies(target);

        if (!shiftKey) {
          deselectAll(getEditPolicies, dispatch, selected);
        }

        if (policies.select) {
          ensureArray(
            policies.select(target, action.event, getState())
          ).forEach(dispatch);
          dispatch(select({ targets: [target] }));
        }

        break;
      }

      default:
    }
  };
};

export default selectionTool;
