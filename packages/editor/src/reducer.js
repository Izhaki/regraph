import { transpose } from '@regraph/geo/rect';

export default (state, action) => {
  switch (action.type) {
    case 'moveBox': {
      const { id, delta } = action;
      return {
        ...state,
        boxes: {
          ...state.boxes,
          [id]: transpose({ ...state.boxes[id] }, delta),
        },
      };
    }
    default:
  }
  return state;
};
