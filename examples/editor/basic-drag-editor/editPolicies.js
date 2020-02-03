import { moveBox } from '@regraph/editor/actions';

const editPolicies = {
  node: {
    move: {
      drag: (target, event) =>
        moveBox({
          id: target.id,
          delta: event.delta,
        }),
    },
  },
};

export default target => editPolicies[target.type] || {};
