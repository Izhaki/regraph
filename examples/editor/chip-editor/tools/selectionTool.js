import getDomainMeta from '../getDomainMeta';

const isConnection = item => item.type === 'connection';
const isNode = item => item.type === 'node';
const getId = item => item.id;

const deselectAll = (dispatch, selected) => {
  dispatch({
    type: 'connectionsUpdate',
    ids: selected.filter(isConnection).map(getId),
    updates: { selected: false },
  });

  dispatch({
    type: 'nodesUpdate',
    ids: selected.filter(isNode).map(getId),
    updates: { selected: false },
  });

  return dispatch({ type: 'deselect', metas: selected, all: true });
};

export default ({ getState, dispatch }) => next => action => {
  switch (action.type) {
    case 'click': {
      const state = getState();
      const meta = getDomainMeta(action.event.target, state);
      if (meta.selectable) {
        deselectAll(dispatch, state.selected);
        if (isConnection(meta)) {
          dispatch({
            type: 'connectionsUpdate',
            ids: [meta.id],
            updates: { selected: true },
          });
        }
        if (isNode(meta)) {
          dispatch({
            type: 'nodesUpdate',
            ids: [meta.id],
            updates: { selected: true },
          });
        }
        return next({ type: 'select', metas: [meta] });
      }
      return deselectAll(next, state.selected);
    }
    default:
  }

  return next(action);
};
