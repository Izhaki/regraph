import { transpose } from '@regraph/geo/rect';

export const moveBox = (state, { id, delta }) => {
  state.boxes[id] = transpose(state.boxes[id], delta);
};

export const setBoxes = (state, { boxes }) => {
  state.boxes = boxes;
};
