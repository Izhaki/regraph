import { select, clearSelection } from '../actions';

const isEqual = a => b => JSON.stringify(a) === JSON.stringify(b);

const deselectAll = (getEditPolicies, dispatch, getState, selected) => {
  selected.forEach(target => {
    const policy = getEditPolicies(target).deselect;
    if (policy) {
      policy(dispatch, getState)(target);
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

        const alreadySelected = selected.some(isEqual(target));

        if (!alreadySelected) {
          if (!shiftKey) {
            deselectAll(getEditPolicies, dispatch, getState, selected);
          }

          const policy = getEditPolicies(target).select;
          if (policy) {
            policy(dispatch, getState)(target);

            dispatch(select({ targets: [target] }));
          }
        }
        break;
      }

      default:
    }
  };
};

export default selectionTool;
