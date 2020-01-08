import getDomainMeta from '../getDomainMeta';
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

  return dispatch(deselect({ metas: selected, all: true }));
};

export default ({ getState, dispatch }) => next => action => {
  switch (action.type) {
    case 'click': {
      const state = getState();
      const meta = getDomainMeta(action.event.target, state);
      if (meta.selectable) {
        deselectAll(dispatch, state.selected);
        if (isConnection(meta)) {
          dispatch(
            updateConnections({
              ids: [meta.id],
              updates: { selected: true },
            })
          );
        }
        if (isNode(meta)) {
          dispatch(
            updateNodes({
              ids: [meta.id],
              updates: { selected: true },
            })
          );
        }
        return next(select({ metas: [meta] }));
      }
      return deselectAll(next, state.selected);
    }
    default:
  }

  return next(action);
};
