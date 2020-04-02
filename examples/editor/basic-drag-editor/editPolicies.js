import { moveBox } from '@regraph/editor/actions';

const editPolicies = {
  node: {
    move: dispatch => ({
      drag: event => {
        dispatch(
          moveBox({
            id: event.source.id,
            delta: event.delta,
          })
        );
      },
    }),
  },
};

export default target => editPolicies[target.type] || {};
