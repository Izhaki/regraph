import getDomainMeta from '../getDomainMeta';

const isConnection = item => item.type === 'connection';
const getId = item => item.id;

const deselectAll = (dispatch, selected) => {
  const connectionIds = selected.filter(isConnection).map(getId);
  dispatch({
    type: 'connectionsUpdate',
    ids: connectionIds,
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
        return next({ type: 'select', metas: [meta] });
      }
      return deselectAll(next, state.selected);
    }
    default:
  }

  return next(action);
};
