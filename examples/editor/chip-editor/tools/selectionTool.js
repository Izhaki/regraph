import {
  select,
  deselect,
  updateConnections,
  updateNodes,
} from '@regraph/editor/actions';

const isConnection = item => item.type === 'connection';
const isNode = item => item.type === 'node';
const getId = item => item.id;

const isEmpty = connection => connection.length === 0;

const deselectAll = (dispatch, selected) => {
  if (isEmpty(selected)) {
    return false;
  }

  dispatch(
    updateConnections({
      ids: selected.filter(isConnection).map(getId),
      updates: { selected: false },
    })
  );

  dispatch(
    updateNodes({
      ids: selected.filter(isNode).map(getId),
      updates: { selected: false },
    })
  );

  return dispatch(deselect({ targets: selected, all: true }));
};

export default ({ getState, dispatch }) => next => action => {
  switch (action.type) {
    case 'mouseDown': {
      const { selected } = getState();
      const { target } = action.event;
      if (target.selectable) {
        deselectAll(dispatch, selected);
        if (isConnection(target)) {
          dispatch(
            updateConnections({
              ids: [target.id],
              updates: { selected: true },
            })
          );
        }
        if (isNode(target)) {
          dispatch(
            updateNodes({
              ids: [target.id],
              updates: { selected: true },
            })
          );
        }
        return next(select({ targets: [target] }));
      }
      return deselectAll(next, selected);
    }
    default:
  }

  return next(action);
};
