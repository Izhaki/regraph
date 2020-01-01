import getDomainMeta from '../getDomainMeta';

export default ({ getState, dispatch }) => next => action => {
  switch (action.type) {
    case 'click': {
      const state = getState();
      const meta = getDomainMeta(action.event.target, state);
      if (meta.selectable) {
        dispatch({ type: 'deselect', metas: state.selected, all: true });
        return next({ type: 'select', metas: [meta] });
      }
      return next({ type: 'deselect', metas: state.selected, all: true });
    }
    default:
  }

  return next(action);
};
