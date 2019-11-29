import { transpose } from '@regraph/geo/rect';
import produce from 'immer';

export default produce(({ boxes }, action) => {
  switch (action.type) {
    case 'moveBox': {
      const { id, delta } = action;
      boxes[id] = transpose(boxes[id], delta);
      break;
    }
    default:
  }
});
