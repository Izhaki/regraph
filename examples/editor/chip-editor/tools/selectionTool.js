import getDomainMeta from '../getDomainMeta';

export default ({ getState, dispatch }) => next => action => {
  switch (action.type) {
    case 'click': {
      const state = getState();
      const meta = getDomainMeta(action.event.target, state);
      if (meta) {
        dispatch({ type: 'deselect', metas: state.selected, all: true });
        return next({ type: 'select', metas: [meta] });
      }
      return next({ type: 'deselect', metas: state.selected });
    }
    default:
  }

  return next(action);
};
